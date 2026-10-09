import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

# Inline Chinese Decorative SVGs
svg_cloud = """<svg class="w-8 h-8 text-amber-500/80 inline-block" viewBox="0 0 64 64" fill="currentColor">
<path d="M32 12c-7.7 0-14 5.8-14.9 13.2-1.3-.8-2.9-1.2-4.6-1.2-4.7 0-8.5 3.8-8.5 8.5 0 4.2 3 7.7 7.1 8.4 1 .2 2.1.3 3.1.3h35.6c4.6 0 8.3-3.7 8.3-8.3 0-4.3-3.2-7.8-7.4-8.3C49.9 18.2 41.7 12 32 12z"/>
</svg>"""

svg_fan = """<svg class="w-7 h-7 text-rose-700 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/><path d="M12 21v-9"/><path d="M7 16l5-4"/><path d="M17 16l-5-4"/>
</svg>"""

svg_lantern = """<svg class="w-8 h-8 text-amber-600 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
<path d="M9 2h6v2H9zM9 20h6v2H9z"/><path d="M5 8c0-2.2 3.1-4 7-4s7 1.8 7 4v8c0 2.2-3.1 4-7 4s-7-1.8-7-4V8z"/><path d="M12 4v16"/><path d="M8 4v16"/><path d="M16 4v16"/>
</svg>"""

svg_bamboo = """<svg class="w-8 h-8 text-emerald-700 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 2v20M8 6h8M8 12h8M8 18h8"/><path d="M12 6l4-3M12 12l4-3M12 18l4-3"/>
</svg>"""

svg_scroll = """<svg class="w-8 h-8 text-amber-700 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M7 7h10M7 12h10M7 17h6"/>
</svg>"""

svg_stamp = """<div class="inline-flex items-center justify-center w-8 h-8 border-2 border-rose-700 rounded-lg text-rose-800 font-bold text-xs bg-rose-50/80 font-serif">印</div>"""

def inject_decorations(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Decorate Header
    if "🌸 Giáo Trình HSK 2 Tự Học" in content and "祥云" not in content:
        content = content.replace("🌸 Giáo Trình HSK 2 Tự Học", f"🌸 {svg_cloud} Giáo Trình HSK 2 Tự Học • 华风美学 {svg_cloud}")

    # Decorate Tab 1 Title
    if "✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige" in content and "文房" not in content:
        content = content.replace("✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige", f"✍️ {svg_stamp} Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (文房四宝)")

    # Decorate Tab 2 Title
    if "Mục tiêu bài học HSK 2 - Bài 4" in content and "卷轴" not in content:
        content = content.replace("Mục tiêu bài học HSK 2 - Bài 4", f"{svg_scroll} Mục tiêu bài học HSK 2 - Bài 4 (学习目标)")

    # Decorate Tab 4 Title
    if "✍️ 7 Quy Tắc Nét Bút Cơ Bản" in content and "笔顺" not in content:
        content = content.replace("✍️ 7 Quy Tắc Nét Bút Cơ Bản", f"✍️ {svg_fan} 7 Quy Tắc Nét Bút Cơ Bản (笔顺规则)")

    # Decorate Tab 5 Title
    if "1. Trợ từ động thái “过”" in content and "语法" not in content:
        content = content.replace("1. Trợ từ động thái “过”", f"{svg_lantern} 1. Trợ từ động thái “过” (Aspect Particle)")

    # Decorate Tab 6 Title
    if "Text 1 (课文 1)" in content and "折扇" not in content:
        content = content.replace("Text 1 (课文 1)", f"{svg_fan} Text 1 (课文 1)")

    # Decorate Tab 7 Title
    if "📝 Interactive Practice Exercises" in content and "如意" not in content:
        content = content.replace("📝 Interactive Practice Exercises", f"📝 {svg_stamp} Interactive Practice Exercises (课后练习)")

    # Decorate Tab 8 Title
    if "🎋 Ý Nghĩa Màu Sắc Trong Văn Hóa Trung Hoa" in content and "翠竹" not in content:
        content = content.replace("🎋 Ý Nghĩa Màu Sắc Trong Văn Hóa Trung Hoa", f"🎋 {svg_bamboo} Ý Nghĩa Màu Sắc Trong Văn Hóa Trung Hoa (中华色彩文化)")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Added Chinese visual decorations to {filepath}")

inject_decorations(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_decorations(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
inject_decorations(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_decorations(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
inject_decorations(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_decorations(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("Chinese visual decorations added cleanly!")

