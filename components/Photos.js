import React from "react";
import styles from "../styles/Photos.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Photos({ photos }) {
  return (
    <div className={styles.gallery}>
      {photos.map((photo) => (
        <Link key={photo.id} href={`/photos/${photo.id}`} passHref>
          <div className={styles.image}>
            <Image
              src={photo.src.large}
              width={600}
              height={900}
              alt="single-photo"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
