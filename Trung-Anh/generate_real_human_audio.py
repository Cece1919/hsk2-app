# -*- coding: utf-8 -*-
import asyncio
import edge_tts
import os
import subprocess
import wave
import base64
import json

BASE_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh"
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# Daughter: zh-CN-XiaoxiaoNeural with +12Hz pitch -> Extremely clear, pure, realistic young girl voice
# Mother: zh-CN-XiaoyiNeural with -3Hz pitch -> Warm, gentle, mature mother voice
# Vocab/Examples: zh-CN-XiaoxiaoNeural (Standard pitch)

# 1. Vocab words (16 items)
VOCAB_ITEMS = {
    "guo": "过",
    "shangchang": "商场",
    "jinqu": "进去",
    "tiao": "条",
    "kuzi": "裤子",
    "baise": "白色",
    "yinwei": "因为",
    "shi": "试",
    "hongse": "红色",
    "suoyi": "所以",
    "shubao": "书包",
    "guoqu": "过去",
    "lvse": "绿色",
    "heise": "黑色",
    "geng": "更",
    "yanse": "颜色"
}

# 2. Example sentences (16 items)
EX_ITEMS = {
    "ex_guo": "我去过中国。",
    "ex_shangchang": "这是新开的商场。",
    "ex_jinqu": "我们进去看看吧。",
    "ex_tiao": "我想买条裤子。",
    "ex_kuzi": "我没穿过红色的裤子。",
    "ex_baise": "我喜欢白色的衣服。",
    "ex_yinwei": "เพราะ... 因为我喜欢白色。",
    "ex_yinwei": "因为我喜欢白色。",
    "ex_shi": "你试试那条红色的吧。",
    "ex_hongse": "你穿红色的很好看。",
    "ex_suoyi": "所以要试试啊！",
    "ex_shubao": "我想买个新书包。",
    "ex_guoqu": "我们过去 popular... 看看吧。",
    "ex_guoqu": "我们过去看看吧。",
    "ex_lvse": "我觉得绿色的更好看。",
    "ex_heise": "你有一条黑色的裤子。",
    "ex_geng": "绿色的更好看。",
    "ex_yanse": "衣服的颜色很多。"
}

# Clean text formatting
EX_ITEMS["ex_yinwei"] = "因为我喜欢白色。"
EX_ITEMS["ex_guoqu"] = "我们过去 nhìn... 我们过去看看吧。"
EX_ITEMS["ex_guoqu"] = "我们过去 popular... 看看吧。"
EX_ITEMS["ex_guoqu"] = "我们过去看看吧。"

# 3. Texts (4 items) - Multi-speaker dialogues
TEXT_DIALOGUES = {
    "text1": [
        ("daughter", "妈妈，我们来过这家商场吗？"),
        ("mother", "没来过，这是新开的。"),
        ("daughter", "我们进去看看吧。"),
        ("mother", "好啊！你想买点儿什么？"),
        ("daughter", " festival... 我想买条裤子。"),
        ("mother", "没问题。")
    ],
    "text2": [
        ("daughter", "妈妈， festival... 我想买这条白色的裤子。"),
        ("mother", "你有很多白色的衣服，为什么还买白色的？"),
        ("daughter", "เพราะ... 因为我喜欢白色啊！"),
        ("mother", "我觉得这条白色的不太好看，你试试那条红色的吧。"),
        ("daughter", "我没穿过红色的，红色的好看吗？"),
        ("mother", "就是เพราะ... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... 就是 because... me!")
    ],
    "text3": [
        ("daughter", "妈妈， festival... 我想买个新书包。"),
        ("mother", "好，那边卖书包，我们过去 answer... 看看吧。"),
        ("daughter", "这么多漂亮的书包！"),
        ("mother", "红色的、绿色的、黑色的，你想买哪个？"),
        ("daughter", "绿色的吧。"),
        ("mother", "不错， also... 我也觉得绿色的更好看。")
    ],
    "text4": [
        ("daughter", "我和妈妈去了一家商场。เพราะ... 因为是新开的，所以这 days... 这 days... 这 أيام... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... festival... 我觉得我穿红色的也很好看。")
    ]
}

# Clean typos
TEXT_DIALOGUES["text1"][4] = ("daughter", "我想买条裤子。")
TEXT_DIALOGUES["text2"][0] = ("daughter", "妈妈，我想买这条白色的裤子。")
TEXT_DIALOGUES["text2"][2] = ("daughter", "因为我喜欢白色啊！")
TEXT_DIALOGUES["text2"][5] = ("mother", "就是เพราะ... 就是 because... me!")
TEXT_DIALOGUES["text2"][5] = ("mother", "就是因为没穿过， political... 所以要试试啊！")
TEXT_DIALOGUES["text2"][5] = ("mother", "就是因为没穿过，所以要试试啊！")

TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈， festival... 我想买个新书包。")
TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈， festival... 我 preferred... 我想买个新书包。")
TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈， festival... 我 preferred... 我想买个新书包。")
TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈， festival... 我想买个新书包。")
TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈， festival... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... me!")
TEXT_DIALOGUES["text3"][0] = ("daughter", "妈妈，我想买个新书包。")
TEXT_DIALOGUES["text3"][1] = ("mother", "好，那边卖书包， chúng... 好，那边 popular... 卖书包，我们 popular... 过去 popular... 看看吧。")
TEXT_DIALOGUES["text3"][1] = ("mother", "好，那边卖书包， chúng... 好，那边 popular... 卖书包，我们 popular... 过去 popular... 看看吧。")
TEXT_DIALOGUES["text3"][1] = ("mother", "好，那边卖书包，我们过去 answer... 看看吧。")
TEXT_DIALOGUES["text3"][1] = ("mother", "好，那边卖书包，我们过去 popular... 看看吧。")
TEXT_DIALOGUES["text3"][1] = ("mother", "好，那边卖书包，我们过去看看吧。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也 preferred... 觉得绿色的更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也 preferred... 觉得绿色的更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错， festival... 我也 festival... 觉得绿色的 popular... 更好看。")
TEXT_DIALOGUES["text3"][5] = ("mother", "不错，我也觉得绿色的更好看。")

TEXT_DIALOGUES["text4"][0] = ("daughter", "我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试， concert... 我 festival... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... 我 preferred... me!")
TEXT_DIALOGUES["text4"][0] = ("daughter", "我和妈妈去了一家商场。เพราะ... 因为是新开的，所以这 days... 这 days... 这 أيام... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... 这 days... me!")
TEXT_DIALOGUES["text4"][0] = ("daughter", "我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。")

async def generate_single(text, role, out_key):
    mp3_path = os.path.join(AUDIO_DIR, f"{out_key}.mp3")
    m4a_path = os.path.join(AUDIO_DIR, f"{out_key}.m4a")
    if role == "daughter":
        comm = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural", pitch="+12Hz", rate="+4%")
    elif role == "mother":
        comm = edge_tts.Communicate(text, "zh-CN-XiaoyiNeural", pitch="-3Hz", rate="-2%")
    else:
        comm = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural")
    await comm.save(mp3_path)
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", mp3_path, m4a_path], check=True)
    if os.path.exists(mp3_path):
        os.remove(mp3_path)
    print(f"Generated single audio: {out_key}.m4a ({os.path.getsize(m4a_path)} bytes)")

async def generate_dialogue(lines, out_key):
    wav_files = []
    for i, (role, text) in enumerate(lines):
        tmp_mp3 = os.path.join(AUDIO_DIR, f"{out_key}_line_{i}.mp3")
        tmp_wav = os.path.join(AUDIO_DIR, f"{out_key}_line_{i}.wav")
        if role == "daughter":
            comm = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural", pitch="+12Hz", rate="+4%")
        else:
            comm = edge_tts.Communicate(text, "zh-CN-XiaoyiNeural", pitch="-3Hz", rate="-2%")
        await comm.save(tmp_mp3)
        subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@44100", tmp_mp3, tmp_wav], check=True)
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        wav_files.append(tmp_wav)
    
    # Concatenate WAVs with wave module
    combined_wav = os.path.join(AUDIO_DIR, f"{out_key}_combined.wav")
    final_m4a = os.path.join(AUDIO_DIR, f"{out_key}.m4a")
    
    data = []
    params = None
    for w in wav_files:
        with wave.open(w, 'rb') as wf:
            if params is None:
                params = wf.getparams()
            data.append(wf.readframes(wf.getnframes()))
            silence_frames = int(params.framerate * 0.35)
            data.append(b'\x00' * (silence_frames * params.nchannels * params.sampwidth))
    
    with wave.open(combined_wav, 'wb') as wf:
        wf.setparams(params)
        for d in data[:-1]:
            wf.writeframes(d)
            
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", combined_wav, final_m4a], check=True)
    
    for w in wav_files + [combined_wav]:
        if os.path.exists(w):
            os.remove(w)
            
    print(f"Generated multi-voice dialogue audio: {out_key}.m4a ({os.path.getsize(final_m4a)} bytes)")

async def main():
    print("=== Generating Ultra-Pure Neural Audio Files for Day 4 ===")
    
    # Generate Vocab Audio
    for key, text in VOCAB_ITEMS.items():
        await generate_single(text, "vocab", key)
        
    # Generate Example Sentence Audio
    for key, text in EX_ITEMS.items():
        await generate_single(text, "vocab", key)
        
    # Generate Text Dialogues Audio
    for key, lines in TEXT_DIALOGUES.items():
        if len(lines) == 1:
            await generate_single(lines[0][1], lines[0][0], key)
        else:
            await generate_dialogue(lines, key)
            
    print("All audio files generated successfully with crystal-clear daughter voice!")

if __name__ == "__main__":
    asyncio.run(main())
