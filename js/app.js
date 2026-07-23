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
  // 轻量纠偏：同组视频（2 条或 3 条）以第一条为基准防漂移
  setInterval(() => {
    document.querySelectorAll('.duo-row').forEach((row) => {
      const vids = row.querySelectorAll('video');
      const base = vids[0];
      if (!base || base.paused) return;
      for (let i = 1; i < vids.length; i++) {
        if (Math.abs(base.currentTime - vids[i].currentTime) > 0.08) {
          vids[i].currentTime = base.currentTime;
        }
      }
    });
  }, 800);

  /* ===== ③ 投流变现 ===== */
  const vidP = $('vidP'), pPlay = $('pPlay');
  const ribbon = $('brandRibbon'), dmLayer = $('dmLayer'), pcard = $('pcard');
  const toast = $('toast'), countrySwitch = $('countrySwitch');
  let firedDm = new Set();
  let firedCard = new Set();
  let curCountry = 'us';
  let curProduct = C.timeline[0].product;

  vidP.src = C.playerVideo;

  // 按"当前商品 × 当前国家"刷新商品卡
  function renderCard() {
    const prod = C.products[curProduct];
    const p = prod.countries[curCountry];
    $('pPhoto').src = prod.img;
    $('pName').textContent = p.name;
    $('pStore').textContent = p.store;
    $('pPrice').textContent = p.price;
    $('pBuy').href = p.url;
  }

  function applyCountry(code, silent) {
    curCountry = code;
    renderCard();
    countrySwitch.querySelectorAll('button').forEach((b) =>
      b.classList.toggle('on', b.dataset.c === code)
    );
    if (!silent) {
      toast.textContent = C.toasts[code];
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
    }
  }
  countrySwitch.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) applyCountry(btn.dataset.c);
  });

  // 时间轴换卡：镜头切到哪，卡就跟到哪
  function showTimelineCard(item) {
    curProduct = item.product;
    $('pTag').textContent = item.tag;
    $('pMore').textContent = item.more;
    renderCard();
    pcard.classList.add('show');
    // 换卡小动画：重触发入场
    pcard.style.animation = 'none';
    void pcard.offsetWidth;
    pcard.style.animation = 'genin .45s ease';
  }
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
    firedCard = new Set();
    pcard.classList.remove('show');
    dmLayer.innerHTML = '';
  }

  vidP.addEventListener('timeupdate', () => {
    const t = vidP.currentTime;
    ribbon.classList.toggle('show', t >= C.badge.start && t <= C.badge.end);
    C.danmaku.forEach((d, i) => {
      if (t >= d.t && !firedDm.has(i)) { firedDm.add(i); spawnDm(d); }
    });
    C.timeline.forEach((item, i) => {
      if (t >= item.at && !firedCard.has(i)) { firedCard.add(i); showTimelineCard(item); }
    });
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
