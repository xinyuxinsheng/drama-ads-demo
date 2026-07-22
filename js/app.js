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

  /* ===== ① 工作台：创作者确认 ===== */
  const confirmBtn = $('confirmBtn');
  confirmBtn.addEventListener('click', () => {
    confirmBtn.textContent = '✓ 已确认 · 进入 AI 生成排期';
    confirmBtn.classList.add('done');
  });

  /* ===== ② 前后对比滑杆 ===== */
  const cmp = $('cmp'), cmpTop = $('cmpTop'), cmpHandle = $('cmpHandle');
  const vidA = $('vidA'), vidB = $('vidB'), cmpPlay = $('cmpPlay');

  function fitTopVideo() { vidB.style.width = cmp.clientWidth + 'px'; }
  window.addEventListener('resize', fitTopVideo);
  fitTopVideo();

  function setSplit(ratio) {
    const r = Math.min(0.97, Math.max(0.03, ratio));
    cmpTop.style.width = r * 100 + '%';
    cmpHandle.style.left = r * 100 + '%';
  }
  setSplit(0.5);

  let dragging = false;
  const posToRatio = (clientX) => {
    const rect = cmp.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  };
  cmp.addEventListener('pointerdown', (e) => {
    dragging = true;
    cmp.setPointerCapture(e.pointerId);
    setSplit(posToRatio(e.clientX));
  });
  cmp.addEventListener('pointermove', (e) => dragging && setSplit(posToRatio(e.clientX)));
  cmp.addEventListener('pointerup', () => (dragging = false));
  cmp.addEventListener('pointercancel', () => (dragging = false));

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
