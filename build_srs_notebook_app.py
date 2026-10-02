import json, os

def generate_app():
    # Load base dataset
    db_path = '/Users/trangngo95/Desktop/HSK/srs_full_database.json'
    with open(db_path, 'r', encoding='utf-8') as f:
        full_db = json.load(f)

    # 1. Day 1 HSK 2 Words (14 words)
    hsk2_d1_words = [x for x in full_db if x.get('day') == 1 or 'd1' in str(x.get('id'))]
    
    # 2. HSK 1 baseline review words (10 words)
    hsk1_baseline = [x for x in full_db if x.get('level') == 'HSK 1'][:10]

    # Combine dictionary map for auto lookup
    dictionary_map = {}
    for item in full_db:
        hz = item['hanzi']
        dictionary_map[hz] = {
            "hanzi": item['hanzi'],
            "pinyin": item['pinyin'],
            "hanviet": item.get('hanviet', ''),
            "meaning": item['meaning'],
            "example": item.get('example', ''),
            "mnemonic": item.get('mnemonic', '')
        }

    # Add additional common vocabulary into dictionary map
    extra_vocab = [
        {"hanzi": "自行车", "pinyin": "zìxíngchē", "hanviet": "Tự hành xa", "meaning": "Xe đạp", "example": "我骑自行车去学校。 (Wǒ qí zìxíngchē qù xuéxiào. - Tôi đi xe đạp đến trường.)"},
        {"hanzi": "羊肉", "pinyin": "yángròu", "hanviet": "Dương nhục", "meaning": "Thịt cừu", "example": "今天的羊肉很好吃。 (Jīntiān de yángròu hěn hǎochī. - Thịt cừu hôm nay rất ngon.)"},
        {"hanzi": "好吃", "pinyin": "hǎochī", "hanviet": "Hảo cật", "meaning": "Ngon, dễ ăn", "example": "中国菜很好吃。 (Zhōngguó cài hěn hǎochī. - Món ăn Trung Quốc rất ngon.)"},
        {"hanzi": "面条", "pinyin": "miàntiáo", "hanviet": "Miến điều", "meaning": "Mì, sợi mì", "example": "我想吃一碗面条。 (Wǒ xiǎng chī yì wǎn miàntiáo. - Tôi muốn ăn một bát mì.)"},
        {"hanzi": "打篮球", "pinyin": "dǎ lánqiú", "hanviet": "Đả lam cầu", "meaning": "Chơi bóng rổ", "example": "我们去打篮球吧。 (Wǒmen qù dǎ lánqiú ba. - Chúng mình đi chơi bóng rổ nhé.)"},
        {"hanzi": "游泳", "pinyin": "yóuyǒng", "hanviet": "Du vịnh", "meaning": "Bơi lội", "example": "夏天我喜欢去游泳。 (Xiàtiān wǒ xǐhuan qù yóuyǒng. - Mùa hè tôi thích đi bơi.)"},
        {"hanzi": "经常", "pinyin": "jīngcháng", "hanviet": "Kinh thường", "meaning": "Thường xuyên", "example": "他经常去图书馆。 (Tā jīngcháng qù túshūguǎn. - Cậu ấy thường xuyên đến thư viện.)"},
        {"hanzi": "公斤", "pinyin": "gōngjīn", "hanviet": "Công cân", "meaning": "Ki-lô-gam (kg)", "example": "我要买三公斤苹果。 (Wǒ yào mǎi sān gōngjīn píngguǒ. - Tôi muốn mua 3 kg táo.)"},
        {"hanzi": "姐姐", "pinyin": "jiějie", "hanviet": "Tỷ tỷ", "meaning": "Chị gái", "example": "我姐姐是医生。 (Wǒ jiějie shì yīshēng. - Chị gái tôi là bác sĩ.)"},
        {"hanzi": "生日", "pinyin": "shēngrì", "hanviet": "Sinh nhật", "meaning": "Sinh nhật", "example": "祝你生日快乐！ (Zhù nǐ shēngrì kuàilè! - Chúc bạn sinh nhật vui vẻ!)"},
        {"hanzi": "快乐", "pinyin": "kuàilè", "hanviet": "Khoái lạc", "meaning": "Vui vẻ, hạnh phúc", "example": "祝你天天快乐！ (Zhù nǐ tiāntiān kuàilè! - Chúc bạn mỗi ngày đều vui vẻ!)"},
        {"hanzi": "送", "pinyin": "sòng", "hanviet": "Tống", "meaning": "Tặng, tiễn", "example": "这是我送给你的礼物。 (Zhè shì wǒ sòng gěi nǐ de lǐwù. - Đây là món quà tôi tặng bạn.)"},
        {"hanzi": "礼物", "pinyin": "lǐwù", "hanviet": "Lễ vật", "meaning": "Món quà, quà tặng", "example": "谢谢你的礼物。 (Xièxie nǐ de lǐwù. - Cảm ơn món quà của bạn.)"},
        {"hanzi": "晚上", "pinyin": "wǎnshang", "hanviet": "Vãn thượng", "meaning": "Buổi tối", "example": "晚上我们一起吃饭。 (Wǎnshang wǒmen yìqǐ chīfàn. - Buổi tối chúng ta cùng ăn cơm.)"},
        {"hanzi": "蛋糕", "pinyin": "dàngāo", "hanviet": "Đản cao", "meaning": "Bánh kem, bánh sinh nhật", "example": "这块蛋糕很好吃。 (Zhè kuài dàngāo hěn hǎochī. - Miếng bánh kem này rất ngon.)"},
        {"hanzi": "问", "pinyin": "wèn", "hanviet": "Vấn", "meaning": "Hỏi", "example": "我可以问你一个问题吗？ (Wǒ kěyǐ wèn nǐ yí ge wèntí ma? - Tôi có thể hỏi bạn một câu được không?)"},
        {"hanzi": "非常", "pinyin": "fēicháng", "hanviet": "Phi thường", "meaning": "Rất, cực kỳ", "example": "今天我非常高兴。 (Jīntiān wǒ fēicháng gāoxìng. - Hôm nay tôi rất vui.)"},
        {"hanzi": "开始", "pinyin": "kāishǐ", "hanviet": "Khai thủy", "meaning": "Bắt đầu", "example": "会议八点开始。 (Huìyì bā diǎn kāishǐ. - Cuộc họp bắt đầu lúc 8 giờ.)"},
        {"hanzi": "希望", "pinyin": "xīwàng", "hanviet": "Hy vọng", "meaning": "Hy vọng, mong muốn", "example": "希望你身体健康。 (Xīwàng nǐ shēntǐ jiànkāng. - Hy vọng bạn khỏe mạnh.)"},
        {"hanzi": "手机", "pinyin": "shǒujī", "hanviet": "Thủ cơ", "meaning": "Điện thoại di động", "example": "这是我的新手机。 (Zhè shì wǒ de xīn shǒujī. - Đây là điện thoại mới của tôi.)"},
        {"hanzi": "学习", "pinyin": "xuéxí", "hanviet": "Học tập", "meaning": "Học tập, học", "example": "我爱学习汉语。 (Wǒ ài xuéxí Hànyǔ. - Tôi yêu học tiếng Trung.)"},
        {"hanzi": "咖啡", "pinyin": "kāfēi", "hanviet": "Cà phê", "meaning": "Cà phê", "example": "你想喝咖啡吗？ (Nǐ xiǎng hē kāfēi ma? - Bạn muốn uống cà phê không?)"},
        {"hanzi": "牛奶", "pinyin": "niúnǎi", "hanviet": "Ngưu nãi", "meaning": "Sữa bò", "example": "早上我喝了一杯牛奶。 (Zǎoshang wǒ hē le yì bēi niúnǎi. - Buổi sáng tôi uống 1 ly sữa.)"}
    ]

    for item in extra_vocab:
        dictionary_map[item['hanzi']] = item

    dict_json = json.dumps(dictionary_map, ensure_ascii=False)
    hsk2_d1_json = json.dumps(hsk2_d1_words, ensure_ascii=False)
    hsk1_baseline_json = json.dumps(hsk1_baseline, ensure_ascii=False)

    html_code = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Cece Notebook SRS">
    <link rel="apple-touch-icon" href="https://img.icons8.com/color/180/chinese-dragon.png">
    <title>Notebook Học Từ Vựng SRS - Cece Chinese Journal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{
            font-family: 'Lexend', 'Noto Sans SC', sans-serif;
            background-color: #0f172a;
            color: #1e293b;
            -webkit-tap-highlight-color: transparent;
        }}
        .zh {{ font-family: 'Noto Sans SC', sans-serif; }}
        .app-container {{
            max-width: 480px;
            min-height: 100vh;
            margin: 0 auto;
            background: #f8fafc;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
        }}
        .phone-frame {{
            border-radius: 40px;
            overflow: hidden;
            border: 12px solid #1e293b;
            margin: 15px auto;
            height: 94vh;
            max-height: 900px;
        }}
        .phone-frame .app-container {{
            min-height: 100%;
            height: 100%;
            overflow-y: auto;
        }}
        button, input, textarea {{ touch-action: manipulation; }}
        .scrollbar-none::-webkit-scrollbar {{ display: none; }}
        .scrollbar-none {{ -ms-overflow-style: none; scrollbar-width: none; }}
        .hide-text {{ filter: blur(6px); user-select: none; transition: filter 0.2s; }}
        .hide-text:hover {{ filter: none; }}
        
        /* Card animation */
        .card-flip {{
            perspective: 1000px;
        }}
        .fade-in {{
            animation: fadeIn 0.3s ease-in-out;
        }}
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(6px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
    </style>
</head>
<body class="bg-slate-900 text-slate-800">

    <div id="wrapper-frame" class="phone-frame shadow-2xl">
        <div class="app-container">

            <!-- Mobile Status Bar -->
            <div class="bg-slate-950 text-white px-5 pt-3 pb-2 flex items-center justify-between text-xs sticky top-0 z-50 select-none border-b border-slate-800">
                <span class="font-semibold tracking-tight text-slate-200">09:41</span>
                <div class="w-20 h-4 bg-black rounded-full mx-auto flex items-center justify-center gap-1 opacity-90">
                    <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                </div>
                <div class="flex items-center gap-1.5 text-slate-300">
                    <span id="streak-badge" class="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-amber-500/30">🔥 1 Ngày</span>
                </div>
            </div>

            <!-- Header Banner -->
            <div class="bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-950 text-white p-4 shadow-md sticky top-7 z-40 border-b border-indigo-900/50">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2.5">
                        <span class="text-2xl">📓</span>
                        <div>
                            <h1 class="text-base font-extrabold tracking-tight text-white leading-tight">Cece Notebook & SRS App</h1>
                            <p class="text-[10px] text-blue-300 font-medium">Sổ Tay Ghi Chép • Spaced Repetition Auto Plan</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <button onclick="resetDay1Data()" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] border border-slate-700 active:scale-95 transition">
                            🔄 Rest Day 1
                        </button>
                    </div>
                </div>

                <!-- Navigation Tabs (3 Main Modes) -->
                <div class="flex bg-slate-900/90 p-1 rounded-xl text-xs font-semibold gap-1 border border-slate-800 overflow-x-auto scrollbar-none">
                    <button onclick="switchView('input')" id="nav-btn-input" class="flex-1 py-1.5 px-2 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition whitespace-nowrap">✍️ Nạp Từ Mới</button>
                    <button onclick="switchView('srs')" id="nav-btn-srs" class="flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap">🎴 Ôn Tập SRS <span id="badge-due-count" class="bg-rose-500 text-white px-1.5 py-0.2 rounded-full text-[9px] font-black ml-0.5">0</span></button>
                    <button onclick="switchView('notebook')" id="nav-btn-notebook" class="flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap">📋 Sổ Từ Vựng</button>
                </div>
            </div>

            <!-- Main Scrollable Content Area -->
            <div class="flex-1 p-4 bg-slate-50 space-y-4">

                <!-- VIEW 1: NẠP TỪ MỚI & GHI CHÉP HÀNG NGÀY (DAILY INPUT & NOTEBOOK) -->
                <div id="sec-input-view" class="space-y-4 fade-in">
                    
                    <!-- Day Banner Progress Card -->
                    <div class="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-blue-700/60 space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">🚩</span>
                                <div>
                                    <h3 id="current-day-heading" class="text-xs font-black text-amber-300 uppercase tracking-wider">NGÀY 1 • NẠP VÀ ÔN TẬP</h3>
                                    <p class="text-[10px] text-blue-200">14 từ HSK 2 Day 1 + 10 từ HSK 1 ôn lại (Đầu vào)</p>
                                </div>
                            </div>
                            <span id="day-pill-tag" class="text-[10px] bg-emerald-500 text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                                🚀 Ngày 1
                            </span>
                        </div>

                        <!-- Progress indicator -->
                        <div class="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                            <div class="bg-slate-900/60 p-2 rounded-xl border border-blue-900/50">
                                <span class="text-[9px] text-blue-300 block font-bold">BỘ NHỚ SRS</span>
                                <span id="stat-total-words" class="font-extrabold text-amber-300 text-sm">24 Từ</span>
                            </div>
                            <div class="bg-slate-900/60 p-2 rounded-xl border border-blue-900/50">
                                <span class="text-[9px] text-blue-300 block font-bold">CẦN ÔN HÔM NAY</span>
                                <span id="stat-due-words" class="font-extrabold text-rose-400 text-sm">24 Từ</span>
                            </div>
                            <div class="bg-slate-900/60 p-2 rounded-xl border border-blue-900/50">
                                <span class="text-[9px] text-blue-300 block font-bold">ĐÃ THUỘC (MASTERS)</span>
                                <span id="stat-mastered-words" class="font-extrabold text-emerald-400 text-sm">0 Từ</span>
                            </div>
                        </div>
                    </div>

                    <!-- DAY 1 QUICK LOAD BANNER -->
                    <div id="day1-starter-banner" class="bg-amber-50 border border-amber-200 p-3 rounded-2xl space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                                📌 DỮ LIỆU ĐẦU VÀO NGÀY 1:
                            </span>
                            <span class="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">24 từ sẵn sàng</span>
                        </div>
                        <p class="text-[11px] text-amber-800 leading-relaxed">
                            Ngày 1 chị học trọn vẹn <strong>14 từ ở Day 1 HSK 2</strong> (就, 给, 让, 接, 次, 旅游, 帮忙, 不好意思, 已经, 那, 介绍, 有时, 懂, 意思) + ôn lại <strong>10 từ HSK 1 cốt lõi</strong>!
                        </p>
                    </div>

                    <!-- WORD ADDER FORM (NẠP TỪ MỚI NGÀY 2 TRỞ ĐI) -->
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h2 class="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                                <span>✍️</span> NGÀY 2+: NẠP TỪ MỚI CỦA CHỊ
                            </h2>
                            <span class="text-[10px] bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded-full">✨ Tự Động Thêm SRS</span>
                        </div>

                        <p class="text-[11px] text-slate-500 leading-relaxed">
                            Nhập Chữ Hán hoặc Pinyin từ mới chị vừa học. Em sẽ tự động tìm <strong>Pinyin, Nghĩa Việt & Ví dụ dùng từ đó</strong> rồi lưu vào bộ nhớ SRS để lên lịch ôn!
                        </p>

                        <!-- Input fields -->
                        <div class="space-y-2.5">
                            <div>
                                <label class="text-[10px] font-extrabold text-slate-600 block uppercase mb-1">1. Chữ Hán (Từ Mới):</label>
                                <div class="flex gap-2">
                                    <input type="text" id="input-hanzi" oninput="onHanziInputChange()" placeholder="Vd: 自行车, 准备, 咖啡..." class="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-slate-50">
                                    <button onclick="autoLookupWord()" class="px-3 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition flex items-center gap-1 whitespace-nowrap">
                                        ✨ Tra & Điền
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="text-[10px] font-extrabold text-slate-600 block uppercase mb-1">2. Pinyin:</label>
                                    <input type="text" id="input-pinyin" placeholder="Vd: zìxíngchē" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-emerald-800 outline-none bg-slate-50">
                                </div>
                                <div>
                                    <label class="text-[10px] font-extrabold text-slate-600 block uppercase mb-1">3. Hán Việt (Tùy chọn):</label>
                                    <input type="text" id="input-hanviet" placeholder="Vd: Tự hành xa" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 outline-none bg-slate-50">
                                </div>
                            </div>

                            <div>
                                <label class="text-[10px] font-extrabold text-slate-600 block uppercase mb-1">4. Nghĩa Tiếng Việt:</label>
                                <input type="text" id="input-meaning" placeholder="Vd: Xe đạp" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-blue-900 outline-none bg-slate-50">
                            </div>

                            <div>
                                <label class="text-[10px] font-extrabold text-slate-600 block uppercase mb-1">5. Ví Dụ Dùng Từ Đó (Chữ Hán + Pinyin + Dịch):</label>
                                <textarea id="input-example" rows="2" placeholder="Vd: 我骑自行车去学校。 (Wǒ qí zìxíngchē qù xuéxiào. - Tôi đi xe đạp đến trường.)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none bg-slate-50"></textarea>
                            </div>
                        </div>

                        <!-- Action buttons -->
                        <div class="pt-1">
                            <button onclick="saveCustomWordFromForm()" class="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2 border border-blue-700">
                                <span>💾 LƯU VÀO BỘ NHỚ & LÊN KẾ HOẠCH ÔN SRS 🚀</span>
                            </button>
                        </div>
                    </div>

                    <!-- Quick Suggestions Chips -->
                    <div class="bg-white p-3 rounded-2xl border border-slate-200 space-y-2">
                        <span class="text-[10px] font-extrabold text-slate-500 uppercase block">💡 Gợi Ý Từ HSK 2 Hay Gặp Để Nạp Nhanh:</span>
                        <div class="flex flex-wrap gap-1.5 text-xs font-bold">
                            <button onclick="fillSuggestion('自行车')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">🚲 自行车 (Xe đạp)</button>
                            <button onclick="fillSuggestion('羊肉')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">🥩 羊肉 (Thịt cừu)</button>
                            <button onclick="fillSuggestion('好吃')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">😋 好吃 (Ngon)</button>
                            <button onclick="fillSuggestion('游泳')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">🏊 游泳 (Bơi lội)</button>
                            <button onclick="fillSuggestion('生日')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">🎂 生日 (Sinh nhật)</button>
                            <button onclick="fillSuggestion('手机')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200">📱 手机 (Điện thoại)</button>
                        </div>
                    </div>

                </div>

                <!-- VIEW 2: ÔN TẬP SRS FLASHCARD (SPACED REPETITION ANKI DECK) -->
                <div id="sec-srs-view" class="space-y-4 hidden fade-in">
                    
                    <!-- Mode Header Switcher -->
                    <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                        <span class="font-extrabold text-indigo-950 flex items-center gap-1.5">⚡ LỊCH ÔN SPACED REPETITION:</span>
                        <div class="flex gap-1">
                            <button onclick="filterSrsQueue('due')" id="srs-btn-due" class="px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-bold text-[11px] transition">🎯 Đến Hạn Hôm Nay</button>
                            <button onclick="filterSrsQueue('all')" id="srs-btn-all" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] transition">📚 Ôn Tất Cả</button>
                        </div>
                    </div>

                    <!-- SRS Card Rendering Container -->
                    <div id="srs-card-box" class="space-y-4"></div>

                </div>

                <!-- VIEW 3: SỔ TỪ VỰNG & RECALL SHEET (CLAIRE VU NOTEBOOK SHEET) -->
                <div id="sec-notebook-view" class="space-y-4 hidden fade-in">
                    
                    <!-- Mask control banner -->
                    <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span>👁️ Ẩn/Hiện Để Tự Nhớ (Active Recall):</span>
                            <span class="text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">Bấm nút để che/hiện</span>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
                            <button onclick="toggleMask('pinyin')" id="btn-mask-py" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Pinyin</button>
                            <button onclick="toggleMask('meaning')" id="btn-mask-vi" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Nghĩa Việt</button>
                            <button onclick="toggleMask('hanzi')" id="btn-mask-hz" class="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300">👁️ Chữ Hán</button>
                        </div>
                    </div>

                    <!-- Category Filter dropdown -->
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-extrabold text-slate-800">DANH MỤC LỌC TỪ:</span>
                        <select id="notebook-filter" onchange="renderNotebookSheet()" class="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-blue-900 text-xs shadow-xs outline-none">
                            <option value="all">★ Tất cả từ trong sổ vựng</option>
                            <option value="hsk2-d1">📌 HSK 2 • Ngày 1 (14 từ)</option>
                            <option value="hsk1-review">🔄 HSK 1 • Ôn Đầu Vào (10 từ)</option>
                            <option value="custom">✍️ Từ do Chị nạp mới</option>
                        </select>
                    </div>

                    <!-- List of Words -->
                    <div id="notebook-sheet-container" class="space-y-3"></div>

                    <!-- Data Backup & Clear -->
                    <div class="bg-slate-100 p-3 rounded-2xl border border-slate-300 space-y-2 text-center text-xs">
                        <span class="font-bold text-slate-700 block">💾 QUẢN LÝ DỮ LIỆU NHẬT KÝ & BỘ NHỚ:</span>
                        <div class="flex justify-center gap-2">
                            <button onclick="exportDataJSON()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-[11px]">📥 Xuất Data JSON</button>
                            <button onclick="triggerImportJSON()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-[11px]">📤 Nhập Data JSON</button>
                            <input type="file" id="import-json-file" onchange="importDataJSON(event)" class="hidden" accept=".json">
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toast-notify" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-blue-500 text-xs font-bold hidden z-50 flex items-center gap-2 max-w-xs text-center transition">
        <span id="toast-msg">✅ Thao tác thành công!</span>
    </div>

    <script>
        // Global Datasets
        const BUILTIN_DICTIONARY = {dict_json};
        const HSK2_DAY1_INIT = {hsk2_d1_json};
        const HSK1_BASELINE_INIT = {hsk1_baseline_json};

        // Persistent App State Structure
        let appState = {{
            dayStep: 1,
            userCustomWords: [],
            cardProgress: {{}}, // wordId -> {{ interval, easeFactor, repetition, dueDate, lastReviewed, ticks: {{}} }}
            maskState: {{ pinyin: false, meaning: false, hanzi: false }}
        }};

        let srsQueue = [];
        let srsCurrentIdx = 0;
        let srsFilterMode = 'due';

        // Helper date string
        function getTodayStr() {{
            const d = new Date();
            return d.toISOString().split('T')[0];
        }}

        // Save & Load LocalStorage
        function saveAppState() {{
            try {{
                localStorage.setItem('cece_srs_notebook_app_v1', JSON.stringify(appState));
            }} catch(e) {{
                console.error("Save error:", e);
            }}
            updateHeaderCounters();
        }}

        function loadAppState() {{
            try {{
                const saved = localStorage.getItem('cece_srs_notebook_app_v1');
                if (saved) {{
                    appState = Object.assign(appState, JSON.parse(saved));
                }} else {{
                    // Initialize Day 1 default state if empty
                    initDay1DefaultState();
                }}
            }} catch(e) {{
                initDay1DefaultState();
            }}
            updateHeaderCounters();
        }}

        function initDay1DefaultState() {{
            appState.dayStep = 1;
            appState.userCustomWords = [];
            appState.cardProgress = {{}};
            const today = getTodayStr();

            // Pre-load 14 HSK 2 Day 1 words
            HSK2_DAY1_INIT.forEach(w => {{
                appState.cardProgress[w.id] = {{
                    interval: 1,
                    easeFactor: 2.5,
                    repetition: 0,
                    dueDate: today,
                    ticks: {{}}
                }};
            }});

            // Pre-load 10 HSK 1 review words
            HSK1_BASELINE_INIT.forEach(w => {{
                appState.cardProgress[w.id] = {{
                    interval: 1,
                    easeFactor: 2.5,
                    repetition: 0,
                    dueDate: today,
                    ticks: {{}}
                }};
            }});

            saveAppState();
        }}

        function resetDay1Data() {{
            if (confirm("Reset về trạng thái Ngày 1 (14 từ HSK 2 Day 1 + 10 từ HSK 1 đầu vào)?")) {{
                localStorage.removeItem('cece_srs_notebook_app_v1');
                initDay1DefaultState();
                location.reload();
            }}
        }}

        // Get all active words combined (Baseline Day 1 + Custom user added)
        function getAllWordsList() {{
            const baseline = [...HSK2_DAY1_INIT, ...HSK1_BASELINE_INIT];
            return [...baseline, ...appState.userCustomWords];
        }}

        // Switch View Tabs
        function switchView(viewName) {{
            const secInput = document.getElementById('sec-input-view');
            const secSrs = document.getElementById('sec-srs-view');
            const secNotebook = document.getElementById('sec-notebook-view');

            const btnInput = document.getElementById('nav-btn-input');
            const btnSrs = document.getElementById('nav-btn-srs');
            const btnNotebook = document.getElementById('nav-btn-notebook');

            [secInput, secSrs, secNotebook].forEach(el => el.classList.add('hidden'));

            [btnInput, btnSrs, btnNotebook].forEach(btn => {{
                btn.className = "flex-1 py-1.5 px-2 rounded-lg text-slate-400 hover:text-white transition whitespace-nowrap";
            }});

            if (viewName === 'input') {{
                secInput.classList.remove('hidden');
                btnInput.className = "flex-1 py-1.5 px-2 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition whitespace-nowrap";
            }} else if (viewName === 'srs') {{
                secSrs.classList.remove('hidden');
                btnSrs.className = "flex-1 py-1.5 px-2 rounded-lg bg-indigo-900 font-bold text-white shadow-xs transition whitespace-nowrap";
                initSrsSession();
            }} else if (viewName === 'notebook') {{
                secNotebook.classList.remove('hidden');
                btnNotebook.className = "flex-1 py-1.5 px-2 rounded-lg bg-blue-600 font-bold text-white shadow-xs transition whitespace-nowrap";
                renderNotebookSheet();
            }}
        }}

        // Update Header & Badge Stats
        function updateHeaderCounters() {{
            const allWords = getAllWordsList();
            const today = getTodayStr();

            let dueCount = 0;
            let masteredCount = 0;

            allWords.forEach(w => {{
                const p = appState.cardProgress[w.id] || {{}};
                if (!p.dueDate || p.dueDate <= today) dueCount++;
                if (p.interval >= 15) masteredCount++;
            }});

            const badgeDue = document.getElementById('badge-due-count');
            if (badgeDue) badgeDue.innerText = dueCount;

            const statTotal = document.getElementById('stat-total-words');
            const statDue = document.getElementById('stat-due-words');
            const statMastered = document.getElementById('stat-mastered-words');

            if (statTotal) statTotal.innerText = allWords.length + " Từ";
            if (statDue) statDue.innerText = dueCount + " Từ";
            if (statMastered) statMastered.innerText = masteredCount + " Từ";
        }}

        // Live Lookup & Auto Fill
        function onHanziInputChange() {{
            const hz = document.getElementById('input-hanzi').value.trim();
            if (!hz) return;
            if (BUILTIN_DICTIONARY[hz]) {{
                autoLookupWord();
            }}
        }}

        function autoLookupWord() {{
            const hz = document.getElementById('input-hanzi').value.trim();
            if (!hz) {{
                showToast("⚠️ Vui lòng nhập Chữ Hán trước!");
                return;
            }}

            const entry = BUILTIN_DICTIONARY[hz];
            if (entry) {{
                document.getElementById('input-pinyin').value = entry.pinyin || '';
                document.getElementById('input-hanviet').value = entry.hanviet || '';
                document.getElementById('input-meaning').value = entry.meaning || '';
                document.getElementById('input-example').value = entry.example || `我用${{hz}}。(Wǒ yòng ${{entry.pinyin || 'zhe'}}.)`;
                showToast(`✨ Đã tự động tra thấy từ '${{hz}}'!`);
            }} else {{
                // Fallback smart defaults for custom word
                document.getElementById('input-pinyin').value = generateSimplePinyin(hz);
                document.getElementById('input-meaning').placeholder = "Nhập nghĩa tiếng Việt cho từ mới này...";
                document.getElementById('input-example').value = `${{hz}}。 (Ví dụ dùng từ ${{hz}}...)`;
                showToast(`💡 Đã tạo pinyin gợi ý cho từ '${{hz}}'! Vui lòng điền nghĩa.`);
            }}
        }}

        function fillSuggestion(hz) {{
            document.getElementById('input-hanzi').value = hz;
            autoLookupWord();
        }}

        function generateSimplePinyin(str) {{
            // Simple helper or fallback
            return "pīnyīn";
        }}

        // Save Custom Word from Form (NGÀY 2 TRỞ ĐI)
        function saveCustomWordFromForm() {{
            const hanzi = document.getElementById('input-hanzi').value.trim();
            const pinyin = document.getElementById('input-pinyin').value.trim();
            const hanviet = document.getElementById('input-hanviet').value.trim();
            const meaning = document.getElementById('input-meaning').value.trim();
            const example = document.getElementById('input-example').value.trim();

            if (!hanzi) {{
                showToast("⚠️ Vui lòng nhập Chữ Hán!");
                return;
            }}
            if (!meaning) {{
                showToast("⚠️ Vui lòng nhập Nghĩa Tiếng Việt!");
                return;
            }}

            const wordId = "custom-" + Date.now();
            const today = getTodayStr();

            const newWord = {{
                id: wordId,
                level: "Custom",
                day: appState.dayStep + 1,
                tag: `Chị Nạp • Ngày ${{appState.dayStep + 1}}`,
                hanzi: hanzi,
                pinyin: pinyin || "pīnyīn",
                pinyin_clean: (pinyin || "pinyin").toLowerCase().replace(/[^a-z]/g, ''),
                hanviet: hanviet || "",
                meaning: meaning,
                example: example || `${{hanzi}}。`,
                mnemonic: "Từ vựng do Chị tự nạp vào sổ tay ghi chép."
            }};

            // Append to custom words
            appState.userCustomWords.push(newWord);

            // Set initial SRS schedule
            appState.cardProgress[wordId] = {{
                interval: 1,
                easeFactor: 2.5,
                repetition: 0,
                dueDate: today,
                ticks: {{}}
            }};

            saveAppState();

            // Reset form
            document.getElementById('input-hanzi').value = '';
            document.getElementById('input-pinyin').value = '';
            document.getElementById('input-hanviet').value = '';
            document.getElementById('input-meaning').value = '';
            document.getElementById('input-example').value = '';

            // Confetti effect
            if (window.confetti) {{
                confetti({{ particleCount: 40, spread: 60, origin: {{ y: 0.7 }} }});
            }}

            showToast(`🎉 Đã nạp thành công từ '${{hanzi}}' vào bộ nhớ SRS!`);
        }}

        // SRS SM-2 Algorithm Calculation
        function calculateAnkiNextInterval(wordId, quality) {{
            let p = appState.cardProgress[wordId] || {{ interval: 0, easeFactor: 2.5, repetition: 0 }};
            let ef = p.easeFactor || 2.5;
            let rep = p.repetition || 0;
            let interval = p.interval || 0;

            if (quality === 1) {{ // Again (Quên)
                rep = 0;
                interval = 1;
                ef = Math.max(1.3, ef - 0.2);
            }} else if (quality === 2) {{ // Hard (Khó)
                rep += 1;
                interval = interval === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
                ef = Math.max(1.3, ef - 0.15);
            }} else if (quality === 3) {{ // Good (Tốt)
                rep += 1;
                if (interval === 0) interval = 1;
                else if (interval === 1) interval = 3;
                else interval = Math.round(interval * ef);
            }} else if (quality === 4) {{ // Easy (Dễ)
                rep += 1;
                if (interval === 0) interval = 2;
                else if (interval === 1) interval = 4;
                else interval = Math.round(interval * ef * 1.3);
                ef += 0.15;
            }}

            const d = new Date();
            d.setDate(d.getDate() + interval);
            const nextDueDate = d.toISOString().split('T')[0];

            return {{ interval, easeFactor: ef, repetition: rep, dueDate: nextDueDate, lastReviewed: getTodayStr() }};
        }}

        // SRS Flashcard Queue Controller
        function filterSrsQueue(mode) {{
            srsFilterMode = mode;
            const btnDue = document.getElementById('srs-btn-due');
            const btnAll = document.getElementById('srs-btn-all');
            if (mode === 'due') {{
                if (btnDue) btnDue.className = "px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-bold text-[11px] transition";
                if (btnAll) btnAll.className = "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] transition";
            }} else {{
                if (btnDue) btnDue.className = "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] transition";
                if (btnAll) btnAll.className = "px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-bold text-[11px] transition";
            }}
            initSrsSession();
        }}

        function initSrsSession() {{
            const allWords = getAllWordsList();
            const today = getTodayStr();

            if (srsFilterMode === 'due') {{
                srsQueue = allWords.filter(w => {{
                    const p = appState.cardProgress[w.id];
                    return !p || !p.dueDate || p.dueDate <= today;
                }});
                if (srsQueue.length === 0) srsQueue = allWords.slice(0, 15);
            }} else {{
                srsQueue = allWords;
            }}

            srsCurrentIdx = 0;
            renderSrsCard();
        }}

        function renderSrsCard() {{
            const box = document.getElementById('srs-card-box');
            if (!box) return;

            if (srsCurrentIdx >= srsQueue.length) {{
                box.innerHTML = `
                    <div class="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-md space-y-3 fade-in">
                        <div class="text-4xl">🎉</div>
                        <h3 class="text-base font-extrabold text-blue-900">Hoàn Thành Đợt Ôn SRS Hôm Nay!</h3>
                        <p class="text-xs text-slate-500">Tất cả các từ vựng đến hạn đã được cập nhật lịch ôn thông minh!</p>
                        <button onclick="initSrsSession()" class="px-5 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md">
                            🔄 Tiếp tục ôn lượt mới
                        </button>
                    </div>
                `;
                return;
            }}

            const word = srsQueue[srsCurrentIdx];
            const againVal = calculateAnkiNextInterval(word.id, 1).interval;
            const hardVal = calculateAnkiNextInterval(word.id, 2).interval;
            const goodVal = calculateAnkiNextInterval(word.id, 3).interval;
            const easyVal = calculateAnkiNextInterval(word.id, 4).interval;

            box.innerHTML = `
                <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-4 fade-in">
                    <div class="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                        <span class="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">${{word.tag || 'Từ Vựng'}}</span>
                        <span>Thẻ ${{srsCurrentIdx + 1}} / ${{srsQueue.length}}</span>
                    </div>

                    <div class="text-center py-4 space-y-2">
                        <div class="zh text-5xl font-black text-slate-900 tracking-wider flex items-center justify-center gap-2">
                            <span>${{word.hanzi}}</span>
                            <button onclick="playWordAudio('${{word.hanzi}}')" class="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 text-lg border border-blue-200 active:scale-95 transition">🔊</button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <input type="text" id="srs-typing-input" onkeyup="handleSrsTyping(event)" placeholder="✍️ Gõ Pinyin hoặc Chữ Hán để kiểm tra..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none text-center font-bold">
                    </div>

                    <div id="srs-card-back" class="space-y-3 pt-3 border-t border-slate-200">
                        <div class="text-center font-bold text-emerald-700 font-mono text-sm">${{word.pinyin}} ${{word.hanviet ? '(' + word.hanviet + ')' : ''}}</div>
                        <div class="bg-blue-50 p-2.5 rounded-xl text-xs font-bold text-blue-900 text-center">${{word.meaning}}</div>
                        ${{word.example ? `<div class="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700 border border-slate-200"><strong>💡 Ví dụ:</strong> ${{word.example}}</div>` : ''}}

                        <div class="space-y-1 pt-1">
                            <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block text-center">ĐÁNH GIÁ MỨC ĐỘ GHÍ NHỚ (THUẬT TOÁN SRS):</span>
                            <div class="grid grid-cols-4 gap-1.5">
                                <button onclick="rateSrsCard(1)" class="bg-rose-100 hover:bg-rose-200 text-rose-900 font-extrabold py-2 rounded-xl text-[10px] text-center border border-rose-300 active:scale-95 transition">
                                    🔴 Quên<br/><span class="text-[9px] opacity-80">${{againVal}} ngày</span>
                                </button>
                                <button onclick="rateSrsCard(2)" class="bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold py-2 rounded-xl text-[10px] text-center border border-amber-300 active:scale-95 transition">
                                    🟠 Khó<br/><span class="text-[9px] opacity-80">${{hardVal}} ngày</span>
                                </button>
                                <button onclick="rateSrsCard(3)" class="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 rounded-xl text-[10px] text-center border border-emerald-400 active:scale-95 transition">
                                    🟢 Tốt<br/><span class="text-[9px] opacity-90">${{goodVal}} ngày</span>
                                </button>
                                <button onclick="rateSrsCard(4)" class="bg-blue-900 hover:bg-blue-800 text-white font-extrabold py-2 rounded-xl text-[10px] text-center border border-blue-700 active:scale-95 transition">
                                    🔵 Dễ<br/><span class="text-[9px] opacity-90">${{easyVal}} ngày</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }}

        function handleSrsTyping(e) {{
            const input = e.target.value.trim().toLowerCase();
            const word = srsQueue[srsCurrentIdx];
            if (!input) return;
            const cleanTyped = input.replace(/[^a-z0-9]/g, '');
            if (cleanTyped === (word.pinyin_clean || '') || input === word.hanzi || e.key === 'Enter') {{
                const back = document.getElementById('srs-card-back');
                if (back) back.classList.remove('hidden');
            }}
        }}

        function rateSrsCard(quality) {{
            const word = srsQueue[srsCurrentIdx];
            if (word) {{
                const updatedSRS = calculateAnkiNextInterval(word.id, quality);
                appState.cardProgress[word.id] = updatedSRS;
                saveAppState();
            }}

            srsCurrentIdx++;
            renderSrsCard();
        }}

        // Render Claire Vu Notebook Sheet
        function toggleMask(type) {{
            appState.maskState[type] = !appState.maskState[type];
            ['pinyin', 'meaning', 'hanzi'].forEach(t => {{
                const btn = document.getElementById('btn-mask-' + (t === 'meaning' ? 'vi' : (t === 'pinyin' ? 'py' : 'hz')));
                if (btn) {{
                    if (appState.maskState[t]) {{
                        btn.className = "py-1 px-2 rounded-lg bg-blue-900 text-white font-bold border border-blue-900";
                    }} else {{
                        btn.className = "py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300";
                    }}
                }}
            }});
            renderNotebookSheet();
        }}

        function renderNotebookSheet() {{
            const container = document.getElementById('notebook-sheet-container');
            if (!container) return;

            const filterVal = document.getElementById('notebook-filter').value;
            let allWords = getAllWordsList();

            if (filterVal === 'hsk2-d1') {{
                allWords = allWords.filter(w => w.day === 1 || 'd1' in str(w.id));
            }} else if (filterVal === 'hsk1-review') {{
                allWords = allWords.filter(w => w.level === 'HSK 1');
            }} else if (filterVal === 'custom') {{
                allWords = allWords.filter(w => w.level === 'Custom' || String(w.id).startsWith('custom-'));
            }}

            const today = getTodayStr();

            container.innerHTML = allWords.map((w, idx) => {{
                const p = appState.cardProgress[w.id] || {{ ticks: {{}} }};
                const ticks = p.ticks || {{}};
                const isDue = !p.dueDate || p.dueDate <= today;

                return `
                    <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2.5">
                        <div class="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <div class="flex items-center gap-1.5">
                                <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${{w.tag || 'Từ Vựng'}}</span>
                                ${{isDue ? `<span class="text-[9px] bg-rose-100 text-rose-800 font-extrabold px-1.5 py-0.5 rounded-full">⚡ SRS Đến Hạn</span>` : `<span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Ôn lại sau ${{p.interval || 1}}d</span>`}}
                            </div>
                            <span class="text-[10px] text-slate-400 font-semibold">Từ ${{idx + 1}} / ${{allWords.length}}</span>
                        </div>

                        <!-- Active Recall Word Grid -->
                        <div class="grid grid-cols-3 gap-2 items-center text-center">
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">CHỮ HÁN</span>
                                <span class="zh text-xl font-black text-slate-900 ${{appState.maskState.hanzi ? 'hide-text' : ''}}">${{w.hanzi}}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">PINYIN</span>
                                <span class="text-xs font-bold text-emerald-700 font-mono ${{appState.maskState.pinyin ? 'hide-text' : ''}}">${{w.pinyin}}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <span class="text-[9px] text-slate-400 block font-bold">NGHĨA VIỆT</span>
                                <span class="text-xs font-bold text-blue-900 ${{appState.maskState.meaning ? 'hide-text' : ''}}">${{w.meaning}}</span>
                            </div>
                        </div>

                        ${{w.example ? `<div class="text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed"><strong>💡 Ví dụ:</strong> ${{w.example}}</div>` : ''}}

                        <!-- Spaced Repetition Milestones Checkboxes -->
                        <div class="space-y-1">
                            <span class="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block text-center">MỐC ÔN TẬP SRS (SPACED REPETITION):</span>
                            <div class="grid grid-cols-6 gap-1 text-center">
                                ${{[1, 2, 4, 7, 15, 30].map(day => `
                                    <button onclick="toggleTick('${{w.id}}', ${{day}})" class="py-1 rounded-lg text-[10px] font-extrabold transition active:scale-95 ${{ticks[day] ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'}}">
                                        ${{ticks[day] ? '✓' : ''}} D${{day}}
                                    </button>
                                `).join('')}}
                            </div>
                        </div>
                    </div>
                `;
            }}).join('');
        }}

        function toggleTick(wordId, day) {{
            let p = appState.cardProgress[wordId] || {{ ticks: {{}} }};
            if (!p.ticks) p.ticks = {{}};
            p.ticks[day] = !p.ticks[day];
            appState.cardProgress[wordId] = p;
            saveAppState();
            renderNotebookSheet();
        }}

        // Audio Speech Synth
        function playWordAudio(text) {{
            if ('speechSynthesis' in window) {{
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = 'zh-CN';
                utter.rate = 0.9;
                window.speechSynthesis.speak(utter);
            }}
        }}

        // Toast Notification
        function showToast(msg) {{
            const toast = document.getElementById('toast-notify');
            const msgEl = document.getElementById('toast-msg');
            if (!toast || !msgEl) return;
            msgEl.innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {{
                toast.classList.add('hidden');
            }}, 3000);
        }}

        // JSON Data Import / Export
        function exportDataJSON() {{
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `cece_srs_notebook_backup_${{getTodayStr()}}.json`);
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            dlAnchor.remove();
            showToast("📥 Đã xuất dữ liệu sao lưu JSON!");
        }}

        function triggerImportJSON() {{
            document.getElementById('import-json-file').click();
        }}

        function importDataJSON(e) {{
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {{
                try {{
                    const imported = JSON.parse(evt.target.result);
                    if (imported && imported.cardProgress) {{
                        appState = Object.assign(appState, imported);
                        saveAppState();
                        location.reload();
                    }} else {{
                        showToast("⚠️ Tệp JSON không đúng định dạng!");
                    }}
                }} catch(err) {{
                    showToast("⚠️ Lỗi đọc tệp JSON!");
                }}
            }};
            reader.readAsText(file);
        }}

        window.onload = function() {{
            loadAppState();
        }};
    </script>
</body>
</html>
"""

    out_path = '/Users/trangngo95/Desktop/HSK/srs_notebook_app.html'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_code)

    print(f"Successfully generated {out_path} ({len(html_code)} bytes)")

if __name__ == '__main__':
    generate_app()
