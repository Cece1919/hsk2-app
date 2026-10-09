import os
import base64
import json

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
audio_dir = os.path.join(day_dir, "audio")

# Load all m4a files and encode to base64 with data:audio/mp4 MIME type
audio_b64_map = {}
for fname in os.listdir(audio_dir):
    if fname.endswith(".m4a"):
        key = fname[:-4]
        fpath = os.path.join(audio_dir, fname)
        with open(fpath, "rb") as f:
            b64_str = base64.b64encode(f.read()).decode('utf-8')
            # Use data:audio/mp4;base64,... which is the standard MIME type for m4a/aac!
            audio_b64_map[key] = f"data:audio/mp4;base64,{b64_str}"

print(f"Encoded {len(audio_b64_map)} audio files to valid data:audio/mp4 Base64.")

vocab_keys = ["guo", "shangchang", "jinqu", "tiao", "kuzi", "baise", "yinwei", "shi", "hongse", "suoyi", "shubao", "guoqu", "lvse", "heise", "geng", "yanse"]
text_keys = ["text1", "text2", "text3", "text4"]

vocab_audio_dict = {k: audio_b64_map[k] for k in vocab_keys if k in audio_b64_map}
text_audio_dict = {k: audio_b64_map[k] for k in text_keys if k in audio_b64_map}

text_fallback_map = {
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
    "yanse": "颜色",
    "text1": "妈妈，我们来过这家商场吗？没来过，这是新开的。我们进去看看吧。好啊！你想买点儿什么？我想买条裤子。没问题。",
    "text2": "妈妈，我想买这条白色的裤子。你有很多白色的衣服，为什么还买白色的？因为我喜欢白色啊！我觉得这条白色的不太好看，你试试那条红色的吧。我没穿过红色的，红色的好看吗？就是因为没穿过，所以要试试啊！",
    "text3": "妈妈，我想买个新书包。好，那边卖书包，我们过去看看吧。这么多漂亮的书包！红色的、绿色的、黑色的，你想买哪个？绿色的吧。不错，我也觉得绿色的更好看。",
    "text4": "我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。"
}

vocab_js = "var VOCAB_AUDIO = " + json.dumps(vocab_audio_dict, ensure_ascii=False) + ";"
text_js = "var TEXT_AUDIO = " + json.dumps(text_audio_dict, ensure_ascii=False) + ";"
text_fallback_js = "var AUDIO_TEXT_MAP = " + json.dumps(text_fallback_map, ensure_ascii=False) + ";"

play_audio_js_func = """
        function playAudio(key) {
            if (currentAudio) {
                try {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                } catch(e){}
            }
            
            var b64Data = VOCAB_AUDIO[key] || TEXT_AUDIO[key];
            if (b64Data) {
                currentAudio = new Audio(b64Data);
                currentAudio.playbackRate = currentRate;
                var playPromise = currentAudio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(err) {
                        console.log('Base64 play failed, fallback to TTS:', err);
                        playFallback(key);
                    });
                }
            } else {
                currentAudio = new Audio('audio/' + key + '.m4a');
                currentAudio.playbackRate = currentRate;
                var playPromise2 = currentAudio.play();
                if (playPromise2 !== undefined) {
                    playPromise2.catch(function(err) {
                        console.log('File play failed, fallback to TTS:', err);
                        playFallback(key);
                    });
                }
            }
        }

        function playFallback(key) {
            var textToSpeak = AUDIO_TEXT_MAP[key] || key;
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                var msg = new SpeechSynthesisUtterance(textToSpeak);
                msg.lang = 'zh-CN';
                msg.rate = currentRate;
                window.speechSynthesis.speak(msg);
            }
        }
"""

def fix_html(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "var currentAudio = null;" in content and "function showTab(tabId)" in content:
        head_part = content.split("var currentAudio = null;")[0]
        tail_part = content.split("function showTab(tabId)")[1]
        
        new_js = f"""var currentAudio = null;
        var currentRate = 1.0;
        var writers = {{}};
        var isSimInitialized = false;

        {vocab_js}
        {text_js}
        {text_fallback_js}

        {play_audio_js_func}
"""
        updated_content = head_part + new_js + "\n        function showTab(tabId)" + tail_part
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Fixed audio MIME type in {filepath}")

# Update all HSK2 Day 4 HTML files
fix_html(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
fix_html(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))

# Copy to Trung-Anh directory
import shutil
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"
shutil.copy(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"), os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
shutil.copy(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"), os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
shutil.copytree(day_dir, os.path.join(trung_anh_dir, "Day 4"), dirs_exist_ok=True)

print("Audio MIME type fixed across all target HTML files!")

