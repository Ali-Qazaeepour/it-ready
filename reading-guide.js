const languageButton = document.getElementById('localeBtn');
let language = 'en';
try {
  language = localStorage.getItem('itready_language') === 'fa' ? 'fa' : 'en';
} catch {}

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-fa]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('img[data-alt-en][data-alt-fa]').forEach(image => {
    image.alt = language === 'fa' ? image.dataset.altFa : image.dataset.altEn;
  });
  document.querySelectorAll('.zoom-hit').forEach(button => {
    button.setAttribute('aria-label', language === 'fa' ? 'بزرگ‌نمایی تصویر' : 'Enlarge screenshot');
  });
  languageButton.textContent = language === 'en' ? 'فارسی' : 'English';
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Farsi' : 'Switch to English');
}

languageButton.addEventListener('click', () => {
  language = language === 'en' ? 'fa' : 'en';
  applyLanguage();
  try { localStorage.setItem('itready_language', language); } catch {}
});

let zoomLayer = null;

function closeZoom() {
  if (!zoomLayer) return;
  zoomLayer.remove();
  zoomLayer = null;
}

function openZoom(image) {
  if (!image.naturalWidth) return;
  closeZoom();
  const layer = document.createElement('div');
  layer.className = 'zoom-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', language === 'fa' ? 'نمای بزرگ تصویر' : 'Enlarged screenshot');
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  canvas.getContext('2d').drawImage(image, 0, 0);
  const maxW = window.innerWidth * 0.94;
  const maxH = window.innerHeight * 0.9;
  const scale = Math.min(maxW / image.naturalWidth, maxH / image.naturalHeight);
  canvas.style.width = Math.round(image.naturalWidth * scale) + 'px';
  canvas.style.height = Math.round(image.naturalHeight * scale) + 'px';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'zoom-close';
  close.textContent = '×';
  close.setAttribute('aria-label', language === 'fa' ? 'بستن' : 'Close');
  layer.append(canvas, close);
  layer.addEventListener('click', event => {
    if (event.target !== canvas) closeZoom();
  });
  layer.addEventListener('contextmenu', event => event.preventDefault());
  zoomLayer = layer;
  document.body.appendChild(layer);
  close.focus();
}

document.querySelectorAll('.document figure').forEach(figure => {
  const image = figure.querySelector('img');
  if (!image) return;
  image.draggable = false;
  image.addEventListener('dragstart', event => event.preventDefault());
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'zoom-hit';
  figure.appendChild(button);
  button.addEventListener('click', () => openZoom(image));
  figure.addEventListener('contextmenu', event => event.preventDefault());
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeZoom();
});

applyLanguage();
