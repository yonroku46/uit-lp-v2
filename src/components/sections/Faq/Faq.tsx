'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Faq.module.scss';

const faqs = [
  {
    question: 'ライフキャリアカウンセリングの料金について',
    answer: '初回は無料です。【通常料金 5,500 円（税込）（初回 90 分、2 回目以降 60 分）】\nただし、人材登録をして頂くことで、次回以降の料金は発生いたしません。',
  },
  {
    question: '転職エージェントですか',
    answer: 'キャリアカウンセリング型エージェントです。',
  },
  {
    question: '何が違いますか',
    answer:
      '求人斡旋を主に考えていません。あなたの仕事の目的目標を鮮明にすることを第一に考えています。そのうえで転職希望の方へは求人斡旋を行います。ライフキャリアカウンセリングをせずに求人企業を紹介することはありません。',
  },
  {
    question: 'ライフキャリアカウンセリングを先に行うのはなぜですか',
    answer: '転職のミスマッチを減らすためです。',
  },
  {
    question: 'ライフキャリアカウンセリングを行うことでミスマッチを減らせますか',
    answer:
      '自分軸が不明確で表面上の条件だけで焦って応募するよりは、自分の軸を探して本質的に得たいものを明確にしたうえで応募したほうが転職後の幸福度は上がると考えています。',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-heading">
      <div className={styles.faq__inner}>
        <header className={styles.faq__header}>
          <p className={styles.faq__label}>FAQ</p>
          <h2 className={styles.faq__heading} id="faq-heading">
            よくある
            <span className={styles.faq__headingAccent}>ご質問</span>
          </h2>
        </header>

        <dl className={styles.faq__list}>
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`${styles.faq__item} ${isOpen ? styles['faq__item--open'] : ''}`}
              >
                <dt>
                  <button
                    className={styles.faq__question}
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <div className={styles.faq__questionContent}>
                      <span className={styles.faq__number}>{String(idx + 1).padStart(2, '0')}</span>
                      <span className={styles.faq__questionText}>{item.question}</span>
                    </div>
                    <span className={styles.faq__icon} aria-hidden="true">
                      <ChevronDown size={20} strokeWidth={2} />
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={styles.faq__answer}
                  hidden={!isOpen}
                >
                  <p className={styles.faq__answerText}>{item.answer}</p>
                </dd>
              </div>
            );
          })}
        </dl>

      </div>
    </section>
  );
}
