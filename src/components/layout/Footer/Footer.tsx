import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <p className={styles.footer__logo}>
            UIT-Fukuoka
          </p>
          <p className={styles.footer__tagline}>
            福岡エンジニア専門キャリア相談所
          </p>
        </div>

        <nav className={styles.footer__nav} aria-label="フッターナビゲーション">
          <ul className={styles.footer__navList}>
            <li><a href="/#value">サービス</a></li>
            <li><a href="/#process">ご利用の流れ</a></li>
            <li><a href="/#faq">よくある質問</a></li>
            <li><a href="/#contact">お問い合わせ</a></li>
          </ul>
        </nav>
      </div>

      <div className={styles.footer__bottom}>
        <p className={styles.footer__copy}>
          &copy; {currentYear} Univus inc.,Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
