import json, os

def generate_app():
    db_path = '/Users/trangngo95/Desktop/HSK/srs_full_database.json'
    with open(db_path, 'r', encoding='utf-8') as f:
        full_db = json.load(f)

    # Day 1 HSK 2 Words (14 words)
    hsk2_d1_words = [x for x in full_db if x.get('day') == 1 or 'd1' in str(x.get('id'))]
    
    # HSK 1 baseline review words (10 words)
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

    # Add extra common words
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
    <title>Cece Notebook - Sổ Từ Vựng SRS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+SC:wght@400;600;700&family=Zhi+Mang+Xing&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #faf7f5;
            color: #2b2426;
            -webkit-tap-highlight-color: transparent;
        }}
        .font-hanzi {{ font-family: 'Noto Serif SC', serif; }}
        .font-calligraphy {{ font-family: 'Zhi Mang Xing', cursive; }}
        
        /* 3D Card Flip */
        .perspective-1000 {{ perspective: 1000px; }}
        .transform-style-3d {{ transform-style: preserve-3d; }}
        .backface-hidden {{ backface-visibility: hidden; -webkit-backface-visibility: hidden; }}
        .rotate-y-180 {{ transform: rotateY(180deg); }}

        .card-inner {{
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        .card-inner.flipped {{
            transform: rotateY(180deg);
        }}

        .fade-in {{
            animation: fadeIn 0.25s ease-in-out;
        }}
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(4px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        .hide-text {{ filter: blur(6px); user-select: none; transition: filter 0.2s; }}
        .hide-text:hover {{ filter: none; }}
        .scrollbar-none::-webkit-scrollbar {{ display: none; }}
        .scrollbar-none {{ -ms-overflow-style: none; scrollbar-width: none; }}
    </style>
</head>
<body class="bg-[#faf7f5] text-[#2b2426] selection:bg-[#ebdcd8] selection:text-[#2b2426] flex flex-col min-h-screen">

    <!-- App Wrapper Container -->
    <div id="app-root" class="flex-1 flex flex-col items-center justify-start w-full">
        
        <!-- Header Bar -->
        <header class="w-full bg-[#fcfbfa]/90 backdrop-blur-md border-b border-[#ece4e1] sticky top-0 z-30 transition-all">
            <div class="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
                
                <!-- Left Brand -->
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-[#935864] text-[#fdfaf9] flex items-center justify-center shadow-xs">
                        <span class="font-calligraphy text-lg">思</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-[#2b2426] tracking-tight text-sm">Cece Notebook</span>
                            <span class="text-[11px] text-[#786669] font-normal">Sổ từ vựng SRS</span>
                        </div>
                    </div>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2 sm:gap-2.5">
                    <button onclick="showInstallModal()" class="px-2.5 py-1.5 rounded-lg bg-[#8f525e] hover:bg-[#7b434f] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13v8l-4-4"></path><path d="m12 21 4-4"></path><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"></path></svg>
                        <span>Tải App</span>
                    </button>
                    
                    <div class="flex items-center gap-1.5 px-2 py-1 bg-[#f4ebe8] rounded-lg text-xs font-medium text-[#7d4e58] border border-[#e8dedb]">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#935864]"></span>
                        <span id="header-due-badge" class="tabular-nums font-semibold">24</span>
                        <span class="hidden xs:inline text-[#66424b]">cần ôn</span>
                    </div>

                    <button onclick="toggleViewMode()" id="btn-view-mode" title="Chuyển giữa khung di động & máy tính" class="px-2 py-1 rounded-lg border border-[#e3d8d5] text-[#5e5053] hover:text-[#2b2426] hover:bg-[#f6efed] text-xs font-medium transition-colors hidden sm:flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
                        <span id="view-mode-text">Di động</span>
                    </button>

                    <div class="flex items-center gap-1">
                        <button onclick="exportDataJSON()" title="Xuất file dữ liệu JSON" class="p-1.5 rounded-lg border border-[#e3d8d5] text-[#5e5053] hover:text-[#2b2426] hover:bg-[#f6efed] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
                        </button>
                        <button onclick="triggerImportJSON()" title="Nhập dữ liệu từ file JSON" class="p-1.5 rounded-lg border border-[#e3d8d5] text-[#5e5053] hover:text-[#2b2426] hover:bg-[#f6efed] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>
                        </button>
                        <input type="file" id="import-json-file" onchange="importDataJSON(event)" class="hidden" accept=".json">
                        
                        <button onclick="resetDay1Data()" title="Khôi phục 24 từ Ngày 1 chuẩn" class="p-1.5 rounded-lg border border-[#e3d8d5] text-[#736366] hover:text-[#935864] hover:bg-[#f6efed] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                        </button>
                    </div>
                </div>

            </div>
        </header>

        <!-- Main Workspace -->
        <main class="flex-1 flex flex-col items-center justify-start py-3 px-2 sm:px-4 w-full">
            <div id="content-container" class="w-full max-w-md transition-all duration-300 mx-auto flex flex-col">
                
                <!-- Floating Segmented Navigation Bar -->
                <div class="w-full bg-[#faf7f5]/90 border-b border-[#ebdcd8] p-1.5 sticky top-[53px] z-20 backdrop-blur-sm mb-2">
                    <div class="max-w-md mx-auto grid grid-cols-3 gap-1 p-1 bg-[#ede4e1]/70 rounded-xl border border-[#e5d8d4]">
                        <button onclick="switchView('input')" id="nav-btn-input" class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all text-[#6e5f62] hover:text-[#2b2426] font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#935864]"><path d="M13 21h8"></path><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg>
                            <span>Nạp Từ Mới</span>
                        </button>
                        <button onclick="switchView('srs')" id="nav-btn-srs" class="relative flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all bg-white text-[#2b2426] shadow-xs font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#935864]"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg>
                            <span>Ôn Tập SRS</span>
                            <span id="tab-due-badge" class="min-w-[16px] h-[16px] px-1 bg-[#935864] text-white rounded-full text-[9px] font-bold flex items-center justify-center tabular-nums">24</span>
                        </button>
                        <button onclick="switchView('notebook')" id="nav-btn-notebook" class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all text-[#6e5f62] hover:text-[#2b2426] font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#935864]"><path d="M10 2v8l3-3 3 3V2"></path><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path></svg>
                            <span>Sổ Từ</span>
                            <span id="tab-total-badge" class="text-[10px] text-[#8c7b7f] font-normal">(24)</span>
                        </button>
                    </div>
                </div>

                <!-- TAB 1: NẠP TỪ MỚI -->
                <div id="sec-input-view" class="space-y-4 fade-in hidden">
                    <div class="bg-white border border-[#e8dedb] rounded-2xl p-4 shadow-xs space-y-3.5">
                        <div class="flex items-center justify-between border-b border-[#f0e6e3] pb-2.5">
                            <div class="flex items-center gap-2">
                                <div class="w-6 h-6 rounded-lg bg-[#f4ebe8] text-[#935864] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                                </div>
                                <h2 class="text-xs font-bold text-[#2b2426] uppercase tracking-wider">NGÀY 2+: NẠP TỪ MỚI CỦA CHỊ</h2>
                            </div>
                            <span class="text-[10px] bg-[#f4ebe8] text-[#8a525f] font-semibold px-2 py-0.5 rounded-md border border-[#ebdcd8]">✨ Auto Lookup</span>
                        </div>

                        <p class="text-[11px] text-[#786669] leading-relaxed">
                            Nhập Chữ Hán từ mới chị học. Hệ thống sẽ tự động tra <strong>Pinyin, Nghĩa Việt & Ví dụ câu</strong> rồi lưu vào bộ nhớ SRS để lên lịch ôn!
                        </p>

                        <div class="space-y-3">
                            <div>
                                <label class="text-[10px] font-semibold text-[#6e5f62] block uppercase mb-1">1. Chữ Hán (Từ Mới):</label>
                                <div class="flex gap-2">
                                    <input type="text" id="input-hanzi" oninput="onHanziInputChange()" placeholder="Vd: 自行车, 准备, 咖啡..." class="flex-1 px-3 py-2 rounded-xl border border-[#e2d5d1] text-xs font-bold text-[#2b2426] bg-[#faf7f5] focus:outline-none focus:border-[#935864]">
                                    <button onclick="autoLookupWord()" class="px-3 py-2 bg-[#8f525e] hover:bg-[#7b434f] text-white font-semibold text-xs rounded-xl transition flex items-center gap-1 whitespace-nowrap shadow-2xs">
                                        ✨ Tra & Điền
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="text-[10px] font-semibold text-[#6e5f62] block uppercase mb-1">2. Pinyin:</label>
                                    <input type="text" id="input-pinyin" placeholder="Vd: zìxíngchē" class="w-full px-3 py-2 rounded-xl border border-[#e2d5d1] text-xs font-semibold text-[#7a4853] bg-[#faf7f5] outline-none">
                                </div>
                                <div>
                                    <label class="text-[10px] font-semibold text-[#6e5f62] block uppercase mb-1">3. Hán Việt:</label>
                                    <input type="text" id="input-hanviet" placeholder="Vd: Tự hành xa" class="w-full px-3 py-2 rounded-xl border border-[#e2d5d1] text-xs font-semibold text-[#2b2426] bg-[#faf7f5] outline-none">
                                </div>
                            </div>

                            <div>
                                <label class="text-[10px] font-semibold text-[#6e5f62] block uppercase mb-1">4. Nghĩa Tiếng Việt:</label>
                                <input type="text" id="input-meaning" placeholder="Vd: Xe đạp" class="w-full px-3 py-2 rounded-xl border border-[#e2d5d1] text-xs font-semibold text-[#2b2426] bg-[#faf7f5] outline-none">
                            </div>

                            <div>
                                <label class="text-[10px] font-semibold text-[#6e5f62] block uppercase mb-1">5. Ví Dụ Dùng Từ Đó (Chữ Hán + Dịch):</label>
                                <textarea id="input-example" rows="2" placeholder="Vd: 我骑自行车去学校。 (Wǒ qí zìxíngchē qù xuéxiào. - Tôi đi xe đạp đến trường.)" class="w-full px-3 py-2 rounded-xl border border-[#e2d5d1] text-xs text-[#2b2426] bg-[#faf7f5] outline-none"></textarea>
                            </div>
                        </div>

                        <div class="pt-1">
                            <button onclick="saveCustomWordFromForm()" class="w-full bg-[#8f525e] hover:bg-[#7b434f] text-white font-semibold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-2xs">
                                <span>💾 LƯU VÀO BỘ NHỚ & LÊN KẾ HOẠCH ÔN SRS 🚀</span>
                            </button>
                        </div>
                    </div>

                    <!-- Quick Suggestion Chips -->
                    <div class="bg-white border border-[#e8dedb] p-3 rounded-2xl space-y-2">
                        <span class="text-[10px] font-semibold text-[#786669] uppercase block">💡 Gợi Ý Từ HSK 2 Hay Gặp Để Nạp Nhanh:</span>
                        <div class="flex flex-wrap gap-1.5 text-xs font-medium">
                            <button onclick="fillSuggestion('自行车')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">🚲 自行车 (Xe đạp)</button>
                            <button onclick="fillSuggestion('羊肉')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">🥩 羊肉 (Thịt cừu)</button>
                            <button onclick="fillSuggestion('好吃')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">😋 好吃 (Ngon)</button>
                            <button onclick="fillSuggestion('游泳')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">🏊 游泳 (Bơi lội)</button>
                            <button onclick="fillSuggestion('生日')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">🎂 生日 (Sinh nhật)</button>
                            <button onclick="fillSuggestion('手机')" class="px-2.5 py-1 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1]">📱 手机 (Điện thoại)</button>
                        </div>
                    </div>
                </div>

                <!-- TAB 2: ÔN TẬP SRS (FLASHCARD DECK) -->
                <div id="sec-srs-view" class="space-y-4 fade-in">
                    
                    <!-- Sub-header & Progress -->
                    <div class="flex items-center justify-between text-xs text-[#736366]">
                        <div class="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#8a525f]"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg>
                            <span id="srs-card-counter">Thẻ 1 / 24</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span id="srs-tag-pill" class="text-[11px] text-[#8c7b7f]">HSK 2 · Day 1</span>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="w-full h-1 bg-[#ede4e1] rounded-full overflow-hidden">
                        <div id="srs-progress-bar" class="h-full bg-[#8f525e] transition-all duration-300 rounded-full" style="width: 4%;"></div>
                    </div>

                    <!-- Card Flip Container Box -->
                    <div id="srs-card-box" class="space-y-4"></div>

                </div>

                <!-- TAB 3: SỔ TỪ VỰNG (CLAIRE VU NOTEBOOK SHEET) -->
                <div id="sec-notebook-view" class="space-y-4 fade-in hidden">
                    
                    <!-- Active Recall Mask Controls -->
                    <div class="bg-white border border-[#e8dedb] p-3 rounded-2xl shadow-xs space-y-2">
                        <div class="flex items-center justify-between text-xs font-semibold text-[#2b2426]">
                            <span>👁️ Che/Hiện Để Tự Nhớ (Active Recall):</span>
                            <span class="text-[10px] text-[#7a4853] bg-[#f4ebe8] px-2 py-0.5 rounded-md border border-[#ebdcd8]">Bấm nút để lật</span>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5 text-xs font-medium">
                            <button onclick="toggleMask('pinyin')" id="btn-mask-py" class="py-1.5 px-2 rounded-xl bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1] transition-colors">👁️ Pinyin</button>
                            <button onclick="toggleMask('meaning')" id="btn-mask-vi" class="py-1.5 px-2 rounded-xl bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1] transition-colors">👁️ Nghĩa Việt</button>
                            <button onclick="toggleMask('hanzi')" id="btn-mask-hz" class="py-1.5 px-2 rounded-xl bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1] transition-colors">👁️ Chữ Hán</button>
                        </div>
                    </div>

                    <!-- Filter Dropdown -->
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-[#2b2426]">DANH MỤC LỌC TỪ:</span>
                        <select id="notebook-filter" onchange="renderNotebookSheet()" class="px-3 py-1.5 rounded-xl border border-[#e2d5d1] bg-white font-semibold text-[#8a525f] text-xs shadow-2xs outline-none">
                            <option value="all">★ Tất cả từ trong sổ vựng</option>
                            <option value="hsk2-d1">📌 HSK 2 • Ngày 1 (14 từ)</option>
                            <option value="hsk1-review">🔄 HSK 1 • Ôn Đầu Vào (10 từ)</option>
                            <option value="custom">✍️ Từ do Chị nạp mới</option>
                        </select>
                    </div>

                    <!-- Notebook List -->
                    <div id="notebook-sheet-container" class="space-y-3"></div>

                </div>

            </div>
        </main>

        <!-- Footer -->
        <footer class="w-full py-3.5 text-center text-xs text-[#786669] border-t border-[#ebdcd8] bg-[#fbf9f8] mt-auto">
            <p class="font-medium text-[11px] text-[#786669]">Cece SRS Notebook · 念念不忘，必有回响</p>
        </footer>
    </div>

    <!-- Toast Notification -->
    <div id="toast-notify" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2b2426] text-[#faf7f5] px-4 py-3 rounded-2xl shadow-2xl border border-[#8f525e] text-xs font-semibold hidden z-50 flex items-center gap-2 max-w-xs text-center transition">
        <span id="toast-msg">✅ Thao tác thành công!</span>
    </div>

    <script>
        const BUILTIN_DICTIONARY = {dict_json};
        const HSK2_DAY1_INIT = {hsk2_d1_json};
        const HSK1_BASELINE_INIT = {hsk1_baseline_json};

        let appState = {{
            dayStep: 1,
            userCustomWords: [],
            cardProgress: {{}},
            maskState: {{ pinyin: false, meaning: false, hanzi: false }},
            viewMode: 'mobile' // 'mobile' or 'wide'
        }};

        let srsQueue = [];
        let srsCurrentIdx = 0;
        let isCardFlipped = false;

        function getTodayStr() {{
            const d = new Date();
            return d.toISOString().split('T')[0];
        }}

        function saveAppState() {{
            try {{
                localStorage.setItem('cece_srs_notebook_app_v1', JSON.stringify(appState));
            }} catch(e) {{ console.error("Save error:", e); }}
            updateHeaderCounters();
        }}

        function loadAppState() {{
            try {{
                const saved = localStorage.getItem('cece_srs_notebook_app_v1');
                if (saved) {{
                    appState = Object.assign(appState, JSON.parse(saved));
                }} else {{
                    initDay1DefaultState();
                }}
            }} catch(e) {{
                initDay1DefaultState();
            }}
            applyViewModeUI();
            updateHeaderCounters();
        }}

        function initDay1DefaultState() {{
            appState.dayStep = 1;
            appState.userCustomWords = [];
            appState.cardProgress = {{}};
            const today = getTodayStr();

            HSK2_DAY1_INIT.forEach(w => {{
                appState.cardProgress[w.id] = {{
                    interval: 1,
                    easeFactor: 2.5,
                    repetition: 0,
                    dueDate: today,
                    ticks: {{}}
                }};
            }});

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
            if (confirm("Khôi phục về trạng thái Ngày 1 (14 từ HSK 2 Day 1 + 10 từ HSK 1 đầu vào)?")) {{
                localStorage.removeItem('cece_srs_notebook_app_v1');
                initDay1DefaultState();
                location.reload();
            }}
        }}

        function getAllWordsList() {{
            const baseline = [...HSK2_DAY1_INIT, ...HSK1_BASELINE_INIT];
            return [...baseline, ...appState.userCustomWords];
        }}

        function toggleViewMode() {{
            appState.viewMode = (appState.viewMode === 'wide') ? 'mobile' : 'wide';
            applyViewModeUI();
            saveAppState();
        }}

        function applyViewModeUI() {{
            const container = document.getElementById('content-container');
            const btnText = document.getElementById('view-mode-text');
            if (appState.viewMode === 'wide') {{
                if (container) {{
                    container.classList.remove('max-w-md');
                    container.classList.add('max-w-3xl');
                }}
                if (btnText) btnText.innerText = "Máy tính";
            }} else {{
                if (container) {{
                    container.classList.remove('max-w-3xl');
                    container.classList.add('max-w-md');
                }}
                if (btnText) btnText.innerText = "Di động";
            }}
        }}

        function switchView(viewName) {{
            const secInput = document.getElementById('sec-input-view');
            const secSrs = document.getElementById('sec-srs-view');
            const secNotebook = document.getElementById('sec-notebook-view');

            const btnInput = document.getElementById('nav-btn-input');
            const btnSrs = document.getElementById('nav-btn-srs');
            const btnNotebook = document.getElementById('nav-btn-notebook');

            [secInput, secSrs, secNotebook].forEach(el => el.classList.add('hidden'));

            [btnInput, btnSrs, btnNotebook].forEach(btn => {{
                btn.className = "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all text-[#6e5f62] hover:text-[#2b2426] font-medium";
            }});

            if (viewName === 'input') {{
                secInput.classList.remove('hidden');
                btnInput.className = "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all bg-white text-[#2b2426] shadow-xs font-semibold";
            }} else if (viewName === 'srs') {{
                secSrs.classList.remove('hidden');
                btnSrs.className = "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all bg-white text-[#2b2426] shadow-xs font-semibold";
                initSrsSession();
            }} else if (viewName === 'notebook') {{
                secNotebook.classList.remove('hidden');
                btnNotebook.className = "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs transition-all bg-white text-[#2b2426] shadow-xs font-semibold";
                renderNotebookSheet();
            }}
        }}

        function updateHeaderCounters() {{
            const allWords = getAllWordsList();
            const today = getTodayStr();
            let dueCount = 0;

            allWords.forEach(w => {{
                const p = appState.cardProgress[w.id] || {{}};
                if (!p.dueDate || p.dueDate <= today) dueCount++;
            }});

            const badgeHeader = document.getElementById('header-due-badge');
            const badgeTabDue = document.getElementById('tab-due-badge');
            const badgeTabTotal = document.getElementById('tab-total-badge');

            if (badgeHeader) badgeHeader.innerText = dueCount;
            if (badgeTabDue) badgeTabDue.innerText = dueCount;
            if (badgeTabTotal) badgeTabTotal.innerText = `(${{allWords.length}})`;
        }}

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
                showToast("⚠️ Vui lòng nhập Chữ Hán!");
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
                document.getElementById('input-pinyin').value = "pīnyīn";
                document.getElementById('input-meaning').placeholder = "Nhập nghĩa tiếng Việt cho từ mới này...";
                document.getElementById('input-example').value = `${{hz}}。 (Ví dụ dùng từ ${{hz}}...)`;
                showToast(`💡 Đã tạo pinyin gợi ý cho từ '${{hz}}'! Vui lòng điền nghĩa.`);
            }}
        }}

        function fillSuggestion(hz) {{
            document.getElementById('input-hanzi').value = hz;
            autoLookupWord();
        }}

        function saveCustomWordFromForm() {{
            const hanzi = document.getElementById('input-hanzi').value.trim();
            const pinyin = document.getElementById('input-pinyin').value.trim();
            const hanviet = document.getElementById('input-hanviet').value.trim();
            const meaning = document.getElementById('input-meaning').value.trim();
            const example = document.getElementById('input-example').value.trim();

            if (!hanzi || !meaning) {{
                showToast("⚠️ Vui lòng nhập Chữ Hán và Nghĩa tiếng Việt!");
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
                example: example || `${{hanzi}}。`
            }};

            appState.userCustomWords.push(newWord);
            appState.cardProgress[wordId] = {{
                interval: 1,
                easeFactor: 2.5,
                repetition: 0,
                dueDate: today,
                ticks: {{}}
            }};

            saveAppState();

            document.getElementById('input-hanzi').value = '';
            document.getElementById('input-pinyin').value = '';
            document.getElementById('input-hanviet').value = '';
            document.getElementById('input-meaning').value = '';
            document.getElementById('input-example').value = '';

            if (window.confetti) confetti({{ particleCount: 35, spread: 50, origin: {{ y: 0.7 }} }});
            showToast(`🎉 Đã nạp thành công từ '${{hanzi}}'!`);
        }}

        function calculateAnkiNextInterval(wordId, quality) {{
            let p = appState.cardProgress[wordId] || {{ interval: 0, easeFactor: 2.5, repetition: 0 }};
            let ef = p.easeFactor || 2.5;
            let rep = p.repetition || 0;
            let interval = p.interval || 0;

            if (quality === 1) {{
                rep = 0; interval = 1; ef = Math.max(1.3, ef - 0.2);
            }} else if (quality === 2) {{
                rep += 1; interval = (interval <= 1) ? 1 : Math.round(interval * 1.2); ef = Math.max(1.3, ef - 0.15);
            }} else if (quality === 3) {{
                rep += 1; interval = (interval <= 1) ? 3 : Math.round(interval * ef);
            }} else if (quality === 4) {{
                rep += 1; interval = (interval <= 1) ? 3 : Math.round(interval * ef * 1.3); ef += 0.15;
            }}

            const d = new Date();
            d.setDate(d.getDate() + interval);
            const nextDueDate = d.toISOString().split('T')[0];

            return {{ interval, easeFactor: ef, repetition: rep, dueDate: nextDueDate, lastReviewed: getTodayStr() }};
        }}

        function initSrsSession() {{
            const allWords = getAllWordsList();
            const today = getTodayStr();

            srsQueue = allWords.filter(w => {{
                const p = appState.cardProgress[w.id];
                return !p || !p.dueDate || p.dueDate <= today;
            }});

            if (srsQueue.length === 0) srsQueue = allWords;

            srsCurrentIdx = 0;
            isCardFlipped = false;
            renderSrsCard();
        }}

        function flipCard() {{
            const inner = document.getElementById('card-inner-box');
            if (inner) {{
                isCardFlipped = !isCardFlipped;
                if (isCardFlipped) inner.classList.add('flipped');
                else inner.classList.remove('flipped');
            }}
        }}

        function renderSrsCard() {{
            const box = document.getElementById('srs-card-box');
            const counter = document.getElementById('srs-card-counter');
            const tagPill = document.getElementById('srs-tag-pill');
            const progressBar = document.getElementById('srs-progress-bar');

            if (!box) return;

            if (srsCurrentIdx >= srsQueue.length) {{
                box.innerHTML = `
                    <div class="bg-white rounded-2xl p-6 text-center border border-[#e8dedb] shadow-xs space-y-3 fade-in">
                        <div class="text-4xl">🎉</div>
                        <h3 class="text-base font-bold text-[#2b2426]">Hoàn Thành Đợt Ôn SRS Hôm Nay!</h3>
                        <p class="text-xs text-[#786669]">Tất cả từ vựng đến hạn đã được cập nhật lịch ôn thông minh!</p>
                        <button onclick="initSrsSession()" class="px-5 py-2.5 bg-[#8f525e] text-white font-semibold text-xs rounded-xl shadow-2xs">
                            🔄 Ôn lại từ đầu
                        </button>
                    </div>
                `;
                return;
            }}

            const word = srsQueue[srsCurrentIdx];
            const p = appState.cardProgress[word.id] || {{ easeFactor: 2.5, repetition: 0 }};

            if (counter) counter.innerText = `Thẻ ${{srsCurrentIdx + 1}} / ${{srsQueue.length}}`;
            if (tagPill) tagPill.innerText = word.tag || "HSK 2 · Day 1";
            if (progressBar) progressBar.style.width = `${{((srsCurrentIdx + 1) / srsQueue.length) * 100}}%`;

            isCardFlipped = false;

            box.innerHTML = `
                <!-- 3D Flip Card Container -->
                <div class="perspective-1000 w-full min-h-[300px]">
                    <div id="card-inner-box" onclick="flipCard()" class="card-inner w-full min-h-[300px] relative transform-style-3d cursor-pointer select-none rounded-2xl shadow-xs border border-[#e8dedb] hover:border-[#dbcac5]">
                        
                        <!-- Front Face -->
                        <div class="absolute inset-0 w-full h-full bg-white rounded-2xl p-6 flex flex-col justify-between backface-hidden">
                            <div class="flex items-center justify-between text-xs text-[#8c7b7f]">
                                <span class="font-medium text-[#7a4853]">${{word.tag || 'Từ Vựng'}}</span>
                                <button type="button" onclick="event.stopPropagation(); playWordAudio('${{word.hanzi}}');" class="w-7 h-7 rounded-lg bg-[#faf7f5] hover:bg-[#ede5e2] text-[#8a525f] flex items-center justify-center transition-colors border border-[#ebdcd8]" title="Nghe phát âm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>
                                </button>
                            </div>
                            
                            <div class="text-center py-5">
                                <h1 class="text-5xl font-hanzi font-bold text-[#2b2426] tracking-wider">${{word.hanzi}}</h1>
                                <p class="text-xs text-[#8c7b7f] mt-4 flex items-center justify-center gap-1">
                                    <span>Chạm thẻ để lật xem Pinyin & Nghĩa</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#9c8b8f]"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
                                </p>
                            </div>

                            <div class="flex items-center justify-between text-[11px] text-[#8c7b7f] border-t border-[#f2eae7] pt-2.5">
                                <span>Độ nhớ: EF ${{p.easeFactor || 2.5}}</span>
                                <span>Đã lặp: ${{p.repetition || 0}} lần</span>
                            </div>
                        </div>

                        <!-- Back Face -->
                        <div class="absolute inset-0 w-full h-full bg-[#fdfbf9] rounded-2xl p-6 flex flex-col justify-between rotate-y-180 backface-hidden border border-[#e8dedb]">
                            <div class="flex items-center justify-between text-xs text-[#5c4f52]">
                                <div class="flex items-center gap-2">
                                    <span class="text-xl font-hanzi font-bold text-[#2b2426]">${{word.hanzi}}</span>
                                    <button type="button" onclick="event.stopPropagation(); playWordAudio('${{word.hanzi}}');" class="p-1 rounded text-[#8a525f] hover:bg-[#ede5e2]" title="Nghe lại">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>
                                    </button>
                                </div>
                                <span class="text-xs font-semibold text-[#8a525f] bg-[#f4ebe8] px-2 py-0.5 rounded-md font-sans border border-[#ebdcd8]">${{word.pinyin}}</span>
                            </div>

                            <div class="space-y-2 py-1">
                                <div>
                                    <span class="text-[10px] font-medium text-[#8c7b7f] uppercase tracking-wider">Nghĩa tiếng Việt</span>
                                    <p class="text-sm font-semibold text-[#2b2426] leading-snug mt-0.5">${{word.meaning}}</p>
                                    ${{word.hanviet ? `<p class="text-[11px] text-[#7a4853] font-medium mt-0.5">Hán Việt: ${{word.hanviet.toUpperCase()}}</p>` : ''}}
                                </div>

                                ${{word.example ? `
                                    <div class="p-2.5 bg-white rounded-xl border border-[#ebdcd8] text-xs">
                                        <div class="flex items-center justify-between text-[10px] text-[#8c7b7f] mb-1">
                                            <span>Ví dụ</span>
                                            <button type="button" onclick="event.stopPropagation(); playWordAudio('${{word.example.split('(')[0]}}');" class="text-[#8a525f] hover:text-[#2b2426]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>
                                            </button>
                                        </div>
                                        <p class="font-hanzi text-[#2b2426] text-xs">${{word.example}}</p>
                                    </div>
                                ` : ''}}
                            </div>

                            <div class="text-center text-[10px] text-[#8c7b7f] border-t border-[#ebdcd8] pt-2">
                                <span>Đánh giá độ nhớ bên dưới để SRS lên lịch ôn</span>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Recall Test Bar -->
                <div class="bg-white border border-[#e8dedb] rounded-xl p-2.5 shadow-2xs">
                    <form onsubmit="handleRecallTest(event)" class="flex items-center gap-2">
                        <input id="srs-typing-input" placeholder="Gõ Pinyin hoặc Nghĩa để thử phản xạ..." class="flex-1 text-xs px-3 py-1.5 bg-[#faf7f5] rounded-lg border border-[#e2d5d1] focus:outline-none focus:border-[#8a525f] text-[#2b2426]" type="text">
                        <button type="submit" class="px-3 py-1.5 bg-[#faf7f5] hover:bg-[#ede5e2] text-[#4a3e41] text-xs font-medium rounded-lg border border-[#e2d5d1] transition-colors whitespace-nowrap">Thử</button>
                    </form>
                </div>

                <!-- SM-2 Rating Bar (4 Soft Pastel Buttons) -->
                <div class="pt-1">
                    <span class="block text-center text-[11px] font-medium text-[#786669] mb-1.5">Đánh giá trí nhớ (Thuật toán SM-2)</span>
                    <div class="grid grid-cols-4 gap-1.5">
                        <button onclick="rateSrsCard(1)" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#f7edeb] hover:bg-[#f2e1df] border border-[#ebd3cf] text-[#803838] transition-all active:scale-95 shadow-2xs">
                            <span class="text-xs font-semibold">Quên</span>
                            <span class="text-[10px] text-[#9c5050] font-normal mt-0.5">+1d</span>
                        </button>
                        <button onclick="rateSrsCard(2)" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#f7f1e9] hover:bg-[#efe6d8] border border-[#eddcc9] text-[#7d5027] transition-all active:scale-95 shadow-2xs">
                            <span class="text-xs font-semibold">Khó</span>
                            <span class="text-[10px] text-[#916238] font-normal mt-0.5">+1d</span>
                        </button>
                        <button onclick="rateSrsCard(3)" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#edf3ef] hover:bg-[#dfede3] border border-[#cfdfd4] text-[#34543f] transition-all active:scale-95 shadow-2xs">
                            <span class="text-xs font-semibold">Tốt</span>
                            <span class="text-[10px] text-[#41694f] font-normal mt-0.5">+3d</span>
                        </button>
                        <button onclick="rateSrsCard(4)" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#edf2f6] hover:bg-[#deebf2] border border-[#cedde6] text-[#344b5c] transition-all active:scale-95 shadow-2xs">
                            <span class="text-xs font-semibold">Dễ</span>
                            <span class="text-[10px] text-[#446075] font-normal mt-0.5">+3d</span>
                        </button>
                    </div>
                </div>
            `;
        }}

        function handleRecallTest(e) {{
            e.preventDefault();
            const input = document.getElementById('srs-typing-input').value.trim().toLowerCase();
            const word = srsQueue[srsCurrentIdx];
            if (!input) return;
            const cleanTyped = input.replace(/[^a-z0-9]/g, '');
            if (cleanTyped === (word.pinyin_clean || '') || input === word.hanzi || word.meaning.toLowerCase().includes(input)) {{
                showToast("✨ Chính xác! Thẻ đã lật.");
                flipCard();
            }} else {{
                showToast("💡 Chưa chính xác, hãy lật xem nghĩa.");
                flipCard();
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

        function toggleMask(type) {{
            appState.maskState[type] = !appState.maskState[type];
            ['pinyin', 'meaning', 'hanzi'].forEach(t => {{
                const btn = document.getElementById('btn-mask-' + (t === 'meaning' ? 'vi' : (t === 'pinyin' ? 'py' : 'hz')));
                if (btn) {{
                    if (appState.maskState[t]) {{
                        btn.className = "py-1.5 px-2 rounded-xl bg-[#8f525e] text-white font-semibold transition-colors";
                    }} else {{
                        btn.className = "py-1.5 px-2 rounded-xl bg-[#faf7f5] hover:bg-[#ede5e2] text-[#2b2426] border border-[#e2d5d1] transition-colors";
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
                allWords = allWords.filter(w => w.day === 1 || (w.id && String(w.id).includes('d1')));
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
                    <div class="bg-white rounded-2xl p-3.5 border border-[#e8dedb] shadow-2xs space-y-2.5">
                        <div class="flex items-center justify-between border-b border-[#f2eae7] pb-1.5">
                            <div class="flex items-center gap-1.5">
                                <span class="text-[10px] font-semibold bg-[#f4ebe8] text-[#7d4e58] px-2 py-0.5 rounded-md border border-[#ebdcd8]">${{w.tag || 'Từ Vựng'}}</span>
                                ${{isDue ? `<span class="text-[9px] bg-[#f7edeb] text-[#803838] font-bold px-1.5 py-0.5 rounded-md">⚡ Đến Hạn</span>` : `<span class="text-[9px] bg-[#edf3ef] text-[#34543f] font-semibold px-1.5 py-0.5 rounded-md">Ôn sau ${{p.interval || 1}}d</span>`}}
                            </div>
                            <span class="text-[10px] text-[#8c7b7f]">Từ ${{idx + 1}} / ${{allWords.length}}</span>
                        </div>

                        <div class="grid grid-cols-3 gap-2 items-center text-center">
                            <div class="bg-[#faf7f5] p-2 rounded-xl border border-[#e8dedb]">
                                <span class="text-[9px] text-[#8c7b7f] block font-semibold">CHỮ HÁN</span>
                                <span class="font-hanzi text-xl font-bold text-[#2b2426] ${{appState.maskState.hanzi ? 'hide-text' : ''}}">${{w.hanzi}}</span>
                            </div>
                            <div class="bg-[#faf7f5] p-2 rounded-xl border border-[#e8dedb]">
                                <span class="text-[9px] text-[#8c7b7f] block font-semibold">PINYIN</span>
                                <span class="text-xs font-semibold text-[#8a525f] ${{appState.maskState.pinyin ? 'hide-text' : ''}}">${{w.pinyin}}</span>
                            </div>
                            <div class="bg-[#faf7f5] p-2 rounded-xl border border-[#e8dedb]">
                                <span class="text-[9px] text-[#8c7b7f] block font-semibold">NGHĨA VIỆT</span>
                                <span class="text-xs font-semibold text-[#2b2426] ${{appState.maskState.meaning ? 'hide-text' : ''}}">${{w.meaning}}</span>
                            </div>
                        </div>

                        ${{w.example ? `<div class="text-[11px] text-[#5e5053] bg-[#faf7f5] p-2.5 rounded-xl border border-[#e8dedb] leading-relaxed"><strong>💡 Ví dụ:</strong> ${{w.example}}</div>` : ''}}

                        <div class="space-y-1">
                            <span class="text-[9px] font-semibold text-[#8c7b7f] uppercase block text-center">MỐC ÔN SPACED REPETITION:</span>
                            <div class="grid grid-cols-6 gap-1 text-center">
                                ${{[1, 2, 4, 7, 15, 30].map(day => `
                                    <button onclick="toggleTick('${{w.id}}', ${{day}})" class="py-1 rounded-lg text-[10px] font-semibold transition active:scale-95 ${{ticks[day] ? 'bg-[#8f525e] text-white shadow-2xs' : 'bg-[#faf7f5] text-[#736366] hover:bg-[#ede5e2] border border-[#e2d5d1]'}}">
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

        function playWordAudio(text) {{
            if ('speechSynthesis' in window) {{
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = 'zh-CN';
                utter.rate = 0.9;
                window.speechSynthesis.speak(utter);
            }}
        }}

        function showToast(msg) {{
            const toast = document.getElementById('toast-notify');
            const msgEl = document.getElementById('toast-msg');
            if (!toast || !msgEl) return;
            msgEl.innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {{ toast.classList.add('hidden'); }}, 3000);
        }}

        function showInstallModal() {{
            alert(`📲 CHỈ DẪN THÊM APP VÀO MÀN HÌNH CHÍNH:\n\n- iPhone (Safari): Bấm Nút Chia sẻ (Share) ➔ Chọn 'Thêm vào Màn hình chính' (Add to Home Screen).\n- Android (Chrome): Bấm Menu 3 chấm ➔ Chọn 'Thêm vào Màn hình chính'.`);
        }}

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
                    }} else {{ showToast("⚠️ Tệp JSON không đúng định dạng!"); }}
                }} catch(err) {{ showToast("⚠️ Lỗi đọc tệp JSON!"); }}
            }};
            reader.readAsText(file);
        }}

        window.onload = function() {{
            loadAppState();
            initSrsSession();
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
