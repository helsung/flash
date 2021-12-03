import React, { useState, useEffect } from "react";
import Photos from "../components/Photos";
import Navbar from "../components/Navbar";
import { getQueriedPhotos } from "../lib/photos";
import Pagination from "next-pagination";
import { useRouter } from "next/router";

export default function Queried({ queriedPhotos }) {
  const { photos } = queriedPhotos;
  const [input, setInput] = useState("");
  const router = useRouter();
  const { query } = router.query;
  const totalResults = queriedPhotos && queriedPhotos.total_results;
  const perPage = router.query.size || 20;
  const totalPages = Math.ceil(totalResults / perPage);

  useEffect(() => {
    if (router.asPath === `/${query}`) {
      console.log("here");
      router.replace(router.asPath + "/?page=1&size=20");
    }
  }, [router.asPath]);

  console.log(router);

  const handleInput = (e) => {
    setInput(e);
  };

  return (
    <div>
      <Navbar input={input} handleInput={handleInput} />
      <Photos photos={photos} />
      <Pagination total={totalPages} />
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const { page, size } = query;
  const queriedPhotos =
    (await getQueriedPhotos(params.query, +page, +size)) || null;

  return {
    props: {
      queriedPhotos,
    },
  };
}
