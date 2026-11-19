# -*- coding: utf-8 -*-
import json
import os
import shutil

DAY9_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh/Day 9"
TRUNG_ANH_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh"
JSON_PATH = os.path.join(DAY9_DIR, "day9_audio_base64.json")

with open(JSON_PATH, "r", encoding="utf-8") as f:
    audio_data = json.load(f)

vocab_audio_json = json.dumps(audio_data["vocab"])
ex_audio_json = json.dumps(audio_data["ex"])
text_audio_json = json.dumps(audio_data["text"])

# 24 core characters for simulation & writing
SIM_CHARS = [
    {"id": "char-1", "char": "坏", "pinyin": "huài", "word": "坏 (Hỏng, rách, xấu)"},
    {"id": "char-2", "char": "旁", "pinyin": "páng", "word": "旁边 (Bên cạnh, sườn)"},
    {"id": "char-3", "char": "边", "pinyin": "biān", "word": "旁边/左边 (Bên, phía, bờ)"},
    {"id": "char-4", "char": "男", "pinyin": "nán", "word": "男孩儿 (Con trai, đàn ông)"},
    {"id": "char-5", "char": "孩", "pinyin": "hái", "word": "男孩儿 (Đứa trẻ, hài nhi)"},
    {"id": "char-6", "char": "儿", "pinyin": "ér", "word": "男孩儿 (Nhi, uốn lưỡi)"},
    {"id": "char-7", "char": "这", "pinyin": "zhè", "word": "这样 (Đây, này)"},
    {"id": "char-8", "char": "样", "pinyin": "yàng", "word": "这样 (Kiểu dáng, hình mẫu)"},
    {"id": "char-9", "char": "个", "pinyin": "gè", "word": "个子 (Cá nhân, lượng từ cái)"},
    {"id": "char-10", "char": "子", "pinyin": "zǐ", "word": "个子 (Con cái, hậu tố tử)"},
    {"id": "char-11", "char": "那", "pinyin": "nà", "word": "那么 (Kia, đó, nơi xa)"},
    {"id": "char-12", "char": "么", "pinyin": "me", "word": "那么 (Ma, mức độ, trợ từ)"},
    {"id": "char-13", "char": "高", "pinyin": "gāo", "word": "高 (Cao lớn, lầu đài cao)"},
    {"id": "char-14", "char": "门", "pinyin": "mén", "word": "门口 (Cánh cửa, lối đi)"},
    {"id": "char-15", "char": "口", "pinyin": "kǒu", "word": "门口 (Cái miệng, lối vào)"},
    {"id": "char-16", "char": "奶", "pinyin": "nǎi", "word": "奶茶 (Sữa tươi, ngọt ngào)"},
    {"id": "char-17", "char": "茶", "pinyin": "chá", "word": "奶茶 (Búp trà, trà đạo)"},
    {"id": "char-18", "char": "咖", "pinyin": "kā", "word": "咖啡 (Kha, mượn âm cà phê)"},
    {"id": "char-19", "char": "啡", "pinyin": "fēi", "word": "咖啡 (Phi, mượn âm cà phê)"},
    {"id": "char-20", "char": "离", "pinyin": "lí", "word": "离 (Cách xa, ly biệt)"},
    {"id": "char-21", "char": "近", "pinyin": "jìn", "word": "近 (Gần gũi, cận kề)"},
    {"id": "char-22", "char": "走", "pinyin": "zǒu", "word": "走路 (Cất bước đi, tẩu)"},
    {"id": "char-23", "char": "路", "pinyin": "lù", "word": "走路 (Con đường, lộ)"},
    {"id": "char-24", "char": "周", "pinyin": "zhōu", "word": "周 (Tuần lễ, chu kỳ)"}
]

def generate_html(is_8_tabs=True):
    title_suffix = "(Bản 8 Tab - Có Mô Phỏng Nét Viết)" if is_8_tabs else "(Bản 7 Tab - Tự Học)"
    default_tab = "sim" if is_8_tabs else "overview"
    
    # Navigation Buttons
    nav_buttons = []
    if is_8_tabs:
        nav_buttons.append("""<button onclick="showTab('sim')" id="tab-sim" class="tab-btn active px-4 py-2.5 font-bold bg-rose-800 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer border-b-2 border-rose-600">🎬 Mô phỏng nét viết</button>""")
    
    overview_active = "active px-4 py-2.5 font-bold bg-rose-800 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer border-b-2 border-rose-600" if not is_8_tabs else "px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition"
    nav_buttons.append(f"""<button onclick="showTab('overview')" id="tab-overview" class="tab-btn {overview_active}">📌 Overview</button>""")
    nav_buttons.append("""<button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">📖 Từ vựng</button>""")
    nav_buttons.append("""<button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">✍️ Tập viết & Mẹo nhớ</button>""")
    nav_buttons.append("""<button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">💡 Ngữ pháp</button>""")
    nav_buttons.append("""<button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">🗣️ Bài khóa</button>""")
    nav_buttons.append("""<button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">📝 Luyện tập</button>""")
    nav_buttons.append("""<button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition">🎋 Góc văn hóa</button>""")
    nav_html = "\n            ".join(nav_buttons)

    # Tab 1: Simulation HTML
    sim_section = ""
    if is_8_tabs:
        cards = []
        for item in SIM_CHARS:
            cid = item["id"]
            char = item["char"]
            pinyin = item["pinyin"]
            word = item["word"]
            cards.append(f"""
                <div class="bg-white p-3.5 rounded-2xl shadow-sm border border-rose-100/80 flex flex-col items-center gap-3">
                    <div class="text-center">
                        <span class="text-2xl font-bold text-slate-800 zh">{char}</span>
                        <span class="text-xs text-rose-800 font-mono block">{pinyin}</span>
                        <span class="text-[11px] text-slate-500 block">{word}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2.5 w-full">
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">HanziWriter</span>
                            <div id="target-{cid}" class="writer-container w-[105px] h-[105px] bg-[#fffdfa] rounded-xl border-2 border-dashed border-rose-300 flex items-center justify-center shadow-inner"></div>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">Tianzige Ô Vẽ</span>
                            <div class="relative w-[105px] h-[105px] bg-amber-50/40 rounded-xl border-2 border-rose-300 shadow-inner overflow-hidden">
                                <svg class="absolute inset-0 w-full h-full text-rose-200 pointer-events-none" viewBox="0 0 100 100">
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
                        <button onclick="animateChar('{cid}')" class="flex-1 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold shadow-sm transition">▶ Chạy nét</button>
                        <button onclick="resetChar('{cid}')" class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs transition" title="Lặp lại">🔄</button>
                        <button onclick="clearCanvas('{cid}')" class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs border border-rose-200 transition" title="Xóa ô vẽ">🗑️</button>
                    </div>
                </div>""")
        cards_html = "\n".join(cards)
        sim_section = f"""
        <!-- TAB 1: MÔ PHỎNG NÉT VIẾT -->
        <div id="sec-sim" class="tab-content">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-rose-100/80 mb-6">
                <h2 class="text-xl font-bold text-rose-950 font-serif mb-2">✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (100% Từ Mới Bài 9 - Đủ 24 Chữ Hán Cốt Lõi)</h2>
                <p class="text-sm text-slate-600">Bấm <b>▶ Chạy nét</b> để xem hoạt hình thứ tự nét viết chuẩn HanziWriter, hoặc vẽ trực tiếp bằng tay/chuột trên ô <b>田字格</b> cảm ứng bên phải.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards_html}
            </div>
        </div>"""

    # Tab 2: Overview HTML
    sec_overview_class = "tab-content hidden" if is_8_tabs else "tab-content"
    overview_section = f"""
        <!-- TAB 2: OVERVIEW -->
        <div id="sec-overview" class="{sec_overview_class}">
            <div class="bg-gradient-to-r from-rose-900 via-pink-900 to-amber-900 p-6 md:p-8 rounded-3xl text-white shadow-md mb-6 border-b-2 border-amber-300/40">
                <div class="flex items-center gap-3 mb-3">
                    <span class="px-3 py-1 bg-amber-400 text-rose-950 font-extrabold rounded-full text-xs uppercase tracking-wider">HSK 2 Standard Course</span>
                    <span class="text-rose-200 text-xs">Giáo Trình Chuẩn 《新HSK 教程 2》 (FLTRP 2026)</span>
                </div>
                <h1 class="text-2xl md:text-3xl font-bold font-serif mb-3 tracking-wide">第九课 我去买杯奶茶</h1>
                <p class="text-rose-100 text-sm md:text-base font-medium mb-6">Bài 9: Tôi đi mua một cốc trà sữa • <i>Lesson 9: I'm going to buy a cup of bubble tea</i></p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div class="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur">
                        <strong class="text-amber-200 text-sm block mb-1">🎯 Mục Tiêu Bài Học</strong>
                        Biết dùng câu chữ "没有" để miêu tả sự khác biệt hơn kém; làm chủ cách dùng động từ "离" biểu thị cự ly không gian/thời gian; diễn đạt thời lượng hành động với Bổ ngữ thời lượng 时量补语（1）.
                    </div>
                    <div class="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur">
                        <strong class="text-amber-200 text-sm block mb-1">📖 Trọng Tâm Ngôn Ngữ</strong>
                        14 từ vựng mới & 24 chữ Hán cấu thành; câu so sánh chữ 没有; động từ 离; bổ ngữ thời lượng 时量补语; biến điệu thanh 3 & âm cuốn lưỡi "儿".
                    </div>
                    <div class="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur">
                        <strong class="text-amber-200 text-sm block mb-1">✍️ Kỹ Năng Đạt Được</strong>
                        Tự tin giao tiếp khi đi mua sắm quần áo, gọi đồ uống trà sữa/cà phê tại quầy, tính toán cự ly đi lại (đi taxi hay đi bộ), và viết nhật ký sinh hoạt thường nhật.
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <h3 class="font-bold text-rose-950 text-base mb-4 border-l-4 border-rose-800 pl-3 font-serif">🚀 Quy trình 5 bước tự học hiệu quả chuẩn HSK Tự Học</h3>
                <ol class="list-decimal list-inside space-y-3 text-sm text-slate-700 leading-relaxed">
                    <li><b>Bước 1:</b> Luyện viết từng nét chữ Hán trên ô <b>田字格</b> và quan sát thứ tự nét tại Tab 🎬 <b>Mô phỏng nét viết</b>.</li>
                    <li><b>Bước 2:</b> Nghe phát âm chuẩn người thật và ghi nhớ ý nghĩa, ví dụ minh họa tại Tab 📖 <b>Từ vựng</b>.</li>
                    <li><b>Bước 3:</b> Hiểu sâu cấu tạo chữ qua phương pháp tượng hình và trích dẫn sách chiết tự tại Tab ✍️ <b>Tập viết & Mẹo nhớ</b>.</li>
                    <li><b>Bước 4:</b> Đọc kỹ giải thích ngữ pháp câu so sánh chữ “没有”, động từ “离” và bổ ngữ thời lượng tại Tab 💡 <b>Ngữ pháp</b>.</li>
                    <li><b>Bước 5:</b> Luyện đọc diễn cảm 4 bài khóa song ngữ Trung - Anh và hoàn thành 15 câu tự chấm tại Tab 🗣️ <b>Bài khóa</b> & 📝 <b>Luyện tập</b>.</li>
                </ol>
            </div>
        </div>"""

    # Tab 3: Vocab HTML (14 items)
    vocab_data = [
        ("huai", "坏", "huài", "Hoại", "Tính từ", "Thanh 4", "Hỏng, rách, tồi, xấu", "儿子裤子坏了，我们给他买条新的吧。", "Érzi kùzi huài le, wǒmen gěi tā mǎi tiáo xīn de ba.", "Quần của con trai bị rách rồi, chúng ta mua cho con chiếc mới nhé."),
        ("pangbian", "旁边", "pángbiān", "Bàng biên", "DT phương vị", "Thanh 2 + Thanh 1", "Bên cạnh, kế bên", "旁边那个男孩儿穿了这样的裤子。", "Pángbiān nàge nánháir chuānle zhèyàng de kùzi.", "Cậu bé bên cạnh mặc chiếc quần kiểu này đấy."),
        ("nanhair", "男孩儿", "nánháir", "Nam hài nhi", "Danh từ", "Thanh 2 + Thanh 2 + Uốn lưỡi", "Cậu bé, bé trai", "旁边那个男孩儿跑得真快。", "Pángbiān nàge nánháir pǎo de zhēn kuài.", "Cậu bé bên cạnh chạy thật là nhanh."),
        ("zheyang", "这样", "zhèyàng", "Giá dạng", "Đại từ chỉ thị", "Thanh 4 + Thanh 4", "Như thế này, thế này", "我也喜欢这样的茶杯。", "Wǒ yě xǐhuan zhèyàng de chábēi.", "Tôi cũng rất thích chiếc tách trà kiểu như thế này."),
        ("gezi", "个子", "gèzi", "Cá tử", "Danh từ", "Thanh 4 + Khinh thanh", "Vóc dáng, chiều cao", "儿子的个子没有他那么高。", "Érzi de gèzi méiyǒu tā nàme gāo.", "Chiều cao của con trai không cao bằng cậu ấy."),
        ("name", "那么", "nàme", "Na ma", "Đại từ chỉ mức độ", "Thanh 4 + Khinh thanh", "Như thế, đến thế", "今天没有昨天那么冷。", "Jīntiān méiyǒu zuótiān nàme lěng.", "Hôm nay không lạnh đến mức như hôm qua."),
        ("gao", "高", "gāo", "Cao", "Tính từ", "Thanh 1", "Cao", "妹妹有姐姐高吗？", "Mèimei yǒu jiějie gāo ma?", "Em gái có cao bằng chị gái không?"),
        ("menkou", "门口", "ménkǒu", "Môn khẩu", "Danh từ", "Thanh 2 + Thanh 3", "Cổng, cửa ra vào", "门口有家奶茶店，你想喝杯奶茶吗？", "Ménkǒu yǒu jiā nǎichádiàn, nǐ xiǎng hē bēi nǎichá ma?", "Ở cổng có một quán trà sữa, anh có muốn uống một cốc trà sữa không?"),
        ("naicha", "奶茶", "nǎichá", "Nãi trà", "Danh từ", "Thanh 3 + Thanh 2", "Trà sữa", "那你等一下，我去买杯奶茶。", "Nà nǐ děng yíxià, wǒ qù mǎi bēi nǎichá.", "Vậy anh đợi một lát, em đi mua một cốc trà sữa nhé."),
        ("kafei", "咖啡", "kāfēi", "Kha phi", "Danh từ", "Thanh 1 + Thanh 1", "Cà phê", "喝了咖啡，晚上就别想睡觉了。", "Hēle kāfēi, wǎnshang jiù bié xiǎng shuìjiào le.", "Uống cà phê vào thì buổi tối đừng hòng đi ngủ được."),
        ("li", "离", "lí", "Ly", "Động từ", "Thanh 2", "Cách, rời xa (cự ly/thời gian)", "咖啡店离这儿有点儿远。", "Kāfēidiàn lí zhèr yǒudiǎnr yuǎn.", "Quán cà phê cách nơi này hơi xa một chút."),
        ("jin", "近", "jìn", "Cận", "Tính từ", "Thanh 4", "Gần", "这里离家很近，还是走路吧。", "Zhèlǐ lí jiā hěn jìn, háishi zǒulù ba.", "Ở đây cách nhà rất gần, hay là chúng ta đi bộ nhé."),
        ("zoulu", "走路", "zǒulù", "Tẩu lộ", "Động từ ly hợp", "Thanh 3 + Thanh 4", "Đi bộ", "走半个多小时就到了。", "Zǒu bàn ge duō xiǎoshí jiù dào le.", "Đi bộ hơn nửa tiếng là tới nơi rồi."),
        ("zhou", "周", "zhōu", "Chu", "Danh từ", "Thanh 1", "Tuần, tuần lễ", "这周刘明休息，我们去了一家商店。", "Zhè zhōu Liú Míng xiūxi, wǒmen qùle yì jiā shāngdiàn.", "Tuần này Lưu Minh được nghỉ, chúng tôi đã đến một cửa hàng.")
    ]

    vocab_rows = []
    for key, hanzi, pinyin, hv, pos, tone, vi, ex_cn, ex_py, ex_vi in vocab_data:
        vocab_rows.append(f"""
            <tr class="border-b border-rose-100/60 hover:bg-rose-50/50 transition">
                <td class="py-3.5 px-3 text-center">
                    <button onclick="playAudio('{key}')" class="audio-btn bg-rose-700 text-white hover:bg-rose-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>{pinyin}</span></button>
                </td>
                <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">{hanzi}</td>
                <td class="py-3.5 px-3 font-mono text-rose-800 text-sm font-semibold">{pinyin}</td>
                <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">{hv}</td>
                <td class="py-3.5 px-3 text-xs text-rose-900 font-semibold bg-rose-100/80 rounded-lg px-2 py-0.5 inline-block my-3">{pos}</td>
                <td class="py-3.5 px-3 text-xs text-amber-800 font-mono bg-amber-50 rounded px-1.5 py-0.5">{tone}</td>
                <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">{vi}</td>
                <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed">
                    <div class="font-medium text-slate-900 zh text-sm mb-0.5">{ex_cn} <button onclick="playAudio('ex_{key}')" class="audio-btn ml-1 px-1.5 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded text-xs">🔊</button></div>
                    <div class="text-xs text-rose-800 font-mono">{ex_py}</div>
                    <div class="text-xs text-slate-500">{ex_vi}</div>
                </td>
            </tr>""")
    vocab_rows_html = "\n".join(vocab_rows)

    vocab_section = f"""
        <!-- TAB 3: TỪ VỰNG -->
        <div id="sec-vocab" class="tab-content hidden">
            <!-- Khung quy tắc biến điệu thanh điệu đầu tab -->
            <div class="bg-amber-50/90 border border-amber-200 rounded-3xl p-5 mb-6 text-xs text-amber-900 leading-relaxed shadow-sm">
                <div class="font-bold flex items-center gap-2 mb-2 text-sm text-amber-950 font-serif">
                    <span>📌 Quy Tắc Biến Điệu & Ngữ Âm Trọng Tâm Bài 9</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                        <b>1. Âm cuốn lưỡi 儿化 (Erhua):</b>
                        <p class="mt-1">Từ <code>男孩儿</code> (nánháir): Nét cuốn lưỡi "儿" đi liền sau âm tiết "hái", làm cho ngữ điệu trở nên nhẹ nhàng, gần gũi và tự nhiên như người Bắc Kinh bản ngữ.</p>
                    </div>
                    <div class="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                        <b>2. Biến điệu Nửa thanh ba (半三声):</b>
                        <p class="mt-1">Khi thanh 3 đứng trước thanh 1, 2, 4 (ví dụ <code>奶茶 nǎichá</code>: thanh 3 + thanh 2; <code>走路 zǒulù</code>: thanh 3 + thanh 4), thanh 3 chỉ đọc nửa trước (xuống giọng sâu), không lên giọng ở nửa sau.</p>
                    </div>
                    <div class="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                        <b>3. Hậu tố Khinh thanh (轻声):</b>
                        <p class="mt-1">Các từ có hậu tố như <code>个子 gèzi</code>, <code>那么 nàme</code>: Âm tiết thứ hai đọc thật ngắn, nhẹ, thả lỏng môi miệng để tạo độ mượt cho toàn bộ câu nói.</p>
                    </div>
                </div>
            </div>

            <!-- Bảng Từ Vựng Chuẩn -->
            <div class="bg-white rounded-3xl shadow-sm border border-rose-100/80 overflow-hidden">
                <div class="p-5 bg-rose-50/40 border-b border-rose-100/60 flex items-center justify-between flex-wrap gap-2">
                    <h3 class="font-bold text-rose-950 text-base font-serif">📖 Bảng 14 Từ Vựng Trọng Tâm Chuẩn SGK 《新HSK 教程 2》 Bài 9</h3>
                    <span class="text-xs text-rose-800 bg-rose-100 px-3 py-1 rounded-full font-semibold">100% Giọng Đọc Người Thật Neural</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                            <tr class="bg-rose-100/40 text-rose-950 border-b border-rose-200 text-xs uppercase tracking-wider font-bold">
                                <th class="py-3 px-3 text-center">Phát âm</th>
                                <th class="py-3 px-3">Chữ Hán</th>
                                <th class="py-3 px-3">Pinyin</th>
                                <th class="py-3 px-3">Hán Việt</th>
                                <th class="py-3 px-3">Từ loại</th>
                                <th class="py-3 px-3">Thanh điệu</th>
                                <th class="py-3 px-3">Ý nghĩa</th>
                                <th class="py-3 px-3">Ví dụ minh họa & Dịch nghĩa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vocab_rows_html}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>"""

    # Tab 4: Writing & Radicals HTML
    writing_section = f"""
        <!-- TAB 4: TẬP VIẾT & MẸO NHỚ -->
        <div id="sec-writing" class="tab-content hidden space-y-6">
            <!-- Phần 1: Bảng 7 Quy Tắc Nét Bút Cơ Bản -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <h3 class="text-lg font-bold text-rose-950 font-serif mb-4 border-l-4 border-rose-800 pl-3">Phần 1: Bảng 7 Quy Tắc Bút Thuận Chuẩn Cốt Lõi</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">1. Ngang trước sổ sau</strong>
                        <p class="text-slate-600">Nét ngang viết trước, nét sổ cắt qua viết sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">十、土、坏</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">2. Phẩy trước mác sau</strong>
                        <p class="text-slate-600">Nét phẩy sang trái trước, nét mác sang phải sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">八、人、个</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">3. Trên trước dưới sau</strong>
                        <p class="text-slate-600">Bộ phận bên trên viết trước, bên dưới sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">二、茶、高</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">4. Trái trước phải sau</strong>
                        <p class="text-slate-600">Khối cấu tạo bên trái viết trước, bên phải sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">坏、样、啡</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">5. Ngoài trước trong sau</strong>
                        <p class="text-slate-600">Khung bao bọc bên ngoài viết trước, ruột trong sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">同、周、问</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">6. Vào trước đóng sau</strong>
                        <p class="text-slate-600">Mở cổng, xếp nội dung bên trong rồi đóng đáy.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">国、回、田</span>
                    </div>
                    <div class="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <strong class="text-rose-900 block mb-1 text-sm font-serif">7. Giữa trước hai bên sau</strong>
                        <p class="text-slate-600">Nét trục giữa viết trước, hai nét cánh hai bên sau.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">小、水、山</span>
                    </div>
                    <div class="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200">
                        <strong class="text-amber-900 block mb-1 text-sm font-serif">💡 Bộ Sước (辶) viết sau</strong>
                        <p class="text-amber-800">Thành phần bên trong viết trước, bộ 辶 viết sau cùng.</p>
                        <span class="text-rose-800 font-bold block mt-2 text-sm zh">这、边、近</span>
                    </div>
                </div>
            </div>

            <!-- Phần 2: Bảng Bộ Thủ Trọng Tâm Bài 9 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <h3 class="text-lg font-bold text-rose-950 font-serif mb-4 border-l-4 border-rose-800 pl-3">Phần 2: Bảng Bộ Thủ Trọng Tâm Bài 9</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">土</span>
                        <b class="block text-slate-800 mt-1">Bộ Thổ</b>
                        <span class="text-[11px] text-slate-500">Đất đai (坏)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">方</span>
                        <b class="block text-slate-800 mt-1">Bộ Phương</b>
                        <span class="text-[11px] text-slate-500">Phương hướng (旁)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">力</span>
                        <b class="block text-slate-800 mt-1">Bộ Lực</b>
                        <span class="text-[11px] text-slate-500">Sức mạnh (男、边)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">田</span>
                        <b class="block text-slate-800 mt-1">Bộ Điền</b>
                        <span class="text-[11px] text-slate-500">Ruộng cày (男)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">子</span>
                        <b class="block text-slate-800 mt-1">Bộ Tử</b>
                        <span class="text-[11px] text-slate-500">Trẻ con (孩、子)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">木</span>
                        <b class="block text-slate-800 mt-1">Bộ Mộc</b>
                        <span class="text-[11px] text-slate-500">Cây gỗ (样、茶)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">高</span>
                        <b class="block text-slate-800 mt-1">Bộ Cao</b>
                        <span class="text-[11px] text-slate-500">Lầu các cao (高)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">门</span>
                        <b class="block text-slate-800 mt-1">Bộ Môn</b>
                        <span class="text-[11px] text-slate-500">Cánh cửa (门)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">女</span>
                        <b class="block text-slate-800 mt-1">Bộ Nữ</b>
                        <span class="text-[11px] text-slate-500">Phụ nữ (奶)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">艹</span>
                        <b class="block text-slate-800 mt-1">Bộ Thảo</b>
                        <span class="text-[11px] text-slate-500">Búp cỏ cây (茶)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">口</span>
                        <b class="block text-slate-800 mt-1">Bộ Khẩu</b>
                        <span class="text-[11px] text-slate-500">Cái miệng (口、咖、啡)</span>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span class="text-xl font-bold text-rose-800 zh">走 / 𧾷</span>
                        <b class="block text-slate-800 mt-1">Bộ Tẩu / Túc</b>
                        <span class="text-[11px] text-slate-500">Bước chân đi (走、路)</span>
                    </div>
                </div>
            </div>

            <!-- Phần 3: Thẻ Chiết Tự 4 Thành Phần Cho 100% Từ Mới -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
                    <h3 class="text-lg font-bold text-rose-950 font-serif border-l-4 border-rose-800 pl-3">Phần 3: Thẻ Chiết Tự 4 Thành Phần 100% Từ Mới (Trích Sách "Nhớ Hán Tự Chiết Tự")</h3>
                    <span class="text-xs bg-rose-100 text-rose-800 font-semibold px-3 py-1 rounded-full">Đầy đủ 14 Thẻ Toàn Diện</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <!-- Thẻ 1: 坏 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">1. 坏 (huài)</span>
                            <span class="text-rose-800 font-semibold font-mono">Hỏng, rách, tồi, xấu (Tính từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>(1) Số nét:</b> 7 nét</li>
                            <li><b>(2) Bộ thủ:</b> Bộ 土 (Thổ - Đất đai) + chữ 不 (Bất - Không, hư hại).</li>
                            <li><b>(3) 💡 Mẹo nhớ tượng hình:</b> Mảnh đất đai (土) cằn cỗi sụt lở không (不) trồng cấy được cây cối gì thì là đất xấu, hư hỏng.</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Tường đất sụp đổ, gò đất nứt toác. Mở rộng thành đồ vật hỏng hóc, áo rách nát (Hoại = hỏng: <i>衣服坏了, 坏人</i>).</li>
                            <li><b>(4) ✒️ Thuận bút:</b> 横、竖、提、横、撇、竖、点.</li>
                        </ul>
                    </div>

                    <!-- Thẻ 2: 旁边 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">2. 旁边 (pángbiān)</span>
                            <span class="text-rose-800 font-semibold font-mono">Bên cạnh (DT phương vị)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>旁 (10 nét):</b> Bộ 方 (Phương) bên dưới. Đứng thẳng nhìn ra các phương bên cạnh. (Thuận bút: 点、横、点、撇、点、横折钩、点、横、横折钩、撇).</li>
                            <li><b>边 (5 nét):</b> Bộ 辶 (Sước) + chữ 力 (Lực). Cất bước chân tới ranh giới bờ cõi. (Thuận bút: 横折钩、撇、点、横折折撇、捺).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Phía (边) ở phương hướng sát bên sườn mình (旁) chính là Bên cạnh (旁边).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Chỉ vị trí không gian ở ngay sát hai bên sườn người nói (Bàng biên: <i>学校旁边, 旁边那个人</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 3: 男孩儿 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">3. 男孩儿 (nánháir)</span>
                            <span class="text-rose-800 font-semibold font-mono">Cậu bé, bé trai (Danh từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>男 (7 nét):</b> Bộ 田 (Điền) + 力 (Lực). Dùng sức lực cày ruộng là con trai. (Thuận bút: 竖、横折、横、竖、横、横折钩、撇).</li>
                            <li><b>孩 (9 nét):</b> Bộ 子 (Tử) + 亥 (Hợi). Đứa trẻ con còn nhỏ như mầm non. (Thuận bút: 横撇/横钩、竖钩、提、点、横、撇折、撇、撇、点).</li>
                            <li><b>儿 (2 nét):</b> Bộ 儿 (Nhân đi). Đứa trẻ tập bước đi chập chững. (Thuận bút: 撇、竖弯钩).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Đứa trẻ con (孩儿) có sức lực cày ruộng (男) chính là Bé trai (男孩儿).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 4: 这样 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">4. 这样 (zhèyàng)</span>
                            <span class="text-rose-800 font-semibold font-mono">Như thế này, thế này (Đại từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>这 (7 nét):</b> Bộ 辶 (Sước) + 文 (Văn). Đi tới chiêm ngưỡng hoa văn gần ngay trước mắt. (Thuận bút: 点、横、撇、捺、点、横折折撇、捺).</li>
                            <li><b>样 (10 nét):</b> Bộ 木 (Mộc) + 羊 (Dương). Dùng gỗ đẽo tạc thành hình mẫu con dê. (Thuận bút: 横、竖、撇、点、点、撇、横、横、横、竖).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Hình dáng, kiểu mẫu (样) ở cự ly gần trước mắt này (这) chính là Như thế này (这样).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Đại từ chỉ thị phẩm chất, trạng thái ngay trước mắt (<i>这样的衣服, 这样很好</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 5: 个子 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">5. 个子 (gèzi)</span>
                            <span class="text-rose-800 font-semibold font-mono">Chiều cao, vóc dáng (Danh từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>个 (3 nét):</b> Bộ 人 (Nhân) + nét 竖. Một người đứng thẳng tắp như thân tre. (Thuận bút: 撇、捺、竖).</li>
                            <li><b>子 (3 nét):</b> Bộ 子 (Tử). Đứa trẻ sơ sinh quấn tã lót quơ tay. (Thuận bút: 横撇/横钩、竖钩、横).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Tầm vóc của một cá nhân con người (个) đứng thẳng chính là Chiều cao, vóc dáng (个子).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Dùng chỉ vóc dáng cao thấp của con người (<i>个子不高, 高个子</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 6: 那么 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">6. 那么 (nàme)</span>
                            <span class="text-rose-800 font-semibold font-mono">Như thế, đến thế (Đại từ mức độ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>那 (6 nét):</b> Bộ 阝(Ấp) + chữ 二. Vùng đất xa xôi nơi phía kia. (Thuận bút: 横折钩、横、横、撇、横撇弯钩、竖).</li>
                            <li><b>么 (3 nét):</b> Bộ 丿(Phiệt) + 厶 (Khư). Một sợi tơ nhỏ uốn lượn. (Thuận bút: 撇、撇折、点).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Mức độ (么) đạt tới tầm xa tít phía kia (那) chính là Như thế đó, đến thế (那么).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Đứng trước tính từ trong câu chữ 没有 biểu đạt mức độ cao (<i>没有他那么高</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 7: 高 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">7. 高 (gāo)</span>
                            <span class="text-rose-800 font-semibold font-mono">Cao (Tính từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>(1) Số nét:</b> 10 nét</li>
                            <li><b>(2) Bộ thủ:</b> Bộ 高 (Cao - Lâu đài cao, tháp chuông).</li>
                            <li><b>(3) 💡 Mẹo nhớ tượng hình:</b> Ngôi lầu các nhiều tầng cao vút, trên có mái che (亠), giữa có vọng lâu (口), dưới có cổng lớn (冂+口).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Tượng hình kiến trúc tháp đài cao thời cổ. Nghĩa gốc là cao lớn, vượt bậc (Cao: <i>很高, 高山, 高个子</i>).</li>
                            <li><b>(4) ✒️ Thuận bút:</b> 点、横、竖、横折、横、点、横、竖、横折、横.</li>
                        </ul>
                    </div>

                    <!-- Thẻ 8: 门口 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">8. 门口 (ménkǒu)</span>
                            <span class="text-rose-800 font-semibold font-mono">Cổng, cửa ra vào (Danh từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>门 (3 nét):</b> Bộ 门 (Môn). Hai cánh cửa nhà cổ khép mở. (Thuận bút: 点、竖、横折钩).</li>
                            <li><b>口 (3 nét):</b> Bộ 口 (Khẩu). Cái miệng hoặc lối vào mở rộng. (Thuận bút: 竖、横折、横).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Nơi cánh cửa (门) mở ra lối vào (口) chính là Cổng, cửa ra vào (门口).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Chỉ địa điểm trước cửa nhà, trước cổng công ty, quán xá (<i>学校门口, 商店门口</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 9: 奶茶 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">9. 奶茶 (nǎichá)</span>
                            <span class="text-rose-800 font-semibold font-mono">Trà sữa (Danh từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>奶 (5 nét):</b> Bộ 女 (Nữ) + 乃 (Nãi). Người mẹ hiền từ uốn mình cho con bú dòng sữa mát. (Thuận bút: 撇点、撇、横、横撇弯钩、撇).</li>
                            <li><b>茶 (9 nét):</b> Bộ 艹 (Thảo) + 人 (Nhân) + 木 (Mộc). Con người thu hái búp lá thảo mộc trên thân cây gỗ về pha nước trà thanh tao. (Thuận bút: 横、竖、竖、撇、捺、横、竖钩、撇、点).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Vị béo ngậy của sữa tươi (奶) hòa quyện hương thơm búp trà (茶) tạo thành món Trà sữa (奶茶).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 10: 咖啡 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">10. 咖啡 (kāfēi)</span>
                            <span class="text-rose-800 font-semibold font-mono">Cà phê (Danh từ phiên âm)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>咖 (8 nét):</b> Bộ 口 (Khẩu) + 加 (Gia). Nhấp ngụm thức uống tăng thêm sinh lực tỉnh táo. (Thuận bút: 竖、横折、横、横折钩、撇、竖、横折、横).</li>
                            <li><b>啡 (11 nét):</b> Bộ 口 (Khẩu) + 非 (Phi). Thức uống đưa vào miệng có hương vị phi phàm. (Thuận bút: 竖、横折、横、竖、竖、横、横、横、竖、竖、横、横、横).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Cả hai chữ đều có bộ Khẩu 口 nếm thức uống sóng sánh thơm lừng chính là Cà phê (咖啡).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 11: 离 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">11. 离 (lí)</span>
                            <span class="text-rose-800 font-semibold font-mono">Cách, rời xa (Động từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>(1) Số nét:</b> 10 nét</li>
                            <li><b>(2) Bộ thủ:</b> Bộ 亠 (Đầu) + bộ 凶 + bộ 禸 (Nhựu - Đuôi chim muông).</li>
                            <li><b>(3) 💡 Mẹo nhớ tượng hình:</b> Chú chim nhỏ vỗ cánh bay thoát khỏi chiếc lưới giăng để rời xa về phương trời tự do.</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Chỉ cự ly không gian hoặc khoảng cách thời gian giữa hai mốc (Ly = cách: <i>离家很近, 离这儿有点儿远</i>).</li>
                            <li><b>(4) ✒️ Thuận bút:</b> 点、横、撇折、点、竖、横折钩、竖、提、撇、竖弯钩.</li>
                        </ul>
                    </div>

                    <!-- Thẻ 12: 近 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">12. 近 (jìn)</span>
                            <span class="text-rose-800 font-semibold font-mono">Gần (Tính từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>(1) Số nét:</b> 7 nét</li>
                            <li><b>(2) Bộ thủ:</b> Bộ 辶 (Sước - Bước chân đi lại) + chữ 斤 (Cân - Chiếc rìu).</li>
                            <li><b>(3) 💡 Mẹo nhớ tượng hình:</b> Cất bước chân (辶) chỉ trong gang tấc cầm chiếc rìu (斤) là tới ngay trước mặt, rất đỗi gần gũi.</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Chỉ khoảng cách không gian ngắn, trái nghĩa với xa 远 (Cận = gần: <i>很近, 离家近, 最近</i>).</li>
                            <li><b>(4) ✒️ Thuận bút:</b> 撇、撇、横、竖、点、横折折撇、捺.</li>
                        </ul>
                    </div>

                    <!-- Thẻ 13: 走路 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">13. 走路 (zǒulù)</span>
                            <span class="text-rose-800 font-semibold font-mono">Đi bộ (Động từ ly hợp)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>走 (7 nét):</b> Bộ 走 (Tẩu). Chân vung bước trên mặt đất (土) thoăn thoắt. (Thuận bút: 横、竖、横、竖、横、撇、捺).</li>
                            <li><b>路 (13 nét):</b> Bộ 𧾷 (Túc) + chữ 各 (Các). Bước chân của muôn người dẫm mòn thành lối đi. (Thuận bút: 竖、横折、横、竖、横、竖、提、撇、横撇/横钩、捺、竖、横折、横).</li>
                            <li><b>💡 Mẹo nhớ từ ghép:</b> Cất bước chân (走) thong thả dạo trên con đường (路) chính là Đi bộ (走路).</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Động từ ly hợp miêu tả phương thức di chuyển bằng đôi chân (<i>走路去上班, 走路回家</i>).</li>
                        </ul>
                    </div>

                    <!-- Thẻ 14: 周 -->
                    <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 space-y-2">
                        <div class="flex items-center justify-between border-b border-rose-200/60 pb-2">
                            <span class="text-xl font-bold text-rose-950 zh">14. 周 (zhōu)</span>
                            <span class="text-rose-800 font-semibold font-mono">Tuần lễ, chu kỳ (Danh từ)</span>
                        </div>
                        <ul class="space-y-1.5 text-slate-700 leading-relaxed">
                            <li><b>(1) Số nét:</b> 8 nét</li>
                            <li><b>(2) Bộ thủ:</b> Bộ 口 (Khẩu) nằm trong khung bao bọc 冂.</li>
                            <li><b>(3) 💡 Mẹo nhớ tượng hình:</b> Một chu kỳ tuần hoàn khép kín trọn vẹn quay vòng 7 ngày trong tuần.</li>
                            <li><b>📚 Sách Nhớ Hán Tự Chiết Tự:</b> Ruộng chia ô vuông vức cẩn mật. Sau chuyển nghĩa thành chu kỳ tuần hoàn, một tuần lễ (Chu = tuần: <i>这周, 下周, 周末</i>).</li>
                            <li><b>(4) ✒️ Thuận bút:</b> 撇、横折钩、横、竖、竖、横折、横.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>"""

    # Tab 5: Grammar HTML
    grammar_section = f"""
        <!-- TAB 5: NGỮ PHÁP -->
        <div id="sec-grammar" class="tab-content hidden space-y-6">
            <!-- Điểm 1: Câu so sánh chữ 没有 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center gap-2 mb-3">
                    <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">Điểm 1</span>
                    <h3 class="font-bold text-rose-950 text-base font-serif">1. 比较句（3）: Câu so sánh dùng “没有” (Không bằng, chưa bằng)</h3>
                </div>
                <div class="text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed">
                    <p>Trong tiếng Hán, <b>没有 (méiyǒu)</b> được dùng trong câu so sánh để biểu thị ý nghĩa <i>“không bằng”</i> hoặc <i>“kém hơn”</i> (phủ định của so sánh bằng). Trước tính từ có thể thêm <b>这么 (zhème)</b> hoặc <b>那么 (nàme)</b> để nhấn mạnh mức độ cao của đối tượng B.</p>
                    
                    <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80 space-y-2 font-mono text-xs">
                        <div class="font-bold text-rose-950">📌 Công thức cơ bản:</div>
                        <div class="text-rose-800 font-semibold text-sm">[Chủ ngữ A] + 没有 + [Đối tượng B] + (这么 / 那么) + [Tính từ / Cụm tính từ]</div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">儿子的个子没有他那么高。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Érzi de gèzi méiyǒu tā nàme gāo.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Chiều cao của con trai không cao bằng cậu ấy.</span>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">昨天没有今天这么冷。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Zuótiān méiyǒu jīntiān zhème lěng.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Hôm qua không lạnh đến mức như hôm nay.</span>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">这块手表没有那块好看。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Zhè kuài shǒubiǎo méiyǒu nà kuài hǎokàn.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Chiếc đồng hồ này không đẹp bằng chiếc kia.</span>
                        </div>
                    </div>

                    <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 mt-3">
                        <b>💡 Mở rộng dạng nghi vấn với chữ “有”:</b> Dạng khẳng định của 没有 trong so sánh là <b>有</b>, thường dùng trong câu hỏi so sánh:
                        <br>• <i>妹妹有姐姐高吗？</i> (Em gái có cao bằng chị gái không?)
                        <br>• <i>那件衣服有这件好看吗？</i> (Chiếc áo kia có đẹp bằng chiếc này không?)
                    </div>
                </div>
            </div>

            <!-- Điểm 2: Động từ 离 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center gap-2 mb-3">
                    <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">Điểm 2</span>
                    <h3 class="font-bold text-rose-950 text-base font-serif">2. 动词“离”: Động từ “离” biểu thị cự ly không gian & khoảng cách thời gian</h3>
                </div>
                <div class="text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed">
                    <p>Động từ <b>离 (lí)</b> dùng để diễn tả khoảng cách cự ly giữa hai địa điểm hoặc khoảng cách thời gian tính từ hiện tại tới một mốc sự kiện trong tương lai.</p>
                    
                    <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80 space-y-2 font-mono text-xs">
                        <div class="font-bold text-rose-950">📌 Cấu trúc cơ bản:</div>
                        <div class="text-rose-800 font-semibold text-sm">[Địa điểm A] + 离 + [Địa điểm B] + [近 / 远 / Khoảng cách / 有点儿远]</div>
                        <div class="text-rose-800 font-semibold text-sm">[Mốc thời gian A] + 离 + [Mốc thời gian B] + 还有 + [Thời gian]</div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">咖啡店离这儿有点儿远。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Kāfēidiàn lí zhèr yǒudiǎnr yuǎn.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Quán cà phê cách nơi này hơi xa một chút.</span>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">这里离家很近，还是走路吧。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Zhèlǐ lí jiā hěn jìn, háishi zǒulù ba.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Ở đây cách nhà rất gần, hay là đi bộ nhé.</span>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-1 zh">现在离我的生日还有三天。</span>
                            <span class="text-rose-800 font-mono block text-[11px]">Xiànzài lí wǒ de shēngrì hái yǒu sān tiān.</span>
                            <span class="text-slate-500 block text-[11px] mt-1">Bây giờ cách ngày sinh nhật của tôi còn 3 ngày.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Điểm 3: Bổ ngữ thời lượng -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center gap-2 mb-3">
                    <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">Điểm 3</span>
                    <h3 class="font-bold text-rose-950 text-base font-serif">3. 时量补语（1）: Bổ ngữ thời lượng diễn tả thời gian duy trì của hành động</h3>
                </div>
                <div class="text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed">
                    <p>Các từ ngữ chỉ khoảng thời gian (như <i>十分钟, 半个小时, 一个下午, 两年</i>) đặt sau động từ làm <b>Bổ ngữ thời lượng (时量补语)</b> để nói rõ động tác hoặc trạng thái kéo dài trong bao lâu.</p>
                    
                    <div class="space-y-3 text-xs">
                        <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80 font-mono">
                            <b class="text-rose-950 block mb-1 font-serif">Trường hợp 1: Động từ không mang tân ngữ hoặc tân ngữ là sự vật</b>
                            <span class="text-rose-800 font-bold block mb-1">[Chủ ngữ] + [Động từ] + [Thời lượng] + (Tân ngữ)</span>
                            <span class="text-slate-600">Ví dụ: 走半个多小时就到了 (Đi hơn nửa tiếng là tới); 我们休息十分钟 (Chúng ta nghỉ ngơi 10 phút); 我看了一个晚上电视 (Tôi xem tivi suốt cả buổi tối).</span>
                        </div>

                        <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80 font-mono">
                            <b class="text-rose-950 block mb-1 font-serif">Trường hợp 2: Lặp lại động từ khi có tân ngữ</b>
                            <span class="text-rose-800 font-bold block mb-1">[Chủ ngữ] + [Động từ] + [Tân ngữ] + [Động từ] + (了) + [Thời lượng]</span>
                            <span class="text-slate-600">Ví dụ: 他们学中文学了两年 (Họ học tiếng Trung được hai năm rồi); 李文等她等了一个小时 (Lý Văn đợi cô ấy một tiếng đồng hồ).</span>
                        </div>

                        <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80 font-mono">
                            <b class="text-rose-950 block mb-1 font-serif">Trường hợp 3: Động từ ly hợp (跑步, 游泳...)</b>
                            <span class="text-rose-800 font-bold block mb-1">[Động từ] + [Danh từ] + [Động từ] + [Thời lượng]</span>
                            <span class="text-slate-600">Ví dụ: 陈天中跑步跑了两个小时 (Trần Thiên Trung chạy bộ suốt hai tiếng đồng hồ).</span>
                        </div>

                        <div class="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 font-mono text-amber-900">
                            <b class="text-amber-950 block mb-1 font-serif">Trường hợp 4: Cấu trúc "...了...了" (Hành động vẫn đang tiếp diễn)</b>
                            <span class="text-rose-800 font-bold block mb-1">[Động từ] + 了 + [Thời lượng] + 了</span>
                            <span class="text-amber-800">Ví dụ: 他写了半个小时汉字了 (Anh ấy đã viết chữ Hán được nửa tiếng rồi — và hiện tại vẫn đang tiếp tục viết).</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>"""

    # Tab 6: Text HTML (4 Texts, 2 columns layout, English translations, multi-speaker audio)
    text_section = f"""
        <!-- TAB 6: BÀI KHÓA -->
        <div id="sec-text" class="tab-content hidden space-y-6">
            <!-- Bài khóa 1 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2 border-b border-rose-100/60 pb-3">
                    <div>
                        <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">课文 1</span>
                        <h3 class="font-bold text-rose-950 text-base font-serif inline ml-2">在商店，王一雪和刘明在看裤子</h3>
                        <p class="text-xs text-slate-500 mt-1 italic">In the store, Wang Yixue and Liu Ming were looking at pants.</p>
                    </div>
                    <button onclick="playAudio('text1')" class="audio-btn bg-gradient-to-r from-rose-700 to-rose-800 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:from-rose-800 hover:to-rose-900 transition">
                        <span>▶ Nghe Bài Khóa 1 (Vương Nhất Tuyết & Lưu Minh)</span>
                    </button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    <div class="lg:col-span-3 space-y-3.5 text-xs md:text-sm">
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">儿子裤子坏了，我们给他买条新的吧。</p>
                            <p class="text-xs font-mono text-rose-800">Érzi kùzi huài le, wǒmen gěi tā mǎi tiáo xīn de ba.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Our son's pants are torn. Let's buy him a new pair.</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">好啊。</p>
                            <p class="text-xs font-mono text-rose-800">Hǎo a.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Okay.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">你看这条黑色的怎么样？</p>
                            <p class="text-xs font-mono text-rose-800">Nǐ kàn zhè tiáo hēisè de zěnmeyàng?</p>
                            <p class="text-xs text-slate-500 mt-0.5">How about this pair of black ones?</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">没有你上次买的那条好看。</p>
                            <p class="text-xs font-mono text-rose-800">Méiyǒu nǐ shàng cì mǎi de nà tiáo hǎokàn.</p>
                            <p class="text-xs text-slate-500 mt-0.5">They're not as nice as the ones you bought last time.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">旁边那个男孩儿就穿了这样的裤子，我觉得很好看啊！</p>
                            <p class="text-xs font-mono text-rose-800">Pángbiān nàge nánháir jiù chuānle zhèyàng de kùzi, wǒ juéde hěn hǎokàn a!</p>
                            <p class="text-xs text-slate-500 mt-0.5">The boy next to us is wearing pants like these, and I think they look great!</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">儿子的个子没有他那么高，穿上就不会太好看。</p>
                            <p class="text-xs font-mono text-rose-800">Érzi de gèzi méiyǒu tā nàme gāo, chuānshang jiù bú huì tài hǎokàn.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Our son isn't as tall as him, so they wouldn't look so good on him.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">好吧，我们再去那边看看。</p>
                            <p class="text-xs font-mono text-rose-800">Hǎo ba, wǒmen zài qù nàbian kànkan.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Alright, let's go over there and take another look.</p>
                        </div>
                    </div>
                    <div class="lg:col-span-2">
                        <img src="images/text1.jpg" alt="Tranh minh họa Bài khóa 1" class="rounded-3xl shadow-sm border border-rose-100 w-full object-cover max-h-96">
                    </div>
                </div>
            </div>

            <!-- Bài khóa 2 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2 border-b border-rose-100/60 pb-3">
                    <div>
                        <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">课文 2</span>
                        <h3 class="font-bold text-rose-950 text-base font-serif inline ml-2">在商店门口，王一雪和刘明往外走</h3>
                        <p class="text-xs text-slate-500 mt-1 italic">At the entrance of the store, Wang Yixue and Liu Ming were walking out.</p>
                    </div>
                    <button onclick="playAudio('text2')" class="audio-btn bg-gradient-to-r from-rose-700 to-rose-800 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:from-rose-800 hover:to-rose-900 transition">
                        <span>▶ Nghe Bài Khóa 2 (Trà Sữa & Cà Phê)</span>
                    </button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    <div class="lg:col-span-3 space-y-3.5 text-xs md:text-sm">
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">门口有家奶茶店。你想喝杯奶茶吗？</p>
                            <p class="text-xs font-mono text-rose-800">Ménkǒu yǒu jiā nǎichádiàn. Nǐ xiǎng hē bēi nǎichá ma?</p>
                            <p class="text-xs text-slate-500 mt-0.5">There's a bubble tea shop at the entrance. Do you want a cup of bubble tea?</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">我想喝咖啡，还是去咖啡店吧。</p>
                            <p class="text-xs font-mono text-rose-800">Wǒ xiǎng hē kāfēi, háishi qù kāfēidiàn ba.</p>
                            <p class="text-xs text-slate-500 mt-0.5">I'd prefer coffee. Let's go to a coffee shop.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">咖啡店离这儿有点儿远。</p>
                            <p class="text-xs font-mono text-rose-800">Kāfēidiàn lí zhèr yǒudiǎnr yuǎn.</p>
                            <p class="text-xs text-slate-500 mt-0.5">The coffee shop is a bit far from here.</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">没关系，那家店的咖啡很好喝。</p>
                            <p class="text-xs font-mono text-rose-800">Méi guānxi, nà jiā diàn de kāfēi hěn hǎohē.</p>
                            <p class="text-xs text-slate-500 mt-0.5">That's fine. The coffee in that shop is very good.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">那你等一下，我去买杯奶茶。</p>
                            <p class="text-xs font-mono text-rose-800">Nà nǐ děng yíxià, wǒ qù mǎi bēi nǎichá.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Then wait here for a moment while I go and buy a cup of bubble tea.</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">你不想喝咖啡吗？</p>
                            <p class="text-xs font-mono text-rose-800">Nǐ bù xiǎng hē kāfēi ma?</p>
                            <p class="text-xs text-slate-500 mt-0.5">Don't you want to drink coffee?</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">喝了咖啡，晚上就别想睡觉了。</p>
                            <p class="text-xs font-mono text-rose-800">Hēle kāfēi, wǎnshang jiù bié xiǎng shuìjiào le.</p>
                            <p class="text-xs text-slate-500 mt-0.5">I can't fall asleep if I drink coffee.</p>
                        </div>
                    </div>
                    <div class="lg:col-span-2">
                        <img src="images/text2.jpg" alt="Tranh minh họa Bài khóa 2" class="rounded-3xl shadow-sm border border-rose-100 w-full object-cover max-h-96">
                    </div>
                </div>
            </div>

            <!-- Bài khóa 3 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2 border-b border-rose-100/60 pb-3">
                    <div>
                        <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">课文 3</span>
                        <h3 class="font-bold text-rose-950 text-base font-serif inline ml-2">在咖啡店门口，王一雪和刘明在聊天儿</h3>
                        <p class="text-xs text-slate-500 mt-1 italic">At the entrance of a coffee shop, Wang Yixue and Liu Ming were chatting.</p>
                    </div>
                    <button onclick="playAudio('text3')" class="audio-btn bg-gradient-to-r from-rose-700 to-rose-800 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:from-rose-800 hover:to-rose-900 transition">
                        <span>▶ Nghe Bài Khóa 3 (Đi Bộ Hay Đi Taxi)</span>
                    </button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    <div class="lg:col-span-3 space-y-3.5 text-xs md:text-sm">
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">我们打车回去吧。</p>
                            <p class="text-xs font-mono text-rose-800">Wǒmen dǎchē huíqù ba.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Let's take a taxi home.</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">这里离家很近，还是走路吧。</p>
                            <p class="text-xs font-mono text-rose-800">Zhèlǐ lí jiā hěn jìn, háishi zǒulù ba.</p>
                            <p class="text-xs text-slate-500 mt-0.5">It's close to home. Let's walk.</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">要走多长时间？</p>
                            <p class="text-xs font-mono text-rose-800">Yào zǒu duō cháng shíjiān?</p>
                            <p class="text-xs text-slate-500 mt-0.5">How long will it take?</p>
                        </div>
                        <div class="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100">
                            <span class="font-bold text-rose-900 block mb-0.5">王一雪:</span>
                            <p class="font-medium text-slate-900 zh text-base">走半个多小时就到了。</p>
                            <p class="text-xs font-mono text-rose-800">Zǒu bàn ge duō xiǎoshí jiù dào le.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Walking will take a little more than half an hour.</p>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="font-bold text-slate-800 block mb-0.5">刘明:</span>
                            <p class="font-medium text-slate-900 zh text-base">好的。每天上下班都坐车，今天运动运动吧。</p>
                            <p class="text-xs font-mono text-rose-800">Hǎo de. Měi tiān shàng xià bān dōu zuò chē, jīntiān yùndòng yùndòng ba.</p>
                            <p class="text-xs text-slate-500 mt-0.5">Alright. I take the car to and from work every day, so I'll get some exercise today.</p>
                        </div>
                    </div>
                    <div class="lg:col-span-2">
                        <img src="images/text3.jpg" alt="Tranh minh họa Bài khóa 3" class="rounded-3xl shadow-sm border border-rose-100 w-full object-cover max-h-96">
                    </div>
                </div>
            </div>

            <!-- Bài khóa 4 -->
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2 border-b border-rose-100/60 pb-3">
                    <div>
                        <span class="px-2.5 py-1 bg-rose-800 text-white rounded-lg text-xs font-bold font-serif">课文 4</span>
                        <h3 class="font-bold text-rose-950 text-base font-serif inline ml-2">在房间，王一雪在写日记</h3>
                        <p class="text-xs text-slate-500 mt-1 italic">In the room, Wang Yixue was writing in her diary.</p>
                    </div>
                    <button onclick="playAudio('text4')" class="audio-btn bg-gradient-to-r from-rose-700 to-rose-800 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:from-rose-800 hover:to-rose-900 transition">
                        <span>▶ Nghe Nhật Ký Bài Khóa 4 (Vương Nhất Tuyết)</span>
                    </button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    <div class="lg:col-span-3 space-y-4 text-xs md:text-sm">
                        <div class="p-5 bg-rose-50/40 rounded-2xl border border-rose-100 leading-relaxed">
                            <span class="font-bold text-rose-900 block mb-2 font-serif text-sm">王一雪的日记 (Nhật Ký Vương Nhất Tuyết):</span>
                            <p class="font-medium text-slate-900 zh text-base leading-loose">这周刘明休息，我下班后跟他去了一家商店。商店里边衣服没有大商场里好看。我们没有买到喜欢的衣服，从商店出来就到咖啡店坐了坐。因为想运动运动，所以喝完东西，我们就走回家了。</p>
                            <p class="text-xs font-mono text-rose-800 mt-3 leading-relaxed">Zhè zhōu Liú Míng xiūxi, wǒ xiàbān hòu gēn tā qùle yì jiā shāngdiàn. Shāngdiàn lǐbian yīfu méiyǒu dà shāngchǎng lǐ hǎokàn. Wǒmen méiyǒu mǎidào xǐhuan de yīfu, cóng shāngdiàn chūlai jiù dào kāfēidiàn zuòlezuò. Yīnwèi xiǎng yùndòng yùndòng, suǒyǐ hēwán dōngxi, wǒmen jiù zǒuhuí jiā le.</p>
                            <p class="text-xs text-slate-500 mt-2 leading-relaxed">Liu Ming has the whole week off, so I went to a store with him after work. The clothes in the store weren't as nice as those in big shopping malls. We didn't find any clothes we liked, so after leaving the store, we went to a coffee shop to sit for a while. Since we wanted to get some exercise, we walked home after finishing our drinks.</p>
                        </div>
                    </div>
                    <div class="lg:col-span-2">
                        <img src="images/text4.jpg" alt="Tranh minh họa Bài khóa 4" class="rounded-3xl shadow-sm border border-rose-100 w-full object-cover max-h-96">
                    </div>
                </div>
            </div>
        </div>"""

    # Tab 7: Practice HTML (15 questions + Part 4 AI Grading)
    practice_section = f"""
        <!-- TAB 7: LUYỆN TẬP -->
        <div id="sec-practice" class="tab-content hidden">
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80 mb-6">
                <h2 class="text-xl font-bold text-rose-950 font-serif mb-6 border-l-4 border-rose-800 pl-3">📝 Bài Tập Tự Đánh Giá 15 Câu Tương Tác HSK 2 Bài 9</h2>

                <!-- Phần 1: Điền từ vào chỗ trống -->
                <div class="mb-8">
                    <h3 class="font-bold text-rose-950 text-base mb-3 border-l-4 border-rose-800 pl-3 font-serif">Phần 1: Chọn từ thích hợp điền vào chỗ trống (Từ vựng chuẩn SGK trang 81)</h3>
                    <div class="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 text-xs text-rose-900 mb-4 font-mono">
                        Từ gợi ý: A. 旁边 (pángbiān) | B. 走路 (zǒulù) | C. 那么 (nàme) | D. 个子 (gèzi) | E. 这样 (zhèyàng)
                    </div>
                    <div class="space-y-4 text-xs">
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">1. 你女儿十多岁，____ 这么高啊！</p>
                            <input type="text" id="q1" class="border rounded px-2.5 py-1 w-24 text-center uppercase font-bold text-rose-900 border-rose-300" placeholder="A/B/C/D/E">
                            <button onclick="checkQ('q1', 'D')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q1" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">2. 咖啡店不远，我们是 ____ 过去的。</p>
                            <input type="text" id="q2" class="border rounded px-2.5 py-1 w-24 text-center uppercase font-bold text-rose-900 border-rose-300" placeholder="A/B/C/D/E">
                            <button onclick="checkQ('q2', 'B')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q2" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">3. 我们住的酒店 ____ 有个公交站，那儿有到火车站的公交车。</p>
                            <input type="text" id="q3" class="border rounded px-2.5 py-1 w-24 text-center uppercase font-bold text-rose-900 border-rose-300" placeholder="A/B/C/D/E">
                            <button onclick="checkQ('q3', 'A')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q3" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">4. A: 我也喜欢 ____ 的茶杯，你是在哪儿买的？ B: 我是在公司门口那家商店买的。</p>
                            <input type="text" id="q4" class="border rounded px-2.5 py-1 w-24 text-center uppercase font-bold text-rose-900 border-rose-300" placeholder="A/B/C/D/E">
                            <button onclick="checkQ('q4', 'E')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q4" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">5. A: 虽然今天的工作也不少，但是我觉得没有昨天 ____ 累。 B: 那我们出去走一走吧。</p>
                            <input type="text" id="q5" class="border rounded px-2.5 py-1 w-24 text-center uppercase font-bold text-rose-900 border-rose-300" placeholder="A/B/C/D/E">
                            <button onclick="checkQ('q5', 'C')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q5" class="ml-2 font-bold"></span>
                        </div>
                    </div>
                </div>

                <!-- Phần 2: Trắc nghiệm ngữ pháp -->
                <div class="mb-8">
                    <h3 class="font-bold text-rose-950 text-base mb-3 border-l-4 border-rose-800 pl-3 font-serif">Phần 2: Trắc nghiệm Ngữ pháp Chọn A, B hoặc C</h3>
                    <div class="space-y-4 text-xs">
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">6. Câu nào sau đây sử dụng câu so sánh chữ “没有” đúng ngữ pháp?</p>
                            <div class="space-y-1 text-slate-600 pl-2">
                                <label class="block"><input type="radio" name="q6" value="A" class="mr-2">A. 昨天没有今天很冷。</label>
                                <label class="block"><input type="radio" name="q6" value="B" class="mr-2">B. 儿子的个子没有他那么高。</label>
                                <label class="block"><input type="radio" name="q6" value="C" class="mr-2">C. 这块手表没有那块非常好看。</label>
                            </div>
                            <button onclick="checkRadio('q6', 'B')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q6" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">7. Chọn câu dùng đúng cấu trúc của động từ “离” biểu thị cự ly:</p>
                            <div class="space-y-1 text-slate-600 pl-2">
                                <label class="block"><input type="radio" name="q7" value="A" class="mr-2">A. 咖啡店离这儿有点儿远。</label>
                                <label class="block"><input type="radio" name="q7" value="B" class="mr-2">B. 咖啡店从这儿有点儿远。</label>
                                <label class="block"><input type="radio" name="q7" value="C" class="mr-2">C. 离咖啡店这儿有点儿远。</label>
                            </div>
                            <button onclick="checkRadio('q7', 'A')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q7" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">8. Câu nào diễn tả đúng Bổ ngữ thời lượng cho động từ mang tân ngữ lặp lại?</p>
                            <div class="space-y-1 text-slate-600 pl-2">
                                <label class="block"><input type="radio" name="q8" value="A" class="mr-2">A. 他们学中文了两年。</label>
                                <label class="block"><input type="radio" name="q8" value="B" class="mr-2">B. 他们学中文学了两年。</label>
                                <label class="block"><input type="radio" name="q8" value="C" class="mr-2">C. 他们两年学中文学了。</label>
                            </div>
                            <button onclick="checkRadio('q8', 'B')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q8" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">9. “他写了半个小时汉字了” mang hàm ý gì?</p>
                            <div class="space-y-1 text-slate-600 pl-2">
                                <label class="block"><input type="radio" name="q9" value="A" class="mr-2">A. Anh ấy đã viết xong chữ Hán và hiện đã đi nghỉ.</label>
                                <label class="block"><input type="radio" name="q9" value="B" class="mr-2">B. Anh ấy đã viết được nửa tiếng và hiện tại vẫn đang tiếp tục viết.</label>
                                <label class="block"><input type="radio" name="q9" value="C" class="mr-2">C. Anh ấy dự định sẽ viết chữ Hán trong nửa tiếng nữa.</label>
                            </div>
                            <button onclick="checkRadio('q9', 'B')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q9" class="ml-2 font-bold"></span>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">10. Động từ ly hợp “跑步” khi đi với bổ ngữ thời lượng 2 tiếng được viết chuẩn là:</p>
                            <div class="space-y-1 text-slate-600 pl-2">
                                <label class="block"><input type="radio" name="q10" value="A" class="mr-2">A. 陈天中跑步两个小时了。</label>
                                <label class="block"><input type="radio" name="q10" value="B" class="mr-2">B. 陈天中跑两个小时步了。</label>
                                <label class="block"><input type="radio" name="q10" value="C" class="mr-2">C. 陈天中跑步跑了两个小时。</label>
                            </div>
                            <button onclick="checkRadio('q10', 'C')" class="px-3.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold text-xs shadow-xs transition">Kiểm tra</button>
                            <span id="res-q10" class="ml-2 font-bold"></span>
                        </div>
                    </div>
                </div>

                <!-- Phần 3: Sắp xếp câu hoàn chỉnh -->
                <div class="mb-8">
                    <h3 class="font-bold text-rose-950 text-base mb-3 border-l-4 border-rose-800 pl-3 font-serif">Phần 3: Sắp xếp các từ thành câu hoàn chỉnh (Đáp án ẩn trong thẻ details)</h3>
                    <div class="space-y-4 text-xs">
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">11. 坏了 / 儿子 / 裤子 / 买条 / 新的 / 我们 / 给 / 他 / 吧</p>
                            <details class="mt-2 bg-white p-3 rounded-xl border border-rose-200">
                                <summary class="font-bold text-rose-800 cursor-pointer select-none">Xem đáp án chuẩn</summary>
                                <div class="mt-2 text-slate-800 pl-2">
                                    <p class="font-semibold text-slate-900 zh text-sm">儿子裤子坏了，我们给他买条新的吧。</p>
                                    <p class="text-xs font-mono text-rose-800">Érzi kùzi huài le, wǒmen gěi tā mǎi tiáo xīn de ba.</p>
                                    <p class="text-xs text-slate-500">Quần của con trai bị rách rồi, chúng ta mua cho con một chiếc mới nhé.</p>
                                </div>
                            </details>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">12. 离 / 咖啡店 / 这儿 / 有点儿 / 远</p>
                            <details class="mt-2 bg-white p-3 rounded-xl border border-rose-200">
                                <summary class="font-bold text-rose-800 cursor-pointer select-none">Xem đáp án chuẩn</summary>
                                <div class="mt-2 text-slate-800 pl-2">
                                    <p class="font-semibold text-slate-900 zh text-sm">咖啡店离这儿有点儿远。</p>
                                    <p class="text-xs font-mono text-rose-800">Kāfēidiàn lí zhèr yǒudiǎnr yuǎn.</p>
                                    <p class="text-xs text-slate-500">Quán cà phê cách nơi này hơi xa một chút.</p>
                                </div>
                            </details>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">13. 儿子的个子 / 没有 / 他 / 那么 / 高</p>
                            <details class="mt-2 bg-white p-3 rounded-xl border border-rose-200">
                                <summary class="font-bold text-rose-800 cursor-pointer select-none">Xem đáp án chuẩn</summary>
                                <div class="mt-2 text-slate-800 pl-2">
                                    <p class="font-semibold text-slate-900 zh text-sm">儿子的个子没有他那么高。</p>
                                    <p class="text-xs font-mono text-rose-800">Érzi de gèzi méiyǒu tā nàme gāo.</p>
                                    <p class="text-xs text-slate-500">Chiều cao của con trai không cao bằng cậu ấy.</p>
                                </div>
                            </details>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">14. 走 / 半个多小时 / 就 / 到了</p>
                            <details class="mt-2 bg-white p-3 rounded-xl border border-rose-200">
                                <summary class="font-bold text-rose-800 cursor-pointer select-none">Xem đáp án chuẩn</summary>
                                <div class="mt-2 text-slate-800 pl-2">
                                    <p class="font-semibold text-slate-900 zh text-sm">走半个多小时就到了。</p>
                                    <p class="text-xs font-mono text-rose-800">Zǒu bàn ge duō xiǎoshí jiù dào le.</p>
                                    <p class="text-xs text-slate-500">Đi bộ hơn nửa tiếng là tới nơi rồi.</p>
                                </div>
                            </details>
                        </div>
                        <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                            <p class="font-medium text-slate-800 text-sm">15. 商店里边 / 衣服 / 没有 / 大商场里 / 好看</p>
                            <details class="mt-2 bg-white p-3 rounded-xl border border-rose-200">
                                <summary class="font-bold text-rose-800 cursor-pointer select-none">Xem đáp án chuẩn</summary>
                                <div class="mt-2 text-slate-800 pl-2">
                                    <p class="font-semibold text-slate-900 zh text-sm">商店里边衣服没有大商场里好看。</p>
                                    <p class="text-xs font-mono text-rose-800">Shāngdiàn lǐbian yīfu méiyǒu dà shāngchǎng lǐ hǎokàn.</p>
                                    <p class="text-xs text-slate-500">Quần áo trong tiệm không đẹp bằng quần áo trong trung tâm thương mại lớn.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- Phần 4: Đặt câu với từ vựng & cấu trúc ngữ pháp (AI Khổng Tử Chấm Điểm Thông Minh) -->
                <div class="mt-8 pt-6 border-t-2 border-dashed border-rose-200">
                    <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <h3 class="font-bold text-rose-950 text-base border-l-4 border-rose-800 pl-3 font-serif flex items-center gap-2">
                            <span>🤖 Phần 4: Đặt câu với Từ vựng & Ngữ pháp Bài 9 (Trợ lý AI Khổng Tử Chấm điểm)</span>
                            <span class="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] rounded-full font-sans font-semibold">Công nghệ AI</span>
                        </h3>
                        <button onclick="toggleApiKeyModal()" class="text-xs text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition flex items-center gap-1 font-sans">
                            <span>⚙️ Cài đặt Gemini API (Tùy chọn)</span>
                        </button>
                    </div>
                    <p class="text-xs text-slate-600 mb-5 leading-relaxed">
                        Hãy vận dụng các <b>từ vựng trọng tâm</b> và <b>cấu trúc ngữ pháp</b> vừa học trong Bài 9 để tự đặt câu hoàn chỉnh. Sau khi viết xong câu tiếng Trung, bấm nút <b>✨ 🤖 AI Chấm bài</b> để nhận xét ngữ pháp, chỉ rõ sai ở từ nào, giải thích cặn kẽ và nhận ngay câu hoàn thiện chuẩn bản ngữ!
                    </p>

                    <div class="space-y-6 text-xs">
                        <!-- Câu 1 -->
                        <div class="p-5 bg-gradient-to-br from-rose-50/50 to-amber-50/30 rounded-2xl border border-rose-200/80 shadow-xs space-y-3">
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                    <span class="inline-block px-2 py-0.5 bg-rose-700 text-white rounded text-[11px] font-bold">Bài tập 1</span>
                                    <h4 class="font-bold text-slate-800 text-sm mt-1">Đặt câu so sánh dùng chữ “没有”</h4>
                                </div>
                                <span class="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-800 font-mono">Cấu trúc: [A] + 没有 + [B] + (这么 / 那么) + [Tính từ]</span>
                            </div>
                            <div class="text-[12px] text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-rose-100">
                                <b>Yêu cầu:</b> Dùng câu so sánh <b>没有</b> để so sánh vóc dáng (<b>个子</b>), chất lượng đồ uống/quần áo (<b>好看 / 好喝</b>), hoặc thời tiết (<b>冷 / 热</b>).
                                <br><span class="text-rose-700 font-semibold">⚠️ Chú ý ngữ pháp:</span> Trong câu chữ 没有 không dùng các phó từ chỉ mức độ <i>很 / 非常</i> trước tính từ; có thể thêm <i>这么 / 那么</i> để biểu thị mức độ cao.
                                <br><span class="text-[11px] text-slate-500">Từ vựng gợi ý: 没有 (không bằng), 个子 (vóc dáng), 高 (cao), 衣服 (quần áo), 好看 (đẹp).</span>
                            </div>
                            <textarea id="ai-input-1" rows="2" class="w-full border rounded-xl p-3 text-sm border-rose-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-sans bg-white" placeholder="✍️ Nhập câu tiếng Trung của bạn vào đây (ví dụ: 儿子的个子没有他那么高。)..."></textarea>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button onclick="gradeWithAI(1)" class="px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white rounded-xl font-semibold text-xs shadow-sm transition flex items-center gap-1.5">
                                    <span>✨ 🤖 AI Chấm bài</span>
                                </button>
                                <button onclick="toggleHint(1)" class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl font-semibold text-xs border border-rose-200 transition">
                                    💡 Gợi ý câu mẫu
                                </button>
                            </div>
                            <div id="ai-hint-1" class="hidden p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                                <b>Câu mẫu tham khảo:</b> 儿子的个子没有他那么高。<br>
                                <span class="text-[11px] font-mono">Érzi de gèzi méiyǒu tā nàme gāo.</span> (Chiều cao của con trai không cao bằng cậu ấy.)
                            </div>
                            <div id="ai-result-1" class="hidden"></div>
                        </div>

                        <!-- Câu 2 -->
                        <div class="p-5 bg-gradient-to-br from-rose-50/50 to-amber-50/30 rounded-2xl border border-rose-200/80 shadow-xs space-y-3">
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                    <span class="inline-block px-2 py-0.5 bg-rose-700 text-white rounded text-[11px] font-bold">Bài tập 2</span>
                                    <h4 class="font-bold text-slate-800 text-sm mt-1">Đặt câu diễn đạt cự ly khoảng cách với động từ “离”</h4>
                                </div>
                                <span class="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-800 font-mono">Cấu trúc: [A] + 离 + [B] + [很近 / 有点儿远 / 不远]</span>
                            </div>
                            <div class="text-[12px] text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-rose-100">
                                <b>Yêu cầu:</b> Dùng động từ <b>离</b> để miêu tả cự ly giữa hai địa điểm (như trường học, nhà, quán cà phê, cửa hàng <b>咖啡店 / 学校 / 家 / 商店</b>).
                                <br><span class="text-rose-700 font-semibold">⚠️ Chú ý ngữ pháp:</span> Trật tự từ bắt buộc là <code>[Địa điểm A] + 离 + [Địa điểm B] + Tính từ cự ly</code> (không đảo lộn chữ 离 lên đầu câu).
                                <br><span class="text-[11px] text-slate-500">Từ vựng gợi ý: 离 (cách), 近 (gần), 远 (xa), 咖啡店 (quán cà phê), 这儿 (ở đây), 家 (nhà).</span>
                            </div>
                            <textarea id="ai-input-2" rows="2" class="w-full border rounded-xl p-3 text-sm border-rose-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-sans bg-white" placeholder="✍️ Nhập câu tiếng Trung của bạn vào đây (ví dụ: 这里离家很近，我们还是走路吧。)..."></textarea>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button onclick="gradeWithAI(2)" class="px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white rounded-xl font-semibold text-xs shadow-sm transition flex items-center gap-1.5">
                                    <span>✨ 🤖 AI Chấm bài</span>
                                </button>
                                <button onclick="toggleHint(2)" class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl font-semibold text-xs border border-rose-200 transition">
                                    💡 Gợi ý câu mẫu
                                </button>
                            </div>
                            <div id="ai-hint-2" class="hidden p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                                <b>Câu mẫu tham khảo:</b> 这里离家很近，我们还是走路吧。<br>
                                <span class="text-[11px] font-mono">Zhèlǐ lí jiā hěn jìn, wǒmen háishi zǒulù ba.</span> (Ở đây cách nhà rất gần, hay là chúng ta đi bộ nhé.)
                            </div>
                            <div id="ai-result-2" class="hidden"></div>
                        </div>

                        <!-- Câu 3 -->
                        <div class="p-5 bg-gradient-to-br from-rose-50/50 to-amber-50/30 rounded-2xl border border-rose-200/80 shadow-xs space-y-3">
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                    <span class="inline-block px-2 py-0.5 bg-rose-700 text-white rounded text-[11px] font-bold">Bài tập 3</span>
                                    <h4 class="font-bold text-slate-800 text-sm mt-1">Đặt câu diễn đạt thời lượng động tác với Bổ ngữ thời lượng (时量补语)</h4>
                                </div>
                                <span class="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-800 font-mono">Cấu trúc: [Chủ ngữ] + [Động từ] + [Thời lượng]</span>
                            </div>
                            <div class="text-[12px] text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-rose-100">
                                <b>Yêu cầu:</b> Dùng bổ ngữ thời lượng như <b>半个多小时</b> (hơn nửa tiếng), <b>十分钟</b> (10 phút), <b>两个小时</b> (2 tiếng) để diễn đạt thời gian đi bộ, nghỉ ngơi, học tập hoặc đợi ai.
                                <br><span class="text-rose-700 font-semibold">⚠️ Chú ý ngữ pháp:</span> Cụm từ chỉ thời lượng đặt trực tiếp ngay sau động từ (ví dụ: <i>走半个多小时, 休息十分钟</i>).
                                <br><span class="text-[11px] text-slate-500">Từ vựng gợi ý: 走 (đi), 走路 (đi bộ), 休息 (nghỉ ngơi), 等 (đợi), 半个多小时 (hơn nửa tiếng).</span>
                            </div>
                            <textarea id="ai-input-3" rows="2" class="w-full border rounded-xl p-3 text-sm border-rose-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-sans bg-white" placeholder="✍️ Nhập câu tiếng Trung của bạn vào đây (ví dụ: 我们从这里走半个多小时就到家了。)..."></textarea>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button onclick="gradeWithAI(3)" class="px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white rounded-xl font-semibold text-xs shadow-sm transition flex items-center gap-1.5">
                                    <span>✨ 🤖 AI Chấm bài</span>
                                </button>
                                <button onclick="toggleHint(3)" class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl font-semibold text-xs border border-rose-200 transition">
                                    💡 Gợi ý câu mẫu
                                </button>
                            </div>
                            <div id="ai-hint-3" class="hidden p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                                <b>Câu mẫu tham khảo:</b> 我们从这里走半个多小时就到家了。<br>
                                <span class="text-[11px] font-mono">Wǒmen cóng zhèlǐ zǒu bàn ge duō xiǎoshí jiù dào jiā le.</span> (Chúng ta từ đây đi bộ hơn nửa tiếng là về tới nhà rồi.)
                            </div>
                            <div id="ai-result-3" class="hidden"></div>
                        </div>

                        <!-- Câu 4 -->
                        <div class="p-5 bg-gradient-to-br from-rose-50/50 to-amber-50/30 rounded-2xl border border-rose-200/80 shadow-xs space-y-3">
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                    <span class="inline-block px-2 py-0.5 bg-rose-700 text-white rounded text-[11px] font-bold">Bài tập 4</span>
                                    <h4 class="font-bold text-slate-800 text-sm mt-1">Đặt câu kết hợp từ vựng sinh hoạt thực tế Bài 9 (Trà sữa, Cà phê, Cửa hàng)</h4>
                                </div>
                                <span class="text-[11px] px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-800 font-mono">Chủ đề: Sinh hoạt, mua sắm & thức uống</span>
                            </div>
                            <div class="text-[12px] text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-rose-100">
                                <b>Yêu cầu:</b> Vận dụng ít nhất 2 từ vựng mới trong Bài 9 (như <b>门口 / 奶茶 / 咖啡 / 商店 / 周</b>) để diễn đạt một câu giao tiếp sinh hoạt tự nhiên.
                                <br><span class="text-rose-700 font-semibold">⚠️ Chú ý ngữ pháp:</span> Đảm bảo câu có đầy đủ thành phần chủ vị, trật tự từ tự nhiên.
                                <br><span class="text-[11px] text-slate-500">Từ vựng gợi ý: 门口 (cổng, cửa ra vào), 奶茶 (trà sữa), 咖啡 (cà phê), 买 (mua), 喝 (uống).</span>
                            </div>
                            <textarea id="ai-input-4" rows="2" class="w-full border rounded-xl p-3 text-sm border-rose-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-sans bg-white" placeholder="✍️ Nhập câu tiếng Trung của bạn vào đây (ví dụ: 商店门口有家奶茶店，我想去买杯奶茶。)..."></textarea>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button onclick="gradeWithAI(4)" class="px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white rounded-xl font-semibold text-xs shadow-sm transition flex items-center gap-1.5">
                                    <span>✨ 🤖 AI Chấm bài</span>
                                </button>
                                <button onclick="toggleHint(4)" class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl font-semibold text-xs border border-rose-200 transition">
                                    💡 Gợi ý câu mẫu
                                </button>
                            </div>
                            <div id="ai-hint-4" class="hidden p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                                <b>Câu mẫu tham khảo:</b> 商店门口有家奶茶店，我想去买杯奶茶。<br>
                                <span class="text-[11px] font-mono">Shāngdiàn ménkǒu yǒu jiā nǎichádiàn, wǒ xiǎng qù mǎi bēi nǎichá.</span> (Ở cổng cửa hàng có một quán trà sữa, em muốn đi mua một cốc trà sữa.)
                            </div>
                            <div id="ai-result-4" class="hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>"""

    # Tab 8: Culture HTML (新中式茶饮 - New Chinese Tea Drink)
    culture_section = f"""
        <!-- TAB 8: GÓC VĂN HÓA -->
        <div id="sec-culture" class="tab-content hidden space-y-6">
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-rose-100/80">
                <div class="flex items-center gap-3 mb-4">
                    <span class="px-3 py-1 bg-rose-800 text-white font-extrabold rounded-full text-xs uppercase tracking-wider font-serif">Góc Văn Hóa Bài 9</span>
                    <h2 class="text-xl md:text-2xl font-bold font-serif text-rose-950">🎋 新中式茶饮 (Tân Trung Thức Trà Ẩm: Trào Lưu Trà Sữa & Thưởng Trà Thế Hệ Mới)</h2>
                </div>
                
                <div class="text-xs md:text-sm text-slate-700 space-y-4 leading-relaxed">
                    <p>Trong bài học hôm nay, câu chuyện bắt đầu bằng lời rủ rê ngọt ngào của Vương Nhất Tuyết: <b>“门口有家奶茶店。你想喝杯奶茶吗？”</b> (Ở cổng có một quán trà sữa. Anh có muốn uống một cốc trà sữa không?). Trà sữa ngày nay không đơn thuần là một món giải khát, mà đã phát triển thành một hiện tượng văn hóa độc đáo mang tên <b>“新中式茶饮” (Tân Trung Thức Trà Ẩm - Trào lưu thức uống trà phong cách Trung Hoa mới)</b>.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                            <h4 class="font-bold text-rose-950 text-sm mb-2 font-serif">🍵 1. Từ Trà Đạo Cổ Truyền Đến Cốc Trà Hiện Đại</h4>
                            <p class="text-slate-600">Trung Quốc là cái nôi của văn hóa trà đạo với lịch sử hàng nghìn năm. Nếu như thế hệ trước gắn liền với ấm trà đất nung Nghi Hưng, chén trà mạn Ô Long, Long Tỉnh trầm mặc thì giới trẻ ngày nay đã sáng tạo ra cách thưởng thức mới mẻ: kết hợp nước cốt trà nguyên bản thượng hạng với sữa tươi nguyên chất, hoa quả nhiệt đới tươi rói và thảo mộc dưỡng sinh.</p>
                        </div>
                        <div class="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                            <h4 class="font-bold text-amber-950 text-sm mb-2 font-serif">🧋 2. Phong Cách "Tân Trung Thức" Đậm Đà Bản Sắc</h4>
                            <p class="text-slate-600">Các thương hiệu trà sữa nổi tiếng như HEYTEA (Hỷ Trà 喜茶), Chagee (Bá Vương Trà Cơ 霸王茶姬), Nayuki (Nại Tuyết Đích Trà 奈雪的茶) không chỉ chú trọng hương vị thanh tao, ít ngọt, tốt cho sức khỏe mà còn khoác lên mình diện mạo mỹ thuật Trung Hoa: bao bì in tranh thủy mặc, thư pháp thơ cổ, hoa văn gốm sứ thanh hoa và không gian quán đậm chất nhã vận phương Đông.</p>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-2 font-serif">✨ Thưởng Thức Văn Hóa Qua Ngôn Từ:</h4>
                        <ul class="list-disc list-inside space-y-1.5 text-slate-700">
                            <li><b>奶茶 (nǎichá):</b> Trà sữa.</li>
                            <li><b>原叶鲜奶茶 (yuányè xiānnǎichá):</b> Trà sữa tươi lá trà nguyên bản (xu hướng healthy được chuộng nhất hiện nay).</li>
                            <li><b>半糖 / 微糖 (bàntáng / wēitáng):</b> Nửa đường / ít đường.</li>
                            <li><b>少冰 / 去冰 (shǎobīng / qùbīng):</b> Ít đá / không đá.</li>
                            <li><b>逛街喝奶茶 (guàngjiē hē nǎichá):</b> Dạo phố mua sắm và cầm trên tay một ly trà sữa thanh mát — thói quen thư giãn cuối tuần quen thuộc của các gia đình và bạn trẻ Trung Quốc!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>"""

    full_html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HSK 2 - Bài 9: 第九课 我去买杯奶茶 {title_suffix}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- HanziWriter CDN -->
    <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');
        
        body {{
            background-color: #fdfbf7;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(244, 63, 94, 0.03) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(217, 119, 6, 0.03) 0%, transparent 25%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }}

        .zh {{
            font-family: 'Noto Serif SC', 'Songti SC', SimSun, serif;
        }}

        /* Sakura falling animation */
        .petal {{
            position: fixed;
            background-color: transparent;
            pointer-events: none;
            z-index: 9999;
            top: -10%;
            animation: fall linear infinite;
        }}

        @keyframes fall {{
            0% {{
                opacity: 0.9;
                top: -5%;
                transform: translateX(0) rotate(0deg);
            }}
            100% {{
                opacity: 0.2;
                top: 105%;
                transform: translateX(120px) rotate(360deg);
            }}
        }}

        /* Tab buttons */
        .tab-btn.active {{
            background-color: #9f1239;
            color: #ffffff;
            border-bottom: 2px solid #e11d48;
            font-weight: 700;
        }}

        .tab-btn:hover:not(.active) {{
            background-color: #fff1f2;
            color: #881337;
        }}

        /* Watermark background */
        .bg-watermark {{
            position: fixed;
            inset: 0;
            background-image: url('images/bg_landscape.jpg');
            background-size: cover;
            background-position: center;
            opacity: 0.08;
            filter: blur(4px);
            pointer-events: none;
            z-index: 0;
        }}

        /* Writer & pad styling */
        .writer-container svg text {{
            display: none !important;
        }}

        .pad-canvas {{
            touch-action: none;
        }}
    </style>
</head>
<body class="p-3 md:p-6 lg:p-8">
    <div class="bg-watermark"></div>

    <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Top Navigation -->
        <header class="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-rose-100/80 mb-6 p-2 md:p-3 sticky top-2 z-50">
            <div class="flex items-center justify-between px-3 py-1 border-b border-rose-100/60 mb-2">
                <div class="flex items-center gap-2">
                    <span class="text-rose-800 text-lg">🏮</span>
                    <span class="font-bold text-rose-950 font-serif text-xs md:text-sm">HSK 2 Tự Học Nữ Tính • Bài 9: 我去买杯奶茶</span>
                </div>
                <span class="text-[11px] text-rose-800/80 font-medium hidden sm:inline">{title_suffix}</span>
            </div>
            <nav class="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs md:text-sm">
                {nav_html}
            </nav>
        </header>

        <!-- Main Content Sections -->
        <main>
            {sim_section}
            {overview_section}
            {vocab_section}
            {writing_section}
            {grammar_section}
            {text_section}
            {practice_section}
            {culture_section}
        </main>

        <footer class="mt-12 text-center text-xs text-slate-500 py-6 border-t border-rose-100">
            <p class="font-serif text-rose-900 font-medium">HSK 2 Tự Học • Bản Chuẩn Hóa Theo Giáo Trình Mới FLTRP 2026</p>
            <p class="mt-1 text-[11px] text-slate-400">Thiết kế bởi CoreLink Academy & CLB Học Thuật Trung Hoa</p>
        </footer>
    </div>

    <!-- Gemini API Key Modal -->
    <div id="api-modal" class="hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 border border-rose-200 space-y-4">
            <div class="flex items-center justify-between border-b border-rose-100 pb-3">
                <h3 class="font-bold text-rose-950 font-serif text-sm flex items-center gap-2">
                    <span>⚙️ Cài đặt Google Gemini API Key</span>
                </h3>
                <button onclick="toggleApiKeyModal()" class="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
                Hệ thống <b>đã tích hợp sẵn AI Khổng Tử Chấm Bài Offline 100%</b>. Nếu muốn phân tích sâu bằng mô hình Google Gemini trực tuyến, bạn có thể dán API Key cá nhân vào đây (chỉ lưu trên trình duyệt của bạn).
            </p>
            <input type="password" id="gemini-key-input" class="w-full border rounded-xl p-2.5 text-xs border-rose-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-mono" placeholder="AIzaSy...">
            <div class="flex items-center justify-end gap-2 pt-2">
                <button onclick="clearApiKey()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold">Xóa Key</button>
                <button onclick="saveApiKey()" class="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-semibold shadow-xs">Lưu Key</button>
            </div>
        </div>
    </div>

    <!-- Audio & Interactive Scripts -->
    <script>
        var VOCAB_AUDIO = {vocab_audio_json};
        var EX_AUDIO = {ex_audio_json};
        var TEXT_AUDIO = {text_audio_json};

        var currentAudio = null;
        function playAudio(key) {{
            if (currentAudio) {{
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }}
            var src = VOCAB_AUDIO[key] || EX_AUDIO[key] || TEXT_AUDIO[key];
            if (!src) {{
                // fallback to local m4a
                src = "audio/" + key + ".m4a";
            }}
            currentAudio = new Audio(src);
            currentAudio.play().catch(function(e) {{
                console.log("Audio play error:", e);
            }});
        }}

        function speakText(text) {{
            if ('speechSynthesis' in window) {{
                window.speechSynthesis.cancel();
                var msg = new SpeechSynthesisUtterance(text);
                msg.lang = 'zh-CN';
                msg.rate = 0.85;
                window.speechSynthesis.speak(msg);
            }} else {{
                alert('Trình duyệt không hỗ trợ tổng hợp giọng nói trực tiếp.');
            }}
        }}

        window.AI_POLISHED = {{}};
        function speakAIResult(idx) {{
            if (window.AI_POLISHED && window.AI_POLISHED[idx]) {{
                speakText(window.AI_POLISHED[idx]);
            }} else if (STANDARD_MODELS[idx]) {{
                speakText(STANDARD_MODELS[idx].zh);
            }}
        }}

        // Tab Navigation
        function showTab(tabId) {{
            var contents = document.querySelectorAll('.tab-content');
            for (var i = 0; i < contents.length; i++) {{
                contents[i].classList.add('hidden');
            }}
            var target = document.getElementById('sec-' + tabId);
            if (target) {{
                target.classList.remove('hidden');
            }}
            
            var btns = document.querySelectorAll('.tab-btn');
            for (var j = 0; j < btns.length; j++) {{
                btns[j].classList.remove('active');
                btns[j].className = "tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-950 transition cursor-pointer whitespace-nowrap";
            }}
            var activeBtn = document.getElementById('tab-' + tabId);
            if (activeBtn) {{
                activeBtn.className = "tab-btn active px-4 py-2.5 font-bold bg-rose-800 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer border-b-2 border-rose-600";
            }}
            window.scrollTo({{ top: 0, behavior: 'smooth' }});

            // Initialize HanziWriter if opening 'sim' tab
            if (tabId === 'sim') {{
                initAllWriters();
            }}
        }}

        // HanziWriter & Tianzige Canvas Pad
        var writers = {{}};
        var writersInitialized = false;

        var CHARS_DATA = {json.dumps(SIM_CHARS)};

        function initAllWriters() {{
            if (writersInitialized) return;
            writersInitialized = true;
            CHARS_DATA.forEach(function(item) {{
                var cid = item.id;
                var char = item.char;
                var container = document.getElementById('target-' + cid);
                if (container && !writers[cid] && window.HanziWriter) {{
                    writers[cid] = HanziWriter.create('target-' + cid, char, {{
                        width: 98,
                        height: 98,
                        padding: 5,
                        showOutline: true,
                        strokeColor: '#9f1239',
                        outlineColor: '#fecdd3',
                        drawingColor: '#be123c',
                        radicalColor: '#881337',
                        strokeAnimationSpeed: 1.25,
                        delayBetweenStrokes: 180
                    }});
                }}
                setupCanvas(cid);
            }});
        }}

        function animateChar(cid) {{
            if (writers[cid]) {{
                writers[cid].animateCharacter();
            }}
        }}

        function resetChar(cid) {{
            if (writers[cid]) {{
                writers[cid].hideCharacter();
                writers[cid].showOutline();
            }}
        }}

        // Touch & Mouse Drawing Pad for Tianzige
        function setupCanvas(cid) {{
            var canvas = document.getElementById('pad-' + cid);
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            var drawing = false;

            function getPos(e) {{
                var rect = canvas.getBoundingClientRect();
                var cx = e.touches ? e.touches[0].clientX : e.clientX;
                var cy = e.touches ? e.touches[0].clientY : e.clientY;
                return {{
                    x: (cx - rect.left) * (canvas.width / rect.width),
                    y: (cy - rect.top) * (canvas.height / rect.height)
                }};
            }}

            function start(e) {{
                drawing = true;
                ctx.beginPath();
                var pos = getPos(e);
                ctx.moveTo(pos.x, pos.y);
                ctx.strokeStyle = '#9f1239';
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                e.preventDefault();
            }}

            function draw(e) {{
                if (!drawing) return;
                var pos = getPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                e.preventDefault();
            }}

            function stop(e) {{
                drawing = false;
                e.preventDefault();
            }}

            canvas.addEventListener('mousedown', start);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stop);
            canvas.addEventListener('mouseleave', stop);

            canvas.addEventListener('touchstart', start, {{ passive: false }});
            canvas.addEventListener('touchmove', draw, {{ passive: false }});
            canvas.addEventListener('touchend', stop, {{ passive: false }});
        }}

        function clearCanvas(cid) {{
            var canvas = document.getElementById('pad-' + cid);
            if (canvas) {{
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}
        }}

        // Check Exercise Logic (Anti-spoiler, only "Kiểm tra" on button)
        function checkQ(qid, expected) {{
            var inp = document.getElementById(qid);
            var res = document.getElementById('res-' + qid);
            if (!inp || !res) return;
            var val = inp.value.trim().toUpperCase();
            if (!val) {{
                res.innerHTML = '<span class="text-amber-600 font-semibold text-xs">⚠️ Vui lòng nhập đáp án</span>';
                return;
            }}
            if (val === expected.toUpperCase()) {{
                res.innerHTML = '<span class="text-emerald-700 font-bold text-xs">✅ Chính xác!</span>';
            }} else {{
                res.innerHTML = '<span class="text-rose-700 font-bold text-xs">❌ Chưa đúng (Đáp án: ' + expected + ')</span>';
            }}
        }}

        function checkRadio(qName, expected) {{
            var res = document.getElementById('res-' + qName);
            if (!res) return;
            var radios = document.getElementsByName(qName);
            var selected = null;
            for (var i = 0; i < radios.length; i++) {{
                if (radios[i].checked) {{
                    selected = radios[i].value;
                    break;
                }}
            }}
            if (!selected) {{
                res.innerHTML = '<span class="text-amber-600 font-semibold text-xs">⚠️ Vui lòng chọn đáp án</span>';
                return;
            }}
            if (selected === expected) {{
                res.innerHTML = '<span class="text-emerald-700 font-bold text-xs">✅ Chính xác!</span>';
            }} else {{
                res.innerHTML = '<span class="text-rose-700 font-bold text-xs">❌ Chưa đúng (Đáp án: ' + expected + ')</span>';
            }}
        }}

        function toggleHint(idx) {{
            var h = document.getElementById('ai-hint-' + idx);
            if (h) h.classList.toggle('hidden');
        }}

        function toggleApiKeyModal() {{
            var m = document.getElementById('api-modal');
            if (m) m.classList.toggle('hidden');
            var saved = localStorage.getItem('gemini_api_key') || '';
            var inp = document.getElementById('gemini-key-input');
            if (inp) inp.value = saved;
        }}

        function saveApiKey() {{
            var inp = document.getElementById('gemini-key-input');
            if (inp) {{
                localStorage.setItem('gemini_api_key', inp.value.trim());
                alert('Đã lưu API Key thành công!');
                toggleApiKeyModal();
            }}
        }}

        function clearApiKey() {{
            localStorage.removeItem('gemini_api_key');
            var inp = document.getElementById('gemini-key-input');
            if (inp) inp.value = '';
            alert('Đã xóa API Key!');
            toggleApiKeyModal();
        }}

        // Standard Models for Fallback & Reference
        var STANDARD_MODELS = {{
            1: {{
                zh: '儿子的个子没有他那么高。',
                pinyin: 'Érzi de gèzi méiyǒu tā nàme gāo.',
                vi: 'Chiều cao của con trai không cao bằng cậu ấy.'
            }},
            2: {{
                zh: '这里离家很近，我们还是走路吧。',
                pinyin: 'Zhèlǐ lí jiā hěn jìn, wǒmen háishi zǒulù ba.',
                vi: 'Ở đây cách nhà rất gần, hay là chúng ta đi bộ nhé.'
            }},
            3: {{
                zh: '我们从这里走半个多小时就到家了。',
                pinyin: 'Wǒmen cóng zhèlǐ zǒu bàn ge duō xiǎoshí jiù dào jiā le.',
                vi: 'Chúng ta từ đây đi bộ hơn nửa tiếng là về tới nhà rồi.'
            }},
            4: {{
                zh: '商店门口有家奶茶店，我想去买杯奶茶。',
                pinyin: 'Shāngdiàn ménkǒu yǒu jiā nǎichádiàn, wǒ xiǎng qù mǎi bēi nǎichá.',
                vi: 'Ở cổng cửa hàng có một quán trà sữa, em muốn đi mua một cốc trà sữa.'
            }}
        }};

        function renderAIResult(idx, d) {{
            var res = document.getElementById('ai-result-' + idx);
            if (!res) return;
            window.AI_POLISHED[idx] = d.polished_zh;
            var isGood = d.score >= 8;
            var badgeColor = isGood ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300';
            
            var html = '<div class="p-5 bg-white rounded-2xl border-2 ' + (isGood ? 'border-emerald-200' : 'border-rose-200') + ' shadow-sm space-y-3 mt-3">' +
                '<div class="flex items-center justify-between border-b border-slate-100 pb-2.5 flex-wrap gap-2">' +
                    '<span class="font-bold text-rose-950 text-sm flex items-center gap-1.5 font-serif">🎓 Nhận Xét Từ Trợ Lý AI Khổng Tử</span>' +
                    '<span class="px-3 py-1 rounded-full text-xs font-bold border ' + badgeColor + '">Điểm: ' + d.score + '/10</span>' +
                '</div>' +
                '<div class="space-y-2 text-xs text-slate-700 leading-relaxed">' +
                    '<p><b>🔍 Kiểm tra từ vựng mục tiêu:</b> ' + d.vocab_check + '</p>' +
                    '<p><b>📐 Phân tích ngữ pháp:</b> ' + d.grammar_check + '</p>' +
                    '<div class="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-900">' + d.error_analysis + '</div>' +
                    '<p><b>💡 Nhận xét tổng kết:</b> ' + d.feedback + '</p>' +
                '</div>' +
                '<div class="p-4 bg-gradient-to-r from-rose-50 to-amber-50/60 rounded-xl border border-rose-200 mt-2 space-y-1.5">' +
                    '<div class="flex items-center justify-between">' +
                        '<b class="text-rose-950 text-xs font-serif">✨ Câu hoàn thiện đề xuất:</b>' +
                        '<button onclick="speakAIResult(' + idx + ')" class="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1">🔊 Nghe đọc</button>' +
                    '</div>' +
                    '<p class="text-base font-bold text-slate-900 zh">' + d.polished_zh + '</p>' +
                    '<p class="text-xs font-mono text-rose-800 font-semibold">' + d.polished_pinyin + '</p>' +
                    '<p class="text-slate-600 text-[11px] italic">' + d.polished_vi + '</p>' +
                '</div>' +
            '</div>';
            res.innerHTML = html;
            res.classList.remove('hidden');
        }}

        function evaluateBuiltInAI(idx, text) {{
            var score = 10;
            var vocabCheck = '';
            var grammarCheck = '';
            var errorAnalysis = '';
            var feedback = '';

            var clean = text.trim();
            if (idx === 1) {{
                // Đề 1: Câu so sánh chữ 没有 (A 没有 B + Adj / 那么 + Adj)
                var hasMeiyou = clean.indexOf('没有') !== -1;
                var badDegreeMatch = clean.match(/没有[^，。！？]*?(很|非常|真|太|挺)/);
                var hasAdj = /(高|冷|热|大|小|贵|便宜|好看|好喝|好)/.test(clean);

                if (hasMeiyou && !badDegreeMatch && hasAdj) {{
                    score = 10;
                    vocabCheck = 'Nhận diện tốt từ vựng mục tiêu và tính từ so sánh.';
                    grammarCheck = 'Chuẩn xác 100%! Cấu trúc câu so sánh chữ \"没有\" đúng chuẩn HSK 2, không mắc lỗi phó từ mức độ.';
                    errorAnalysis = '<b>✅ Không có lỗi sai:</b> Bạn đã áp dụng chính xác công thức <code>[A] + 没有 + [B] + (这么/那么) + [Tính từ]</code>. Bạn đã tuân thủ tuyệt đối quy tắc không dùng các phó từ chỉ mức độ (很, 非常) trong câu so sánh!';
                    feedback = 'Xuất sắc! Câu so sánh diễn đạt rất tự nhiên, chuẩn chỉnh cả về ngữ pháp lẫn cấu trúc.';
                }} else if (badDegreeMatch) {{
                    score = 7.0;
                    var badWord = badDegreeMatch[1];
                    vocabCheck = 'Nhận diện được chữ 没有 và tính từ miêu tả.';
                    grammarCheck = '⚠️ Sai ngữ pháp câu so sánh: Dùng phó từ mức độ tuyệt đối \"' + badWord + '\" sau chữ 没有.';
                    errorAnalysis = '<b>🔴 Sai ở từ:</b> <code>' + badWord + '</code> (Dùng sai phó từ mức độ sau chữ 没有)<br>' +
                        '<b>📌 Giải thích ngữ pháp:</b> Trong tiếng Hán chuẩn, câu chữ <b>没有</b> đã biểu thị mức độ kém hơn. Vì vậy, <b>TUYỆT ĐỐI KHÔNG DÙNG</b> các phó từ chỉ mức độ như <code>很</code> (rất), <code>非常</code> (vô cùng), <code>真</code> (thật là) trước tính từ!<br>' +
                        '<b>💡 Hướng dẫn sửa cụ thể:</b> Hãy xóa bỏ từ <code>' + badWord + '</code>, hoặc thay thế bằng <code>那么</code> / <code>这么</code> để nhấn mạnh mức độ.';
                    feedback = 'Bạn hiểu đúng ý nghĩa so sánh, chỉ cần bỏ phó từ mức độ ' + badWord + ' là câu sẽ hoàn hảo!';
                }} else if (!hasMeiyou) {{
                    score = 6.0;
                    vocabCheck = '⚠️ Chưa tìm thấy từ mục tiêu \"没有\" trong câu.';
                    grammarCheck = 'Chưa đúng cấu trúc câu so sánh chữ \"没有\" theo yêu cầu của bài tập.';
                    errorAnalysis = '<b>🔴 Sai sót:</b> Thiếu từ <code>没有</code>.<br><b>📌 Giải thích ngữ pháp:</b> Đề bài yêu cầu dùng câu so sánh chữ 没有 theo công thức: <code>[A] + 没有 + [B] + [Tính từ]</code>.<br><b>💡 Hướng dẫn sửa cụ thể:</b> Hãy thêm <code>没有</code> vào giữa hai đối tượng so sánh.';
                    feedback = 'Hãy đọc lại công thức và thêm chữ 没有 vào câu nhé!';
                }} else {{
                    score = 8.0;
                    vocabCheck = 'Có dùng chữ 没有.';
                    grammarCheck = 'Cần kiểm tra lại tính từ miêu tả đặc điểm.';
                    errorAnalysis = '<b>💡 Hướng dẫn sửa:</b> Đảm bảo câu có vị ngữ tính từ rõ ràng (như 高, 好看, 冷...).';
                    feedback = 'Khá tốt! Hãy bổ sung thêm tính từ để câu văn trọn nghĩa hơn.';
                }}
            }} else if (idx === 2) {{
                // Đề 2: Động từ 离 biểu thị cự ly (A 离 B + 近/远)
                var hasLi = clean.indexOf('离') !== -1;
                var hasDistance = /(近|远|有点儿远|不远|很近|不近)/.test(clean);

                if (hasLi && hasDistance) {{
                    score = 10;
                    vocabCheck = 'Nhận diện chuẩn xác động từ \"离\" và tính từ cự ly (近/远).';
                    grammarCheck = 'Xuất sắc! Cấu trúc câu [Địa điểm A] + 离 + [Địa điểm B] + 近/远 chuẩn 100%.';
                    errorAnalysis = '<b>✅ Không có lỗi sai:</b> Trật tự từ và khoảng cách cự ly được diễn đạt hoàn toàn tự nhiên.';
                    feedback = 'Rất tuyệt vời! Bạn đã nắm vững cách dùng động từ 离.';
                }} else if (!hasLi) {{
                    score = 6.0;
                    vocabCheck = '⚠️ Chưa có động từ cự ly \"离\".';
                    grammarCheck = 'Thiếu động từ 离.';
                    errorAnalysis = '<b>🔴 Sai sót:</b> Thiếu chữ <code>离</code>.<br><b>📌 Giải thích ngữ pháp:</b> Để nói khoảng cách giữa A và B, tiếng Trung dùng: <code>[A] + 离 + [B] + 近/远</code>.<br><b>💡 Hướng dẫn sửa:</b> Thêm <code>离</code> giữa hai địa điểm.';
                    feedback = 'Hãy thêm động từ 离 vào câu của bạn nhé!';
                }} else {{
                    score = 7.5;
                    vocabCheck = 'Có dùng chữ 离.';
                    grammarCheck = 'Thiếu từ chỉ mức độ cự ly ở cuối câu.';
                    errorAnalysis = '<b>💡 Hướng dẫn sửa:</b> Sau địa điểm B, bạn cần thêm từ chỉ cự ly như <code>很近</code> (rất gần) hoặc <code>有点儿远</code> (hơi xa).';
                    feedback = 'Câu gần hoàn chỉnh rồi, hãy thêm từ chỉ khoảng cách vào nhé!';
                }}
            }} else if (idx === 3) {{
                // Đề 3: Bổ ngữ thời lượng (Động từ + 时量补语)
                var hasDuration = /(分钟|小时|天|年|半个多小时|一会儿|下午)/.test(clean);
                var hasVerb = /(走|跑|学|等|看|坐|打|休息)/.test(clean);

                if (hasDuration && hasVerb) {{
                    score = 10;
                    vocabCheck = 'Nhận diện đầy đủ động từ và cụm từ chỉ thời lượng.';
                    grammarCheck = 'Chuẩn xác! Bổ ngữ thời lượng 时量补语 được đặt đúng vị trí sau động từ.';
                    errorAnalysis = '<b>✅ Không có lỗi sai:</b> Bạn đã diễn đạt thời gian kéo dài của hành động một cách chính xác theo ngữ pháp Bài 9.';
                    feedback = 'Rất tốt! Cấu trúc câu bổ ngữ thời lượng rất chuẩn mực.';
                }} else if (!hasDuration) {{
                    score = 6.5;
                    vocabCheck = '⚠️ Thiếu cụm từ chỉ thời lượng (ví dụ: 半个多小时, 十分钟, 两个小时...).';
                    grammarCheck = 'Chưa có thành phần bổ ngữ thời lượng theo yêu cầu đề bài.';
                    errorAnalysis = '<b>🔴 Sai sót:</b> Thiếu từ chỉ khoảng thời gian.<br><b>💡 Hướng dẫn sửa:</b> Thêm thời lượng (như <code>半个多小时</code>) trực tiếp sau động từ.';
                    feedback = 'Hãy thêm thời lượng của hành động vào sau động từ nhé!';
                }} else {{
                    score = 8.0;
                    vocabCheck = 'Có thời lượng.';
                    grammarCheck = 'Cần kiểm tra vị trí của động từ và bổ ngữ.';
                    errorAnalysis = '<b>💡 Hướng dẫn sửa:</b> Đảm bảo trật tự từ: <code>[Động từ] + [Thời lượng]</code>.';
                    feedback = 'Khá tốt! Hãy chú ý trật tự từ nhé.';
                }}
            }} else {{
                // Đề 4: Ứng dụng từ vựng Bài 9 (门口, 奶茶, 咖啡, 商店...)
                var hasVocab = /(门口|奶茶|咖啡|商店|周|走路|运动)/.test(clean);

                if (hasVocab && clean.length >= 8) {{
                    score = 10;
                    vocabCheck = 'Vận dụng rất linh hoạt các từ vựng trọng tâm Bài 9 (奶茶, 咖啡, 门口...).';
                    grammarCheck = 'Câu văn đủ thành phần chủ ngữ - vị ngữ, trôi chảy và giàu tính ứng dụng đời sống.';
                    errorAnalysis = '<b>✅ Không có lỗi sai:</b> Câu giao tiếp hoàn toàn tự nhiên và sinh động.';
                    feedback = 'Rất tuyệt vời! Bạn đã kết hợp từ vựng và ngữ pháp của Bài 9 rất nhuần nhuyễn.';
                }} else if (!hasVocab) {{
                    score = 6.5;
                    vocabCheck = '⚠️ Chưa tìm thấy các từ vựng chủ đề Bài 9 (奶茶, 咖啡, 门口, 商店...).';
                    grammarCheck = 'Câu chưa sát với chủ đề từ vựng Bài 9.';
                    errorAnalysis = '<b>💡 Hướng dẫn sửa:</b> Hãy dùng các từ như <code>奶茶</code> (trà sữa), <code>咖啡</code> (cà phê), <code>门口</code> (cổng) để đặt câu.';
                    feedback = 'Hãy chèn thêm từ vựng mới của Bài 9 vào câu của bạn nhé!';
                }} else {{
                    score = 8.5;
                    vocabCheck = 'Có dùng từ vựng Bài 9.';
                    grammarCheck = 'Câu văn ngắn gọn, dễ hiểu.';
                    errorAnalysis = '<b>💡 Hướng dẫn nâng cao:</b> Bạn có thể mở rộng thêm hành động hoặc cảm xúc để câu phong phú hơn.';
                    feedback = 'Tốt lắm! Bạn đã nhớ và vận dụng được từ vựng mới.';
                }}
            }}

            var m = STANDARD_MODELS[idx];
            var result = {{
                score: score,
                vocab_check: vocabCheck,
                grammar_check: grammarCheck,
                error_analysis: errorAnalysis,
                feedback: feedback,
                polished_zh: m.zh,
                polished_pinyin: m.pinyin,
                polished_vi: m.vi
            }};
            renderAIResult(idx, result);
        }}

        async function fetchGeminiGrading(idx, text, apiKey) {{
            var m = STANDARD_MODELS[idx];
            var prompt = "Bạn là Trợ lý AI Khổng Tử, chuyên gia sư phạm tiếng Trung HSK 2 của khóa học HSK Tự Học.\\n" +
                "Đang chấm Bài tập đặt câu số " + idx + " của HSK 2 Bài 9 (我去买杯奶茶).\\n" +
                "Đề bài tập " + idx + ": " + (idx === 1 ? "So sánh với 没有" : (idx === 2 ? "Cự ly với động từ 离" : (idx === 3 ? "Bổ ngữ thời lượng 时量补语" : "Từ vựng trà sữa, cà phê, cổng 门口, 奶茶"))) + "\\n" +
                "Câu học sinh viết: \\\"" + text + "\\\"\\n\\n" +
                "YÊU CẦU BẮT BUỘC TRẢ VỀ DUY NHẤT 1 CHUỖI JSON HỢP LỆ (không bọc trong markdown code fence, không viết thêm chữ nào khác) theo cấu trúc sau:\\n" +
                "{{\\n" +
                "  \\\"score\\\": <điểm số từ 5 đến 10, dạng số>,\\n" +
                "  \\\"vocab_check\\\": \\\"<nhận xét việc dùng từ vựng mục tiêu>\\\",\\n" +
                "  \\\"grammar_check\\\": \\\"<nhận xét cấu trúc ngữ pháp>\\\",\\n" +
                "  \\\"error_analysis\\\": \\\"<b>🔴 Sai ở từ:</b> ... <br><b>📌 Giải thích ngữ pháp:</b> ... <br><b>💡 Hướng dẫn sửa:</b> ... (hoặc <b>✅ Không có lỗi sai:</b> nếu câu chuẩn)\\\",\\n" +
                "  \\\"feedback\\\": \\\"<lời động viên sư phạm ngắn gọn>\\\",\\n" +
                "  \\\"polished_zh\\\": \\\"<CÂU CHỮ HÁN CHUẨN HOÀN CHỈNH>\\\",\\n" +
                "  \\\"polished_pinyin\\\": \\\"<PINYIN CHUẨN XÁC TƯƠNG ỨNG KHỚP 100% CÂU TRÊN>\\\",\\n" +
                "  \\\"polished_vi\\\": \\\"<DỊCH NGHĨA TIẾNG VIỆT TƯƠNG ỨNG KHỚP 100% CÂU TRÊN>\\\"\\n" +
                "}}";

            try {{
                var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
                var res = await fetch(url, {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{
                        contents: [{{ parts: [{{ text: prompt }}] }}]
                    }})
                }});
                var data = await res.json();
                var rawText = data.candidates[0].content.parts[0].text.trim();
                rawText = rawText.replace(/^```json\\s*/, '').replace(/\\s*```$/, '');
                var parsed = JSON.parse(rawText);
                if (!parsed.polished_zh || !parsed.polished_pinyin || !parsed.polished_vi) {{
                    parsed.polished_zh = parsed.polished_zh || m.zh;
                    parsed.polished_pinyin = parsed.polished_pinyin || m.pinyin;
                    parsed.polished_vi = parsed.polished_vi || m.vi;
                }}
                renderAIResult(idx, parsed);
            }} catch (err) {{
                console.warn('Gemini call failed, fallback to built-in AI:', err);
                evaluateBuiltInAI(idx, text);
            }}
        }}

        function gradeWithAI(idx) {{
            var inp = document.getElementById('ai-input-' + idx);
            if (!inp) return;
            var text = inp.value.trim();
            if (!text) {{
                alert('Vui lòng nhập câu tiếng Trung của bạn trước khi bấm AI Chấm bài nhé!');
                return;
            }}

            var res = document.getElementById('ai-result-' + idx);
            if (res) {{
                res.innerHTML = '<div class=\"p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs text-rose-800 flex items-center gap-2 font-medium\"><span class=\"animate-spin\">🌸</span> Đang phân tích ngữ pháp và cấu trúc câu...</div>';
                res.classList.remove('hidden');
            }}

            var apiKey = localStorage.getItem('gemini_api_key');
            if (apiKey) {{
                fetchGeminiGrading(idx, text, apiKey);
            }} else {{
                setTimeout(function() {{
                    evaluateBuiltInAI(idx, text);
                }}, 400);
            }}
        }}

        function createFallingPetals() {{
            var container = document.body;
            var petalIcons = ['🌸', '🌺', '🍃'];
            for (var i = 0; i < 14; i++) {{
                var petal = document.createElement('div');
                petal.className = 'petal';
                petal.textContent = petalIcons[Math.floor(Math.random() * petalIcons.length)];
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDuration = (6 + Math.random() * 6) + 's';
                petal.style.animationDelay = (Math.random() * 5) + 's';
                petal.style.fontSize = (12 + Math.random() * 12) + 'px';
                container.appendChild(petal);
            }}
        }}

        document.addEventListener('DOMContentLoaded', function() {{
            createFallingPetals();
            showTab('{default_tab}');
        }});
    </script>
</body>
</html>"""
    return full_html

# Generate Day 9 (8 Tabs)
html_8_tabs = generate_html(is_8_tabs=True)
p_8_tabs_day9 = os.path.join(DAY9_DIR, "HSK2_Bai_9_Mo_Phong_Viet.html")
p_8_tabs_root = os.path.join(TRUNG_ANH_DIR, "HSK2_Bai_9_Mo_Phong_Viet.html")

with open(p_8_tabs_day9, "w", encoding="utf-8") as f:
    f.write(html_8_tabs)
with open(p_8_tabs_root, "w", encoding="utf-8") as f:
    f.write(html_8_tabs)

print(f"Generated 8-Tab HTML: {p_8_tabs_day9} ({os.path.getsize(p_8_tabs_day9)} bytes)")

# Generate Day 9 (7 Tabs)
html_7_tabs = generate_html(is_8_tabs=False)
p_7_tabs_day9 = os.path.join(DAY9_DIR, "HSK2_Bai_9_Tu_Hoc.html")
p_7_tabs_root = os.path.join(TRUNG_ANH_DIR, "HSK2_Bai_9_Tu_Hoc.html")

with open(p_7_tabs_day9, "w", encoding="utf-8") as f:
    f.write(html_7_tabs)
with open(p_7_tabs_root, "w", encoding="utf-8") as f:
    f.write(html_7_tabs)

print(f"Generated 7-Tab HTML: {p_7_tabs_day9} ({os.path.getsize(p_7_tabs_day9)} bytes)")
print("ALL DONE SUCCESSFULLY!")
