import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Body from '../components/Body';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Image from 'next/image';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (document.documentElement.scrollTop > 600) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', onScroll);
    if (!localStorage.getItem('userid')) localStorage.setItem('userid', v4());
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div id="container">
      <Head>
        <title>GoSeeko Assignment</title>
        <meta name="GoSeeko" content="Assignment for full stack developer role" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Header />

        <Body />
        <div style={{ display: isVisible ? 'block' : 'none' }} className="fixed right-20 bottom-5 animate-bounce">
          <button
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
            }}
          >
            <div className="flex flex-row align-middle">
              <Image
                className="hover:cursor-pointer"
                src={'/up-arrow.svg'}
                height="30px"
                width={'30px'}
                alt="like"
              ></Image>
              <div className="pl-2">Scroll to Top</div>
            </div>
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
