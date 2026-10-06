import os, sys, json, re

# Load HSK 2 vocabularies from modules
import build_days_1_to_4_master as d14
import build_day5_script as d5
import build_day6_script as d6
import build_day7_master as d7

def clean_pinyin(py):
    if not py: return ""
    # Strip tones for easy typing check
    s = py.lower()
    s = re.sub(r'[āáǎà]', 'a', s)
    s = re.sub(r'[ēéěè]', 'e', s)
    s = re.sub(r'[īíǐì]', 'i', s)
    s = re.sub(r'[ōóǒò]', 'o', s)
    s = re.sub(r'[ūúǔù]', 'u', s)
    s = re.sub(r'[ǖǘǚǜü]', 'v', s)
    s = re.sub(r'[^a-z0-9]', '', s)
    return s

# 1. Assemble HSK2 items
hsk2_raw = [
    ('Day 1', d14.day1_vocab),
    ('Day 2', d14.day2_vocab),
    ('Day 3', d14.day3_vocab),
    ('Day 4', d14.day4_vocab),
    ('Day 5', d5.day5_vocab),
    ('Day 6', d6.day6_vocab),
    ('Day 7', d7.day7_vocab)
]

srs_bank = []

for day_label, vocab_list in hsk2_raw:
    day_num = int(day_label.replace('Day ', ''))
    for idx, item in enumerate(vocab_list):
        hz = item.get('hz', '')
        py = item.get('py', '')
        hv = item.get('hv', '')
        vi = item.get('vi', '')
        rad = item.get('rad', '')
        mne = item.get('mne', '')
        eg = item.get('eg', '')
        
        srs_bank.append({
            "id": f"hsk2-d{day_num}-{idx+1}",
            "level": "HSK 2",
            "day": day_num,
            "tag": f"HSK 2 • Ngày {day_num}",
            "hanzi": hz,
            "pinyin": py,
            "pinyin_clean": clean_pinyin(py),
            "hanviet": hv,
            "meaning": vi,
            "radical": rad,
            "mnemonic": mne,
            "example": eg
        })

print(f"Loaded {len(srs_bank)} HSK 2 vocabulary items.")
