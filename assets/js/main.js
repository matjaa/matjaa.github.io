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

  /* ---------- Chess boards that play through an opening ---------- */
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

  // What each app shows: its pieces, how it marks moves and its side panel texts
  const APPS = {
    claude: {
      pieces: (name) => `assets/img/chess/${name}.png`,
      highlightLastMove: true,
      maxRows: 17, // rows that fit the app's move list box
      turnText: (ply) => (ply % 2 === 1 ? 'Bot is thinking...' : 'Your move'),
      renderMoves(el, ply) {
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
        el.innerHTML = rows.slice(-this.maxRows).join('');
      },
    },
    gpt: {
      pieces: (name) => `assets/img/chess-gpt/${name}.webp`,
      selectBeforeMove: true, // the player clicks a piece first and the app outlines it
      turnText(ply) {
        if (ply % 2 === 1) return "Black's turn";
        return ply > 0 && LINE[ply - 1][2].endsWith('+') ? 'White is in check.' : "White's turn";
      },
      renderMoves(el, ply) {
        // plain text like the app, "1. e4   e5", showing the last 24 half-moves
        let text = '';
        for (let i = Math.max(0, ply - 24); i < ply; i += 2) {
          text += `${i / 2 + 1}. ${LINE[i][2]}`;
          if (i + 1 < ply) text += `   ${LINE[i + 1][2]}`;
          text += '\n';
        }
        el.textContent = text;
      },
    },
  };

  const fileRank = (sq) => [sq.charCodeAt(0) - 97, Number(sq[1]) - 1];
  const place = (el, sq) => {
    const [f, r] = fileRank(sq);
    el.style.transform = `translate(${f * 100}%, ${(7 - r) * 100}%)`;
  };

  function chessBoard(board) {
    const app = APPS[board.dataset.app];
    const screen = board.parentElement;
    const movesEl = screen.querySelector('[data-moves]');
    const turnEl = screen.querySelector('[data-turn]');

    const marker = (className) => {
      const el = document.createElement('div');
      el.className = className;
      el.style.opacity = '0';
      board.appendChild(el);
      return el;
    };
    const hlFrom = app.highlightLastMove ? marker('board__hl') : null;
    const hlTo = app.highlightLastMove ? marker('board__hl') : null;
    const sel = app.selectBeforeMove ? marker('board__sel') : null;
    const markers = [hlFrom, hlTo, sel].filter(Boolean);

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
          img.src = app.pieces(color + ch.toUpperCase());
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
      markers.forEach((el) => { el.style.opacity = '0'; });
      ply = 0;
      render();
    }

    function render() {
      app.renderMoves(movesEl, ply);
      turnEl.textContent = app.turnText(ply);
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
      if (hlFrom) {
        place(hlFrom, from);
        place(hlTo, to);
        hlFrom.style.opacity = '1';
        hlTo.style.opacity = '1';
      }
      if (sel) sel.style.opacity = '0';
      ply++;
      render();
    }

    function schedule() {
      clearTimeout(timer);
      if (!visible) return;
      if (ply < LINE.length) {
        // the bot (Black) "thinks" a little longer than the player
        const wait = ply % 2 === 1 ? 1500 : 1100;
        if (sel && ply % 2 === 0) {
          // outline the player's piece for a moment before it moves
          timer = setTimeout(() => {
            place(sel, LINE[ply][0]);
            sel.style.opacity = '1';
            timer = setTimeout(() => { play(); schedule(); }, 550);
          }, wait - 550);
        } else {
          timer = setTimeout(() => { play(); schedule(); }, wait);
        }
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
      return { restart() {} };
    }

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
      else clearTimeout(timer);
    }, { threshold: 0.35 }).observe(board);

    return {
      restart() {
        setup();
        schedule();
      },
    };
  }

  const boards = new Map();
  document.querySelectorAll('.board[data-app]').forEach((b) => boards.set(b.dataset.app, chessBoard(b)));

  /* ---------- Claude Code / ChatGPT switch ---------- */
  const tabs = [...document.querySelectorAll('.seg [role="tab"]')];
  const selectTab = (tab) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    }
    // start the shown app from the first move
    const board = document.getElementById(tab.getAttribute('aria-controls')).querySelector('.board');
    boards.get(board.dataset.app).restart();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      selectTab(next);
    });
  });
})();
