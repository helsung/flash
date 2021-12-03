import React, { useState } from "react";
import Photos from "../components/Photos";
import Navbar from "../components/Navbar";
import { getQueriedPhotos } from "../lib/photos";

export default function Queried({ queriedPhotos, totalPages }) {
  const [photos, setPhotos] = useState(queriedPhotos.photos);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e);
  };

  const handleSearch = () => {
    setPhotos(queriedPhotos.photos);
  };

  return (
    <div>
      <Navbar
        input={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
      <Photos photos={photos} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const queriedPhotos = (await getQueriedPhotos(params.query)) || null;
  const totalPages = Math.ceil(queriedPhotos.total_results / 12);
  return {
    props: {
      queriedPhotos,
      totalPages,
    },
  };
}
