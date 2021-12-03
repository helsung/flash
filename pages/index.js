import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Photos from "../components/Photos";
import { getCuratedPhotos } from "../lib/photos";
import Pagination from "next-pagination";
import { useRouter } from "next/router";

export default function Home({ curatedPhotos }) {
  const { photos } = curatedPhotos;
  const [input, setInput] = useState("");
  const router = useRouter();
  const totalResults = (curatedPhotos && curatedPhotos.total_results) || 8000;
  const perPage = router.query.size || 20;
  const totalPages = Math.ceil(totalResults / perPage);

  useEffect(() => {
    if (router.asPath === "/") router.replace("/?page=1&size=20");
  }, []);

  const handleInput = (e) => {
    setInput(e);
  };

  return (
    <div className={styles.container}>
      <Navbar input={input} handleInput={handleInput} />
      <Photos photos={photos} />
      <Pagination total={totalPages} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { page, size } = query;
  const curatedPhotos = await getCuratedPhotos(+page, +size);

  return {
    props: {
      curatedPhotos: curatedPhotos || null,
    },
  };
}
