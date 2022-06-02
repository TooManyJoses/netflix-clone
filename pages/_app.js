import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';
import Loader from '../components/loader/loader';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkIfLoggedIn() {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    }
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    const handleRouteComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router]);

  return isLoading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp;
