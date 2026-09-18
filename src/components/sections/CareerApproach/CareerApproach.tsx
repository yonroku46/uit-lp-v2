import { Target, Compass, Lightbulb, ArrowRight, ShieldCheck, TrendingUp, Briefcase } from 'lucide-react';
import styles from './CareerApproach.module.scss';

export default function CareerApproach() {
  return (
    <section className={styles.approach} id="approach" aria-label="キャリア相談のアプローチ">
      <div className={styles.approach__inner}>
        <div className={styles.approach__header}>
          <h2 className={styles.approach__title}>
            転職を前提にしない<br className={styles.approach__brMobile} />
            キャリア相談
          </h2>
          <p className={styles.approach__lead}>
            「まずは相談だけ」で大丈夫。無理な転職勧誘は一切ありません。
          </p>
        </div>

        <div className={styles.approach__grid}>
          {/* Step 1: Input */}
          <div className={styles.approach__card}>
            <div className={styles.approach__cardHeader}>
              <span className={styles.approach__stepNav}>STEP 01</span>
              <h3 className={styles.approach__cardTitle}>まずは、現状を整理します</h3>
            </div>
            <div className={styles.approach__items}>
              <div className={styles.approach__item}>
                <div className={styles.approach__iconBox}><Target size={20} /></div>
                <div>
                  <div className={styles.approach__itemLabel}>自分の強み</div>
                  <p className={styles.approach__itemDesc}>自分では気づきにくい市場価値や得意領域を可視化</p>
                </div>
              </div>
              <div className={styles.approach__item}>
                <div className={styles.approach__iconBox}><Compass size={20} /></div>
                <div>
                  <div className={styles.approach__itemLabel}>将来の方向</div>
                  <p className={styles.approach__itemDesc}>5年後、10年後を見据えたエンジニアとしての歩み方</p>
                </div>
              </div>
              <div className={styles.approach__item}>
                <div className={styles.approach__iconBox}><Lightbulb size={20} /></div>
                <div>
                  <div className={styles.approach__itemLabel}>理想の働き方</div>
                  <p className={styles.approach__itemDesc}>福岡での生活、リモートワーク、やりたい案件の整合性</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.approach__connector}>
            <ArrowRight size={32} className={styles.approach__arrow} />
          </div>

          {/* Step 2: Output */}
          <div className={styles.approach__card}>
            <div className={styles.approach__cardHeader}>
              <span className={styles.approach__stepNav}>STEP 02</span>
              <h3 className={styles.approach__cardTitle}>あなたに合った道を探します</h3>
            </div>
            <div className={styles.approach__results}>
              <div className={styles.approach__result}>
                <ShieldCheck className={styles.approach__resultIcon} />
                <div>
                  <div className={styles.approach__resultLabel}>今の会社で働く</div>
                  <p className={styles.approach__resultDesc}>今の環境を最大限活かす方法や、役割の再定義をご提案</p>
                </div>
              </div>
              <div className={styles.approach__result}>
                <TrendingUp className={styles.approach__resultIcon} />
                <div>
                  <div className={styles.approach__resultLabel}>まずはスキルアップ</div>
                  <p className={styles.approach__resultDesc}>将来の希望を実現するために必要な習得スキルを明確化</p>
                </div>
              </div>
              <div className={styles.approach__result}>
                <Briefcase className={styles.approach__resultIcon} />
                <div>
                  <div className={styles.approach__resultLabel}>転職活動を始める</div>
                  <p className={styles.approach__resultDesc}>あなたの希望と理想にマッチする優良企業をご紹介</p>
                </div>
              </div>
            </div>
            <p className={styles.approach__cardFooter}>
              整理した結果、「今のままがベスト」という結論になることも珍しくありません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
