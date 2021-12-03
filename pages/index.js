import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Photos from "../components/Photos";
import { getCuratedPhotos } from "../lib/photos";

export default function Home({ curatedPhotos }) {
  const [photos, setPhotos] = useState(curatedPhotos.photos);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e);
  };

  return (
    <div className={styles.container}>
      <Navbar input={input} handleInput={handleInput} />
      <Photos photos={photos} />
    </div>
  );
}

export async function getServerSideProps({}) {
  const curatedPhotos = await getCuratedPhotos();

  return {
    props: {
      curatedPhotos: curatedPhotos || null,
    },
  };
}
