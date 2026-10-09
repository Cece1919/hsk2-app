import fitz
import os
import subprocess

doc = fitz.open('/Users/trangngo95/Desktop/HSK/HSK2/877516200-Nhớ-Han-Tự-Thong-Qua-Chiết-Tự-Chữ-Han.pdf')

target_chars = ['过', '商', '场', '进', '去', '条', '裤', '子', '白', '色', '因', '为', '试', '红', '所', '以', '书', '包', '绿', '黑', '更', '颜']

# We can search pages by rendering them and running swift OCR
out_dir = '/Users/trangngo95/.gemini/antigravity/brain/e7e691c4-c781-4587-9b37-1c25b6cbb368/scratch/chiet_tu_search'
os.makedirs(out_dir, exist_ok=True)

# Swift script to OCR a page and check for characters
ocr_script = """
import Foundation
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count > 2 else { exit(1) }
let imgPath = args[1]
let targetChar = args[2]

let url = URL(fileURLWithPath: imgPath)
guard let image = NSImage(contentsOf: url),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(0) }

let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNRecognizeTextRequest()
request.recognitionLanguages = ["zh-Hans", "vi-VN", "en-US"]

try? requestHandler.perform([request])

if let results = request.results {
    let text = results.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
    if text.contains(targetChar) {
        print("FOUND|||" + text)
    }
}
"""

with open('/tmp/ocr_search.swift', 'w') as f:
    f.write(ocr_script)

print("Searching Chiết tự book pages...")
# Search across all pages in steps
found_entries = {}

for p_num in range(8, len(doc)):
    page = doc[p_num]
    # Check if page might contain entry (usually large Hanzi at top)
    img_path = f"{out_dir}/p_{p_num+1}.png"
    pix = page.get_pixmap(dpi=150)
    pix.save(img_path)

    # OCR this page
    res = subprocess.run(['swift', '/tmp/ocr_search.swift', img_path, ''], capture_output=True, text=True)
    # Actually let's run swift on all pages and print entries
    for char in target_chars:
        if char in found_entries:
            continue
        res_char = subprocess.run(['swift', '/tmp/ocr_search.swift', img_path, char], capture_output=True, text=True)
        if 'FOUND|||' in res_char.stdout:
            raw_text = res_char.stdout.split('FOUND|||')[1]
            found_entries[char] = (p_num + 1, raw_text)
            print(f"[FOUND] '{char}' on Page {p_num+1}!")

print(f"Done search. Found {len(found_entries)} / {len(target_chars)} characters.")
for c, (p, txt) in found_entries.items():
    print(f"\n=================== {c} (Page {p}) ===================")
    print(txt[:400])

