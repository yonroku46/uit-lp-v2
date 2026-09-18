import {
  MessageSquare,
  Phone,
  Users,
  UserPlus,
  Building,
  FileSearch,
  Coffee,
  FileCheck,
  Briefcase,
  Flag,
} from 'lucide-react';
import styles from './Process.module.scss';

const steps = [
  {
    number: '01',
    Icon: MessageSquare,
    title: 'フォームからお問合せ',
    description: 'まずは専用フォームより、お気軽にお問い合わせください。',
  },
  {
    number: '02',
    Icon: Phone,
    title: '弊社よりご連絡',
    description: '担当者より、カウンセリング日程調整のためご連絡を差し上げます。',
  },
  {
    number: '03',
    Icon: Users,
    title: 'ライフキャリアカウンセリング',
    description: '将来の展望や現状の課題を伺います。初回相談は無料で実施しております。',
  },
  {
    number: '04',
    Icon: UserPlus,
    title: '人材登録',
    description: '将来転職を視野に入れる方は、専用フォームより人材登録を行っていただきます。その場合、キャリア相談は引き続き無料です。',
  },
  {
    number: '05',
    Icon: Building,
    title: '希望に合う求人企業の紹介',
    description: 'ご希望に合わせて最適な企業をご紹介します。※状況によりご紹介が難しい場合もございます。',
  },
  {
    number: '06',
    Icon: FileSearch,
    title: '応募検討',
    description: '紹介された求人の中から、ご自身が応募したい企業をじっくり検討いただけます。',
  },
  {
    number: '07',
    Icon: Coffee,
    title: 'カジュアル面談',
    description: '選考の前に、企業の雰囲気や仕事内容を直接聞けるカジュアルな面談をセッティングします。',
  },
  {
    number: '08',
    Icon: FileCheck,
    title: '正式応募',
    description: '求人企業に合わせた書類作成のアドバイスや、選考を通過するための面接対策を行います。',
  },
  {
    number: '09',
    Icon: Briefcase,
    title: '求人企業での選考',
    description: '書類選考や面接など、企業ごとの選考プロセスに進みます。',
  },
  {
    number: '10',
    Icon: Flag,
    title: '結果',
    description: '内定・採用条件の確認を行い、納得いただいた上での入社をサポートします。',
  },
];

export default function Process() {
  return (
    <section className={styles.process} id="process" aria-labelledby="process-heading">
      <div className={styles.process__bgAccent} aria-hidden="true" />

      <div className={styles.process__inner}>
        <header className={styles.process__header}>
          <p className={styles.process__label}>HOW IT WORKS</p>
          <h2 className={styles.process__heading} id="process-heading">
            ご利用の
            <span className={styles.process__headingAccent}>流れ</span>
          </h2>
          <p className={styles.process__desc}>
            申し込みから相談まで、最短当日対応。
            <br />
            まずは気軽なメッセージでも大歓迎です。
          </p>
        </header>

        <div className={styles.process__content}>
          <div className={styles.process__main}>
            <ol className={styles.process__list}>
              {steps.map(({ number, Icon, title, description }, idx) => (
                <li key={idx} className={styles.process__step}>
                  <div className={styles.process__stepSide}>
                    <div className={styles.process__stepIconBox}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={styles.process__stepConnector} />
                    )}
                  </div>
                  <div className={styles.process__stepInfo}>
                    <span className={styles.process__stepNumText}>STEP {number}</span>
                    <h3 className={styles.process__stepTitle}>{title}</h3>
                    {description && <p className={styles.process__stepDesc}>{description}</p>}
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.process__cta}>
              <a href="#contact" className={styles.process__ctaBtn}>
                まずは無料相談してみる →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
