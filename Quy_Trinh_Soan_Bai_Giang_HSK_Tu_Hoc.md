# 🏮 QUY TRÌNH CHUẨN ĐÓNG GÓI BÀI GIẢNG HSK TỰ HỌC (MASTER WORKFLOW SPECIFICATION)
> **Dành cho:** Tạo lập & Nâng cấp các bài học HSK tự học theo phong cách Trung Hoa Nữ Tính (Chinese Feminine Aesthetic), giao diện dễ nhìn không đau mắt, hệ thống Audio giọng người thật phân vai linh hoạt theo nhân vật (Multi-Speaker Neural Audio), 100% Thẻ chiết tự 4 thành phần & kiểm thử tự động Playwright.
> **Vị trí lưu trữ quy trình:** `/Users/trangngo95/Desktop/HSK/Trung-Anh/Quy_Trinh_Soan_Bai_Giang_HSK_Tu_Hoc.md`

---

## 📌 1. BỘ FILE CHUẨN DÀNH CHO MỖI BÀI HỌC (FILE STRUCTURE)

Mỗi bài học mới (Bài 4, Bài 5, Bài 6, Bài 7...) BẮT BUỘC bao gồm 4 thành phần chuẩn trong thư mục bài học (ví dụ `Trung-Anh/Day X/` và `Trung-Anh/`):

1. **`HSK2_Bai_[X]_Mo_Phong_Viet.html` (Bản 8 Tab):**
   - Màn hình mặc định mở tab `showTab('sim')` (`🎬 Mô phỏng nét viết`).
   - Chứa 100% các ô **HanziWriter** động và **Tianzige Ô Vẽ Cảm Ứng (Canvas)** cho tất cả các chữ Hán trong từ mới.
   - Tiếp theo là 7 Tab tiêu chuẩn: Overview ➔ Từ vựng ➔ Tập viết & Mẹo nhớ ➔ Ngữ pháp ➔ Bài khóa ➔ Luyện tập ➔ Góc văn hóa.

2. **`HSK2_Bai_[X]_Tu_Hoc.html` (Bản 7 Tab):**
   - Màn hình mặc định mở tab `showTab('overview')` (`📌 Overview`).
   - Tối ưu tốc độ tải trang, không chứa tab Mô phỏng nét viết.

3. **`Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md`:**
   - Tài liệu Markdown tổng hợp chi tiết **Thẻ chiết tự 4 thành phần** (Số nét, Bộ thủ, Mẹo nhớ tượng hình, Thuận bút) cho 100% từ mới.

4. **Thư mục hình ảnh & âm thanh (`images/` & `audio/`):**
   - `images/`: Chứa 4 ảnh minh họa bài khóa (`text1.jpg` – `text4.jpg`) và các ảnh nền Trung Hoa thủy mặc nghệ thuật mờ ẩn (`bg_landscape.jpg`, `bg_plum.jpg`, `bg_lotus.jpg`, `bg_garden.jpg`).
   - `audio/`: Chứa các tệp âm thanh `.m4a` giọng người thật chuẩn AAC cho từng từ vựng, câu ví dụ và đoạn bài khóa hội thoại.

---

## 📌 2. QUY CHUẨN NỘI DUNG & NGÔN NGỮ (ZERO CONTENT DISTORTION)

1. **Bảo Toàn 100% Nội Dung Sách Giáo Khoa (Strict Content Integrity):**
   - 100% từ vựng, pinyin, ngữ pháp, bài khóa và câu hỏi luyện tập phải lấy chuẩn tuyệt đối từ SGK HSK.
   - **KHÔNG TỰ Ý SỬA NỘI DUNG, KHÔNG TỰ BỊA, KHÔNG ĐỘNG VÀO NỘI DUNG ĐÃ CHUẨN.**

2. **Ngôn Ngữ Dịch Song Ngữ (Bilingual Standard):**
   - **Tab 6 (Bài khóa):** Sử dụng **Tiếng Anh chuẩn sách giáo khoa (English Translations)** cho bài khóa hội thoại.
   - **Giải thích ngữ pháp & Mẹo nhớ:** Tiếng Việt dễ hiểu, khoa học, chính xác 100%.

3. **100% Thẻ Mẹo Nhớ Chiết Tự 4 Thành Phần (Tab 4):**
   Tất cả từ mới BẮT BUỘC có đủ 4 mục:
   - **(1) Số nét:** Tổng số nét chữ Hán.
   - **(2) Bộ thủ:** Tên bộ thủ, Hán Việt và ý nghĩa bộ.
   - **(3) 💡 Mẹo nhớ tượng hình + Trích dẫn chiết tự:** Trích dẫn nguyên văn từ sách *"Nhớ Hán Tự Thông Qua Chiết Tự Chữ Hán"* (`📚 Sách Nhớ Hán Tự Chiết Tự:`). Từ không có trong sách thì tự tổng hợp từ các nguồn etymology uy tín.
   - **(4) ✒️ Thuận bút:** Thứ tự nét viết chuẩn.

---

## 📌 3. GIAO DIỆN NỮ TÍNH TRUNG HOA (CHINESE FEMININE AESTHETIC UI)

1. **Bảng Màu Nền Nã Thư Thái (Color Palette):**
   - **Phông nền chính (Rice Paper background):** Giấy xuyên thanh xám trắng dịu mắt `#fdfbf7`.
   - **Header & Điểm nhấn:** Hồng ngọc / Đỏ thắm Trung Hoa (`rose-800`, `#9f1239`, `#881337`).
   - **Khung nội dung (High-contrast cards):** Nền trắng sáng cao cấp `#ffffff`, viền hồng phấn / xám nhạt (`border-rose-100/80`, `border-slate-200`), bo góc mềm mại `rounded-3xl`.

2. **Họa Tiết & Hiệu Ứng Trang Trí Trung Hoa:**
   - **Cánh hoa đào rơi (Falling Sakura Petals Animation):** Hiệu ứng hoa đào rơi dịu nhẹ mang phong cách cổ trang Trung Hoa.
   - **Hình nền thủy mặc ẩn mờ (Blurred Watermark Background):** Ảnh nền công viên / phong cảnh thủy mặc chèn bên dưới với độ mờ `opacity: 0.12`, `filter: blur(4px)`.

3. **Bố Cục Tab 6 (Bài khóa 2 Cột):**
   - **Cột trái (3/5 width):** Chữ Hán + Pinyin + Dịch tiếng Anh + Nút phát Audio Neural ▶.
   - **Cột phải (2/5 width):** Tranh thủy mặc minh họa nội dung bài khóa (`text1.jpg` – `text4.jpg`).

---

## 📌 4. HỆ THỐNG AUDIO GIỌNG NGƯỜI THẬT PHÂN VAI THEO NHÂN VẬT (MULTI-SPEAKER NEURAL AUDIO)

1. **Giọng Người Thật Chuẩn Bản Ngữ (Microsoft Edge Neural Voices):**
   - Loại bỏ 100% giọng đọc máy macOS `say` cũ. Thay bằng giọng Neural thế hệ mới của Microsoft trained trên người thật.

2. **Phân Vai Linh Hoạt Cho Nhân Vật (Multi-Speaker Characters):**
   - **Giọng Con (Ví dụ: 刘小雪):** Giọng thiếu nữ / trẻ em trong trẻo, sinh động (`zh-CN-liaoning-XiaobeiNeural`).
   - **Giọng Mẹ (Ví dụ: 王一雪):** Giọng người mẹ ấm áp, trưởng thành (`zh-CN-XiaoxiaoNeural`).
   - **Giọng Từ vựng & Ví dụ:** Giọng nữ chuẩn giáo viên nhẹ nhàng (`zh-CN-XiaoxiaoNeural`).

3. **Quy Tắc Đọc Hội Thoại Bài Khóa (Tab 6):**
   - **CHỈ ĐỌC LỜI THOẠI HỘI THOẠI, KHÔNG ĐỌC TÊN NHÂN VẬT** (KHÔNG đọc `刘小雪:` hay `王一雪:`).
   - Ngắt nghỉ giữa các lượt lời hội thoại: 0.35 giây.

4. **Kỹ Thuật Nhúng Base64 MIME Chuẩn Chống Lỗi (Audio Engine):**
   - Tất cả âm thanh được chuyển sang chuỗi Base64 nhúng thẳng vào các JS Dictionaries (`VOCAB_AUDIO`, `EX_AUDIO`, `TEXT_AUDIO`).
   - BẮT BUỘC dùng MIME type `data:audio/mp4;base64,...` để tương thích 100% với Safari, Chrome và di động.

---

## 📌 5. SCRIPT TỰ ĐỘNG HÓA TẠO AUDIO NEURAL PHÂN VAI & NHÚNG HTML

```python
# -*- coding: utf-8 -*-
import asyncio
import edge_tts
import os
import subprocess
import wave
import base64
import json

# Khai báo phân vai giọng đọc
VOICE_DAUGHTER = "zh-CN-liaoning-XiaobeiNeural" # Giọng con (Thiếu nữ/Trẻ em)
VOICE_MOTHER = "zh-CN-XiaoxiaoNeural"            # Giọng mẹ (Phụ nữ ấm áp)
VOICE_VOCAB = "zh-CN-XiaoxiaoNeural"             # Giọng từ vựng

async def generate_dialogue(lines, out_key):
    wav_files = []
    for i, (voice, text) in enumerate(lines):
        tmp_mp3 = f"audio/{out_key}_line_{i}.mp3"
        tmp_wav = f"audio/{out_key}_line_{i}.wav"
        comm = edge_tts.Communicate(text, voice)
        await comm.save(tmp_mp3)
        subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@44100", tmp_mp3, tmp_wav], check=True)
        if os.path.exists(tmp_mp3): os.remove(tmp_mp3)
        wav_files.append(tmp_wav)
    
    # Concatenate WAVs with wave module
    combined_wav = f"audio/{out_key}_combined.wav"
    final_m4a = f"audio/{out_key}.m4a"
    
    data = []
    params = None
    for w in wav_files:
        with wave.open(w, 'rb') as wf:
            if params is None: params = wf.getparams()
            data.append(wf.readframes(wf.getnframes()))
            silence_frames = int(params.framerate * 0.35)
            data.append(b'\x00' * (silence_frames * params.nchannels * params.sampwidth))
    
    with wave.open(combined_wav, 'wb') as wf:
        wf.setparams(params)
        for d in data[:-1]: wf.writeframes(d)
            
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", combined_wav, final_m4a], check=True)
    for w in wav_files + [combined_wav]:
        if os.path.exists(w): os.remove(w)
```

---

## 📌 6. CHECKLIST KIỂM THỬ TỰ ĐỘNG PLAYWRIGHT PRE-FLIGHT

Trước khi bàn giao bài học cho người dùng, BẮT BUỘC chạy script kiểm thử Playwright để đảm bảo đạt **`0 Page Errors`** và **`0 Console Errors`**:

1. Chuyển lần lượt qua 8 Tab giao diện (`showTab`).
2. Bấm chạy thử audio từ vựng (`playAudio('guo')`), ví dụ (`playAudio('ex_guo')`) và bài khóa (`playAudio('text1')`).
3. Đảm bảo 100% hình ảnh minh họa (`text1.jpg`–`text4.jpg`) và hiệu ứng cánh hoa đào hoạt động trơn tru.

---
*Quy trình chuẩn hóa bài giảng HSK Tự Học Nữ Tính được nghiệm thu và lưu trữ chính thức.*
