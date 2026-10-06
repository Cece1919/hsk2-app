# build_day7_master.py
import os, json, re

DAY7_DIR = "/Users/trangngo95/Desktop/HSK/HSK2/Day 7"

# 24 Unique Characters for Day 7 HanziWriter & Tianzige
ITEMS = [
    {"id": "sheng-1", "char": "生", "pinyin": "shēng", "meaning": "生日 (Sinh nhật)"},
    {"id": "ri-1", "char": "日", "pinyin": "rì", "meaning": "生日 (Sinh nhật)"},
    {"id": "kuai-1", "char": "快", "pinyin": "kuài", "meaning": "快乐 (Vui vẻ, khoái lạc)"},
    {"id": "le-1", "char": "乐", "pinyin": "lè", "meaning": "快乐 (Vui vẻ, khoái lạc)"},
    {"id": "song-1", "char": "送", "pinyin": "sòng", "meaning": "送 (Tặng, tiễn)"},
    {"id": "li-1", "char": "礼", "pinyin": "lǐ", "meaning": "礼物 (Quà tặng, lễ vật)"},
    {"id": "wu-1", "char": "物", "pinyin": "wù", "meaning": "礼物 (Quà tặng, lễ vật)"},
    {"id": "wan-1", "char": "晚", "pinyin": "wǎn", "meaning": "晚上 (Buổi tối)"},
    {"id": "shang-1", "char": "上", "pinyin": "shang", "meaning": "晚上 (Buổi tối)"},
    {"id": "dan-1", "char": "蛋", "pinyin": "dàn", "meaning": "蛋糕 (Bánh kem)"},
    {"id": "gao-1", "char": "糕", "pinyin": "gāo", "meaning": "蛋糕 (Bánh kem)"},
    {"id": "wen-1", "char": "问", "pinyin": "wèn", "meaning": "问 (Hỏi)"},
    {"id": "fei-1", "char": "非", "pinyin": "fēi", "meaning": "非常 (Cực kỳ, vô cùng)"},
    {"id": "chang-1", "char": "常", "pinyin": "cháng", "meaning": "非常 (Cực kỳ, vô cùng)"},
    {"id": "kai-1", "char": "开", "pinyin": "kāi", "meaning": "开始 (Bắt đầu)"},
    {"id": "shi-1", "char": "始", "pinyin": "shǐ", "meaning": "开始 (Bắt đầu)"},
    {"id": "chang-2", "char": "长", "pinyin": "cháng", "meaning": "长 (Trường, dài / Trưởng)"},
    {"id": "xi-1", "char": "希", "pinyin": "xī", "meaning": "希望 (Hy vọng)"},
    {"id": "wang-1", "char": "望", "pinyin": "wàng", "meaning": "希望 (Hy vọng)"},
    {"id": "can-1", "char": "参", "pinyin": "cān", "meaning": "参加 (Tham gia)"},
    {"id": "jia-1", "char": "加", "pinyin": "jiā", "meaning": "参加 (Tham gia)"},
    {"id": "ju-1", "char": "聚", "pinyin": "jù", "meaning": "聚会 (Tiệc tùng, tụ họp)"},
    {"id": "hui-1", "char": "会", "pinyin": "huì", "meaning": "聚会 (Tiệc tùng, tụ họp)"},
    {"id": "zhu-1", "char": "祝", "pinyin": "zhù", "meaning": "祝 (Chúc mừng)"}
]

# Vocabulary 14 Words Table Rows
VOCAB_ROWS = [
    {"word": "生日", "pinyin": "shēngrì", "hanviet": "Sinh Nhật", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Sinh nhật, ngày sinh", "ex_zh": "今天是我的生日。", "ex_py": "Jīntiān shì wǒ de shēngrì.", "ex_vi": "Hôm nay là sinh nhật tôi."},
    {"word": "快乐", "pinyin": "kuàilè", "hanviet": "Khoái Lạc", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Vui vẻ, khoái lạc, hạnh phúc", "ex_zh": "祝你生日快乐！", "ex_py": "Zhù nǐ shēngrì kuàilè!", "ex_vi": "Chúc bạn sinh nhật vui vẻ!"},
    {"word": "送", "pinyin": "sòng", "hanviet": "Tống", "pos": "Động từ", "tone": "Bình thường", "meaning": "Tặng, biếu, tiễn", "ex_zh": "我送你一个生日礼物。", "ex_py": "Wǒ sòng nǐ yí gè shēngrì lǐwù.", "ex_vi": "Tôi tặng bạn một món quà sinh nhật."},
    {"word": "礼物", "pinyin": "lǐwù", "hanviet": "Lễ Vật", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Quà tặng, lễ vật", "ex_zh": "这个礼物非常漂亮。", "ex_py": "Zhè gè lǐwù fēicháng piàoliang.", "ex_vi": "Món quà này cực kỳ đẹp."},
    {"word": "晚上", "pinyin": "wǎnshang", "hanviet": "Vãn Thượng", "pos": "Danh từ", "tone": "Khinh thanh (shang)", "meaning": "Buổi tối, ban đêm", "ex_zh": "今天晚上我们一起吃蛋糕。", "ex_py": "Jīntiān wǎnshang wǒmen yìqǐ chī dàngāo.", "ex_vi": "Tối nay chúng ta cùng ăn bánh kem."},
    {"word": "蛋糕", "pinyin": "dàngāo", "hanviet": "Đản Cao", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Bánh kem, bánh ngọt", "ex_zh": "我买了一个生日蛋糕。", "ex_py": "Wǒ mǎi le yí gè shēngrì dàngāo.", "ex_vi": "Tôi đã mua một chiếc bánh sinh nhật."},
    {"word": "问", "pinyin": "wèn", "hanviet": "Vấn", "pos": "Động từ", "tone": "Bình thường", "meaning": "Hỏi, hỏi thăm", "ex_zh": "我想问你一个问题。", "ex_py": "Wǒ xiǎng wèn nǐ yí gè wèntí.", "ex_vi": "Tôi muốn hỏi bạn một câu hỏi."},
    {"word": "非常", "pinyin": "fēicháng", "hanviet": "Phi Thường", "pos": "Phó từ", "tone": "Bình thường", "meaning": "Cực kỳ, vô cùng, rất", "ex_zh": "我非常高兴参加你的聚会。", "ex_py": "Wǒ fēicháng gāoxìng cānjiā nǐ de jùhuì.", "ex_vi": "Tôi cực kỳ vui mừng dự tiệc của bạn."},
    {"word": "开始", "pinyin": "kāishǐ", "hanviet": "Khai Thủy", "pos": "Động từ/DT", "tone": "Bình thường", "meaning": "Bắt đầu, mở đầu", "ex_zh": "聚会晚上七点开始。", "ex_py": "Jùhuì wǎnshang qī diǎn kāishǐ.", "ex_vi": "Buổi tiệc bắt đầu lúc 7 giờ tối."},
    {"word": "长", "pinyin": "cháng / zhǎng", "hanviet": "Trường / Trưởng", "pos": "Tính từ/Đã", "tone": "Đa âm tiết", "meaning": "Dài (cháng) / Lớn lên, trưởng thành (zhǎng)", "ex_zh": "生日那天要吃长寿面。", "ex_py": "Shēngrì nà tiān yào chī chángshòumiàn.", "ex_vi": "Sinh nhật phải ăn mì trường thọ."},
    {"word": "希望", "pinyin": "xīwàng", "hanviet": "Hi Vọng", "pos": "Động từ/DT", "tone": "Bình thường", "meaning": "Hy vọng, mong muốn", "ex_zh": "我希望你每天都快乐。", "ex_py": "Wǒ xīwàng nǐ měitiān dōu kuàilè.", "ex_vi": "Tôi hy vọng bạn mỗi ngày đều vui vẻ."},
    {"word": "参加", "pinyin": "cānjiā", "hanviet": "Tham Gia", "pos": "Động từ", "tone": "Bình thường", "meaning": "Tham gia, dự (tiệc, cuộc họp)", "ex_zh": "你能来参加我的生日聚会吗？", "ex_py": "Nǐ néng lái cānjiā wǒ de shēngrì jùhuì ma?", "ex_vi": "Bạn dự tiệc sinh nhật tôi được không?"},
    {"word": "聚会", "pinyin": "jùhuì", "hanviet": "Tụ Hội", "pos": "Danh từ/Đã", "tone": "Bình thường", "meaning": "Tiệc tùng, tụ họp, buổi gặp mặt", "ex_zh": "欢迎来到我的生日聚会！", "ex_py": "Huānyíng lái dào wǒ de shēngrì jùhuì!", "ex_vi": "Chào mừng đến tiệc sinh nhật tôi!"},
    {"word": "祝", "pinyin": "zhù", "hanviet": "Chúc", "pos": "Động từ", "tone": "Bình thường", "meaning": "Chúc, cầu chúc", "ex_zh": "祝你身体健康，学习进步！", "ex_py": "Zhù nǐ shēntǐ jiànkāng, xuéxí jìnbù!", "ex_vi": "Chúc bạn sức khỏe, học tập tiến bộ!"}
]

# Writing & Mnemonics Details for 14 Words
WRITING_ITEMS = [
    {"word": "生日", "pinyin": "shēngrì", "strokes": "5/4 nét", "radicals": "Bộ Sinh 生 + Bộ Nhật 日", "story": "Mầm cây 生 vươn lên đón ánh mặt trời 日 mừng ngày sinh nhật ra đời.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 生 (Trang 45) - Hình ảnh cây cỏ đơm chồi sinh trưởng; 日 (Trang 12) - Mặt trời soi sáng."},
    {"word": "快乐", "pinyin": "kuàilè", "strokes": "7/5 nét", "radicals": "Bộ Tâm 忄 + Bộ Nhạc 乐", "story": "Trái tim 忄 hân hoan đón nhận giai điệu âm nhạc 乐 tươi vui rộn ràng.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 快 (Trang 78) - Trái tim phấn chấn hớn hở; 乐 (Trang 90) - Tiếng đàn tiếng hát."},
    {"word": "送", "pinyin": "sòng", "strokes": "9 nét", "radicals": "Bộ Sước 辶 + Bộ Quan 关", "story": "Mở cổng 关 bước đi 辶 để mang món quà xinh xắn đến tận tay trao tặng.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 送 (Trang 112) - Cổng nhà đóng mở cẩn thận tiễn người đi xa."},
    {"word": "礼物", "pinyin": "lǐwù", "strokes": "5/8 nét", "radicals": "Bộ Thị 礻 + Bộ Ngưu 牜", "story": "Dùng tấm lòng trang trọng 礻 dâng lễ vật 牜 chúc mừng sinh nhật.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 礼 (Trang 65) - Lễ nghi chu đáo; 物 (Trang 84) - Món đồ vật trang trọng."},
    {"word": "晚上", "pinyin": "wǎnshang", "strokes": "11/3 nét", "radicals": "Bộ Nhật 日 + Bộ Miễn 免 + Bộ Thượng 上", "story": "Mặt trời 日 lặn xuống, được miễn 免 công việc là lúc lên 上 đèn nghỉ ngơi.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 晚 (Trang 130) - Mặt trời lặn sau rặng núi nghỉ ngơi."},
    {"word": "蛋糕", "pinyin": "dàngāo", "strokes": "11/16 nét", "radicals": "Bộ Trùng 虫 + Bộ Mễ 米", "story": "Quả trứng 蛋 nhào trộn cùng bột gạo 米 nướng thành chiếc bánh kem cao cấp.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 糕 (Trang 154) - Bột gạo nướng thành bánh ngọt thơm lừng."},
    {"word": "问", "pinyin": "wèn", "strokes": "6 nét", "radicals": "Bộ Môn 门 + Bộ Khẩu 口", "story": "Đứng ở ngoài cổng 门 ghé miệng 口 vào cất tiếng hỏi thăm.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 问 (Trang 34) - Cửa mở ra mở miệng cất lời thắc mắc."},
    {"word": "非常", "pinyin": "fēicháng", "strokes": "8/11 nét", "radicals": "Bộ Phi 非 + Bộ Cân 巾", "story": "Điều đặc biệt 非 khác thường, chiếc khăn 巾 thường xuyên được giặt sạch.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 非常 (Trang 162) - Mức độ vượt xa chuẩn mực thông thường."},
    {"word": "开始", "pinyin": "kāishǐ", "strokes": "4/8 nét", "radicals": "Bộ Nhị 二 + Bộ Nữ 女", "story": "Hai tay 开 mở cổng, người phụ nữ 女 bắt đầu 始 khởi đầu cuộc sống mới.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 始 (Trang 98) - Người phụ nữ bắt nguồn cho thế hệ sau."},
    {"word": "长", "pinyin": "cháng", "strokes": "4 nét", "radicals": "Bộ Trường 长", "story": "Hình ảnh mái tóc dài rủ xuống của vị cao niên sống thọ.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 长 (Trang 28) - Mái tóc dài của người già biểu thị tuổi thọ."},
    {"word": "希望", "pinyin": "xīwàng", "strokes": "7/11 nét", "radicals": "Bộ Cân 巾 + Bộ Vương 王 + Bộ Nguyệt 月", "story": "Đứng trên mảnh đất 王 ngẩng đầu ngắm trăng 月 gửi gắm khao khát 希 vọng.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 望 (Trang 142) - Đứng trên đài cao ngóng nhìn mặt trăng."},
    {"word": "参加", "pinyin": "cānjiā", "strokes": "8/5 nét", "radicals": "Bộ Tư 厶 + Bộ Lực 力 + Bộ Khẩu 口", "story": "Mọi người tụ họp 参 đông đủ, dốc sức 力 mở miệng 口 hô vang tham gia.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 参 (Trang 105) - Đông người hội họp đông vui."},
    {"word": "聚会", "pinyin": "jùhuì", "strokes": "14/6 nét", "radicals": "Bộ Nhĩ 耳 + Bộ Nhân 人 + Bộ Vân 云", "story": "Lắng nghe 耳 tiếng gọi, mọi người 人 nhóm họp dưới làn mây 云 rộn rã.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 聚 (Trang 170) - Tai nghe tiếng tù và tụ hội đông đúc."},
    {"word": "祝", "pinyin": "zhù", "strokes": "9 nét", "radicals": "Bộ Thị 礻 + Bộ Khẩu 口 + Bộ Nhân 人", "story": "Con người 人 quỳ gối mở miệng 口 cầu chúc thần linh 礻 ban phúc lành.", "quote": "📚 Sách Nhớ Hán Tự Chiết Tự: 祝 (Trang 52) - Chủ tế mở miệng cầu nguyện thần linh."}
]

def generate_vocab_table_html():
    rows = []
    for r in VOCAB_ROWS:
        row = f'''<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="speakText('{r["word"]}')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>{r["pinyin"]}</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">{r["word"]}</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">{r["pinyin"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">{r["hanviet"]}</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">{r["pos"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">{r["tone"]}</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">{r["meaning"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">{r["ex_zh"]}<button onclick="speakText('{r["ex_zh"]}')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">{r["ex_py"]}</div><div class="text-xs text-slate-500">{r["ex_vi"]}</div></td>
</tr>'''
        rows.append(row)
    return "\n".join(rows)

def generate_writing_sec_html():
    cards = []
    for item in WRITING_ITEMS:
        card = f'''        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="flex items-center justify-between border-b pb-2">
                <span class="font-bold text-slate-900 zh text-xl">{item["word"]} ({item["pinyin"]})</span>
                <span class="text-xs bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full font-mono font-semibold">{item["strokes"]}</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1.5 pt-1">
                <div><b>Bộ thủ:</b> {item["radicals"]}</div>
                <div><b>💡 Mẹo nhớ:</b> {item["story"]}</div>
                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium leading-relaxed">{item["quote"]}</div>
            </div>
        </div>'''
        cards.append(card)
    
    cards_str = "\n".join(cards)
    return f'''<div class="space-y-6">
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed shadow-xs">
        <div class="font-bold flex items-center gap-1.5 mb-1 text-sm text-amber-900">
            <span>📌 BẢNG THỦY TỔ THUẬN BÚT & CHIẾT TỰ HÁN TỰ BÀI 7</span>
        </div>
        <p>Học chi tiết 4 thành phần cho 100% từ mới: Số nét, Bộ thủ, Mẹo nhớ tượng hình và Trích dẫn sách Chiết tự chuẩn.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
{cards_str}
    </div>
</div>'''

def generate_sec_sim_html():
    cards = []
    for item in ITEMS:
        card = f'''            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                <div class="text-center">
                    <span class="text-2xl font-bold text-slate-800 zh">{item["char"]}</span>
                    <span class="text-xs text-slate-500 block">{item["pinyin"]}</span>
                    <span class="text-[11px] text-slate-400 block">{item["meaning"]}</span>
                </div>
                <div class="flex items-center justify-center gap-2 w-full">
                    <div class="flex flex-col items-center">
                        <span class="text-[10px] text-slate-400 mb-1 font-semibold">HanziWriter</span>
                        <div id="target-{item["id"]}" class="writer-container w-[105px] h-[105px] bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-inner"></div>
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
                            <canvas id="pad-{item["id"]}" width="105" height="105" class="relative z-10 w-full h-full cursor-crosshair"></canvas>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 w-full pt-1">
                    <button onclick="animateChar('{item["id"]}')" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition">▶ Chạy nét</button>
                    <button onclick="resetChar('{item["id"]}')" class="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition">🔄</button>
                    <button onclick="clearCanvas('{item["id"]}')" class="py-1.5 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium border border-rose-200 transition">🗑️</button>
                </div>
            </div>'''
        cards.append(card)

    cards_str = "\n".join(cards)
    return f'''        <div id="sec-sim" class="tab-content">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-2">✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (Bài 7)</h2>
                <p class="text-sm text-slate-600">Bấm <b>▶ Chạy nét</b> để xem thứ tự nét chuẩn HanziWriter, hoặc vẽ trực tiếp bằng tay/chuột trên ô <b>田字格</b> cảm ứng bên phải.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{cards_str}
            </div>
        </div>'''

def generate_sec_overview_html():
    return '''        <div id="sec-overview" class="tab-content">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90 mb-6">
                <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span class="text-blue-800">🎯</span> Mục tiêu bài học hôm nay (Bài 7: 第七课 祝你生日快乐)
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50/70 p-4 rounded-xl border border-slate-200">
                        <div class="font-bold text-blue-900 mb-1">1. Từ vựng & Viết chữ</div>
                        <p class="text-sm text-slate-600">Nắm vững 14 từ mới chủ đề sinh nhật, quà tặng, thời gian và thứ tự nét viết chuẩn.</p>
                    </div>
                    <div class="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100">
                        <div class="font-bold text-indigo-900 mb-1">2. Ngữ pháp ứng dụng</div>
                        <p class="text-sm text-slate-600">Phó từ mức độ <code class="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">非常</code>, mốc thời điểm <code class="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">从...开始</code>, động từ hy vọng <code class="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">希望</code> và lời chúc <code class="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">祝...</code></p>
                    </div>
                    <div class="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                        <div class="font-bold text-emerald-900 mb-1">3. Giao tiếp & Audio</div>
                        <p class="text-sm text-slate-600">Hỏi ngày sinh nhật, đặt tiệc, trao quà mừng và gửi những lời chúc tốt đẹp nhất.</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90">
                <h3 class="text-lg font-bold text-slate-900 mb-3">📌 Quy trình 5 bước tự học hiệu quả</h3>
                <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-slate-700">
                    <li><strong class="text-blue-900">Bước 1:</strong> Học từ vựng và tra cứu bảng phát âm ở Tab 📖 **Từ vựng**.</li>
                    <li><strong class="text-blue-900">Bước 2:</strong> Xem quy tắc nét bút và thẻ chiết tự ở Tab ✍️ **Tập viết & Mẹo nhớ**.</li>
                    <li><strong class="text-blue-900">Bước 3:</strong> Nắm vững 4 mẫu ngữ pháp ở Tab 💡 **Ngữ pháp**.</li>
                    <li><strong class="text-blue-900">Bước 4:</strong> Nghe audio và luyện phản xạ bài khóa ở Tab 🗣️ **Bài khóa**.</li>
                    <li><strong class="text-blue-900">Bước 5:</strong> Hoàn thành 15 câu trắc nghiệm ở Tab 📝 **Luyện tập** và đọc Tab 🎋 **Góc văn hóa**.</li>
                </ol>
            </div>
        </div>'''

def generate_sec_grammar_html():
    return '''<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
            Phó từ chỉ mức độ "非常" (fēicháng - Cực kỳ, vô cùng)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Dùng để biểu thị mức độ cao hơn hẳn mức bình thường ("很").</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: 非常 + Tính từ / Động từ tâm lý</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>这个礼物<b>非常</b>漂亮。(Món quà này cực kỳ đẹp.)</li>
                <li>我<b>非常</b>高兴参加你的聚会。(Tôi cực kỳ vui mừng dự tiệc của bạn.)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
            Diễn đạt mốc thời điểm bắt đầu "从...开始" (Cóng... kāishǐ)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Biểu thị một hành động hoặc sự việc bắt đầu từ một mốc thời gian hay địa điểm cụ thể.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: 从 + Mốc thời gian / Địa điểm + 开始</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>聚会<b>从</b>晚上七点<b>开始</b>。(Buổi tiệc bắt đầu từ 7 giờ tối.)</li>
                <li><b>从</b>明天<b>开始</b>我要好好学习。(Từ ngày mai tôi bắt đầu học tập chăm chỉ.)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
            Động từ nguyện vọng "希望" (xīwàng - Hy vọng, mong muốn)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Dùng để diễn đạt mong ước, kỳ vọng của bản thân đối với người khác hoặc sự việc.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: 主语 + 希望 + [Mệnh đề / Hành động]</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>我<b>希望</b>你每天都快乐。(Tôi hy vọng mỗi ngày bạn đều vui vẻ.)</li>
                <li>老师<b>希望</b>大家复习生词。(Thầy giáo hy vọng mọi người ôn tập từ mới.)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">4</span>
            Cấu trúc câu chúc "祝..." (Zhù... - Chúc mừng)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Đứng ở đầu câu dùng để gửi lời chúc tốt đẹp tới người nghe nhân dịp đặc biệt.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: 祝 + Đối tượng + [Lời chúc / Tính từ]</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li><b>祝</b>你生日快乐！(Chúc bạn sinh nhật vui vẻ!)</li>
                <li><b>祝</b>你身体健康，学习进步！(Chúc bạn sức khỏe dồi dào, học tập tiến bộ!)</li>
            </ul>
        </div>
    </div>
</div>'''

def generate_sec_text_html():
    return '''<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🎂</span> Bài khóa 1: 祝你生日快乐 (Chúc mừng sinh nhật)</h3>
            <button onclick="speakText('祝你生日快乐！这是送给你的。谢谢你！是什么？是一本书吗？对，这本书是我写的。太好了！非常感谢你！')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 祝你生日快乐！这是送给你的。</div><div class="text-emerald-700 font-mono text-[11px]">Zhù nǐ shēngrì kuàilè! Zhè shì sòng gěi nǐ de.</div><div class="text-slate-500">Chúc bạn sinh nhật vui vẻ! Đây là quà tặng bạn.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 谢谢你！是什么？是一本书吗？</div><div class="text-emerald-700 font-mono text-[11px]">Xièxie nǐ! Shì shénme? Shì yì běn shū ma?</div><div class="text-slate-500">Cảm ơn bạn! Là gì thế? Là một cuốn sách à?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 对，这本书是我写的。</div><div class="text-emerald-700 font-mono text-[11px]">Duì, zhè běn shū shì wǒ xiě de.</div><div class="text-slate-500">Đúng rồi, cuốn sách này do chính tôi viết.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 太好了！非常感谢你！</div><div class="text-emerald-700 font-mono text-[11px]">Tài hǎo le! Fēicháng gǎnxiè nǐ!</div><div class="text-slate-500">Tuyệt vời quá! Cảm ơn bạn rất nhiều!</div></div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🎉</span> Bài khóa 2: 生日聚会与蛋糕 (Tiệc sinh nhật & bánh kem)</h3>
            <button onclick="speakText('晚上我们去吃中国菜，怎么样？我非常想去，但是今天晚上我有课。那我们明天晚上一起吃生日蛋糕吧。好的，没问题！')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 晚上我们去吃中国菜，怎么样？</div><div class="text-emerald-700 font-mono text-[11px]">Wǎnshang wǒmen qù chī Zhōngguó cài, zěnmeyàng?</div><div class="text-slate-500">Tối nay chúng ta đi ăn món Trung Quốc nhé?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 我非常想去，但是今天晚上我有课。</div><div class="text-emerald-700 font-mono text-[11px]">Wǒ fēicháng xiǎng qù, dànshì jīntiān wǎnshang wǒ yǒu kè.</div><div class="text-slate-500">Tôi rất muốn đi, nhưng tối nay tôi có giờ học.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 那我们明天晚上一起吃生日蛋糕吧。</div><div class="text-emerald-700 font-mono text-[11px]">Nà wǒmen míngtiān wǎnshang yìqǐ chī shēngrì dàngāo ba.</div><div class="text-slate-500">Thế tối mai chúng ta cùng ăn bánh sinh nhật nhé.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 好的，没问题！</div><div class="text-emerald-700 font-mono text-[11px]">Hǎo de, méi wèntí!</div><div class="text-slate-500">Được chứ, không thành vấn đề!</div></div>
        </div>
    </div>
</div>'''

def generate_sec_practice_html():
    return '''<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2"><span>✍️</span> Phần 1: Bài tập Từ vựng (Điền từ vào chỗ trống)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">1. 祝你 ( ) 快乐！</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 生日</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 游泳</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 公斤</button>
                </div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">2. 我送你一个生日 ( )。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 姐姐</button>
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 礼物</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 羊肉</button>
                </div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">3. 今天晚上我们一起吃 ( )。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 蛋糕</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 自行车</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 门</button>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2"><span>💡</span> Phần 2: Sắp xếp / Viết lại câu hoàn chỉnh</h3>
        <div class="space-y-4 text-xs">
            <div class="p-3.5 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">1. 生日 / 祝 / 快乐 / 你 / ！</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">祝你生日快乐！</div></details>
            </div>
            <div class="p-3.5 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">2. 聚会 / 七点 / 开始 / 晚上 / 。</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">聚会晚上七点开始。</div></details>
            </div>
        </div>
    </div>
</div>'''

def generate_sec_culture_html():
    return '''<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-xl font-bold text-blue-950 flex items-center gap-2">
            <span>🎋</span> Góc Văn Hóa: Phong Tục Mừng Sinh Nhật Của Người Trung Quốc
        </h2>
        <p class="text-xs text-slate-600 leading-relaxed">
            Trong văn hóa Trung Hoa, ngày sinh nhật có ý nghĩa vô cùng thiêng liêng. Ngoài việc cắt bánh kem sinh nhật kiểu phương Tây ngày nay, người Trung Quốc vẫn luôn giữ gìn những phong tục nét đẹp truyền thống sâu sắc.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-2">
                <h3 class="font-bold text-amber-950 text-sm flex items-center gap-1.5">🍜 Mì Trường Thọ (长寿面 - Chángshòumiàn)</h3>
                <p class="text-xs text-slate-700 leading-relaxed">Vào ngày sinh nhật, người Trung Quốc nhất định phải ăn một bát mì trường thọ. Sợi mì được kéo thật dài và nguyên vẹn không bị đứt, mang hàm ý cầu chúc cho người mừng sinh nhật có sức khỏe dẻo dai, bình an và thọ tỷ nam sơn.</p>
            </div>
            <div class="bg-rose-50/60 p-4 rounded-xl border border-rose-200 space-y-2">
                <h3 class="font-bold text-rose-950 text-sm flex items-center gap-1.5">🍑 Bánh Đào Tiên (寿桃 - Shòutáo)</h3>
                <p class="text-xs text-slate-700 leading-relaxed">Đặc biệt là với người lớn tuổi, con cháu thường dâng tặng bánh Đào Tiên (壽桃). Quả đào tượng trưng cho sự trường thọ, may mắn và cát tường trong thần thoại Tây Vương Mẫu.</p>
            </div>
        </div>
    </div>
</div>'''

def build_full_html(is_mo_phong=True):
    title = "HSK 2 - Bài 7: 第七课 祝你生日快乐 (Có Mô Phỏng Nét Viết)" if is_mo_phong else "HSK 2 - Bài 7: 第七课 祝你生日快乐 (Phiên Bản Tự Học Chuẩn)"
    
    # Navigation bar HTML
    if is_mo_phong:
        nav_html = '''    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 scrollbar-none">
            <button onclick="showTab('sim')" id="tab-sim" class="tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer">🎬 Mô phỏng nét viết</button>
            <button onclick="showTab('overview')" id="tab-overview" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>'''
    else:
        nav_html = '''    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 scrollbar-none">
            <button onclick="showTab('overview')" id="tab-overview" class="tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>'''

    sec_sim = generate_sec_sim_html() if is_mo_phong else ""
    sec_overview = generate_sec_overview_html()
    vocab_rows_html = generate_vocab_table_html()
    sec_writing = generate_writing_sec_html()
    sec_grammar = generate_sec_grammar_html()
    sec_text = generate_sec_text_html()
    sec_practice = generate_sec_practice_html()
    sec_culture = generate_sec_culture_html()

    items_json = json.dumps(ITEMS)

    # Initial visibility classes
    if is_mo_phong:
        sim_cls = "tab-content"
        ov_cls = "tab-content hidden"
    else:
        sim_cls = ""
        ov_cls = "tab-content"

    return f'''<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>{title}</title>
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
            .card {{ border: 1px solid #cbd5e1 !important; box-shadow: none !important; margin-bottom: 16px !important; page-break-inside: avoid; }}
            .tab-content {{ display: block !important; }}
            header {{ background: #1e3a8a !important; color: white !important; }}
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
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">第七课 祝你生日快乐</h1>
                <p class="text-blue-200 text-sm mt-1">Bài 7: Chúc bạn sinh nhật vui vẻ!</p>
            </div>
            <div class="flex items-center gap-3 bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                <span class="text-xs text-slate-300 font-medium pl-2">Tốc độ đọc:</span>
                <button onclick="setAudioPlaybackRate(0.75)" id="rate-075" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">0.75x (Chậm)</button>
                <button onclick="setAudioPlaybackRate(1.0)" id="rate-100" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition">1.0x (Chuẩn)</button>
            </div>
        </div>
    </header>

{nav_html}

    <main class="max-w-7xl mx-auto px-4 py-8">

{sec_sim}

{sec_overview}

        <!-- TAB 2: VOCABULARY -->
        <div id="sec-vocab" class="tab-content hidden space-y-6">
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-5 shadow-sm space-y-4">
                <div class="flex items-center gap-2.5 border-b border-amber-200/60 pb-2.5">
                    <span class="text-2xl">⚡</span>
                    <div>
                        <h3 class="font-bold text-amber-950 text-base md:text-lg">QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM HSK 2</h3>
                        <p class="text-xs text-amber-800/80">Học và luyện nghe 4 quy tắc biến điệu quan trọng để phát âm chuẩn tự nhiên</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-800">
                    <div class="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1.5">
                        <div class="font-bold text-amber-950 flex items-center justify-between">
                            <span>1. Biến điệu Hai Thanh 3 (3 + 3 → 2 + 3)</span>
                            <span class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">∨ + ∨ → / + ∨</span>
                        </div>
                        <p class="text-xs text-slate-600">Khi 2 âm tiết mang thanh 3 đi liền nhau, âm tiết đầu biến thành thanh 2.</p>
                        <div class="text-xs font-mono text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                            Ví dụ: 你好 (nǐ hǎo ➔ ní hǎo), 你好吗 (ní hǎo ma)
                        </div>
                    </div>
                    <div class="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1.5">
                        <div class="font-bold text-amber-950 flex items-center justify-between">
                            <span>2. Biến điệu của 不 (bù → bú)</span>
                            <span class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">bù + Thanh 4 → bú</span>
                        </div>
                        <p class="text-xs text-slate-600">Khi "不" đứng trước từ mang thanh 4, "不" chuyển thành thanh 2 (bú).</p>
                        <div class="text-xs font-mono text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                            Ví dụ: 不是 (bù shì ➔ bú shì), 不看 (bú kàn)
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>📖</span> Bảng 14 Từ Vựng Trọng Tâm HSK2 Bài 7
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                                <th class="py-3 px-3 text-center">Nút Nghe</th>
                                <th class="py-3 px-3">Chữ Hán</th>
                                <th class="py-3 px-3">Pinyin</th>
                                <th class="py-3 px-3">Hán Việt</th>
                                <th class="py-3 px-3">Loại từ</th>
                                <th class="py-3 px-3">Biến thể Thanh điệu</th>
                                <th class="py-3 px-3">Nghĩa tiếng Việt</th>
                                <th class="py-3 px-3">Ví dụ minh họa</th>
                            </tr>
                        </thead>
                        <tbody>
{vocab_rows_html}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="sec-writing" class="tab-content hidden space-y-6">
{sec_writing}
        </div>

        <div id="sec-grammar" class="tab-content hidden space-y-6">
{sec_grammar}
        </div>

        <div id="sec-text" class="tab-content hidden space-y-6">
{sec_text}
        </div>

        <div id="sec-practice" class="tab-content hidden space-y-8">
{sec_practice}
        </div>

        <div id="sec-culture" class="tab-content hidden space-y-6">
{sec_culture}
        </div>

    </main>

    <script>
        const ITEMS = {items_json};
        let currentRate = 1.0;
        const writers = {{}};
        const canvasPads = {{}};

        function setAudioPlaybackRate(rate) {{
            currentRate = rate;
            document.querySelectorAll('#rate-075, #rate-100').forEach(btn => {{
                btn.className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            }});
            if (rate === 0.75) {{
                document.getElementById('rate-075').className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition";
            }} else {{
                document.getElementById('rate-100').className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition";
            }}
        }}

        function speakText(txt) {{
            if ('speechSynthesis' in window) {{
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(txt);
                u.lang = 'zh-CN';
                u.rate = currentRate;
                window.speechSynthesis.speak(u);
            }}
        }}

        function showTab(tabId) {{
            document.querySelectorAll('.tab-content').forEach(el => {{
                el.className = el.className.replace(/\\bhidden\\b/g, '').trim() + ' hidden';
                el.style.display = 'none';
            }});
            document.querySelectorAll('.tab-btn').forEach(btn => {{
                btn.className = 'tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition';
            }});

            const target = document.getElementById('sec-' + tabId);
            if (target) {{
                target.className = target.className.replace(/\\bhidden\\b/g, '').trim();
                target.style.display = 'block';
            }}

            const activeBtn = document.getElementById('tab-' + tabId);
            if (activeBtn) {{
                activeBtn.className = 'tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer';
            }}

            if (tabId === 'sim') {{
                setTimeout(initWritersAndCanvases, 100);
            }}
        }}

        function initWritersAndCanvases() {{
            if (typeof HanziWriter === 'undefined') return;
            ITEMS.forEach(item => {{
                const targetId = 'target-' + item.id;
                const targetEl = document.getElementById(targetId);
                if (targetEl && !writers[item.id]) {{
                    try {{
                        writers[item.id] = HanziWriter.create(targetId, item.char, {{
                            width: 98,
                            height: 98,
                            padding: 10,
                            showOutline: true,
                            strokeAnimationSpeed: 1,
                            strokeColor: '#0f172a'
                        }});
                    }} catch(e) {{ console.error(e); }}
                }}

                const canvasId = 'pad-' + item.id;
                const canvasEl = document.getElementById(canvasId);
                if (canvasEl && !canvasPads[item.id]) {{
                    initCanvasPad(canvasEl, item.id);
                }}
            }});
        }}

        function initCanvasPad(canvas, id) {{
            const ctx = canvas.getContext('2d');
            let isDrawing = false;
            canvasPads[id] = {{ canvas, ctx }};

            function getPos(e) {{
                const rect = canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {{
                    x: (clientX - rect.left) * (canvas.width / rect.width),
                    y: (clientY - rect.top) * (canvas.height / rect.height)
                }};
            }}

            function startDraw(e) {{
                e.preventDefault();
                isDrawing = true;
                const pos = getPos(e);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = '#0284c7';
            }}

            function draw(e) {{
                if (!isDrawing) return;
                e.preventDefault();
                const pos = getPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }}

            function stopDraw(e) {{
                if (!isDrawing) return;
                e.preventDefault();
                isDrawing = false;
            }}

            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDraw);
            canvas.addEventListener('mouseleave', stopDraw);

            canvas.addEventListener('touchstart', startDraw, {{ passive: false }});
            canvas.addEventListener('touchmove', draw, {{ passive: false }});
            canvas.addEventListener('touchend', stopDraw, {{ passive: false }});
        }}

        function animateChar(id) {{
            if (writers[id]) writers[id].animateCharacter();
        }}

        function resetChar(id) {{
            if (writers[id]) writers[id].showCharacter();
        }}

        function clearCanvas(id) {{
            if (canvasPads[id]) {{
                const {{ canvas, ctx }} = canvasPads[id];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}
        }}

        function checkQ(btn, isCorrect) {{
            if (isCorrect) {{
                btn.className = "px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shadow-xs transition";
            }} else {{
                btn.className = "px-3 py-1.5 bg-rose-600 text-white rounded-lg font-bold shadow-xs transition";
            }}
        }}
    </script>
</body>
</html>'''

with open(os.path.join(DAY7_DIR, "HSK2_Bai_7_Mo_Phong_Viet.html"), "w", encoding="utf-8") as f:
    f.write(build_full_html(True))

with open(os.path.join(DAY7_DIR, "HSK2_Bai_7_Tu_Hoc.html"), "w", encoding="utf-8") as f:
    f.write(build_full_html(False))

print("Successfully generated both Day 7 HTML files matching Day 6 exact form!")
