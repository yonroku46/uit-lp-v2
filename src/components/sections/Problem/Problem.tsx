import { CheckCircle2 } from 'lucide-react';
import styles from './Problem.module.scss';

const problems = [
  '今の会社で成長できるか不安を感じている',
  'このまま今の仕事を続けていて、将来が見えない',
  '今後のキャリアの方向性を一度しっかり整理したい',
  '福岡で働きたいが、現地のリアルな情報が足りない',
  '転職すべきか、今の会社に残るべきか迷っている',
];

export default function Problem() {
  return (
    <section className={styles.problem} id="problem">
      <div className={styles.problem__inner}>
        <div className={styles.problem__content}>
          <header className={styles.problem__header}>
            <h2 className={styles.problem__heading}>
              エンジニアとして、
              <br />
              <span className={styles.problem__headingAccent}>こんな悩みはありませんか？</span>
            </h2>
          </header>

          <ul className={styles.problem__list}>
            {problems.map((text, idx) => (
              <li key={idx} className={styles.problem__item}>
                <CheckCircle2 className={styles.problem__icon} size={24} />
                <span className={styles.problem__text}>{text}</span>
              </li>
            ))}
          </ul>

          <div className={styles.problem__message}>
            <p>
              一つでも当てはまるなら、
              <br />
              <span>キャリア相談を始めるタイミング</span>かもしれません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
