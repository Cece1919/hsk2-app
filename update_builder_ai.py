import json, os, re

builder_path = '/Users/trangngo95/Desktop/HSK/build_srs_notebook_app.py'

with open(builder_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add pinyin-pro CDN script in head
if 'pinyin-pro' not in code:
    code = code.replace(
        '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.19.6/dist/index.js"></script>'
    )

# 2. Add AI Key Modal in HTML body before </body>
ai_key_modal_html = """
    <!-- AI Config Modal -->
    <div id="ai-key-modal" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="bg-white rounded-2xl p-5 border border-[#e8dedb] shadow-2xl max-w-sm w-full space-y-3.5 fade-in">
            <div class="flex items-center justify-between border-b border-[#f0e6e3] pb-2">
                <div class="flex items-center gap-2">
                    <span class="text-xl">🤖</span>
                    <h3 class="text-sm font-bold text-[#2b2426]">Cấu Hình AI Gemini (Tùy Chọn)</h3>
                </div>
                <button onclick="closeAiKeyModal()" class="text-[#8c7b7f] hover:text-[#2b2426] text-lg font-bold">✕</button>
            </div>
            
            <p class="text-xs text-[#786669] leading-relaxed">
                App đã tích hợp sẵn <strong>Bộ Tra Cứu AI Tự Động Miễn Phí</strong> (PinyinPro + Dịch tự động + Ví dụ). 
                Nếu chị muốn dùng <strong>Gemini AI nâng cao</strong>, chị có thể dán Gemini API Key vào bên dưới:
            </p>

            <div class="space-y-2 text-xs">
                <div>
                    <label class="font-semibold text-[#6e5f62] block mb-1">Gemini API Key:</label>
                    <input type="password" id="input-gemini-key" placeholder="AIzaSy..." class="w-full px-3 py-2 rounded-xl border border-[#e2d5d1] text-[#2b2426] bg-[#faf7f5] focus:outline-none font-mono">
                </div>
            </div>

            <div class="flex justify-end gap-2 pt-2">
                <button onclick="clearAiKey()" class="px-3 py-1.5 bg-[#faf7f5] hover:bg-[#ede5e2] text-[#8a525f] font-semibold text-xs rounded-xl border border-[#e2d5d1]">Xóa Key</button>
                <button onclick="saveAiKey()" class="px-4 py-1.5 bg-[#8f525e] hover:bg-[#7b434f] text-white font-semibold text-xs rounded-xl shadow-2xs">Lưu Key AI</button>
            </div>
        </div>
    </div>
"""

if 'ai-key-modal' not in code:
    code = code.replace('<!-- Edit Word Modal -->', ai_key_modal_html + '\n    <!-- Edit Word Modal -->')

# 3. Update Tab 1 Header & Button to reflect AI Tra & Điền
old_tab_header = '<span class="text-[10px] bg-[#f4ebe8] text-[#8a525f] font-semibold px-2 py-0.5 rounded-md border border-[#ebdcd8]">✨ Auto Lookup</span>'
new_tab_header = '''<div class="flex items-center gap-1">
                                <button onclick="openAiKeyModal()" class="text-[10px] bg-[#f4ebe8] text-[#8a525f] hover:bg-[#ebdcd8] font-semibold px-2 py-0.5 rounded-md border border-[#ebdcd8] transition" title="Cấu hình Gemini Key (Tùy chọn)">🔑 Key AI</button>
                                <span class="text-[10px] bg-[#f4ebe8] text-[#8a525f] font-semibold px-2 py-0.5 rounded-md border border-[#ebdcd8]">🤖 Auto AI Lookup</span>
                            </div>'''

if old_tab_header in code:
    code = code.replace(old_tab_header, new_tab_header)

old_lookup_btn = '''<button onclick="autoLookupWord()" class="px-3 py-2 bg-[#8f525e] hover:bg-[#7b434f] text-white font-semibold text-xs rounded-xl transition flex items-center gap-1 whitespace-nowrap shadow-2xs">
                                        ✨ Tra & Điền
                                    </button>'''

new_lookup_btn = '''<button id="btn-ai-lookup" onclick="autoLookupWord()" class="px-3 py-2 bg-[#8f525e] hover:bg-[#7b434f] text-white font-semibold text-xs rounded-xl transition flex items-center gap-1 whitespace-nowrap shadow-2xs">
                                        🤖 Tra & Điền AI
                                    </button>'''

if old_lookup_btn in code:
    code = code.replace(old_lookup_btn, new_lookup_btn)

# 4. Generate HÁN VIỆT MAP & JS AI Functions
hv_dict = {
    '自': 'Tự', '行': 'Hành', '车': 'Xa', '羊': 'Dương', '肉': 'Nhục', '好': 'Hảo', '吃': 'Cật',
    '面': 'Miến', '条': 'Điều', '打': 'Đả', '篮': 'Lam', '球': 'Cầu', '游': 'Du', '泳': 'Vịnh',
    '经': 'Kinh', '常': 'Thường', '公': 'Công', '斤': 'Cân', '姐': 'Tỷ', '生': 'Sinh', '日': 'Nhật',
    '快': 'Khoái', '乐': 'Lạc', '送': 'Tống', '礼': 'Lễ', '物': 'Vật', '晚': 'Vãn', '上': 'Thượng',
    '蛋': 'Đản', '糕': 'Cao', '问': 'Vấn', '非': 'Phi', '常': 'Thường', '开': 'Khai', '始': 'Thủy',
    '希': 'Hy', '望': 'Vọng', '手': 'Thủ', '机': 'Cơ', '学': 'Học', '习': 'Tập', '咖': 'Cà',
    '啡': 'Phê', '牛': 'Ngưu', '奶': 'Nãi', '苹': 'Bình', '果': 'Quả', '尴': 'Giam', '尬': 'Giới',
    '考': 'Khảo', '虑': 'Lự', '努': 'Nỗ', '力': 'Lực', '经': 'Kinh', '验': 'Nghiệm', '明': 'Minh',
    '确': 'Xác', '隐': 'Ẩn', '藏': 'Tàng', '模': 'Mô', '糊': 'Hồ', '意': 'Ý', '思': 'Tư',
    '欢': 'Hoan', '迎': 'Nghênh', '希': 'Hy', '望': 'Vọng', '整': 'Chỉnh', '理': 'Lý', '告': 'Cáo',
    '诉': 'Tố', '朋': 'Bằng', '友': 'Hữu', '商': 'Thương', '场': 'Trường', '医': 'Y', '院': 'Viện',
    '教': 'Giáo', '室': 'Thất', '机': 'Cơ', '场': 'Trường', '火': 'Hỏa', '站': 'Trạm', '门': 'Môn',
    '说': 'Thuyết', '话': 'Thoại', '看': 'Khán', '书': 'Thư', '听': 'Thính', '音': 'Âm', '写': 'Tả',
    '字': 'Tự', '买': 'Mại', '卖': 'Mại', '少': 'Thiểu', '多': 'Đa', '大': 'Đại', '小': 'Tiểu',
    '冷': 'Lãnh', '热': 'Nhiệt', '高': 'Cao', '矮': 'Ải', '长': 'Trường', '短': 'Đoản', '新': 'Tân',
    '旧': 'Cựu', '贵': 'Quý', '贱': 'Tiện', '近': 'Cận', '远': 'Viễn', '错': 'Thác', '对': 'Đối'
}

db_path = '/Users/trangngo95/Desktop/HSK/srs_full_database.json'
if os.path.exists(db_path):
    with open(db_path, 'r', encoding='utf-8') as f:
        full_db = json.load(f)
    for item in full_db:
        hz = item.get('hanzi', '')
        hv = item.get('hanviet', '')
        if hz and hv:
            w_hz = list(hz)
            w_hv = hv.split()
            if len(w_hz) == len(w_hv):
                for c, v in zip(w_hz, w_hv):
                    hv_dict[c] = v.capitalize()

hv_map_json = json.dumps(hv_dict, ensure_ascii=False)

ai_lookup_js = f"""
        const HANVIET_MAP = {hv_map_json};

        function getHanViet(hz) {{
            if (BUILTIN_DICTIONARY[hz] && BUILTIN_DICTIONARY[hz].hanviet) {{
                return BUILTIN_DICTIONARY[hz].hanviet;
            }}
            let res = [];
            for (let char of hz) {{
                if (HANVIET_MAP[char]) {{
                    res.push(HANVIET_MAP[char]);
                }}
            }}
            return res.length > 0 ? res.join(' ') : '';
        }}

        function openAiKeyModal() {{
            const modal = document.getElementById('ai-key-modal');
            const keyInput = document.getElementById('input-gemini-key');
            if (keyInput) {{
                keyInput.value = localStorage.getItem('cece_gemini_api_key') || '';
            }}
            if (modal) modal.classList.remove('hidden');
        }}

        function closeAiKeyModal() {{
            const modal = document.getElementById('ai-key-modal');
            if (modal) modal.classList.add('hidden');
        }}

        function saveAiKey() {{
            const keyInput = document.getElementById('input-gemini-key');
            const val = keyInput ? keyInput.value.trim() : '';
            if (val) {{
                localStorage.setItem('cece_gemini_api_key', val);
                showToast("🔑 Đã lưu Gemini API Key!");
            }} else {{
                localStorage.removeItem('cece_gemini_api_key');
                showToast("ℹ️ Đã sử dụng Bộ AI Tự Động Miễn Phí!");
            }}
            closeAiKeyModal();
        }}

        function clearAiKey() {{
            localStorage.removeItem('cece_gemini_api_key');
            const keyInput = document.getElementById('input-gemini-key');
            if (keyInput) keyInput.value = '';
            showToast("ℹ️ Đã xóa Key, chuyển sang Bộ AI Miễn Phí!");
            closeAiKeyModal();
        }}

        async function queryGeminiAi(hz, apiKey) {{
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${{apiKey}}`;
            const prompt = `Bạn là trợ lý giảng dạy tiếng Trung HSK. Với từ chữ Hán "${{hz}}", hãy trả về duy nhất một chuỗi JSON hợp lệ (không chứa markdown \`\`\`json) với định dạng:
{{
  "pinyin": "phiên âm có dấu thanh chuẩn, viết liền (ví dụ: píngguǒ)",
  "hanviet": "Âm Hán Việt (ví dụ: Bình quả)",
  "meaning": "Nghĩa tiếng Việt ngắn gọn (ví dụ: Quả táo)",
  "example": "Một câu ví dụ bằng chữ Hán kèm (Pinyin - Dịch nghĩa tiếng Việt)"
}}`;

            const res = await fetch(url, {{
                method: "POST",
                headers: {{ "Content-Type": "application/json" }},
                body: JSON.stringify({{
                    contents: [{{ parts: [{{ text: prompt }}] }}]
                }})
            }});

            if (!res.ok) throw new Error("Gemini HTTP Error: " + res.status);
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        }}

        async function queryAutoAiFallback(hz) {{
            // Pinyin via pinyinPro or fallback
            let pinyin = "";
            if (window.pinyinPro && window.pinyinPro.pinyin) {{
                try {{
                    pinyin = window.pinyinPro.pinyin(hz, {{ toneType: 'symbol' }}).replace(/\\s+/g, '');
                }} catch (e) {{ pinyin = hz; }}
            }} else {{ pinyin = hz; }}

            // Hán Việt via character lookup map
            let hanviet = getHanViet(hz);

            // Meaning via MyMemory / Google Translate API
            let meaning = "";
            try {{
                const res = await fetch(`https://api.mymemory.translated.net/get?q=${{encodeURIComponent(hz)}}&langpair=zh-CN|vi`);
                const data = await res.json();
                if (data && data.responseData && data.responseData.translatedText) {{
                    let text = data.responseData.translatedText.trim();
                    if (text && text.toLowerCase() !== hz.toLowerCase() && !text.includes("MYMEMORY WARNING")) {{
                        meaning = text.charAt(0).toUpperCase() + text.slice(1);
                    }}
                }}
            }} catch (e) {{}}

            if (!meaning) {{
                try {{
                    const gRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=vi&dt=t&q=${{encodeURIComponent(hz)}}`);
                    const gData = await gRes.json();
                    if (gData && gData[0] && gData[0][0] && gData[0][0][0]) {{
                        meaning = gData[0][0][0].trim();
                    }}
                }} catch (e) {{}}
            }}

            if (!meaning) meaning = "Nghĩa từ mới";

            // Example sentence
            let exPinyin = pinyin;
            if (window.pinyinPro && window.pinyinPro.pinyin) {{
                try {{
                    exPinyin = window.pinyinPro.pinyin(`我喜欢${{hz}}。`, {{ toneType: 'symbol' }});
                }} catch (e) {{}}
            }}
            let example = `我喜欢${{hz}}。 (${{exPinyin}} - Tôi thích ${{meaning.toLowerCase()}}.)`;

            return {{ pinyin, hanviet, meaning, example }};
        }}

        async function autoLookupWord() {{
            const hzInput = document.getElementById('input-hanzi');
            const hz = hzInput ? hzInput.value.trim() : '';
            if (!hz) {{
                showToast("⚠️ Vui lòng nhập Chữ Hán!");
                return;
            }}

            // 1. Check local dictionary first
            const entry = BUILTIN_DICTIONARY[hz];
            if (entry) {{
                document.getElementById('input-pinyin').value = entry.pinyin || '';
                document.getElementById('input-hanviet').value = entry.hanviet || '';
                document.getElementById('input-meaning').value = entry.meaning || '';
                document.getElementById('input-example').value = entry.example || `我用${{hz}}。(Wǒ yòng ${{entry.pinyin || 'zhe'}}.)`;
                showToast(`✨ Đã tra thấy từ '${{hz}}' trong Sổ từ!`);
                return;
            }}

            // 2. Not in local dictionary -> Show AI Loading State
            const btnAi = document.getElementById('btn-ai-lookup');
            const origBtnHtml = btnAi ? btnAi.innerHTML : '';
            if (btnAi) {{
                btnAi.disabled = true;
                btnAi.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>🤖 AI đang tra...</span>
                `;
            }}
            showToast(`🤖 AI đang kết nối tra Pinyin, Hán Việt & Ví dụ cho '${{hz}}'...`);

            try {{
                const apiKey = localStorage.getItem('cece_gemini_api_key') || (appState && appState.geminiApiKey);
                let aiResult = null;

                if (apiKey) {{
                    try {{
                        aiResult = await queryGeminiAi(hz, apiKey);
                    }} catch (e) {{
                        console.warn("Gemini API error, falling back to smart engine:", e);
                    }}
                }}

                if (!aiResult) {{
                    aiResult = await queryAutoAiFallback(hz);
                }}

                if (aiResult) {{
                    if (aiResult.pinyin) document.getElementById('input-pinyin').value = aiResult.pinyin;
                    if (aiResult.hanviet) document.getElementById('input-hanviet').value = aiResult.hanviet;
                    if (aiResult.meaning) document.getElementById('input-meaning').value = aiResult.meaning;
                    if (aiResult.example) document.getElementById('input-example').value = aiResult.example;
                    showToast(`🤖 AI đã điền xong thông tin cho '${{hz}}'!`);
                }}
            }} catch (err) {{
                console.error("AI Lookup Error:", err);
                showToast(`⚠️ Không thể tự động tra AI. Chị vui lòng tự nhập.`);
            }} finally {{
                if (btnAi) {{
                    btnAi.disabled = false;
                    btnAi.innerHTML = origBtnHtml;
                }}
            }}
        }}
"""

old_auto_lookup_pattern = r'function autoLookupWord\(\) \{[\s\S]*?showToast\(`💡 Đã tạo pinyin gợi ý cho từ \'\$\{hz\}\'! Vui lòng điền nghĩa\.`\);\s*\}\s*\}'

if re.search(old_auto_lookup_pattern, code):
    code = re.sub(old_auto_lookup_pattern, ai_lookup_js, code)

with open(builder_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated build_srs_notebook_app.py successfully!")
