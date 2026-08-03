/* 논문 페이지의 언어·밝기 전환과 인용 복사. index.html 의 동작과 같게 맞춘다. */
(function () {
  'use strict';
  var root = document.documentElement;

  var langBtn = document.getElementById('lang');
  root.setAttribute('lang', 'ko');
  langBtn.addEventListener('click', function () {
    var toEn = root.getAttribute('lang') !== 'en';
    root.setAttribute('lang', toEn ? 'en' : 'ko');
    langBtn.textContent = toEn ? 'KO' : 'EN';
  });

  var themeBtn = document.getElementById('theme');
  themeBtn.addEventListener('click', function () {
    var dark = matchMedia('(prefers-color-scheme: dark)').matches;
    var cur = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });

  var copy = document.querySelector('.copy');
  if (copy && navigator.clipboard) {
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(document.querySelector('.cite-box').textContent.trim())
        .then(function () {
          var was = copy.textContent;
          copy.textContent = '복사했습니다';
          setTimeout(function () { copy.textContent = was; }, 1600);
        });
    });
  } else if (copy) {
    copy.hidden = true;
  }
})();
