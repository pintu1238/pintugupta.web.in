'use client';

import { Camera, Check, Copy, GitBranch, Link2, Mail, MapPin, Phone, Play, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { portfolioContent } from '@/data/portfolio';
import { submitContact } from '@/lib/contact';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

type FormState = { name: string; email: string; subject: string; message: string };

const initialForm: FormState = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const { identity } = portfolioContent;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const copyValue = async (label: string, value: string) => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <section className="section contactSection" id="contact">
      <SectionHeading eyebrow="Contact" title="Get In Touch" description="I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions." />
      <div className="contactGrid">
        <div className="contactDetails">
          <ScrollReveal><button className="contactCard card" onClick={() => copyValue('email', identity.email)}><span className="contactIcon"><Mail size={21} /></span><span><small>Email</small><strong>{identity.email}</strong></span><span className="copyHint">{copied === 'email' ? <Check size={17} /> : <Copy size={16} />}</span></button></ScrollReveal>
          <ScrollReveal delay={70}><button className="contactCard card" onClick={() => copyValue('phone', identity.phone)}><span className="contactIcon"><Phone size={21} /></span><span><small>Phone</small><strong>{identity.phone}</strong></span><span className="copyHint">{copied === 'phone' ? <Check size={17} /> : <Copy size={16} />}</span></button></ScrollReveal>
          <ScrollReveal delay={140}><div className="contactCard card"><span className="contactIcon"><MapPin size={21} /></span><span><small>Location</small><strong>{identity.location}</strong></span></div></ScrollReveal>
          <ScrollReveal className="socialCard card" delay={210}><h3>Connect with me</h3><div className="socialLinks"><a href="#contact" aria-label="GitHub"><GitBranch size={19} /></a><a href="#contact" aria-label="LinkedIn"><Link2 size={19} /></a><a href="#contact" aria-label="Instagram"><Camera size={19} /></a><a href="#contact" aria-label="YouTube"><Play size={19} /></a></div><p>Follow along for experiments, projects, and notes.</p></ScrollReveal>
        </div>
        <ScrollReveal className="contactFormCard card" delay={100}><div className="formHeading"><span className="infoIcon"><Send size={17} /></span><div><h3>Send me a message</h3><p>I&apos;d love to hear about your project.</p></div></div><form onSubmit={handleSubmit}><div className="formRow"><label><span>Your name*</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="A curious builder" /></label><label><span>Your email*</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label></div><label><span>Subject</span><input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="A new idea" /></label><label><span>Message*</span><textarea required rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me a little about what you are building..." /></label><button className="button buttonPrimary submitButton" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send message'} <Send size={16} /></button>{statusMessage && <p className={`formStatus ${status}`}>{statusMessage}</p>}</form></ScrollReveal>
      </div>
      <a className="quickEmail" href={`mailto:${identity.email}`}><span>Prefer a quick chat?</span><strong>Drop me an email directly →</strong></a>
    </section>
  );
}
