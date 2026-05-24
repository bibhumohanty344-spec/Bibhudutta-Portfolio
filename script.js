// CURSOR
const cur = document.getElementById('cur'), curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// 3D CARD TILT
function addTilt(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rx2 = ((y - cy) / cy) * -10, ry2 = ((x - cx) / cx) * 12;
    el.style.transform = `rotateX(${rx2}deg) rotateY(${ry2}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
}
addTilt('hmsCard');
addTilt('scanCard');

// HMS FLOATING DOTS
const dotsContainer = document.getElementById('hmsDots');
for (let i = 0; i < 12; i++) {
  const d = document.createElement('div');
  d.className = 'hms-dot';
  const angle = Math.random() * 360, dist = 40 + Math.random() * 90;
  const x = Math.cos(angle * Math.PI / 180) * dist + 50;
  const y = Math.sin(angle * Math.PI / 180) * dist + 50;
  d.style.cssText = `left:${x}%;top:${y}%;animation:blink ${1 + Math.random() * 2}s ${Math.random() * 2}s infinite;`;
  dotsContainer.appendChild(d);
}

// QR GRID
const qrPattern = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
  0, 1, 0, 1, 0, 1, 0,
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1
];
const qg = document.getElementById('qrGrid');
qrPattern.forEach(v => {
  const c = document.createElement('div');
  c.className = 'qr-cell ' + (v ? 'qr-d' : 'qr-l');
  qg.appendChild(c);
});

// FLOATING COINS
const coinsEl = document.getElementById('coins');
const coinSymbols = ['₹', '💳', '✓', '⚡'];
function spawnCoin() {
  const c = document.createElement('div');
  c.className = 'coin';
  c.textContent = coinSymbols[Math.floor(Math.random() * coinSymbols.length)];
  c.style.cssText = `left:${20 + Math.random() * 60}%;bottom:10%;animation-duration:${2 + Math.random() * 2}s;animation-delay:${Math.random() * 1}s;`;
  coinsEl.appendChild(c);
  setTimeout(() => c.remove(), 4000);
}
setInterval(spawnCoin, 800);

// CLOCK
function tick() {
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const h = String(ist.getHours()).padStart(2, '0');
  const m = String(ist.getMinutes()).padStart(2, '0');
  const s = String(ist.getSeconds()).padStart(2, '0');
  const el = document.getElementById('clk');
  if (el) el.textContent = h + ':' + m + ':' + s + ' IST';
}
tick();
setInterval(tick, 1000);

// FORM — EmailJS
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('formBtn');

  btn.textContent = 'SENDING...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  emailjs.sendForm('service_fs9ce3b', 'template_dqdkzcw', e.target)
    .then(() => {
      btn.textContent = '✓ SENT!';
      btn.style.background = '#4ade80';
      btn.style.color = '#0a0a14';
      btn.style.opacity = '1';
      btn.disabled = false;
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      btn.textContent = '✗ FAILED — TRY AGAIN';
      btn.style.background = '#f87171';
      btn.style.color = '#0a0a14';
      btn.style.opacity = '1';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
}