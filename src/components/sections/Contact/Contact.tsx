'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as tracking from '@/lib/tracking';
import styles from './Contact.module.scss';

interface FormData {
  name: string;
  email: string;
  phone: string;
  jobType: string;
  experience: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const jobTypes = [
  'バックエンドエンジニア',
  'モバイルエンジニア',
  'フルスタックエンジニア',
  'インフラエンジニア',
  'PM / PdM',
  'その他',
];

const experienceOptions = [
  '未経験（エンジニア目指し中）',
  '1年未満',
  '1〜3年',
  '3〜5年',
  '5〜10年',
  '10年以上',
];

export default function Contact() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    jobType: '',
    experience: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'お名前を入力してください';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = '有効なメールアドレスを入力してください';
    if (!form.phone.trim()) errs.phone = '電話番号を入力してください';
    if (!form.jobType) errs.jobType = '現在の職種を選択してください';
    if (!form.experience) errs.experience = '経験年数を選択してください';
    if (!form.message.trim()) errs.message = 'お問い合わせ内容を入力してください';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      if (!endpoint) throw new Error('APIエンドポイントが設定されていません');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sendType: "lp"
        }),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      setStatus('success');
      tracking.trackLead();
      setForm({ name: '', email: '', phone: '', jobType: '', experience: '', message: '' });
      router.push('/thanks');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };



  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
      <div className={styles.contact__inner}>
        <header className={styles.contact__header}>
          <p className={styles.contact__label}>CONTACT</p>
          <h2 className={styles.contact__heading} id="contact-heading">
            無料相談を
            <span className={styles.contact__headingAccent}>申し込む</span>
          </h2>
          <p className={styles.contact__desc}>
            まずは話を聞くだけでも大歓迎。
            <br />
            担当カウンセラーよりご連絡します。
          </p>
        </header>

        <form
          ref={formRef}
          className={styles.contact__form}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.contact__row}>
            <div className={styles.contact__field}>
              <label className={styles.contact__label} htmlFor="name">
                お名前 <span className={styles.contact__required}>必須</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${styles.contact__input} ${errors.name ? styles['contact__input--error'] : ''}`}
                value={form.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                autoComplete="name"
              />
              {errors.name && <p className={styles.contact__error}>{errors.name}</p>}
            </div>

            <div className={styles.contact__field}>
              <label className={styles.contact__label} htmlFor="phone">
                電話番号 <span className={styles.contact__required}>必須</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`${styles.contact__input} ${errors.phone ? styles['contact__input--error'] : ''}`}
                value={form.phone}
                onChange={handleChange}
                placeholder="090-0000-0000"
                autoComplete="tel"
              />
              {errors.phone && <p className={styles.contact__error}>{errors.phone}</p>}
            </div>
          </div>

          <div className={styles.contact__field}>
            <label className={styles.contact__label} htmlFor="email">
              メールアドレス <span className={styles.contact__required}>必須</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.contact__input} ${errors.email ? styles['contact__input--error'] : ''}`}
              value={form.email}
              onChange={handleChange}
              placeholder="taro@example.com"
              autoComplete="email"
            />
            {errors.email && <p className={styles.contact__error}>{errors.email}</p>}
          </div>

          <div className={styles.contact__row}>
            <div className={styles.contact__field}>
              <label className={styles.contact__label} htmlFor="jobType">
                現在の職種 <span className={styles.contact__required}>必須</span>
              </label>
              <select
                id="jobType"
                name="jobType"
                className={`${styles.contact__select} ${!form.jobType ? styles['contact__select--placeholder'] : ''} ${errors.jobType ? styles['contact__select--error'] : ''}`}
                value={form.jobType}
                onChange={handleChange}
              >
                <option value="">職種を選択してください</option>
                {jobTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.jobType && <p className={styles.contact__error}>{errors.jobType}</p>}
            </div>

            <div className={styles.contact__field}>
              <label className={styles.contact__label} htmlFor="experience">
                経験年数 <span className={styles.contact__required}>必須</span>
              </label>
              <select
                id="experience"
                name="experience"
                className={`${styles.contact__select} ${!form.experience ? styles['contact__select--placeholder'] : ''} ${errors.experience ? styles['contact__select--error'] : ''}`}
                value={form.experience}
                onChange={handleChange}
              >
                <option value="">経験年数を選択してください</option>
                {experienceOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.experience && <p className={styles.contact__error}>{errors.experience}</p>}
            </div>
          </div>

          <div className={styles.contact__field}>
            <label className={styles.contact__label} htmlFor="message">
              お問い合わせ内容 <span className={styles.contact__required}>必須</span>
            </label>
            <textarea
              id="message"
              name="message"
              className={`${styles.contact__textarea} ${errors.message ? styles['contact__textarea--error'] : ''}`}
              value={form.message}
              onChange={handleChange}
              placeholder="現状のお悩みや、相談したい内容を自由にお書きください。"
              rows={5}
            />
            {errors.message && <p className={styles.contact__error}>{errors.message}</p>}
          </div>

          {status === 'error' && (
            <p className={styles.contact__submitError}>
              送信に失敗しました。しばらくしてから再度お試しください。
            </p>
          )}

          <button
            type="submit"
            className={styles.contact__submit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? '送信中...' : '無料相談を申し込む →'}
          </button>

          <p className={styles.contact__privacy}>
            送信いただいた情報は、ご相談対応のみに使用します。第三者への提供は行いません。
          </p>
        </form>
      </div>
    </section>
  );
}
