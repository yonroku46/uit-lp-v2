'use client';

import Image from 'next/image';
import { Award, BookOpen, UserCheck, ExternalLink } from 'lucide-react';
import * as tracking from '@/lib/tracking';
import styles from './Counselor.module.scss';

export default function Counselor() {
  return (
    <section className={styles.counselor} id="counselor">
      <div className={styles.counselor__inner}>
        <div className={styles.counselor__container}>
          {/* 画像・基本情報 */}
          <div className={styles.counselor__visual}>
            <div className={styles.counselor__imageContainer}>
              <div className={styles.counselor__imageWrapper}>
                <Image
                  src="/images/kunitake.jpg"
                  alt="ライフキャリアカウンセラー 国武 建次"
                  fill
                  className={styles.counselor__image}
                />
              </div>
            </div>
            <div className={styles.counselor__basicInfo}>
              <h3 className={styles.counselor__name}>
                国武 建次
              </h3>
              <p className={styles.counselor__birth}>1968年2月3日生 / 福岡県久留米市在住</p>
              <p className={styles.counselor__affiliation}>
                所属：
                <a href="https://www.sn-kikaku.co.jp/" target="_blank" rel="noopener noreferrer">
                  株式会社新日本企画
                </a>
              </p>
              <a
                href="https://note.com/kuni_cc0702"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.counselor__noteLink}
                onClick={() => tracking.trackViewContent('Counselor Note')}
              >
                <div className={styles.counselor__noteIconApp}>
                  <Image src="/icon/note-simple.svg" alt="note" width={14} height={14} />
                </div>
                <span>Note 書いています。こちらをクリック</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* 詳細プロフィール */}
          <div className={styles.counselor__details}>
            <header className={styles.counselor__header}>
              <p className={styles.counselor__label}>COUNSELOR</p>
              <h2 className={styles.counselor__heading}>
                あなたの「次の一歩」を
                <br />
                <span className={styles.counselor__headingAccent}>全力でサポートします。</span>
              </h2>
            </header>

            <div className={styles.counselor__bio}>
              <p>
                人材業界で約20年、企業と人材の架け橋として邁進してきました。
                直近の8年間は、プログラミング職業訓練校にて、未経験からエンジニアを志す方々へのキャリアカウンセリングに従事。
                IT業界の現場感覚と、求職者一人ひとりの不安に寄り添う姿勢を大切にしています。
              </p>
              <p>
                現在は福岡に根ざし、福岡で働きたいITエンジニアの皆様が、
                自分らしいキャリアと幸福な人生を両立できる「適材適所」の実現を目指しています。
              </p>
            </div>

            <div className={styles.counselor__qualifications}>
              <h4 className={styles.counselor__qualTitle}>
                <Award size={20} className={styles.counselor__qualIcon} />
                保有資格 / 認定
              </h4>
              <ul className={styles.counselor__qualList}>
                <li>
                  <UserCheck size={16} />
                  <span>国家資格 キャリアコンサルタント</span>
                </li>
                <li>
                  <BookOpen size={16} />
                  <span>日本アドラー心理学振興会認定 カウンセラー</span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
