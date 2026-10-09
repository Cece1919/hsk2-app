import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"

def get_html_content(is_8_tab=True):
    title_suffix = "(Bản 8 Tab - Có Mô Phỏng Nét Viết)" if is_8_tab else "(Bản 7 Tab Tự Học)"
    tab_sim_btn = '<button onclick="showTab(\'sim\')" id="tab-sim" class="tab-btn active px-4 py-2.5 font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer border-b-2 border-blue-600">🎬 Mô phỏng nét viết</button>' if is_8_tab else ''
    overview_active_class = "tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition" if is_8_tab else "tab-btn active px-4 py-2.5 font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer border-b-2 border-blue-600"
    
    sim_sec_style = 'class="tab-content"' if is_8_tab else 'class="tab-content hidden"'
    overview_sec_style = 'class="tab-content hidden"' if is_8_tab else 'class="tab-content"'

    # List of 22 characters for simulation tab
    sim_chars = [
        ("过", "guò", "过 (Đã từng)", "guo"),
        ("商", "shāng", "商场 (Trung tâm TM)", "shangchang"),
        ("场", "chǎng", "商场 (Trung tâm TM)", "shangchang"),
        ("进", "jìn", "进去 (Đi vào)", "jinqu"),
        ("去", "qù", "进去 (Đi vào)", "jinqu"),
        ("条", "tiáo", "一条裤子 (Lượng từ)", "tiao"),
        ("裤", "kù", "裤子 (Cái quần)", "kuzi"),
        ("子", "zǐ", "裤子 (Cái quần)", "kuzi"),
        ("白", "bái", "白色 (Màu trắng)", "baise"),
        ("色", "sè", "颜色 (Màu sắc)", "yanse"),
        ("因", "yīn", "因为 (Bởi vì)", "yinwei"),
        ("为", "wèi", "因为 (Bởi vì)", "yinwei"),
        ("试", "shì", "试试 (Thử)", "shi"),
        ("红", "hóng", "红色 (Màu đỏ)", "hongse"),
        ("所", "suǒ", "所以 (Cho nên)", "suoyi"),
        ("以", "yǐ", "所以 (Cho nên)", "suoyi"),
        ("书", "shū", "书包 (Cặp sách)", "shubao"),
        ("包", "bāo", "书包 (Cặp sách)", "shubao"),
        ("绿", "lǜ", "绿色 (Màu xanh lá)", "lvse"),
        ("黑", "hēi", "黑色 (Màu đen)", "heise"),
        ("更", "gèng", "更好看 (Càng/Hơn)", "geng"),
        ("颜", "yán", "颜色 (Màu sắc)", "yanse")
    ]

    sim_cards_html = ""
    for idx, (char_str, py, word_lbl, key) in enumerate(sim_chars):
        cid = f"char-{idx+1}"
        sim_cards_html += f"""
                <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                    <div class="text-center">
                        <span class="text-2xl font-bold text-slate-800 zh">{char_str}</span>
                        <span class="text-xs text-slate-500 block">{py}</span>
                        <span class="text-[11px] text-slate-400 block">{word_lbl}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2 w-full">
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">HanziWriter</span>
                            <div id="target-{cid}" class="writer-container w-[105px] h-[105px] bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-inner"></div>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">Tianzige Ô Vẽ</span>
                            <div class="relative w-[105px] h-[105px] bg-amber-50/40 rounded-xl border-2 border-amber-200 shadow-inner overflow-hidden">
                                <svg class="absolute inset-0 w-full h-full text-amber-200 pointer-events-none" viewBox="0 0 100 100">
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1"/>
                                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1"/>
                                    <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-dasharray="2,2" stroke-width="0.5"/>
                                    <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-dasharray="2,2" stroke-width="0.5"/>
                                </svg>
                                <canvas id="pad-{cid}" width="105" height="105" class="pad-canvas relative z-10 w-full h-full cursor-crosshair"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 w-full pt-1">
                        <button onclick="animateChar('{cid}')" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition">▶ Chạy nét</button>
                        <button onclick="resetChar('{cid}')" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition" title="Lặp lại">🔄</button>
                        <button onclick="clearCanvas('{cid}')" class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs border border-rose-200 transition" title="Xóa ô vẽ">🗑️</button>
                    </div>
                </div>"""

    html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <title>HSK 2 - Bài 4: 第四课 你穿红色的很好看 {title_suffix}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: 'Lexend', 'Noto Sans SC', sans-serif; background-color: #f8fafc; color: #1e293b; }}
        .zh {{ font-family: 'Noto Sans SC', sans-serif; }}
        @media print {{
            .no-print {{ display: none !important; }}
            body {{ background: white !important; color: black !important; padding: 0 !important; }}
            .tab-content {{ display: block !important; }}
        }}
        .tab-btn.active {{
            border-bottom: 3px solid #1e3a8a;
            color: #1e3a8a;
            font-weight: 700;
        }}
        .audio-btn {{ transition: all 0.2s ease; cursor: pointer; }}
        .audio-btn:hover {{ transform: scale(1.08); }}
        .audio-btn:active {{ transform: scale(0.95); }}
        .writer-container {{ width: 98px; height: 98px; border: 2px dashed #cbd5e1; border-radius: 12px; background: #ffffff; position: relative; background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px); background-size: 50% 50%; }}
        .pad-canvas {{ width: 98px; height: 98px; border: 2px solid #cbd5e1; border-radius: 12px; background: #ffffff; touch-action: none; cursor: crosshair; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen">

    <!-- HEADER -->
    <header class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl no-print">
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <span class="inline-block px-3 py-1 bg-blue-800/60 rounded-full text-xs font-semibold tracking-wide uppercase text-blue-200 mb-2">Giáo Trình HSK 2 Tự Học</span>
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">第四课 你穿红色的很好看</h1>
                <p class="text-blue-200 text-sm mt-1">Bài 4: Bạn mặc màu đỏ rất đẹp (Tập viết, Từ vựng, Ngữ pháp & Bài tập)</p>
            </div>
            <div class="flex items-center gap-3 bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                <span class="text-xs text-slate-300 font-medium pl-2">Tốc độ đọc:</span>
                <button onclick="setAudioPlaybackRate(0.75)" id="rate-075" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">0.75x (Chậm)</button>
                <button onclick="setAudioPlaybackRate(1.0)" id="rate-100" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition">1.0x (Chuẩn)</button>
            </div>
        </div>
    </header>

    <!-- NAVIGATION TABS -->
    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 scrollbar-none">
            {tab_sim_btn}
            <button onclick="showTab('overview')" id="tab-overview" class="{overview_active_class}">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 py-8">

        <!-- TAB 1: MÔ PHỎNG NÉT VIẾT -->
        <div id="sec-sim" {sim_sec_style}>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-2">✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (Bài 4)</h2>
                <p class="text-sm text-slate-600">Bấm <b>▶ Chạy nét</b> để xem thứ tự nét chuẩn HanziWriter, hoặc vẽ trực tiếp bằng tay/chuột trên ô <b>田字格</b> cảm ứng bên phải.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sim_cards_html}
            </div>
        </div>

        <!-- TAB 2: OVERVIEW -->
        <div id="sec-overview" {overview_sec_style}>
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                <h2 class="text-2xl font-bold text-blue-950 mb-4 flex items-center gap-3">
                    <span class="p-2 bg-blue-100 text-blue-800 rounded-2xl text-xl">🎯</span>
                    Mục tiêu bài học HSK 2 - Bài 4
                </h2>
                <div class="grid md:grid-cols-3 gap-4 text-sm">
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="font-bold text-blue-900 block mb-1">1. Trợ từ động thái 过</span>
                        <p class="text-slate-600">Hỏi và đáp về các trải nghiệm từng xảy ra trong quá khứ (Ví dụ: 你去过中国吗？).</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="font-bold text-blue-900 block mb-1">2. Cụm từ "的"</span>
                        <p class="text-slate-600">Dùng tính từ/động từ + 的 để miêu tả chỉ định đồ vật (Ví dụ: 红色的、绿色的).</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="font-bold text-blue-900 block mb-1">3. Câu phức 因为……，所以……</span>
                        <p class="text-slate-600">Diễn đạt quan hệ nguyên nhân và kết quả (Ví dụ: 因为是新开的，所以很便宜。).</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2">🚀 Quy Trình 5 Bước Tự Học Hiệu Quả</h3>
                <ol class="space-y-3 text-sm text-blue-100">
                    <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">1</span> Luyện tập viết nét chữ Hán ở Tab Mô phỏng nét viết / Tập viết.</li>
                    <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">2</span> Học từ mới kết hợp nghe Audio phát âm chuẩn chuẩn giọng Bắc Kinh ở Tab Từ vựng.</li>
                    <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">3</span> Nắm vững 3 điểm ngữ pháp trọng tâm ở Tab Ngữ pháp.</li>
                    <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">4</span> Đọc hiểu và luyện phân vai 4 đoạn bài khóa ở Tab Bài khóa.</li>
                    <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">5</span> Làm 15 câu bài tập tương tác chấm điểm tự động ở Tab Luyện tập.</li>
                </ol>
            </div>
        </div>

        <!-- TAB 3: TỪ VỰNG -->
        <div id="sec-vocab" class="tab-content hidden">
            <div class="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-6 text-amber-900 text-sm">
                <b>⚡ QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM HSK 2:</b>
                <ul class="list-disc pl-5 mt-1 space-y-1 text-xs">
                    <li>Biến điệu của <b>不 (bù)</b>: Đọc thành <i>bú</i> khi đứng trước âm tiết mang thanh 4 (Ví dụ: 不是 bú shì, 不看 bú kàn).</li>
                    <li>Biến điệu của <b>一 (yī)</b>: Đọc thành <i>yí</i> trước thanh 4 (Ví dụ: 一样 yí yàng); đọc thành <i>yì</i> trước thanh 1, 2, 3.</li>
                </ul>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                            <tr>
                                <th class="p-3.5 text-center">Nghe</th>
                                <th class="p-3.5">Chữ Hán</th>
                                <th class="p-3.5">Pinyin</th>
                                <th class="p-3.5">Hán Việt</th>
                                <th class="p-3.5">Loại từ</th>
                                <th class="p-3.5">Nghĩa Tiếng Việt</th>
                                <th class="p-3.5">Ví dụ minh họa</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('guo')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">过</td>
                                <td class="p-3.5 font-medium text-slate-600">guò</td>
                                <td class="p-3.5 text-slate-500">Quá</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Trợ từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Đã từng (Trợ từ động thái chỉ quá khứ)</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我去过中国。</span><br>Wǒ qùguo Zhōngguó. (Tôi từng đi Trung Quốc.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('shangchang')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">商场</td>
                                <td class="p-3.5 font-medium text-slate-600">shāngchǎng</td>
                                <td class="p-3.5 text-slate-500">Thương Tràng</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Trung tâm thương mại, thương xá</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">这是新开的商场。</span><br>Zhè shì xīn kāi de shāngchǎng. (Đây là thương xá mới mở.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('jinqu')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">进去</td>
                                <td class="p-3.5 font-medium text-slate-600">jìnqù</td>
                                <td class="p-3.5 text-slate-500">Tiến Khứ</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Động từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Đi vào</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我们进去看看吧。</span><br>Wǒmen jìnqù kànkan ba. (Chúng ta đi vào xem sao.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('tiao')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">条</td>
                                <td class="p-3.5 font-medium text-slate-600">tiáo</td>
                                <td class="p-3.5 text-slate-500">Điều</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Lượng từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Cái, chiếc (cho quần, sông, cá...)</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我想买条裤子。</span><br>Wǒ xiǎng mǎi tiáo kùzi. (Tôi muốn mua một chiếc quần.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('kuzi')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">裤子</td>
                                <td class="p-3.5 font-medium text-slate-600">kùzi</td>
                                <td class="p-3.5 text-slate-500">Khố Tử</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Cái quần</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我没穿过红色的裤子。</span><br>Wǒ méi chuānguo hóngsè de kùzi. (Tôi chưa từng mặc quần đỏ.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('baise')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">白色</td>
                                <td class="p-3.5 font-medium text-slate-600">báisè</td>
                                <td class="p-3.5 text-slate-500">Bạch Sắc</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Màu trắng</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我喜欢白色的衣服。</span><br>Wǒ xǐhuan báisè de yīfu. (Tôi thích quần áo màu trắng.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('yinwei')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">因为</td>
                                <td class="p-3.5 font-medium text-slate-600">yīnwèi</td>
                                <td class="p-3.5 text-slate-500">Nhân Vi</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Liên từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Bởi vì</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">因为我喜欢白色。</span><br>Yīnwèi wǒ xǐhuan báisè. (Bởi vì tôi thích màu trắng.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('shi')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">试</td>
                                <td class="p-3.5 font-medium text-slate-600">shì</td>
                                <td class="p-3.5 text-slate-500">Thí</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Động từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Thử (quần áo, giày dép...)</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">你试试那条红色的吧。</span><br>Nǐ shìshi nà tiáo hóngsè de ba. (Bạn thử chiếc màu đỏ kia xem.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('hongse')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">红色</td>
                                <td class="p-3.5 font-medium text-slate-600">hóngsè</td>
                                <td class="p-3.5 text-slate-500">Hồng Sắc</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Màu đỏ</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">你穿红色的很好看。</span><br>Nǐ chuān hóngsè de hěn hǎokàn. (Bạn mặc màu đỏ rất đẹp.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('suoyi')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">所以</td>
                                <td class="p-3.5 font-medium text-slate-600">suǒyǐ</td>
                                <td class="p-3.5 text-slate-500">Sở Dĩ</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Liên từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Cho nên, vì vậy</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">所以要试试啊！</span><br>Suǒyǐ yào shìshi a! (Cho nên phải thử xem sao chứ!)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('shubao')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">书包</td>
                                <td class="p-3.5 font-medium text-slate-600">shūbāo</td>
                                <td class="p-3.5 text-slate-500">Thư Bao</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Cặp sách, ba lô</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我想买个新书包。</span><br>Wǒ xiǎng mǎi gè xīn shūbāo. (Tôi muốn mua một cái cặp sách mới.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('guoqu')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">过去</td>
                                <td class="p-3.5 font-medium text-slate-600">guòqù</td>
                                <td class="p-3.5 text-slate-500">Quá Khứ</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Động từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Đi qua, đi tới</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我们过去看看吧。</span><br>Wǒmen guòqù kànkan ba. (Chúng ta đi qua đó xem sao.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('lvse')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">绿色</td>
                                <td class="p-3.5 font-medium text-slate-600">lǜsè</td>
                                <td class="p-3.5 text-slate-500">Lục Sắc</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Màu xanh lá</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">我觉得绿色的更好看。</span><br>Wǒ juéde lǜsè de gèng hǎokàn. (Tôi thấy màu xanh lá đẹp hơn.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('heise')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">黑色</td>
                                <td class="p-3.5 font-medium text-slate-600">hēisè</td>
                                <td class="p-3.5 text-slate-500">Hắc Sắc</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Màu đen</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">你有一条黑色的裤子。</span><br>Nǐ yǒu yì tiáo hēisè de kùzi. (Bạn có chiếc quần đen rồi.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('geng')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">更</td>
                                <td class="p-3.5 font-medium text-slate-600">gèng</td>
                                <td class="p-3.5 text-slate-500">Canh</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Phó từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Càng, hơn</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">绿色的更好看。</span><br>Lǜsè de gèng hǎokàn. (Màu xanh lá đẹp hơn.)</td>
                            </tr>
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-3.5 text-center"><button onclick="playAudio('yanse')" class="audio-btn p-2 bg-blue-100 text-blue-700 rounded-full">🔊</button></td>
                                <td class="p-3.5 font-bold zh text-lg text-blue-950">颜色</td>
                                <td class="p-3.5 font-medium text-slate-600">yánsè</td>
                                <td class="p-3.5 text-slate-500">Nhan Sắc</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Danh từ</span></td>
                                <td class="p-3.5 font-semibold text-slate-800">Màu sắc</td>
                                <td class="p-3.5 text-xs text-slate-600"><span class="zh font-medium text-sm">衣服的颜色很多。</span><br>Yīfu de yánsè hěn duō. (Quần áo có rất nhiều màu sắc.)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- TAB 4: TẬP VIẾT & MẸO NHỚ -->
        <div id="sec-writing" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h3 class="font-bold text-lg text-blue-950 mb-3">✍️ 7 Quy Tắc Nét Bút Cơ Bản</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">1. Ngang trước sổ sau (一 ➔ 十)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">2. Phẩy trước mác sau (丿 ➔ 人)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">3. Trên trước dưới sau (二, 三)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">4. Trái trước phải sau (川, 八)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">5. Ngoài trước trong sau (月, 风)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">6. Vào trước đóng sau (日, 国)</div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">7. Giữa trước hai bên sau (小, 水)</div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h3 class="font-bold text-lg text-blue-950 mb-3">💡 Thẻ Mẹo Nhớ Chiết Tự 4 Thành Phần (Bài 4)</h3>
                <div class="grid md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="text-lg font-bold zh text-blue-900">过 (guò)</span> - Trợ từ quá khứ
                        <p class="mt-1 text-slate-600"><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> 辶 (Sước)</p>
                        <p class="mt-1 text-slate-700"><b>(3) 💡 Mẹo nhớ:</b> Bước đi (辶) vượt qua thử thách đo bằng thước (寸).</p>
                        <p class="mt-1 text-slate-500"><b>(4) ✒️ Thuận bút:</b> 横、竖钩、点、点、横折折撇、捺</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="text-lg font-bold zh text-blue-900">试 (shì)</span> - Thử
                        <p class="mt-1 text-slate-600"><b>(1) Số nét:</b> 8 nét | <b>(2) Bộ thủ:</b> 讠 (Ngôn)</p>
                        <p class="mt-1 text-slate-700"><b>(3) 💡 Mẹo nhớ:</b> Dùng lời nói (讠) đề nghị thực hành thử quy tắc (式).</p>
                        <p class="mt-1 text-slate-500"><b>(4) ✒️ Thuận bút:</b> 点、横折提、横、竖、横、斜钩、点</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="text-lg font-bold zh text-blue-900">裤 (kù)</span> - Quần
                        <p class="mt-1 text-slate-600"><b>(1) Số nét:</b> 12 nét | <b>(2) Bộ thủ:</b> 衤 (Y - Trái)</p>
                        <p class="mt-1 text-slate-700"><b>(3) 💡 Mẹo nhớ:</b> Trang phục áo quần (衤) lưu trữ trong kho (库).</p>
                        <p class="mt-1 text-slate-500"><b>(4) ✒️ Thuận bút:</b> 点、横撇、竖、撇、点、点、横、撇、横、竖、竖、横</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span class="text-lg font-bold zh text-blue-900">更 (gèng)</span> - Càng, hơn
                        <p class="mt-1 text-slate-600"><b>(1) Số nét:</b> 7 nét | <b>(2) Bộ thủ:</b> 曰 (Viết)</p>
                        <p class="mt-1 text-slate-700"><b>(3) 💡 Mẹo nhớ:</b> Thời gian đổi mới đêm đến ngày càng tiến xa hơn.</p>
                        <p class="mt-1 text-slate-500"><b>(4) ✒️ Thuận bút:</b> 横、竖、横折、横、横、撇、捺</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 5: NGỮ PHÁP -->
        <div id="sec-grammar" class="tab-content hidden">
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h3 class="text-lg font-bold text-blue-950 mb-2">1. Trợ từ động thái “过” (Aspect Particle “过”)</h3>
                    <p class="text-sm text-slate-600 mb-3">Dùng sau động词 biểu thị hành động đã từng xảy ra trong quá khứ nhưng không kéo dài đến hiện tại. Cấu trúc: <b>Chủ ngữ + Động词 + 过 + Tân ngữ</b>.</p>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p><b>Khẳng định:</b> 她去过中国。(Cô ấy từng đi Trung Quốc.)</p>
                        <p><b>Phủ định:</b> 她没去过中国。(Cô ấy chưa từng đi Trung Quốc.)</p>
                        <p><b>Nghi vấn:</b> 我们来过这家商场吗？ (Chúng ta từng đến thương xá này chưa?)</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h3 class="text-lg font-bold text-blue-950 mb-2">2. Câu phức nguyên nhân - kết quả “因为……，所以……”</h3>
                    <p class="text-sm text-slate-600 mb-3">Dùng biểu thị quan hệ nguyên nhân ("因为") và kết quả ("所以"). Có thể dùng cả cặp hoặc dùng một trong hai.</p>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p><b>Ví dụ 1:</b> 就是因为没穿过，所以要试试啊！(Chính vì chưa mặc bao giờ nên mới phải thử chứ!)</p>
                        <p><b>Ví dụ 2:</b> 因为我生病了，今天没去上班。(Vì tôi bị ốm nên hôm nay không đi làm.)</p>
                        <p><b>Ví dụ 3:</b> 因为是新开的，所以这几天东西很便宜。(Vì là mới mở nên mấy ngày này đồ rất rẻ.)</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h3 class="text-lg font-bold text-blue-950 mb-2">3. Cụm từ “的” (“的” Phrase)</h3>
                    <p class="text-sm text-slate-600 mb-3">Tính từ / Động词 / Danh词 + “的” tạo thành cụm từ tương đương danh từ (thay thế cho danh từ đã được nhắc tới trước đó).</p>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p><b>Ví dụ 1:</b> 红色的、绿色的、黑色的，你想买哪个？(= 红色的书包...)</p>
                        <p><b>Ví dụ 2:</b> 这个面包是爸爸买的，妈妈买的在那儿。(= 妈妈买的面包)</p>
                        <p><b>Ví dụ 3:</b> 这件衣服太贵了，还是买那件便宜的吧。(= 便宜的衣服)</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 6: BÀI KHÓA -->
        <div id="sec-text" class="tab-content hidden">
            <div class="space-y-6">
                <!-- Text 1 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Bài khóa 1</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场门口 (At the entrance of the shopping mall)</h3>
                        </div>
                        <button onclick="playAudio('text1')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Nghe Bài khóa 1</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我们来过这家商场吗？<br><span class="text-slate-500 text-xs">Māma, wǒmen láiguo zhè jiā shāngchǎng ma?</span><br><span class="text-slate-600 text-xs">Mẹ ơi, chúng ta từng đến thương xá này chưa?</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 没来过，这是新开的。<br><span class="text-slate-500 text-xs">Méi láiguo, zhè shì xīn kāi de.</span><br><span class="text-slate-600 text-xs">Chưa từng đến, đây là chỗ mới mở.</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我们进去看看吧。<br><span class="text-slate-500 text-xs">Wǒmen jìnqù kànkan ba.</span><br><span class="text-slate-600 text-xs">Chúng ta đi vào xem sao đi.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 好啊！你想买点儿什么？<br><span class="text-slate-500 text-xs">Hǎo a! Nǐ xiǎng mǎi diǎnr shénme?</span><br><span class="text-slate-600 text-xs">Được chứ! Con muốn mua gì nào?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我想买条裤子。<br><span class="text-slate-500 text-xs">Wǒ xiǎng mǎi tiáo kùzi.</span><br><span class="text-slate-600 text-xs">Con muốn mua một chiếc quần.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 没问题。<br><span class="text-slate-500 text-xs">Méi wèntí.</span><br><span class="text-slate-600 text-xs">Không vấn đề gì.</span></p>
                    </div>
                </div>

                <!-- Text 2 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Bài khóa 2</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场看衣服 (Shopping for clothes)</h3>
                        </div>
                        <button onclick="playAudio('text2')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Nghe Bài khóa 2</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我想买这条白色的裤子。<br><span class="text-slate-500 text-xs">Māma, wǒ xiǎng mǎi zhè tiáo báisè de kùzi.</span><br><span class="text-slate-600 text-xs">Mẹ ơi, con muốn mua chiếc quần màu trắng này.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 你有很多白色的衣服，为什么还买白色的？<br><span class="text-slate-500 text-xs">Nǐ yǒu hěn duō báisè de yīfu, wèi shénme hái mǎi báisè de?</span><br><span class="text-slate-600 text-xs">Con có rất nhiều quần áo trắng rồi, sao còn mua màu trắng nữa?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 因为我喜欢白色啊！<br><span class="text-slate-500 text-xs">Yīnwèi wǒ xǐhuan báisè a!</span><br><span class="text-slate-600 text-xs">Vì con thích màu trắng mà!</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 我觉得这条白色的不太好看，你试试那条红色的吧。<br><span class="text-slate-500 text-xs">Wǒ juéde zhè tiáo báisè de bú tài hǎokàn, nǐ shìshi nà tiáo hóngsè de ba.</span><br><span class="text-slate-600 text-xs">Mẹ thấy chiếc màu trắng này không đẹp lắm, con thử chiếc màu đỏ kia xem sao.</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我没穿过红色的，红色的好看吗？<br><span class="text-slate-500 text-xs">Wǒ méi chuānguo hóngsè de, hóngsè de hǎokàn ma?</span><br><span class="text-slate-600 text-xs">Con chưa từng mặc màu đỏ bao giờ, màu đỏ có đẹp không mẹ?</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 就是因为没穿过，所以要试试啊！<br><span class="text-slate-500 text-xs">Jiù shì yīnwèi méi chuānguo, suǒyǐ yào shìshi a!</span><br><span class="text-slate-600 text-xs">Chính vì chưa từng mặc nên mới phải thử chứ!</span></p>
                    </div>
                </div>

                <!-- Text 3 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Bài khóa 3</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场看书包 (Shopping for schoolbags)</h3>
                        </div>
                        <button onclick="playAudio('text3')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Nghe Bài khóa 3</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我想买个新书包。<br><span class="text-slate-500 text-xs">Māma, wǒ xiǎng mǎi gè xīn shūbāo.</span><br><span class="text-slate-600 text-xs">Mẹ ơi, con muốn mua cái cặp sách mới.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 好，那边卖书包，我们过去看看吧。<br><span class="text-slate-500 text-xs">Hǎo, nàbiān mǎi shūbāo, wǒmen guòqù kànkan ba.</span><br><span class="text-slate-600 text-xs">Được, bên kia bán cặp sách, chúng ta đi qua xem đi.</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 这么多漂亮的书包！<br><span class="text-slate-500 text-xs">Zhème duō piàoliang de shūbāo!</span><br><span class="text-slate-600 text-xs">Nhiều cặp sách đẹp thế này!</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 红色的、绿色的、黑色的，你想买哪个？<br><span class="text-slate-500 text-xs">Hóngsè de, lǜsè de, hēisè de, nǐ xiǎng mǎi nǎge?</span><br><span class="text-slate-600 text-xs">Màu đỏ, màu xanh lá, màu đen, con muốn mua cái nào?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 绿色的吧。<br><span class="text-slate-500 text-xs">Lǜsè de ba.</span><br><span class="text-slate-600 text-xs">Cái màu xanh lá đi ạ.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 不错，我也觉得绿色的更好看。<br><span class="text-slate-500 text-xs">Búcuò, wǒ yě juéde lǜsè de gèng hǎokàn.</span><br><span class="text-slate-600 text-xs">Khá lắm, mẹ cũng thấy màu xanh lá đẹp hơn.</span></p>
                    </div>
                </div>

                <!-- Text 4 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Bài khóa 4</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在房间写日记 (Writing in diary)</h3>
                        </div>
                        <button onclick="playAudio('text4')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Nghe Bài khóa 4</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4 leading-relaxed">
                        <p class="zh text-base font-medium text-slate-800">我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。</p>
                        <p class="text-slate-500 text-xs">Wǒ hé māma qùle yì jiā shāngchǎng. Yīnwèi shì xīn kāi de, suǒyǐ zhè jǐ tiān dōngxi hěn piányi. Shāngchǎng lǐ de yīfu yánsè hěn duō. Wǒ méi chuānguo hóngsè de kùzi, māma ràng wǒ shìle shì, wǒ juéde wǒ chuān hóngsè de yě hěn hǎokàn.</p>
                        <p class="text-slate-600 text-xs border-t border-slate-100 pt-2">Tôi và mẹ đã đi đến một trung tâm thương mại. Bởi vì mới mở nên mấy ngày này đồ đạc rất rẻ. Quần áo trong thương xá có rất nhiều màu sắc. Tôi chưa từng mặc quần màu đỏ bao giờ, mẹ bảo tôi thử xem sao, tôi cảm thấy tôi mặc màu đỏ cũng rất đẹp.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 7: LUYỆN TẬP -->
        <div id="sec-practice" class="tab-content hidden">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-6">
                <h3 class="text-xl font-bold text-blue-950 mb-4">📝 15 Câu Bài Tập Tương Tác Căn Bản (Bài 4)</h3>
                
                <!-- 5 câu điền từ -->
                <div class="space-y-4 mb-8">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Phần 1: Điền từ thích hợp vào chỗ trống (A. 进去, B. 书包, C. 颜色, D. 条, E. 商场)</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">1. 我看见老师在教室里，你 <input type="text" id="q1" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 找她吧。</p>
                        <button onclick="checkQ('q1', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q1" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">2. 你已经有一 <input type="text" id="q2" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 黑色的裤子了，别买了。</p>
                        <button onclick="checkQ('q2', 'D')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: D)</button>
                        <span id="res-q2" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">3. 我来过这家 <input type="text" id="q3" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="...">，它是今年一月新开的。</p>
                        <button onclick="checkQ('q3', 'E')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: E)</button>
                        <span id="res-q3" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">4. 妈妈，你看见我的 <input type="text" id="q4" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 了吗？</p>
                        <button onclick="checkQ('q4', 'B')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: B)</button>
                        <span id="res-q4" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">5. 你想买件什么 <input type="text" id="q5" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 的衣服？</p>
                        <button onclick="checkQ('q5', 'C')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: C)</button>
                        <span id="res-q5" class="ml-2 font-bold"></span>
                    </div>
                </div>

                <!-- 5 câu trắc nghiệm ngữ pháp -->
                <div class="space-y-4 mb-8">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Phần 2: Trắc nghiệm ngữ pháp</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">6. 我去 ____ 北京，那里很大很漂亮。(A. 过 | B. 了 | C. 着)</p>
                        <input type="text" id="q6" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="Chọn A/B/C">
                        <button onclick="checkQ('q6', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q6" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">7. ____ 今天下雨，____ 我们没去公园。(A. 因为...所以... | B. 虽然...但是...)</p>
                        <input type="text" id="q7" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="Chọn A/B">
                        <button onclick="checkQ('q7', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q7" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">8. 这两个书包，我更喜欢红色的 ____。(A. 的 | B. 得 | C. 地)</p>
                        <input type="text" id="q8" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="Chọn A/B/C">
                        <button onclick="checkQ('q8', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q8" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">9. 你吃 ____ 饺子没有？(A. 过 | B. 完 | C. 好)</p>
                        <input type="text" id="q9" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="Chọn A/B/C">
                        <button onclick="checkQ('q9', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q9" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">10. 这件衣服太贵了，买那件便宜 ____ 吧。(A. 的 | B. 了 | C. 过)</p>
                        <input type="text" id="q10" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="Chọn A/B/C">
                        <button onclick="checkQ('q10', 'A')" class="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs">Kiểm tra (Đáp án: A)</button>
                        <span id="res-q10" class="ml-2 font-bold"></span>
                    </div>
                </div>

                <!-- 5 câu sắp xếp câu -->
                <div class="space-y-4">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Phần 3: Sắp xếp các từ thành câu hoàn chỉnh</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">11. 没 / 来过 / 商场 / 我们 / 这家</p>
                        <input type="text" class="w-full border rounded p-2 text-xs" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">
                        <details class="text-[11px] text-slate-500 cursor-pointer"><summary class="font-bold text-blue-700">Xem đáp án chuẩn</summary><p class="mt-1 font-bold text-emerald-700">我们没来过这家商场。</p></details>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">12. 红色的 / 你 / 很好看 / 穿</p>
                        <input type="text" class="w-full border rounded p-2 text-xs" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">
                        <details class="text-[11px] text-slate-500 cursor-pointer"><summary class="font-bold text-blue-700">Xem đáp án chuẩn</summary><p class="mt-1 font-bold text-emerald-700">你穿红色的很好看。</p></details>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">13. 新书包 / 我 / 想 / 买个</p>
                        <input type="text" class="w-full border rounded p-2 text-xs" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">
                        <details class="text-[11px] text-slate-500 cursor-pointer"><summary class="font-bold text-blue-700">Xem đáp án chuẩn</summary><p class="mt-1 font-bold text-emerald-700">我想买个新书包。</p></details>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">14. 东西 / 很便宜 / 因为 / 是新开的 / 所以</p>
                        <input type="text" class="w-full border rounded p-2 text-xs" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">
                        <details class="text-[11px] text-slate-500 cursor-pointer"><summary class="font-bold text-blue-700">Xem đáp án chuẩn</summary><p class="mt-1 font-bold text-emerald-700">因为是新开的，所以东西很便宜。</p></details>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">15. 绿色的 / 更好看 / 我 / 觉得</p>
                        <input type="text" class="w-full border rounded p-2 text-xs" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">
                        <details class="text-[11px] text-slate-500 cursor-pointer"><summary class="font-bold text-blue-700">Xem đáp án chuẩn</summary><p class="mt-1 font-bold text-emerald-700">我觉得绿色的更好看。</p></details>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 8: GÓC VĂN HÓA -->
        <div id="sec-culture" class="tab-content hidden">
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mb-6">
                <h3 class="text-xl font-bold text-blue-950 mb-3">🎋 Ý Nghĩa Màu Sắc Trong Văn Hóa Trung Hoa</h3>
                <div class="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <p><b>1. Màu đỏ (红色 - Hóngsè):</b> Là màu sắc may mắn, thịnh vượng và hạnh phúc nhất trong văn hóa Trung Quốc. Màu đỏ thường xuất hiện trong ngày Tết, đám cưới và lễ hội.</p>
                    <p><b>2. Màu trắng (白色 - Báisè):</b> Tượng trưng cho sự thuần khiết nhưng cũng liên quan đến tang lễ truyền thống.</p>
                    <p><b>3. Màu xanh lá (绿色 - Lǜsè):</b> Biểu tượng cho sức sống và tự nhiên.</p>
                    <p><b>4. Màu đen (黑色 - Hēisè):</b> Tượng trưng cho sự trang nghiêm, quyền lực và bí ẩn.</p>
                </div>
            </div>
        </div>

    </main>

    <!-- SCRIPT -->
    <script>
        var currentAudio = null;
        var currentRate = 1.0;
        var writers = {{}};
        var isSimInitialized = false;

        function setAudioPlaybackRate(rate) {{
            currentRate = rate;
            document.getElementById('rate-075').className = rate === 0.75 ? "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition" : "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            document.getElementById('rate-100').className = rate === 1.0 ? "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition" : "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            if (currentAudio) {{ currentAudio.playbackRate = currentRate; }}
        }}

        function playAudio(filename) {{
            if (currentAudio) {{
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }}
            currentAudio = new Audio('audio/' + filename + '.m4a');
            currentAudio.playbackRate = currentRate;
            currentAudio.play().catch(function(err) {{
                console.log('Online fallback TTS...');
                var msg = new SpeechSynthesisUtterance(filename);
                msg.lang = 'zh-CN';
                msg.rate = currentRate;
                window.speechSynthesis.speak(msg);
            }});
        }}

        function showTab(tabId) {{
            var contents = document.querySelectorAll('.tab-content');
            contents.forEach(function(el) {{ el.classList.add('hidden'); }});
            
            var btns = document.querySelectorAll('.tab-btn');
            btns.forEach(function(btn) {{
                btn.classList.remove('active', 'bg-blue-900', 'text-white', 'font-bold', 'border-b-2', 'border-blue-600');
                btn.classList.add('text-slate-600', 'font-medium');
            }});

            var targetSec = document.getElementById('sec-' + tabId);
            if (targetSec) {{ targetSec.classList.remove('hidden'); }}

            var targetTabBtn = document.getElementById('tab-' + tabId);
            if (targetTabBtn) {{
                targetTabBtn.classList.add('active', 'bg-blue-900', 'text-white', 'font-bold', 'border-b-2', 'border-blue-600');
                targetTabBtn.classList.remove('text-slate-600', 'font-medium');
            }}

            if (tabId === 'sim' && !isSimInitialized) {{
                initSimWriters();
            }}
        }}

        function initSimWriters() {{
            isSimInitialized = true;
            var simData = [
                {{"id": "char-1", "char": "过"}},
                {{"id": "char-2", "char": "商"}},
                {{"id": "char-3", "char": "场"}},
                {{"id": "char-4", "char": "进"}},
                {{"id": "char-5", "char": "去"}},
                {{"id": "char-6", "char": "条"}},
                {{"id": "char-7", "char": "裤"}},
                {{"id": "char-8", "char": "子"}},
                {{"id": "char-9", "char": "白"}},
                {{"id": "char-10", "char": "色"}},
                {{"id": "char-11", "char": "因"}},
                {{"id": "char-12", "char": "为"}},
                {{"id": "char-13", "char": "试"}},
                {{"id": "char-14", "char": "红"}},
                {{"id": "char-15", "char": "所"}},
                {{"id": "char-16", "char": "以"}},
                {{"id": "char-17", "char": "书"}},
                {{"id": "char-18", "char": "包"}},
                {{"id": "char-19", "char": "绿"}},
                {{"id": "char-20", "char": "黑"}},
                {{"id": "char-21", "char": "更"}},
                {{"id": "char-22", "char": "颜"}}
            ];

            simData.forEach(function(item) {{
                var container = document.getElementById('target-' + item.id);
                if (container && typeof HanziWriter !== 'undefined') {{
                    writers[item.id] = HanziWriter.create('target-' + item.id, item.char, {{
                        width: 98,
                        height: 98,
                        padding: 5,
                        showOutline: true,
                        strokeColor: '#0f172a'
                    }});
                }}
                initCanvasPad(item.id);
            }});
        }}

        function initCanvasPad(id) {{
            var canvas = document.getElementById('pad-' + id);
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            var drawing = false;

            function getPos(e) {{
                var rect = canvas.getBoundingClientRect();
                var clientX = e.touches ? e.touches[0].clientX : e.clientX;
                var clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {{ x: clientX - rect.left, y: clientY - rect.top }};
            }}

            function startDraw(e) {{
                drawing = true;
                var pos = getPos(e);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#1e3a8a';
            }}

            function draw(e) {{
                if (!drawing) return;
                var pos = getPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }}

            function stopDraw() {{ drawing = false; }}

            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDraw);
            canvas.addEventListener('touchstart', function(e) {{ e.preventDefault(); startDraw(e); }});
            canvas.addEventListener('touchmove', function(e) {{ e.preventDefault(); draw(e); }});
            canvas.addEventListener('touchend', stopDraw);
        }}

        function animateChar(id) {{
            if (writers[id]) {{ writers[id].animateCharacter(); }}
        }}

        function resetChar(id) {{
            if (writers[id]) {{ writers[id].showCharacter(); }}
        }}

        function clearCanvas(id) {{
            var canvas = document.getElementById('pad-' + id);
            if (canvas) {{
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}
        }}

        function checkQ(qid, expected) {{
            var inp = document.getElementById(qid);
            var res = document.getElementById('res-' + qid);
            if (!inp || !res) return;
            var val = inp.value.trim().toUpperCase();
            if (val === expected) {{
                res.textContent = "✅ Chính xác!";
                res.className = "ml-2 font-bold text-emerald-600";
            }} else {{
                res.textContent = "❌ Chưa đúng (Đáp án: " + expected + ")";
                res.className = "ml-2 font-bold text-rose-600";
            }}
        }}

        document.addEventListener('DOMContentLoaded', function() {{
            {'initSimWriters();' if is_8_tab else ''}
        }});
    </script>
</body>
</html>"""
    return html

# Write HSK2_Bai_4_Mo_Phong_Viet.html
with open(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"), "w", encoding="utf-8") as f:
    f.write(get_html_content(is_8_tab=True))

# Write HSK2_Bai_4_Tu_Hoc.html
with open(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"), "w", encoding="utf-8") as f:
    f.write(get_html_content(is_8_tab=False))

print("Both HTML files generated successfully!")
