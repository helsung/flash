import React from "react";
import Image from "next/image";
import styles from "../../styles/Photo.module.css";
import { getSinglePhoto } from "../../lib/photos";

export default function Photo({ photo }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={photo.src.large2x}
          alt="image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className={styles.description}>
        <p className={styles.text}>
          {photo.photographer} <br />
          {photo.url}
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const photo = await getSinglePhoto(params.id);
  return {
    props: {
      photo,
    },
  };
}
