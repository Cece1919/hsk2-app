import os
import subprocess

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
audio_dir = os.path.join(day_dir, "audio")
os.makedirs(audio_dir, exist_ok=True)

print("--- 1. Generating Audio Files for Day 4 ---")

audio_items = {
    # Vocab
    "guo": "过",
    "shangchang": "商场",
    "jinqu": "进去",
    "tiao": "条",
    "kuzi": "裤子",
    "baise": "白色",
    "yinwei": "เพราะ", # wait, Chinese: 因为
    "yinwei": "因为",
    "shi": "试",
    "hongse": "红色",
    "suoyi": "所以",
    "shubao": "书包",
    "guoqu": "过去",
    "lvse": "绿色",
    "heise": "黑色",
    "geng": "更",
    "yanse": "颜色",
    # Texts
    "text1": "妈妈，我们来过这家商场吗？没来过，这是新开的。我们进去看看吧。好啊！你想买点儿什么？我想买条裤子。没问题。",
    "text2": "妈妈，我想买这条白色的裤子。你有很多白色的衣服，为什么还买白色的？因为我喜欢白色啊！我觉得这条白色的不太好看，你试试那条红色的吧。我没穿过红色的，红色的好看吗？就是因为没穿过，所以要试试啊！",
    "text3": "妈妈，我想买个新书包。好，那边卖书包，我们过去看看吧。这么多漂亮的书包！红色的、绿色的、黑色的，你想买哪个？绿色的吧。不错，我也觉得绿色的更好看。",
    "text4": "我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。"
}

for filename, text in audio_items.items():
    aiff_path = os.path.join(audio_dir, f"{filename}.aiff")
    m4a_path = os.path.join(audio_dir, f"{filename}.m4a")
    print(f"Generating audio for {filename}: {text[:20]}...")
    subprocess.run(["say", "-v", "Tingting", text, "-o", aiff_path], check=True)
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", aiff_path, m4a_path], check=True)
    if os.path.exists(aiff_path):
        os.remove(aiff_path)

print("Audio files generated successfully!")

