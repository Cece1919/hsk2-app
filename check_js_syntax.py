with open('srs_notebook_app.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

script_start = False
script_lines = []
for idx, l in enumerate(lines, 1):
    if '<script>' in l:
        script_start = True
        continue
    if '</script>' in l:
        script_start = False
        continue
    if script_start:
        script_lines.append((idx, l))

print(f"Total script lines: {len(script_lines)}")

# Check for unescaped newlines or backslashes inside double quotes or single quotes
for idx, l in script_lines:
    if '`' in l:
        # check backticks
        pass
    # Check if there are non-ASCII quotes like curly quotes inside script
    if '“' in l or '”' in l or '‘' in l or '’' in l:
        print(f"Line {idx} has curly quotes: {l.strip()}")
