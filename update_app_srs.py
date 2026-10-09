import json, re

# Load SRS Bank dataset
with open('/Users/trangngo95/Desktop/HSK/srs_full_database.json', 'r', encoding='utf-8') as f:
    srs_data = json.load(f)

json_data_str = json.dumps(srs_data, ensure_ascii=False)

srs_html_view = """
                <div id="view-srs" class="app-view space-y-4 hidden">
                    <div class="bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-indigo-700">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">🧠</span>
                                <div>
                                    <h2 class="text-base font-extrabold text-amber-300">Spaced Repetition (SRS)</h2>
                                    <p class="text-[11px] text-blue-200">Học ngắt quãng + Luyện gõ Pinyin / Chữ Hán</p>
                                </div>
                            </div>
                            <button onclick="confirmResetSrs()" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg border border-slate-600 active:scale-95 transition">
                                🔄 Reset
                            </button>
                        </div>

                        <div class="flex bg-slate-950/70 p-1 rounded-xl text-xs gap-1 mb-3 border border-slate-800">
                            <button onclick="setSrsFilter('all')" id="srs-flt-all" class="flex-1 py-1 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition">Tất cả (257)</button>
                            <button onclick="setSrsFilter('hsk1')" id="srs-flt-hsk1" class="flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition">HSK 1 (150)</button>
                            <button onclick="setSrsFilter('hsk2')" id="srs-flt-hsk2" class="flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition">HSK 2 (107)</button>
                        </div>

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

                    <div id="srs-card-box" class="space-y-4">
                        <!-- Dynamic SRS Card -->
                    </div>
                </div>
"""

srs_nav_btn = """
                <button onclick="showAppNav('srs')" id="nav-srs" class="nav-btn flex flex-col items-center py-1 px-2 text-[10px] text-slate-500 transition">
                    <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                    <span>Ôn SRS</span>
                </button>
"""

srs_js_script = """
        // ==========================================
        // 🧠 SPACED REPETITION (SRS) SYSTEM ENGINE
        // ==========================================
        const FULL_SRS_BANK = __FULL_SRS_BANK_DATA__;

        let srsFilter = 'all'; // 'all', 'hsk1', 'hsk2'
        let srsState = {
            cardState: {},
            lastReviewDate: new Date().toISOString().split('T')[0]
        };
        let srsQueue = [];
        let srsCurrentIdx = 0;
        let srsIsFlipped = false;

        function loadSrsState() {
            try {
                const saved = localStorage.getItem('cece_hsk_srs_state_v2');
                if (saved) {
                    srsState = JSON.parse(saved);
                }
            } catch(e) {
                console.error("Failed to load SRS state", e);
            }
            if (!srsState.cardState) srsState.cardState = {};
        }

        function saveSrsState() {
            try {
                localStorage.setItem('cece_hsk_srs_state_v2', JSON.stringify(srsState));
            } catch(e) {
                console.error("Failed to save SRS state", e);
            }
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
                    if (f === flt) {
                        btn.className = "flex-1 py-1 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition";
                    } else {
                        btn.className = "flex-1 py-1 rounded-lg text-slate-300 hover:bg-slate-800 transition";
                    }
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
                        <p class="text-xs text-slate-600">Chị đã hoàn thành toàn bộ các thẻ từ vựng đến hạn ôn trong đợt này rồi ạ.</p>
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

            let st = srsState.cardState[word.id] || {
                interval: 1,
                repetition: 0,
                efactor: 2.5,
                dueDate: new Date().toISOString().split('T')[0],
                status: 'new'
            };

            const today = new Date();
            let addDays = 1;

            if (quality === 1) {
                st.interval = 1;
                st.repetition = 0;
                st.status = 'learning';
                addDays = 1;
            } else if (quality === 2) {
                st.interval = Math.max(2, Math.round(st.interval * 1.3));
                st.repetition += 1;
                st.status = 'learning';
                addDays = 3;
            } else if (quality === 3) {
                st.interval = Math.max(6, Math.round(st.interval * 2.1));
                st.repetition += 1;
                st.status = 'mastered';
                addDays = 7;
            } else if (quality === 4) {
                st.interval = Math.max(14, Math.round(st.interval * 2.8));
                st.repetition += 1;
                st.status = 'mastered';
                addDays = 14;
            }

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
                utter.rate = typeof currentSpeed !== 'undefined' ? currentSpeed : 0.9;
                window.speechSynthesis.speak(utter);
            } else {
                const audio = new Audio('https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(text) + '&type=1');
                audio.play();
            }
        }
""".replace('__FULL_SRS_BANK_DATA__', json_data_str)

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Inject nav-srs button into bottom navbar
    if 'id="nav-srs"' not in content:
        content = content.replace(
            '<button onclick="showAppNav(\'quiz\')" id="nav-quiz"',
            srs_nav_btn + '\n                <button onclick="showAppNav(\'quiz\')" id="nav-quiz"'
        )

    # 2. Inject view-srs section
    if 'id="view-srs"' not in content:
        content = content.replace(
            '<div id="view-quiz" class="app-view space-y-4 hidden">',
            srs_html_view + '\n\n                <div id="view-quiz" class="app-view space-y-4 hidden">'
        )

    # 3. Inject JavaScript logic before window.onload
    if 'FULL_SRS_BANK' not in content:
        content = content.replace(
            'window.onload = function() {',
            srs_js_script + '\n\nwindow.onload = function() {\n    initSrsSession();'
        )

    # 4. Update showAppNav tab array
    content = content.replace(
        "['home', 'vocab', 'writing', 'lesson', 'quiz']",
        "['home', 'vocab', 'srs', 'writing', 'lesson', 'quiz']"
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Successfully updated {filepath}!")

update_file('/Users/trangngo95/Desktop/HSK/index.html')
update_file('/Users/trangngo95/Desktop/HSK/HSK2_Mobile_App.html')
