// Dữ liệu 5 Đề Thi Thử Vòng Chung Kết Quốc Gia TIMO Khối 6 (2016 – 2021)
// Hệ Thống Giáo Dục CLB Toán M32 - Biên soạn & chuẩn hóa độc quyền

const TIMO_MOCK_EXAMS = [
  {
    "id": "heat_2020_2021_de1",
    "title": "Đề số 1: VCK Quốc gia (2020 – 2021)",
    "titleEn": "Paper 1: National Final Heat Round (2020 – 2021)",
    "year": "2020 – 2021",
    "grade": "Khối 6 / Grade 6",
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
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are some chickens and rabbits in a cage. The number of chickens is 10 more than 3 times the number of rabbits. They have 110 legs in total. How many chicken(s) is / are there?",
        "questionVi": "Có một số gà và thỏ ở trong một chiếc chuồng. Số gà nhiều hơn 3 lần số thỏ là 10 con. Chúng có tổng cộng 110 chân. Hỏi có bao nhiêu con gà?",
        "image": null,
        "answer": "37",
        "acceptableAnswers": [
          "37"
        ],
        "unit": "",
        "hint": "Giả thiết tạm / Quy về nhóm tỉ lệ cố định.",
        "solution": "**Phương pháp: Giả thiết tạm / Quy về nhóm tỉ lệ cố định.**\n- Gọi số thỏ là R (con). Theo đề bài, số gà là 3 \\times R + 10 (con).\n- Mỗi con thỏ có 4 chân, mỗi con gà có 2 chân.\n- Số chân của 10 con gà dôi ra là: 10 \\times 2 = 20 (chân).\n- Nếu bớt đi 10 con gà này, tổng số chân còn lại là: 110 - 20 = 90 (chân).\n- Khi đó, cứ 1 con thỏ (4 chân) đi kèm 3 con gà (3 \\times 2 = 6 chân) tạo thành một nhóm có số chân là: 4 + 6 = 10 (chân).\n- Số con thỏ trong lồng là: 90 : 10 = 9 (con).\n- Số con gà ban đầu là: 9 \\times 3 + 10 = 37 (con).\n**Đáp số: 37.**"
      },
      {
        "id": 2,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Given a cell of type A splits into 2 cells of type B in the 1st minute. In the next 2 minutes, each cell of type B splits into 2 cells of type A. How many cell(s) of type A is / are there originally if there are 1792 cells in the 10th minute?",
        "questionVi": "Cho một tế bào loại A phân tách thành 2 tế bào loại B trong 1 phút đầu tiên. Trong 2 phút tiếp theo, mỗi tế bào loại B lại phân tách thành 2 tế bào loại A. Hỏi ban đầu có bao nhiêu tế bào loại A nếu như có tất cả 1792 tế bào vào phút thứ 10?",
        "image": null,
        "answer": "14",
        "acceptableAnswers": [
          "14"
        ],
        "unit": "",
        "hint": "Chu kỳ phân bào và quy luật lũy thừa thời gian.",
        "solution": "**Phương pháp: Chu kỳ phân bào và quy luật lũy thừa thời gian.**\n- Xét chu kỳ hoàn chỉnh của 1 tế bào A:\n+ Sau 1 phút đầu: 1 tế bào A \\to 2 tế bào B.\n+ Sau 2 phút tiếp theo (tức sau 3 phút kể từ đầu): 2 tế bào B \\to 2 \\times 2 = 4 tế bào A.\n+ Như vậy, cứ sau 1 chu kỳ trọn vẹn gồm 1 + 2 = 3 phút, số lượng tế bào A tăng gấp 4 lần và tất cả đều ở dạng tế bào A.\n- Xét diễn biến tại các mốc thời gian (gọi ban đầu có x tế bào A):\n+ Sau 3 phút: 4 \\times x tế bào A.\n+ Sau 6 phút: 4^2 \\times x = 16 \\times x tế bào A.\n+ Sau 9 phút: 4^3 \\times x = 64 \\times x tế bào A.\n+ Đến phút thứ 10 (thêm 1 phút sau phút 9): toàn bộ 64 \\times x tế bào A phân tách thành 2 tế bào B, tạo thành 64 \\times x \\times 2 = 128 \\times x tế bào B.\n- Tổng số tế bào lúc này là 1792:\n128 \\times x = 1792 \\implies x = 1792 : 128 = 14\n**Đáp số: 14.**"
      },
      {
        "id": 3,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "A bookseller sold 8 less than half of the books on the 1st day. On the 2nd day, he sold 2 more than half of the remaining books. On the 3rd day, he sold 1 less than half of the remaining books and left 9 books. How many book(s) did the bookseller have originally?",
        "questionVi": "Một người bán sách bán được ít hơn một nửa số sách là 8 cuốn trong ngày thứ nhất. Ngày thứ hai, người đó bán được nhiều hơn một nửa số sách còn lại là 2 cuốn. Ngày thứ ba, người đó bán được ít hơn một nửa số sách còn lại là 1 cuốn và còn lại 9 cuốn sách. Hỏi ban đầu người đó có bao nhiêu cuốn sách?",
        "image": null,
        "answer": "56",
        "acceptableAnswers": [
          "56"
        ],
        "unit": "",
        "hint": "Tính ngược từ cuối (Working Backwards).",
        "solution": "**Phương pháp: Tính ngược từ cuối (Working Backwards).**\n- Ngày 3: Bán một nửa số sách còn lại bớt 1 cuốn, nghĩa là còn lại một nửa số sách cộng thêm 1 cuốn thì bằng 9 cuốn:\n+ Một nửa số sách sau ngày 2 là: 9 - 1 = 8 (cuốn).\n+ Số sách còn lại sau ngày 2 là: 8 \\times 2 = 16 (cuốn).\n- Ngày 2: Bán một nửa số sách và thêm 2 cuốn, nghĩa là còn lại một nửa số sách trừ đi 2 cuốn thì bằng 16 cuốn:\n+ Một nửa số sách sau ngày 1 là: 16 + 2 = 18 (cuốn).\n+ Số sách còn lại sau ngày 1 là: 18 \\times 2 = 36 (cuốn).\n- Ngày 1: Bán một nửa số sách bớt 8 cuốn, nghĩa là còn lại một nửa số sách ban đầu cộng thêm 8 cuốn thì bằng 36 cuốn:\n+ Một nửa số sách ban đầu là: 36 - 8 = 28 (cuốn).\n+ Số sách ban đầu là: 28 \\times 2 = 56 (cuốn).\n**Đáp số: 56.**"
      },
      {
        "id": 4,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Given $A, B, C, D$ and $E$ are distinct digits greater than 0 such that: (1) $E > D > C > B > A > 0$; (2) $A + B + C > D$; (3) $C + D = E$; (4) $C$ is divisible by $B$; (5) $A + B + D < E$. Find the value of digit $D$.",
        "questionVi": "Cho $A, B, C, D$ và $E$ là các chữ số lớn hơn 0 đôi một khác nhau thỏa mãn: (1) $E > D > C > B > A > 0$; (2) $A + B + C > D$; (3) $C + D = E$; (4) $C$ chia hết cho $B$; (5) $A + B + D < E$. Tìm giá trị của chữ số $D$.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Suy luận logic và chặn miền giá trị chữ số.",
        "solution": "**Phương pháp: Suy luận logic và chặn miền giá trị chữ số.**\n- Các chữ số A, B, C, D, E \\in \\{1, 2, ..., 9\\} phân biệt và E > D > C > B > A > 0.\n- Vì E > D > C > B > A \\ge 1 \\implies E \\ge 5, và E là chữ số lớn nhất nên E \\in \\{8, 9\\}.\n- Từ (3) C + D = E và (5) A + B + D < E, ta thay E = C + D vào:\nA + B + D < C + D \\implies A + B < C\n- Kết hợp với (2) A + B + C > D \\implies A + B > D - C.\n- Do đó: D - C < A + B < C \\implies D - C < C \\implies D < 2C.\n- Lại có C + D = E và C < D \\implies 2C < C + D = E \\implies C < E / 2.\n- Trường hợp E = 8: C < 4 \\implies D = 8 - C. Để D < 2C \\implies 8 - C < 2C \\implies 3C > 8 \\implies C = 3, D = 5.\n+ Khi đó D - C = 2 \\implies 2 < A + B < 3 (vô nghiệm vì A, B nguyên).\n- Trường hợp E = 9: C < 4.5 và D = 9 - C. Để D < 2C \\implies 9 - C < 2C \\implies 3C > 9 \\implies C > 3.\n+ Do đó chọn C = 4 \\implies D = 9 - 4 = 5.\n+ Khi đó: D - C = 1 < A + B < 4 \\implies A + B \\in \\{2, 3\\}.\n+ Lại có C chia hết cho B và B < C = 4 \\implies B \\in \\{1, 2\\}.\n+ Vì các chữ số lớn hơn 0 nên A \\ge 1, B \\ge 2 \\implies A + B \\ge 3.\n+ Do đó chọn B = 2, A = 1 (thỏa mãn 1 < 2 < 4 và A + B = 3 \\in \\{2, 3\\}).\n- Kiểm tra bộ số: A = 1, B = 2, C = 4, D = 5, E = 9 là các chữ số lớn hơn 0 đôi một khác nhau thỏa mãn trọn vẹn cả 5 điều kiện đề bài.\n**Đáp số: 5.**"
      },
      {
        "id": 5,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "According to the pattern shown below, find the value in the cell with the question mark.",
        "questionVi": "Dựa vào quy luật dưới đây, tìm giá trị ở ô chứa dấu hỏi chấm.",
        "image": "images/exam_de1/q5_cleaned.png",
        "answer": "19",
        "acceptableAnswers": [
          "19"
        ],
        "unit": "",
        "hint": "Tìm quy luật số học trong hình đa giác.",
        "solution": "**Phương pháp: Tìm quy luật số học trong hình đa giác.**\n- Xét hình ngũ giác thứ nhất:\n+ Tổng 5 số ở vành ngoài: 7 + 8 + 11 + 9 + 10 = 45.\n+ Số ở ô ngũ giác trung tâm: 9.\n+ Mối quan hệ: 45 : 5 = 9 (Số ở tâm bằng trung bình cộng của 5 số ở vành ngoài).\n- Kiểm tra ở hình ngũ giác thứ hai:\n+ Tổng các số vành ngoài: 32 + 14 + 10 + 20 + 29 = 105.\n+ Số ở tâm: 105 : 5 = 21 (Hoàn toàn đúng quy luật).\n- Áp dụng cho hình ngũ giác thứ ba:\n+ Gọi số cần tìm ở ô có dấu hỏi chấm là x.\n+ Số ở tâm là 17, do đó tổng 5 số vành ngoài phải bằng: 17 \\times 5 = 85.\n+ Ta có phương trình:\nx + 31 + 6 + 4 + 25 = 85 \\implies x + 66 = 85 \\implies x = 85 - 66 = 19\n**Đáp số: 19.**"
      },
      {
        "id": 6,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $3\\frac{1}{3} \\times 5 + 5\\frac{1}{6} \\times 7 + 2\\frac{1}{6} \\times 13$.",
        "questionVi": "Tính giá trị của biểu thức $3\\frac{1}{3} \\times 5 + 5\\frac{1}{6} \\times 7 + 2\\frac{1}{6} \\times 13$.",
        "image": null,
        "answer": "81",
        "acceptableAnswers": [
          "81"
        ],
        "unit": "",
        "hint": "Chuyển đổi hỗn số về phân số mẫu chung và tính nhanh.",
        "solution": "**Phương pháp: Chuyển đổi hỗn số về phân số mẫu chung và tính nhanh.**\n- Đổi các hỗn số về phân số có mẫu số chung bằng 6:\n+ $3\\frac{1}{3} = \\frac{10}{3} = \\frac{20}{6}$\n+ $5\\frac{1}{6} = \\frac{31}{6}$\n+ $2\\frac{1}{6} = \\frac{13}{6}$\n- Thay vào biểu thức ta có:\nA = \\frac{20}{6} \\times 5 + \\frac{31}{6} \\times 7 + \\frac{13}{6} \\times 13\nA = \\frac{20 \\times 5 + 31 \\times 7 + 13 \\times 13}{6}\nA = \\frac{100 + 217 + 169}{6} = \\frac{486}{6} = 81\n**Đáp số: 81.**"
      },
      {
        "id": 7,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots + \\frac{1}{380} + \\frac{1}{420}$.",
        "questionVi": "Tính giá trị của biểu thức $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots + \\frac{1}{380} + \\frac{1}{420}$.",
        "image": null,
        "answer": "20/21",
        "acceptableAnswers": [
          "20/21",
          "\\frac{20}{21}",
          "20 / 21",
          "0.9524"
        ],
        "unit": "",
        "hint": "Chuỗi phân số sai phân triệt tiêu (Telescoping Series).",
        "solution": "**Phương pháp: Chuỗi phân số sai phân triệt tiêu (Telescoping Series).**\n- Phân tích mẫu số thành tích của 2 số tự nhiên liên tiếp:\n\\frac{1}{2} = \\frac{1}{1 \\times 2}, \\quad \\frac{1}{6} = \\frac{1}{2 \\times 3}, \\quad \\dots, \\quad \\frac{1}{420} = \\frac{1}{20 \\times 21}\n- Áp dụng công thức sai phân: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$, ta có:\nS = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{20} - \\frac{1}{21}\\right)\n- Các cặp số đối nhau ở giữa triệt tiêu lẫn nhau:\nS = 1 - \\frac{1}{21} = \\frac{20}{21}\n*(Ghi chú: Đề gốc in ấn bị khuyết đáp án này, đáp số chuẩn xác là $\\frac{20}{21}$)*.\n**Đáp số: 20/21.**"
      },
      {
        "id": 8,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $4420 \\times 2368 - 4421 \\times 2367$.",
        "questionVi": "Tính giá trị của $4420 \\times 2368 - 4421 \\times 2367$.",
        "image": null,
        "answer": "2053",
        "acceptableAnswers": [
          "2053"
        ],
        "unit": "",
        "hint": "Tính nhanh bằng quy tắc phân phối đại số.",
        "solution": "**Phương pháp: Tính nhanh bằng quy tắc phân phối đại số.**\n- Ta biểu diễn:\n2368 = 2367 + 1\n4421 = 4420 + 1\n- Thay vào biểu thức:\nB = 4420 \\times (2367 + 1) - (4420 + 1) \\times 2367\nB = 4420 \\times 2367 + 4420 - 4420 \\times 2367 - 2367\nB = 4420 - 2367 = 2053\n**Đáp số: 2053.**"
      },
      {
        "id": 9,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Convert $0.1\\dot{3}\\dot{6}$ into fraction in simplest form.",
        "questionVi": "Chuyển đổi số thập phân vô hạn tuần hoàn $0.1\\dot{3}\\dot{6}$ sang phân số tối giản.",
        "image": null,
        "answer": "3/22",
        "acceptableAnswers": [
          "3/22",
          "\\frac{3}{22}",
          "3 / 22",
          "0.1364"
        ],
        "unit": "",
        "hint": "Đổi số thập phân vô hạn tuần hoàn sang phân số tối giản.",
        "solution": "**Phương pháp: Đổi số thập phân vô hạn tuần hoàn sang phân số tối giản.**\n- Đặt x = 0.1(36) = 0.1363636...\n- Ta nhân hai vế với 10 và 1000:\n10 \\times x = 1.363636...\n1000 \\times x = 136.363636...\n- Trừ từng vế hai phương trình trên:\n1000 \\times x - 10 \\times x = 136.3636... - 1.3636...\n990 \\times x = 135 \\implies x = \\frac{135}{990}\n- Rút gọn cả tử và mẫu cho 45:\n\\frac{135 : 45}{990 : 45} = \\frac{3}{22}\n*(Ghi chú: Đề gốc để trống đáp án này, phân số tối giản chính xác là \\frac{3}{22})*.\n**Đáp số: 3/22.**"
      },
      {
        "id": 10,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $5 + 8 + 10 + 13 + 15 + 18 + 20 + 23 + 25 + 28 + 30 + 33 + 35 + 38 + 40$.",
        "questionVi": "Tính giá trị của biểu thức $5 + 8 + 10 + 13 + 15 + 18 + 20 + 23 + 25 + 28 + 30 + 33 + 35 + 38 + 40$.",
        "image": null,
        "answer": "341",
        "acceptableAnswers": [
          "341"
        ],
        "unit": "",
        "hint": "Quy luật dãy số bước nhảy kép đan xen.",
        "solution": "**Phương pháp: Quy luật dãy số bước nhảy kép đan xen.**\n- Ta nhóm các số hạng theo từng cặp bước nhảy +3:\nS = (5 + 8) + (10 + 13) + (15 + 18) + (20 + 23) + (25 + 28) + (30 + 33) + (35 + 38) + 40\nS = 13 + 23 + 33 + 43 + 53 + 63 + 73 + 40\n- Dãy 13, 23, 33, 43, 53, 63, 73 gồm 7 số hạng cách đều 10 đơn vị, có số chính giữa là 43.\n- Tổng của 7 số hạng này là: 7 \\times 43 = 301.\n- Tổng toàn bộ biểu thức là: 301 + 40 = 341.\n**Đáp số: 341.**"
      },
      {
        "id": 11,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "How many irreducible proper fraction(s) with denominator $1386$ is / are there?",
        "questionVi": "Có bao nhiêu phân số tối giản dương nhỏ hơn 1 có mẫu số bằng $1386$?",
        "image": null,
        "answer": "360",
        "acceptableAnswers": [
          "360"
        ],
        "unit": "",
        "hint": "Hàm phi Euler \\varphi(n) đếm số nguyên tố cùng nhau.",
        "solution": "**Phương pháp: Hàm phi Euler \\varphi(n) đếm số nguyên tố cùng nhau.**\n- Phân số tối giản dương nhỏ hơn 1 có mẫu 1386 có dạng \\frac{k}{1386} với 1 \\le k < 1386 và \\text{ƯCLN}(k, 1386) = 1.\n- Phân tích số 1386 ra thừa số nguyên tố:\n1386 = 2 \\times 3^2 \\times 7 \\times 11\n- Số lượng các số nguyên tố cùng nhau với 1386 nhỏ hơn 1386 là:\n\\varphi(1386) = 1386 \\times \\left(1 - \\frac{1}{2}\\right) \\times \\left(1 - \\frac{1}{3}\\right) \\times \\left(1 - \\frac{1}{7}\\right) \\times \\left(1 - \\frac{1}{11}\\right)\n\\varphi(1386) = 1386 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{6}{7} \\times \\frac{10}{11} = 1386 \\times \\frac{120}{462} = 3 \\times 120 = 360\n**Đáp số: 360.**"
      },
      {
        "id": 12,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If integer $K$ is divided by $9$, the remainder is $2$. What is the remainder when $4K + 7$ is divided by $12$?",
        "questionVi": "Biết số nguyên $K$ chia cho $9$ dư $2$. Hỏi biểu thức $4K + 7$ chia cho $12$ có số dư là bao nhiêu?",
        "image": null,
        "answer": "3",
        "acceptableAnswers": [
          "3"
        ],
        "unit": "",
        "hint": "Biểu diễn số dư và tính chất đồng dư thức.",
        "solution": "**Phương pháp: Biểu diễn số dư và tính chất đồng dư thức.**\n- Vì K chia cho 9 dư 2 nên ta biểu diễn: K = 9 \\times m + 2 (m là số tự nhiên).\n- Thay vào biểu thức 4K + 7 ta được:\n4K + 7 = 4 \\times (9m + 2) + 7 = 36m + 8 + 7 = 36m + 15\n- Nhận thấy 36m = 12 \\times 3m luôn chia hết cho 12 với mọi m.\n- Do đó số dư của 4K + 7 khi chia cho 12 đúng bằng số dư của 15 khi chia cho 12:\n15 = 12 \\times 1 + 3 \\implies \\text{Số dư là } 3\n**Đáp số: 3.**"
      },
      {
        "id": 13,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the unit digit of $A$ if $A = 2^2 + 4^2 + 6^2 + 8^2 + \\dots + 100^2$.",
        "questionVi": "Tìm chữ số tận cùng của $A$ biết $A = 2^2 + 4^2 + 6^2 + 8^2 + \\dots + 100^2$.",
        "image": null,
        "answer": "0",
        "acceptableAnswers": [
          "0"
        ],
        "unit": "",
        "hint": "Xét chu kỳ chữ số tận cùng của lũy thừa.",
        "solution": "**Phương pháp: Xét chu kỳ chữ số tận cùng của lũy thừa.**\n- Dãy A gồm (100 - 2) : 2 + 1 = 50 số hạng chẵn bình phương.\n- Chữ số tận cùng của các số chẵn bình phương:\n+ (\\dots 2)^2 tận cùng là 4;\n+ (\\dots 4)^2 tận cùng là 6;\n+ (\\dots 6)^2 tận cùng là 6;\n+ (\\dots 8)^2 tận cùng là 4;\n+ (\\dots 0)^2 tận cùng là 0.\n- Tổng chữ số tận cùng của một khối 5 số chẵn liên tiếp (ví dụ 2^2 + 4^2 + 6^2 + 8^2 + 10^2):\n4 + 6 + 6 + 4 + 0 = 20 \\implies \\text{tận cùng là } 0\n- Dãy gồm 50 số hạng, chia thành đúng 50 : 5 = 10 khối, mỗi khối đều có tổng tận cùng là 0.\n- Do đó tổng A có chữ số tận cùng bằng 0.\n**Đáp số: 0.**"
      },
      {
        "id": 14,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Given a 9-digit number $\\overline{1523459A2}$ is divisible by $12$. Find the value of $A$.",
        "questionVi": "Cho số có 9 chữ số $\\overline{1523459A2}$ chia hết cho $12$. Tìm giá trị của chữ số $A$.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết đồng thời cho 3 và 4.",
        "solution": "**Phương pháp: Dấu hiệu chia hết đồng thời cho 3 và 4.**\n- Số 1523459A2 chia hết cho 12 khi và chỉ khi đồng thời chia hết cho 3 và 4.\n- Điều kiện chia hết cho 4: Hai chữ số tận cùng \\overline{A2} phải chia hết cho 4.\nVì 2 tận cùng nên chữ số hàng chục A phải là số lẻ: A \\in \\{1, 3, 5, 7, 9\\}.\n- Điều kiện chia hết cho 3: Tổng các chữ số phải chia hết cho 3:\n\\text{Tổng} = 1 + 5 + 2 + 3 + 4 + 5 + 9 + A + 2 = 31 + A\nVì 31 chia 3 dư 1 nên A phải chia 3 dư 2.\n- Trong tập A \\in \\{1, 3, 5, 7, 9\\}, chỉ có duy nhất chữ số 5 chia 3 dư 2 (31 + 5 = 36 \\,\\vdots\\, 3).\n- Vậy A = 5.\n**Đáp số: 5.**"
      },
      {
        "id": 15,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of 13 consecutive natural numbers is $260$. Find the largest number.",
        "questionVi": "Tổng của 13 số tự nhiên liên tiếp là $260$. Tìm số lớn nhất trong các số đó.",
        "image": null,
        "answer": "26",
        "acceptableAnswers": [
          "26"
        ],
        "unit": "",
        "hint": "Tính chất trung bình cộng của dãy số cách đều lẻ phần tử.",
        "solution": "**Phương pháp: Tính chất trung bình cộng của dãy số cách đều lẻ phần tử.**\n- Vì dãy có 13 số tự nhiên liên tiếp (số lượng số lẻ), nên trung bình cộng của 13 số đúng bằng số đứng ở vị trí chính giữa (số thứ 7).\n- Số đứng ở vị trí thứ 7 là: 260 : 13 = 20.\n- Số lớn nhất trong dãy là số thứ 13, cách số thứ 7 đúng: 13 - 7 = 6 đơn vị.\n- Vậy số lớn nhất là: 20 + 6 = 26.\n**Đáp số: 26.**"
      },
      {
        "id": 16,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "If the length of a cuboid increases by $4\\text{ cm}$, the volume will increase by $24\\text{ cm}^3$. If the width increases by $2\\text{ cm}$, the volume will increase by $24\\text{ cm}^3$. If the height increases by $7\\text{ cm}$, the volume will increase by $14\\text{ cm}^3$. Find the original volume of the cuboid in $\\text{cm}^3$.",
        "questionVi": "Nếu chiều dài của một hình hộp chữ nhật tăng thêm $4\\text{ cm}$ thì thể tích tăng thêm $24\\text{ cm}^3$. Nếu chiều rộng tăng thêm $2\\text{ cm}$ thì thể tích tăng thêm $24\\text{ cm}^3$. Nếu chiều cao tăng thêm $7\\text{ cm}$ thì thể tích tăng thêm $14\\text{ cm}^3$. Tìm thể tích ban đầu của hình hộp chữ nhật theo $\\text{cm}^3$.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Tỉ lệ thể tích và tích các kích thước hình hộp chữ nhật.",
        "solution": "**Phương pháp: Tỉ lệ thể tích và tích các kích thước hình hộp chữ nhật.**\n- Gọi chiều dài, chiều rộng, chiều cao ban đầu của hình hộp lần lượt là a, b, c (cm). Thể tích ban đầu là V = a \\times b \\times c.\n- Theo đề bài:\n+ Chiều dài tăng 4cm \\implies 4 \\times b \\times c = 24 \\implies b \\times c = 6.\n+ Chiều rộng tăng 2cm \\implies a \\times 2 \\times c = 24 \\implies a \\times c = 12.\n+ Chiều cao tăng 7cm \\implies a \\times b \\times 7 = 14 \\implies a \\times b = 2.\n- Nhân cả ba biểu thức lại với nhau:\n(a \\times b) \\times (b \\times c) \\times (a \\times c) = 2 \\times 6 \\times 12 = 144\n(a \\times b \\times c)^2 = 144 \\implies V^2 = 144\n- Do thể tích V > 0, ta có: V = \\sqrt{144} = 12\\text{ (cm}^3\\text{)}.\n**Đáp số: 12.**"
      },
      {
        "id": 17,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A 3-D figure is formed by cubes with volume $1$. The 1st generation, 2nd generation and 3rd generation of the figure are shown below. Find the volume of the figure in the 12th generation.",
        "questionVi": "Một hình khối 3 chiều được tạo bởi các khối lập phương có thể tích bằng $1$. Thế hệ thứ nhất, thứ hai và thứ ba của hình khối được biểu diễn dưới đây. Tìm thể tích của hình khối ở thế hệ thứ 12.",
        "image": "images/exam_de1/q17_cleaned.png",
        "answer": "37",
        "acceptableAnswers": [
          "37"
        ],
        "unit": "",
        "hint": "Tìm quy luật số khối lập phương theo thế hệ.",
        "solution": "**Phương pháp: Tìm quy luật số khối lập phương theo thế hệ.**\n- Quan sát số khối lập phương qua từng thế hệ:\n+ Thế hệ 1 (n=1): Cột tháp cao 2 khối, nhánh trái 2 khối, nhánh trước 0 khối \\implies Tổng = 2 + 2 + 0 = 4 khối.\n+ Thế hệ 2 (n=2): Cột tháp cao 3 khối, nhánh trái 3 khối, nhánh trước 1 khối \\implies Tổng = 3 + 3 + 1 = 7 khối.\n+ Thế hệ 3 (n=3): Cột tháp cao 4 khối, nhánh trái 4 khối, nhánh trước 2 khối \\implies Tổng = 4 + 4 + 2 = 10 khối.\n- Quy luật số khối lập phương ở thế hệ thứ n là:\n\\text{Số khối} = 3 \\times n + 1\n- Ở thế hệ thứ 12 (n = 12):\n\\text{Số khối} = 3 \\times 12 + 1 = 37\\text{ (khối)}\n- Vì mỗi khối có thể tích bằng 1 nên tổng thể tích là: 37 \\times 1 = 37.\n**Đáp số: 37.**"
      },
      {
        "id": 18,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The area of a rectangle is $504$. If the sides of the rectangle are integers, find the minimum perimeter of the rectangle.",
        "questionVi": "Diện tích của một hình chữ nhật là $504$. Nếu các cạnh của hình chữ nhật là các số nguyên, tìm chu vi nhỏ nhất của hình chữ nhật đó.",
        "image": null,
        "answer": "90",
        "acceptableAnswers": [
          "90"
        ],
        "unit": "",
        "hint": "Tối ưu hóa chu vi hình chữ nhật khi biết diện tích cố định.",
        "solution": "**Phương pháp: Tối ưu hóa chu vi hình chữ nhật khi biết diện tích cố định.**\n- Gọi chiều dài và chiều rộng là a và b (a \\ge b, a, b nguyên dương).\n- Diện tích: a \\times b = 504. Chu vi: P = 2 \\times (a + b).\n- Để chu vi nhỏ nhất thì tổng a + b phải nhỏ nhất, tức là hai cạnh a và b phải gần nhau nhất có thể.\n- Xét căn bậc hai của 504: \\sqrt{504} \\approx 22.45.\n- Phân tích 504 ra thừa số nguyên tố:\n504 = 2^3 \\times 3^2 \\times 7\n- Các cặp ước nguyên của 504 gần 22 nhất:\n21 \\times 24 = 504\n- Vậy hai kích thước tối ưu là a = 24 và b = 21.\n- Chu vi nhỏ nhất là:\nP = 2 \\times (24 + 21) = 2 \\times 45 = 90\n**Đáp số: 90.**"
      },
      {
        "id": 19,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is formed by 7 regular hexagons and 6 equilateral triangles. The area of each equilateral triangle is $1$. Find the total area of the figure.",
        "questionVi": "Hình vẽ dưới đây được tạo bởi 7 hình lục giác đều và 6 hình tam giác đều. Diện tích của mỗi hình tam giác đều là $1$. Tìm tổng diện tích của toàn bộ hình vẽ.",
        "image": "images/exam_de1/q19_vector.png",
        "answer": "48",
        "acceptableAnswers": [
          "48"
        ],
        "unit": "",
        "hint": "Phân tích & ghép mảnh tam giác bằng nhau (Tessellation & Grid Decomposition).",
        "solution": "**Phương pháp: Phân tích & ghép mảnh tam giác bằng nhau (Tessellation & Grid Decomposition).**\n- Bước 1: Phân tích 1 hình lục giác đều thành 6 mảnh tam giác bằng nhau:\n  + Nối các đỉnh không kề nhau tạo thành 3 tam giác ở 3 góc và 3 tam giác kề tâm O.\n  + Sáu tam giác này có diện tích bằng nhau và mỗi hình có diện tích đúng bằng tam giác đơn vị ở ngoài: S = 1.\n  S(lục giác) = 6 × 1 = 6.\n- Bước 2: Tính tổng diện tích toàn bộ hình vẽ bằng cách đếm tổng số mảnh tam giác:\n  + 7 hình lục giác đều gồm: 7 × 6 = 42 (mảnh tam giác).\n  + 6 hình tam giác ở các khe bên ngoài: 6 (mảnh tam giác).\n  + Tổng số mảnh tam giác của toàn bộ hình là: 42 + 6 = 48 (mảnh tam giác).\n  S_tổng = 42 + 6 = 48.\n**Đáp số: 48.**"
      },
      {
        "id": 20,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Given $ABCD$ is a parallelogram. $P$ is a point inside $ABCD$. The area of $\\Delta APD$ is $74$ and the area of $\\Delta BCP$ is $13\\%$ of the area of $ABCD$. Find the area of $ABCD$.",
        "questionVi": "Cho $ABCD$ là một hình bình hành. $P$ là một điểm nằm bên trong $ABCD$. Diện tích của tam giác $APD$ bằng $74$ và diện tích của tam giác $BCP$ bằng $13\\%$ diện tích hình bình hành $ABCD$. Tìm diện tích hình bình hành $ABCD$.",
        "image": "images/exam_de1/q20_vector.png",
        "answer": "200",
        "acceptableAnswers": [
          "200"
        ],
        "unit": "",
        "hint": "Bổ đề diện tích điểm trong hình bình hành.",
        "solution": "**Phương pháp: Bổ đề diện tích điểm trong hình bình hành.**\n- Kẻ đường thẳng qua P vuông góc với hai đáy AD và BC.\nGọi khoảng cách từ P đến AD là h_1 và đến BC là h_2.\nChiều cao của hình bình hành là h = h_1 + h_2, và đáy AD = BC.\n- Ta có:\nS(APD) + S(BCP) = \\frac{1}{2}AD \\times h_1 + \\frac{1}{2}BC \\times h_2 = \\frac{1}{2}AD \\times (h_1 + h_2) = \\frac{1}{2} S(ABCD)\nNhư vậy: S(APD) + S(BCP) = 50\\% \\times S(ABCD).\n- Theo đề bài: S(APD) = 74 và S(BCP) = 13\\% \\times S(ABCD).\n- Thay vào bổ đề:\n74 + 13\\% \\times S(ABCD) = 50\\% \\times S(ABCD)\n(50\\% - 13\\%) \\times S(ABCD) = 74\n37\\% \\times S(ABCD) = 74 \\implies S(ABCD) = 74 : 0.37 = 200\n**Đáp số: 200.**"
      },
      {
        "id": 21,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "At least how many numbers should be chosen from $1$ to $222$ arbitrarily to ensure that there are at least two numbers whose difference is $32$?",
        "questionVi": "Cần chọn tùy ý ít nhất bao nhiêu số từ $1$ đến $222$ để chắc chắn rằng có ít nhất hai số có hiệu bằng $32$?",
        "image": null,
        "answer": "127",
        "acceptableAnswers": [
          "127"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet và bài toán hiệu số cố định.",
        "solution": "**Phương pháp: Nguyên lý Dirichlet và bài toán hiệu số cố định.**\n- Ta cần tìm số phần tử lớn nhất có thể chọn sao cho KHÔNG có 2 số nào có hiệu bằng 32 (trường hợp xấu nhất).\n- Ta có 222 = 32 \\times 6 + 30. Chia các số thành 32 chuỗi số dư theo modulo 32:\n+ Với 30 số dư r \\in \\{1, 2, \\dots, 30\\}: Mỗi chuỗi có 7 số (r, r+32, r+64, \\dots, r+192). Trong 7 số liên tiếp cách nhau 32, để không có 2 số liên tiếp nào cùng được chọn, ta chọn tối đa được 4 số (ở các vị trí 1, 3, 5, 7).\nTổng cộng chọn được: 30 \\times 4 = 120 số.\n+ Với 2 số dư r \\in \\{31, 32\\}: Mỗi chuỗi có 6 số (r, r+32, \\dots, r+160). Trong 6 số, chọn tối đa được 3 số không liên tiếp.\nTổng cộng chọn được: 2 \\times 3 = 6 số.\n- Số lượng số tối đa có thể chọn mà không có cặp nào có hiệu bằng 32 là:\n120 + 6 = 126\\text{ (số)}\n- Theo nguyên lý Dirichlet, nếu ta chọn ra 126 + 1 = 127 số thì chắc chắn phải tồn tại ít nhất 2 số có hiệu bằng 32.\n**Đáp số: 127.**"
      },
      {
        "id": 22,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "There are $9$ boys and $6$ girls. $2$ boys and $2$ girls are chosen to form a research group. How many different combination(s) is / are there?",
        "questionVi": "Có $9$ bạn nam và $6$ bạn nữ. Cần chọn ra $2$ bạn nam và $2$ bạn nữ để lập thành một nhóm nghiên cứu. Hỏi có bao nhiêu cách chọn khác nhau?",
        "image": null,
        "answer": "540",
        "acceptableAnswers": [
          "540"
        ],
        "unit": "",
        "hint": "Quy tắc nhân và tổ hợp chọn cặp độc lập.",
        "solution": "**Phương pháp: Quy tắc nhân và tổ hợp chọn cặp độc lập.**\n- Số cách chọn 2 bạn nam từ 9 bạn nam:\n\\frac{9 \\times 8}{2} = 36\\text{ (cách)}\n- Số cách chọn 2 bạn nữ từ 6 bạn nữ:\n\\frac{6 \\times 5}{2} = 15\\text{ (cách)}\n- Vì việc chọn nam và chọn nữ là hai công đoạn độc lập, theo quy tắc nhân, tổng số cách chọn một nhóm gồm 2 nam và 2 nữ là:\n36 \\times 15 = 540\\text{ (cách)}\n**Đáp số: 540.**"
      },
      {
        "id": 23,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many 3-digit number(s) without repeated digits can be formed by digits $0, 2, 3, 6, 8, 9$ that is / are divisible by $3$?",
        "questionVi": "Có thể lập được bao nhiêu số có 3 chữ số khác nhau từ các chữ số $0, 2, 3, 6, 8, 9$ sao cho số đó chia hết cho $3$?",
        "image": null,
        "answer": "18",
        "acceptableAnswers": [
          "18"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết cho 3 và phân nhóm đồng dư.",
        "solution": "**Phương pháp: Dấu hiệu chia hết cho 3 và phân nhóm đồng dư.**\n- Phân loại các chữ số \\{0, 2, 3, 6, 8, 9\\} theo số dư khi chia cho 3:\n+ Nhóm dư 0: \\{0, 3, 6, 9\\} (4 chữ số).\n+ Nhóm dư 1: Rỗng (0 chữ số).\n+ Nhóm dư 2: \\{2, 8\\} (2 chữ số).\n- Để số có 3 chữ số chia hết cho 3 thì tổng 3 chữ số phải chia hết cho 3.\nVì không có chữ số nào ở nhóm dư 1, nên ta KHÔNG THỂ chọn bộ 3 chữ số gồm (1 số dư 0, 1 số dư 1, 1 số dư 2) hay 3 số cùng dư 2 (vì nhóm dư 2 chỉ có 2 chữ số).\nDo đó, cả 3 chữ số bắt buộc phải cùng thuộc nhóm dư 0: \\{0, 3, 6, 9\\}.\n- Chọn 3 chữ số từ \\{0, 3, 6, 9\\}:\n+ Bộ không chứa chữ số 0: \\{3, 6, 9\\} \\implies lập được 3! = 3 \\times 2 \\times 1 = 6 số.\n+ Các bộ chứa chữ số 0: gồm \\{0, 3, 6\\}, \\{0, 3, 9\\}, \\{0, 6, 9\\} (3 bộ).\nVới mỗi bộ có chữ số 0: chữ số hàng trăm có 2 cách chọn (khác 0), hàng chục có 2 cách chọn, hàng đơn vị có 1 cách chọn \\implies 2 \\times 2 \\times 1 = 4 số.\nBa bộ lập được: 3 \\times 4 = 12 số.\n- Tổng số lượng các số thỏa mãn là:\n6 + 12 = 18\\text{ (số)}\n**Đáp số: 18.**"
      },
      {
        "id": 24,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many positive integer(s) less than $200$ without repeated digits is / are there?",
        "questionVi": "Có bao nhiêu số nguyên dương nhỏ hơn $200$ có các chữ số khác nhau?",
        "image": null,
        "answer": "162",
        "acceptableAnswers": [
          "162"
        ],
        "unit": "",
        "hint": "Phân loại đếm số theo số lượng chữ số.",
        "solution": "**Phương pháp: Phân loại đếm số theo số lượng chữ số.**\n- Các số nguyên dương nhỏ hơn 200 có các chữ số phân biệt gồm:\n+ Số có 1 chữ số (từ 1 đến 9): Có 9 số.\n+ Số có 2 chữ số (từ 10 đến 99):\nChữ số hàng chục có 9 cách chọn (từ 1 đến 9).\nChữ số hàng đơn vị có 9 cách chọn (khác chữ số hàng chục).\n\\implies 9 \\times 9 = 81 số.\n+ Số có 3 chữ số nhỏ hơn 200 (từ 100 đến 199, có dạng \\overline{1bc}):\nChữ số hàng trăm là 1 (có 1 cách chọn).\nChữ số hàng chục b \\in \\{0, 2, 3, \\dots, 9\\} (9 cách chọn, b \\ne 1).\nChữ số hàng đơn vị c có 8 cách chọn (c \\ne 1 và c \\ne b).\n\\implies 1 \\times 9 \\times 8 = 72 số.\n- Tổng số các số thỏa mãn là:\n9 + 81 + 72 = 162\\text{ (số)}\n**Đáp số: 162.**"
      },
      {
        "id": 25,
        "examId": "heat_2020_2021_de1",
        "examIndex": 0,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many positive integer(s) from $1$ to $6666$ with two '$6$' and one '$7$' is / are there?",
        "questionVi": "Có bao nhiêu số nguyên dương từ $1$ đến $6666$ có chứa đúng hai chữ số $6$ và đúng một chữ số $7$?",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Phân loại đếm số thỏa mãn điều kiện chữ số.",
        "solution": "**Phương pháp: Phân loại đếm số thỏa mãn điều kiện chữ số.**\n- Số cần tìm chứa đúng hai chữ số 6 và đúng một chữ số 7, do đó số này có ít nhất 3 chữ số.\n- Trường hợp 1: Số có 3 chữ số (từ 100 đến 999):\n+ Được tạo thành từ đúng bộ chữ số \\{6, 6, 7\\}.\n+ Số cách sắp xếp là: \\frac{3!}{2!} = 3 số (667, 676, 766). Cả 3 số đều < 6666.\n- Trường hợp 2: Số có 4 chữ số nhỏ hơn hoặc bằng 6666:\nGồm hai chữ số 6, một chữ số 7 và một chữ số d \\in \\{0, 1, 2, 3, 4, 5, 8, 9\\} (8 khả năng của d).\nVì số \\le 6666 nên chữ số hàng nghìn phải \\le 6:\n+ *Nếu chữ số hàng nghìn là 6:*\nBa chữ số còn lại gồm đúng một số 6, một số 7 và một số d.\n- Nếu hàng trăm là 6: số có dạng \\overline{66d7}, để \\le 6666 thì d \\le 5 (d \\in \\{0, 1, 2, 3, 4, 5\\}) \\implies có 6 số.\n- Nếu hàng trăm là d \\le 5 (6 cách chọn): số có dạng \\overline{6d...}, hai vị trí cuối là 6 và 7 có 2! = 2 cách xếp \\implies 6 \\times 2 = 12 số.\n\\implies Hàng nghìn là 6 có: 6 + 12 = 18 số.\n+ *Nếu chữ số hàng nghìn là d \\in \\{1, 2, 3, 4, 5\\} (5 cách chọn, d \\ne 0):*\nLúc này số luôn < 6000 < 6666. Ba vị trí còn lại là \\{6, 6, 7\\} có \\frac{3!}{2!} = 3 cách xếp.\n\\implies Có 5 \\times 3 = 15 số.\n\\implies Tổng số có 4 chữ số là: 18 + 15 = 33 số.\n- Tổng cộng cả số có 3 chữ số và 4 chữ số là:\n3 + 33 = 36\\text{ (số)}\n**Đáp số: 36.**"
      }
    ]
  },
  {
    "id": "heat_2019_2020_de2",
    "title": "Đề số 2: VCK Quốc gia (2019 – 2020)",
    "titleEn": "Paper 2: National Final Heat Round (2019 – 2020)",
    "year": "2019 – 2020",
    "grade": "Khối 6 / Grade 6",
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
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are 16 pieces of white chopsticks, 27 pieces of yellow chopsticks and 46 pieces of blue chopsticks mixed together. If you want to get 2 pairs of white chopsticks and 3 pairs of chopsticks in another colour, at least how many pieces of chopsticks should be taken out randomly?",
        "questionVi": "Có 16 chiếc đũa trắng, 27 chiếc đũa vàng và 46 chiếc đũa xanh được trộn lẫn với nhau. Nếu bạn muốn lấy ra được 2 đôi đũa trắng và 3 đôi đũa có cùng một màu khác, hỏi cần lấy ngẫu nhiên ít nhất bao nhiêu chiếc đũa?",
        "image": null,
        "answer": "77",
        "acceptableAnswers": [
          "77"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet / Phân tích trường hợp xấu nhất (Worst-case scenario).",
        "solution": "**Phương pháp: Nguyên lý Dirichlet / Phân tích trường hợp xấu nhất (Worst-case scenario).**\n- Đề bài yêu cầu: Lấy ra 2 đôi đũa trắng (tương ứng với 4 chiếc đũa trắng) VÀ 3 đôi đũa cùng màu khác (tương ứng với 6 chiếc đũa cùng màu vàng hoặc 6 chiếc đũa cùng màu xanh).\n- Để chắc chắn đạt được yêu cầu khi lấy ngẫu nhiên, ta phân tích trường hợp xấu nhất không thỏa mãn:\n  + Trường hợp ta lấy chưa đủ 4 chiếc đũa trắng (mới chỉ lấy tối đa 3 chiếc đũa trắng).\n  + Để số đũa lấy ra là nhiều nhất mà vẫn chưa thỏa mãn yêu cầu, ta đã lấy toàn bộ 46 chiếc đũa xanh, toàn bộ 27 chiếc đũa vàng, và 3 chiếc đũa trắng.\n  + Khi đó tổng số đũa đã lấy ra là: 46 + 27 + 3 = 76 (chiếc đũa).\n- Lúc này, trong hộp chỉ còn lại toàn đũa trắng. Do đó, chỉ cần lấy thêm đúng 1 chiếc đũa nữa (chiếc thứ 77), chắc chắn đó là đũa trắng, nâng số đũa trắng lên thành: 3 + 1 = 4 chiếc (đủ đúng 2 đôi đũa trắng). Đồng thời, ta đã có sẵn thừa ít nhất 3 đôi đũa cùng màu xanh hoặc vàng.\n- Vậy cần lấy ngẫu nhiên ít nhất: 76 + 1 = 77 (chiếc đũa).\n**Đáp số: 77.**"
      },
      {
        "id": 27,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are some chickens and rabbits in a cage. The number of chickens is 4 times as the number of rabbits. They have 240 legs in total. How many chickens are there?",
        "questionVi": "Có một số con gà và thỏ ở trong lồng. Số con gà gấp 4 lần số con thỏ. Biết tổng số chân của chúng là 240 chân. Hỏi trong lồng có bao nhiêu con gà?",
        "image": null,
        "answer": "80",
        "acceptableAnswers": [
          "80"
        ],
        "unit": "",
        "hint": "Phương pháp chia nhóm / Giả thiết tạm (Bài toán Gà - Thỏ).",
        "solution": "**Phương pháp: Phương pháp chia nhóm / Giả thiết tạm (Bài toán Gà - Thỏ).**\n- Theo bài ra, số gà gấp 4 lần số thỏ: Số gà = 4 × Số thỏ.\n- Mỗi con gà có 2 chân, mỗi con thỏ có 4 chân.\n- Ta nhóm 1 con thỏ và 4 con gà vào một nhóm. Khi đó:\n  Số chân của mỗi nhóm là: 1 × 4 + 4 × 2 = 4 + 8 = 12 (chân).\n- Tổng số chân của cả đàn là 240 chân, nên số nhóm là: 240 : 12 = 20 (nhóm).\n- Vì mỗi nhóm gồm 4 con gà, nên số con gà trong lồng là: 20 × 4 = 80 (con gà).\n- (Kiểm tra lại: Có 20 con thỏ và 80 con gà. Tổng số chân: 20 × 4 + 80 × 2 = 80 + 160 = 240 chân, hoàn toàn chính xác).\n**Đáp số: 80.**"
      },
      {
        "id": 28,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "It requires 16 minutes to cut a piece of wood into 9 sections. If the time required to cut into each section is the same, how many minute(s) is / are required to cut the wood into 11 sections?",
        "questionVi": "Cần 16 phút để cưa một khúc gỗ thành 9 đoạn. Biết thời gian cho mỗi lần cưa là như nhau, hỏi cần bao nhiêu phút để cưa khúc gỗ đó thành 11 đoạn?",
        "image": null,
        "answer": "20",
        "acceptableAnswers": [
          "20"
        ],
        "unit": "",
        "hint": "Bài toán trồng cây / Cắt đoạn thẳng.",
        "solution": "**Phương pháp: Bài toán trồng cây / Cắt đoạn thẳng.**\n- Để cưa một khúc gỗ thành 9 đoạn, người thợ cần thực hiện số nhát cưa là: 9 – 1 = 8 (nhát cưa).\n- Thời gian để thực hiện 1 nhát cưa là: 16 : 8 = 2 (phút).\n- Để cưa khúc gỗ thành 11 đoạn, số nhát cưa cần thực hiện là: 11 – 1 = 10 (nhát cưa).\n- Thời gian cần thiết để cưa khúc gỗ thành 11 đoạn là: 10 × 2 = 20 (phút).\n**Đáp số: 20.**"
      },
      {
        "id": 29,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Find the average of the following 8 numbers: 2019, 2065, 2046, 1985, 2034, 1922, 46, 1827.",
        "questionVi": "Tìm trung bình cộng của 8 số sau: 2019, 2065, 2046, 1985, 2034, 1922, 46, 1827.",
        "image": null,
        "answer": "1743",
        "acceptableAnswers": [
          "1743"
        ],
        "unit": "",
        "hint": "Phương pháp tính trung bình cộng.",
        "solution": "**Phương pháp: Phương pháp tính trung bình cộng.**\n- Muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó rồi chia cho số lượng số hạng.\n- Tổng của 8 số đã cho là:\n  2019 + 2065 + 2046 + 1985 + 2034 + 1922 + 46 + 1827\n  = (2019 + 1985) + (2065 + 2034) + (2046 + 1922) + (46 + 1827)\n  = 4004 + 4099 + 3968 + 1873 = 13944.\n- Trung bình cộng của 8 số trên là: 13944 : 8 = 1743.\n**Đáp số: 1743.**"
      },
      {
        "id": 30,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Leo needs 18 days to finish a project. Bruce needs 21 days to finish the same project. If Leo, Bruce and Mary do that project together, it takes 9 days. How many days does Mary take to finish the project alone?",
        "questionVi": "Leo cần 18 ngày để hoàn thành một dự án. Bruce cần 21 ngày để hoàn thành dự án đó. Nếu cả ba người Leo, Bruce và Mary cùng làm thì hoàn thành dự án sau 9 ngày. Hỏi một mình Mary làm dự án đó thì mất bao nhiêu ngày?",
        "image": null,
        "answer": "126",
        "acceptableAnswers": [
          "126"
        ],
        "unit": "",
        "hint": "Phương pháp bài toán công việc chung - công việc riêng (Quy ước toàn bộ công việc là 1 đơn vị).",
        "solution": "**Phương pháp: Phương pháp bài toán công việc chung - công việc riêng (Quy ước toàn bộ công việc là 1 đơn vị).**\n- Coi toàn bộ dự án cần hoàn thành là 1 đơn vị công việc.\n- Trong 1 ngày, Leo hoàn thành được: $1 : 18 = \\frac{1}{18}$ (dự án).\n- Trong 1 ngày, Bruce hoàn thành được: $1 : 21 = \\frac{1}{21}$ (dự án).\n- Trong 1 ngày, cả ba người Leo, Bruce và Mary hoàn thành được: $1 : 9 = \\frac{1}{9}$ (dự án).\n- Trong 1 ngày, một mình Mary hoàn thành được số phần dự án là:\n  $\\frac{1}{9} - \\left(\\frac{1}{18} + \\frac{1}{21}\\right) = \\left(\\frac{1}{9} - \\frac{1}{18}\\right) - \\frac{1}{21} = \\frac{1}{18} - \\frac{1}{21} = \\frac{7 - 6}{126} = \\frac{1}{126}$ (dự án).\n- Thời gian để một mình Mary hoàn thành toàn bộ dự án là: $1 : \\frac{1}{126} = 126$ (ngày).\n**Đáp số: 126.**"
      },
      {
        "id": 31,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 + 4 + 7 + 10 + \\dots + 31 + 34$.",
        "questionVi": "Tính giá trị của biểu thức: $1 + 4 + 7 + 10 + \\dots + 31 + 34$.",
        "image": null,
        "answer": "210",
        "acceptableAnswers": [
          "210"
        ],
        "unit": "",
        "hint": "Tính tổng dãy số cách đều.",
        "solution": "**Phương pháp: Tính tổng dãy số cách đều.**\n- Dãy số đã cho: 1, 4, 7, 10, ..., 31, 34.\n- Đây là dãy số cách đều có số hạng đầu là 1, số hạng cuối là 34, khoảng cách giữa hai số liên tiếp là d = 3.\n- Số các số hạng của dãy là: (34 – 1) : 3 + 1 = 33 : 3 + 1 = 12 (số hạng).\n- Tổng của dãy số là: (1 + 34) × 12 : 2 = 35 × 6 = 210.\n**Đáp số: 210.**"
      },
      {
        "id": 32,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1369 \\times 1722 - 1364 \\times 1717$.",
        "questionVi": "Tính giá trị của biểu thức: $1369 \\times 1722 - 1364 \\times 1717$.",
        "image": null,
        "answer": "15430",
        "acceptableAnswers": [
          "15430"
        ],
        "unit": "",
        "hint": "Tính chất phân phối của phép nhân đối với phép cộng / Đặt biến phụ vi sai.",
        "solution": "**Phương pháp: Tính chất phân phối của phép nhân đối với phép cộng / Đặt biến phụ vi sai.**\n- Ta nhận thấy mối quan hệ giữa các thừa số:\n  1369 = 1364 + 5 và 1722 = 1717 + 5.\n- Thay vào biểu thức ban đầu:\n  1369 × 1722 – 1364 × 1717\n  = (1364 + 5) × (1717 + 5) – 1364 × 1717\n  = 1364 × 1717 + 5 × 1364 + 5 × 1717 + 5 × 5 – 1364 × 1717\n  = 5 × (1364 + 1717) + 25\n  = 5 × 3081 + 25 = 15405 + 25 = 15430.\n**Đáp số: 15430.**"
      },
      {
        "id": 33,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $\\frac{1}{110} + \\frac{1}{132} + \\frac{1}{156} + \\dots + \\frac{1}{342} + \\frac{1}{380}$.",
        "questionVi": "Tính giá trị của biểu thức: $\\frac{1}{110} + \\frac{1}{132} + \\frac{1}{156} + \\dots + \\frac{1}{342} + \\frac{1}{380}$.",
        "image": null,
        "answer": "$\\frac{1}{20}$",
        "acceptableAnswers": [
          "\\frac{1}{20}",
          "1/20",
          "1 / 20",
          "0.05"
        ],
        "unit": "",
        "hint": "Sai phân triệt tiêu (Telescoping Series): $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.",
        "solution": "**Phương pháp: Sai phân triệt tiêu (Telescoping Series): $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.**\n- Phân tích các mẫu số thành tích của hai số tự nhiên liên tiếp:\n  $110 = 10 \\times 11$;  $132 = 11 \\times 12$;  $156 = 12 \\times 13$; $\\dots$ ; $342 = 18 \\times 19$;  $380 = 19 \\times 20$.\n- Biểu thức được viết lại dưới dạng:\n  $A = \\frac{1}{10 \\times 11} + \\frac{1}{11 \\times 12} + \\frac{1}{12 \\times 13} + \\dots + \\frac{1}{18 \\times 19} + \\frac{1}{19 \\times 20}$\n- Áp dụng công thức sai phân: $\\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1}$:\n  $A = \\left(\\frac{1}{10} - \\frac{1}{11}\\right) + \\left(\\frac{1}{11} - \\frac{1}{12}\\right) + \\dots + \\left(\\frac{1}{18} - \\frac{1}{19}\\right) + \\left(\\frac{1}{19} - \\frac{1}{20}\\right)$\n- Triệt tiêu các cặp số đối nhau liên tiếp ở giữa, ta được:\n  $A = \\frac{1}{10} - \\frac{1}{20} = \\frac{2}{20} - \\frac{1}{20} = \\frac{1}{20}$.\n**Đáp số: $\\frac{1}{20}$.**"
      },
      {
        "id": 34,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $2\\frac{1}{400} \\times 169 + 5\\frac{1}{800} \\times 10 + 4\\frac{1}{200} \\times 113$.",
        "questionVi": "Tính giá trị của biểu thức: $2\\frac{1}{400} \\times 169 + 5\\frac{1}{800} \\times 10 + 4\\frac{1}{200} \\times 113$.",
        "image": null,
        "answer": "841",
        "acceptableAnswers": [
          "841"
        ],
        "unit": "",
        "hint": "Tách hỗn số thành phần nguyên và phân số, quy đồng mẫu số chung.",
        "solution": "**Phương pháp: Tách hỗn số thành phần nguyên và phân số, quy đồng mẫu số chung.**\n- Viết mỗi hỗn số dưới dạng tổng của phần nguyên và phân số:\n  $2\\frac{1}{400} = 2 + \\frac{1}{400}$\n  $5\\frac{1}{800} = 5 + \\frac{1}{800}$\n  $4\\frac{1}{200} = 4 + \\frac{1}{200}$\n- Khi đó biểu thức tách thành hai phần riêng biệt:\n  $\\text{Biểu thức} = (2 \\times 169 + 5 \\times 10 + 4 \\times 113) + \\left(\\frac{169}{400} + \\frac{10}{800} + \\frac{113}{200}\\right)$\n- Tính phần nguyên: $2 \\times 169 + 5 \\times 10 + 4 \\times 113 = 338 + 50 + 452 = 840$.\n- Tính phần phân số (chọn mẫu số chung là 800):\n  $\\frac{169}{400} + \\frac{10}{800} + \\frac{113}{200} = \\frac{169 \\times 2 + 10 + 113 \\times 4}{800}$\n  $= \\frac{338 + 10 + 452}{800} = \\frac{800}{800} = 1$.\n- Tổng giá trị của biểu thức là: $840 + 1 = 841$.\n**Đáp số: 841.**"
      },
      {
        "id": 35,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Using method $S = (3S - S) \\div 2$, find the value of $1 + 3 + 9 + 27 + \\dots + 59049$.",
        "questionVi": "Áp dụng phương pháp $S = (3S - S) \\div 2$, tính giá trị của biểu thức: $1 + 3 + 9 + 27 + \\dots + 59049$.",
        "image": null,
        "answer": "88573",
        "acceptableAnswers": [
          "88573"
        ],
        "unit": "",
        "hint": "Phương pháp nhân hệ số triệt tiêu dãy lũy thừa cơ số 3: $S = (3S - S) : 2$.",
        "solution": "**Phương pháp: Phương pháp nhân hệ số triệt tiêu dãy lũy thừa cơ số 3: $S = (3S - S) : 2$.**\n- Đặt $S = 1 + 3 + 9 + 27 + \\dots + 59049$.\n- Nhân cả hai vế của $S$ với 3:\n  $3S = 3 \\times (1 + 3 + 9 + 27 + \\dots + 59049)$\n  $3S = 3 + 9 + 27 + 81 + \\dots + 59049 + 177147$.\n- Lấy biểu thức $3S$ trừ đi $S$ theo từng vế:\n  $3S - S = (3 + 9 + 27 + \\dots + 177147) - (1 + 3 + 9 + 27 + \\dots + 59049)$\n  $2S = 177147 - 1 = 177146$.\n- Do đó: $S = (3S - S) : 2 = 177146 : 2 = 88573$.\n**Đáp số: 88573.**"
      },
      {
        "id": 36,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If a 9-digit number $\\overline{202015A2B}$ is divisible by $12$ and $A, B \\ne 0$, find the sum of all possible values for $\\overline{AB}$.",
        "questionVi": "Nếu số có 9 chữ số $\\overline{202015A2B}$ chia hết cho $12$ và $A, B \\ne 0$, hãy tìm tổng của tất cả các giá trị có thể có của số có hai chữ số $\\overline{AB}$.",
        "image": null,
        "answer": "306",
        "acceptableAnswers": [
          "306"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết đồng thời cho 3 và 4 (nguyên tố cùng nhau).",
        "solution": "**Phương pháp: Dấu hiệu chia hết đồng thời cho 3 và 4 (nguyên tố cùng nhau).**\n- Số 12 = 3 × 4 với ƯCLN(3, 4) = 1. Do đó, một số chia hết cho 12 khi và chỉ khi số đó đồng thời chia hết cho cả 3 và 4.\n- Điều kiện chia hết cho 4: Hai chữ số tận cùng 2B phải lập thành một số chia hết cho 4.\n  Vì B là chữ số và B ≠ 0 nên 2B ∈ {24, 28} => B ∈ {4, 8}.\n- Điều kiện chia hết cho 3: Tổng các chữ số phải chia hết cho 3.\n  Tổng các chữ số của 202015A2B là: 2 + 0 + 2 + 0 + 1 + 5 + A + 2 + B = 12 + A + B.\n  Vì 12 đã chia hết cho 3 nên (A + B) phải chia hết cho 3.\n  + Trường hợp 1: Nếu B = 4 => (A + 4) chia hết cho 3. Vì A là chữ số từ 1 đến 9 (A ≠ 0) nên A ∈ {2, 5, 8}.\n    Ta được 3 giá trị của AB là: 24, 54, 84.\n  + Trường hợp 2: Nếu B = 8 => (A + 8) chia hết cho 3. Vì A ∈ {1, 2, ..., 9} nên A ∈ {1, 4, 7}.\n    Ta được 3 giá trị của AB là: 18, 48, 78.\n- Tổng của tất cả các giá trị có thể có của AB là:\n  (24 + 54 + 84) + (18 + 48 + 78) = 162 + 144 = 306.\n**Đáp số: 306.**"
      },
      {
        "id": 37,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the last digit of $A$ if $A = 5 + 12 + 19 + 26 + \\dots + (5 + 7 \\times 99) + (5 + 7 \\times 100)$.",
        "questionVi": "Tìm chữ số tận cùng của $A$ biết rằng $A = 5 + 12 + 19 + 26 + \\dots + (5 + 7 \\times 99) + (5 + 7 \\times 100)$.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Tính tổng dãy số cách đều và xác định chữ số tận cùng.",
        "solution": "**Phương pháp: Tính tổng dãy số cách đều và xác định chữ số tận cùng.**\n- Biểu thức A gồm các số hạng có dạng u(k) = 5 + 7 × k với k chạy từ 0 đến 100.\n- Số các số hạng của tổng A là: (100 – 0) + 1 = 101 (số hạng).\n- Số hạng đầu tiên (k = 0): u(0) = 5 + 7 × 0 = 5.\n- Số hạng cuối cùng (k = 100): u(100) = 5 + 7 × 100 = 705.\n- Tổng của dãy số cách đều A là:\n  A = (Số đầu + Số cuối) × (Số số hạng) : 2\n  A = (5 + 705) × 101 : 2 = 710 × 101 : 2 = 355 × 101 = 35855.\n- Chữ số tận cùng của số 35855 là 5.\n**Đáp số: 5.**"
      },
      {
        "id": 38,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the number of all positive factors of $996$.",
        "questionVi": "Tìm số lượng tất cả các ước số nguyên dương của $996$.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Phân tích ra thừa số nguyên tố và công thức tính số lượng ước số.",
        "solution": "**Phương pháp: Phân tích ra thừa số nguyên tố và công thức tính số lượng ước số.**\n- Phân tích số 996 ra thừa số nguyên tố:\n  996 = 2 × 498 = 2 × 2 × 249 = 2² × 3 × 83.\n- Ta kiểm tra số 83: 83 không chia hết cho các số nguyên tố nhỏ hơn căn bậc hai của nó (2, 3, 5, 7) nên 83 là một số nguyên tố.\n- Dạng phân tích tiêu chuẩn: 996 = 2² × 3¹ × 83¹.\n- Số lượng các ước số nguyên dương của 996 được tính theo công thức:\n  (2 + 1) × (1 + 1) × (1 + 1) = 3 × 2 × 2 = 12 (ước số).\n**Đáp số: 12.**"
      },
      {
        "id": 39,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The remainder of dividing a positive integer $K$ by $17$ is $11$. What is the remainder of dividing $(6K + 16)$ by $17$?",
        "questionVi": "Số dư khi chia số nguyên dương $K$ cho $17$ là $11$. Hỏi số dư khi chia $(6K + 16)$ cho $17$ là bao nhiêu?",
        "image": null,
        "answer": "14",
        "acceptableAnswers": [
          "14"
        ],
        "unit": "",
        "hint": "Tính chất phép chia có dư (Đồng dư thức cơ bản).",
        "solution": "**Phương pháp: Tính chất phép chia có dư (Đồng dư thức cơ bản).**\n- Vì số nguyên dương K chia cho 17 có số dư là 11, nên ta có thể biểu diễn K dưới dạng:\n  K = 17 × m + 11 (với m là số tự nhiên, m ≥ 0).\n- Khi đó, biểu thức 6K + 16 được biến đổi thành:\n  6K + 16 = 6 × (17 × m + 11) + 16 = 6 × 17 × m + 6 × 11 + 16\n  = 17 × (6m) + 66 + 16 = 17 × (6m) + 82.\n- Vì 17 × (6m) chia hết cho 17, nên số dư khi chia (6K + 16) cho 17 chính là số dư khi chia 82 cho 17.\n- Thực hiện phép chia: 82 = 17 × 4 + 14 (với 14 < 17).\n- Vậy số dư cần tìm là 14.\n**Đáp số: 14.**"
      },
      {
        "id": 40,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of 25 consecutive numbers is $900$. Find the second largest number.",
        "questionVi": "Tổng của 25 số tự nhiên liên tiếp là $900$. Tìm số lớn thứ hai trong dãy số đó.",
        "image": null,
        "answer": "47",
        "acceptableAnswers": [
          "47"
        ],
        "unit": "",
        "hint": "Tính chất số trung bình cộng / số trung vị của dãy số cách đều có số lượng số hạng lẻ.",
        "solution": "**Phương pháp: Tính chất số trung bình cộng / số trung vị của dãy số cách đều có số lượng số hạng lẻ.**\n- Dãy số gồm 25 số tự nhiên liên tiếp có số lượng số hạng là 25 (một số lẻ).\n- Do đó, số đứng chính giữa dãy (số hạng thứ 13) bằng đúng trung bình cộng của cả 25 số:\n  Số thứ 13 = 900 : 25 = 36.\n- Vì dãy gồm các số tự nhiên liên tiếp (khoảng cách giữa hai số liên tiếp là 1):\n  Số lớn nhất của dãy (số hạng thứ 25) là: 36 + (25 – 13) × 1 = 36 + 12 = 48.\n- Số lớn thứ hai trong dãy (số hạng thứ 24) liền trước số lớn nhất là: 48 – 1 = 47.\n- (Kiểm tra lại: Dãy số từ 24 đến 48 gồm 25 số, tổng = (24 + 48) × 25 : 2 = 72 × 25 : 2 = 900, hoàn toàn chính xác).\n**Đáp số: 47.**"
      },
      {
        "id": 41,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) is / are there in the figure below?",
        "questionVi": "Có tất cả bao nhiêu hình chữ nhật trong hình dưới đây?",
        "image": "images/exam_de2/q16_grid.png",
        "answer": "102",
        "acceptableAnswers": [
          "102"
        ],
        "unit": "",
        "hint": "Phân rã hình học thành các khối tầng và tính tổ hợp hình chữ nhật nối ghép.",
        "solution": "**Phương pháp: Phân rã hình học thành các khối tầng và tính tổ hợp hình chữ nhật nối ghép.**\n- Lưới ô vuông trong hình gồm 6 hàng và 5 cột, chia thành 3 tầng rõ rệt:\n  + Tầng trên (hàng 1, 2; cột 3, 4, 5): là lưới chữ nhật kích thước 2 × 3 ô.\n    Số hình chữ nhật nằm hoàn toàn trong tầng trên là: (2 × 3 / 2) × (3 × 4 / 2) = 3 × 6 = 18 (hình).\n  + Tầng giữa (hàng 3, 4; cột 1, 2, 3, 4): là lưới chữ nhật kích thước 2 × 4 ô.\n    Số hình chữ nhật nằm hoàn toàn trong tầng giữa là: (2 × 3 / 2) × (4 × 5 / 2) = 3 × 10 = 30 (hình).\n  + Tầng dưới (hàng 5, 6; cột 3, 4, 5): là lưới chữ nhật kích thước 2 × 3 ô.\n    Số hình chữ nhật nằm hoàn toàn trong tầng dưới là: (2 × 3 / 2) × (3 × 4 / 2) = 3 × 6 = 18 (hình).\n- Các hình chữ nhật nối ghép giao thoa giữa các tầng:\n  Phần cột chung của cả 3 tầng là cột 3 và cột 4 (bề rộng gồm 2 cột, tạo ra: 2 × 3 / 2 = 3 cách chọn cặp đường biên dọc):\n  + Nối tầng trên và tầng giữa: Cạnh trên nằm ở tầng 1–2 (2 đường viền ngang), cạnh dưới nằm ở tầng 3–4 (2 đường viền ngang) => Có: 2 × 2 × 3 = 12 (hình).\n  + Nối tầng giữa và tầng dưới: Cạnh trên nằm ở tầng 3–4 (2 đường viền ngang), cạnh dưới nằm ở tầng 5–6 (2 đường viền ngang) => Có: 2 × 2 × 3 = 12 (hình).\n  + Nối cả 3 tầng (chạy từ tầng trên xuyên qua tầng giữa xuống tầng dưới): Cạnh trên nằm ở tầng 1–2 (2 cách), cạnh dưới nằm ở tầng 5–6 (2 cách) => Có: 2 × 2 × 3 = 12 (hình).\n- Tổng số hình chữ nhật trong hình là:\n  18 + 30 + 18 + 12 + 12 + 12 = 102 (hình).\n**Đáp số: 102.**"
      },
      {
        "id": 42,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Small cubes with side length $1$ are combined according to the pattern shown below. Find the total volume of the $30$th generation.",
        "questionVi": "Các khối lập phương nhỏ có cạnh bằng $1$ được ghép lại với nhau theo quy luật dưới đây. Tìm tổng thể tích của hình ở thế hệ thứ $30$.",
        "image": "images/exam_de2/q17_cubes.png",
        "answer": "90",
        "acceptableAnswers": [
          "90"
        ],
        "unit": "",
        "hint": "Quy luật dãy số tăng trưởng trong không gian 3 chiều.",
        "solution": "**Phương pháp: Quy luật dãy số tăng trưởng trong không gian 3 chiều.**\n- Quan sát cấu trúc khối lập phương phát triển từ giao điểm chung theo 3 trục tọa độ vuông góc (hướng lên trên, hướng sang phải, và hướng ra phía trước):\n  + Thế hệ thứ 1 (1st generation): Mỗi nhánh có đúng 1 khối lập phương => Tổng số khối là: 1 + 1 + 1 = 3 (khối).\n  + Thế hệ thứ 2 (2nd generation): Mỗi nhánh kéo dài thành 2 khối lập phương => Tổng số khối là: 2 + 2 + 2 = 6 (khối).\n  + Thế hệ thứ 3 (3rd generation): Mỗi nhánh kéo dài thành 3 khối lập phương => Tổng số khối là: 3 + 3 + 3 = 9 (khối).\n- Quy luật tổng quát: Ở thế hệ thứ n, mỗi nhánh có n khối lập phương, do đó tổng số khối lập phương là: 3 × n (khối).\n- Ở thế hệ thứ 30 (30th generation), số khối lập phương là: 3 × 30 = 90 (khối).\n- Vì mỗi khối lập phương nhỏ có cạnh bằng 1 nên thể tích của mỗi khối là: 1 × 1 × 1 = 1.\n- Vậy tổng thể tích của hình ở thế hệ thứ 30 là: 90 × 1 = 90.\n**Đáp số: 90.**"
      },
      {
        "id": 43,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is a square overlapped by two right-angled triangles and one quarter circle. Find the area of the shaded region. (Take $\\pi = \\frac{22}{7}$).",
        "questionVi": "Hình dưới đây là một hình vuông được chồng lên bởi hai tam giác vuông và một phần tư hình tròn. Tính diện tích của phần tô màu. (Lấy $\\pi = \\frac{22}{7}$).",
        "image": "images/exam_de2/q18_geometry.png",
        "answer": "59.5",
        "acceptableAnswers": [
          "59.5"
        ],
        "unit": "",
        "hint": "Phương pháp diện tích bù (Diện tích hình vuông trừ đi diện tích các phần không tô màu).",
        "solution": "**Phương pháp: Phương pháp diện tích bù (Diện tích hình vuông trừ đi diện tích các phần không tô màu).**\n- Hình vuông lớn có cạnh bằng 14, diện tích là: S(vuông) = 14 × 14 = 196.\n- Phần màu trắng (không tô màu) nằm trong hình vuông gồm 3 hình riêng biệt không chồng lấn lên nhau:\n  1. Tam giác vuông thứ nhất (bên trái): Có hai cạnh góc vuông lần lượt là chiều cao bằng cạnh hình vuông (14) và đáy ở cạnh dưới hình vuông bằng: 14 – 7 = 7.\n     Diện tích tam giác vuông thứ nhất: S1 = (7 × 14) : 2 = 49.\n  2. Tam giác vuông thứ hai (phía trên bên phải): Có một cạnh góc vuông là cạnh trên của hình vuông (14) và một cạnh góc vuông ở cạnh bên phải có độ dài: 14 – 7 = 7.\n     Diện tích tam giác vuông thứ hai: S2 = (14 × 7) : 2 = 49.\n  3. Một phần tư hình tròn (ở góc dưới bên phải): Có tâm đặt tại đỉnh góc dưới bên phải của hình vuông và bán kính $R = 7$.\n     Diện tích một phần tư hình tròn (với $\\pi = \\frac{22}{7}$) là:\n     $S_3 = \\frac{1}{4} \\times \\pi \\times R^2 = \\frac{1}{4} \\times \\frac{22}{7} \\times 7 \\times 7 = \\frac{22 \\times 7}{4} = \\frac{154}{4} = 38.5$.\n- Tổng diện tích của các phần không tô màu là: S(trắng) = S1 + S2 + S3 = 49 + 49 + 38.5 = 136.5.\n- Diện tích của phần tô màu cần tìm là: S(tô màu) = S(vuông) – S(trắng) = 196 – 136.5 = 59.5.\n**Đáp số: 59.5.**"
      },
      {
        "id": 44,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangle(s) with both 2 “*” is / are there in the figure below?",
        "questionVi": "Có tất cả bao nhiêu hình chữ nhật chứa đồng thời cả hai dấu “*” trong hình dưới đây?",
        "image": "images/exam_de2/q19_grid.png",
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Quy tắc nhân chọn đường biên bao chứa các ô đặc biệt trong lưới tọa độ.",
        "solution": "**Phương pháp: Quy tắc nhân chọn đường biên bao chứa các ô đặc biệt trong lưới tọa độ.**\n- Lưới ô vuông gồm 5 hàng (đánh số từ 1 đến 5 từ trên xuống dưới) và 6 cột (đánh số từ 1 đến 6 từ trái sang phải).\n- Hai ô chứa dấu sao “*” lần lượt nằm tại vị trí:\n  + Dấu sao thứ nhất ở ô (hàng 3, cột 2).\n  + Dấu sao thứ hai ở ô (hàng 4, cột 4).\n- Để một hình chữ nhật bao trùm đồng thời cả hai dấu sao “*”, hình chữ nhật đó phải thỏa mãn đồng thời hai điều kiện về biên hàng và biên cột:\n  1. Về biên hàng: Hình chữ nhật phải chứa từ hàng 3 đến hàng 4.\n     - Biên ngang phía trên có thể chọn nằm ở phía trên của các hàng: 1, 2 hoặc 3 => Có 3 cách chọn.\n     - Biên ngang phía dưới có thể chọn nằm ở phía dưới của các hàng: 4 hoặc 5 => Có 2 cách chọn.\n     => Số cách chọn cặp biên hàng là: 3 × 2 = 6 cách.\n  2. Về biên cột: Hình chữ nhật phải chứa từ cột 2 đến cột 4.\n     - Biên dọc bên trái có thể chọn nằm ở bên trái của các cột: 1 hoặc 2 => Có 2 cách chọn.\n     - Biên dọc bên phải có thể chọn nằm ở bên phải của các cột: 4, 5 hoặc 6 => Có 3 cách chọn.\n     => Số cách chọn cặp biên cột là: 2 × 3 = 6 cách.\n- Theo quy tắc nhân, tổng số hình chữ nhật thỏa mãn chứa cả hai dấu “*” là: 6 × 6 = 36 (hình).\n**Đáp số: 36.**"
      },
      {
        "id": 45,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The perimeter of a circle is $18.84$. If the diameter of the circle is the same as the diagonal of a square, what is the area of the square? (Take $\\pi = 3.14$).",
        "questionVi": "Chu vi của một hình tròn là $18.84$. Biết đường kính của hình tròn bằng độ dài đường chéo của một hình vuông, tính diện tích của hình vuông đó? (Lấy $\\pi = 3.14$).",
        "image": null,
        "answer": "18",
        "acceptableAnswers": [
          "18"
        ],
        "unit": "",
        "hint": "Tính bán kính / đường kính hình tròn và tính diện tích hình vuông thông qua hai đường chéo vuông góc.",
        "solution": "**Phương pháp: Tính bán kính / đường kính hình tròn và tính diện tích hình vuông thông qua hai đường chéo vuông góc.**\n- Công thức tính chu vi hình tròn: C = π × d (trong đó d là đường kính hình tròn, π = 3.14).\n- Độ dài đường kính của hình tròn là: d = C : π = 18.84 : 3.14 = 6.\n- Theo đề bài, đường kính hình tròn bằng độ dài đường chéo của hình vuông, nên độ dài mỗi đường chéo hình vuông là D = 6.\n- Hình vuông là một hình thoi đặc biệt có hai đường chéo bằng nhau và vuông góc với nhau.\n- Diện tích của hình vuông được tính theo công thức diện tích hình thoi:\n  S = (Đường chéo 1 × Đường chéo 2) : 2 = (D × D) : 2\n  S = (6 × 6) : 2 = 36 : 2 = 18.\n**Đáp số: 18.**"
      },
      {
        "id": 46,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 3 digits, without repetition, from $1, 2, 3, 6, 7, 8$ to construct 3-digit numbers. Of these 3-digit numbers, how many numbers are divisible by $4$?",
        "questionVi": "Chọn 3 chữ số khác nhau từ các chữ số $1, 2, 3, 6, 7, 8$ để lập thành các số có 3 chữ số. Trong các số được lập, có bao nhiêu số chia hết cho $4$?",
        "image": null,
        "answer": "32",
        "acceptableAnswers": [
          "32"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết cho 4 kết hợp quy tắc nhân chọn chữ số hàng trăm.",
        "solution": "**Phương pháp: Dấu hiệu chia hết cho 4 kết hợp quy tắc nhân chọn chữ số hàng trăm.**\n- Một số tự nhiên chia hết cho 4 khi và chỉ khi hai chữ số tận cùng của nó tạo thành một số chia hết cho 4.\n- Các chữ số cho trước gồm 6 chữ số khác nhau: {1, 2, 3, 6, 7, 8} (không chứa chữ số 0).\n- Ta tìm tất cả các cặp hai chữ số khác nhau (b, c) lấy từ tập hợp trên sao cho số hai chữ số bc chia hết cho 4:\n  + Bắt đầu bằng 1: 12, 16 (2 cặp).\n  + Bắt đầu bằng 2: 28 (1 cặp).\n  + Bắt đầu bằng 3: 32, 36 (2 cặp).\n  + Bắt đầu bằng 6: 68 (1 cặp).\n  + Bắt đầu bằng 7: 72, 76 (2 cặp).\n  + Bắt đầu bằng 8: Không có số nào thỏa mãn.\n  => Có tất cả: 2 + 1 + 2 + 1 + 2 = 8 cặp tận cùng thỏa mãn chia hết cho 4.\n- Với mỗi cặp tận cùng đã chọn gồm 2 chữ số, chữ số hàng trăm (a) được chọn từ các chữ số còn lại trong tập hợp.\n  Tập ban đầu có 6 chữ số phân biệt, đã dùng 2 chữ số làm hàng chục và hàng đơn vị, nên còn lại: 6 – 2 = 4 cách chọn cho chữ số hàng trăm (vì tập hợp không có chữ số 0 nên chữ số nào còn lại cũng đứng được ở hàng trăm).\n- Theo quy tắc nhân, tổng số các số có 3 chữ số thỏa mãn là: 8 × 4 = 32 (số).\n**Đáp số: 32.**"
      },
      {
        "id": 47,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 11 steps. Peter can go up for 1 step or 3 steps each time. The 6th step cannot be stepped on as it is destroyed. How many way(s) is / are there for Peter to go up the stairs?",
        "questionVi": "Một cầu thang có 11 bậc. Peter có thể bước lên 1 bậc hoặc 3 bậc mỗi lần. Bậc thứ 6 bị hỏng nên không thể bước vào. Hỏi Peter có bao nhiêu cách để đi lên đến bậc thứ 11 của cầu thang?",
        "image": null,
        "answer": "17",
        "acceptableAnswers": [
          "17"
        ],
        "unit": "",
        "hint": "Quy tắc cộng / Dãy số Fibonacci có điều kiện biên cấm (Bậc 6 hỏng).",
        "solution": "**Phương pháp: Quy tắc cộng / Dãy số Fibonacci có điều kiện biên cấm (Bậc 6 hỏng).**\n- Gọi W(n) là số cách để Peter bước lên đến bậc thứ n của cầu thang.\n- Xuất phát từ mặt đất (bậc 0): W(0) = 1 cách (đứng yên ban đầu).\n- Vì mỗi lần Peter chỉ có thể bước 1 bậc hoặc 3 bậc, nên để đến được bậc n, bước chân cuối cùng của Peter phải xuất phát từ bậc (n – 1) hoặc bậc (n – 3):\n  W(n) = W(n – 1) + W(n – 3) (với n ≥ 3).\n- Đặc biệt, vì bậc thứ 6 bị hỏng nên Peter không thể đặt chân vào bậc 6 => W(6) = 0.\n- Tính lần lượt từng bậc:\n  + Bậc 1: W(1) = W(0) = 1 (bước 1 bậc).\n  + Bậc 2: W(2) = W(1) = 1 (bước 1+1 bậc).\n  + Bậc 3: W(3) = W(2) + W(0) = 1 + 1 = 2.\n  + Bậc 4: W(4) = W(3) + W(1) = 2 + 1 = 3.\n  + Bậc 5: W(5) = W(4) + W(2) = 3 + 1 = 4.\n  + Bậc 6: W(6) = 0 (bậc hỏng, cấm bước vào).\n  + Bậc 7: W(7) = W(6) + W(4) = 0 + 3 = 3.\n  + Bậc 8: W(8) = W(7) + W(5) = 3 + 4 = 7.\n  + Bậc 9: W(9) = W(8) + W(6) = 7 + 0 = 7.\n  + Bậc 10: W(10) = W(9) + W(7) = 7 + 3 = 10.\n  + Bậc 11: W(11) = W(10) + W(8) = 10 + 7 = 17.\n- Vậy Peter có tất cả 17 cách để bước lên bậc thứ 11.\n**Đáp số: 17.**"
      },
      {
        "id": 48,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Find nearest time when the hour hand and the minute hand are perpendicular to each other between 6pm and 7pm?",
        "questionVi": "Tìm thời điểm gần nhất mà kim giờ và kim phút vuông góc với nhau trong khoảng thời gian từ 6 giờ tối đến 7 giờ tối?",
        "image": null,
        "answer": "$6:16\\frac{4}{11}$",
        "acceptableAnswers": [
          "6:16\\frac{4}{11}",
          "4/11",
          "4 / 11",
          "0.3636",
          "6:164/11"
        ],
        "unit": "",
        "hint": "Bài toán chuyển động kim đồng hồ (Vận tốc tương đối giữa kim phút và kim giờ).",
        "solution": "**Phương pháp: Bài toán chuyển động kim đồng hồ (Vận tốc tương đối giữa kim phút và kim giờ).**\n- Mặt đồng hồ hình tròn được chia thành 60 khoảng phút (tương ứng với $360^\\circ$).\n- Vận tốc của kim phút: 60 khoảng : 60 phút = 1 khoảng phút/phút.\n- Vận tốc của kim giờ: 5 khoảng : 60 phút = $\\frac{1}{12}$ khoảng phút/phút.\n- Hiệu vận tốc giữa kim phút và kim giờ là: $1 - \\frac{1}{12} = \\frac{11}{12}$ (khoảng phút/phút).\n- Lúc 6 giờ đúng, kim phút chỉ số 12, kim giờ chỉ số 6; khoảng cách giữa hai kim là 30 khoảng phút (góc $180^\\circ$).\n- Để hai kim vuông góc với nhau lần đầu tiên sau 6 giờ, khoảng cách giữa kim phút và kim giờ phải rút ngắn lại còn đúng 15 khoảng phút (tương ứng với góc vuông $90^\\circ$).\n- Do đó, quãng đường mà kim phút cần chạy đuổi kịp rút ngắn so với kim giờ là:\n  $30 - 15 = 15$ (khoảng phút).\n- Thời gian để kim phút rút ngắn được khoảng cách đó là:\n  $15 : \\frac{11}{12} = 15 \\times \\frac{12}{11} = \\frac{180}{11} = 16\\frac{4}{11}$ (phút).\n- Vậy thời điểm gần nhất hai kim vuông góc với nhau là: 6 giờ $16\\frac{4}{11}$ phút (viết dưới dạng $6:16\\frac{4}{11}$).\n**Đáp số: $6:16\\frac{4}{11}$.**"
      },
      {
        "id": 49,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "In how many possible way(s) can 10 identical balls be distributed to 3 distinct boxes so that every box contains at least one ball?",
        "questionVi": "Có bao nhiêu cách chia 10 quả bóng giống hệt nhau vào 3 chiếc hộp phân biệt sao cho mỗi hộp đều có ít nhất một quả bóng?",
        "image": null,
        "answer": "36",
        "acceptableAnswers": [
          "36"
        ],
        "unit": "",
        "hint": "Bài toán chia kẹo của Euler (Stars and Bars) / Phân tích số thành tổng của 3 số nguyên dương.",
        "solution": "**Phương pháp: Bài toán chia kẹo của Euler (Stars and Bars) / Phân tích số thành tổng của 3 số nguyên dương.**\n- Bài toán tương đương với: Tìm số bộ 3 số nguyên dương (a, b, c) thỏa mãn a + b + c = 10 với a, b, c ≥ 1.\n- Ta biểu diễn 10 quả bóng giống hệt nhau xếp thành một hàng ngang. Giữa 10 quả bóng liên tiếp có đúng: 10 – 1 = 9 (khoảng trống).\n- Để chia 10 quả bóng này thành 3 phần (mỗi phần tương ứng cho một chiếc hộp và có ít nhất 1 quả bóng), ta chỉ cần chọn đặt 2 vách ngăn vào 2 trong số 9 khoảng trống nói trên.\n- Số cách chọn 2 khoảng trống từ 9 khoảng trống là tổ hợp chập 2 của 9:\n  C(9, 2) = (9 × 8) : 2 = 36 (cách).\n- Vậy có tất cả 36 cách chia bóng vào 3 hộp.\n**Đáp số: 36.**"
      },
      {
        "id": 50,
        "examId": "heat_2019_2020_de2",
        "examIndex": 1,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "6 identical black books and 8 identical white books are arranged from left to right. How many different permutation(s) is / are there?",
        "questionVi": "Có 6 cuốn sách màu đen giống hệt nhau và 8 cuốn sách màu trắng giống hệt nhau được xếp thành một hàng từ trái sang phải. Hỏi có tất cả bao nhiêu cách sắp xếp khác nhau?",
        "image": null,
        "answer": "3003",
        "acceptableAnswers": [
          "3003"
        ],
        "unit": "",
        "hint": "Quy tắc chọn vị trí (Tổ hợp chập k của n phần tử).",
        "solution": "**Phương pháp: Quy tắc chọn vị trí (Tổ hợp chập k của n phần tử).**\n- Tổng số cuốn sách cần sắp xếp là: 6 + 8 = 14 (cuốn sách), tương ứng với 14 vị trí liên tiếp từ trái sang phải trên giá sách.\n- Vì 6 cuốn sách màu đen giống hệt nhau và 8 cuốn sách màu trắng giống hệt nhau, nên mỗi cách sắp xếp hoàn toàn được xác định bằng việc chọn ra 6 vị trí bất kỳ trong số 14 vị trí để đặt các cuốn sách đen (8 vị trí còn lại tự động thuộc về 8 cuốn sách trắng).\n- Số cách chọn 6 vị trí từ 14 vị trí là tổ hợp chập 6 của 14 phần tử:\n  C(14, 6) = (14 × 13 × 12 × 11 × 10 × 9) : (6 × 5 × 4 × 3 × 2 × 1)\n  = (14 × 13 × 12 × 11 × 10 × 9) : 720\n  = (14 × 13 × 11 × 10 × 9) : 60\n  = (14 × 13 × 11 × 9) : 6 = (14 × 13 × 11 × 3) : 2 = 7 × 13 × 11 × 3\n  = 91 × 33 = 3003 (cách).\n- Vậy có tất cả 3003 cách sắp xếp khác nhau.\n**Đáp số: 3003.**"
      }
    ]
  },
  {
    "id": "heat_2018_2019_de3",
    "title": "Đề số 3: VCK Quốc gia (2018 – 2019)",
    "titleEn": "Paper 3: National Final Heat Round (2018 – 2019)",
    "year": "2018 – 2019",
    "grade": "Khối 6 / Grade 6",
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
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are some chickens and rabbits in a cage. The number of chickens is four times as the number of rabbits. They have 144 legs in total. How many chicken(s) is / are there?",
        "questionVi": "Trong lồng có một số con gà và thỏ. Số con gà gấp 4 lần số con thỏ. Tổng số chân của chúng là 144 chân. Hỏi có tất cả bao nhiêu con gà?",
        "image": null,
        "answer": "48",
        "acceptableAnswers": [
          "48"
        ],
        "unit": "",
        "hint": "Phương pháp chia nhóm / Giả thiết tạm (Bài toán Gà - Thỏ).",
        "solution": "**Phương pháp: Phương pháp chia nhóm / Giả thiết tạm (Bài toán Gà - Thỏ).**\n- Theo bài ra, số gà gấp 4 lần số thỏ: Số gà = 4 × Số thỏ.\n- Mỗi con gà có 2 chân, mỗi con thỏ có 4 chân.\n- Ta nhóm 1 con thỏ và 4 con gà vào một nhóm. Khi đó:\n  Số chân của mỗi nhóm là: 1 × 4 + 4 × 2 = 4 + 8 = 12 (chân).\n- Tổng số chân của cả đàn trong lồng là 144 chân, do đó số nhóm là:\n  144 : 12 = 12 (nhóm).\n- Vì mỗi nhóm có 4 con gà, nên tổng số con gà trong lồng là:\n  12 × 4 = 48 (con gà).\n- (Kiểm tra lại: Có 12 con thỏ và 48 con gà. Tổng số chân: 12 × 4 + 48 × 2 = 48 + 96 = 144 chân, hoàn toàn chính xác).\n**Đáp số: 48.**"
      },
      {
        "id": 52,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "It requires 24 minutes to cut a piece of wood into 5 sections. If the time required to cut into each section is the same, how many minute(s) is / are required to cut 3 pieces of wood each into 29 sections? (Cannot cut 2 pieces of woods at the same time).",
        "questionVi": "Cần 24 phút để cưa một khúc gỗ thành 5 đoạn. Nếu thời gian thực hiện mỗi nhát cưa là như nhau, hỏi cần bao nhiêu phút để cưa 3 khúc gỗ, mỗi khúc thành 29 đoạn? (Biết rằng không thể cưa 2 khúc gỗ cùng một lúc).",
        "image": null,
        "answer": "504",
        "acceptableAnswers": [
          "504"
        ],
        "unit": "",
        "hint": "Bài toán cưa gỗ / Trồng cây cắt đoạn thẳng.",
        "solution": "**Phương pháp: Bài toán cưa gỗ / Trồng cây cắt đoạn thẳng.**\n- Để cưa một khúc gỗ thành 5 đoạn, người thợ cần thực hiện số nhát cưa là:\n  5 – 1 = 4 (nhát cưa).\n- Thời gian để thực hiện 1 nhát cưa là:\n  24 : 4 = 6 (phút).\n- Để cưa 1 khúc gỗ thành 29 đoạn, số nhát cưa cần thực hiện là:\n  29 – 1 = 28 (nhát cưa).\n- Để cưa 3 khúc gỗ như vậy (không cưa cùng lúc), tổng số nhát cưa phải thực hiện là:\n  28 × 3 = 84 (nhát cưa).\n- Tổng thời gian cần thiết là:\n  84 × 6 = 504 (phút).\n**Đáp số: 504.**"
      },
      {
        "id": 53,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Find the average of the following 8 numbers: 2015, 2026, 2006, 2005, 2018, 1989, 2046, 2039.",
        "questionVi": "Tìm trung bình cộng của 8 số sau: 2015, 2026, 2006, 2005, 2018, 1989, 2046, 2039.",
        "image": null,
        "answer": "2018",
        "acceptableAnswers": [
          "2018"
        ],
        "unit": "",
        "hint": "Phương pháp tính trung bình cộng (Chọn mốc quy chiếu 2000).",
        "solution": "**Phương pháp: Phương pháp tính trung bình cộng (Chọn mốc quy chiếu 2000).**\n- Để tính nhanh trung bình cộng của 8 số đã cho, ta chọn mốc 2000 và tính độ lệch của từng số so với 2000:\n  + 2015 – 2000 = +15\n  + 2026 – 2000 = +26\n  + 2006 – 2000 = +6\n  + 2005 – 2000 = +5\n  + 2018 – 2000 = +18\n  + 1989 – 2000 = –11\n  + 2046 – 2000 = +46\n  + 2039 – 2000 = +39\n- Tổng các độ lệch là:\n  15 + 26 + 6 + 5 + 18 – 11 + 46 + 39 = 144.\n- Trung bình cộng các độ lệch là: 144 : 8 = 18.\n- Vậy trung bình cộng của 8 số trên là:\n  2000 + 18 = 2018.\n- (Cách tính truyền thống: Tổng 8 số = 16144; 16144 : 8 = 2018).\n**Đáp số: 2018.**"
      },
      {
        "id": 54,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Andy’s mother’s age this year minuses 29, multiples 8, adds 4 and is divided by 7. The result will be 12 years old. How old is Andy’s mother this year?",
        "questionVi": "Tuổi của mẹ Andy năm nay đem trừ đi 29, rồi nhân với 8, cộng thêm 4 và chia cho 7 thì được kết quả là 12 tuổi. Hỏi năm nay mẹ Andy bao nhiêu tuổi?",
        "image": null,
        "answer": "39",
        "acceptableAnswers": [
          "39"
        ],
        "unit": "",
        "hint": "Tính ngược từ cuối (Working backwards).",
        "solution": "**Phương pháp: Tính ngược từ cuối (Working backwards).**\n- Ta tóm tắt các phép biến đổi xuôi theo đề bài:\n  Tuổi mẹ ➔ Trừ 29 ➔ Nhân 8 ➔ Cộng 4 ➔ Chia 7 = 12 tuổi.\n- Thực hiện các phép tính ngược từ cuối với các phép tính đối lập:\n  + Trước khi chia cho 7, giá trị là: 12 × 7 = 84.\n  + Trước khi cộng thêm 4, giá trị là: 84 – 4 = 80.\n  + Trước khi nhân với 8, giá trị là: 80 : 8 = 10.\n  + Trước khi trừ đi 29 (tuổi ban đầu của mẹ Andy) là: 10 + 29 = 39 (tuổi).\n- (Thử lại: (39 – 29) × 8 + 4 = 10 × 8 + 4 = 84; 84 : 7 = 12 tuổi, hoàn toàn chính xác).\n**Đáp số: 39.**"
      },
      {
        "id": 55,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are 4 pieces of white chopsticks, 5 pieces of yellow chopsticks and 6 pieces of blue chopsticks mixed together. If you want to get 2 pairs of chopsticks with the same colour in the dark, at least how many pieces of chopsticks should be taken?",
        "questionVi": "Có 4 chiếc đũa trắng, 5 chiếc đũa vàng và 6 chiếc đũa xanh để lẫn lộn với nhau. Nếu bạn muốn lấy ra được 2 đôi đũa cùng màu trong bóng tối, hỏi cần lấy ra ngẫu nhiên ít nhất bao nhiêu chiếc đũa?",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet / Phân tích trường hợp xấu nhất (Worst-case scenario).",
        "solution": "**Phương pháp: Nguyên lý Dirichlet / Phân tích trường hợp xấu nhất (Worst-case scenario).**\n- Đề bài yêu cầu lấy ngẫu nhiên trong bóng tối để chắc chắn có được 2 đôi đũa cùng màu. Một đôi đũa gồm 2 chiếc, vậy 2 đôi đũa cùng màu tương đương với 4 chiếc đũa có cùng một màu.\n- Ta có 3 loại đũa: 4 chiếc trắng, 5 chiếc vàng và 6 chiếc xanh.\n- Để số đũa lấy ra là nhiều nhất mà vẫn CHƯA có được 4 chiếc cùng một màu (trường hợp xấu nhất không thỏa mãn), ta đã lấy tối đa ở mỗi màu chỉ 3 chiếc:\n  + Lấy 3 chiếc đũa trắng.\n  + Lấy 3 chiếc đũa vàng.\n  + Lấy 3 chiếc đũa xanh.\n  Tổng số chiếc đũa đã lấy ra là: 3 + 3 + 3 = 9 (chiếc).\n- Lúc này, ta chưa có màu nào đủ 4 chiếc (mới chỉ có 3 chiếc mỗi loại). Khi ta lấy thêm đúng 1 chiếc đũa nữa (chiếc thứ 10), vì chỉ có 3 màu nên chiếc thứ 10 này bắt buộc phải là màu trắng, màu vàng hoặc màu xanh. Khi đó, nó sẽ kết hợp với 3 chiếc cùng màu đã có trước đó để tạo thành đúng 4 chiếc cùng màu (đủ 2 đôi cùng màu).\n- Vậy số đũa cần lấy ra ít nhất để chắc chắn thỏa mãn yêu cầu là:\n  9 + 1 = 10 (chiếc đũa).\n**Đáp số: 10.**"
      },
      {
        "id": 56,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 + 5 + 25 + \\dots + 3125 + 15625 + 78125$.",
        "questionVi": "Tính giá trị của biểu thức: $1 + 5 + 25 + \\dots + 3125 + 15625 + 78125$.",
        "image": null,
        "answer": "97656",
        "acceptableAnswers": [
          "97656"
        ],
        "unit": "",
        "hint": "Phương pháp sai phân tổng lũy thừa (Nhân cả hai vế với công bội q = 5).",
        "solution": "**Phương pháp: Phương pháp sai phân tổng lũy thừa (Nhân cả hai vế với công bội q = 5).**\n- Đặt biểu thức cần tính là: S = 1 + 5 + 25 + ... + 3125 + 15625 + 78125.\n- Nhận thấy mỗi số hạng đứng sau gấp 5 lần số hạng đứng ngay trước nó. Nhân cả hai vế với 5, ta được:\n  5 × S = 5 + 25 + 125 + ... + 15625 + 78125 + 5 × 78125\n  5 × S = 5 + 25 + 125 + ... + 78125 + 390625.\n- Lấy biểu thức (5 × S) trừ đi biểu thức S theo từng vế:\n  5 × S – S = (5 + 25 + ... + 78125 + 390625) – (1 + 5 + 25 + ... + 78125)\n  4 × S = 390625 – 1 = 390624.\n- Suy ra: S = 390624 : 4 = 97656.\n**Đáp số: 97656.**"
      },
      {
        "id": 57,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{1011 \\times 1012} + \\frac{1}{1012 \\times 1013} + \\frac{1}{1013 \\times 1014}$.",
        "questionVi": "Tính giá trị của biểu thức: $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{1011 \\times 1012} + \\frac{1}{1012 \\times 1013} + \\frac{1}{1013 \\times 1014}$.",
        "image": null,
        "answer": "$\\frac{1013}{1014}$",
        "acceptableAnswers": [
          "\\frac{1013}{1014}",
          "1013/1014",
          "1013 / 1014",
          "0.999"
        ],
        "unit": "",
        "hint": "Phương pháp sai phân triệt tiêu (Telescoping Series).",
        "solution": "**Phương pháp: Phương pháp sai phân triệt tiêu (Telescoping Series).**\n- Áp dụng công thức tách phân số cơ bản:\n  $\\frac{1}{n(n+1)} = \\frac{(n+1) - n}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.\n- Thay thế từng số hạng trong biểu thức:\n  $\\frac{1}{1 \\times 2} = 1 - \\frac{1}{2}$\n  $\\frac{1}{2 \\times 3} = \\frac{1}{2} - \\frac{1}{3}$\n  $\\frac{1}{3 \\times 4} = \\frac{1}{3} - \\frac{1}{4}$\n  $\\dots$\n  $\\frac{1}{1013 \\times 1014} = \\frac{1}{1013} - \\frac{1}{1014}$.\n- Cộng tất cả các số hạng lại với nhau, các số hạng đối nhau ở giữa sẽ triệt tiêu hoàn toàn:\n  $\\text{Biểu thức} = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\left(\\frac{1}{3} - \\frac{1}{4}\\right) + \\dots + \\left(\\frac{1}{1013} - \\frac{1}{1014}\\right)$\n  $= 1 - \\frac{1}{1014} = \\frac{1013}{1014}$.\n**Đáp số: $\\frac{1013}{1014}$.**"
      },
      {
        "id": 58,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1234 \\times 4567 - 1233 \\times 4568$.",
        "questionVi": "Tính giá trị của biểu thức: $1234 \\times 4567 - 1233 \\times 4568$.",
        "image": null,
        "answer": "3334",
        "acceptableAnswers": [
          "3334"
        ],
        "unit": "",
        "hint": "Kỹ thuật tách số đưa về nhân tử chung (Tính nhanh số học).",
        "solution": "**Phương pháp: Kỹ thuật tách số đưa về nhân tử chung (Tính nhanh số học).**\n- Xét biểu thức: A = 1234 × 4567 – 1233 × 4568.\n- Ta phân tích các thừa số để xuất hiện tích chung (1233 × 4567):\n  + 1234 × 4567 = (1233 + 1) × 4567 = 1233 × 4567 + 4567.\n  + 1233 × 4568 = 1233 × (4567 + 1) = 1233 × 4567 + 1233.\n- Thay vào biểu thức ban đầu:\n  A = (1233 × 4567 + 4567) – (1233 × 4567 + 1233)\n  A = 1233 × 4567 + 4567 – 1233 × 4567 – 1233\n  A = 4567 – 1233 = 3334.\n**Đáp số: 3334.**"
      },
      {
        "id": 59,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 - 4 + 7 - 10 + 13 - 16 + 19 - \\dots - 1198 + 1201 - 1204 + 1207 - 1210 + 1213$.",
        "questionVi": "Tính giá trị của biểu thức: $1 - 4 + 7 - 10 + 13 - 16 + 19 - \\dots - 1198 + 1201 - 1204 + 1207 - 1210 + 1213$.",
        "image": null,
        "answer": "607",
        "acceptableAnswers": [
          "607"
        ],
        "unit": "",
        "hint": "Phương pháp ghép cặp số cách đều có dấu đan xen.",
        "solution": "**Phương pháp: Phương pháp ghép cặp số cách đều có dấu đan xen.**\n- Xét dãy các số hạng: 1, 4, 7, 10, 13, ..., 1210, 1213.\n- Đây là dãy số cách đều có khoảng cách giữa hai số liên tiếp là d = 3.\n- Số lượng các số hạng của dãy là:\n  (1213 – 1) : 3 + 1 = 1212 : 3 + 1 = 404 + 1 = 405 (số hạng).\n- Vì tổng số có 405 số hạng (số lẻ), ta giữ nguyên số hạng đầu tiên là 1, và nhóm 404 số hạng còn lại thành các cặp 2 số liên tiếp:\n  Biểu thức = 1 + (–4 + 7) + (–10 + 13) + (–16 + 19) + ... + (–1210 + 1213)\n  = 1 + (7 – 4) + (13 – 10) + (19 – 16) + ... + (1213 – 1210).\n- Số lượng cặp được tạo thành là: 404 : 2 = 202 (cặp).\n- Giá trị của mỗi cặp luôn bằng: 3.\n- Tổng giá trị của toàn bộ biểu thức là:\n  1 + 202 × 3 = 1 + 606 = 607.\n**Đáp số: 607.**"
      },
      {
        "id": 60,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $10\\frac{1}{4} \\times 17 + 20\\frac{1}{2} \\times 19 + 30\\frac{3}{4} \\times 15$.",
        "questionVi": "Tính giá trị của biểu thức: $10\\frac{1}{4} \\times 17 + 20\\frac{1}{2} \\times 19 + 30\\frac{3}{4} \\times 15$.",
        "image": null,
        "answer": "1025",
        "acceptableAnswers": [
          "1025"
        ],
        "unit": "",
        "hint": "Đặt thừa số chung bằng cách nhận diện tỉ lệ giữa các hỗn số.",
        "solution": "**Phương pháp: Đặt thừa số chung bằng cách nhận diện tỉ lệ giữa các hỗn số.**\n- Ta đổi và phân tích các hỗn số xuất hiện trong đề bài:\n  + $10\\frac{1}{4} = \\frac{41}{4} = 10.25$.\n  + $20\\frac{1}{2} = \\frac{41}{2} = 2 \\times \\frac{41}{4} = 2 \\times 10\\frac{1}{4}$.\n  + $30\\frac{3}{4} = \\frac{123}{4} = 3 \\times \\frac{41}{4} = 3 \\times 10\\frac{1}{4}$.\n- Thay vào biểu thức ban đầu, ta được:\n  $\\text{Biểu thức} = 10\\frac{1}{4} \\times 17 + [2 \\times 10\\frac{1}{4}] \\times 19 + [3 \\times 10\\frac{1}{4}] \\times 15$\n  $= 10\\frac{1}{4} \\times 17 + 10\\frac{1}{4} \\times (2 \\times 19) + 10\\frac{1}{4} \\times (3 \\times 15)$\n  $= 10\\frac{1}{4} \\times 17 + 10\\frac{1}{4} \\times 38 + 10\\frac{1}{4} \\times 45$.\n- Đặt thừa số chung $10\\frac{1}{4}$ ra ngoài:\n  $= 10\\frac{1}{4} \\times (17 + 38 + 45)$\n  $= 10\\frac{1}{4} \\times 100$\n  $= \\frac{41}{4} \\times 100 = 41 \\times 25 = 1025$.\n**Đáp số: 1025.**"
      },
      {
        "id": 61,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The 10-digit number $\\overline{A20181014B}$ is divisible by $36$. $A$ and $B$ are non-zero digits. Find the value of $A + B$.",
        "questionVi": "Số có 10 chữ số $\\overline{A20181014B}$ chia hết cho $36$. Biết rằng $A$ và $B$ là các chữ số khác 0. Tìm giá trị của $A + B$.",
        "image": null,
        "answer": "10",
        "acceptableAnswers": [
          "10"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết đồng thời cho các số nguyên tố cùng nhau (4 và 9).",
        "solution": "**Phương pháp: Dấu hiệu chia hết đồng thời cho các số nguyên tố cùng nhau (4 và 9).**\n- Ta có 36 = 4 × 9 với ƯCLN(4, 9) = 1. Do đó, một số chia hết cho 36 khi và chỉ khi nó đồng thời chia hết cho 4 và chia hết cho 9.\n- Số đã cho là N = A20181014B với A, B là các chữ số từ 1 đến 9.\n- Dấu hiệu chia hết cho 4: Hai chữ số tận cùng là 4B phải tạo thành số chia hết cho 4.\n  Vì B khác 0, nên 4B có thể là 44 hoặc 48. Do đó B ∈ {4, 8}.\n- Dấu hiệu chia hết cho 9: Tổng các chữ số của N phải chia hết cho 9.\n  Tổng các chữ số = A + 2 + 0 + 1 + 8 + 1 + 0 + 1 + 4 + B = A + B + 17.\n- Vì A, B là các chữ số khác 0 (1 ≤ A, B ≤ 9) nên:\n  1 + 1 ≤ A + B ≤ 9 + 9 ⟺ 2 ≤ A + B ≤ 18.\n  Cộng 17 vào các vế: 19 ≤ A + B + 17 ≤ 35.\n- Trong đoạn từ 19 đến 35, chỉ có duy nhất số 27 là bội của 9. Do đó:\n  A + B + 17 = 27 ⟹ A + B = 27 – 17 = 10.\n- (Kiểm tra tính hợp lệ: Nếu B = 4 thì A = 6; nếu B = 8 thì A = 2. Trong cả hai trường hợp A đều là chữ số khác 0 thỏa mãn điều kiện đề bài).\n**Đáp số: 10.**"
      },
      {
        "id": 62,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the last digit of $A$ if $A = 1 + 4 + 9 + 16 + 25 + \\dots + 361 + 400 + 441$.",
        "questionVi": "Tìm chữ số tận cùng của $A$ biết $A = 1 + 4 + 9 + 16 + 25 + \\dots + 361 + 400 + 441$.",
        "image": null,
        "answer": "1",
        "acceptableAnswers": [
          "1"
        ],
        "unit": "",
        "hint": "Quy luật chu kỳ chữ số tận cùng của dãy bình phương n².",
        "solution": "**Phương pháp: Quy luật chu kỳ chữ số tận cùng của dãy bình phương n².**\n- Biểu thức A là tổng bình phương các số tự nhiên từ 1 đến 21:\n  A = 1² + 2² + 3² + ... + 20² + 21² (do 441 = 21²).\n- Xét chữ số tận cùng của bình phương các số từ 1 đến 10:\n  1² tận cùng là 1; 2² tận cùng là 4; 3² tận cùng là 9; 4² tận cùng là 6; 5² tận cùng là 5;\n  6² tận cùng là 6; 7² tận cùng là 9; 8² tận cùng là 4; 9² tận cùng là 1; 10² tận cùng là 0.\n- Tổng các chữ số tận cùng của một chu kỳ 10 số là:\n  1 + 4 + 9 + 6 + 5 + 6 + 9 + 4 + 1 + 0 = 45 (tận cùng là 5).\n- Dãy từ 1² đến 20² gồm đúng 2 chu kỳ 10 số đầy đủ (từ 1 đến 10 và từ 11 đến 20).\n  Chữ số tận cùng của tổng 2 chu kỳ này là: (5 + 5) tận cùng là 0.\n- Số hạng cuối cùng là 21² = 441 có chữ số tận cùng là 1.\n- Vậy chữ số tận cùng của A là: 0 + 1 = 1.\n**Đáp số: 1.**"
      },
      {
        "id": 63,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The sum of 3 prime numbers is $18$. Find the maximum value of the product among these 3 prime numbers.",
        "questionVi": "Tổng của 3 số nguyên tố là $18$. Tìm giá trị lớn nhất của tích 3 số nguyên tố đó.",
        "image": null,
        "answer": "110",
        "acceptableAnswers": [
          "110"
        ],
        "unit": "",
        "hint": "Tính chẵn lẻ của số nguyên tố và chia trường hợp tìm tích lớn nhất.",
        "solution": "**Phương pháp: Tính chẵn lẻ của số nguyên tố và chia trường hợp tìm tích lớn nhất.**\n- Gọi 3 số nguyên tố cần tìm là p, q, r (với p ≤ q ≤ r). Theo bài ra: p + q + r = 18.\n- Nhận xét: 18 là một số chẵn. Nếu cả 3 số p, q, r đều là số nguyên tố lẻ thì tổng của 3 số lẻ phải là một số lẻ (mâu thuẫn với 18 là số chẵn).\n- Do đó, trong 3 số nguyên tố bắt buộc phải có ít nhất một số nguyên tố chẵn. Số nguyên tố chẵn duy nhất là 2. Suy ra số nhỏ nhất là p = 2.\n- Khi đó tổng hai số nguyên tố còn lại là:\n  q + r = 18 – 2 = 16.\n- Ta phân tích 16 thành tổng của hai số nguyên tố lẻ:\n  + Trường hợp 1: 16 = 3 + 13 (cả 3 và 13 đều là số nguyên tố).\n    Tích của 3 số là: 2 × 3 × 13 = 78.\n  + Trường hợp 2: 16 = 5 + 11 (cả 5 và 11 đều là số nguyên tố).\n    Tích của 3 số là: 2 × 5 × 11 = 110.\n  + (Lưu ý: 16 = 7 + 9 nhưng 9 là hợp số nên loại).\n- So sánh hai tích: 110 > 78. Vậy giá trị lớn nhất của tích 3 số nguyên tố là 110.\n**Đáp số: 110.**"
      },
      {
        "id": 64,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "When a 3-digit number is divided by $4$, $6$ or $8$, the remainder is $1$. What is the largest possible value of that 3-digit number?",
        "questionVi": "Một số có 3 chữ số khi chia cho $4$, $6$ hoặc $8$ đều có số dư là $1$. Hỏi giá trị lớn nhất có thể của số có 3 chữ số đó là bao nhiêu?",
        "image": null,
        "answer": "985",
        "acceptableAnswers": [
          "985"
        ],
        "unit": "",
        "hint": "Bài toán tìm số theo điều kiện chia có dư (Đưa về Bội chung nhỏ nhất).",
        "solution": "**Phương pháp: Bài toán tìm số theo điều kiện chia có dư (Đưa về Bội chung nhỏ nhất).**\n- Gọi số có 3 chữ số cần tìm là N (100 ≤ N ≤ 999).\n- Theo đề bài, N chia cho 4, 6 hoặc 8 đều có số dư là 1.\n- Suy ra (N – 1) chia hết cho cả 4, 6 và 8. Do đó (N – 1) là bội chung của 4, 6 và 8.\n- Ta tìm Bội chung nhỏ nhất:\n  4 = 2²; 6 = 2 × 3; 8 = 2³ ⟹ BCNN(4, 6, 8) = 2³ × 3 = 24.\n- Suy ra (N – 1) là bội của 24, tức là: N – 1 = 24 × k (với k là số tự nhiên).\n- Để N là số có 3 chữ số lớn nhất thì (N – 1) phải là bội lớn nhất của 24 mà nhỏ hơn 999.\n- Ta thực hiện phép chia: 999 : 24 = 41 (dư 15).\n- Do đó giá trị lớn nhất của (N – 1) là: 24 × 41 = 984.\n- Vậy giá trị lớn nhất của N là: 984 + 1 = 985.\n**Đáp số: 985.**"
      },
      {
        "id": 65,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the number of all positive factors of $1014$.",
        "questionVi": "Tìm số lượng tất cả các ước số nguyên dương của $1014$.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Công thức tính số lượng ước số nguyên dương qua phân tích thừa số nguyên tố.",
        "solution": "**Phương pháp: Công thức tính số lượng ước số nguyên dương qua phân tích thừa số nguyên tố.**\n- Phân tích số 1014 ra thừa số nguyên tố:\n  1014 : 2 = 507\n  507 : 3 = 169\n  169 = 13².\n  Vậy dạng phân tích tiêu chuẩn là: 1014 = 2¹ × 3¹ × 13².\n- Theo định lý số học, nếu số N có dạng phân tích thừa số nguyên tố là N = p₁^a × p₂^b × p₃^c thì số lượng tất cả các ước số nguyên dương của N là: (a + 1)(b + 1)(c + 1).\n- Áp dụng công thức với số 1014, ta có số ước số nguyên dương là:\n  (1 + 1) × (1 + 1) × (2 + 1) = 2 × 2 × 3 = 12 (ước số).\n- (Liệt kê kiểm chứng: 1, 2, 3, 6, 13, 26, 39, 78, 169, 338, 507, 1014; đúng 12 ước số).\n**Đáp số: 12.**"
      },
      {
        "id": 66,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "It is known as the lengths of shorter sides for a right-angled triangle are $7\\text{ cm}$ and $24\\text{ cm}$ respectively. Find the length of the longest length.",
        "questionVi": "Biết rằng độ dài hai cạnh góc vuông của một tam giác vuông lần lượt là $7\\text{ cm}$ và $24\\text{ cm}$. Tìm độ dài của cạnh dài nhất (cạnh huyền).",
        "image": null,
        "answer": "25",
        "acceptableAnswers": [
          "25"
        ],
        "unit": "",
        "hint": "Định lý Pythagore cho tam giác vuông.",
        "solution": "**Phương pháp: Định lý Pythagore cho tam giác vuông.**\n- Trong tam giác vuông, hai cạnh ngắn hơn chính là hai cạnh góc vuông có độ dài a = 7 cm và b = 24 cm. Cạnh dài nhất chính là cạnh huyền c đối diện với góc vuông.\n- Theo định lý Pythagore: Bình phương độ dài cạnh huyền bằng tổng bình phương độ dài hai cạnh góc vuông:\n  c² = a² + b² = 7² + 24².\n  c² = 49 + 576 = 625.\n- Vì 25² = 625 (và c > 0) nên c = 25 cm.\n- Vậy độ dài cạnh dài nhất là 25 cm.\n**Đáp số: 25.**"
      },
      {
        "id": 67,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "P is a point in rectangle $ABCD$. Given that area of $\\triangle APD = 92\\text{ cm}^2$, area of $\\triangle BCP$ equals to $27\\%$ of rectangle $ABCD$. What is the area of rectangle $ABCD$ (in $\\text{cm}^2$)?",
        "questionVi": "Cho $P$ là một điểm nằm trong hình chữ nhật $ABCD$. Biết diện tích tam giác $APD$ là $92\\text{ cm}^2$, diện tích tam giác $BCP$ bằng $27\\%$ diện tích hình chữ nhật $ABCD$. Tính diện tích của hình chữ nhật $ABCD$ (theo $\\text{cm}^2$).",
        "image": "images/exam_de3/q17_geometry.png",
        "answer": "400",
        "acceptableAnswers": [
          "400"
        ],
        "unit": "",
        "hint": "Bổ đề diện tích điểm nằm trong hình bình hành / hình chữ nhật.",
        "solution": "**Phương pháp: Bổ đề diện tích điểm nằm trong hình bình hành / hình chữ nhật.**\n- Bổ đề: Với P là một điểm bất kỳ nằm trong hình chữ nhật ABCD, tổng diện tích của hai tam giác đối đỉnh qua P có đáy là hai cạnh đối diện luôn bằng một nửa (50%) diện tích hình chữ nhật ABCD.\n  Chứng minh: Kẻ đoạn thẳng qua P vuông góc với AD và BC, cắt AD tại H và cắt BC tại K. Khi đó HK = AB là chiều rộng hình chữ nhật và PH + PK = HK.\n  S(APD) = 1/2 × AD × PH\n  S(BCP) = 1/2 × BC × PK = 1/2 × AD × PK (do BC = AD)\n  ⟹ S(APD) + S(BCP) = 1/2 × AD × (PH + PK) = 1/2 × AD × AB = 50% S(ABCD).\n- Theo bài ra: S(BCP) = 27% S(ABCD).\n- Suy ra: S(APD) chiếm số phần trăm diện tích hình chữ nhật là:\n  50% – 27% = 23% S(ABCD).\n- Mà diện tích tam giác APD bằng 92 cm², do đó diện tích hình chữ nhật ABCD là:\n  S(ABCD) = 92 : 23% = 92 : (23/100) = 92 × (100/23) = 4 × 100 = 400 (cm²).\n**Đáp số: 400.**"
      },
      {
        "id": 68,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Little cubes with side length $1\\text{ cm}$ are combined according to the pattern shown below. If there are $14$ layers, find the surface area.",
        "questionVi": "Các khối lập phương nhỏ có độ dài cạnh $1\\text{ cm}$ được xếp lại với nhau theo quy luật như hình vẽ dưới đây. Nếu khối hình có tất cả $14$ tầng, hãy tìm diện tích toàn phần của khối hình đó (theo $\\text{cm}^2$).",
        "image": "images/exam_de3/q18_cubes.png",
        "answer": "812",
        "acceptableAnswers": [
          "812"
        ],
        "unit": "",
        "hint": "Phương pháp hình chiếu 6 hướng không gian 3D (Orthogonal Projections).",
        "solution": "**Phương pháp: Phương pháp hình chiếu 6 hướng không gian 3D (Orthogonal Projections).**\n- Đặt khối hình bậc thang n tầng vào hệ trục tọa độ 3D. Mỗi khối lập phương nhỏ có cạnh 1 cm (diện tích mỗi mặt là 1 cm²).\n- Diện tích toàn phần của khối đa diện được tính bằng tổng diện tích các hình chiếu theo 6 hướng vuông góc đối xứng từng đôi một:\n  1. Hướng từ trên xuống (Top view) & từ dưới lên (Bottom view):\n     Mỗi vị trí cột thẳng đứng đều có đúng 1 mặt vuông ở đỉnh hướng lên và 1 mặt đáy ở dưới hướng xuống. Đáy của hình khối n tầng là một hình vuông kích thước n × n = n² ô vuông.\n     ⟹ Diện tích mặt trên = n², diện tích mặt dưới = n².\n     Tổng diện tích trên + dưới = 2 × n².\n  2. Hướng từ trước tới (Front view) & từ sau tới (Back view):\n     Hình chiếu từ sau và từ trước là một tam giác bậc thang gồm các cột có chiều cao lần lượt từ 1, 2, ..., n đơn vị.\n     Diện tích hình chiếu = 1 + 2 + ... + n = n(n + 1) / 2.\n     ⟹ Tổng diện tích trước + sau = 2 × [n(n + 1) / 2] = n(n + 1).\n  3. Hướng từ trái sang (Left view) & từ phải sang (Right view):\n     Tương tự do tính đối xứng không gian, diện tích hình chiếu từ hai bên sườn cũng bằng tam giác bậc thang n(n + 1) / 2.\n     ⟹ Tổng diện tích trái + phải = 2 × [n(n + 1) / 2] = n(n + 1).\n- Tổng diện tích toàn phần của toàn bộ khối hình n tầng là:\n  S(n) = 2n² + n(n + 1) + n(n + 1) = 2n² + 2n(n + 1) = 4n² + 2n = 2n(2n + 1).\n- Áp dụng với số tầng n = 14:\n  S = 4 × 14² + 2 × 14 = 4 × 196 + 28 = 784 + 28 = 812 (cm²).\n- (Hoặc tính theo tích: S = 2 × 14 × (2 × 14 + 1) = 28 × 29 = 812 cm²).\n**Đáp số: 812.**"
      },
      {
        "id": 69,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The area of a rectangle is $576$. The value of its length and width are both integers. What is the minimum possible value of its perimeter?",
        "questionVi": "Diện tích của một hình chữ nhật là $576$. Biết chiều dài và chiều rộng của nó đều là các số nguyên. Hỏi giá trị nhỏ nhất có thể của chu vi hình chữ nhật đó là bao nhiêu?",
        "image": null,
        "answer": "96",
        "acceptableAnswers": [
          "96"
        ],
        "unit": "",
        "hint": "Tìm giá trị nhỏ nhất của chu vi khi diện tích không đổi (Tách ước số gần nhau nhất).",
        "solution": "**Phương pháp: Tìm giá trị nhỏ nhất của chu vi khi diện tích không đổi (Tách ước số gần nhau nhất).**\n- Gọi chiều dài là a và chiều rộng là b (với a, b là các số nguyên dương, a ≥ b ≥ 1).\n- Diện tích hình chữ nhật là: S = a × b = 576.\n- Chu vi hình chữ nhật là: P = 2 × (a + b).\n- Muốn chu vi P đạt giá trị nhỏ nhất thì tổng (a + b) phải nhỏ nhất.\n- Tính chất: Khi tích của hai số không đổi, tổng của chúng đạt giá trị nhỏ nhất khi hiệu giữa hai số là nhỏ nhất (tức hai số càng gần nhau càng tốt).\n- Ta có 24 × 24 = 576. Vì hình vuông là một dạng đặc biệt của hình chữ nhật có chiều dài bằng chiều rộng, nên ta có thể chọn a = 24 và b = 24 (khi đó hiệu a – b = 0 là nhỏ nhất).\n- Tổng nhỏ nhất khi đó là: a + b = 24 + 24 = 48.\n- Vậy giá trị nhỏ nhất của chu vi là:\n  P = 2 × 48 = 96.\n**Đáp số: 96.**"
      },
      {
        "id": 70,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "If the side length of a square is $14\\pi$ and the perimeter of a square is equal to the circumference of a circle, find the radius of the circle.",
        "questionVi": "Nếu độ dài cạnh của một hình vuông là $14\\pi$ và chu vi của hình vuông đó bằng chu vi của một hình tròn, hãy tìm bán kính của hình tròn đó.",
        "image": null,
        "answer": "28",
        "acceptableAnswers": [
          "28"
        ],
        "unit": "",
        "hint": "Công thức chu vi hình vuông và chu vi đường tròn.",
        "solution": "**Phương pháp: Công thức chu vi hình vuông và chu vi đường tròn.**\n- Độ dài cạnh của hình vuông là: a = 14π.\n- Chu vi của hình vuông là:\n  C(HV) = 4 × a = 4 × 14π = 56π.\n- Gọi R là bán kính của hình tròn. Chu vi của hình tròn được tính theo công thức:\n  C(HT) = 2 × π × R.\n- Theo đề bài, chu vi hình vuông bằng chu vi hình tròn:\n  2 × π × R = 56π.\n- Chia cả hai vế cho 2π, ta tìm được bán kính R là:\n  R = 56π : (2π) = 28.\n**Đáp số: 28.**"
      },
      {
        "id": 71,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Find the smallest difference between two numbers formed by using all 7 digits from 0 to 6 without repetition.",
        "questionVi": "Tìm hiệu nhỏ nhất giữa hai số được lập nên từ việc sử dụng tất cả 7 chữ số từ 0 đến 6 mà không lặp lại.",
        "image": null,
        "answer": "369",
        "acceptableAnswers": [
          "369"
        ],
        "unit": "",
        "hint": "Cấu tạo số và kỹ thuật tìm hiệu nhỏ nhất giữa hai số.",
        "solution": "**Phương pháp: Cấu tạo số và kỹ thuật tìm hiệu nhỏ nhất giữa hai số.**\n- Đề bài yêu cầu dùng tất cả 7 chữ số {0, 1, 2, 3, 4, 5, 6} mỗi chữ số đúng một lần để lập thành hai số có hiệu nhỏ nhất.\n- Để hiệu giữa hai số là nhỏ nhất, số lượng chữ số của hai số phải chênh lệch ít nhất: một số có 4 chữ số A = abcd và một số có 3 chữ số B = efg.\n- Để hiệu A – B nhỏ nhất thì số bị trừ A phải nhỏ nhất có thể và số trừ B phải lớn nhất có thể:\n  + Số có 4 chữ số A nhỏ nhất khi chữ số hàng nghìn a nhỏ nhất (a = 1 vì chữ số 0 không đứng đầu). Để A nhỏ nhất tiếp theo, ta chọn các chữ số nhỏ nhất còn lại: {0, 2, 3} ⟹ A = 1023.\n  + Khi đó tập các chữ số còn lại để lập số B là {4, 5, 6}. Để B lớn nhất, ta xếp các chữ số theo thứ tự giảm dần: B = 654.\n  + Hiệu khi đó là: A – B = 1023 – 654 = 369.\n- Kiểm tra các khả năng khác:\n  + Nếu A bắt đầu bằng 1024, còn {3, 5, 6} ⟹ B = 653 ⟹ 1024 – 653 = 371 > 369.\n  + Nếu A bắt đầu bằng 1032, B = 654 ⟹ 1032 – 654 = 378 > 369.\n- Vậy hiệu nhỏ nhất có thể đạt được là: 1023 – 654 = 369.\n**Đáp số: 369.**"
      },
      {
        "id": 72,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Given that $A : B = 7 : 2$, $B : C = 3 : 5$ and $A + B + C = 185$. Find $A$.",
        "questionVi": "Cho biết $A : B = 7 : 2$, $B : C = 3 : 5$ và $A + B + C = 185$. Tìm giá trị của $A$.",
        "image": null,
        "answer": "105",
        "acceptableAnswers": [
          "105"
        ],
        "unit": "",
        "hint": "Phương pháp quy đồng tỉ số qua đại lượng trung gian B (Tỉ lệ thức số học).",
        "solution": "**Phương pháp: Phương pháp quy đồng tỉ số qua đại lượng trung gian B (Tỉ lệ thức số học).**\n- Ta có hai tỉ số: A : B = 7 : 2 và B : C = 3 : 5.\n- Đại lượng B liên kết cả hai tỉ số. Để đưa về cùng một hệ tỉ lệ, ta tìm BCNN của 2 và 3 là 6:\n  + Tỉ số A : B = 7 : 2 = (7 × 3) : (2 × 3) = 21 : 6.\n  + Tỉ số B : C = 3 : 5 = (3 × 2) : (5 × 2) = 6 : 10.\n- Khi đó, nếu coi B gồm 6 phần bằng nhau thì A gồm 21 phần và C gồm 10 phần như thế.\n- Tổng số phần bằng nhau của ba số là:\n  21 + 6 + 10 = 37 (phần).\n- Giá trị của 1 phần là:\n  185 : 37 = 5.\n- Giá trị của A là:\n  21 × 5 = 105.\n- (Thử lại: B = 6 × 5 = 30; C = 10 × 5 = 50. Tổng: 105 + 30 + 50 = 185; A : B = 105 : 30 = 7 : 2; B : C = 30 : 50 = 3 : 5, hoàn toàn chính xác).\n**Đáp số: 105.**"
      },
      {
        "id": 73,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Choose 4 digits, without repetition, from $2, 3, 6, 8, 4$ to construct 4-digit numbers. Of these 4-digit numbers, how many numbers are divisible by $4$?",
        "questionVi": "Chọn 4 chữ số khác nhau từ các chữ số $2, 3, 6, 8, 4$ để lập thành các số có 4 chữ số. Trong các số có 4 chữ số đó, có bao nhiêu số chia hết cho $4$?",
        "image": null,
        "answer": "48",
        "acceptableAnswers": [
          "48"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết cho 4 và Quy tắc nhân tổ hợp.",
        "solution": "**Phương pháp: Dấu hiệu chia hết cho 4 và Quy tắc nhân tổ hợp.**\n- Cho tập 5 chữ số: {2, 3, 4, 6, 8}. Chọn 4 chữ số khác nhau để lập số abcd chia hết cho 4.\n- Một số chia hết cho 4 khi và chỉ khi hai chữ số tận cùng cd tạo thành số chia hết cho 4.\n- Ta liệt kê các cặp hai chữ số cd khác nhau chọn từ {2, 3, 4, 6, 8} chia hết cho 4:\n  + Hàng chục là 2: 24, 28 (2 trường hợp).\n  + Hàng chục là 3: 32, 36 (2 trường hợp).\n  + Hàng chục là 4: 48 (1 trường hợp; 42 và 46 không chia hết cho 4).\n  + Hàng chục là 6: 64, 68 (2 trường hợp; 62 không chia hết cho 4).\n  + Hàng chục là 8: 84 (1 trường hợp; 82 và 86 không chia hết cho 4).\n  Tổng cộng có: 2 + 2 + 1 + 2 + 1 = 8 cặp tận cùng cd thỏa mãn.\n- Với mỗi cặp tận cùng cd đã chọn, tập hợp ban đầu còn lại: 5 – 2 = 3 chữ số.\n  Để chọn hai chữ số đầu ab xếp vào hai vị trí còn lại:\n  + Có 3 cách chọn chữ số a.\n  + Có 2 cách chọn chữ số b.\n  ⟹ Có: 3 × 2 = 6 cách chọn cặp chữ số đầu ab.\n- Theo quy tắc nhân, tổng số các số có 4 chữ số chia hết cho 4 là:\n  8 × 6 = 48 (số).\n**Đáp số: 48.**"
      },
      {
        "id": 74,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Numbers are drawn from the 1014 integers 1 to 1014. At least how many numbers are drawn at random to ensure that there are two numbers whose difference is 104?",
        "questionVi": "Các số được chọn ra từ 1014 số nguyên từ 1 đến 1014. Hỏi cần lấy ra ngẫu nhiên ít nhất bao nhiêu số để chắc chắn rằng có hai số có hiệu bằng 104?",
        "image": null,
        "answer": "521",
        "acceptableAnswers": [
          "521"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet / Phân hoạch chuỗi số theo modulo 104.",
        "solution": "**Phương pháp: Nguyên lý Dirichlet / Phân hoạch chuỗi số theo modulo 104.**\n- Yêu cầu: Lấy ngẫu nhiên các số từ tập {1, 2, ..., 1014} để chắc chắn có ít nhất 2 số có hiệu bằng 104.\n- Ta phân hoạch 1014 số thành 104 chuỗi số rời nhau, mỗi chuỗi gồm các số có cùng số dư khi chia cho 104 (các số liên tiếp trong chuỗi cách nhau đúng 104 đơn vị):\n  Thực hiện phép chia: 1014 : 104 = 9 (dư 78).\n  + Có 78 chuỗi có độ dài 10 phần tử (ứng với số dư từ 1 đến 78). Ví dụ chuỗi dư 1: {1, 105, 209, ..., 937}.\n  + Có 104 – 78 = 26 chuỗi có độ dài 9 phần tử (ứng với số dư từ 79 đến 104). Ví dụ chuỗi dư 79: {79, 183, ..., 911}.\n- Để KHÔNG có hai số nào có hiệu bằng 104, trong mỗi chuỗi ta không được chọn hai phần tử đứng cạnh nhau:\n  + Trong một chuỗi 10 phần tử, ta có thể chọn tối đa: 10 : 2 = 5 phần tử (ở các vị trí lẻ 1, 3, 5, 7, 9).\n  + Trong một chuỗi 9 phần tử, ta có thể chọn tối đa: (9 + 1) : 2 = 5 phần tử (ở các vị trí lẻ 1, 3, 5, 7, 9).\n- Do đó, số lượng số nhiều nhất có thể lấy ra mà CHƯA có hai số nào có hiệu bằng 104 (trường hợp xấu nhất) là:\n  78 × 5 + 26 × 5 = (78 + 26) × 5 = 104 × 5 = 520 (số).\n- Theo nguyên lý Dirichlet, nếu ta lấy thêm đúng 1 số nữa (tổng cộng 520 + 1 = 521 số), chắc chắn sẽ có ít nhất một chuỗi bị chọn 2 phần tử đứng cạnh nhau, tức là hiệu của chúng đúng bằng 104.\n- Vậy số lượng số cần lấy ra ít nhất là: 520 + 1 = 521 (số).\n**Đáp số: 521.**"
      },
      {
        "id": 75,
        "examId": "heat_2018_2019_de3",
        "examIndex": 2,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "When do the hour hand and the minute hand form a straight line for the earliest case between 9pm and 10pm?",
        "questionVi": "Trong khoảng thời gian từ 9 giờ tối đến 10 giờ tối, vào thời điểm nào thì kim giờ và kim phút tạo thành một đường thẳng lần đầu tiên?",
        "image": null,
        "answer": "$9:16\\frac{4}{11}$",
        "acceptableAnswers": [
          "9:16\\frac{4}{11}",
          "4/11",
          "4 / 11",
          "0.3636",
          "9:164/11"
        ],
        "unit": "",
        "hint": "Chuyển động kim đồng hồ (Vận tốc tương đối giữa kim phút và kim giờ).",
        "solution": "**Phương pháp: Chuyển động kim đồng hồ (Vận tốc tương đối giữa kim phút và kim giờ).**\n- Mặt đồng hồ hình tròn được chia thành 60 khoảng phút (tương ứng với $360^\\circ$).\n- Vận tốc chuyển động của hai kim:\n  + Kim phút quay được: 60 : 60 = 1 (khoảng phút/phút).\n  + Kim giờ quay được: 5 : 60 = $\\frac{1}{12}$ (khoảng phút/phút).\n  + Hiệu vận tốc giữa kim phút và kim giờ là: $1 - \\frac{1}{12} = \\frac{11}{12}$ (khoảng phút/phút).\n- Lúc 9 giờ đúng, kim phút chỉ số 12 (vạch 0), kim giờ chỉ số 9 (vạch 45 phút). Vị trí đối diện với kim giờ trên mặt đồng hồ là số 3 (vạch 15 phút).\n- Để hai kim tạo thành một đường thẳng lần đầu tiên (earliest case) sau 9 giờ, hai kim phải ngược hướng nhau (góc $180^\\circ$). Điều này xảy ra khi kim phút chạy từ vạch 0 đến vị trí đối diện với kim giờ.\n- Khoảng cách ban đầu kim phút cần chạy đuổi theo vị trí đối diện kim giờ là: 15 khoảng phút.\n- Thời gian cần thiết để kim phút tạo thành đường thẳng với kim giờ là:\n  $15 : \\frac{11}{12} = 15 \\times \\frac{12}{11} = \\frac{180}{11} = 16\\frac{4}{11}$ (phút).\n- Vậy thời điểm sớm nhất hai kim tạo thành một đường thẳng là: 9 giờ $16\\frac{4}{11}$ phút (viết dưới dạng $9:16\\frac{4}{11}$).\n**Đáp số: $9:16\\frac{4}{11}$.**"
      }
    ]
  },
  {
    "id": "heat_2017_2018_de4",
    "title": "Đề số 4: VCK Quốc gia (2017 – 2018)",
    "titleEn": "Paper 4: National Final Heat Round (2017 – 2018)",
    "year": "2017 – 2018",
    "grade": "Khối 6 / Grade 6",
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
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Given $A$ and $C$ are two non-zero digits, we have: 1. $\\overline{CA}$ is divisible by $19$; 2. $\\overline{AC}$ can be expressed by a product of 2 prime numbers; Find the 2-digit number $\\overline{CA}$.",
        "questionVi": "Cho $A$ và $C$ là hai chữ số khác 0, biết rằng: 1. Số có hai chữ số $\\overline{CA}$ chia hết cho $19$; 2. Số có hai chữ số $\\overline{AC}$ có thể biểu diễn thành tích của 2 số nguyên tố. Tìm số có hai chữ số $\\overline{CA}$.",
        "image": null,
        "answer": "19",
        "acceptableAnswers": [
          "19"
        ],
        "unit": "",
        "hint": "Phương pháp chặn miền giá trị chữ số và Phân tích thừa số nguyên tố.",
        "solution": "**Phương pháp: Phương pháp chặn miền giá trị chữ số và Phân tích thừa số nguyên tố.**\n- A và C là hai chữ số khác 0 (tức là A, C ∈ {1, 2, 3, 4, 5, 6, 7, 8, 9}).\n- Điều kiện 1: Số có hai chữ số CA chia hết cho 19.\n  Các số có hai chữ số chia hết cho 19 gồm có: 19, 38, 57, 76, 95.\n  Ta xét từng trường hợp của số CA:\n  + Trường hợp 1: CA = 19 ⇒ C = 1, A = 9. Khi đó số AC = 91.\n    Phân tích ra thừa số nguyên tố: 91 = 7 × 13. Đây đúng là tích của 2 số nguyên tố (7 và 13), thỏa mãn điều kiện 2.\n  + Trường hợp 2: CA = 38 ⇒ C = 3, A = 8. Khi đó AC = 83 (83 là số nguyên tố, không phải là tích của 2 số nguyên tố ⇒ Loại).\n  + Trường hợp 3: CA = 57 ⇒ C = 5, A = 7. Khi đó AC = 75 = 3 × 5 × 5 (tích của 3 thừa số nguyên tố ⇒ Loại).\n  + Trường hợp 4: CA = 76 ⇒ C = 7, A = 6. Khi đó AC = 67 (67 là số nguyên tố ⇒ Loại).\n  + Trường hợp 5: CA = 95 ⇒ C = 9, A = 5. Khi đó AC = 59 (59 là số nguyên tố ⇒ Loại).\n- Như vậy, chỉ có duy nhất trường hợp CA = 19 thỏa mãn toàn bộ các điều kiện của bài toán.\n**Đáp số: 19.**"
      },
      {
        "id": 77,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "5 numbers, $A, B, C, D$ and $E$, represent different numbers from 1 to 9. Given the following conditions: 1. $A + E < C + 5$; 2. $A + C + E = D$; 3. $A + D = B$; 4. $D$ is divisible by $C$; 5. $A + C < E$; 6. $D > 6$. Find the number to represent $C$.",
        "questionVi": "Năm chữ cái $A, B, C, D$ và $E$ đại diện cho 5 số khác nhau từ 1 đến 9, thỏa mãn các điều kiện sau: 1. $A + E < C + 5$; 2. $A + C + E = D$; 3. $A + D = B$; 4. $D$ chia hết cho $C$; 5. $A + C < E$; 6. $D > 6$. Tìm số đại diện cho chữ cái $C$.",
        "image": null,
        "answer": "2",
        "acceptableAnswers": [
          "2"
        ],
        "unit": "",
        "hint": "Suy luận logic và chia trường hợp loại trừ dần.",
        "solution": "**Phương pháp: Suy luận logic và chia trường hợp loại trừ dần.**\n- Các chữ cái A, B, C, D, E đại diện cho 5 số nguyên khác nhau từ 1 đến 9.\n- Xét điều kiện 6: D > 6, mà D ≤ 9 nên D chỉ có thể nhận các giá trị: 7, 8, hoặc 9.\n- Xét điều kiện 3: A + D = B. Vì B ≤ 9 và A ≥ 1, nên D < B ≤ 9, suy ra D chỉ có thể bằng 7 hoặc 8:\n  + Nếu D = 8: Vì A + D = B ≤ 9 và A ≥ 1, bắt buộc A = 1 và B = 9.\n  + Nếu D = 7: Ta có A + D = B ≤ 9 ⇒ A có thể bằng 1 (B = 8) hoặc A = 2 (B = 9).\n- Xét điều kiện 4: D chia hết cho C. Mà C là một số từ 1 đến 9 khác D:\n  + Nếu D = 7: Ước của 7 chỉ có 1 và 7. Vì C ≠ D nên C = 1. Nếu C = 1, thì A không thể bằng 1 (vì các số khác nhau), suy ra A = 2, B = 9. Khi đó từ điều kiện 2: A + C + E = D ⇒ 2 + 1 + E = 7 ⇒ E = 4. Kiểm tra điều kiện 5: A + C < E ⇒ 2 + 1 < 4 (thỏa mãn 3 < 4). Tuy nhiên, kiểm tra điều kiện 1: A + E < C + 5 ⇒ 2 + 4 < 1 + 5 ⇒ 6 < 6 (vô lý!). Do đó D không thể bằng 7.\n  + Nếu D = 8: Ước khác 8 của 8 gồm 1, 2, 4. Vì A = 1 nên C ≠ 1. Do đó C chỉ có thể là 2 hoặc 4:\n    * Nếu C = 4: Từ điều kiện 2: A + C + E = D ⇒ 1 + 4 + E = 8 ⇒ E = 3. Thử điều kiện 5: A + C < E ⇒ 1 + 4 < 3 ⇒ 5 < 3 (vô lý!).\n    * Nếu C = 2: Từ điều kiện 2: A + C + E = D ⇒ 1 + 2 + E = 8 ⇒ E = 5. Kiểm tra tất cả các điều kiện:\n      1. A + E = 1 + 5 = 6; C + 5 = 2 + 5 = 7 ⇒ 6 < 7 (thỏa mãn).\n      2. A + C + E = 1 + 2 + 5 = 8 = D (thỏa mãn).\n      3. A + D = 1 + 8 = 9 = B (thỏa mãn).\n      4. D = 8 chia hết cho C = 2 (thỏa mãn).\n      5. A + C = 1 + 2 = 3 < E = 5 (thỏa mãn).\n      6. D = 8 > 6 (thỏa mãn).\n      Năm số tìm được là: A = 1, B = 9, C = 2, D = 8, E = 5 (đều phân biệt từ 1 đến 9).\n- Vậy chữ cái C đại diện cho số 2.\n**Đáp số: 2.**"
      },
      {
        "id": 78,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "20 children, numbered 1 to 20, sit around a circle in order. Each child has an integer in hand. The child numbered 1 has the integer 1. The child numbered 2 has the integer 2. The child numbered 3 has the integer 3. Given that the sum of the integers of any 8 consecutive children is equal to 20. What is the integer held by the child numbered 20?",
        "questionVi": "Có 20 đứa trẻ được đánh số thứ tự từ 1 đến 20 ngồi theo vòng tròn. Mỗi đứa trẻ cầm trên tay một số nguyên. Đứa trẻ số 1 cầm số 1, đứa trẻ số 2 cầm số 2, đứa trẻ số 3 cầm số 3. Biết rằng tổng các số của 8 đứa trẻ ngồi liên tiếp bất kỳ luôn bằng 20. Hỏi đứa trẻ số 20 cầm số nguyên nào?",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4"
        ],
        "unit": "",
        "hint": "Chu kỳ tuần hoàn trên vòng tròn và Bất biến tổng dãy liên tiếp.",
        "solution": "**Phương pháp: Chu kỳ tuần hoàn trên vòng tròn và Bất biến tổng dãy liên tiếp.**\n- Gọi x(i) là số nguyên do đứa trẻ thứ i nắm giữ (với i từ 1 đến 20).\n- Theo bài ra, tổng số của 8 đứa trẻ ngồi liên tiếp bất kỳ luôn bằng 20, tức là:\n  x(i) + x(i+1) + ... + x(i+7) = 20 và x(i+1) + x(i+2) + ... + x(i+8) = 20.\n- Trừ vế với vế hai đẳng thức trên, ta thu được:\n  x(i+8) = x(i) với mọi vị trí i trên vòng tròn (tính theo modulo 20).\n- Vì có 20 đứa trẻ trên vòng tròn và bước nhảy là 8, mà ước chung lớn nhất ƯCLN(8, 20) = 4, nên các vị trí có số dư bằng nhau khi chia cho 4 sẽ nhận cùng một giá trị:\n  + Nhóm dư 1: x(1) = x(9) = x(17) = x(5) = x(13) = 1 (vì đề bài cho đứa trẻ số 1 cầm số 1).\n  + Nhóm dư 2: x(2) = x(10) = x(18) = x(6) = x(14) = 2 (vì đứa trẻ số 2 cầm số 2).\n  + Nhóm dư 3: x(3) = x(11) = x(19) = x(7) = x(15) = 3 (vì đứa trẻ số 3 cầm số 3).\n  + Nhóm chia hết cho 4: x(4) = x(12) = x(20) = x(8) = x(16) = c.\n- Xét một nhóm 8 đứa trẻ liên tiếp từ vị trí 1 đến vị trí 8:\n  Nhóm này gồm đúng 2 số thuộc nhóm dư 1, 2 số thuộc nhóm dư 2, 2 số thuộc nhóm dư 3 và 2 số thuộc nhóm chia hết cho 4.\n- Tổng của 8 số này là:\n  2 × x(1) + 2 × x(2) + 2 × x(3) + 2 × x(4) = 20\n  2 × (1 + 2 + 3 + c) = 20\n  6 + c = 10 ⇒ c = 4.\n- Vì 20 chia hết cho 4 nên đứa trẻ thứ 20 cầm số x(20) = c = 4.\n**Đáp số: 4.**"
      },
      {
        "id": 79,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 4-digit number on a piece of paper and asked Peter to guess it. Peter asked: 'Is the number 1736?' John replied: 'Three of the digits are correct. The positions of those digits are all wrong.' Peter asked again: 'Is the number 2345?' John replied: 'Two of the digits are correct. The positions of those digits are all wrong.' Peter asked again: 'Is the number 3271?' John said: 'All the digits are correct. The positions of those digits are all wrong.' All the digits in the 4-digit number are different, what is the number written by John?",
        "questionVi": "John viết một số có 4 chữ số khác nhau lên một mảnh giấy và đố Peter đoán số đó. Peter hỏi: 'Có phải là số 1736 không?' John trả lời: 'Có 3 chữ số đúng nhưng vị trí của cả 3 chữ số đó đều sai.' Peter lại hỏi: 'Có phải là số 2345 không?' John trả lời: 'Có 2 chữ số đúng nhưng vị trí của cả 2 chữ số đó đều sai.' Peter lại hỏi: 'Có phải là số 3271 không?' John nói: 'Cả 4 chữ số đều đúng nhưng vị trí của cả 4 chữ số đó đều sai.' Hỏi số John đã viết là số nào?",
        "image": null,
        "answer": "7123",
        "acceptableAnswers": [
          "7123"
        ],
        "unit": "",
        "hint": "Phương pháp lập luận suy trừ loại dần (Bảng ma trận logic vị trí chữ số).",
        "solution": "**Phương pháp: Phương pháp lập luận suy trừ loại dần (Bảng ma trận logic vị trí chữ số).**\n- Gọi số cần tìm có 4 chữ số là ABCD (với A, B, C, D là các chữ số đôi một khác nhau).\n- Lần đoán 3: 'Is the number 3271?' John trả lời cả 4 chữ số đều đúng nhưng sai vị trí.\n  Điều này khẳng định tập hợp 4 chữ số của số cần tìm là {1, 2, 3, 7}.\n  Đồng thời vị trí các chữ số bị loại trừ:\n  + Vị trí 1 (chữ số hàng nghìn A) không thể là 3 (A ≠ 3).\n  + Vị trí 2 (chữ số hàng trăm B) không thể là 2 (B ≠ 2).\n  + Vị trí 3 (chữ số hàng chục C) không thể là 7 (C ≠ 7).\n  + Vị trí 4 (chữ số hàng đơn vị D) không thể là 1 (D ≠ 1).\n- Lần đoán 1: 'Is the number 1736?' John trả lời có 3 chữ số đúng và sai vị trí.\n  Trong tập {1, 7, 3, 6}, có đúng 3 chữ số thuộc {1, 2, 3, 7} là 1, 7, 3 (chữ số 6 sai).\n  Vì các vị trí đều sai nên:\n  + Vị trí 1 không thể là 1 (A ≠ 1).\n  + Vị trí 2 không thể là 7 (B ≠ 7).\n  + Vị trí 3 không thể là 3 (C ≠ 3).\n- Lần đoán 2: 'Is the number 2345?' John trả lời có 2 chữ số đúng và sai vị trí.\n  Hai chữ số đúng là 2 và 3 (thuộc tập {1, 2, 3, 7}). Vì vị trí đều sai nên:\n  + Vị trí 1 không thể là 2 (A ≠ 2).\n  + Vị trí 2 không thể là 3 (B ≠ 3).\n- Tổng hợp các điều kiện vị trí cho từng chữ số:\n  + Xét vị trí 1 (hàng nghìn A): A thuộc {1, 2, 3, 7}, mà A ≠ 3, A ≠ 1, A ≠ 2 ⇒ Bắt buộc A = 7.\n  + Xét vị trí 2 (hàng trăm B): Sau khi chọn A = 7, các chữ số còn lại là {1, 2, 3}. Mà B ≠ 2, B ≠ 7, B ≠ 3 ⇒ Bắt buộc B = 1.\n  + Xét vị trí 3 (hàng chục C): Sau khi chọn B = 1, các chữ số còn lại là {2, 3}. Mà C ≠ 7, C ≠ 3 ⇒ Bắt buộc C = 2.\n  + Xét vị trí 4 (hàng đơn vị D): Chữ số còn lại duy nhất là D = 3 (thỏa mãn D ≠ 1).\n- Vậy số có 4 chữ số do John viết ra là 7123.\n**Đáp số: 7123.**"
      },
      {
        "id": 80,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are 3 pieces of white chopsticks, 4 pieces of yellow chopsticks and 5 pieces of brown chopsticks mixed together. If you want to get 2 pairs of chopsticks with different colours in the dark, at least how many pieces of chopsticks should be taken out?",
        "questionVi": "Có 3 chiếc đũa màu trắng, 4 chiếc đũa màu vàng và 5 chiếc đũa màu nâu được để lẫn lộn. Trong bóng tối, muốn chắc chắn lấy được 2 đôi đũa khác màu nhau (mỗi đôi gồm 2 chiếc cùng màu), thì cần phải lấy ra ít nhất bao nhiêu chiếc đũa?",
        "image": null,
        "answer": "8",
        "acceptableAnswers": [
          "8"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet và Phân tích trường hợp xấu nhất (Worst-case scenario).",
        "solution": "**Phương pháp: Nguyên lý Dirichlet và Phân tích trường hợp xấu nhất (Worst-case scenario).**\n- Ta có tổng cộng: 3 chiếc đũa trắng (T), 4 chiếc đũa vàng (V) và 5 chiếc đũa nâu (N).\n- Đề bài yêu cầu lấy ra trong bóng tối để chắc chắn có được '2 đôi đũa khác màu nhau'. Mỗi đôi đũa gồm 2 chiếc cùng màu, vậy 2 đôi đũa khác màu tương đương với việc ta có ít nhất một đôi màu này và ít nhất một đôi màu kia (ví dụ 1 đôi Trắng + 1 đôi Vàng; hoặc 1 đôi Vàng + 1 đôi Nâu; hoặc 1 đôi Trắng + 1 đôi Nâu).\n- Để tìm số chiếc đũa ít nhất cần lấy ra để chắc chắn thỏa mãn, ta phân tích trường hợp xấu nhất (bất lợi nhất) khi lấy ra nhiều đũa nhất mà vẫn CHƯA có được 2 đôi khác màu:\n  Tình huống bất lợi nhất là ta lấy được rất nhiều đũa nhưng chỉ tạo thành các đôi của DUY NHẤT MỘT MÀU, còn các màu khác chỉ lấy được tối đa 1 chiếc lẻ (không đủ tạo thành đôi thứ hai):\n  + Ta lấy toàn bộ 5 chiếc đũa màu nâu (màu có nhiều đũa nhất): 5 chiếc nâu này tạo được 2 đôi nâu, nhưng tất cả đều cùng một màu nâu (chưa có đôi màu khác).\n  + Với màu trắng: ta lấy tối đa 1 chiếc (chưa đủ tạo thành đôi).\n  + Với màu vàng: ta lấy tối đa 1 chiếc (chưa đủ tạo thành đôi).\n  Tổng số chiếc đũa đã lấy ra trong trường hợp xấu nhất này là: 5 (nâu) + 1 (trắng) + 1 (vàng) = 7 (chiếc).\n- Lúc này, ta đã lấy 7 chiếc đũa nhưng vẫn chưa có 2 đôi khác màu.\n- Nếu ta lấy thêm đúng 1 chiếc đũa nữa (chiếc thứ 8): Vì toàn bộ đũa nâu đã bị lấy hết, chiếc thứ 8 này bắt buộc phải là đũa trắng hoặc đũa vàng:\n  + Nếu là đũa trắng, nó kết hợp với 1 chiếc trắng đã có để tạo thành 1 đôi đũa trắng (kết hợp với đôi đũa nâu đã có thành 2 đôi khác màu).\n  + Nếu là đũa vàng, nó kết hợp với 1 chiếc vàng đã có để tạo thành 1 đôi đũa vàng (kết hợp với đôi đũa nâu đã có thành 2 đôi khác màu).\n- Vậy số chiếc đũa cần lấy ra ít nhất là: 7 + 1 = 8 (chiếc đũa).\n**Đáp số: 8.**"
      },
      {
        "id": 81,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 + 2 + 4 + 8 + 16 + \\dots + 4096$.",
        "questionVi": "Tính giá trị của biểu thức: $1 + 2 + 4 + 8 + 16 + \\dots + 4096$.",
        "image": null,
        "answer": "8191",
        "acceptableAnswers": [
          "8191"
        ],
        "unit": "",
        "hint": "Phương pháp sai phân tổng lũy thừa (Nhân cả hai vế với công bội q = 2).",
        "solution": "**Phương pháp: Phương pháp sai phân tổng lũy thừa (Nhân cả hai vế với công bội q = 2).**\n- Đặt biểu thức cần tính là: S = 1 + 2 + 4 + 8 + 16 + ... + 4096.\n- Nhận thấy dãy số là các lũy thừa của 2: S = 2⁰ + 2¹ + 2² + 2³ + ... + 2¹² (vì 4096 = 2¹²).\n- Nhân cả hai vế của biểu thức S với 2, ta được:\n  2 × S = 2 × (1 + 2 + 4 + 8 + ... + 4096)\n  2 × S = 2 + 4 + 8 + 16 + ... + 4096 + 8192.\n- Lấy biểu thức (2 × S) trừ đi biểu thức S theo từng vế:\n  2 × S – S = (2 + 4 + 8 + ... + 4096 + 8192) – (1 + 2 + 4 + 8 + ... + 4096)\n  S = 8192 – 1 = 8191.\n**Đáp số: 8191.**"
      },
      {
        "id": 82,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{2015 \\times 2016} + \\frac{1}{2016 \\times 2017}$.",
        "questionVi": "Tính giá trị của biểu thức: $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{2015 \\times 2016} + \\frac{1}{2016 \\times 2017}$.",
        "image": null,
        "answer": "$\\frac{2016}{2017}$",
        "acceptableAnswers": [
          "\\frac{2016}{2017}",
          "2016/2017",
          "2016 / 2017",
          "0.9995"
        ],
        "unit": "",
        "hint": "Sai phân triệt tiêu phân số (Telescoping Sum).",
        "solution": "**Phương pháp: Sai phân triệt tiêu phân số (Telescoping Sum).**\n- Áp dụng công thức sai phân phân số quen thuộc: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.\n- Tách từng số hạng trong tổng đã cho:\n  + $\\frac{1}{1 \\times 2} = 1 - \\frac{1}{2}$\n  + $\\frac{1}{2 \\times 3} = \\frac{1}{2} - \\frac{1}{3}$\n  + $\\frac{1}{3 \\times 4} = \\frac{1}{3} - \\frac{1}{4}$\n  + $\\dots$\n  + $\\frac{1}{2015 \\times 2016} = \\frac{1}{2015} - \\frac{1}{2016}$\n  + $\\frac{1}{2016 \\times 2017} = \\frac{1}{2016} - \\frac{1}{2017}$\n- Cộng tất cả các số hạng lại với nhau, các số hạng trung gian liên tiếp triệt tiêu lẫn nhau từng đôi một:\n  $S = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{2016} - \\frac{1}{2017}\\right)$\n  $S = 1 - \\frac{1}{2017} = \\frac{2016}{2017}$.\n**Đáp số: $\\frac{2016}{2017}$.**"
      },
      {
        "id": 83,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 \\times 2 + 2 \\times 3 + 3 \\times 4 + \\dots + 99 \\times 100 + 100 \\times 101$.",
        "questionVi": "Tính giá trị của biểu thức: $1 \\times 2 + 2 \\times 3 + 3 \\times 4 + \\dots + 99 \\times 100 + 100 \\times 101$.",
        "image": null,
        "answer": "343,400",
        "acceptableAnswers": [
          "343,400",
          "343400"
        ],
        "unit": "",
        "hint": "Phương pháp nhân 3 lần sai phân tích hai số tự nhiên liên tiếp.",
        "solution": "**Phương pháp: Phương pháp nhân 3 lần sai phân tích hai số tự nhiên liên tiếp.**\n- Đặt biểu thức cần tính là: S = 1×2 + 2×3 + 3×4 + ... + 99×100 + 100×101.\n- Nhân cả hai vế với 3, sau đó biến đổi thừa số 3 thành hiệu của hai số cách nhau 3 đơn vị:\n  3 × S = 1×2×3 + 2×3×(4 – 1) + 3×4×(5 – 2) + ... + 100×101×(102 – 99)\n  3 × S = 1×2×3 + (2×3×4 – 1×2×3) + (3×4×5 – 2×3×4) + ... + (100×101×102 – 99×100×101).\n- Khi cộng dồn lại, tất cả các tích trung gian đều triệt tiêu đối nhau, chỉ còn lại số hạng cuối cùng:\n  3 × S = 100 × 101 × 102.\n- Chia cả hai vế cho 3 để tìm S:\n  S = (100 × 101 × 102) : 3 = 100 × 101 × 34 = 10100 × 34 = 343,400.\n**Đáp số: 343,400.**"
      },
      {
        "id": 84,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 + 3 + 5 + \\dots + 2015 + 2017 + 2015 + \\dots + 5 + 3 + 1$.",
        "questionVi": "Tính giá trị của biểu thức: $1 + 3 + 5 + \\dots + 2015 + 2017 + 2015 + \\dots + 5 + 3 + 1$.",
        "image": null,
        "answer": "2,034,145",
        "acceptableAnswers": [
          "2,034,145",
          "2034145"
        ],
        "unit": "",
        "hint": "Quy luật tổng các số lẻ liên tiếp (Tổng n số lẻ đầu tiên bằng n²).",
        "solution": "**Phương pháp: Quy luật tổng các số lẻ liên tiếp (Tổng n số lẻ đầu tiên bằng n²).**\n- Tách biểu thức đã cho thành hai phần đối xứng:\n  + Phần 1 (tổng các số lẻ từ 1 đến 2017): A = 1 + 3 + 5 + ... + 2015 + 2017.\n  + Phần 2 (tổng các số lẻ từ 1 đến 2015): B = 1 + 3 + 5 + ... + 2015.\n- Tính tổng A:\n  Số số hạng trong A là: (2017 – 1) : 2 + 1 = 1009 (số hạng).\n  Theo công thức tổng của n số lẻ liên tiếp đầu tiên: A = 1009² = 1,018,081.\n- Tính tổng B:\n  Số số hạng trong B là: (2015 – 1) : 2 + 1 = 1008 (số hạng).\n  Theo công thức tổng của n số lẻ liên tiếp đầu tiên: B = 1008² = 1,016,064.\n- Tổng giá trị của biểu thức ban đầu là:\n  S = A + B = 1009² + 1008² = 1,018,081 + 1,016,064 = 2,034,145.\n**Đáp số: 2,034,145.**"
      },
      {
        "id": 85,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Convert $0.20\\dot{1}\\dot{7} = 0.201717\\dots$ into the simplest fraction.",
        "questionVi": "Đổi số thập phân vô hạn tuần hoàn $0.20\\dot{1}\\dot{7} = 0.201717\\dots$ ra phân số tối giản.",
        "image": null,
        "answer": "$\\frac{1997}{9900}$",
        "acceptableAnswers": [
          "\\frac{1997}{9900}",
          "1997/9900",
          "1997 / 9900",
          "0.2017"
        ],
        "unit": "",
        "hint": "Phương pháp đại số chuyển đổi số thập phân tuần hoàn tạp sang phân số.",
        "solution": "**Phương pháp: Phương pháp đại số chuyển đổi số thập phân tuần hoàn tạp sang phân số.**\n- Đặt $x = 0.20\\dot{1}\\dot{7} = 0.20171717\\dots$\n- Nhận thấy phần không tuần hoàn có 2 chữ số (20), phần chu kỳ tuần hoàn có 2 chữ số (17).\n- Ta thực hiện nhân lũy thừa cơ số 10 để đưa phần chu kỳ về cùng dạng:\n  + Nhân x với 100: $100 \\times x = 20.171717\\dots$\n  + Nhân x với 10000: $10000 \\times x = 2017.171717\\dots$\n- Lấy phương trình thứ hai trừ đi phương trình thứ nhất:\n  $10000 \\times x - 100 \\times x = 2017.171717\\dots - 20.171717\\dots$\n  $9900 \\times x = 2017 - 20 = 1997$\n  $x = \\frac{1997}{9900}$.\n- Kiểm tra tính tối giản: Số 1997 là số nguyên tố (không chia hết cho bất kỳ số nguyên tố nào từ 2 đến 43). Do đó, phân số $\\frac{1997}{9900}$ đã tối giản hoàn toàn.\n**Đáp số: $\\frac{1997}{9900}$.**"
      },
      {
        "id": 86,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "If 10-digit number $\\overline{A20171221B}$ is divisible by $56$, find the value of $A + B$.",
        "questionVi": "Nếu số có 10 chữ số $\\overline{A20171221B}$ chia hết cho $56$, hãy tìm giá trị của $A + B$.",
        "image": null,
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Dấu hiệu chia hết cho tích hai số nguyên tố cùng nhau (56 = 8 × 7).",
        "solution": "**Phương pháp: Dấu hiệu chia hết cho tích hai số nguyên tố cùng nhau (56 = 8 × 7).**\n- Vì 56 = 8 × 7 với ƯCLN(8, 7) = 1, nên số có 10 chữ số A20171221B chia hết cho 56 khi và chỉ khi nó đồng thời chia hết cho cả 8 và 7.\n- Bước 1: Xét tính chia hết cho 8:\n  Một số chia hết cho 8 khi và chỉ khi 3 chữ số tận cùng của nó tạo thành số chia hết cho 8.\n  Ba chữ số tận cùng là 21B = 210 + B = 8 × 26 + (2 + B) = 208 + (2 + B).\n  Để 21B chia hết cho 8, thì (2 + B) phải chia hết cho 8. Vì B là chữ số (0 ≤ B ≤ 9) nên bắt buộc 2 + B = 8 ⇒ B = 6.\n- Bước 2: Xét tính chia hết cho 7:\n  Số đã cho trở thành: A201712216 = A × 10⁹ + 201712216.\n  Ta tìm số dư của các thành phần khi chia cho 7:\n  + 10 chia 7 dư 3 ⇒ 10³ = 1000 chia 7 dư 6 ≡ –1 (mod 7).\n    Do đó: 10⁹ = (10³)³ ≡ (–1)³ ≡ –1 ≡ 6 (mod 7).\n  + Thực hiện phép chia số 201712216 cho 7:\n    201712216 = 7 × 28816030 + 6 (chia cho 7 dư 6).\n  + Do đó, tổng số dư khi chia cho 7 là: A × 6 + 6 = 6 × (A + 1).\n  + Để cả số chia hết cho 7 thì 6 × (A + 1) phải chia hết cho 7. Vì ƯCLN(6, 7) = 1 nên (A + 1) phải chia hết cho 7.\n  + Vì A là chữ số đầu tiên nên 1 ≤ A ≤ 9. Giá trị duy nhất thỏa mãn là A + 1 = 7 ⇒ A = 6.\n- Khi đó, ta có A = 6 và B = 6. Giá trị của tổng A + B là:\n  A + B = 6 + 6 = 12.\n**Đáp số: 12.**"
      },
      {
        "id": 87,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the last digit of $A$ if $A = 1^2 + 2^2 + 3^2 + \\dots + 2017^2$.",
        "questionVi": "Tìm chữ số tận cùng của biểu thức $A$ nếu $A = 1^2 + 2^2 + 3^2 + \\dots + 2017^2$.",
        "image": null,
        "answer": "5",
        "acceptableAnswers": [
          "5"
        ],
        "unit": "",
        "hint": "Quy luật chu kỳ chữ số tận cùng của tổng bình phương.",
        "solution": "**Phương pháp: Quy luật chu kỳ chữ số tận cùng của tổng bình phương.**\n- Ta xét chữ số tận cùng của bình phương các số từ 1 đến 10:\n  1² tận cùng là 1; 2² tận cùng là 4; 3² tận cùng là 9; 4² tận cùng là 6; 5² tận cùng là 5;\n  6² tận cùng là 6; 7² tận cùng là 9; 8² tận cùng là 4; 9² tận cùng là 1; 10² tận cùng là 0.\n- Tổng các chữ số tận cùng của 10 số chính phương liên tiếp là:\n  1 + 4 + 9 + 6 + 5 + 6 + 9 + 4 + 1 + 0 = 45 (tận cùng là 5).\n- Cứ mỗi nhóm 10 số liên tiếp có tổng bình phương tận cùng là 5. Do đó, 2 nhóm liên tiếp (tức 20 số) sẽ có chữ số tận cùng là:\n  5 + 5 = 10 (tận cùng là 0).\n- Như vậy, chữ số tận cùng của tổng bình phương tuần hoàn theo chu kỳ 20 số.\n- Ta phân tích số lượng số hạng: 2017 = 20 × 100 + 17.\n  + 2000 số hạng đầu tiên được chia thành 100 nhóm (mỗi nhóm 20 số) nên tổng của chúng có tận cùng là 0.\n  + 17 số hạng còn lại có chữ số tận cùng tương đương với tổng bình phương từ 1² đến 17²:\n    * 10 số đầu tiên (từ 1² đến 10²) có tổng tận cùng là 5.\n    * 7 số tiếp theo (từ 11² đến 17²) có chữ số tận cùng tương ứng là: 1 + 4 + 9 + 6 + 5 + 6 + 9 = 40 (tận cùng là 0).\n    * Tổng tận cùng của 17 số còn lại là: 5 + 0 = 5.\n- Vậy chữ số tận cùng của biểu thức A là 5.\n**Đáp số: 5.**"
      },
      {
        "id": 88,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "2017 can be written as a product of 1221 positive integers. Find the sum of these 1221 numbers.",
        "questionVi": "Số $2017$ có thể viết thành tích của $1221$ số nguyên dương. Tìm tổng của $1221$ số nguyên dương đó.",
        "image": null,
        "answer": "3237",
        "acceptableAnswers": [
          "3237"
        ],
        "unit": "",
        "hint": "Tính chất số nguyên tố và Phân tích tích thành tổng.",
        "solution": "**Phương pháp: Tính chất số nguyên tố và Phân tích tích thành tổng.**\n- Kiểm tra số 2017: Vì căn bậc hai √(2017) ≈ 44,9. Ta kiểm tra tất cả các số nguyên tố nhỏ hơn 45 gồm: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43. Số 2017 không chia hết cho bất kỳ số nào trong các số trên.\n- Do đó, 2017 là một số nguyên tố.\n- Vì 2017 là số nguyên tố, nên các ước nguyên dương của nó chỉ có đúng 2 số là 1 và 2017.\n- Đề bài cho biết 2017 được viết thành tích của 1221 số nguyên dương:\n  x₁ × x₂ × ... × x₁₂₂₁ = 2017.\n- Vì các thừa số đều là số nguyên dương và 2017 là số nguyên tố, nên bắt buộc trong 1221 số này phải có đúng một số bằng 2017, và tất cả 1220 số còn lại đều phải bằng 1.\n- Tổng của 1221 số nguyên dương đó là:\n  2017 + 1220 × 1 = 2017 + 1220 = 3237.\n**Đáp số: 3237.**"
      },
      {
        "id": 89,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "The remainder of dividing a positive integer $K$ by $17$ is $4$. What is the remainder of dividing $(4K - 13)$ by $17$?",
        "questionVi": "Số nguyên dương $K$ chia cho $17$ có số dư là $4$. Hỏi khi chia biểu thức $(4K - 13)$ cho $17$ thì được số dư là bao nhiêu?",
        "image": null,
        "answer": "3",
        "acceptableAnswers": [
          "3"
        ],
        "unit": "",
        "hint": "Phép chia có dư và Tính chất đồng dư thức (Modulo).",
        "solution": "**Phương pháp: Phép chia có dư và Tính chất đồng dư thức (Modulo).**\n- Đề bài cho số nguyên dương K chia cho 17 có số dư là 4, nghĩa là K có dạng:\n  K = 17 × q + 4 (với q là số tự nhiên, q ≥ 0).\n- Thay biểu thức của K vào biểu thức (4K – 13):\n  4K – 13 = 4 × (17 × q + 4) – 13\n  4K – 13 = 17 × (4q) + 16 – 13\n  4K – 13 = 17 × (4q) + 3.\n- Vì 17 × (4q) chia hết cho 17 và 0 ≤ 3 < 17, nên khi chia (4K – 13) cho 17, ta thu được số dư đúng bằng 3.\n**Đáp số: 3.**"
      },
      {
        "id": 90,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the sum of all positive prime factor(s) of $1221$.",
        "questionVi": "Tìm tổng của tất cả các ước nguyên tố dương của số $1221$.",
        "image": null,
        "answer": "51",
        "acceptableAnswers": [
          "51"
        ],
        "unit": "",
        "hint": "Phân tích một số ra thừa số nguyên tố.",
        "solution": "**Phương pháp: Phân tích một số ra thừa số nguyên tố.**\n- Ta phân tích số 1221 thành tích các thừa số nguyên tố:\n  + Tổng các chữ số: 1 + 2 + 2 + 1 = 6 chia hết cho 3 ⇒ 1221 chia hết cho 3:\n    1221 : 3 = 407.\n  + Xét số 407: Ta có 4 – 0 + 7 = 11 chia hết cho 11 ⇒ 407 chia hết cho 11:\n    407 : 11 = 37.\n  + Số 37 là một số nguyên tố.\n- Vậy dạng phân tích chuẩn tắc ra thừa số nguyên tố của 1221 là:\n  1221 = 3 × 11 × 37.\n- Các ước số dương nguyên tố của 1221 gồm có: 3, 11 và 37.\n- Tổng của tất cả các ước nguyên tố này là:\n  3 + 11 + 37 = 51.\n**Đáp số: 51.**"
      },
      {
        "id": 91,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "How many rectangles are there in the figure below?",
        "questionVi": "Có tất cả bao nhiêu hình chữ nhật trong hình vẽ dưới đây?",
        "image": "images/exam_de4/q16_rectangles.png",
        "answer": "99",
        "acceptableAnswers": [
          "99"
        ],
        "unit": "",
        "hint": "Phân loại đếm hình chữ nhật theo chiều cao (Số hàng).",
        "solution": "**Phương pháp: Phân loại đếm hình chữ nhật theo chiều cao (Số hàng).**\n- Lưới gồm 4 hàng ô vuông với số cột ở mỗi hàng như sau:\n  + Hàng 1 (trên cùng): 5 cột.\n  + Hàng 2: 5 cột.\n  + Hàng 3: 4 cột.\n  + Hàng 4 (dưới cùng): 3 cột.\n- Để đếm chính xác toàn bộ hình chữ nhật, ta phân loại theo chiều cao k (số hàng):\n  + Chiều cao 1 hàng (k = 1):\n    * Trên Hàng 1 (5 cột): Số hình chữ nhật là 5 × (5 + 1) : 2 = 15 (hình).\n    * Trên Hàng 2 (5 cột): Số hình chữ nhật là 5 × (5 + 1) : 2 = 15 (hình).\n    * Trên Hàng 3 (4 cột): Số hình chữ nhật là 4 × (4 + 1) : 2 = 10 (hình).\n    * Trên Hàng 4 (3 cột): Số hình chữ nhật là 3 × (3 + 1) : 2 = 6 (hình).\n    Tổng số hình cao 1 hàng: 15 + 15 + 10 + 6 = 46 (hình).\n  + Chiều cao 2 hàng (k = 2):\n    * Ghép Hàng 1 và 2 (chiều ngang chung 5 cột): 5 × 6 : 2 = 15 (hình).\n    * Ghép Hàng 2 và 3 (chiều ngang chung 4 cột): 4 × 5 : 2 = 10 (hình).\n    * Ghép Hàng 3 và 4 (chiều ngang chung 3 cột): 3 × 4 : 2 = 6 (hình).\n    Tổng số hình cao 2 hàng: 15 + 10 + 6 = 31 (hình).\n  + Chiều cao 3 hàng (k = 3):\n    * Ghép Hàng 1, 2 và 3 (chiều ngang chung 4 cột): 4 × 5 : 2 = 10 (hình).\n    * Ghép Hàng 2, 3 và 4 (chiều ngang chung 3 cột): 3 × 4 : 2 = 6 (hình).\n    Tổng số hình cao 3 hàng: 10 + 6 = 16 (hình).\n  + Chiều cao 4 hàng (k = 4):\n    * Ghép cả 4 hàng 1, 2, 3, 4 (chiều ngang chung 3 cột): 3 × 4 : 2 = 6 (hình).\n    Tổng số hình cao 4 hàng: 6 (hình).\n- Tổng số hình chữ nhật trong hình vẽ là:\n  46 + 31 + 16 + 6 = 99 (hình chữ nhật).\n**Đáp số: 99.**"
      },
      {
        "id": 92,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "In the figure below, the area of rectangle $ABCD$ is $200\\text{ cm}^2$. In the triangle $HEB$, the length of base $HE$ and altitude $HI$ are $9\\text{ cm}$ and $15\\text{ cm}$ respectively. Given that the sum $S(ABF) + S(GBCD) + S(HEGF) = 207.5\\text{ cm}^2$. Find the area of the shaded region in $\\text{cm}^2$.",
        "questionVi": "Trong hình vẽ dưới đây, diện tích của hình chữ nhật $ABCD$ là $200\\text{ cm}^2$. Trong tam giác $HEB$, độ dài cạnh đáy $HE$ và chiều cao $HI$ lần lượt là $9\\text{ cm}$ và $15\\text{ cm}$. Biết rằng tổng diện tích $S(ABF) + S(GBCD) + S(HEGF) = 207{,}5\\text{ cm}^2$. Tính diện tích miền được tô xám theo $\\text{cm}^2$.",
        "image": "images/exam_de4/q17_geometry.png",
        "answer": "30",
        "acceptableAnswers": [
          "30"
        ],
        "unit": "",
        "hint": "Phương pháp bù trừ diện tích / Cộng dồn diện tích các hình giao nhau.",
        "solution": "**Phương pháp: Phương pháp bù trừ diện tích / Cộng dồn diện tích các hình giao nhau.**\n- Theo đề bài, ta có hình chữ nhật ABCD có diện tích là S(ABCD) = 200 cm².\n- Tam giác HEB có đáy HE = 9 cm, chiều cao HI = 15 cm (với HE song song với BC và HI vuông góc với BC). Do đó diện tích tam giác HEB là:\n  S(HEB) = (1/2) × HE × HI = (1/2) × 9 × 15 = 67,5 (cm²).\n- Quan sát hình vẽ và sự phân chia diện tích:\n  + Hình chữ nhật ABCD được chia thành 3 phần: tứ giác ABF, tam giác tô đậm BFG, và tứ giác GBCD.\n    Do đó: S(ABF) + S(BFG) + S(GBCD) = S(ABCD) = 200 cm².\n  + Tam giác HEB được chia thành 2 phần: tứ giác HEGF và tam giác tô đậm BFG.\n    Do đó: S(HEGF) + S(BFG) = S(HEB) = 67,5 cm².\n- Cộng hai đẳng thức diện tích trên lại với nhau theo từng vế:\n  [S(ABF) + S(GBCD) + S(HEGF)] + 2 × S(BFG) = S(ABCD) + S(HEB)\n  [S(ABF) + S(GBCD) + S(HEGF)] + 2 × S(BFG) = 200 + 67,5 = 267,5 cm².\n- Đề bài cho biết tổng của ba phần không tô đậm là: S(ABF) + S(GBCD) + S(HEGF) = 207,5 cm².\n- Thay giá trị này vào đẳng thức, ta được:\n  207,5 + 2 × S(BFG) = 267,5\n  2 × S(BFG) = 267,5 – 207,5 = 60\n  S(BFG) = 60 : 2 = 30 (cm²).\n- Vậy diện tích phần tô đậm là 30 cm².\n**Đáp số: 30.**"
      },
      {
        "id": 93,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "Small cubes with side length $1\\text{ cm}$ are combined according to the pattern shown below, if there are $10$ layers, find the volume (in $\\text{cm}^3$).",
        "questionVi": "Các khối lập phương nhỏ cạnh $1\\text{ cm}$ được ghép lại theo quy luật ở hình dưới đây. Nếu hình khối gồm $10$ tầng, hãy tính thể tích của hình khối đó (theo $\\text{cm}^3$).",
        "image": "images/exam_de4/q18_cubes.png",
        "answer": "1330",
        "acceptableAnswers": [
          "1330"
        ],
        "unit": "",
        "hint": "Quy luật dãy số bình phương số lẻ liên tiếp và Công thức thể tích hình khối.",
        "solution": "**Phương pháp: Quy luật dãy số bình phương số lẻ liên tiếp và Công thức thể tích hình khối.**\n- Quan sát quy luật số khối lập phương ở từng tầng tính từ đỉnh xuống đáy:\n  + Tầng 1 (đỉnh): 1 khối lập phương = 1 × 1 = 1² (khối).\n  + Tầng 2: 3 × 3 khối = 3² = 9 (khối).\n  + Tầng 3: 5 × 5 khối = 5² = 25 (khối).\n  ...\n  + Tầng thứ n: gồm (2n – 1)² khối lập phương.\n- Khi hình khối có 10 tầng (n = 10), tầng thứ 10 có: (2 × 10 – 1)² = 19² = 361 (khối).\n- Tổng số khối lập phương của cả 10 tầng là tổng bình phương của 10 số lẻ liên tiếp đầu tiên:\n  V = 1² + 3² + 5² + 7² + 9² + 11² + 13² + 15² + 17² + 19².\n- Ta có thể tính trực tiếp từng số hạng:\n  V = 1 + 9 + 25 + 49 + 81 + 121 + 169 + 225 + 289 + 361\n  V = (1 + 361) + (9 + 289) + (25 + 225) + (49 + 169) + (81 + 121)\n  V = 362 + 298 + 250 + 218 + 202 = 1330 (khối).\n- (Áp dụng công thức tổng bình phương n số lẻ: S = n × (4n² – 1) / 3. Với n = 10: S = 10 × (400 – 1) / 3 = 10 × 399 / 3 = 1330).\n- Vì mỗi khối lập phương nhỏ có cạnh 1 cm nên thể tích mỗi khối là 1 cm³.\n- Vậy tổng thể tích của cả 10 tầng là 1330 cm³.\n**Đáp số: 1330.**"
      },
      {
        "id": 94,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A big rectangle is formed by $1221$ squares with side length $1\\text{ cm}$. Find the minimum value of the perimeter in $\\text{cm}$.",
        "questionVi": "Một hình chữ nhật lớn được ghép từ $1221$ hình vuông nhỏ cạnh $1\\text{ cm}$. Tìm giá trị nhỏ nhất có thể của chu vi hình chữ nhật lớn đó (theo $\\text{cm}$).",
        "image": null,
        "answer": "140",
        "acceptableAnswers": [
          "140"
        ],
        "unit": "",
        "hint": "Phân tích ước số nguyên để chu vi hình chữ nhật nhỏ nhất (Hiệu hai kích thước nhỏ nhất).",
        "solution": "**Phương pháp: Phân tích ước số nguyên để chu vi hình chữ nhật nhỏ nhất (Hiệu hai kích thước nhỏ nhất).**\n- Hình chữ nhật lớn được ghép từ 1221 hình vuông nhỏ cạnh 1 cm, nên diện tích của hình chữ nhật lớn là 1221 cm².\n- Gọi chiều dài và chiều rộng của hình chữ nhật lớn lần lượt là a và b (cm), với a, b là các số nguyên dương và a ≥ b ≥ 1.\n  Ta có: a × b = 1221.\n- Chu vi hình chữ nhật lớn là: P = 2 × (a + b).\n- Để chu vi P đạt giá trị nhỏ nhất, tổng (a + b) phải nhỏ nhất. Khi tích a × b không đổi, tổng (a + b) nhỏ nhất khi hiệu (a – b) nhỏ nhất, tức là a và b gần nhau nhất (gần giá trị √(1221) ≈ 34,94).\n- Phân tích 1221 ra thừa số nguyên tố: 1221 = 3 × 11 × 37.\n  Các cặp thừa số nguyên dương (a, b) có tích bằng 1221 gồm có:\n  + 1221 × 1 ⇒ a + b = 1222 ⇒ Chu vi = 2444 cm.\n  + 407 × 3 ⇒ a + b = 410 ⇒ Chu vi = 820 cm.\n  + 111 × 11 ⇒ a + b = 122 ⇒ Chu vi = 244 cm.\n  + 37 × 33 ⇒ a + b = 70 ⇒ Chu vi = 2 × 70 = 140 cm.\n- Cặp kích thước a = 37 cm và b = 33 cm cho tổng nhỏ nhất là 70 cm.\n- Vậy giá trị nhỏ nhất có thể của chu vi là: 2 × (37 + 33) = 140 (cm).\n**Đáp số: 140.**"
      },
      {
        "id": 95,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is a square with side length $14$ overlapped by two quarter circles. Find the perimeter of the shaded region. (Take $\\pi = \\frac{22}{7}$).",
        "questionVi": "Hình dưới đây gồm một hình vuông cạnh $14$ bị che bởi hai cung một phần tư hình tròn. Tính chu vi của phần được gạch chéo tô màu. (Lấy $\\pi = \\frac{22}{7}$).",
        "image": "images/exam_de4/q20_shaded_region.png",
        "answer": "44",
        "acceptableAnswers": [
          "44"
        ],
        "unit": "",
        "hint": "Công thức tính độ dài cung tròn và Chu vi miền giới hạn bởi các đường cong.",
        "solution": "**Phương pháp: Công thức tính độ dài cung tròn và Chu vi miền giới hạn bởi các đường cong.**\n- Hình đã cho là hình vuông cạnh 14 cm. Hai cung tròn trong hình là hai cung một phần tư đường tròn có bán kính đúng bằng cạnh hình vuông ($R = 14\\text{ cm}$).\n- Phần tô màu (gạch chéo) là miền chiếc lá được giới hạn bởi chính xác hai cung một phần tư đường tròn này.\n- Chu vi của phần tô màu chính là tổng độ dài của hai cung một phần tư đường tròn bán kính $R = 14\\text{ cm}$:\n  Chu vi = Độ dài cung 1 + Độ dài cung 2.\n- Mỗi cung là $\\frac{1}{4}$ đường tròn, nên tổng độ dài của hai cung bằng:\n  $\\frac{1}{4} \\times (2 \\times \\pi \\times R) + \\frac{1}{4} \\times (2 \\times \\pi \\times R) = \\frac{1}{2} \\times (2 \\times \\pi \\times R) = \\pi \\times R$.\n- Thay $R = 14$ và $\\pi = \\frac{22}{7}$ vào công thức:\n  $\\text{Chu vi} = \\frac{22}{7} \\times 14 = 22 \\times 2 = 44\\text{ (cm)}$.\n**Đáp số: 44.**"
      },
      {
        "id": 96,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 9 steps. David can go up for 1 step or 2 steps each time. The 4th step cannot be stepped on as it is destroyed. How many way(s) is / are there for David to go up the stairs?",
        "questionVi": "Một cầu thang có 9 bậc. David có thể bước lên 1 bậc hoặc 2 bậc mỗi lần. Bậc thứ 4 bị hỏng nên không thể bước vào. Hỏi có bao nhiêu cách để David bước lên hết cầu thang?",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15"
        ],
        "unit": "",
        "hint": "Quy nạp dãy Fibonacci mở rộng (Quy tắc cộng tại điểm nghẽn).",
        "solution": "**Phương pháp: Quy nạp dãy Fibonacci mở rộng (Quy tắc cộng tại điểm nghẽn).**\n- Gọi a(n) là số cách để David bước lên bậc thứ n (với mỗi bước đi được 1 bậc hoặc 2 bậc).\n- Theo quy tắc di chuyển, để đến được bậc thứ n, David có thể bước 1 bước từ bậc (n – 1) hoặc bước 2 bước từ bậc (n – 2). Do đó:\n  a(n) = a(n – 1) + a(n – 2).\n- Thiết lập các bước ban đầu:\n  + Bậc 0 (mặt đất): a(0) = 1 cách.\n  + Bậc 1: a(1) = 1 cách (đi 0 → 1).\n  + Bậc 2: a(2) = a(1) + a(0) = 1 + 1 = 2 cách.\n  + Bậc 3: a(3) = a(2) + a(1) = 2 + 1 = 3 cách.\n- Bậc 4 bị hỏng nên David không thể đặt chân vào bậc 4:\n  ⇒ a(4) = 0 cách.\n- Tính tiếp các bậc từ bậc 5 đến bậc 9:\n  + Bậc 5: Chỉ có thể bước 2 bậc từ bậc 3 tới (vì không thể từ bậc 4 tới):\n    a(5) = a(4) + a(3) = 0 + 3 = 3 cách.\n  + Bậc 6: a(6) = a(5) + a(4) = 3 + 0 = 3 cách.\n  + Bậc 7: a(7) = a(6) + a(5) = 3 + 3 = 6 cách.\n  + Bậc 8: a(8) = a(7) + a(6) = 6 + 3 = 9 cách.\n  + Bậc 9: a(9) = a(8) + a(7) = 9 + 6 = 15 cách.\n- Vậy có tất cả 15 cách để David bước lên hết 9 bậc cầu thang.\n**Đáp số: 15.**"
      },
      {
        "id": 97,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Three boys Bobby, Benson, Benny and three girls Grace, Gloria, Georgia are to be seated in a row. Given that a boy will not sit next to another boy and a girl will not sit next to another girl. Find the number of the combination(s) satisfying the above condition.",
        "questionVi": "Ba bạn nam Bobby, Benson, Benny và ba bạn nữ Grace, Gloria, Georgia ngồi vào một hàng ghế ngang gồm 6 chỗ. Biết rằng không có hai bạn nam nào ngồi cạnh nhau và không có hai bạn nữ nào ngồi cạnh nhau. Hỏi có bao nhiêu cách xếp chỗ thỏa mãn điều kiện trên?",
        "image": null,
        "answer": "72",
        "acceptableAnswers": [
          "72"
        ],
        "unit": "",
        "hint": "Quy tắc đếm hoán vị xen kẽ và Quy tắc nhân xác suất tổ hợp.",
        "solution": "**Phương pháp: Quy tắc đếm hoán vị xen kẽ và Quy tắc nhân xác suất tổ hợp.**\n- Có 3 bạn nam và 3 bạn nữ xếp vào một hàng ngang 6 chỗ ngồi.\n- Để không có hai bạn nam nào ngồi cạnh nhau và không có hai bạn nữ nào ngồi cạnh nhau, các bạn nam và nữ bắt buộc phải ngồi xen kẽ nhau.\n- Có đúng 2 mẫu sắp xếp xen kẽ về mặt giới tính:\n  + Mẫu 1: Nam – Nữ – Nam – Nữ – Nam – Nữ (các vị trí 1, 3, 5 là nam; 2, 4, 6 là nữ).\n  + Mẫu 2: Nữ – Nam – Nữ – Nam – Nữ – Nam (các vị trí 1, 3, 5 là nữ; 2, 4, 6 là nam).\n- Xét Mẫu 1:\n  + Số cách xếp 3 bạn nam khác nhau vào 3 vị trí nam là: 3! = 3 × 2 × 1 = 6 (cách).\n  + Số cách xếp 3 bạn nữ khác nhau vào 3 vị trí nữ là: 3! = 3 × 2 × 1 = 6 (cách).\n  Theo quy tắc nhân, số cách xếp cho Mẫu 1 là: 6 × 6 = 36 (cách).\n- Xét Mẫu 2:\n  + Tương tự, số cách xếp 3 bạn nữ vào 3 vị trí là 6 cách, và 3 bạn nam vào 3 vị trí là 6 cách.\n  Theo quy tắc nhân, số cách xếp cho Mẫu 2 là: 6 × 6 = 36 (cách).\n- Tổng số cách sắp xếp thỏa mãn điều kiện bài toán là:\n  36 + 36 = 72 (cách).\n**Đáp số: 72.**"
      },
      {
        "id": 98,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "In how many possible way(s) can 7 identical balls be distributed to 3 distinct boxes so that every box contains at least one ball?",
        "questionVi": "Có bao nhiêu cách chia 7 quả bóng giống nhau vào 3 chiếc hộp khác nhau sao cho mỗi hộp đều chứa ít nhất một quả bóng?",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15"
        ],
        "unit": "",
        "hint": "Bài toán chia kẹo Euler (Phương pháp vách ngăn - Stars and Bars).",
        "solution": "**Phương pháp: Bài toán chia kẹo Euler (Phương pháp vách ngăn - Stars and Bars).**\n- Cần chia 7 quả bóng giống nhau vào 3 chiếc hộp phân biệt sao cho mỗi hộp đều có ít nhất 1 quả bóng.\n- Cách 1 (Phương pháp vách ngăn):\n  Xếp 7 quả bóng thành một hàng ngang, giữa chúng có 7 – 1 = 6 khoảng trống.\n  Để chia 7 quả bóng thành 3 phần (mỗi phần tương ứng với số bóng trong một hộp), ta cần đặt 2 vách ngăn vào 2 trong số 6 khoảng trống đó.\n  Số cách chọn 2 khoảng trống từ 6 khoảng trống là:\n  (6 × 5) : 2 = 15 (cách).\n- Cách 2 (Liệt kê số học chuẩn Lớp 6):\n  Trước tiên, bỏ vào mỗi hộp 1 quả bóng để đảm bảo hộp nào cũng có bóng. Khi đó số bóng còn lại là: 7 – 3 = 4 (quả bóng).\n  Bây giờ ta chia 4 quả bóng còn lại này vào 3 hộp (mỗi hộp có thể nhận từ 0 đến 4 quả):\n  + Dạng (4, 0, 0): Có 3 cách xếp (cho 4 quả vào hộp 1, 2 hoặc 3).\n  + Dạng (3, 1, 0): Có 3 × 2 = 6 cách xếp.\n  + Dạng (2, 2, 0): Có 3 cách xếp (chọn 1 hộp nhận 0 quả).\n  + Dạng (2, 1, 1): Có 3 cách xếp (chọn 1 hộp nhận 2 quả).\n  Tổng số cách là: 3 + 6 + 3 + 3 = 15 (cách).\n**Đáp số: 15.**"
      },
      {
        "id": 99,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Numbers are drawn from 2017 integers 1 to 2017. At least how many number(s) is / are drawn at random to ensure that there are two numbers whose sum is 2017?",
        "questionVi": "Người ta chọn ngẫu nhiên các số từ 2017 số nguyên liên tiếp từ 1 đến 2017. Hỏi phải lấy ra ít nhất bao nhiêu số để chắc chắn rằng trong các số lấy ra có hai số có tổng bằng 2017?",
        "image": null,
        "answer": "1010",
        "acceptableAnswers": [
          "1010"
        ],
        "unit": "",
        "hint": "Nguyên lý Dirichlet chia cặp đôi có tổng cố định (Pigeonhole Principle).",
        "solution": "**Phương pháp: Nguyên lý Dirichlet chia cặp đôi có tổng cố định (Pigeonhole Principle).**\n- Ta cần chọn các số từ tập hợp 2017 số nguyên {1, 2, 3, ..., 2017} sao cho chắc chắn có hai số có tổng bằng 2017.\n- Ta ghép các số thành từng cặp đôi có tổng đúng bằng 2017:\n  (1, 2016), (2, 2015), (3, 2014), ..., (1008, 1009).\n  Số lượng cặp đôi có tổng bằng 2017 là: 1008 cặp.\n- Số 2017 đứng riêng lẻ một mình vì không có số nguyên dương nào trong tập hợp cộng với 2017 để bằng 2017 (số 0 không thuộc tập hợp).\n- Để tìm số lượng số ít nhất cần lấy ra để CHẮC CHẮN có 2 số tổng bằng 2017, ta phân tích trường hợp xấu nhất (bất lợi nhất) khi lấy ra nhiều số nhất mà KHÔNG có hai số nào có tổng bằng 2017:\n  + Ta lấy số đứng riêng lẻ là 2017: 1 số.\n  + Từ mỗi cặp đôi trong 1008 cặp trên, ta chỉ được phép lấy tối đa 1 số (nếu lấy cả 2 số của một cặp thì tổng sẽ bằng 2017 ngay): 1008 số.\n  Tổng số lượng số tối đa có thể lấy ra trong trường hợp bất lợi nhất là:\n  1 + 1008 = 1009 (số).\n- Theo nguyên lý Dirichlet, nếu ta lấy thêm đúng 1 số nữa (tổng cộng là 1009 + 1 = 1010 số), thì ngoài số 2017, 1009 số còn lại bắt buộc phải rơi vào 1008 cặp đôi trên. Chắc chắn sẽ có ít nhất một cặp đôi bị lấy trọn cả 2 số, và tổng của hai số đó đúng bằng 2017.\n- Vậy số lượng số cần lấy ra ít nhất là: 1009 + 1 = 1010 (số).\n**Đáp số: 1010.**"
      },
      {
        "id": 100,
        "examId": "heat_2017_2018_de4",
        "examIndex": 3,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "If Agnes goes from point A to point B, each step can only move up or move right. How many way(s) is / are there if she must pass through the point O?",
        "questionVi": "Nếu Agnes đi từ điểm A đến điểm B, mỗi bước chỉ có thể đi lên trên hoặc sang phải dọc theo các đoạn đường lưới. Hỏi có bao nhiêu cách đi nếu cô ấy bắt buộc phải đi qua điểm O?",
        "image": "images/exam_de4/q25_grid_paths.png",
        "answer": "21",
        "acceptableAnswers": [
          "21"
        ],
        "unit": "",
        "hint": "Quy tắc cộng đếm đường đi trên lưới tọa độ giao thông (Dynamic Programming).",
        "solution": "**Phương pháp: Quy tắc cộng đếm đường đi trên lưới tọa độ giao thông (Dynamic Programming).**\n- Để đi từ A đến B bắt buộc đi qua điểm O, hành trình được chia thành hai giai đoạn độc lập:\n  Giai đoạn 1: Đi từ điểm A đến điểm O.\n  Giai đoạn 2: Đi từ điểm O đến điểm B.\n  Tổng số cách đi sẽ bằng: (Số cách đi từ A đến O) × (Số cách đi từ O đến B).\n- Giai đoạn 1 (Từ A(0,0) đến O(1,2)):\n  + Từ A đến O cần đi 1 bước sang phải và 2 bước lên trên (tổng cộng 3 bước).\n  + Các đoạn đường trong hình chữ nhật từ A đến O đều đầy đủ không bị khuyết.\n  + Số cách đi từ A đến O là: 3 cách (gồm các hành trình: Phải-Lên-Lên, Lên-Phải-Lên, Lên-Lên-Phải).\n- Giai đoạn 2 (Từ O(1,2) đến B(4,4)):\n  + Điểm O có tọa độ (1, 2) và điểm B có tọa độ (4, 4).\n  + Quan sát hình vẽ, đoạn đường nằm ngang ở tầng y = 2 giữa cột x = 2 và x = 3 bị khuyết (không có đường đi từ (2,2) sang (3,2)).\n  + Ta áp dụng quy tắc cộng số cách đi tới từng giao điểm trên lưới từ điểm O(1,2):\n    * Điểm (1,2) = 1 cách (điểm xuất phát O).\n    * Tầng y = 2:\n      (2,2) = 1 cách (đi từ (1,2) sang).\n      (3,2) = 0 cách (vì đoạn từ (2,2) sang (3,2) bị khuyết).\n      (4,2) = 0 cách.\n    * Tầng y = 3:\n      (1,3) = (1,2) = 1 cách.\n      (2,3) = (1,3) + (2,2) = 1 + 1 = 2 cách.\n      (3,3) = (2,3) + (3,2) = 2 + 0 = 2 cách.\n      (4,3) = (3,3) + (4,2) = 2 + 0 = 2 cách.\n    * Tầng y = 4 (tầng trên cùng chứa B):\n      (1,4) = (1,3) = 1 cách.\n      (2,4) = (1,4) + (2,3) = 1 + 2 = 3 cách.\n      (3,4) = (2,4) + (3,3) = 3 + 2 = 5 cách.\n      (4,4) [Điểm B] = (3,4) + (4,3) = 5 + 2 = 7 cách.\n    Như vậy, số cách đi từ điểm O đến điểm B là 7 cách.\n- Tổng số cách đi từ A đến B qua O là:\n  3 × 7 = 21 (cách).\n**Đáp số: 21.**"
      }
    ]
  },
  {
    "id": "heat_2016_2017_de5",
    "title": "Đề số 5: VCK Quốc gia (2016 – 2017)",
    "titleEn": "Paper 5: National Final Heat Round (2016 – 2017)",
    "year": "2016 – 2017",
    "grade": "Khối 6 / Grade 6",
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
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 1,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are 4 statements on a piece of paper as shown below, and only one of them is correct. Write down the alphabet before the correct statement on the answer sheet.\n  A) There is exactly one incorrect statement.\n  B) There are exactly two correct statements.\n  C) There are exactly three incorrect statements.\n  D) There are exactly four incorrect statements.",
        "questionVi": "Có 4 khẳng định trên một mảnh giấy như dưới đây, và chỉ có duy nhất một khẳng định trong số đó là đúng. Hãy viết chữ cái đứng trước khẳng định đúng vào phiếu trả lời.\n  A) Có chính xác 1 khẳng định sai.\n  B) Có chính xác 2 khẳng định đúng.\n  C) Có chính xác 3 khẳng định sai.\n  D) Có chính xác 4 khẳng định sai.",
        "image": null,
        "answer": "C",
        "acceptableAnswers": [
          "C"
        ],
        "unit": "",
        "hint": "Lập luận logic mệnh đề và suy trừ loại dần.",
        "solution": "**Phương pháp: Lập luận logic mệnh đề và suy trừ loại dần.**\n- Đề bài cho biết: Trên mảnh giấy có tất cả 4 khẳng định, và chỉ có duy nhất một khẳng định trong số đó là đúng (1 đúng).\n- Do tổng số khẳng định là 4, nếu chỉ có 1 khẳng định đúng thì số khẳng định sai bắt buộc phải là:\n  4 – 1 = 3 (khẳng định sai).\n- Bây giờ ta đối chiếu với từng khẳng định trên tờ giấy:\n  + Khẳng định A: 'Có chính xác 1 khẳng định sai.' ⇒ Khẳng định này SAI (vì thực tế có 3 khẳng định sai).\n  + Khẳng định B: 'Có chính xác 2 khẳng định đúng.' ⇒ Khẳng định này SAI (vì đề bài khẳng định chỉ có duy nhất 1 khẳng định đúng).\n  + Khẳng định C: 'Có chính xác 3 khẳng định sai.' ⇒ Khẳng định này ĐÚNG (hoàn toàn phù hợp với lập luận có 3 khẳng định sai ở trên).\n  + Khẳng định D: 'Có chính xác 4 khẳng định sai.' ⇒ Khẳng định này SAI.\n- Vậy chữ cái đứng trước khẳng định đúng duy nhất cần điền vào phiếu trả lời là C.\n**Đáp số: C.**"
      },
      {
        "id": 102,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 2,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "Split $14, 24, 60, 65, 77$, and $143$ into 2 groups of 3 numbers such that the products of numbers in both groups are equal. Find the sum of all numbers in the group that contains $14$.",
        "questionVi": "Chia các số $14, 24, 60, 65, 77$ và $143$ thành 2 nhóm, mỗi nhóm gồm 3 số sao cho tích các số ở hai nhóm bằng nhau. Tìm tổng của tất cả các số trong nhóm có chứa số $14$.",
        "image": null,
        "answer": "217",
        "acceptableAnswers": [
          "217"
        ],
        "unit": "",
        "hint": "Phân tích ra thừa số nguyên tố và cân bằng tích hai nhóm.",
        "solution": "**Phương pháp: Phân tích ra thừa số nguyên tố và cân bằng tích hai nhóm.**\n- Phân tích 6 số đã cho ra thừa số nguyên tố:\n  + 14 = 2 × 7\n  + 24 = 2³ × 3\n  + 60 = 2² × 3 × 5\n  + 65 = 5 × 13\n  + 77 = 7 × 11\n  + 143 = 11 × 13\n- Tích của cả 6 số này là:\n  P = (2 × 7) × (2³ × 3) × (2² × 3 × 5) × (5 × 13) × (7 × 11) × (11 × 13)\n  P = 2⁶ × 3² × 5² × 7² × 11² × 13².\n- Vì 6 số được chia thành 2 nhóm có tích bằng nhau, nên tích của mỗi nhóm gồm 3 số phải bằng:\n  P_nhóm = 2³ × 3 × 5 × 7 × 11 × 13 = 120,120.\n- Ta xác định các số thuộc nhóm chứa số 14:\n  + Trong 6 số, chỉ có đúng hai số chứa thừa số nguyên tố 7 là 14 (2 × 7) và 77 (7 × 11). Do đó, số 77 bắt buộc phải thuộc nhóm kia, không thể cùng nhóm với 14.\n  + Trong 6 số, chỉ có đúng hai số chứa thừa số nguyên tố 11 là 77 (7 × 11) và 143 (11 × 13). Do số 77 nằm ở nhóm kia nên để nhóm chứa 14 có thừa số nguyên tố 11, số 143 bắt buộc phải nằm cùng nhóm với 14.\n  + Hiện tại, nhóm chứa 14 đã có 2 số là 14 và 143. Tích của hai số này là:\n    14 × 143 = (2 × 7) × (11 × 13) = 2 × 7 × 11 × 13.\n  + Để tích của nhóm đạt đúng P_nhóm = 2³ × 3 × 5 × 7 × 11 × 13, số thứ ba trong nhóm bắt buộc phải là:\n    (2³ × 3 × 5 × 7 × 11 × 13) : (2 × 7 × 11 × 13) = 2² × 3 × 5 = 60.\n- Như vậy, nhóm chứa số 14 gồm 3 số: 14, 60 và 143 (nhóm còn lại gồm 24, 65, 77).\n- Tổng của tất cả các số trong nhóm chứa 14 là:\n  14 + 60 + 143 = 217.\n**Đáp số: 217.**"
      },
      {
        "id": 103,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 3,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "A cricket has $6$ legs and a spider has $8$ legs. There are $12$ animals and $90$ legs. Find the number of spiders.",
        "questionVi": "Một con dế có $6$ chân và một con nhện có $8$ chân. Có tất cả $12$ con vật và $90$ cái chân. Tìm số con nhện.",
        "image": null,
        "answer": "9",
        "acceptableAnswers": [
          "9"
        ],
        "unit": "",
        "hint": "Phương pháp Giả thiết tạm (Bài toán Gà - Thỏ).",
        "solution": "**Phương pháp: Phương pháp Giả thiết tạm (Bài toán Gà - Thỏ).**\n- Một con dế có 6 chân, một con nhện có 8 chân.\n- Giả sử cả 12 con vật đều là dế.\n- Khi đó, tổng số chân của 12 con vật sẽ là:\n  12 × 6 = 72 (chân).\n- Số chân bị hụt so với thực tế là:\n  90 – 72 = 18 (chân).\n- Sự thiếu hụt này xuất hiện vì ta đã thay thế mỗi con nhện bằng một con dế. Mỗi con nhện có nhiều hơn một con dế số chân là:\n  8 – 6 = 2 (chân).\n- Do đó, số lượng con nhện là:\n  18 : 2 = 9 (con nhện).\n- (Số con dế là: 12 – 9 = 3 con. Kiểm tra: 3 × 6 + 9 × 8 = 18 + 72 = 90 chân, hoàn toàn chính xác).\n**Đáp số: 9.**"
      },
      {
        "id": 104,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 4,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "John wrote a 3-digit number on a piece of paper and asked Peter to guess it.\nPeter asked: “Is the number 123?”\nJohn replied: “One of the digits is correct, the position of that digit is also correct.”\nPeter asked again: “Is the number 456?”\nJohn replied: “Two digits are correct, but the positions of those digits are both wrong.”\nPeter asked again: “Is the number 354?”\nJohn said: “All three digits are correct, but the digits are all in the wrong places.”\nWhat is the number written by John?",
        "questionVi": "John viết một số có 3 chữ số lên một mảnh giấy và bảo Peter đoán số đó.\nPeter hỏi: “Có phải số 123 không?”\nJohn trả lời: “Có một chữ số đúng, và vị trí của chữ số đó cũng đúng.”\nPeter hỏi tiếp: “Có phải số 456 không?”\nJohn trả lời: “Có hai chữ số đúng, nhưng vị trí của cả hai chữ số đó đều sai.”\nPeter lại hỏi: “Có phải số 354 không?”\nJohn nói: “Cả ba chữ số đều đúng, nhưng các chữ số đều ở sai vị trí.”\nHỏi số John đã viết là số nào?",
        "image": null,
        "answer": "543",
        "acceptableAnswers": [
          "543"
        ],
        "unit": "",
        "hint": "Suy luận logic ma trận vị trí chữ số và phương pháp loại trừ dần.",
        "solution": "**Phương pháp: Suy luận logic ma trận vị trí chữ số và phương pháp loại trừ dần.**\n- Gọi số có 3 chữ số mà John viết ra là abc (với a, b, c là các chữ số, a ≠ 0).\n- Phân tích lần đoán thứ 3 của Peter: 'Có phải số 354 không?'\n  John nói: 'Cả ba chữ số đều đúng, nhưng đều ở sai vị trí.'\n  Từ câu trả lời này ta rút ra 2 kết luận then chốt:\n  1) Tập hợp 3 chữ số của số cần tìm chính là {3, 4, 5}.\n  2) Vị trí các chữ số: hàng trăm a ≠ 3, hàng chục b ≠ 5, hàng đơn vị c ≠ 4.\n- Phân tích lần đoán thứ 1 của Peter: 'Có phải số 123 không?'\n  John trả lời: 'Có một chữ số đúng, và vị trí của chữ số đó cũng đúng.'\n  Trong tập {1, 2, 3}, chỉ có duy nhất chữ số 3 thuộc tập {3, 4, 5}. Do đó, chữ số đúng duy nhất chính là 3.\n  Vì vị trí của chữ số 3 là đúng, mà trong số 123 chữ số 3 ở hàng đơn vị (vị trí thứ ba), nên số cần tìm chắc chắn có chữ số hàng đơn vị là c = 3.\n- Xác định hai chữ số hàng trăm (a) và hàng chục (b):\n  Hai chữ số còn lại từ tập {3, 4, 5} là 4 và 5.\n  Theo kết luận từ lần đoán thứ 3, hàng chục không thể là 5 (b ≠ 5).\n  Do đó, chữ số hàng chục bắt buộc phải là b = 4.\n  Suy ra chữ số hàng trăm bắt buộc là a = 5 (thỏa mãn điều kiện a ≠ 3).\n- Kiểm tra lại với lần đoán thứ 2: 'Có phải số 456 không?'\n  Số 456 có 2 chữ số thuộc {3, 4, 5} là 4 và 5 (đúng 2 chữ số). Trong số 456, chữ số 4 ở hàng trăm (sai vì trong 543 thì 4 ở hàng chục), chữ số 5 ở hàng chục (sai vì trong 543 thì 5 ở hàng trăm). Cả hai vị trí đều sai, hoàn toàn khớp với câu trả lời của John!\n- Vậy số có 3 chữ số do John viết ra là 543.\n**Đáp số: 543.**"
      },
      {
        "id": 105,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 5,
        "category": "Tư duy logic",
        "categoryEn": "Logical Thinking",
        "categoryId": "logic",
        "questionEn": "There are 51 students in Grade 6. Among them, there are 22, 17 and 18 students who like playing basketball, volleyball and football respectively. There are 5 students like playing basketball and volleyball; 9 students like playing volleyball and football; 10 students like playing basketball and football. 3 students like all three ball games. Find the number of students who likes none of the ball games.",
        "questionVi": "Khối 6 có 51 học sinh. Trong đó có lần lượt 22, 17 và 18 học sinh thích chơi bóng rổ, bóng chuyền và bóng đá. Có 5 học sinh thích cả bóng rổ và bóng chuyền; 9 học sinh thích cả bóng chuyền và bóng đá; 10 học sinh thích cả bóng rổ và bóng đá. Có 3 học sinh thích cả ba môn bóng. Tìm số học sinh không thích môn bóng nào trong ba môn trên.",
        "image": null,
        "answer": "15",
        "acceptableAnswers": [
          "15"
        ],
        "unit": "",
        "hint": "Biểu đồ Ven và Nguyên lý bao hàm - loại trừ (Inclusion - Exclusion Principle).",
        "solution": "**Phương pháp: Biểu đồ Ven và Nguyên lý bao hàm - loại trừ (Inclusion - Exclusion Principle).**\n- Gọi B, V, F lần lượt là tập hợp các học sinh thích bóng rổ (Basketball), bóng chuyền (Volleyball) và bóng đá (Football).\n- Theo đề bài, ta có:\n  + Số học sinh thích bóng rổ: |B| = 22.\n  + Số học sinh thích bóng chuyền: |V| = 17.\n  + Số học sinh thích bóng đá: |F| = 18.\n  + Thích cả bóng rổ và bóng chuyền: |B ∩ V| = 5.\n  + Thích cả bóng chuyền và bóng đá: |V ∩ F| = 9.\n  + Thích cả bóng rổ và bóng đá: |B ∩ F| = 10.\n  + Thích cả ba môn bóng: |B ∩ V ∩ F| = 3.\n- Số lượng học sinh thích ít nhất một trong ba môn bóng là:\n  |B ∪ V ∪ F| = |B| + |V| + |F| – (|B ∩ V| + |V ∩ F| + |B ∩ F|) + |B ∩ V ∩ F|\n  |B ∪ V ∪ F| = 22 + 17 + 18 – (5 + 9 + 10) + 3\n  |B ∪ V ∪ F| = 57 – 24 + 3 = 36 (học sinh).\n- Tổng số học sinh khối 6 là 51 em. Vậy số học sinh không thích bất kỳ môn bóng nào trong ba môn trên là:\n  51 – 36 = 15 (học sinh).\n**Đáp số: 15.**"
      },
      {
        "id": 106,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 6,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $2 + 6 + 18 + 54 + 162 + 486 + 1458 + 4374 + 13122 + 39366 + 118098$.",
        "questionVi": "Tìm giá trị của $2 + 6 + 18 + 54 + 162 + 486 + 1458 + 4374 + 13122 + 39366 + 118098$.",
        "image": null,
        "answer": "177,146",
        "acceptableAnswers": [
          "177,146",
          "177146"
        ],
        "unit": "",
        "hint": "Phương pháp sai phân tổng cấp số nhân (Nhân cả hai vế với công bội q = 3).",
        "solution": "**Phương pháp: Phương pháp sai phân tổng cấp số nhân (Nhân cả hai vế với công bội q = 3).**\n- Đặt biểu thức cần tính là:\n  S = 2 + 6 + 18 + 54 + 162 + 486 + 1458 + 4374 + 13122 + 39366 + 118098.\n- Nhận xét: Mỗi số hạng đứng sau đều gấp 3 lần số hạng đứng liền trước nó (6 = 2 × 3; 18 = 6 × 3; ...; 118098 = 39366 × 3).\n- Nhân cả hai vế của S với 3, ta được:\n  3 × S = 3 × (2 + 6 + 18 + 54 + ... + 118098)\n  3 × S = 6 + 18 + 54 + 162 + ... + 118098 + (118098 × 3)\n  3 × S = 6 + 18 + 54 + 162 + ... + 118098 + 354294.\n- Lấy (3 × S) trừ đi S theo từng vế:\n  3 × S – S = (6 + 18 + ... + 118098 + 354294) – (2 + 6 + 18 + ... + 118098)\n  2 × S = 354294 – 2\n  2 × S = 354292\n  S = 354292 : 2 = 177,146.\n**Đáp số: 177,146.**"
      },
      {
        "id": 107,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 7,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Calculate $1285^2 - 285^2$.",
        "questionVi": "Tính $1285^2 - 285^2$.",
        "image": null,
        "answer": "1,570,000",
        "acceptableAnswers": [
          "1,570,000",
          "1570000"
        ],
        "unit": "",
        "hint": "Hằng đẳng thức hiệu hai bình phương a² – b² = (a – b)(a + b).",
        "solution": "**Phương pháp: Hằng đẳng thức hiệu hai bình phương a² – b² = (a – b)(a + b).**\n- Áp dụng hằng đẳng thức hiệu hai bình phương với a = 1285 và b = 285:\n  1285² – 285² = (1285 – 285) × (1285 + 285).\n- Tính giá trị trong từng ngoặc đơn:\n  + Ngoặc thứ nhất: 1285 – 285 = 1000.\n  + Ngoặc thứ hai: 1285 + 285 = 1570.\n- Nhân hai kết quả lại với nhau:\n  1000 × 1570 = 1,570,000.\n**Đáp số: 1,570,000.**"
      },
      {
        "id": 108,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 8,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $1 + 4 + 5 + 9 + \\dots + 157 + 254 + 411$. (Remark: Starting from the third number, each number is the sum of the previous two numbers.)",
        "questionVi": "Tìm giá trị của $1 + 4 + 5 + 9 + \\dots + 157 + 254 + 411$. (Chú thích: Bắt đầu từ số thứ ba, mỗi số đều bằng tổng của hai số đứng liền trước nó.)",
        "image": null,
        "answer": "1,072",
        "acceptableAnswers": [
          "1,072",
          "1072"
        ],
        "unit": "",
        "hint": "Quy luật tổng dãy số kiểu Fibonacci (Sai phân số hạng tổng quát).",
        "solution": "**Phương pháp: Quy luật tổng dãy số kiểu Fibonacci (Sai phân số hạng tổng quát).**\n- Ta có dãy số: 1, 4, 5, 9, 14, 23, 37, 60, 97, 157, 254, 411.\n  Quy luật: Bắt đầu từ số thứ ba, mỗi số đều bằng tổng hai số đứng liền trước nó:\n  a(1) = 1; a(2) = 4;\n  a(3) = 1 + 4 = 5;\n  a(4) = 4 + 5 = 9;\n  a(5) = 5 + 9 = 14;\n  a(6) = 9 + 14 = 23;\n  a(7) = 14 + 23 = 37;\n  a(8) = 23 + 37 = 60;\n  a(9) = 37 + 60 = 97;\n  a(10) = 60 + 97 = 157;\n  a(11) = 97 + 157 = 254;\n  a(12) = 157 + 254 = 411.\n- Dãy gồm đúng 12 số hạng.\n- Cách 1 (Cộng dồn tuần tự):\n  S = 1 + 4 + 5 + 9 + 14 + 23 + 37 + 60 + 97 + 157 + 254 + 411\n  = (1 + 4 + 5 + 9) + (14 + 23 + 37) + (60 + 97) + (157 + 254 + 411)\n  = 19 + 74 + 157 + 822 = 1,072.\n- Cách 2 (Công thức tổng dãy kiểu Fibonacci):\n  Với mọi dãy a(n) thỏa mãn a(n) = a(n-1) + a(n-2), ta có a(n) = a(n+2) – a(n+1).\n  Cộng dồn từ n = 1 đến 12, ta được: S(12) = a(14) – a(2).\n  Tính tiếp: a(13) = 254 + 411 = 665; a(14) = 411 + 665 = 1076.\n  Vậy tổng là: S = 1076 – 4 = 1,072.\n**Đáp số: 1,072.**"
      },
      {
        "id": 109,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 9,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Find the value of $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\frac{1}{30} + \\frac{1}{42} + \\frac{1}{56}$.",
        "questionVi": "Tìm giá trị của $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\frac{1}{30} + \\frac{1}{42} + \\frac{1}{56}$.",
        "image": null,
        "answer": "$\\frac{7}{8}$",
        "acceptableAnswers": [
          "\\frac{7}{8}",
          "7/8",
          "7 / 8",
          "0.875"
        ],
        "unit": "",
        "hint": "Sai phân triệt tiêu phân số (Telescoping Sum).",
        "solution": "**Phương pháp: Sai phân triệt tiêu phân số (Telescoping Sum).**\n- Nhận xét mẫu số của các phân số đều là tích của hai số tự nhiên liên tiếp:\n  2 = 1 × 2;  6 = 2 × 3;  12 = 3 × 4;  20 = 4 × 5;  30 = 5 × 6;  42 = 6 × 7;  56 = 7 × 8.\n- Áp dụng công thức sai phân: $\\frac{1}{n(n + 1)} = \\frac{1}{n} - \\frac{1}{n + 1}$.\n- Tách từng phân số trong biểu thức:\n  + $\\frac{1}{2} = 1 - \\frac{1}{2}$\n  + $\\frac{1}{6} = \\frac{1}{2} - \\frac{1}{3}$\n  + $\\frac{1}{12} = \\frac{1}{3} - \\frac{1}{4}$\n  + $\\frac{1}{20} = \\frac{1}{4} - \\frac{1}{5}$\n  + $\\frac{1}{30} = \\frac{1}{5} - \\frac{1}{6}$\n  + $\\frac{1}{42} = \\frac{1}{6} - \\frac{1}{7}$\n  + $\\frac{1}{56} = \\frac{1}{7} - \\frac{1}{8}$\n- Cộng tất cả các phân số lại với nhau, các số hạng trung gian liên tiếp triệt tiêu lẫn nhau từng đôi một:\n  $S = (1 - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + ... + (\\frac{1}{7} - \\frac{1}{8})$\n  $S = 1 - \\frac{1}{8} = \\frac{7}{8}$.\n**Đáp số: $\\frac{7}{8}$.**"
      },
      {
        "id": 110,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 10,
        "category": "Số học",
        "categoryEn": "Arithmetic",
        "categoryId": "arithmetic",
        "questionEn": "Convert $0.78686...$ ($0.7(86)$) into the simplest fraction.",
        "questionVi": "Đổi số thập phân vô hạn tuần hoàn $0.7(86) = 0.78686...$ thành phân số tối giản.",
        "image": null,
        "answer": "$\\frac{779}{990}$",
        "acceptableAnswers": [
          "\\frac{779}{990}",
          "779/990",
          "779 / 990",
          "0.7869"
        ],
        "unit": "",
        "hint": "Chuyển đổi số thập phân vô hạn tuần hoàn tạp sang phân số tối giản.",
        "solution": "**Phương pháp: Chuyển đổi số thập phân vô hạn tuần hoàn tạp sang phân số tối giản.**\n- Đặt $x = 0.7(86) = 0.7868686...$\n- Số thập phân này có phần không tuần hoàn gồm 1 chữ số (chữ số 7) và phần chu kỳ tuần hoàn gồm 2 chữ số (chu kỳ 86).\n- Thực hiện nhân x với các lũy thừa của 10 để đưa phần tuần hoàn về cùng vị trí sau dấu phẩy:\n  + Nhân x với 10: $10x = 7.868686...$\n  + Nhân x với 1000: $1000x = 786.868686...$\n- Lấy phương trình thứ hai trừ đi phương trình thứ nhất:\n  $1000x - 10x = 786.868686... - 7.868686...$\n  $990x = 786 - 7$\n  $990x = 779$\n  $x = \\frac{779}{990}$.\n- Kiểm tra tính tối giản: $990 = 2 \\times 3^2 \\times 5 \\times 11$. Số 779 không chia hết cho 2, 3 (tổng chữ số 23), 5, và $779 = 11 \\times 70 + 9$ (không chia hết cho 11). Do đó phân số $\\frac{779}{990}$ đã tối giản.\n**Đáp số: $\\frac{779}{990}$.**"
      },
      {
        "id": 111,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 11,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Find the sum of all positive factors of $2018$.",
        "questionVi": "Tìm tổng của tất cả các ước số nguyên dương của số $2018$.",
        "image": null,
        "answer": "3,030",
        "acceptableAnswers": [
          "3,030",
          "3030"
        ],
        "unit": "",
        "hint": "Phân tích ra thừa số nguyên tố và áp dụng công thức tính tổng ước số.",
        "solution": "**Phương pháp: Phân tích ra thừa số nguyên tố và áp dụng công thức tính tổng ước số.**\n- Phân tích số 2018 ra thừa số nguyên tố:\n  2018 : 2 = 1009.\n  Số 1009 là số nguyên tố (vì căn bậc hai của 1009 xấp xỉ 31,7; thử chia cho các số nguyên tố nhỏ hơn 32 gồm 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 đều không chia hết).\n  Do đó: 2018 = 2¹ × 1009¹.\n- Tập hợp tất cả các ước số nguyên dương của 2018 là: {1, 2, 1009, 2018}.\n- Tổng của tất cả các ước số nguyên dương là:\n  S = 1 + 2 + 1009 + 2018\n  S = (1 + 2) + (1009 + 2018) = 3 + 3027 = 3,030.\n  (Hoặc theo công thức: (1 + 2) × (1 + 1009) = 3 × 1010 = 3,030).\n**Đáp số: 3,030.**"
      },
      {
        "id": 112,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 12,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "When a natural number is divided by $20$, the remainder is $4$. When the number is divided by $39$, the remainder is also $4$. When that number is divided by $65$, what is the remainder?",
        "questionVi": "Khi một số tự nhiên chia cho $20$ thì dư $4$. Khi số đó chia cho $39$ thì số dư cũng là $4$. Hỏi khi số đó chia cho $65$ thì số dư là bao nhiêu?",
        "image": null,
        "answer": "4",
        "acceptableAnswers": [
          "4"
        ],
        "unit": "",
        "hint": "Lý thuyết đồng dư và Bội chung nhỏ nhất (BCNN).",
        "solution": "**Phương pháp: Lý thuyết đồng dư và Bội chung nhỏ nhất (BCNN).**\n- Gọi số tự nhiên cần tìm là $N$.\n- Theo đề bài:\n  + $N$ chia cho $20$ dư $4 \\Rightarrow (N - 4)$ chia hết cho $20$.\n  + $N$ chia cho $39$ dư $4 \\Rightarrow (N - 4)$ chia hết cho $39$.\n- Vì $(N - 4)$ vừa chia hết cho $20$, vừa chia hết cho $39$ nên $(N - 4)$ là bội chung của $20$ và $39$.\n- Ta tìm $\\text{BCNN}(20, 39)$:\n  $20 = 2^2 \\times 5$;  $39 = 3 \\times 13$. Vì $\\text{ƯCLN}(20, 39) = 1$ nên:\n  $\\text{BCNN}(20, 39) = 20 \\times 39 = 780$.\n- Do đó, $(N - 4)$ chia hết cho $780$, nghĩa là $(N - 4) = 780 \\times k$ (với $k$ là số tự nhiên).\n- Xét khi chia số $N$ cho $65$:\n  Ta nhận thấy $780 : 65 = 12$ (chia hết), tức là $780 = 65 \\times 12$.\n  Khi đó: $N = 780 \\times k + 4 = 65 \\times (12 \\times k) + 4$.\n- Vì $65 \\times (12 \\times k)$ chia hết cho $65$ và $4 < 65$, nên khi $N$ chia cho $65$ số dư chắc chắn là $4$.\n**Đáp số: 4.**"
      },
      {
        "id": 113,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 13,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "Split $9$ into some positive integers so that the product among those numbers is the largest. Find the value of that product.",
        "questionVi": "Tách số $9$ thành tổng của một số số nguyên dương sao cho tích của các số đó là lớn nhất. Tìm giá trị của tích đó.",
        "image": null,
        "answer": "27",
        "acceptableAnswers": [
          "27"
        ],
        "unit": "",
        "hint": "Liệt kê và chia trường hợp số các số hạng.",
        "solution": "**Phương pháp: Liệt kê và chia trường hợp số các số hạng.**\n- Để tích các số là lớn nhất, ta xét các trường hợp tách số 9 thành tổng các số nguyên dương:\n  + Trường hợp 1: Tách thành 2 số:\n    Để tích lớn nhất, hai số phải gần nhau nhất: $9 = 4 + 5$.\n    Tích lớn nhất là: $4 \\times 5 = 20$.\n  + Trường hợp 2: Tách thành 3 số:\n    Để tích lớn nhất, các số bằng nhau: $9 = 3 + 3 + 3$.\n    Tích lớn nhất là: $3 \\times 3 \\times 3 = 27$.\n  + Trường hợp 3: Tách thành 4 số:\n    Để tích lớn nhất, các số là: $9 = 2 + 2 + 2 + 3$.\n    Tích lớn nhất là: $2 \\times 2 \\times 2 \\times 3 = 24$.\n  + Không tách thành 5 số trở lên (vì tổng 5 số nhỏ nhất không chứa số 1 đã là $2 + 2 + 2 + 2 + 2 = 10 > 9$, nên nếu tách thành 5 số thì bắt buộc phải có số 1, mà khi nhân với 1 thì tích không tăng).\n- So sánh tích ở các trường hợp: $27 > 24 > 20$.\n- Vậy giá trị lớn nhất của tích là $27$.\n**Đáp số: 27.**"
      },
      {
        "id": 114,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 14,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "When a 4-digit positive integer is divided by $3$, $11$, or $61$ the remainders are all $2$. Find the least possible value of it.",
        "questionVi": "Khi một số nguyên dương có 4 chữ số chia cho $3$, $11$ hoặc $61$ thì các số dư đều là $2$. Tìm giá trị nhỏ nhất có thể của số đó.",
        "image": null,
        "answer": "2,015",
        "acceptableAnswers": [
          "2,015",
          "2015"
        ],
        "unit": "",
        "hint": "Bội chung nhỏ nhất và bài toán tìm số tự nhiên theo điều kiện chia hết.",
        "solution": "**Phương pháp: Bội chung nhỏ nhất và bài toán tìm số tự nhiên theo điều kiện chia hết.**\n- Gọi số nguyên dương có 4 chữ số cần tìm là $N$ (với $1000 \\le N \\le 9999$).\n- Theo giả thiết:\n  $N$ chia cho $3, 11$ và $61$ đều có số dư là $2$.\n  $\\Rightarrow (N - 2)$ chia hết cho cả $3, 11$ và $61$.\n- Vì $3, 11$ và $61$ đều là các số nguyên tố đôi một cùng nhau, nên:\n  $\\text{BCNN}(3, 11, 61) = 3 \\times 11 \\times 61 = 33 \\times 61 = 2013$.\n- Do đó, $(N - 2)$ là bội của $2013$, tức là:\n  $N - 2 = 2013 \\times k$  (với $k$ là số nguyên dương).\n  $\\Rightarrow N = 2013 \\times k + 2$.\n- Để $N$ là số có 4 chữ số nhỏ nhất có thể, ta chọn giá trị nguyên dương nhỏ nhất của k:\n  + Với $k = 1$: $N = 2013 \\times 1 + 2 = 2015$ (thỏa mãn là số có 4 chữ số: $1000 \\le 2015 \\le 9999$).\n- Vậy giá trị nhỏ nhất có thể của số đó là 2015.\n**Đáp số: 2,015.**"
      },
      {
        "id": 115,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 15,
        "category": "Lý thuyết số",
        "categoryEn": "Number Theory",
        "categoryId": "number_theory",
        "questionEn": "A page has been torn from a book with even number of pages. The sum of page numbers of the remaining pages is $761$. Find the sum of two page numbers written on the torn page.",
        "questionVi": "Một tờ giấy bị xé ra khỏi một cuốn sách có tổng số trang là một số chẵn. Tổng các số trang của các trang còn lại là $761$. Tìm tổng của hai số trang được ghi trên tờ giấy bị xé đó.",
        "image": null,
        "answer": "59",
        "acceptableAnswers": [
          "59"
        ],
        "unit": "",
        "hint": "Phương pháp chặn miền giá trị và tính chất tổng trang sách.",
        "solution": "**Phương pháp: Phương pháp chặn miền giá trị và tính chất tổng trang sách.**\n- Một tờ giấy trong cuốn sách gồm 2 trang liên tiếp: một trang lẻ $(2k - 1)$ ở mặt trước và một trang chẵn $2k$ ở mặt sau.\n  Tổng số trang của tờ giấy bị xé là: $(2k - 1) + 2k = 4k - 1$ (là một số lẻ).\n- Gọi tổng số trang của cuốn sách ban đầu là N (N là số chẵn, $N \\ge 2$).\n  Tổng số trang ban đầu của cả cuốn sách là: $S = 1 + 2 + 3 + ... + N = \\frac{N(N + 1)}{2}$.\n- Tổng số trang của các trang còn lại là 761, suy ra:\n  $\\frac{N(N + 1)}{2} - (4k - 1) = 761$\n  $\\Rightarrow \\frac{N(N + 1)}{2} = 761 + (4k - 1)$.\n- Vì hai trang bị xé nằm trong cuốn sách có N trang nên tổng hai trang này thỏa mãn:\n  $(1 + 2) \\le (4k - 1) \\le (N - 1) + N$\n  $3 \\le (4k - 1) \\le 2N - 1$.\n- Ta thực hiện chặn giá trị của N:\n  + $\\frac{N(N + 1)}{2} \\\\ge 761 + 3 = 764 \\\\Rightarrow N(N + 1) \\\\ge 1528$.\n    Ta có: $38 \\times 39 = 1482 < 1528$;  $39 \\times 40 = 1560 > 1528$.\n    Vì N là số chẵn nên $N \\ge 40$.\n  + Xét $N = 40$ (số chẵn):\n    Tổng tất cả các trang của cuốn sách là: $(40 \\times 41) : 2 = 820$.\n    Tổng 2 số trang bị xé là: $820 - 761 = 59$.\n    Kiểm tra: 59 là số lẻ, $59 = 4 \\times 15 - 1$ (thỏa mãn dạng $4k - 1$ với $k = 15$).\n    Hai trang bị xé là 29 và 30 ($29 + 30 = 59$, và $1 \\le 29 < 30 \\le 40$, hoàn toàn chính xác).\n  + Xét $N = 42$ (số chẵn tiếp theo):\n    Tổng các trang là: $(42 \\times 43) : 2 = 903$.\n    Tổng 2 số trang bị xé là: $903 - 761 = 142$ (là số chẵn, bị loại vì tổng trang lẻ + chẵn phải là số lẻ).\n  + Với $N \\ge 44$:\n    Khi $N = 44$, tổng trang là $(44 \\times 45) : 2 = 990 \\Rightarrow$ số trang bị xé là $990 - 761 = 229 > 2N - 1 = 87$ (vô lý).\n- Vậy tổng hai số trang ghi trên tờ giấy bị xé là 59.\n**Đáp số: 59.**"
      },
      {
        "id": 116,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 16,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The perimeter of the shaded region in the attached figure is formed by arcs of 3 semi-circles, the diameters of those semi-circles are $13\\text{ m}$, $50\\text{ m}$ and $63\\text{ m}$. Given that the 3 centers of the circles lie on the dotted line in the figure, find the perimeter of the shaded region in meter. (Take $\\pi = \\frac{22}{7}$).",
        "questionVi": "Chu vi của miền được tô đậm trong hình vẽ đính kèm được tạo bởi các cung của 3 nửa đường tròn, đường kính của ba nửa đường tròn đó lần lượt là $13\\text{ m}$, $50\\text{ m}$ và $63\\text{ m}$. Biết rằng tâm của cả 3 đường tròn đều nằm trên đường nét đứt trong hình, hãy tìm chu vi của miền được tô đậm theo mét. (Lấy $\\pi = \\frac{22}{7}$).",
        "image": "images/exam_de5/q16_semicircles.png",
        "answer": "198",
        "acceptableAnswers": [
          "198"
        ],
        "unit": "",
        "hint": "Công thức chu vi cung tròn và tính chất cộng độ dài đường kính.",
        "solution": "**Phương pháp: Công thức chu vi cung tròn và tính chất cộng độ dài đường kính.**\n- Quan sát hình vẽ, chu vi của miền được tô đậm gồm đúng 3 đường cong khép kín:\n  1) Cung nửa đường tròn lớn phía trên có đường kính $d_1 = 63\\text{m}$.\n  2) Cung nửa đường tròn nhỡ phía dưới bên trái có đường kính $d_2 = 50\\text{m}$.\n  3) Cung nửa đường tròn nhỏ phía dưới bên phải có đường kính $d_3 = 13\\text{m}$.\n  (Nhận thấy $d_2 + d_3 = 50 + 13 = 63\\text{m} = d_1$, ba đường kính này cùng nằm trên đường nét đứt).\n- Độ dài của một cung nửa đường tròn đường kính d là: $L = \\frac{\\pi \\times d}{2}$.\n- Tổng chu vi của miền tô đậm chính là tổng độ dài của cả 3 cung nửa đường tròn này:\n  $P = \\frac{\\pi \\times d_1}{2} + \\frac{\\pi \\times d_2}{2} + \\frac{\\pi \\times d_3}{2}$\n  $P = \\frac{\\pi}{2} \\times (d_1 + d_2 + d_3)$\n  $P = \\frac{\\pi}{2} \\times (63 + 50 + 13) = \\frac{\\pi}{2} \\times 126 = 63\\pi$.\n- Thay giá trị $\\pi = \\frac{22}{7}$ theo đề bài yêu cầu:\n  $P = 63 \\times \\frac{22}{7} = (63 : 7) \\times 22 = 9 \\times 22 = 198\\\\text{ (m)}$.\n**Đáp số: 198.**"
      },
      {
        "id": 117,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 17,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The figure below is formed by two squares ABFG and BCDE. If the length of CD and GA are $16\\text{ cm}$ and $18\\text{ cm}$ respectively, find the area of $\\Delta CEG$ in $\\text{cm}^2$.",
        "questionVi": "Hình dưới đây được tạo thành bởi hai hình vuông ABFG và BCDE. Biết độ dài của CD và GA lần lượt là $16\\text{ cm}$ và $18\\text{ cm}$, hãy tính diện tích của tam giác CEG theo $\\text{cm}^2$.",
        "image": "images/exam_de5/q17_two_squares.png",
        "answer": "128",
        "acceptableAnswers": [
          "128"
        ],
        "unit": "",
        "hint": "Phương pháp phần bù diện tích (Cắt ghép và lấy diện tích tổng trừ đi các hình tam giác vuông).",
        "solution": "**Phương pháp: Phương pháp phần bù diện tích (Cắt ghép và lấy diện tích tổng trừ đi các hình tam giác vuông).**\n- Hình phẳng gồm hai hình vuông ghép kề nhau trên cùng đường thẳng nằm ngang A – B – C:\n  + Hình vuông lớn ABFG bên trái có cạnh GA = 18cm ⇒ Diện tích: S(ABFG) = 18 × 18 = 324 (cm²).\n  + Hình vuông nhỏ BCDE bên phải có cạnh CD = 16cm ⇒ Diện tích: S(BCDE) = 16 × 16 = 256 (cm²).\n- Tổng diện tích của cả hai hình vuông ghép lại là:\n  S_tổng = 324 + 256 = 580 (cm²).\n- Tam giác tô đậm CEG có 3 đỉnh là C, E, G nằm bên trong đa giác ghép AGCDEF. Phần không được tô màu bên trong đa giác gồm đúng 3 tam giác vuông sau:\n  1) Tam giác vuông GAC (ở phía dưới): vuông tại A, có hai cạnh góc vuông là GA = 18cm và AC = AB + BC = 18 + 16 = 34cm.\n     Diện tích: S(GAC) = (18 × 34) : 2 = 306 (cm²).\n  2) Tam giác vuông GFE (ở phía trên bên trái): vuông tại F, có cạnh GF = 18cm và FE = BF – BE = 18 – 16 = 2cm.\n     Diện tích: S(GFE) = (18 × 2) : 2 = 18 (cm²).\n  3) Tam giác vuông CDE (ở phía bên phải): vuông tại D, có hai cạnh góc vuông là CD = 16cm và DE = 16cm.\n     Diện tích: S(CDE) = (16 × 16) : 2 = 128 (cm²).\n- Tổng diện tích của 3 phần tam giác vuông không tô màu là:\n  S_không_tô = S(GAC) + S(GFE) + S(CDE) = 306 + 18 + 128 = 452 (cm²).\n- Vậy diện tích của tam giác tô đậm CEG là:\n  S(CEG) = S_tổng – S_không_tô = 580 – 452 = 128 (cm²).\n**Đáp số: 128.**"
      },
      {
        "id": 118,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 18,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The attached figure shows a triangle $\\Delta ABC$, P and Q are points on AB and BC respectively such that $AP : PB = 1 : 1$ and $BQ : QC = 6 : 5$. If the area of $\\Delta APQ$ is $66\\text{ cm}^2$, find the area of $\\Delta ABC$ in $\\text{cm}^2$.",
        "questionVi": "Hình vẽ đính kèm cho thấy một tam giác ABC, P và Q lần lượt là các điểm trên AB và BC sao cho $AP : PB = 1 : 1$ và $BQ : QC = 6 : 5$. Nếu diện tích của tam giác APQ là $66\\text{ cm}^2$, hãy tìm diện tích của tam giác ABC theo $\\text{cm}^2$.",
        "image": "images/exam_de5/q18_triangle_apq.png",
        "answer": "242",
        "acceptableAnswers": [
          "242"
        ],
        "unit": "",
        "hint": "Tỉ số diện tích của các tam giác có chung đường cao.",
        "solution": "**Phương pháp: Tỉ số diện tích của các tam giác có chung đường cao.**\n- Nối A với Q và P với Q như hình vẽ.\n- Bước 1: Xét hai tam giác APQ và BPQ:\n  Hai tam giác này có chung đỉnh Q và hai đáy AP, PB cùng nằm trên đường thẳng AB.\n  Vì $AP : PB = 1 : 1$ nên độ dài hai đáy bằng nhau ($AP = PB$).\n  Do đó, diện tích của hai tam giác bằng nhau:\n  $S(BPQ) = S(APQ) = 66\\\\text{ cm}^2$.\n- Bước 2: Diện tích của tam giác ABQ là:\n  $S(ABQ) = S(APQ) + S(BPQ) = 66 + 66 = 132\\\\text{ cm}^2$.\n- Bước 3: So sánh diện tích tam giác ABQ và tam giác ABC:\n  Hai tam giác này có chung đỉnh A và hai đáy BQ, BC cùng nằm trên đường thẳng BC.\n  Theo đề bài: $BQ : QC = 6 : 5$, suy ra BQ chiếm 6 phần và BC chiếm $6 + 5 = 11$ phần.\n  Do đó, tỉ số diện tích là: $\\\\frac{S(ABQ)}{S(ABC)} = \\\\frac{BQ}{BC} = \\\\frac{6}{11}$.\n- Bước 4: Diện tích của tam giác ABC là:\n  $S(ABC) = S(ABQ) : \\\\frac{6}{11} = 132 \\\\times \\\\frac{11}{6} = 22 \\\\times 11 = 242\\\\text{ cm}^2$.\n**Đáp số: 242.**"
      },
      {
        "id": 119,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 19,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "The attached figure below shows a cubic container whose side length of the inner base is $20\\text{ cm}$, and is filled with water with depth $16\\text{ cm}$. A cuboid iron bar with a square base is inserted into the container until the base of the cuboid touches the base of the container. If the water level rose $9\\text{ cm}$, find the side length of the square base of the iron bar in $\\text{cm}$.",
        "questionVi": "Hình vẽ dưới đây cho thấy một thùng chứa hình lập phương có cạnh đáy bên trong dài $20\\text{ cm}$, chứa đầy nước tới độ sâu $16\\text{ cm}$. Một thanh sắt hình hộp chữ nhật có đáy hình vuông được cắm thẳng đứng vào thùng cho đến khi đáy của thanh sắt chạm đáy thùng. Nếu mực nước dâng lên thêm $9\\text{ cm}$, hãy tìm độ dài cạnh đáy hình vuông của thanh sắt theo $\\text{cm}$.",
        "image": "images/exam_de5/q19_cubic_water.png",
        "answer": "12",
        "acceptableAnswers": [
          "12"
        ],
        "unit": "",
        "hint": "Bảo toàn thể tích chất lỏng và tương quan thể tích phần vật thể chìm trong nước.",
        "solution": "**Phương pháp: Bảo toàn thể tích chất lỏng và tương quan thể tích phần vật thể chìm trong nước.**\n- Thùng hình lập phương có đáy hình vuông cạnh 20cm.\n  Diện tích đáy của thùng là: S_thùng = 20 × 20 = 400 (cm²).\n- Ban đầu, nước trong thùng có chiều sâu 16cm. Thể tích nước có trong thùng là:\n  V_nước = 400 × 16 = 6400 (cm³).\n- Khi cắm thanh sắt hình hộp chữ nhật có đáy hình vuông xuống đáy thùng, nước dâng lên thêm 9cm.\n  Chiều cao của cột nước lúc này là:\n  h_mới = 16 + 9 = 25 (cm).\n- Tổng thể tích của cả nước và phần thanh sắt ngập trong nước (tính đến mặt nước) là:\n  V_tổng = S_thùng × h_mới = 400 × 25 = 10,000 (cm³).\n- Thể tích của phần thanh sắt ngập trong nước chính bằng phần thể tích tăng thêm:\n  V_sắt_chìm = V_tổng – V_nước = 10,000 – 6400 = 3600 (cm³).\n- Vì thanh sắt được cắm thẳng đứng chạm đáy thùng, nên chiều cao của phần sắt chìm trong nước đúng bằng chiều cao cột nước mới là 25cm.\n- Diện tích đáy hình vuông của thanh sắt là:\n  S_đáy_sắt = V_sắt_chìm : 25 = 3600 : 25 = 144 (cm²).\n- Vì đáy của thanh sắt là hình vuông nên cạnh đáy thỏa mãn:\n  cạnh × cạnh = 144 = 12 × 12.\n- Vậy độ dài cạnh đáy hình vuông của thanh sắt là 12cm.\n**Đáp số: 12.**"
      },
      {
        "id": 120,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 20,
        "category": "Hình học",
        "categoryEn": "Geometry",
        "categoryId": "geometry",
        "questionEn": "A solid cuboid is formed by merging $2000$ cubes with side length $1\\text{ cm}$. Find the total surface area of the cuboid when the cuboid is arranged in a way that the total surface area is at its maximum.",
        "questionVi": "Một khối hình hộp chữ nhật đặc được tạo thành bằng cách ghép $2000$ khối lập phương nhỏ có cạnh $1\\text{ cm}$. Tìm diện tích toàn phần của hình hộp chữ nhật khi hình hộp chữ nhật được xếp sao cho diện tích toàn phần của nó đạt giá trị lớn nhất.",
        "image": null,
        "answer": "8,002",
        "acceptableAnswers": [
          "8,002",
          "8002"
        ],
        "unit": "",
        "hint": "Cực trị hình học số học (Phân tích kích thước hình hộp chữ nhật để diện tích toàn phần lớn nhất).",
        "solution": "**Phương pháp: Cực trị hình học số học (Phân tích kích thước hình hộp chữ nhật để diện tích toàn phần lớn nhất).**\n- Khối hình hộp chữ nhật được ghép từ 2000 khối lập phương nhỏ cạnh 1cm, mỗi khối có thể tích 1 cm³.\n  Thể tích của hình hộp chữ nhật là: V = 2000 (cm³).\n- Gọi ba kích thước (dài, rộng, cao) của hình hộp chữ nhật là a, b, c (với a, b, c là các số nguyên dương, a ≥ b ≥ c ≥ 1).\n  Ta có: a × b × c = 2000.\n- Diện tích toàn phần của hình hộp chữ nhật là:\n  S_tp = 2 × (a × b + b × c + c × a).\n- Để diện tích toàn phần S_tp đạt giá trị lớn nhất khi tích a × b × c không đổi, sự chênh lệch giữa các kích thước phải là lớn nhất có thể. Khi b và c càng nhỏ (nhỏ nhất là b = 1, c = 1) thì a sẽ đạt giá trị lớn nhất (a = 2000).\n- Khi đó, hình hộp chữ nhật được xếp thành 1 hàng dài duy nhất gồm 2000 khối lập phương:\n  a = 2000 cm;  b = 1 cm;  c = 1 cm.\n- Diện tích toàn phần lớn nhất tương ứng là:\n  S_tp = 2 × (2000 × 1 + 1 × 1 + 1 × 2000)\n  S_tp = 2 × (2000 + 1 + 2000) = 2 × 4001 = 8,002 (cm²).\n**Đáp số: 8,002.**"
      },
      {
        "id": 121,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 21,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "A flight of stairs has 11 steps. David can go up 1 step, 2 steps, or 3 steps at a time. The 6th step and the 9th step cannot be stepped on as they are destroyed. How many ways are there for David to go up the stairs?",
        "questionVi": "Một cầu thang có 11 bậc. David có thể bước lên 1 bậc, 2 bậc hoặc 3 bậc mỗi lần. Bậc thứ 6 và bậc thứ 9 không thể bước vào do bị hỏng. Hỏi có bao nhiêu cách để David bước lên hết cầu thang?",
        "image": null,
        "answer": "86",
        "acceptableAnswers": [
          "86"
        ],
        "unit": "",
        "hint": "Quy hoạch động (Dãy số cộng dồn số cách bước trên cầu thang có bậc hỏng).",
        "solution": "**Phương pháp: Quy hoạch động (Dãy số cộng dồn số cách bước trên cầu thang có bậc hỏng).**\n- Gọi W(n) là số cách để David bước lên bậc thứ n.\n- Vì mỗi lần David có thể bước lên 1 bậc, 2 bậc hoặc 3 bậc, nên thông thường:\n  W(n) = W(n – 1) + W(n – 2) + W(n – 3).\n- Đề bài cho biết: Bậc thứ 6 và bậc thứ 9 bị hỏng không thể bước vào, do đó:\n  W(6) = 0  và  W(9) = 0.\n- Ban đầu ở mặt đất (bậc 0): W(0) = 1.\n- Tính tuần tự từng bậc từ bậc 1 đến bậc 11:\n  + Bậc 1: Bước 1 bước từ bậc 0 ⇒ W(1) = 1.\n  + Bậc 2: Bước từ bậc 1 hoặc bậc 0 ⇒ W(2) = W(1) + W(0) = 1 + 1 = 2.\n  + Bậc 3: Bước từ bậc 2, 1, 0 ⇒ W(3) = W(2) + W(1) + W(0) = 2 + 1 + 1 = 4.\n  + Bậc 4: W(4) = W(3) + W(2) + W(1) = 4 + 2 + 1 = 7.\n  + Bậc 5: W(5) = W(4) + W(3) + W(2) = 7 + 4 + 2 = 13.\n  + Bậc 6: Bị hỏng ⇒ W(6) = 0.\n  + Bậc 7: Bước từ bậc 6, 5, 4 ⇒ W(7) = 0 + 13 + 7 = 20.\n  + Bậc 8: Bước từ bậc 7, 6, 5 ⇒ W(8) = 20 + 0 + 13 = 33.\n  + Bậc 9: Bị hỏng ⇒ W(9) = 0.\n  + Bậc 10: Bước từ bậc 9, 8, 7 ⇒ W(10) = 0 + 33 + 20 = 53.\n  + Bậc 11: Bước từ bậc 10, 9, 8 ⇒ W(11) = 53 + 0 + 33 = 86.\n- Vậy có tất cả 86 cách để David bước lên hết 11 bậc cầu thang.\n**Đáp số: 86.**"
      },
      {
        "id": 122,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 22,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "How many ways are there for 17 cuboid bricks with dimensions 1cm × 3cm to fill a grid with dimensions 3cm × 17cm?",
        "questionVi": "Có bao nhiêu cách dùng 17 viên gạch hình hộp chữ nhật có kích thước 1cm × 3cm để lát kín một lưới ô có kích thước 3cm × 17cm?",
        "image": null,
        "answer": "406",
        "acceptableAnswers": [
          "406"
        ],
        "unit": "",
        "hint": "Xây dựng dãy số truy hồi lát gạch (Tiling Problem).",
        "solution": "**Phương pháp: Xây dựng dãy số truy hồi lát gạch (Tiling Problem).**\n- Ta cần lát kín một lưới ô kích thước 3cm × 17cm bằng 17 viên gạch kích thước 1cm × 3cm.\n- Gọi f(n) là số cách lát một lưới kích thước 3 × n bằng các viên gạch 1 × 3.\n- Phân tích cách xếp ở đầu bên trái của lưới 3 × n:\n  1) Trường hợp 1: Đặt 1 viên gạch 1 × 3 thẳng đứng (chiều cao 3, bề rộng 1). Khối này chiếm đúng 1 cột, phần lưới còn lại có kích thước 3 × (n – 1). Số cách lát phần còn lại là f(n – 1).\n  2) Trường hợp 2: Đặt các viên gạch nằm ngang (chiều dài 3, bề dày 1). Để phủ kín chiều cao bằng 3, ta bắt buộc phải xếp chồng đúng 3 viên gạch nằm ngang lên nhau tạo thành một khối vuông 3 × 3. Khối này chiếm bề rộng bằng 3, phần lưới còn lại có kích thước 3 × (n – 3). Số cách lát phần còn lại là f(n – 3).\n- Không thể có cách xếp xen kẽ nào khác vì một viên gạch nằm ngang sẽ chiếm trọn 3 ô liên tiếp theo chiều ngang ở một hàng, buộc 2 hàng còn lại cũng phải xếp các viên gạch ngang tương ứng.\n- Do đó ta có công thức truy hồi: f(n) = f(n – 1) + f(n – 3).\n- Các giá trị ban đầu:\n  f(0) = 1;  f(1) = 1;  f(2) = 1.\n- Tính tuần tự tới n = 17:\n  + f(3) = f(2) + f(0) = 1 + 1 = 2\n  + f(4) = f(3) + f(1) = 2 + 1 = 3\n  + f(5) = f(4) + f(2) = 3 + 1 = 4\n  + f(6) = f(5) + f(3) = 4 + 2 = 6\n  + f(7) = f(6) + f(4) = 6 + 3 = 9\n  + f(8) = f(7) + f(5) = 9 + 4 = 13\n  + f(9) = f(8) + f(6) = 13 + 6 = 19\n  + f(10) = f(9) + f(7) = 19 + 9 = 28\n  + f(11) = f(10) + f(8) = 28 + 13 = 41\n  + f(12) = f(11) + f(9) = 41 + 19 = 60\n  + f(13) = f(12) + f(10) = 60 + 28 = 88\n  + f(14) = f(13) + f(11) = 88 + 41 = 129\n  + f(15) = f(14) + f(12) = 129 + 60 = 189\n  + f(16) = f(15) + f(13) = 189 + 88 = 277\n  + f(17) = f(16) + f(14) = 277 + 129 = 406.\n- Vậy có 406 cách lát kín lưới ô.\n**Đáp số: 406.**"
      },
      {
        "id": 123,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 23,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "Among 20 students including Joyce and Benson, 4 students are chosen to join a competition. If both Benson and Joyce have to join the competition, how many combinations are there for these 4 students?",
        "questionVi": "Trong số 20 học sinh bao gồm cả Joyce và Benson, người ta chọn ra 4 học sinh để tham gia một cuộc thi. Nếu cả Benson và Joyce đều bắt buộc phải tham gia cuộc thi đó, hỏi có bao nhiêu cách chọn 4 học sinh này?",
        "image": null,
        "answer": "153",
        "acceptableAnswers": [
          "153"
        ],
        "unit": "",
        "hint": "Quy tắc đếm tổ hợp chọn cặp đôi C(n, 2) = n(n – 1) / 2.",
        "solution": "**Phương pháp: Quy tắc đếm tổ hợp chọn cặp đôi C(n, 2) = n(n – 1) / 2.**\n- Cuộc thi cần chọn một đội gồm 4 học sinh từ tổng số 20 học sinh ban đầu.\n- Đề bài yêu cầu: Cả Benson và Joyce đều bắt buộc phải tham gia cuộc thi.\n- Vì Benson và Joyce đã chắc chắn có tên trong danh sách 4 học sinh được chọn, nên ta chỉ cần chọn thêm:\n  4 – 2 = 2 (học sinh nữa).\n- Hai học sinh này được chọn từ số học sinh còn lại ngoài Benson và Joyce:\n  20 – 2 = 18 (học sinh).\n- Số cách chọn 2 học sinh từ 18 học sinh là:\n  (18 × 17) : 2 = 9 × 17 = 153 (cách).\n**Đáp số: 153.**"
      },
      {
        "id": 124,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 24,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "The attached figure is made up of 5 grids as shown in the figure. A colour is filled into each grid, and two adjacent grids do not share the same colour. If there are in total 4 colours to choose from to fill in the grids, how many ways are there to colour the figure?",
        "questionVi": "Hình vẽ đính kèm được tạo thành từ 5 ô như hình vẽ. Mỗi ô được tô một màu, và hai ô kề nhau (chung cạnh) không được tô cùng màu. Nếu có tất cả 4 màu để lựa chọn để tô vào các ô, hỏi có bao nhiêu cách tô màu hình vẽ?",
        "image": "images/exam_de5/q24_coloring_grid.png",
        "answer": "72",
        "acceptableAnswers": [
          "72"
        ],
        "unit": "",
        "hint": "Quy tắc nhân và phân tích trường hợp màu hai ô biên.",
        "solution": "**Phương pháp: Quy tắc nhân và phân tích trường hợp màu hai ô biên.**\n- Hình vẽ gồm 5 ô: ô biên trái (A), ô biên phải (E), và 3 ô ở giữa xếp chồng lên nhau từ trên xuống dưới (gọi là B - trên, C - giữa, D - dưới).\n- Mối quan hệ tiếp xúc:\n  + Cả 3 ô giữa (B, C, D) đều kề với ô trái A và kề với ô phải E.\n  + Ba ô giữa tiếp xúc dọc theo thứ tự: B kề C, và C kề D.\n- Có 4 màu để lựa chọn.\n- Tô màu cho ô A trước: có 4 cách chọn màu.\n- Xét hai trường hợp về màu của ô E:\n  + Trường hợp 1: Ô E có CÙNG MÀU với ô A:\n    * Số cách chọn màu cho E là 1 cách (giống A).\n    * Khi đó, cả A và E chỉ sử dụng 1 màu duy nhất. Ba ô B, C, D chỉ cần tránh 1 màu này nên có 4 – 1 = 3 màu khả dụng.\n    * Tô màu cho dãy 3 ô liên tiếp B – C – D bằng 3 màu khả dụng:\n      • Ô B: có 3 cách chọn.\n      • Ô C (khác B): có 3 – 1 = 2 cách chọn.\n      • Ô D (khác C): có 3 – 1 = 2 cách chọn.\n      Số cách tô 3 ô giữa là: 3 × 2 × 2 = 12 cách.\n    * Số cách trong TH1 là: 4 × 1 × 12 = 48 cách.\n  + Trường hợp 2: Ô E có MÀU KHÁC với ô A:\n    * Số cách chọn màu cho E là 3 cách (khác A).\n    * Khi đó, A và E sử dụng 2 màu khác nhau. Ba ô B, C, D phải tránh cả 2 màu của A và E, do đó chỉ còn 4 – 2 = 2 màu khả dụng.\n    * Tô màu cho dãy 3 ô liên tiếp B – C – D bằng 2 màu khả dụng:\n      • Ô B: có 2 cách chọn.\n      • Ô C: phải chọn màu còn lại (khác B) ⇒ có 1 cách.\n      • Ô D: phải chọn màu còn lại (khác C, tức trùng màu B) ⇒ có 1 cách.\n      Số cách tô 3 ô giữa là: 2 × 1 × 1 = 2 cách.\n    * Số cách trong TH2 là: 4 × 3 × 2 = 24 cách.\n- Tổng số cách tô màu cho toàn bộ hình vẽ là:\n  48 + 24 = 72 (cách).\n**Đáp số: 72.**"
      },
      {
        "id": 125,
        "examId": "heat_2016_2017_de5",
        "examIndex": 4,
        "qNum": 25,
        "category": "Tổ hợp",
        "categoryEn": "Combinatorics",
        "categoryId": "combinatorics",
        "questionEn": "By using 1, 3, 5, 7 and 9 as digits, how many integers less than 10000 can be formed? (Each digit can be used more than once).",
        "questionVi": "Dùng các chữ số 1, 3, 5, 7 và 9, có thể lập được bao nhiêu số nguyên nhỏ hơn 10000? (Mỗi chữ số có thể được dùng nhiều hơn một lần).",
        "image": null,
        "answer": "780",
        "acceptableAnswers": [
          "780"
        ],
        "unit": "",
        "hint": "Quy tắc cộng và quy tắc nhân đếm số tự nhiên theo số chữ số.",
        "solution": "**Phương pháp: Quy tắc cộng và quy tắc nhân đếm số tự nhiên theo số chữ số.**\n- Các chữ số được phép sử dụng là {1, 3, 5, 7, 9} (gồm 5 chữ số lẻ, đều khác 0).\n- Các số nguyên nhỏ hơn 10000 được lập từ các chữ số này có thể có từ 1 đến 4 chữ số (mỗi chữ số có thể lặp lại):\n  1) Số có 1 chữ số:\n     Có 5 số thỏa mãn: 1, 3, 5, 7, 9 ⇒ Có 5 số.\n  2) Số có 2 chữ số (dạng ab):\n     + Chữ số hàng chục a có 5 cách chọn (từ {1, 3, 5, 7, 9}).\n     + Chữ số hàng đơn vị b có 5 cách chọn.\n     ⇒ Có: 5 × 5 = 25 (số).\n  3) Số có 3 chữ số (dạng abc):\n     + Chữ số a có 5 cách chọn.\n     + Chữ số b có 5 cách chọn.\n     + Chữ số c có 5 cách chọn.\n     ⇒ Có: 5 × 5 × 5 = 125 (số).\n  4) Số có 4 chữ số (dạng abcd):\n     Vì tất cả các chữ số {1, 3, 5, 7, 9} đều ≤ 9 nên mọi số có 4 chữ số tạo thành đều ≤ 9999 < 10000, do đó đều thỏa mãn điều kiện nhỏ hơn 10000.\n     + Chữ số a có 5 cách chọn.\n     + Chữ số b có 5 cách chọn.\n     + Chữ số c có 5 cách chọn.\n     + Chữ số d có 5 cách chọn.\n     ⇒ Có: 5 × 5 × 5 × 5 = 625 (số).\n- Tổng số các số nguyên nhỏ hơn 10000 lập được là:\n  5 + 25 + 125 + 625 = 780 (số).\n**Đáp số: 780.**"
      }
    ]
  }
];

// Tương thích ngược với phiên bản cũ
if (typeof window !== 'undefined' && !window.TIMO_DE1_DATA) {
  window.TIMO_DE1_DATA = TIMO_MOCK_EXAMS[0];
}
