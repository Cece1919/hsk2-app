import re

app_path = "/Users/trangngo95/Desktop/HSK/HSK2_Mobile_App.html"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract variable placeholders from original script before replacing
v_m = re.search(r"const VOCAB_AUDIO = (\{.*?\});", content, re.DOTALL)
t_m = re.search(r"const TEXT_AUDIO = (\{.*?\});", content, re.DOTALL)
f_m = re.search(r"const FLASHCARDS = (\[.*?\]);", content, re.DOTALL)
i_m = re.search(r"const LESSON_ITEMS = (\{.*?\});", content, re.DOTALL)
c_m = re.search(r"const LESSON_CONTENT = (\{.*?\});", content, re.DOTALL)

vocab_audio_json = v_m.group(1) if v_m else "{}"
text_audio_json = t_m.group(1) if t_m else "{}"
flashcards_json = f_m.group(1) if f_m else "[]"
lesson_items_json = i_m.group(1) if i_m else "{}"
lesson_content_json = c_m.group(1) if c_m else "{}"

clean_js = '''<script>
    const VOCAB_AUDIO = ''' + vocab_audio_json + ''';
    const TEXT_AUDIO = ''' + text_audio_json + ''';
    const FLASHCARDS = ''' + flashcards_json + ''';
    const LESSON_ITEMS = ''' + lesson_items_json + ''';
    const LESSON_CONTENT = ''' + lesson_content_json + ''';

    let currentLesson = 1;
    let currentFcIdx = 0;
    let fcMastered = 0;
    let writers = {};
    let currentAudio = null;
    let currentRate = 1.0;

    function setSpeed(rate) {
        currentRate = rate;
        const btnSlow = document.getElementById('speed-slow');
        const btnNormal = document.getElementById('speed-normal');
        if (btnSlow && btnNormal) {
            if (rate === 0.75) {
                btnSlow.className = "px-2 py-0.5 rounded bg-blue-600 font-bold text-white";
                btnNormal.className = "px-2 py-0.5 rounded text-slate-400";
            } else {
                btnSlow.className = "px-2 py-0.5 rounded text-slate-400";
                btnNormal.className = "px-2 py-0.5 rounded bg-blue-600 font-bold text-white";
            }
        }
    }

    function selectLesson(num, updateTab) {
        currentLesson = num;
        document.querySelectorAll('.lesson-pill').forEach(btn => {
            const bId = btn.id;
            if (bId === 'btn-lesson-' + num) {
                btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-bold bg-white text-blue-950 shadow-sm whitespace-nowrap transition";
            } else {
                btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-medium bg-slate-800/70 text-slate-300 hover:bg-slate-800 whitespace-nowrap transition";
            }
        });

        const data = LESSON_CONTENT[num] || LESSON_CONTENT["" + num];
        if (data) {
            const titleEl = document.getElementById('home-lesson-title');
            const descEl = document.getElementById('home-lesson-desc');
            if (titleEl) titleEl.innerText = data.title;
            if (descEl) descEl.innerText = data.desc;

            const vocabEl = document.getElementById('vocab-list-container');
            if (vocabEl) vocabEl.innerHTML = data.vocab || "";

            const writingEl = document.getElementById('writing-container');
            if (writingEl) writingEl.innerHTML = data.writing || "";

            const grammarEl = document.getElementById('grammar-container');
            if (grammarEl) grammarEl.innerHTML = data.grammar || "";

            const textEl = document.getElementById('text-container');
            if (textEl) textEl.innerHTML = data.text || "";

            const practiceEl = document.getElementById('practice-container');
            if (practiceEl) practiceEl.innerHTML = data.practice || "";
        }

        initFcForLesson();
        writers = {};
        initLessonWriters();
    }

    function showAppNav(view, switchTab) {
        const views = ['home', 'vocab', 'writing', 'lesson', 'quiz'];
        views.forEach(v => {
            const targetView = document.getElementById('view-' + v);
            const targetNav = document.getElementById('nav-' + v);
            if (targetView) {
                if (v === view) {
                    targetView.classList.remove('hidden');
                } else {
                    targetView.classList.add('hidden');
                }
            }
            if (targetNav) {
                if (v === view) {
                    targetNav.className = "nav-btn active flex flex-col items-center py-1 px-3 text-[10px] text-blue-600 font-bold transition";
                } else {
                    targetNav.className = "nav-btn flex flex-col items-center py-1 px-3 text-[10px] text-slate-500 transition";
                }
            }
        });

        if (view === 'vocab' && switchTab === true) {
            switchVocabMode('srs');
        } else if (view === 'vocab' && switchTab === false) {
            switchVocabMode('list');
        }

        if (view === 'writing') {
            setTimeout(initLessonWriters, 100);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showTab(tabId) {
        if (tabId === 'writing' || tabId === 'sim') {
            showAppNav('writing');
        } else if (tabId === 'vocab') {
            showAppNav('vocab', false);
        } else if (tabId === 'grammar') {
            showAppNav('lesson');
            switchLessonSub('grammar');
        } else if (tabId === 'text') {
            showAppNav('lesson');
            switchLessonSub('text');
        } else if (tabId === 'practice' || tabId === 'quiz') {
            showAppNav('quiz');
        } else if (tabId === 'overview' || tabId === 'home') {
            showAppNav('home');
        } else {
            showAppNav('lesson');
        }
    }

    function switchVocabMode(mode) {
        const srsDiv = document.getElementById('vocab-sub-srs');
        const listDiv = document.getElementById('vocab-sub-list');
        const btnSrs = document.getElementById('btn-mode-srs');
        const btnList = document.getElementById('btn-mode-list');
        if (mode === 'srs') {
            if (srsDiv) srsDiv.classList.remove('hidden');
            if (listDiv) listDiv.classList.add('hidden');
            if (btnSrs) btnSrs.className = "flex-1 py-1.5 rounded-lg bg-white font-bold text-blue-900 shadow-xs transition";
            if (btnList) btnList.className = "flex-1 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition";
        } else {
            if (srsDiv) srsDiv.classList.add('hidden');
            if (listDiv) listDiv.classList.remove('hidden');
            if (btnList) btnList.className = "flex-1 py-1.5 rounded-lg bg-white font-bold text-blue-900 shadow-xs transition";
            if (btnSrs) btnSrs.className = "flex-1 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition";
        }
    }

    function switchLessonSub(sub) {
        const gDiv = document.getElementById('lesson-sub-grammar');
        const tDiv = document.getElementById('lesson-sub-text');
        const btnG = document.getElementById('btn-sub-grammar');
        const btnT = document.getElementById('btn-sub-text');

        if (sub === 'grammar') {
            if (gDiv) gDiv.classList.remove('hidden');
            if (tDiv) tDiv.classList.add('hidden');
            if (btnG) btnG.className = "flex-1 py-1.5 rounded-lg bg-white font-bold text-blue-900 shadow-xs transition";
            if (btnT) btnT.className = "flex-1 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition";
        } else {
            if (gDiv) gDiv.classList.add('hidden');
            if (tDiv) tDiv.classList.remove('hidden');
            if (btnT) btnT.className = "flex-1 py-1.5 rounded-lg bg-white font-bold text-blue-900 shadow-xs transition";
            if (btnG) btnG.className = "flex-1 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition";
        }
    }

    let activeFcList = typeof FLASHCARDS !== 'undefined' ? FLASHCARDS : [];

    function initFcForLesson() {
        if (typeof FLASHCARDS === 'undefined') return;
        activeFcList = FLASHCARDS.filter(item => item.lesson === currentLesson);
        if (activeFcList.length === 0) activeFcList = FLASHCARDS;
        currentFcIdx = 0;
        renderCurrentFc();
    }

    function renderCurrentFc() {
        if (!activeFcList || activeFcList.length === 0) return;
        const item = activeFcList[currentFcIdx];
        if (!item) return;
        const elIdx = document.getElementById('fc-current-idx');
        const elTot = document.getElementById('fc-total');
        const elFHz = document.getElementById('fc-front-hz');
        const elBHz = document.getElementById('fc-back-hz');
        const elBPy = document.getElementById('fc-back-py');
        const elBHv = document.getElementById('fc-back-hv');
        const elBVi = document.getElementById('fc-back-vi');
        const elBEg = document.getElementById('fc-back-eg');
        const elCard = document.getElementById('flashcard-inner');

        if (elIdx) elIdx.innerText = currentFcIdx + 1;
        if (elTot) elTot.innerText = activeFcList.length;
        if (elFHz) elFHz.innerText = item.hz;
        if (elBHz) elBHz.innerText = item.hz;
        if (elBPy) elBPy.innerText = item.py;
        if (elBHv) elBHv.innerText = item.hv ? "(" + item.hv + ")" : "";
        if (elBVi) elBVi.innerText = item.vi;
        if (elBEg) elBEg.innerText = item.eg;
        if (elCard) elCard.classList.remove('flipped');
    }

    function flipFlashcard() {
        const elCard = document.getElementById('flashcard-inner');
        if (elCard) elCard.classList.toggle('flipped');
    }

    function playFcAudio(e) {
        if (e) e.stopPropagation();
        if (!activeFcList || activeFcList.length === 0) return;
        const item = activeFcList[currentFcIdx];
        if (item) {
            playVocab(item.key, item.hz);
        }
    }

    function markFc(isMastered) {
        if (isMastered) {
            fcMastered++;
            const elM = document.getElementById('fc-mastered-count');
            if (elM) elM.innerText = fcMastered;
        }
        if (activeFcList && activeFcList.length > 0) {
            currentFcIdx = (currentFcIdx + 1) % activeFcList.length;
            renderCurrentFc();
        }
    }

    function playAudioStream(text) {
        if (!text) return;
        text = text.trim();
        if (!text) return;

        if (currentAudio) {
            try {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            } catch(e) {}
        }

        var encoded = encodeURIComponent(text);
        var youdaoUrl = "https://dict.youdao.com/dictvoice?audio=" + encoded + "&type=1";
        var baiduUrl = "https://fanyi.baidu.com/gettts?lan=zh&spd=3&source=web&text=" + encoded;

        currentAudio = new Audio(youdaoUrl);
        currentAudio.playbackRate = currentRate || 0.85;

        var playPromise = currentAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(function(err) {
                console.log("Youdao play error, trying Baidu TTS:", err);
                currentAudio = new Audio(baiduUrl);
                currentAudio.playbackRate = currentRate || 0.85;
                currentAudio.play().catch(function(err2) {
                    console.log("Baidu play error, trying WebSpeech:", err2);
                    if ('speechSynthesis' in window) {
                        try {
                            window.speechSynthesis.cancel();
                            var utterance = new SpeechSynthesisUtterance(text);
                            utterance.lang = 'zh-CN';
                            utterance.rate = currentRate || 0.85;
                            window.speechSynthesis.speak(utterance);
                        } catch(e) {}
                    }
                });
            });
        }
    }

    function playText(key, text) {
        var textToSpeak = text || key || "";
        var b64 = null;
        if (typeof TEXT_AUDIO !== "undefined" && TEXT_AUDIO) {
            b64 = TEXT_AUDIO[key] || TEXT_AUDIO[textToSpeak];
        }
        if (b64) {
            playB64(b64, textToSpeak);
        } else {
            playAudioStream(textToSpeak);
        }
    }

    function playVocab(key, fallbackText) {
        var textToSpeak = "";
        if (fallbackText && /[\\u4e00-\\u9fff]/.test(fallbackText)) {
            textToSpeak = fallbackText;
        } else if (key && /[\\u4e00-\\u9fff]/.test(key)) {
            textToSpeak = key;
        } else {
            textToSpeak = fallbackText || key || "";
        }

        var b64 = null;
        if (typeof VOCAB_AUDIO !== "undefined" && VOCAB_AUDIO) {
            b64 = VOCAB_AUDIO[key] || VOCAB_AUDIO[textToSpeak];
        }
        if (!b64 && typeof TEXT_AUDIO !== "undefined" && TEXT_AUDIO) {
            b64 = TEXT_AUDIO[key] || TEXT_AUDIO[textToSpeak];
        }

        if (b64) {
            playB64(b64, textToSpeak);
        } else {
            playAudioStream(textToSpeak);
        }
    }

    function playTTS(text) { playAudioStream(text); }
    function playOnlineTTS(text) { playAudioStream(text); }
    function playSecondaryTTS(text) { playAudioStream(text); }

    function speakText(text) {
        if (!text) return;
        try {
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        } catch(e) {}

        var textClean = text.trim();
        if (!textClean) return;

        if ("speechSynthesis" in window) {
            try {
                window.speechSynthesis.cancel();
                var utter = new SpeechSynthesisUtterance(textClean);
                utter.lang = "zh-CN";
                utter.rate = currentRate || 0.85;
                window.speechSynthesis.speak(utter);
                return;
            } catch(e) {}
        }
        playAudioStream(textClean);
    }

    function playB64(base64Data, fallbackText) {
        try {
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            currentAudio = new Audio("data:audio/m4a;base64," + base64Data);
            currentAudio.playbackRate = currentRate || 0.85;
            var promise = currentAudio.play();
            if (promise !== undefined) {
                promise.catch(function() { playAudioStream(fallbackText); });
            }
        } catch(e) { playAudioStream(fallbackText); }
    }

    function toggleElement(className) {
        const el = document.getElementById(className) || document.querySelector('.' + className);
        if (el) {
            el.classList.toggle('hidden');
            return;
        }
        const elements = document.getElementsByClassName(className);
        for (let item of elements) {
            item.classList.toggle('hidden');
        }
    }

    function toggleAns(ansId) {
        let el = document.getElementById(ansId);
        if (el) {
            el.classList.toggle('hidden');
        }
    }

    function checkQ(btnOrQNum, isCorrectOrOpt, ansId) {
        let btn = null;
        let isCorrect = false;

        if (btnOrQNum && typeof btnOrQNum === 'object' && btnOrQNum.tagName) {
            btn = btnOrQNum;
            isCorrect = (isCorrectOrOpt === true || isCorrectOrOpt === 'true');
        }

        if (btn) {
            const parentDiv = btn.parentElement;
            if (parentDiv) {
                const siblings = parentDiv.querySelectorAll('button');
                siblings.forEach(b => {
                    b.classList.remove('bg-emerald-500', 'bg-rose-500', 'text-white', 'border-emerald-600', 'border-rose-600', 'font-bold', 'shadow-sm');
                    b.classList.add('bg-white', 'text-slate-700', 'border-slate-300', 'font-normal');
                });
            }

            if (isCorrect) {
                btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300', 'font-normal');
                btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600', 'font-bold', 'shadow-sm');
            } else {
                btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300', 'font-normal');
                btn.classList.add('bg-rose-500', 'text-white', 'border-rose-600', 'font-bold', 'shadow-sm');
            }

            const card = btn.closest('.p-4') || btn.closest('.bg-slate-50') || btn.closest('.card') || (parentDiv ? parentDiv.parentElement : null);
            if (card) {
                let evalBox = card.querySelector('.ans-eval-box');
                if (!evalBox) {
                    evalBox = document.createElement('div');
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm';
                    card.appendChild(evalBox);
                }
                if (isCorrect) {
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2';
                    evalBox.innerHTML = '<span>✨</span> <div><strong>Chính xác!</strong> Chị đã chọn đúng đáp án rồi ạ. 🎉</div>';
                } else {
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2';
                    evalBox.innerHTML = '<span>❌</span> <div><strong>Chưa chính xác!</strong> Đáp án này chưa đúng, chị hãy thử chọn lại đáp án khác nhé!</div>';
                }
            }
            return;
        }

        const targetId = ansId || (typeof btnOrQNum === 'string' ? ('ans-' + btnOrQNum) : null);
        if (!targetId) return;
        const ansDiv = document.getElementById(targetId);
        if (!ansDiv) return;
        ansDiv.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-900', 'bg-rose-100', 'text-rose-900', 'bg-blue-100', 'text-blue-900');
        ansDiv.classList.add('bg-emerald-100', 'text-emerald-900');
        ansDiv.innerHTML = "✅ <strong>Đã chọn đáp án:</strong> " + isCorrectOrOpt;
    }

    function initLessonWriters() {
        if (typeof HanziWriter === 'undefined') return;
        const writingView = document.getElementById('view-writing');
        if (writingView && writingView.classList.contains('hidden')) return;

        const items = (typeof LESSON_ITEMS !== 'undefined' && LESSON_ITEMS[currentLesson]) ? LESSON_ITEMS[currentLesson] : [];
        items.forEach(item => {
            const containerId = 'target-' + item.id;
            const container = document.getElementById(containerId);
            if (container && !writers[item.id]) {
                try {
                    let writer = HanziWriter.create(containerId, item.char, {
                        width: 98,
                        height: 98,
                        padding: 8,
                        showOutline: true,
                        strokeAnimationSpeed: 1,
                        delayBetweenStrokes: 150,
                        strokeColor: '#0f172a',
                        radicalColor: '#2563eb'
                    });
                    writers[item.id] = writer;
                    writer.animateCharacter();
                } catch(e) {}
            }
        });

        items.forEach(item => {
            initPad('pad-' + item.id);
        });
    }

    function animateChar(id, charStr) {
        if (writers && writers[id]) writers[id].animateCharacter();
    }

    function loopChar(id, charStr) {
        if (writers && writers[id]) writers[id].loopCharacterAnimation();
    }

    function initPad(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || canvas.dataset.inited) return;
        canvas.dataset.inited = "true";
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0f172a';

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        }

        function startDraw(e) {
            isDrawing = true;
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }
        function draw(e) {
            if (!isDrawing) return;
            const pos = getPos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
        function stopDraw() { isDrawing = false; }

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDraw);
        canvas.addEventListener('mouseleave', stopDraw);

        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); });
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
        canvas.addEventListener('touchend', stopDraw);
    }

    function clearPad(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    function resetChar(id) {
        if (writers && writers[id]) writers[id].animateCharacter();
    }

    function clearCanvas(id) {
        clearPad('pad-' + id);
    }

    function initApp() {
        if (window._appInited) return;
        window._appInited = true;
        selectLesson(1, false);
        showAppNav('home');
    }

    // Execute init immediately and on load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initApp, 10);
    } else {
        document.addEventListener('DOMContentLoaded', initApp);
    }
    window.onload = initApp;
</script>'''

s_idx = content.find('<script>')
e_idx = content.rfind('</script>')
if s_idx != -1 and e_idx != -1:
    new_content = content[:s_idx] + clean_js + content[e_idx+9:]
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Rebuilt main JavaScript block cleanly using string indexing!")
