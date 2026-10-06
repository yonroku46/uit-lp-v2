import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import ThanksTrigger from '@/components/sections/Thanks/ThanksTrigger';
import '@/styles/home.scss';
import styles from './Thanks.module.scss';

export const metadata: Metadata = {
  title: '送信完了 | UIT-Fukuoka',
  description: 'お問い合わせ・無料相談のお申し込みありがとうございます。内容を確認し、担当カウンセラーよりご連絡いたします。',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThanksPage() {
  return (
    <div className={`lp-container ${styles.thanksPage}`}>
      {/* HEADER (Responsive & Compact) - Exactly same as Main LP */}
      <header className="header">
        <div className="wrap header-inner">
          <Link href="/" className="header-brand">
            <span className="header-logo">
              <span className="logo-full">UIT-Fukuoka</span>
              <span className="logo-short">UIT-Fukuoka</span>
            </span>
            <span className="header-subtitle">福岡のITエンジニア専門キャリア相談</span>
          </Link>

          <nav className="header-nav">
            <Link href="/#features" className="header-nav-link">特徴</Link>
            <Link href="/#flow" className="header-nav-link">
              <span className="nav-text-full">相談の流れ</span>
              <span className="nav-text-short">流れ</span>
            </Link>
            <Link href="/#faq" className="header-nav-link">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.thanksPage__main} id="main-content">
        <section
          className={styles.thanksPage__card}
          id="thanks-section"
          aria-labelledby="thanks-heading"
        >
          {/* Success Icon */}
          <div className={styles.thanksPage__iconWrapper}>
            <Check 
              size={46} 
              strokeWidth={2.6} 
              className={styles.thanksPage__icon} 
              aria-hidden="true"
            />
          </div>

          {/* Header Title */}
          <h1 className={styles.thanksPage__title} id="thanks-heading">
            送信が完了しました
          </h1>

          {/* Description */}
          <div className={styles.thanksPage__desc}>
            <p>
              お問い合わせ・無料相談へのお申し込み、誠にありがとうございます。
            </p>
            <p>
              ご入力いただいた内容を確認の上、<strong className={styles.highlight}>1〜2営業日以内</strong>に
              担当カウンセラーよりメールにて日程調整のご連絡を差し上げます。
            </p>
          </div>

          {/* Next Steps Guide */}
          <div className={styles.thanksPage__steps}>
            <div className={styles.thanksPage__stepsTitle}>
              <span>今後の流れについて</span>
            </div>
            <ol className={styles.thanksPage__stepsList}>
              <li className={styles.thanksPage__stepItem}>
                <span className={styles.thanksPage__stepNum}>1</span>
                <div className={styles.thanksPage__stepContent}>
                  <p className={styles.thanksPage__stepHeading}>受付確認メールの送信</p>
                  <p className={styles.thanksPage__stepDetail}>
                    ご登録のアドレス宛に自動受付メールをお送りしました。
                  </p>
                </div>
              </li>
              <li className={styles.thanksPage__stepItem}>
                <span className={styles.thanksPage__stepNum}>2</span>
                <div className={styles.thanksPage__stepContent}>
                  <p className={styles.thanksPage__stepHeading}>担当者より日程調整のご案内</p>
                  <p className={styles.thanksPage__stepDetail}>
                    ご希望の候補日をもとに、オンライン相談の確定日時をご連絡します。
                  </p>
                </div>
              </li>
              <li className={styles.thanksPage__stepItem}>
                <span className={styles.thanksPage__stepNum}>3</span>
                <div className={styles.thanksPage__stepContent}>
                  <p className={styles.thanksPage__stepHeading}>オンライン個別相談の実施</p>
                  <p className={styles.thanksPage__stepDetail}>
                    事前準備・履歴書は不要です。現在のお悩みや本音をお聞かせください。
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Back to Home Button */}
          <Link 
            href="/" 
            className={styles.thanksPage__button}
            id="back-to-home-btn"
          >
            <ArrowLeft size={16} strokeWidth={2.4} />
            <span>トップページに戻る</span>
          </Link>
        </section>
      </main>

      {/* FOOTER - Exactly same as Main LP */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div>
              <div className="footer-logo">UIT-Fukuoka</div>
              <p style={{ marginTop: '8px' }}>
                福岡在住および他県からのU・Iターンを希望するITエンジニアのための個別キャリア相談サービス。
              </p>
            </div>
            <ul className="footer-links">
              <li>
                <a
                  href="https://uit-fukuoka-career-counseling-1.jimdosite.com/%E6%A6%82%E8%A6%81/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  会社概要
                </a>
              </li>
              <li>
                <a
                  href="https://uit-fukuoka-career-counseling-1.jimdosite.com/%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="https://note.com/kuni_cc0702"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  note
                </a>
              </li>
              <li>
                <Link href="/#form">無料相談</Link>
              </li>
            </ul>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: '#475569' }}>
            © UIT-Fukuoka. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Ads Conversion Tracker */}
      <ThanksTrigger />
    </div>
  );
}
