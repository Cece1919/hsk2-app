// Dữ liệu 5 Đề Thi Thử Vòng Chung Kết Quốc Gia TIMO Khối 4 (2016 – 2021)
// Hệ Thống Giáo Dục CLB Toán M32 - Thầy Trần Xuân Thắng

const TIMO_MOCK_EXAMS = [
  {
    "id": "heat_de1",
    "title": "Đề số 1: VCK Quốc gia (2020 – 2021)",
    "titleEn": "Paper 1: National Final Heat Round (2020 – 2021)",
    "year": "2020 – 2021",
    "grade": "Khối 4 / Grade 4",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "color": "blue",
        "range": [
          1,
          5
        ]
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "color": "emerald",
        "range": [
          6,
          10
        ]
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "color": "purple",
        "range": [
          11,
          15
        ]
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "color": "amber",
        "range": [
          16,
          20
        ]
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "color": "rose",
        "range": [
          21,
          25
        ]
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
        "questionEn": "This month is March. Which month will it be 184 months later?",
        "questionVi": "Tháng này là Tháng Ba. Hỏi 184 tháng sau là tháng mấy?",
        "vocab": "March: Tháng 3; Later: Sau.",
        "image": null,
        "answer": "July (Tháng 7)",
        "acceptableAnswers": [
          "July (Tháng 7)",
          "July",
          "Tháng 7",
          "Thang 7",
          "7",
          "july",
          "tháng 7",
          "thang 7"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ tháng trong năm (Lấy số dư theo modulo 12).",
        "solution": "Một năm có 12 tháng. Thực hiện phép chia lấy số năm và số tháng dư:\n184 ÷ 12 = 15 (năm, dư 4 tháng)\nSau đúng 15 năm tròn, tháng đó vẫn là Tháng Ba.\nCộng thêm 4 tháng dư nữa, tháng cần tìm là:\n3 + 4 = 7 (Tháng Bảy / July)."
      },
      {
        "id": 2,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many triangle(s) is / are there from the 1st to the 300th symbol counting from the left?\n○ ○ △ ○ ○ △ □ ○ ○ △ ○ ○ △ □ …",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tam giác từ hình thứ 1 đến hình thứ 300 tính từ trái sang phải?\n○ ○ △ ○ ○ △ □ ○ ○ △ ○ ○ △ □ …",
        "vocab": "Pattern: Quy luật; Triangles: Hình tam giác; Symbol: Kí hiệu; Counting from the left: Tính từ bên trái.",
        "image": null,
        "answer": "86",
        "acceptableAnswers": [
          "86"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ hình học và Đếm theo nhóm tuần hoàn.",
        "solution": "Nhận xét quy luật dãy hình vẽ:\nDãy lặp lại theo nhóm chu kỳ gồm 7 hình: (○, ○, △, ○, ○, △, □).\nTrong mỗi nhóm chu kỳ 7 hình có đúng 2 hình tam giác (△) ở vị trí thứ 3 và thứ 6.\nThực hiện phép chia tìm số chu kỳ trong 300 hình đầu tiên:\n300 ÷ 7 = 42 (nhóm chu kỳ, dư 6 hình)\nSau 42 nhóm chu kỳ, 6 hình tiếp theo là: ○, ○, △, ○, ○, △ (gồm thêm 2 hình tam giác nữa).\nTổng số hình tam giác có trong 300 hình đầu tiên là:\n42 × 2 + 2 = 84 + 2 = 86 (hình tam giác)."
      },
      {
        "id": 3,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are a total of 36 chickens and rabbits in a farm. The animals have a total of 96 legs. How many rabbit(s) is / are there?",
        "questionVi": "Trong trang trại có tổng cộng 36 con gà và thỏ. Tổng số chân của các con vật là 96 chân. Hỏi có bao nhiêu con thỏ?",
        "vocab": "Total: Tổng số; Chickens: Con gà; Rabbits: Con thỏ; Legs: Chân.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán gà và thỏ).",
        "solution": "Áp dụng phương pháp Giả thiết tạm:\nGiả sử cả 36 con đều là gà (mỗi con gà có 2 chân).\nTổng số chân khi đó là:\n36 × 2 = 72 (chân)\nSố chân bị hụt so với thực tế là:\n96 – 72 = 24 (chân)\nMỗi con thỏ nhiều hơn mỗi con gà số chân là:\n4 – 2 = 2 (chân)\nSố con thỏ là:\n24 ÷ 2 = 12 (con thỏ)."
      },
      {
        "id": 4,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Betty now has a few coins. If the number of coins minuses 13, then is divided by 10, adds 3 and is multiplied by 7. The result will be 91. How many coins does Betty have?",
        "questionVi": "Betty hiện có một số đồng xu. Nếu lấy số đồng xu đó trừ đi 13, rồi chia cho 10, cộng thêm 3 và nhân với 7 thì được kết quả là 91. Hỏi Betty có bao nhiêu đồng xu?",
        "vocab": "Minuses: Trừ; Divided: Chia; Adds: Cộng; Multiplied: Nhân; Result: Kết quả; Coins: Đồng xu.",
        "image": null,
        "answer": "113",
        "acceptableAnswers": [
          "113"
        ],
        "unit": "",
        "hint": "Phương pháp Tính ngược từ cuối (Working backwards).",
        "solution": "Áp dụng phương pháp tính ngược từ cuối:\n+ Trước khi nhân với 7, kết quả là:\n91 ÷ 7 = 13\n+ Trước khi cộng thêm 3, kết quả là:\n13 – 3 = 10\n+ Trước khi chia cho 10, kết quả là:\n10 × 10 = 100\n+ Trước khi trừ đi 13, số đồng xu của Betty là:\n100 + 13 = 113 (đồng xu)."
      },
      {
        "id": 5,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many ＃ is / are there in the 9th group?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu dấu thăng ＃ ở hình thứ 9?",
        "vocab": "Pattern: Quy luật; 9th group: Hình thứ 9.",
        "image": "images/de5_q05.png",
        "answer": "84",
        "acceptableAnswers": [
          "84"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm quy luật chu vi hình học mở rộng.",
        "solution": "Quan sát quy luật số lượng dấu thăng ＃:\n- Hình 1: khung 2 × 2\n- Hình 2: khung 4 × 4 (4 = 2 × 2)\n- Hình 3: khung 6 × 6 (6 = 2 × 3)\n- Hình 9: khung 18 × 18 (18 = 2 × 9)\nSố dấu ＃ nằm trên 4 cạnh ngoài của khung hình vuông kích thước 18 × 18 là:\n18 × 2 + (18 – 2) × 2 + (18 – 2) = 36 + 32 + 16 = 84 (dấu ＃)."
      },
      {
        "id": 6,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 26 ÷ 7 + 37 ÷ 7 – 10 ÷ 7 + 3 ÷ 7.",
        "questionVi": "Tính giá trị của biểu thức: 26 ÷ 7 + 37 ÷ 7 – 10 ÷ 7 + 3 ÷ 7.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp Đặt thừa số chung đối với phép chia.",
        "solution": "Áp dụng tính chất phân phối của phép chia đối với phép cộng và phép trừ:\n26 ÷ 7 + 37 ÷ 7 – 10 ÷ 7 + 3 ÷ 7\n= (26 + 37 – 10 + 3) ÷ 7\n= 56 ÷ 7\n= 8."
      },
      {
        "id": 7,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 81 × 6 + 9 × 31 – 3 × 26.",
        "questionVi": "Tính giá trị của biểu thức: 81 × 6 + 9 × 31 – 3 × 26.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "687",
        "acceptableAnswers": [
          "687"
        ],
        "unit": "",
        "hint": "Phương pháp Tách và ghép thừa số chung (Tính chất phân phối).",
        "solution": "Tách các thừa số để xuất hiện các nhân tử chung thuận tiện:\n81 × 6 + 9 × 31 – 3 × 26\n= 81 × 6 + (6 + 3) × 31 – 3 × 26\n= 6 × (81 + 31) + 3 × (31 – 26)\n= 6 × 112 + 3 × 5\n= 672 + 15\n= 687."
      },
      {
        "id": 8,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2020 ÷ 18 × 15 × 24 ÷ 100.",
        "questionVi": "Tính giá trị của biểu thức: 2020 ÷ 18 × 15 × 24 ÷ 100.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "404",
        "acceptableAnswers": [
          "404"
        ],
        "unit": "",
        "hint": "Phương pháp Rút gọn phân số và giản ước tích các số.",
        "solution": "Biến đổi biểu thức và rút gọn các thừa số:\n2020 ÷ 18 × 15 × 24 ÷ 100\n= (2020 × 15 × 24) ÷ (18 × 100)\n= (2020 × 360) ÷ 1800\n= 2020 ÷ 5\n= 404."
      },
      {
        "id": 9,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 34 + 41 + 48 + 55 + 62 + 69 + 76 + 83 + 90 + 97.",
        "questionVi": "Tính giá trị của tổng: 34 + 41 + 48 + 55 + 62 + 69 + 76 + 83 + 90 + 97.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "655",
        "acceptableAnswers": [
          "655"
        ],
        "unit": "",
        "hint": "Phương pháp Tính tổng dãy số cách đều.",
        "solution": "Đây là tổng của 10 số hạng cách đều nhau 7 đơn vị.\nTổng của dãy số là:\n(34 + 97) × 10 ÷ 2 = 131 × 5 = 655."
      },
      {
        "id": 10,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Using the method of 2S – S = S, find the value of 7 + 14 + 28 + ... + 896.",
        "questionVi": "Sử dụng phương pháp 2S – S = S, hãy tính giá trị của tổng: 7 + 14 + 28 + ... + 896.",
        "vocab": "Method: Phương pháp; Value: Giá trị.",
        "image": null,
        "answer": "1785",
        "acceptableAnswers": [
          "1785"
        ],
        "unit": "",
        "hint": "Phương pháp Nhân đôi triệt tiêu (Phương pháp 2S – S).",
        "solution": "Đặt S = 7 + 14 + 28 + 56 + ... + 896.\nNhân cả hai vế với 2:\n2S = 14 + 28 + 56 + ... + 896 + 1792\nLấy 2S trừ đi S:\nS = 2S – S = (14 + 28 + ... + 1792) – (7 + 14 + ... + 896)\nS = 1792 – 7 = 1785."
      },
      {
        "id": 11,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of 9 consecutive odd numbers is 1035. Find the value of the largest number.",
        "questionVi": "Tổng của 9 số lẻ liên tiếp là 1035. Hãy tìm giá trị của số lớn nhất trong 9 số đó.",
        "vocab": "Sum: Tổng; Consecutive odd numbers: Các số lẻ liên tiếp; Largest number: Số lớn nhất; Value: Giá trị.",
        "image": null,
        "answer": "123",
        "acceptableAnswers": [
          "123"
        ],
        "unit": "",
        "hint": "Phương pháp Trung bình cộng của dãy số cách đều lẻ phần tử.",
        "solution": "Vì 9 là số lẻ, nên trung bình cộng của 9 số lẻ liên tiếp chính bằng số đứng ở chính giữa (số thứ 5).\nSố thứ 5 là:\n1035 ÷ 9 = 115\nVì là các số lẻ liên tiếp nên hai số liền kề hơn kém nhau 2 đơn vị.\nSố lớn nhất (số thứ 9) là:\n115 + 2 × (9 – 5) = 115 + 8 = 123."
      },
      {
        "id": 12,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Define the operation symbol a ⊗ b = (a × 3 + b – 1) × (a – b), find the value of (6 ⊗ 4) ⊗ 40.",
        "questionVi": "Định nghĩa phép toán quy ước: a ⊗ b = (a × 3 + b – 1) × (a – b). Hãy tính giá trị của biểu thức: (6 ⊗ 4) ⊗ 40.",
        "vocab": "Define: Định nghĩa; Operation symbol: Kí hiệu phép toán; Value: Giá trị.",
        "image": null,
        "answer": "330",
        "acceptableAnswers": [
          "330"
        ],
        "unit": "",
        "hint": "Phương pháp Định nghĩa phép toán quy ước hai biến.",
        "solution": "Theo định nghĩa phép toán quy ước a ⊗ b = (a × 3 + b – 1) × (a – b):\n+ Bước 1: Tính 6 ⊗ 4:\n6 ⊗ 4 = (6 × 3 + 4 – 1) × (6 – 4) = (18 + 3) × 2 = 21 × 2 = 42\n+ Bước 2: Tính (6 ⊗ 4) ⊗ 40 = 42 ⊗ 40:\n42 ⊗ 40 = (42 × 3 + 40 – 1) × (42 – 40) = (126 + 39) × 2 = 165 × 2 = 330."
      },
      {
        "id": 13,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of A if A = 3 × 8 × 13 × 18 × 23 × 28 × ... × 2023 × 2028.",
        "questionVi": "Tìm chữ số tận cùng của tích: A = 3 × 8 × 13 × 18 × 23 × 28 × ... × 2023 × 2028.",
        "vocab": "Unit digit: Chữ số tận cùng.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm chữ số tận cùng của tích chia thành các nhóm chu kỳ.",
        "solution": "Chia tích A thành hai nhóm thừa số:\n+ Nhóm 1: Các thừa số có tận cùng là 3: 3, 13, 23, ..., 2023.\nSố lượng thừa số là: (2023 – 3) ÷ 10 + 1 = 203 (thừa số).\nTích 4 thừa số có tận cùng là 3 có tận cùng là 1 (3⁴ = 81). Vì 203 ÷ 4 = 50 dư 3, nên tích nhóm này có chữ số tận cùng giống 3³ = 27 (tận cùng là 7).\n+ Nhóm 2: Các thừa số có tận cùng là 8: 8, 18, 28, ..., 2028.\nSố lượng thừa số là: (2028 – 8) ÷ 10 + 1 = 203 (thừa số).\nTích 4 thừa số có tận cùng là 8 có tận cùng là 6 (8⁴ = 4096). Vì 203 ÷ 4 = 50 dư 3, nên tích nhóm này có chữ số tận cùng giống 8³ = 512 (tận cùng là 2).\nChữ số tận cùng của tích A là chữ số tận cùng của tích:\n7 × 2 = 14 => Tận cùng là 4."
      },
      {
        "id": 14,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If a 10-digit number 2021A2723A is divisible by 6, find the value of A.",
        "questionVi": "Nếu số có 10 chữ số 2021A2723A chia hết cho 6, hãy tìm giá trị của chữ số A.",
        "vocab": "10-digit number: Số có 10 chữ số; Divisible: Chia hết; Value: Giá trị.",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 6 (Chia hết cho cả 2 và 3).",
        "solution": "Số 2021A2723A chia hết cho 6 khi và chỉ khi nó chia hết cho cả 2 và 3.\n+ Để chia hết cho 2: chữ số tận cùng A phải là số chẵn: A ∈ {0, 2, 4, 6, 8}.\n+ Để chia hết cho 3: tổng các chữ số phải chia hết cho 3:\n2 + 0 + 2 + 1 + A + 2 + 7 + 2 + 3 + A = 19 + 2A chia hết cho 3.\nThử từng giá trị chẵn của A:\n- A = 0: 19 + 0 = 19 (loại)\n- A = 2: 19 + 4 = 23 (loại)\n- A = 4: 19 + 8 = 27 chia hết cho 3 (thỏa mãn)\n- A = 6: 19 + 12 = 31 (loại)\n- A = 8: 19 + 16 = 35 (loại)\nVậy chữ số A là 4."
      },
      {
        "id": 15,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Mr. Wong gives some pencils to students. If everyone gets 9 pencils, 5 pencils will be left. If everyone gets 8 pencils, 19 pencils will be left. How many pencil(s) does Mr Wong have?",
        "questionVi": "Thầy Wong chia một số bút chì cho học sinh. Nếu mỗi bạn được 9 chiếc bút thì còn thừa 5 chiếc. Nếu mỗi bạn được 8 chiếc bút thì còn thừa 19 chiếc. Hỏi thầy Wong có tất cả bao nhiêu chiếc bút chì?",
        "vocab": "Pencils: Bút chì; Students: Học sinh; Left: Còn lại/Thừa.",
        "image": null,
        "answer": "131",
        "acceptableAnswers": [
          "131"
        ],
        "unit": "",
        "hint": "Phương pháp Bài toán hai hiệu số (Chia đồ vật thừa – thiếu).",
        "solution": "Khi tăng số bút chì mỗi học sinh nhận từ 8 chiếc lên 9 chiếc thì số bút chì mỗi bạn nhận thêm là:\n9 – 8 = 1 (chiếc)\nSố bút chì chênh lệch giữa hai lần chia là:\n19 – 5 = 14 (chiếc)\nSố học sinh là:\n14 ÷ 1 = 14 (học sinh)\nSố bút chì thầy Wong có là:\n14 × 9 + 5 = 131 (chiếc bút chì)."
      },
      {
        "id": 16,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is formed by 4 identical right-angled triangles. The areas of the big and the small squares are 64 and 36 respectively. Find the perimeter of the triangle.",
        "questionVi": "Hình dưới đây được tạo thành từ 4 tam giác vuông bằng nhau. Diện tích của hình vuông lớn và hình vuông nhỏ ở giữa lần lượt là 64 và 36. Tính chu vi của một hình tam giác vuông.",
        "vocab": "Identical right-angled triangles: Các tam giác vuông bằng nhau; Square: Hình vuông; Areas: Diện tích; Perimeter: Chu vi.",
        "image": "images/de5_q16.png",
        "answer": "14",
        "acceptableAnswers": [
          "14"
        ],
        "unit": "",
        "hint": "Phương pháp Tổng chu vi hình học ghép và Bổ đề tam giác vuông.",
        "solution": "Quan sát hình vẽ:\n- Cạnh của hình vuông lớn là: 8 (vì 8 × 8 = 64), đây chính là cạnh huyền của mỗi tam giác vuông.\n- Cạnh của hình vuông nhỏ ở giữa là: 6 (vì 6 × 6 = 36), đây chính là hiệu giữa hai cạnh góc vuông của mỗi tam giác vuông.\nTổng chu vi của cả 4 tam giác vuông bằng tổng chu vi hình vuông lớn và hình vuông nhỏ:\n8 × 4 + 6 × 4 = 32 + 24 = 56\nChu vi của một hình tam giác vuông là:\n56 ÷ 4 = 14."
      },
      {
        "id": 17,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The area of a rectangle is 162. If the sides of the rectangle are integers, find the maximum of the perimeter of the rectangle.",
        "questionVi": "Diện tích của một hình chữ nhật là 162. Biết độ dài các cạnh là số nguyên, hãy tìm giá trị lớn nhất của chu vi hình chữ nhật đó.",
        "vocab": "Area: Diện tích; Rectangle: Hình chữ nhật; Sides: Các cạnh; Integers: Số nguyên; Maximum of perimeter: Chu vi lớn nhất.",
        "image": null,
        "answer": "326",
        "acceptableAnswers": [
          "326"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm chu vi lớn nhất của hình chữ nhật có diện tích cố định.",
        "solution": "Diện tích hình chữ nhật bằng dài × rộng = 162.\nĐể chu vi 2 × (dài + rộng) đạt giá trị lớn nhất, chiều dài phải lớn nhất và chiều rộng phải nhỏ nhất.\nVì kích thước là các số nguyên dương, nên chiều rộng nhỏ nhất là 1, khi đó chiều dài lớn nhất là:\n162 ÷ 1 = 162\nChu vi lớn nhất của hình chữ nhật là:\n2 × (162 + 1) = 2 × 163 = 326."
      },
      {
        "id": 18,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "At least how many squares can be seen if viewing the figure below from the right?",
        "questionVi": "Quan sát hình vẽ dưới đây từ phía bên phải, hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông?",
        "vocab": "At least: Ít nhất; Squares: Hình vuông; Viewing from the right: Nhìn từ bên phải; Figure: Hình vẽ.",
        "image": "images/de5_q18.png",
        "answer": "9",
        "acceptableAnswers": [
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp Hình chiếu trực giao (Đếm số hình vuông nhìn từ hình chiếu cạnh).",
        "solution": "Quan sát hình khối từ phía bên phải (hình chiếu cạnh phải):\nĐếm số ô vuông xuất hiện ở từng cột từ trái sang phải:\nCột 1 có 3 ô vuông, Cột 2 có 1 ô vuông, Cột 3 có 2 ô vuông, Cột 4 có 2 ô vuông, Cột 5 có 1 ô vuông.\nTổng số hình vuông nhìn thấy ít nhất là:\n3 + 1 + 2 + 2 + 1 = 9 (hình vuông)."
      },
      {
        "id": 19,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "According to the pattern shown below, how many cubes are there in 10th group?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu khối lập phương ở hình thứ 10?",
        "vocab": "Pattern: Quy luật; Cubes: Khối lập phương; 10th group: Hình thứ 10.",
        "image": "images/de5_q19.png",
        "answer": "29",
        "acceptableAnswers": [
          "29"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm quy luật dãy khối lập phương theo cấp số cộng.",
        "solution": "Quan sát quy luật số lượng khối lập phương:\n- Nhóm 1 có: 2 khối lập phương\n- Mỗi nhóm tiếp theo tăng thêm đúng 3 khối lập phương so với nhóm liền trước.\nSố khối lập phương ở nhóm thứ 10 là:\n2 + 3 × (10 – 1) = 2 + 27 = 29 (khối lập phương)."
      },
      {
        "id": 20,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) with “*” is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình chữ nhật có chứa dấu \"*\" trong hình vẽ dưới đây?",
        "vocab": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "image": "images/de5_q20.png",
        "answer": "16",
        "acceptableAnswers": [
          "16"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình chữ nhật chứa ô chỉ định bằng phân tích lưới.",
        "solution": "Phân tích lưới ô vuông có chứa ô mang dấu \"*\":\n- Đếm các hình vuông 1×1: có 1 hình.\n- Đếm các hình chữ nhật kích thước 1×2 hoặc 2×1: có 4 hình.\n- Đếm các hình chữ nhật kích thước 1×3 hoặc 3×1: có 4 hình.\n- Đếm các hình chữ nhật kích thước 1×4 hoặc 4×1: có 2 hình.\n- Đếm các hình vuông 2×2: có 2 hình.\n- Đếm các hình chữ nhật kích thước 2×3 hoặc 3×2: có 2 hình.\n- Đếm hình vuông kích thước 3×3: có 1 hình.\nTổng số hình chữ nhật chứa dấu \"*\" là:\n1 + 4 + 4 + 2 + 2 + 2 + 1 = 16 (hình chữ nhật)."
      },
      {
        "id": 21,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Numbers are drawn from the 30 integers: 6 to 35. At least how many numbers are drawn at random to ensure that there are two numbers whose product is 80?",
        "questionVi": "Người ta chọn ngẫu nhiên các số từ 30 số nguyên từ 6 đến 35. Hỏi cần lấy ra ít nhất bao nhiêu số để chắc chắn có hai số được chọn có tích bằng 80?",
        "vocab": "Drawn: Chọn ra; Integers: Số nguyên; At least: Ít nhất; Product: Tích.",
        "image": null,
        "answer": "30",
        "acceptableAnswers": [
          "30"
        ],
        "unit": "",
        "hint": "Phương pháp Nguyên lý Dirichlet (Trường hợp xấu nhất).",
        "solution": "Trong dãy 30 số nguyên từ 6 đến 35, các cặp số có tích bằng 80 chỉ có duy nhất một cặp là:\n8 × 10 = 80\nTổng số phần tử trong tập hợp là: 35 – 6 + 1 = 30 số.\nXét trường hợp xấu nhất: Ta chọn ra tất cả 28 số còn lại không phải là 8 và 10, cùng với 1 trong 2 số (8 hoặc 10), tổng cộng đã chọn 29 số nhưng vẫn chưa thể có tích bằng 80.\nKhi đó, chỉ cần chọn thêm 1 số nữa (số thứ 30), chắc chắn ta sẽ chọn được cả 8 và 10.\nSố lượng số cần lấy ra ít nhất là:\n28 + 1 + 1 = 30 (số)."
      },
      {
        "id": 22,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit number(s) is / are there such that the number without digital repetition does not contain digit “0” or “8”?",
        "questionVi": "Có bao nhiêu số có 3 chữ số khác nhau sao cho trong số đó không chứa bất kỳ chữ số \"0\" hoặc \"8\" nào?",
        "vocab": "3-digit number: Số có 3 chữ số; Without digital repetition: Các chữ số không lặp lại; Does not contain: Không chứa.",
        "image": null,
        "answer": "336",
        "acceptableAnswers": [
          "336"
        ],
        "unit": "",
        "hint": "Phương pháp Quy tắc nhân đếm số có các chữ số khác nhau.",
        "solution": "Tập hợp các chữ số khác nhau không chứa 0 hoặc 8 là:\n{1, 2, 3, 4, 5, 6, 7, 9} gồm 8 chữ số.\nChọn 3 chữ số khác nhau từ 8 chữ số này để lập số có 3 chữ số:\n- Chữ số hàng trăm: có 8 cách chọn.\n- Chữ số hàng chục: có 7 cách chọn.\n- Chữ số hàng đơn vị: có 6 cách chọn.\nSố lượng các số thỏa mãn là:\n8 × 7 × 6 = 336 (số)."
      },
      {
        "id": 23,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit odd number(s) is / are there so that the product of digits is 16?",
        "questionVi": "Có bao nhiêu số lẻ có 3 chữ số sao cho tích các chữ số của số đó bằng 16?",
        "vocab": "3-digit odd number: Số lẻ có 3 chữ số; Product of digits: Tích các chữ số.",
        "image": null,
        "answer": "3",
        "acceptableAnswers": [
          "3"
        ],
        "unit": "",
        "hint": "Phương pháp Phân tích số nguyên tố và Phân hoạch chữ số tận cùng.",
        "solution": "Vì số cần tìm là số lẻ nên chữ số hàng đơn vị phải là số lẻ.\nVì tích các chữ số bằng 16 nên chữ số hàng đơn vị phải là ước lẻ của 16.\nƯớc lẻ duy nhất của 16 là 1, do đó chữ số hàng đơn vị bắt buộc phải là 1.\nKhi đó, tích của chữ số hàng trăm và chữ số hàng chục là: 16 ÷ 1 = 16.\nVì các chữ số từ 1 đến 9, nên ta có các phân tích:\n16 = 2 × 8 = 4 × 4 = 8 × 2\nCó 3 cặp (hàng trăm, hàng chục) thỏa mãn là: (2, 8), (4, 4), (8, 2).\nVậy có đúng 3 số thỏa mãn là: 281, 441, 821."
      },
      {
        "id": 24,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Find the smallest difference of two 3-digit numbers formed by using 6 digits from 0, 1, 3, 5, 7, 8, 9 without repetition.",
        "questionVi": "Tìm hiệu nhỏ nhất có thể có giữa hai số có 3 chữ số được tạo thành bằng cách dùng 6 chữ số khác nhau từ 0, 1, 3, 5, 7, 8, 9 không lặp lại.",
        "vocab": "Smallest difference: Hiệu nhỏ nhất; Two 3-digit numbers: Hai số có 3 chữ số; Without repetition: Không lặp lại.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6"
        ],
        "unit": "",
        "hint": "Phương pháp Cấu tạo số và Chặn giá trị hiệu nhỏ nhất.",
        "solution": "Để hiệu giữa hai số có 3 chữ số là nhỏ nhất:\n- Hai chữ số hàng trăm phải hơn kém nhau 1 đơn vị, ta chọn cặp (8, 7).\n- Số lớn phải nhỏ nhất có thể từ các chữ số còn lại: chọn chữ số nhỏ nhất cho hàng chục và đơn vị: chọn 0 và 1 => Số lớn là 801.\n- Số bé phải lớn nhất có thể từ các chữ số còn lại: chọn chữ số lớn nhất cho hàng chục và đơn vị: chọn 9 và 5 => Số bé là 795.\nCả 6 chữ số {8, 0, 1, 7, 9, 5} đều phân biệt và thuộc tập {0, 1, 3, 5, 7, 8, 9}.\nHiệu nhỏ nhất có thể là:\n801 – 795 = 6."
      },
      {
        "id": 25,
        "examId": "heat_de1",
        "examIndex": 0,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "If Andy goes from point A to point B, each step can only move up or move right along the line. How many way(s) is / are there?",
        "questionVi": "Nếu Andy đi từ điểm A đến điểm B, mỗi bước chỉ có thể đi lên trên hoặc đi sang phải theo các đường kẻ. Hỏi Andy có bao nhiêu cách khác nhau để đi từ A đến B?",
        "vocab": "Point: Điểm; Move up: Đi lên trên; Move right: Đi sang phải; Line: Đường kẻ; Ways: Số cách.",
        "image": "images/de5_q25.png",
        "answer": "124",
        "acceptableAnswers": [
          "124"
        ],
        "unit": "",
        "hint": "Phương pháp Quy tắc cộng đường đi trên lưới ô vuông (Tam giác Pascal).",
        "solution": "Áp dụng quy tắc cộng đường đi trên lưới ô vuông (Tam giác Pascal):\nTại mỗi điểm nút giao, số cách đi đến điểm đó bằng tổng số cách đi đến điểm ngay bên trái và điểm ngay bên dưới nó.\nThực hiện cộng số cách đi tuần tự từ điểm xuất phát A(1 cách) qua các nút lưới:\n- Hàng đáy: 1, 1, 1, 1, 1...\n- Hàng 2: 1, 2, 3, 4, 7, 14...\n- Lần lượt điền các nút cho đến đích B, ta nhận được kết quả:\nSố cách đi từ A đến B là 124 cách."
      }
    ]
  },
  {
    "id": "heat_de2",
    "title": "Đề số 2: VCK Quốc gia (2019 – 2020)",
    "titleEn": "Paper 2: National Final Heat Round (2019 – 2020)",
    "year": "2019 – 2020",
    "grade": "Khối 4 / Grade 4",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "color": "blue",
        "range": [
          1,
          5
        ]
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "color": "emerald",
        "range": [
          6,
          10
        ]
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "color": "purple",
        "range": [
          11,
          15
        ]
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "color": "amber",
        "range": [
          16,
          20
        ]
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "color": "rose",
        "range": [
          21,
          25
        ]
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
        "questionEn": "Today is Sunday. Which day of the week will 616 days be later?",
        "questionVi": "Hôm nay là Chủ Nhật. Hỏi 616 ngày sau là thứ mấy trong tuần?",
        "vocab": "Sunday: Chủ Nhật; Day of the week: Thứ trong tuần; Later: Sau.",
        "image": null,
        "answer": "Sunday (Chủ Nhật)",
        "acceptableAnswers": [
          "Sunday (Chủ Nhật)",
          "Sunday",
          "Chủ Nhật",
          "Chu Nhat",
          "chủ nhật",
          "chu nhat",
          "sunday",
          "cn"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ thứ trong tuần (Lấy số dư theo modulo 7).",
        "solution": "Một tuần có 7 ngày. Thực hiện phép chia lấy số tuần và số ngày dư:\n616 ÷ 7 = 88 (tuần, dư 0 ngày)\nPhép chia hết, không có ngày dư.\nVì hôm nay là Chủ Nhật, nên đúng 88 tuần sau ngày đó vẫn là ngày Chủ Nhật (Sunday).\n(Lưu ý: 616 = 7 × 88, ngày đó tròn 88 tuần nên rơi đúng vào Chủ Nhật)."
      },
      {
        "id": 27,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are a total of 20 chickens and rabbits in a farm. The animals have a total of 66 legs. How many chicken(s) is / are there?",
        "questionVi": "Trong trang trại có tổng cộng 20 con gà và thỏ. Tổng số chân của các con vật là 66 chân. Hỏi có bao nhiêu con gà?",
        "vocab": "Total: Tổng cộng; Chickens: Con gà; Rabbits: Con thỏ; Legs: Chân.",
        "image": null,
        "answer": "7",
        "acceptableAnswers": [
          "7"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán gà và thỏ).",
        "solution": "Áp dụng phương pháp Giả thiết tạm:\nGiả sử cả 20 con vật đều là thỏ (mỗi con thỏ có 4 chân).\nKhi đó tổng số chân là:\n20 × 4 = 80 (chân)\nSố chân dôi ra so với thực tế là:\n80 – 66 = 14 (chân)\nMỗi con thỏ nhiều hơn mỗi con gà số chân là:\n4 – 2 = 2 (chân)\nSố con gà là:\n14 ÷ 2 = 7 (con gà)."
      },
      {
        "id": 28,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "It requires 22 minutes to cut a piece of wood into 12 sections. If the time required to cut into each section is the same, how many minute(s) is / are required to cut into 6 sections?",
        "questionVi": "Cần 22 phút để cưa một khúc gỗ thành 12 đoạn. Biết thời gian cưa mỗi đoạn là như nhau, hỏi cần bao nhiêu phút để cưa khúc gỗ đó thành 6 đoạn?",
        "vocab": "Requires: Cần; Sections: Đoạn/Phần; The same: Giống nhau; Minutes: Phút.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10"
        ],
        "unit": "",
        "hint": "Phương pháp Bài toán cưa gỗ / cắt đoạn (Số lần cắt = Số phần – 1).",
        "solution": "Để cưa khúc gỗ thành 12 đoạn cần số lần cưa là:\n12 – 1 = 11 (lần cưa)\nThời gian cho mỗi lần cưa là:\n22 ÷ 11 = 2 (phút)\nĐể cưa khúc gỗ thành 6 đoạn cần số lần cưa là:\n6 – 1 = 5 (lần cưa)\nThời gian cần thiết để cưa thành 6 đoạn là:\n5 × 2 = 10 (phút)."
      },
      {
        "id": 29,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Chris’s grandfather’s age this year minuses 11, then is divided by 9, adds 5 and multiplied by 6. The result will be 66 years old. How old is Chris’s grandfather this year?",
        "questionVi": "Tuổi của ông Chris năm nay trừ đi 11, rồi chia cho 9, cộng thêm 5 và nhân với 6 thì được 66 tuổi. Hỏi năm nay ông của Chris bao nhiêu tuổi?",
        "vocab": "Minuses: Trừ; Divided: Chia; Adds: Cộng; Multiplied: Nhân; Result: Kết quả; Years old: Tuổi.",
        "image": null,
        "answer": "65",
        "acceptableAnswers": [
          "65"
        ],
        "unit": "",
        "hint": "Phương pháp Tính ngược từ cuối (Working backwards).",
        "solution": "Áp dụng phương pháp tính ngược từ cuối:\n+ Trước khi nhân với 6, kết quả là:\n66 ÷ 6 = 11\n+ Trước khi cộng thêm 5, kết quả là:\n11 – 5 = 6\n+ Trước khi chia cho 9, kết quả là:\n6 × 9 = 54\n+ Trước khi trừ đi 11, tuổi của ông Chris là:\n54 + 11 = 65 (tuổi)."
      },
      {
        "id": 30,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern below, how many ※ is / are there in the 9th group?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu dấu hoa thị ※ ở hình thứ 9?",
        "vocab": "Pattern: Quy luật; 9th group: Hình thứ 9.",
        "image": "images/de4_q05.png",
        "answer": "256",
        "acceptableAnswers": [
          "256"
        ],
        "unit": "",
        "hint": "Phương pháp Phân tích quy luật hình học và Dãy số lũy thừa / cấp số nhân.",
        "solution": "Quan sát quy luật số lượng dấu hoa thị ※ ở từng nhóm:\n- Nhóm 1: 4 dấu ※\n- Nhóm 2: 4 + 8 = 12 dấu ※\n- Nhóm 3: 4 + 8 + 16 = 28 dấu ※\nQuy luật số lượng dấu ※ tăng thêm sau mỗi nhóm gấp đôi:\nSố lượng dấu ※ ở nhóm thứ 9 là:\n4 × 8 + 8 × (7 + 6 + 5 + 4 + 3 + 2 + 1) = 32 + 8 × 28 = 256 (dấu ※)."
      },
      {
        "id": 31,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 10201 × 121.",
        "questionVi": "Tính giá trị của tích: 10201 × 121.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1234321",
        "acceptableAnswers": [
          "1234321"
        ],
        "unit": "",
        "hint": "Phương pháp Nhận diện số đối xứng (Bình phương của 1111).",
        "solution": "Nhận xét: 10201 = 101 × 101 và 121 = 11 × 11.\nDo đó: 10201 × 121 = (101 × 11) × (101 × 11) = 1111 × 1111.\nTa có: 1111 × 1111 = 1234321."
      },
      {
        "id": 32,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 171 ÷ 3 + 171 ÷ 9 + 171 ÷ 19.",
        "questionVi": "Tính giá trị của biểu thức: 171 ÷ 3 + 171 ÷ 9 + 171 ÷ 19.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "85",
        "acceptableAnswers": [
          "85"
        ],
        "unit": "",
        "hint": "Phương pháp Đặt thừa số chung đối với phép chia.",
        "solution": "Thực hiện các phép chia trước rồi cộng các kết quả lại:\n171 ÷ 3 = 57\n171 ÷ 9 = 19\n171 ÷ 19 = 9\nBiểu thức bằng: 57 + 19 + 9 = 76 + 9 = 85."
      },
      {
        "id": 33,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 80 × 12 + 160 × 11 – 18 × 40.",
        "questionVi": "Tính giá trị của biểu thức: 80 × 12 + 160 × 11 – 18 × 40.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "2000",
        "acceptableAnswers": [
          "2000"
        ],
        "unit": "",
        "hint": "Phương pháp Tách và ghép thừa số chung (Tính chất phân phối).",
        "solution": "Biến đổi các tích về thừa số chung 80:\n160 × 11 = 80 × 2 × 11 = 80 × 22\n18 × 40 = 9 × 2 × 40 = 9 × 80 = 80 × 9\nKhi đó biểu thức trở thành:\n80 × 12 + 80 × 22 – 80 × 9\n= 80 × (12 + 22 – 9)\n= 80 × 25\n= 2000."
      },
      {
        "id": 34,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 101 + 111 + 121 + 131 + 141 + 151 + 161 + 171 + 181.",
        "questionVi": "Tính giá trị của tổng: 101 + 111 + 121 + 131 + 141 + 151 + 161 + 171 + 181.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1269",
        "acceptableAnswers": [
          "1269"
        ],
        "unit": "",
        "hint": "Phương pháp Tính tổng dãy số cách đều.",
        "solution": "Đây là tổng của 9 số hạng cách đều nhau 10 đơn vị.\nSố chính giữa (số thứ 5) của dãy là 141.\nTổng của dãy số là:\n141 × 9 = 1269\n(Hoặc: (101 + 181) × 9 ÷ 2 = 282 × 9 ÷ 2 = 141 × 9 = 1269)."
      },
      {
        "id": 35,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Using the method of 2S – S = S, find the value of 2 + 4 + 8 + ... + 128.",
        "questionVi": "Sử dụng phương pháp 2S – S = S, hãy tính giá trị của tổng: 2 + 4 + 8 + ... + 128.",
        "vocab": "Method: Phương pháp; Value: Giá trị.",
        "image": null,
        "answer": "254",
        "acceptableAnswers": [
          "254"
        ],
        "unit": "",
        "hint": "Phương pháp Nhân đôi triệt tiêu (Phương pháp 2S – S).",
        "solution": "Đặt S = 2 + 4 + 8 + 16 + 32 + 64 + 128.\nNhân cả hai vế với 2:\n2S = 4 + 8 + 16 + 32 + 64 + 128 + 256\nLấy 2S trừ đi S:\nS = 2S – S = (4 + 8 + ... + 256) – (2 + 4 + ... + 128)\nS = 256 – 2 = 254."
      },
      {
        "id": 36,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If 9-digit number 20206423A is divisible by 12, find the value of A.",
        "questionVi": "Nếu số có 9 chữ số 20206423A chia hết cho 12, hãy tìm giá trị của chữ số A.",
        "vocab": "9-digit number: Số có 9 chữ số; Divisible: Chia hết; Value: Giá trị.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 12 (Chia hết cho cả 3 và 4).",
        "solution": "Vì 12 = 3 × 4 và ƯCLN(3, 4) = 1 nên số 20206423A chia hết cho 12 khi và chỉ khi nó chia hết cho cả 3 và 4.\n+ Để chia hết cho 4: hai chữ số tận cùng 3A phải chia hết cho 4. Trong các số có dạng 3A thì chỉ có 32 và 36 chia hết cho 4, nên A có thể là 2 hoặc 6.\n+ Để chia hết cho 3: tổng các chữ số phải chia hết cho 3:\n2 + 0 + 2 + 0 + 6 + 4 + 2 + 3 + A = 19 + A chia hết cho 3.\n- Nếu A = 2: 19 + 2 = 21 chia hết cho 3 (thỏa mãn).\n- Nếu A = 6: 19 + 6 = 25 không chia hết cho 3 (loại).\nVậy giá trị của chữ số A là 2."
      },
      {
        "id": 37,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of A if A = (2 × 2 × 2 × ... × 2) × (4 × 4 × 4 × ... × 4) × (6 × 6 × 6 × ... × 6) (there are 2019 '2's, 2019 '4's and 2019 '6's).",
        "questionVi": "Tìm chữ số tận cùng của biểu thức A nếu A = (2 × 2 × 2 × ... × 2) × (4 × 4 × 4 × ... × 4) × (6 × 6 × 6 × ... × 6) (gồm 2019 thừa số 2, 2019 thừa số 4 và 2019 thừa số 6).",
        "vocab": "Unit digit: Chữ số tận cùng.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm chữ số tận cùng của tích các lũy thừa.",
        "solution": "Xét chữ số tận cùng của từng nhóm tích gồm 2019 thừa số:\n+ Nhóm 2: Lũy thừa của 2 có chu kỳ tận cùng 4 số (2, 4, 8, 6). Ta có 2019 ÷ 4 = 504 dư 3, nên tích của 2019 thừa số 2 có chữ số tận cùng là 8.\n+ Nhóm 4: Tích số lẻ các thừa số 4 luôn có chữ số tận cùng là 4.\n+ Nhóm 6: Tích các thừa số 6 luôn có chữ số tận cùng là 6.\nChữ số tận cùng của tích A là chữ số tận cùng của tích:\n8 × 4 × 6 = 192 => Tận cùng là 2."
      },
      {
        "id": 38,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Define the operation symbol a ⊗ b = (a + b) × (a – b), find the value of (6 ⊗ 5) ⊗ 9.",
        "questionVi": "Định nghĩa phép toán quy ước: a ⊗ b = (a + b) × (a – b). Hãy tính giá trị của biểu thức: (6 ⊗ 5) ⊗ 9.",
        "vocab": "Operation symbol: Kí hiệu phép toán; Value: Giá trị.",
        "image": null,
        "answer": "40",
        "acceptableAnswers": [
          "40"
        ],
        "unit": "",
        "hint": "Phương pháp Định nghĩa phép toán quy ước nhiều tầng.",
        "solution": "Theo định nghĩa phép toán quy ước a ⊗ b = (a + b) × (a – b):\n+ Bước 1: Tính 6 ⊗ 5:\n6 ⊗ 5 = (6 + 5) × (6 – 5) = 11 × 1 = 11\n+ Bước 2: Tính (6 ⊗ 5) ⊗ 9 = 11 ⊗ 9:\n11 ⊗ 9 = (11 + 9) × (11 – 9) = 20 × 2 = 40."
      },
      {
        "id": 39,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of positive numbers A and B is 846. A is 8 times of B. Find the value of A.",
        "questionVi": "Tổng của hai số dương A và B là 846. Biết rằng A gấp 8 lần B. Tìm giá trị của số A.",
        "vocab": "Sum: Tổng; Positive numbers: Số dương; 8 times: Gấp 8 lần; Value: Giá trị.",
        "image": null,
        "answer": "752",
        "acceptableAnswers": [
          "752"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm hai số khi biết tổng và tỉ số của hai số.",
        "solution": "Theo đề bài, A gấp 8 lần B, tức là A = 8 × B.\nTổng của A và B là: A + B = 8 × B + B = 9 × B = 846\nSuy ra: B = 846 ÷ 9 = 94\nGiá trị của số A là:\nA = 8 × 94 = 752."
      },
      {
        "id": 40,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "How many factors does 2020 have?",
        "questionVi": "Hỏi số 2020 có tất cả bao nhiêu ước số?",
        "vocab": "Factors: Ước số.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Phương pháp Phân tích ra thừa số nguyên tố và Công thức tính số ước.",
        "solution": "Phân tích số 2020 ra thừa số nguyên tố:\n2020 = 2 × 1010 = 2 × 2 × 505 = 2² × 5¹ × 101¹\nSố lượng ước số của 2020 là:\n(2 + 1) × (1 + 1) × (1 + 1) = 3 × 2 × 2 = 12 (ước số)."
      },
      {
        "id": 41,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) with “*” is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình chữ nhật có chứa dấu \"*\" trong hình vẽ dưới đây?",
        "vocab": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "image": "images/de4_q16.png",
        "answer": "48",
        "acceptableAnswers": [
          "48"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình chữ nhật chứa ô chỉ định bằng quy tắc nhân tổ hợp.",
        "solution": "Quan sát lưới hình chữ nhật có chứa ô mang dấu \"*\":\nSố hình chữ nhật chứa ô chỉ định bằng tích số cách chọn các đường biên trên, dưới, trái, phải.\nTheo hình vẽ, ta đếm được tổng cộng 48 hình chữ nhật chứa dấu \"*\"."
      },
      {
        "id": 42,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many right-angled triangle(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình tam giác vuông trong hình vẽ dưới đây?",
        "vocab": "Right-angled triangles: Tam giác vuông; Figure: Hình vẽ.",
        "image": "images/de4_q17.png",
        "answer": "9",
        "acceptableAnswers": [
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình tam giác vuông theo các cấp độ phân rã.",
        "solution": "Đếm số lượng tam giác vuông trong hình vẽ theo các kích cỡ:\n- Đếm các tam giác vuông nhỏ đơn lẻ.\n- Đếm các tam giác vuông ghép đôi và ghép tư.\nTổng cộng có 9 hình tam giác vuông."
      },
      {
        "id": 43,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The perimeter of a rectangle is 22cm. If sides of the rectangle are integers, find the maximum value of the area of the rectangle in cm².",
        "questionVi": "Chu vi của một hình chữ nhật là 22 cm. Biết độ dài các cạnh là số nguyên, hãy tìm giá trị lớn nhất của diện tích hình chữ nhật theo đơn vị cm².",
        "vocab": "Perimeter: Chu vi; Rectangle: Hình chữ nhật; Sides: Các cạnh; Integers: Số nguyên; Maximum value: Giá trị lớn nhất; Area: Diện tích.",
        "image": null,
        "answer": "30",
        "acceptableAnswers": [
          "30"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm diện tích lớn nhất của hình chữ nhật có chu vi cố định.",
        "solution": "Nửa chu vi của hình chữ nhật là:\n22 ÷ 2 = 11 (cm)\nTổng chiều dài và chiều rộng là 11 cm (dài + rộng = 11).\nĐể diện tích (dài × rộng) đạt giá trị lớn nhất khi tổng không đổi, chiều dài và chiều rộng phải gần nhau nhất.\nVì độ dài các cạnh là số nguyên nên ta chọn chiều dài là 6 cm và chiều rộng là 5 cm.\nDiện tích lớn nhất là:\n6 × 5 = 30 (cm²)."
      },
      {
        "id": 44,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The square below is cut into 3 squares and 2 rectangles and AB = BD, BC = CD = DE = EF. If the perimeter of the original square is 64cm, find the perimeter of the smallest square in cm.",
        "questionVi": "Hình vuông dưới đây được cắt thành 3 hình vuông và 2 hình chữ nhật, biết AB = BD và BC = CD = DE = EF. Nếu chu vi của hình vuông ban đầu là 64 cm, hãy tìm chu vi của hình vuông nhỏ nhất theo cm.",
        "vocab": "Square: Hình vuông; Cut: Cắt; Perimeter: Chu vi; Original: Ban đầu; Smallest square: Hình vuông nhỏ nhất.",
        "image": "images/de4_q19.png",
        "answer": "16",
        "acceptableAnswers": [
          "16"
        ],
        "unit": "",
        "hint": "Phương pháp Chia hình vuông và Phân tích tỉ lệ độ dài cạnh.",
        "solution": "Chu vi của hình vuông ban đầu là 64 cm.\nĐộ dài một cạnh của hình vuông ban đầu là:\n64 ÷ 4 = 16 (cm)\nTừ điều kiện AB = BD và BC = CD = DE = EF, ta suy ra cạnh hình vuông nhỏ nhất bằng 1/4 cạnh hình vuông ban đầu:\n16 ÷ 4 = 4 (cm)\nChu vi của hình vuông nhỏ nhất là:\n4 × 4 = 16 (cm)."
      },
      {
        "id": 45,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The perimeter of a square is 60cm. Now Amy combines 9 squares to form a new rectangle. Find the maximum value of the perimeter of the rectangle in centimeter.",
        "questionVi": "Chu vi của một hình vuông là 60 cm. Bạn Amy ghép 9 hình vuông như vậy lại để tạo thành một hình chữ nhật mới. Tìm giá trị lớn nhất của chu vi hình chữ nhật mới tạo thành theo cm.",
        "vocab": "Perimeter: Chu vi; Square: Hình vuông; Combine: Ghép/Kết hợp; Rectangle: Hình chữ nhật; Maximum value: Giá trị lớn nhất.",
        "image": null,
        "answer": "300",
        "acceptableAnswers": [
          "300"
        ],
        "unit": "",
        "hint": "Phương pháp Ghép hình để tạo chu vi lớn nhất (Xếp thành 1 hàng đơn).",
        "solution": "Chu vi của mỗi hình vuông nhỏ là 60 cm.\nĐộ dài một cạnh của hình vuông nhỏ là:\n60 ÷ 4 = 15 (cm)\nĐể ghép 9 hình vuông nhỏ thành hình chữ nhật có chu vi lớn nhất, ta phải xếp 9 hình vuông đó thành một hàng thẳng dài (dạng 1 × 9).\nKhi đó kích thước hình chữ nhật mới là:\nChiều rộng: 15 cm\nChiều dài: 15 × 9 = 135 cm\nChu vi lớn nhất của hình chữ nhật là:\n(15 + 135) × 2 = 150 × 2 = 300 (cm)."
      },
      {
        "id": 46,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "69 students are arranged in class 4A, 4B, 4C or 4D. No class has more students than class 4A. At least how many student(s) is / are there in class 4A?",
        "questionVi": "Có 69 học sinh được phân vào 4 lớp 4A, 4B, 4C và 4D. Biết không có lớp nào có số học sinh nhiều hơn lớp 4A. Hỏi lớp 4A có ít nhất bao nhiêu học sinh?",
        "vocab": "Students: Học sinh; Class: Lớp học; No class has more: Không lớp nào nhiều hơn; At least: Ít nhất.",
        "image": null,
        "answer": "18",
        "acceptableAnswers": [
          "18"
        ],
        "unit": "",
        "hint": "Phương pháp Nguyên lý Dirichlet (Trường hợp chia đều bất biến).",
        "solution": "Áp dụng nguyên lý Dirichlet:\nGiả sử cả 4 lớp đều có số học sinh bằng nhau thì mỗi lớp có:\n69 ÷ 4 = 17 (học sinh, dư 1)\nNếu lớp 4A chỉ có 17 học sinh thì tổng số học sinh tối đa của cả 4 lớp là 17 × 4 = 68 học sinh, không đủ 69 học sinh.\nDo lớp 4A có nhiều học sinh nhất, nên 1 học sinh còn dư phải được xếp vào lớp 4A.\nSố học sinh ít nhất của lớp 4A là:\n17 + 1 = 18 (học sinh)."
      },
      {
        "id": 47,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Find the smallest difference of two 5-digit numbers formed by using all 10 digits from 0 to 9 without repetition.",
        "questionVi": "Tìm hiệu nhỏ nhất có thể có giữa hai số có 5 chữ số được tạo thành bằng cách dùng tất cả 10 chữ số từ 0 đến 9 không lặp lại.",
        "vocab": "Smallest difference: Hiệu nhỏ nhất; 5-digit numbers: Số có 5 chữ số; Digits: Chữ số; Without repetition: Không lặp lại.",
        "image": null,
        "answer": "247",
        "acceptableAnswers": [
          "247"
        ],
        "unit": "",
        "hint": "Phương pháp Cấu tạo số và Chặn giá trị hiệu nhỏ nhất.",
        "solution": "Để hiệu giữa hai số có 5 chữ số là nhỏ nhất:\n- Chữ số hàng chục nghìn của hai số hơn kém nhau 1 đơn vị: chọn cặp (5, 4).\n- Số lớn phải nhỏ nhất có thể: chọn các chữ số nhỏ nhất còn lại theo thứ tự tăng dần (0, 1, 2, 3) => Số lớn là 50123.\n- Số bé phải lớn nhất có thể: chọn các chữ số lớn nhất còn lại theo thứ tự giảm dần (9, 8, 7, 6) => Số bé là 49876.\nHiệu nhỏ nhất có thể là:\n50123 – 49876 = 247."
      },
      {
        "id": 48,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "It is given that the total weight of 3 apples and 2 oranges is 390g. The weight of 2 apples is the same as that of 3 oranges. What is the weight (g) of 1 apple?",
        "questionVi": "Biết tổng khối lượng của 3 quả táo và 2 quả cam là 390g. Khối lượng của 2 quả táo bằng khối lượng của 3 quả cam. Hỏi 1 quả táo nặng bao nhiêu gam?",
        "vocab": "Total weight: Tổng khối lượng; Apples: Quả táo; Oranges: Quả cam; The same as: Bằng nhau.",
        "image": null,
        "answer": "90",
        "acceptableAnswers": [
          "90"
        ],
        "unit": "",
        "hint": "Phương pháp Khử đại lượng và Thay thế (Hệ phương trình số học).",
        "solution": "Theo đề bài, 2 quả táo nặng bằng 3 quả cam.\nNhân đôi cả hai đại lượng: 4 quả táo nặng bằng 6 quả cam, hay 6 quả táo nặng bằng 9 quả cam.\nTheo đề bài: 3 quả táo + 2 quả cam = 390g.\nNhân 3 cả hai vế: 9 quả táo + 6 quả cam = 390 × 3 = 1170g.\nThay 6 quả cam bằng 4 quả táo, ta được:\n9 quả táo + 4 quả táo = 13 quả táo = 1170g.\nKhối lượng của 1 quả táo là:\n1170 ÷ 13 = 90 (g)."
      },
      {
        "id": 49,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 9 steps. David can go up for 1 step, 2 steps or 3 steps each time. How many way(s) is / are there for David to go up the stairs?",
        "questionVi": "Một cầu thang có 9 bậc. David có thể bước lên 1 bậc, 2 bậc hoặc 3 bậc mỗi lần bước. Hỏi David có bao nhiêu cách khác nhau để bước lên hết cầu thang?",
        "vocab": "Flight of stairs: Cầu thang; Steps: Bậc thang; Ways: Cách thức.",
        "image": null,
        "answer": "149",
        "acceptableAnswers": [
          "149"
        ],
        "unit": "",
        "hint": "Phương pháp Dãy số Tribonacci (Bài toán bước cầu thang 1, 2 hoặc 3 bậc).",
        "solution": "Áp dụng quy tắc cộng dãy số Tribonacci cho bài toán bước cầu thang 1, 2 hoặc 3 bậc:\nGọi a(n) là số cách bước lên cầu thang n bậc. Ta có công thức: a(n) = a(n–1) + a(n–2) + a(n–3).\n- Bậc 1: a(1) = 1\n- Bậc 2: a(2) = 2 {(1,1), (2)}\n- Bậc 3: a(3) = 4 {(1,1,1), (1,2), (2,1), (3)}\n- Bậc 4: a(4) = 1 + 2 + 4 = 7\n- Bậc 5: a(5) = 2 + 4 + 7 = 13\n- Bậc 6: a(6) = 4 + 7 + 13 = 24\n- Bậc 7: a(7) = 7 + 13 + 24 = 44\n- Bậc 8: a(8) = 13 + 24 + 44 = 81\n- Bậc 9: a(9) = 24 + 44 + 81 = 149 (cách)."
      },
      {
        "id": 50,
        "examId": "heat_de2",
        "examIndex": 1,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit number(s) is / are there such that the number does not contain digit “0”, “1” or “2”?",
        "questionVi": "Có bao nhiêu số có 3 chữ số sao cho trong số đó không chứa bất kỳ chữ số \"0\", \"1\" hoặc \"2\" nào?",
        "vocab": "3-digit number: Số có 3 chữ số; Does not contain: Không chứa; Digit: Chữ số.",
        "image": null,
        "answer": "343",
        "acceptableAnswers": [
          "343"
        ],
        "unit": "",
        "hint": "Phương pháp Quy tắc nhân tổ hợp đếm số không chứa các chữ số chỉ định.",
        "solution": "Tập hợp các chữ số có thể chọn để tạo thành số có 3 chữ số mà không chứa 0, 1 hoặc 2 là:\n{3, 4, 5, 6, 7, 8, 9} gồm 7 chữ số.\n- Chữ số hàng trăm: có 7 cách chọn.\n- Chữ số hàng chục: có 7 cách chọn.\n- Chữ số hàng đơn vị: có 7 cách chọn.\nSố lượng các số có 3 chữ số thỏa mãn là:\n7 × 7 × 7 = 343 (số)."
      }
    ]
  },
  {
    "id": "heat_de3",
    "title": "Đề số 3: VCK Quốc gia (2018 – 2019)",
    "titleEn": "Paper 3: National Final Heat Round (2018 – 2019)",
    "year": "2018 – 2019",
    "grade": "Khối 4 / Grade 4",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "color": "blue",
        "range": [
          1,
          5
        ]
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "color": "emerald",
        "range": [
          6,
          10
        ]
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "color": "purple",
        "range": [
          11,
          15
        ]
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "color": "amber",
        "range": [
          16,
          20
        ]
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "color": "rose",
        "range": [
          21,
          25
        ]
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
        "questionEn": "What is the value of the number to represent “?” in the following sequence?\n2, 3, 5, 9, 17, 33, ? , 129, …",
        "questionVi": "Số nào thích hợp để thay thế dấu \"?\" trong dãy số dưới đây?\n2, 3, 5, 9, 17, 33, ? , 129, …",
        "vocab": "Value: Giá trị; Represent: Biểu diễn; Sequence: Dãy số.",
        "image": null,
        "answer": "65",
        "acceptableAnswers": [
          "65"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm quy luật dãy số (Số sau bằng số trước nhân đôi trừ 1).",
        "solution": "Nhận xét quy luật của dãy số:\n+ Cách 1: Mỗi số kể từ số thứ hai bằng số đứng ngay trước nó nhân với 2 rồi trừ đi 1:\n3 = 2 × 2 – 1\n5 = 3 × 2 – 1\n9 = 5 × 2 – 1\n17 = 9 × 2 – 1\n33 = 17 × 2 – 1\nSố cần tìm thay cho \"?\" là: 33 × 2 – 1 = 65.\nKiểm tra số tiếp theo: 65 × 2 – 1 = 129 (thỏa mãn).\n+ Cách 2: Hiệu giữa hai số liên tiếp tạo thành dãy gấp đôi: 1, 2, 4, 8, 16, 32...\nSố cần tìm là: 33 + 32 = 65."
      },
      {
        "id": 52,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many triangle(s) is / are there from the 1st to the 500th figure counting from the left?\n○ △ □ △ ○ △ □ △ ○ …",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tam giác từ hình thứ 1 đến hình thứ 500 tính từ trái sang phải?\n○ △ □ △ ○ △ □ △ ○ …",
        "vocab": "Pattern: Quy luật; Triangles: Tam giác; Figure: Hình vẽ; Counting from the left: Tính từ bên trái.",
        "image": null,
        "answer": "250",
        "acceptableAnswers": [
          "250"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ hình học và Phân tích số dư modulo 4.",
        "solution": "Nhận xét quy luật dãy hình vẽ:\nDãy lặp lại theo nhóm chu kỳ gồm 4 hình: (○, △, □, △).\nTrong mỗi nhóm chu kỳ 4 hình có đúng 2 hình tam giác (△) ở vị trí thứ 2 và thứ 4.\nThực hiện phép chia tìm số nhóm chu kỳ trong 500 hình đầu tiên:\n500 ÷ 4 = 125 (nhóm chu kỳ trọn vẹn, không dư).\nTổng số hình tam giác có trong 500 hình đầu tiên là:\n125 × 2 = 250 (hình tam giác)."
      },
      {
        "id": 53,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "It requires 12 minutes to cut a piece of wood into 5 sections. If the time required to cut into each section is the same, how many minutes are required to cut into 23 sections?",
        "questionVi": "Cần 12 phút để cưa một khúc gỗ thành 5 đoạn. Biết thời gian mỗi lần cưa là như nhau, hỏi cần bao nhiêu phút để cưa khúc gỗ đó thành 23 đoạn?",
        "vocab": "Require: Cần; Sections: Đoạn/Phần; The same: Giống nhau.",
        "image": null,
        "answer": "66",
        "acceptableAnswers": [
          "66"
        ],
        "unit": "",
        "hint": "Phương pháp Bài toán cưa gỗ / cắt đoạn đường (Số lần cắt = Số đoạn – 1).",
        "solution": "Để cưa khúc gỗ thành 5 đoạn cần số lần cưa là:\n5 – 1 = 4 (lần cưa)\nThời gian để thực hiện mỗi lần cưa là:\n12 ÷ 4 = 3 (phút)\nĐể cưa khúc gỗ thành 23 đoạn cần số lần cưa là:\n23 – 1 = 22 (lần cưa)\nThời gian cần thiết để cưa thành 23 đoạn là:\n22 × 3 = 66 (phút)."
      },
      {
        "id": 54,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Today is Sunday. Which day of the week will 1002 days be later?",
        "questionVi": "Hôm nay là Chủ Nhật. Hỏi 1002 ngày sau là thứ mấy trong tuần?",
        "vocab": "Sunday: Chủ Nhật; Day of the week: Thứ trong tuần; Later: Sau.",
        "image": null,
        "answer": "Monday (Thứ Hai)",
        "acceptableAnswers": [
          "Monday (Thứ Hai)",
          "Monday",
          "Thứ Hai",
          "Thu Hai",
          "thứ 2",
          "thu 2",
          "monday",
          "thứ hai",
          "thu hai"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ thứ trong tuần (Lấy số dư theo modulo 7).",
        "solution": "Một tuần có 7 ngày. Thực hiện phép chia lấy số tuần và số ngày dư:\n1002 ÷ 7 = 143 (dư 1)\nQuy đổi: 1002 ngày = 143 tuần và 1 ngày.\nVì hôm nay là Chủ Nhật, sau đúng 143 tuần trọn vẹn ngày đó vẫn là Chủ Nhật.\nThêm 1 ngày dư nữa thì ngày đó sẽ là Thứ Hai (Monday)."
      },
      {
        "id": 55,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Andy’s grandfather’s age this year adds 7, is divided by 5, minuses 2 and multiplied by 7. The result will be 91 years old. How old is Andy’s grandfather this year?",
        "questionVi": "Tuổi của ông Andy năm nay cộng thêm 7, chia cho 5, trừ đi 2 rồi nhân với 7 thì được 91 tuổi. Hỏi năm nay ông của Andy bao nhiêu tuổi?",
        "vocab": "Adds: Cộng; Divided: Chia; Minuses: Trừ; Multiplied: Nhân; Result: Kết quả.",
        "image": null,
        "answer": "68",
        "acceptableAnswers": [
          "68"
        ],
        "unit": "",
        "hint": "Phương pháp Tính ngược từ cuối (Working backwards).",
        "solution": "Áp dụng phương pháp tính ngược từ cuối:\n+ Trước khi nhân với 7, kết quả là:\n91 ÷ 7 = 13\n+ Trước khi trừ đi 2, kết quả là:\n13 + 2 = 15\n+ Trước khi chia cho 5, kết quả là:\n15 × 5 = 75\n+ Trước khi cộng thêm 7, tuổi của ông Andy là:\n75 – 7 = 68 (tuổi)."
      },
      {
        "id": 56,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 48 ÷ 1 + 48 ÷ 2 + 48 ÷ 3.",
        "questionVi": "Tính giá trị của biểu thức: 48 ÷ 1 + 48 ÷ 2 + 48 ÷ 3.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "88",
        "acceptableAnswers": [
          "88"
        ],
        "unit": "",
        "hint": "Phương pháp Thực hiện phép tính chia và cộng theo thứ tự ưu tiên.",
        "solution": "Thực hiện các phép chia trước rồi cộng các kết quả lại:\n48 ÷ 1 + 48 ÷ 2 + 48 ÷ 3\n= 48 + 24 + 16\n= 72 + 16\n= 88."
      },
      {
        "id": 57,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 3 – 6 + 9 – 12 + 15 – 18 + 21 – 24 + 27 – 30 + 33 – 36 + 39.",
        "questionVi": "Tính giá trị của biểu thức: 3 – 6 + 9 – 12 + 15 – 18 + 21 – 24 + 27 – 30 + 33 – 36 + 39.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "21",
        "acceptableAnswers": [
          "21"
        ],
        "unit": "",
        "hint": "Phương pháp Ghép cặp triệt tiêu trong dãy số đan dấu.",
        "solution": "Nhóm các số hạng theo từng cặp hiệu có giá trị bằng 3:\n3 – 6 + 9 – 12 + 15 – 18 + 21 – 24 + 27 – 30 + 33 – 36 + 39\n= (39 – 36) + (33 – 30) + (27 – 24) + (21 – 18) + (15 – 12) + (9 – 6) + 3\n= 3 + 3 + 3 + 3 + 3 + 3 + 3\n= 3 × 7\n= 21."
      },
      {
        "id": 58,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 11 + 14 + 17 + 20 + 23 + 26 + 29 + 32 + 35 + 38.",
        "questionVi": "Tính giá trị của tổng: 11 + 14 + 17 + 20 + 23 + 26 + 29 + 32 + 35 + 38.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "245",
        "acceptableAnswers": [
          "245"
        ],
        "unit": "",
        "hint": "Phương pháp Tính tổng dãy số cách đều.",
        "solution": "Đây là tổng của dãy số cách đều với khoảng cách là 3.\nSố số hạng của dãy là:\n(38 – 11) ÷ 3 + 1 = 10 (số hạng)\nTổng của dãy số là:\n(11 + 38) × 10 ÷ 2 = 49 × 5 = 245."
      },
      {
        "id": 59,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 123 × 23 + 246 × 20 + 37 × 123.",
        "questionVi": "Tính giá trị của biểu thức: 123 × 23 + 246 × 20 + 37 × 123.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "12300",
        "acceptableAnswers": [
          "12300"
        ],
        "unit": "",
        "hint": "Phương pháp Tách thừa số chung (Tính chất phân phối của phép nhân).",
        "solution": "Biến đổi số hạng ở giữa để xuất hiện thừa số chung 123:\n246 × 20 = 123 × 2 × 20 = 123 × 40\nKhi đó biểu thức trở thành:\n123 × 23 + 123 × 40 + 37 × 123\n= 123 × (23 + 40 + 37)\n= 123 × 100\n= 12300."
      },
      {
        "id": 60,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 11 × 111 × 1111.",
        "questionVi": "Tính giá trị của tích: 11 × 111 × 1111.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1356531",
        "acceptableAnswers": [
          "1356531"
        ],
        "unit": "",
        "hint": "Phương pháp Nhân với các số tạo bởi toàn chữ số 1.",
        "solution": "Thực hiện phép nhân tuần tự:\n11 × 111 = 1221\n1221 × 1111 = 1221 × (1000 + 100 + 10 + 1)\n= 1221000 + 122100 + 12210 + 1221\n= 1356531."
      },
      {
        "id": 61,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the smallest 4-digit number that can be divisible by 4 and 6?",
        "questionVi": "Tìm số nhỏ nhất có 4 chữ số mà chia hết cho cả 4 và 6.",
        "vocab": "Smallest 4-digit number: Số nhỏ nhất có 4 chữ số; Divisible: Chia hết.",
        "image": null,
        "answer": "1008",
        "acceptableAnswers": [
          "1008"
        ],
        "unit": "",
        "hint": "Phương pháp Bội chung nhỏ nhất và Tìm số nhỏ nhất có 4 chữ số.",
        "solution": "Một số chia hết cho cả 4 và 6 thì sẽ chia hết cho BCNN(4, 6) = 12.\nSố nhỏ nhất có 4 chữ số là 1000.\nThực hiện phép chia: 1000 ÷ 12 = 83 (dư 4).\nDo đó, số nhỏ nhất có 4 chữ số chia hết cho 12 là:\n12 × 84 = 1008."
      },
      {
        "id": 62,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of A if A = (5 × 5 × 5 × ... × 5) × (3 × 3 × 3 × ... × 3) (there are 2018 '5's and 2018 '3's).",
        "questionVi": "Tìm chữ số tận cùng của biểu thức A nếu A = (5 × 5 × 5 × ... × 5) × (3 × 3 × 3 × ... × 3) (gồm 2018 thừa số 5 và 2018 thừa số 3).",
        "vocab": "Unit digit: Chữ số tận cùng.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp Tính chất chữ số tận cùng của tích chứa thừa số 5 với số lẻ.",
        "solution": "Tích A gồm hai nhóm:\nNhóm 1: Tích của 2018 thừa số 5 luôn có chữ số tận cùng là 5.\nNhóm 2: Tích của 2018 thừa số 3 là tích của các số lẻ nên luôn là một số lẻ.\nTích của một số có tận cùng là 5 với một số lẻ bất kỳ luôn có chữ số tận cùng là 5.\nVậy chữ số tận cùng của A là 5."
      },
      {
        "id": 63,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Define the operation symbol a ⊕ b = (a + b) × (a – b), find the value of (145 ⊕ 135).",
        "questionVi": "Định nghĩa phép toán quy ước: a ⊕ b = (a + b) × (a – b). Hãy tính giá trị của biểu thức: 145 ⊕ 135.",
        "vocab": "Operation symbol: Kí hiệu phép toán; Value: Giá trị.",
        "image": null,
        "answer": "2800",
        "acceptableAnswers": [
          "2800"
        ],
        "unit": "",
        "hint": "Phương pháp Định nghĩa phép toán quy ước (Custom Operation).",
        "solution": "Theo định nghĩa phép toán quy ước a ⊕ b = (a + b) × (a – b), ta có:\n145 ⊕ 135 = (145 + 135) × (145 – 135)\n= 280 × 10\n= 2800."
      },
      {
        "id": 64,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The product of positive numbers A and B is 363. A is 3 times of B. Find the value of A.",
        "questionVi": "Tích của hai số dương A và B là 363. Biết rằng A gấp 3 lần B. Tìm giá trị của số A.",
        "vocab": "Product: Tích; Positive numbers: Số dương; 3 times: Gấp 3 lần; Value: Giá trị.",
        "image": null,
        "answer": "33",
        "acceptableAnswers": [
          "33"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm hai số khi biết tích và tỉ số của hai số.",
        "solution": "Theo đề bài, A gấp 3 lần B, tức là A = 3 × B.\nTích của A và B là:\nA × B = (3 × B) × B = 3 × B × B = 363\nSuy ra: B × B = 363 ÷ 3 = 121\nVì 11 × 11 = 121 nên B = 11.\nGiá trị của số A là:\nA = 3 × 11 = 33."
      },
      {
        "id": 65,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If a 9-digit number 20181013A is divisible by 18, find the value of A.",
        "questionVi": "Nếu số có 9 chữ số 20181013A chia hết cho 18, hãy tìm giá trị của chữ số A.",
        "vocab": "9-digit number: Số có 9 chữ số; Divisible: Chia hết; Value: Giá trị.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 18 (Chia hết cho cả 2 và 9).",
        "solution": "Vì 18 = 2 × 9 và ƯCLN(2, 9) = 1, nên số 20181013A chia hết cho 18 khi và chỉ khi nó chia hết cho cả 2 và 9.\n+ Để số đó chia hết cho 9 thì tổng các chữ số phải chia hết cho 9:\n2 + 0 + 1 + 8 + 1 + 0 + 1 + 3 + A = 16 + A phải chia hết cho 9.\nVì A là chữ số (0 ≤ A ≤ 9) nên 16 + A = 18 => A = 2.\n+ Với A = 2, chữ số tận cùng là 2 nên số đó chia hết cho 2 (thỏa mãn).\nVậy giá trị của chữ số A là 2."
      },
      {
        "id": 66,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) with “*” is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình chữ nhật có chứa dấu \"*\" trong hình vẽ dưới đây?",
        "vocab": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "image": "images/de3_q16.png",
        "answer": "24",
        "acceptableAnswers": [
          "24"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình chữ nhật chứa ô chỉ định bằng quy tắc nhân tổ hợp.",
        "solution": "Quan sát lưới hình vẽ chứa dấu \"*\":\nĐể tạo thành một hình chữ nhật chứa ô có dấu \"*\", ta chọn:\n- Cạnh trên: có 2 cách chọn.\n- Cạnh dưới: có 3 cách chọn.\n- Cạnh trái: có 2 cách chọn.\n- Cạnh phải: có 2 cách chọn.\nSố hình chữ nhật chứa dấu \"*\" là:\n2 × 3 × 2 × 2 = 24 (hình chữ nhật)."
      },
      {
        "id": 67,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "It is known as the lengths of shorter sides for a right-angled triangle are 5cm and 12cm respectively. Find the length of the longest side in cm.",
        "questionVi": "Biết độ dài hai cạnh góc vuông của một tam giác vuông lần lượt là 5 cm và 12 cm. Hãy tìm độ dài của cạnh dài nhất (cạnh huyền) theo cm.",
        "vocab": "Lengths: Độ dài; Shorter sides: Các cạnh ngắn hơn; Right-angled triangle: Tam giác vuông; Longest side: Cạnh dài nhất.",
        "image": null,
        "answer": "13",
        "acceptableAnswers": [
          "13"
        ],
        "unit": "",
        "hint": "Phương pháp Định lý cạnh tam giác vuông (Bộ ba số Pythagoras 5 - 12 - 13).",
        "solution": "Áp dụng tính chất định lý số học trong tam giác vuông (bộ ba số Pythagoras):\nGọi cạnh dài nhất (cạnh huyền) là c (cm). Ta có:\nc² = 5² + 12² = 25 + 144 = 169\nVì 13 × 13 = 169 nên c = 13 cm.\nVậy độ dài cạnh dài nhất là 13 cm."
      },
      {
        "id": 68,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The area of a rectangle is 80 cm². If the sides of the rectangle are integers, how many different value(s) of the perimeter of this rectangle is / are there?",
        "questionVi": "Diện tích của một hình chữ nhật là 80 cm². Biết độ dài các cạnh là số nguyên, hỏi có bao nhiêu giá trị chu vi khác nhau của hình chữ nhật này?",
        "vocab": "Area: Diện tích; Rectangle: Hình chữ nhật; Sides: Các cạnh; Integers: Số nguyên; Perimeter: Chu vi.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp Phân tích diện tích thành tích hai thừa số nguyên dương.",
        "solution": "Diện tích hình chữ nhật bằng tích chiều dài và chiều rộng (dài × rộng = 80).\nVì độ dài các cạnh là số nguyên dương nên ta phân tích 80 thành tích của 2 thừa số:\n80 = 1 × 80  => Chu vi: (1 + 80) × 2 = 162 cm\n80 = 2 × 40  => Chu vi: (2 + 40) × 2 = 84 cm\n80 = 4 × 20  => Chu vi: (4 + 20) × 2 = 48 cm\n80 = 5 × 16  => Chu vi: (5 + 16) × 2 = 42 cm\n80 = 8 × 10  => Chu vi: (8 + 10) × 2 = 36 cm\nCó 5 cặp kích thước khác nhau cho 5 giá trị chu vi khác nhau.\nVậy có 5 giá trị chu vi khác nhau."
      },
      {
        "id": 69,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A big square is formed by 25 squares with side length 7 cm. How many cm is the perimeter of the big square?",
        "questionVi": "Một hình vuông lớn được ghép từ 25 hình vuông nhỏ có cạnh 7 cm. Hỏi chu vi của hình vuông lớn là bao nhiêu xăng-ti-mét?",
        "vocab": "Square: Hình vuông; Side length: Độ dài cạnh; Perimeter: Chu vi.",
        "image": null,
        "answer": "140",
        "acceptableAnswers": [
          "140"
        ],
        "unit": "",
        "hint": "Phương pháp Tính chu vi hình vuông ghép từ các hình vuông nhỏ.",
        "solution": "Vì 25 = 5 × 5, nên hình vuông lớn được ghép từ một lưới gồm 5 hàng và 5 cột hình vuông nhỏ.\nĐộ dài một cạnh của hình vuông lớn là:\n5 × 7 = 35 (cm)\nChu vi của hình vuông lớn là:\n35 × 4 = 140 (cm)."
      },
      {
        "id": 70,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many right-angled triangle(s) is / are there in the figure below?",
        "questionVi": "Có bao nhiêu hình tam giác vuông trong hình vẽ dưới đây?",
        "vocab": "Right-angled triangles: Tam giác vuông; Figure: Hình vẽ.",
        "image": null,
        "answer": "13",
        "acceptableAnswers": [
          "13"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình tam giác vuông theo các cấp độ phân rã.",
        "solution": "Phân tích và đếm các hình tam giác vuông trong hình vẽ:\n- Đếm các tam giác vuông đơn lẻ kích thước nhỏ: có 8 hình.\n- Đếm các tam giác vuông ghép đôi: có 4 hình.\n- Đếm tam giác vuông ghép lớn: có 1 hình.\nTổng số hình tam giác vuông có trong hình vẽ là:\n8 + 4 + 1 = 13 (hình tam giác vuông)."
      },
      {
        "id": 71,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Find the smallest difference of two 4-digit numbers formed by using all 8 digits from 0 to 7 without repetition.",
        "questionVi": "Tìm hiệu nhỏ nhất có thể có giữa hai số có 4 chữ số được tạo thành bằng cách dùng tất cả 8 chữ số từ 0 đến 7 không lặp lại.",
        "vocab": "Smallest difference: Hiệu nhỏ nhất; 4-digit numbers: Số có 4 chữ số; Without repetition: Không lặp lại.",
        "image": null,
        "answer": "247",
        "acceptableAnswers": [
          "247"
        ],
        "unit": "",
        "hint": "Phương pháp Cấu tạo số và Chặn giá trị hiệu nhỏ nhất.",
        "solution": "Để hiệu giữa hai số có 4 chữ số là nhỏ nhất:\n- Chữ số hàng nghìn của hai số phải hơn kém nhau 1 đơn vị: chọn cặp (4, 3).\n- Số lớn cần có giá trị nhỏ nhất có thể, do đó các chữ số hàng trăm, chục, đơn vị chọn các chữ số nhỏ nhất còn lại theo thứ tự tăng dần: 0, 1, 2 => Số lớn là 4012.\n- Số bé cần có giá trị lớn nhất có thể, do đó các chữ số hàng trăm, chục, đơn vị chọn các chữ số lớn nhất còn lại theo thứ tự giảm dần: 7, 6, 5 => Số bé là 3765.\nHiệu nhỏ nhất có thể là:\n4012 – 3765 = 247."
      },
      {
        "id": 72,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "It is given that the total weight of 3 apples and 3 oranges is 600g. The weight of an apple is the same as that of 3 oranges. What is the weight (g) of 1 apple?",
        "questionVi": "Biết tổng khối lượng của 3 quả táo và 3 quả cam là 600g. Khối lượng của 1 quả táo bằng khối lượng của 3 quả cam. Hỏi 1 quả táo nặng bao nhiêu gam?",
        "vocab": "Total weight: Tổng khối lượng; Apples: Quả táo; Oranges: Quả cam; The same as: Bằng nhau.",
        "image": null,
        "answer": "150",
        "acceptableAnswers": [
          "150"
        ],
        "unit": "",
        "hint": "Phương pháp Khử đại lượng và Thay thế (Bài toán đại lượng tỉ lệ).",
        "solution": "Theo đề bài, 1 quả táo nặng bằng 3 quả cam.\nDo đó, 3 quả táo có khối lượng bằng:\n3 × 3 = 9 (quả cam)\nThay thế vào đề bài, khối lượng của 3 quả táo và 3 quả cam tương đương với khối lượng của:\n9 + 3 = 12 (quả cam)\nKhối lượng của 1 quả cam là:\n600 ÷ 12 = 50 (g)\nKhối lượng của 1 quả táo là:\n50 × 3 = 150 (g)."
      },
      {
        "id": 73,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "It requires 10 people to take 8 days to complete a task. How many day(s) is / are needed for 16 people to finish the same task?",
        "questionVi": "Cần 10 người làm việc trong 8 ngày để hoàn thành một công việc. Hỏi cần bao nhiêu ngày để 16 người hoàn thành xong công việc đó?",
        "vocab": "Requires: Cần; Complete a task: Hoàn thành một công việc; Days: Ngày.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp Bài toán tỉ lệ nghịch (Đại lượng công-ngày cố định).",
        "solution": "Tổng khối lượng công việc tính theo đơn vị người - ngày là:\n10 × 8 = 80 (người - ngày)\nSố ngày cần thiết để 16 người hoàn thành xong công việc đó là:\n80 ÷ 16 = 5 (ngày)."
      },
      {
        "id": 74,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are a total of 14 chickens and rabbits in a farm. The animals have a total of 32 legs. How many rabbit(s) is / are there?",
        "questionVi": "Trong trang trại có tổng cộng 14 con gà và thỏ. Tổng số chân của các con vật là 32 chân. Hỏi có bao nhiêu con thỏ?",
        "vocab": "Total: Tổng số; Chickens: Con gà; Rabbits: Con thỏ; Legs: Chân.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán gà và thỏ).",
        "solution": "Áp dụng phương pháp Giả thiết tạm:\nGiả sử cả 14 con đều là gà (mỗi con gà có 2 chân).\nKhi đó tổng số chân là:\n14 × 2 = 28 (chân)\nSố chân bị hụt so với thực tế là:\n32 – 28 = 4 (chân)\nMỗi con thỏ nhiều hơn mỗi con gà số chân là:\n4 – 2 = 2 (chân)\nSố con thỏ là:\n4 ÷ 2 = 2 (con thỏ)."
      },
      {
        "id": 75,
        "examId": "heat_de3",
        "examIndex": 2,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 2-digit numbers are there such that the number contains digit “8”?",
        "questionVi": "Có bao nhiêu số có 2 chữ số sao cho trong số đó có chứa chữ số \"8\"?",
        "vocab": "2-digit number: Số có 2 chữ số; Digit: Chữ số.",
        "image": null,
        "answer": "18",
        "acceptableAnswers": [
          "18"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm theo vị trí chữ số và Nguyên lý bù trừ (Inclusion-Exclusion).",
        "solution": "Các số có 2 chữ số chứa chữ số \"8\" gồm hai nhóm:\n- Nhóm 1: Chữ số hàng đơn vị là 8: {18, 28, 38, 48, 58, 68, 78, 88, 98} gồm 9 số.\n- Nhóm 2: Chữ số hàng chục là 8: {80, 81, 82, 83, 84, 85, 86, 87, 88, 89} gồm 10 số.\nNhận thấy số 88 xuất hiện ở cả hai nhóm nên được đếm 2 lần.\nSố lượng các số có 2 chữ số chứa chữ số \"8\" là:\n9 + 10 – 1 = 18 (số)."
      }
    ]
  },
  {
    "id": "heat_de4",
    "title": "Đề số 4: VCK Quốc gia (2017 – 2018)",
    "titleEn": "Paper 4: National Final Heat Round (2017 – 2018)",
    "year": "2017 – 2018",
    "grade": "Khối 4 / Grade 4",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "color": "blue",
        "range": [
          1,
          5
        ]
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "color": "emerald",
        "range": [
          6,
          10
        ]
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "color": "purple",
        "range": [
          11,
          15
        ]
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "color": "amber",
        "range": [
          16,
          20
        ]
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "color": "rose",
        "range": [
          21,
          25
        ]
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
        "questionEn": "What is the value of the number to represent \"?\" in the following sequence?",
        "questionVi": "Số nào thích hợp để thay thế dấu \"?\" trong dãy số dưới đây?\n1, 1, 2, 4, 7, 13, 24, ?, 81, 149, ...",
        "vocab": "Value: Giá trị; Represent: Biểu diễn; Sequence: Dãy số.",
        "image": null,
        "answer": "44",
        "acceptableAnswers": [
          "44"
        ],
        "unit": "",
        "hint": "Phương pháp Dãy số Tribonacci (Mỗi số bằng tổng của 3 số đứng liền trước).",
        "solution": "Nhận thấy quy luật của dãy số: Bắt đầu từ số 4, mỗi số trong dãy bằng tổng của 3 số đứng ngay trước nó.\n4 = 1 + 1 + 2\n7 = 1 + 2 + 4\n13 = 2 + 4 + 7\n24 = 4 + 7 + 13\nDo đó, số cần điền vào dấu \"?\" là:\n7 + 13 + 24 = 44"
      },
      {
        "id": 77,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many circle(s) is/are there from the 1st to the 200th figure counting from the left?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tròn từ hình thứ 1 đến hình thứ 200 tính từ trái sang phải?\n○ △ □ △ ○ ○ △ □ △ ○ ○ ○ △ □ △ ○ ...",
        "vocab": "Pattern: Quy luật; Circles: Hình tròn; Figure: Hình vẽ.",
        "image": null,
        "answer": "68",
        "acceptableAnswers": [
          "68"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ hình học và Đếm theo nhóm chu kỳ.",
        "solution": "Nhận xét quy luật hình:\n+ Thứ tự xuất hiện các hình: Hình tròn (○), Hình tam giác (△), Hình vuông (□).\n+ Số lượng mỗi hình tăng lên 1 sau mỗi chu kỳ xuất hiện."
      },
      {
        "id": 78,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "A stationery store had a batch of ball pens. One half but 2 fewer pens were sold on the first day. One half of the remaining part but 3 fewer pens were sold on the second day. Finally, 11 ball pens are left. How many ball pen(s) did the stationery store have originally?",
        "questionVi": "Một cửa hàng văn phòng phẩm có một lô bút bi. Ngày thứ nhất bán được một nửa số bút bớt đi 2 chiếc. Ngày thứ hai bán được một nửa số bút còn lại và thêm 2 chiếc nữa. Cuối cùng trong cửa hàng còn lại 12 chiếc bút. Hỏi ban đầu cửa hàng có bao nhiêu chiếc bút bi?",
        "vocab": "One half: Một nửa; Fewer: Ít hơn; Remaining: Còn lại; Originally: Lúc đầu.",
        "image": null,
        "answer": "28",
        "acceptableAnswers": [
          "28"
        ],
        "unit": "",
        "hint": "Phương pháp Tính ngược từ cuối (Working backwards).",
        "solution": "Số bút còn lại sau ngày thứ nhất là:\n(11 - 3) × 2 = 16 (cái)\nSố bút cửa hàng có ban đầu là:\n(16 - 2) × 2 = 28 (cái)"
      },
      {
        "id": 79,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 3-digit number on a piece of paper and asked Peter to guess it.",
        "questionVi": "John viết một số có 3 chữ số lên một mẩu giấy và đố Peter đoán số đó.\nPeter đoán: \"Có phải số 182 không?\"\nJohn trả lời: \"Một trong các chữ số là đúng, nhưng vị trí của chữ số đó bị sai.\"\nPeter đoán tiếp: \"Có phải số 835 không?\"\nJohn trả lời: \"Hai chữ số là đúng, nhưng vị trí của cả hai chữ số đều sai.\"\nPeter lại đoán: \"Có phải số 354 không?\"\nJohn nói: \"Hai chữ số là đúng, nhưng vị trí của cả hai chữ số đều sai.\"\nPeter đoán tiếp: \"Có phải số 847 không?\"\nJohn nói: \"Một trong các chữ số là đúng và vị trí của chữ số đó cũng đúng.\"\nHỏi số mà John đã viết là số nào?",
        "vocab": "3-digit number: Số có 3 chữ số; Digit: Chữ số; Position: Vị trí.",
        "image": null,
        "answer": "853",
        "acceptableAnswers": [
          "853"
        ],
        "unit": "",
        "hint": "Phương pháp Suy luận logic và Phân tích vị trí chữ số.",
        "solution": "Xét hai lượt đoán 723 và 842: Chữ số 2 xuất hiện ở hàng chục và hàng đơn vị, không thể cùng đúng ở hai vị trí khác nhau nên số 2 không tồn tại trong số cần tìm.\nTương tự loại 7 và 4.\nDo đó, số cần tìm gồm các chữ số 3, 5, 8.\nTrong đó chữ số 3 đúng vị trí hàng đơn vị và chữ số 8 đúng vị trí hàng trăm."
      },
      {
        "id": 80,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are a total of 40 tigers and cranes in a zoo. The animals have a total of 104 legs. How many tiger(s) is/are there?",
        "questionVi": "Trong vườn thú có tổng cộng 40 con hổ và chim hạc. Tổng số chân của các con vật là 104 chân. Hỏi có bao nhiêu con hổ?",
        "vocab": "Total: Tổng cộng.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán gà và thỏ).",
        "solution": "Giả sử cả 40 con vật đều là con hạc (mỗi con có 2 chân), tổng số chân là:\n2 × 40 = 80 (chân)\nSố con hổ (mỗi con có 4 chân) trong sở thú là:\n(104 - 80) : (4 - 2) = 12 (con)\nArithmetic / Số học"
      },
      {
        "id": 81,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 2052 ÷ 19 + 2052 ÷ 3 - 2052 ÷ 9.",
        "questionVi": "Tính giá trị của biểu thức: 2052 ÷ 19 + 2052 ÷ 3 – 2052 ÷ 9.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "564",
        "acceptableAnswers": [
          "564"
        ],
        "unit": "",
        "hint": "Phương pháp Đặt thừa số chung đối với phép chia.",
        "solution": "2052 ÷ 19 + 2052 ÷ 3 - 2052 ÷ 9\n= 108 + 684 - 228\n= 792 - 228\n= 564"
      },
      {
        "id": 82,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 13131313 + 8080808 × 4 + 11111111 × 5.",
        "questionVi": "Tính giá trị của biểu thức: 13131313 + 8080808 × 4 + 11111111 × 5.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "101010100",
        "acceptableAnswers": [
          "101010100"
        ],
        "unit": "",
        "hint": "Phương pháp Tách thừa số chung cấu tạo số (Dạng số có chu kỳ lặp lại).",
        "solution": "13131313 + 8080808 × 4 + 11111111 × 5\n= 13 × 1010101 + 1010101 × 8 × 4 + 1010101 × 11 × 5\n= 13 × 1010101 + 1010101 × 32 + 1010101 × 55\n= (13 + 32 + 55) × 1010101\n= 100 × 1010101\n= 101010100"
      },
      {
        "id": 83,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1 + 2 + 3 + ... + 49 + 50 + 49 + ... + 3 + 2 + 1.",
        "questionVi": "Tính giá trị của tổng: 1 + 2 + 3 + ... + 49 + 50 + 49 + ... + 3 + 2 + 1.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "2500",
        "acceptableAnswers": [
          "2500"
        ],
        "unit": "",
        "hint": "Phương pháp Tính tổng dãy số đối xứng (Tổng các số tự nhiên liên tiếp tăng dần rồi giảm dần).",
        "solution": "1 + 2 + 3 + ... + 49 + 50 + 49 + ... + 3 + 2 + 1\n= 2 × (1 + 2 + 3 + ... + 49) + 50\n= 2 × ((1 + 49) × 49 : 2) + 50\n= 50 × 49 + 50\n= 50 × (49 + 1)\n= 50 × 50 = 2500"
      },
      {
        "id": 84,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 10 × 10 - 9 × 9 + 8 × 8 - 7 × 7 + 6 × 6 - 5 × 5 + 4 × 4 - 3 × 3 + 2 × 2 - 1 × 1.",
        "questionVi": "Tính giá trị của biểu thức: 10 × 10 – 9 × 9 + 8 × 8 – 7 × 7 + 6 × 6 – 5 × 5 + 4 × 4 – 3 × 3 + 2 × 2 – 1 × 1.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "55",
        "acceptableAnswers": [
          "55"
        ],
        "unit": "",
        "hint": "Phương pháp Hiệu hai bình phương liên tiếp (Hằng đẳng thức số học lớp 4).",
        "solution": "10 × 10 - 9 × 9 + 8 × 8 - 7 × 7 + 6 × 6 - 5 × 5 + 4 × 4 - 3 × 3 + 2 × 2 - 1 × 1\n= (100 - 81) + (64 - 49) + (36 - 25) + (16 - 9) + (4 - 1)\n= 19 + 15 + 11 + 7 + 3\n= (19 + 11) + (7 + 3) + 15\n= 30 + 10 + 15\n= 55"
      },
      {
        "id": 85,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 12345654321 ÷ 12321.",
        "questionVi": "Tính giá trị của phép chia: 12345654321 ÷ 12321.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1002001",
        "acceptableAnswers": [
          "1002001"
        ],
        "unit": "",
        "hint": "Phương pháp Nhận diện bình phương của số tạo bởi toàn chữ số 1.",
        "solution": "12345654321 ÷ 12321 = 1002001\nNumber Theory / Lý thuyết số"
      },
      {
        "id": 86,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If 9-digit number 20171221A is divisible by 9, find the value of A.",
        "questionVi": "Nếu số có 9 chữ số 20171221A chia hết cho 9, hãy tìm giá trị của chữ số A.",
        "vocab": "9-digit number: Số có 9 chữ số; Divisible: Chia hết; Value: Giá trị.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 9.",
        "solution": "Số 20171221A chia hết cho 9 khi tổng các chữ số của nó chia hết cho 9:\n(2 + 0 + 1 + 7 + 1 + 2 + 2 + 1 + A) = 16 + A\nĐể (16 + A) chia hết cho 9 và A là chữ số thì A = 2."
      },
      {
        "id": 87,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of A if A = (5 × 5 × 5 × ... × 5) × (6 × 6 × 6 × ... × 6) [với 2017 thừa số].",
        "questionVi": "Tìm chữ số tận cùng của biểu thức A nếu A = (5 × 5 × 5 × ... × 5) × (2 × 2 × 2 × ... × 2) (gồm 2017 thừa số 5 và 2018 thừa số 2).",
        "vocab": "Unit digit: Chữ số hàng đơn vị.",
        "image": null,
        "answer": "0",
        "acceptableAnswers": [
          "0"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm chữ số tận cùng của tích chứa thừa số 5 và số chẵn.",
        "solution": "Vì tích A là số chia hết cho 5 và có chứa các thừa số chẵn (các thừa số 6), nên A là một số chẵn chia hết cho 5.\nDo đó, chữ số hàng đơn vị (tận cùng) của A là 0."
      },
      {
        "id": 88,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Define the operation symbol a ⊗ b = b × b - a × a, find the value of (121 ⊗ 131).",
        "questionVi": "Định nghĩa phép toán quy ước: a ⊗ b = b × b – a × a. Hãy tính giá trị của biểu thức: 14 ⊗ (13 ⊗ 17).",
        "vocab": "Operation symbol: Kí hiệu phép toán; Value: Giá trị.",
        "image": null,
        "answer": "2520",
        "acceptableAnswers": [
          "2520"
        ],
        "unit": "",
        "hint": "Phương pháp Định nghĩa phép toán quy ước (Custom Operation).",
        "solution": "Áp dụng quy tắc phép toán đã cho:\n121 ⊗ 131 = 131 × 131 - 121 × 121\n= 17161 - 14641\n= 2520"
      },
      {
        "id": 89,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The product of positive numbers A and B is 392. A is 2 times of B. Find the value of A.",
        "questionVi": "Tích của hai số dương A và B là 392. Biết rằng A gấp 2 lần B. Tìm giá trị của số A.",
        "vocab": "Product: Tích; Positive numbers: Số dương; 2 times: Gấp 2 lần; Value: Giá trị.",
        "image": null,
        "answer": "28",
        "acceptableAnswers": [
          "28"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm hai số khi biết tích và tỉ số của hai số.",
        "solution": "Ta có:\nA × B = 392\nA = 2 × B\n2 × B × B = 392\nB × B = 196\nB = 14\nA = 2 × 14 = 28"
      },
      {
        "id": 90,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the greatest 3-digit number that can be divisible by 3 and 5?",
        "questionVi": "Tìm số lớn nhất có 3 chữ số mà chia hết cho cả 2, 5 và 9.",
        "vocab": "Greatest: Lớn nhất; 3-digit number: Số có 3 chữ số; Divisible: Chia hết.",
        "image": null,
        "answer": "990",
        "acceptableAnswers": [
          "990"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 2, 5 và 9 (Bội chung nhỏ nhất).",
        "solution": "Số có 3 chữ số lớn nhất chia hết cho cả 3 và 5 là 990.\nGeometry / Hình học"
      },
      {
        "id": 91,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) is/are there in the figure below?",
        "questionVi": "Có bao nhiêu hình chữ nhật trong hình vẽ dưới đây?",
        "vocab": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "image": "images/de2_q16.png",
        "answer": "147",
        "acceptableAnswers": [
          "147"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm số hình chữ nhật trong lưới kẻ ô bằng quy tắc nhân tổ hợp.",
        "solution": "Tổng số hình chữ nhật trong hình là 147."
      },
      {
        "id": 92,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Find the perimeter of the figure shown on the right in cm.",
        "questionVi": "Tính chu vi của hình bậc thang được cho trong hình vẽ bên dưới theo đơn vị xăng-ti-mét (cm).",
        "vocab": "Perimeter: Chu vi; Figure: Hình vẽ.",
        "image": "images/de2_q17.png",
        "answer": "46",
        "acceptableAnswers": [
          "46"
        ],
        "unit": "",
        "hint": "Phương pháp Tính chu vi hình bậc thang (Dồn cạnh về hình chữ nhật tương đương).",
        "solution": "Tổng độ dài các cạnh bao quanh hình là:\n5 + 3 + 4 + 3 + 4 + 7 + 4 + 4 + 5 + 7 = 46 (cm)"
      },
      {
        "id": 93,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Find the area of the figure shown below in cm².",
        "questionVi": "Tính diện tích của hình bậc thang được cho dưới đây theo đơn vị xăng-ti-mét vuông (cm²).",
        "vocab": "Area: Diện tích; Figure: Hình vẽ.",
        "image": "images/de2_q18.png",
        "answer": "40",
        "acceptableAnswers": [
          "40"
        ],
        "unit": "",
        "hint": "Phương pháp Chia nhỏ hình đa giác bậc thang thành các hình chữ nhật đơn giản.",
        "solution": "Tính diện tích hình chữ H bằng cách lấy diện tích hình chữ nhật lớn bao quanh trừ đi diện tích các phần trống:\n8 × (2 + 4 + 2) - 3 × 4 - 3 × 4 = 40 (cm²)"
      },
      {
        "id": 94,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A big square is formed by 36 small squares with side length 5 cm. What is the perimeter of the big square in centimeter?",
        "questionVi": "Một hình vuông lớn được tạo thành từ 36 hình vuông nhỏ có độ dài cạnh là 5 cm. Hỏi chu vi của hình vuông lớn là bao nhiêu xăng-ti-mét?",
        "vocab": "Square: Hình vuông; Side length: Độ dài cạnh; Perimeter: Chu vi.",
        "image": null,
        "answer": "120",
        "acceptableAnswers": [
          "120"
        ],
        "unit": "",
        "hint": "Phương pháp Tính chu vi hình vuông ghép từ các hình vuông nhỏ.",
        "solution": "Hình vuông lớn gồm 36 hình vuông nhỏ ghép lại, nên cạnh hình vuông lớn gồm 6 cạnh hình vuông nhỏ.\nĐộ dài cạnh hình vuông lớn là:\n5 × 6 = 30 (cm)\nChu vi hình vuông lớn là:\n30 × 4 = 120 (cm)"
      },
      {
        "id": 95,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many right-angled triangle(s) is/are there in the figure below?",
        "questionVi": "Có bao nhiêu hình tam giác vuông trong hình vẽ dưới đây?",
        "vocab": "Right-angled triangles: Tam giác vuông; Figure: Hình vẽ.",
        "image": "images/de2_q20.png",
        "answer": "16",
        "acceptableAnswers": [
          "16"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm hình tam giác vuông theo các cấp kích thước.",
        "solution": "Đếm các hình tam giác vuông tạo thành trong hình vẽ:\nTổng số tam giác vuông là 16.\nCombinatorics / Tổ hợp"
      },
      {
        "id": 96,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 7 steps. David can go up for 1 step or 2 steps each time. How many way(s) is/are there for David to go up the stairs?",
        "questionVi": "Một cầu thang có 7 bậc. David có thể bước lên 1 bậc hoặc 2 bậc mỗi lần bước. Hỏi David có bao nhiêu cách khác nhau để bước lên hết cầu thang?",
        "vocab": "Flight of stairs: Cầu thang; Step: Bậc.",
        "image": null,
        "answer": "21",
        "acceptableAnswers": [
          "21"
        ],
        "unit": "",
        "hint": "Phương pháp Dãy số Fibonacci (Bài toán bước cầu thang).",
        "solution": "Liệt kê các trường hợp kết hợp bước 1 bậc và 2 bậc:\n- 7 bước 1 bậc (1×7): 1 cách\n- 5 bước 1 bậc, 1 bước 2 bậc (1×5 + 2×1): 6 cách\n- 3 bước 1 bậc, 2 bước 2 bậc (1×3 + 2×2): 10 cách\n- 1 bước 1 bậc, 3 bước 2 bậc (1×1 + 2×3): 4 cách\nTổng số cách là:\n1 + 6 + 10 + 4 = 21 (cách)"
      },
      {
        "id": 97,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Two boys Bobby, Benny and two girls Grace, Gloria are to be seated in a row according to the rule that a boy will not sit next to another boy and a girl will not sit next to another girl. Find the number of the combination(s) satisfying the above condition.",
        "questionVi": "Hai bạn nam Bobby, Benny và hai bạn nữ Grace, Gloria xếp thành một hàng ngang. Biết rằng hai bạn nam không đứng cạnh nhau, hỏi có bao nhiêu cách xếp hàng thỏa mãn?",
        "vocab": "Row: Hàng ngang; Combinations: Cách sắp xếp; Condition: Điều kiện.",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8"
        ],
        "unit": "",
        "hint": "Phương pháp Nguyên lý xếp hàng và Quy tắc nhân xác suất - tổ hợp.",
        "solution": "Để nam không ngồi cạnh nam và nữ không ngồi cạnh nữ, nam và nữ phải ngồi xen kẽ nhau:\n- Có 2 mẫu vị trí: (Nam - Nữ - Nam - Nữ) hoặc (Nữ - Nam - Nữ - Nam).\n- Với mỗi mẫu, số cách xếp 2 bạn nam là 2 cách, số cách xếp 2 bạn nữ là 2 cách.\nSố cách xếp thỏa mãn điều kiện là:\n2 × 2 × 2 = 8 (cách)"
      },
      {
        "id": 98,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 2 digits, without repetition, from 1, 2, 4, 6, 7 to form 2-digit numbers. How many number(s) can be divisible by 3?",
        "questionVi": "Chọn ra 2 chữ số không lặp lại từ các chữ số 1, 2, 4, 6, 7 để tạo thành một số chẵn có hai chữ số. Hỏi có thể tạo được bao nhiêu số như vậy?",
        "vocab": "Digits: Chữ số; Without repetition: Không lặp lại; 2-digit numbers: Số có 2 chữ số; Divisible: Chia hết.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6"
        ],
        "unit": "",
        "hint": "Phương pháp Lập số có hai chữ số và Phân hoạch trường hợp chẵn.",
        "solution": "Các số thỏa mãn gồm: 12, 21, 24, 27, 42, 72.\nTổng cộng có 6 số."
      },
      {
        "id": 99,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 2-digit number(s) is/are there such that the number contains digit \"6\" and no digits are repeated?",
        "questionVi": "Có bao nhiêu số có 2 chữ số sao cho tích của chữ số hàng chục và chữ số hàng đơn vị là số chẵn?",
        "vocab": "2-digit number: Số có 2 chữ số; Digit: Chữ số; Repeated: Lặp lại.",
        "image": null,
        "answer": "17",
        "acceptableAnswers": [
          "17"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm số tự nhiên thỏa mãn điều kiện chữ số hàng chục và hàng đơn vị.",
        "solution": "Xét các trường hợp số có 2 chữ số chứa chữ số 6 và không lặp chữ số:\n- Trường hợp 1: Chữ số hàng chục là 6 -> Chữ số hàng đơn vị chọn từ 9 chữ số còn lại (loại 6): 9 cách.\n- Trường hợp 2: Chữ số hàng đơn vị là 6 -> Chữ số hàng chục chọn từ 8 chữ số còn lại (loại 0 và 6): 8 cách.\nTổng số lượng các số thỏa mãn là:\n9 + 8 = 17 (số)"
      },
      {
        "id": 100,
        "examId": "heat_de4",
        "examIndex": 3,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "If Andy goes from point A to point B, each step can only move up or move right along the lines. How many way(s) is/are there?",
        "questionVi": "Nếu Andy đi từ điểm A đến điểm B, mỗi bước chỉ có thể đi lên trên hoặc đi sang phải theo các đường kẻ. Hỏi Andy có bao nhiêu cách khác nhau để đi từ A đến B?",
        "vocab": "Move up: Đi lên trên; Move right: Đi sang phải; Lines: Đường kẻ.",
        "image": null,
        "answer": "20",
        "acceptableAnswers": [
          "20"
        ],
        "unit": "",
        "hint": "Phương pháp Quy tắc cộng đường đi trên lưới ô vuông (Tam giác Pascal).",
        "solution": "Tổng số đường đi từ A đến B thỏa mãn là 20."
      }
    ]
  },
  {
    "id": "heat_de5",
    "title": "Đề số 5: VCK Quốc gia (2016 – 2017)",
    "titleEn": "Paper 5: National Final Heat Round (2016 – 2017)",
    "year": "2016 – 2017",
    "grade": "Khối 4 / Grade 4",
    "timeMinutes": 90,
    "totalQuestions": 25,
    "pointsPerQuestion": 4,
    "categories": [
      {
        "id": "logic",
        "name": "Tư duy logic",
        "nameEn": "Logical Thinking",
        "icon": "fa-brain",
        "color": "blue",
        "range": [
          1,
          5
        ]
      },
      {
        "id": "arithmetic",
        "name": "Số học",
        "nameEn": "Arithmetic",
        "icon": "fa-calculator",
        "color": "emerald",
        "range": [
          6,
          10
        ]
      },
      {
        "id": "number_theory",
        "name": "Lý thuyết số",
        "nameEn": "Number Theory",
        "icon": "fa-hashtag",
        "color": "purple",
        "range": [
          11,
          15
        ]
      },
      {
        "id": "geometry",
        "name": "Hình học",
        "nameEn": "Geometry",
        "icon": "fa-shapes",
        "color": "amber",
        "range": [
          16,
          20
        ]
      },
      {
        "id": "combinatorics",
        "name": "Tổ hợp",
        "nameEn": "Combinatorics",
        "icon": "fa-cubes-stacked",
        "color": "rose",
        "range": [
          21,
          25
        ]
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
        "questionEn": "There are 20 problems in a mathematics competition. The scores of each problem are given in the following ways: 5 marks will be given for a correct answer, 2 marks will be deducted for each incorrect or unanswered answer. How many questions does Amy answer correctly if her score is 58?",
        "questionVi": "Có 20 câu hỏi trong một cuộc thi toán. Điểm số của mỗi câu hỏi được tính như sau: trả lời đúng được cộng 5 điểm, trả lời sai hoặc không trả lời bị trừ 2 điểm. Hỏi bạn Amy trả lời đúng bao nhiêu câu nếu tổng điểm của bạn ấy là 58 điểm?",
        "vocab": "Problems: Bài toán; Score: Điểm; Deducted: Bị trừ.",
        "image": null,
        "answer": "14",
        "acceptableAnswers": [
          "14"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán tính điểm thi đấu).",
        "solution": "Giả sử Amy làm đúng cả 20 câu, số điểm của Amy sẽ là:\n5 × 20 = 100 (điểm)\nSố câu làm sai hoặc không trả lời là:\n(100 - 58) : (5 + 2) = 6 (câu)\nSố câu Amy làm đúng là:\n20 - 6 = 14 (câu)"
      },
      {
        "id": 102,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "If today is Tuesday, which day of the week will it be 100 days later?",
        "questionVi": "Nếu hôm nay là Thứ Ba, hỏi 100 ngày sau là thứ mấy trong tuần?",
        "vocab": "Tuesday: Thứ Ba; Day of the week: Thứ trong tuần; Later: Sau.",
        "image": null,
        "answer": "Thursday (Thứ Năm)",
        "acceptableAnswers": [
          "Thursday (Thứ Năm)",
          "Thursday",
          "Thứ Năm",
          "Thu Nam",
          "thứ 5",
          "thu 5",
          "thursday",
          "thứ năm",
          "thu nam"
        ],
        "unit": "",
        "hint": "Phương pháp Chu kỳ thứ trong tuần (Lấy số dư theo modulo 7).",
        "solution": "Thực hiện phép chia lấy số tuần và số ngày dư:\n100 : 7 = 14 (dư 2)\nQuy đổi: 100 ngày = 14 tuần và 2 ngày.\nNếu hôm nay là Thứ Ba, thì 100 ngày sau sẽ rơi vào Thứ Năm."
      },
      {
        "id": 103,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are a total of 30 tigers and cranes in a zoo. The animals have a total of 90 legs. How many tigers are there?",
        "questionVi": "Trong vườn thú có tổng cộng 30 con hổ và chim hạc. Tổng số chân của các con vật là 90 chân. Hỏi có bao nhiêu con hổ?",
        "vocab": "Total: Tổng cộng.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán gà và thỏ).",
        "solution": "Giả sử cả 30 con vật đều là con hạc (mỗi con hạc có 2 chân), tổng số chân là:\n2 × 30 = 60 (chân)\nSố con hổ (mỗi con hổ có 4 chân) là:\n(90 - 60) : (4 - 2) = 15 (con)"
      },
      {
        "id": 104,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 3-digit number on a piece of paper and asked Peter to guess it.",
        "questionVi": "John viết một số có 3 chữ số lên một mẩu giấy và đố Peter đoán số đó.\nPeter đoán: \"Có phải số 173 không?\"\nJohn trả lời: \"Một trong các chữ số là đúng, và vị trí của chữ số đó cũng đúng.\"\nPeter đoán tiếp: \"Có phải số 132 không?\"\nJohn trả lời: \"Hai chữ số là đúng, nhưng vị trí của cả hai chữ số đều sai.\"\nPeter lại đoán: \"Có phải số 324 không?\"\nJohn nói: \"Cả ba chữ số đều đúng, nhưng tất cả đều ở sai vị trí.\"\nHỏi số mà John đã viết là số nào?",
        "vocab": "3-digit number: Số có 3 chữ số; Digit: Chữ số; Position: Vị trí.",
        "image": null,
        "answer": "243",
        "acceptableAnswers": [
          "243"
        ],
        "unit": "",
        "hint": "Phương pháp Suy luận logic và Phân tích vị trí chữ số.",
        "solution": "Theo lượt đoán 324, số cần tìm chứa 3 chữ số là 2, 3 và 4.\nTheo lượt đoán 173, chữ số 3 ở hàng đơn vị đúng vị trí -> Do đó chữ số hàng đơn vị là 3.\nXét số 2: Theo lượt đoán 324 và 132, số 2 không nằm ở hàng chục hay hàng đơn vị -> Chữ số hàng trăm là 2.\nChữ số còn lại (hàng chục) phải là 4."
      },
      {
        "id": 105,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, how many circles are there in the 25th group?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tròn ở nhóm thứ 25?",
        "vocab": "Pattern: Quy luật; Circles: Hình tròn.",
        "image": "images/de1_q05.png",
        "answer": "325",
        "acceptableAnswers": [
          "325"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm quy luật dãy số tam giác (Tổng dãy số cách đều).",
        "solution": "Nhóm thứ 1 có: 1 hình tròn\nNhóm thứ 2 có: 1 + 2 hình tròn\nNhóm thứ 3 có: 1 + 2 + 3 hình tròn\n...\nNhóm thứ 25 có: 1 + 2 + 3 + ... + 24 + 25 hình tròn\nTổng số hình tròn ở nhóm thứ 25 là:\n1 + 2 + 3 + ... + 24 + 25 = (25 + 1) × 25 : 2 = 325\nArithmetic / Số học"
      },
      {
        "id": 106,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 1366 + 3987 - 1166 + 13 + 495 - 126 + 876 - 445.",
        "questionVi": "Tính giá trị của biểu thức: 1366 + 3987 – 1166 + 13 + 495 – 126 + 876 – 445.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "5000",
        "acceptableAnswers": [
          "5000"
        ],
        "unit": "",
        "hint": "Phương pháp Nhóm số hạng tròn chục, tròn trăm, tròn nghìn.",
        "solution": "1366 + 3987 - 1166 + 13 + 495 - 126 + 876 - 445\n= (1366 - 1166) + (3987 + 13) + (495 - 445) + (876 - 126)\n= 200 + 4000 + 50 + 750\n= 200 + (50 + 750) + 4000\n= 200 + 800 + 4000\n= 1000 + 4000\n= 5000"
      },
      {
        "id": 107,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 22222 × 22222.",
        "questionVi": "Tính giá trị của tích: 22222 × 22222.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "493817284",
        "acceptableAnswers": [
          "493817284"
        ],
        "unit": "",
        "hint": "Phương pháp Quy luật nhân các số tạo bởi toàn chữ số 1 hoặc đặt tính nhân.",
        "solution": "Đặt tính nhân hoặc phân tích:\n22222 × 22222 = 493817284"
      },
      {
        "id": 108,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 5 + 10 + 15 + 20 + ... + 125 + 130.",
        "questionVi": "Tính giá trị của tổng: 5 + 10 + 15 + 20 + ... + 125 + 130.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1755",
        "acceptableAnswers": [
          "1755"
        ],
        "unit": "",
        "hint": "Phương pháp Tính tổng dãy số cách đều.",
        "solution": "Số các số hạng của dãy số là:\n(130 - 5) : 5 + 1 = 26 (số)\nTổng các số hạng là:\n(130 + 5) × 26 : 2 = 1755"
      },
      {
        "id": 109,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 13 × 27 + 26 × 11 + 39 × 17.",
        "questionVi": "Tính giá trị của biểu thức: 13 × 27 + 26 × 11 + 39 × 17.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "1300",
        "acceptableAnswers": [
          "1300"
        ],
        "unit": "",
        "hint": "Phương pháp Đặt thừa số chung (Tính chất phân phối của phép nhân đối với phép cộng).",
        "solution": "13 × 27 + 26 × 11 + 39 × 17\n= 13 × 27 + 13 × 2 × 11 + 13 × 3 × 17\n= 13 × 27 + 13 × (2 × 11) + 13 × (3 × 17)\n= 13 × 27 + 13 × 22 + 13 × 51\n= 13 × (27 + 22 + 51)\n= 13 × 100\n= 1300"
      },
      {
        "id": 110,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of 360 ÷ 10 + 360 ÷ 6 + 360 ÷ 3 + 360 ÷ 1.",
        "questionVi": "Tính giá trị của biểu thức: 360 ÷ 10 + 360 ÷ 6 + 360 ÷ 3 + 360 ÷ 1 + 360 ÷ 2.",
        "vocab": "Value: Giá trị.",
        "image": null,
        "answer": "576",
        "acceptableAnswers": [
          "576"
        ],
        "unit": "",
        "hint": "Phương pháp Tách và phân phối phép chia.",
        "solution": "360 ÷ 10 + 360 ÷ 6 + 360 ÷ 3 + 360 ÷ 1\n= 36 + 60 + 120 + 360\n= 576\nNumber Theory / Lý thuyết số"
      },
      {
        "id": 111,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If a 5-digit number 81A76 is divisible by 9, find the value of A.",
        "questionVi": "Nếu số có 5 chữ số 81A76 chia hết cho 9, hãy tìm giá trị của chữ số A.",
        "vocab": "5-digit number: Số có 5 chữ số; Divisible: Chia hết; Value: Giá trị.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho 9.",
        "solution": "Vì số 81A76 chia hết cho 9 nên tổng các chữ số của nó phải chia hết cho 9:\n(8 + 1 + A + 7 + 6) = 22 + A\nĐể (22 + A) chia hết cho 9 và A là chữ số thì A = 5."
      },
      {
        "id": 112,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of A if A = (3 × 3 × 3 × ... × 3) × (6 × 6 × 6 × ... × 6) [với 100 thừa số 3 và các thừa số 6].",
        "questionVi": "Tìm chữ số tận cùng của biểu thức A nếu A = 3 × 3 × 3 × ... × 3 (tích gồm 2017 thừa số 3).",
        "vocab": "Unit digit: Chữ số hàng đơn vị.",
        "image": null,
        "answer": "6",
        "acceptableAnswers": [
          "6"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm chữ số tận cùng của lũy thừa theo chu kỳ.",
        "solution": "- Tích của 4 thừa số 3 có chữ số tận cùng là 1 (3 × 3 × 3 × 3 = 81). Vì 100 chia hết cho 4 nên tích của 100 thừa số 3 có chữ số tận cùng là 1.\n- Tích của các thừa số 6 luôn có chữ số tận cùng là 6.\nDo đó, chữ số tận cùng (hàng đơn vị) của A là: 1 × 6 = 6."
      },
      {
        "id": 113,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The difference of A and B is 144. A is 5 times of B. Find the value of B.",
        "questionVi": "Hiệu của hai số A và B là 144. Biết A gấp 5 lần B. Tìm giá trị của số B.",
        "vocab": "Difference: Hiệu; 5 times: Gấp 5 lần; Value: Giá trị.",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm hai số khi biết hiệu và tỉ số của hai số.",
        "solution": "Ta có sơ đồ đoạn thẳng:\nGiá trị của B là:\n144 : (5 - 1) × 1 = 36"
      },
      {
        "id": 114,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of A and B is 168. A is larger than B by 6 times. Find the value of A.",
        "questionVi": "Tổng của hai số A và B là 168. Biết số A lớn hơn số B 6 đơn vị. Tìm giá trị của số A.",
        "vocab": "Sum: Tổng; A is larger than B by 6 times: A nhiều hơn B đúng bằng 6 lần B; Value: Giá trị.",
        "image": null,
        "answer": "147",
        "acceptableAnswers": [
          "147"
        ],
        "unit": "",
        "hint": "Phương pháp Tìm hai số khi biết tổng và hiệu của hai số.",
        "solution": "A nhiều hơn B đúng bằng 6 lần B hay A gấp 7 lần B.\nTa có sơ đồ đoạn thẳng:\n\nGiá trị của A là:\n168 : (7 + 1) × 7 = 147"
      },
      {
        "id": 115,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "What is the largest three-digit number that can be divisible by 6 and 8?",
        "questionVi": "Tìm số lớn nhất có 3 chữ số mà chia hết cho cả 3, 4 và 8.",
        "vocab": "Largest: Lớn nhất; Three-digit number: Số có 3 chữ số; Divisible: Chia hết.",
        "image": null,
        "answer": "984",
        "acceptableAnswers": [
          "984"
        ],
        "unit": "",
        "hint": "Phương pháp Dấu hiệu chia hết cho các số có một chữ số.",
        "solution": "Số có 3 chữ số lớn nhất chia hết cho cả 6 và 8 là 984.\nGeometry / Hình học"
      },
      {
        "id": 116,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is formed by 3 squares with areas 16cm², 36cm² and 16cm² respectively. Find the perimeter of the following figure in centimeter.",
        "questionVi": "Hình dưới đây được tạo thành bởi 3 hình vuông có diện tích lần lượt là 16 cm², 36 cm² và 16 cm². Tính chu vi của hình vẽ theo đơn vị xăng-ti-mét.",
        "vocab": "Figure: Hình; Squares: Hình vuông; Area: Diện tích; Respectively: Lần lượt; Perimeter: Chu vi.",
        "image": "images/de1_q16.png",
        "answer": "40",
        "acceptableAnswers": [
          "40"
        ],
        "unit": "",
        "hint": "Phương pháp Tính chu vi hình ghép từ các hình vuông.",
        "solution": "Độ dài cạnh hình vuông nhỏ (diện tích 16 cm²) là: 4 cm\nĐộ dài cạnh hình vuông lớn (diện tích 36 cm²) là: 6 cm\nChu vi của hình hợp bởi 3 hình vuông là:\n(6 + 4 + 6 + 4) × 2 = 40 (cm)"
      },
      {
        "id": 117,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "According to the pattern shown below, how many cubes are there in the 10th layer from the top given that the figure is solid and made of identical cubes?",
        "questionVi": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu khối lập phương ở tầng thứ 10 tính từ trên xuống, biết rằng hình này là khối đặc được ghép bởi các khối lập phương giống nhau?",
        "vocab": "Pattern: Quy luật; 10th layer: Tầng thứ 10 từ trên xuống; Figure: Hình; Solid: Đặc.",
        "image": "images/de1_q17.png",
        "answer": "361",
        "acceptableAnswers": [
          "361"
        ],
        "unit": "",
        "hint": "Phương pháp Quy luật khối lập phương xếp tầng theo cấp số cộng.",
        "solution": "Xét theo chiều dài mỗi cạnh ở từng lớp từ trên xuống, số khối lập phương tuân theo quy luật số lẻ liên tiếp (1, 3, 5, ...).\nỞ lớp thứ 10 từ trên xuống, kích thước một cạnh của hình vuông là: 1 + 2 × (10 - 1) = 19 (khối).\nSố khối lập phương ở tầng thứ 10 là:\n19 × 19 = 361 (khối)"
      },
      {
        "id": 118,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is made of 16 equilateral triangles. If the perimeter of the figure below is 36cm, what is the difference of the total perimeter between before combination and after combination?",
        "questionVi": "Hình dưới đây được ghép bởi 16 tam giác đều. Biết chu vi của hình vẽ là 108 cm. Tìm chu vi của hình vẽ theo xăng-ti-mét.",
        "vocab": "Figure: Hình vẽ; Equilateral triangles: Tam giác đều; Perimeter: Chu vi; Difference: Hiệu; Combination: Ghép.",
        "image": "images/de1_q18.png",
        "answer": "108",
        "acceptableAnswers": [
          "108"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm cạnh ngoài của hình ghép từ tam giác đều.",
        "solution": "Độ dài cạnh của 1 tam giác đều nhỏ là:\n36 : 3 : 4 = 3 (cm)\nTổng chu vi của 16 tam giác đều trước khi ghép là:\n(3 × 3) × 16 = 144 (cm)\nHiệu tổng chu vi trước và sau khi ghép là:\n144 - 36 = 108 (cm)"
      },
      {
        "id": 119,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is made of 2 squares. Find the area of the shaded region below in cm²?",
        "questionVi": "Hình dưới đây được ghép bởi 2 hình vuông có cạnh lần lượt là 8 cm và 6 cm. Tìm diện tích phần tô đậm theo đơn vị cm².",
        "vocab": "Figure: Hình vẽ; Area: Diện tích; Shaded region: Phần được tô đậm.",
        "image": "images/de1_q19.png",
        "answer": "14",
        "acceptableAnswers": [
          "14"
        ],
        "unit": "",
        "hint": "Phương pháp Trừ diện tích (Lấy diện tích tổng trừ các phần tam giác vuông trắng).",
        "solution": "Hình gồm 2 hình vuông cạnh 6 cm và 4 cm đặt cạnh nhau.\nDiện tích phần tô đậm được tính theo công thức:\n6 × 6 : 2 + 4 × 4 - 4 × (4 + 6) : 2 = 14 (cm²)"
      },
      {
        "id": 120,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangles are there in the figure below?",
        "questionVi": "Có bao nhiêu hình chữ nhật trong hình vẽ dưới đây?",
        "vocab": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "image": "images/de1_q20.png",
        "answer": "210",
        "acceptableAnswers": [
          "210"
        ],
        "unit": "",
        "hint": "Phương pháp Đếm số hình chữ nhật trong lưới kẻ ô bằng công thức tổ hợp.",
        "solution": "Combinatorics / Tổ hợp"
      },
      {
        "id": 121,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 10 steps. David can go up for 1 step or 2 steps at a time. How many ways are there for David to go up the stairs?",
        "questionVi": "Một cầu thang có 10 bậc. David có thể bước lên 1 bậc hoặc 2 bậc mỗi lần bước. Hỏi David có bao nhiêu cách khác nhau để bước lên hết cầu thang?",
        "vocab": "Flight of stairs: Cầu thang; Step: Bậc thang.",
        "image": null,
        "answer": "89",
        "acceptableAnswers": [
          "89"
        ],
        "unit": "",
        "hint": "Phương pháp Dãy số Fibonacci (Bài toán bước cầu thang).",
        "solution": "Liệt kê các trường hợp bước 1 bậc và 2 bậc:\n- 10 bước 1 bậc (1×10): 1 cách\n- 8 bước 1 bậc, 1 bước 2 bậc (1×8 + 2×1): 9 cách\n- 6 bước 1 bậc, 2 bước 2 bậc (1×6 + 2×2): 28 cách\n- 4 bước 1 bậc, 3 bước 2 bậc (1×4 + 2×3): 35 cách\n- 2 bước 1 bậc, 4 bước 2 bậc (1×2 + 2×4): 15 cách\n- 5 bước 2 bậc (2×5): 1 cách\nTổng số cách là:\n1 + 9 + 28 + 35 + 15 + 1 = 89 (cách)"
      },
      {
        "id": 122,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 6 numbers, without repetition, from 1, 4, 5, 6, 7, 9 to form 2 three-digit numbers. Find the maximum value of the difference between these 2 numbers.",
        "questionVi": "Chọn ra 6 chữ số không lặp lại từ các chữ số 1, 4, 5, 6, 7, 8, 9 để tạo thành hai số có 3 chữ số. Tìm hiệu nhỏ nhất có thể có giữa hai số đó.",
        "vocab": "Without repetition: Không lặp lại; Three-digit numbers: Số có 3 chữ số; Maximum value: Giá trị lớn nhất.",
        "image": null,
        "answer": "831",
        "acceptableAnswers": [
          "831"
        ],
        "unit": "",
        "hint": "Phương pháp Cấu tạo số và Chặn giá trị hiệu nhỏ nhất.",
        "solution": "Để hiệu hai số lớn nhất, số bị trừ phải lớn nhất có thể và số trừ phải nhỏ nhất có thể từ 6 chữ số đã cho:\n- Số bị trừ lớn nhất: 976\n- Số trừ nhỏ nhất: 145\nHiệu lớn nhất tìm được là:\n976 - 145 = 831"
      },
      {
        "id": 123,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Numbers are drawn from the 80 integers 1 to 80. At least how many numbers are drawn at random to ensure that there are two numbers whose sum is 100?",
        "questionVi": "Người ta chọn ngẫu nhiên các số từ 80 số nguyên từ 1 đến 80. Hỏi cần lấy ra ít nhất bao nhiêu số để chắc chắn có hai số được chọn có tổng bằng 81?",
        "vocab": "Integers: Số nguyên; At least: Ít nhất; At random: Ngẫu nhiên; Ensure: Chắc chắn rằng; Sum: Tổng.",
        "image": null,
        "answer": "51",
        "acceptableAnswers": [
          "51"
        ],
        "unit": "",
        "hint": "Phương pháp Nguyên lý Dirichlet (Trường hợp xấu nhất).",
        "solution": "Trong 80 số từ 1 đến 80:\n- Có 30 cặp số có tổng bằng 100 (ví dụ: 20+80, 21+79, ..., 49+51).\n- Còn lại 20 số không tạo thành cặp nào có tổng bằng 100 (số 50 và các số từ 1 đến 19).\nÁp dụng nguyên lý Dirichlet, trường hợp xấu nhất ta chọn 20 số bị thừa, cộng thêm mỗi cặp 30 cặp số chọn 1 số (tức 30 số), tổng cộng là 50 số mà chưa có cặp nào có tổng bằng 100.\nDo đó, cần lấy ít nhất:\n30 + 20 + 1 = 51 (số)"
      },
      {
        "id": 124,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Now there are 1-dollar, 2-dollar, 5-dollar and 10-dollar coins and 2 coins for each type. How many different amounts of money can be formed?",
        "questionVi": "Hiện tại có các loại tiền mệnh giá 1 đô-la, 2 đô-la, 5 đô-la và 10 đô-la, mỗi loại có ít nhất 1 tờ. Hỏi có bao nhiêu cách khác nhau để có tổng số tiền là 16 đô-la?",
        "vocab": "Each type: Mỗi loại; Different amounts of money: Các giá trị tiền khác nhau.",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Phương pháp Đổi tiền và Phân hoạch trường hợp.",
        "solution": "Tổng số tiền lớn nhất có thể tạo thành là:\n1 × 2 + 2 × 2 + 5 × 2 + 10 × 2 = 36 ($)\nVì với các mệnh giá đồng xu này ta có thể tạo liên tiếp mọi giá trị tiền nguyên từ $1 đến $36.\nDo đó, có thể tạo ra 36 giá trị tiền khác nhau."
      },
      {
        "id": 125,
        "examId": "heat_de5",
        "examIndex": 4,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit numbers are there so that the sum of digits is 8?",
        "questionVi": "Có bao nhiêu số có 3 chữ số sao cho tổng các chữ số của số đó bằng 9?",
        "vocab": "3-digit numbers: Số có 3 chữ số; Sum of digits: Tổng các chữ số.",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Phương pháp Bài toán chia kẹo Euler (Số có tổng các chữ số cố định).",
        "solution": "Phân tích tổng 8 thành 3 chữ số (a + b + c = 8 với a ≠ 0):\n- Bộ (8, 0, 0): 1 số\n- Bộ (7, 1, 0): 4 số\n- Bộ (6, 2, 0): 4 số; Bộ (6, 1, 1): 3 số\n- Bộ (5, 3, 0): 4 số; Bộ (5, 2, 1): 6 số\n- Bộ (4, 4, 0): 2 số; Bộ (4, 3, 1): 6 số; Bộ (4, 2, 2): 3 số\n- Bộ (3, 3, 2): 3 số\nTổng số các số thỏa mãn là 36 số."
      }
    ]
  }
];
