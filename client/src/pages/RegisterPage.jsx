import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.success) navigate('/orders');
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        <div className={styles.cardHeader}>
          <span className={`material-symbols-outlined text-4xl ${styles.headerIcon}`}>person_add</span>
          <h1 className={styles.cardTitle}>CREATE ACCOUNT</h1>
          <p className={styles.cardSubtitle}>JOIN URBAN KINETIC FOR DROP NOTIFICATIONS &amp; ACCESS</p>
        </div>

        {error && (
          <div className={styles.errorBox}>{error}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>FULL NAME</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="e.g. Deepak Gopika"
            />
          </div>

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
              placeholder="At least 6 characters"
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'REGISTERING ACCESS...' : 'JOIN KINETIC ARCHIVE'}
          </button>
        </form>

        <div className={styles.footer}>
          ALREADY REGISTERED?{' '}
          <Link to="/login" className={styles.footerLink}>LOG IN</Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
