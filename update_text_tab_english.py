import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

new_sec_text_html = """
        <!-- TAB 6: BÀI KHÓA -->
        <div id="sec-text" class="tab-content hidden">
            <div class="space-y-6">
                <!-- Text 1 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Text 1 (课文 1)</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场门口 (At the entrance of the shopping mall)</h3>
                        </div>
                        <button onclick="playAudio('text1')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Play Text 1 Audio</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我们来过这家商场吗？<br><span class="text-slate-500 text-xs">Māma, wǒmen láiguo zhè jiā shāngchǎng ma?</span><br><span class="text-slate-600 text-xs font-medium">Mom, have we been to this shopping mall before?</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 没来过，这是新开的。<br><span class="text-slate-500 text-xs">Méi láiguo, zhè shì xīn kāi de.</span><br><span class="text-slate-600 text-xs font-medium">No, it just opened recently.</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我们进去看看吧。<br><span class="text-slate-500 text-xs">Wǒmen jìnqù kànkan ba.</span><br><span class="text-slate-600 text-xs font-medium">Let's go inside and have a look.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 好啊！你想买点儿什么？<br><span class="text-slate-500 text-xs">Hǎo a! Nǐ xiǎng mǎi diǎnr shénme?</span><br><span class="text-slate-600 text-xs font-medium">Sure! What do you want to buy?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我想买条裤子。<br><span class="text-slate-500 text-xs">Wǒ xiǎng mǎi tiáo kùzi.</span><br><span class="text-slate-600 text-xs font-medium">I want to buy a pair of pants.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 没问题。<br><span class="text-slate-500 text-xs">Méi wèntí.</span><br><span class="text-slate-600 text-xs font-medium">No problem.</span></p>
                    </div>
                </div>

                <!-- Text 2 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Text 2 (课文 2)</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场看衣服 (Shopping for clothes)</h3>
                        </div>
                        <button onclick="playAudio('text2')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Play Text 2 Audio</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我想买这条白色的裤子。<br><span class="text-slate-500 text-xs">Māma, wǒ xiǎng mǎi zhè tiáo báisè de kùzi.</span><br><span class="text-slate-600 text-xs font-medium">Mom, I want to buy this pair of white pants.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 你有很多白色的衣服，为什么还买白色的？<br><span class="text-slate-500 text-xs">Nǐ yǒu hěn duō báisè de yīfu, wèi shénme hái mǎi báisè de?</span><br><span class="text-slate-600 text-xs font-medium">You already have lots of white clothes. Why do you want to buy something white again?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 因为我喜欢白色啊！<br><span class="text-slate-500 text-xs">Yīnwèi wǒ xǐhuan báisè a!</span><br><span class="text-slate-600 text-xs font-medium">Because I like white!</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 我觉得这条白色的不太好看，你试试那条红色的吧。<br><span class="text-slate-500 text-xs">Wǒ juéde zhè tiáo báisè de bú tài hǎokàn, nǐ shìshi nà tiáo hóngsè de ba.</span><br><span class="text-slate-600 text-xs font-medium">I don't think this white one looks very good. Why don't you try that red one instead?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 我没穿过红色的，红色的好看吗？<br><span class="text-slate-500 text-xs">Wǒ méi chuānguo hóngsè de, hóngsè de hǎokàn ma?</span><br><span class="text-slate-600 text-xs font-medium">I've never worn red before. Do you think red looks good on me?</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 就是因为没穿过，所以要试试啊！<br><span class="text-slate-500 text-xs">Jiù shì yīnwèi méi chuānguo, suǒyǐ yào shìshi a!</span><br><span class="text-slate-600 text-xs font-medium">That's exactly why you should give it a try!</span></p>
                    </div>
                </div>

                <!-- Text 3 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Text 3 (课文 3)</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在商场看书包 (Shopping for schoolbags)</h3>
                        </div>
                        <button onclick="playAudio('text3')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Play Text 3 Audio</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4">
                        <p><b class="text-blue-900">刘小雪:</b> 妈妈，我想买个新书包。<br><span class="text-slate-500 text-xs">Māma, wǒ xiǎng mǎi gè xīn shūbāo.</span><br><span class="text-slate-600 text-xs font-medium">Mom, I want to buy a new schoolbag.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 好，那边卖书包，我们过去看看吧。<br><span class="text-slate-500 text-xs">Hǎo, nàbiān mǎi shūbāo, wǒmen guòqù kànkan ba.</span><br><span class="text-slate-600 text-xs font-medium">Okay. They're selling schoolbags over there. Let's go and take a look.</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 这么多漂亮的书包！<br><span class="text-slate-500 text-xs">Zhème duō piàoliang de shūbāo!</span><br><span class="text-slate-600 text-xs font-medium">There are so many beautiful ones!</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 红色的、绿色的、黑色的，你想买哪个？<br><span class="text-slate-500 text-xs">Hóngsè de, lǜsè de, hēisè de, nǐ xiǎng mǎi nǎge?</span><br><span class="text-slate-600 text-xs font-medium">Red ones, green ones, black ones—Which one do you like?</span></p>
                        <p><b class="text-blue-900">刘小雪:</b> 绿色的吧。<br><span class="text-slate-500 text-xs">Lǜsè de ba.</span><br><span class="text-slate-600 text-xs font-medium">The green one.</span></p>
                        <p><b class="text-blue-900">王一雪:</b> 不错，我也觉得绿色的更好看。<br><span class="text-slate-500 text-xs">Búcuò, wǒ yě juéde lǜsè de gèng hǎokàn.</span><br><span class="text-slate-600 text-xs font-medium">Not bad. I think the green one looks better too.</span></p>
                    </div>
                </div>

                <!-- Text 4 -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Text 4 (课文 4)</span>
                            <h3 class="text-lg font-bold text-slate-800 mt-1">在房间写日记 (Writing in diary)</h3>
                        </div>
                        <button onclick="playAudio('text4')" class="audio-btn px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">▶ Play Text 4 Audio</button>
                    </div>
                    <div class="space-y-3 text-sm border-t border-slate-100 pt-4 leading-relaxed">
                        <p class="zh text-base font-medium text-slate-800">我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。</p>
                        <p class="text-slate-500 text-xs">Wǒ hé māma qùle yì jiā shāngchǎng. Yīnwèi shì xīn kāi de, suǒyǐ zhè jǐ tiān dōngxi hěn piányi. Shāngchǎng lǐ de yīfu yánsè hěn duō. Wǒ méi chuānguo hóngsè de kùzi, māma ràng wǒ shìle shì, wǒ juéde wǒ chuān hóngsè de yě hěn hǎokàn.</p>
                        <p class="text-slate-600 text-xs font-medium border-t border-slate-100 pt-2">I went to a shopping mall with my mom. Since the mall had just opened, the prices were quite affordable these days. The clothes there came in many different colors. I had never worn red pants before, and my mom encouraged me to give them a try. I thought I looked pretty good in red too.</p>
                    </div>
                </div>
            </div>
        </div>"""

def replace_text_tab_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if '<div id="sec-text"' in content and '<div id="sec-practice"' in content:
        start_part = content.split('<div id="sec-text"')[0]
        end_part = content.split('<div id="sec-practice"')[1]
        
        updated_content = start_part + new_sec_text_html.strip() + '\n\n        <!-- TAB 7: LUYỆN TẬP -->\n        <div id="sec-practice"' + end_part
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Updated Text Tab translations to English in {filepath}")

replace_text_tab_in_file(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_text_tab_in_file(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
replace_text_tab_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_text_tab_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
replace_text_tab_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_text_tab_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("All Text Tab translations updated to English cleanly!")

