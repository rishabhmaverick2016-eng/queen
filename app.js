/**
 * Queen Bloom | Daily Routine & Self-Care Haven
 * Full Ringing & Vibration Alarm Engine, Chores Tracker, Hydration, & End-of-Day Review
 */

// --- 1. AUDIO & VIBRATION SYNTHESIZER ---
class QueenAudioEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.vibrateEnabled = true;
    this.activeAlarmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single ringtone melody/chime
  playTone(style = 'harp') {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (style === 'harp') {
        // Royal Harp Arpeggio (C5, E5, G5, C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.18, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.9);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.95);
        });
      } else if (style === 'crystal') {
        // Crystal Singing Bowl (528Hz love frequency with soft harmonic)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(528, now);
        osc2.frequency.setValueAtTime(1056, now);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.85);
        osc2.stop(now + 1.85);
      } else if (style === 'bell') {
        // Golden Temple Bell
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 1.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.55);
      } else if (style === 'chime') {
        // Fairy Sparkle Chime (Fast ascending pentatonic)
        [587.33, 659.25, 783.99, 880.00, 1046.50].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.14, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.55);
        });
      }
    } catch (e) {
      console.warn('Audio tone error', e);
    }
  }

  // Water Drop Sound
  playWaterDrop() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Celebration Harp Fanfare
  playCelebration() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.16, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.85);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.9);
      });
    } catch (e) {}
  }

  // Phone vibration pattern
  vibrateDevice(pattern = [300, 150, 300, 150, 500]) {
    if (this.vibrateEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // Continuous looping ring + vibration until dismissed
  startAlarmRinging(style = 'harp') {
    this.stopAlarmRinging();
    this.playTone(style);
    this.vibrateDevice([400, 200, 400, 200, 600]);

    // Repeat every 3.5 seconds
    this.activeAlarmInterval = setInterval(() => {
      this.playTone(style);
      this.vibrateDevice([400, 200, 400, 200, 600]);
    }, 3500);
  }

  stopAlarmRinging() {
    if (this.activeAlarmInterval) {
      clearInterval(this.activeAlarmInterval);
      this.activeAlarmInterval = null;
    }
    if ('vibrate' in navigator) {
      try { navigator.vibrate(0); } catch (e) {}
    }
  }
}

const queenAudio = new QueenAudioEngine();

// --- 2. DEFAULT STATE & DATA ---
const STORAGE_KEY = 'queen_bloom_state_v1';

const LOVE_QUOTES = [
  "You do so much with grace. Today, prioritize yourself first—your peace and smile are the most precious things in our home.",
  "Never rush through your day just to finish chores. You are a Queen, and your well-being comes before any to-do list.",
  "I love seeing you relaxed, smiling, and feeling radiant. Take that extra 10 minutes to enjoy your warm tea and breathe.",
  "You make our house feel like heaven. Remember to drink your water and treat your body like the sacred treasure it is.",
  "If you feel tired today, leave whatever can wait. Resting without guilt is your royal right today ❤️",
  "Every little thing you do is appreciated, but who you are is what I cherish most. Have a gentle, glowing day!"
];

const DEFAULT_TASKS = [
  { id: 't1', name: "Morning Water & Gentle Skincare Glow", category: "selfcare", time: "08:30", sound: "harp", note: "Wash your face with cold water, apply serum & moisturizer.", completed: false },
  { id: 't2', name: "Kitchen Reset & Quick Counter Wipe", category: "chore", time: "09:30", sound: "bell", note: "Play your favorite music while doing this—keep it light!", completed: false },
  { id: 't3', name: "Midday Fruit, Vitamins & Hydration", category: "wellness", time: "11:30", sound: "crystal", note: "Hydrate your skin and replenish your energy.", completed: false },
  { id: 't4', name: "Laundry & Wardrobe Organizing", category: "chore", time: "14:00", sound: "chime", note: "Fold what's needed, don't overwork yourself.", completed: false },
  { id: 't5', name: "Quiet Tea Pause & 2-Min Zen Breath", category: "selfcare", time: "16:30", sound: "crystal", note: "No phone scrolling—just hot tea and peaceful breathing.", completed: false },
  { id: 't6', name: "Evening Dinner Prep & Counter Reset", category: "chore", time: "18:30", sound: "bell", note: "Take your time, enjoy cooking with relaxing tunes.", completed: false },
  { id: 't7', name: "Night Glow: Face Cream & Pillow Mist", category: "selfcare", time: "21:30", sound: "harp", note: "Put your feet up, breathe deep, and prepare for royal sleep.", completed: false }
];

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  const today = getTodayString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        date: today,
        tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
        waterGlasses: 0,
        skincare: { amCleanse: false, amSpf: false, hairLove: false, pmGlow: false },
        mood: null,
        pamperPassClaimed: false,
        soundEnabled: true,
        vibrateEnabled: true,
        eveningReminder: true,
        history: {}
      };
    }
    const state = JSON.parse(raw);
    // If it's a new day, archive yesterday's score and reset daily checks
    if (state.date !== today) {
      if (!state.history) state.history = {};
      const yesterdayScore = calculateDailyScore(state);
      state.history[state.date] = yesterdayScore;

      state.date = today;
      state.waterGlasses = 0;
      state.skincare = { amCleanse: false, amSpf: false, hairLove: false, pmGlow: false };
      state.mood = null;
      state.pamperPassClaimed = false;
      // Reset task completed statuses while preserving custom tasks
      state.tasks = state.tasks.map(t => ({ ...t, completed: false, snoozedUntil: null }));
    }
    return state;
  } catch (e) {
    return {
      date: today,
      tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
      waterGlasses: 0,
      skincare: { amCleanse: false, amSpf: false, hairLove: false, pmGlow: false },
      mood: null,
      pamperPassClaimed: false,
      soundEnabled: true,
      vibrateEnabled: true,
      eveningReminder: true,
      history: {}
    };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}

let appState = loadState();

// --- 3. TOAST & NOTIFICATION HELPERS ---
function showToast(msg) {
  const toast = document.getElementById('bloom-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  queenAudio.vibrateDevice([30, 30]);
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

function triggerSystemNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [300, 150, 300]
      });
    } catch (e) {}
  }
}

// Request Notification Permission once on user interaction
function ensureNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {});
  }
}

// --- 4. DAILY SCORE CALCULATION ---
function calculateDailyScore(state = appState) {
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.completed).length;
  const taskRatio = totalTasks > 0 ? (completedTasks / totalTasks) : 1;

  // Water weight (8 glasses target = 1.0)
  const waterRatio = Math.min(state.waterGlasses / 8, 1);

  // Skincare glow (4 steps)
  const skinChecked = Object.values(state.skincare || {}).filter(Boolean).length;
  const skinRatio = skinChecked / 4;

  // Weighted total: Tasks 50%, Water 25%, Skincare 25%
  const compositeScore = Math.round((taskRatio * 0.50 + waterRatio * 0.25 + skinRatio * 0.25) * 100);
  return Math.min(Math.max(compositeScore, 0), 100);
}

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  initNavigation();
  initRibbonQuotes();
  initTaskRoutines();
  initSelfCareSanctuary();
  initScorecardView();
  initSettings();
  initAlarmScheduler();
  updateOverviewBar();

  // Unlock Web Audio on first tap anywhere
  document.body.addEventListener('click', () => {
    queenAudio.init();
    ensureNotificationPermission();
  }, { once: true });
});

// Navigation
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      queenAudio.playTone('chime');
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      // If opening scorecard, refresh chart & score
      if (targetId === 'tab-scorecard') {
        renderScorecard();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const miniPill = document.getElementById('scorecard-quick-pill');
  if (miniPill) {
    miniPill.addEventListener('click', () => {
      const scoreTab = document.querySelector('.nav-tab[data-target="tab-scorecard"]');
      if (scoreTab) scoreTab.click();
    });
  }
}

// Ribbon Quotes
function initRibbonQuotes() {
  const quoteEl = document.getElementById('daily-love-quote');
  const dateEl = document.getElementById('today-date-display');
  const newBtn = document.getElementById('new-quote-btn');

  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function pickRandomQuote() {
    const pick = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
    if (quoteEl) {
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = `"${pick}"`;
        quoteEl.style.opacity = '1';
      }, 150);
    }
  }

  if (newBtn) {
    newBtn.addEventListener('click', () => {
      queenAudio.playTone('chime');
      pickRandomQuote();
    });
  }
}

// Mini Stats
function updateOverviewBar() {
  const tasksDoneEl = document.getElementById('tasks-done-count');
  const waterDoneEl = document.getElementById('water-done-count');
  const scoreMiniEl = document.getElementById('daily-score-mini');

  const total = appState.tasks.length;
  const done = appState.tasks.filter(t => t.completed).length;

  if (tasksDoneEl) tasksDoneEl.textContent = `${done} / ${total}`;
  if (waterDoneEl) waterDoneEl.textContent = `${appState.waterGlasses} / 8`;
  if (scoreMiniEl) scoreMiniEl.textContent = `${calculateDailyScore()}%`;
}

// --- 6. TAB 1: TASK ROUTINES & FILTERING ---
function initTaskRoutines() {
  const taskListEl = document.getElementById('task-list-container');
  const emptyView = document.getElementById('empty-tasks-view');
  const filterChips = document.querySelectorAll('.filter-chip');
  const openModalBtn = document.getElementById('open-add-task-btn');
  const closeModalBtn = document.getElementById('close-task-modal-btn');
  const taskModal = document.getElementById('task-modal');
  const saveTaskBtn = document.getElementById('save-task-btn');

  let currentFilter = 'all';

  function renderTasks() {
    if (!taskListEl) return;
    taskListEl.innerHTML = '';

    const filtered = appState.tasks.filter(t => {
      if (currentFilter === 'all') return true;
      return t.category === currentFilter;
    });

    if (filtered.length === 0) {
      emptyView.classList.remove('hidden');
    } else {
      emptyView.classList.add('hidden');
    }

    filtered.forEach(task => {
      const card = document.createElement('div');
      card.className = `task-card ${task.completed ? 'completed' : ''}`;
      
      const catEmoji = getCategoryEmoji(task.category);

      card.innerHTML = `
        <div class="task-left">
          <button class="task-check-btn" data-id="${task.id}" title="Toggle Completed">
            ${task.completed ? '✓' : ''}
          </button>
          <div class="task-info">
            <span class="task-name">${task.name}</span>
            <div class="task-meta-row">
              <span class="task-time-badge">⏰ ${format12Hour(task.time)}</span>
              <span class="task-cat-tag">${catEmoji} ${task.category.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-ring-btn" data-id="${task.id}" title="Preview Alarm">🔔</button>
          <button class="task-delete-btn" data-id="${task.id}" title="Delete Task">✕</button>
        </div>
      `;

      taskListEl.appendChild(card);
    });

    // Event Listeners for Task Items
    taskListEl.querySelectorAll('.task-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const task = appState.tasks.find(t => t.id === id);
        if (task) {
          task.completed = !task.completed;
          saveState(appState);
          if (task.completed) {
            queenAudio.playCelebration();
            showToast(`✨ Completed: ${task.name}!`);
          } else {
            queenAudio.playTone('chime');
          }
          renderTasks();
          updateOverviewBar();
        }
      });
    });

    taskListEl.querySelectorAll('.task-ring-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const task = appState.tasks.find(t => t.id === id);
        if (task) {
          triggerAlarmModal(task);
        }
      });
    });

    taskListEl.querySelectorAll('.task-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        appState.tasks = appState.tasks.filter(t => t.id !== id);
        saveState(appState);
        renderTasks();
        updateOverviewBar();
        showToast('Reminder deleted');
      });
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      queenAudio.playTone('chime');
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      renderTasks();
    });
  });

  // Modal Controls
  if (openModalBtn && taskModal) {
    openModalBtn.addEventListener('click', () => {
      queenAudio.playTone('chime');
      taskModal.classList.remove('hidden');
    });
  }
  if (closeModalBtn && taskModal) {
    closeModalBtn.addEventListener('click', () => {
      taskModal.classList.add('hidden');
    });
  }

  if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', () => {
      const name = document.getElementById('task-name-input').value.trim();
      const cat = document.getElementById('task-category-select').value;
      const time = document.getElementById('task-time-input').value || '09:00';
      const sound = document.getElementById('task-sound-select').value;
      const note = document.getElementById('task-note-input').value.trim();

      if (!name) {
        showToast('Please type a task or reminder name!');
        return;
      }

      appState.tasks.push({
        id: 't_' + Date.now(),
        name,
        category: cat,
        time,
        sound,
        note: note || "Take your time and smile. You've got this!",
        completed: false
      });

      // Sort tasks by time
      appState.tasks.sort((a, b) => a.time.localeCompare(b.time));
      saveState(appState);

      // Clear Inputs
      document.getElementById('task-name-input').value = '';
      document.getElementById('task-note-input').value = '';
      taskModal.classList.add('hidden');

      queenAudio.playCelebration();
      showToast(`Alarm set for ${format12Hour(time)} 🔔`);
      renderTasks();
      updateOverviewBar();
    });
  }

  renderTasks();
}

function getCategoryEmoji(cat) {
  switch (cat) {
    case 'selfcare': return '🌸';
    case 'chore': return '🏡';
    case 'wellness': return '🌿';
    case 'mindful': return '🕯️';
    default: return '✨';
  }
}

function format12Hour(time24) {
  if (!time24) return '09:00 AM';
  const [h, m] = time24.split(':');
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

// --- 7. TAB 2: SELF-CARE SANCTUARY ---
function initSelfCareSanctuary() {
  // 1. Water Tracker
  const waterGrid = document.getElementById('water-glasses-grid');
  const addGlassBtn = document.getElementById('add-glass-btn');
  const resetWaterBtn = document.getElementById('reset-water-btn');

  function renderWaterGlasses() {
    if (!waterGrid) return;
    waterGrid.innerHTML = '';
    for (let i = 1; i <= 8; i++) {
      const isDrank = i <= appState.waterGlasses;
      const div = document.createElement('div');
      div.className = `water-glass-item ${isDrank ? 'drank' : ''}`;
      div.innerHTML = `
        <span class="water-drop-icon">${isDrank ? '💧' : '🥛'}</span>
        <span class="glass-num">Glass ${i}</span>
      `;
      div.addEventListener('click', () => {
        appState.waterGlasses = isDrank ? i - 1 : i;
        saveState(appState);
        queenAudio.playWaterDrop();
        renderWaterGlasses();
        updateOverviewBar();
        if (appState.waterGlasses === 8) {
          queenAudio.playCelebration();
          showToast('👑 Hydration Target Achieved! 8/8 Glasses!');
        }
      });
      waterGrid.appendChild(div);
    }
  }

  if (addGlassBtn) {
    addGlassBtn.addEventListener('click', () => {
      if (appState.waterGlasses < 8) {
        appState.waterGlasses++;
        saveState(appState);
        queenAudio.playWaterDrop();
        renderWaterGlasses();
        updateOverviewBar();
        showToast(`Glass ${appState.waterGlasses} recorded 💧`);
        if (appState.waterGlasses === 8) {
          queenAudio.playCelebration();
          showToast('👑 Hydration Target Achieved! 8/8 Glasses!');
        }
      } else {
        showToast('All 8 glasses completed today! Well done!');
      }
    });
  }

  if (resetWaterBtn) {
    resetWaterBtn.addEventListener('click', () => {
      appState.waterGlasses = 0;
      saveState(appState);
      renderWaterGlasses();
      updateOverviewBar();
      showToast('Water tracker reset');
    });
  }

  renderWaterGlasses();

  // 2. Skincare Checklist
  const skinCleanse = document.getElementById('skin-am-cleanse');
  const skinSpf = document.getElementById('skin-am-spf');
  const skinHair = document.getElementById('skin-hair-brush');
  const skinPm = document.getElementById('skin-pm-glow');

  if (skinCleanse && skinSpf && skinHair && skinPm) {
    skinCleanse.checked = !!appState.skincare.amCleanse;
    skinSpf.checked = !!appState.skincare.amSpf;
    skinHair.checked = !!appState.skincare.hairLove;
    skinPm.checked = !!appState.skincare.pmGlow;

    function handleSkinChange() {
      appState.skincare.amCleanse = skinCleanse.checked;
      appState.skincare.amSpf = skinSpf.checked;
      appState.skincare.hairLove = skinHair.checked;
      appState.skincare.pmGlow = skinPm.checked;
      saveState(appState);
      queenAudio.playTone('chime');
      updateOverviewBar();
      const count = Object.values(appState.skincare).filter(Boolean).length;
      if (count === 4) {
        queenAudio.playCelebration();
        showToast('✨ Full Radiance Glow Ritual Completed!');
      }
    }

    skinCleanse.addEventListener('change', handleSkinChange);
    skinSpf.addEventListener('change', handleSkinChange);
    skinHair.addEventListener('change', handleSkinChange);
    skinPm.addEventListener('change', handleSkinChange);
  }

  // 3. 2-Minute Breathing Exercise
  const breathCircle = document.getElementById('breath-circle');
  const breathText = document.getElementById('breath-instruction');
  const breathTimer = document.getElementById('breath-timer');
  const startBreathBtn = document.getElementById('start-breath-btn');

  let breathInterval = null;
  let breathSecondsRemaining = 120;
  let isBreathing = false;

  function runBreathCycle() {
    // 4s Inhale, 4s Hold, 4s Exhale
    const phase = (120 - breathSecondsRemaining) % 12;
    if (phase < 4) {
      breathCircle.className = 'breathing-circle inhale';
      breathText.textContent = 'Breathe In... 🌸';
    } else if (phase < 8) {
      breathCircle.className = 'breathing-circle hold';
      breathText.textContent = 'Hold Peace... 🕯️';
    } else {
      breathCircle.className = 'breathing-circle exhale';
      breathText.textContent = 'Release & Melt... 🍃';
    }
  }

  function startBreathing() {
    if (isBreathing) {
      clearInterval(breathInterval);
      isBreathing = false;
      startBreathBtn.textContent = 'Resume Peaceful Breath ✨';
      breathText.textContent = 'Paused';
      return;
    }

    queenAudio.playTone('crystal');
    isBreathing = true;
    startBreathBtn.textContent = 'Pause Breathing';

    breathInterval = setInterval(() => {
      if (breathSecondsRemaining > 0) {
        breathSecondsRemaining--;
        const mins = Math.floor(breathSecondsRemaining / 60);
        const secs = breathSecondsRemaining % 60;
        breathTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        runBreathCycle();
      } else {
        clearInterval(breathInterval);
        isBreathing = false;
        breathCircle.className = 'breathing-circle';
        breathText.textContent = 'Serenity Achieved ✨';
        breathTimer.textContent = '00:00';
        startBreathBtn.textContent = 'Completed ❤️';
        queenAudio.playCelebration();
        showToast('2 Minutes of calm complete. You are centered.');
      }
    }, 1000);
  }

  if (startBreathBtn) startBreathBtn.addEventListener('click', startBreathing);
  if (breathCircle) breathCircle.addEventListener('click', startBreathing);

  // 4. Pampering Pass
  const pamperBtn = document.getElementById('claim-pamper-pass-btn');
  if (pamperBtn) {
    if (appState.pamperPassClaimed) {
      pamperBtn.textContent = 'Pass Active: Resting Without Guilt 🛋️';
      pamperBtn.style.opacity = '0.6';
    }
    pamperBtn.addEventListener('click', () => {
      appState.pamperPassClaimed = true;
      saveState(appState);
      queenAudio.playCelebration();
      pamperBtn.textContent = 'Pass Active: Resting Without Guilt 🛋️';
      pamperBtn.style.opacity = '0.6';
      showToast('🛋️ Rest Pass Claimed! All chores officially on hold.');
    });
  }
}

// --- 8. TAB 3: DAILY SCORECARD & HOW SHE DID ---
function initScorecardView() {
  const whatsappBtn = document.getElementById('whatsapp-summary-btn');
  const moodBtns = document.querySelectorAll('.mood-btn');

  // Mood selector
  moodBtns.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.mood === appState.mood);
    btn.addEventListener('click', () => {
      appState.mood = btn.dataset.mood;
      saveState(appState);
      queenAudio.playTone('chime');
      moodBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      showToast(`Today felt: ${btn.dataset.mood.toUpperCase()} 🌸`);
    });
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const score = calculateDailyScore();
      const doneTasks = appState.tasks.filter(t => t.completed).length;
      const totalTasks = appState.tasks.length;
      const moodText = appState.mood ? appState.mood.toUpperCase() : 'PEACEFUL';

      const msg = `Hi my love! ❤️ Here is how my day went:\n\n` +
        `👑 Today's Score: ${score}%\n` +
        `✅ Tasks & Chores: ${doneTasks} / ${totalTasks} completed\n` +
        `💧 Hydration: ${appState.waterGlasses} / 8 glasses\n` +
        `🌸 Energy Level: ${moodText}\n\n` +
        `I took good care of our home and myself today. Ready to relax and be pampered tonight! ✨`;

      const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  }

  renderScorecard();
}

function renderScorecard() {
  const score = calculateDailyScore();
  const ring = document.getElementById('score-progress-ring');
  const scoreText = document.getElementById('score-percentage-text');
  const tierBadge = document.getElementById('score-tier-badge');
  const headline = document.getElementById('score-headline');
  const paragraph = document.getElementById('score-paragraph');

  const selfCareScoreText = document.getElementById('selfcare-score-text');
  const choresScoreText = document.getElementById('chores-score-text');
  const waterScoreText = document.getElementById('water-score-text');
  const skinScoreText = document.getElementById('skincare-score-text');

  if (scoreText) scoreText.textContent = `${score}%`;

  // Animate SVG Ring: circumference = 2 * PI * 70 ≈ 440
  if (ring) {
    const circumference = 440;
    const offset = circumference - (score / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  }

  // Tier Feedback
  if (tierBadge && headline && paragraph) {
    if (score >= 80) {
      tierBadge.textContent = '👑 OUTSTANDING QUEEN ENERGY';
      headline.textContent = 'You Radiated Strength & Grace!';
      paragraph.textContent = "You accomplished so much today while taking care of your skin and hydration. Put your feet up—you have earned total pampering tonight!";
    } else if (score >= 50) {
      tierBadge.textContent = '🌸 BEAUTIFUL HARMONY';
      headline.textContent = 'Balanced, Steady & Mindful';
      paragraph.textContent = "You prioritized what mattered most without burning yourself out. That is true wisdom and self-love. Be proud of today!";
    } else {
      tierBadge.textContent = '🛋️ GENTLE SANCTUARY DAY';
      headline.textContent = 'Rest Is Productive Too';
      paragraph.textContent = "Every Queen needs days of quiet recovery. You are worthy of love and praise no matter what. Tomorrow is a gentle, fresh sunrise.";
    }
  }

  // Breakdown numbers
  const selfCareTasks = appState.tasks.filter(t => t.category === 'selfcare' || t.category === 'wellness');
  const doneSelfCare = selfCareTasks.filter(t => t.completed).length;
  if (selfCareScoreText) selfCareScoreText.textContent = `${doneSelfCare} / ${selfCareTasks.length}`;

  const choreTasks = appState.tasks.filter(t => t.category === 'chore');
  const doneChores = choreTasks.filter(t => t.completed).length;
  if (choresScoreText) choresScoreText.textContent = `${doneChores} / ${choreTasks.length}`;

  const waterPct = Math.round((appState.waterGlasses / 8) * 100);
  if (waterScoreText) waterScoreText.textContent = `${waterPct}%`;

  const skinCount = Object.values(appState.skincare || {}).filter(Boolean).length;
  if (skinScoreText) skinScoreText.textContent = `${skinCount} / 4`;

  // Trophies Unlock States
  const badgeWater = document.getElementById('badge-water');
  const badgeGlow = document.getElementById('badge-glow');
  const badgeChores = document.getElementById('badge-chores');
  const badgeZen = document.getElementById('badge-zen');

  if (badgeWater) badgeWater.classList.toggle('locked', appState.waterGlasses < 8);
  if (badgeGlow) badgeGlow.classList.toggle('locked', skinCount < 4);
  if (badgeChores) badgeChores.classList.toggle('locked', choreTasks.length > 0 && doneChores < choreTasks.length);
  if (badgeZen) badgeZen.classList.toggle('locked', !appState.pamperPassClaimed && score < 70);

  // Render 7-day history chart
  renderHistoryChart();
}

function renderHistoryChart() {
  const chartEl = document.getElementById('history-chart');
  if (!chartEl) return;
  chartEl.innerHTML = '';

  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayLabel = i === 0 ? 'Today' : dayNames[d.getDay()];

    const dayScore = i === 0 ? calculateDailyScore() : (appState.history && appState.history[dateStr] ? appState.history[dateStr] : 0);

    const col = document.createElement('div');
    col.className = 'chart-col';
    col.innerHTML = `
      <div class="chart-bar-wrap" title="${dateStr}: ${dayScore}%">
        <div class="chart-bar-fill" style="height: ${Math.max(dayScore, 6)}%;"></div>
      </div>
      <span class="chart-day-label">${dayLabel}</span>
    `;
    chartEl.appendChild(col);
  }
}

// --- 9. TAB 4: SETTINGS & SOUND PREVIEW ---
function initSettings() {
  const previewSelect = document.getElementById('preview-sound-select');
  const previewBtn = document.getElementById('play-sound-preview-btn');
  const headerTestBtn = document.getElementById('test-alarm-btn');
  const soundMuteBtn = document.getElementById('sound-mute-toggle');
  const muteIcon = document.getElementById('mute-icon');

  const prefVibrate = document.getElementById('pref-vibrate-toggle');
  const prefSound = document.getElementById('pref-sound-toggle');
  const prefEvening = document.getElementById('pref-evening-toggle');

  const resetTodayBtn = document.getElementById('reset-today-btn');
  const restoreDefaultsBtn = document.getElementById('restore-defaults-btn');

  function testAlarm(style) {
    const choice = style || (previewSelect ? previewSelect.value : 'harp');
    queenAudio.startAlarmRinging(choice);
    showToast('🔔 Alarm Ringing! Testing vibration & sound.');
    setTimeout(() => {
      queenAudio.stopAlarmRinging();
    }, 4500);
  }

  if (previewBtn) {
    previewBtn.addEventListener('click', () => testAlarm());
  }
  if (headerTestBtn) {
    headerTestBtn.addEventListener('click', () => testAlarm());
  }

  if (soundMuteBtn) {
    soundMuteBtn.addEventListener('click', () => {
      queenAudio.soundEnabled = !queenAudio.soundEnabled;
      appState.soundEnabled = queenAudio.soundEnabled;
      saveState(appState);
      if (muteIcon) muteIcon.textContent = queenAudio.soundEnabled ? '🔊' : '🔇';
      showToast(queenAudio.soundEnabled ? 'Sound Enabled 🔊' : 'Sound Muted 🔇');
    });
  }

  if (prefVibrate) {
    prefVibrate.checked = appState.vibrateEnabled !== false;
    prefVibrate.addEventListener('change', () => {
      queenAudio.vibrateEnabled = prefVibrate.checked;
      appState.vibrateEnabled = prefVibrate.checked;
      saveState(appState);
      showToast(prefVibrate.checked ? 'Vibration Active' : 'Vibration Disabled');
    });
  }

  if (prefSound) {
    prefSound.checked = appState.soundEnabled !== false;
    prefSound.addEventListener('change', () => {
      queenAudio.soundEnabled = prefSound.checked;
      appState.soundEnabled = prefSound.checked;
      saveState(appState);
      if (muteIcon) muteIcon.textContent = prefSound.checked ? '🔊' : '🔇';
      showToast(prefSound.checked ? 'Audio Active' : 'Audio Muted');
    });
  }

  if (prefEvening) {
    prefEvening.checked = appState.eveningReminder !== false;
    prefEvening.addEventListener('change', () => {
      appState.eveningReminder = prefEvening.checked;
      saveState(appState);
      showToast(prefEvening.checked ? 'Evening Summary Active' : 'Evening Summary Disabled');
    });
  }

  if (resetTodayBtn) {
    resetTodayBtn.addEventListener('click', () => {
      appState.tasks.forEach(t => { t.completed = false; });
      appState.waterGlasses = 0;
      appState.skincare = { amCleanse: false, amSpf: false, hairLove: false, pmGlow: false };
      appState.mood = null;
      appState.pamperPassClaimed = false;
      saveState(appState);
      queenAudio.playTone('bell');
      showToast("Today's checklist reset");
      setTimeout(() => location.reload(), 400);
    });
  }

  if (restoreDefaultsBtn) {
    restoreDefaultsBtn.addEventListener('click', () => {
      if (confirm('Restore all default routines and alarms?')) {
        appState.tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
        saveState(appState);
        queenAudio.playCelebration();
        showToast('Default routines restored');
        setTimeout(() => location.reload(), 400);
      }
    });
  }
}

// --- 10. REAL-TIME ALARM SCHEDULER & OVERLAY ---
let activeAlarmTask = null;
const firedToday = new Set(); // Prevent re-triggering the same minute

function initAlarmScheduler() {
  const overlay = document.getElementById('alarm-overlay');
  const doneBtn = document.getElementById('alarm-done-btn');
  const snoozeBtn = document.getElementById('alarm-snooze-btn');
  const dismissBtn = document.getElementById('alarm-dismiss-btn');

  // Check every 2 seconds
  setInterval(() => {
    checkPendingAlarms();
  }, 2000);

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      queenAudio.stopAlarmRinging();
      overlay.classList.add('hidden');
      if (activeAlarmTask) {
        activeAlarmTask.completed = true;
        saveState(appState);
        queenAudio.playCelebration();
        showToast(`✨ Completed: ${activeAlarmTask.name}!`);
        updateOverviewBar();
        // Refresh list if in flow tab
        const routinesTab = document.querySelector('.nav-tab[data-target="tab-routines"]');
        if (routinesTab && routinesTab.classList.contains('active')) {
          initTaskRoutines();
        }
      }
    });
  }

  if (snoozeBtn) {
    snoozeBtn.addEventListener('click', () => {
      queenAudio.stopAlarmRinging();
      overlay.classList.add('hidden');
      if (activeAlarmTask) {
        // Add 10 minutes to snooze
        const now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        const snoozedHour = String(now.getHours()).padStart(2, '0');
        const snoozedMin = String(now.getMinutes()).padStart(2, '0');
        activeAlarmTask.snoozedTime = `${snoozedHour}:${snoozedMin}`;
        saveState(appState);
        showToast(`⏳ Snoozed for 10 minutes (will ring at ${format12Hour(activeAlarmTask.snoozedTime)})`);
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      queenAudio.stopAlarmRinging();
      overlay.classList.add('hidden');
      showToast('Alarm dismissed');
    });
  }
}

function checkPendingAlarms() {
  const now = new Date();
  const currentHH = String(now.getHours()).padStart(2, '0');
  const currentMM = String(now.getMinutes()).padStart(2, '0');
  const currentTimeString = `${currentHH}:${currentMM}`;

  appState.tasks.forEach(task => {
    if (task.completed) return;

    const targetTime = task.snoozedTime || task.time;
    const triggerKey = `${task.id}_${targetTime}_${currentHH}:${currentMM}`;

    if (targetTime === currentTimeString && !firedToday.has(triggerKey)) {
      firedToday.add(triggerKey);
      if (task.snoozedTime) task.snoozedTime = null; // consume snooze
      saveState(appState);
      triggerAlarmModal(task);
    }
  });

  // Check 9:00 PM Evening Score prompt
  if (currentTimeString === '21:00' && appState.eveningReminder && !firedToday.has('evening_summary')) {
    firedToday.add('evening_summary');
    triggerEveningSummaryPrompt();
  }
}

function triggerAlarmModal(task) {
  activeAlarmTask = task;
  const overlay = document.getElementById('alarm-overlay');
  const title = document.getElementById('alarm-task-title');
  const cat = document.getElementById('alarm-task-category');
  const note = document.getElementById('alarm-task-note');

  if (title) title.textContent = task.name;
  if (cat) cat.textContent = `${getCategoryEmoji(task.category)} ${task.category.toUpperCase()}`;
  if (note) note.textContent = `"${task.note || "Take your time and smile. You've got this!"}"`;

  if (overlay) overlay.classList.remove('hidden');

  // Trigger continuous audio ring & vibration
  queenAudio.startAlarmRinging(task.sound || 'harp');

  // Also push native system notification if supported
  triggerSystemNotification(`Queen Bloom: Time for ${task.name}!`, task.note || "Tap to mark completed or snooze.");
}

function triggerEveningSummaryPrompt() {
  triggerSystemNotification("Queen Bloom: Daily Scorecard Ready!", "See how wonderfully you did today. Tap to celebrate your triumphs!");
  showToast("📊 Evening Scorecard is ready! Check how you did today.");
}
