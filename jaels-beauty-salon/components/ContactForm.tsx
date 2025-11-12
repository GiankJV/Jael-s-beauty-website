"use client";

import { useState } from 'react';
import { validate as validateEmail } from 'email-validator';

/**
 * Contact form that posts messages to the `/api/contact` route. It
 * validates the email field client‑side before submission. On success the
 * form clears and displays a confirmation message.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Unable to send message. Please try again later.');
        setStatus('error');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-ink/20 rounded-lg p-2 bg-white text-ink focus:outline-none focus:ring-rose focus:border-rose"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/20 rounded-lg p-2 bg-white text-ink focus:outline-none focus:ring-rose focus:border-rose"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border border-ink/20 rounded-lg p-2 bg-white text-ink focus:outline-none focus:ring-rose focus:border-rose"
          required
        ></textarea>
      </div>
      {error && <p className="text-rose text-sm">{error}</p>}
      {status === 'sent' && <p className="text-green-600 text-sm">Thank you! Your message has been sent.</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-rose text-white px-6 py-2 rounded-full shadow hover:bg-rose/90 transition disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}