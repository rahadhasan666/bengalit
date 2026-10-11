import { useState } from 'react';
import { JuncaCTA } from './JuncaCTA';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'services',
    question: 'বেঙ্গল আইটি এজেন্সী বাংলাদেশ (Bengal IT Agency Bangladesh) কী কী সেবা প্রদান করে?',
    answer: 'বেঙ্গল আইটি এজেন্সী বাংলাদেশ ৬টি প্রধান টেকনিক্যাল সার্ভিস প্রদান করে: ১. কাস্টম ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট (WordPress, PHP, Laravel, Django, React), ২. অ্যান্ড্রয়েড ও ফ্লাটার মোবাইল অ্যাপ তৈরি, ৩. ফেসবুক পেজ রেস্ট্রিকশন ফিক্স ও বিজনেস ম্যানেজার সমাধান, ৪. সাইবার সিকিউরিটি অডিট ও ওয়েবসাইট ম্যালওয়্যার রিমুভাল, ৫. লিনাক্স VPS ও ক্লাউড সার্ভার ম্যানেজমেন্ট, এবং ৬. এআই চ্যাটবট ও কাস্টম অটোমেশন বট তৈরি।'
  },
  {
    id: 'founder-labib',
    question: 'মোঃ লাবিব মৃধা (Md Labib Mridha) কে এবং উনার সাথে সরাসরি কীভাবে যোগাযোগ করব?',
    answer: 'মোঃ লাবিব মৃধা (Md Labib Mridha) হলেন বেঙ্গল আইটি এজেন্সী বাংলাদেশের প্রতিষ্ঠাতা এবং প্রধান আইটি কনসালট্যান্ট। আপনি ওয়েবসাইটে প্রজেক্ট ফর্ম পূরণ করে, হোয়াটসঅ্যাপে (+880 1410 075921) অথবা সরাসরি ফোন ও ইমেইলের মাধ্যমে উনার সাথে প্রজেক্ট আর্কিটেকচার কনসালটেশনের জন্য যোগাযোগ করতে পারেন।'
  },
  {
    id: 'website-cost',
    question: 'বাংলাদেশে একটি প্রফেশনাল বা ই-কমার্স ওয়েবসাইট তৈরির খরচ কেমন? (Website & E-Commerce Cost BD)',
    answer: 'বেঙ্গল আইটি এজেন্সী কম খরচে প্রফেশনাল ও উচ্চমানের ওয়েবসাইট তৈরি করে। সাধারণ পোর্টফোলিও বা কর্পোরেট ওয়েবসাইটের খরচ শুরু হয় মাত্র ১০,০০০-২৫,০০০ টাকা থেকে এবং অ্যাডভান্সড কাস্টম ই-কমার্স বা লারাভেল/রিঅ্যাক্ট প্ল্যাটফর্মের খরচ ক্লায়েন্ট রিকোয়ারমেন্টস অনুযায়ী নির্ধারণ করা হয়। আমরা কোনো হিডেন চার্জ ছাড়াই হাই-স্পিড লোডিং ও ১০০% এসইও অপটিমাইজেশন নিশ্চিত করি।'
  },
  {
    id: 'tech-stack-choice',
    question: 'WordPress, Laravel, Django নাকি JavaScript (React/Node) — কোনটি আমার বিজনেসের জন্য সেরা?',
    answer: 'আপনার ব্যবসার ধরনের ওপর ভিত্তি করে সঠিক টেকনোলজি নির্বাচন করা হয়। দ্রুত কনটেন্ট ম্যানেজমেন্ট ও বাজেট-ফ্রেন্ডলি ই-কমার্সের জন্য WordPress & WooCommerce সেরা। বৃহৎ ডাটাবেস ও এন্টারপ্রাইজ সিকিউরিটির জন্য PHP Laravel অথবা Python Django আদর্শ। আর হাই-স্পিড ডায়নামিক ওয়েব অ্যাপ্লিকেশন ও ইন্টারেক্টিভ ড্যাশবোর্ডের জন্য React এবং Node.js সবচেয়ে কার্যকরী।'
  },
  {
    id: 'app-development',
    question: 'মোবাইল অ্যাপ তৈরি করার উপায় ও খরচ কেমন? (Android & Flutter App Development BD)',
    answer: 'আমরা গুগল ফ্লাটার (Flutter) ফ্রেমওয়ার্ক ব্যবহার করে সিঙ্গেল কোডবেসে অ্যান্ড্রয়েড এবং আইওএস উভয় প্ল্যাটফর্মের জন্য 60-120 FPS গতির প্রিমিয়াম অ্যাপ তৈরি করি। সাধারণ বিজনেস অ্যাপের খরচ ২০,০০০-৫০,০০০ টাকা থেকে শুরু হয় এবং কমপ্লেক্স কাস্টম আর্কিটেকচারের ক্ষেত্রে নির্দিষ্ট ফিচার অনুযায়ী মাইলস্টোন নির্ধারণ করা হয়।'
  },
  {
    id: 'facebook-support',
    question: 'ফেসবুক পেজ রেস্ট্রিকশন, আইডি রিকভারি ও বিজনেস ম্যানেজার সমস্যার সমাধান কীভাবে করেন?',
    answer: 'বেঙ্গল আইটি এজেন্সির স্পেশালাইজড টিম ফেসবুকের মেটা পলিসি ও এআই অ্যালগরিদম বিশ্লেষণ করে অফিসিয়াল মেটা সাপোর্ট চ্যানেলের মাধ্যমে পেজ রেস্ট্রিকশন সমাধান, ডিজেবলড অ্যাড অ্যাকাউন্ট পুনরুদ্ধার, বিজনেস ম্যানেজার আনলক এবং হ্যাকড ফেসবুক প্রোফাইল সিকিউরিটি রিকভারি সেবা প্রদান করে।'
  },
  {
    id: 'cyber-security',
    question: 'সাইবার সিকিউরিটি অডিট, ওয়েবসাইট ম্যালওয়্যার রিমুভাল ও হ্যাক রিকভারি কীভাবে কাজ করে?',
    answer: 'আমাদের সার্টিফায়েড এথিক্যাল হ্যাকার টিম তাৎক্ষণিক ইনফেক্টেড সাইটের ম্যালওয়্যার ক্লিনআপ, ব্যাকডোর ও শেল কোড রিমুভাল, গুগল ব্ল্যাকলিস্ট ফিক্স এবং ডাটাবেস স্যানিটাইজ করে। এরপর OWASP স্ট্যান্ডার্ড অনুযায়ী লিনাক্স সার্ভার হার্ডেনিং ও ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) ফায়ারওয়াল কনফিগার করে সম্পূর্ণ সুরক্ষিত করে দেয়।'
  },
  {
    id: 'vps-ai-bots',
    question: 'লিনাক্স VPS সার্ভার সেটআপ এবং এআই চ্যাটবট অটোমেশনের সুবিধা কী?',
    answer: 'শেয়ার্ড হোস্টিংয়ের তুলনায় লিনাক্স VPS সার্ভার ১০০% দ্রুত ও সুরক্ষিত। আমরা Nginx, cPanel/WHM, SSL এবং ডকার কনফিগার করে দিই। এছাড়া পাইথন ও আধুনিক এআই মডেল ইন্টিগ্রেট করে টেলিগ্রাম ও মেসেঞ্জার বট তৈরি করি, যা ২৪/৭ আপনার গ্রাহকদের স্বয়ংক্রিয় উত্তর দিতে ও লিড সংগ্রহ করতে পারে।'
  }
];

export default function JuncaFAQ() {
  const [openId, setOpenId] = useState<string | null>('services');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="faqsec container-junca" id="faq">
      <div className="faqsec__grid">
        {/* Left Column: Editorial Headline & Quick Contact */}
        <div className="faqsec__left">
          <p className="eyebrow dot-label">Questions & Clarifications</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--fg)] leading-[1.05]">
            Frequently asked questions.
          </h2>

          <div className="faqsec__keep mt-2">
            <span className="faqsec__dot" aria-hidden="true" />
            <span className="text-sm md:text-base text-[var(--fg-2)]">
              Got a specific requirement? Talk directly to our lead engineers.
            </span>
          </div>

          <div className="pt-4">
            <JuncaCTA
              href="https://wa.me/8801410075921?text=Hello%20Bengal%20IT%20Agency%2C%20I%20have%20a%20question%20about%20your%20services"
              label="Talk via WhatsApp"
              width="260px"
              variant="default"
              external
            />
          </div>
        </div>

        {/* Right Column: Swiss Minimalist Details Accordion */}
        <div className="faq" role="region" aria-label="Frequently Asked Questions">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq__item ${isOpen ? 'is-open' : ''}`}
              >
                <div
                  className="faq__q"
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <h3 className="faq__title font-heading">
                    {item.question}
                  </h3>
                  <span className="faq__icon" aria-hidden="true" />
                </div>

                <div
                  id={`faq-answer-${item.id}`}
                  className="faq__a"
                  role="region"
                >
                  <div className="faq__a-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
