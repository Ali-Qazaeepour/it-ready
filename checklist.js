const data = JSON.parse(document.getElementById('guideData').textContent);
const byId = id => document.getElementById(id);
const antivirus = data.kind === 'defender';
const storageKey = antivirus ? 'itready_defender_screens_20261109_v3' : 'itready_outlook_steps_v1';
let state = {index: 0, answers: {}, shots: {}, locale: 'en'};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved && typeof saved === 'object') {
    state.answers = saved.answers || {};
    state.shots = saved.shots || {};
    // Old report screens used an index beyond the last real step.
    state.index = Number.isInteger(saved.index) && saved.index >= 0 && saved.index < data.steps.length ? saved.index : 0;
  }
  state.locale = localStorage.getItem('itready_language') === 'fa' ? 'fa' : 'en';
} catch {}
for (const index of Object.keys(state.answers)) {
  if (['Need IT help', "Couldn't complete"].includes(state.answers[index])) state.answers[index] = 'Could not complete';
}
const localize = (en, fa) => state.locale === 'fa' ? fa : en;
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({index:state.index, answers:state.answers, shots:state.shots}));
    localStorage.setItem('itready_language', state.locale);
  } catch {}
}
function goToStep(index) {
  state.index = index;
  save();
  render();
}
function renderImage() {
  const step = data.steps[state.index];
  const pictures = step.moreImgs || [{img:step.img, en:step.en, fa:step.fa}];
  const selected = Math.max(0, Math.min(Number(state.shots[state.index]) || 0, pictures.length - 1));
  byId('shot').src = data.images[String(pictures[selected].img)];
  byId('shot').alt = localize(pictures[selected].en, pictures[selected].fa);
  byId('imageSource').textContent = antivirus
    ? localize('Windows 11 example supplied by your team', 'تصویر نمونه ویندوز ۱۱ ارائه‌شده توسط تیم شما')
    : localize('Original guide screenshot · Page ' + step.page, 'تصویر اصلی راهنما · صفحه ' + step.page);
  byId('shotSwitch').replaceChildren();
  if (pictures.length > 1) {
    pictures.forEach((picture, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'screenshot-choice';
      button.textContent = localize(picture.en, picture.fa);
      button.setAttribute('aria-pressed', String(selected === index));
      button.onclick = () => {
        state.shots[state.index] = index;
        save();
        renderImage();
        byId('shotSwitch').children[index].focus({preventScroll:true});
      };
      byId('shotSwitch').append(button);
    });
  }
}
function render() {
  const step = data.steps[state.index];
  document.documentElement.lang = state.locale;
  byId('main').dir = state.locale === 'fa' ? 'rtl' : 'ltr';
  byId('topTitle').textContent = localize(data.title, data.faTitle);
  byId('topSubtitle').textContent = localize(data.sub, data.faSub);
  byId('localeBtn').textContent = state.locale === 'en' ? 'فارسی' : 'English';
  byId('homeLink').textContent = localize('All guides', 'همه راهنماها');
  byId('stepsLabel').textContent = localize('Choose a step', 'انتخاب مرحله');
  byId('stepCount').textContent = localize('Step ' + (state.index+1) + ' of ' + data.steps.length, 'مرحله ' + (state.index+1) + ' از ' + data.steps.length);
  byId('stepBar').replaceChildren();
  data.steps.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'step-button' + (state.answers[index] ? ' recorded' : '');
    button.textContent = index + 1;
    button.title = localize(item.en, item.fa);
    button.setAttribute('aria-label', (index + 1) + '. ' + localize(item.en, item.fa));
    if (index === state.index) button.setAttribute('aria-current', 'step');
    button.onclick = () => {
      goToStep(index);
      byId('stepBar').children[index].focus({preventScroll:true});
    };
    byId('stepBar').append(button);
  });
  byId('stepTag').textContent = localize('STEP ', 'مرحله ') + String(state.index+1).padStart(2,'0');
  byId('stepTitle').textContent = localize(step.en, step.fa);
  byId('stepAction').textContent = localize(step.action, step.faAction);
  byId('optionalNote').hidden = !step.optional;
  byId('optionalNote').textContent = localize('Optional · only if needed.', 'اختیاری · فقط در صورت نیاز.');
  byId('resultLabel').textContent = localize('Mark your result', 'نتیجه را انتخاب کنید');
  const options = [['Done','انجام شد'],['Could not complete','قابل انجام نبود']];
  if (step.optional) options.push(['Not needed','نیازی نبود']);
  byId('answers').replaceChildren();
  options.forEach(([value, fa], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.textContent = localize(value, fa);
    button.setAttribute('aria-pressed', String(state.answers[state.index] === value));
    button.onclick = () => {
      state.answers[state.index] = value;
      save();
      render();
      byId('answers').children[index].focus({preventScroll:true});
    };
    byId('answers').append(button);
  });
  byId('securityNote').hidden = !antivirus;
  byId('securityNote').textContent = localize(
    'These screenshots show example security warnings. If your PC shows warnings, contact IT. Do not change protection settings or use Fresh start.',
    'این تصاویر نمونه هشدارهای امنیتی هستند. اگر دستگاه شما هشدار دارد، با IT تماس بگیرید. تنظیمات حفاظت را تغییر ندهید و از Fresh start استفاده نکنید.'
  );
  byId('visualLabel').textContent = localize('Reference screenshot', 'تصویر راهنما');
  byId('zoomLabel').textContent = localize('Enlarge ↗', 'بزرگ‌نمایی ↗');
  byId('back').textContent = localize('← Back', 'بازگشت →');
  byId('back').disabled = state.index === 0;
  const last = state.index === data.steps.length - 1;
  byId('next').textContent = last ? localize('End of guide', 'پایان راهنما') : localize('Next →', 'بعدی ←');
  byId('next').disabled = last;
  byId('pageNote').textContent = localize('Choose any step above. Your selections are saved on this device.', 'هر مرحله را از نوار بالا انتخاب کنید. انتخاب‌های شما روی همین دستگاه ذخیره می‌شوند.');
  if (!antivirus) {
    byId('setupTopic').textContent = localize('Set up Outlook', 'راه‌اندازی Outlook');
    byId('removeTopic').textContent = localize('Remove an account', 'حذف حساب');
  }
  renderImage();
}
byId('localeBtn').onclick = () => { state.locale = state.locale === 'en' ? 'fa' : 'en'; save(); render(); };
byId('back').onclick = () => goToStep(Math.max(0,state.index - 1));
byId('next').onclick = () => goToStep(Math.min(data.steps.length - 1,state.index + 1));
byId('imageButton').onclick = () => {
  byId('largeImage').src = byId('shot').src;
  byId('largeImage').alt = byId('shot').alt;
  byId('lightbox').showModal();
};
byId('closeLight').onclick = () => byId('lightbox').close();
byId('lightbox').onclick = event => { if (event.target === byId('lightbox')) byId('lightbox').close(); };
function showTopic() {
  if (antivirus) return;
  const removing = location.hash === '#remove-account';
  byId('setupGuide').hidden = removing;
  byId('removeContent').hidden = !removing;
  byId('setupTopic').removeAttribute('aria-current');
  byId('removeTopic').removeAttribute('aria-current');
  byId(removing ? 'removeTopic' : 'setupTopic').setAttribute('aria-current','page');
}
window.addEventListener('hashchange', showTopic);
showTopic();
render();
