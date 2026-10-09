import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

new_checkQ_js = """
        function checkQ(qid, expected) {
            var inp = document.getElementById(qid);
            var res = document.getElementById('res-' + qid);
            if (!inp || !res) return;
            
            var normalize = function(str) {
                return str.trim().toUpperCase().replace(/[。，！？,.!?]/g, '');
            };

            var userVal = normalize(inp.value);
            var expVal = normalize(expected);

            if (userVal === expVal) {
                res.textContent = "✅ Correct! (正确！)";
                res.className = "ml-2 font-bold text-emerald-600";
            } else {
                res.textContent = "❌ Incorrect. Try again! (答案: " + expected + ")";
                res.className = "ml-2 font-bold text-rose-600";
            }
        }
"""

def update_checkQ_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if 'function checkQ(' in content:
        start_part = content.split('function checkQ(')[0]
        end_part = content.split('document.addEventListener(')[1]
        
        updated_content = start_part + new_checkQ_js.strip() + '\n\n        document.addEventListener(' + end_part
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Updated checkQ JS in {filepath}")

update_checkQ_in_file(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_checkQ_in_file(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
update_checkQ_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_checkQ_in_file(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
update_checkQ_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
update_checkQ_in_file(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("JS checkQ function enhanced for interactive checking!")

