# build_day6_script.py
import json, os, subprocess, base64

day6_dir = '/Users/trangngo95/Desktop/HSK/HSK2/Day 6'
audio_dir = os.path.join(day6_dir, 'audio')

words = {
    'men': '门',
    'wai': '外',
    'zixingche': '自行车',
    'yangrou': '羊肉',
    'haochi': '好吃',
    'miantiao': '面条',
    'dalanqiu': '打篮球',
    'yinwei': '因为',
    'suoyi': '所以',
    'youyong': '游泳',
    'jingchang': '经常',
    'gongjin': '公斤',
    'jiejie': '姐姐'
}

texts = {
    'text1': '门外这是谁的自行车？是我的。我今天骑自行车去学校。',
    'text2': '你怎么不吃了？今天的羊肉很好吃，但我吃饱了。再吃一点儿面条吧。',
    'text3': '你喜欢打篮球吗？非常喜欢。因为经常打篮球，所以我身体很好。',
    'text4': '你经常去游泳吗？是的，我每个星期去三次。游泳能减肥，我瘦了两公斤。'
}

vocab_b64 = {}
text_b64 = {}

for key in words.keys():
    m4a_path = os.path.join(audio_dir, f'{key}.m4a')
    with open(m4a_path, 'rb') as f:
        vocab_b64[key] = f'data:audio/mp4;base64,{base64.b64encode(f.read()).decode("utf-8")}'

for key in texts.keys():
    m4a_path = os.path.join(audio_dir, f'{key}.m4a')
    with open(m4a_path, 'rb') as f:
        text_b64[key] = f'data:audio/mp4;base64,{base64.b64encode(f.read()).decode("utf-8")}'

# Write Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md
md_content = """# 📝 HƯỚNG DẪN VIẾT VÀ GHI NHỚ TỪ MỚI - HSK 2 BÀI 6: 第六课 你怎么不吃了

---

## 📌 BẢNG MẸO NHỚ CHIẾT TỰ & THUẬN BÚT 100% TỪ MỚI

### 1. 门 (mén) - Cửa, cổng
- **门 (3 nét)**: Bộ Môn 门 (cánh cửa). *Mẹo:* Tượng hình hai cánh cửa khép mở.

### 2. 自行车 (zìxíngchē) - Xe đạp
- **自 (6 nét)**: Bộ Tự 自 (tự bản thân). *Mẹo:* Tự mình điều khiển.
- **行 (6 nét)**: Bộ Hành 行 (bước đi). *Mẹo:* Xe di chuyển trên đường.
- **车 (4 nét)**: Bộ Xa 车 (xe). *Mẹo:* Xe có bánh và khung xe.

### 3. 羊肉 (yángròu) - Thịt dê/cừu
- **羊 (6 nét)**: Bộ Dương 羊 (con dê/cừu). *Mẹo:* Đầu cừu có hai sừng.
- **肉 (6 nét)**: Bộ Nhục 肉 (thịt). *Mẹo:* Khúc thịt có xớ thịt bên trong.

### 4. 好吃 (hǎochī) - Ngon
- **好 (6 nét)**: Bộ Nữ 女 + Tử 子. *Mẹo:* Mẹ con vui vẻ làm ra món ngon.
- **吃 (6 nét)**: Bộ Khẩu 口 + Cật 乞. *Mẹo:* Mở miệng ăn thức ăn ngon.

### 5. 面条 (miàntiáo) - Mì, sợi mì
- **面 (9 nét)**: Bộ Diện 面 (mặt, bột mì). *Mẹo:* Bột mì làm ra sợi mì.
- **条 (7 nét)**: Bộ Mộc 木 + Chi 夂. *Mẹo:* Sợi mì dài như cành cây.

### 6. 打篮球 (dǎ lánqiú) - Chơi bóng rổ
- **打 (5 nét)**: Bộ Thủ 扌 (tay) + Đinh 丁. *Mẹo:* Bàn tay đập bóng.
- **篮 (16 nét)**: Bộ Trúc 𥫗 + Giám 监. *Mẹo:* Cái rổ bằng tre hứng bóng.
- **球 (11 nét)**: Bộ Vương 王 (ngọc) + Cầu 求. *Mẹo:* Quả bóng tròn như viên ngọc.

### 7. 因为 (yīnwèi) - Vì, bởi vì
- **因 (6 nét)**: Bộ Vi 囗 + Đại 大. *Mẹo:* Nguyên nhân lớn nằm bên trong.
- **为 (4 nét)**: Bộ Trảo 为. *Mẹo:* Lý do giải thích nguyên nhân.

### 8. 所以 (suǒyǐ) - Cho nên, vì vậy
- **所 (8 nét)**: Bộ Hộ 户 + Cân 斤. *Mẹo:* Nơi chốn đưa ra kết luận.
- **以 (5 nét)**: Bộ Nhân 人. *Mẹo:* Lấy đó làm căn cứ kết quả.

### 9. 游泳 (yóuyǒng) - Bơi lội
- **游 (12 nét)**: Bộ Thủy 氵 (nước) + Phương 方 + Tử 子. *Mẹo:* Đứa trẻ bơi lội tự do trên dòng nước.
- **泳 (8 nét)**: Bộ Thủy 氵 + Vĩnh 永. *Mẹo:* Bơi lội dưới nước lâu dài.

### 10. 经常 (jīngcháng) - Thường xuyên
- **经 (8 nét)**: Bộ Mịch 纟 + Kính 𢀖. *Mẹo:* Sợi chỉ liên tục thường xuyên.
- **常 (11 nét)**: Bộ Cân 巾 + Thượng ⺌ + Khẩu 口. *Mẹo:* Khăn treo thường xuyên ở nhà.

### 11. 公斤 (gōngjīn) - Ki-lô-gam (cân)
- **公 (4 nét)**: Bộ Bát 八 + Tư 厶. *Mẹo:* Cân nặng tiêu chuẩn công cộng.
- **斤 (4 nét)**: Bộ Cân 斤 (cái rìu, đơn vị cân). *Mẹo:* Đơn vị đo trọng lượng.

### 12. 姐姐 (jiějie) - Chị gái
- **姐 (8 nét)**: Bộ Nữ 女 + Thả 且. *Mẹo:* Người phụ nữ lớn tuổi hơn trong gia đình.
"""

with open(os.path.join(day6_dir, 'Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md'), 'w', encoding='utf-8') as f:
    f.write(md_content)

print('Written Day 6 markdown guide!')

vocab_rows_html = """
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('men')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>mén</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">门</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">mén</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Môn</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ/Lượng từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Cửa, cổng, môn học</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">门外是谁？<button onclick="speakText('门外是谁？')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Mén wài shì shéi?</div><div class="text-xs text-slate-500">Bên ngoài cửa là ai thế?</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('zixingche')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>zìxíngchē</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">自行车</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">zìxíngchē</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Tự hành xa</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Xe đạp</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我今天骑自行车去学校。<button onclick="speakText('我今天骑自行车去学校。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ jīntiān qí zìxíngchē qù xuéxiào.</div><div class="text-xs text-slate-500">Hôm nay tôi đi xe đạp đến trường.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('yangrou')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>yángròu</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">羊肉</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">yángròu</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Dương nhục</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Thịt dê, thịt cừu</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">今天的羊肉很好吃。<button onclick="speakText('今天的羊肉很好吃。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Jīntiān de yángròu hěn hǎochī.</div><div class="text-xs text-slate-500">Thịt dê hôm nay rất ngon.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('haochi')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>hǎochī</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">好吃</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">hǎochī</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Hảo ngật</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Tính từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Ngon (Thức ăn)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">这个菜很好吃。<button onclick="speakText('这个菜很好吃。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zhège cài hěn hǎochī.</div><div class="text-xs text-slate-500">Món ăn này rất ngon.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('miantiao')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>miàntiáo</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">面条</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">miàntiáo</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Diện điều</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Mì, sợi mì</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">再吃一点儿面条吧。<button onclick="speakText('再吃一点儿面条吧。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zài chī yìdiǎnr miàntiáo ba.</div><div class="text-xs text-slate-500">Ăn thêm chút mì nhé.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('dalanqiu')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>dǎ lánqiú</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">打篮球</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">dǎ lánqiú</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Đả lam cầu</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Cụm Động từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Chơi bóng rổ</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我非常喜欢打篮球。<button onclick="speakText('我非常喜欢打篮球。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ fēicháng xǐhuan dǎ lánqiú.</div><div class="text-xs text-slate-500">Tôi vô cùng thích chơi bóng rổ.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('yinwei')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>yīnwèi</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">因为</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">yīnwèi</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Nhân vi</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Liên từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Bởi vì, vì (Chỉ nguyên nhân)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">因为天气不好...<button onclick="speakText('因为天气不好...')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Yīnwèi tiānqì bù hǎo...</div><div class="text-xs text-slate-500">Bởi vì thời tiết không tốt...</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('suoyi')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>suǒyǐ</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">所以</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">suǒyǐ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Sở dĩ</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Liên từ</td>
    <td class="py-3.5 px-3 text-xs text-amber-700 font-mono bg-amber-50 rounded px-1.5 py-0.5">suǒ yǐ ➔ suó yǐ (Biến 3+3)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Cho nên, nên (Chỉ kết quả)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">所以我们没去。<button onclick="speakText('所以我们没去。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Suǒyǐ wǒmen méi qù.</div><div class="text-xs text-slate-500">Cho nên chúng tôi không đi.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('youyong')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>yóuyǒng</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">游泳</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">yóuyǒng</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Du vịnh</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Động từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Bơi lội, đi bơi</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我每个星期去游泳。<button onclick="speakText('我每个星期去游泳。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ měi ge xīngqī qù yóuyǒng.</div><div class="text-xs text-slate-500">Mỗi tuần tôi đều đi bơi.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('jingchang')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>jīngcháng</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">经常</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">jīngcháng</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Kinh thường</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Phó từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Thường xuyên, thường</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">他经常去打球。<button onclick="speakText('他经常去打球。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Tā jīngcháng qù dǎqiú.</div><div class="text-xs text-slate-500">Cậu ấy thường xuyên đi chơi bóng.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('gongjin')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>gōngjīn</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">公斤</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">gōngjīn</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Công cân</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Lượng từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Cân, ki-lô-gam (kg)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我瘦了两公斤。<button onclick="speakText('我瘦了两公斤。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ shòu le liǎng gōngjīn.</div><div class="text-xs text-slate-500">Tôi đã gầy đi 2 kg.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('jiejie')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>jiějie</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">姐姐</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">jiějie</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Tỷ tỷ</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Khinh thanh (jie)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Chị gái</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">这是我姐姐。<button onclick="speakText('这是我姐姐。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zhè shì wǒ jiějie.</div><div class="text-xs text-slate-500">Đây là chị gái tôi.</div></td>
</tr>
"""

writing_sec_html = """
<div class="space-y-6">
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
        <div class="font-bold flex items-center gap-1.5 mb-1 text-sm text-amber-900">
            <span>📌 BẢNG THỦY TỔ THUẬN BÚT & CHIẾT TỰ HÁN TỰ BÀI 6</span>
        </div>
        <p>Học chi tiết 4 thành phần cho 100% từ mới: Số nét, Bộ thủ, Mẹo nhớ tượng hình và Thứ tự viết nét chuẩn.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">1. 门 (mén)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">3 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Môn 门 (cửa)</div>
                <div><b>💡 Mẹo nhớ:</b> Chữ tượng hình hai cánh cửa khép mở.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-men" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">门</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">2. 自行车 (zìxíngchē)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">6/6/4 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Tự 自 + Bộ Hành 行 + Bộ Xa 车</div>
                <div><b>💡 Mẹo nhớ:</b> Tự 自 bản thân di chuyển 行 trên xe 车 đạp.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-zi" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">自</span></div>
                <div class="flex flex-col items-center"><div id="target-xing" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">行</span></div>
                <div class="flex flex-col items-center"><div id="target-che" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">车</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">3. 羊肉 (yángròu)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">6/6 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Dương 羊 + Bộ Nhục 肉</div>
                <div><b>💡 Mẹo nhớ:</b> Con dê/cừu 羊 cung cấp thịt 肉 ngon.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-yang" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">羊</span></div>
                <div class="flex flex-col items-center"><div id="target-rou" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">肉</span></div>
            </div>
        </div>
    </div>
</div>
"""

grammar_sec_html = """
<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
            Đại từ nghi vấn "怎么" (Hỏi nguyên nhân / Thắc mắc bất ngờ)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Dùng để biểu thị sự ngạc nhiên, thắc mắc về nguyên nhân của một sự việc khác thường.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: Chủ ngữ + 怎么 + Động từ / Tính từ?</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>你<b>怎么</b>不吃了？(Sao bạn lại không ăn nữa?)</li>
                <li>你今天<b>怎么</b>没去上学？(Sao hôm nay bạn không đi học?)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
            Trợ từ "了" (Biểu thị sự thay đổi trạng thái mới)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Đứng ở cuối câu để biểu thị trạng thái đã có sự thay đổi so với trước đó.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Ví dụ:</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>我不吃了。(Tôi không ăn nữa - Trạng thái: Đã no rồi.)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
            Cặp liên từ "因为...，所以..." (Bởi vì... cho nên...)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Cặp liên từ dùng để diễn đạt mối quan hệ nguyên nhân - kết quả.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: 因为 + Nguyên nhân, 所以 + Kết quả</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li><b>因为</b>经常打篮球，<b>所以</b>我身体很好。(Bởi vì thường xuyên chơi bóng rổ cho nên sức khỏe tôi rất tốt.)</li>
            </ul>
        </div>
    </div>
</div>
"""

text_sec_html = """
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🚲</span> Bài khóa 1: 在学校 (Ở trường)</h3>
            <button onclick="playText('text1')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 门外这是谁的自行车？</div><div class="text-emerald-700 font-mono text-[11px]">Mén wài zhè shì shéi de zìxíngchē?</div><div class="text-slate-500">Ngoài cửa đây là xe đạp của ai thế?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 是我的。我今天骑自行车去学校。</div><div class="text-emerald-700 font-mono text-[11px]">Shì wǒ de. Wǒ jīntiān qí zìxíngchē qù xuéxiào.</div><div class="text-slate-500">Là của tôi. Hôm nay tôi đi xe đạp đến trường.</div></div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🍲</span> Bài khóa 2: 在饭馆 (Ở nhà hàng)</h3>
            <button onclick="playText('text2')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 你怎么不吃了？</div><div class="text-emerald-700 font-mono text-[11px]">Nǐ zěnme bù chī le?</div><div class="text-slate-500">Sao bạn không ăn nữa?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 今天的羊肉很好吃，但我吃饱了。</div><div class="text-emerald-700 font-mono text-[11px]">Jīntiān de yángròu hěn hǎochī, dàn wǒ chī bǎo le.</div><div class="text-slate-500">Thịt dê hôm nay rất ngon, nhưng tôi no rồi.</div></div>
        </div>
    </div>
</div>
"""

practice_sec_html = """
<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2"><span>✍️</span> Phần 1: Bài tập Từ vựng (Điền từ vào chỗ trống)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">1. 今天的 ( ) 很好吃，你尝尝吧。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 羊肉</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 游泳</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 公斤</button>
                </div>
            </div>
        </div>
    </div>
</div>
"""

def generate_full_html(is_writing_sim=True):
    title = "HSK 2 - Bài 6: 第六课 你怎么不吃了 (Có Mô Phỏng Nét Viết)" if is_writing_sim else "HSK 2 - Bài 6: 第六课 你怎么不吃了 (Tự Học)"
    
    items_js = """
    const items = [
        { "id": "men", "char": "门" },
        { "id": "zi", "char": "自" },
        { "id": "xing", "char": "行" },
        { "id": "che", "char": "车" },
        { "id": "yang", "char": "羊" },
        { "id": "rou", "char": "肉" },
        { "id": "hao", "char": "好" },
        { "id": "chi", "char": "吃" },
        { "id": "mian_tiao", "char": "面" },
        { "id": "tiao", "char": "条" },
        { "id": "da", "char": "打" },
        { "id": "lan", "char": "篮" },
        { "id": "qiu", "char": "球" },
        { "id": "yin", "char": "因" },
        { "id": "wei", "char": "为" },
        { "id": "suo", "char": "所" },
        { "id": "yi_suo", "char": "以" },
        { "id": "you", "char": "游" },
        { "id": "yong", "char": "泳" },
        { "id": "jing", "char": "经" },
        { "id": "chang", "char": "常" },
        { "id": "gong", "char": "公" },
        { "id": "jin", "char": "斤" },
        { "id": "jie", "char": "姐" }
    ];
    """

    return f"""<!DOCTYPE html>
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
        .tab-btn.active {{ color: #1e3a8a; font-weight: 700; border-bottom: 2px solid #1e3a8a; }}
        .writer-container {{ width: 100px; height: 100px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #ffffff; position: relative; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen pb-12">
    <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <header class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <span class="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Lộ trình HSK 2 Chuẩn</span>
                    <h1 class="text-2xl md:text-3xl font-bold mt-2 zh">第六课 你怎么不吃了</h1>
                    <p class="text-sm text-slate-300 mt-1">Bài 6: Sao bạn không ăn nữa (Tập viết, Từ vựng, Ngữ pháp & Bài tập)</p>
                </div>
            </div>
        </header>

        <nav class="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-xs overflow-x-auto text-xs md:text-sm font-medium text-slate-600">
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn active px-4 py-2.5 rounded-lg whitespace-nowrap transition">📚 Bảng Từ Vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 rounded-lg whitespace-nowrap transition">✍️ Tập Viết & Mẹo Nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 rounded-lg whitespace-nowrap transition">📖 Ngữ Pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 rounded-lg whitespace-nowrap transition">💬 Bài Khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 rounded-lg whitespace-nowrap transition">📝 Bài Tập</button>
        </nav>

        <main>
            <section id="sec-vocab" class="tab-content">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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
                            <tbody>{vocab_rows_html}</tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="sec-writing" class="tab-content hidden">{writing_sec_html}</section>
            <section id="sec-grammar" class="tab-content hidden">{grammar_sec_html}</section>
            <section id="sec-text" class="tab-content hidden">{text_sec_html}</section>
            <section id="sec-practice" class="tab-content hidden">{practice_sec_html}</section>
        </main>
    </div>

    <script>
        const VOCAB_AUDIO = {json.dumps(vocab_b64)};
        const TEXT_AUDIO = {json.dumps(text_b64)};
        {items_js}

        function playVocab(key) {{
            const b64 = VOCAB_AUDIO[key];
            if (b64) playB64(b64);
        }}

        function playText(key) {{
            const b64 = TEXT_AUDIO[key];
            if (b64) playB64(b64);
        }}

        function playB64(b64) {{
            try {{
                const audio = new Audio(b64);
                audio.play();
            }} catch(e) {{ console.error(e); }}
        }}

        function speakText(txt) {{
            if ('speechSynthesis' in window) {{
                const u = new SpeechSynthesisUtterance(txt);
                u.lang = 'zh-CN';
                window.speechSynthesis.speak(u);
            }}
        }}

        function showTab(tabId) {{
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active', 'text-blue-900', 'font-bold'));
            
            const target = document.getElementById('sec-' + tabId);
            if (target) target.classList.remove('hidden');

            const btn = document.getElementById('tab-' + tabId);
            if (btn) btn.classList.add('active', 'text-blue-900', 'font-bold');

            if (tabId === 'writing') setTimeout(initWriters, 150);
        }}

        function initWriters() {{
            if (typeof HanziWriter === 'undefined') return;
            items.forEach(item => {{
                const containerId = 'target-' + item.id;
                const container = document.getElementById(containerId);
                if (container && !writers[item.id]) {{
                    try {{
                        writers[item.id] = HanziWriter.create(containerId, item.char, {{
                            width: 100, height: 100, padding: 5, showOutline: true, strokeAnimationSpeed: 1, strokeColor: '#0f172a'
                        }});
                        writers[item.id].animateCharacter();
                    }} catch(e) {{ console.error(e); }}
                }}
            }});
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
</html>"""

with open(os.path.join(day6_dir, 'HSK2_Bai_6_Mo_Phong_Viet.html'), 'w', encoding='utf-8') as f:
    f.write(generate_full_html(True))

with open(os.path.join(day6_dir, 'HSK2_Bai_6_Tu_Hoc.html'), 'w', encoding='utf-8') as f:
    f.write(generate_full_html(False))

print('Successfully generated HSK2_Bai_6_Mo_Phong_Viet.html and HSK2_Bai_6_Tu_Hoc.html for Day 6!')
