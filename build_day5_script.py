# build_day5_script.py
import json, os, subprocess, base64

day5_dir = '/Users/trangngo95/Desktop/HSK/HSK2/Day 5'
audio_dir = os.path.join(day5_dir, 'audio')

words = {
    'waimian': '外面',
    'zhunbei': '准备',
    'jiu': '就',
    'yu': '鱼',
    'ba': '吧',
    'jian': '件',
    'hai': '还',
    'keyi': '可以',
    'bucuo': '不错',
    'kaoshi': '考试',
    'yisi': '意思',
    'kafei': '咖啡',
    'dui': '对'
}

texts = {
    'text1': '晚上我们吃什么？在家吃吧。我想做鱼，你看行吗？好啊，我跟你一起做。',
    'text2': '这件衣服真漂亮！你买吧。我再看看，这件有点儿贵。那件怎么样？颜色不错，价格也还行。就买那件吧。',
    'text3': '你觉得考得怎么样？听和说还可以，读和写不太好。有几个题我不会做。没关系，这次考试不太难。',
    'text4': '休息一下吧，喝杯咖啡。我不喝咖啡了，我已经喝了两杯了。喝咖啡对身体不好吗？茶对身体很好，咖啡喝多了对睡眠不好。'
}

vocab_b64 = {}
text_b64 = {}

for key, text in words.items():
    m4a_path = os.path.join(audio_dir, f'{key}.m4a')
    with open(m4a_path, 'rb') as f:
        vocab_b64[key] = f'data:audio/mp4;base64,{base64.b64encode(f.read()).decode("utf-8")}'

for key, text in texts.items():
    m4a_path = os.path.join(audio_dir, f'{key}.m4a')
    with open(m4a_path, 'rb') as f:
        text_b64[key] = f'data:audio/mp4;base64,{base64.b64encode(f.read()).decode("utf-8")}'

print('Loaded audio base64 for 13 words and 4 texts!')


# Build HTML content for Lesson 5
vocab_rows_html = """
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('waimian')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>wàimian</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">外面</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">wàimian</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Ngoại diện</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Bên ngoài, ngoài</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">外面下雨了。<button onclick="speakText('外面下雨了。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wàimian xià yǔ le.</div><div class="text-xs text-slate-500">Bên ngoài trời mưa rồi.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('zhunbei')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>zhǔnbèi</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">准备</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">zhǔnbèi</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Chuẩn bị</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Động từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Chuẩn bị, dự định</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我准备考试呢。<button onclick="speakText('我准备考试呢。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ zhǔnbèi kǎoshì ne.</div><div class="text-xs text-slate-500">Tôi đang chuẩn bị thi.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('jiu')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>jiù</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">就</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">jiù</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Tựu</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Phó từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Thì, chính, ngay (Chỉ kết luận)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">就买这件吧。<button onclick="speakText('就买这件吧。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Jiù mǎi zhè jiàn ba.</div><div class="text-xs text-slate-500">Thì mua chiếc này đi.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('yu')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>yú</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">鱼</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">yú</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Ngư</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Cá</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我想做鱼。<button onclick="speakText('我想做鱼。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ xiǎng zuò yú.</div><div class="text-xs text-slate-500">Tôi muốn làm món cá.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('ba')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>ba</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">吧</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">ba</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Ba</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Trợ từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Khinh thanh (Thanh nhẹ)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Nhé, đi (Trợ từ đề nghị)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">在家吃吧。<button onclick="speakText('在家吃吧。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zàijiā chī ba.</div><div class="text-xs text-slate-500">Ăn ở nhà nhé.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('jian')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>jiàn</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">件</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">jiàn</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Kiện</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Lượng từ</td>
    <td class="py-3.5 px-3 text-xs text-amber-700 font-mono bg-amber-50 rounded px-1.5 py-0.5">yī jiàn ➔ yí jiàn (Thanh 2)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Chiếc, cái (Quần áo, việc)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">这件衣服真漂亮。<button onclick="speakText('这件衣服真漂亮。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zhè jiàn yīfu zhēn piàoliang.</div><div class="text-xs text-slate-500">Chiếc áo này thật đẹp!</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('hai')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>hái</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">还</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">hái</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Hoàn</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Phó từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Còn, vẫn, khá (Chỉ trình độ)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">价格也还行。<button onclick="speakText('价格也还行。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Jiàgé yě hái xíng.</div><div class="text-xs text-slate-500">Giá cả cũng khá tạm được.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('keyi')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>kěyǐ</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">可以</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">kěyǐ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Khả dĩ</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Tính từ/Động từ</td>
    <td class="py-3.5 px-3 text-xs text-amber-700 font-mono bg-amber-50 rounded px-1.5 py-0.5">kě yǐ ➔ ké yǐ (Biến 3+3)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Có thể, khá tốt, tạm được</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">听和说还可以。<button onclick="speakText('听和说还可以。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Tīng hé shuō hái kěyǐ.</div><div class="text-xs text-slate-500">Nghe và nói cũng tạm ổn.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('bucuo')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>búcuò</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">不错</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">búcuò</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Bất thố</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Tính từ</td>
    <td class="py-3.5 px-3 text-xs text-amber-700 font-mono bg-amber-50 rounded px-1.5 py-0.5">bù cuò ➔ bú cuò (Biến 不)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Không tệ, khá tốt, chuẩn</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">颜色不错。<button onclick="speakText('颜色不错。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Yánsè búcuò.</div><div class="text-xs text-slate-500">Màu sắc khá đẹp.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('kaoshi')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>kǎoshì</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">考试</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">kǎoshì</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Khảo thí</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Động từ/Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Thi, kỳ thi, kiểm tra</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">这次考试不太难。<button onclick="speakText('这次考试不太难。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zhè cì kǎoshì bú tài nán.</div><div class="text-xs text-slate-500">Lần thi này không khó lắm.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('yisi')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>yìsi</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">意思</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">yìsi</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Ý tư</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Khinh thanh (si)</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Ý nghĩa, sự thú vị</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">这个词是什么意思？<button onclick="speakText('这个词是什么意思？')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Zhège cí shì shénme yìsi?</div><div class="text-xs text-slate-500">Từ này có nghĩa là gì?</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('kafei')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>kāfēi</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">咖啡</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">kāfēi</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Kha phi</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Danh từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Cà phê</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">我想喝杯咖啡。<button onclick="speakText('我想喝杯咖啡。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Wǒ xiǎng hē bēi kāfēi.</div><div class="text-xs text-slate-500">Tôi muốn uống tách cà phê.</div></td>
</tr>
<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('dui')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>duì</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">对</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">duì</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">Đối</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">Giới từ/Tính từ</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">Bình thường</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">Đối với, đúng (Giới từ chỉ đối tượng)</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">喝牛奶对身体很好。<button onclick="speakText('喝牛奶对身体很好。')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">Hē niúnǎi duì shēntǐ hěn hǎo.</div><div class="text-xs text-slate-500">Uống sữa rất tốt cho sức khỏe.</div></td>
</tr>
"""

print('Vocab rows ready!')


writing_sec_html = """
<div class="space-y-6">
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
        <div class="font-bold flex items-center gap-1.5 mb-1 text-sm text-amber-900">
            <span>📌 BẢNG THỦY TỔ THUẬN BÚT & CHIẾT TỰ HÁN TỰ BÀI 5</span>
        </div>
        <p>Học chi tiết 4 thành phần cho 100% từ mới: Số nét, Bộ thủ, Mẹo nhớ tượng hình và Thứ tự viết nét chuẩn.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">1. 外面 (wàimian)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">5 nét / 9 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Tịch 夕 (đêm tối) + Bộ Diện 面 (mặt)</div>
                <div><b>💡 Mẹo nhớ:</b> Đêm tối 夕 ra <b>bên ngoài</b> xem quẻ. Khuôn mặt 面 lộ ra phía ngoài.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-wai" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">外</span></div>
                <div class="flex flex-col items-center"><div id="target-mian" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">面</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">2. 准备 (zhǔnbèi)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">10 nét / 8 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Băng 冫 + Bộ Chuy 隹 + Bộ Tịch 夕</div>
                <div><b>💡 Mẹo nhớ:</b> Chim 隹 <b>chuẩn bị</b> sẵn sàng trước mùa băng giá 冫. Tối 夕 về dọn ruộng 田.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-zhun" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">准</span></div>
                <div class="flex flex-col items-center"><div id="target-bei" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">备</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">3. 就 (jiù)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">12 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Kinh 京 (thủ đô) + 尤</div>
                <div><b>💡 Mẹo nhớ:</b> Đến <b>ngay/chính</b> thủ đô là quyết định dứt khoát.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-jiu" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">就</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">4. 鱼 (yú)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">8 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Ngư 鱼 (con cá)</div>
                <div><b>💡 Mẹo nhớ:</b> Chữ tượng hình con cá <b>鱼</b> có đầu, thân và vây.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-yu" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">鱼</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">5. 考试 (kǎoshì)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">6 nét / 8 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Lão 老 + Bộ Ngôn 言</div>
                <div><b>💡 Mẹo nhớ:</b> Thầy giáo già 老 chấm bài <b>thi cử/kiểm tra</b> dùng lời nói 言.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-kao" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">考</span></div>
                <div class="flex flex-col items-center"><div id="target-shi" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">试</span></div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 zh text-lg">6. 咖啡 (kāfēi)</span>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">8 nét / 11 nét</span>
            </div>
            <div class="text-xs text-slate-600 space-y-1">
                <div><b>Bộ thủ:</b> Bộ Khẩu 口 + Bộ Gia 加 + 非</div>
                <div><b>💡 Mẹo nhớ:</b> Mở miệng 口 uống <b>cà phê</b> thơm lừng gia 加 tăng năng lượng.</div>
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex flex-col items-center"><div id="target-ka" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">咖</span></div>
                <div class="flex flex-col items-center"><div id="target-fei" class="writer-container"></div><span class="text-[10px] text-slate-400 mt-1 zh">啡</span></div>
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
            Phó từ "就" (Nhấn mạnh kết luận / Lựa chọn kiên định)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Phó từ <b>就 (jiù)</b> đứng trước động từ để biểu thị kết luận hoặc sự lựa chọn dứt khoát dựa trên tình huống trước đó.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: Lý do / Tình huống + 就 + Động từ + (Trợ từ)</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>你不想去，<b>就</b>别去了。(Bạn không muốn đi thì đừng đi nữa.)</li>
                <li>这件衣服漂亮，<b>就</b>买这件吧。(Áo này đẹp, thì mua chiếc này đi.)</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
            Biểu thị trình độ "还 + Tính từ" (Tạm được / Khá tốt)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Cấu trúc <b>还 + Tính từ</b> biểu thị mức độ chấp nhận được, tạm ổn, không đến mức quá tốt nhưng cũng không tệ.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Ví dụ thông dụng:</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li><b>还行</b> (hái xíng) - Tạm ổn / Cũng được</li>
                <li><b>还可以</b> (hái kěyǐ) - Khá tốt / Tạm được</li>
                <li><b>还好</b> (hái hǎo) - Cũng tốt / Không sao</li>
            </ul>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
            Giới từ "对" (Đối với / Với đối tượng)
        </h3>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">Giới từ <b>对 (duì)</b> được dùng để chỉ đối tượng chịu sự tác động hoặc thái độ của chủ ngữ.</p>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
            <div class="font-semibold text-blue-900">Cấu trúc: Chủ ngữ + 对 + Đối tượng + Tính từ / Động từ</div>
            <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>喝牛奶<b>对身体</b>很好。(Uống sữa rất tốt cho sức khỏe.)</li>
                <li>跑步<b>对健康</b>有好处。(Chạy bộ có lợi cho sức khỏe.)</li>
            </ul>
        </div>
    </div>
</div>
"""

text_sec_html = """
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🏡</span> Bài khóa 1: 在家 (Ở nhà)</h3>
            <button onclick="playText('text1')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 晚上我们吃什么？</div><div class="text-emerald-700 font-mono text-[11px]">Wǎnshang wǒmen chī shénme?</div><div class="text-slate-500">Tối nay chúng ta ăn gì?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 在家吃吧。</div><div class="text-emerald-700 font-mono text-[11px]">Zàijiā chī ba.</div><div class="text-slate-500">Ăn ở nhà nhé.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 我想做鱼，你看行吗？</div><div class="text-emerald-700 font-mono text-[11px]">Wǒ xiǎng zuò yú, nǐ kàn xíng ma?</div><div class="text-slate-500">Tôi muốn làm món cá, bạn xem có được không?</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 好啊，我跟你一起做。</div><div class="text-emerald-700 font-mono text-[11px]">Hǎo a, wǒ gēn nǐ yìqǐ zuò.</div><div class="text-slate-500">Được chứ, tôi làm cùng bạn.</div></div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>🛍️</span> Bài khóa 2: 在商店 (Ở cửa hàng)</h3>
            <button onclick="playText('text2')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 这件衣服真漂亮！你买吧。</div><div class="text-emerald-700 font-mono text-[11px]">Zhè jiàn yīfu zhēn piàoliang! Nǐ mǎi ba.</div><div class="text-slate-500">Chiếc áo này thật đẹp! Bạn mua đi.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 我再看看，这件有点儿贵。</div><div class="text-emerald-700 font-mono text-[11px]">Wǒ zài kànkan, zhè jiàn yǒudǐanr guì.</div><div class="text-slate-500">Tôi xem lại đã, chiếc này hơi đắt.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">A: 那件怎么样？颜色不错，价格也还行。</div><div class="text-emerald-700 font-mono text-[11px]">Nà jiàn zěnmeyàng? Yánsè búcuò, jiàgé yě hái xíng.</div><div class="text-slate-500">Chiếc kia thế nào? Màu sắc khá đẹp, giá cả cũng tạm ổn.</div></div>
            <div class="p-2.5 bg-slate-50 rounded-xl"><div class="font-bold text-blue-950 zh text-sm">B: 就买那件吧。</div><div class="text-emerald-700 font-mono text-[11px]">Jiù mǎi nà jiàn ba.</div><div class="text-slate-500">Thì mua chiếc kia đi.</div></div>
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
                <div class="font-medium text-slate-900 mb-2 zh text-sm">1. 这件衣服 ( ) 不错，价格也还行。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 考试</button>
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 颜色</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 咖啡</button>
                </div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">2. 我下个月准备 ( ) 汉语 HSK 2。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 考试</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 准备</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 外面</button>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2"><span>🧩</span> Phần 2: Bài tập Ngữ pháp (Chọn đáp án đúng)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl">
                <div class="font-medium text-slate-900 mb-2 zh text-sm">1. 喝牛奶 ( ) 身体非常好。</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 就</button>
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 对</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 还</button>
                </div>
            </div>
        </div>
    </div>
</div>
"""

print('Assembled all HTML sections for Lesson 5!')


# Template generator function
def generate_full_html(is_writing_sim=True):
    title = "HSK 2 - Bài 5: 第五课 就买这件吧 (Có Mô Phỏng Nét Viết)" if is_writing_sim else "HSK 2 - Bài 5: 第五课 就买这件吧 (Tự Học)"
    
    items_js = """
    const items = [
        { id: 'wai', char: '外' },
        { id: 'mian', char: '面' },
        { id: 'zhun', char: '准' },
        { id: 'bei', char: '备' },
        { id: 'jiu', char: '就' },
        { id: 'yu', char: '鱼' },
        { id: 'ba', char: '吧' },
        { id: 'jian', char: '件' },
        { id: 'hai', char: '还' },
        { id: 'ke', char: '可' },
        { id: 'yi', char: '以' },
        { id: 'bu', char: '不' },
        { id: 'cuo', char: '错' },
        { id: 'kao', char: '考' },
        { id: 'shi', char: '试' },
        { id: 'yi_si', char: '意' },
        { id: 'si', char: '思' },
        { id: 'ka', char: '咖' },
        { id: 'fei', char: '啡' },
        { id: 'dui', char: '对' }
    ];
    """

    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
                    <h1 class="text-2xl md:text-3xl font-bold mt-2 zh">第五课 就买这件吧</h1>
                    <p class="text-sm text-slate-300 mt-1">Bài 5: Mua chiếc này đi (Tập viết, Từ vựng, Ngữ pháp & Bài tập)</p>
                </div>
                <div class="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-700/50">
                    <span class="text-xs text-slate-300 ml-1">Tốc độ đọc:</span>
                    <button onclick="setSpeed(0.75)" id="spd-075" class="px-2.5 py-1 text-xs rounded-lg font-bold bg-white text-blue-950 shadow-xs transition">0.75x</button>
                    <button onclick="setSpeed(1.0)" id="spd-100" class="px-2.5 py-1 text-xs rounded-lg font-medium text-slate-300 hover:text-white transition">1.0x</button>
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

        let audioPlaybackSpeed = 0.75;
        let writers = {{}};

        function setSpeed(spd) {{
            audioPlaybackSpeed = spd;
            document.getElementById('spd-075').className = spd === 0.75 ? "px-2.5 py-1 text-xs rounded-lg font-bold bg-white text-blue-950 shadow-xs transition" : "px-2.5 py-1 text-xs rounded-lg font-medium text-slate-300 hover:text-white transition";
            document.getElementById('spd-100').className = spd === 1.0 ? "px-2.5 py-1 text-xs rounded-lg font-bold bg-white text-blue-950 shadow-xs transition" : "px-2.5 py-1 text-xs rounded-lg font-medium text-slate-300 hover:text-white transition";
        }}

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
                audio.playbackRate = audioPlaybackSpeed;
                audio.play();
            }} catch(e) {{
                console.error(e);
            }}
        }}

        function speakText(txt) {{
            if ('speechSynthesis' in window) {{
                const u = new SpeechSynthesisUtterance(txt);
                u.lang = 'zh-CN';
                u.rate = audioPlaybackSpeed;
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

# Write files
with open(os.path.join(day5_dir, 'HSK2_Bai_5_Mo_Phong_Viet.html'), 'w', encoding='utf-8') as f:
    f.write(generate_full_html(True))

with open(os.path.join(day5_dir, 'HSK2_Bai_5_Tu_Hoc.html'), 'w', encoding='utf-8') as f:
    f.write(generate_full_html(False))

print('Successfully generated HSK2_Bai_5_Mo_Phong_Viet.html and HSK2_Bai_5_Tu_Hoc.html!')
