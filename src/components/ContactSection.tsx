'use client';

import { Check, Copy, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { portfolioContent } from '@/data/portfolio';
import { submitContact } from '@/lib/contact';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import SocialIcon, { type SocialBrand } from './SocialIcon';

type FormState = { name: string; email: string; subject: string; message: string };
const initialForm: FormState = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const { identity } = portfolioContent;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const valid = Boolean(form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.message.trim());

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied('unavailable');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid || status === 'sending') return;
    setStatus('sending');
    setStatusMessage('');
    const result = await submitContact(process.env.NEXT_PUBLIC_API_URL || '', form);
    if (result.ok) {
      setStatus('success');
      setStatusMessage('Message sent. I will get back to you soon.');
      setForm(initialForm);
    } else {
      setStatus('error');
      setStatusMessage(result.message);
    }
  };

  const socials: { label: SocialBrand; href: string }[] = [
    { label: 'GitHub', href: identity.github },
    { label: 'LinkedIn', href: identity.linkedin },
    { label: 'YouTube', href: identity.youtube },
    { label: 'LeetCode', href: identity.leetcode },
  ];

  return (
    <section className="section contactSection" id="contact">
      <SectionHeading eyebrow="Contact" title="Get In Touch" description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's create something amazing together!" />
      <div className="contactGrid">
        <div className="contactDetails">
          {[{ label: 'Email', value: identity.email, icon: Mail }, { label: 'Phone', value: identity.phone, icon: Phone }].map(({ label, value, icon: Icon }, index) => (
            <ScrollReveal key={label} delay={index * 70}>
              <button className="contactCard card" onClick={() => copyValue(label, value)}>
                <span className="contactIcon"><Icon size={24} /></span>
                <span><small>{label}</small><strong>{value}</strong></span>
                <span className="copyHint" aria-live="polite">{copied === label ? <Check size={17} /> : <Copy size={16} />}<span className="copyLabel">{copied === label ? 'Copied!' : 'Click to copy'}</span></span>
              </button>
            </ScrollReveal>
          ))}
          <ScrollReveal delay={140}><a className="contactCard card" href="https://www.google.com/maps/search/?api=1&query=Ludhiana%2C%20Punjab%2C%20India" target="_blank" rel="noreferrer"><span className="contactIcon"><MapPin size={24} /></span><span><small>Location</small><strong>{identity.location}</strong></span></a></ScrollReveal>
          {copied === 'unavailable' && <p className="formStatus" role="status">Copy is unavailable. You can use the email link below.</p>}
          <ScrollReveal className="socialCard card" delay={210}>
            <h3>Connect With Me</h3>
            <div className="socialLinks">{socials.map(({ label, href }) => <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label} title={label}><SocialIcon brand={label} /></a>)}</div>
            <p>Follow me for updates and connect professionally.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal className="contactFormCard card" delay={100}>
          <div className="formHeading"><span className="infoIcon"><Send size={22} /></span><div><h3>Send Me a Message</h3><p>I&apos;d love to hear about your project</p></div></div>
          <form onSubmit={handleSubmit}>
            <div className="formRow">
              <label className="iconField"><span className="srOnly">Your name</span><User size={18} /><input required name="name" autoComplete="name" maxLength={120} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your Name *" /></label>
              <label className="iconField"><span className="srOnly">Your email</span><Mail size={18} /><input required name="email" autoComplete="email" type="email" maxLength={254} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Your Email *" /></label>
            </div>
            <label className="iconField"><span className="srOnly">Subject</span><MessageSquare size={18} /><input name="subject" maxLength={200} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Subject" /></label>
            <label><span className="srOnly">Message</span><textarea required name="message" maxLength={4000} rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Your Message *" /></label>
            <button className="button buttonPrimary submitButton" type="submit" disabled={!valid || status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={20} /></button>
            <p className="formNote">* Required fields. Email will be validated automatically.</p>
            {statusMessage && <p role="status" aria-live="polite" className={`formStatus ${status}`}>{statusMessage}</p>}
          </form>
        </ScrollReveal>
      </div>
      <a className="quickEmail" href={`mailto:${identity.email}`}><span>Prefer a quick chat?</span><strong>Drop me an email directly →</strong></a>
    </section>
  );
}
