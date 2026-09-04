// Pawzz Care — shared interaction logic (no build step, vanilla JS)

// Generic chip / toggle-pair active-state switching, scoped to a container.
function wireExclusiveToggle(containerSelector, itemSelector) {
  document.querySelectorAll(containerSelector).forEach((container) => {
    container.querySelectorAll(itemSelector).forEach((item) => {
      item.addEventListener('click', () => {
        container.querySelectorAll(itemSelector).forEach((el) => el.classList.remove('on', 'active'));
        item.classList.add(item.dataset.state || 'on');
      });
    });
  });
}

// Drops a little paw-print onto each nav link that pops in on hover/active
// (see .nav-paw in styles.css). Injected at runtime so all 7 pages' shared
// nav markup doesn't need hand-editing per link.
function enhanceNavLinks() {
  const pawSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.4-9.5 9-9.5 9z"/></svg>';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.querySelector('.nav-paw')) return;
    const span = document.createElement('span');
    span.className = 'nav-paw';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = pawSvg;
    a.appendChild(span);
  });
}

// Provider profile tabs
function wireTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => (p.hidden = true));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).hidden = false;
    });
  });
}

// AI document upload wizard: choose file -> processing -> extracted result
function wireUploadWizard() {
  const root = document.getElementById('upload-wizard');
  if (!root) return;
  const steps = ['step-select', 'step-processing', 'step-result'];
  const dots = root.querySelectorAll('.ws-dot');

  function goTo(stepId) {
    steps.forEach((id) => (document.getElementById(id).hidden = id !== stepId));
    const idx = steps.indexOf(stepId);
    dots.forEach((d, i) => d.classList.toggle('done', i <= idx));
  }

  const chooseBtn = document.getElementById('choose-file-btn');
  if (chooseBtn) {
    chooseBtn.addEventListener('click', () => {
      document.getElementById('file-chip').hidden = false;
      chooseBtn.textContent = 'Change file';
      document.getElementById('start-scan-btn').hidden = false;
    });
  }

  const scanBtn = document.getElementById('start-scan-btn');
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      goTo('step-processing');
      setTimeout(() => goTo('step-result'), 1600);
    });
  }

  const restartBtn = document.getElementById('restart-upload-btn');
  if (restartBtn) restartBtn.addEventListener('click', () => goTo('step-select'));
}

// AI symptom triage wizard: symptom -> duration -> recommendation
function wireTriageWizard() {
  const root = document.getElementById('triage-wizard');
  if (!root) return;
  const steps = ['tri-step-1', 'tri-step-2', 'tri-step-3'];
  const dots = root.querySelectorAll('.ws-dot');
  const state = { symptom: null, duration: null };

  function goTo(stepId) {
    steps.forEach((id) => (document.getElementById(id).hidden = id !== stepId));
    const idx = steps.indexOf(stepId);
    dots.forEach((d, i) => d.classList.toggle('done', i <= idx));
  }

  document.querySelectorAll('[data-symptom]').forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-symptom]').forEach((o) => o.classList.remove('selected'));
      el.classList.add('selected');
      state.symptom = el.dataset.symptom;
      state.urgent = el.dataset.urgent === 'true';
      setTimeout(() => goTo('tri-step-2'), 250);
    });
  });

  document.querySelectorAll('[data-duration]').forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-duration]').forEach((o) => o.classList.remove('selected'));
      el.classList.add('selected');
      state.duration = el.dataset.duration;
      setTimeout(() => {
        renderTriageResult(state);
        goTo('tri-step-3');
      }, 250);
    });
  });

  function renderTriageResult(s) {
    const banner = document.getElementById('triage-result-banner');
    const isUrgent = s.urgent || s.duration === 'now-worsening';
    banner.className = 'result-banner ' + (isUrgent ? 'urgent' : 'routine');
    document.getElementById('triage-badge').className = 'badge ' + (isUrgent ? 'badge-urgent' : 'badge-routine');
    document.getElementById('triage-badge').textContent = isUrgent ? 'Urgent — act now' : 'Routine — book when convenient';
    document.getElementById('triage-explain').textContent = isUrgent
      ? `Symptoms like "${s.symptom}" that are worsening can escalate quickly. We're routing you to the nearest 24×7 emergency option.`
      : `"${s.symptom}" without worsening symptoms is usually safe to monitor. We'll route you to a routine vet slot near you.`;
    const cta = document.getElementById('triage-cta');
    cta.href = isUrgent ? 'emergency.html' : 'search.html';
    cta.textContent = isUrgent ? 'Open Emergency SOS' : 'Find a routine vet slot';
    cta.className = 'btn btn-block ' + (isUrgent ? 'btn-sos' : 'btn-primary');
  }

  const restart = document.getElementById('triage-restart');
  if (restart) restart.addEventListener('click', () => {
    state.symptom = null; state.duration = null;
    document.querySelectorAll('[data-symptom],[data-duration]').forEach((o) => o.classList.remove('selected'));
    goTo('tri-step-1');
  });
}

// Highlight the matching bottom app-tab for the current page
function wireAppTabbar() {
  const tabbar = document.querySelector('.app-tabbar');
  if (!tabbar) return;
  const tabFor = {
    'index.html': 'index.html',
    'search.html': 'search.html',
    'provider.html': 'search.html',
    'emergency.html': 'emergency.html',
    'health.html': 'health.html',
    'upload.html': 'health.html',
    'triage.html': 'health.html',
  };
  const current = (location.pathname.split('/').pop() || 'index.html');
  const activeTarget = tabFor[current] || 'index.html';
  tabbar.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('tab-active', a.getAttribute('href') === activeTarget);
  });
}

// "Fold text" headline reveal — vanilla-JS/GSAP port of the FoldText component.
// Splits an element's text into per-character spans and folds each one in
// from a hinged edge (default: top), with a subtle crease-shadow overlay.
const FOLD_HINGES = {
  top: { origin: '50% 0%', rotateX: -90, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 90, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 90 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -90 },
};

function initFoldText() {
  const els = document.querySelectorAll('[data-fold]');
  if (!els.length || typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  els.forEach((el) => {
    const hinge = el.dataset.foldHinge || 'top';
    const trigger = el.dataset.foldTrigger || 'mount';
    const duration = parseFloat(el.dataset.foldDuration) || 0.65;
    const stagger = parseFloat(el.dataset.foldStagger) || 0.035;
    const perspective = parseFloat(el.dataset.foldPerspective) || 700;
    const crease = el.dataset.foldCrease !== undefined ? parseFloat(el.dataset.foldCrease) : 0.5;
    const cfg = FOLD_HINGES[hinge] || FOLD_HINGES.top;

    // Capture existing children (may include a manual <br> line break) before
    // clearing, so the fold-up preserves the original markup structure.
    const originalNodes = Array.from(el.childNodes);

    const srOnly = document.createElement('span');
    srOnly.className = 'fold-text-sr-only';
    originalNodes.forEach((n) => srOnly.appendChild(n.cloneNode(true)));

    const visual = document.createElement('span');
    visual.className = 'fold-text-visual';
    visual.setAttribute('aria-hidden', 'true');

    const pieces = [];
    originalNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        Array.from(node.data).forEach((ch) => {
          if (ch === ' ') { visual.appendChild(document.createTextNode(' ')); return; }
          const seg = document.createElement('span');
          seg.style.display = 'inline-block';
          seg.style.perspective = perspective + 'px';
          const piece = document.createElement('span');
          piece.className = 'fold-text-piece';
          piece.dataset.foldHinge = hinge;
          piece.style.transformOrigin = cfg.origin;
          piece.textContent = ch;
          seg.appendChild(piece);
          visual.appendChild(seg);
          pieces.push(piece);
        });
      } else if (node.nodeName === 'BR') {
        visual.appendChild(document.createElement('br'));
      } else {
        visual.appendChild(node.cloneNode(true));
      }
    });

    el.textContent = '';
    el.classList.add('fold-text');
    el.appendChild(srOnly);
    el.appendChild(visual);

    const fromVars = {
      opacity: 0,
      rotateX: reduceMotion ? 0 : cfg.rotateX,
      rotateY: reduceMotion ? 0 : cfg.rotateY,
      '--fold-crease': reduceMotion ? 0 : crease,
    };
    const toVars = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      '--fold-crease': 0,
      duration: reduceMotion ? Math.min(duration, 0.2) : duration,
      ease: 'power3.out',
      stagger: reduceMotion ? Math.min(stagger, 0.015) : stagger,
    };

    gsap.set(pieces, fromVars);
    if (trigger === 'scroll' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(pieces, toVars),
      });
    } else {
      gsap.to(pieces, toVars);
    }
  });
}

// Stamps out the given Uiverse "send message" button markup (see
// assets/css/send-button.css) onto each placeholder. The CSS/animations
// are untouched from the original; this just fills in our label text and
// gives each instance its own SVG filter id (the source hardcodes
// id="shadow", which only works once per page).
let sendBtnCounter = 0;

function buildSendButtonMarkup(label, sentLabel, uid) {
  const toSpans = (text, offset) => Array.from(text).map((ch, idx) => {
    const content = ch === ' ' ? ' ' : ch;
    return `<span style="--i:${offset + idx}">${content}</span>`;
  }).join('');
  const sentOffset = Math.floor(label.length / 2);

  return `
    <div class="outline"></div>
    <div class="state state--default">
        <div class="btn-plane-icon">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g style="filter: url(#${uid})">
                    <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor"></path>
                    <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor"></path>
                </g>
                <defs>
                    <filter id="${uid}">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.6" flood-opacity="0.5"></feDropShadow>
                    </filter>
                </defs>
            </svg>
        </div>
        <p>${toSpans(label, 0)}</p>
    </div>
    <div class="state state--sent">
        <div class="btn-plane-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" stroke-width="0.5px" stroke="currentColor">
                <g style="filter: url(#${uid})">
                    <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"></path>
                    <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"></path>
                </g>
            </svg>
        </div>
        <p>${toSpans(sentLabel, sentOffset)}</p>
    </div>`;
}

function initSendButtons() {
  document.querySelectorAll('.js-send-btn').forEach((el) => {
    sendBtnCounter += 1;
    const label = el.dataset.label || '';
    const sentLabel = el.dataset.sent || 'Done';
    const variant = el.dataset.variant;
    el.classList.remove('js-send-btn');
    el.classList.add('button');
    if (variant) el.classList.add('button--' + variant);
    el.innerHTML = buildSendButtonMarkup(label, sentLabel, 'send-btn-shadow-' + sendBtnCounter);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireExclusiveToggle('.chip-row[data-exclusive]', '.chip');
  wireExclusiveToggle('.toggle-pair', 'button');
  wireTabs();
  wireUploadWizard();
  wireTriageWizard();
  wireAppTabbar();
  enhanceNavLinks();
  initFoldText();
  initSendButtons();
});
