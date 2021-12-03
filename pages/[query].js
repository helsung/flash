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

  // redirect queried route with URL params to support pagination
  useEffect(() => {
    if (router.asPath === `/${query}`)
      router.replace(router.asPath + "/?page=1&size=20");
  }, [router.asPath]);

  /**
   * Update user input for queried search onto component's local state. Invoke in Navbar component
   * @param {string} e
   */
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

/**
 * Fetch queried photos from api call that is accessible as props in the page component
 * @param {Object} query //de-constructed from `context` parameter representing URL query params
 * @return {Object} //queried photos fetched from api call that is accessible as props in the page component
 */
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
