(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Top bar border once the page scrolls ---------- */
  const topbar = document.querySelector('.topbar');
  const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal sections on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Copy email ---------- */
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.email);
        copyBtn.textContent = 'Copied';
      } catch {
        window.location.href = `mailto:${copyBtn.dataset.email}`;
        return;
      }
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1600);
    });
  }

  /* ---------- Chess board that plays through an opening ---------- */
  const board = document.getElementById('board');
  if (!board) return;

  const movesEl = document.getElementById('moves');
  const turnEl = document.getElementById('turn');

  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  // Italian Game: from, to, notation
  const LINE = [
    ['e2', 'e4', 'e4'], ['e7', 'e5', 'e5'],
    ['g1', 'f3', 'Nf3'], ['b8', 'c6', 'Nc6'],
    ['f1', 'c4', 'Bc4'], ['f8', 'c5', 'Bc5'],
    ['c2', 'c3', 'c3'], ['g8', 'f6', 'Nf6'],
    ['d2', 'd4', 'd4'], ['e5', 'd4', 'exd4'],
    ['c3', 'd4', 'cxd4'], ['c5', 'b4', 'Bb4+'],
    ['b1', 'c3', 'Nc3'], ['f6', 'e4', 'Nxe4'],
  ];
  const MAX_ROWS = 17; // rows that fit the app's move list box

  const fileRank = (sq) => [sq.charCodeAt(0) - 97, Number(sq[1]) - 1];
  const place = (el, sq) => {
    const [f, r] = fileRank(sq);
    el.style.transform = `translate(${f * 100}%, ${(7 - r) * 100}%)`;
  };

  const hlFrom = document.createElement('div');
  const hlTo = document.createElement('div');
  [hlFrom, hlTo].forEach((el) => {
    el.className = 'board__hl';
    el.style.opacity = '0';
    board.appendChild(el);
  });

  let pieces = new Map();
  let ply = 0;
  let timer = null;
  let visible = false;

  function setup() {
    board.querySelectorAll('.board__piece').forEach((n) => n.remove());
    pieces = new Map();
    START.split('/').forEach((row, i) => {
      let f = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) { f += Number(ch); continue; }
        const color = ch === ch.toUpperCase() ? 'w' : 'b';
        const img = document.createElement('img');
        img.src = `assets/img/chess/${color}${ch.toUpperCase()}.png`;
        img.alt = '';
        img.className = 'board__piece';
        img.draggable = false;
        const sq = String.fromCharCode(97 + f) + (8 - i);
        place(img, sq);
        board.appendChild(img);
        pieces.set(sq, img);
        f++;
      }
    });
    hlFrom.style.opacity = '0';
    hlTo.style.opacity = '0';
    ply = 0;
    renderMoves();
  }

  function renderMoves() {
    const rows = [];
    for (let i = 0; i < ply; i += 2) {
      const white = LINE[i][2];
      const black = i + 1 < ply ? LINE[i + 1][2] : '';
      const cur = ply - 1;
      rows.push(
        `<li><span>${i / 2 + 1}.</span>` +
        `<span class="${cur === i ? 'is-current' : ''}">${white}</span>` +
        `<span class="${cur === i + 1 ? 'is-current' : ''}">${black}</span></li>`
      );
    }
    movesEl.innerHTML = rows.slice(-MAX_ROWS).join('');
    // same texts as the app's side panel
    turnEl.textContent = ply % 2 === 1 ? 'Bot is thinking...' : 'Your move';
  }

  function play() {
    const [from, to] = LINE[ply];
    const piece = pieces.get(from);
    const captured = pieces.get(to);
    if (captured) {
      captured.classList.add('is-captured');
      setTimeout(() => captured.remove(), 350);
    }
    pieces.delete(from);
    pieces.set(to, piece);
    place(piece, to);
    place(hlFrom, from);
    place(hlTo, to);
    hlFrom.style.opacity = '1';
    hlTo.style.opacity = '1';
    ply++;
    renderMoves();
  }

  function schedule() {
    clearTimeout(timer);
    if (!visible) return;
    if (ply < LINE.length) {
      // the bot (Black) "thinks" a little longer than the player
      timer = setTimeout(() => { play(); schedule(); }, ply % 2 === 1 ? 1500 : 1100);
    } else {
      timer = setTimeout(() => {
        board.classList.add('is-resetting');
        setTimeout(() => {
          setup();
          requestAnimationFrame(() => board.classList.remove('is-resetting'));
          schedule();
        }, 350);
      }, 3500);
    }
  }

  setup();

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // show the finished line without animation
    while (ply < LINE.length) play();
    return;
  }

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) schedule();
    else clearTimeout(timer);
  }, { threshold: 0.35 }).observe(board);
})();
