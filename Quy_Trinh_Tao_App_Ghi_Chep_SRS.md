# 🏮 QUY TRÌNH ĐÓNG GÓI & TỰ ĐỘNG HÓA TẠO APP GHI CHÉP TỪ VỰNG SRS (CECE NOTEBOOK APP)

Quy trình tự động hóa tiêu chuẩn áp dụng cho việc xây dựng, phát triển và cập nhật **Ứng dụng Học Từ Vựng Ghi Chép SRS** (Cece Chinese Journal Notebook SRS App). BẮT BUỘC tuân thủ 100% quy trình đóng gói dưới đây khi tạo mới hoặc nâng cấp ứng dụng.

---

## 📌 1. BỘ CẤU TRÚC FILE CHUẨN (APPLICATION ARCHITECTURE & FILES)

Mỗi lần khởi tạo hoặc cập nhật app, bộ file BẮT BUỘC bao gồm 3 thành phần chính:

1. **`srs_notebook_app.html` (File Ứng Dụng Chính):**
   - Giao diện Single-Page App (SPA) chuẩn Mobile Phone Frame di động (`max-width: 480px`, dark navy theme `#0f172a`, card slate `#f8fafc`).
   - Chứa 3 Tab tiêu chuẩn:
     - ✍️ **Nạp Từ Mới**: Ô nhập Chữ Hán, tự động tra từ điển offline, điền Pinyin + Nghĩa Việt + Ví dụ, lưu vào bộ nhớ SRS.
     - 🎴 **Ôn Tập SRS**: Thẻ lật Anki Flashcard, phát âm giọng đọc TTS `zh-CN`, ô gõ kiểm tra phản xạ, 4 nút đánh giá SRS (🔴 Quên, 🟠 Khó, 🟢 Tốt, 🔵 Dễ).
     - 📋 **Sổ Từ Vựng**: Bảng tổng hợp tất cả từ vựng, 3 nút công tắc Active Recall (👁️ Pinyin, 👁️ Nghĩa Việt, 👁️ Chữ Hán), bộ lọc theo Ngày/Nguồn từ, tính năng Xuất/Nhập Data JSON sao lưu.

2. **`build_srs_notebook_app.py` (Script Tự Động Đóng Gói HTML):**
   - Đọc dữ liệu từ `srs_full_database.json`.
   - Đóng gói dữ liệu khởi đầu Ngày 1 (14 từ HSK 2 Day 1 + 10 từ HSK 1 đầu vào).
   - Nhúng bộ từ điển offline `BUILTIN_DICTIONARY` (gồm 250+ từ vựng HSK 1, HSK 2, HSK 3) vào trực tiếp mã JS.
   - Xuất tệp `srs_notebook_app.html` sẵn sàng chạy offline / online.

3. **`test_srs_notebook_app.py` (Script Kiểm Thử Tự Động Playwright):**
   - Khởi chạy trình duyệt headless Chromium qua Playwright.
   - Mở tệp `srs_notebook_app.html`.
   - Giả lập người dùng nhập từ mới, bấm nút **✨ Tra & Điền**, bấm nút **Lưu vào bộ nhớ**, bấm chuyển 3 Tab.
   - Đảm bảo đạt **`0 Page Errors`** và **`0 Console Errors`** trước khi phát hành.

---

## 📌 2. QUY CHUẨN DỮ LIỆU KHỞI ĐẦU NGÀY 1 (DAY 1 BASELINE DATA)

Màn hình Ngày 1 BẮT BUỘC khởi tạo sẵn 24 từ vựng đầu vào:
- **14 từ HSK 2 Day 1**: `就`, `给`, `让`, `接`, `次`, `旅游`, `帮忙`, `不好意思`, `已经`, `那`, `介绍`, `有时`, `懂`, `意思`.
- **10 từ HSK 1 cốt lõi ôn đầu vào**: `猫`, `狗`, `椅子`, `桌子`, `电脑`, `电视`, `电影`, `天气`, `热`, `冷`.
- Mỗi từ chứa đầy đủ: `id`, `level`, `day`, `tag`, `hanzi`, `pinyin`, `pinyin_clean`, `hanviet`, `meaning`, `example`.

---

## 📌 3. THUẬT TOÁN SPACED REPETITION (SM-2 SRS ENGINE)

1. **Trạng thái lưu trữ của từng từ vựng:**
   ```javascript
   appState.cardProgress[wordId] = {
       interval: 1,      // Số ngày tới đợt ôn tiếp theo
       easeFactor: 2.5,  // Hệ số dễ nhớ (mặc định 2.5, min 1.3)
       repetition: 0,    // Số lần ôn tập thành công
       dueDate: "2026-10-02", // Ngày đến hạn (YYYY-MM-DD)
       lastReviewed: "2026-10-02",
       ticks: {}         // Các mốc D1, D2, D4, D7, D15, D30
   };
   ```

2. **Quy tắc tính khoảng cách ôn tập khi người dùng đánh giá:**
   - 🔴 **Quên (Again / Quality = 1)**: Reset `repetition = 0`, `interval = 1 ngày`, `easeFactor -= 0.2`.
   - 🟠 **Khó (Hard / Quality = 2)**: `repetition += 1`, `interval = Math.round(interval * 1.2)`, `easeFactor -= 0.15`.
   - 🟢 **Tốt (Good / Quality = 3)**: `repetition += 1`, `interval = Math.round(interval * easeFactor)`.
   - 🔵 **Dễ (Easy / Quality = 4)**: `repetition += 1`, `interval = Math.round(interval * easeFactor * 1.3)`, `easeFactor += 0.15`.

3. **Lọc hàng chờ đến hạn (`Due Queue`):**
   - Từ vựng xuất hiện trong hàng chờ ôn tập khi: `!dueDate || dueDate <= today`.

---

## 📌 4. BẢO VỆ DỮ LIỆU BỀN VỮNG (LOCALSTORAGE & BACKUP)

1. **Tự động lưu tức thì:**
   - Mọi thao tác nạp từ mới, đánh giá thẻ lật, đánh dấu mốc ôn đều gọi hàm `saveAppState()`.
   - Lưu vào `localStorage.setItem('cece_srs_notebook_app_v1', JSON.stringify(appState))`.

2. **Tính năng Xuất / Nhập Backup JSON:**
   - `exportDataJSON()`: Tạo file download `cece_srs_notebook_backup_YYYY-MM-DD.json`.
   - `importDataJSON(e)`: Khôi phục lại toàn bộ sổ từ vựng và lịch ôn từ file sao lưu JSON.

---

## 📌 5. AN TOÀN ĐỘC LẬP & TÍCH HỢP GITHUB PAGES VĨNH VIỄN

1. **Bảo vệ tuyệt đối ứng dụng cũ:**
   - App Ghi Chép SRS Mới chạy tại file riêng `srs_notebook_app.html`.
   - Không được đè hoặc làm hỏng file `index.html` / `HSK2_Mobile_App.html` của App HSK 2 Tự Học Cũ.

2. **Đường dẫn phát hành GitHub Pages vĩnh viễn:**
   - Main App URL: `https://cece1919.github.io/hsk2-app/` (Trỏ về HSK 2 Coursebook App cũ).
   - SRS Notebook App URL: `https://cece1919.github.io/hsk2-app/srs_notebook_app.html` (Hoặc có tham số `?v=2` để xóa cache trình duyệt).

---

## 📌 6. QUY TRÌNH 5 BƯỚC THỰC THI CHUẨN (EXECUTION PIPELINE)

Khi có yêu cầu cập nhật hoặc bổ sung tính năng cho App Ghi Chép SRS:

- **Bước 1**: Cập nhật logic / giao diện trong script Python `build_srs_notebook_app.py`.
- **Bước 2**: Thực thi `python3 build_srs_notebook_app.py` để đóng gói sinh lại file `srs_notebook_app.html`.
- **Bước 3**: Chạy script kiểm thử Playwright `python3 test_srs_notebook_app.py`. Đảm bảo kết quả **`0 Page Errors`** và **`0 Console Errors`**.
- **Bước 4**: Đưa file vào git: `git add srs_notebook_app.html build_srs_notebook_app.py` ➔ `git commit` ➔ `git push origin main`.
- **Bước 5**: Kiểm tra live link GitHub Pages và bàn giao cho người dùng.
