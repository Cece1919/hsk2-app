import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

new_sec_practice_html = """
        <!-- TAB 7: LUYỆN TẬP -->
        <div id="sec-practice" class="tab-content hidden">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-6">
                <h3 class="text-xl font-bold text-blue-950 mb-4">📝 Interactive Practice Exercises (15 Questions)</h3>
                
                <!-- Part 1: Fill in the blanks -->
                <div class="space-y-4 mb-8">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Part 1: Choose the correct word for each blank (A. 进去 | B. 书包 | C. 颜色 | D. 条 | E. 商场)</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">1. 我看见老师在教室里，你 <input type="text" id="q1" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 找她吧。</p>
                        <button onclick="checkQ('q1', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q1" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">2. 你已经有一 <input type="text" id="q2" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 黑色的裤子了，别买了。</p>
                        <button onclick="checkQ('q2', 'D')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q2" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">3. 我来过这家 <input type="text" id="q3" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="...">，它是今年一月新开的。</p>
                        <button onclick="checkQ('q3', 'E')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q3" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">4. 妈妈，你看见我的 <input type="text" id="q4" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 了吗？</p>
                        <button onclick="checkQ('q4', 'B')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q4" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">5. 你想买件什么 <input type="text" id="q5" class="border rounded px-2 py-1 w-20 text-center uppercase font-bold text-blue-900" placeholder="..."> 的衣服？</p>
                        <button onclick="checkQ('q5', 'C')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q5" class="ml-2 font-bold"></span>
                    </div>
                </div>

                <!-- Part 2: Grammar Multiple Choice -->
                <div class="space-y-4 mb-8">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Part 2: Grammar Multiple Choice</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">6. 我去 ____ 北京，那里很大很漂亮。(A. 过 | B. 了 | C. 着)</p>
                        <input type="text" id="q6" class="border rounded px-2 py-1 w-24 text-center uppercase font-bold text-blue-900" placeholder="Type A/B/C">
                        <button onclick="checkQ('q6', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q6" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">7. ____ 今天下雨，____ 我们没去公园。(A. 因为...所以... | B. 虽然...但是...)</p>
                        <input type="text" id="q7" class="border rounded px-2 py-1 w-24 text-center uppercase font-bold text-blue-900" placeholder="Type A/B">
                        <button onclick="checkQ('q7', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q7" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">8. 这两个书包，我更喜欢红色的 ____。(A. 的 | B. 得 | C. 地)</p>
                        <input type="text" id="q8" class="border rounded px-2 py-1 w-24 text-center uppercase font-bold text-blue-900" placeholder="Type A/B/C">
                        <button onclick="checkQ('q8', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q8" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">9. 你吃 ____ 饺子没有？(A. 过 | B. 完 | C. 好)</p>
                        <input type="text" id="q9" class="border rounded px-2 py-1 w-24 text-center uppercase font-bold text-blue-900" placeholder="Type A/B/C">
                        <button onclick="checkQ('q9', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q9" class="ml-2 font-bold"></span>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">10. 这件衣服太贵了，买那件便宜 ____ 吧。(A. 的 | B. 了 | C. 过)</p>
                        <input type="text" id="q10" class="border rounded px-2 py-1 w-24 text-center uppercase font-bold text-blue-900" placeholder="Type A/B/C">
                        <button onclick="checkQ('q10', 'A')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                        <span id="res-q10" class="ml-2 font-bold"></span>
                    </div>
                </div>

                <!-- Part 3: Rearrange words into sentences -->
                <div class="space-y-4">
                    <h4 class="font-bold text-slate-800 text-sm border-b pb-2">Part 3: Rearrange words into a complete sentence</h4>
                    
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">11. 没 / 来过 / 商场 / 我们 / 这家</p>
                        <input type="text" id="q11" class="w-full border rounded p-2 text-xs font-medium" placeholder="Type your sentence here...">
                        <div class="flex items-center gap-2">
                            <button onclick="checkQ('q11', '我们没来过这家商场。')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                            <span id="res-q11" class="ml-2 font-bold"></span>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">12. 红色的 / 你 / 很好看 / 穿</p>
                        <input type="text" id="q12" class="w-full border rounded p-2 text-xs font-medium" placeholder="Type your sentence here...">
                        <div class="flex items-center gap-2">
                            <button onclick="checkQ('q12', '你穿红色的很好看。')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                            <span id="res-q12" class="ml-2 font-bold"></span>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">13. 新书包 / 我 / 想 / 买个</p>
                        <input type="text" id="q13" class="w-full border rounded p-2 text-xs font-medium" placeholder="Type your sentence here...">
                        <div class="flex items-center gap-2">
                            <button onclick="checkQ('q13', '我想买个新书包。')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                            <span id="res-q13" class="ml-2 font-bold"></span>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">14. 东西 / 很便宜 / 因为 / 是新开的 / 所以</p>
                        <input type="text" id="q14" class="w-full border rounded p-2 text-xs font-medium" placeholder="Type your sentence here...">
                        <div class="flex items-center gap-2">
                            <button onclick="checkQ('q14', '因为是新开的，所以东西很便宜。')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                            <span id="res-q14" class="ml-2 font-bold"></span>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <p class="font-medium text-slate-800">15. 绿色的 / 更好看 / 我 / 觉得</p>
                        <input type="text" id="q15" class="w-full border rounded p-2 text-xs font-medium" placeholder="Type your sentence here...">
                        <div class="flex items-center gap-2">
                            <button onclick="checkQ('q15', '我觉得绿色的更好看。')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-sm transition">Check Answer</button>
                            <span id="res-q15" class="ml-2 font-bold"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>"""

def replace_practice_tab_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if '<div id="sec-practice"' in content and '<div id="sec-culture"' in content:
        start_part = content.split('<div id="sec-practice"')[0]
        end_part = content.split('<div id="sec-culture"')[1]
        
        updated_content = start_part + new_sec_practice_html.strip() + '\n\n        <!-- TAB 8: GÓC VĂN HÓA -->\n        <div id="sec-culture"' + end_part
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Updated Practice Tab answers in {filepath}")

replace_practice_tab_in_file(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_practice_tab_in_file(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
replace_practice_tab_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_practice_tab_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
replace_practice_tab_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
replace_practice_tab_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("All Practice Tab buttons updated: removed exposed answer key labels!")

