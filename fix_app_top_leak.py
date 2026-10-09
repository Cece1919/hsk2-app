import re

app_path = "/Users/trangngo95/Desktop/HSK/HSK2_Mobile_App.html"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update viewport meta tag for safe area inset support
new_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">\n    <meta name="theme-color" content="#0f172a">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">'

content = re.sub(r'<meta name="viewport"[^>]*>', new_viewport, content)

# 2. Remove fake-status-bar div to prevent layout offset
fake_bar_pattern = r'<div class="fake-status-bar[^>]*>.*?</div>\s*'
content = re.sub(fake_bar_pattern, '', content, flags=re.DOTALL)

# 3. Change header sticky position from top-7 to top-0 and add safe area padding
old_header_tag = 'class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-4 shadow-md sticky top-7 z-40"'
new_header_tag = 'class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white px-4 pb-4 pt-3 sm:pt-4 shadow-md sticky top-0 z-40" style="padding-top: max(0.75rem, env(safe-area-inset-top));"'

content = content.replace(old_header_tag, new_header_tag)
content = content.replace('top-7', 'top-0')

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed top leak and status bar offset in HSK2_Mobile_App.html!")
