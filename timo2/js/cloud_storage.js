// CLB TOÁN M32 — ĐIỀU PHỐI LƯU TRỮ ĐA HỌC VIÊN & ĐỒNG BỘ ĐÁM MÂY (DUAL-ENGINE CLOUD STORAGE)
// Khối Lớp 2 (TIMO 2) - Phân lập 100% dữ liệu độc lập
// Hỗ trợ đồng bộ 2 chiều (Two-Way Sync) Google Firebase Firestore & Bộ nhớ đa người dùng độc lập

class M32CloudStorage {
  constructor() {
    this.firebaseApp = null;
    this.firestore = null;
    this.isCloudConnected = false;
    this.currentUser = null;

    // Keys phân lập tuyệt đối cho Khối Lớp 2
    this.GRADE_ID = 'timo2';
    this.STORAGE_PREFIX = 'm32_' + this.GRADE_ID + '_';
    this.USERS_KEY = this.STORAGE_PREFIX + 'users_registry';
    this.SESSION_KEY = this.STORAGE_PREFIX + 'current_session';
    this.FIREBASE_CONFIG_KEY = this.STORAGE_PREFIX + 'firebase_config';
    this.FIRESTORE_COLLECTION = 'm32_' + this.GRADE_ID + '_students';

    this.init();
  }

  init() {
    // 1. Khôi phục phiên đăng nhập của học sinh trước
    this.restoreSession();

    // 2. Khởi tạo tài khoản mẫu nếu hệ thống mới tinh
    this.ensureSeedData();

    // 3. Tải và kết nối cấu hình Firebase Cloud nếu có
    this.initFirebase();

    // 4. Lắng nghe sự kiện chuyển đổi cửa sổ/tab để tự động đồng bộ lại
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.currentUser) {
        this.pullUserData(this.currentUser.username);
      }
    });
  }

  initFirebase() {
    try {
      // Ưu tiên config lưu trong localStorage, nếu chưa có thì dùng config tĩnh từ file firebase_config.js
      let config = null;
      const savedConfig = localStorage.getItem(this.FIREBASE_CONFIG_KEY);
      if (savedConfig) {
        try { config = JSON.parse(savedConfig); } catch (e) {}
      }
      if ((!config || !config.apiKey) && window.M32_FIREBASE_CONFIG && window.M32_FIREBASE_CONFIG.apiKey) {
        config = window.M32_FIREBASE_CONFIG;
      }

      if (config && config.apiKey && config.projectId && window.firebase) {
        if (!firebase.apps.length) {
          this.firebaseApp = firebase.initializeApp(config);
        } else {
          this.firebaseApp = firebase.app();
        }
        this.firestore = firebase.firestore();
        this.isCloudConnected = true;
        console.log("M32 Cloud [TIMO 2]: Đã kết nối Google Firebase Firestore thành công!");

        // Cập nhật giao diện trạng thái
        this.updateSyncStatusUI(true);

        // Tự động kéo dữ liệu bài làm và câu sai từ Cloud về
        if (this.currentUser) {
          this.pullUserData(this.currentUser.username);
        }
      } else {
        this.isCloudConnected = false;
        this.updateSyncStatusUI(false);
      }
    } catch (e) {
      console.warn("M32 Cloud [TIMO 2]: Chưa kết nối Firebase, sử dụng Local Multi-User Engine", e);
      this.isCloudConnected = false;
      this.updateSyncStatusUI(false);
    }
  }

  updateSyncStatusUI(isOnline) {
    const statusEl = document.getElementById('user-sync-status');
    if (!statusEl) return;

    if (isOnline) {
      statusEl.className = "text-[9px] text-emerald-600 font-bold leading-tight flex items-center gap-1";
      statusEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Đám mây M32 (Online)`;
    } else {
      statusEl.className = "text-[9px] text-amber-600 font-bold leading-tight flex items-center gap-1";
      statusEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Lưu cục bộ (Chờ Cloud)`;
    }
  }

  toCleanKey(str) {
    if (!str) return '';
    return str
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]/g, '');
  }

  ensureSeedData() {
    const users = this.getAllUsers();
    // Tạo sẵn tài khoản học thử nếu chưa có
    if (!users['hocthu']) {
      users['hocthu'] = {
        username: 'hocthu',
        fullName: 'Tài khoản học thử',
        password: '123456',
        grade: 'timo2',
        createdAt: new Date().toISOString()
      };
      this.saveAllUsers(users);
    }

    // Nếu chưa ai đăng nhập, tự động đăng nhập Tài khoản học thử
    if (!this.currentUser) {
      this.login('hocthu', '123456');
    }
  }

  // ==========================================
  // QUẢN LÝ TÀI KHOẢN HỌC VIÊN
  // ==========================================
  getAllUsers() {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveAllUsers(users) {
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  register(fullName, password, setAsCurrent = true) {
    if (!fullName || !fullName.trim()) {
      return { success: false, message: 'Vui lòng nhập họ và tên học sinh!' };
    }

    const cleanUsername = this.toCleanKey(fullName);
    if (!cleanUsername) {
      return { success: false, message: 'Họ và tên học sinh chưa hợp lệ!' };
    }

    const users = this.getAllUsers();
    
    // Nếu tên này đã tồn tại và đúng mật khẩu thì cho phép đăng nhập luôn
    if (users[cleanUsername]) {
      if (password && users[cleanUsername].password === password.trim()) {
        if (setAsCurrent) this.setSession(users[cleanUsername]);
        return { success: true, user: users[cleanUsername], isExisting: true };
      } else {
        return { success: false, message: `Học sinh "${fullName.trim()}" đã có tài khoản trên hệ thống. Nếu đây là bạn, vui lòng sang mục "Đăng nhập"!` };
      }
    }

    const newUser = {
      username: cleanUsername,
      fullName: fullName.trim(),
      password: password ? password.trim() : '',
      grade: 'timo2',
      createdAt: new Date().toISOString()
    };

    users[cleanUsername] = newUser;
    this.saveAllUsers(users);

    // Đồng bộ lên Cloud nếu có kết nối
    if (this.isCloudConnected && this.firestore) {
      this.firestore.collection(this.FIRESTORE_COLLECTION).doc(cleanUsername).set(newUser, { merge: true }).catch(console.error);
    }

    if (setAsCurrent) {
      this.setSession(newUser);
    }

    return { success: true, user: newUser };
  }

  login(identifier, password) {
    if (!identifier || !identifier.trim()) {
      return { success: false, message: 'Vui lòng nhập họ và tên học sinh!' };
    }

    const cleanKey = this.toCleanKey(identifier);
    const users = this.getAllUsers();
    
    // Tìm kiếm thông minh: trực tiếp theo cleanKey hoặc so sánh họ tên
    let user = users[cleanKey];
    if (!user) {
      for (const k in users) {
        if (users[k].username === cleanKey || this.toCleanKey(users[k].fullName) === cleanKey) {
          user = users[k];
          break;
        }
      }
    }

    if (!user) {
      // Nếu chưa có cục bộ, kiểm tra xem có trên Cloud không
      if (this.isCloudConnected && this.firestore) {
        this.fetchUserFromCloud(cleanKey, password);
      }
      return { success: false, message: 'Không tìm thấy học sinh với tên này. Hãy kiểm tra lại hoặc sang mục Đăng ký mới!' };
    }

    if (password && user.password && user.password !== password.trim()) {
      return { success: false, message: 'Mật khẩu chưa chính xác!' };
    }

    this.setSession(user);

    // Tự động kéo dữ liệu mới nhất từ Cloud
    if (this.isCloudConnected && this.firestore) {
      this.pullUserData(user.username);
    }

    return { success: true, user };
  }

  async fetchUserFromCloud(cleanUsername, password) {
    try {
      const doc = await this.firestore.collection(this.FIRESTORE_COLLECTION).doc(cleanUsername).get();
      if (doc.exists) {
        const cloudUser = doc.data();
        if (password && cloudUser.password && cloudUser.password !== password.trim()) {
          alert('Mật khẩu chưa chính xác!');
          return;
        }
        const users = this.getAllUsers();
        users[cleanUsername] = cloudUser;
        this.saveAllUsers(users);
        this.setSession(cloudUser);
        await this.pullUserData(cleanUsername);
        if (window.timoApp) {
          window.timoApp.updateUserHeader();
          window.timoApp.renderCurrentView();
        }
      }
    } catch (e) {
      console.warn("M32 Cloud [TIMO 2]: Không thể tải tài khoản từ Cloud:", e);
    }
  }

  setSession(user) {
    this.currentUser = user;
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    } catch (e) {}
  }

  restoreSession() {
    try {
      const saved = localStorage.getItem(this.SESSION_KEY);
      if (saved) {
        this.currentUser = JSON.parse(saved);
      }
    } catch (e) {
      this.currentUser = null;
    }
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(this.SESSION_KEY);
    } catch (e) {}
    // Tự động chuyển về tài khoản học thử sau khi đăng xuất
    this.login('hocthu', '123456');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // ==========================================
  // ĐỒNG BỘ 2 CHIỀU TỪ CLOUD (PULL DATA)
  // ==========================================
  async pullUserData(username) {
    if (!this.isCloudConnected || !this.firestore) return;
    const u = username || this.currentUser?.username;
    if (!u) return;

    try {
      // 1. Kéo Lịch sử bài thi (exam_history)
      const examsSnap = await this.firestore
        .collection(this.FIRESTORE_COLLECTION)
        .doc(u)
        .collection('exam_history')
        .get();

      if (!examsSnap.empty) {
        const remoteExams = [];
        examsSnap.forEach(doc => remoteExams.push(doc.data()));

        const localExams = this.getExamHistory(u);
        const examMap = new Map();

        // Gộp thông minh theo ID bài thi (tránh trùng lặp)
        localExams.forEach(e => examMap.set(e.id, e));
        remoteExams.forEach(e => examMap.set(e.id, e));

        const mergedExams = Array.from(examMap.values());
        mergedExams.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
        localStorage.setItem(this.getUserExamHistoryKey(u), JSON.stringify(mergedExams));
      }

      // 2. Kéo Sổ tay câu sai (mistakes)
      const mistakesSnap = await this.firestore
        .collection(this.FIRESTORE_COLLECTION)
        .doc(u)
        .collection('mistakes')
        .get();

      if (!mistakesSnap.empty) {
        const remoteMistakes = {};
        mistakesSnap.forEach(doc => {
          remoteMistakes[doc.id] = doc.data();
        });

        const localMistakes = this.getMistakes(u);
        const mergedMistakes = { ...localMistakes, ...remoteMistakes };
        localStorage.setItem(this.getUserMistakesKey(u), JSON.stringify(mergedMistakes));
      }

      // 3. Đẩy bù các bài thi cục bộ lên Cloud
      this.pushLocalExamsToCloud(u);

      // 4. Cập nhật giao diện nếu đang mở
      if (window.timoApp) {
        if (typeof window.timoApp.renderHeaderStats === 'function') {
          window.timoApp.renderHeaderStats();
        }
        if (window.timoApp.currentMode === 'journal' || window.timoApp.currentMode === 'mistakes') {
          window.timoApp.renderCurrentView();
        }
      }
      console.log(`M32 Cloud [TIMO 2]: Đã đồng bộ 2 chiều dữ liệu học sinh "${u}" thành công!`);
    } catch (err) {
      console.warn(`M32 Cloud [TIMO 2]: Lỗi đồng bộ từ Cloud cho học sinh "${u}":`, err);
    }
  }

  // Đẩy bù bài thi làm lúc offline lên Cloud
  async pushLocalExamsToCloud(u) {
    if (!this.isCloudConnected || !this.firestore) return;
    try {
      const localExams = this.getExamHistory(u);
      for (const ex of localExams) {
        if (ex.id) {
          await this.firestore
            .collection(this.FIRESTORE_COLLECTION)
            .doc(u)
            .collection('exam_history')
            .doc(ex.id)
            .set(ex, { merge: true });
        }
      }
    } catch (e) {}
  }

  // ==========================================
  // SỔ TAY CÂU SAI RIÊNG TỪNG HỌC SINH
  // ==========================================
  getUserMistakesKey(username) {
    return `${this.STORAGE_PREFIX}mistakes_${username}`;
  }

  getMistakes(username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return {};

    try {
      const data = localStorage.getItem(this.getUserMistakesKey(u));
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveMistake(qId, wrongAnswer = '', username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return;

    const mistakes = this.getMistakes(u);
    const prev = mistakes[qId] || { count: 0 };

    mistakes[qId] = {
      qId: qId,
      count: prev.count + 1,
      lastDate: new Date().toLocaleDateString('vi-VN'),
      lastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      wrongAnswer: wrongAnswer
    };

    localStorage.setItem(this.getUserMistakesKey(u), JSON.stringify(mistakes));

    // Đồng bộ lên Cloud tức thì
    if (this.isCloudConnected && this.firestore) {
      this.firestore
        .collection(this.FIRESTORE_COLLECTION)
        .doc(u)
        .collection('mistakes')
        .doc(String(qId))
        .set(mistakes[qId], { merge: true })
        .catch(console.error);
    }

    return mistakes;
  }

  removeMistake(qId, username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return;

    const mistakes = this.getMistakes(u);
    if (mistakes[qId]) {
      delete mistakes[qId];
      localStorage.setItem(this.getUserMistakesKey(u), JSON.stringify(mistakes));

      // Xóa vĩnh viễn trên Cloud
      if (this.isCloudConnected && this.firestore) {
        this.firestore
          .collection(this.FIRESTORE_COLLECTION)
          .doc(u)
          .collection('mistakes')
          .doc(String(qId))
          .delete()
          .catch(console.error);
      }
    }
    return mistakes;
  }

  clearAllMistakes(username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return;

    localStorage.removeItem(this.getUserMistakesKey(u));

    // Xóa trên Cloud
    if (this.isCloudConnected && this.firestore) {
      this.firestore
        .collection(this.FIRESTORE_COLLECTION)
        .doc(u)
        .collection('mistakes')
        .get()
        .then(snap => {
          const batch = this.firestore.batch();
          snap.forEach(doc => batch.delete(doc.ref));
          return batch.commit();
        })
        .catch(console.error);
    }
  }

  // ==========================================
  // NHẬT KÝ THI THỬ & LỊCH SỬ ĐIỂM SỐ
  // ==========================================
  getUserExamHistoryKey(username) {
    return `${this.STORAGE_PREFIX}exams_${username}`;
  }

  getExamHistory(username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return [];

    try {
      const data = localStorage.getItem(this.getUserExamHistoryKey(u));
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveExamResult(result, username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return;

    const history = this.getExamHistory(u);
    const record = {
      id: 'exam_' + Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      title: result.title || 'Vòng Chung kết Quốc gia TIMO Khối 2',
      score: result.score,
      correctCount: result.correctCount,
      totalQuestions: result.totalQuestions || 25,
      timeSpent: result.timeSpent,
      medal: result.medal,
      categoryScores: result.categoryScores
    };

    history.unshift(record);
    localStorage.setItem(this.getUserExamHistoryKey(u), JSON.stringify(history));

    // Đồng bộ Cloud tức thì
    if (this.isCloudConnected && this.firestore) {
      this.firestore
        .collection(this.FIRESTORE_COLLECTION)
        .doc(u)
        .collection('exam_history')
        .doc(record.id)
        .set(record)
        .catch(console.error);
    }

    return record;
  }

  saveFirebaseConfig(configObj) {
    try {
      localStorage.setItem(this.FIREBASE_CONFIG_KEY, JSON.stringify(configObj));
      this.initFirebase();
      return true;
    } catch (e) {
      return false;
    }
  }

  getFirebaseConfig() {
    try {
      const d = localStorage.getItem(this.FIREBASE_CONFIG_KEY);
      return d ? JSON.parse(d) : (window.M32_FIREBASE_CONFIG || null);
    } catch (e) {
      return null;
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.m32Storage = new M32CloudStorage();
