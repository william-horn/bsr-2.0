import '../styles/globals.css';
import pageDataAPI from '../lib/pageDataAPI';

import AppProvider from '../providers/AppProvider';
import LayoutController from '../components/layouts';
import Container from '../components/Container';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  const allEl = window.document.querySelector("body");
  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 87) {
      if (allEl.classList.contains("wireframe")) {
        allEl.classList.remove("wireframe");
      } else {
        allEl.classList.add("wireframe");
      }
    }
  });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentUrl = router.pathname;
  const currentPage = pageDataAPI.getPageFrom("url", currentUrl);
  const lastPageRef = useRef(null);

  useEffect(() => {
    lastPageRef.current = currentPage;
  }, [currentUrl]);

  return (
    <AppProvider
    value={{
      currentPage,
      currentUrl,
      lastPage: lastPageRef.current,
    }}>
      <Head>
        <title>{currentPage.title}</title>
      </Head>
      <Container className="relative max-h-screen min-h-screen overflow-y-auto max-w-screen min-w-screen">
        <LayoutController>
          <Component {...pageProps} />
        </LayoutController>
      </Container>
    </AppProvider>
  )
}
