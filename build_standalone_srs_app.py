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
    <title>Cece HSK SRS Vocab App - Học Từ Vựng Lặp Lại Ngắt Quãng</title>
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
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                </div>
            </div>

            <!-- Top Header App Bar -->
            <div class="bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-950 text-white p-4 shadow-md sticky top-7 z-40 border-b border-indigo-900/50">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2.5">
                        <span class="text-2xl">🧠</span>
                        <div>
                            <h1 class="text-base font-extrabold tracking-tight text-white leading-tight">Cece SRS Vocab</h1>
                            <p class="text-[10px] text-blue-300 font-medium">Học Từ Vựng Lặp Lại Ngắt Quãng • Spaced Repetition</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button onclick="window.location.reload()" class="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] active:scale-95 transition flex items-center gap-1 shadow-xs">
                            🔄 Tải lại
                        </button>
                    </div>
                </div>

                <!-- Navigation Modes (SRS Flashcard vs Search Dictionary) -->
                <div class="flex bg-slate-900/80 p-1 rounded-xl text-xs font-semibold gap-1 border border-slate-800">
                    <button onclick="switchView('srs')" id="nav-btn-srs" class="flex-1 py-1.5 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition">🎴 Thẻ SRS & Luyện Gõ</button>
                    <button onclick="switchView('dict')" id="nav-btn-dict" class="flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white transition">📖 Tra Cứu (257 Từ)</button>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1 p-4 bg-slate-50 space-y-4">

                <!-- VIEW 1: SRS PRACTICE VIEW -->
                <div id="sec-srs-view" class="space-y-4">
                    <!-- Dashboard Statistics -->
                    <div class="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-indigo-700 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-blue-200 font-bold uppercase tracking-wider">🎯 TIẾN ĐỘ HÔM NAY</span>
                            <button onclick="confirmResetSrs()" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-600">
                                🔄 Đặt lại SRS
                            </button>
                        </div>

                        <!-- Scope Filter Pills -->
                        <div class="flex bg-slate-950/70 p-1 rounded-xl text-xs gap-1 border border-slate-800">
                            <button onclick="setSrsFilter('all')" id="srs-flt-all" class="flex-1 py-1 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition">Tất cả (257)</button>
                            <button onclick="setSrsFilter('hsk1')" id="srs-flt-hsk1" class="flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition">HSK 1 (150)</button>
                            <button onclick="setSrsFilter('hsk2')" id="srs-flt-hsk2" class="flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition">HSK 2 (107)</button>
                        </div>

                        <!-- Counter Cards -->
                        <div class="grid grid-cols-3 gap-2 text-center text-xs">
                            <div class="bg-blue-950/80 p-2 rounded-xl border border-blue-700">
                                <div class="text-[10px] text-amber-300 uppercase font-extrabold">Cần ôn</div>
                                <div id="srs-cnt-due" class="text-lg font-black text-amber-300">0</div>
                            </div>
                            <div class="bg-indigo-950/80 p-2 rounded-xl border border-indigo-700">
                                <div class="text-[10px] text-blue-300 uppercase font-extrabold">Từ mới</div>
                                <div id="srs-cnt-new" class="text-lg font-black text-blue-300">0</div>
                            </div>
                            <div class="bg-emerald-950/80 p-2 rounded-xl border border-emerald-700">
                                <div class="text-[10px] text-emerald-300 uppercase font-extrabold">Đã thuộc</div>
                                <div id="srs-cnt-mastered" class="text-lg font-black text-emerald-300">0</div>
                            </div>
                        </div>
                    </div>

                    <!-- SRS Card Box Container -->
                    <div id="srs-card-box" class="space-y-4"></div>
                </div>

                <!-- VIEW 2: DICTIONARY SEARCH VIEW -->
                <div id="sec-dict-view" class="space-y-4 hidden">
                    <div class="relative">
                        <input type="text" id="dict-search-input" onkeyup="filterDictionary()" placeholder="🔍 Tìm kiếm Chữ Hán, Pinyin hoặc Tiếng Việt..." class="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium outline-none transition shadow-xs pr-10">
                        <span class="absolute right-3 top-3 text-slate-400">🔍</span>
                    </div>

                    <div id="dict-list-container" class="space-y-3"></div>
                </div>

            </div>

        </div>
    </div>

    <script>
        const FULL_SRS_BANK = __FULL_SRS_BANK_DATA__;

        let activeView = 'srs'; // 'srs' or 'dict'
        let srsFilter = 'all';  // 'all', 'hsk1', 'hsk2'
        let srsState = { cardState: {}, lastReviewDate: new Date().toISOString().split('T')[0] };
        let srsQueue = [];
        let srsCurrentIdx = 0;
        let srsIsFlipped = false;

        function switchView(view) {
            activeView = view;
            const btnSrs = document.getElementById('nav-btn-srs');
            const btnDict = document.getElementById('nav-btn-dict');
            const secSrs = document.getElementById('sec-srs-view');
            const secDict = document.getElementById('sec-dict-view');

            if (view === 'srs') {
                btnSrs.className = "flex-1 py-1.5 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition";
                btnDict.className = "flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white transition";
                secSrs.classList.remove('hidden');
                secDict.classList.add('hidden');
            } else {
                btnDict.className = "flex-1 py-1.5 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition";
                btnSrs.className = "flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white transition";
                secDict.classList.remove('hidden');
                secSrs.classList.add('hidden');
                renderDictionary();
            }
        }

        function loadSrsState() {
            try {
                const saved = localStorage.getItem('cece_hsk_srs_standalone_v1');
                if (saved) srsState = JSON.parse(saved);
            } catch(e) { console.error("Failed to load SRS state", e); }
            if (!srsState.cardState) srsState.cardState = {};
        }

        function saveSrsState() {
            try {
                localStorage.setItem('cece_hsk_srs_standalone_v1', JSON.stringify(srsState));
            } catch(e) { console.error("Failed to save SRS state", e); }
        }

        function confirmResetSrs() {
            if (confirm("Chị có chắc chắn muốn đặt lại toàn bộ tiến độ ôn tập SRS không?")) {
                srsState = { cardState: {}, lastReviewDate: new Date().toISOString().split('T')[0] };
                saveSrsState();
                initSrsSession();
            }
        }

        function setSrsFilter(flt) {
            srsFilter = flt;
            ['all', 'hsk1', 'hsk2'].forEach(f => {
                const btn = document.getElementById('srs-flt-' + f);
                if (btn) {
                    btn.className = (f === flt) ? "flex-1 py-1 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition" : "flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition";
                }
            });
            initSrsSession();
        }

        function getFilteredBank() {
            if (srsFilter === 'hsk1') return FULL_SRS_BANK.filter(w => w.level === 'HSK 1');
            if (srsFilter === 'hsk2') return FULL_SRS_BANK.filter(w => w.level === 'HSK 2');
            return FULL_SRS_BANK;
        }

        function initSrsSession() {
            loadSrsState();
            const bank = getFilteredBank();
            const today = new Date().toISOString().split('T')[0];

            let dueCards = [];
            let newCards = [];
            let masteredCount = 0;

            bank.forEach(item => {
                const st = srsState.cardState[item.id];
                if (!st) {
                    newCards.push(item);
                } else if (st.status === 'mastered') {
                    masteredCount++;
                    if (st.dueDate <= today) dueCards.push(item);
                } else {
                    if (st.dueDate <= today) dueCards.push(item);
                }
            });

            srsQueue = [...dueCards, ...newCards.slice(0, 15)];
            srsCurrentIdx = 0;
            srsIsFlipped = false;

            const elDue = document.getElementById('srs-cnt-due');
            const elNew = document.getElementById('srs-cnt-new');
            const elMast = document.getElementById('srs-cnt-mastered');

            if (elDue) elDue.textContent = dueCards.length;
            if (elNew) elNew.textContent = newCards.length;
            if (elMast) elMast.textContent = masteredCount;

            renderSrsCard();
        }

        function renderSrsCard() {
            const box = document.getElementById('srs-card-box');
            if (!box) return;

            if (srsQueue.length === 0 || srsCurrentIdx >= srsQueue.length) {
                box.innerHTML = `
                    <div class="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-md space-y-3">
                        <div class="text-4xl">🎉</div>
                        <h3 class="text-base font-extrabold text-blue-900">Hoàn Thành Ôn Tập Hôm Nay!</h3>
                        <p class="text-xs text-slate-600 leading-relaxed">Chị đã hoàn thành toàn bộ các thẻ từ vựng đến hạn ôn đợt này rồi ạ. Giỏi quá! 👏</p>
                        <button onclick="initSrsSession()" class="px-5 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-800 transition active:scale-95">
                            🔄 Tiếp tục luyện tập thêm
                        </button>
                    </div>
                `;
                return;
            }

            const word = srsQueue[srsCurrentIdx];
            srsIsFlipped = false;

            let radicalHtml = word.radical ? `<div class="text-amber-900"><strong>🧩 Bộ thủ:</strong> ${word.radical}</div>` : '';
            let mnemonicHtml = word.mnemonic ? `<div class="text-amber-950 leading-relaxed"><strong>💡 Mẹo nhớ chiết tự:</strong> ${word.mnemonic}</div>` : '';
            let exampleHtml = word.example ? `
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span class="font-bold text-slate-900 block">📖 VÍ DỤ MINH HỌA:</span>
                    <div class="zh text-slate-900 font-medium">${word.example}</div>
                </div>
            ` : '';

            box.innerHTML = `
                <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-4">
                    <div class="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                        <span class="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">${word.tag}</span>
                        <span class="font-semibold">Thẻ <strong class="text-blue-900">${srsCurrentIdx + 1}</strong> / ${srsQueue.length}</span>
                    </div>

                    <div class="text-center py-4 space-y-3">
                        <div class="zh text-5xl font-black text-slate-900 tracking-wider flex items-center justify-center gap-2">
                            <span>${word.hanzi}</span>
                            <button onclick="playWordAudio('${word.hanzi}')" class="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 flex items-center justify-center text-lg active:scale-90 transition border border-blue-200" title="Phát âm">
                                🔊
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <div class="relative">
                            <input type="text" id="srs-typing-input" onkeyup="handleSrsTyping(event)" placeholder="✍️ Gõ Pinyin (vd: kaoya) hoặc Chữ Hán..." autocomplete="off" autocorrect="off" autocapitalize="off" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium outline-none transition pr-10">
                            <span id="srs-typing-icon" class="absolute right-3 top-2.5 text-base"></span>
                        </div>
                        <div id="srs-typing-feedback" class="hidden text-xs p-2 rounded-lg font-bold text-center"></div>
                    </div>

                    <button onclick="flipSrsCard()" id="btn-srs-flip" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-98">
                        <span>🔍 Xem Đáp Án & Mẹo Nhớ Chiết Tự</span>
                    </button>

                    <div id="srs-card-back" class="hidden space-y-3 pt-3 border-t border-slate-200">
                        <div class="grid grid-cols-2 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <div>
                                <span class="text-[10px] text-slate-400 block font-bold">PHIÊN ÂM PINYIN</span>
                                <span class="text-sm font-bold text-emerald-700 font-mono">${word.pinyin}</span>
                            </div>
                            <div>
                                <span class="text-[10px] text-slate-400 block font-bold">HÁN VIỆT</span>
                                <span class="text-xs font-bold text-slate-700">${word.hanviet}</span>
                            </div>
                        </div>

                        <div class="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs">
                            <span class="font-extrabold text-blue-950 block mb-0.5">💡 NGHĨA TIẾNG VIỆT:</span>
                            <span class="text-sm font-bold text-blue-900">${word.meaning}</span>
                        </div>

                        ${(radicalHtml || mnemonicHtml) ? `<div class="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">${radicalHtml}${mnemonicHtml}</div>` : ''}

                        ${exampleHtml}

                        <div class="space-y-1.5 pt-2">
                            <span class="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block text-center">ĐÁNH GIÁ MỨC ĐỘ GHI NHỚ (SRS):</span>
                            <div class="grid grid-cols-4 gap-1.5">
                                <button onclick="rateSrsCard(1)" class="bg-rose-100 hover:bg-rose-200 text-rose-800 font-extrabold py-2 rounded-xl text-[11px] active:scale-95 transition flex flex-col items-center border border-rose-300 shadow-xs">
                                    <span>🔴 Quên</span>
                                    <span class="text-[9px] font-normal opacity-80">1 ngày</span>
                                </button>
                                <button onclick="rateSrsCard(2)" class="bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold py-2 rounded-xl text-[11px] active:scale-95 transition flex flex-col items-center border border-amber-300 shadow-xs">
                                    <span>🟠 Khó</span>
                                    <span class="text-[9px] font-normal opacity-80">3 ngày</span>
                                </button>
                                <button onclick="rateSrsCard(3)" class="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 rounded-xl text-[11px] active:scale-95 transition flex flex-col items-center shadow-xs">
                                    <span>🟢 Tốt</span>
                                    <span class="text-[9px] font-normal opacity-90">7 ngày</span>
                                </button>
                                <button onclick="rateSrsCard(4)" class="bg-blue-900 hover:bg-blue-800 text-white font-extrabold py-2 rounded-xl text-[11px] active:scale-95 transition flex flex-col items-center shadow-xs">
                                    <span>🔵 Dễ</span>
                                    <span class="text-[9px] font-normal opacity-90">14 ngày</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const inp = document.getElementById('srs-typing-input');
                if (inp && window.innerWidth > 640) inp.focus();
            }, 100);
        }

        function handleSrsTyping(e) {
            if (srsQueue.length === 0 || srsCurrentIdx >= srsQueue.length) return;
            const input = e.target.value.trim().toLowerCase();
            const word = srsQueue[srsCurrentIdx];

            const fb = document.getElementById('srs-typing-feedback');
            const icon = document.getElementById('srs-typing-icon');

            if (!input) {
                if (fb) fb.className = "hidden";
                if (icon) icon.textContent = "";
                return;
            }

            const cleanTyped = input.replace(/[^a-z0-9]/g, '');
            const cleanTarget = word.pinyin_clean || "";

            const isMatchPinyin = cleanTyped && cleanTarget && cleanTyped === cleanTarget;
            const isMatchHanzi = input === word.hanzi;

            if (isMatchPinyin || isMatchHanzi) {
                if (icon) icon.textContent = "✅";
                if (fb) {
                    fb.className = "text-xs p-2 rounded-lg font-bold text-center bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1.5";
                    fb.innerHTML = `<span>✨</span> <div><strong>Chính xác!</strong> Pinyin: <span class="font-mono">${word.pinyin}</span></div>`;
                }
                if (!srsIsFlipped) {
                    flipSrsCard();
                }
            } else if (e.key === 'Enter') {
                flipSrsCard();
            }
        }

        function flipSrsCard() {
            srsIsFlipped = true;
            const backDiv = document.getElementById('srs-card-back');
            const btnFlip = document.getElementById('btn-srs-flip');
            if (backDiv) backDiv.classList.remove('hidden');
            if (btnFlip) btnFlip.classList.add('hidden');
        }

        function rateSrsCard(quality) {
            if (srsQueue.length === 0 || srsCurrentIdx >= srsQueue.length) return;
            const word = srsQueue[srsCurrentIdx];

            let st = srsState.cardState[word.id] || { interval: 1, repetition: 0, efactor: 2.5, dueDate: new Date().toISOString().split('T')[0], status: 'new' };
            const today = new Date();
            let addDays = 1;

            if (quality === 1) { st.interval = 1; st.repetition = 0; st.status = 'learning'; addDays = 1; }
            else if (quality === 2) { st.interval = Math.max(2, Math.round(st.interval * 1.3)); st.repetition += 1; st.status = 'learning'; addDays = 3; }
            else if (quality === 3) { st.interval = Math.max(6, Math.round(st.interval * 2.1)); st.repetition += 1; st.status = 'mastered'; addDays = 7; }
            else if (quality === 4) { st.interval = Math.max(14, Math.round(st.interval * 2.8)); st.repetition += 1; st.status = 'mastered'; addDays = 14; }

            const nextDate = new Date(today);
            nextDate.setDate(nextDate.getDate() + addDays);
            st.dueDate = nextDate.toISOString().split('T')[0];

            srsState.cardState[word.id] = st;
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
            } else {
                const audio = new Audio('https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(text) + '&type=1');
                audio.play();
            }
        }

        function renderDictionary() {
            const container = document.getElementById('dict-list-container');
            if (!container) return;
            filterDictionary();
        }

        function filterDictionary() {
            const container = document.getElementById('dict-list-container');
            if (!container) return;
            const input = (document.getElementById('dict-search-input').value || "").trim().toLowerCase();

            const filtered = FULL_SRS_BANK.filter(w => {
                if (!input) return true;
                return (
                    w.hanzi.toLowerCase().includes(input) ||
                    w.pinyin.toLowerCase().includes(input) ||
                    (w.pinyin_clean && w.pinyin_clean.includes(input)) ||
                    w.meaning.toLowerCase().includes(input) ||
                    (w.hanviet && w.hanviet.toLowerCase().includes(input))
                );
            });

            if (filtered.length === 0) {
                container.innerHTML = `<div class="text-center py-8 text-xs text-slate-500">Không tìm thấy từ vựng khớp với từ khóa "${input}".</div>`;
                return;
            }

            container.innerHTML = filtered.map(w => `
                <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="zh text-2xl font-black text-slate-900">${w.hanzi}</span>
                            <button onclick="playWordAudio('${w.hanzi}')" class="text-sm p-1 rounded-full bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200">🔊</button>
                        </div>
                        <span class="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">${w.tag}</span>
                    </div>
                    <div class="text-xs font-mono font-bold text-emerald-700">${w.pinyin} <span class="text-slate-500 font-normal italic">(${w.hanviet})</span></div>
                    <div class="text-xs font-semibold text-blue-950">${w.meaning}</div>
                    ${w.mnemonic ? `<div class="text-[11px] text-amber-950 bg-amber-50 p-2 rounded-xl border border-amber-100 leading-relaxed">💡 ${w.mnemonic}</div>` : ''}
                </div>
            `).join('');
        }

        window.onload = function() {
            initSrsSession();
        };
    </script>
</body>
</html>
""".replace('__FULL_SRS_BANK_DATA__', json_data_str)

with open('/Users/trangngo95/Desktop/HSK/srs.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated srs.html successfully!")
