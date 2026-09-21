import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('user@urbankinetic.com');
  const [password, setPassword] = useState('123456');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate('/orders');
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        <div className={styles.cardHeader}>
          <span className={`material-symbols-outlined text-4xl ${styles.headerIcon}`}>person</span>
          <h1 className={styles.cardTitle}>ACCOUNT ACCESS</h1>
          <p className={styles.cardSubtitle}>ENTER CREDENTIALS TO ACCESS YOUR KINETIC PROFILE</p>
        </div>

        {error && (
          <div className={styles.errorBox}>{error}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="name@domain.com"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'AUTHENTICATING...' : 'LOG IN TO ACCOUNT'}
          </button>
        </form>

        <div className={styles.footer}>
          NEW TO URBAN KINETIC?{' '}
          <Link to="/register" className={styles.footerLink}>CREATE AN ACCOUNT</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
