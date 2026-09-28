# 📋 QUY TRÌNH TẠO BÀI HỌC TỰ HỌC HSK CHUẨN (HTML INTERACTIVE & PDF)

> **Mục đích:** Quy trình chuẩn 6 bước giúp tự động hóa việc tạo bài học HSK2+ tự học hoàn chỉnh với đầy đủ âm thanh chuẩn Base64, mô phỏng nét viết động HanziWriter cho TỪNG CHỮ HÁN TRONG TỪ GHÉP, dòng phiên âm Pinyin đầy đủ cho các câu ví dụ minh họa từ vựng, tài liệu chiết tự & mẹo nhớ 4 thành phần chi tiết cho 100% từ mới, trọn bộ 3 phần bài tập luyện tập tương tác (Từ vựng, Ngữ pháp, Sắp xếp/Viết lại câu), bảng vẽ ô Tianzige tương tác, tệp PDF chất lượng cao và **TỰ ĐỘNG CẬP NHẬT BÀI MỚI VÀO APP HỌC TẬP DI ĐỘNG**.

---

## 📌 TỔNG QUAN CẤU TRÚC KẾT QUẢ ĐẦU RA

Mỗi bài học khi hoàn thành phải bao gồm các tệp được lưu trong thư mục `Day X` và ứng dụng di động:
1. 🌐 **`HSK2_Bai_[X]_Tu_Hoc.html`** & 📄 **`HSK2_Bai_[X]_Tu_Hoc.pdf`**: Tệp bài học tự học chuẩn (Âm thanh Base64 + Giao diện Navy Slate).
2. 🌐 **`HSK2_Bai_[X]_Mo_Phong_Viet.html`** & 📄 **`HSK2_Bai_[X]_Mo_Phong_Viet.pdf`**: Tệp tích hợp thêm Tab mô phỏng nét viết động HanziWriter & Khung luyện viết ô Tianzige cảm ứng cho **ĐẦY ĐỦ TỪNG CHỮ HÁN**.
3. 📝 **`Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md`**: Tài liệu hướng dẫn quy tắc nét & mẹo nhớ chiết tự 4 thành phần chi tiết cho 100% từ mới.
4. 📱 **`HSK2_Mobile_App.html`**: Ứng dụng di động tự động tích hợp thêm nút học Bài [X] mới!

---

## ⚙️ 6 BƯỚC THỰC HIỆN QUY TRÌNH

### BƯỚC 1: TRÍCH XUẤT NỘI DUNG BÀI HỌC
* Sử dụng Vision OCR hoặc PDF Reader để đọc dữ liệu bài học gốc.
* Trích xuất 100% chính xác các thành phần:
  - **Mục tiêu bài học**: Từ vựng, Ngữ pháp, Kỹ năng đạt được.
  - **Bảng từ vựng (10-15 từ)**: Từ Hán, Phiên âm, Hán Việt, Loại từ, Nghĩa Tiếng Việt, Ví dụ minh họa (Chữ Hán + Pinyin + Audio + Dịch nghĩa).
  - **Mẹo nhớ & Chiết tự chuẩn (`Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md`)**: Phải bao gồm đầy đủ 4 mục chi tiết cho 100% từ mới: (1) Số nét, (2) Bộ thủ cấu thành, (3) 💡 Mẹo ghi nhớ chiết tự câu chuyện, (4) ✒️ Thứ tự viết thuận bút từng bước.
  - **Ngữ pháp trọng tâm (2-4 điểm)**: Công thức, Giải thích chi tiết, Bảng cấu trúc, Ví dụ kèm phiên âm và dịch nghĩa.
  - **Bài khóa hội thoại (2-4 bài)**: Đầy đủ chữ Hán, Phiên âm, Dịch nghĩa và thông tin nhân vật.
  - **Bài tập củng cố trọn bộ 3 phần**:
    1. *Phần 1: Bài tập Từ vựng* (Điền từ vào chỗ trống).
    2. *Phần 2: Bài tập Ngữ pháp* (Trắc nghiệm chọn đáp án đúng).
    3. *Phần 3: Bài tập Sắp xếp & Viết lại câu* (Kèm đáp án Chữ Hán, Phiên âm, Dịch nghĩa và Giải thích).
  - **Góc Văn hóa**: Thông tin văn hóa, ẩm thực, phong tục liên quan (ví dụ: Vịt quay Bắc Kinh, Văn hóa Tây An, v.v.).

---

### BƯỚC 2: TẠO ÂM THANH NATIVE MANDARIN & NHÚNG BASE64
1. **Tạo tệp audio gốc:**
   * Sử dụng lệnh hệ thống macOS để tạo tệp âm thanh giọng đọc chuẩn Trung Quốc (`Tingting`):
     ```bash
     say -v Tingting "Nội dung tiếng Trung" -o test.aiff
     afconvert -f m4af -d aac test.aiff audio_output.m4a
     ```
2. **Mã hóa Base64 Data URI:**
   * Mã hóa từng tệp `.m4a` thành chuỗi Base64:
     ```python
     import base64
     with open("audio_output.m4a", "rb") as f:
         b64_str = base64.b64encode(f.read()).decode("utf-8")
     ```
   * Nhúng trực tiếp vào tệp HTML dưới dạng biến JavaScript (`const VOCAB_AUDIO = {...};`, `const TEXT_AUDIO = {...};`).
3. **Phát âm dự phòng (Fallback):**
   * Tích hợp Web Speech API (`SpeechSynthesisUtterance` với `lang: 'zh-CN'`) tự động kích hoạt khi tệp Base64 gặp sự cố trên trình duyệt.

---

### BƯỚC 3: THIẾT KẾ GIAO DIỆN HTML & MÔ PHỎNG NẾT VIẾT TỪNG CHỮ HÁN

#### 🎨 Bảng màu & Phong cách Giao diện (Navy Blue & Slate Theme):
* **Nền trang**: `bg-slate-50` (Tạo độ tương phản cao, dễ nhìn, chống mỏi mắt).
* **Header chính**: `bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white rounded-2xl shadow-xl`.
* **Thanh điều khiển tốc độ đọc top-bar**: `bg-slate-900 text-white` (Nút chọn `0.75x (Chậm)` và `1.0x (Chuẩn)`).
* **Thẻ nội dung (Cards)**: `bg-white p-6 rounded-2xl shadow-sm border border-slate-200`.
* **Nút bấm phát âm**: `bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 font-medium`.

#### 📝 QUY TẮC BẢNG TỪ VỰNG & VÍ DỤ MINH HỌA (BẮT BUỘC):
* Trong Bảng từ vựng (`sec-vocab`), cột **"VÍ DỤ MINH HỌA"** BẮT BUỘC phải trình bày đầy đủ:
  1. **Câu Chữ Hán** kèm nút phát âm (`speakText(...)`).
  2. **Dòng Phiên âm Pinyin đầy đủ** ngay cạnh chữ Hán hoặc bên dưới (`text-xs text-emerald-700 font-mono`).
  3. **Bản dịch Tiếng Việt** giải thích nghĩa câu ví dụ.

#### ✍️ QUY TẮC TAB TẬP VIẾT & MẸO NHỚ (`sec-writing`) (BẮT BUỘC ĐỦ 100% TỪ MỚI):
* Tab `sec-writing` BẮT BUỘC phải bao gồm đầy đủ **3 phần chính**:
  1. **Bảng 7 Quy tắc Thuận bút cơ bản** (Ngang trước sổ sau, phẩy trước mác sau, trên trước dưới sau, trái trước phải sau, ngoài trước trong sau, vào trước đóng sau, giữa trước hai bên sau).
  2. **Bảng Phân tích Bộ thủ trọng tâm của bài học**.
  3. **Thẻ Chiết tự & Mẹo nhớ 4 thành phần cho 100% TẤT CẢ TỪ MỚI VÀ DANH TỪ RIÊNG TRONG BÀI (RẤT QUAN TRỌNG)**:
     - **BẮT BUỘC** hiển thị đủ thẻ chiết tự chi tiết cho 100% từ mới (không bỏ sót bất kỳ từ nào).
     - Mỗi thẻ từ vựng BẮT BUỘC hiển thị đủ **4 thành phần chi tiết**:
       - **(1) Số nét chuẩn** cho từng chữ Hán.
       - **(2) Bộ thủ cấu thành** chính xác.
       - **(3) 💡 Mẹo ghi nhớ chiết tự câu chuyện tượng hình dễ nhớ**.
       - **(4) ✒️ Thứ tự viết thuận bút chuẩn từng nét**.

#### 🎬 QUY TẮC MÔ PHỎNG NẾT VIẾT CHO TỪ GHÉP (RẤT QUAN TRỌNG):
* Với các từ ghép có từ 2 đến 4 chữ Hán (ví dụ: `北京烤鸭`, `不好意思`, `踢足球`, `旅游`, `介绍`):
  * **BẮT BUỘC** phải chia tách và hiển thị đầy đủ ô mô phỏng nét viết (`HanziWriter`) và ô vẽ tay (`Tianzige Canvas`) cho **TẤT CẢ CÁC CHỮ HÁN TRONG TỪ ĐÓ**.
  * Ví dụ từ `北京烤鸭` (4 chữ): Hiển thị 4 ô riêng biệt tương ứng cho **北**, **京**, **烤**, **鸭**.
  * Ví dụ từ `旅游` (2 chữ): Hiển thị 2 ô riêng biệt tương ứng cho **旅**, **游**.

#### 📝 QUY TẮC BÀI TẬP LỰYỆN TRẮC NGHIỆM & VIẾT LẠI CÂU (`sec-practice`):
* Phải chứa đầy đủ **3 Phần bài tập**:
  1. **Phần 1: Bài tập Từ vựng** (Điền chỗ trống chọn đáp án, dùng `checkQ`).
  2. **Phần 2: Bài tập Ngữ pháp** (Trắc nghiệm chọn đáp án, dùng `checkQ`).
  3. **Phần 3: Bài tập Sắp xếp & Viết lại câu** (Nút **💡 Xem Đáp án & Giải thích** gọi `toggleElement('ans-rX')` bung mở rộng đầy đủ Chữ Hán + Pinyin + Dịch + Giải thích).

---

### BƯỚC 4: ĐỐI SOÁT & KIỂM TRA MÃ JAVASCRIPT (RẤT QUAN TRỌNG)
Trước khi lưu tệp, **BẮT BUỘC** kiểm tra cú pháp và cấu trúc mã JavaScript:
1. **Kiểm tra cú pháp độc lập (Brace Matching Check)**:
   * Chạy kiểm tra tự động qua trình biên dịch JavaScript (ví dụ: `jsc` hoặc Python AST) để đảm bảo **0 lỗi `SyntaxError`** và không bị thừa/thiếu ngoặc nhọn `{}` gây lồng hàm làm ngắt script.
2. **Hàm `toggleElement` chuẩn (Xử lý cả Tailwind class `hidden` & inline `style.display`)**:
   ```javascript
   function toggleElement(className) {
       const elements = document.getElementsByClassName(className);
       for (let el of elements) {
           const isHidden = el.classList.contains('hidden') || el.style.display === 'none' || (window.getComputedStyle && window.getComputedStyle(el).display === 'none');
           if (isHidden) {
               el.classList.remove('hidden');
               el.style.display = 'block';
           } else {
               el.classList.add('hidden');
               el.style.display = 'none';
           }
       }
   }
   ```
3. **Hàm `showTab` chuẩn**:
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
       if (tabId === 'sim' && typeof initWriters === 'function') {
           initWriters();
       }
   }
   ```

---

### BƯỚC 5: XUẤT BẢN FILE HTML & PDF ĐỒNG BỘ
1. **Lưu tệp HTML**: Ghi file vào đường dẫn `/Users/trangngo95/Desktop/HSK/HSK2/Day X/HSK2_Bai_[X]_Mo_Phong_Viet.html`.
2. **Xuất tệp PDF bằng Google Chrome Headless**:
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --headless --disable-gpu \
     --print-to-pdf="/Users/trangngo95/Desktop/HSK/HSK2/Day X/HSK2_Bai_[X]_Mo_Phong_Viet.pdf" \
     --no-pdf-header-footer \
     file:///Users/trangngo95/Desktop/HSK/HSK2/Day\ X/HSK2_Bai_[X]_Mo_Phong_Viet.html
   ```

---

### BƯỚC 6: TỰ ĐỘNG CẬP NHẬT BÀI HỌC MỚI VÀO APP DI ĐỘNG (BẮT BUỘC)
Ngay sau khi xuất bản tệp bài học HTML mới (ví dụ Bài 4, Bài 5...), **BẮT BUỘC** chạy lệnh tự động cập nhật app di động:
```bash
python3 /Users/trangngo95/Desktop/HSK/update_app.py
```
* **Kết quả tự động của Bước 6:**
  1. Thêm nút chọn Bài học mới trên thanh điều hướng top-bar ứng dụng di động `HSK2_Mobile_App.html`.
  2. Nạp toàn bộ từ vựng của bài mới vào kho bộ thẻ Flashcard SRS lật bài có âm thanh.
  3. Nạp nét vẽ thuận bút `HanziWriter` + khung cảm ứng `Tianzige` của bài mới.
  4. Nạp bài khóa hội thoại, ngữ pháp, các thẻ Tập viết & Mẹo nhớ 4 thành phần và bài tập củng cố tương tác vào App di động.
