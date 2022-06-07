import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';
import Loader from '../components/loader/loader';
import styles from '../styles/login.module.css';

const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const router = useRouter();
  const [userMessage, setUserMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailRegEx.test(email)) {
      setIsLoading(true);
      try {
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          router.push('/');
        }
      } catch (error) {
        console.error('Something went wrong while logging in', error);
      }
    } else {
      setUserMessage('Enter a valid email address');
    }
  };

  const handleEmailCheck = (e) => {
    if (emailRegEx.test(email)) {
      setUserMessage('');
    }
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NetTube SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="retro logo"
                width="300px"
                height="150px"
              />
              <div className={styles.plusSign}>+</div>
              <Image
                src="/static/yt_logo.svg"
                alt="retro logo"
                width="300px"
                height="150px"
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.signInWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <input
                type="text"
                placeholder="Email Address"
                className={styles.emailInput}
                onChange={handleEmailCheck}
              />
              <p className={styles.userMsg}>{userMessage}</p>
              <button onClick={handleLogin} className={styles.signInButton}>
                Sign In
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
