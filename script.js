lucide.createIcons();

// ── LOADER ──────────────────────────────────────────
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  if (fill) fill.style.width = '100%';
  setTimeout(() => document.getElementById('loader').classList.add('out'), 1700);
});

// ── CUSTOM CURSOR ────────────────────────────────────
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('grow'); ring.classList.add('grow'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('grow'); ring.classList.remove('grow'); });
});

// ── BACK TO TOP ──────────────────────────────────────
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 400);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── INTERSECTION OBSERVER (reveal + bars + counters) ─
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.count').forEach(animCount);
    e.target.querySelectorAll('.prof-fill').forEach(b => b.style.width = b.dataset.w + '%');
    observer.unobserve(e.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .proficiency, .skills-wrap').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ────────────────────────────────
function animCount(el) {
  const target = +el.dataset.to;
  const dur    = 1600;
  const start  = performance.now();
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target);
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}

// ── CV BUTTON ────────────────────────────────────────
const cvBtn = document.getElementById('cvBtn');
if (cvBtn) cvBtn.addEventListener('click', e => {
  e.preventDefault();
  alert('CV will be available for download soon!');
});

// ── CONTACT FORM ─────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const formData = {
    access_key: "e746422e-b9fc-4dbe-bf1c-173711b07572",
    name: document.getElementById('cname').value,
    email: document.getElementById('cemail').value,
    subject: document.getElementById('csubject').value,
    message: document.getElementById('cmessage').value
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const formOk = document.getElementById('formOk');
      formOk.classList.add('show');
      this.reset();
      setTimeout(() => formOk.classList.remove('show'), 5000);
    } else {
      alert("Something went wrong! Please try again.");
    }
  } catch (error) {
    alert("An error occurred while sending the message.");
  } finally {
    btn.innerHTML = 'Send Message <i data-lucide="send"></i>';
    btn.disabled = false;
    lucide.createIcons();
  }
});

// ── ACTIVE BOTTOM-NAV LINK ON SCROLL ─────────────────
const sections = document.querySelectorAll('section[id]');
const hbnLinks  = document.querySelectorAll('.hbn-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  hbnLinks.forEach(a => {
    a.style.opacity = (a.getAttribute('href') === '#' + current) ? '1' : '0.55';
    a.style.fontWeight = (a.getAttribute('href') === '#' + current) ? '700' : '500';
  });
});
