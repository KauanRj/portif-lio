// ============================
// Tema claro/escuro
// ============================
const toggle = document.getElementById('toggle-theme');
const rootBody = document.body;
toggle.addEventListener('click', () => {
  rootBody.classList.toggle('dark');
  toggle.setAttribute('aria-pressed', rootBody.classList.contains('dark'));
  localStorage.setItem('theme', rootBody.classList.contains('dark') ? 'dark' : 'light');
});
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    rootBody.classList.add('dark');
    toggle.setAttribute('aria-pressed', 'true');
  }
});

// ============================
// Menu links: mostrar apenas seção clicada
// ============================
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    sections.forEach(sec => sec.style.display = 'none');
    const targetSection = document.getElementById(targetId);
    if(targetSection) targetSection.style.display = 'block';
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    if(targetId === 'habilidades') animateCirclesOnce();
  });
});

// Inicializa mostrando apenas a seção Início
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach(sec => sec.style.display = 'none');
  const inicio = document.getElementById('inicio');
  if(inicio) inicio.style.display = 'block';
});

// ============================
// Canvas pixel (binário)
// ============================
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
let W = innerWidth, H = innerHeight;
const P = 12;
let cols = [];

function resizeCanvas(){
  W = innerWidth; H = innerHeight; canvas.width = W; canvas.height = H;
  cols = new Array(Math.floor(W / P)).fill(0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
ctx.font = `${P}px monospace`;

function drawPixels(){
  ctx.fillStyle = rootBody.classList.contains('dark') ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.88)';
  ctx.fillRect(0,0,W,H);
  ctx.fillStyle = rootBody.classList.contains('dark') ? '#3399ff' : '#0047b3';
  for(let i=0;i<cols.length;i++){
    const x = i * P;
    const y = cols[i] * P;
    const char = Math.random() > 0.5 ? '0' : '1';
    ctx.fillText(char, x, y);
    if(y > H && Math.random() > 0.975) cols[i] = 0;
    else cols[i]++;
  }
  requestAnimationFrame(drawPixels);
}
drawPixels();

// ============================
// Circles animation
// ============================

function animateCirclesOnce(){
  if(circlesAnimated) return;
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle=>{
    const target = Number(circle.dataset.percent || 0);
    let current = 0;
    const step = Math.max(1, Math.round(target / 30));
    const interval = setInterval(()=>{
      current += step;
      if(current >= target) current = target;
      const deg = current * 3.6;
      circle.style.background = `conic-gradient(var(--btn-bg) ${deg}deg, #ddd ${deg}deg 360deg)`;
      const label = circle.querySelector('.percent');
      if(label) label.textContent = current + '%';
      if(current >= target) clearInterval(interval);
    }, 12 + Math.random()*30);
  });
  circlesAnimated = true;
}

// ============================
// Contact form
// ============================
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = contactForm.nome.value.trim();
    const email = contactForm.email.value.trim();
    const mensagem = contactForm.mensagem.value.trim();
    if(nome && email && mensagem){
      alert(`Mensagem enviada!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`);
      contactForm.reset();
    }
  });
}
// Mostrar só a seção clicada

const habilidadesList = document.querySelectorAll('#habilidades .tab-content');
const projetosList = document.querySelectorAll('#projetos .tab-content');

function hideAllSections(){
  document.querySelectorAll('section').forEach(sec => sec.style.display='none');
}
function showSection(id){
  hideAllSections();
  const sec = document.getElementById(id);
  if(sec) sec.style.display='block';
}

// Inicializa com Início visível
showSection('inicio');

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').replace('#','');
    showSection(target);
    menuLinks.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');

    // Animar círculos ao abrir habilidades
    if(target === 'habilidades') animateCirclesOnce();
  });
});

// Função para animar os círculos
let circlesAnimated = false;
function animateCirclesOnce(){
  if(circlesAnimated) return;
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle=>{
    const target = Number(circle.dataset.percent || 0);
    let current = 0;
    const step = Math.max(1, Math.round(target/30));
    const interval = setInterval(()=>{
      current += step;
      if(current>=target) current=target;
      const deg = current*3.6;
      circle.style.background = `conic-gradient(var(--btn-bg) ${deg}deg, #ddd ${deg}deg 360deg)`;
      const label = circle.querySelector('.percent');
      if(label) label.textContent = current + '%';
      if(current>=target) clearInterval(interval);
    },12 + Math.random()*30);
  });
  circlesAnimated = true;
}
