import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../../lib/magic-client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.css';

const NavBar = () => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(async () => {
    // Assumes a user is already logged in
    try {
      const { email } = await magic.user.getMetadata();
      if (email) {
        setUsername(email);
      }
    } catch (error) {
      console.error('Error Retrieving email', error);
    }
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out', error);
      router.push('/login');
    }
  };

  const toggleDropDown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropDownOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={toggleDropDown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="expand more"
                width="24px"
                height="24px"
              />
            </button>
            {dropDownOpen && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
