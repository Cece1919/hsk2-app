import re

app_path = "/Users/trangngo95/Desktop/HSK/HSK2_Mobile_App.html"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix selectLesson loop to support all lessons dynamically
old_select_lesson = '''function selectLesson(num, updateTab) {
    currentLesson = num;
    for (let i = 1; i <= 6; i++) {
        const btn = document.getElementById('btn-lesson-' + i);
        if (btn) {
            if (i === num) {
                btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-bold bg-white text-blue-950 shadow-sm whitespace-nowrap transition";
            } else {
                btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-medium bg-slate-800/70 text-slate-300 hover:bg-slate-800 whitespace-nowrap transition";
            }
        }
    }'''

new_select_lesson = '''function selectLesson(num, updateTab) {
    currentLesson = num;
    document.querySelectorAll('.lesson-pill').forEach(btn => {
        const bId = btn.id;
        if (bId === 'btn-lesson-' + num) {
            btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-bold bg-white text-blue-950 shadow-sm whitespace-nowrap transition";
        } else {
            btn.className = "lesson-pill px-3.5 py-1.5 rounded-xl font-medium bg-slate-800/70 text-slate-300 hover:bg-slate-800 whitespace-nowrap transition";
        }
    });'''

content = content.replace(old_select_lesson, new_select_lesson)

# Add missing playText, showTab, resetChar, clearCanvas functions before playVocab
new_functions = '''
function showTab(tabId) {
    if (tabId === 'writing' || tabId === 'sim') {
        showAppNav('writing');
    } else if (tabId === 'vocab') {
        showAppNav('vocab');
        switchVocabMode('list');
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

function resetChar(id) {
    if (writers && writers[id]) writers[id].animateCharacter();
}

function clearCanvas(id) {
    clearPad('pad-' + id);
}
'''

if "function playText" not in content:
    content = content.replace("function playVocab(key, fallbackText) {", new_functions + "\nfunction playVocab(key, fallbackText) {")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fix applied to HSK2_Mobile_App.html!")
