'use client';

import { CheckCircle } from 'lucide-react';
import * as tracking from '@/lib/tracking';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="ヒーローセクション">
      {/* 背景レイヤー */}
      <div className={styles.hero__bg} aria-hidden="true">
        <div className={styles.hero__image} />
        <div className={styles.hero__grid} />
        <div className={styles.hero__glow} />
      </div>

      <div className={styles.hero__inner}>
        {/* Top: Identity Label */}
        <div className={styles.hero__category}>
          <span>福岡にUIターンしたい / 福岡で働きたい</span>
        </div>

        {/* Center: Large Brand & Topic */}
        <div className={styles.hero__main}>
          <div className={styles.hero__brandName}>UIT-Fukuoka</div>
        </div>

        {/* Catchcopy */}
        <h1 className={styles.hero__headline}>
          転職前提ではない<br/>
          キャリア相談所
        </h1>

        {/* Feature List (Compact Horizontal) */}
        <ul className={styles.hero__features}>
          <li>
            <CheckCircle size={16} /> IT 業界転職支援キャリアカウンセラー
          </li>
          <li>
            <CheckCircle size={16} /> 初回キャリア相談無料
          </li>
        </ul>

        {/* Closing & Action */}
        <div className={styles.hero__footer}>
          <p className={styles.hero__sub}>あなたのキャリアを一緒に考えます</p>
          <div className={styles.hero__ctas}>
            <a 
              href="#contact" 
              className={styles.hero__ctaPrimary}
              onClick={() => {
                tracking.event({ action: 'click_cta_hero', category: 'engagement', label: 'Primary CTA' });
                tracking.trackContact();
              }}
            >
              無料相談に申し込む
              <span className={styles.hero__ctaArrow} aria-hidden="true">→</span>
            </a>
            <a href="#process" className={styles.hero__ctaSecondary}>
              ご利用の流れ
            </a>
          </div>
        </div>
      </div>

      {/* スクロール誘導 */}
      <div className={styles.hero__scroll} aria-label="スクロールしてください">
        <span className={styles.hero__scrollLine} />
        <span className={styles.hero__scrollText}>Scroll</span>
      </div>
    </section>
  );
}
