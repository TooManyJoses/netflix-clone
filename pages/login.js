import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/login.module.css';

const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const [userMessage, setUserMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Cleek handleLogin');
    if (email && emailRegEx.test(email)) {
      // route to dashboard
    } else {
      // show message to user
      setUserMessage('Enter a valid email address');
    }
  };

  const handleEmailCheck = (e) => {
    console.log('event', e);
    setUserMessage('');
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
        </div>
      </main>
    </div>
  );
};

export default Login;
