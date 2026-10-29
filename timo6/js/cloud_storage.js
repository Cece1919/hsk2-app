// CLB TOÁN M32 - ĐIỀU PHỐI LƯU TRỮ ĐA HỌC VIÊN & ĐỒNG BỘ ĐÁM MÂY (DUAL-ENGINE CLOUD STORAGE)
// Hỗ trợ đồng bộ Firebase Cloud & Kho lưu trữ đa người dùng độc lập

class M32CloudStorage {
  constructor() {
    this.firebaseApp = null;
    this.firestore = null;
    this.isCloudConnected = false;
    this.currentUser = null;

    // Keys
    this.STORAGE_PREFIX = 'm32_timo6_';
    this.USERS_KEY = this.STORAGE_PREFIX + 'users_registry';
    this.SESSION_KEY = this.STORAGE_PREFIX + 'current_session';
    this.FIREBASE_CONFIG_KEY = this.STORAGE_PREFIX + 'firebase_config';

    this.init();
  }

  init() {
    // 1. Tải cấu hình Firebase nếu có
    this.initFirebase();

    // 2. Khôi phục phiên đăng nhập của học sinh
    this.restoreSession();

    // 3. Khởi tạo tài khoản mẫu nếu hệ thống mới tinh
    this.ensureSeedData();
  }

  initFirebase() {
    try {
      const savedConfig = localStorage.getItem(this.FIREBASE_CONFIG_KEY);
      if (savedConfig && window.firebase) {
        const config = JSON.parse(savedConfig);
        if (config.apiKey && config.projectId) {
          if (!firebase.apps.length) {
            this.firebaseApp = firebase.initializeApp(config);
          } else {
            this.firebaseApp = firebase.app();
          }
          this.firestore = firebase.firestore();
          this.isCloudConnected = true;
          console.log("M32 Cloud: Đã kết nối Firebase Firestore thành công!");
        }
      }
    } catch (e) {
      console.warn("M32 Cloud: Chưa kết nối Firebase, sử dụng Local Multi-User Engine", e);
      this.isCloudConnected = false;
    }
  }

  ensureSeedData() {
    const users = this.getAllUsers();
    // Tạo sẵn 2 học sinh mẫu nếu chưa có
    if (!users['baonam']) {
      this.register('baonam', 'Nguyễn Bảo Nam', '123456', false);
    }
    if (!users['minhanh']) {
      this.register('minhanh', 'Trần Minh Anh', '123456', false);
    }

    // Nếu chưa ai đăng nhập, tự động đăng nhập bạn Bảo Nam làm mẫu
    if (!this.currentUser) {
      this.login('baonam', '123456');
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

  register(username, fullName, password, setAsCurrent = true) {
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUsername) return { success: false, message: 'Tên đăng nhập không hợp lệ!' };
    if (!fullName || !fullName.trim()) return { success: false, message: 'Vui lòng nhập họ và tên học sinh!' };

    const users = this.getAllUsers();
    if (users[cleanUsername]) {
      return { success: false, message: 'Mã học sinh / Tên đăng nhập này đã tồn tại!' };
    }

    const newUser = {
      username: cleanUsername,
      fullName: fullName.trim(),
      password: password || '123456',
      createdAt: new Date().toISOString()
    };

    users[cleanUsername] = newUser;
    this.saveAllUsers(users);

    // Đồng bộ lên Cloud nếu có kết nối
    if (this.isCloudConnected && this.firestore) {
      this.firestore.collection('m32_students').doc(cleanUsername).set(newUser, { merge: true }).catch(console.error);
    }

    if (setAsCurrent) {
      this.setSession(newUser);
    }

    return { success: true, user: newUser };
  }

  login(username, password) {
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const users = this.getAllUsers();
    const user = users[cleanUsername];

    if (!user) {
      return { success: false, message: 'Không tìm thấy học sinh với mã này. Hãy kiểm tra lại hoặc Đăng ký mới!' };
    }

    if (password && user.password && user.password !== password) {
      return { success: false, message: 'Mật khẩu chưa chính xác!' };
    }

    this.setSession(user);
    return { success: true, user };
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
  }

  getCurrentUser() {
    return this.currentUser;
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

    // Đồng bộ Cloud
    if (this.isCloudConnected && this.firestore) {
      this.firestore.collection('m32_students').doc(u).collection('mistakes').doc(String(qId)).set(mistakes[qId], { merge: true }).catch(console.error);
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

      // Xóa trên Cloud
      if (this.isCloudConnected && this.firestore) {
        this.firestore.collection('m32_students').doc(u).collection('mistakes').doc(String(qId)).delete().catch(console.error);
      }
    }
    return mistakes;
  }

  clearAllMistakes(username = null) {
    const u = username || this.currentUser?.username;
    if (!u) return;

    localStorage.removeItem(this.getUserMistakesKey(u));
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
      title: result.title || 'Vòng Chung kết Quốc gia TIMO Khối 6 (2020 – 2021)',
      score: result.score,
      correctCount: result.correctCount,
      totalQuestions: result.totalQuestions || 25,
      timeSpent: result.timeSpent,
      medal: result.medal,
      categoryScores: result.categoryScores
    };

    history.unshift(record); // Thêm vào đầu danh sách
    localStorage.setItem(this.getUserExamHistoryKey(u), JSON.stringify(history));

    // Đồng bộ Cloud
    if (this.isCloudConnected && this.firestore) {
      this.firestore.collection('m32_students').doc(u).collection('exam_history').doc(record.id).set(record).catch(console.error);
    }

    return record;
  }

  // ==========================================
  // CẤU HÌNH CLOUD FIREBASE DÀNH CHO CÔ GIÁO
  // ==========================================
  saveFirebaseConfig(configObj) {
    try {
      localStorage.setItem(this.FIREBASE_CONFIG_KEY, JSON.stringify(configObj));
      return true;
    } catch (e) {
      return false;
    }
  }

  getFirebaseConfig() {
    try {
      const d = localStorage.getItem(this.FIREBASE_CONFIG_KEY);
      return d ? JSON.parse(d) : null;
    } catch (e) {
      return null;
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.m32Storage = new M32CloudStorage();
