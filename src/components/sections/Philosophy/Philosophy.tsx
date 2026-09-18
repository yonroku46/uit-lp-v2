import {
  Brain,
  Eye,
  Users2,
  HeartHandshake,
} from 'lucide-react';
import styles from './Philosophy.module.scss';

const pillars = [
  {
    icon: Brain,
    title: '目的論',
    subtitle: 'Teleology',
    description: 'すべての言動には「目的」があると考えます。不安や怒りといった感情も、何かを避けるためや自分を守るために作り出している手段かもしれません。無意識の目的に気づくことで、新しい行動の選択肢が生まれます。',
  },
  {
    icon: Eye,
    title: '認知論',
    subtitle: 'Cognitive',
    description: '人は「出来事そのもの」ではなく、その出来事への「解釈」に影響を受けています。自らの思い込みや固定観念を見直し、より建設的で前向きな捉え方に変えていく支援をします。',
  },
  {
    icon: Users2,
    title: '対人関係論',
    subtitle: 'Interpersonal Relations',
    description: '「あらゆる悩みは対人関係の悩みである」と定義します。特定の誰かを想定した言動の目的を分析し、周囲との関わり方を見つめ直すことで、本質的な問題解決を目指します。',
  },
  {
    icon: HeartHandshake,
    title: '共同体感覚',
    subtitle: 'Community Feeling',
    description: '自分が社会の一員であり、他者に貢献できると感じることこそが幸せの源泉です。自己受容・他者信頼・貢献感を高め、社会の中で価値ある存在として実感できるよう導きます。',
  },
];

export default function Philosophy() {
  return (
    <section className={styles.philosophy} id="philosophy">
      <div className={styles.philosophy__inner}>
        <header className={styles.philosophy__header}>
          <p className={styles.philosophy__label}>PHILOSOPHY</p>
          <h2 className={styles.philosophy__heading}>
            アドラー心理学を活用した
            <br />
            <span className={styles.philosophy__headingAccent}>ライフキャリアカウンセリング</span>
          </h2>
          <p className={styles.philosophy__desc}>
            単なる「仕事探し」の支援ではありません。
            <br />
            あなたの心の奥底にある本質的な価値観や目的を、アドラー心理学の視点から紐解いていきます。
          </p>
        </header>

        <div className={styles.philosophy__grid}>
          {pillars.map((pillar, idx) => (
            <div key={idx} className={styles.philosophy__card}>
              <div className={styles.philosophy__cardIcon}>
                <pillar.icon size={32} strokeWidth={1.5} />
              </div>
              <div className={styles.philosophy__cardContent}>
                <span className={styles.philosophy__cardSubtitle}>{pillar.subtitle}</span>
                <h3 className={styles.philosophy__cardTitle}>{pillar.title}</h3>
                <p className={styles.philosophy__cardDesc}>{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
