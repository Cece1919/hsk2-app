---
name: hsk-tu-hoc
description: Quy trình tự động hóa soạn bài học HSK tự học chuẩn Form Bài 5 & Bài 6 (Bản 8 Tab Mô phỏng nét viết & Bản 7 Tab Tự học, 4 bài khóa, 15 câu bài tập tương tác, Audio Base64 & Audio file m4a, Thẻ Mẹo nhớ chiết tự 4 thành phần cho 100% từ mới, nạp App GitHub Pages).
---

# 🏮 HSK TỰ HỌC - QUY TRÌNH ĐÓNG GÓI CHUẨN SOẠN BÀI & CẬP NHẬT APP (MẪU BÀI 5, 6, 7)

Quy trình tự động hóa áp dụng cho tất cả bài học HSK mới (Bài 5, Bài 6, Bài 7, Bài 8, Bài 9...). Khi người dùng yêu cầu soạn bài mới hoặc cập nhật bài giảng, BẮT BUỘC tuân thủ 100% quy trình đóng gói chuẩn dưới đây.

---

## 📌 1. BỘ FILE ĐÓNG GÓI CHO MỖI BÀI HỌC (FILE STRUCTURE PER LESSON)

Mỗi bài học mới trong thư mục `HSK2/Day X/` (ví dụ: `HSK2/Day 8/`) BẮT BUỘC bao gồm 4 thành phần:

1. **`HSK2_Bai_[X]_Mo_Phong_Viet.html` (Bản 8 Tab):**
   - Màn hình mặc định mở tab `showTab('sim')` (`🎬 Mô phỏng nét viết`).
   - Chứa toàn bộ các ô HanziWriter động + Ô vẽ cảm ứng Tianzige (田字格) chuẩn kích thước cho 100% các chữ Hán trong từ mới của bài.
   - Tiếp theo là 7 Tab tiêu chuẩn: Overview ➔ Từ vựng ➔ Tập viết & Mẹo nhớ ➔ Ngữ pháp ➔ Bài khóa ➔ Luyện tập ➔ Góc văn hóa.

2. **`HSK2_Bai_[X]_Tu_Hoc.html` (Bản 7 Tab):**
   - Màn hình mặc định mở tab `showTab('overview')` (`📌 Overview`).
   - KHÔNG chứa tab Mô phỏng nét viết. Giao diện sạch đẹp, tối ưu hóa tốc độ tải trang.

3. **`Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md`:**
   - Tài liệu Markdown tổng hợp chi tiết 4 thành phần chiết tự (Số nét, Bộ thủ, Mẹo nhớ tượng hình, Thuận bút) cho 100% từ mới của bài.

4. **Thư mục âm thanh `audio/`:**
   - Chứa các tệp âm thanh định dạng `.m4a` cho từng từ vựng (`shengri.m4a`, `kuaile.m4a`...) và 4 đoạn bài khóa (`text1.m4a`, `text2.m4a`, `text3.m4a`, `text4.m4a`).
   - Được tạo tự động qua macOS TTS `say -v Tingting` và `afconvert -f m4af -d aac`.

---

## 📌 2. QUY CHUẨN NỘI DUNG 8 TAB GIAO DIỆN (CONTENT SPECIFICATION)

1. **Tab 1 (Bản 8 Tab): `🎬 Mô phỏng nét viết`** (`showTab('sim')`)
   - Danh sách 100% từ mới của bài.
   - Mỗi từ mới chứa bảng chi tiết các chữ Hán cấu thành, mỗi chữ Hán có:
     - Ô 1: **HanziWriter Động** (Nút Phát nét ▶, Nút Phát lại 🔄). Kích thước container `w-[105px] h-[105px]`, HanziWriter width/height `98`.
     - Ô 2: **Tianzige Ô Vẽ Cảm Ứng (Canvas)** (`<canvas width="105" height="105">` + Nút Xóa 🗑️).
   - Tự động gọi `initWriters()` và `initPads()` ngay khi trang tải (`DOMContentLoaded`) và khi chuyển tab `showTab('sim')`.

2. **Tab 2: `📌 Overview / 🎯 Mục tiêu`** (`showTab('overview')`)
   - Mục tiêu từ vựng, ngữ pháp, bài khóa và kỹ năng đạt được.
   - Quy trình 5 bước tự học hiệu quả.

3. **Tab 3: `📖 Từ vựng`** (`showTab('vocab')`)
   - **QUY TẮC VÀNG**: TAB TỪ VỰNG KHI ĐÃ CHUẨN LÀ KHÔNG ĐƯỢC PHÉP ĐỘNG VÀO HOẶC CHỈNH SỬA KHI CẬP NHẬT CÁC TAB KHÁC.
   - Khung quy tắc biến điệu thanh điệu đầu tab (**⚡ QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM HSK 2**).
   - Bảng từ vựng chuẩn gồm các cột: Nút nghe ▶, Chữ Hán, Pinyin, Hán Việt, Loại từ, Biến thể Thanh điệu, Nghĩa Tiếng Việt, Ví dụ minh họa (chứa Chữ Hán + Pinyin + Audio 🔊 + Dịch nghĩa).

4. **Tab 4: `✍️ Tập viết & Mẹo nhớ`** (`showTab('writing')`)
   - **Phần 1**: Bảng 7 Quy tắc nét bút cơ bản (Ngang trước sổ sau, Phẩy trước mác sau, Trên trước dưới sau...).
   - **Phần 2**: Bảng Bộ thủ trọng tâm của bài.
   - **Phần 3**: Thẻ chiết tự 4 thành phần cho 100% TẤT CẢ TỪ MỚI (không bỏ sót bất kỳ từ nào):
     - **(1) Số nét**
     - **(2) Bộ thủ cấu thành**
     - **(3) 💡 Mẹo nhớ tượng hình** + Trích dẫn chiết tự chuẩn từ sách **"Nhớ Hán Tự Thông Qua Chiết Tự Chữ Hán"** (`📚 Sách Nhớ Hán Tự Chiết Tự:`) với chính tả chuẩn xác 100%.
     - **(4) ✒️ Thuận bút**: Thứ tự quy tắc viết nét chuẩn.

5. **Tab 5: `💡 Ngữ pháp`** (`showTab('grammar')`)
   - 3 - 4 điểm ngữ pháp trọng tâm. Có công thức, giải thích, bảng mẫu và ví dụ Pinyin + dịch nghĩa.

6. **Tab 6: `🗣️ Bài khóa`** (`showTab('text')`)
   - **BẮT BUỘC ĐỦ 4 ĐOẠN BÀI KHÓA HỘI THOẠI** (Bài khóa 1, 2, 3, 4).
   - Đầy đủ Chữ Hán, Phiên âm Pinyin, Dịch tiếng Việt, nút phát Audio ▶ từng bài khóa (`playText(1)`, `playText(2)`, `playText(3)`, `playText(4)`).

7. **Tab 7: `📝 Luyện tập`** (`showTab('practice')`)
   - **BẮT BUỘC ĐỦ 15 CÂU TƯƠNG TÁC (`checkQ`)**:
     - **Phần 1**: 5 câu Bài tập Từ vựng (Điền từ vào chỗ trống).
     - **Phần 2**: 5 câu Bài tập Ngữ pháp trọng tâm.
     - **Phần 3**: 5 câu Sắp xếp / Viết lại câu hoàn chỉnh (BẮT BUỘC chứa ô nhập câu trả lời `<input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây...">` và nút xem đáp án chuẩn).

8. **Tab 8: `🎋 Góc văn hóa`** (`showTab('culture')`)
   - Kiến thức văn hóa, phong tục, ẩm thực Trung Hoa liên quan đến chủ đề bài học.

---

## 📌 3. QUY CHUẨN KÍCH THƯỚC & TƯƠNG THÍCH KHUNG VẼ (SIMULATION & CANVAS BOUNDS)

1. **Khung chứa Tianzige & HanziWriter trên di động**:
   - Khung ngoài (div wrapper): `w-[105px] h-[105px] flex items-center justify-center border border-dashed rounded-lg bg-slate-50 relative overflow-hidden`.
   - HanziWriter container: `width: 98px; height: 98px;`.
   - Canvas cảm ứng Tianzige: `<canvas id="pad-..." width="105" height="105" class="w-full h-full cursor-crosshair touch-none"></canvas>`.
2. **Khởi tạo tự động không để ô trống (Auto Init Engine)**:
   - Tất cả ô chữ phải khởi tạo ngay trên `window.onload` / `DOMContentLoaded` và khi click tab Mô phỏng (`showTab('sim')`) hoặc tab Tập viết (`showTab('writing')`).

---

## 📌 4. KỸ THUẬT & ÂM THANH 3 LỚP (FAILPROOF AUDIO ENGINE)

1. **Hệ thống Audio 3 lớp chống lỗi**:
   - **Lớp 1**: Nhúng chuỗi mã hóa Base64 dạng `.m4a` trong dictionary `VOCAB_AUDIO` và `TEXT_AUDIO`.
   - **Lớp 2**: Giọng đọc Web Speech API (`SpeechSynthesisUtterance` với `lang: 'zh-CN'`).
   - **Lớp 3**: Online TTS Fallback (`dict.youdao.com` / `translate.google.com`).

2. **Chuyển Tab & Điều hướng JS (Strict Navigation & CSS)**:
   - Hàm `showTab(tabId)` lọc triệt để class `hidden` bằng regex, cập nhật trạng thái `active` mượt mà không lỗi console.

---

## 📌 5. QUY CHUẨN GIAO DIỆN & UI/UX CHỐNG LỖI (APP UI/UX BASELINE RULEBOOK)

1. **Màu nền sáng rõ độ tương phản cao (High Contrast Readability)**:
   - Thẻ ngữ pháp, thẻ ví dụ từ vựng và khung bài tập (`.bg-slate-50`) BẮT BUỘC có màu nền `#f8fafc !important;` (Xám trắng sáng). Tuyệt đối không dùng màu nền tối đen/xanh navy cho `.bg-slate-50` để đảm bảo chữ xanh đậm (`text-blue-900`) và chữ xám đen (`text-slate-800`) luôn nổi bật, sáng rõ 100%.
   - `html, body` và `.app-container` giữ màu nền `#0f172a` (Xanh đen sang trọng).

2. **Bảo vệ mã JS không lỗi cú pháp (Zero Syntax Error Rule)**:
   - Các biến toàn cục âm thanh như `currentAudio` và `currentRate` chỉ khai báo duy nhất 1 lần dạng `var`. Tuyệt đối không khai báo lại bằng `let` ở đầu script làm phát sinh lỗi `Identifier 'currentAudio' has already been declared`, gây đóng băng nút bấm.

3. **Tự động đồng bộ App & Push GitHub Pages**:
   - Sau khi tạo/sửa file trong `HSK2/Day X/`, BẮT BUỘC chạy script `python3 update_app.py` để tự động tích hợp bài học vào `HSK2_Mobile_App.html`, `index.html` và đồng bộ sao lưu iCloud + `git push origin main`.

4. **Quy trình kiểm thử tự động Playwright (Mandatory Automated Test)**:
   - BẮT BUỘC chạy script kiểm thử tự động bằng Playwright để kiểm tra chuyển tất cả bài học, mở các tab giao diện, thử vẽ nét và phát audio. Chỉ khi đạt **`0 Page Errors`** mới bàn giao cho người dùng.

---

## 📌 6. QUY TRÌNH ĐÓNG GÓI & TỰ ĐỘNG HÓA TẠO APP GHI CHÉP TỪ VỰNG SRS (CECE NOTEBOOK APP)

Khi có yêu cầu khởi tạo hoặc nâng cấp **App Học Từ Vựng Ghi Chép SRS**, BẮT BUỘC tuân thủ quy trình đóng gói tự động dưới đây:

1. **Bộ File Cấu Trúc Độc Lập:**
   - App HTML chính: `srs_notebook_app.html` (chạy trên URL riêng `https://cece1919.github.io/hsk2-app/srs_notebook_app.html`).
   - Script Python đóng gói: `build_srs_notebook_app.py`.
   - Script kiểm thử Playwright: `test_srs_notebook_app.py`.

2. **Quy Chuẩn Nạp Dữ Liệu & Từ Điển Auto-Lookup Engine:**
   - Dữ liệu Ngày 1 khởi đầu mặc định: 14 từ HSK 2 Day 1 + 10 từ HSK 1 cốt lõi.
   - Từ điển offline nhúng sẵn 250+ từ vựng (`BUILTIN_DICTIONARY`): tự động tra Pinyin, Hán Việt, Nghĩa tiếng Việt và Ví dụ minh họa khi gõ Chữ Hán vào ô **Nạp từ mới**.

3. **Thuật Toán SRS SM-2 & Lưu Trữ Bền Vững:**
   - 4 nút đánh giá mức độ nhớ: 🔴 Quên (1d), 🟠 Khó (2d), 🟢 Tốt (4d), 🔵 Dễ (7d) và tự động nhân hệ số `easeFactor` ở các mốc ôn sau (14d, 30d...).
   - Tự động lưu tức thì vào `localStorage` (`cece_srs_notebook_app_v1`) + Nút Xuất/Nhập Data JSON sao lưu.

4. **Bảo Vệ App Cũ & Kiểm Thử Tự Động:**
   - Tuyệt đối không đè hay ảnh hưởng đến App HSK 2 Tự Học Cũ (`index.html` / `HSK2_Mobile_App.html`).
   - BẮT BUỘC chạy `python3 test_srs_notebook_app.py` bằng Playwright đạt **`0 Page Errors`**, **`0 Console Errors`** và push lên `git origin main` trước khi bàn giao.


