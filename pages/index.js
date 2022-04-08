import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Body from '../components/Body';
import { useEffect } from 'react';
import { v4 } from 'uuid';

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('userid')) localStorage.setItem('userid', v4());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>GoSeeko Assignment</title>
        <meta name="GoSeeko" content="Assignment for full stack developer role" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Header />

        <Body />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
