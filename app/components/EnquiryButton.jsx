'use client';

// app/components/EnquiryButton.js
//
// Drop-in replacement for a raw `mailto:` link. Renders as a button styled
// to match the existing contact links, but opens the on-page enquiry form
// instead of handing the browser an address to construct a mailto: from.
//
// Deliberately does NOT accept or render the recipient's email address -
// only a `recipient` key (see lib/enquiry-recipients.js) and the human
// details safe to show publicly (name/role). That's what keeps the address
// out of both the HTML and the rendered text, so it isn't scrapeable
// either way.
//
// Usage (replacing an old <a href="mailto:..."> block):
//
//   <EnquiryButton
//     recipient="new-rider"
//     name="Janine Frost"
//     className="text-emerald-700 hover:text-emerald-800 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
//   >
//     Send a message
//   </EnquiryButton>

import { useState } from 'react';
import EnquiryModal from './EnquiryModal';

export default function EnquiryButton({ recipient, name, className, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && (
        <EnquiryModal recipient={recipient} contactName={name} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
