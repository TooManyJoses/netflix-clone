import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './card.module.css';

const missingImage =
  'https://images.unsplash.com/photo-1556132877-ded3bb0173b5?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873';

const Card = ({ id, imgUrl = missingImage, size = 'medium' }) => {
  const [cardImage, setCardImage] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const scaler = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const handleImageError = () => {
    setCardImage(missingImage);
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{...scaler}}
        className={classNames(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={cardImage}
          alt={size}
          layout="fill"
          className={styles.cardImg}
          onError={handleImageError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
