import { 
  Users, 
  Video, 
  Search, 
} from 'lucide-react';
import styles from './Service.module.scss';

export default function Service() {
  return (
    <section className={styles.service} id="service" aria-labelledby="service-heading">
      <div className={styles.service__inner}>
        <div className={styles.service__content}>
          {/* Side: Branding & Message */}
          <div className={styles.service__brand}>
            <header className={styles.service__header}>
              <p className={styles.service__label}>SERVICE</p>
              <h2 className={styles.service__heading} id="service-heading">
                サービス内容
              </h2>
            </header>
            <div className={styles.service__message}>
              <p>
                IT エンジニアのキャリアは会社によって大きく変わります。<br/>
                しかし、忙しい日々の中で自分のキャリアを整理する時間はなかなか取れません。<br/>
                一度立ち止まって、<span className={styles.service__highlight}>あなたのキャリアを考えてみませんか。</span>
              </p>
            </div>
          </div>

          {/* Main: Detailed Data */}
          <div className={styles.service__details}>
            <div className={styles.service__section}>
              <div className={styles.service__sectionHead}>
                <Users size={18} />
                <h3>ライフキャリアカウンセリング</h3>
              </div>
              <div className={styles.service__sectionBody}>
                <div className={styles.service__infoRow}>
                  <label>対象者</label>
                  <div>
                    業務系・オープン系・WEB系のPG/SE（実務経験2年以上）
                    <div className={styles.service__inlineTags}>
                      <span>福岡へUIターン希望</span>
                      <span>福岡在住</span>
                    </div>
                  </div>
                </div>
                <div className={styles.service__infoRow}>
                  <label>その他</label>
                  <div>外国籍の方は日本語が業務上問題ないレベルの方</div>
                </div>
              </div>
            </div>

            <div className={styles.service__section}>
              <div className={styles.service__sectionHead}>
                <Video size={18} />
                <h3>面談形式・料金</h3>
              </div>
              <div className={styles.service__sectionBody}>
                <div className={styles.service__infoRow}>
                  <label>方法</label>
                  <div>オンライン（初回 90分 <span className={styles.service__accentText}>無料</span>）</div>
                </div>
                <div className={styles.service__infoRow}>
                  <label>通常料金</label>
                  <div>5,500円（税込）<small>※2回目以降 60分</small></div>
                </div>
              </div>
            </div>

            <div className={styles.service__section}>
              <div className={styles.service__sectionHead}>
                <Search size={18} />
                <h3>相談内容・企業紹介</h3>
              </div>
              <div className={styles.service__sectionBody}>
                <div className={styles.service__infoRow}>
                  <label>相談例</label>
                  <div>仕事の悩み、福岡でのキャリア設計、強みの棚卸し、目標設定など</div>
                </div>
                <div className={styles.service__infoRow}>
                  <label>企業紹介</label>
                  <div>希望者には自社開発・受託・SESなど、最適な企業を提案します</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
