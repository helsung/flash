import React, { useState } from "react";
import Photos from "../components/Photos";
import Navbar from "../components/Navbar";
import { getQueriedPhotos } from "../lib/photos";

export default function Queried({ queriedPhotos }) {
  const { photos } = queriedPhotos;
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e);
  };

  return (
    <div>
      <Navbar input={input} handleInput={handleInput} />
      <Photos photos={photos} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const queriedPhotos = (await getQueriedPhotos(params.query)) || null;

  return {
    props: {
      queriedPhotos,
    },
  };
}
