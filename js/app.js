/* ————— 剧链 DramaLink 投资人 Demo ————— */
(function () {
  const $ = (id) => document.getElementById(id);
  const C = DEMO_CONFIG;

  /* ===== 入场动画 ===== */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ===== ① 剧本开发：服装位候选选择 + 剧方确认 + 步骤推进 ===== */
  const confirmBtn = $('confirmBtn');
  let confirmed = false;

  document.querySelectorAll('.cand').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (confirmed) return;
      document.querySelectorAll('.cand').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });

  confirmBtn.addEventListener('click', () => {
    if (confirmed) return;
    confirmed = true;
    const wear = document.querySelector('.cand.on');
    confirmBtn.textContent = '✓ 已确认整集植入方案（服装位：' + wear.dataset.pick + '）';
    confirmBtn.classList.add('done');
    $('stepMatch').classList.replace('act', 'done');
    $('stepConfirm').classList.add('done');
    $('stepGen').classList.add('act');
    $('genCard').classList.add('show');
  });

  /* ===== ② AI 成片：滚动进入视口即同步循环播放 ===== */
  const rowIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const vids = e.target.querySelectorAll('video');
        if (e.isIntersecting) {
          vids.forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); });
        } else {
          vids.forEach((v) => v.pause());
        }
      });
    },
    { threshold: 0.35 }
  );
  document.querySelectorAll('.duo-row').forEach((row) => rowIO.observe(row));
  // 轻量纠偏：同组两条视频防漂移
  setInterval(() => {
    document.querySelectorAll('.duo-row').forEach((row) => {
      const [a, b] = row.querySelectorAll('video');
      if (a && b && !a.paused && Math.abs(a.currentTime - b.currentTime) > 0.08) {
        b.currentTime = a.currentTime;
      }
    });
  }, 800);

  /* ===== ③ 投流变现 ===== */
  const vidP = $('vidP'), pPlay = $('pPlay');
  const ribbon = $('brandRibbon'), dmLayer = $('dmLayer'), pcard = $('pcard');
  const toast = $('toast'), countrySwitch = $('countrySwitch');
  let firedDm = new Set();
  let cardShown = false;

  vidP.src = C.playerVideo;

  // 国家切换
  function applyCountry(code, silent) {
    const p = C.products[code];
    $('pName').textContent = p.name;
    $('pStore').textContent = p.store;
    $('pPrice').textContent = p.price;
    $('pBuy').href = p.url;
    countrySwitch.querySelectorAll('button').forEach((b) =>
      b.classList.toggle('on', b.dataset.c === code)
    );
    if (!silent) {
      toast.textContent = p.toast;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
    }
  }
  countrySwitch.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) applyCountry(btn.dataset.c);
  });
  applyCountry('us', true);

  // 弹幕
  function spawnDm(item) {
    const el = document.createElement('div');
    el.className = 'dm' + (item.hot ? ' hot' : '');
    el.textContent = item.text;
    el.style.top = 8 + Math.random() * 72 + '%';
    dmLayer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  function resetOverlays() {
    firedDm = new Set();
    cardShown = false;
    pcard.classList.remove('show');
    dmLayer.innerHTML = '';
  }

  vidP.addEventListener('timeupdate', () => {
    const t = vidP.currentTime;
    ribbon.classList.toggle('show', t >= C.badge.start && t <= C.badge.end);
    C.danmaku.forEach((d, i) => {
      if (t >= d.t && !firedDm.has(i)) { firedDm.add(i); spawnDm(d); }
    });
    if (t >= C.productAt && !cardShown) { cardShown = true; pcard.classList.add('show'); }
  });

  pPlay.addEventListener('click', () => {
    if (vidP.ended || vidP.currentTime > 0.2) { vidP.currentTime = 0; resetOverlays(); }
    vidP.play().catch(() => {});
  });
  vidP.addEventListener('play', () => pPlay.classList.add('hide'));
  vidP.addEventListener('pause', () => {
    pPlay.textContent = vidP.ended ? '↻' : '▶';
    pPlay.classList.remove('hide');
  });
  vidP.addEventListener('ended', () => {
    pPlay.textContent = '↻';
    pPlay.classList.remove('hide');
  });
  vidP.addEventListener('click', () => { if (!vidP.paused) vidP.pause(); });
})();
