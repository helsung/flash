import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import logo from "./,,/../../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ input, handleInput }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" onClick={() => router.push(`/${input}`)} />

      <input
        className={styles.inputField}
        placeholder="Search for photos"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
      />
      <Link href={`/${input}`} passHref>
        <button className={styles.button}>Search</button>
      </Link>
    </div>
  );
}
