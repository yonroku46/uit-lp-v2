'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import * as tracking from '@/lib/tracking';
import '@/styles/home.scss';

interface FormData {
  name: string;
  email: string;
  phone: string;
  jobType: string;
  experience: string;
  message: string;
}

const jobTypes = [
  'バックエンドエンジニア',
  'Webエンジニア (フロントエンド)',
  'アプリ開発 (モバイル)',
  'フルスタックエンジニア',
  'AI・データエンジニア',
];

const experienceOptions = [
  '1年未満',
  '1〜3年',
  '3〜5年',
  '5〜10年',
  '10年以上',
];

export default function LpPage() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    jobType: '',
    experience: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = 'お名前を入力してください';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = '有効なメールアドレスを入力してください';
    if (!formData.phone.trim()) errs.phone = '電話番号を入力してください';
    if (!formData.jobType) errs.jobType = '現在の職種を選択してください';
    if (!formData.experience) errs.experience = '経験年数を選択してください';
    if (!formData.message.trim()) errs.message = 'ご相談内容を入力してください';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('sending');

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      if (!endpoint) throw new Error('APIエンドポイントが設定されていません');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sendType: 'lp',
        }),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      tracking.trackLead();
      setFormData({ name: '', email: '', phone: '', jobType: '', experience: '', message: '' });
      router.push('/thanks');
    } catch (err) {
      console.error('Submit error:', err);
      setFormStatus('error');
    }
  };

  useEffect(() => {
    // Subtle scroll reveal
    const elements = document.querySelectorAll('.reveal-item');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(elements, (el) => {
        el.classList.add('revealed');
      });
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      Array.prototype.forEach.call(elements, (el) => {
        observer.observe(el);
      });
    }
  }, []);

  return (
    <div className="lp-container">


      {/* HEADER (Responsive & Compact) */}
      <header className="header">
        <div className="wrap header-inner">
          <a href="#" className="header-brand">
            <span className="header-logo">
              <span className="logo-full">UIT-Fukuoka</span>
              <span className="logo-short">UIT</span>
            </span>
            <span className="header-subtitle">福岡のITエンジニア専門キャリア相談</span>
          </a>

          <nav className="header-nav">
            <a href="#features" className="header-nav-link">特徴</a>
            <a href="#flow" className="header-nav-link">
              <span className="nav-text-full">相談の流れ</span>
              <span className="nav-text-short">流れ</span>
            </a>
            <a href="#faq" className="header-nav-link">FAQ</a>
          </nav>

          <a href="#form" className="header-cta-btn">
            <span className="header-cta-btn-text-full">無料相談を予約する</span>
            <span className="header-cta-btn-text-short">無料相談</span>
            <ArrowRight size={12} strokeWidth={2.4} />
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="hero-title">
              <span className="keep">どこで働くかの前に、</span>
              <br />
              <span className="keep text-accent">どう生きたいか</span>
              <span className="keep">から始めよう。</span>
            </h1>

            <p className="hero-lead">
              とりあえず求人票を眺める前に、あなたのキャリアの本音を聞かせてください。
              転職先とのミスマッチをなくし、「自分はこれでいいんだ」と納得して次の道を選べるよう、福岡のITエンジニアのキャリアを徹底的に整理します。
            </p>



            <div className="hero-trust-list">
              <span className="trust-pill">初回90分 無料</span>
              <span className="trust-pill">転職前提なし</span>
              <span className="trust-pill">求人押し付けゼロ</span>
              <span className="trust-pill">オンライン対応・履歴書不要</span>
            </div>
          </div>

          {/* Right: 3D Physical Cards Showcase */}
          <div className="hero-3d-stage">


            <div className="cards-3d-grid">
              {/* Card 01: Backend */}
              <div className="card-3d">
                <div className="card-3d-head">
                  <span className="card-3d-no">#01 BACKEND</span>
                  <div className="card-3d-icon-box card-3d-icon-box--go">
                    <Image
                      src="/icons/tech/go.svg"
                      alt="Go"
                      width={22}
                      height={22}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="card-3d-title">バックエンド</div>
                <div className="card-3d-tags">
                  <span className="card-3d-tag">Go</span>
                  <span className="card-3d-tag">Python</span>
                  <span className="card-3d-tag">Java</span>
                  <span className="card-3d-tag">AWS</span>
                </div>
              </div>

              {/* Card 02: Frontend & Web */}
              <div className="card-3d">
                <div className="card-3d-head">
                  <span className="card-3d-no">#02 WEB FRONT</span>
                  <div className="card-3d-icon-box card-3d-icon-box--react">
                    <Image
                      src="/icons/tech/react.svg"
                      alt="React"
                      width={22}
                      height={22}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="card-3d-title">Webエンジニア</div>
                <div className="card-3d-tags">
                  <span className="card-3d-tag">React</span>
                  <span className="card-3d-tag">Next.js</span>
                  <span className="card-3d-tag">TypeScript</span>
                </div>
              </div>

              {/* Card 03: Mobile App */}
              <div className="card-3d">
                <div className="card-3d-head">
                  <span className="card-3d-no">#03 MOBILE APP</span>
                  <div className="card-3d-icon-box card-3d-icon-box--flutter">
                    <Image
                      src="/icons/tech/flutter.svg"
                      alt="Flutter"
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="card-3d-title">アプリ開発</div>
                <div className="card-3d-tags">
                  <span className="card-3d-tag">Flutter</span>
                  <span className="card-3d-tag">Swift</span>
                  <span className="card-3d-tag">Kotlin</span>
                </div>
              </div>

              {/* Card 04: Full Stack */}
              <div className="card-3d">
                <div className="card-3d-head">
                  <span className="card-3d-no">#04 FULL STACK</span>
                  <div className="card-3d-icon-box card-3d-icon-box--ts">
                    <Image
                      src="/icons/tech/typescript.svg"
                      alt="TypeScript"
                      width={21}
                      height={21}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="card-3d-title">フルスタック</div>
                <div className="card-3d-tags">
                  <span className="card-3d-tag">Front & Back</span>
                  <span className="card-3d-tag">Cloud設計</span>
                </div>
              </div>

              {/* Card 05: AI & Data (Wide Card) */}
              <div className="card-3d card-3d--wide">
                <div className="card-3d-head">
                  <span className="card-3d-no">#05 AI & INTELLIGENCE</span>
                  <div className="card-3d-icon-box card-3d-icon-box--python">
                    <Image
                      src="/icons/tech/python.svg"
                      alt="Python"
                      width={22}
                      height={22}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="card-3d-title">AI・データ活用</div>
                <div className="card-3d-tags">
                  <span className="card-3d-tag">LLM活用</span>
                  <span className="card-3d-tag">Python</span>
                  <span className="card-3d-tag">機械学習基盤</span>
                  <span className="card-3d-tag">データ分析</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EMPATHY SECTION */}
      <section className="sec sec--slate" id="empathy">
        <div className="wrap wrap-narrow">
          <div className="sec-head reveal-item">
            <span className="sec-tag">
              エンジニアが抱える本音
            </span>
            <h2>
              <span className="keep">こんな違和感、</span>
              <span className="keep">胸の奥にフタを</span>
              <span className="keep">していませんか？</span>
            </h2>
            <p>
              毎日コードを書きながら、ふとした瞬間に頭をよぎる不安。技術が嫌いになったわけじゃない。でも、このまま今の場所で働き続けていいのだろうか——。
            </p>
          </div>

          <div className="empathy-container reveal-item">
            <div className="empathy-list">
              <div className="empathy-card empathy-bubble-card">
                <h3>
                  <span className="keep">「希望を伝えたはずなのに、</span>
                  <span className="keep">送られてくるのは</span>
                  <span className="keep">誰にでも送っているような</span>
                  <span className="keep">求人ばかり。」</span>
                </h3>
                <p>
                  知りたいのは、そこで働く人たちがどんな空気感でコードを書き、どんな想いでプロダクトを作っているのか。右から左へ流されるような転職活動に、心がすり減っていませんか？
                </p>
              </div>

              <div className="empathy-card empathy-bubble-card">
                <h3>
                  <span className="keep">「毎日忙しく開発しているのに、</span>
                  <span className="keep">『自分の本当の強み』が</span>
                  <span className="keep">何なのか分からなくなってきた。」</span>
                </h3>
                <p>
                  目の前のバグ修正や機能追加に追われ、気づけば月日だけが過ぎていく。「自分は他社で通用するレベルなのか？」誰にも相談できず、一人で焦っていませんか？
                </p>
              </div>

              <div className="empathy-card empathy-bubble-card">
                <h3>
                  <span className="keep">「転職して年収が上がっても、</span>
                  <span className="keep">開発環境や人間関係が</span>
                  <span className="keep">最悪だったらどうしよう……」</span>
                </h3>
                <p>
                  年収などの待遇面だけでなく、チームの開発文化や人間関係、技術的負債など「入社してみないと分からないブラックボックス」への恐怖。失敗したくないからこそ、最初の一歩を踏み出せない。
                </p>
              </div>

              <div className="empathy-card empathy-bubble-card">
                <h3>
                  <span className="keep">「福岡で働きたいけれど、</span>
                  <span className="keep">技術レベルや現地の内情が</span>
                  <span className="keep">見えなくて不安。」</span>
                </h3>
                <p>
                  UIターン希望者や地方在住エンジニアが直面する、現地の企業情報不足。「東京と比べて技術レベルはどうなのか」「リモートワークの比率は？」など、知りたい実態にアクセスできないもどかしさ。
                </p>
              </div>
            </div>

            <div className="empathy-msg reveal-item">
              <p>
                安心してください。あなたが悩んでいるのは、決してあなたの実力不足でも、わがままでもありません。
                <br />
                <strong>「ただ、あなたの本音を受け止め、技術現場のリアルを教えてくれる味方がいなかっただけ」</strong>です。
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* FEATURES */}
        <section className="sec sec--white" id="features">
          <div className="wrap">
            <div className="sec-head reveal-item">
              <span className="sec-tag">
                私たちの強みと特徴
              </span>
              <h2>
                <span className="keep">なぜ、ミスマッチのない</span>
                <span className="keep">納得の転職ができるのか</span>
              </h2>
              <p>
                私たちは単なる求人斡旋会社ではありません。あなた自身が「この道を選んで本当に良かった」と自信を持てるキャリアを一緒につくります。
              </p>
            </div>

            <div className="features-grid reveal-item">
              {/* Feature 1 */}
              <div className="feature-card">
                <div className="feature-img-box">
                  <Image
                    src="/images/value-counseling.png"
                    alt="本音を言語化するキャリアカウンセリング"
                    fill
                  />
                </div>
                <div className="feature-desc-box">
                  <div className="feature-badge">
                    <span className="feature-num">01</span>
                    <span className="feature-topic">本音の棚卸しと軸の言語化</span>
                  </div>
                  <h3>
                    <span className="keep">「求人紹介」から入らない。</span>
                    <br />
                    <span className="keep">まずあなたの本音を</span>
                    <span className="keep">徹底的に整理します</span>
                  </h3>
                  <p>
                    面談の最初から求人を売り込むことは絶対にありません。これまでどんな開発にワクワクし、何にストレスを感じてきたのか。仕事終わりの時間も含め、どんな生活を送りたいのか。あなたの心の奥にある「本音」を丁寧に言語化し、判断基準となる「自分軸」を明確にします。
                  </p>
                  <ul className="feature-list">
                    <li className="feature-list-item">求人の押し付け・転職の強要はゼロ</li>
                    <li className="feature-list-item">丁寧な対話を通じた強みの整理と自信の獲得</li>
                  </ul>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-card">
                <div className="feature-img-box">
                  <Image
                    src="/images/value-fukuoka.png"
                    alt="福岡のIT市場と開発組織"
                    fill
                  />
                </div>
                <div className="feature-desc-box">
                  <div className="feature-badge">
                    <span className="feature-num">02</span>
                    <span className="feature-topic">福岡現地のリアルな市場感</span>
                  </div>
                  <h3>
                    <span className="keep">福岡のIT市場・開発現場の</span>
                    <span className="keep">リアルを知り尽くしている</span>
                  </h3>
                  <p>
                    福岡の主要IT企業の社風、開発環境、技術スタック、給与レンジを長年にわたり定点観測。モダンスタックに本気で取り組める環境や、エンジニアを本当に大切にする組織の実情を踏まえて、表面的な求人票では見えない「生きた情報」を包み隠さずお伝えします。
                  </p>
                  <ul className="feature-list">
                    <li className="feature-list-item">バックエンド・Web・アプリ・AI特化の市場感</li>
                    <li className="feature-list-item">地域密着だから把握できる組織カルチャーの内情</li>
                  </ul>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-card">
                <div className="feature-img-box">
                  <Image
                    src="/images/value-zoom.png"
                    alt="オンライン相談とUIターン支援"
                    fill
                  />
                </div>
                <div className="feature-desc-box">
                  <div className="feature-badge">
                    <span className="feature-num">03</span>
                    <span className="feature-topic">人生ファーストの選択肢</span>
                  </div>
                  <h3>
                    <span className="keep">完全オンライン対応 ＆</span>
                    <br className="br-pc" />
                    <span className="keep">「転職しない選択」も大歓迎</span>
                  </h3>
                  <p>
                    関東・関西から福岡へのU・Iターン移住相談も、Zoom等で全国どこからでもご参加いただけます。さらに、キャリアを整理した結果「今は転職せず現職で実績を積む」という結論に至った場合も全力で肯定。あなたの人生にとって何がベストかを第一に伴走します。
                  </p>
                  <ul className="feature-list">
                    <li className="feature-list-item">全国どこからでも参加できるオンライン面談</li>
                    <li className="feature-list-item">現職残留やスキルアップ計画の策定もサポート</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* HOW IT WORKS */}
      <section className="sec sec--slate" id="flow">
        <div className="wrap">
          <div className="sec-head reveal-item">
            <span className="sec-tag">
              ご相談の流れ
            </span>
            <h2>
              <span className="keep">ミスマッチを防ぐ、</span>
              <span className="keep">シンプルな2つのステップ</span>
            </h2>
            <p>
              順番を変えるだけで、キャリア選択の納得感は劇的に変わります。「自分軸」ができてから、はじめて企業を見る。だから後悔しません。
            </p>
          </div>

          <div className="steps-grid reveal-item">
            <div className="step-panel">
              <span className="step-index-label">ステップ 01</span>
              <h3>
                <span className="keep">キャリアの棚卸しと</span>
                <span className="keep">「自分軸」の言語化</span>
              </h3>
              <p>
                最初に行うのは、あなた自身の言葉を引き出し、キャリアの方向性を固めることです。初回90分の面談でじっくり深掘りします。
              </p>
              <ul className="step-item-list">
                <li className="step-item">これまでの開発経験と本当の強みの再定義</li>
                <li className="step-item">開発環境や働き方でどうしても譲れない価値観</li>
                <li className="step-item">3年後・5年後にどうありたいか（仕事と生活のバランス）</li>
                <li className="step-item">「今本当に転職すべきか」の客観的な検証</li>
              </ul>
              <div className="step-result-box">
                得られる成果：「自分はこれでいいんだ」という確固たる自信と判断基準
              </div>
            </div>

            <div className="step-panel">
              <span className="step-index-label">ステップ 02</span>
              <h3>
                <span className="keep">納得のキャリア選択</span>
                <span className="keep">（厳選紹介 または 現職残留）</span>
              </h3>
              <p>
                自分軸が定まった上で、「転職が最善」と判断された場合にのみ、あなたの価値観にマッチする福岡の企業を厳選してご紹介します。
              </p>
              <ul className="step-item-list">
                <li className="step-item">あなたの軸に合致する企業だけを厳選紹介</li>
                <li className="step-item">求人票には載っていない組織カルチャーや実態の共有</li>
                <li className="step-item">面接対策・職務経歴書のブラッシュアップ支援</li>
                <li className="step-item">「転職見送り」の場合も今後のスキルロードマップを策定</li>
              </ul>
              <div className="step-result-box">
                得られる成果：入社後のミスマッチのない、納得度の高いキャリア選択
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNSELOR SECTION */}
      <section className="sec sec--white" id="counselor">
        <div className="wrap">
          <div className="sec-head reveal-item">
            <span className="sec-tag">
              相談相手について
            </span>
            <h2>話を聴くのは、こんな人間です。</h2>
            <p>
              人材業界20年・職業訓練校で8年間エンジニアを支援してきた国家資格コンサルタントが直接対応します。
            </p>
          </div>

          <div className="counselor-grid reveal-item">
            <div className="counselor-card">
              <div className="counselor-photo-wrap">
                <Image
                  src="/images/kunitake.jpg"
                  alt="キャリアカウンセラー 国武建次"
                  width={462}
                  height={480}
                  loading="lazy"
                />
              </div>
              <div className="counselor-name">国武 建次</div>
              <div className="counselor-role">キャリアカウンセラー / 福岡県久留米市在住</div>
              <div className="counselor-cert">
                国家資格キャリアコンサルタント
              </div>
            </div>

            <div className="counselor-story">
              <div className="counselor-catch">
                <span className="keep">「求人をあてがう転職ではなく、</span>
                <span className="keep">その人自身が納得できる</span>
                <span className="keep">人生の選択肢をつくりたい」</span>
              </div>
              <p>
                これまで人材業界で約20年、人と企業の架け橋として伴走してきました。直近8年間はプログラミング職業訓練校にて、ITエンジニアを目指す多くの方々のキャリアカウンセリングと企業マッチングに従事してきました。
              </p>
              <p>
                エンジニアの転職で最も悲しいのは、「こんなはずじゃなかった」という入社後のミスマッチです。それはスキル不足が原因ではなく、「自分がどう生きたいか」「何を大切にしたいか」という軸が整理されないまま、条件だけで転職先を決めてしまうことから起きます。
              </p>
              <p>
                UIT-Fukuokaでは、丁寧な1対1の対話を通じ、あなたの本質的な強みと大切にしたい価値観を徹底的に引き出します。「自分はこれでいいんだ」という確信を持って、福岡での次の一歩を踏み出せるよう全力で伴走します。
              </p>
              <div>
                <a
                  className="note-link"
                  href="https://note.com/kuni_cc0702"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>noteでエンジニアのキャリアに関するコラムを発信中</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="sec sec--slate" id="faq">
        <div className="wrap wrap-narrow">
          <div className="sec-head reveal-item">
            <span className="sec-tag">
              よくあるご質問
            </span>
            <h2>疑問や不安を解消してからご相談ください</h2>
          </div>

          <div className="faq-box reveal-item">
            <div className="faq-row">
              <div className="faq-question">
                <span className="faq-q-badge">Q</span>
                <span>転職するか決めておらず、まだ悩んでいる段階でも相談できますか？</span>
              </div>
              <p className="faq-answer">
                もちろんです。大歓迎です。「今の職場にモヤモヤしている」「自分の強みがわからない」「他社事情を聞いてみたい」という段階こそ、キャリア整理の最大の効果が出ます。無理に転職を勧めることは一切ありません。
              </p>
            </div>

            <div className="faq-row">
              <div className="faq-question">
                <span className="faq-q-badge">Q</span>
                <span>本当に費用はかかりませんか？後から請求されることはありますか？</span>
              </div>
              <p className="faq-answer">
                ご相談者様（エンジニア側）から費用をいただくことは一切ございません。初回90分の面談も含め完全無料です。有料プランの勧誘などもございませんのでご安心ください。
              </p>
            </div>

            <div className="faq-row">
              <div className="faq-question">
                <span className="faq-q-badge">Q</span>
                <span>履歴書や職務経歴書は準備する必要がありますか？</span>
              </div>
              <p className="faq-answer">
                事前の準備は一切不要です。現在のざっくりとした担当業務や使っている技術スタックについて、お話の中でお伺いしながら整理していきますので、手ぶらでお気軽にご参加ください。
              </p>
            </div>

            <div className="faq-row">
              <div className="faq-question">
                <span className="faq-q-badge">Q</span>
                <span>他県（東京・大阪など）からオンラインで面談できますか？</span>
              </div>
              <p className="faq-answer">
                はい、ZoomまたはGoogle Meet等を用いたオンライン面談に完全対応しています。現在関東や関西にお住まいで、福岡へのU・Iターン転職を検討されている方からのご相談も多数いただいております。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL FORM SECTION */}
      <section className="sec sec--dark" id="form">
        <div className="wrap wrap-narrow">
          <div className="sec-head reveal-item" style={{ textAlign: 'center' }}>
            <span className="sec-tag">
              履歴書不要・転職前提なし
            </span>
            <h2>
              まずはあなたの本音をお聞かせください
            </h2>
            <p>
              初回90分の面談で、現在の状況やこれからの理想を丁寧に言語化します。
            </p>
          </div>

          {/* Custom Interactive Consultation Form */}
          <div className="consult-form-card reveal-item">
            <form onSubmit={handleFormSubmit} noValidate>
              <div className="consult-form-grid">
                {/* お名前 */}
                <div className="consult-form-field">
                  <label htmlFor="form-name">
                    お名前 <span className="badge-required">必須</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    className={formErrors.name ? 'has-error' : ''}
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="例: 山田 太郎"
                    autoComplete="name"
                  />
                  {formErrors.name && <p className="consult-form-error">{formErrors.name}</p>}
                </div>

                {/* 電話番号 */}
                <div className="consult-form-field">
                  <label htmlFor="form-phone">
                    電話番号 <span className="badge-required">必須</span>
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    name="phone"
                    className={formErrors.phone ? 'has-error' : ''}
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="例: 090-1234-5678"
                    autoComplete="tel"
                  />
                  {formErrors.phone && <p className="consult-form-error">{formErrors.phone}</p>}
                </div>

                {/* メールアドレス */}
                <div className="consult-form-field consult-form-field--full">
                  <label htmlFor="form-email">
                    メールアドレス <span className="badge-required">必須</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    className={formErrors.email ? 'has-error' : ''}
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="例: taro@example.com"
                    autoComplete="email"
                  />
                  {formErrors.email && <p className="consult-form-error">{formErrors.email}</p>}
                </div>

                {/* 現在の職種 */}
                <div className="consult-form-field">
                  <label htmlFor="form-jobType">
                    現在の職種 <span className="badge-required">必須</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="form-jobType"
                      name="jobType"
                      className={`${!formData.jobType ? 'placeholder' : ''} ${formErrors.jobType ? 'has-error' : ''}`}
                      value={formData.jobType}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>職種を選択してください</option>
                      {jobTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.jobType && <p className="consult-form-error">{formErrors.jobType}</p>}
                </div>

                {/* 経験年数 */}
                <div className="consult-form-field">
                  <label htmlFor="form-experience">
                    経験年数 <span className="badge-required">必須</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="form-experience"
                      name="experience"
                      className={`${!formData.experience ? 'placeholder' : ''} ${formErrors.experience ? 'has-error' : ''}`}
                      value={formData.experience}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>経験年数を選択してください</option>
                      {experienceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.experience && <p className="consult-form-error">{formErrors.experience}</p>}
                </div>

                {/* お問い合わせ・ご相談内容 */}
                <div className="consult-form-field consult-form-field--full">
                  <label htmlFor="form-message">
                    ご相談内容・現状のお悩み <span className="badge-required">必須</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={4}
                    className={formErrors.message ? 'has-error' : ''}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="現状のお悩みや、話してみたいことなどを自由にお書きください。（例: 自分の適正年収や市場価値を知りたい、福岡での転職事情を聞きたい、今の会社に残るべきか迷っている 等）"
                  />
                  {formErrors.message && <p className="consult-form-error">{formErrors.message}</p>}
                </div>
              </div>

              {formStatus === 'error' && (
                <div className="consult-form-submit-error">
                  送信に失敗しました。恐れ入りますが、時間をおいて再度お試しいただくか、直接ご連絡ください。
                </div>
              )}

              <div className="consult-form-actions">
                <button
                  type="submit"
                  className="consult-form-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <span>送信中...</span>
                  ) : (
                    <>
                      <span>無料キャリア相談を申し込む</span>
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </>
                  )}
                </button>
              </div>

              <p className="consult-form-privacy">
                ※ 送信いただいた情報は、キャリア相談に関するご連絡のみに使用します。
                <br />
                許可なく第三者に提供することは一切ございません。
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                <a href="#form">無料相談</a>
              </li>
            </ul>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: '#475569' }}>
            © UIT-Fukuoka. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}