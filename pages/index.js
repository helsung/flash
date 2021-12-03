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

  // redirect homepage route with URL params to support pagination
  useEffect(() => {
    if (router.asPath === "/") router.replace("/?page=1&size=20");
  }, [router.asPath]);

  /**
   * Update user input for queried search onto component's local state. Invoke in Navbar component
   * @param {string} e
   */
  const handleInput = (e) => {
    setInput(e);
  };

  return (
    <div className={styles.container}>
      <Navbar input={input} handleInput={handleInput} />

      <div className={styles.landingContainer}>
        <div className={styles.backgroundImg}></div>
        <h2 className={styles.description}>
          Discover beautiful photos from visionary photographers
        </h2>
      </div>

      <Photos photos={photos} />
      <Pagination total={totalPages} />
    </div>
  );
}

/**
 * Update user input for queried search onto component's local state
 * https://nextjs.org/docs/basic-features/data-fetching
 * @param {Object} query //de-constructed from `context` parameter representing URL query params
 * @return {Object} //curated photos fetched from api call that is accessible as props in the page component
 */
export async function getServerSideProps({ query }) {
  const { page, size } = query;
  const curatedPhotos = await getCuratedPhotos(+page, +size);

  return {
    props: {
      curatedPhotos: curatedPhotos || null,
    },
  };
}
