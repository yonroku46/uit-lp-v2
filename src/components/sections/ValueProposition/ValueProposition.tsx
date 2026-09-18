import {
  ArrowRightLeft,
  MapPin,
  BadgePercent,
  Plane,
  Monitor,
  Handshake,
} from 'lucide-react';
import Image from 'next/image';
import styles from './ValueProposition.module.scss';

interface ValueItem {
  Icon: any;
  title: string;
  note?: string;
  image: string;
  description: string;
}

const values: ValueItem[] = [
  {
    Icon: ArrowRightLeft,
    title: '転職前提ナシ',
    image: '/images/value-counseling.png',
    description:
      'まずはあなたの現状を整理するところから。「転職すべきか？」から一緒に考えます。焦りや不安を取り除き、自分らしいキャリアを設計するサポートをします。',
  },
  {
    Icon: MapPin,
    title: '福岡IT市場に特化',
    image: '/images/value-fukuoka.png',
    description:
      '福岡の主要IT企業の社風・技術スタック・年収レンジを熟知したカウンセラーが対応。地域密着ならではの生きた情報を提供します。',
  },
  {
    Icon: BadgePercent,
    title: '初回90分、完全無料',
    note: '条件付きでその後もフォロー有り',
    image: '/images/value-online.png',
    description:
      '初回のキャリア相談は費用不要です。また今すぐでなくても将来的に転職も視野にある方は人材登録して頂くことで、キャリア相談は無料で続けることが可能です。あなたの味方として最後まで伴走します。'
  },
  {
    Icon: Plane,
    title: 'UIターン歓迎',
    image: '/images/value-uiturn.png',
    description:
      '他県から福岡へのUIターン希望者も大歓迎。移住に伴う不安や、リモートワーク事情など、生活面の疑問にも丁寧に答えます。',
  },
  {
    Icon: Monitor,
    title: '完全オンライン対応',
    image: '/images/value-zoom.png',
    description:
      '全国どこからでもZoomで相談可能。夜間・週末の相談枠も用意しています。気軽に相談を始められます。',
  },
  {
    Icon: Handshake,
    title: '長期的なパートナー',
    image: '/images/value-handshake.png',
    description:
      '転職後も継続的にフォローアップ。新しい職場に馴染むまで、キャリアの壁にぶつかったときも, いつでも相談できる関係を目指します。',
  },
];

export default function ValueProposition() {
  return (
    <section className={styles.value} id="value" aria-labelledby="value-heading">
      <div className={styles.value__inner}>
        <header className={styles.value__header}>
          <p className={styles.value__label}>WHY UIT-FUKUOKA</p>
          <h2 className={styles.value__heading} id="value-heading">
            選ばれる理由が、
            <span className={styles.value__headingAccent}>ここにある。</span>
          </h2>
          <p className={styles.value__desc}>
            エンジニアのキャリアに向き合い続けてきた、
            私たちならではの6つの強み。
          </p>
        </header>

        <ul className={styles.value__grid} role="list">
          {values.map(({ Icon, title, note, image, description }, idx) => (
            <li key={idx} className={styles.value__card}>
              <div className={styles.value__cardImageWrapper}>
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={styles.value__cardImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.value__cardIconOverlay}>
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>
              <div className={styles.value__cardBody}>
                <h3 className={styles.value__cardTitle}>
                  {title}
                  {note && <span className={styles.value__cardNote}>※{note}</span>}
                </h3>
                <p className={styles.value__cardDesc}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
