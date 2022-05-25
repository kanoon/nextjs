import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { fetchPublicData, fetchPrivateData } from "../pages/api/hello";
import Link from "next/link";

interface HomeProps {
  public: string;
  private: string;
}

const Home = (props: HomeProps) => {
  console.log("Home rendering");
  const [resultPublic, setPublicResult] = React.useState<string>();
  const [resultPrivate, setPrivateResult] = React.useState<string>();

  const handlePublicClick = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    const data = await fetchPublicData();
    setPublicResult(data);
  };

  const handlePrivateClick = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    fetchPrivateData;
    const data = await fetchPrivateData();
    setPrivateResult(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js!</h1>

        <h2>=== Next.js SSR ===</h2>
        <p>
          <b>API Gateway (Public):</b> {props.public}
        </p>
        <p>
          <b>API Gateway (Private):</b>
          {props.private}
        </p>

        <h2>=== React.useState ===</h2>
        <button onClick={(e) => handlePublicClick(e)}>
          Call API Gateway (Public)
        </button>
        <p>{resultPublic}</p>

        <button onClick={(e) => handlePrivateClick(e)}>
          Call API Gateway (Private)
        </button>
        <p>{resultPrivate}</p>

        <h2>=== Route ===</h2>
        <Link href="/mypage">
          <a>Go to Mypage</a>
        </Link>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("Home.getServerSideProps called");
  const data_public = await fetchPublicData();
  const data_private = await fetchPrivateData();
  return {
    props: { public: data_public, private: data_private },
  };
}

export default Home;
