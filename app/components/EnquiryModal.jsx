'use client';

// app/components/EnquiryModal.js
//
// The on-page form that replaces a mailto: link. Submits to
// app/api/enquiry/route.js, which resolves the recipient server-side -
// this component never knows the real address either, only the
// `recipient` key and the display name it was given for the heading.
//
// npm install (no extra package for Turnstile - loaded via <script>, per
// Cloudflare's own guidance for the non-React integration).
//
// Rendered via a portal into document.body rather than inline: every usage
// so far places <EnquiryButton> inside a <p> (contact details read as
// flowing text), and this component's own markup - <h2>, nested <div>s,
// a <form> - is invalid as a descendant of <p>. Portalling out to <body>
// sidesteps that regardless of where the trigger sits, which also happens
// to be the normal way to build a modal (no ancestor's overflow/z-index
// clipping it).

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Script from 'next/script';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function EnquiryModal({ recipient, contactName, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [scriptReady, setScriptReady] = useState(false);

  const dialogRef = useRef(null);
  const widgetRef = useRef(null);
  const turnstileIdRef = useRef(null);
  const headingId = useId();

  // Close on Escape, and return focus to the trigger button on unmount.
  useEffect(() => {
    const triggerEl = document.activeElement;
    dialogRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      triggerEl?.focus?.();
    };
  }, [onClose]);

  // Render the Turnstile widget once the script has loaded.
  useEffect(() => {
    if (!scriptReady || !widgetRef.current || turnstileIdRef.current) return;
    if (!window.turnstile) return;
    turnstileIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    });
    return () => {
      if (turnstileIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileIdRef.current);
        turnstileIdRef.current = null;
      }
    };
  }, [scriptReady]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.target;
    const payload = {
      recipient,
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      company: form.company.value, // honeypot
      turnstileToken,
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
      // Turnstile tokens are single-use - reset the widget so a retry works.
      if (turnstileIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileIdRef.current);
        setTurnstileToken('');
      }
    }
  }

  // Only ever mounted client-side (EnquiryButton renders it after a click),
  // but guard anyway rather than assume document exists.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={() => setScriptReady(true)}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 focus:outline-none"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 id={headingId} className="text-xl font-bold text-[#2d5f4f]">
            {status === 'success' ? 'Message sent' : `Send ${contactName} a message`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div>
            <p className="text-gray-700 mb-6">
              Thanks - your message has been sent to {contactName}. They'll get back to you as soon as they can.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#2d5f4f] text-white font-semibold rounded-lg py-2.5 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              />
              <p className="text-xs text-gray-500 mt-1">So {contactName} can reply directly to you.</p>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                maxLength={2000}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              />
            </div>

            {/*
              Honeypot field: invisible to sighted users (off-screen, not
              display:none - some bots skip hidden fields entirely) and
              skipped by screen readers. Left blank by real visitors;
              anything landing here gets silently dropped server-side.
            */}
            <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Leave this field blank</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div ref={widgetRef} className="mb-4" />

            {status === 'error' && (
              <p role="alert" className="text-sm text-red-700 mb-4">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || !turnstileToken}
              className="w-full bg-[#2d5f4f] text-white font-semibold rounded-lg py-2.5 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
