import re

app_path = "/Users/trangngo95/Desktop/HSK/HSK2_Mobile_App.html"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add responsive CSS to remove phone frame on mobile devices so taps/clicks work natively
responsive_css = '''
        @media (max-width: 768px) {
            body {
                background-color: #f8fafc !important;
            }
            .phone-frame {
                border: none !important;
                border-radius: 0 !important;
                margin: 0 !important;
                height: auto !important;
                min-height: 100vh !important;
                max-height: none !important;
                overflow: visible !important;
                box-shadow: none !important;
            }
            .phone-frame .app-container {
                min-height: 100vh !important;
                height: auto !important;
                overflow-y: visible !important;
                max-width: 100% !important;
                box-shadow: none !important;
            }
            .fake-status-bar {
                display: none !important;
            }
        }
'''

if "@media (max-width: 768px)" not in content:
    content = content.replace("</style>", responsive_css + "\n    </style>")

# Mark fake status bar with class for hiding on real mobile devices
content = content.replace('<div class="bg-slate-900 text-white px-5 pt-3 pb-2 flex items-center justify-between text-xs sticky top-0 z-50 select-none">',
                        '<div class="fake-status-bar bg-slate-900 text-white px-5 pt-3 pb-2 flex items-center justify-between text-xs sticky top-0 z-50 select-none">')

# Update showAppNav to handle switchTab parameter correctly
old_show_app_nav = '''function showAppNav(view, switchTab) {
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
    if (view === 'writing') {
        setTimeout(initLessonWriters, 100);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}'''

new_show_app_nav = '''function showAppNav(view, switchTab) {
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
}'''

content = content.replace(old_show_app_nav, new_show_app_nav)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Applied native mobile layout fix to HSK2_Mobile_App.html!")
