import os, base64, json

hsk_dir = '/Users/trangngo95/Desktop/HSK'
day6_dir = os.path.join(hsk_dir, 'HSK2/Day 6')
audio_dir = os.path.join(day6_dir, 'audio')

vocab_audio = {}
text_audio = {}

if os.path.exists(audio_dir):
    for f in os.listdir(audio_dir):
        if f.endswith('.m4a'):
            key = f.replace('.m4a', '')
            path = os.path.join(audio_dir, f)
            with open(path, 'rb') as af:
                b64 = base64.b64encode(af.read()).decode('utf-8')
                data_uri = f'data:audio/mp4;base64,{b64}'
                if key.startswith('text'):
                    text_audio[key] = data_uri
                else:
                    vocab_audio[key] = data_uri

sim_chars = [
    ('men-1', '门', 'mén', '门 (Cửa, cổng)'),
    ('wai-1', '外', 'wài', '门外 (Bên ngoài cửa)'),
    ('zixingche-1', '自', 'zì', '自行车 (Xe đạp)'),
    ('zixingche-2', '行', 'xíng', '自行车 (Xe đạp)'),
    ('zixingche-3', '车', 'chē', '自行车 (Xe đạp)'),
    ('yangrou-1', '羊', 'yáng', '羊肉 (Thịt dê)'),
    ('yangrou-2', '肉', 'ròu', '羊肉 (Thịt dê)'),
    ('haochi-1', '好', 'hǎo', '好吃 (Ngon)'),
    ('haochi-2', '吃', 'chī', '好吃 (Ngon)'),
    ('miantiao-1', '面', 'miàn', '面条 (Mì)'),
    ('miantiao-2', '条', 'tiáo', '面条 (Mì)'),
    ('dalanqiu-1', '打', 'dǎ', '打篮球 (Bóng rổ)'),
    ('dalanqiu-2', '篮', 'lán', '打篮球 (Bóng rổ)'),
    ('dalanqiu-3', '球', 'qiú', '打篮球 (Bóng rổ)'),
    ('yinwei-1', '因', 'yīn', '因为 (Bởi vì)'),
    ('yinwei-2', '为', 'wèi', 'เพราะ/因为 (Bởi vì)'),
    ('suoyi-1', '所', 'suǒ', '所以 (Cho nên)'),
    ('suoyi-2', '以', 'yǐ', '所以 (Cho nên)'),
    ('youyong-1', '游', 'yóu', '游泳 (Bơi lội)'),
    ('youyong-2', '泳', 'yǒng', '游泳 (Bơi lội)'),
    ('jingchang-1', '经', 'jīng', '经常 (Thường xuyên)'),
    ('jingchang-2', '常', 'cháng', '经常 (Thường xuyên)'),
    ('gongjin-1', '公', 'gōng', '公斤 (Ki-lô-gam)'),
    ('gongjin-2', '斤', 'jīn', '公斤 (Ki-lô-gam)'),
    ('jiejie-1', '姐', 'jiě', '姐姐 (Chị gái)')
]

sim_cards_html = ""
writer_inits_js = ""
pad_inits_js = ""

for cid, char, py, note in sim_chars:
    sim_cards_html += f'''
                <!-- {char} -->
                <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                    <div class="text-center">
                        <span class="text-2xl font-bold text-slate-800 zh">{char}</span>
                        <span class="text-xs text-slate-500 block">{py}</span>
                        <span class="text-[11px] text-slate-400 block">{note}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2 w-full">
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">HanziWriter</span>
                            <div id="target-{cid}" class="writer-container w-[105px] h-[105px] bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-inner"></div>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-slate-400 mb-1 font-semibold">Tianzige Ô Vẽ</span>
                            <div class="relative w-[105px] h-[105px] bg-amber-50/40 rounded-xl border-2 border-amber-200 shadow-inner overflow-hidden">
                                <canvas id="pad-{cid}" width="105" height="105" class="pad-canvas relative z-10 w-full h-full cursor-crosshair touch-none"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 w-full pt-1">
                        <button onclick="animateChar('{cid}')" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition">▶ Chạy nét</button>
                        <button onclick="resetChar('{cid}')" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition">🔄</button>
                        <button onclick="clearCanvas('{cid}')" class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs border border-rose-200 transition">🗑️</button>
                    </div>
                </div>'''
    
    writer_inits_js += f"            if (!writers['{cid}']) {{ writers['{cid}'] = HanziWriter.create('target-{cid}', '{char}', {{ width: 98, height: 98, padding: 5, strokeAnimationSpeed: 1, showOutline: true, showCharacter: true }}); }}\n"
    pad_inits_js += f"            if (!pads['{cid}']) {{ pads['{cid}'] = initCanvas('pad-{cid}'); }}\n"


vocab_rows_html = '''
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('men')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶mén</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">门</td>
                            <td class="p-3 font-medium text-slate-700">mén</td>
                            <td class="p-3 text-slate-600">Môn</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ / Lượng từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Cửa, cổng, môn học</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">门外是谁？</span><button onclick="playVocab('men')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Mén wài shì shéi? (Bên ngoài cửa là ai thế?)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('wai')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶wài</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">外</td>
                            <td class="p-3 font-medium text-slate-700">wài</td>
                            <td class="p-3 text-slate-600">Ngoại</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Bên ngoài, ngoài</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">门外有一辆自行车。</span><button onclick="playVocab('wai')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Mén wài yǒu yí liàng zìxíngchē. (Ngoài cửa có 1 chiếc xe đạp.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('zixingche')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶zìxíngchē</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">自行车</td>
                            <td class="p-3 font-medium text-slate-700">zìxíngchē</td>
                            <td class="p-3 text-slate-600">Tự hành xa</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Xe đạp</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">我骑自行车去学校。</span><button onclick="playVocab('zixingche')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Wǒ qí zìxíngchē qù xuéxiào. (Tôi đi xe đạp đến trường.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('yangrou')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶yángròu</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">羊肉</td>
                            <td class="p-3 font-medium text-slate-700">yángròu</td>
                            <td class="p-3 text-slate-600">Dương nhục</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Thịt dê, thịt cừu</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">今天的羊肉很好吃。</span><button onclick="playVocab('yangrou')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Jīntiān de yángròu hěn hǎochī. (Thịt dê hôm nay rất ngon.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('haochi')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶hǎochī</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">好吃</td>
                            <td class="p-3 font-medium text-slate-700">hǎochī</td>
                            <td class="p-3 text-slate-600">Hảo ngật</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Tính từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Ngon (Thức ăn)</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">这个菜很好吃。</span><button onclick="playVocab('haochi')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Zhège cài hěn hǎochī. (Món ăn này rất ngon.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('miantiao')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶miàntiáo</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">面条</td>
                            <td class="p-3 font-medium text-slate-700">miàntiáo</td>
                            <td class="p-3 text-slate-600">Diện điều</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Mì, sợi mì</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">再吃一点儿面条吧。</span><button onclick="playVocab('miantiao')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Zài chī yìdiǎnr miàntiáo ba. (Ăn thêm chút mì nhé.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('dalanqiu')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶dǎ lánqiú</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">打篮球</td>
                            <td class="p-3 font-medium text-slate-700">dǎ lánqiú</td>
                            <td class="p-3 text-slate-600">Đả lam cầu</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Cụm Động từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Chơi bóng rổ</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">我非常喜欢打篮球。</span><button onclick="playVocab('dalanqiu')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Wǒ fēicháng xǐhuan dǎ lánqiú. (Tôi rất thích chơi bóng rổ.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('yinwei')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶yīnwèi</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">因为</td>
                            <td class="p-3 font-medium text-slate-700">yīnwèi</td>
                            <td class="p-3 text-slate-600">Nhân vi</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Liên từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Bởi vì, vì (Chỉ nguyên nhân)</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">因为天气不好...</span><button onclick="playVocab('yinwei')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Yīnwèi tiānqì bù hǎo... (Bởi vì thời tiết không tốt...)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('suoyi')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶suǒyǐ</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">所以</td>
                            <td class="p-3 font-medium text-slate-700">suǒyǐ</td>
                            <td class="p-3 text-slate-600">Sở dĩ</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Liên từ</td>
                            <td class="p-3 text-xs text-amber-600 font-semibold">suǒ yǐ ➔ suó yǐ (Biến 3+3)</td>
                            <td class="p-3 font-semibold text-slate-800">Cho nên, vì vậy (Chỉ kết quả)</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">所以我们没去。</span><button onclick="playVocab('suoyi')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Suǒyǐ wǒmen méi qù. (Cho nên chúng tôi không đi.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('youyong')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶yóuyǒng</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">游泳</td>
                            <td class="p-3 font-medium text-slate-700">yóuyǒng</td>
                            <td class="p-3 text-slate-600">Du vịnh</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Động từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Bơi lội, đi bơi</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">我每个星期去游泳。</span><button onclick="playVocab('youyong')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Wǒ měi ge xīngqī qù yóuyǒng. (Mỗi tuần tôi đều đi bơi.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('jingchang')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶jīngcháng</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">经常</td>
                            <td class="p-3 font-medium text-slate-700">jīngcháng</td>
                            <td class="p-3 text-slate-600">Kinh thường</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Phó từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Thường xuyên, thường</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">他经常去打球。</span><button onclick="playVocab('jingchang')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Tā jīngcháng qù dǎqiú. (Cậu ấy thường xuyên đi chơi bóng.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('gongjin')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶gōngjīn</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">公斤</td>
                            <td class="p-3 font-medium text-slate-700">gōngjīn</td>
                            <td class="p-3 text-slate-600">Công cân</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Lượng từ</td>
                            <td class="p-3 text-xs text-slate-500">Bình thường</td>
                            <td class="p-3 font-semibold text-slate-800">Cân, ki-lô-gam (kg)</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">我买了三公斤苹果。</span><button onclick="playVocab('gongjin')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Wǒ mǎi le sān gōngjīn píngguǒ. (Tôi đã mua 3 kg táo.)</span></td>
                        </tr>
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="p-3 text-center"><button onclick="playVocab('jiejie')" class="audio-btn p-2 bg-blue-100 text-blue-900 rounded-xl font-bold hover:bg-blue-200">▶jiějie</button></td>
                            <td class="p-3 font-bold text-lg text-blue-950 zh">姐姐</td>
                            <td class="p-3 font-medium text-slate-700">jiějie</td>
                            <td class="p-3 text-slate-600">Tỷ tỷ</td>
                            <td class="p-3 text-xs bg-slate-100 rounded-lg font-medium text-slate-600">Danh từ</td>
                            <td class="p-3 text-xs text-slate-500">Khinh thanh (jie)</td>
                            <td class="p-3 font-semibold text-slate-800">Chị gái</td>
                            <td class="p-3 text-sm text-slate-700"><span class="zh font-medium">这是我姐姐。</span><button onclick="playVocab('jiejie')" class="ml-1 text-blue-600 hover:text-blue-800">🔊</button><br><span class="text-xs text-slate-500">Zhè shì wǒ jiějie. (Đây là chị gái tôi.)</span></td>
                        </tr>
'''

writing_cards_html = '''
            <!-- THẺ CHIẾT TỰ 4 THÀNH PHẦN CHO 100% TỪ MỚI -->
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-blue-950 mb-4 border-b pb-2">🎴 Thẻ Chiết Tự & Mẹo Nhớ Tượng Hình (100% Từ Mới - 25 Chữ Hán)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <!-- 1. 门 / 外 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">门</span>
                            <span class="text-sm font-semibold text-slate-700">mén - Cửa, cổng, môn học</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 3 nét | <b>(2) Bộ thủ:</b> Bộ Môn 门</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình 2 cánh cửa gỗ đóng mở thời xưa với chốt cửa gài bên trong che chắn ngôi nhà khỏi mưa nắng và gió bão, đồng thời là lối ra vào duy nhất của gia đình.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Chấm ➔ Sổ ➔ Ngang gập móc.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">外</span>
                            <span class="text-sm font-semibold text-slate-700">wài - Bên ngoài, ngoại</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 5 nét | <b>(2) Bộ thủ:</b> Bộ Tịch 夕 (buổi tối) + Bộ Bốc 卜 (bói toán)</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Tịch 夕 (buổi tối) và bộ Bốc 卜 (bói toán). Ban ngày bói trong nhà, nếu chiều tối (夕) mới phải ra ngoài bói (卜) tức là có việc gấp ở "bên ngoài" (外).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Ngang gập ➔ Chấm ➔ Sổ ➔ Chấm.</p>
                        </div>
                    </div>

                    <!-- 2. 自行车 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">自</span>
                            <span class="text-sm font-semibold text-slate-700">zì - Tự bản thân, chiếc mũi</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Tự 自 (mũi)</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình chiếc mũi người. Người xưa khi tự xưng "tôi / chính tôi" thường trỏ tay vào mũi, nên chiếc mũi đại diện cho "tự bản thân, chính mình".</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Sổ ➔ Ngang gập ➔ Ngang ➔ Ngang ➔ Ngang.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">行</span>
                            <span class="text-sm font-semibold text-slate-700">xíng - Bước đi, di chuyển, ngã tư</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Hành 行</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình ngã tư đường phố giao nhau rộng lớn. Nét bên trái và bên phải đại diện cho hai bên lề đường nơi người và xe cộ di chuyển tấp nập.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Phẩy ➔ Sổ ➔ Ngang ➔ Ngang ➔ Sổ móc.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">车</span>
                            <span class="text-sm font-semibold text-slate-700">chē - Xe cộ, cỗ xe</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 4 nét | <b>(2) Bộ thủ:</b> Bộ Xa 车</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình cỗ xe ngựa nhìn từ trên xuống: 2 nét ngang là 2 bánh xe, khung ở giữa là thùng xe, nét sổ là trục xe nối liền hai bánh.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Ngang ➔ Phẩy gập ➔ Ngang ➔ Sổ thẳng.</p>
                        </div>
                    </div>

                    <!-- 3. 羊肉 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">羊</span>
                            <span class="text-sm font-semibold text-slate-700">yáng - Con dê, con cừu</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Dương 羊</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình chiếc đầu dê nhìn từ phía trước: nét 丷 trên cùng là 2 sừng cong vút, 3 nét ngang biểu thị trán, mũi, cằm, nét sổ ở giữa biểu thị bộ râu dê xỏ xuống.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Chấm ➔ Phẩy ➔ Ngang ➔ Ngang ➔ Ngang ➔ Sổ thẳng.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">肉</span>
                            <span class="text-sm font-semibold text-slate-700">ròu - Thịt gia súc</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Nhục 肉</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình tảng thịt xẻ ra treo trên giá: khung ngoài (冂) là cái móc treo thịt, hai chữ Nhân (人人) ở bên trong tượng hình các thớ thịt tươi ngon.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Sổ ➔ Ngang gập móc ➔ Phẩy ➔ Chấm ➔ Phẩy ➔ Chấm.</p>
                        </div>
                    </div>

                    <!-- 4. 好吃 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">好</span>
                            <span class="text-sm font-semibold text-slate-700">hǎo - Tốt, ngon, đẹp</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Nữ 女 + Bộ Tử 子</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Nữ 女 (người mẹ) và bộ Tử 子 (đứa con). Hình ảnh người mẹ bế đứa con yêu quý vào lòng vỗ về thể hiện tình mẫu tử thiêng liêng "tốt đẹp" (好).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy gập ➔ Phẩy ➔ Ngang ➔ Ngang móc ➔ Sổ cong móc ➔ Ngang.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">吃</span>
                            <span class="text-sm font-semibold text-slate-700">chī - Ăn, nạp thức ăn</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Khẩu 口 + Bộ Cật 乞</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Khẩu 口 (miệng) bên trái và chữ Cật 乞 (nạp vào, nhận) bên phải. Con người phải há cái miệng (口) ra để tiếp nhận (乞) lương thực, tạo thành hành động "ăn" (吃).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Sổ ➔ Ngang gập ➔ Ngang ➔ Phẩy ➔ Ngang gập cong móc.</p>
                        </div>
                    </div>

                    <!-- 5. 面条 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">面</span>
                            <span class="text-sm font-semibold text-slate-700">miàn - Khuôn mặt, bề mặt, mì</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 9 nét | <b>(2) Bộ thủ:</b> Bộ Diện 面</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình khuôn mặt con người với mắt mũi ở giữa, từ nghĩa gốc "khuôn mặt" mở rộng thành "bề mặt", rồi thành "bột mì" và các món "sợi mì" làm từ bột mì.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Ngang ➔ Sổ ➔ Ngang gập ➔ Ngang ➔ Ngang ➔ Sổ ➔ Ngang ➔ Ngang ➔ Ngang.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">条</span>
                            <span class="text-sm font-semibold text-slate-700">tiáo - Sợi, cành cây thon dài</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 7 nét | <b>(2) Bộ thủ:</b> Bộ Mộc 木 + Bộ Chi 夂</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Chi 夂 ở trên và bộ Mộc 木 ở dưới. Tượng hình những cành cây nhỏ rủ xuống dài thanh mảnh, dùng làm lượng từ cho vật thon dài như sợi mì (面条).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Ngang gập ➔ Phẩy ➔ Ngang ➔ Sổ ➔ Phẩy ➔ Mác.</p>
                        </div>
                    </div>

                    <!-- 6. 打篮球 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">打</span>
                            <span class="text-sm font-semibold text-slate-700">dǎ - Đánh, đập, chơi bóng</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 5 nét | <b>(2) Bộ thủ:</b> Bộ Thủ 扌 + Bộ Đinh 丁</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Thủ 扌 (bàn tay) bên trái và chữ Đinh 丁 (hình chiếc đinh) bên phải. Bàn tay cầm búa đập vung lực đóng chiếc đinh vào gỗ, biểu thị hành động bằng tay và chơi thể thao (打篮球).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Ngang ➔ Sổ móc ➔ Hất ➔ Ngang ➔ Sổ móc.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">篮</span>
                            <span class="text-sm font-semibold text-slate-700">lán - Cái rổ, cái giỏ</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 16 nét | <b>(2) Bộ thủ:</b> Bộ Trúc 𥫗 + Chữ Giám 监</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Trúc 𥫗 (nan tre) ở trên và chữ Giám 监 ở dưới. Chiếc rổ đan bằng nan tre nứa dùng để đựng đồ ăn và làm khung rổ hứng quả bóng rổ (篮球).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Bộ Trúc 𥫗 (6 nét) ở trên ➔ Chữ Giám 监 (10 nét) ở dưới.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">球</span>
                            <span class="text-sm font-semibold text-slate-700">qiú - Quả bóng, viên ngọc tròn</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 11 nét | <b>(2) Bộ thủ:</b> Bộ Vương 王 + Chữ Cầu 求</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Vương 王 (viên ngọc tròn nhẵn) bên trái và chữ Cầu 求 (khát khao) bên phải. Quả bóng hình khối cầu tròn xoe lấp lánh như viên ngọc quý mà mọi vận động viên tranh giành.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Bộ Vương 王 (4 nét bên trái) ➔ Chữ Cầu 求 (7 nét bên phải).</p>
                        </div>
                    </div>

                    <!-- 7. 因为 / 所以 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">因</span>
                            <span class="text-sm font-semibold text-slate-700">yīn - Nguyên nhân, bởi vì</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 6 nét | <b>(2) Bộ thủ:</b> Bộ Vi 囗 + Bộ Đại 大</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Vi 囗 (căn phòng kín) bao quanh chữ Đại 大 (con người nằm dang tay chân). Hình ảnh con người nằm nghỉ trên chiếu trong phòng, đó chính là nguồn gốc "nguyên nhân" (因) cần dưỡng sức.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Sổ ➔ Ngang gập ➔ Ngang ➔ Phẩy ➔ Mác ➔ Ngang (Vào trước đóng sau).</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">为</span>
                            <span class="text-sm font-semibold text-slate-700">wèi - Vì, làm</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 4 nét | <b>(2) Bộ thủ:</b> Bộ Trảo 为</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Chữ tượng hình bàn tay đang làm việc tỉ mỉ, dốc sức làm điều gì đó "vì" (为) lợi ích của bản thân hay người khác.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Chấm ➔ Phẩy gập móc ➔ Chấm ➔ Chấm.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">所</span>
                            <span class="text-sm font-semibold text-slate-700">suǒ - Nơi chốn, địa điểm</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 8 nét | <b>(2) Bộ thủ:</b> Bộ Hộ 户 + Bộ Cân 斤</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Hộ 户 (cửa nhà) bên trái và bộ Cân 斤 (cái rìu) bên phải. Tay cầm rìu (斤) đốn gỗ làm cửa (户) dựng nhà, tạo nên một "nơi chốn, địa điểm" (所) sinh sống an cư.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Chấm ➔ Phẩy ➔ Ngang gập ➔ Phẩy ➔ Ngang ➔ Sổ ➔ Phẩy ➔ Sổ.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">以</span>
                            <span class="text-sm font-semibold text-slate-700">yǐ - Lấy, làm căn cứ, để</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 5 nét | <b>(2) Bộ thủ:</b> Bộ Nhân 人</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Chữ tượng hình con người cầm điểm tựa trong tay làm mốc căn cứ suy ra kết quả ("lấy... làm...", "để rồi..."). Tạo nên cặp liên từ "因为...所以..." (Bởi vì... cho nên...).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Sổ gập ➔ Chấm ➔ Phẩy ➔ Ngang gập ➔ Chấm.</p>
                        </div>
                    </div>

                    <!-- 8. 游泳 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">游</span>
                            <span class="text-sm font-semibold text-slate-700">yóu - Du, bơi lội, đi chơi</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 12 nét | <b>(2) Bộ thủ:</b> Bộ Thủy 氵 + Bộ Phương 方 + Bộ Tử 子</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Thủy 氵 (dòng nước), chữ Phương 方 (cắm cờ) và chữ Tử 子 (đứa trẻ). Đứa trẻ (子) cầm cờ (方) hăng hái vung tay đạp nước bơi lội và du ngoạn trên sông nước (氵).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Ba chấm thủy 氵 ➔ Chữ Phương 方 ➔ Chữ Tử 子.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">泳</span>
                            <span class="text-sm font-semibold text-slate-700">yǒng - Bơi lội dưới nước</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 8 nét | <b>(2) Bộ thủ:</b> Bộ Thủy 氵 + Chữ Vĩnh 永</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Thủy 氵 (nước) bên trái và chữ Vĩnh 永 (lâu dài) bên phải. Con người lặn ngụp dưới dòng nước (氵) một cách dẻo dai lâu dài (永) không nghỉ, tạo thành môn "bơi lội" (游泳).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Ba chấm thủy 氵 (3 nét) ➔ Chữ Vĩnh 永 (5 nét).</p>
                        </div>
                    </div>

                    <!-- 9. 经常 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">经</span>
                            <span class="text-sm font-semibold text-slate-700">jīng - Trải qua, sợi chỉ dệt</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 8 nét | <b>(2) Bộ thủ:</b> Bộ Mịch 纟 + Chữ Kính 𢀖</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Mịch 纟 (cuộn chỉ) bên trái và chữ Kính 𢀖 (khung thoi dệt) bên phải. Những sợi chỉ (纟) dọc trên khung dệt nối liền nhau xuyên suốt từ đầu đến cuối, đại diện cho việc diễn ra liên tục "thường xuyên" (经常).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Bộ Mịch 纟 (3 nét) ➔ Phần bên phải (5 nét).</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">常</span>
                            <span class="text-sm font-semibold text-slate-700">cháng - Thường xuyên, bình thường</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 11 nét | <b>(2) Bộ thủ:</b> Bộ Cân 巾 + Bộ Thượng ⺌ + Bộ Khẩu 口</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Cân 巾 (khăn) ở dưới, bộ Thượng ⺌ (trên cao) và bộ Khẩu 口. Chiếc khăn vải (巾) trong nhà là vật dụng thiết yếu hàng ngày, luôn được giặt sạch phơi ở nơi cao (⺌) thoáng mát thường xuyên.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Chấm ➔ Phẩy ➔ Ngang ➔ Sổ ➔ Ngang gập ➔ Ngang ➔ Sổ ➔ Ngang gập ➔ Ngang ➔ Sổ ➔ Sổ gập.</p>
                        </div>
                    </div>

                    <!-- 10. 公斤 / 姐 -->
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">公</span>
                            <span class="text-sm font-semibold text-slate-700">gōng - Công cộng, kg</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 4 nét | <b>(2) Bộ thủ:</b> Bộ Bát 八 + Bộ Tư 厶</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Phân chia (八) bỏ đi cái riêng tư (厶) cá nhân đưa về cho tập thể, tạo sự "công bằng, công cộng" (公). Trong đo lường, 公斤 có nghĩa là ki-lô-gam chuẩn công cộng.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Mác ➔ Phẩy gập ➔ Chấm.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">斤</span>
                            <span class="text-sm font-semibold text-slate-700">jīn - Cân, cái rìu</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 4 nét | <b>(2) Bộ thủ:</b> Bộ Cân 斤</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Tượng hình chiếc rìu chặt cây thời cổ đại với lưỡi rìu ở trên và cán gỗ ở dưới. Người xưa dùng trọng lượng chiếc rìu đốn gỗ làm chuẩn đo lường khối lượng "cân" (斤).</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Phẩy ➔ Phẩy ➔ Ngang ➔ Sổ thẳng.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl font-bold text-blue-900 zh">姐</span>
                            <span class="text-sm font-semibold text-slate-700">jiě - Chị gái</span>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <p><b>(1) Số nét:</b> 8 nét | <b>(2) Bộ thủ:</b> Bộ Nữ 女 + Chữ Thả 且</p>
                            <p><b>(3) 💡 Mẹo nhớ tượng hình:</b> 📚 <i>Sách Nhớ Hán Tự Chiết Tự:</i> Ghép từ bộ Nữ 女 (người phụ nữ) và chữ Thả 且 (bàn thờ gia tiên). Người phụ nữ (女) đứng trước bài vị tổ tiên (且) là người chị gái lớn trong nhà có trách nhiệm phụ giúp cha mẹ gánh vác thờ cúng và chăm sóc các em.</p>
                            <p><b>(4) ✒️ Thuận bút:</b> Bộ Nữ 女 (3 nét) ➔ Chữ Thả 且 (5 nét).</p>
                        </div>
                    </div>

                </div>
            </div>
'''

def generate_html(is_sim=True):
    title_suffix = " (Có Mô Phỏng Nét Viết)" if is_sim else ""
    filename = "HSK2_Bai_6_Mo_Phong_Viet.html" if is_sim else "HSK2_Bai_6_Tu_Hoc.html"
    
    sim_tab_button = '<button onclick="showTab(\'sim\')" id="tab-sim" class="tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer">🎬 Mô phỏng nét viết</button>' if is_sim else ''
    
    sim_section = f'''
        <!-- TAB 1: MÔ PHỎNG NÉT VIẾT -->
        <div id="sec-sim" class="tab-content">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-2">✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (Bài 6 - 25 Chữ Hán)</h2>
                <p class="text-sm text-slate-600">Bấm <b>▶ Chạy nét</b> để xem thứ tự nét chuẩn HanziWriter, hoặc vẽ trực tiếp bằng tay/chuột trên ô <b>田字格</b> cảm ứng bên phải.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{sim_cards_html}
            </div>
        </div>
''' if is_sim else ''

    active_tab_js = "showTab('sim');" if is_sim else "showTab('overview');"

    html = f'''<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <title>HSK 2 - Bài 6: 第六课 你怎么不吃了{title_suffix}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: 'Lexend', 'Noto Sans SC', sans-serif; background-color: #0f172a; color: #1e293b; }}
        .app-container {{ background-color: #f8fafc; min-height: 100vh; }}
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
<body class="bg-slate-900 text-slate-800">

    <div class="app-container">
    <!-- HEADER -->
    <header class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl no-print">
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <span class="inline-block px-3 py-1 bg-blue-800/60 rounded-full text-xs font-semibold tracking-wide uppercase text-blue-200 mb-2">Giáo Trình HSK 2 Tự Học</span>
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">第六课 你怎么不吃了</h1>
                <p class="text-blue-200 text-sm mt-1">Bài 6: Sao bạn không ăn nữa? (Tập viết, Từ vựng, Ngữ pháp & Bài tập)</p>
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
            {sim_tab_button}
            <button onclick="showTab('overview')" id="tab-overview" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 py-8">
{sim_section}
        <!-- TAB 2: OVERVIEW -->
        <div id="sec-overview" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-3">🎯 Mục Tiêu Bài Học (Bài 6: 你怎么不吃了)</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <h4 class="font-bold text-blue-900 mb-1">📖 Từ Vựng</h4>
                        <p class="text-xs text-slate-600">Nắm vững 13 từ mới (门, 自行车, 羊肉, 好吃, 面条, 打篮球, 因为, 所以, 游泳, 经常, 公斤, 姐姐...).</p>
                    </div>
                    <div class="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <h4 class="font-bold text-indigo-900 mb-1">💡 Ngữ Pháp</h4>
                        <p class="text-xs text-slate-600">Trợ từ 了 chỉ sự thay đổi, phó từ 经常, cặp liên từ 因为...所以..., đại từ 怎么 hỏi nguyên nhân.</p>
                    </div>
                    <div class="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <h4 class="font-bold text-emerald-900 mb-1">🗣️ Giao Tiếp</h4>
                        <p class="text-xs text-slate-600">Hỏi lý do, diễn tả thói quen tập thể thao, mua sắm hoa quả tính theo kg, giải thích nguyên nhân.</p>
                    </div>
                    <div class="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                        <h4 class="font-bold text-amber-900 mb-1">✍️ Tập Viết</h4>
                        <p class="text-xs text-slate-600">Viết thành thạo 25 chữ Hán cốt lõi, thuộc các bộ thủ trọng tâm và mẹo nhớ chiết tự.</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="text-lg font-bold text-blue-950 mb-4">🚀 Lộ Trình 5 Bước Tự Học Hiệu Quả</h3>
                <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700">
                    <li><b>Bước 1:</b> Xem mô phỏng nét viết và luyện vẽ ô Tianzige cảm ứng.</li>
                    <li><b>Bước 2:</b> Nghe và thuộc bảng từ vựng, lưu ý biến điệu thanh 3 và thanh nhẹ.</li>
                    <li><b>Bước 3:</b> Đọc hiểu các thẻ chiết tự và nắm vững 4 điểm ngữ pháp trọng tâm.</li>
                    <li><b>Bước 4:</b> Luyện đọc 4 đoạn bài khóa hội thoại theo giọng đọc chuẩn.</li>
                    <li><b>Bước 5:</b> Hoàn thành 15 câu bài tập tương tác tự chấm điểm để củng cố.</li>
                </ol>
            </div>
        </div>

        <!-- TAB 3: TỪ VỰNG -->
        <div id="sec-vocab" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-2">📖 Bảng Từ Vựng HSK 2 Bài 6</h2>
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium mb-4">
                    ⚡ <b>QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM HSK 2:</b><br>
                    • <b>Biến điệu thanh 3+3 (soi ➔ suóyǐ):</b> Khi hai âm tiết thanh 3 đi liền nhau, âm tiết thứ nhất biến thành thanh 2 (ví dụ: 所以 <i>suǒyǐ</i> đọc thành <i>suóyǐ</i>).<br>
                    • <b>Biến điệu "不" (bù ➔ bú):</b> Khi đứng trước âm tiết mang thanh 4, "不" chuyển thành thanh 2 "bú" (ví dụ: 不是 <i>bú shì</i>).
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr class="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                                <th class="p-3 text-center">Nghe</th>
                                <th class="p-3">Chữ Hán</th>
                                <th class="p-3">Pinyin</th>
                                <th class="p-3">Hán Việt</th>
                                <th class="p-3">Loại từ</th>
                                <th class="p-3">Biến điệu</th>
                                <th class="p-3">Nghĩa tiếng Việt</th>
                                <th class="p-3">Ví dụ minh họa</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
{vocab_rows_html}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- TAB 4: TẬP VIẾT & MẸO NHỚ -->
        <div id="sec-writing" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-4">✍️ Quy Tắc Nét Bút & Thẻ Chiết Tự Bài 6</h2>
                
                <!-- BẢNG 7 QUY TẮC NẾT BÚT -->
                <div class="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                    <h4 class="font-bold text-slate-800 text-sm mb-2">📌 7 Quy Tắc Nét Bút Cơ Bản</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-600">
                        <div>1. Ngang trước sổ sau (十)</div>
                        <div>2. Phẩy trước mác sau (八)</div>
                        <div>3. Trên trước dưới sau (二)</div>
                        <div>4. Trái trước phải sau (川)</div>
                        <div>5. Vào trước đóng sau (回)</div>
                        <div>6. Giữa trước hai bên sau (小)</div>
                        <div>7. Phẩy trước chấm sau (义)</div>
                    </div>
                </div>
            </div>

{writing_cards_html}
        </div>

        <!-- TAB 5: NGỮ PHÁP -->
        <div id="sec-grammar" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-4">💡 4 Điểm Ngữ Pháp Trọng Tâm Bài 6</h2>
                
                <div class="space-y-6">
                    <!-- Point 1 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <span class="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold mb-2">Ngữ pháp 1</span>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">1. Trợ từ động thái "了" chỉ sự thay đổi (New Situation / Change Particle 了)</h3>
                        <p class="text-sm text-slate-700 mb-3">Được đặt ở cuối câu để diễn tả sự thay đổi của tình huống hoặc xuất hiện một trạng thái mới.</p>
                        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-blue-900 mb-3">
                            Công thức: Cụm Động từ / Tính từ + 了 <br> Hoặc: S + 怎么 + 不 + V + 了？
                        </div>
                        <ul class="space-y-2 text-sm text-slate-700">
                            <li>• <span class="zh font-bold">你怎么不吃了？</span> (Nǐ zěnme bù chī le?) ➔ Sao bạn không ăn nữa?</li>
                            <li>• <span class="zh font-bold">我已经吃饱了。</span> (Wǒ yǐjīng chī bǎo le.) ➔ Tôi đã ăn no rồi.</li>
                            <li>• <span class="zh font-bold">天气凉了。</span> (Tiānqì liáng le.) ➔ Thời tiết trở lạnh rồi.</li>
                        </ul>
                    </div>

                    <!-- Point 2 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full text-xs font-bold mb-2">Ngữ pháp 2</span>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">2. Phó từ chỉ tần suất "经常" (Frequency Adverb 经常)</h3>
                        <p class="text-sm text-slate-700 mb-3">Biểu thị một hành động xảy ra thường xuyên, lặp đi lặp lại trong sinh hoạt.</p>
                        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-indigo-900 mb-3">
                            Công thức: Chủ ngữ + 经常 + Động từ ( + Tân ngữ)
                        </div>
                        <ul class="space-y-2 text-sm text-slate-700">
                            <li>• <span class="zh font-bold">我经常去打篮球。</span> (Wǒ jīngcháng qù dǎ lánqiú.) ➔ Tôi thường xuyên đi chơi bóng rổ.</li>
                            <li>• <span class="zh font-bold">他经常去游泳。</span> (Tā jīngcháng qù yóuyǒng.) ➔ Cậu ấy thường đi bơi.</li>
                        </ul>
                    </div>

                    <!-- Point 3 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold mb-2">Ngữ pháp 3</span>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">3. Cặp liên từ chỉ nguyên nhân - kết quả "เพราะ/因为......，所以......"</h3>
                        <p class="text-sm text-slate-700 mb-3">Dùng để liên kết hai vế câu: "因为" biểu thị nguyên nhân, "所以" biểu thị kết quả.</p>
                        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-emerald-900 mb-3">
                            Công thức: 因为 [Nguyên nhân] ，所以 [Kết quả]
                        </div>
                        <ul class="space-y-2 text-sm text-slate-700">
                            <li>• <span class="zh font-bold">因为天气不好，所以我们没去游泳。</span> (Yīnwèi tiānqì bù hǎo, suǒyǐ wǒmen méi qù yóuyǒng.) ➔ Bởi vì thời tiết không tốt nên chúng tôi không đi bơi.</li>
                            <li>• <span class="zh font-bold">因为羊肉很好吃，所以他吃了很多。</span> (Yīnwèi yángròu hěn hǎochī, suǒyǐ tā chī le hěn duō.) ➔ Vì thịt dê rất ngon nên anh ấy ăn rất nhiều.</li>
                        </ul>
                    </div>

                    <!-- Point 4 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <span class="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">Ngữ pháp 4</span>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">4. Đại từ nghi vấn "你怎么......" hỏi nguyên nhân (Interrogative 怎么)</h3>
                        <p class="text-sm text-slate-700 mb-3">Dùng để hỏi nguyên nhân một sự việc xảy ra khác thường với thái độ ngạc nhiên hoặc quan tâm.</p>
                        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-amber-900 mb-3">
                            Công thức: Chủ ngữ + 怎么 + Động từ / Tính từ?
                        </div>
                        <ul class="space-y-2 text-sm text-slate-700">
                            <li>• <span class="zh font-bold">你怎么买这么多公斤苹果？</span> (Nǐ zěnme mǎi zhème duō gōngjīn píngguǒ?) ➔ Sao bạn mua nhiều kg táo thế này?</li>
                            <li>• <span class="zh font-bold">你怎么没去打篮球？</span> (Nǐ zěnme méi qù dǎ lánqiú?) ➔ Sao bạn không đi chơi bóng rổ?</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 6: BÀI KHÓA -->
        <div id="sec-text" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-4">🗣️ 4 Bài Khóa Hội Thoại HSK 2 Bài 6</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Text 1 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-bold text-blue-900">Bài khóa 1: 在饭馆 (Trong nhà hàng)</h3>
                            <button onclick="playText(1)" class="audio-btn px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm">▶ Nghe Bài Khóa 1</button>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">A: 你怎么不吃了？是羊肉不好吃吗？</p>
                                <p class="text-xs text-slate-500">Nǐ zěnme bù chī le? Shì yángròu bù hǎochī ma?</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Sao bạn không ăn nữa? Là thịt dê không ngon sao?</p>
                            </div>
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">B: 不是，是我吃饱了。</p>
                                <p class="text-xs text-slate-500">Bú shì, shì wǒ chī bǎo le.</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Không phải, là tớ ăn no rồi.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Text 2 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-bold text-blue-900">Bài khóa 2: 在运动场 (Trên sân vận động)</h3>
                            <button onclick="playText(2)" class="audio-btn px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm">▶ Nghe Bài Khóa 2</button>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">A: 你经常去打篮球吗？</p>
                                <p class="text-xs text-slate-500">Nǐ jīngcháng qù dǎ lánqiú ma?</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Bạn có thường xuyên đi đánh bóng rổ không?</p>
                            </div>
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">B: 我每周都去，游泳也很好。</p>
                                <p class="text-xs text-slate-500">Wǒ měi zhōu dōu qù, yóuyǒng yě hěn hǎo.</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Tuần nào tớ cũng đi, bơi lội cũng rất tốt.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Text 3 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-bold text-blue-900">Bài khóa 3: 在办公室 (Trong phòng làm việc)</h3>
                            <button onclick="playText(3)" class="audio-btn px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm">▶ Nghe Bài Khóa 3</button>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">A: 你怎么买这么多公斤苹果？</p>
                                <p class="text-xs text-slate-500">Nǐ zěnme mǎi zhème duō gōngjīn píngguǒ?</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Sao bạn mua nhiều kg táo thế này?</p>
                            </div>
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">B: 姐姐喜欢吃，我买给她。</p>
                                <p class="text-xs text-slate-500">Jiějie xǐhuan chī, wǒ mǎi gěi tā.</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Chị gái thích ăn, tớ mua cho chị ấy.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Text 4 -->
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200" style="background-color: #f8fafc !important;">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-bold text-blue-900">Bài khóa 4: 在客厅 (Trong phòng khách)</h3>
                            <button onclick="playText(4)" class="audio-btn px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm">▶ Nghe Bài Khóa 4</button>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">A: 外面天气很好，要不要出去跑步？</p>
                                <p class="text-xs text-slate-500">Wàimian tiānqì hěn hǎo, yào bu yào chūqù pǎobù?</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Thời tiết bên ngoài rất tốt, có muốn ra ngoài chạy bộ không?</p>
                            </div>
                            <div class="p-3 bg-white rounded-xl border border-slate-100">
                                <p class="zh font-bold text-blue-950">B: 好的，我这就准备出发。</p>
                                <p class="text-xs text-slate-500">Hǎo de, wǒ zhè jiù zhǔnbèi chūfā.</p>
                                <p class="text-xs text-slate-700 mt-1">Dịch: Được thôi, tớ chuẩn bị xuất phát ngay đây.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- TAB 7: LUYỆN TẬP -->
        <div id="sec-practice" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-4">📝 15 Câu Bài Tập Tương Tác HSK 2 Bài 6</h2>
                
                <!-- PART 1: TỪ VỰNG -->
                <div class="mb-8">
                    <h3 class="font-bold text-blue-900 border-b pb-2 mb-4">Phần 1: Bài Tập Từ Vựng (5 Câu)</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 1: 门外有一辆______。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(1, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 自行车</button>
                                <button onclick="checkQ(1, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 羊肉</button>
                                <button onclick="checkQ(1, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 游泳</button>
                            </div>
                            <div id="res-1" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 2: 今天的______很好吃，你再吃一点儿吧。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(2, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 公斤</button>
                                <button onclick="checkQ(2, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 羊肉</button>
                                <button onclick="checkQ(2, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 姐姐</button>
                            </div>
                            <div id="res-2" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 3: 我每天下午都去运动场______。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(3, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 打篮球</button>
                                <button onclick="checkQ(3, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 门外</button>
                                <button onclick="checkQ(3, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 面条</button>
                            </div>
                            <div id="res-3" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 4: 我买了一______苹果。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(4, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 公斤</button>
                                <button onclick="checkQ(4, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 经常</button>
                                <button onclick="checkQ(4, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 因为</button>
                            </div>
                            <div id="res-4" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 5: 这是我______，她非常喜欢吃面条。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(5, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 姐姐</button>
                                <button onclick="checkQ(5, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 羊肉</button>
                                <button onclick="checkQ(5, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 自行车</button>
                            </div>
                            <div id="res-5" class="mt-2 text-xs font-bold hidden"></div>
                        </div>
                    </div>
                </div>

                <!-- PART 2: NGỮ PHÁP -->
                <div class="mb-8">
                    <h3 class="font-bold text-blue-900 border-b pb-2 mb-4">Phần 2: Bài Tập Ngữ Pháp (5 Câu)</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 6: 你______不吃了？是菜不好吃吗？</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(6, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 为什么</button>
                                <button onclick="checkQ(6, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 怎么</button>
                                <button onclick="checkQ(6, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 常常</button>
                            </div>
                            <div id="res-6" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 7: 我______去体育馆打篮球。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(7, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 经常</button>
                                <button onclick="checkQ(7, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 所以</button>
                                <button onclick="checkQ(7, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 公斤</button>
                            </div>
                            <div id="res-7" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 8: ______下雨，______我们没去游泳。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(8, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 因为...所以...</button>
                                <button onclick="checkQ(8, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 虽然...但是...</button>
                                <button onclick="checkQ(8, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 不仅...而且...</button>
                            </div>
                            <div id="res-8" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 9: 我已经吃______，不想再吃了。</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(9, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 过</button>
                                <button onclick="checkQ(9, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 饱了</button>
                                <button onclick="checkQ(9, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 着</button>
                            </div>
                            <div id="res-9" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 10: 门______是谁？</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <button onclick="checkQ(10, 'A')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">A. 里面</button>
                                <button onclick="checkQ(10, 'B')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">B. 外</button>
                                <button onclick="checkQ(10, 'C')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-blue-50">C. 上面</button>
                            </div>
                            <div id="res-10" class="mt-2 text-xs font-bold hidden"></div>
                        </div>
                    </div>
                </div>

                <!-- PART 3: SẮP XẾP VIẾT CÂU -->
                <div>
                    <h3 class="font-bold text-blue-900 border-b pb-2 mb-4">Phần 3: Sắp Xếp & Viết Câu Hoàn Chỉnh (5 Câu)</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 11: 你 / 怎么 / 不 / 吃了 / ？</p>
                            <input type="text" id="inp-11" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm mb-2">
                            <button onclick="checkInputQ(11, ['你怎么不吃了？', '你怎么不吃了'])" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Xem đáp án</button>
                            <div id="res-11" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 12: 我 / 经常 / 去 / 游泳 / 。</p>
                            <input type="text" id="inp-12" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm mb-2">
                            <button onclick="checkInputQ(12, ['我经常去游泳。', '我经常去游泳'])" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Xem đáp án</button>
                            <div id="res-12" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 13: 因为 / 天气不好 / 所以 / 我们没去 / 。</p>
                            <input type="text" id="inp-13" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm mb-2">
                            <button onclick="checkInputQ(13, ['因为天气不好，所以我们没去。', '因为天气不好所以我们没去'])" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Xem đáp án</button>
                            <div id="res-13" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 14: 姐姐 / 喜欢 / 吃 / 羊肉 / 。</p>
                            <input type="text" id="inp-14" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm mb-2">
                            <button onclick="checkInputQ(14, ['姐姐喜欢吃羊肉。', '姐姐喜欢吃羊肉'])" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Xem đáp án</button>
                            <div id="res-14" class="mt-2 text-xs font-bold hidden"></div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200" style="background-color: #f8fafc !important;">
                            <p class="text-sm font-semibold mb-2">Câu 15: 我 / 买 / 了 / 三公斤 / 苹果 / 。</p>
                            <input type="text" id="inp-15" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm mb-2">
                            <button onclick="checkInputQ(15, ['我买了三公斤苹果。', '我买了三公斤苹果'])" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Xem đáp án</button>
                            <div id="res-15" class="mt-2 text-xs font-bold hidden"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- TAB 8: GÓC VĂN HÓA -->
        <div id="sec-culture" class="tab-content hidden">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-4">🎋 Góc Văn Hóa Trung Hoa (Bài 6)</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-5 bg-amber-50/60 rounded-2xl border border-amber-200">
                        <h3 class="font-bold text-amber-950 text-base mb-2">🍜 Văn Hóa Mì Trường Thọ (长寿面)</h3>
                        <p class="text-sm text-slate-700 leading-relaxed">
                            Trong văn hóa Trung Hoa, sợi mì dài (面条) biểu tượng cho sự trường thọ và may mắn. Vào các dịp sinh nhật hoặc mừng thọ, người Trung Quốc luôn ăn một bát mì trường thọ được làm từ một sợi mì dài duy nhất không bị đứt đoạn với mong ước sống lâu trăm tuổi.
                        </p>
                    </div>
                    <div class="p-5 bg-blue-50/60 rounded-2xl border border-blue-200">
                        <h3 class="font-bold text-blue-950 text-base mb-2">🏀 Môn Thể Thao Bơi Lội & Bóng Rổ</h3>
                        <p class="text-sm text-slate-700 leading-relaxed">
                            Bóng rổ (篮球) và bơi lội (游泳) là hai trong số những môn thể thao rèn luyện sức khỏe phổ biến nhất tại Trung Quốc. Trường học và các khu dân cư hiện đại đều được trang bị sân bóng rổ công cộng và bể bơi tiêu chuẩn cho người dân tham gia luyện tập hàng ngày.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </main>
    </div>

    <script>
        var VOCAB_AUDIO = {json.dumps(vocab_audio)};
        var TEXT_AUDIO = {json.dumps(text_audio)};

        var currentAudio = null;
        var currentRate = 1.0;

        function setAudioPlaybackRate(rate) {{
            currentRate = rate;
            document.getElementById('rate-075').className = rate === 0.75 ? "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition" : "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            document.getElementById('rate-100').className = rate === 1.0 ? "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition" : "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            if (currentAudio) {{
                currentAudio.playbackRate = currentRate;
            }}
        }}

        function playAudio(src) {{
            if (currentAudio) {{
                currentAudio.pause();
                currentAudio = null;
            }}
            currentAudio = new Audio(src);
            currentAudio.playbackRate = currentRate;
            currentAudio.play().catch(function(err) {{
                console.log('Audio playback error fallback:', err);
            }});
        }}

        function playVocab(key) {{
            if (VOCAB_AUDIO[key]) {{
                playAudio(VOCAB_AUDIO[key]);
            }} else {{
                var msg = new SpeechSynthesisUtterance(key);
                msg.lang = 'zh-CN';
                msg.rate = currentRate;
                window.speechSynthesis.speak(msg);
            }}
        }}

        function playText(num) {{
            var key = 'text' + num;
            if (TEXT_AUDIO[key]) {{
                playAudio(TEXT_AUDIO[key]);
            }} else {{
                var msg = new SpeechSynthesisUtterance('Bài khóa ' + num);
                msg.lang = 'zh-CN';
                msg.rate = currentRate;
                window.speechSynthesis.speak(msg);
            }}
        }}

        function showTab(tabId) {{
            var contents = document.querySelectorAll('.tab-content');
            contents.forEach(function(el) {{
                el.classList.add('hidden');
            }});

            var buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(function(btn) {{
                btn.classList.remove('active', 'bg-blue-900', 'text-white', 'shadow-sm');
                btn.classList.add('text-slate-600');
            }});

            var targetSec = document.getElementById('sec-' + tabId);
            if (targetSec) {{
                targetSec.classList.remove('hidden');
            }}

            var targetBtn = document.getElementById('tab-' + tabId);
            if (targetBtn) {{
                targetBtn.classList.add('active', 'bg-blue-900', 'text-white', 'shadow-sm');
                targetBtn.classList.remove('text-slate-600');
            }}

            if (tabId === 'sim') {{
                initWriters();
                initPads();
            }}
        }}

        var writers = {{}};
        var pads = {{}};

        function initWriters() {{
{writer_inits_js}
        }}

        function animateChar(id) {{
            if (writers[id]) {{
                writers[id].animateCharacter();
            }}
        }}

        function resetChar(id) {{
            if (writers[id]) {{
                writers[id].showOutline();
                writers[id].showCharacter();
            }}
        }}

        function initCanvas(id) {{
            var canvas = document.getElementById(id);
            if (!canvas) return null;
            var ctx = canvas.getContext('2d');
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#1e3a8a';

            var isDrawing = false;
            var lastX = 0;
            var lastY = 0;

            function getPos(e) {{
                var rect = canvas.getBoundingClientRect();
                var clientX = e.touches ? e.touches[0].clientX : e.clientX;
                var clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {{
                    x: (clientX - rect.left) * (canvas.width / rect.width),
                    y: (clientY - rect.top) * (canvas.height / rect.height)
                }};
            }}

            function startDraw(e) {{
                isDrawing = true;
                var pos = getPos(e);
                lastX = pos.x;
                lastY = pos.y;
            }}

            function draw(e) {{
                if (!isDrawing) return;
                e.preventDefault();
                var pos = getPos(e);
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                lastX = pos.x;
                lastY = pos.y;
            }}

            function stopDraw() {{
                isDrawing = false;
            }}

            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDraw);
            canvas.addEventListener('mouseleave', stopDraw);

            canvas.addEventListener('touchstart', startDraw, {{ passive: false }});
            canvas.addEventListener('touchmove', draw, {{ passive: false }});
            canvas.addEventListener('touchend', stopDraw);

            return {{ canvas: canvas, ctx: ctx }};
        }}

        function initPads() {{
{pad_inits_js}
        }}

        function clearCanvas(id) {{
            var canvas = document.getElementById('pad-' + id);
            if (canvas) {{
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}
        }}

        var answers = {{ 1: 'A', 2: 'B', 3: 'A', 4: 'A', 5: 'A', 6: 'B', 7: 'A', 8: 'A', 9: 'B', 10: 'B' }};

        function checkQ(id, chosen) {{
            var res = document.getElementById('res-' + id);
            res.classList.remove('hidden');
            if (chosen === answers[id]) {{
                res.className = 'mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200';
                res.innerHTML = '✅ Chính xác! Đáp án đúng là ' + chosen + '.';
            }} else {{
                res.className = 'mt-2 text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200';
                res.innerHTML = '❌ Chưa đúng! Đáp án đúng là ' + answers[id] + '.';
            }}
        }}

        function checkInputQ(id, correctList) {{
            var res = document.getElementById('res-' + id);
            res.classList.remove('hidden');
            res.className = 'mt-2 text-xs font-bold text-blue-900 bg-blue-50 p-2.5 rounded-lg border border-blue-200';
            res.innerHTML = '💡 Đáp án chuẩn: ' + correctList[0];
        }}

        document.addEventListener('DOMContentLoaded', function() {{
            {active_tab_js}
        }});
    </script>
</body>
</html>'''

    out_path = os.path.join(day6_dir, filename)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Wrote {filename} successfully!')

generate_html(is_sim=True)
generate_html(is_sim=False)
