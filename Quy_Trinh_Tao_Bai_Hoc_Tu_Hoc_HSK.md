# 🏮 QUY TRÌNH CHUẨN ĐÓNG GÓI TẠO BÀI HỌC HSK TỰ HỌC & CẬP NHẬT APP DI ĐỘNG

> **Mục đích:** Quy trình tự động hóa 6 bước chuẩn giúp đóng gói 100% cấu trúc bài học HSK tự học (Form Bài 4), đảm bảo giao diện 7 Tab hoàn chỉnh, âm thanh chuẩn Base64 & TTS fallback, chiết tự & mẹo nhớ 4 thành phần cho 100% từ mới, bài tập luyện tập 15 câu tương tác, lưu đúng vị trí quy định và **TỰ ĐỘNG NẠP BÀI MỚI VÀO APP MOBILE & GITHUB PAGES**.

---

## 📌 1. QUY NĂNG VỊ TRÍ LƯU FILE & NGUYÊN TẮC ĐÓNG BĂNG

1. **Vị trí lưu file cố định (TẬP TRUNG)**:
   - Tất cả các file bài học phải được tạo và lưu **CHỈ TRONG** thư mục:
     `/Users/trangngo95/Desktop/HSK/HSK2/Day X/` (Ví dụ: `Day 1`..`Day 6`, `Day 7`...).
   - **TUYỆT ĐỐI KHÔNG** lưu hay copy file ra ngoài Desktop (`/Users/trangngo95/Desktop/`).

2. **Đóng băng bài học đã hoàn thành (FROZEN CONTENT)**:
   - Bài 1 đến Bài 6 HSK2 đã được duyệt 100%. Không tự ý thay đổi từ vựng, ngữ pháp, bài khóa hay bài tập của các bài học này.

---

## 📌 2. CẤU TRÚC 7 TAB CHUẨN FORM BÀI 4 (`HSK2_Bai_[X]_Tu_Hoc.html`)

| STT | Tab Name | Function & Element ID | Nội dung yêu cầu chuẩn |
|---|---|---|---|
| 1 | **📌 Overview** | `showTab('overview')` <br> Nút: `<button id="tab-overview" onclick="showTab('overview')">` | Màn hình mặc định khi mở file. Hiển thị mục tiêu từ vựng, ngữ pháp, bài khóa và kỹ năng đạt được. |
| 2 | **📖 Từ vựng** | `showTab('vocab')` | Callout box **"⚡ QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM BÀI X"** ở đầu tab + Bảng từ vựng chuẩn (Biến thể Thanh điệu, Ví dụ Hán/Pinyin/Audio/Dịch). |
| 3 | **✍️ Tập viết & Mẹo nhớ** | `showTab('writing')` | 7 Quy tắc nét bút + Bộ thủ trọng tâm + **Thẻ Chiết tự & Mẹo nhớ 4 thành phần cho 100% TẤT CẢ TỪ MỚI** (1. Số nét, 2. Bộ thủ, 3. Mẹo nhớ, 4. Thuận bút). *KHÔNG chứa ô vẽ/mô phỏng nét.* |
| 4 | **💡 Ngữ pháp** | `showTab('grammar')` | 2-4 điểm ngữ pháp trọng tâm (Công thức, bảng cấu trúc, giải thích chi tiết, ví dụ kèm Pinyin & Dịch). |
| 5 | **🗣️ Bài khóa** | `showTab('text')` | 2-4 bài khóa hội thoại đầy đủ Chữ Hán, Pinyin, Dịch tiếng Việt, Audio từng câu & phân vai. |
| 6 | **📝 Luyện tập** | `showTab('practice')` | **15 câu trắc nghiệm tương tác (`checkQ`)** (Phần 1: Từ vựng, Phần 2: Ngữ pháp) + **Phần 3 Sắp xếp/Viết lại câu BẮT BUỘC chứa ô nhập câu trả lời** (`<input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." ...>`) trước nút bung đáp án. |
| 7 | **🎋 Góc văn hóa** | `showTab('culture')` | Bài viết ngắn kèm kiến thức văn hóa, ẩm thực, phong tục liên quan. |

---

## 📌 3. KỸ THUẬT JAVASCRIPT & XỬ LÝ ÂM THANH

1. **Hàm chuyển Tab `showTab`**:
   ```javascript
   function showTab(tabId) {
       document.querySelectorAll('.tab-content').forEach(el => {
           el.classList.add('hidden');
           el.style.display = 'none';
       });
       document.querySelectorAll('.tab-btn').forEach(el => {
           el.classList.remove('active', 'text-blue-900', 'font-bold');
           el.classList.add('text-slate-600');
       });
       let targetSec = document.getElementById('sec-' + tabId);
       if (targetSec) {
           targetSec.classList.remove('hidden');
           targetSec.style.display = 'block';
       }
       let btn = document.getElementById('tab-' + tabId);
       if (btn) {
           btn.classList.add('active', 'text-blue-900', 'font-bold');
       }
   }
   ```

2. **Cú pháp Audio**:
   - Dùng nháy đơn trong chuỗi HTML: `onclick="playVocab('key', 'text')"`.
   - Audio Base64 nhúng sẵn + giọng đọc Web Speech API (`SpeechSynthesisUtterance` với `lang: 'zh-CN'`) dự phòng.

---

## 📌 4. BƯỚC ĐỒNG BỘ CẬP NHẬT APP VÀ GITHUB PAGES

Sau khi soạn xong bài học mới, chỉ cần chạy 1 lệnh duy nhất:

```bash
python3 /Users/trangngo95/Desktop/HSK/update_app.py
```

Lệnh sẽ tự động:
- Đọc tất cả thư mục `Day X` trong `/Users/trangngo95/Desktop/HSK/HSK2/`.
- Cập nhật giao diện App tổng `HSK2_Mobile_App.html` & `index.html`.
- Cập nhật kho Flashcard SRS lật thẻ có phát âm.
- Đồng bộ file sang iCloud Drive cho thiết bị di động.
- Git commit và Push lên GitHub Pages (`Cece1919.github.io/hsk2-app`).
