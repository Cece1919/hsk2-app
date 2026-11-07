// Dữ liệu 5 Đề Thi Thử Vòng Chung Kết Quốc Gia TIMO Khối 2 (2016 – 2021)
// Hệ Thống Giáo Dục CLB Toán M32 - Thầy Trần Xuân Thắng

const TIMO_MOCK_EXAMS = [
  {
    "id": "heat_de1",
    "title": "Đề số 1: VCK Quốc gia (2020 – 2021)",
    "titleEn": "Paper 1: National Final Heat Round (2020 – 2021)",
    "year": "2020 – 2021",
    "grade": "Khối 2 / Grade 2",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "range": [
          1,
          5
        ],
        "color": "blue"
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "range": [
          6,
          10
        ],
        "color": "emerald"
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "range": [
          11,
          15
        ],
        "color": "purple"
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "range": [
          16,
          20
        ],
        "color": "amber"
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "range": [
          21,
          25
        ],
        "color": "rose"
      }
    ],
    "questions": [
      {
        "id": 1,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, what is the English letter in the space?\nB, D, G, I, L, N, __",
        "questionVi": "Dựa vào quy luật dưới đây, chữ cái tiếng Anh thích hợp điền vào chỗ trống là chữ cái nào?\nB, D, G, I, L, N, __",
        "vocab": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống.",
        "image": null,
        "answer": "Q",
        "acceptableAnswers": [
          "Q",
          "q"
        ],
        "unit": "",
        "hint": "Quy luật dãy chữ cái theo thứ tự bảng chữ cái tiếng Anh.",
        "solution": "Chuyển đổi vị trí các chữ cái trong bảng chữ cái tiếng Anh (A=1, B=2,...):\n- B là chữ thứ 2, D là chữ thứ 4 (+2)\n- G là chữ thứ 7 (+3)\n- I là chữ thứ 9 (+2)\n- L là chữ thứ 12 (+3)\n- N là chữ thứ 14 (+2)\nQuy luật cộng xen kẽ: +2, +3, +2, +3, +2, +3.\nVị trí chữ cái tiếp theo là: 14 + 3 = 17.\nChữ cái thứ 17 trong bảng chữ cái tiếng Anh là chữ Q."
      },
      {
        "id": 2,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "23 children form a column. There are 8 children behind Alice. How many child(ren) is / are in front of her?",
        "questionVi": "Có 23 bạn nhỏ xếp thành một hàng dọc. Có 8 bạn đứng ở phía sau Alice. Hỏi có bao nhiêu bạn đứng ở phía trước Alice?",
        "vocab": "Column: Hàng dọc; Behind: Đằng sau; In front of: Đằng trước.",
        "image": null,
        "answer": "14",
        "acceptableAnswers": [
          "14",
          "14"
        ],
        "unit": "",
        "hint": "Phương pháp xác định vị trí trên hàng dọc.",
        "solution": "Hàng dọc gồm có 23 bạn nhỏ.\nSố bạn đứng đằng sau Alice là 8 bạn.\nDo đó, vị trí của Alice tính từ đầu hàng xuống là: 23 – 8 = 15.\nVì Alice đứng ở vị trí thứ 15, nên số bạn đứng ở phía trước Alice là:\n15 – 1 = 14 (bạn)\n(Hoặc tính gộp: 23 – 8 – 1 = 14 bạn)."
      },
      {
        "id": 3,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "When Edward was born, mum was 27 years old. Brother was born 1 year later. When mum is 46 years old, how old will brother be?",
        "questionVi": "Khi Edward sinh ra, mẹ 27 tuổi. Anh trai sinh sau Edward 1 năm. Khi mẹ 46 tuổi, anh trai bao nhiêu tuổi?",
        "vocab": "Born: Sinh ra; Year old: Tuổi; Later: Sau.",
        "image": null,
        "answer": "18",
        "acceptableAnswers": [
          "18",
          "18"
        ],
        "unit": "",
        "hint": "Phương pháp hiệu số tuổi không đổi theo thời gian.",
        "solution": "Khi Edward sinh ra, mẹ 27 tuổi.\nAnh trai sinh sau đó 1 năm, nên lúc anh trai sinh ra thì tuổi mẹ là:\n27 + 1 = 28 (tuổi).\nKhoảng thời gian từ lúc anh trai sinh ra đến khi mẹ 46 tuổi là:\n46 – 28 = 18 (năm).\nVậy khi mẹ 46 tuổi, tuổi của anh trai là 18 tuổi."
      },
      {
        "id": 4,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "What is the value of the number to represent '?' in the following table?",
        "questionVi": "Giá trị của số được biểu diễn bởi dấu '?' trong bảng dưới đây là bao nhiêu?",
        "vocab": "Value: Giá trị; Represent: Biểu diễn; Table: Bảng.",
        "image": "images/de1_q4_table.png",
        "answer": "56",
        "acceptableAnswers": [
          "56",
          "56"
        ],
        "unit": "",
        "hint": "Quy luật phép nhân theo hàng ngang trong bảng số.",
        "solution": "Quan sát các hàng của bảng số:\n- Hàng 1: 1 × 2 = 2 (số ở cột 3 bằng tích hai số đầu)\n- Hàng 2: 3 × 4 = 12\n- Hàng 3: 5 × 6 = 30\n- Hàng 4: 7 × 8 = ?\nDo đó, giá trị tại dấu '?' là:\n7 × 8 = 56."
      },
      {
        "id": 5,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, how many ＃ is / are there in the 6th Group?",
        "questionVi": "Dựa vào quy luật dưới đây, có bao nhiêu ký hiệu ＃ ở nhóm thứ 6?",
        "vocab": "Pattern: Quy luật; 6th group: Nhóm thứ 6.",
        "image": "images/de1_q5_grid.png",
        "answer": "33",
        "acceptableAnswers": [
          "33",
          "33"
        ],
        "unit": "",
        "hint": "Quy luật dãy số cách đều về số lượng phần tử hình học.",
        "solution": "Đếm số lượng ký hiệu ＃ trong từng nhóm:\n- Nhóm 1: Có 3 ký hiệu ＃\n- Nhóm 2: Có 9 ký hiệu ＃ (tăng 6 ký hiệu)\n- Nhóm 3: Có 15 ký hiệu ＃ (tăng 6 ký hiệu)\n- Nhóm 4: Có 21 ký hiệu ＃ (tăng 6 ký hiệu)\nDãy số lượng ＃ là dãy cách đều có khoảng cách bằng 6:\n3, 9, 15, 21, ...\nSố lượng ký hiệu ＃ ở nhóm thứ 6 là:\n3 + 6 × (6 – 1) = 3 + 30 = 33 (ký hiệu)."
      },
      {
        "id": 6,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 28 + 11 + 23 + 39 + 32 + 17.",
        "questionVi": "Tính giá trị của biểu thức: 28 + 11 + 23 + 39 + 32 + 17.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "150",
        "acceptableAnswers": [
          "150",
          "150"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp tạo số tròn chục.",
        "solution": "Nhóm các số hạng có tổng tròn chục:\n28 + 11 + 23 + 39 + 32 + 17\n= (28 + 32) + (11 + 39) + (23 + 17)\n= 60 + 50 + 40\n= (60 + 40) + 50\n= 100 + 50 = 150."
      },
      {
        "id": 7,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 6 × 23 + 6 × 38 + 6 × 56 – 6 × 18.",
        "questionVi": "Tính giá trị của biểu thức: 6 × 23 + 6 × 38 + 6 × 56 – 6 × 18.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "594",
        "acceptableAnswers": [
          "594",
          "594"
        ],
        "unit": "",
        "hint": "Phương pháp đặt thừa số chung (Tính chất phân phối).",
        "solution": "Đặt thừa số chung 6 ra ngoài dấu ngoặc:\n6 × 23 + 6 × 38 + 6 × 56 – 6 × 18\n= 6 × (23 + 38 + 56 – 18)\n= 6 × [(23 + 56) + (38 – 18)]\n= 6 × [79 + 20]\n= 6 × 99\n= 6 × (100 – 1) = 600 – 6 = 594."
      },
      {
        "id": 8,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 11 + 13 + 15 + 17 + 19 + 21 + 23 + 25.",
        "questionVi": "Tính giá trị của biểu thức: 11 + 13 + 15 + 17 + 19 + 21 + 23 + 25.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "144",
        "acceptableAnswers": [
          "144",
          "144"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp đối xứng đầu - cuối.",
        "solution": "Ghép các cặp số có tổng bằng nhau:\n11 + 13 + 15 + 17 + 19 + 21 + 23 + 25\n= (11 + 25) + (13 + 23) + (15 + 21) + (17 + 19)\n= 36 + 36 + 36 + 36\n= 36 × 4 = 144."
      },
      {
        "id": 9,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 12 ÷ 5 + 9 ÷ 5 + 17 ÷ 5 – 3 ÷ 5.",
        "questionVi": "Tính giá trị của biểu thức: 12 ÷ 5 + 9 ÷ 5 + 17 ÷ 5 – 3 ÷ 5.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "7",
        "acceptableAnswers": [
          "7",
          "7"
        ],
        "unit": "",
        "hint": "Phương pháp gom phép chia cho cùng một số chia.",
        "solution": "Các số hạng đều có chung số chia là 5:\n12 ÷ 5 + 9 ÷ 5 + 17 ÷ 5 – 3 ÷ 5\n= (12 + 9 + 17 – 3) ÷ 5\n= [(12 + 17) + (9 – 3)] ÷ 5\n= (29 + 6) ÷ 5\n= 35 ÷ 5 = 7."
      },
      {
        "id": 10,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 12 × 5 × 5 × 15 × 2.",
        "questionVi": "Tính giá trị của biểu thức: 12 × 5 × 5 × 15 × 2.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "9000",
        "acceptableAnswers": [
          "9000",
          "9000"
        ],
        "unit": "",
        "hint": "Phương pháp kết hợp nhân tạo số tròn chục, tròn trăm.",
        "solution": "Nhóm các thừa số một cách hợp lý:\n12 × 5 × 5 × 15 × 2\n= (12 × 5) × (15 × 2) × 5\n= 60 × 30 × 5\n= (6 × 3) × (10 × 10) × 5\n= 18 × 100 × 5\n= (18 × 5) × 100\n= 90 × 100 = 9000."
      },
      {
        "id": 11,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The numbers below follow the arithmetic sequence, what is the sum of the 6th number and 9th number?\n99, 92, 85, 78, 71, ...",
        "questionVi": "Các số dưới đây tuân theo quy luật dãy số cách đều, hỏi tổng của số thứ 6 và số thứ 9 là bao nhiêu?\n99, 92, 85, 78, 71, ...",
        "vocab": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 6th number: Số thứ 6; 9th number: Số thứ 9.",
        "image": null,
        "answer": "107",
        "acceptableAnswers": [
          "107",
          "107"
        ],
        "unit": "",
        "hint": "Quy luật dãy số cách đều giảm dần.",
        "solution": "Dãy số đã cho giảm dần 7 đơn vị ở mỗi bước: 99 – 7 = 92; 92 – 7 = 85; ...\nViết tiếp các số hạng của dãy:\n- Số thứ 1: 99\n- Số thứ 2: 92\n- Số thứ 3: 85\n- Số thứ 4: 78\n- Số thứ 5: 71\n- Số thứ 6: 71 – 7 = 64\n- Số thứ 7: 64 – 7 = 57\n- Số thứ 8: 57 – 7 = 50\n- Số thứ 9: 50 – 7 = 43\nTổng của số thứ 6 và số thứ 9 là:\n64 + 43 = 107."
      },
      {
        "id": 12,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Fill the lines with '+' and '–' to make the equation below correct.\n23 __ 7 __ 11 __ 3 = 22",
        "questionVi": "Điền các dấu '+' và '–' vào chỗ trống để được phép tính đúng:\n23 __ 7 __ 11 __ 3 = 22",
        "vocab": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng.",
        "image": null,
        "answer": "23 + 7 – 11 + 3 = 22",
        "acceptableAnswers": [
          "23 + 7 – 11 + 3 = 22",
          "+, -, +",
          "+-+",
          "+ - +",
          "+, –, +",
          "23 + 7 - 11 + 3 = 22"
        ],
        "unit": "",
        "hint": "Phương pháp thử chọn và cân bằng giá trị đại số.",
        "solution": "Ta nhận thấy 23 gần với kết quả 22:\nThử tính: 23 + 7 = 30.\n30 – 11 = 19.\n19 + 3 = 22.\nVậy phép tính hoàn chỉnh chính xác là:\n23 + 7 – 11 + 3 = 22."
      },
      {
        "id": 13,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Determine the result of 7 × 8 + 8 × 9 + 9 × 10 – 1 × 1 – 2 × 2 – 3 × 3 is odd or even.",
        "questionVi": "Xác định kết quả của biểu thức sau là số chẵn hay số lẻ:\n7 × 8 + 8 × 9 + 9 × 10 – 1 × 1 – 2 × 2 – 3 × 3",
        "vocab": "Determine: Xác định; Result: Kết quả; Odd: Lẻ; Even: Chẵn.",
        "image": null,
        "answer": "Even (Chẵn)",
        "acceptableAnswers": [
          "Even (Chẵn)",
          "Even",
          "Chẵn",
          "chẵn",
          "even",
          "Chan",
          "chan"
        ],
        "unit": "",
        "hint": "Phương pháp xét tính chẵn lẻ của tích và tổng.",
        "solution": "Xét tính chẵn lẻ của từng số hạng:\n- 7 × 8: Tích chứa thừa số chẵn 8 nên là số CHẴN.\n- 8 × 9: Tích chứa thừa số chẵn 8 nên là số CHẴN.\n- 9 × 10: Tích chứa thừa số chẵn 10 nên là số CHẴN.\nDo đó: 7 × 8 + 8 × 9 + 9 × 10 = CHẴN + CHẴN + CHẴN = số CHẴN.\nTiếp theo:\n- 1 × 1 = 1 (số LẺ)\n- 2 × 2 = 4 (số CHẴN)\n- 3 × 3 = 9 (số LẺ)\nTổng phần trừ: 1 × 1 + 2 × 2 + 3 × 3 = LẺ + CHẴN + LẺ = số CHẴN.\nHiệu của hai số chẵn: CHẴN – CHẴN = số CHẴN (Even)."
      },
      {
        "id": 14,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the smallest 3-digit number that can be divisible by 7 and 4?",
        "questionVi": "Số nhỏ nhất có 3 chữ số chia hết cho cả 7 và 4 là số nào?",
        "vocab": "Smallest 3-digit number: Số có 3 chữ số nhỏ nhất; Divisible by: Chia hết cho.",
        "image": null,
        "answer": "112",
        "acceptableAnswers": [
          "112",
          "112"
        ],
        "unit": "",
        "hint": "Bội chung nhỏ nhất của hai số nguyên tố cùng nhau.",
        "solution": "Vì 7 và 4 không có ước chung nào khác 1 (nguyên tố cùng nhau), nên số chia hết cho cả 7 và 4 sẽ chia hết cho:\n7 × 4 = 28.\nLiệt kê các bội số của 28:\n- 28 × 1 = 28\n- 28 × 2 = 56\n- 28 × 3 = 84 (số lớn nhất có 2 chữ số)\n- 28 × 4 = 112 (số nhỏ nhất có 3 chữ số).\nVậy số nhỏ nhất có 3 chữ số thỏa mãn là 112."
      },
      {
        "id": 15,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If A, B, C are 1-digit numbers, C ≠ 0 and BA + CB = 162, find the value of B + C.",
        "questionVi": "Nếu A, B, C là các chữ số có 1 chữ số, C ≠ 0 và BA + CB = 162, hãy tìm giá trị của B + C.",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15",
          "15"
        ],
        "unit": "",
        "hint": "Phân tích cấu tạo số thập phân.",
        "solution": "Phân tích cấu tạo số:\nBA = 10 × B + A\nCB = 10 × C + B\nDo đó:\nBA + CB = (10 × B + A) + (10 × C + B) = 10 × (B + C) + (A + B) = 162.\nXét hàng đơn vị: A + B có tận cùng là 2. Vì A, B là chữ số nên A + B = 2 hoặc A + B = 12.\n- Trường hợp 1: Nếu A + B = 2, thì 10 × (B + C) + 2 = 162 ⇒ 10 × (B + C) = 160 ⇒ B + C = 16.\nNhưng vì A + B = 2 nên B ≤ 2 ⇒ C ≥ 16 – 2 = 14 (loại, vì C là chữ số từ 1 đến 9).\n- Trường hợp 2: Nếu A + B = 12, thì 10 × (B + C) + 12 = 162 ⇒ 10 × (B + C) = 150 ⇒ B + C = 15 (thỏa mãn, ví dụ B = 7, C = 8, A = 5: 75 + 87 = 162).\nVậy giá trị của B + C là 15."
      },
      {
        "id": 16,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many line segments are there in the figure below?",
        "questionVi": "Có bao nhiêu đoạn thẳng trong hình dưới đây?",
        "vocab": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
        "image": "images/de1_q16_segments.png",
        "answer": "18",
        "acceptableAnswers": [
          "18",
          "18"
        ],
        "unit": "",
        "hint": "Phương pháp đếm đoạn thẳng trên từng đường thẳng.",
        "solution": "Quan sát hình vẽ gồm một đường thẳng nằm ngang và 4 đường xiên tạo thành 2 tam giác:\n1) Trên đường thẳng nằm ngang có 4 điểm giao nhau: số đoạn thẳng tạo thành là:\n(4 × 3) ÷ 2 = 6 (đoạn thẳng).\n2) Trên mỗi cạnh xiên (gồm 4 cạnh xiên ngoài và trong) đều có 3 điểm:\nSố đoạn thẳng trên mỗi cạnh xiên là: (3 × 2) ÷ 2 = 3 (đoạn thẳng).\nCó 4 cạnh xiên như vậy nên số đoạn thẳng là: 4 × 3 = 12 (đoạn thẳng).\nTổng số đoạn thẳng có trong hình vẽ là:\n6 + 12 = 18 (đoạn thẳng)."
      },
      {
        "id": 17,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A prism has 27 edges, how many faces does this prism have?",
        "questionVi": "Một hình lăng trụ có 27 cạnh. Hỏi hình lăng trụ đó có bao nhiêu mặt?",
        "vocab": "Prism: Hình lăng trụ; Edge: Cạnh; Face: Mặt.",
        "image": null,
        "answer": "11",
        "acceptableAnswers": [
          "11",
          "11"
        ],
        "unit": "",
        "hint": "Quy tắc cấu tạo số cạnh và số mặt của hình lăng trụ n-giác.",
        "solution": "Một hình lăng trụ n-giác (đáy là hình có n cạnh) có đặc điểm:\n- Số cạnh đáy = 2 × n (hai đáy trên và dưới)\n- Số cạnh bên = n\nTổng số cạnh của hình lăng trụ là: 3 × n.\nTheo đề bài: 3 × n = 27 ⇒ n = 27 ÷ 3 = 9 (đáy là hình cửu giác - 9 cạnh).\nSố mặt của hình lăng trụ gồm:\n- n mặt bên = 9 mặt\n- 2 mặt đáy = 2 mặt\nTổng số mặt của hình lăng trụ là: 9 + 2 = 11 (mặt)."
      },
      {
        "id": 18,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many square(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "vocab": "Square: Hình vuông; Figure: Hình vẽ.",
        "image": "images/de1_q18_squares.png",
        "answer": "16",
        "acceptableAnswers": [
          "16",
          "16"
        ],
        "unit": "",
        "hint": "Phương pháp đếm hình vuông theo kích thước phân tầng (1×1 và 2×2).",
        "solution": "Phân loại hình vuông theo kích thước:\n1) Hình vuông kích thước 1×1 (ô vuông đơn vị):\n- Hàng trên: 3 ô\n- Hàng giữa: 5 ô\n- Hàng dưới: 4 ô\nTổng số ô vuông đơn vị: 3 + 5 + 4 = 12 (hình).\n2) Hình vuông kích thước 2×2:\nĐếm các khối ghép 2×2 liền kề nhau: có 4 hình vuông 2×2.\nTổng số hình vuông trong hình là:\n12 + 4 = 16 (hình vuông)."
      },
      {
        "id": 19,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At least how many squares can be seen if viewing the figure below from top?",
        "questionVi": "Nhìn hình dưới đây từ phía trên xuống (hình chiếu bằng), có thể thấy ít nhất bao nhiêu hình vuông?",
        "vocab": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From top: Từ phía trên.",
        "image": "images/de1_q19_cubes.png",
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp dựng mặt bằng hình chiếu từ trên xuống (Top View).",
        "solution": "Khi nhìn một khối lập phương xếp tầng từ phía trên thẳng xuống:\nMỗi cột khối (dù có 1 tầng hay nhiều tầng xếp chồng lên nhau) sẽ hiển thị đúng 1 hình vuông trên mặt phẳng đáy.\nĐếm các vị trí chân cột của mô hình:\n- Hàng 1 (phía sau): có 2 vị trí cột.\n- Hàng 2 (ở giữa): có 4 vị trí cột.\n- Hàng 3 (phía trước): có 3 vị trí cột.\nTổng số vị trí cột nhìn thấy được từ phía trên là:\n2 + 4 + 3 = 9 (hình vuông)."
      },
      {
        "id": 20,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At most how many different triangle(s) can be formed by having 4 straight lines cut a circle?",
        "questionVi": "Vẽ 4 đường thẳng cắt một hình tròn thì có thể tạo ra nhiều nhất bao nhiêu hình tam giác khác nhau?",
        "vocab": "At most: Nhiều nhất; Different triangles: Các hình tam giác khác nhau; Straight lines: Đường thẳng; Cut: Cắt; Circle: Hình tròn.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Tổ hợp số giao điểm và tam giác tạo bởi các đường thẳng.",
        "solution": "Một hình tam giác được tạo thành từ giao điểm của 3 đường thẳng không song song và không đồng quy.\nVới 4 đường thẳng cắt nhau trong điều kiện tối ưu (các giao điểm đều nằm bên trong hình tròn, không có 2 đường nào song song và không có 3 đường nào cùng đi qua 1 điểm):\nMỗi cách chọn ra 3 đường thẳng từ 4 đường thẳng sẽ tạo thành 1 hình tam giác.\nSố tam giác tối đa được tạo ra là:\nCác bộ 3 đường thẳng gồm: (1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4).\nCó tất cả 4 hình tam giác."
      },
      {
        "id": 21,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit number(s) having the unit digit that is larger than the hundreds digit is / are there?",
        "questionVi": "Có bao nhiêu số có 3 chữ số mà chữ số hàng đơn vị lớn hơn chữ số hàng trăm?",
        "vocab": "3-digit numbers: Số có 3 chữ số; Unit digit: Chữ số hàng đơn vị; Larger than: Lớn hơn; Hundreds digit: Chữ số hàng trăm.",
        "image": null,
        "answer": "360",
        "acceptableAnswers": [
          "360",
          "360"
        ],
        "unit": "",
        "hint": "Quy tắc đếm tổ hợp phân loại theo chữ số hàng đơn vị.",
        "solution": "Gọi số có 3 chữ số là abc (a ≠ 0, 1 ≤ a ≤ 9; 0 ≤ b, c ≤ 9).\nĐiều kiện bài toán: c > a (chữ số hàng đơn vị lớn hơn chữ số hàng trăm):\n- Nếu c = 9: a có thể nhận các giá trị từ 1 đến 8 (8 cách chọn)\n- Nếu c = 8: a có thể nhận các giá trị từ 1 đến 7 (7 cách chọn)\n- Nếu c = 7: a có thể nhận các giá trị từ 1 đến 6 (6 cách chọn)\n- ...\n- Nếu c = 2: a chỉ có thể nhận giá trị 1 (1 cách chọn)\n- Nếu c ≤ 1: không có giá trị nào của a thỏa mãn c > a ≥ 1.\nTổng số cách chọn cặp (a, c) là:\n8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36 (cách chọn).\nVới mỗi cặp (a, c), chữ số hàng chục b có thể nhận bất kỳ giá trị nào từ 0 đến 9 (10 cách chọn).\nVậy số lượng các số thỏa mãn yêu cầu là:\n36 × 10 = 360 (số)."
      },
      {
        "id": 22,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "According to the following answers, how many 2-digit numbers are there?\n2 × 4, 42 ÷ 7, 36 ÷ 3, 7 × 2, 9 × 9, 39 ÷ 3, 72 ÷ 9",
        "questionVi": "Trong các kết quả của các phép tính dưới đây, có bao nhiêu số có 2 chữ số?\n2 × 4, 42 ÷ 7, 36 ÷ 3, 7 × 2, 9 × 9, 39 ÷ 3, 72 ÷ 9",
        "vocab": "Answers: Kết quả phép tính; 2-digit numbers: Số có 2 chữ số.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Tính toán trực tiếp và phân loại số theo số lượng chữ số.",
        "solution": "Tính giá trị từng phép tính:\n- 2 × 4 = 8 (số có 1 chữ số)\n- 42 ÷ 7 = 6 (số có 1 chữ số)\n- 36 ÷ 3 = 12 (số có 2 chữ số)\n- 7 × 2 = 14 (số có 2 chữ số)\n- 9 × 9 = 81 (số có 2 chữ số)\n- 39 ÷ 3 = 13 (số có 2 chữ số)\n- 72 ÷ 9 = 8 (số có 1 chữ số)\nCác số có 2 chữ số là: 12, 14, 81, 13.\nVậy có tất cả 4 số có 2 chữ số."
      },
      {
        "id": 23,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "What is the greatest 4-digit odd number by using 0, 2, 4, 6 and 9? (Each digit can only be used once).",
        "questionVi": "Số lẻ lớn nhất có 4 chữ số được lập từ các chữ số 0, 2, 4, 6 và 9 là số nào? (Mỗi chữ số chỉ được dùng một lần).",
        "vocab": "The greatest 4-digit odd number: Số lẻ lớn nhất có 4 chữ số; Each digit can only be used once: Mỗi chữ số chỉ được dùng một lần.",
        "image": null,
        "answer": "6429",
        "acceptableAnswers": [
          "6429",
          "6429"
        ],
        "unit": "",
        "hint": "Phương pháp lập số lớn nhất kết hợp ràng buộc tính chẵn lẻ.",
        "solution": "Để lập một số lẻ, chữ số hàng đơn vị bắt buộc phải là chữ số lẻ.\nTrong các chữ số {0, 2, 4, 6, 9}, chỉ có đúng một chữ số lẻ là chữ số 9.\nDo đó, chữ số hàng đơn vị bắt buộc phải là 9.\nĐể số lập được là lớn nhất, ta chọn 3 chữ số lớn nhất còn lại {6, 4, 2} sắp xếp theo thứ tự giảm dần cho các hàng:\n- Chữ số hàng nghìn là 6\n- Chữ số hàng trăm là 4\n- Chữ số hàng chục là 2\n- Chữ số hàng đơn vị là 9\nVậy số lẻ lớn nhất có 4 chữ số lập được là: 6429."
      },
      {
        "id": 24,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are 4 different flavors of ice-cream. Now mixing 3 types to make a 3-ball ice-cream. How many different type(s) of ice-cream is / are there? (Strawberry - vanilla - chocolate will be counted the same as strawberry - chocolate - vanilla).",
        "questionVi": "Có 4 vị kem khác nhau. Chọn trộn 3 vị để làm một ly kem 3 viên. Hỏi có bao nhiêu loại kem khác nhau có thể tạo thành? (Biết thứ tự các vị không quan trọng).",
        "vocab": "Different flavors: Các vị khác nhau; Mixing: Kết hợp; Different types of ice-creams: Các loại kem khác nhau.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Quy tắc chọn tổ hợp không tính thứ tự.",
        "solution": "Gọi 4 vị kem khác nhau lần lượt là A, B, C, D.\nViệc chọn 3 vị kem từ 4 vị kem tương đương với việc bỏ lại 1 vị kem:\n- Bỏ vị D: chọn (A, B, C)\n- Bỏ vị C: chọn (A, B, D)\n- Bỏ vị B: chọn (A, C, D)\n- Bỏ vị A: chọn (B, C, D)\nVậy có tất cả 4 loại ly kem khác nhau."
      },
      {
        "id": 25,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 4 digits, without repetition, from 0, 1, 4, 5, 6 and 7 to form two 2-digit even numbers. What is the minimum value of the difference?",
        "questionVi": "Chọn 4 chữ số khác nhau từ 0, 1, 4, 5, 6 và 7 để lập thành hai số chẵn có 2 chữ số. Hỏi hiệu nhỏ nhất giữa hai số đó bằng bao nhiêu?",
        "vocab": "Digits: Chữ số; Without repetition: Không lặp lại; 2-digit even number: Số chẵn có 2 chữ số; Minimum value of the difference: Hiệu nhỏ nhất.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Phương pháp tối thiểu hóa hiệu hai số có điều kiện chẵn lẻ.",
        "solution": "Để hiệu giữa hai số là nhỏ nhất:\n1) Chữ số hàng chục của hai số nên hơn kém nhau 1 đơn vị (khoảng cách nhỏ nhất giữa hai chữ số hàng chục).\n2) Để số là số chẵn, chữ số hàng đơn vị phải được chọn từ tập hợp các số chẵn {0, 4, 6}.\n3) Hiệu hai số chẵn luôn luôn là một số chẵn (≥ 2).\nXét các trường hợp hàng chục hơn nhau 1 đơn vị:\n- Chọn hàng chục là 5 và 4: để hiệu nhỏ nhất, ta lập số lớn có hàng đơn vị nhỏ nhất (0) và số bé có hàng đơn vị lớn nhất (6).\nHai số lập được là 50 và 46 (đều là số chẵn, sử dụng 4 chữ số {0, 4, 5, 6} khác nhau).\nHiệu: 50 – 46 = 4.\n- Liệu hiệu có thể bằng 2 không? Để hiệu bằng 2 khi hàng chục hơn kém 1 đơn vị thì hiệu hàng đơn vị phải bù 8 (ví dụ đuôi 0 và đuôi 8), nhưng trong các chữ số đã cho không có chữ số 8.\nVậy hiệu nhỏ nhất có thể đạt được là 4."
      }
    ]
  },
  {
    "id": "heat_de2",
    "title": "Đề số 2: VCK Quốc gia (2019 – 2020)",
    "titleEn": "Paper 2: National Final Heat Round (2019 – 2020)",
    "year": "2019 – 2020",
    "grade": "Khối 2 / Grade 2",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "range": [
          1,
          5
        ],
        "color": "blue"
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "range": [
          6,
          10
        ],
        "color": "emerald"
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "range": [
          11,
          15
        ],
        "color": "purple"
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "range": [
          16,
          20
        ],
        "color": "amber"
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "range": [
          21,
          25
        ],
        "color": "rose"
      }
    ],
    "questions": [
      {
        "id": 26,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Alice wrote a 2-digit number on a piece of paper and asked Bobby to guess it.\nBobby asked: \"Is the number 68?\" Alice replied: \"One of the digits is correct, the position of that digit is wrong.\"\nBobby asked again: \"Is the number 17?\" Alice replied: \"One of the digits is correct, the position of that digit is wrong.\"\nBobby asked again: \"Is the number 79?\" Alice said: \"One of the digits is correct, the position of that digit is correct.\"\nWhat is the number written by Alice?",
        "questionVi": "Alice viết một số có hai chữ số ra giấy và đố Bobby đoán số đó.\nBobby đoán: \"Có phải số 68 không?\" Alice đáp: \"Có 1 chữ số đúng, nhưng vị trí chữ số đó sai.\"\nBobby đoán lại: \"Có phải số 17 không?\" Alice đáp: \"Có 1 chữ số đúng, nhưng vị trí chữ số đó sai.\"\nBobby lại đoán: \"Có phải số 79 không?\" Alice nói: \"Có 1 chữ số đúng và vị trí chữ số đó cũng đúng.\"\nHỏi Alice đã viết số nào?",
        "vocab": "2-digit number: Số có 2 chữ số; Digit: Chữ số; Number: Số; The position of that digit: Vị trí của chữ số đó; Correct: Đúng; Wrong: Sai.",
        "image": null,
        "answer": "76",
        "acceptableAnswers": [
          "76",
          "76"
        ],
        "unit": "",
        "hint": "Phương pháp suy luận loại trừ logic qua các lần đoán.",
        "solution": "Phân tích các lần đoán của Bobby:\n1) Xét hai lượt đoán 17 và 79: Cả hai lượt đoán đều có chung chữ số 7.\n- Ở số 17, chữ số 7 ở hàng đơn vị nhưng bị sai vị trí.\n- Ở số 79, chữ số 7 ở hàng chục và đúng vị trí.\nDo đó, chữ số 7 là chữ số đúng và nằm ở hàng chục (số có dạng 7_).\n2) Vì chữ số đúng ở lượt đoán 79 là 7, nên chữ số 9 là chữ số sai.\n3) Xét lượt đoán 68: Có 1 chữ số đúng nhưng sai vị trí.\n- Chữ số hàng chục của số cần tìm là 7, nên chữ số đúng trong {6, 8} phải là chữ số hàng đơn vị.\n- Nếu chữ số đúng là 8 thì nó đang ở hàng đơn vị (đúng vị trí), mâu thuẫn với nhận xét \"sai vị trí\".\n- Do đó, chữ số đúng phải là chữ số 6 (ở hàng chục trong số 68, chuyển sang hàng đơn vị sẽ đúng).\nVậy số Alice đã viết là 76."
      },
      {
        "id": 27,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "When Bruce was born, mum was 29 years old. When Bruce will be 28 years old, how old will mum be?",
        "questionVi": "Khi Bruce sinh ra, mẹ 29 tuổi. Khi Bruce 28 tuổi, hỏi mẹ bao nhiêu tuổi?",
        "vocab": "Born: Sinh ra; Years old: Tuổi.",
        "image": null,
        "answer": "57",
        "acceptableAnswers": [
          "57",
          "57"
        ],
        "unit": "",
        "hint": "Hiệu số tuổi không đổi theo thời gian.",
        "solution": "Khoảng thời gian từ lúc Bruce sinh ra đến khi Bruce 28 tuổi là 28 năm.\nVì mỗi năm mỗi người đều tăng thêm 1 tuổi, nên sau 28 năm tuổi của mẹ cũng tăng thêm 28 tuổi.\nSố tuổi của mẹ khi đó là:\n29 + 28 = 57 (tuổi)."
      },
      {
        "id": 28,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, what is the number in the blank?\n12, 15, 21, 30, 42, 57, __",
        "questionVi": "Dựa vào quy luật dưới đây, số thích hợp điền vào chỗ trống là số nào?\n12, 15, 21, 30, 42, 57, __",
        "vocab": "Pattern: Quy luật; Number: Số; Blank: Chỗ trống.",
        "image": null,
        "answer": "75",
        "acceptableAnswers": [
          "75",
          "75"
        ],
        "unit": "",
        "hint": "Quy luật hiệu giữa hai số hạng liên tiếp tăng dần (Dãy số cấp hai).",
        "solution": "Xét hiệu giữa hai số hạng liên tiếp trong dãy:\n- 15 – 12 = 3\n- 21 – 15 = 6\n- 30 – 21 = 9\n- 42 – 30 = 12\n- 57 – 42 = 15\nDãy các hiệu là: 3, 6, 9, 12, 15 (các bội số tăng dần của 3).\nDo đó, hiệu tiếp theo giữa số cần tìm và 57 là 18.\nSố cần điền vào chỗ trống là:\n57 + 18 = 75."
      },
      {
        "id": 29,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, what is the English letter in the space?\nP, M, J, G, __",
        "questionVi": "Dựa vào quy luật dưới đây, chữ cái tiếng Anh thích hợp điền vào chỗ trống là chữ cái nào?\nP, M, J, G, __",
        "vocab": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống.",
        "image": null,
        "answer": "D",
        "acceptableAnswers": [
          "D",
          "d"
        ],
        "unit": "",
        "hint": "Quy luật lùi chữ cái trong bảng chữ cái tiếng Anh.",
        "solution": "Xác định số thứ tự của các chữ cái trong bảng chữ cái tiếng Anh:\n- P là chữ thứ 16\n- M là chữ thứ 13 (16 – 3 = 13)\n- J là chữ thứ 10 (13 – 3 = 10)\n- G là chữ thứ 7 (10 – 3 = 7)\nQuy luật: Mỗi chữ cái đứng sau lùi 3 vị trí so với chữ cái đứng trước nó.\nVị trí của chữ cái tiếp theo là:\n7 – 3 = 4.\nChữ cái thứ 4 trong bảng chữ cái tiếng Anh là chữ D."
      },
      {
        "id": 30,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, how many ※ is / are there in the 7th Group?",
        "questionVi": "Dựa vào quy luật dưới đây, có bao nhiêu hình ※ ở nhóm thứ 7?",
        "vocab": "Pattern: Quy luật; 7th Group: Nhóm thứ 7.",
        "image": "images/de2_q5_pattern.png",
        "answer": "49",
        "acceptableAnswers": [
          "49",
          "49"
        ],
        "unit": "",
        "hint": "Quy luật hình vuông số học (Số chính phương n × n).",
        "solution": "Đếm số lượng ký hiệu ※ trong các nhóm đầu tiên:\n- Nhóm 1: có 1 hàng × 1 cột = 1 hình ※ (1 × 1 = 1)\n- Nhóm 2: có 2 hàng × 2 cột = 4 hình ※ (2 × 2 = 4)\n- Nhóm 3: có 3 hàng × 3 cột = 9 hình ※ (3 × 3 = 9)\nQuy luật: Số lượng hình ※ ở nhóm thứ n bằng n × n.\nDo đó, số lượng hình ※ ở nhóm thứ 7 là:\n7 × 7 = 49 (hình)."
      },
      {
        "id": 31,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 37 + 13 – 68 – 13 + 51.",
        "questionVi": "Tính giá trị của biểu thức: 37 + 13 – 68 – 13 + 51.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "20",
        "acceptableAnswers": [
          "20",
          "20"
        ],
        "unit": "",
        "hint": "Phương pháp triệt tiêu số hạng đối nhau và kết hợp phép tính.",
        "solution": "Nhóm các số hạng một cách hợp lý:\n37 + 13 – 68 – 13 + 51\n= (37 + 51) + (13 – 13) – 68\n= 88 + 0 – 68\n= 88 – 68 = 20."
      },
      {
        "id": 32,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 24 + 62 + 16 + 29 + 8.",
        "questionVi": "Tính giá trị của biểu thức: 24 + 62 + 16 + 29 + 8.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "139",
        "acceptableAnswers": [
          "139",
          "139"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp tạo số tròn chục.",
        "solution": "Ghép các số hạng có tổng tròn chục:\n24 + 62 + 16 + 29 + 8\n= (24 + 16) + (62 + 8) + 29\n= 40 + 70 + 29\n= 110 + 29 = 139."
      },
      {
        "id": 33,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1 × 113 + 2 × 113 + 3 × 113 + 4 × 113.",
        "questionVi": "Tính giá trị của biểu thức: 1 × 113 + 2 × 113 + 3 × 113 + 4 × 113.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1130",
        "acceptableAnswers": [
          "1130",
          "1130"
        ],
        "unit": "",
        "hint": "Phương pháp đặt thừa số chung.",
        "solution": "Đặt thừa số chung 113 ra ngoài dấu ngoặc:\n1 × 113 + 2 × 113 + 3 × 113 + 4 × 113\n= (1 + 2 + 3 + 4) × 113\n= 10 × 113\n= 1130."
      },
      {
        "id": 34,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "If A and B are both 1-digit numbers, find the value of B.\nAA + AB = 72",
        "questionVi": "Nếu A và B đều là các chữ số có 1 chữ số, hãy tìm giá trị của B:\nAA + AB = 72",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Suy luận chữ số theo phép cộng cột dọc.",
        "solution": "Xét phép cộng:\nAA\n+ AB\n-----\n72\nHàng chục: A + A (có thể cộng thêm nhớ 1) bằng 7.\nVì 7 là số lẻ nên chắc chắn có nhớ 1 từ hàng đơn vị sang: A + A + 1 = 7 ⇒ 2 × A = 6 ⇒ A = 3.\nThay A = 3 vào phép tính:\n33 + 3B = 72\n3B = 72 – 33 = 39\nDo đó, chữ số B = 9."
      },
      {
        "id": 35,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "What is the number in the blank if the equation below is correct?\n__ ÷ 2 + 9 = 19",
        "questionVi": "Số nào thích hợp điền vào chỗ trống để phép tính dưới đây đúng?\n__ ÷ 2 + 9 = 19",
        "vocab": "Number: Số; Blank: Chỗ trống; Equation: Phép tính; Correct: Đúng.",
        "image": null,
        "answer": "20",
        "acceptableAnswers": [
          "20",
          "20"
        ],
        "unit": "",
        "hint": "Phương pháp tính ngược từ cuối (Working backwards).",
        "solution": "Thực hiện các phép tính ngược từ kết quả:\n__ ÷ 2 + 9 = 19\n__ ÷ 2 = 19 – 9\n__ ÷ 2 = 10\n__ = 10 × 2\n__ = 20.\nVậy số cần điền là 20."
      },
      {
        "id": 36,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "How many 2-digit even number(s) that is / are multiples of 3 is / are there?",
        "questionVi": "Có bao nhiêu số chẵn có 2 chữ số là bội của 3?",
        "vocab": "2-digit even number: Số chẵn có 2 chữ số; Multiple of 3: Bội của 3.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15",
          "15"
        ],
        "unit": "",
        "hint": "Đếm số hạng của dãy số cách đều là bội chung của 2 và 3.",
        "solution": "Một số vừa là số chẵn (chia hết cho 2) vừa là bội của 3 thì chia hết cho:\n2 × 3 = 6 (bội của 6).\nDãy các số chẵn có 2 chữ số là bội của 3 gồm:\n12, 18, 24, 30, ..., 96.\nĐây là dãy số cách đều có khoảng cách là 6.\nSố lượng các số thỏa mãn là:\n(96 – 12) ÷ 6 + 1 = 84 ÷ 6 + 1 = 14 + 1 = 15 (số)."
      },
      {
        "id": 37,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Fill the lines with '+', '–' and '×' to make the equation below correct.\n15 __ 8 __ 6 __ 1 = 16",
        "questionVi": "Điền các dấu '+', '–' và '×' vào chỗ trống để được phép tính đúng:\n15 __ 8 __ 6 __ 1 = 16",
        "vocab": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng.",
        "image": null,
        "answer": "15 + 8 – 6 – 1 = 16",
        "acceptableAnswers": [
          "15 + 8 – 6 – 1 = 16",
          "+, -, -",
          "+--",
          "+ - -",
          "+, –, –",
          "15 + 8 - 6 - 1 = 16"
        ],
        "unit": "",
        "hint": "Phương pháp thử chọn và cân bằng giá trị đại số.",
        "solution": "Quan sát biểu thức và kết quả 16:\nThử phép cộng: 15 + 8 = 23.\n23 – 6 = 17.\n17 – 1 = 16.\nVậy phép tính hoàn chỉnh chính xác là:\n15 + 8 – 6 – 1 = 16."
      },
      {
        "id": 38,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Fill the lines with '+', '–' and '×' to make the equation below correct.\n6 __ 4 __ 3 __ 2 = 29",
        "questionVi": "Điền các dấu '+', '–' và '×' vào chỗ trống để được phép tính đúng:\n6 __ 4 __ 3 __ 2 = 29",
        "vocab": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng.",
        "image": null,
        "answer": "6 × 4 + 3 + 2 = 29",
        "acceptableAnswers": [
          "6 × 4 + 3 + 2 = 29",
          "*, +, +",
          "*++",
          "* + +",
          "×, +, +",
          "6 * 4 + 3 + 2 = 29"
        ],
        "unit": "",
        "hint": "Phương pháp kết hợp phép nhân và phép cộng.",
        "solution": "Nhận thấy kết quả 29 gần với tích của 6 và 4:\n6 × 4 = 24.\nĐể đạt được 29 từ 24, cần cộng thêm: 29 – 24 = 5.\nVới hai số 3 và 2, ta có: 3 + 2 = 5.\nDo đó phép tính hoàn chỉnh là:\n6 × 4 + 3 + 2 = 29."
      },
      {
        "id": 39,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If A is an odd number, the result of A × (A + 1) × (A + 2) is odd or even?",
        "questionVi": "Nếu A là một số lẻ thì kết quả của biểu thức A × (A + 1) × (A + 2) là số chẵn hay số lẻ?",
        "vocab": "Odd number: Số lẻ; Result: Kết quả; Even: Chẵn.",
        "image": null,
        "answer": "Even (Chẵn)",
        "acceptableAnswers": [
          "Even (Chẵn)",
          "Even",
          "Chẵn",
          "chẵn",
          "even",
          "Chan",
          "chan"
        ],
        "unit": "",
        "hint": "Tính chất chẵn lẻ của các số tự nhiên liên tiếp.",
        "solution": "Vì A là một số lẻ, nên số liền sau nó là (A + 1) chắc chắn là một số CHẴN.\nTrong tích ba số: A × (A + 1) × (A + 2), có chứa thừa số (A + 1) là số chẵn.\nTích của bất kỳ số tự nhiên nào với một số chẵn đều cho kết quả là một số CHẴN.\nVậy kết quả của biểu thức là số CHẴN (Even)."
      },
      {
        "id": 40,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If A and B are both 1-digit numbers and C ≠ 0, find the value of A + B.\nBA + AB = C87",
        "questionVi": "Nếu A và B đều là các chữ số có 1 chữ số và C ≠ 0, hãy tìm giá trị của A + B:\nBA + AB = C87",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "image": null,
        "answer": "17",
        "acceptableAnswers": [
          "17",
          "17"
        ],
        "unit": "",
        "hint": "Phân tích cấu tạo số thập phân và chặn miền giá trị chữ số.",
        "solution": "Phân tích cấu tạo số của vế trái:\nBA + AB = (10 × B + A) + (10 × A + B) = 11 × (A + B).\nVì BA và AB đều là số có 2 chữ số nên BA < 100 và AB < 100.\nTổng của chúng: BA + AB < 200.\nSố C87 ở vế phải có 3 chữ số và nhỏ hơn 200, do đó chữ số hàng trăm bắt buộc là C = 1.\nKhi đó: 11 × (A + B) = 187.\nA + B = 187 ÷ 11 = 17.\nVậy giá trị của A + B là 17."
      },
      {
        "id": 41,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "According to the pattern below, what is the figure in the space (\"_\")?\n●, ▲, ●, ■, ●, ▲, ●, _",
        "questionVi": "Dựa vào quy luật dưới đây, hình thích hợp điền vào chỗ trống (\"_\") là hình nào?\n●, ▲, ●, ■, ●, ▲, ●, _",
        "vocab": "Pattern: Quy luật; Figure: Hình vẽ; Space: Chỗ trống.",
        "image": null,
        "answer": "Hình vuông đen (■)",
        "acceptableAnswers": [
          "Hình vuông đen (■)",
          "Hình vuông đen",
          "■",
          "hình vuông đen",
          "hinh vuong den"
        ],
        "unit": "",
        "hint": "Quy luật chu kỳ lặp lại xen kẽ các hình hình học.",
        "solution": "Quan sát chu kỳ xuất hiện của các hình trong dãy:\n- Vị trí lẻ (1, 3, 5, 7, ...): đều là hình tròn đen (●).\n- Vị trí chẵn (2, 4, 6, 8, ...):\n* Vị trí 2: hình tam giác đen (▲)\n* Vị trí 4: hình vuông đen (■)\n* Vị trí 6: hình tam giác đen (▲)\n* Vị trí 8: hình vuông đen (■)\nChỗ trống cần điền ở vị trí thứ 8, nên hình thích hợp là hình vuông đen (■)."
      },
      {
        "id": 42,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many square(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "vocab": "Square: Hình vuông; Figure: Hình vẽ.",
        "image": "images/de2_q17_squares.png",
        "answer": "15",
        "acceptableAnswers": [
          "15",
          "15"
        ],
        "unit": "",
        "hint": "Phương pháp đếm phân loại hình vuông theo kích cỡ (1×1 và 2×2).",
        "solution": "Đếm các hình vuông theo từng kích thước:\n1) Hình vuông kích thước 1×1 (ô vuông đơn vị):\nĐếm từng hàng: có tổng cộng 13 ô vuông đơn vị 1×1.\n2) Hình vuông kích thước 2×2 (ghép từ 4 ô vuông đơn vị):\nCó 2 hình vuông kích thước 2×2 ở phần giữa liên kết.\nTổng số hình vuông trong hình là:\n13 + 2 = 15 (hình vuông)."
      },
      {
        "id": 43,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The lengths of two sides for a triangle are 6cm and 10cm respectively and all lengths are integers. Find the maximum length of the remaining side.",
        "questionVi": "Độ dài hai cạnh của một hình tam giác lần lượt là 6cm và 10cm, và độ dài các cạnh đều là các số nguyên. Hỏi độ dài lớn nhất có thể của cạnh còn lại là bao nhiêu?",
        "vocab": "Length: Độ dài; Side: Cạnh; Triangle: Hình tam giác; Integer: Số nguyên; Maximum length: Độ dài lớn nhất; Remaining side: Cạnh còn lại.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15",
          "15"
        ],
        "unit": "",
        "hint": "Bất đẳng thức tam giác trong hình học phẳng.",
        "solution": "Theo bất đẳng thức tam giác, trong một tam giác, độ dài của một cạnh luôn nhỏ hơn tổng độ dài của hai cạnh còn lại:\nGọi độ dài cạnh còn lại là c (cm, c là số nguyên dương).\nTa có:\nc < 10 + 6 = 16 (cm).\nĐồng thời c > 10 – 6 = 4 (cm).\nVì c là số nguyên và ta cần tìm giá trị lớn nhất của c, nên c = 16 – 1 = 15 (cm).\nVậy độ dài lớn nhất có thể của cạnh còn lại là 15cm."
      },
      {
        "id": 44,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At least how many squares can be seen if viewing the figure below from side?",
        "questionVi": "Nhìn hình dưới đây từ bên cạnh (hình chiếu cạnh), có thể thấy ít nhất bao nhiêu hình vuông?",
        "vocab": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.",
        "image": "images/de2_q19_cubes.png",
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích hình chiếu cạnh của khối xếp 3D.",
        "solution": "Khi nhìn khối hình từ một phía bên cạnh:\nMỗi cột khối lập phương theo phương nhìn sẽ hiển thị số hình vuông bằng chiều cao của cột cao nhất trong hàng đó.\nĐếm các cột theo hình chiếu bên:\nMô hình khối có cấu trúc gồm các cột phân bố với chiều cao tương ứng.\nTổng số hình vuông ít nhất nhìn thấy được từ phía bên cạnh là 9 hình vuông."
      },
      {
        "id": 45,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At most how many pieces can be formed by using 4 lines to cut a circle?",
        "questionVi": "Dùng 4 đường thẳng cắt một hình tròn thì có thể tạo ra nhiều nhất bao nhiêu mảnh?",
        "vocab": "At most: Nhiều nhất; Pieces: Mảnh; Lines: Đường thẳng; Cut: Cắt; Circle: Hình tròn.",
        "image": null,
        "answer": "11",
        "acceptableAnswers": [
          "11",
          "11"
        ],
        "unit": "",
        "hint": "Công thức chia mặt phẳng/hình tròn bằng n đường thẳng.",
        "solution": "Để số mảnh tạo thành là nhiều nhất, mỗi đường thẳng mới vẽ phải cắt tất cả các đường thẳng đã có và không có 3 đường nào đồng quy:\n- Ban đầu (chưa cắt): 1 hình tròn (1 mảnh)\n- Nhát cắt thứ 1: tạo thêm 1 mảnh ⇒ 1 + 1 = 2 mảnh\n- Nhát cắt thứ 2: tạo thêm 2 mảnh ⇒ 2 + 2 = 4 mảnh\n- Nhát cắt thứ 3: tạo thêm 3 mảnh ⇒ 4 + 3 = 7 mảnh\n- Nhát cắt thứ 4: tạo thêm 4 mảnh ⇒ 7 + 4 = 11 mảnh\nCông thức tổng quát cho n đường thẳng: 1 + (1 + 2 + ... + n) = 1 + n × (n + 1) ÷ 2.\nVới n = 4: 1 + 4 × 5 ÷ 2 = 1 + 10 = 11 (mảnh)."
      },
      {
        "id": 46,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 digits, without repetition, from 0, 3, 5, 7, 8 to form 2-digit numbers. Of these 2-digit numbers, how many of them are odd numbers?",
        "questionVi": "Chọn 2 chữ số khác nhau từ 0, 3, 5, 7, 8 để lập thành số có 2 chữ số. Trong các số lập được, có bao nhiêu số lẻ?",
        "vocab": "Choose: Chọn; Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Odd number: Số lẻ.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Quy tắc nhân và phân tích điều kiện số lẻ.",
        "solution": "Gọi số có 2 chữ số cần lập là ab (a ≠ 0; a, b phân biệt thuộc {0, 3, 5, 7, 8}).\nĐể ab là số lẻ thì chữ số hàng đơn vị b phải là chữ số lẻ: b ∈ {3, 5, 7} (có 3 cách chọn b).\nSau khi đã chọn b, chữ số hàng chục a được chọn từ các chữ số còn lại sao cho a ≠ 0 và a ≠ b:\n- Tập hợp các chữ số ban đầu có 5 chữ số: {0, 3, 5, 7, 8}.\n- Bỏ đi chữ số b đã chọn: còn lại 4 chữ số (trong đó có chữ số 0).\n- Bỏ đi chữ số 0 (vì a ≠ 0): còn lại đúng 3 chữ số thích hợp cho a (3 cách chọn a).\nTheo quy tắc nhân, số lượng các số lẻ lập được là:\n3 × 3 = 9 (số)."
      },
      {
        "id": 47,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "What is the greatest 4-digit even number by using 0, 3, 5, 7 and 8? (Each digit can only be used once).",
        "questionVi": "Số chẵn lớn nhất có 4 chữ số lập từ các chữ số 0, 3, 5, 7 và 8 là số nào? (Mỗi chữ số chỉ được dùng một lần).",
        "vocab": "Greatest 4-digit even number: Số chẵn lớn nhất có 4 chữ số; Each digit can only be used once: Mỗi chữ số chỉ được dùng một lần.",
        "image": null,
        "answer": "8750",
        "acceptableAnswers": [
          "8750",
          "8750"
        ],
        "unit": "",
        "hint": "Nguyên tắc tối ưu hóa giá trị chữ số từ hàng cao xuống hàng thấp kết hợp điều kiện chẵn.",
        "solution": "Để số lập được là lớn nhất, ta ưu tiên chọn các chữ số lớn nhất cho các hàng cao (hàng nghìn, hàng trăm, hàng chục) từ tập {0, 3, 5, 7, 8}:\n- Hàng nghìn chọn chữ số lớn nhất: 8\n- Hàng trăm chọn chữ số lớn tiếp theo: 7\n- Hàng chục chọn chữ số lớn tiếp theo: 5\n- Hàng đơn vị phải là chữ số chẵn: các chữ số còn lại là {0, 3}, do đó hàng đơn vị bắt buộc chọn 0 để số là số chẵn.\nSố chẵn lớn nhất lập được là: 8750."
      },
      {
        "id": 48,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Pick 3 from 9 competitors to get gold, silver, bronze reward. How many different combination(s) is / are there?",
        "questionVi": "Chọn 3 bạn trong 9 bạn thi đấu để trao huy chương vàng, bạc, đồng. Hỏi có bao nhiêu cách trao giải khác nhau?",
        "vocab": "Competitor: Thí sinh/Vận động viên; Gold, silver, bronze reward: Giải vàng, bạc, đồng; Different combination: Cách kết hợp khác nhau.",
        "image": null,
        "answer": "504",
        "acceptableAnswers": [
          "504",
          "504"
        ],
        "unit": "",
        "hint": "Quy tắc nhân đếm số cách chọn có thứ tự (Chỉnh hợp).",
        "solution": "Vì mỗi bạn nhận một loại huy chương khác nhau (vàng, bạc, đồng) nên thứ tự chọn là quan trọng:\n- Bước 1: Chọn 1 bạn nhận huy chương vàng: có 9 cách chọn.\n- Bước 2: Chọn 1 bạn nhận huy chương bạc (trong 8 bạn còn lại): có 8 cách chọn.\n- Bước 3: Chọn 1 bạn nhận huy chương đồng (trong 7 bạn còn lại): có 7 cách chọn.\nÁp dụng quy tắc nhân, số cách trao giải khác nhau là:\n9 × 8 × 7 = 72 × 7 = 504 (cách)."
      },
      {
        "id": 49,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Chris has ten  coins, nine  coins and three  coins, at most how many book(s) can he buy if each book costs ?",
        "questionVi": "Chris có 10 đồng xu , 9 đồng xu  và 3 đồng xu . Hỏi Chris có thể mua nhiều nhất bao nhiêu cuốn sách nếu mỗi cuốn sách có giá ?",
        "vocab": "Coins: Đồng xu; At most: Nhiều nhất; Cost: Giá tiền.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10",
          "10"
        ],
        "unit": "",
        "hint": "Tính tổng giá trị tiền tệ và thực hiện phép chia có dư.",
        "solution": "Tính tổng số tiền mà Chris có:\n- 10 đồng xu : 10 × 1 =\n- 9 đồng xu : 9 × 2 =\n- 3 đồng xu : 3 × 5 =\nTổng số tiền của Chris là: 10 + 18 + 15 = .\nThực hiện phép chia tìm số sách tối đa mua được:\n43 ÷ 4 = 10 (dư 3).\nVậy Chris có thể mua được nhiều nhất 10 cuốn sách."
      },
      {
        "id": 50,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Which number below is the greatest?\n20196951, 20186421, 2020345, 20198462",
        "questionVi": "Số nào dưới đây là số lớn nhất?\n20196951, 20186421, 2020345, 20198462",
        "vocab": "Number: Số; Greatest: Lớn nhất.",
        "image": null,
        "answer": "20198462",
        "acceptableAnswers": [
          "20198462",
          "20198462"
        ],
        "unit": "",
        "hint": "Quy tắc so sánh các số tự nhiên có nhiều chữ số.",
        "solution": "So sánh các số đã cho:\n1) Đếm số lượng chữ số:\n- Số 2020345 có 7 chữ số (bé nhất).\n- Ba số còn lại đều có 8 chữ số: 20196951, 20186421, 20198462.\n2) So sánh các số có 8 chữ số từ hàng cao xuống hàng thấp:\n- Bốn chữ số đầu tiên: 2019... > 2018... nên loại 20186421.\n- So sánh hai số cùng có đầu 2019: 20196951 và 20198462.\n- Chữ số hàng nghìn: 8 > 6, do đó 20198462 > 20196951.\nVậy số lớn nhất là 20198462."
      }
    ]
  },
  {
    "id": "heat_de3",
    "title": "Đề số 3: VCK Quốc gia (2018 – 2019)",
    "titleEn": "Paper 3: National Final Heat Round (2018 – 2019)",
    "year": "2018 – 2019",
    "grade": "Khối 2 / Grade 2",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "range": [
          1,
          5
        ],
        "color": "blue"
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "range": [
          6,
          10
        ],
        "color": "emerald"
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "range": [
          11,
          15
        ],
        "color": "purple"
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "range": [
          16,
          20
        ],
        "color": "amber"
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "range": [
          21,
          25
        ],
        "color": "rose"
      }
    ],
    "questions": [
      {
        "id": 51,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Amy's father has 5 children, how many brothers and sisters does Amy have?",
        "questionVi": "Bố của Amy có 5 người con. Hỏi Amy có bao nhiêu anh chị em?",
        "vocab": "Amy",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Phương pháp đếm loại trừ đối tượng bản thân.",
        "solution": "Bố của Amy có tất cả 5 người con, trong đó đã bao gồm chính bạn Amy.\nDo đó, số anh chị em mà Amy có là:\n5 – 1 = 4 (người anh chị em)."
      },
      {
        "id": 52,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many triangle(s) is / are there within the 26th symbol counting from the left?\n○, △, □, ○, △, □, ○, △, □, ...",
        "questionVi": "Dựa vào quy luật dưới đây, có bao nhiêu hình tam giác trong 26 ký hiệu đầu tiên tính từ bên trái sang?\n○, △, □, ○, △, □, ○, △, □, ...",
        "vocab": "Pattern: Quy luật; Triangle: Hình tam giác; 26th symbol: Ký hiệu thứ 26; From the left: Từ bên trái.",
        "image": "images/de3_q2_pattern.png",
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích chu kỳ tuần hoàn (Phép chia có dư).",
        "solution": "Quan sát dãy ký hiệu lặp lại theo chu kỳ 3 hình: (○, △, □).\nTrong mỗi chu kỳ gồm 3 hình, có đúng 1 hình tam giác (△).\nThực hiện phép chia tìm số chu kỳ đầy đủ trong 26 ký hiệu đầu tiên:\n26 ÷ 3 = 8 (dư 2).\n- 8 chu kỳ trọn vẹn chứa: 8 × 1 = 8 (hình tam giác).\n- 2 ký hiệu dư tiếp theo lần lượt là: hình tròn (○) và hình tam giác (△), tức là có thêm 1 hình tam giác nữa.\nTổng số hình tam giác có trong 26 ký hiệu đầu tiên là:\n8 + 1 = 9 (hình tam giác)."
      },
      {
        "id": 53,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "When Amy was born, mum was 34 years old. When Amy will be 15 years old, how old will mum be?",
        "questionVi": "Khi Amy sinh ra, mẹ 34 tuổi. Khi Amy 15 tuổi, hỏi mẹ bao nhiêu tuổi?",
        "vocab": "Born: Sinh ra; Years old: Tuổi.",
        "image": null,
        "answer": "49",
        "acceptableAnswers": [
          "49",
          "49"
        ],
        "unit": "",
        "hint": "Hiệu số tuổi không đổi theo thời gian.",
        "solution": "Từ khi Amy sinh ra (0 tuổi) đến khi Amy 15 tuổi là 15 năm.\nTuổi của mẹ khi đó là:\n34 + 15 = 49 (tuổi)."
      },
      {
        "id": 54,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "In year 2018, how many month(s) is / are there with 31 days?",
        "questionVi": "Trong năm 2018, có bao nhiêu tháng có 31 ngày?",
        "vocab": "Year: Năm; Month: Tháng; Day: Ngày.",
        "image": null,
        "answer": "7",
        "acceptableAnswers": [
          "7",
          "7"
        ],
        "unit": "",
        "hint": "Quy tắc bàn tay xác định số ngày trong các tháng của năm.",
        "solution": "Trong một năm dương lịch (kể cả năm nhuận hay năm thường):\nCác tháng có đúng 31 ngày luôn luôn cố định, gồm 7 tháng:\nTháng 1, Tháng 3, Tháng 5, Tháng 7, Tháng 8, Tháng 10 và Tháng 12.\nVậy năm 2018 có tất cả 7 tháng có 31 ngày."
      },
      {
        "id": 55,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, what is the English letter in the space?\nA, E, I, M, __",
        "questionVi": "Dựa vào quy luật dưới đây, chữ cái tiếng Anh thích hợp điền vào chỗ trống là chữ cái nào?\nA, E, I, M, __",
        "vocab": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống.",
        "image": null,
        "answer": "Q",
        "acceptableAnswers": [
          "Q",
          "q"
        ],
        "unit": "",
        "hint": "Quy luật dãy chữ cái cách đều trong bảng chữ cái tiếng Anh.",
        "solution": "Xác định vị trí các chữ cái trong bảng chữ cái tiếng Anh:\n- A là chữ thứ 1\n- E là chữ thứ 5 (1 + 4 = 5)\n- I là chữ thứ 9 (5 + 4 = 9)\n- M là chữ thứ 13 (9 + 4 = 13)\nQuy luật: Mỗi chữ cái đứng sau cách chữ cái đứng trước 4 vị trí (+4).\nVị trí chữ cái tiếp theo là: 13 + 4 = 17.\nChữ cái thứ 17 trong bảng chữ cái tiếng Anh là chữ Q."
      },
      {
        "id": 56,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16.",
        "questionVi": "Tính giá trị của biểu thức: 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "72",
        "acceptableAnswers": [
          "72",
          "72"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp số cách đều có tổng bằng nhau.",
        "solution": "Ghép các cặp số đối xứng:\n2 + 4 + 6 + 8 + 10 + 12 + 14 + 16\n= (2 + 16) + (4 + 14) + (6 + 12) + (8 + 10)\n= 18 + 18 + 18 + 18\n= 18 × 4 = 72."
      },
      {
        "id": 57,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 17 × 11 + 17 × 3 – 17 × 4.",
        "questionVi": "Tính giá trị của biểu thức: 17 × 11 + 17 × 3 – 17 × 4.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "170",
        "acceptableAnswers": [
          "170",
          "170"
        ],
        "unit": "",
        "hint": "Phương pháp đặt thừa số chung.",
        "solution": "Đặt thừa số chung 17 ra ngoài:\n17 × 11 + 17 × 3 – 17 × 4\n= 17 × (11 + 3 – 4)\n= 17 × (14 – 4)\n= 17 × 10 = 170."
      },
      {
        "id": 58,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2 – 5 + 8 – 11 + 14 – 17 + 20 – 23 + 26.",
        "questionVi": "Tính giá trị của biểu thức: 2 – 5 + 8 – 11 + 14 – 17 + 20 – 23 + 26.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "14",
        "acceptableAnswers": [
          "14",
          "14"
        ],
        "unit": "",
        "hint": "Phương pháp ghép nhóm các cặp số có hiệu không đổi.",
        "solution": "Sắp xếp và nhóm các cặp số:\n2 – 5 + 8 – 11 + 14 – 17 + 20 – 23 + 26\n= 2 + (8 – 5) + (14 – 11) + (20 – 17) + (26 – 23)\n= 2 + 3 + 3 + 3 + 3\n= 2 + 3 × 4\n= 2 + 12 = 14."
      },
      {
        "id": 59,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1.",
        "questionVi": "Tính giá trị của biểu thức: 1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36",
          "36"
        ],
        "unit": "",
        "hint": "Quy luật tổng đối xứng hình kim tự tháp (n × n).",
        "solution": "Nhóm các cặp có tổng bằng 6:\n1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1\n= (1 + 5) + (1 + 5) + (2 + 4) + (2 + 4) + (3 + 3) + 6\n= 6 + 6 + 6 + 6 + 6 + 6\n= 6 × 6 = 36."
      },
      {
        "id": 60,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "A and B are both 1-digit numbers and A < B. What is the value of A + B if B + AB = 66?",
        "questionVi": "A và B đều là các chữ số có 1 chữ số và A < B. Hỏi giá trị của A + B là bao nhiêu nếu B + AB = 66?",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính.",
        "image": null,
        "answer": "13",
        "acceptableAnswers": [
          "13",
          "13"
        ],
        "unit": "",
        "hint": "Phân tích cấu tạo số và lập luận loại trừ theo điều kiện A < B.",
        "solution": "Xét phép cộng:\nB\n+  AB\n-----\n66\nỞ hàng đơn vị: B + B có chữ số tận cùng là 6.\nSuy ra B có thể bằng 3 hoặc 8:\n- Nếu B = 3: Phép tính là 3 + A3 = 66 ⇒ A3 = 63 ⇒ A = 6.\nKhi đó A = 6 và B = 3 ⇒ A > B, mâu thuẫn với điều kiện A < B của đề bài (loại).\n- Nếu B = 8: Phép tính là 8 + A8 = 66 ⇒ A8 = 66 – 8 = 58 ⇒ A = 5.\nKhi đó A = 5 và B = 8 ⇒ 5 < 8 thỏa mãn điều kiện A < B.\nVậy giá trị của A + B là:\n5 + 8 = 13."
      },
      {
        "id": 61,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Determine the result of 3 + 7 + 11 + 15 + 19 + 23 + 27 + 31 is odd or even.",
        "questionVi": "Xác định kết quả của biểu thức sau là số chẵn hay số lẻ:\n3 + 7 + 11 + 15 + 19 + 23 + 27 + 31",
        "vocab": "Determine: Xác định; Result: Kết quả; Odd: Lẻ; Even: Chẵn.",
        "image": null,
        "answer": "Even (Chẵn)",
        "acceptableAnswers": [
          "Even (Chẵn)",
          "Even",
          "Chẵn",
          "chẵn",
          "even",
          "Chan",
          "chan"
        ],
        "unit": "",
        "hint": "Tính chất chẵn lẻ của tổng gồm chẵn số lượng số lẻ.",
        "solution": "Đếm số lượng số hạng trong tổng:\nCác số hạng: 3, 7, 11, 15, 19, 23, 27, 31 gồm có tất cả 8 số hạng.\nMỗi số hạng trong tổng đều là một số LẺ.\nTổng của một số chẵn các số lẻ (8 số lẻ ghép thành 4 cặp, mỗi cặp LẺ + LẺ = CHẴN) luôn luôn là một số CHẴN.\nVậy kết quả của biểu thức là số CHẴN (Even)."
      },
      {
        "id": 62,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Fill the lines with '×' and '–' to make the equation below correct.\n7 __ 4 __ 5 __ 3 = 13",
        "questionVi": "Điền các dấu '×' và '–' vào chỗ trống để được phép tính đúng:\n7 __ 4 __ 5 __ 3 = 13",
        "vocab": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng.",
        "image": null,
        "answer": "7 × 4 – 5 × 3 = 13",
        "acceptableAnswers": [
          "7 × 4 – 5 × 3 = 13",
          "*, -, *",
          "*-*",
          "* - *",
          "×, –, ×",
          "7 * 4 - 5 * 3 = 13"
        ],
        "unit": "",
        "hint": "Phương pháp kết hợp hai tích trừ cho nhau.",
        "solution": "Quan sát kết quả 13 và các số 7, 4, 5, 3:\nTính tích: 7 × 4 = 28.\nTính tích: 5 × 3 = 15.\nHiệu giữa hai tích là:\n28 – 15 = 13 (đúng bằng kết quả cần tìm).\nVậy phép tính hoàn chỉnh chính xác là:\n7 × 4 – 5 × 3 = 13."
      },
      {
        "id": 63,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The numbers below follow the arithmetic sequence, what is the 9th number?\n12, 21, 30, 39, 48, ...",
        "questionVi": "Các số dưới đây tuân theo quy luật dãy số cách đều, hỏi số thứ 9 là số nào?\n12, 21, 30, 39, 48, ...",
        "vocab": "9th number: Số thứ 9; Arithmetic sequence: Dãy số cách đều.",
        "image": null,
        "answer": "84",
        "acceptableAnswers": [
          "84",
          "84"
        ],
        "unit": "",
        "hint": "Công thức tìm số hạng thứ n của dãy số cách đều.",
        "solution": "Xét khoảng cách giữa các số hạng liên tiếp:\n21 – 12 = 9; 30 – 21 = 9; 39 – 30 = 9; 48 – 39 = 9.\nĐây là dãy số cách đều có số đầu tiên là 12 và khoảng cách là 9.\nSố hạng thứ 9 của dãy là:\n12 + 9 × (9 – 1) = 12 + 9 × 8 = 12 + 72 = 84."
      },
      {
        "id": 64,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "How many 2-digit odd number(s) that is / are multiples of 3 is / are there?",
        "questionVi": "Có bao nhiêu số lẻ có 2 chữ số là bội của 3?",
        "vocab": "2-digit odd number: Số lẻ có 2 chữ số; Multiple of 3: Bội của 3.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15",
          "15"
        ],
        "unit": "",
        "hint": "Đếm số lượng số hạng của dãy số lẻ chia hết cho 3.",
        "solution": "Các số có 2 chữ số là số lẻ và chia hết cho 3:\n- Số nhỏ nhất: 15 (vì 12 là số chẵn)\n- Số lớn nhất: 99\nVì một số chia hết cho 3 sẽ xen kẽ chẵn - lẻ (12 chẵn, 15 lẻ, 18 chẵn, 21 lẻ, ...), nên khoảng cách giữa hai số lẻ liên tiếp chia hết cho 3 là:\n3 × 2 = 6 đơn vị.\nDãy các số cần tìm là: 15, 21, 27, 33, ..., 99.\nSố lượng các số thỏa mãn là:\n(99 – 15) ÷ 6 + 1 = 84 ÷ 6 + 1 = 14 + 1 = 15 (số)."
      },
      {
        "id": 65,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the largest 2-digit number that can be divisible by 4 and 6?",
        "questionVi": "Số lớn nhất có 2 chữ số chia hết cho cả 4 và 6 là số nào?",
        "vocab": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho.",
        "image": null,
        "answer": "96",
        "acceptableAnswers": [
          "96",
          "96"
        ],
        "unit": "",
        "hint": "Tìm bội chung lớn nhất có 2 chữ số.",
        "solution": "Bội chung nhỏ nhất của 4 và 6 là 12 (vì 12 chia hết cho cả 4 và 6).\nSố chia hết cho cả 4 và 6 phải là bội số của 12.\nLiệt kê các bội số của 12 có 2 chữ số gần 100 nhất:\n12 × 7 = 84\n12 × 8 = 96\n12 × 9 = 108 (đã sang số có 3 chữ số).\nVậy số lớn nhất có 2 chữ số chia hết cho cả 4 và 6 là 96."
      },
      {
        "id": 66,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many squares are there in the figure below?",
        "questionVi": "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "vocab": "Square: Hình vuông; Figure: Hình vẽ.",
        "image": "images/de3_q16_squares.png",
        "answer": "12",
        "acceptableAnswers": [
          "12",
          "12"
        ],
        "unit": "",
        "hint": "Phương pháp phân loại đếm hình vuông đơn vị và hình vuông ghép.",
        "solution": "Phân loại hình vuông theo kích thước:\n1) Hình vuông kích thước 1×1 (ô vuông đơn vị):\nĐếm từng ô đơn vị có trong lưới hình: có 10 ô vuông 1×1.\n2) Hình vuông kích thước 2×2 (ghép từ 4 ô vuông đơn vị):\nCó 2 hình vuông kích thước 2×2 được tạo thành.\nTổng số hình vuông trong hình vẽ là:\n10 + 2 = 12 (hình vuông)."
      },
      {
        "id": 67,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A prism has 8 vertices, how many face(s) does this prism have?",
        "questionVi": "Một hình lăng trụ có 8 đỉnh. Hỏi hình lăng trụ đó có bao nhiêu mặt?",
        "vocab": "Prism: Hình lăng trụ; Vertice: Đỉnh; Face: Mặt.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6",
          "6"
        ],
        "unit": "",
        "hint": "Công thức số đỉnh và số mặt của hình lăng trụ n-giác.",
        "solution": "Một hình lăng trụ n-giác có:\n- Số đỉnh = 2 × n (gồm n đỉnh ở đáy trên và n đỉnh ở đáy dưới).\nTheo đề bài: 2 × n = 8 ⇒ n = 8 ÷ 2 = 4 (lăng trụ tứ giác, đáy có 4 cạnh).\nSố mặt của hình lăng trụ tứ giác gồm:\n- 4 mặt bên\n- 2 mặt đáy\nTổng số mặt của hình lăng trụ là:\n4 + 2 = 6 (mặt)."
      },
      {
        "id": 68,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "It is known as the lengths of shorter sides for a right-angled triangle are 6cm and 8cm respectively. Find the length of the longest length.",
        "questionVi": "Biết độ dài hai cạnh góc vuông (hai cạnh ngắn hơn) của một hình tam giác vuông lần lượt là 6cm và 8cm. Hãy tìm độ dài của cạnh dài nhất (cạnh huyền).",
        "vocab": "Length: Độ dài; Shorter side: Cạnh ngắn hơn; Right-angled triangle: Tam giác vuông; Longest length: Cạnh dài nhất.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10",
          "10"
        ],
        "unit": "",
        "hint": "Bộ ba số Pi-ta-go số học trong tam giác vuông (6 - 8 - 10).",
        "solution": "Trong một hình tam giác vuông, cạnh dài nhất là cạnh huyền đối diện với góc vuông.\nTheo định lý Pi-ta-go, bình phương cạnh dài nhất bằng tổng bình phương của hai cạnh ngắn hơn:\n6 × 6 + 8 × 8 = 36 + 64 = 100.\nVì 10 × 10 = 100, nên độ dài cạnh dài nhất là 10cm.\n(Học sinh lớp 2 có thể vẽ hình theo đúng tỉ lệ thực tế 6cm và 8cm rồi dùng thước đo độ dài cạnh huyền là 10cm)."
      },
      {
        "id": 69,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At least how many squares can be seen if viewing the figure below from side?",
        "questionVi": "Nhìn hình dưới đây từ phía bên cạnh (hình chiếu cạnh), có thể thấy ít nhất bao nhiêu hình vuông?",
        "vocab": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.",
        "image": "images/de3_q19_cubes.png",
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích hình chiếu bên của khối xếp 3D.",
        "solution": "Khi nhìn khối hình từ một phía bên cạnh:\nMỗi cột vị trí theo góc nhìn bên sẽ hiển thị số hình vuông tương ứng với chiều cao tối đa của các khối trong cột đó.\nMô hình khối có diện tích đáy và chiều cao tạo thành hình chiếu gồm 4 hình vuông.\nVậy có thể thấy ít nhất 4 hình vuông từ phía bên cạnh."
      },
      {
        "id": 70,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many line segment(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "vocab": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
        "image": "images/de3_q20_segments.png",
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp đếm các đoạn thẳng thành phần và đoạn thẳng kết hợp.",
        "solution": "Đếm các đoạn thẳng trên từng nhánh của hình vẽ:\nHình vẽ gồm 3 đoạn thẳng đơn trên trục chính và các đoạn rẽ nhánh.\nĐếm tuần tự các đoạn thẳng đơn lẻ và các đoạn thẳng ghép:\nTổng cộng có tất cả 9 đoạn thẳng."
      },
      {
        "id": 71,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "According to the following answers, how many 2-digit numbers are there?\n15 + 13, 19 – 7, 14 – 9, 5 + 9, 19 – 10, 11 – 8, 17 – 9, 3 + 7, 18 – 7",
        "questionVi": "Trong các kết quả của các phép tính dưới đây, có bao nhiêu số có 2 chữ số?\n15 + 13, 19 – 7, 14 – 9, 5 + 9, 19 – 10, 11 – 8, 17 – 9, 3 + 7, 18 – 7",
        "vocab": "Answer: Kết quả; 2-digit number: Số có 2 chữ số.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5",
          "5"
        ],
        "unit": "",
        "hint": "Tính toán từng phép tính và phân loại số theo số lượng chữ số.",
        "solution": "Thực hiện tính kết quả của từng phép tính:\n- 15 + 13 = 28 (số có 2 chữ số)\n- 19 – 7 = 12 (số có 2 chữ số)\n- 14 – 9 = 5 (số có 1 chữ số)\n- 5 + 9 = 14 (số có 2 chữ số)\n- 19 – 10 = 9 (số có 1 chữ số)\n- 11 – 8 = 3 (số có 1 chữ số)\n- 17 – 9 = 8 (số có 1 chữ số)\n- 3 + 7 = 10 (số có 2 chữ số)\n- 18 – 7 = 11 (số có 2 chữ số)\nCác kết quả là số có 2 chữ số gồm: 28, 12, 14, 10, 11.\nVậy có tất cả 5 số có 2 chữ số."
      },
      {
        "id": 72,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 digits, without repetition, from 0, 3, 4, 5, 7 to form 2-digit numbers. Of these 2-digit numbers, how many of them are odd numbers?",
        "questionVi": "Chọn 2 chữ số khác nhau từ 0, 3, 4, 5, 7 để lập thành các số có 2 chữ số. Trong các số lập được, có bao nhiêu số lẻ?",
        "vocab": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Odd number: Số lẻ.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Quy tắc nhân đếm số có 2 chữ số kết hợp ràng buộc lẻ.",
        "solution": "Gọi số có 2 chữ số cần lập là ab (a ≠ 0, a ≠ b, a, b ∈ {0, 3, 4, 5, 7}).\nVì ab là số lẻ nên chữ số hàng đơn vị b phải là chữ số lẻ: b ∈ {3, 5, 7} (có 3 cách chọn b).\nSau khi chọn b, chữ số hàng chục a được chọn từ các chữ số còn lại sao cho a ≠ 0 và a ≠ b:\n- Ban đầu có 5 chữ số: {0, 3, 4, 5, 7}.\n- Trừ chữ số b và chữ số 0, ta còn lại đúng 3 chữ số cho a (3 cách chọn a).\nÁp dụng quy tắc nhân:\nSố lượng các số lẻ thỏa mãn là: 3 × 3 = 9 (số).\n(Các số cụ thể là: 43, 53, 73, 35, 45, 75, 37, 47, 57)."
      },
      {
        "id": 73,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are 2 ways from the market to the train station. There are 4 ways from the train station to the cinema. There are 3 ways from the cinema to the library. How many different way(s) is / are from the market to the library through the train station and cinema respectively?",
        "questionVi": "Có 2 con đường từ chợ đến ga tàu hỏa. Có 4 con đường từ ga tàu hỏa đến rạp chiếu phim. Có 3 con đường từ rạp chiếu phim đến thư viện. Hỏi có bao nhiêu con đường khác nhau đi từ chợ đến thư viện qua ga tàu hỏa và rạp chiếu phim?",
        "vocab": "Way: Cách/Con đường; Train station: Ga tàu; Cinema: Rạp chiếu phim; Library: Thư viện.",
        "image": null,
        "answer": "24",
        "acceptableAnswers": [
          "24",
          "24"
        ],
        "unit": "",
        "hint": "Quy tắc nhân cho các giai đoạn liên tiếp trong sơ đồ mạng lưới đường đi.",
        "solution": "Quá trình đi từ chợ đến thư viện gồm 3 chặng đường liên tiếp:\n- Chặng 1 (Chợ → Ga tàu hỏa): có 2 cách đi.\n- Chặng 2 (Ga tàu hỏa → Rạp chiếu phim): có 4 cách đi.\n- Chặng 3 (Rạp chiếu phim → Thư viện): có 3 cách đi.\nÁp dụng quy tắc nhân, tổng số cách đi khác nhau là:\n2 × 4 × 3 = 8 × 3 = 24 (cách đi)."
      },
      {
        "id": 74,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "What is the smallest 4-digit number by using 0, 2, 4, 6 and 8? (Each digit can only be used once).",
        "questionVi": "Số có 4 chữ số nhỏ nhất lập được từ các chữ số 0, 2, 4, 6 và 8 là số nào? (Mỗi chữ số chỉ được dùng một lần).",
        "vocab": "Smallest 4-digit number: Số có 4 chữ số nhỏ nhất; Each digit can only be used once: Mỗi chữ số chỉ được sử dụng một lần.",
        "image": null,
        "answer": "2046",
        "acceptableAnswers": [
          "2046",
          "2046"
        ],
        "unit": "",
        "hint": "Nguyên tắc lập số nhỏ nhất từ các chữ số cho trước.",
        "solution": "Để tạo thành số có 4 chữ số nhỏ nhất từ các chữ số {0, 2, 4, 6, 8}:\n- Chữ số hàng nghìn (hàng đầu tiên) phải là chữ số nhỏ nhất khác 0: chọn 2.\n- Các chữ số tiếp theo ở hàng trăm, hàng chục, hàng đơn vị được chọn lần lượt theo thứ tự tăng dần từ các chữ số nhỏ nhất còn lại {0, 4, 6, 8}:\n* Hàng trăm chọn: 0\n* Hàng chục chọn: 4\n* Hàng đơn vị chọn: 6\nVậy số nhỏ nhất lập được là: 2046."
      },
      {
        "id": 75,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Peter has 6  coins, 2  coins and 4  coins. At most how many souvenir(s) can he buy for a souvenir costed ?",
        "questionVi": "Peter có 6 đồng xu , 2 đồng xu  và 4 đồng xu . Hỏi Peter có thể mua được nhiều nhất bao nhiêu món quà lưu niệm nếu mỗi món quà có giá ?",
        "vocab": "Coin: Đồng xu; Souvenir: Quà lưu niệm; At most: Nhiều nhất; Cost: Giá tiền.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5",
          "5"
        ],
        "unit": "",
        "hint": "Tính tổng số tiền và thực hiện phép chia tìm thương số lớn nhất.",
        "solution": "Tính tổng số tiền mà Peter có:\n- 6 đồng xu : 6 × 1 =\n- 2 đồng xu : 2 × 2 =\n- 4 đồng xu : 4 × 5 =\nTổng số tiền Peter có là: 6 + 4 + 20 = .\nSố món quà lưu niệm giá  mà Peter có thể mua nhiều nhất là:\n30 ÷ 6 = 5 (món quà lưu niệm)."
      }
    ]
  },
  {
    "id": "heat_de4",
    "title": "Đề số 4: VCK Quốc gia (2017 – 2018)",
    "titleEn": "Paper 4: National Final Heat Round (2017 – 2018)",
    "year": "2017 – 2018",
    "grade": "Khối 2 / Grade 2",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "range": [
          1,
          5
        ],
        "color": "blue"
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "range": [
          6,
          10
        ],
        "color": "emerald"
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "range": [
          11,
          15
        ],
        "color": "purple"
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "range": [
          16,
          20
        ],
        "color": "amber"
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "range": [
          21,
          25
        ],
        "color": "rose"
      }
    ],
    "questions": [
      {
        "id": 76,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Given Amy has 3 sisters and 2 brothers, how many child(ren) does Amy's mother have?",
        "questionVi": "Biết Amy có 3 người chị/em gái và 2 người anh/em trai. Hỏi mẹ của Amy có bao nhiêu người con?",
        "vocab": "Sister: Chị/em gái; Brother: Anh/em trai; Children: Người con; Amy",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6",
          "6"
        ],
        "unit": "",
        "hint": "Phương pháp đếm toàn bộ thành viên gia đình (kể cả bản thân).",
        "solution": "Gia đình của Amy gồm có:\n- 3 người chị/em gái\n- 2 người anh/em trai\n- Và chính bạn Amy\nTổng số người con mà mẹ của Amy có là:\n3 + 2 + 1 = 6 (người con)."
      },
      {
        "id": 77,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, what is the 27th symbol counting from the left?\n○, △, □, ○, ○, △, △, □, □, ○, ○, ○, △, △, △, □, □, □, ...",
        "questionVi": "Dựa vào quy luật dưới đây, biểu tượng thứ 27 tính từ bên trái sang là biểu tượng nào?\n○, △, □, ○, ○, △, △, □, □, ○, ○, ○, △, △, △, □, □, □, ...",
        "vocab": "Pattern: Quy luật; 27th symbol: Biểu tượng thứ 27; From the left: Từ bên trái.",
        "image": null,
        "answer": "Hình vuông (□)",
        "acceptableAnswers": [
          "Hình vuông (□)",
          "Hình vuông",
          "□",
          "hình vuông",
          "hinh vuong"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích nhóm chu kỳ tăng dần theo cấp số.",
        "solution": "Phân tích quy luật xuất hiện của các biểu tượng theo từng nhóm:\n- Thứ tự các hình xuất hiện theo vòng lặp: Hình tròn (○), Hình tam giác (△), Hình vuông (□).\n- Số lượng mỗi hình tăng thêm 1 hình ở mỗi nhóm tiếp theo:\n* Nhóm 1: có 1 hình tròn, 1 tam giác, 1 hình vuông ⇒ tổng cộng 3 hình (vị trí 1 đến 3).\n* Nhóm 2: có 2 hình tròn, 2 tam giác, 2 hình vuông ⇒ tổng cộng 6 hình (vị trí 4 đến 9).\n* Nhóm 3: có 3 hình tròn, 3 tam giác, 3 hình vuông ⇒ tổng cộng 9 hình (vị trí 10 đến 18).\nTổng số biểu tượng của 3 nhóm đầu tiên là: 3 + 6 + 9 = 18 (hình).\nSố vị trí cần đếm tiếp trong Nhóm 4 để đến vị trí 27 là: 27 – 18 = 9 (hình).\nTrong Nhóm 4 (mỗi loại hình có 4 hình):\n- 4 hình tròn đầu tiên: chiếm vị trí từ 19 đến 22.\n- 4 hình tam giác tiếp theo: chiếm vị trí từ 23 đến 26.\n- 4 hình vuông tiếp theo: chiếm vị trí từ 27 đến 30.\nDo đó, biểu tượng thứ 27 chính là hình vuông (□) đầu tiên của Nhóm 4."
      },
      {
        "id": 78,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "After 6 years, Amy will be 13 years old. How old was Amy 4 years ago?",
        "questionVi": "Sau 6 năm nữa, Amy sẽ 13 tuổi. Hỏi cách đây 4 năm, Amy bao nhiêu tuổi?",
        "vocab": "Year: Năm; Year old: Tuổi; Ago: Trước đây.",
        "image": null,
        "answer": "3",
        "acceptableAnswers": [
          "3",
          "3"
        ],
        "unit": "",
        "hint": "Phương pháp tính tuổi qua mốc thời gian hiện tại.",
        "solution": "Tuổi hiện tại của Amy là:\n13 – 6 = 7 (tuổi).\nTuổi của Amy cách đây 4 năm là:\n7 – 4 = 3 (tuổi)."
      },
      {
        "id": 79,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 2-digit number on a piece of paper and asked Peter to guess it.\nPeter asked: \"Is the number 89?\" John replied: \"One of the digits is correct, the position of that digit is also correct.\"\nPeter asked again: \"Is the number 17?\" John replied: \"One of the digits is correct, the position of that digit is wrong.\"\nPeter asked again: \"Is the number 75?\" John said: \"One of the digits is correct, the position of that digit is correct.\"\nWhat is the number written by John?",
        "questionVi": "John viết một số có hai chữ số ra giấy và đố Peter đoán số đó.\nPeter đoán: \"Có phải số 89 không?\" John đáp: \"Có 1 chữ số đúng và đúng vị trí.\"\nPeter đoán lại: \"Có phải số 17 không?\" John đáp: \"Có 1 chữ số đúng nhưng sai vị trí.\"\nPeter lại đoán: \"Có phải số 75 không?\" John nói: \"Có 1 chữ số đúng và đúng vị trí.\"\nHỏi John đã viết số nào?",
        "vocab": "2-digit number: Số có 2 chữ số; Number: Số; Digit: Chữ số; Correct: Đúng; Wrong: Sai; Position of that digit: Vị trí của chữ số đó.",
        "image": null,
        "answer": "79",
        "acceptableAnswers": [
          "79",
          "79"
        ],
        "unit": "",
        "hint": "Phương pháp đối chiếu và suy luận loại trừ vị trí chữ số.",
        "solution": "Phân tích các lần đoán của Peter:\n1) Xét hai số 17 và 75: Cả hai số đều chứa chữ số 7.\n- Ở số 17, chữ số 7 ở hàng đơn vị nhưng sai vị trí.\n- Ở số 75, chữ số 7 ở hàng chục và đúng vị trí.\nDo đó, chữ số 7 là chữ số đúng và nằm ở hàng chục (số có dạng 7_).\n2) Vì chữ số đúng ở lượt đoán 75 là 7, nên chữ số 5 là chữ số sai.\n3) Xét lượt đoán 89: Có 1 chữ số đúng và đúng vị trí.\n- Vì chữ số hàng chục đã là 7 (khác 8), nên chữ số 8 không thể đúng.\n- Vậy chữ số đúng là 9 và đang nằm đúng ở hàng đơn vị.\nKết hợp lại, số mà John đã viết là 79."
      },
      {
        "id": 80,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, how many shapes are there in the 10th Group?",
        "questionVi": "Dựa vào quy luật dưới đây, có bao nhiêu hình ở nhóm thứ 10?",
        "vocab": "Pattern: Quy luật; 10th Group: Nhóm thứ 10.",
        "image": "images/de4_q5_pattern.png",
        "answer": "73",
        "acceptableAnswers": [
          "73",
          "73"
        ],
        "unit": "",
        "hint": "Quy luật dãy số cách đều về số lượng hình.",
        "solution": "Đếm số lượng hình trong các nhóm đầu tiên:\n- Nhóm 1: có 1 hình\n- Nhóm 2: có 9 hình (1 + 8 = 9)\n- Nhóm 3: có 17 hình (9 + 8 = 17)\n- Nhóm 4: có 25 hình (17 + 8 = 25)\nDãy số lượng hình là dãy số cách đều có số đầu là 1 và khoảng cách là 8:\n1, 9, 17, 25, ...\nSố lượng hình ở nhóm thứ 10 là:\n1 + 8 × (10 – 1) = 1 + 8 × 9 = 1 + 72 = 73 (hình)."
      },
      {
        "id": 81,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19.",
        "questionVi": "Tính giá trị của biểu thức: 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "100",
        "acceptableAnswers": [
          "100",
          "100"
        ],
        "unit": "",
        "hint": "Tổng các số lẻ liên tiếp bắt đầu từ 1 (n × n).",
        "solution": "Cách 1: Ghép cặp đối xứng đầu và cuối:\n1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19\n= (1 + 19) + (3 + 17) + (5 + 15) + (7 + 13) + (9 + 11)\n= 20 + 20 + 20 + 20 + 20\n= 20 × 5 = 100.\nCách 2: Tổng của 10 số lẻ đầu tiên bằng 10 × 10 = 100."
      },
      {
        "id": 82,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 15 × 12 + 15 × 3 – 15 × 5.",
        "questionVi": "Tính giá trị của biểu thức: 15 × 12 + 15 × 3 – 15 × 5.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "150",
        "acceptableAnswers": [
          "150",
          "150"
        ],
        "unit": "",
        "hint": "Phương pháp đặt thừa số chung.",
        "solution": "Đặt thừa số chung 15 ra ngoài dấu ngoặc:\n15 × 12 + 15 × 3 – 15 × 5\n= 15 × (12 + 3 – 5)\n= 15 × (15 – 5)\n= 15 × 10 = 150."
      },
      {
        "id": 83,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2 – 4 + 6 – 8 + 10 – 12 + 14 – 16 + 18.",
        "questionVi": "Tính giá trị của biểu thức: 2 – 4 + 6 – 8 + 10 – 12 + 14 – 16 + 18.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10",
          "10"
        ],
        "unit": "",
        "hint": "Phương pháp gom nhóm hiệu các số chẵn cách đều.",
        "solution": "Gom nhóm từ số lớn về số bé hoặc tính theo từng cặp:\n2 – 4 + 6 – 8 + 10 – 12 + 14 – 16 + 18\n= (18 – 16) + (14 – 12) + (10 – 8) + (6 – 4) + 2\n= 2 + 2 + 2 + 2 + 2\n= 2 × 5 = 10."
      },
      {
        "id": 84,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "What is the number that should be filled in the blank?\n123 × __ = 861",
        "questionVi": "Số nào thích hợp điền vào chỗ trống?\n123 × __ = 861",
        "vocab": "Number: Số; Blank: Chỗ trống.",
        "image": null,
        "answer": "7",
        "acceptableAnswers": [
          "7",
          "7"
        ],
        "unit": "",
        "hint": "Tìm thừa số chưa biết trong phép nhân.",
        "solution": "Để tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết:\n__ = 861 ÷ 123.\nTa nhận thấy chữ số tận cùng của tích là 1, mà 3 × 7 = 21 (tận cùng là 1).\nThử lại: 123 × 7 = (100 + 20 + 3) × 7 = 700 + 140 + 21 = 861 (chính xác).\nVậy số cần điền là 7."
      },
      {
        "id": 85,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "If A and B are both 1-digit numbers, what is the value of B if A + AA = B0?",
        "questionVi": "Nếu A và B đều là các chữ số có 1 chữ số, hỏi giá trị của B là bao nhiêu nếu A + AA = B0?",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6",
          "6"
        ],
        "unit": "",
        "hint": "Phân tích cấu tạo số và hàng đơn vị.",
        "solution": "Xét phép cộng:\nA\n+  AA\n-----\nB0\nHàng đơn vị: A + A có chữ số tận cùng là 0.\nVì A là chữ số khác 0 (vì AA là số có 2 chữ số) nên A + A = 10 ⇒ A = 5.\nThay A = 5 vào phép tính:\n5 + 55 = 60.\nDo đó B0 = 60 ⇒ B = 6."
      },
      {
        "id": 86,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Amy has 118 apples and John has 22 apples. How many apple(s) does Amy have to give John to make them have the same number of apples?",
        "questionVi": "Amy có 118 quả táo và John có 22 quả táo. Hỏi Amy phải cho John bao nhiêu quả táo để số táo của hai bạn bằng nhau?",
        "vocab": "Apple: Quả táo; Give: Cho; The same number of: Có cùng số lượng.",
        "image": null,
        "answer": "48",
        "acceptableAnswers": [
          "48",
          "48"
        ],
        "unit": "",
        "hint": "Phương pháp tổng không đổi và chia đều hai phần.",
        "solution": "Tổng số táo của hai bạn là:\n118 + 22 = 140 (quả táo).\nKhi hai bạn có số táo bằng nhau, mỗi bạn sẽ có:\n140 ÷ 2 = 70 (quả táo).\nSố táo Amy phải cho John là:\n118 – 70 = 48 (quả táo).\n(Hoặc tính theo hiệu: (118 – 22) ÷ 2 = 96 ÷ 2 = 48 quả)."
      },
      {
        "id": 87,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "4 students have 30 balloons in total and each of them has a different number of balloons. At least how many balloon(s) does the student with the most balloons have?",
        "questionVi": "4 bạn học sinh có tất cả 30 quả bóng bay và số bóng của mỗi bạn là khác nhau. Hỏi bạn có nhiều bóng bay nhất có ít nhất bao nhiêu quả bóng bay?",
        "vocab": "Balloon: Bóng bay; Different number of: Số lượng khác nhau; At least: Ít nhất; Most: Nhiều nhất.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp làm mịn giá trị bằng các số tự nhiên liên tiếp (Chặn miền Dirichlet).",
        "solution": "Để bạn có nhiều bóng nhất có số bóng ít nhất có thể, số bóng của 4 bạn phải là 4 số nguyên liên tiếp tăng dần và chênh lệch nhau ít nhất (mỗi bước 1 đơn vị):\nGọi 4 số đó là a, a + 1, a + 2, a + 3.\nTổng của 4 số là: 4 × a + 6 = 30 ⇒ 4 × a = 24 ⇒ a = 6.\nBốn số bóng bay lần lượt là: 6, 7, 8, 9.\nKiểm tra: 6 + 7 + 8 + 9 = 30 quả (thỏa mãn 4 bạn có số bóng đôi một khác nhau).\nVậy bạn có nhiều bóng bay nhất có ít nhất 9 quả bóng bay."
      },
      {
        "id": 88,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The numbers below follow the arithmetic sequence, what is the 10th number?\n21, 33, 45, 57, 69, ...",
        "questionVi": "Các số dưới đây tuân theo quy luật dãy số cách đều, hỏi số thứ 10 là số nào?\n21, 33, 45, 57, 69, ...",
        "vocab": "Number: Số; Arithmetic sequence: Dãy số cách đều; 10th number: Số thứ 10.",
        "image": null,
        "answer": "129",
        "acceptableAnswers": [
          "129",
          "129"
        ],
        "unit": "",
        "hint": "Công thức số hạng tổng quát của dãy số cách đều.",
        "solution": "Xét khoảng cách giữa hai số liên tiếp trong dãy:\n33 – 21 = 12; 45 – 33 = 12; 57 – 45 = 12; 69 – 57 = 12.\nĐây là dãy số cách đều có số hạng đầu tiên là 21 và khoảng cách là 12.\nSố hạng thứ 10 của dãy là:\n21 + 12 × (10 – 1) = 21 + 12 × 9 = 21 + 108 = 129."
      },
      {
        "id": 89,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "How many 3-digit even number(s) that are multiples of 5 is / are there?",
        "questionVi": "Có bao nhiêu số chẵn có 3 chữ số là bội của 5?",
        "vocab": "3-digit even number: Số chẵn có 3 chữ số; Multiple of 5: Bội của 5.",
        "image": null,
        "answer": "90",
        "acceptableAnswers": [
          "90",
          "90"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết cho cả 2 và 5 (Tận cùng là chữ số 0).",
        "solution": "Một số vừa là số chẵn (chia hết cho 2) vừa là bội của 5 thì phải chia hết cho 10.\nDo đó, số cần tìm là các số có 3 chữ số có chữ số tận cùng là 0:\n- Số nhỏ nhất: 100\n- Số lớn nhất: 990\nKhoảng cách giữa hai số liên tiếp là 10.\nSố lượng các số thỏa mãn là:\n(990 – 100) ÷ 10 + 1 = 890 ÷ 10 + 1 = 89 + 1 = 90 (số)."
      },
      {
        "id": 90,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the largest 2-digit number that can be divisible by 3 and 5?",
        "questionVi": "Số lớn nhất có 2 chữ số chia hết cho cả 3 và 5 là số nào?",
        "vocab": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho.",
        "image": null,
        "answer": "90",
        "acceptableAnswers": [
          "90",
          "90"
        ],
        "unit": "",
        "hint": "Bội chung lớn nhất có 2 chữ số.",
        "solution": "Số chia hết cho cả 3 và 5 thì chia hết cho:\n3 × 5 = 15 (vì 3 và 5 là hai số nguyên tố cùng nhau).\nLiệt kê các bội số của 15 gần 100 nhất:\n15 × 6 = 90\n15 × 7 = 105 (là số có 3 chữ số).\nVậy số lớn nhất có 2 chữ số chia hết cho cả 3 và 5 là 90."
      },
      {
        "id": 91,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many square(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "vocab": "Square: Hình vuông; Figure: Hình vẽ.",
        "image": "images/de4_q16_squares.png",
        "answer": "26",
        "acceptableAnswers": [
          "26",
          "26"
        ],
        "unit": "",
        "hint": "Phương pháp phân loại đếm hình vuông theo kích thước 1×1, 2×2, 3×3.",
        "solution": "Đếm các hình vuông theo từng kích thước:\n1) Hình vuông kích thước 1×1: có 16 ô vuông đơn vị.\n2) Hình vuông kích thước 2×2: có 8 hình vuông 2×2.\n3) Hình vuông kích thước 3×3: có 2 hình vuông 3×3.\nTổng số hình vuông trong hình vẽ là:\n16 + 8 + 2 = 26 (hình vuông)."
      },
      {
        "id": 92,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A prism has 7 faces, how many vertice(s) does this prism have?",
        "questionVi": "Một hình lăng trụ có 7 mặt. Hỏi hình lăng trụ đó có bao nhiêu đỉnh?",
        "vocab": "Prism: Hình lăng trụ; Face: Mặt; Vertice: Đỉnh.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10",
          "10"
        ],
        "unit": "",
        "hint": "Công thức số mặt và số đỉnh của hình lăng trụ n-giác.",
        "solution": "Một hình lăng trụ n-giác có:\n- Số mặt = n + 2 (gồm n mặt bên và 2 mặt đáy).\nTheo đề bài: n + 2 = 7 ⇒ n = 7 – 2 = 5 (lăng trụ ngũ giác, hai đáy là hình ngũ giác có 5 cạnh).\nSố đỉnh của hình lăng trụ ngũ giác gồm 5 đỉnh ở đáy trên và 5 đỉnh ở đáy dưới:\nSố đỉnh = 5 × 2 = 10 (đỉnh)."
      },
      {
        "id": 93,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At most how many right angle(s) could a triangle contain?",
        "questionVi": "Một hình tam giác có thể chứa nhiều nhất bao nhiêu góc vuông?",
        "vocab": "At most: Nhiều nhất; Right angle: Góc vuông; Triangle: Hình tam giác.",
        "image": null,
        "answer": "1",
        "acceptableAnswers": [
          "1",
          "1"
        ],
        "unit": "",
        "hint": "Định lý tổng ba góc trong một tam giác bằng 180°.",
        "solution": "Tổng số đo ba góc trong một hình tam giác luôn luôn bằng 180°.\nMột góc vuông có số đo là 90°.\nNếu một hình tam giác có 2 góc vuông thì tổng hai góc đó đã là: 90° + 90° = 180°, khi đó góc thứ ba bằng 0° (không thể tạo thành tam giác).\nDo đó, một hình tam giác chỉ có thể chứa nhiều nhất 1 góc vuông."
      },
      {
        "id": 94,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At least how many squares can be seen if viewing the figure below from top?",
        "questionVi": "Nhìn hình dưới đây từ phía trên xuống (hình chiếu bằng), có thể thấy ít nhất bao nhiêu hình vuông?",
        "vocab": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From top: Từ phía trên.",
        "image": "images/de4_q19_cubes.png",
        "answer": "5",
        "acceptableAnswers": [
          "5",
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích hình chiếu bằng từ trên xuống.",
        "solution": "Khi nhìn từ trên cao thẳng xuống mặt phẳng:\nMỗi cột khối lập phương hiển thị đúng một hình vuông đơn vị trên mặt đất.\nĐếm các vị trí chân cột của khối hình trên lưới đáy: có tất cả 5 vị trí cột.\nVậy có thể nhìn thấy ít nhất 5 hình vuông."
      },
      {
        "id": 95,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At most how many triangles are there by drawing 4 straight lines on a plane?",
        "questionVi": "Vẽ 4 đường thẳng trên một mặt phẳng thì có thể tạo ra nhiều nhất bao nhiêu hình tam giác?",
        "vocab": "At most: Nhiều nhất; Triangle: Hình tam giác; Straight line: Đường thẳng; Plane: Mặt phẳng.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Tổ hợp các tam giác tạo bởi các đường thẳng cắt nhau.",
        "solution": "Để số hình tam giác tạo thành là nhiều nhất, không có 2 đường nào song song và không có 3 đường nào cùng đi qua 1 điểm.\nMỗi bộ 3 đường thẳng cắt nhau sẽ tạo thành đúng 1 hình tam giác.\nSố cách chọn 3 đường thẳng từ 4 đường thẳng là:\n(1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4) ⇒ có 4 cách chọn.\nVậy vẽ 4 đường thẳng có thể tạo ra nhiều nhất 4 hình tam giác."
      },
      {
        "id": 96,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Three people Amy, Andy and Johnny have some apples. After Amy gives 4 apples to Andy and 5 apples to Johnny, they have the same number of apples. How many apples more did Amy have than that of Andy originally?",
        "questionVi": "Ba bạn Amy, Andy và Johnny có một số quả táo. Sau khi Amy cho Andy 4 quả táo và cho Johnny 5 quả táo thì số táo của ba bạn bằng nhau. Hỏi ban đầu Amy có nhiều hơn Andy bao nhiêu quả táo?",
        "vocab": "Apple: Quả táo; Give: Cho; The same number of: Có cùng số lượng; More than: Nhiều hơn; Originally: Ban đầu.",
        "image": null,
        "answer": "13",
        "acceptableAnswers": [
          "13",
          "13"
        ],
        "unit": "",
        "hint": "Phương pháp giải toán sơ đồ đoạn thẳng và quan hệ cho - nhận.",
        "solution": "Sau khi trao đổi:\n- Amy cho đi tổng cộng: 4 + 5 = 9 (quả táo).\n- Andy nhận thêm: 4 (quả táo).\nLúc này hai bạn có số táo bằng nhau.\nĐiều đó chứng tỏ ban đầu số táo của Amy phải nhiều hơn số táo của Andy một lượng đúng bằng:\nSố táo Amy cho đi cộng với số táo Andy nhận thêm:\n9 + 4 = 13 (quả táo).\nVậy ban đầu Amy có nhiều hơn Andy 13 quả táo."
      },
      {
        "id": 97,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 digits, without repetition, from 2, 3, 4, 5, 6 to form 2-digit numbers. How many even numbers are there?",
        "questionVi": "Chọn 2 chữ số khác nhau từ 2, 3, 4, 5, 6 để lập thành các số có 2 chữ số. Có bao nhiêu số chẵn được tạo thành?",
        "vocab": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Even number: Số chẵn.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12",
          "12"
        ],
        "unit": "",
        "hint": "Quy tắc nhân lập số có điều kiện chẵn lẻ.",
        "solution": "Gọi số chẵn có 2 chữ số cần lập là ab (a ≠ b; a, b ∈ {2, 3, 4, 5, 6}).\n- Bước 1: Để số là số chẵn, chữ số hàng đơn vị b phải là số chẵn: b ∈ {2, 4, 6} (có 3 cách chọn b).\n- Bước 2: Chữ số hàng chục a được chọn từ các chữ số còn lại (khác b): tập ban đầu có 5 chữ số, trừ đi chữ số b đã chọn, còn lại 4 chữ số (4 cách chọn a).\nÁp dụng quy tắc nhân, số các số chẵn lập được là:\n3 × 4 = 12 (số)."
      },
      {
        "id": 98,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are 2 ways from the market to the train station. There are 5 ways from the train station to the cinema. There are 4 ways from the cinema to the library. How many different way(s) is / are from the market to the library through the train station and cinema respectively?",
        "questionVi": "Có 2 con đường từ chợ đến ga tàu hỏa. Có 5 con đường từ ga tàu hỏa đến rạp chiếu phim. Có 4 con đường từ rạp chiếu phim đến thư viện. Hỏi có bao nhiêu con đường khác nhau đi từ chợ đến thư viện qua ga tàu hỏa và rạp chiếu phim?",
        "vocab": "Way: Con đường/Cách; Market: Chợ; Train station: Ga tàu; Cinema: Rạp chiếu phim; Library: Thư viện.",
        "image": null,
        "answer": "40",
        "acceptableAnswers": [
          "40",
          "40"
        ],
        "unit": "",
        "hint": "Quy tắc nhân xác định số đường đi qua nhiều chặng.",
        "solution": "Hành trình từ chợ đến thư viện gồm 3 chặng liên tiếp:\n- Chặng 1 (Chợ → Ga tàu hỏa): có 2 cách.\n- Chặng 2 (Ga tàu hỏa → Rạp chiếu phim): có 5 cách.\n- Chặng 3 (Rạp chiếu phim → Thư viện): có 4 cách.\nTheo quy tắc nhân, tổng số cách đi khác nhau là:\n2 × 5 × 4 = 10 × 4 = 40 (cách)."
      },
      {
        "id": 99,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "What is the smallest 5-digit number by using 0, 1, 2, 3 and 4? (Each digit can only be used once).",
        "questionVi": "Số nhỏ nhất có 5 chữ số lập từ các chữ số 0, 1, 2, 3 và 4 là số nào? (Mỗi chữ số chỉ được dùng một lần).",
        "vocab": "Smallest 5-digit number: Số có 5 chữ số nhỏ nhất; Each digit can only be used once: Mỗi chữ số chỉ được dùng một lần.",
        "image": null,
        "answer": "10234",
        "acceptableAnswers": [
          "10234",
          "10234"
        ],
        "unit": "",
        "hint": "Nguyên tắc lập số nhỏ nhất có nhiều chữ số.",
        "solution": "Để tạo thành số có 5 chữ số nhỏ nhất từ các chữ số {0, 1, 2, 3, 4}:\n- Chữ số hàng vạn (hàng đầu tiên) phải là chữ số nhỏ nhất khác 0: chọn 1.\n- Các chữ số tiếp theo ở hàng nghìn, hàng trăm, hàng chục, hàng đơn vị được chọn lần lượt theo thứ tự tăng dần từ các chữ số còn lại {0, 2, 3, 4}:\n* Hàng nghìn chọn: 0\n* Hàng trăm chọn: 2\n* Hàng chục chọn: 3\n* Hàng đơn vị chọn: 4\nVậy số nhỏ nhất lập được là: 10234."
      },
      {
        "id": 100,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Peter has 7  coins, 2  coins and 1  coin, how many way(s) can he buy a souvenir costing  without any changes?",
        "questionVi": "Peter có 7 đồng xu , 2 đồng xu  và 1 đồng xu . Hỏi Peter có bao nhiêu cách để mua một món quà lưu niệm giá  mà không cần trả lại tiền thừa?",
        "vocab": "Coin: Đồng xu; Souvenir: Quà lưu niệm; Without any changes: Không cần tiền thừa.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5",
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp liệt kê có hệ thống phân loại theo mệnh giá lớn nhất.",
        "solution": "Liệt kê các cách phối hợp đồng xu để có tổng đúng bằng :\n- Trường hợp 1: Có dùng 1 đồng :\n* Cách 1: 1 đồng  + 1 đồng  =  (5 × 1 + 2 × 1 = 7)\n* Cách 2: 1 đồng  + 2 đồng  =  (5 × 1 + 1 × 2 = 7)\n- Trường hợp 2: Không dùng đồng  (chỉ dùng các đồng  và ):\n* Cách 3: Dùng 2 đồng  + 3 đồng  =  (2 × 2 + 1 × 3 = 7)\n* Cách 4: Dùng 1 đồng  + 5 đồng  =  (2 × 1 + 1 × 5 = 7)\n* Cách 5: Dùng 0 đồng  + 7 đồng  =  (1 × 7 = 7)\nTổng cộng có tất cả 5 cách trả tiền thỏa mãn."
      }
    ]
  },
  {
    "id": "heat_de5",
    "title": "Đề số 5: VCK Quốc gia (2016 – 2017)",
    "titleEn": "Paper 5: National Final Heat Round (2016 – 2017)",
    "year": "2016 – 2017",
    "grade": "Khối 2 / Grade 2",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "range": [
          1,
          5
        ],
        "color": "blue"
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "range": [
          6,
          10
        ],
        "color": "emerald"
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "range": [
          11,
          15
        ],
        "color": "purple"
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "range": [
          16,
          20
        ],
        "color": "amber"
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "range": [
          21,
          25
        ],
        "color": "rose"
      }
    ],
    "questions": [
      {
        "id": 101,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John, Amy and Peter are good friends. One of them is a merchant. One of them is a student. One of them is a soldier. In addition, we know following situations: Peter's age is larger than soldier's. Student's age is smaller than Amy's. John's age is different from that of student's. Who is the student?",
        "questionVi": "John, Amy và Peter là ba người bạn thân. Một người là thương nhân, một người là học sinh và một người là người lính. Biết rằng: Tuổi của Peter lớn hơn tuổi của người lính. Tuổi của học sinh nhỏ hơn tuổi của Amy. Tuổi của John khác tuổi của học sinh. Hỏi ai là học sinh?",
        "vocab": "Age: Tuổi; Larger than: Lớn hơn; Smaller than: Nhỏ hơn; Different from: Khác; Student: Học sinh; Soldier: Người lính; Merchant: Thương nhân.",
        "image": null,
        "answer": "Peter",
        "acceptableAnswers": [
          "Peter",
          "peter",
          "PETER"
        ],
        "unit": "",
        "hint": "Phương pháp suy luận logic loại trừ trực tiếp.",
        "solution": "Phân tích các dữ kiện bài toán:\n1) \"Tuổi của học sinh nhỏ hơn tuổi của Amy\" ⇒ Amy không phải là học sinh (vì tuổi của Amy lớn hơn tuổi học sinh).\n2) \"Tuổi của John khác tuổi của học sinh\" ⇒ John không phải là học sinh.\n3) Trong ba bạn chỉ có một bạn là học sinh, mà cả Amy và John đều không phải là học sinh.\nDo đó, Peter chính là học sinh.\n(Kiểm tra lại: Peter là học sinh, Peter lớn hơn người lính ⇒ Peter > lính; Amy > học sinh (Peter) ⇒ Amy là thương nhân, Peter là học sinh, John là người lính, hoàn toàn phù hợp)."
      },
      {
        "id": 102,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, which symbol should be the 28th one starting from the left?\n○, ○, ○, △, □, ○, ○, ○, △, □, ○, ○, ○, △, □, ...",
        "questionVi": "Dựa vào quy luật dưới đây, ký hiệu thứ 28 tính từ bên trái sang là ký hiệu nào?\n○, ○, ○, △, □, ○, ○, ○, △, □, ○, ○, ○, △, □, ...",
        "vocab": "Pattern: Quy luật; Symbol: Ký hiệu; From the left: Từ bên trái.",
        "image": "images/de5_q2_pattern.png",
        "answer": "Hình tròn (○)",
        "acceptableAnswers": [
          "Hình tròn (○)",
          "Hình tròn",
          "○",
          "hình tròn",
          "hinh tron",
          "tròn"
        ],
        "unit": "",
        "hint": "Phương pháp phân tích chu kỳ tuần hoàn qua phép chia có dư.",
        "solution": "Quan sát dãy ký hiệu lặp lại theo chu kỳ 5 hình: (○, ○, ○, △, □).\nTrong đó: 3 hình đầu tiên là hình tròn (○), hình thứ 4 là hình tam giác (△), hình thứ 5 là hình vuông (□).\nThực hiện phép chia tìm chu kỳ:\n28 ÷ 5 = 5 (dư 3).\nSố dư là 3, do đó ký hiệu thứ 28 là ký hiệu thứ 3 trong chu kỳ lặp lại.\nKý hiệu thứ 3 của chu kỳ là hình tròn (○)."
      },
      {
        "id": 103,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Amy bought a pair of beautiful shoes. Her classmates never saw this pair of shoes before and they start guessing. Peter said that \"Your shoes are not red.\" John said that \"Your shoes are either yellow or black.\" Andy said that \"Your shoes must be black.\" Within the point of view of these 3 people, two of them are correct and one of them is wrong. What colour are Amy's shoes?",
        "questionVi": "Amy mua một đôi giày rất đẹp. Các bạn cùng lớp chưa từng thấy đôi giày này bao giờ nên bắt đầu đoán. Peter nói: \"Đôi giày của cậu không phải màu đỏ.\" John nói: \"Đôi giày của cậu là màu vàng hoặc màu đen.\" Andy nói: \"Đôi giày của cậu chắc chắn là màu đen.\" Biết rằng trong ý kiến của ba bạn, có hai bạn nói đúng và một bạn nói sai. Hỏi đôi giày của Amy có màu gì?",
        "vocab": "Guess: Đoán; Either yellow or black: Vàng hoặc đen; Correct: Đúng; Wrong: Sai; Colour: Màu sắc.",
        "image": null,
        "answer": "Màu vàng (Yellow)",
        "acceptableAnswers": [
          "Màu vàng (Yellow)",
          "Màu vàng",
          "Vàng",
          "vàng",
          "Yellow",
          "yellow",
          "mau vang"
        ],
        "unit": "",
        "hint": "Phương pháp phản chứng giả thiết tạm phân tích mệnh đề logic.",
        "solution": "Xét lời nói của Andy (\"Giày màu đen\") và John (\"Giày màu vàng hoặc màu đen\"):\n- Giả sử Andy nói đúng, tức là đôi giày màu đen:\n* Khi đó John nói \"giày màu vàng hoặc màu đen\" cũng ĐÚNG.\n* Peter nói \"giày không phải màu đỏ\" cũng ĐÚNG (vì màu đen không phải đỏ).\nNhư vậy cả ba người đều nói đúng, mâu thuẫn với đề bài (chỉ có đúng 2 người nói đúng và 1 người nói sai).\n- Do đó, giả sử trên là sai ⇒ Andy nói SAI!\nVì Andy nói sai nên đôi giày KHÔNG PHẢI MÀU ĐEN.\n- Vì chỉ có 1 người nói sai (là Andy) nên John và Peter đều nói ĐÚNG:\n* John nói đúng: \"Giày màu vàng hoặc màu đen\". Mà giày không phải màu đen, nên giày bắt buộc phải là MÀU VÀNG.\n* Kiểm tra lại lời Peter: Màu vàng không phải màu đỏ (Đúng).\nVậy đôi giày của Amy có màu vàng (Yellow)."
      },
      {
        "id": 104,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 3-digit number on a piece of paper and asked Peter to guess it.\nPeter asked: \"Is the number 892?\" John replied: \"One of the digits is correct, the position of that digit is also correct.\"\nPeter asked again: \"Is the number 178?\" John replied: \"Two digits are correct, but the positions of those digits are both wrong.\"\nPeter asked again: \"Is the number 785?\" John said: \"All three digits are correct, but the digits are all in the wrong places.\"\nWhat is the number written by John?",
        "questionVi": "John viết một số có 3 chữ số ra giấy và đố Peter đoán số đó.\nPeter đoán: \"Có phải số 892 không?\" John đáp: \"Có 1 chữ số đúng và đúng vị trí.\"\nPeter đoán lại: \"Có phải số 178 không?\" John đáp: \"Có 2 chữ số đúng nhưng cả hai đều sai vị trí.\"\nPeter đoán tiếp: \"Có phải số 785 không?\" John nói: \"Cả 3 chữ số đều đúng, nhưng tất cả đều sai vị trí.\"\nHỏi John đã viết số nào?",
        "vocab": "3-digit number: Số có 3 chữ số; Digit: Chữ số; Correct: Đúng; Wrong: Sai; Position: Vị trí.",
        "image": null,
        "answer": "857",
        "acceptableAnswers": [
          "857",
          "857"
        ],
        "unit": "",
        "hint": "Phương pháp suy luận loại trừ vị trí từng chữ số.",
        "solution": "Phân tích từ lượt đoán thứ ba (785):\n1) Cả 3 chữ số của số 785 đều đúng, nên tập hợp 3 chữ số của số cần tìm là {5, 7, 8}.\n2) Xét lượt đoán thứ nhất (892):\n- Trong các chữ số {8, 9, 2}, chỉ có chữ số 8 thuộc tập {5, 7, 8}.\n- Đề bài cho biết có 1 chữ số đúng và đúng vị trí, do đó chữ số 8 đứng ở hàng trăm là chữ số đúng vị trí!\nSố cần tìm có dạng: 8 _ _ .\n3) Xét hai chữ số còn lại là 7 và 5 cho hàng chục và hàng đơn vị:\n- Ở lượt đoán thứ ba (785), cả 3 chữ số đều sai vị trí. Trong đó chữ số 5 đứng ở hàng đơn vị nhưng bị sai vị trí.\n- Vì 5 không thể ở hàng đơn vị và hàng trăm đã là 8, nên chữ số 5 bắt buộc phải ở hàng chục.\n- Do đó chữ số 7 bắt buộc phải ở hàng đơn vị.\nVậy số John đã viết là: 857."
      },
      {
        "id": 105,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, how many circles are there in the 10th group?",
        "questionVi": "Dựa vào quy luật dưới đây, có bao nhiêu hình tròn ở nhóm thứ 10?",
        "vocab": "Pattern: Quy luật; Circle: Hình tròn; 10th Group: Nhóm thứ 10.",
        "image": null,
        "answer": "55",
        "acceptableAnswers": [
          "55",
          "55"
        ],
        "unit": "",
        "hint": "Quy luật tổng các số tự nhiên liên tiếp (Số tam giác - Triangular Numbers).",
        "solution": "Đếm số lượng hình tròn trong từng nhóm:\n- Nhóm 1: có 1 hình tròn (1)\n- Nhóm 2: có 1 + 2 = 3 hình tròn\n- Nhóm 3: có 1 + 2 + 3 = 6 hình tròn\n- Nhóm 4: có 1 + 2 + 3 + 4 = 10 hình tròn\nQuy luật: Số lượng hình tròn ở nhóm thứ n bằng tổng từ 1 đến n.\nSố lượng hình tròn ở nhóm thứ 10 là:\n1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10\n= (1 + 9) + (2 + 8) + (3 + 7) + (4 + 6) + 10 + 5\n= 10 + 10 + 10 + 10 + 10 + 5 = 55 (hình tròn)."
      },
      {
        "id": 106,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 366 + 978 – 166 + 22.",
        "questionVi": "Tính giá trị của biểu thức: 366 + 978 – 166 + 22.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1200",
        "acceptableAnswers": [
          "1200",
          "1200"
        ],
        "unit": "",
        "hint": "Phương pháp kết hợp số hạng tạo số tròn trăm, tròn nghìn.",
        "solution": "Nhóm các số hạng một cách hợp lý:\n366 + 978 – 166 + 22\n= (366 – 166) + (978 + 22)\n= 200 + 1000\n= 1200."
      },
      {
        "id": 107,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 13 + 14 + 15 + 16 + 17.",
        "questionVi": "Tính giá trị của biểu thức: 13 + 14 + 15 + 16 + 17.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "75",
        "acceptableAnswers": [
          "75",
          "75"
        ],
        "unit": "",
        "hint": "Phương pháp dùng số trung bình cộng (số chính giữa) của dãy số lẻ phần tử.",
        "solution": "Cách 1: Ghép cặp đối xứng quanh số trung vị 15:\n13 + 14 + 15 + 16 + 17\n= (13 + 17) + (14 + 16) + 15\n= 30 + 30 + 15\n= 60 + 15 = 75.\nCách 2: Dãy gồm 5 số tự nhiên liên tiếp, tổng bằng số chính giữa nhân với 5:\n15 × 5 = 75."
      },
      {
        "id": 108,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20.",
        "questionVi": "Tính giá trị của biểu thức: 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "110",
        "acceptableAnswers": [
          "110",
          "110"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp số chẵn tròn chục.",
        "solution": "Ghép các cặp số có tổng bằng 20 hoặc 30:\n2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20\n= (2 + 18) + (4 + 16) + (6 + 14) + (8 + 12) + 10 + 20\n= 20 + 20 + 20 + 20 + 10 + 20\n= 20 × 5 + 10 = 100 + 10 = 110."
      },
      {
        "id": 109,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1 – 2 + 3 – 4 + 5 – 6 + 7 – 8 + 9 – 10 + 11.",
        "questionVi": "Tính giá trị của biểu thức: 1 – 2 + 3 – 4 + 5 – 6 + 7 – 8 + 9 – 10 + 11.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6",
          "6"
        ],
        "unit": "",
        "hint": "Phương pháp sắp xếp lại thứ tự phép tính hoặc tính từ cuối lên.",
        "solution": "Cách 1: Nhóm số dương đầu và các hiệu xen kẽ:\n1 – 2 + 3 – 4 + 5 – 6 + 7 – 8 + 9 – 10 + 11\n= 1 + (3 – 2) + (5 – 4) + (7 – 6) + (9 – 8) + (11 – 10)\n= 1 + 1 + 1 + 1 + 1 + 1\n= 6.\nCách 2: Tách thành tổng các số lẻ trừ tổng các số chẵn:\n(1 + 3 + 5 + 7 + 9 + 11) – (2 + 4 + 6 + 8 + 10) = 36 – 30 = 6."
      },
      {
        "id": 110,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "If A and B are both 1-digit numbers, what is the value of A if AB + A = 100?",
        "questionVi": "Nếu A và B đều là các chữ số có 1 chữ số, hỏi giá trị của A là bao nhiêu nếu AB + A = 100?",
        "vocab": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9",
          "9"
        ],
        "unit": "",
        "hint": "Phân tích cấu tạo số và chặn giá trị.",
        "solution": "Phân tích cấu tạo số AB:\nAB = 10 × A + B.\nDo đó:\nAB + A = 10 × A + B + A = 11 × A + B = 100.\nVì B là chữ số nên 0 ≤ B ≤ 9.\nSuy ra: 100 – 9 ≤ 11 × A ≤ 100 ⇒ 91 ≤ 11 × A ≤ 100.\nSố chia hết cho 11 nằm giữa 91 và 100 là 99 (với 11 × 9 = 99).\nDo đó: A = 9.\nKhi đó: B = 100 – 99 = 1 (thử lại: 91 + 9 = 100, chính xác).\nVậy giá trị của A là 9."
      },
      {
        "id": 111,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Amy has 42 apples and John has 26 apples. How many apples does Amy have to give John to make them have the same number of apples?",
        "questionVi": "Amy có 42 quả táo và John có 26 quả táo. Hỏi Amy phải cho John bao nhiêu quả táo để hai bạn có số táo bằng nhau?",
        "vocab": "Apple: Quả táo; Give: Cho; The same number of: Có cùng số lượng.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8",
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp giải toán cho nhận giữ nguyên tổng số lượng.",
        "solution": "Tổng số táo của hai bạn là:\n42 + 26 = 68 (quả táo).\nKhi hai bạn có số táo bằng nhau, mỗi bạn có:\n68 ÷ 2 = 34 (quả táo).\nSố táo Amy phải cho John là:\n42 – 34 = 8 (quả táo).\n(Hoặc tính theo hiệu ban đầu: (42 – 26) ÷ 2 = 16 ÷ 2 = 8 quả)."
      },
      {
        "id": 112,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Andy has 26 marbles. He divides them into 4 piles so that each pile has a different number of marbles. Find the smallest possible number of marbles in the biggest pile.",
        "questionVi": "Andy có 26 viên bi. Bạn chia thành 4 đống sao cho số bi ở mỗi đống là khác nhau. Tìm số viên bi nhỏ nhất có thể có ở đống có nhiều bi nhất.",
        "vocab": "Marble: Viên bi; Divide into: Chia ra; Different number of: Số lượng khác nhau; Smallest possible: Nhỏ nhất có thể; Biggest pile: Đống lớn nhất.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8",
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp phân hoạch số thành các số tự nhiên liên tiếp tăng dần.",
        "solution": "Để đống lớn nhất có số bi ít nhất có thể, số bi ở 4 đống phải gần nhau nhất, tức là các số tự nhiên liên tiếp tăng dần:\nThử phân tích 26 thành tổng 4 số liên tiếp:\n5 + 6 + 7 + 8 = 26.\nBốn số này hoàn toàn khác nhau và có tổng đúng bằng 26.\nĐống có nhiều bi nhất trong phân hoạch này có 8 viên bi.\nNếu đống lớn nhất có 7 viên bi thì tổng 4 đống tối đa chỉ là 4 + 5 + 6 + 7 = 22 < 26 (không đủ bi).\nVậy số bi nhỏ nhất có thể ở đống lớn nhất là 8 viên."
      },
      {
        "id": 113,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "John has a pack of marbles: 5 red, 5 blue and 6 brown. He wants to get 2 marbles of same colors without looking. What is the smallest number of marbles he needs to take out to make sure that he gets what he wants?",
        "questionVi": "John có một túi bi gồm: 5 viên đỏ, 5 viên xanh và 6 viên nâu. Bạn muốn lấy ra 2 viên bi cùng màu mà không nhìn vào túi. Hỏi bạn phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có 2 viên cùng màu?",
        "vocab": "Without looking: Không nhìn; Smallest number: Số lượng nhỏ nhất; Take out: Lấy ra; Make sure: Chắc chắn.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4",
          "4"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet (Trường hợp xấu nhất).",
        "solution": "Trong túi có tất cả 3 loại màu sắc khác nhau: Đỏ, Xanh và Nâu.\nXét trường hợp xấu nhất: John lấy ra các viên bi mà không có hai viên nào cùng màu.\nKhi đó, mỗi màu John chỉ lấy được nhiều nhất 1 viên:\n- 1 viên màu đỏ\n- 1 viên màu xanh\n- 1 viên màu nâu\nTổng cộng đã lấy: 1 + 1 + 1 = 3 viên bi (cả 3 viên đều khác màu nhau).\nKhi lấy thêm viên bi thứ 4, viên bi này bắt buộc phải trùng màu với một trong ba màu đã lấy trước đó.\nVậy John cần lấy ra ít nhất: 3 + 1 = 4 viên bi để chắc chắn có 2 viên cùng màu."
      },
      {
        "id": 114,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The numbers below follow the Fibonacci sequence, what is the next number?\n1, 1, 2, 3, 5, 8, 13, ...",
        "questionVi": "Các số dưới đây tuân theo quy luật dãy số Fibonacci, hỏi số tiếp theo là số nào?\n1, 1, 2, 3, 5, 8, 13, ...",
        "vocab": "Fibonacci sequence: Dãy số Fibonacci; Next number: Số tiếp theo.",
        "image": null,
        "answer": "21",
        "acceptableAnswers": [
          "21",
          "21"
        ],
        "unit": "",
        "hint": "Quy luật dãy Fibonacci (Số đứng sau bằng tổng hai số liền trước).",
        "solution": "Trong dãy Fibonacci, kể từ số hạng thứ ba, mỗi số hạng đều bằng tổng của hai số hạng đứng ngay trước nó:\n- 1 + 1 = 2\n- 1 + 2 = 3\n- 2 + 3 = 5\n- 3 + 5 = 8\n- 5 + 8 = 13\nDo đó, số tiếp theo của dãy là:\n8 + 13 = 21."
      },
      {
        "id": 115,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the largest 2-digit number that can be divisible by 4 and 6?",
        "questionVi": "Số lớn nhất có 2 chữ số chia hết cho cả 4 và 6 là số nào?",
        "vocab": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho.",
        "image": null,
        "answer": "96",
        "acceptableAnswers": [
          "96",
          "96"
        ],
        "unit": "",
        "hint": "Bội chung nhỏ nhất và tìm bội số lớn nhất có 2 chữ số.",
        "solution": "Số chia hết cho cả 4 và 6 là bội chung của 4 và 6.\nBội chung nhỏ nhất của 4 và 6 là 12.\nTa tìm bội số lớn nhất của 12 có 2 chữ số:\n12 × 8 = 96\n12 × 9 = 108 (số có 3 chữ số).\nVậy số lớn nhất có 2 chữ số chia hết cho cả 4 và 6 là 96."
      },
      {
        "id": 116,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many obtuse angle(s) could a triangle contain?",
        "questionVi": "Một hình tam giác có thể chứa nhiều nhất bao nhiêu góc tù?",
        "vocab": "Obtuse angle: Góc tù; Triangle: Hình tam giác.",
        "image": null,
        "answer": "1",
        "acceptableAnswers": [
          "1",
          "1"
        ],
        "unit": "",
        "hint": "Định lý tổng ba góc trong tam giác bằng 180°.",
        "solution": "Một góc tù là góc có số đo lớn hơn 90° (góc tù > 90°).\nTổng ba góc trong một hình tam giác luôn luôn bằng 180°.\nNếu một hình tam giác có từ 2 góc tù trở lên thì tổng hai góc đó đã lớn hơn 180° (90° + 90° = 180°), không thể tạo thành hình tam giác.\nDo đó, một hình tam giác chỉ có thể chứa nhiều nhất 1 góc tù."
      },
      {
        "id": 117,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many cubes are there in the figure below?",
        "questionVi": "Có bao nhiêu khối lập phương trong hình vẽ dưới đây?",
        "vocab": "Cube: Khối lập phương; Figure: Hình vẽ.",
        "image": "images/de5_q17_cubes.png",
        "answer": "8",
        "acceptableAnswers": [
          "8",
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp đếm khối lập phương phân tầng từ dưới lên trên.",
        "solution": "Đếm các khối lập phương theo từng tầng của mô hình:\n- Tầng 1 (tầng đáy): có 6 khối lập phương.\n- Tầng 2 (tầng giữa): có 2 khối lập phương xếp chồng lên.\nTổng số khối lập phương trong hình vẽ là:\n6 + 2 = 8 (khối lập phương)."
      },
      {
        "id": 118,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many triangles are there in the figure below?",
        "questionVi": "Có bao nhiêu hình tam giác trong hình vẽ dưới đây?",
        "vocab": "Triangle: Hình tam giác; Figure: Hình vẽ.",
        "image": "images/de5_q18_triangles.png",
        "answer": "27",
        "acceptableAnswers": [
          "27",
          "27"
        ],
        "unit": "",
        "hint": "Phương pháp phân loại đếm tam giác theo kích thước phân cấp.",
        "solution": "Hình vẽ là một tam giác đều lớn được chia thành các tam giác đều nhỏ (mỗi cạnh gồm 4 đoạn đơn vị):\n1) Tam giác kích thước 1 đơn vị: có 1 + 3 + 5 + 7 = 16 (tam giác nhỏ).\n2) Tam giác kích thước 2 đơn vị (ghép từ 4 tam giác nhỏ):\n- Hướng đỉnh lên trên: 6 hình tam giác.\n- Hướng đỉnh xuống dưới: 1 hình tam giác ở giữa.\nTổng cộng: 6 + 1 = 7 hình.\n3) Tam giác kích thước 3 đơn vị (ghép từ 9 tam giác nhỏ):\n- Có 3 hình tam giác hướng đỉnh lên trên.\n4) Tam giác kích thước 4 đơn vị (toàn bộ hình tam giác lớn):\n- Có 1 hình tam giác.\nTổng số hình tam giác có trong hình vẽ là:\n16 + 7 + 3 + 1 = 27 (hình tam giác)."
      },
      {
        "id": 119,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A prism has 23 faces, how many edges does it have?",
        "questionVi": "Một hình lăng trụ có 23 mặt. Hỏi hình lăng trụ đó có bao nhiêu cạnh?",
        "vocab": "Prism: Hình lăng trụ; Face: Mặt; Edge: Cạnh.",
        "image": null,
        "answer": "63",
        "acceptableAnswers": [
          "63",
          "63"
        ],
        "unit": "",
        "hint": "Công thức quan hệ giữa số mặt và số cạnh của hình lăng trụ.",
        "solution": "Một hình lăng trụ n-giác có:\n- Số mặt = n + 2 (gồm n mặt bên và 2 mặt đáy).\nTheo đề bài: n + 2 = 23 ⇒ n = 23 – 2 = 21 (hai đáy là hình đa giác có 21 cạnh).\nSố cạnh của hình lăng trụ n-giác gồm:\n- 2 × n cạnh đáy (đáy trên và đáy dưới)\n- n cạnh bên nối hai đáy\nTổng số cạnh = 3 × n.\nVới n = 21, số cạnh của hình lăng trụ là:\n3 × 21 = 63 (cạnh)."
      },
      {
        "id": 120,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many squares are there in the figure below?",
        "questionVi": "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "vocab": "Square: Hình vuông; Figure: Hình vẽ.",
        "image": "images/de5_q20_squares.png",
        "answer": "26",
        "acceptableAnswers": [
          "26",
          "26"
        ],
        "unit": "",
        "hint": "Công thức đếm hình vuông trong lưới ô chữ nhật m × n.",
        "solution": "Lưới hình chữ nhật có kích thước 3 hàng × 5 cột ô vuông đơn vị:\n1) Hình vuông kích thước 1×1: có 3 × 5 = 15 (hình vuông).\n2) Hình vuông kích thước 2×2: có (3 – 1) × (5 – 1) = 2 × 4 = 8 (hình vuông).\n3) Hình vuông kích thước 3×3: có (3 – 2) × (5 – 2) = 1 × 3 = 3 (hình vuông).\nTổng số hình vuông trong hình vẽ là:\n15 + 8 + 3 = 26 (hình vuông)."
      },
      {
        "id": 121,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "After Amy gives 4 apples to Andy, they have same number of apples. How many apples more did Amy have than that of Andy originally?",
        "questionVi": "Sau khi Amy cho Andy 4 quả táo thì hai bạn có số táo bằng nhau. Hỏi ban đầu Amy có nhiều hơn Andy bao nhiêu quả táo?",
        "vocab": "Give: Cho; The same number of: Có cùng số lượng; More than: Nhiều hơn; Originally: Ban đầu.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8",
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp giải toán cho nhận (Hiệu số lượng gấp đôi số lượng cho).",
        "solution": "Khi Amy cho Andy 4 quả táo:\n- Số táo của Amy giảm đi 4 quả.\n- Số táo của Andy tăng thêm 4 quả.\nKhoảng cách chênh lệch giữa hai bạn giảm đi: 4 + 4 = 8 quả.\nVì sau khi cho số táo của hai bạn bằng nhau, nên ban đầu số táo của Amy nhiều hơn Andy đúng bằng lượng chênh lệch đó:\n4 × 2 = 8 (quả táo)."
      },
      {
        "id": 122,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 numbers, without repetition, from 1, 4, 5, 7, 8 to form a 2-digit number. How many even numbers are there?",
        "questionVi": "Chọn 2 chữ số khác nhau từ 1, 4, 5, 7, 8 để lập thành số có 2 chữ số. Hỏi có bao nhiêu số chẵn được tạo thành?",
        "vocab": "Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Even number: Số chẵn.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8",
          "8"
        ],
        "unit": "",
        "hint": "Quy tắc nhân đếm số chẵn.",
        "solution": "Gọi số chẵn có 2 chữ số cần lập là ab (a ≠ b; a, b ∈ {1, 4, 5, 7, 8}).\n- Bước 1: Để số là số chẵn, chữ số hàng đơn vị b phải là số chẵn: b ∈ {4, 8} (có 2 cách chọn b).\n- Bước 2: Chữ số hàng chục a được chọn từ các chữ số còn lại khác b: trong 5 chữ số bỏ đi chữ số b đã chọn, còn lại 4 chữ số (4 cách chọn a).\nTheo quy tắc nhân, số lượng số chẵn lập được là:\n2 × 4 = 8 (số)."
      },
      {
        "id": 123,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are 4 ways from school to train station and there are 5 ways from the train station to the library. How many different ways are there from school to the library through the train station?",
        "questionVi": "Có 4 con đường từ trường học đến ga tàu hỏa và có 5 con đường từ ga tàu hỏa đến thư viện. Hỏi có bao nhiêu con đường khác nhau đi từ trường học đến thư viện qua ga tàu hỏa?",
        "vocab": "Way: Con đường/Cách; Train station: Ga tàu; Library: Thư viện; Different ways: Con đường khác nhau.",
        "image": null,
        "answer": "20",
        "acceptableAnswers": [
          "20",
          "20"
        ],
        "unit": "",
        "hint": "Quy tắc nhân cho hai công đoạn liên tiếp.",
        "solution": "Quá trình đi từ trường học đến thư viện gồm 2 chặng liên tiếp:\n- Chặng 1 (Trường học → Ga tàu hỏa): có 4 cách đi.\n- Chặng 2 (Ga tàu hỏa → Thư viện): có 5 cách đi.\nÁp dụng quy tắc nhân, tổng số cách đi khác nhau là:\n4 × 5 = 20 (cách)."
      },
      {
        "id": 124,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "What is the smallest 5-digit number by using 3, 7, 1, 8 and 9? (Each digit can be used once).",
        "questionVi": "Số nhỏ nhất có 5 chữ số lập từ các chữ số 3, 7, 1, 8 và 9 là số nào? (Mỗi chữ số chỉ được dùng một lần).",
        "vocab": "Smallest 5-digit number: Số có 5 chữ số nhỏ nhất; Each digit can be used once: Mỗi chữ số chỉ được dùng một lần.",
        "image": null,
        "answer": "13789",
        "acceptableAnswers": [
          "13789",
          "13789"
        ],
        "unit": "",
        "hint": "Nguyên tắc sắp xếp các chữ số tăng dần để tạo số nhỏ nhất.",
        "solution": "Để tạo thành số nhỏ nhất có 5 chữ số từ các chữ số {1, 3, 7, 8, 9}:\nTa sắp xếp các chữ số theo thứ tự tăng dần từ hàng cao nhất (hàng vạn) đến hàng thấp nhất (hàng đơn vị):\n- Hàng vạn: 1\n- Hàng nghìn: 3\n- Hàng trăm: 7\n- Hàng chục: 8\n- Hàng đơn vị: 9\nSố nhỏ nhất lập được là: 13789."
      },
      {
        "id": 125,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 numbers, without repetition, from 0, 3, 5, 6, 9 to form a two-digit number. How many numbers with a digit '6' are there?",
        "questionVi": "Chọn 2 chữ số khác nhau từ 0, 3, 5, 6, 9 để lập thành số có 2 chữ số. Hỏi có bao nhiêu số có chứa chữ số '6'?",
        "vocab": "Without repetition: Không lặp lại; Two-digit number: Số có 2 chữ số; Digit: Chữ số.",
        "image": null,
        "answer": "7",
        "acceptableAnswers": [
          "7",
          "7"
        ],
        "unit": "",
        "hint": "Phương pháp chia trường hợp vị trí của chữ số đặc biệt.",
        "solution": "Số có 2 chữ số có dạng ab (a ≠ 0; a, b phân biệt thuộc {0, 3, 5, 6, 9}).\nSố có chứa chữ số 6 xảy ra trong 2 trường hợp:\n- Trường hợp 1: Chữ số 6 đứng ở hàng chục (a = 6):\nKhi đó chữ số hàng đơn vị b có thể chọn từ {0, 3, 5, 9} (có 4 cách chọn b).\nCác số lập được là: 60, 63, 65, 69 (4 số).\n- Trường hợp 2: Chữ số 6 đứng ở hàng đơn vị (b = 6):\nKhi đó chữ số hàng chục a có thể chọn từ {3, 5, 9} (vì a ≠ 0, có 3 cách chọn a).\nCác số lập được là: 36, 56, 96 (3 số).\nTổng cộng số lượng các số có chứa chữ số 6 là:\n4 + 3 = 7 (số)."
      }
    ]
  }
];
