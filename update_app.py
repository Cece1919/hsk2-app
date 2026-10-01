import os, re, json, glob

hsk_dir = "/Users/trangngo95/Desktop/HSK"

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def get_sec(html, sec_id):
    m = re.search(r'<(?:div|section)[^>]*id="' + sec_id + r'"[^>]*>(.*?)(?=<(?:div|section)[^>]*id="sec-|<script|</body)', html, re.DOTALL)
    content = m.group(1).strip() if m else ""
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    return content

def safe_json(obj):
    return json.dumps(obj).replace("</", "<\\/")

def update_mobile_app():
    day_folders = sorted(glob.glob(os.path.join(hsk_dir, "HSK2/Day *")), key=lambda p: int(re.search(r'Day (\d+)', p).group(1)) if re.search(r'Day (\d+)', p) else 0)

    print(f"Found {len(day_folders)} lesson folders: {[os.path.basename(p) for p in day_folders]}")

    all_vocab_audio = {}
    all_text_audio = {}
    all_items_dict = {}
    flashcards_data = []
    lesson_content = {}

    for folder in day_folders:
        folder_name = os.path.basename(folder)
        match_day = re.search(r'Day (\d+)', folder_name)
        if not match_day:
            continue
        lesson_num = int(match_day.group(1))

        html_files = glob.glob(os.path.join(folder, "*_Mo_Phong_Viet.html"))
        if not html_files:
            continue
        html_path = html_files[0]
        html_content = read_file(html_path)

        title_m = re.search(r'<title>(.*?)</title>', html_content)
        raw_title = title_m.group(1) if title_m else f"HSK 2 - Bài {lesson_num}"
        clean_title = re.sub(r'\(Có Mô Phỏng Nét Viết\)|HSK\s*2\s*-\s*Bài\s*\d+:\s*', '', raw_title).strip()

        v_m = re.search(r"const VOCAB_AUDIO = (\{.*?\});", html_content, re.DOTALL)
        t_m = re.search(r"const TEXT_AUDIO = (\{.*?\});", html_content, re.DOTALL)
        v_dict = json.loads(v_m.group(1)) if v_m else {}
        t_dict = json.loads(t_m.group(1)) if t_m else {}

        all_vocab_audio.update(v_dict)
        all_text_audio.update(t_dict)

        items_m = re.search(r"const items = (\[.*?\]);", html_content, re.DOTALL)
        items_list = json.loads(items_m.group(1)) if items_m else []
        all_items_dict[lesson_num] = items_list

        vocab_sec = get_sec(html_content, "sec-vocab")
        writing_sec = get_sec(html_content, "sec-writing")
        grammar_sec = get_sec(html_content, "sec-grammar")
        text_sec = get_sec(html_content, "sec-text")
        practice_sec = get_sec(html_content, "sec-practice")

        lesson_content[lesson_num] = {
            "title": f"第{lesson_num}课 {clean_title}",
            "desc": f"Bài học số {lesson_num}",
            "vocab": vocab_sec,
            "writing": writing_sec,
            "grammar": grammar_sec,
            "text": text_sec,
            "practice": practice_sec
        }

        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', vocab_sec, re.DOTALL)
        for row in rows:
            tds = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
            if len(tds) >= 6:
                hz = re.sub(r'<[^>]+>|🔊', '', tds[1]).strip()
                py = re.sub(r'<[^>]+>', '', tds[2]).strip()
                hv = re.sub(r'<[^>]+>', '', tds[3]).strip()
                vi = re.sub(r'<[^>]+>', '', tds[5]).strip()
                eg = re.sub(r'<[^>]+>', '', tds[6]).strip() if len(tds) > 6 else ""
                key_m = re.search(r"playVocab\(['\"]([^'\"]+)['\"]", tds[0])
                key = key_m.group(1) if key_m else hz

                if hz and py and hz != "Chữ Hán":
                    flashcards_data.append({
                        "hz": hz,
                        "py": py,
                        "hv": hv,
                        "vi": vi,
                        "eg": eg,
                        "key": key,
                        "lesson": lesson_num
                    })

    app_path = os.path.join(hsk_dir, "HSK2_Mobile_App.html")
    with open(app_path, "r", encoding="utf-8") as f:
        html_template = f.read()

    def replace_js_var(code, var_name, new_val_json):
        marker = f"const {var_name} = "
        idx = code.find(marker)
        if idx != -1:
            end_idx = code.find(";\n", idx)
            if end_idx != -1:
                return code[:idx] + marker + new_val_json + code[end_idx:]
        return code

    html_template = replace_js_var(html_template, "VOCAB_AUDIO", safe_json(all_vocab_audio))
    html_template = replace_js_var(html_template, "TEXT_AUDIO", safe_json(all_text_audio))
    html_template = replace_js_var(html_template, "FLASHCARDS", safe_json(flashcards_data))
    html_template = replace_js_var(html_template, "LESSON_ITEMS", safe_json(all_items_dict))
    html_template = replace_js_var(html_template, "LESSON_CONTENT", safe_json(lesson_content))

    pills_html = ""
    for l_num in sorted(lesson_content.keys()):
        active_class = "font-bold bg-white text-blue-950 shadow-sm" if l_num == 1 else "font-medium bg-slate-800/70 text-slate-300 hover:bg-slate-800"
        pills_html += f'''<button onclick="selectLesson({l_num})" id="btn-lesson-{l_num}" class="lesson-pill px-3.5 py-1.5 rounded-xl {active_class} whitespace-nowrap transition">Bài {l_num}</button>\n'''

    marker_pills_start = '<div class="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-xs">'
    m_idx = html_template.find(marker_pills_start)
    if m_idx != -1:
        m_end = html_template.find('</div>', m_idx)
        if m_end != -1:
            html_template = html_template[:m_idx + len(marker_pills_start)] + "\n" + pills_html + html_template[m_end:]

    with open(app_path, "w", encoding="utf-8") as f:
        f.write(html_template)

    artifact_path = "/Users/trangngo95/.gemini/antigravity/brain/54b183a3-6e75-4684-91cb-54e86e4de16c/hsk2_mobile_app.html"
    with open(artifact_path, "w", encoding="utf-8") as f:
        f.write(html_template)

    icloud_path = "/Users/trangngo95/Library/Mobile Documents/com~apple~CloudDocs/HSK2_Mobile_App.html"
    try:
        with open(icloud_path, "w", encoding="utf-8") as f:
            f.write(html_template)
        print("[SUCCESS] Synced Mobile App to iCloud Drive for iPhone access!")
    except Exception as e:
        print(f"[WARNING] iCloud sync failed: {e}")

    
    # Sync index.html and push to GitHub Pages
    try:
        import shutil, subprocess
        index_path = os.path.join(hsk_dir, "index.html")
        shutil.copy2(app_path, index_path)
        subprocess.run(["git", "add", "index.html", "HSK2_Mobile_App.html"], cwd=hsk_dir, check=False)
        subprocess.run(["git", "commit", "-m", f"Auto-update HSK 2 App with {len(lesson_content)} lessons"], cwd=hsk_dir, check=False)
        subprocess.run(["git", "push", "origin", "main"], cwd=hsk_dir, check=False)
        print("[SUCCESS] Auto-pushed updated app to GitHub Pages!")
    except Exception as e:
        print(f"[INFO] Git push skipped: {e}")

    print(f"[SUCCESS] Automatically updated App with {len(lesson_content)} lessons and {len(flashcards_data)} flashcards!")

if __name__ == "__main__":
    update_mobile_app()
