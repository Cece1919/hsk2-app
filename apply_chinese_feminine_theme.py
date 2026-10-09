import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

# Chinese Feminine CSS Style block
feminine_style = """
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Lexend', 'Noto Sans SC', serif, sans-serif; background-color: #fdfbf7; color: #2d2623; }
        .zh { font-family: 'Noto Sans SC', serif, sans-serif; }
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; padding: 0 !important; }
            .tab-content { display: block !important; }
        }
        .tab-btn.active {
            border-bottom: 3px solid #b91c1c !important;
            color: #881337 !important;
            background-color: #fff1f2 !important;
            font-weight: 700;
        }
        .audio-btn { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .audio-btn:hover { transform: scale(1.08); background-color: #ffe4e6 !important; }
        .audio-btn:active { transform: scale(0.95); }
        .writer-container { width: 98px; height: 98px; border: 2px dashed #f43f5e; border-radius: 14px; background: #fffdfa; position: relative; background-image: linear-gradient(to right, #fecdd3 1px, transparent 1px), linear-gradient(to bottom, #fecdd3 1px, transparent 1px); background-size: 50% 50%; }
        .pad-canvas { width: 98px; height: 98px; border: 2px solid #f43f5e; border-radius: 14px; background: #fffdfa; touch-action: none; cursor: crosshair; }
    </style>
"""

# Chinese Feminine Header replacing old header
old_header_tag = '<header class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl no-print">'
new_header_html = """<header class="bg-gradient-to-r from-rose-900 via-pink-900 to-amber-900 text-rose-50 shadow-xl border-b-2 border-amber-300/40 no-print">
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <span class="inline-block px-3.5 py-1 bg-amber-500/20 border border-amber-300/40 rounded-full text-xs font-semibold tracking-wide uppercase text-amber-200 mb-2">🌸 Giáo Trình HSK 2 Tự Học • 华风美学</span>
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">第四课 你穿红色的很好看</h1>
                <p class="text-rose-100 text-sm mt-1">Bài 4: Bạn mặc màu đỏ rất đẹp (Tập viết, Từ vựng, Ngữ pháp & Bài tập)</p>
            </div>
            <div class="flex items-center gap-3 bg-rose-950/60 p-2.5 rounded-2xl border border-rose-800/80 backdrop-blur">
                <span class="text-xs text-rose-200 font-medium pl-2">Tốc độ đọc:</span>
                <button onclick="setAudioPlaybackRate(0.75)" id="rate-075" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-900/80 text-rose-200 hover:bg-rose-800 transition">0.75x (Chậm)</button>
                <button onclick="setAudioPlaybackRate(1.0)" id="rate-100" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-700 text-white shadow transition">1.0x (Chuẩn)</button>
            </div>
        </div>
    </header>"""

def update_feminine_theme_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace <style> block
    if "<style>" in content and "</style>" in content:
        head_part = content.split("<style>")[0]
        tail_part = content.split("</style>")[1]
        content = head_part + feminine_style.strip() + tail_part

    # Replace Header styling
    if '<header class="bg-gradient-to-r' in content and '</header>' in content:
        h_start = content.split('<header class="bg-gradient-to-r')[0]
        h_end = content.split('</header>')[1]
        content = h_start + new_header_html + h_end

    # Replace body class to soft cream background
    content = content.replace('class="bg-slate-50 text-slate-800 min-h-screen"', 'class="bg-[#fdfbf7] text-[#2d2623] min-h-screen"')
    content = content.replace('bg-slate-50', 'bg-[#faf6f0]')
    content = content.replace('bg-blue-900', 'bg-rose-800')
    content = content.replace('text-blue-900', 'text-rose-950')
    content = content.replace('text-blue-950', 'text-rose-950')
    content = content.replace('border-blue-600', 'border-rose-600')
    content = content.replace('bg-blue-600', 'bg-rose-700')
    content = content.replace('hover:bg-blue-700', 'hover:bg-rose-800')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Applied Chinese Feminine Theme to {filepath}")

update_feminine_theme_in_file(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_feminine_theme_in_file(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
update_feminine_theme_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_feminine_theme_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
update_feminine_theme_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_feminine_theme_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("Chinese Feminine aesthetic theme successfully applied across all HTML files!")

