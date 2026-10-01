import os, sys, json

# Load SRS dataset
with open('/Users/trangngo95/Desktop/HSK/srs_full_database.json', 'r', encoding='utf-8') as f:
    srs_data = json.load(f)

json_data_str = json.dumps(srs_data, ensure_ascii=False)

html_content = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Cece SRS Vocab">
    <link rel="apple-touch-icon" href="https://img.icons8.com/color/180/chinese-dragon.png">
    <title>Cece HSK SRS Vocab App - Chuẩn Claire Vu Template</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Lexend', 'Noto Sans SC', sans-serif;
            background-color: #0f172a;
            color: #1e293b;
            -webkit-tap-highlight-color: transparent;
        }
        .zh { font-family: 'Noto Sans SC', sans-serif; }
        .app-container {
            max-width: 480px;
            min-height: 100vh;
            margin: 0 auto;
            background: #f8fafc;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
        }
        .phone-frame {
            border-radius: 40px;
            overflow: hidden;
            border: 12px solid #1e293b;
            margin: 15px auto;
            height: 94vh;
            max-height: 900px;
        }
        .phone-frame .app-container {
            min-height: 100%;
            height: 100%;
            overflow-y: auto;
        }
        button, input { touch-action: manipulation; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-text { filter: blur(6px); user-select: none; transition: filter 0.2s; }
        .hide-text:hover { filter: none; }
    </style>
</head>
<body class="bg-slate-900 text-slate-800">

    <div id="wrapper-frame" class="phone-frame shadow-2xl">
        <div class="app-container">

            <!-- Mobile Status Bar -->
            <div class="bg-slate-950 text-white px-5 pt-3 pb-2 flex items-center justify-between text-xs sticky top-0 z-50 select-none">
                <span class="font-semibold tracking-tight text-slate-200">09:41</span>
                <div class="w-20 h-4 bg-black rounded-full mx-auto flex items-center justify-center gap-1 opacity-90">
                    <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                </div>
                <div class="flex items-center gap-1.5 text-slate-300">
                    <span id="streak-badge" class="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold text-[10px] border border-amber-500/30">🔥 1 Ngày</span>
                </div>
            </div>

            <!-- Top Header App Bar -->
            <div class="bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-950 text-white p-4 shadow-md sticky top-7 z-40 border-b border-indigo-900/50">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2.5">
                        <span class="text-2xl">🧠</span>
                        <div>
                            <h1 class="text-base font-extrabold tracking-tight text-white leading-tight">Cece SRS Journal</h1>
                            <p class="text-[10px] text-blue-300 font-medium">Chuẩn Claire Vu Template • Day 1-2-4-7-14-30</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <button onclick="window.location.reload()" class="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] active:scale-95 transition flex items-center gap-1 shadow-xs">
                            🔄 Nạp lại
                        </button>
                    </div>
                </div>

                <!-- Navigation Modes (3 Tabs) -->
                <div class="flex bg-slate-900/80 p-1 rounded-xl text-xs font-semibold gap-1 border border-slate-800 overflow-x-auto scrollbar-none">
                    <button onclick="switchView('template')" id="nav-btn-template" class="flex-1 py-1.5 px-2 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition whitespace-nowrap">📋 Bảng Điền Từ</button>
                    <button onclick="switchView('journal')" id="nav-btn-journal" class="flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap">📔 Nhật Ký Học</button>
                    <button onclick="switchView('srs')" id="nav-btn-srs" class="flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap">🎴 Thẻ SRS & Gõ</button>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1 p-4 bg-slate-50 space-y-4">

                <!-- VIEW 1: CLAIRE VU TEMPLATE ACTIVE RECALL SHEET -->
                <div id="sec-template-view" class="space-y-4">
                    <!-- Control Bar for Hiding/Showing Columns (Active Recall Test) -->
                    <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span>👁️ Ẩn/Hiện Để Tự Điền (Active Recall):</span>
                            <span class="text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">Bấm để lật nghĩa</span>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
                            <button onclick="toggleMask('pinyin')" id="btn-mask-py" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Pinyin</button>
                            <button onclick="toggleMask('meaning')" id="btn-mask-vi" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Nghĩa Việt</button>
                            <button onclick="toggleMask('hanzi')" id="btn-mask-hz" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Chữ Hán</button>
                        </div>
                    </div>

                    <!-- Lesson Filter Selector -->
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-extrabold text-slate-800">DANH MỤC BÀI HỌC:</span>
                        <select id="template-lesson-filter" onchange="renderTemplateSheet()" class="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-blue-900 text-xs shadow-xs outline-none">
                            <option value="hsk2-d5">★ HSK 2 • Bài 5 (Hôm nay - 13 từ)</option>
                            <option value="hsk2-d6">★ HSK 2 • Bài 6 (13 từ)</option>
                            <option value="hsk2-d7">★ HSK 2 • Bài 7 (14 từ)</option>
                            <option value="hsk2-all">Tất cả HSK 2 (107 từ)</option>
                            <option value="hsk1-all">Toàn bộ HSK 1 (150 từ)</option>
                            <option value="all">TẤT CẢ TỪ VỰNG (257 từ)</option>
                        </select>
                    </div>

                    <!-- Template Sheet Cards Container -->
                    <div id="template-sheet-container" class="space-y-3"></div>
                </div>

                <!-- VIEW 2: DAILY JOURNAL & STREAK TRACKER -->
                <div id="sec-journal-view" class="space-y-4 hidden">
                    <!-- Daily Target Progress Card -->
                    <div class="bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-indigo-700 space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">🏆</span>
                                <div>
                                    <h3 class="text-sm font-black text-amber-300">CHỈ TIÊU HỌC HÔM NAY</h3>
                                    <p class="text-[10px] text-blue-200">Mục tiêu: 25 - 30 từ / ngày</p>
                                </div>
                            </div>
                            <span id="journal-stamp" class="hidden text-xs bg-emerald-500 text-white font-extrabold px-2.5 py-1 rounded-full shadow-md animate-bounce">
                                ✅ ĐÃ HOÀN THÀNH
                            </span>
                        </div>

                        <!-- Progress Bar -->
                        <div class="space-y-1">
                            <div class="flex justify-between text-xs font-bold">
                                <span>Tiến độ học trong ngày:</span>
                                <span id="journal-progress-text" class="text-amber-300 font-mono">0 / 30 từ</span>
                            </div>
                            <div class="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                                <div id="journal-progress-bar" class="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 5-Day Accelerated Roadmap Cards -->
                    <div class="space-y-2.5">
                        <h3 class="text-xs font-extrabold text-slate-700 uppercase tracking-wider">📅 LỘ TRÌNH TĂNG TỐC TỪ BÀI 5:</h3>

                        <div class="bg-white p-3.5 rounded-2xl border-2 border-blue-600 shadow-sm space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="bg-blue-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">NGÀY 1 (HÔM NAY) • BÀI 5</span>
                                <span class="text-xs font-bold text-blue-900">28 Từ / Ngày</span>
                            </div>
                            <h4 class="text-xs font-bold text-slate-800">Trọn vẹn 13 từ Bài 5 + 15 từ HSK 1 cũ</h4>
                            <p class="text-[11px] text-slate-600">từ mới: 准备, 考试, 意思, 咖啡, 不错, 外面, 鱼, 件, 还, 可以, 就, 吧, 对...</p>
                            <button onclick="startLessonPlan('hsk2-d5')" class="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-xl text-xs shadow-xs active:scale-95 transition">
                                🚀 Bắt Đầu Học Bài 5 Ngay
                            </button>
                        </div>

                        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 opacity-90">
                            <div class="flex items-center justify-between">
                                <span class="bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">NGÀY 2 • BÀI 6</span>
                                <span class="text-xs font-bold text-slate-600">31 Từ / Ngày</span>
                            </div>
                            <h4 class="text-xs font-bold text-slate-800">Trọn vẹn 13 từ Bài 6 + Ôn mốc Day 2 Bài 5</h4>
                            <p class="text-[11px] text-slate-500">từ mới: 自行车, 羊肉, 好吃, 面条, 打篮球, 因为...所以..., 游泳, 经常, 公斤, 姐姐...</p>
                        </div>

                        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 opacity-90">
                            <div class="flex items-center justify-between">
                                <span class="bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">NGÀY 3 • BÀI 7</span>
                                <span class="text-xs font-bold text-slate-600">28 Từ / Ngày</span>
                            </div>
                            <h4 class="text-xs font-bold text-slate-800">Trọn vẹn 14 từ Bài 7 + Ôn mốc Day 4 Bài 5 & Day 2 Bài 6</h4>
                            <p class="text-[11px] text-slate-500">từ mới: 生日, 快乐, 送, 礼物, 晚上, 蛋糕, 问, 非常, 开始, 长, 希望, 参加, 聚会, 祝...</p>
                        </div>
                    </div>
                </div>

                <!-- VIEW 3: SRS PRACTICE VIEW -->
                <div id="sec-srs-view" class="space-y-4 hidden">
                    <div id="srs-card-box" class="space-y-4"></div>
                </div>

            </div>

        </div>
    </div>

    <script>
        const FULL_SRS_BANK = __FULL_SRS_BANK_DATA__;

        let activeView = 'template';
        let maskState = { pinyin: false, meaning: false, hanzi: false };

        let srsState = { cardState: {}, streak: 1, todayLearned: 0, lastDate: new Date().toISOString().split('T')[0] };
        let srsQueue = [];
        let srsCurrentIdx = 0;

        function loadSrsState() {
            try {
                const saved = localStorage.getItem('cece_srs_clairevu_v1');
                if (saved) srsState = JSON.parse(saved);
            } catch(e) { console.error("Failed to load SRS state", e); }
            if (!srsState.cardState) srsState.cardState = {};

            const today = new Date().toISOString().split('T')[0];
            if (srsState.lastDate !== today) {
                srsState.todayLearned = 0;
                srsState.lastDate = today;
            }

            const streakBadge = document.getElementById('streak-badge');
            if (streakBadge) streakBadge.textContent = '🔥 ' + (srsState.streak || 1) + ' Ngày';

            updateJournalProgress();
        }

        function saveSrsState() {
            try {
                localStorage.setItem('cece_srs_clairevu_v1', JSON.stringify(srsState));
            } catch(e) { console.error("Failed to save SRS state", e); }
            updateJournalProgress();
        }

        function updateJournalProgress() {
            const count = srsState.todayLearned || 0;
            const target = 30;
            const pct = Math.min(100, Math.round((count / target) * 100));

            const txt = document.getElementById('journal-progress-text');
            const bar = document.getElementById('journal-progress-bar');
            const stamp = document.getElementById('journal-stamp');

            if (txt) txt.textContent = count + ' / ' + target + ' từ';
            if (bar) bar.style.width = pct + '%';

            if (stamp) {
                if (count >= 20) stamp.classList.remove('hidden');
                else stamp.classList.add('hidden');
            }
        }

        function switchView(view) {
            activeView = view;
            ['template', 'journal', 'srs'].forEach(v => {
                const btn = document.getElementById('nav-btn-' + v);
                const sec = document.getElementById('sec-' + v + '-view');
                if (v === view) {
                    if (btn) btn.className = "flex-1 py-1.5 px-2 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition whitespace-nowrap";
                    if (sec) sec.classList.remove('hidden');
                } else {
                    if (btn) btn.className = "flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap";
                    if (sec) sec.classList.add('hidden');
                }
            });

            if (view === 'template') renderTemplateSheet();
            if (view === 'srs') initSrsSession();
        }

        function toggleMask(type) {
            maskState[type] = !maskState[type];
            const btn = document.getElementById('btn-mask-' + (type === 'pinyin' ? 'py' : (type === 'meaning' ? 'vi' : 'hz')));
            if (btn) {
                btn.className = maskState[type] ? "py-1 px-2 rounded-lg bg-blue-900 text-white font-bold border border-blue-800" : "py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300";
            }
            renderTemplateSheet();
        }

        function startLessonPlan(lessonFilterKey) {
            const select = document.getElementById('template-lesson-filter');
            if (select) select.value = lessonFilterKey;
            switchView('template');
        }

        function renderTemplateSheet() {
            const container = document.getElementById('template-sheet-container');
            if (!container) return;

            const filterVal = document.getElementById('template-lesson-filter').value;
            let items = FULL_SRS_BANK;

            if (filterVal === 'hsk2-d5') items = FULL_SRS_BANK.filter(w => w.level === 'HSK 2' && w.day === 5);
            else if (filterVal === 'hsk2-d6') items = FULL_SRS_BANK.filter(w => w.level === 'HSK 2' && w.day === 6);
            else if (filterVal === 'hsk2-d7') items = FULL_SRS_BANK.filter(w => w.level === 'HSK 2' && w.day === 7);
            else if (filterVal === 'hsk2-all') items = FULL_SRS_BANK.filter(w => w.level === 'HSK 2');
            else if (filterVal === 'hsk1-all') items = FULL_SRS_BANK.filter(w => w.level === 'HSK 1');

            container.innerHTML = items.map((w, idx) => {
                const st = srsState.cardState[w.id] || {};
                const ticks = st.ticks || {};

                return `
                    <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2.5">
                        <div class="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${w.tag}</span>
                            <span class="text-[10px] text-slate-400 font-semibold">Từ ${idx + 1} / ${items.length}</span>
                        </div>

                        <!-- Active Recall Word Grid -->
                        <div class="grid grid-cols-3 gap-2 items-center text-center">
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">CHỮ HÁN</span>
                                <span class="zh text-xl font-black text-slate-900 ${maskState.hanzi ? 'hide-text' : ''}">${w.hanzi}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">PINYIN</span>
                                <span class="text-xs font-bold text-emerald-700 font-mono ${maskState.pinyin ? 'hide-text' : ''}">${w.pinyin}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">NGHĨA VIỆT</span>
                                <span class="text-xs font-bold text-blue-900 ${maskState.meaning ? 'hide-text' : ''}">${w.meaning}</span>
                            </div>
                        </div>

                        ${w.mnemonic ? `<div class="text-[11px] text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed"><strong>💡 Mẹo nhớ:</strong> ${w.mnemonic}</div>` : ''}

                        <!-- Claire Vu 6 Review Milestones Checkboxes -->
                        <div class="space-y-1">
                            <span class="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block text-center">MỐC ÔN CLAIRE VU (SPACED REPETITION):</span>
                            <div class="grid grid-cols-6 gap-1 text-center">
                                ${[1, 2, 4, 7, 14, 30].map(day => `
                                    <button onclick="toggleClaireTick('${w.id}', ${day})" class="py-1 rounded-lg text-[10px] font-extrabold transition active:scale-95 ${ticks[day] ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'}">
                                        ${ticks[day] ? '✓' : ''} D${day}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function toggleClaireTick(wordId, day) {
            let st = srsState.cardState[wordId] || {};
            if (!st.ticks) st.ticks = {};
            st.ticks[day] = !st.ticks[day];
            srsState.cardState[wordId] = st;

            srsState.todayLearned = (srsState.todayLearned || 0) + 1;
            saveSrsState();
            renderTemplateSheet();
        }

        function initSrsSession() {
            loadSrsState();
            srsQueue = FULL_SRS_BANK.slice(0, 20);
            srsCurrentIdx = 0;
            renderSrsCard();
        }

        function renderSrsCard() {
            const box = document.getElementById('srs-card-box');
            if (!box) return;

            if (srsCurrentIdx >= srsQueue.length) {
                box.innerHTML = `
                    <div class="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-md space-y-3">
                        <div class="text-4xl">🎉</div>
                        <h3 class="text-base font-extrabold text-blue-900">Hoàn Thành Đợt Ôn SRS!</h3>
                        <button onclick="initSrsSession()" class="px-5 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md">
                            🔄 Tiếp tục ôn thêm
                        </button>
                    </div>
                `;
                return;
            }

            const word = srsQueue[srsCurrentIdx];
            box.innerHTML = `
                <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-4">
                    <div class="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                        <span class="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">${word.tag}</span>
                        <span>Thẻ ${srsCurrentIdx + 1} / ${srsQueue.length}</span>
                    </div>

                    <div class="text-center py-4 space-y-2">
                        <div class="zh text-5xl font-black text-slate-900 tracking-wider flex items-center justify-center gap-2">
                            <span>${word.hanzi}</span>
                            <button onclick="playWordAudio('${word.hanzi}')" class="w-9 h-9 rounded-full bg-blue-50 text-blue-900 text-lg border border-blue-200">🔊</button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <input type="text" id="srs-typing-input" onkeyup="handleSrsTyping(event)" placeholder="✍️ Gõ Pinyin (vd: kaoya) hoặc Chữ Hán..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none">
                    </div>

                    <div id="srs-card-back" class="hidden space-y-3 pt-3 border-t border-slate-200">
                        <div class="text-center font-bold text-emerald-700 font-mono text-sm">${word.pinyin} (${word.hanviet})</div>
                        <div class="bg-blue-50 p-2.5 rounded-xl text-xs font-bold text-blue-900 text-center">${word.meaning}</div>
                        ${word.mnemonic ? `<div class="bg-amber-50 p-2.5 rounded-xl text-xs text-amber-950">💡 ${word.mnemonic}</div>` : ''}

                        <div class="grid grid-cols-4 gap-1.5 pt-2">
                            <button onclick="rateSrsCard(1)" class="bg-rose-100 text-rose-800 font-extrabold py-2 rounded-xl text-[11px]">🔴 Quên</button>
                            <button onclick="rateSrsCard(2)" class="bg-amber-100 text-amber-900 font-extrabold py-2 rounded-xl text-[11px]">🟠 Khó</button>
                            <button onclick="rateSrsCard(3)" class="bg-emerald-600 text-white font-extrabold py-2 rounded-xl text-[11px]">🟢 Tốt</button>
                            <button onclick="rateSrsCard(4)" class="bg-blue-900 text-white font-extrabold py-2 rounded-xl text-[11px]">🔵 Dễ</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function handleSrsTyping(e) {
            const input = e.target.value.trim().toLowerCase();
            const word = srsQueue[srsCurrentIdx];
            if (!input) return;
            const cleanTyped = input.replace(/[^a-z0-9]/g, '');
            if (cleanTyped === word.pinyin_clean || input === word.hanzi || e.key === 'Enter') {
                const back = document.getElementById('srs-card-back');
                if (back) back.classList.remove('hidden');
            }
        }

        function rateSrsCard(q) {
            srsState.todayLearned = (srsState.todayLearned || 0) + 1;
            saveSrsState();
            srsCurrentIdx++;
            renderSrsCard();
        }

        function playWordAudio(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = 'zh-CN';
                utter.rate = 0.9;
                window.speechSynthesis.speak(utter);
            }
        }

        window.onload = function() {
            loadSrsState();
            renderTemplateSheet();
        };
    </script>
</body>
</html>
""".replace('__FULL_SRS_BANK_DATA__', json_data_str)

with open('/Users/trangngo95/Desktop/HSK/srs.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated srs.html with Claire Vu Template successfully!")
