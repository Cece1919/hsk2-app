# -*- coding: utf-8 -*-
import asyncio
import edge_tts
import os
import subprocess
import wave
import base64
import json

DAY9_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh/Day 9"
AUDIO_DIR = os.path.join(DAY9_DIR, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

VOICE_TEACHER = "zh-CN-XiaoxiaoNeural"  # Giọng giáo viên chuẩn
VOICE_WIFE = "zh-CN-XiaoxiaoNeural"     # Giọng người vợ (Vương Nhất Tuyết)
VOICE_HUSBAND = "zh-CN-YunxiNeural"     # Giọng người chồng (Lưu Minh)
VOICE_NARRATOR = "zh-CN-XiaoxiaoNeural" # Giọng nhật ký / dẫn chuyện

VOCAB_ITEMS = {
    "huai": "坏",
    "pangbian": "旁边",
    "nanhair": "男孩儿",
    "zheyang": "这样",
    "gezi": "个子",
    "name": "那么",
    "gao": "高",
    "menkou": "门口",
    "naicha": "奶茶",
    "kafei": "咖啡",
    "li": "离",
    "jin": "近",
    "zoulu": "走路",
    "zhou": "周"
}

EX_ITEMS = {
    "ex_huai": "儿子裤子坏了，我们给他买条新的吧。",
    "ex_pangbian": "旁边那个男孩儿穿了这样的裤子。",
    "ex_nanhair": "旁边那个男孩儿跑得真快。",
    "ex_zheyang": "我也喜欢这样的茶杯。",
    "ex_gezi": "儿子的个子没有他那么高。",
    "ex_name": "今天没有昨天那么冷。",
    "ex_gao": "妹妹有姐姐高吗？",
    "ex_menkou": "门口有家奶茶店，你想喝杯奶茶吗？",
    "ex_naicha": "那你等一下，我去买杯奶茶。",
    "ex_kafei": "喝了咖啡，晚上就别想睡觉了。",
    "ex_li": "咖啡店离这儿有点儿远。",
    "ex_jin": "这里离家很近，还是走路吧。",
    "ex_zoulu": "走半个多小时就到了。",
    "ex_zhou": "这周刘明休息，我们去了一家商店。"
}

# Dialogue lines (VOICE, TEXT) - ONLY DIALOGUE TEXT, NO CHARACTER NAMES!
TEXT1_LINES = [
    (VOICE_WIFE, "儿子裤子坏了，我们给他买条新的吧。"),
    (VOICE_HUSBAND, "好啊。"),
    (VOICE_WIFE, "你看这条黑色的怎么样？"),
    (VOICE_HUSBAND, "没有你上次买的那条好看。"),
    (VOICE_WIFE, "旁边那个男孩儿就穿了这样的裤子，我觉得很好看啊！"),
    (VOICE_HUSBAND, "儿子的个子没有他那么高，穿上就不会太好看。"),
    (VOICE_WIFE, "好吧，我们再去那边看看。")
]

TEXT2_LINES = [
    (VOICE_WIFE, "门口有家奶茶店。你想喝杯奶茶吗？"),
    (VOICE_HUSBAND, "我想喝咖啡，还是去咖啡店吧。"),
    (VOICE_WIFE, "咖啡店离这儿有点儿远。"),
    (VOICE_HUSBAND, "没关系，那家店的咖啡很好喝。"),
    (VOICE_WIFE, "那你等一下，我去买杯奶茶。"),
    (VOICE_HUSBAND, "你不想喝咖啡吗？"),
    (VOICE_WIFE, "喝了咖啡，晚上就别想睡觉了。")
]

TEXT3_LINES = [
    (VOICE_HUSBAND, "我们打车回去吧。"),
    (VOICE_WIFE, "这里离家很近，还是走路吧。"),
    (VOICE_HUSBAND, "要走多长时间？"),
    (VOICE_WIFE, "走半个多小时就到了。"),
    (VOICE_HUSBAND, "好的。每天上下班都坐车，今天运动运动吧。")
]

TEXT4_LINES = [
    (VOICE_WIFE, "这周刘明休息，我下班后跟他去了一家商店。商店里边衣服没有大商场里好看。我们没有买到喜欢的衣服，从商店出来就到咖啡店坐了坐。因为想运动运动，所以喝完东西，我们就走回家了。")
]

async def gen_single(text, voice, out_key):
    mp3_path = os.path.join(AUDIO_DIR, f"{out_key}.mp3")
    m4a_path = os.path.join(AUDIO_DIR, f"{out_key}.m4a")
    comm = edge_tts.Communicate(text, voice)
    await comm.save(mp3_path)
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", mp3_path, m4a_path], check=True)
    if os.path.exists(mp3_path):
        os.remove(mp3_path)
    with open(m4a_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    return f"data:audio/mp4;base64,{b64}"

async def gen_dialogue(lines, out_key):
    wav_files = []
    for i, (voice, text) in enumerate(lines):
        tmp_mp3 = os.path.join(AUDIO_DIR, f"{out_key}_line_{i}.mp3")
        tmp_wav = os.path.join(AUDIO_DIR, f"{out_key}_line_{i}.wav")
        comm = edge_tts.Communicate(text, voice)
        await comm.save(tmp_mp3)
        subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@44100", tmp_mp3, tmp_wav], check=True)
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        wav_files.append(tmp_wav)
    
    combined_wav = os.path.join(AUDIO_DIR, f"{out_key}_combined.wav")
    final_m4a = os.path.join(AUDIO_DIR, f"{out_key}.m4a")
    
    data = []
    params = None
    for w in wav_files:
        with wave.open(w, 'rb') as wf:
            if params is None:
                params = wf.getparams()
            data.append(wf.readframes(wf.getnframes()))
            # 0.35s silence between lines
            silence_frames = int(params.framerate * 0.35)
            data.append(b'\x00' * (silence_frames * params.nchannels * params.sampwidth))
            
    with wave.open(combined_wav, 'wb') as wf:
        wf.setparams(params)
        # remove last silence
        for d in data[:-1]:
            wf.writeframes(d)
            
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", combined_wav, final_m4a], check=True)
    
    # cleanup temp
    for w in wav_files + [combined_wav]:
        if os.path.exists(w):
            os.remove(w)
            
    with open(final_m4a, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    return f"data:audio/mp4;base64,{b64}"

async def main():
    print("Generating Day 9 Vocabulary Audio...")
    vocab_b64 = {}
    for key, text in VOCAB_ITEMS.items():
        print(f"  -> Vocab: {key} ({text})")
        b64 = await gen_single(text, VOICE_TEACHER, key)
        vocab_b64[key] = b64

    print("\nGenerating Day 9 Example Sentences Audio...")
    ex_b64 = {}
    for key, text in EX_ITEMS.items():
        print(f"  -> Example: {key}")
        b64 = await gen_single(text, VOICE_TEACHER, key)
        ex_b64[key] = b64

    print("\nGenerating Day 9 Multi-Speaker Dialogues...")
    text_b64 = {}
    
    print("  -> Text 1 (Wang Yixue & Liu Ming at store)")
    text_b64["text1"] = await gen_dialogue(TEXT1_LINES, "text1")
    
    print("  -> Text 2 (Wang Yixue & Liu Ming outside store - bubble tea)")
    text_b64["text2"] = await gen_dialogue(TEXT2_LINES, "text2")
    
    print("  -> Text 3 (Wang Yixue & Liu Ming outside coffee shop - walk vs taxi)")
    text_b64["text3"] = await gen_dialogue(TEXT3_LINES, "text3")
    
    print("  -> Text 4 (Wang Yixue diary narration)")
    text_b64["text4"] = await gen_dialogue(TEXT4_LINES, "text4")

    out_json = os.path.join(DAY9_DIR, "day9_audio_base64.json")
    payload = {
        "vocab": vocab_b64,
        "ex": ex_b64,
        "text": text_b64
    }
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"\nSUCCESS! Audio Base64 saved to {out_json}")
    print(f"Total vocabulary: {len(vocab_b64)}")
    print(f"Total examples: {len(ex_b64)}")
    print(f"Total dialogues: {len(text_b64)}")

if __name__ == "__main__":
    asyncio.run(main())
