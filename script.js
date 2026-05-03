async function loadWhatsAppLink() {
  let fallback = 'https://wa.me/10000000000';

  try {
    const res = await fetch('/.env', { cache: 'no-store' });
    if (!res.ok) throw new Error('No .env found');

    const envText = await res.text();
    const match = envText.match(/^WHATSAPP_LINK=(.*)$/m);
    if (match && match[1]) {
      fallback = match[1].trim().replace(/^['"]|['"]$/g, '');
    }
  } catch (_e) {
    console.warn('Using fallback WhatsApp link. Add WHATSAPP_LINK to .env');
  }

  document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
    el.setAttribute('href', fallback);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noreferrer');
  });
}

loadWhatsAppLink();
