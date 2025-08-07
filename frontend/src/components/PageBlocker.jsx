import React, { useState } from 'react';
import styles from './PageBlocker.module.css';

const CORRECT_KEY = import.meta.env.VITE_PAGE_KEY;

export default function PageBlocker({ children }) {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_KEY) {
      setUnlocked(true);
      setError('');
    } else {
      setError('🚫 Invalid key. Try again.');
    }
  };

  if (unlocked) return children;

  return (
    <div className={styles.overlay}>
      <div className={styles.blockerBox}>
        <h2>Enter key and get your CHANDNI rn</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter key..."
            autoFocus
          />
          <button className={styles.button} type="submit">Unlock</button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
