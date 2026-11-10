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
  languageButton.textContent = language === 'en' ? 'فارسی' : 'English';
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Farsi' : 'Switch to English');
}

languageButton.addEventListener('click', () => {
  language = language === 'en' ? 'fa' : 'en';
  applyLanguage();
  try { localStorage.setItem('itready_language', language); } catch {}
});
applyLanguage();
