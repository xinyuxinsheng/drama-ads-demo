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

  /* ===== ① 工作台：商品选择 + 剧方确认 + 步骤推进 ===== */
  const confirmBtn = $('confirmBtn');
  const mcards = document.querySelectorAll('.mcard');
  let chosen = 'LEAPX 都市风衣';
  let confirmed = false;

  mcards.forEach((card) => {
    card.addEventListener('click', () => {
      if (confirmed) return;
      mcards.forEach((c) => c.classList.remove('sel'));
      card.classList.add('sel');
      chosen = card.dataset.name;
      confirmBtn.textContent = '剧方确认植入：' + chosen;
    });
  });

  confirmBtn.addEventListener('click', () => {
    confirmed = true;
    confirmBtn.textContent = '✓ 已确认植入 ' + chosen;
    confirmBtn.classList.add('done');
    $('stepMatch').classList.replace('act', 'done');
    $('stepConfirm').classList.add('done');
    $('stepGen').classList.add('act');
    $('genCard').classList.add('show');
  });

  /* ===== ② 前后对比：同步播放 ===== */
  const vidA = $('vidA'), vidB = $('vidB'), cmpPlay = $('cmpPlay');

  cmpPlay.addEventListener('click', () => {
    if (vidA.paused) {
      vidB.currentTime = vidA.currentTime;
      Promise.all([vidA.play(), vidB.play()]).catch(() => {});
      cmpPlay.textContent = '⏸ 暂停对比';
    } else {
      vidA.pause(); vidB.pause();
      cmpPlay.textContent = '▶ 同步播放对比';
    }
  });
  // 轻量纠偏：防止两条视频播放漂移
  setInterval(() => {
    if (!vidA.paused && Math.abs(vidA.currentTime - vidB.currentTime) > 0.08) {
      vidB.currentTime = vidA.currentTime;
    }
  }, 800);

  /* ===== ③ 观看页 ===== */
  const vidP = $('vidP'), pPlay = $('pPlay');
  const ribbon = $('brandRibbon'), dmLayer = $('dmLayer'), pcard = $('pcard');
  const toast = $('toast'), countrySwitch = $('countrySwitch');
  let firedDm = new Set();
  let cardShown = false;

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
    // 片头冠名
    ribbon.classList.toggle('show', t >= C.badge.start && t <= C.badge.end);
    // 弹幕
    C.danmaku.forEach((d, i) => {
      if (t >= d.t && !firedDm.has(i)) { firedDm.add(i); spawnDm(d); }
    });
    // 商品卡
    if (t >= C.garmentAt && !cardShown) { cardShown = true; pcard.classList.add('show'); }
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
