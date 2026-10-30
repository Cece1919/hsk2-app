// CLB TOÁN M32 - TIMO Khối 6 Practice App Engine
// Phiên bản 2.0: Tích hợp Đám mây Cá nhân hóa & Nhật ký học viên

class TimoApp {
  constructor() {
    this.mockExams = (typeof TIMO_MOCK_EXAMS !== 'undefined' && Array.isArray(TIMO_MOCK_EXAMS))
      ? TIMO_MOCK_EXAMS
      : (typeof TIMO_DE1_DATA !== 'undefined' ? [TIMO_DE1_DATA] : []);
    this.currentExamIndex = 0;
    this.data = this.mockExams[this.currentExamIndex] || TIMO_DE1_DATA;
    this.topicsData = (typeof TIMO_TOPICAL_PRACTICE !== 'undefined')
      ? TIMO_TOPICAL_PRACTICE
      : null;
    this.storage = window.m32Storage;
    this.currentMode = 'practice'; // 'practice' | 'exam' | 'mistakes' | 'journal' | 'formulas'
    this.currentLang = 'bilingual'; // 'bilingual' | 'vi' | 'en'
    this.currentCategory = 'all';
    this.soundEnabled = true;

    // Exam state
    this.examState = {
      active: false,
      currentQuestionIndex: 0,
      answers: {}, // { [qId]: string }
      flags: {}, // { [qId]: boolean }
      startTime: null,
      timeRemaining: 90 * 60, // 90 mins in seconds
      timerInterval: null,
      submitted: false,
      results: null
    };

    // Practice state
    this.practiceAnswers = {}; // { [qId]: { answer: '', isCorrect: null, checked: false } }

    // Audio Context (Web Audio API)
    this.audioCtx = null;

    // Canvas Scratchpad state
    this.isDrawing = false;
    this.scratchpadColor = '#0a2647';
    this.scratchpadSize = 3;
    this.isEraser = false;

    this.init();
  }

  init() {
    this.updateUserHeader();
    this.renderHeaderStats();
    this.setupEventListeners();
    this.renderCurrentView();
    this.setupScratchpad();
    this.initAudio();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  findQuestionById(qId) {
    const numId = Number(qId);
    if (this.topicsData && this.topicsData.allQuestions) {
      const q = this.topicsData.allQuestions.find(item => item.id === numId || item.id === qId);
      if (q) return q;
    }
    if (this.mockExams) {
      for (const ex of this.mockExams) {
        const q = ex.questions.find(item => item.id === numId || item.id === qId);
        if (q) return q;
      }
    }
    if (this.data && this.data.questions) {
      const q = this.data.questions.find(item => item.id === numId || item.id === qId);
      if (q) return q;
    }
    return null;
  }

  selectExam(index) {
    if (this.mockExams && this.mockExams[index]) {
      this.currentExamIndex = index;
      this.data = this.mockExams[index];
      this.renderCurrentView();
    }
  }

  backToExamList() {
    this.examState.active = false;
    this.examState.submitted = false;
    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    if (type === 'correct') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const o = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + idx * 0.08);
        g.gain.setValueAtTime(0.2, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        o.connect(g);
        g.connect(this.audioCtx.destination);
        o.start(now + idx * 0.08);
        o.stop(now + idx * 0.08 + 0.3);
      });
    } else if (type === 'incorrect') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'fanfare') {
      const chords = [
        { f: 523.25, t: 0.0 },
        { f: 659.25, t: 0.12 },
        { f: 783.99, t: 0.24 },
        { f: 1046.50, t: 0.38 },
        { f: 1046.50, t: 0.55 },
        { f: 1046.50, t: 0.70 }
      ];
      chords.forEach(c => {
        const o = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(c.f, now + c.t);
        g.gain.setValueAtTime(0.25, now + c.t);
        g.gain.exponentialRampToValueAtTime(0.001, now + c.t + 0.3);
        o.connect(g);
        g.connect(this.audioCtx.destination);
        o.start(now + c.t);
        o.stop(now + c.t + 0.35);
      });
    }
  }

  // ==========================================
  // QUẢN LÝ TÀI KHOẢN & MODAL ĐĂNG NHẬP
  // ==========================================
  updateUserHeader() {
    const user = this.storage.getCurrentUser();
    const nameEl = document.getElementById('user-display-name');
    const headerLoginBtn = document.getElementById('btn-header-login');
    const headerLogoutBtn = document.getElementById('btn-header-logout');
    const modalLogoutBar = document.getElementById('modal-logout-bar');
    const modalStudentName = document.getElementById('modal-student-name');

    const isRealStudent = user && user.username !== 'hocthu';

    if (isRealStudent) {
      const displayName = user.fullName || user.username;
      if (nameEl) nameEl.textContent = displayName;
      if (headerLoginBtn) headerLoginBtn.classList.add('hidden');
      if (headerLogoutBtn) headerLogoutBtn.classList.remove('hidden');
      if (modalLogoutBar) modalLogoutBar.classList.remove('hidden');
      if (modalStudentName) modalStudentName.textContent = displayName;
    } else {
      if (nameEl) nameEl.textContent = 'Tài khoản học thử';
      if (headerLoginBtn) headerLoginBtn.classList.remove('hidden');
      if (headerLogoutBtn) headerLogoutBtn.classList.add('hidden');
      if (modalLogoutBar) modalLogoutBar.classList.add('hidden');
    }
  }

  openAuthModal(defaultTab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
    this.setAuthTab(defaultTab);
    this.updateUserHeader();
  }

  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  }

  setAuthTab(tab) {
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-register');
    const loginBtn = document.getElementById('tab-login-btn');
    const regBtn = document.getElementById('tab-register-btn');

    if (tab === 'login') {
      loginForm.classList.remove('hidden');
      regForm.classList.add('hidden');
      loginBtn.className = 'pb-2 border-b-2 border-navy-900 text-navy-900 flex-1 text-center';
      regBtn.className = 'pb-2 border-b-2 border-transparent text-slate-400 flex-1 text-center';
    } else {
      loginForm.classList.add('hidden');
      regForm.classList.remove('hidden');
      loginBtn.className = 'pb-2 border-b-2 border-transparent text-slate-400 flex-1 text-center';
      regBtn.className = 'pb-2 border-b-2 border-navy-900 text-navy-900 flex-1 text-center';
    }
  }

  handleLoginForm(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    const res = this.storage.login(username, pass);
    if (res.success) {
      this.closeAuthModal();
      this.updateUserHeader();
      this.renderHeaderStats();
      this.renderCurrentView();
      this.playSound('correct');
      alert(`Xin chào ${res.user.fullName}! Dữ liệu bài học của bạn đã được tải.`);
    } else {
      alert(res.message);
    }
  }

  handleRegisterForm(e) {
    e.preventDefault();
    const fullName = document.getElementById('reg-fullname').value;
    const username = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;

    const res = this.storage.register(username, fullName, pass, true);
    if (res.success) {
      this.closeAuthModal();
      this.updateUserHeader();
      this.renderHeaderStats();
      this.renderCurrentView();
      this.playSound('correct');
      alert(`Chúc mừng ${res.user.fullName}! Tài khoản học viên của bạn đã sẵn sàng.`);
    } else {
      alert(res.message);
    }
  }

  handleLogout() {
    this.storage.logout();
    this.storage.ensureSeedData();
    this.closeAuthModal();
    this.updateUserHeader();
    this.renderHeaderStats();
    this.renderCurrentView();
    alert("Đã đăng xuất! Hệ thống quay về Tài khoản học thử.");
  }

  quickSwitchStudent(username) {
    const res = this.storage.login(username, '123456');
    if (res.success) {
      this.closeAuthModal();
      this.updateUserHeader();
      this.renderHeaderStats();
      this.renderCurrentView();
      this.playSound('correct');
    }
  }

  handleSaveFirebaseConfig() {
    const input = document.getElementById('firebase-config-input');
    const msg = document.getElementById('firebase-connect-msg');
    if (!input || !msg) return;

    try {
      const configStr = input.value.trim();
      if (!configStr) {
        msg.textContent = 'Vui lòng dán mã JSON!';
        msg.className = 'text-[10px] font-bold text-rose-600';
        return;
      }
      const configObj = JSON.parse(configStr);
      if (!configObj.apiKey || !configObj.projectId) {
        msg.textContent = 'Mã thiếu apiKey hoặc projectId!';
        msg.className = 'text-[10px] font-bold text-rose-600';
        return;
      }

      const ok = this.storage.saveFirebaseConfig(configObj);
      if (ok) {
        msg.textContent = 'Đã kết nối Firebase Cloud thành công!';
        msg.className = 'text-[10px] font-bold text-emerald-600';
        this.updateUserHeader();
        this.playSound('correct');
      } else {
        msg.textContent = 'Không thể lưu cấu hình!';
        msg.className = 'text-[10px] font-bold text-rose-600';
      }
    } catch (err) {
      msg.textContent = 'Định dạng JSON chưa hợp lệ!';
      msg.className = 'text-[10px] font-bold text-rose-600';
    }
  }

  // ==========================================
  // QUẢN LÝ SỔ TAY CÂU SAI ĐÁM MÂY
  // ==========================================
  addMistake(qId, wrongAns = '') {
    this.storage.saveMistake(qId, wrongAns);
    this.renderHeaderStats();
  }

  removeMistake(qId) {
    this.storage.removeMistake(qId);
    this.renderHeaderStats();
    if (this.currentMode === 'mistakes') {
      this.renderMistakesView(document.getElementById('main-content'));
    }
  }

  renderHeaderStats() {
    const mistakes = this.storage.getMistakes();
    const count = Object.keys(mistakes).length;
    const badge = document.getElementById('mistake-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  setupEventListeners() {
    // Mode navigation tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Language toggle
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.currentLang = e.currentTarget.getAttribute('data-lang');
        document.querySelectorAll('[data-lang]').forEach(b => {
          b.classList.remove('bg-navy-700', 'text-white', 'shadow');
          b.classList.add('text-slate-600', 'hover:bg-slate-100');
        });
        e.currentTarget.classList.remove('text-slate-600', 'hover:bg-slate-100');
        e.currentTarget.classList.add('bg-navy-700', 'text-white', 'shadow');
        this.renderCurrentView();
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled 
          ? '<i class="fa-solid fa-volume-high"></i>' 
          : '<i class="fa-solid fa-volume-xmark text-rose-400"></i>';
      });
    }

    // Scratchpad toggle
    const scratchBtn = document.getElementById('btn-scratchpad-toggle');
    const scratchModal = document.getElementById('scratchpad-modal');
    if (scratchBtn && scratchModal) {
      scratchBtn.addEventListener('click', () => {
        scratchModal.classList.toggle('hidden');
        if (!scratchModal.classList.contains('hidden')) {
          this.resizeCanvas();
        }
      });
    }

    const closeScratchBtn = document.getElementById('btn-close-scratchpad');
    if (closeScratchBtn && scratchModal) {
      closeScratchBtn.addEventListener('click', () => {
        scratchModal.classList.add('hidden');
      });
    }
  }

  switchTab(tab) {
    if (this.examState.active && tab !== 'exam') {
      if (!confirm("Bạn đang trong bài thi thử tính giờ! Nếu rời khỏi, thời gian thi vẫn sẽ tiếp tục. Bạn có chắc chắn muốn chuyển tab?")) {
        return;
      }
    }
    this.currentMode = tab;
    document.querySelectorAll('[data-tab]').forEach(btn => {
      const active = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('text-navy-900', active);
      btn.classList.toggle('border-navy-900', active);
      btn.classList.toggle('font-bold', active);
      btn.classList.toggle('text-slate-500', !active);
      btn.classList.toggle('border-transparent', !active);
      btn.classList.toggle('font-medium', !active);
    });
    this.renderCurrentView();
  }

  renderCurrentView() {
    const container = document.getElementById('main-content');
    if (!container) return;

    if (this.currentMode === 'practice') {
      this.renderPracticeView(container);
    } else if (this.currentMode === 'exam') {
      this.renderExamView(container);
    } else if (this.currentMode === 'mistakes') {
      this.renderMistakesView(container);
    } else if (this.currentMode === 'journal') {
      this.renderJournalView(container);
    } else if (this.currentMode === 'formulas') {
      this.renderFormulasView(container);
    }

    this.renderMath();
  }

  renderMath() {
    if (window.renderMathInElement) {
      setTimeout(() => {
        renderMathInElement(document.getElementById('main-content'), {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      }, 50);
    }
  }

  // ==========================================
  // CHẾ ĐỘ 1: LUYỆN TẬP THEO CHUYÊN ĐỀ (TOPICAL PRACTICE)
  // ==========================================
  renderPracticeView(container) {
    const isTopical = !!(this.topicsData && this.topicsData.allQuestions);
    let allQs = isTopical ? this.topicsData.allQuestions : this.data.questions;
    let questions = allQs;
    if (this.currentCategory !== 'all') {
      questions = questions.filter(q => q.categoryId === this.currentCategory);
    }

    const categories = isTopical ? this.topicsData.categories : this.data.categories;
    const totalCount = allQs.length;

    const categoriesHtml = [
      { id: 'all', name: 'Tất cả', icon: 'fa-list-check' },
      ...categories
    ].map(cat => {
      const active = this.currentCategory === cat.id;
      return `
        <button onclick="window.timoApp.setCategory('${cat.id}')"
          class="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            active 
              ? 'bg-navy-900 text-white shadow-md ring-2 ring-navy-900/20' 
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }">
          <i class="fa-solid ${cat.icon || 'fa-tag'}"></i>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');

    const questionsHtml = questions.map(q => this.buildQuestionCard(q, 'practice')).join('');

    const currentUser = this.storage.getCurrentUser();
    const studentGreeting = currentUser 
      ? `<span class="text-amber-300 font-bold">Học viên: ${currentUser.fullName}</span> | ` 
      : '';

    const bannerTitle = isTopical 
      ? "Kho Luyện Thi Theo Chuyên Đề TIMO Khối 6" 
      : this.data.title;
    const bannerDesc = isTopical
      ? `${studentGreeting} Hệ thống câu hỏi tuyển chọn từ Bộ 6 đề luyện tập Vòng Chung kết Quốc gia TIMO Khối 6, chia đều 5 chuyên đề trọng điểm với gợi ý sư phạm và lời giải chi tiết.`
      : `${studentGreeting} Luyện tập tự do câu hỏi chuẩn quốc tế kèm gợi ý sư phạm và lời giải chi tiết từng bước. Hãy nháp cẩn thận và kiểm tra đáp số ngay sau mỗi câu!`;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Banner chào mừng M32 -->
        <div class="bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-navy-950 mb-3 shadow">
              <i class="fa-solid fa-layer-group"></i> Luyện Thi Chuyên Đề TIMO 6
            </span>
            <h1 class="text-xl md:text-3xl font-extrabold mb-2 tracking-tight">
              ${bannerTitle}
            </h1>
            <p class="text-slate-200 text-sm md:text-base leading-relaxed">
              ${bannerDesc}
            </p>
          </div>
          <div class="absolute -right-6 -bottom-6 opacity-10 text-white text-9xl pointer-events-none select-none font-serif">
            M32
          </div>
        </div>

        <!-- Bộ lọc phân môn -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${categoriesHtml}
        </div>

        <!-- Thống kê số lượng hiển thị -->
        <div class="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Đang hiển thị: <strong class="text-navy-900">${questions.length}</strong> câu hỏi</span>
          <span class="italic text-[11px]">Trích xuất từ Bộ 6 đề tự luyện VCK Quốc gia</span>
        </div>

        <!-- Danh sách câu hỏi -->
        <div class="space-y-6">
          ${questionsHtml}
        </div>
      </div>
    `;
  }

  setCategory(catId) {
    this.currentCategory = catId;
    this.renderCurrentView();
  }

  buildQuestionCard(q, mode) {
    const mistakes = this.storage.getMistakes();
    const mistakeData = mistakes[q.id];
    const isMistake = !!mistakeData;
    const userState = this.practiceAnswers[q.id] || { answer: '', isCorrect: null, checked: false };
    
    let questionText = '';
    if (this.currentLang === 'bilingual') {
      questionText = `
        <div class="space-y-3">
          <div class="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-slate-800 text-sm md:text-base font-serif leading-relaxed">
            <span class="font-sans font-bold text-blue-900 text-xs uppercase tracking-wider block mb-1">
              <i class="fa-solid fa-globe mr-1"></i> English:
            </span>
            ${q.questionEn}
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm md:text-base leading-relaxed">
            <span class="font-sans font-bold text-slate-700 text-xs uppercase tracking-wider block mb-1">
              <i class="fa-solid fa-language mr-1"></i> Tiếng Việt:
            </span>
            ${q.questionVi}
          </div>
        </div>
      `;
    } else if (this.currentLang === 'en') {
      questionText = `
        <div class="text-slate-800 text-base md:text-lg font-serif leading-relaxed p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          ${q.questionEn}
        </div>
      `;
    } else {
      questionText = `
        <div class="text-slate-800 text-base md:text-lg leading-relaxed p-4 bg-slate-50 rounded-xl border border-slate-200">
          ${q.questionVi}
        </div>
      `;
    }

    const imageHtml = q.image ? `
      <div class="my-4 p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center max-w-lg mx-auto shadow-sm">
        <img src="${q.image}" alt="Hình minh họa câu ${q.id}" class="max-h-64 object-contain rounded-lg">
        <span class="text-xs text-slate-400 mt-2 italic">Hình minh họa kỹ thuật số chuẩn CLB Toán M32</span>
      </div>
    ` : '';

    let feedbackBanner = '';
    if (userState.checked) {
      if (userState.isCorrect) {
        feedbackBanner = `
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center justify-between text-sm animate-fade-in">
            <div class="flex items-center gap-2 font-bold">
              <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
              <span>Xuất sắc! Đáp án chính xác: <span class="underline font-black text-emerald-900">${q.answer}</span> ${q.unit || ''}</span>
            </div>
            <button onclick="window.timoApp.toggleSolution(${q.id})" class="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline">
              Xem lời giải chi tiết
            </button>
          </div>
        `;
      } else {
        feedbackBanner = `
          <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center justify-between text-sm animate-fade-in">
            <div class="flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-circle-xmark text-rose-600 text-lg"></i>
              <span>Chưa chính xác! Câu này đã được lưu vào Sổ tay câu sai của bạn.</span>
            </div>
            <button onclick="window.timoApp.toggleHint(${q.id})" class="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg">
              <i class="fa-solid fa-lightbulb mr-1"></i> Xem gợi ý
            </button>
          </div>
        `;
      }
    }

    return `
      <div id="q-card-${q.id}" class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 md:p-6 relative">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-xl bg-navy-900 text-white font-extrabold flex items-center justify-center text-sm shadow">
              ${q.topicIndex || q.qNum || q.id}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              ${q.category}
            </span>
            ${q.source ? `
              <span class="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <i class="fa-solid fa-bookmark mr-1 text-blue-500"></i>${q.source}
              </span>
            ` : ''}
          </div>

          <div class="flex items-center gap-2">
            ${isMistake ? `
              <span class="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <i class="fa-solid fa-triangle-exclamation"></i> Sai ${mistakeData.count} lần
              </span>
            ` : ''}
            <button onclick="window.timoApp.toggleHint(${q.id})" class="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1" title="Gợi ý phương pháp">
              <i class="fa-regular fa-lightbulb"></i> Gợi ý
            </button>
            <button onclick="window.timoApp.openScratchpadForQuestion(${q.id})" class="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1" title="Mở bảng nháp">
              <i class="fa-solid fa-pen-to-square"></i> Nháp
            </button>
          </div>
        </div>

        ${questionText}
        ${imageHtml}

        <div class="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 flex-grow max-w-md">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
              Điền đáp số:
            </label>
            <div class="relative flex-grow">
              <input type="text" id="practice-input-${q.id}" 
                value="${userState.answer || ''}"
                placeholder="Nhập số hoặc phân số (vd: 37, 20/21)..." 
                class="w-full px-3.5 py-2 text-sm md:text-base font-bold text-navy-950 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-800 focus:bg-white transition-all">
              ${q.unit ? `<span class="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">${q.unit}</span>` : ''}
            </div>
            <button onclick="window.timoApp.checkPracticeAnswer(${q.id})" 
              class="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm rounded-xl shadow transition-all active:scale-95 whitespace-nowrap">
              Kiểm tra
            </button>
          </div>

          <button onclick="window.timoApp.toggleSolution(${q.id})" 
            class="text-xs md:text-sm font-semibold text-slate-600 hover:text-navy-900 flex items-center gap-1">
            <span>Lời giải chi tiết</span>
            <i class="fa-solid fa-chevron-down text-[10px] transition-transform" id="sol-icon-${q.id}"></i>
          </button>
        </div>

        <div class="mt-3">
          ${feedbackBanner}
        </div>

        <div id="hint-box-${q.id}" class="hidden mt-3 p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-slate-800 text-sm">
          <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <i class="fa-solid fa-lightbulb text-amber-500"></i> Gợi ý tư duy sư phạm:
          </div>
          <div class="text-slate-700 leading-relaxed font-serif">
            ${q.hint}
          </div>
        </div>

        <div id="solution-box-${q.id}" class="hidden mt-4 p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 border border-blue-200 rounded-2xl text-slate-800 text-sm md:text-base leading-relaxed">
          <div class="font-black text-navy-900 flex items-center justify-between border-b border-blue-100 pb-2 mb-3">
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-graduation-cap text-blue-700"></i>
              Lời giải chi tiết chuẩn Lớp 6 (CLB Toán M32)
            </span>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Đáp số: ${q.answer}
            </span>
          </div>
          <div class="prose prose-slate max-w-none text-slate-700 space-y-2 font-serif">
            ${q.solution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    `;
  }

  checkPracticeAnswer(qId) {
    const input = document.getElementById(`practice-input-${qId}`);
    if (!input) return;

    const val = input.value.trim().toLowerCase().replace(/\s+/g, '');
    const q = this.findQuestionById(qId);
    if (!q) return;

    if (!val) {
      alert("Vui lòng nhập đáp án trước khi bấm Kiểm tra!");
      return;
    }

    const isCorrect = q.acceptableAnswers.some(ans => {
      const normalizedAns = ans.trim().toLowerCase().replace(/\s+/g, '');
      return normalizedAns === val;
    });

    this.practiceAnswers[qId] = {
      answer: input.value.trim(),
      isCorrect: isCorrect,
      checked: true
    };

    if (isCorrect) {
      this.playSound('correct');
      this.removeMistake(qId);
    } else {
      this.playSound('incorrect');
      this.addMistake(qId, input.value.trim());
    }

    const cardEl = document.getElementById(`q-card-${qId}`);
    if (cardEl) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.buildQuestionCard(q, 'practice');
      cardEl.replaceWith(tempDiv.firstElementChild);
      this.renderMath();
    }
  }

  toggleHint(qId) {
    const box = document.getElementById(`hint-box-${qId}`);
    if (box) {
      box.classList.toggle('hidden');
      this.renderMath();
    }
  }

  toggleSolution(qId) {
    const box = document.getElementById(`solution-box-${qId}`);
    const icon = document.getElementById(`sol-icon-${qId}`);
    if (box) {
      box.classList.toggle('hidden');
      if (icon) {
        icon.classList.toggle('rotate-180', !box.classList.contains('hidden'));
      }
      this.renderMath();
    }
  }

  // ==========================================
  // CHẾ ĐỘ 2: THI THỬ 90 PHÚT (MOCK EXAM)
  // ==========================================
  renderExamView(container) {
    if (!this.examState.active && !this.examState.submitted) {
      const examSelectorHtml = this.mockExams.map((ex, idx) => {
        const isSelected = idx === this.currentExamIndex;
        return `
          <div onclick="window.timoApp.selectExam(${idx})"
            class="cursor-pointer p-3.5 md:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
              isSelected 
                ? 'border-navy-900 bg-blue-50/70 shadow-md ring-2 ring-navy-900/10' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl ${isSelected ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-700'} font-black flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                Đề ${idx + 1}
              </div>
              <div>
                <div class="font-extrabold text-navy-950 text-sm md:text-base">${ex.title}</div>
                <div class="text-xs text-slate-500 font-medium">Năm học ${ex.year} • 25 câu hỏi tự luận song ngữ • 90 phút</div>
              </div>
            </div>
            <div class="flex-shrink-0 ml-2">
              ${isSelected 
                ? '<span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-navy-900 text-white flex items-center gap-1 shadow-sm"><i class="fa-solid fa-check"></i> Đang chọn</span>'
                : '<span class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200">Chọn đề này</span>'
              }
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10 text-center space-y-6">
          <div class="w-20 h-20 mx-auto rounded-3xl bg-navy-900 text-white flex items-center justify-center text-3xl shadow-lg shadow-navy-950/20">
            <i class="fa-solid fa-stopwatch"></i>
          </div>

          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-navy-900 mb-2">
              Phòng thi giả lập Quốc gia
            </span>
            <h2 class="text-2xl md:text-3xl font-black text-navy-950 tracking-tight">
              Thi thử Vòng Chung kết Quốc gia TIMO Khối 6
            </h2>
            <p class="text-slate-500 text-sm md:text-base mt-2">
              Hệ thống 5 đề thi VCK Quốc gia chính thức (2016 – 2021) | Bản quyền khảo thí CLB Toán M32
            </p>
          </div>

          <!-- Bộ chọn đề thi 1 đến 5 -->
          <div class="text-left space-y-2.5">
            <label class="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
              <i class="fa-solid fa-layer-group text-blue-600 mr-1"></i> Chọn đề thi chính thức:
            </label>
            <div class="space-y-2">
              ${examSelectorHtml}
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 text-left">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div class="text-slate-400 text-xs font-bold uppercase">Thời gian</div>
              <div class="text-xl font-black text-navy-900 mt-1">90 Phút</div>
              <div class="text-[11px] text-slate-500">Đếm ngược liên tục</div>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div class="text-slate-400 text-xs font-bold uppercase">Số lượng câu</div>
              <div class="text-xl font-black text-navy-900 mt-1">25 Câu</div>
              <div class="text-[11px] text-slate-500">5 phân môn chuẩn</div>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div class="text-slate-400 text-xs font-bold uppercase">Thang điểm</div>
              <div class="text-xl font-black text-navy-900 mt-1">100 Điểm</div>
              <div class="text-[11px] text-slate-500">4 điểm mỗi câu đúng</div>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div class="text-slate-400 text-xs font-bold uppercase">Hình thức</div>
              <div class="text-xl font-black text-navy-900 mt-1">Điền số</div>
              <div class="text-[11px] text-slate-500">Tự luận số học</div>
            </div>
          </div>

          <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs md:text-sm text-amber-900 space-y-1.5">
            <div class="font-bold flex items-center gap-1.5 text-amber-950">
              <i class="fa-solid fa-circle-info text-amber-600"></i> Quy chế phòng thi:
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-700 font-serif">
              <li>Thí sinh không được sử dụng máy tính bỏ túi trong suốt thời gian làm bài.</li>
              <li>Chỉ điền kết quả cuối cùng (số nguyên hoặc phân số tối giản dạng a/b).</li>
              <li>Sử dụng nút "Bảng nháp" ở góc trên nếu cần tính toán hoặc vẽ hình.</li>
            </ul>
          </div>

          <button onclick="window.timoApp.startExam()" 
            class="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-navy-900 to-blue-800 hover:from-navy-800 hover:to-blue-700 text-white font-extrabold text-base md:text-lg rounded-2xl shadow-xl shadow-navy-900/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            <i class="fa-solid fa-play mr-2"></i> Bắt đầu làm ${this.data.title} ngay
          </button>
        </div>
      `;
      return;
    }

    if (this.examState.submitted) {
      this.renderExamResult(container);
      return;
    }

    const currentQ = this.data.questions[this.examState.currentQuestionIndex];
    const totalAnswered = Object.keys(this.examState.answers).filter(k => !!this.examState.answers[k].trim()).length;
    const isFlagged = !!this.examState.flags[currentQ.id];

    const chipsHtml = this.data.questions.map((q, idx) => {
      const isCurrent = idx === this.examState.currentQuestionIndex;
      const isAnswered = !!(this.examState.answers[q.id] && this.examState.answers[q.id].trim());
      const flagged = !!this.examState.flags[q.id];

      let chipClass = 'bg-slate-100 text-slate-700 border-slate-200';
      if (flagged) {
        chipClass = 'bg-amber-400 text-navy-950 font-bold border-amber-500 shadow-sm';
      } else if (isAnswered) {
        chipClass = 'bg-emerald-600 text-white font-bold border-emerald-700';
      }
      if (isCurrent) {
        chipClass += ' ring-2 ring-navy-900 ring-offset-2';
      }

      return `
        <button onclick="window.timoApp.jumpToQuestion(${idx})"
          class="w-9 h-9 rounded-xl border text-xs font-bold transition-all flex items-center justify-center relative ${chipClass}">
          ${idx + 1}
          ${flagged ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-600 rounded-full"></span>' : ''}
        </button>
      `;
    }).join('');

    let qText = '';
    if (this.currentLang === 'bilingual') {
      qText = `
        <div class="space-y-3">
          <div class="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-slate-800 text-sm md:text-base font-serif leading-relaxed">
            <span class="font-sans font-bold text-blue-900 text-xs uppercase tracking-wider block mb-1">
              <i class="fa-solid fa-globe mr-1"></i> English:
            </span>
            ${currentQ.questionEn}
          </div>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-sm md:text-base leading-relaxed">
            <span class="font-sans font-bold text-slate-700 text-xs uppercase tracking-wider block mb-1">
              <i class="fa-solid fa-language mr-1"></i> Tiếng Việt:
            </span>
            ${currentQ.questionVi}
          </div>
        </div>
      `;
    } else if (this.currentLang === 'en') {
      qText = `<div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 font-serif text-slate-800 text-base md:text-lg leading-relaxed">${currentQ.questionEn}</div>`;
    } else {
      qText = `<div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-base md:text-lg leading-relaxed">${currentQ.questionVi}</div>`;
    }

    const imgHtml = currentQ.image ? `
      <div class="my-4 p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center max-w-md mx-auto shadow-sm">
        <img src="${currentQ.image}" alt="Hình minh họa" class="max-h-60 object-contain rounded-lg">
      </div>
    ` : '';

    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-navy-900 text-white rounded-2xl p-4 md:p-5 shadow-xl flex items-center justify-between sticky top-4 z-20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
              <div class="text-xs text-slate-300 uppercase tracking-wider font-semibold">Thời gian còn lại</div>
              <div id="exam-timer-display" class="text-xl md:text-2xl font-black font-mono tracking-tight text-amber-400">
                ${this.formatTime(this.examState.timeRemaining)}
              </div>
            </div>
          </div>

          <div class="hidden sm:flex items-center gap-4">
            <div class="text-right">
              <div class="text-xs text-slate-300 font-semibold">Tiến độ làm bài</div>
              <div class="text-base font-bold">${totalAnswered} / 25 câu</div>
            </div>
            <div class="w-24 bg-white/20 rounded-full h-2 overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full transition-all" style="width: ${(totalAnswered / 25) * 100}%"></div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.timoApp.confirmSubmitExam()" 
              class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-black text-xs md:text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5">
              <i class="fa-solid fa-paper-plane"></i>
              <span>Nộp bài</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-3 space-y-6">
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 relative">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div class="flex items-center gap-3">
                  <span class="px-3.5 h-8 rounded-xl bg-navy-900 text-white font-black flex items-center justify-center text-sm shadow whitespace-nowrap">
                    Câu ${currentQ.qNum || (this.examState.currentQuestionIndex + 1)}
                  </span>
                  <div>
                    <div class="text-xs font-bold text-slate-700 uppercase tracking-wider">${currentQ.category}</div>
                    <div class="text-[11px] text-slate-400">${currentQ.categoryEn}</div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button onclick="window.timoApp.toggleExamFlag(${currentQ.id})" 
                    class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isFlagged 
                        ? 'bg-amber-400 text-navy-950 border-amber-500 shadow' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }">
                    <i class="fa-${isFlagged ? 'solid' : 'regular'} fa-flag text-sm"></i>
                    <span>${isFlagged ? 'Đã đánh dấu' : 'Xem lại sau'}</span>
                  </button>
                  <button onclick="window.timoApp.openScratchpadForQuestion(${currentQ.id})" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-pen-nib"></i>
                    <span>Nháp</span>
                  </button>
                </div>
              </div>

              ${qText}
              ${imgHtml}

              <div class="mt-6 pt-6 border-t border-slate-100">
                <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Đáp số của bạn (Final Answer):
                </label>
                <div class="relative max-w-sm">
                  <input type="text" id="exam-input-${currentQ.id}" 
                    value="${this.examState.answers[currentQ.id] || ''}"
                    oninput="window.timoApp.saveExamAnswer(${currentQ.id}, this.value)"
                    placeholder="Điền đáp án..." 
                    class="w-full px-4 py-3 text-lg font-black text-navy-950 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy-900 focus:bg-white focus:border-navy-900 transition-all">
                  ${currentQ.unit ? `<span class="absolute right-4 top-3.5 text-sm text-slate-400 font-medium">${currentQ.unit}</span>` : ''}
                </div>
              </div>

              <div class="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button onclick="window.timoApp.prevExamQuestion()" 
                  ${this.examState.currentQuestionIndex === 0 ? 'disabled' : ''}
                  class="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  <i class="fa-solid fa-arrow-left"></i> Câu trước
                </button>

                <span class="text-xs font-semibold text-slate-400">
                  Câu ${this.examState.currentQuestionIndex + 1} / 25
                </span>

                <button onclick="window.timoApp.nextExamQuestion()" 
                  ${this.examState.currentQuestionIndex === 24 ? 'disabled' : ''}
                  class="px-5 py-2.5 rounded-xl text-sm font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  Câu tiếp <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 class="font-extrabold text-navy-950 text-sm flex items-center justify-between">
                <span>Danh sách câu hỏi</span>
                <span class="text-xs font-semibold text-slate-400">${totalAnswered}/25 đã làm</span>
              </h3>

              <div class="grid grid-cols-5 gap-2">
                ${chipsHtml}
              </div>

              <div class="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-md bg-emerald-600"></span> Đã điền đáp số
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-md bg-amber-400"></span> Đã đánh dấu xem lại
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-md bg-slate-100 border border-slate-200"></span> Chưa trả lời
                </div>
              </div>

              <button onclick="window.timoApp.confirmSubmitExam()" 
                class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-check-double"></i> Nộp bài thi
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  startExam() {
    this.examState.active = true;
    this.examState.submitted = false;
    this.examState.currentQuestionIndex = 0;
    this.examState.answers = {};
    this.examState.flags = {};
    this.examState.timeRemaining = 90 * 60;
    this.examState.startTime = Date.now();

    if (this.examState.timerInterval) clearInterval(this.examState.timerInterval);

    this.examState.timerInterval = setInterval(() => {
      this.examState.timeRemaining--;
      const display = document.getElementById('exam-timer-display');
      if (display) {
        display.textContent = this.formatTime(this.examState.timeRemaining);
      }

      if (this.examState.timeRemaining <= 0) {
        clearInterval(this.examState.timerInterval);
        alert("Đã hết 90 phút thi quy định! Hệ thống đang tự động nộp bài.");
        this.submitExam();
      }
    }, 1000);

    this.renderCurrentView();
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  saveExamAnswer(qId, val) {
    this.examState.answers[qId] = val;
  }

  toggleExamFlag(qId) {
    this.examState.flags[qId] = !this.examState.flags[qId];
    this.renderCurrentView();
  }

  jumpToQuestion(idx) {
    this.examState.currentQuestionIndex = idx;
    this.renderCurrentView();
  }

  prevExamQuestion() {
    if (this.examState.currentQuestionIndex > 0) {
      this.examState.currentQuestionIndex--;
      this.renderCurrentView();
    }
  }

  nextExamQuestion() {
    if (this.examState.currentQuestionIndex < 24) {
      this.examState.currentQuestionIndex++;
      this.renderCurrentView();
    }
  }

  confirmSubmitExam() {
    const totalAnswered = Object.keys(this.examState.answers).filter(k => !!this.examState.answers[k].trim()).length;
    const unanswered = 25 - totalAnswered;
    const msg = unanswered > 0 
      ? `Bạn còn ${unanswered} câu chưa điền đáp án. Bạn có chắc chắn muốn nộp bài ngay bây giờ?` 
      : `Bạn đã hoàn thành cả 25 câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm số?`;

    if (confirm(msg)) {
      this.submitExam();
    }
  }

  submitExam() {
    if (this.examState.timerInterval) {
      clearInterval(this.examState.timerInterval);
    }
    this.examState.active = false;
    this.examState.submitted = true;

    let correctCount = 0;
    const details = [];
    const categoryScores = {
      logic: { correct: 0, total: 5, name: 'Tư duy logic' },
      arithmetic: { correct: 0, total: 5, name: 'Số học' },
      number_theory: { correct: 0, total: 5, name: 'Lý thuyết số' },
      geometry: { correct: 0, total: 5, name: 'Hình học' },
      combinatorics: { correct: 0, total: 5, name: 'Tổ hợp' }
    };

    this.data.questions.forEach(q => {
      const userAns = (this.examState.answers[q.id] || '').trim().toLowerCase().replace(/\s+/g, '');
      const isCorrect = q.acceptableAnswers.some(ans => {
        return ans.trim().toLowerCase().replace(/\s+/g, '') === userAns;
      });

      if (isCorrect) {
        correctCount++;
        categoryScores[q.categoryId].correct++;
      } else {
        // Lưu vào sổ tay câu sai trên Cloud
        this.addMistake(q.id, this.examState.answers[q.id] || '(Bỏ trống)');
      }

      details.push({
        q,
        userAns: this.examState.answers[q.id] || '(Chưa điền)',
        isCorrect
      });
    });

    const totalScore = correctCount * 4;
    const timeSpentSeconds = 90 * 60 - this.examState.timeRemaining;

    let medal = { name: 'Chứng nhận hoàn thành (Merit)', color: 'slate', icon: 'fa-certificate' };
    if (totalScore >= 80) {
      medal = { name: 'Huy chương Vàng (Gold Medal)', color: 'amber', icon: 'fa-medal' };
    } else if (totalScore >= 60) {
      medal = { name: 'Huy chương Bạc (Silver Medal)', color: 'slate', icon: 'fa-medal' };
    } else if (totalScore >= 40) {
      medal = { name: 'Huy chương Đồng (Bronze Medal)', color: 'orange', icon: 'fa-medal' };
    }

    this.examState.results = {
      title: this.data.title,
      examId: this.data.id,
      score: totalScore,
      correctCount,
      totalQuestions: 25,
      timeSpent: this.formatTime(timeSpentSeconds),
      medal,
      categoryScores,
      details
    };

    // Lưu bài thi vào Nhật ký học viên trên Cloud
    this.storage.saveExamResult(this.examState.results);

    if (totalScore >= 60) {
      this.playSound('fanfare');
      this.triggerConfetti();
    } else {
      this.playSound('correct');
    }

    this.renderCurrentView();
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }

  renderExamResult(container) {
    const res = this.examState.results;
    if (!res) return;

    const catCards = Object.values(res.categoryScores).map(c => {
      const percent = (c.correct / c.total) * 100;
      return `
        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>${c.name}</span>
            <span class="text-navy-900">${c.correct}/${c.total} câu</span>
          </div>
          <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div class="bg-navy-900 h-full rounded-full transition-all" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    }).join('');

    const reviewQuestionsHtml = res.details.map((d, d_idx) => {
      const q = d.q;
      return `
        <div class="p-4 rounded-2xl border ${d.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'} space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm text-navy-950">
              Câu ${q.qNum || (d_idx + 1)}: ${q.category}
            </span>
            <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${d.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${d.isCorrect ? '<i class="fa-solid fa-check mr-1"></i> Đúng (+4đ)' : '<i class="fa-solid fa-xmark mr-1"></i> Sai (0đ)'}
            </span>
          </div>
          <div class="text-xs text-slate-600 font-serif">
            ${this.currentLang === 'en' ? q.questionEn : q.questionVi}
          </div>
          <div class="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-200/60">
            <div>Đáp án của bạn: <strong class="${d.isCorrect ? 'text-emerald-700' : 'text-rose-700'}">${d.userAns}</strong></div>
            <div>Đáp án chuẩn: <strong class="text-navy-900">${q.answer}</strong></div>
            <button onclick="window.timoApp.toggleSolution(${q.id})" class="text-blue-700 font-bold hover:underline ml-auto">
              Xem lời giải chi tiết
            </button>
          </div>
          <div id="solution-box-${q.id}" class="hidden mt-3 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-serif">
            ${q.solution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div class="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 rounded-3xl p-6 md:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-navy-950 shadow">
            <i class="fa-solid ${res.medal.icon}"></i> ${res.medal.name}
          </div>

          <div>
            <div class="text-slate-300 text-sm font-semibold uppercase tracking-wider">Tổng điểm đạt được</div>
            <div class="text-5xl md:text-7xl font-black text-amber-400 tracking-tight mt-1 font-mono">
              ${res.score} <span class="text-2xl md:text-3xl font-bold text-white">/ 100</span>
            </div>
            <p class="text-slate-300 text-sm mt-2">
              Trả lời đúng <strong>${res.correctCount} / 25</strong> câu trong thời gian <strong>${res.timeSpent}</strong>
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-white/10 text-left text-slate-900">
            ${catCards}
          </div>

          <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button onclick="window.timoApp.startExam()" 
              class="px-6 py-3 bg-white text-navy-900 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-lg transition-all">
              <i class="fa-solid fa-rotate-right mr-1.5"></i> Thi lại đề này
            </button>
            <button onclick="window.timoApp.backToExamList()" 
              class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all">
              <i class="fa-solid fa-layer-group mr-1.5"></i> Đổi đề thi khác
            </button>
            <button onclick="window.timoApp.switchTab('journal')" 
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all">
              <i class="fa-solid fa-chart-line mr-1.5"></i> Xem nhật ký thi
            </button>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">
          <h3 class="text-lg font-black text-navy-950 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>Chi tiết đối chiếu kết quả 25 câu hỏi</span>
            <span class="text-xs text-slate-400 font-medium">Click xem lời giải chi tiết bên dưới mỗi câu</span>
          </h3>

          <div class="space-y-3">
            ${reviewQuestionsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // CHẾ ĐỘ 3: SỔ TAY CÂU SAI ĐÁM MÂY (MISTAKE BANK)
  // ==========================================
  renderMistakesView(container) {
    const user = this.storage.getCurrentUser();
    const mistakes = this.storage.getMistakes();
    const mistakeIds = Object.keys(mistakes).map(Number);
    const mistakeQuestions = mistakeIds.map(id => this.findQuestionById(id)).filter(Boolean);

    const studentName = user ? user.fullName : 'Bạn';

    if (mistakeQuestions.length === 0) {
      container.innerHTML = `
        <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">
            <i class="fa-solid fa-shield-heart"></i>
          </div>
          <h2 class="text-xl font-extrabold text-navy-950">Tuyệt vời, ${studentName}! Sổ tay câu sai đang trống</h2>
          <p class="text-slate-500 text-sm">
            Bạn chưa có câu hỏi nào bị làm sai, hoặc bạn đã ôn lại và hoàn thành chính xác tất cả các câu trước đó!
          </p>
          <button onclick="window.timoApp.switchTab('practice')" 
            class="px-6 py-2.5 bg-navy-900 text-white font-bold text-sm rounded-xl shadow hover:bg-navy-800 transition-all">
            Luyện tập các câu hỏi khác
          </button>
        </div>
      `;
      return;
    }

    const cardsHtml = mistakeQuestions.map(q => {
      const m = mistakes[q.id];
      return `
        <div id="mistake-card-${q.id}" class="bg-white rounded-2xl border-2 border-rose-100 shadow-sm hover:shadow-md transition-all p-5 md:p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-sm shadow">
                ${q.topicIndex || q.qNum || q.id}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                ${q.category}
              </span>
              ${q.source ? `
                <span class="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100/50 text-rose-800 border border-rose-200">
                  ${q.source}
                </span>
              ` : ''}
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl">
                <i class="fa-solid fa-rotate-left mr-1"></i> Đã sai ${m.count} lần
              </span>
              <button onclick="window.timoApp.openScratchpadForQuestion(${q.id})" class="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg">
                <i class="fa-solid fa-pen-to-square"></i> Nháp
              </button>
            </div>
          </div>

          <div class="text-sm md:text-base text-slate-800 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border border-slate-200">
            ${this.currentLang === 'en' ? q.questionEn : q.questionVi}
          </div>

          ${q.image ? `
            <div class="p-3 bg-white rounded-xl border border-slate-200 flex justify-center">
              <img src="${q.image}" alt="Hình minh họa" class="max-h-52 object-contain">
            </div>
          ` : ''}

          <!-- Khu vực làm lại câu sai trực tiếp -->
          <div class="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-3">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Lần làm trước bạn điền: <strong class="text-rose-700">${m.wrongAnswer || '(Bỏ trống)'}</strong></span>
              <span class="text-[11px] text-slate-400">Ghi nhận: ${m.lastDate || ''}</span>
            </div>

            <div class="flex items-center gap-2">
              <input type="text" id="retry-input-${q.id}" placeholder="Tính toán lại và nhập đáp số đúng..."
                class="flex-grow px-3.5 py-2 text-sm font-bold bg-white border border-rose-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none">
              <button onclick="window.timoApp.retryMistakeAnswer(${q.id})"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm rounded-xl shadow transition-all active:scale-95 whitespace-nowrap">
                <i class="fa-solid fa-check mr-1"></i> Phục thù
              </button>
              <button onclick="window.timoApp.toggleSolution(${q.id})" class="px-3 py-2 bg-white text-slate-600 border border-slate-200 text-xs font-bold rounded-xl hover:bg-slate-50">
                Xem giải
              </button>
            </div>
          </div>

          <div id="solution-box-${q.id}" class="hidden p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-700 font-serif leading-relaxed">
            <div class="font-bold text-navy-900 mb-2">Lời giải chi tiết chuẩn Lớp 6:</div>
            ${q.solution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-rose-900 to-red-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white mb-2">
              <i class="fa-solid fa-cloud-arrow-up"></i> Sổ tay đám mây của ${studentName}
            </span>
            <h2 class="text-xl md:text-2xl font-black">
              Sổ tay câu sai (${mistakeQuestions.length} câu cần phục thù)
            </h2>
            <p class="text-rose-100 text-xs md:text-sm mt-1">
              Dữ liệu được lưu vĩnh viễn trên tài khoản của bạn. Khi bạn nhập đúng đáp số tại ô "Phục thù", câu hỏi sẽ tự động được xóa khỏi sổ tay!
            </p>
          </div>

          <button onclick="if(confirm('Bạn có chắc chắn muốn xóa toàn bộ câu sai trong sổ tay của bạn?')) { window.timoApp.storage.clearAllMistakes(); window.timoApp.renderCurrentView(); window.timoApp.renderHeaderStats(); }"
            class="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap border border-white/20">
            <i class="fa-solid fa-trash-can mr-1"></i> Xóa sổ tay
          </button>
        </div>

        <div class="space-y-6">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  retryMistakeAnswer(qId) {
    const input = document.getElementById(`retry-input-${qId}`);
    if (!input) return;

    const val = input.value.trim().toLowerCase().replace(/\s+/g, '');
    const q = this.findQuestionById(qId);
    if (!q || !val) {
      alert("Vui lòng nhập đáp án tính toán lại!");
      return;
    }

    const isCorrect = q.acceptableAnswers.some(ans => {
      return ans.trim().toLowerCase().replace(/\s+/g, '') === val;
    });

    if (isCorrect) {
      this.playSound('correct');
      this.removeMistake(qId);
      alert(`Chính xác tuyệt đối! Câu ${qId} đã được xóa thành công khỏi Sổ tay câu sai của bạn.`);
    } else {
      this.playSound('incorrect');
      this.addMistake(qId, input.value.trim());
      alert(`Vẫn chưa chính xác! Bạn hãy bấm "Xem giải" hoặc mở Bảng nháp để tính lại nhé.`);
    }
  }

  // ==========================================
  // CHẾ ĐỘ 4: NHẬT KÝ LUYỆN THI CÁ NHÂN (JOURNAL)
  // ==========================================
  renderJournalView(container) {
    const user = this.storage.getCurrentUser();
    const history = this.storage.getExamHistory();
    const mistakes = this.storage.getMistakes();

    const studentName = user ? user.fullName : 'Học viên M32';
    const totalExams = history.length;
    const bestScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : 0;
    const avgScore = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;
    const pendingMistakes = Object.keys(mistakes).length;

    const historyRows = history.map((item, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
        <td class="py-3.5 px-4 font-bold text-slate-400 text-xs">#${totalExams - idx}</td>
        <td class="py-3.5 px-4 text-xs font-semibold text-slate-700">
          <div>${item.date}</div>
          <div class="text-[11px] text-slate-400">${item.time}</div>
        </td>
        <td class="py-3.5 px-4 text-sm font-bold text-navy-950">${item.title}</td>
        <td class="py-3.5 px-4 font-mono font-black text-base ${item.score >= 80 ? 'text-amber-600' : (item.score >= 60 ? 'text-blue-700' : 'text-slate-700')}">
          ${item.score}/100
        </td>
        <td class="py-3.5 px-4 text-xs font-semibold text-slate-600">
          ${item.correctCount}/${item.totalQuestions} câu
        </td>
        <td class="py-3.5 px-4 text-xs font-mono text-slate-500">${item.timeSpent}</td>
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
            item.score >= 80 ? 'bg-amber-100 text-amber-800' : (item.score >= 60 ? 'bg-slate-100 text-slate-800' : 'bg-orange-100 text-orange-800')
          }">
            <i class="fa-solid ${item.medal ? item.medal.icon : 'fa-award'}"></i>
            ${item.medal ? item.medal.name.split('(')[0] : 'Hoàn thành'}
          </span>
        </td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Nhật ký -->
        <div class="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold">
              <i class="fa-solid fa-chart-line text-amber-400"></i>
            </div>
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-1">
                Nhật ký học tập cá nhân
              </span>
              <h2 class="text-xl md:text-3xl font-black tracking-tight">
                Hồ sơ tiến bộ của ${studentName}
              </h2>
              <p class="text-slate-300 text-xs md:text-sm">
                Theo dõi điểm số qua các kỳ thi thử và mức độ khắc phục lỗ hổng kiến thức.
              </p>
            </div>
          </div>

          <button onclick="window.timoApp.switchTab('exam')" class="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-black text-xs md:text-sm rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap">
            <i class="fa-solid fa-play mr-1.5"></i> Làm bài thi mới
          </button>
        </div>

        <!-- 4 Thẻ KPI Chỉ số -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-slate-400 text-xs font-bold uppercase tracking-wider">Bài thi đã làm</div>
            <div class="text-3xl font-black text-navy-950 mt-1 font-mono">${totalExams}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">Lượt thi thử 90 phút</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-slate-400 text-xs font-bold uppercase tracking-wider">Điểm cao nhất</div>
            <div class="text-3xl font-black text-amber-500 mt-1 font-mono">${bestScore}<span class="text-base text-slate-400">/100</span></div>
            <div class="text-[11px] text-slate-500 mt-0.5">Thành tích kỷ lục</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-slate-400 text-xs font-bold uppercase tracking-wider">Điểm trung bình</div>
            <div class="text-3xl font-black text-blue-700 mt-1 font-mono">${avgScore}<span class="text-base text-slate-400">/100</span></div>
            <div class="text-[11px] text-slate-500 mt-0.5">Phong độ luyện thi</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-slate-400 text-xs font-bold uppercase tracking-wider">Câu sai cần khắc phục</div>
            <div class="text-3xl font-black text-rose-600 mt-1 font-mono">${pendingMistakes}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">Đang chờ phục thù</div>
          </div>
        </div>

        <!-- Bảng lịch sử các lần thi thử -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-black text-navy-950 text-base flex items-center gap-2">
              <i class="fa-solid fa-list-ol text-blue-600"></i>
              <span>Lịch sử các lần thi thử Quốc gia</span>
            </h3>
            <span class="text-xs text-slate-400 font-medium">Lưu tự động trên Đám mây M32</span>
          </div>

          ${totalExams === 0 ? `
            <div class="p-10 text-center text-slate-400 text-sm">
              <i class="fa-solid fa-clock-rotate-left text-3xl mb-2 block text-slate-300"></i>
              Bạn chưa thực hiện bài thi thử nào. Hãy nhấn "Thi thử 90 phút" để bắt đầu tích lũy điểm số nhé!
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th class="py-3 px-4">Lần</th>
                    <th class="py-3 px-4">Ngày thi</th>
                    <th class="py-3 px-4">Tên bài thi</th>
                    <th class="py-3 px-4">Điểm số</th>
                    <th class="py-3 px-4">Đúng</th>
                    <th class="py-3 px-4">Thời gian</th>
                    <th class="py-3 px-4">Huy chương</th>
                  </tr>
                </thead>
                <tbody>
                  ${historyRows}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ==========================================
  // CHẾ ĐỘ 5: BÍ KÍP CÔNG THỨC (CHEATSHEET)
  // ==========================================
  renderFormulasView(container) {
    const formulas = window.FORMULA_CHEATSHEET || [
      {
        title: "Hàm phi Euler $\\varphi(n)$",
        category: "Lý thuyết số",
        summary: "Đếm số các số nguyên dương nhỏ hơn $n$ và nguyên tố cùng nhau với $n$.",
        formula: "\\varphi(n) = n \\times \\left(1 - \\frac{1}{p_1}\\right) \\left(1 - \\frac{1}{p_2}\\right) \\dots \\left(1 - \\frac{1}{p_k}\\right)",
        example: "Với $1386 = 2 \\times 3^2 \\times 7 \\times 11$:<br>$\\varphi(1386) = 1386 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{6}{7} \\times \\frac{10}{11} = 360$."
      },
      {
        title: "Công thức Legendre (Số chữ số 0 tận cùng của $n!$)",
        category: "Lý thuyết số",
        summary: "Tính số mũ của thừa số nguyên tố $p$ (đặc biệt $p = 5$) trong phân tích tiêu chuẩn của $n!$.",
        formula: "E_p(n!) = \\left\\lfloor \\frac{n}{p} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^3} \\right\\rfloor + \\dots",
        example: "Số chữ số 0 tận cùng của $150!$ bằng số mũ của thừa số 5:<br>$E_5(150!) = \\lfloor 150/5 \\rfloor + \\lfloor 150/25 \\rfloor + \\lfloor 150/125 \\rfloor = 30 + 6 + 1 = 37$."
      },
      {
        title: "Số lượng ước số nguyên dương của một số tự nhiên",
        category: "Lý thuyết số",
        summary: "Nếu $N = p_1^{a_1} \\cdot p_2^{a_2} \\dots p_k^{a_k}$ là phân tích thừa số nguyên tố của $N$, thì tổng số ước nguyên dương được tính theo công thức:",
        formula: "d(N) = (a_1 + 1)(a_2 + 1) \\dots (a_k + 1)",
        example: "Với $360 = 2^3 \\times 3^2 \\times 5^1$:<br>Số ước nguyên dương là: $d(360) = (3 + 1)(2 + 1)(1 + 1) = 4 \\times 3 \\times 2 = 24$ ước."
      },
      {
        title: "Chuỗi sai phân triệt tiêu (Telescoping)",
        category: "Số học",
        summary: "Tách phân số có mẫu là tích 2 số cách đều $k$ đơn vị để triệt tiêu phần giữa khi cộng dồn.",
        formula: "\\frac{k}{n(n+k)} = \\frac{1}{n} - \\frac{1}{n+k}",
        example: "$\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{20 \\times 21} = 1 - \\frac{1}{21} = \\frac{20}{21}$."
      },
      {
        title: "Tổng dãy số cách đều & Số số hạng",
        category: "Số học",
        summary: "Công thức tính nhanh số số hạng và tổng của một cấp số cộng có khoảng cách $d$ không đổi.",
        formula: "\\text{Số số hạng} = \\frac{\\text{Cuối} - \\text{Đầu}}{d} + 1, \\quad S = \\frac{(\\text{Đầu} + \\text{Cuối}) \\times \\text{Số số hạng}}{2}",
        example: "Tính $S = 2 + 5 + 8 + \\dots + 59$:<br>Số số hạng $= (59 - 2)/3 + 1 = 20$. Tổng $S = (2 + 59) \\times 20 / 2 = 610$."
      },
      {
        title: "Bổ đề diện tích điểm trong hình bình hành / hình chữ nhật",
        category: "Hình học",
        summary: "Với mọi điểm $P$ nằm trong hình bình hành $ABCD$, tổng diện tích 2 tam giác đối đỉnh bằng đúng một nửa diện tích hình bình hành.",
        formula: "S(\\Delta APD) + S(\\Delta BCP) = S(\\Delta ABP) + S(\\Delta CDP) = 50\\% \\times S(ABCD)",
        example: "Nếu $S(\\Delta APD) = 74$ và $S(\\Delta BCP) = 13\\% S$, thì $74 + 13\\% S = 50\\% S \\implies 37\\% S = 74 \\implies S = 200$."
      },
      {
        title: "Góc trong & Tổng góc trong của đa giác $n$ cạnh",
        category: "Hình học",
        summary: "Tổng số đo tất cả các góc trong của đa giác lồi $n$ cạnh và số đo mỗi góc trong của đa giác đều.",
        formula: "\\sum = (n - 2) \\times 180^\\circ, \\quad \\text{Góc đều} = \\frac{(n - 2) \\times 180^\\circ}{n}",
        example: "Thập nhị giác đều ($n = 12$ cạnh):<br>Tổng góc $= (12 - 2) \\times 180^\\circ = 1800^\\circ$. Mỗi góc $= 1800^\\circ / 12 = 150^\\circ$."
      },
      {
        title: "Tối ưu hóa chu vi hình chữ nhật",
        category: "Hình học",
        summary: "Khi diện tích hình chữ nhật cố định, chu vi nhỏ nhất khi hai kích thước chiều dài và chiều rộng gần bằng nhau nhất.",
        formula: "a \\times b = S \\implies P = 2(a + b) \\text{ đạt min khi } |a - b| \\text{ nhỏ nhất}",
        example: "Với $S = 504$, vì $\\sqrt{504} \\approx 22.45$, ta chọn cặp ước nguyên gần 22 nhất là $21 \\times 24 = 504 \\implies P_{\\min} = 2(21 + 24) = 90$."
      },
      {
        title: "Nguyên lý lồng chim bồ câu (Dirichlet)",
        category: "Tổ hợp",
        summary: "Nếu nhốt $n + 1$ chú thỏ vào $n$ chiếc lồng thì luôn có ít nhất một lồng chứa từ 2 chú thỏ trở lên.",
        formula: "\\text{Số phần tử cần chọn} = \\text{Số lượng tối đa trường hợp xấu nhất} + 1",
        example: "Để chọn các số từ 1 đến 222 sao cho có 2 số có hiệu bằng 32: Số tối đa chọn được mà không cặp nào có hiệu bằng 32 là 126 $\\implies$ Cần chọn ít nhất $126 + 1 = 127$ số."
      },
      {
        title: "Tổ hợp chọn cặp đôi $\\binom{n}{2}$ & Số đường chéo đa giác",
        category: "Tổ hợp",
        summary: "Số cách chọn 2 phần tử tùy ý từ $n$ phần tử không phân biệt thứ tự, và số đường chéo của đa giác $n$ đỉnh.",
        formula: "\\binom{n}{2} = \\frac{n(n - 1)}{2}, \\quad \\text{Số đường chéo} = \\frac{n(n - 3)}{2}",
        example: "Chọn 2 người bắt tay từ 10 người: $\\binom{10}{2} = \\frac{10 \\times 9}{2} = 45$ cái bắt tay.<br>Bát giác ($n = 8$) có: $8 \\times (8 - 3) / 2 = 20$ đường chéo."
      }
    ];

    const cardsHtml = formulas.map((f, idx) => `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-navy-900 uppercase tracking-wider">
            ${f.category}
          </span>
          <span class="text-xs text-slate-400 font-semibold">Bí kíp #${idx + 1}</span>
        </div>

        <h3 class="text-lg font-extrabold text-navy-950 font-serif">
          ${f.title}
        </h3>

        <p class="text-sm text-slate-600 leading-relaxed font-serif">
          ${f.summary}
        </p>

        <div class="p-4 bg-gradient-to-r from-blue-900 to-navy-900 text-white rounded-2xl text-center shadow-inner overflow-x-auto">
          <div class="text-base md:text-lg font-mono font-bold">
            $$${f.formula}$$
          </div>
        </div>

        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-serif">
          <strong class="text-navy-900 block font-sans mb-1 font-bold">Ví dụ áp dụng:</strong>
          ${f.example}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-navy-900 via-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-navy-950 mb-2 shadow">
            <i class="fa-solid fa-key"></i> Cheat Sheet TIMO 6
          </span>
          <h2 class="text-xl md:text-2xl font-black">
            Cẩm nang công thức & Bổ đề vàng thi TIMO Khối 6
          </h2>
          <p class="text-slate-200 text-xs md:text-sm mt-1">
            Tổng hợp các công thức then chốt giúp giải nhanh các bài toán khó thuộc phân môn Lý thuyết số, Số học, Hình học và Tổ hợp.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  // ==========================================
  // BẢNG NHÁP ĐIỆN TỬ (CANVAS SCRATCHPAD)
  // ==========================================
  setupScratchpad() {
    const canvas = document.getElementById('scratchpad-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const startDraw = (e) => {
      this.isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      ctx.lineWidth = this.scratchpadSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (this.isEraser) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = this.scratchpadSize * 3;
      } else {
        ctx.strokeStyle = this.scratchpadColor;
      }

      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
    };

    const stopDraw = () => {
      this.isDrawing = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    document.querySelectorAll('[data-color]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.isEraser = false;
        this.scratchpadColor = e.currentTarget.getAttribute('data-color');
        document.querySelectorAll('[data-color]').forEach(b => b.classList.remove('ring-2', 'ring-navy-900', 'scale-110'));
        e.currentTarget.classList.add('ring-2', 'ring-navy-900', 'scale-110');
      });
    });

    const eraserBtn = document.getElementById('btn-tool-eraser');
    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => {
        this.isEraser = true;
        document.querySelectorAll('[data-color]').forEach(b => b.classList.remove('ring-2', 'ring-navy-900', 'scale-110'));
      });
    }

    const clearBtn = document.getElementById('btn-tool-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }

  resizeCanvas() {
    const canvas = document.getElementById('scratchpad-canvas');
    if (canvas) {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }

  openScratchpadForQuestion(qId) {
    const modal = document.getElementById('scratchpad-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.resizeCanvas();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.timoApp = new TimoApp();
});
