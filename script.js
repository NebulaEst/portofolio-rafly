(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- storage helpers (safe) ---------- */
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- language toggle ---------- */
  var lang = get('lang') || ((navigator.language || '').indexOf('id') === 0 ? 'id' : 'en');
  var quotes = [
    ['Aku bertarung bukan karena aku ingin menang, tetapi aku bertarung karena aku harus menang.', 'Ichigo Kurosaki · Bleach'],
    ['Bagaimana kau bisa maju jika kau terus menyesali masa lalu.', 'Edward Elric · Fullmetal Alchemist'],
    ['Mimpi tidak berarti apa-apa jika kau tidak menggapainya dengan tanganmu sendiri.', 'Jin Mori · The God of High School'],
    ['Kita mungkin tidak dapat memilih bagaimana kita mati, tapi kita bisa memutuskan bagaimana kita hidup.', 'Clare · Claymore'],
    ['Mula-mula, kau harus mengubah dirimu sendiri atau tidak akan ada yang berubah untukmu.', 'Sakata Gintoki · Gintama'],
    ['Manusia itu kuat karena memiliki kemampuan untuk mengubah dirinya sendiri.', 'Saitama · One Punch Man'],
    ['Jangan khawatirkan apa yang dipikirkan orang lain. Tegakkan kepalamu dan melangkahlah ke depan.', 'Izuku Midoriya · My Hero Academia'],
    ['Selama aku masih bernapas... aku tak akan pernah menyerah.', 'Natsu Dragneel · Fairy Tail']
  ];

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-en]').forEach(function (el) {
      var t = el.getAttribute('data-' + l);
      if (t) el.textContent = t;
    });
    $('#langEn').setAttribute('aria-pressed', l === 'en');
    $('#langId').setAttribute('aria-pressed', l === 'id');
    set('lang', l);
  }
  $('#langEn').addEventListener('click', function () { applyLang('en'); });
  $('#langId').addEventListener('click', function () { applyLang('id'); });
  applyLang(lang);

  /* ---------- now spinning menu ---------- */
  var npBtn = $('#npBtn'), npPanel = $('#npPanel');
  function npToggle(open) {
    npPanel.hidden = !open;
    npBtn.setAttribute('aria-expanded', open);
  }
  npBtn.addEventListener('click', function () { npToggle(npPanel.hidden); });
  npPanel.addEventListener('click', function (e) { if (e.target.closest('a')) npToggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') npToggle(false); });
  document.addEventListener('click', function (e) {
    if (!npPanel.hidden && !npPanel.contains(e.target) && !npBtn.contains(e.target)) npToggle(false);
  });

  /* active section highlight */
  var secs = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          $$('.links a, #npList a').forEach(function (a) {
            a.classList.toggle('on', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { io.observe(s); });

    var rvIo = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rvIo.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.card,.cert,.tracks li,.rec,.quote,.paint,.sec').forEach(function (el) { el.classList.add('rv'); rvIo.observe(el); });
  }

  /* ---------- record player ---------- */
  var vinyl = $('#vinyl'), arm = $('#arm'), playBtn = $('#playBtn');
  var playing = true;
  playBtn.addEventListener('click', function () {
    playing = !playing;
    vinyl.classList.toggle('paused', !playing);
    arm.classList.toggle('up', !playing);
    playBtn.setAttribute('aria-pressed', playing);
    var s = playBtn.firstElementChild;
    s.setAttribute('data-en', playing ? 'Pause' : 'Play');
    s.setAttribute('data-id', playing ? 'Jeda' : 'Putar');
    s.textContent = s.getAttribute('data-' + lang);
  });

  /* ---------- draggable skill stickers ---------- */
  var skills = [
    ['Laravel', '#ef4444'], ['PHP', '#6366f1'], ['Python', '#2563eb'], ['JavaScript', '#ca8a04'],
    ['Dart', '#0891b2'], ['React', '#0ea5e9'], ['Git', '#ea580c'], ['Figma', '#c026d3'],
    ['Docker', '#2563eb'], ['Insomnia', '#7c3aed'], ['VS Code', '#1d4ed8'],
    ['Microservices', '#9333ea'], ['Security', '#be123c'], ['Flutter', '#0284c7']
  ];
  var board = $('#board');
  var stickers = [];
  function layout() {
    var w = board.clientWidth, h = board.clientHeight;
    stickers.forEach(function (el, i) {
      var cols = Math.max(2, Math.floor(w / 150));
      var col = i % cols, row = Math.floor(i / cols);
      var x = 16 + col * ((w - 32) / cols) + (row % 2) * 18;
      var y = 20 + row * 62;
      el.style.left = Math.min(x, w - el.offsetWidth - 8) + 'px';
      el.style.top = Math.min(y, h - el.offsetHeight - 8) + 'px';
      el.style.transform = 'rotate(' + ((i * 37) % 13 - 6) + 'deg)';
    });
  }
  skills.forEach(function (s) {
    var el = document.createElement('div');
    el.className = 'sticker';
    el.textContent = s[0];
    el.style.background = s[1];
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', s[0]);
    board.appendChild(el);
    stickers.push(el);
    var sx, sy, ox, oy, id = null;
    el.addEventListener('pointerdown', function (e) {
      id = e.pointerId; el.setPointerCapture(id);
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
      el.classList.add('drag');
      board.appendChild(el);
    });
    el.addEventListener('pointermove', function (e) {
      if (id !== e.pointerId) return;
      var nx = ox + e.clientX - sx, ny = oy + e.clientY - sy;
      nx = Math.max(0, Math.min(board.clientWidth - el.offsetWidth, nx));
      ny = Math.max(0, Math.min(board.clientHeight - el.offsetHeight, ny));
      el.style.left = nx + 'px'; el.style.top = ny + 'px';
    });
    function end(e) { if (id === e.pointerId) { id = null; el.classList.remove('drag'); } }
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  });
  layout();
  window.addEventListener('resize', layout);
  $('#resetStickers').addEventListener('click', layout);

  /* ---------- quotes ---------- */
  var qi = 0, qTimer;
  function showQuote(i) {
    qi = (i + quotes.length) % quotes.length;
    var f = $('.quote');
    $('#qText').textContent = quotes[qi][0];
    $('#qWho').textContent = '— ' + quotes[qi][1];
    $('#qCount').textContent = String(qi + 1).padStart(2, '0') + ' / ' + String(quotes.length).padStart(2, '0');
    f.classList.remove('fade'); void f.offsetWidth; f.classList.add('fade');
  }
  function auto() { clearInterval(qTimer); qTimer = setInterval(function () { showQuote(qi + 1); }, 8000); }
  $('#qPrev').addEventListener('click', function () { showQuote(qi - 1); auto(); });
  $('#qNext').addEventListener('click', function () { showQuote(qi + 1); auto(); });
  showQuote(0); auto();

  /* ---------- spray canvas ---------- */
  var cv = $('#canvas'), ctx = cv.getContext('2d');
  var colors = ['#a855f7', '#e879f9', '#c4b5fd', '#22d3ee', '#facc15', '#ffffff'];
  var color = colors[0];
  var sw = $('#swatches');
  colors.forEach(function (c, i) {
    var b = document.createElement('button');
    b.style.background = c; b.setAttribute('aria-label', 'Color ' + c);
    b.setAttribute('aria-pressed', i === 0);
    b.addEventListener('click', function () {
      color = c; $$('button', sw).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    });
    sw.appendChild(b);
  });
  var drawing = false, last = null;
  function pos(e) {
    var r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height };
  }
  function paint(p) {
    var size = +$('#size').value;
    if ($('#spray').checked) {
      for (var i = 0; i < 18; i++) {
        var a = Math.random() * Math.PI * 2, d = Math.random() * size;
        ctx.globalAlpha = 0.25 + Math.random() * 0.5;
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(p.x + Math.cos(a) * d, p.y + Math.sin(a) * d, 1.2, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else {
      ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo((last || p).x, (last || p).y); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    last = p;
  }
  cv.addEventListener('pointerdown', function (e) { drawing = true; last = null; cv.setPointerCapture(e.pointerId); paint(pos(e)); });
  cv.addEventListener('pointermove', function (e) { if (drawing) paint(pos(e)); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { cv.addEventListener(n, function () { drawing = false; last = null; }); });
  $('#clearC').addEventListener('click', function () { ctx.clearRect(0, 0, cv.width, cv.height); });
  $('#saveC').addEventListener('click', function () {
    var out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
    var c2 = out.getContext('2d'); c2.fillStyle = '#0a0414'; c2.fillRect(0, 0, out.width, out.height); c2.drawImage(cv, 0, 0);
    var a = document.createElement('a'); a.download = 'my-tag.png'; a.href = out.toDataURL('image/png'); a.click();
  });

  $('#yr').textContent = new Date().getFullYear();
})();
