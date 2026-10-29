// Dữ liệu 25 câu hỏi Đề 1 - Vòng Chung kết Quốc gia TIMO Khối 6 (2020 - 2021)
// CLB TOÁN M32 - Biên soạn độc quyền

const TIMO_DE1_DATA = {
  id: "heat_2020_2021_de1",
  title: "Đề số 1: Vòng Chung kết Quốc gia Năm học 2020 – 2021",
  titleEn: "Paper 1: National Final Heat Round 2020 – 2021",
  grade: "Khối 6 / Grade 6",
  timeMinutes: 90,
  totalQuestions: 25,
  pointsPerQuestion: 4,
  categories: [
    { id: "logic", name: "Tư duy logic", nameEn: "Logical Thinking", icon: "fa-brain", range: [1, 5], color: "blue" },
    { id: "arithmetic", name: "Số học", nameEn: "Arithmetic", icon: "fa-calculator", range: [6, 10], color: "emerald" },
    { id: "number_theory", name: "Lý thuyết số", nameEn: "Number Theory", icon: "fa-hashtag", range: [11, 15], color: "purple" },
    { id: "geometry", name: "Hình học", nameEn: "Geometry", icon: "fa-shapes", range: [16, 20], color: "amber" },
    { id: "combinatorics", name: "Tổ hợp", nameEn: "Combinatorics", icon: "fa-cubes-stacked", range: [21, 25], color: "rose" }
  ],
  questions: [
    {
      id: 1,
      category: "Tư duy logic",
      categoryEn: "Logical Thinking",
      categoryId: "logic",
      questionEn: "There are some chickens and rabbits in a cage. The number of chickens is 10 more than 3 times the number of rabbits. They have 110 legs in total. How many chicken(s) is / are there?",
      questionVi: "Có một số gà và thỏ ở trong một chiếc chuồng. Số gà nhiều hơn 3 lần số thỏ là 10 con. Chúng có tổng cộng 110 chân. Hỏi có bao nhiêu con gà?",
      image: null,
      answer: "37",
      acceptableAnswers: ["37"],
      unit: "con",
      hint: "Phương pháp giả thiết tạm: Hãy bớt đi 10 con gà thì tổng số chân sẽ giảm đi bao nhiêu? Khi đó cứ 1 con thỏ sẽ đi kèm với 3 con gà.",
      solution: `**Phương pháp: Giả thiết tạm / Quy về nhóm tỉ lệ cố định.**
- Gọi số thỏ là $R$ (con). Theo đề bài, số gà là $3 \\times R + 10$ (con).
- Mỗi con thỏ có 4 chân, mỗi con gà có 2 chân.
- Số chân của 10 con gà dôi ra là: $10 \\times 2 = 20$ (chân).
- Nếu bớt đi 10 con gà này, tổng số chân còn lại là: $110 - 20 = 90$ (chân).
- Khi đó, cứ 1 con thỏ (4 chân) đi kèm 3 con gà ($3 \\times 2 = 6$ chân) tạo thành một nhóm có số chân là: $4 + 6 = 10$ (chân).
- Số con thỏ trong lồng là: $90 : 10 = 9$ (con).
- Số con gà ban đầu là: $9 \\times 3 + 10 = 37$ (con).
**Đáp số: 37.**`
    },
    {
      id: 2,
      category: "Tư duy logic",
      categoryEn: "Logical Thinking",
      categoryId: "logic",
      questionEn: "Given a cell of type A splits into 2 cells of type B in the 1st minute. In the next 2 minutes, each cell of type B splits into 2 cells of type A. How many cell(s) of type A is / are there originally if there are 1792 cells in the 10th minute?",
      questionVi: "Cho một tế bào loại A phân tách thành 2 tế bào loại B trong 1 phút đầu tiên. Trong 2 phút tiếp theo, mỗi tế bào loại B lại phân tách thành 2 tế bào loại A. Hỏi ban đầu có bao nhiêu tế bào loại A nếu như có tất cả 1792 tế bào vào phút thứ 10?",
      image: null,
      answer: "14",
      acceptableAnswers: ["14"],
      unit: "tế bào",
      hint: "Xét chu kỳ phân bào trọn vẹn gồm 1 + 2 = 3 phút: Cứ sau 3 phút, 1 tế bào A sẽ tạo ra bao nhiêu tế bào A? Phút thứ 10 bằng 3 chu kỳ trọn vẹn cộng thêm 1 phút.",
      solution: `**Phương pháp: Chu kỳ phân bào và quy luật lũy thừa thời gian.**
- Xét chu kỳ hoàn chỉnh của 1 tế bào A:
  + Sau 1 phút đầu: $1$ tế bào A $\\to 2$ tế bào B.
  + Sau 2 phút tiếp theo (tức sau 3 phút kể từ đầu): $2$ tế bào B $\\to 2 \\times 2 = 4$ tế bào A.
  + Như vậy, cứ sau 1 chu kỳ trọn vẹn gồm $1 + 2 = 3$ phút, số lượng tế bào A tăng gấp 4 lần và tất cả đều ở dạng tế bào A.
- Xét diễn biến tại các mốc thời gian (gọi ban đầu có $x$ tế bào A):
  + Sau 3 phút: $4 \\times x$ tế bào A.
  + Sau 6 phút: $4^2 \\times x = 16 \\times x$ tế bào A.
  + Sau 9 phút: $4^3 \\times x = 64 \\times x$ tế bào A.
  + Đến phút thứ 10 (thêm 1 phút sau phút 9): toàn bộ $64 \\times x$ tế bào A phân tách thành $2$ tế bào B, tạo thành $64 \\times x \\times 2 = 128 \\times x$ tế bào B.
- Tổng số tế bào lúc này là 1792:
  $$128 \\times x = 1792 \\implies x = 1792 : 128 = 14$$
**Đáp số: 14.**`
    },
    {
      id: 3,
      category: "Tư duy logic",
      categoryEn: "Logical Thinking",
      categoryId: "logic",
      questionEn: "A bookseller sold 8 less than half of the books on the 1st day. On the 2nd day, he sold 2 more than half of the remaining books. On the 3rd day, he sold 1 less than half of the remaining books and left 9 books. How many book(s) did the bookseller have originally?",
      questionVi: "Một người bán sách bán được ít hơn một nửa số sách là 8 cuốn trong ngày thứ nhất. Ngày thứ hai, người đó bán được nhiều hơn một nửa số sách còn lại là 2 cuốn. Ngày thứ ba, người đó bán được ít hơn một nửa số sách còn lại là 1 cuốn và còn lại 9 cuốn sách. Hỏi ban đầu người đó có bao nhiêu cuốn sách?",
      image: null,
      answer: "56",
      acceptableAnswers: ["56"],
      unit: "cuốn",
      hint: "Phương pháp tính ngược từ cuối (Working Backwards): Đi ngược từ ngày thứ ba về ngày thứ hai, rồi về số sách ban đầu.",
      solution: `**Phương pháp: Tính ngược từ cuối (Working Backwards).**
- **Ngày 3:** Bán một nửa số sách còn lại bớt 1 cuốn, nghĩa là còn lại một nửa số sách cộng thêm 1 cuốn thì bằng 9 cuốn:
  + Một nửa số sách sau ngày 2 là: $9 - 1 = 8$ (cuốn).
  + Số sách còn lại sau ngày 2 là: $8 \\times 2 = 16$ (cuốn).
- **Ngày 2:** Bán một nửa số sách và thêm 2 cuốn, nghĩa là còn lại một nửa số sách trừ đi 2 cuốn thì bằng 16 cuốn:
  + Một nửa số sách sau ngày 1 là: $16 + 2 = 18$ (cuốn).
  + Số sách còn lại sau ngày 1 là: $18 \\times 2 = 36$ (cuốn).
- **Ngày 1:** Bán một nửa số sách bớt 8 cuốn, nghĩa là còn lại một nửa số sách ban đầu cộng thêm 8 cuốn thì bằng 36 cuốn:
  + Một nửa số sách ban đầu là: $36 - 8 = 28$ (cuốn).
  + Số sách ban đầu là: $28 \\times 2 = 56$ (cuốn).
**Đáp số: 56.**`
    },
    {
      id: 4,
      category: "Tư duy logic",
      categoryEn: "Logical Thinking",
      categoryId: "logic",
      questionEn: "Given $A, B, C, D$ and $E$ are distinct digits such that: (1) $E > D > C > B > A$; (2) $A + B + C > D$; (3) $C + D = E$; (4) $C$ is divisible by $B$; (5) $A + B + D < E$. Find the value of digit $D$.",
      questionVi: "Cho $A, B, C, D$ và $E$ là các chữ số đôi một khác nhau thỏa mãn: (1) $E > D > C > B > A$; (2) $A + B + C > D$; (3) $C + D = E$; (4) $C$ chia hết cho $B$; (5) $A + B + D < E$. Tìm giá trị của chữ số $D$.",
      image: null,
      answer: "5",
      acceptableAnswers: ["5"],
      unit: "",
      hint: "Thay $E = C + D$ vào bất đẳng thức (5) để rút gọn mối quan hệ giữa $A + B$ và $C$. Kết hợp điều kiện (2) để chặn giá trị của $C$ và $E$.",
      solution: `**Phương pháp: Suy luận logic và chặn miền giá trị chữ số.**
- Các chữ số $A, B, C, D, E \\in \\{0, 1, ..., 9\\}$ phân biệt và $E > D > C > B > A$.
- Vì $E > D > C > B > A \\ge 0 \\implies E > 4$, và $E$ là chữ số lớn nhất nên $E \\in \\{8, 9\\}$.
- Từ (3) $C + D = E$ và (5) $A + B + D < E$, ta thay $E = C + D$ vào:
  $$A + B + D < C + D \\implies A + B < C$$
- Kết hợp với (2) $A + B + C > D \\implies A + B > D - C$.
- Do đó: $D - C < A + B < C \\implies D - C < C \\implies D < 2C$.
- Lại có $C + D = E$ và $C < D \\implies 2C < C + D = E \\implies C < E / 2$.
- **Nếu $E = 8$:** $C < 4 \\implies D = 8 - C$. Để $D < 2C \\implies 8 - C < 2C \\implies 3C > 8 \\implies C = 3, D = 5$.
  Khi đó $D - C = 2 \\implies 2 < A + B < 3$ (vô nghiệm vì $A, B$ nguyên).
- **Nếu $E = 9$:** $C < 4.5$ và $D = 9 - C$. Để $D < 2C \\implies 9 - C < 2C \\implies 3C > 9 \\implies C > 3$.
  Do đó chọn $C = 4 \\implies D = 9 - 4 = 5$.
  Khi đó: $D - C = 1 < A + B < 4 \\implies A + B \\in \\{2, 3\\}$.
  Lại có $C$ chia hết cho $B$ và $B < C = 4 \\implies B \\in \\{1, 2\\}$.
  + Chọn $B = 2$, vì $A < B$ nên chọn $A = 0$ thì $A + B = 2$ (thỏa mãn $1 < 2 < 4$).
  Kiểm tra bộ số: $A = 0, B = 2, C = 4, D = 5, E = 9$ thỏa mãn trọn vẹn cả 5 điều kiện đề bài.
**Đáp số: 5.**`
    },
    {
      id: 5,
      category: "Tư duy logic",
      categoryEn: "Logical Thinking",
      categoryId: "logic",
      questionEn: "According to the pattern shown below, find the value in the cell with the question mark.",
      questionVi: "Dựa vào quy luật dưới đây, tìm giá trị ở ô chứa dấu hỏi chấm.",
      image: "images/q5_cleaned.png",
      answer: "19",
      acceptableAnswers: ["19"],
      unit: "",
      hint: "Tính tổng 5 số ở các ô vành ngoài ngũ giác, rồi chia cho số ở ô ngũ giác chính giữa xem ra điều gì đặc biệt?",
      solution: `**Phương pháp: Tìm quy luật số học trong hình đa giác.**
- **Xét hình ngũ giác thứ nhất:**
  + Tổng 5 số ở vành ngoài: $7 + 8 + 11 + 9 + 10 = 45$.
  + Số ở ô ngũ giác trung tâm: $9$.
  + Mối quan hệ: $45 : 5 = 9$ (Số ở tâm bằng trung bình cộng của 5 số ở vành ngoài).
- **Kiểm tra ở hình ngũ giác thứ hai:**
  + Tổng các số vành ngoài: $32 + 14 + 10 + 20 + 29 = 105$.
  + Số ở tâm: $105 : 5 = 21$ (Hoàn toàn đúng quy luật).
- **Áp dụng cho hình ngũ giác thứ ba:**
  + Gọi số cần tìm ở ô có dấu hỏi chấm là $x$.
  + Số ở tâm là $17$, do đó tổng 5 số vành ngoài phải bằng: $17 \\times 5 = 85$.
  + Ta có phương trình:
    $$x + 31 + 6 + 4 + 25 = 85 \\implies x + 66 = 85 \\implies x = 85 - 66 = 19$$
**Đáp số: 19.**`
    },
    {
      id: 6,
      category: "Số học",
      categoryEn: "Arithmetic",
      categoryId: "arithmetic",
      questionEn: "Find the value of $3\\frac{1}{3} \\times 5 + 5\\frac{1}{6} \\times 7 + 2\\frac{1}{6} \\times 13$.",
      questionVi: "Tính giá trị của biểu thức $3\\frac{1}{3} \\times 5 + 5\\frac{1}{6} \\times 7 + 2\\frac{1}{6} \\times 13$.",
      image: null,
      answer: "81",
      acceptableAnswers: ["81"],
      unit: "",
      hint: "Đổi các hỗn số về phân số có mẫu số chung bằng 6, sau đó đặt mẫu số 6 ra ngoài và tính nhanh tử số.",
      solution: `**Phương pháp: Chuyển đổi hỗn số về phân số mẫu chung và tính nhanh.**
- Đổi các hỗn số về phân số có mẫu số chung bằng 6:
  + $3\\frac{1}{3} = \\frac{10}{3} = \\frac{20}{6}$
  + $5\\frac{1}{6} = \\frac{31}{6}$
  + $2\\frac{1}{6} = \\frac{13}{6}$
- Thay vào biểu thức ta có:
  $$A = \\frac{20}{6} \\times 5 + \\frac{31}{6} \\times 7 + \\frac{13}{6} \\times 13$$
  $$A = \\frac{20 \\times 5 + 31 \\times 7 + 13 \\times 13}{6}$$
  $$A = \\frac{100 + 217 + 169}{6} = \\frac{486}{6} = 81$$
**Đáp số: 81.**`
    },
    {
      id: 7,
      category: "Số học",
      categoryEn: "Arithmetic",
      categoryId: "arithmetic",
      questionEn: "Find the value of $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots + \\frac{1}{380} + \\frac{1}{420}$.",
      questionVi: "Tính giá trị của biểu thức $\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots + \\frac{1}{380} + \\frac{1}{420}$.",
      image: null,
      answer: "20/21",
      acceptableAnswers: ["20/21", "20 / 21"],
      unit: "",
      hint: "Nhận xét mẫu số: $2 = 1 \\times 2$, $6 = 2 \\times 3$, ..., $420 = 20 \\times 21$. Áp dụng công thức tách phân số triệt tiêu: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.",
      solution: `**Phương pháp: Chuỗi phân số sai phân triệt tiêu (Telescoping Series).**
- Phân tích mẫu số thành tích của 2 số tự nhiên liên tiếp:
  $$\\frac{1}{2} = \\frac{1}{1 \\times 2}, \\quad \\frac{1}{6} = \\frac{1}{2 \\times 3}, \\quad \\dots, \\quad \\frac{1}{420} = \\frac{1}{20 \\times 21}$$
- Áp dụng công thức sai phân: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$, ta có:
  $$S = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{20} - \\frac{1}{21}\\right)$$
- Các cặp số đối nhau ở giữa triệt tiêu lẫn nhau:
  $$S = 1 - \\frac{1}{21} = \\frac{20}{21}$$
*(Ghi chú: Đề gốc in ấn bị khuyết đáp án này, đáp số chuẩn xác là $\\frac{20}{21}$)*.
**Đáp số: 20/21.**`
    },
    {
      id: 8,
      category: "Số học",
      categoryEn: "Arithmetic",
      categoryId: "arithmetic",
      questionEn: "Find the value of $4420 \\times 2368 - 4421 \\times 2367$.",
      questionVi: "Tính giá trị của $4420 \\times 2368 - 4421 \\times 2367$.",
      image: null,
      answer: "2053",
      acceptableAnswers: ["2053"],
      unit: "",
      hint: "Nhận xét mối liên hệ giữa các thừa số: $2368 = 2367 + 1$ và $4421 = 4420 + 1$. Đặt $A = 4420$ và $B = 2367$ để tính nhanh.",
      solution: `**Phương pháp: Tính nhanh bằng quy tắc phân phối đại số.**
- Ta biểu diễn:
  $$2368 = 2367 + 1 \\quad \\text{và} \\quad 4421 = 4420 + 1$$
- Thay vào biểu thức:
  $$B = 4420 \\times (2367 + 1) - (4420 + 1) \\times 2367$$
  $$B = 4420 \\times 2367 + 4420 - 4420 \\times 2367 - 2367$$
  $$B = 4420 - 2367 = 2053$$
**Đáp số: 2053.**`
    },
    {
      id: 9,
      category: "Số học",
      categoryEn: "Arithmetic",
      categoryId: "arithmetic",
      questionEn: "Convert $0.1\\dot{3}\\dot{6}$ into fraction in simplest form.",
      questionVi: "Chuyển đổi số thập phân vô hạn tuần hoàn $0.1\\dot{3}\\dot{6}$ sang phân số tối giản.",
      image: null,
      answer: "3/22",
      acceptableAnswers: ["3/22", "3 / 22"],
      unit: "",
      hint: "Đặt $x = 0.1363636...$ Khi đó $10x = 1.3636...$ và $1000x = 136.3636...$ Lấy hiệu hai vế để khử phần thập phân tuần hoàn.",
      solution: `**Phương pháp: Đổi số thập phân vô hạn tuần hoàn sang phân số tối giản.**
- Đặt $x = 0.1(36) = 0.1363636...$
- Ta nhân hai vế với 10 và 1000:
  $$10 \\times x = 1.363636...$$
  $$1000 \\times x = 136.363636...$$
- Trừ từng vế hai phương trình trên:
  $$1000 \\times x - 10 \\times x = 136.3636... - 1.3636...$$
  $$990 \\times x = 135 \\implies x = \\frac{135}{990}$$
- Rút gọn cả tử và mẫu cho $45$:
  $$\\frac{135 : 45}{990 : 45} = \\frac{3}{22}$$
*(Ghi chú: Đề gốc để trống đáp án này, phân số tối giản chính xác là $\\frac{3}{22}$)*.
**Đáp số: 3/22.**`
    },
    {
      id: 10,
      category: "Số học",
      categoryEn: "Arithmetic",
      categoryId: "arithmetic",
      questionEn: "Find the value of $5 + 8 + 10 + 13 + 15 + 18 + 20 + 23 + 25 + 28 + 30 + 33 + 35 + 38 + 40$.",
      questionVi: "Tính giá trị của biểu thức $5 + 8 + 10 + 13 + 15 + 18 + 20 + 23 + 25 + 28 + 30 + 33 + 35 + 38 + 40$.",
      image: null,
      answer: "341",
      acceptableAnswers: ["341"],
      unit: "",
      hint: "Nhóm từng cặp liên tiếp lại: $(5+8) + (10+13) + ...$ để tạo thành một dãy số cách đều 10 đơn vị.",
      solution: `**Phương pháp: Quy luật dãy số bước nhảy kép đan xen.**
- Ta nhóm các số hạng theo từng cặp bước nhảy $+3$:
  $$S = (5 + 8) + (10 + 13) + (15 + 18) + (20 + 23) + (25 + 28) + (30 + 33) + (35 + 38) + 40$$
  $$S = 13 + 23 + 33 + 43 + 53 + 63 + 73 + 40$$
- Dãy $13, 23, 33, 43, 53, 63, 73$ gồm 7 số hạng cách đều 10 đơn vị, có số chính giữa là 43.
- Tổng của 7 số hạng này là: $7 \\times 43 = 301$.
- Tổng toàn bộ biểu thức là: $301 + 40 = 341$.
**Đáp số: 341.**`
    },
    {
      id: 11,
      category: "Lý thuyết số",
      categoryEn: "Number Theory",
      categoryId: "number_theory",
      questionEn: "How many irreducible proper fraction(s) with denominator 1386 is / are there?",
      questionVi: "Có bao nhiêu phân số tối giản dương nhỏ hơn 1 có mẫu số bằng 1386?",
      image: null,
      answer: "360",
      acceptableAnswers: ["360"],
      unit: "phân số",
      hint: "Phân số tối giản $\\frac{k}{1386}$ ($1 \\le k < 1386$) nghĩa là tử số $k$ phải nguyên tố cùng nhau với 1386. Dùng hàm phi Euler $\\varphi(n)$.",
      solution: `**Phương pháp: Hàm phi Euler $\\varphi(n)$ đếm số nguyên tố cùng nhau.**
- Phân số tối giản dương nhỏ hơn 1 có mẫu 1386 có dạng $\\frac{k}{1386}$ với $1 \\le k < 1386$ và $\\text{ƯCLN}(k, 1386) = 1$.
- Phân tích số 1386 ra thừa số nguyên tố:
  $$1386 = 2 \\times 3^2 \\times 7 \\times 11$$
- Số lượng các số nguyên tố cùng nhau với 1386 nhỏ hơn 1386 là:
  $$\\varphi(1386) = 1386 \\times \\left(1 - \\frac{1}{2}\\right) \\times \\left(1 - \\frac{1}{3}\\right) \\times \\left(1 - \\frac{1}{7}\\right) \\times \\left(1 - \\frac{1}{11}\\right)$$
  $$\\varphi(1386) = 1386 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{6}{7} \\times \\frac{10}{11} = 1386 \\times \\frac{120}{462} = 3 \\times 120 = 360$$
**Đáp số: 360.**`
    },
    {
      id: 12,
      category: "Lý thuyết số",
      categoryEn: "Number Theory",
      categoryId: "number_theory",
      questionEn: "If integer $K$ is divided by 9, the remainder is 2. What is the remainder when $4K + 7$ is divided by 12?",
      questionVi: "Biết số nguyên $K$ chia cho 9 dư 2. Hỏi biểu thức $4K + 7$ chia cho 12 có số dư là bao nhiêu?",
      image: null,
      answer: "3",
      acceptableAnswers: ["3"],
      unit: "",
      hint: "Biểu diễn $K = 9m + 2$. Thay vào $4K + 7$ ta được $4(9m + 2) + 7 = 36m + 15$. Số $36m$ chia hết cho 12.",
      solution: `**Phương pháp: Biểu diễn số dư và tính chất đồng dư thức.**
- Vì $K$ chia cho 9 dư 2 nên ta biểu diễn: $K = 9 \\times m + 2$ ($m$ là số tự nhiên).
- Thay vào biểu thức $4K + 7$ ta được:
  $$4K + 7 = 4 \\times (9m + 2) + 7 = 36m + 8 + 7 = 36m + 15$$
- Nhận thấy $36m = 12 \\times 3m$ luôn chia hết cho 12 với mọi $m$.
- Do đó số dư của $4K + 7$ khi chia cho 12 đúng bằng số dư của 15 khi chia cho 12:
  $$15 = 12 \\times 1 + 3 \\implies \\text{Số dư là } 3$$
**Đáp số: 3.**`
    },
    {
      id: 13,
      category: "Lý thuyết số",
      categoryEn: "Number Theory",
      categoryId: "number_theory",
      questionEn: "Find the unit digit of $A$ if $A = 2^2 + 4^2 + 6^2 + 8^2 + \\dots + 100^2$.",
      questionVi: "Tìm chữ số tận cùng của $A$ biết $A = 2^2 + 4^2 + 6^2 + 8^2 + \\dots + 100^2$.",
      image: null,
      answer: "0",
      acceptableAnswers: ["0"],
      unit: "",
      hint: "Dãy có 50 số chẵn bình phương. Chữ số tận cùng của bình phương các số có đuôi 2, 4, 6, 8, 0 lần lượt là 4, 6, 6, 4, 0. Tổng 5 số này có tận cùng là gì?",
      solution: `**Phương pháp: Xét chu kỳ chữ số tận cùng của lũy thừa.**
- Dãy $A$ gồm $(100 - 2) : 2 + 1 = 50$ số hạng chẵn bình phương.
- Chữ số tận cùng của các số chẵn bình phương:
  + $(\\dots 2)^2$ tận cùng là 4;
  + $(\\dots 4)^2$ tận cùng là 6;
  + $(\\dots 6)^2$ tận cùng là 6;
  + $(\\dots 8)^2$ tận cùng là 4;
  + $(\\dots 0)^2$ tận cùng là 0.
- Tổng chữ số tận cùng của một khối 5 số chẵn liên tiếp (ví dụ $2^2 + 4^2 + 6^2 + 8^2 + 10^2$):
  $$4 + 6 + 6 + 4 + 0 = 20 \\implies \\text{tận cùng là } 0$$
- Dãy gồm 50 số hạng, chia thành đúng $50 : 5 = 10$ khối, mỗi khối đều có tổng tận cùng là 0.
- Do đó tổng $A$ có chữ số tận cùng bằng 0.
**Đáp số: 0.**`
    },
    {
      id: 14,
      category: "Lý thuyết số",
      categoryEn: "Number Theory",
      categoryId: "number_theory",
      questionEn: "Given a 9-digit number $1523459A2$ is divisible by 12. Find the value of $A$.",
      questionVi: "Cho số có 9 chữ số $1523459A2$ chia hết cho 12. Tìm giá trị của chữ số $A$.",
      image: null,
      answer: "5",
      acceptableAnswers: ["5"],
      unit: "",
      hint: "Số chia hết cho 12 khi đồng thời chia hết cho 3 và 4. Để chia hết cho 4 thì hai chữ số tận cùng $\\overline{A2}$ phải chia hết cho 4.",
      solution: `**Phương pháp: Dấu hiệu chia hết đồng thời cho 3 và 4.**
- Số $1523459A2$ chia hết cho 12 khi và chỉ khi đồng thời chia hết cho 3 và 4.
- **Điều kiện chia hết cho 4:** Hai chữ số tận cùng $\\overline{A2}$ phải chia hết cho 4.
  Vì 2 tận cùng nên chữ số hàng chục $A$ phải là số lẻ: $A \\in \\{1, 3, 5, 7, 9\\}$.
- **Điều kiện chia hết cho 3:** Tổng các chữ số phải chia hết cho 3:
  $$\\text{Tổng} = 1 + 5 + 2 + 3 + 4 + 5 + 9 + A + 2 = 31 + A$$
  Vì 31 chia 3 dư 1 nên $A$ phải chia 3 dư 2.
- Trong tập $A \\in \\{1, 3, 5, 7, 9\\}$, chỉ có duy nhất chữ số $5$ chia 3 dư 2 ($31 + 5 = 36 \\,\\vdots\\, 3$).
- Vậy $A = 5$.
**Đáp số: 5.**`
    },
    {
      id: 15,
      category: "Lý thuyết số",
      categoryEn: "Number Theory",
      categoryId: "number_theory",
      questionEn: "The sum of 13 consecutive natural numbers is 260. Find the largest number.",
      questionVi: "Tổng của 13 số tự nhiên liên tiếp là 260. Tìm số lớn nhất trong các số đó.",
      image: null,
      answer: "26",
      acceptableAnswers: ["26"],
      unit: "",
      hint: "Với số lượng số lẻ (13 số), trung bình cộng của dãy đúng bằng số đứng chính giữa (số thứ 7). Từ đó tìm số lớn nhất (số thứ 13).",
      solution: `**Phương pháp: Tính chất trung bình cộng của dãy số cách đều lẻ phần tử.**
- Vì dãy có 13 số tự nhiên liên tiếp (số lượng số lẻ), nên trung bình cộng của 13 số đúng bằng số đứng ở vị trí chính giữa (số thứ 7).
- Số đứng ở vị trí thứ 7 là: $260 : 13 = 20$.
- Số lớn nhất trong dãy là số thứ 13, cách số thứ 7 đúng: $13 - 7 = 6$ đơn vị.
- Vậy số lớn nhất là: $20 + 6 = 26$.
**Đáp số: 26.**`
    },
    {
      id: 16,
      category: "Hình học",
      categoryEn: "Geometry",
      categoryId: "geometry",
      questionEn: "If the length of a cuboid increases by 4cm, the volume will increase by $24\\text{cm}^3$. If the width increases by 2cm, the volume will increase by $24\\text{cm}^3$. If the height increases by 7cm, the volume will increase by $14\\text{cm}^3$. Find the original volume of the cuboid in $\\text{cm}^3$.",
      questionVi: "Nếu chiều dài của một hình hộp chữ nhật tăng thêm 4cm thì thể tích tăng thêm $24\\text{cm}^3$. Nếu chiều rộng tăng thêm 2cm thì thể tích tăng thêm $24\\text{cm}^3$. Nếu chiều cao tăng thêm 7cm thì thể tích tăng thêm $14\\text{cm}^3$. Tìm thể tích ban đầu của hình hộp chữ nhật theo $\\text{cm}^3$.",
      image: null,
      answer: "12",
      acceptableAnswers: ["12"],
      unit: "cm³",
      hint: "Thể tích tăng thêm = độ dài tăng thêm nhân diện tích mặt đáy tương ứng: $4 \\times bc = 24$, $2 \\times ac = 24$, $7 \\times ab = 14$. Nhân 3 tích lại sẽ ra $(abc)^2$.",
      solution: `**Phương pháp: Tỉ lệ thể tích và tích các kích thước hình hộp chữ nhật.**
- Gọi chiều dài, chiều rộng, chiều cao ban đầu của hình hộp lần lượt là $a, b, c$ (cm). Thể tích ban đầu là $V = a \\times b \\times c$.
- Theo đề bài:
  + Chiều dài tăng 4cm $\\implies 4 \\times b \\times c = 24 \\implies b \\times c = 6$.
  + Chiều rộng tăng 2cm $\\implies a \\times 2 \\times c = 24 \\implies a \\times c = 12$.
  + Chiều cao tăng 7cm $\\implies a \\times b \\times 7 = 14 \\implies a \\times b = 2$.
- Nhân cả ba biểu thức lại với nhau:
  $$(a \\times b) \\times (b \\times c) \\times (a \\times c) = 2 \\times 6 \\times 12 = 144$$
  $$(a \\times b \\times c)^2 = 144 \\implies V^2 = 144$$
- Do thể tích $V > 0$, ta có: $V = \\sqrt{144} = 12\\text{ (cm}^3\\text{)}$.
**Đáp số: 12.**`
    },
    {
      id: 17,
      category: "Hình học",
      categoryEn: "Geometry",
      categoryId: "geometry",
      questionEn: "A 3-D figure is formed by cubes with volume 1. The 1st generation, 2nd generation and 3rd generation of the figure are shown below. Find the volume of the figure in the 12th generation.",
      questionVi: "Một hình khối 3 chiều được tạo bởi các khối lập phương có thể tích bằng 1. Thế hệ thứ nhất, thứ hai và thứ ba của hình khối được biểu diễn dưới đây. Tìm thể tích của hình khối ở thế hệ thứ 12.",
      image: "images/q17_cleaned.png",
      answer: "37",
      acceptableAnswers: ["37"],
      unit: "",
      hint: "Đếm số khối lập phương ở thế hệ 1, thế hệ 2, thế hệ 3: Tìm quy luật số khối theo thế hệ $n$ (Cột tháp cao, nhánh trái, nhánh trước).",
      solution: `**Phương pháp: Tìm quy luật số khối lập phương theo thế hệ.**
- Quan sát số khối lập phương qua từng thế hệ:
  + **Thế hệ 1 ($n=1$):** Cột tháp cao 2 khối, nhánh trái 2 khối, nhánh trước 0 khối $\\implies$ Tổng $= 2 + 2 + 0 = 4$ khối.
  + **Thế hệ 2 ($n=2$):** Cột tháp cao 3 khối, nhánh trái 3 khối, nhánh trước 1 khối $\\implies$ Tổng $= 3 + 3 + 1 = 7$ khối.
  + **Thế hệ 3 ($n=3$):** Cột tháp cao 4 khối, nhánh trái 4 khối, nhánh trước 2 khối $\\implies$ Tổng $= 4 + 4 + 2 = 10$ khối.
- Quy luật số khối lập phương ở thế hệ thứ $n$ là:
  $$\\text{Số khối} = 3 \\times n + 1$$
- Ở thế hệ thứ 12 ($n = 12$):
  $$\\text{Số khối} = 3 \\times 12 + 1 = 37\\text{ (khối)}$$
- Vì mỗi khối có thể tích bằng 1 nên tổng thể tích là: $37 \\times 1 = 37$.
**Đáp số: 37.**`
    },
    {
      id: 18,
      category: "Hình học",
      categoryEn: "Geometry",
      categoryId: "geometry",
      questionEn: "The area of a rectangle is 504. If the sides of the rectangle are integers, find the minimum perimeter of the rectangle.",
      questionVi: "Diện tích của một hình chữ nhật là 504. Nếu các cạnh của hình chữ nhật là các số nguyên, tìm chu vi nhỏ nhất của hình chữ nhật đó.",
      image: null,
      answer: "90",
      acceptableAnswers: ["90"],
      unit: "",
      hint: "Diện tích $a \\times b = 504$. Chu vi nhỏ nhất khi tổng $a + b$ nhỏ nhất, tức là $a$ và $b$ phải gần nhau nhất có thể quanh $\\sqrt{504} \\approx 22.45$.",
      solution: `**Phương pháp: Tối ưu hóa chu vi hình chữ nhật khi biết diện tích cố định.**
- Gọi chiều dài và chiều rộng là $a$ và $b$ ($a \\ge b$, $a, b$ nguyên dương).
- Diện tích: $a \\times b = 504$. Chu vi: $P = 2 \\times (a + b)$.
- Để chu vi nhỏ nhất thì tổng $a + b$ phải nhỏ nhất, tức là hai cạnh $a$ và $b$ phải gần nhau nhất có thể.
- Xét căn bậc hai của 504: $\\sqrt{504} \\approx 22.45$.
- Phân tích 504 ra thừa số nguyên tố:
  $$504 = 2^3 \\times 3^2 \\times 7$$
- Các cặp ước nguyên của 504 gần 22 nhất:
  $$21 \\times 24 = 504$$
- Vậy hai kích thước tối ưu là $a = 24$ và $b = 21$.
- Chu vi nhỏ nhất là:
  $$P = 2 \\times (24 + 21) = 2 \\times 45 = 90$$
**Đáp số: 90.**`
    },
    {
      id: 19,
      category: "Hình học",
      categoryEn: "Geometry",
      categoryId: "geometry",
      questionEn: "The figure below is formed by 7 regular hexagons and 6 equilateral triangles. The area of each equilateral triangle is 1. Find the total area of the figure.",
      questionVi: "Hình vẽ dưới đây được tạo bởi 7 hình lục giác đều và 6 hình tam giác đều. Diện tích của mỗi hình tam giác đều là 1. Tìm tổng diện tích của toàn bộ hình vẽ.",
      image: "images/q19_vector.png",
      answer: "48",
      acceptableAnswers: ["48"],
      unit: "",
      hint: "Phân tích 1 hình lục giác đều thành 6 mảnh tam giác đơn vị bằng nhau có diện tích S = 1. Đếm tổng số mảnh tam giác trong toàn bộ hình vẽ: 7 hình lục giác gồm 7 × 6 = 42 mảnh, cộng thêm 6 mảnh tam giác ngoài.",
      solution: `**Phương pháp: Phân tích & ghép mảnh tam giác bằng nhau (Tessellation & Grid Decomposition).**
- **Bước 1: Phân tích 1 hình lục giác đều thành 6 mảnh tam giác bằng nhau:**
  + Nối các đỉnh không kề nhau tạo thành 3 tam giác ở 3 góc và 3 tam giác kề tâm $O$.
  + Sáu tam giác này có diện tích bằng nhau và mỗi hình có diện tích đúng bằng tam giác đơn vị ở ngoài: $S = 1$.
  $$S(\\text{lục giác}) = 6 \\times 1 = 6$$
- **Bước 2: Tính tổng diện tích toàn bộ hình vẽ bằng cách đếm tổng số mảnh tam giác:**
  + 7 hình lục giác đều gồm: $7 \\times 6 = 42$ (mảnh tam giác).
  + 6 hình tam giác ở các khe bên ngoài: 6 (mảnh tam giác).
  + Tổng số mảnh tam giác của toàn bộ hình là: $42 + 6 = 48$ (mảnh tam giác).
  $$S_{\\text{tổng}} = 42 + 6 = 48$$
<div style="text-align:center; margin:12px 0;"><img src="images/q19_ghep_hinh.png" style="max-width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" alt="Minh họa phương pháp ghép hình Câu 19"></div>
**Đáp số: 48.**`
    },
    {
      id: 20,
      category: "Hình học",
      categoryEn: "Geometry",
      categoryId: "geometry",
      questionEn: "Given $ABCD$ is a parallelogram. $P$ is a point inside $ABCD$. The area of $\\Delta APD$ is 74 and the area of $\\Delta BCP$ is $13\\%$ of the area of $ABCD$. Find the area of $ABCD$.",
      questionVi: "Cho $ABCD$ là một hình bình hành. $P$ là một điểm nằm bên trong $ABCD$. Diện tích của tam giác $APD$ bằng 74 và diện tích của tam giác $BCP$ bằng $13\\%$ diện tích hình bình hành $ABCD$. Tìm diện tích hình bình hành $ABCD$.",
      image: "images/q20_vector.png",
      answer: "200",
      acceptableAnswers: ["200"],
      unit: "",
      hint: "Bổ đề hình bình hành: Với mọi điểm $P$ nằm trong hình bình hành $ABCD$, tổng diện tích hai tam giác đối đỉnh qua $P$ luôn bằng một nửa diện tích hình bình hành: $S(APD) + S(BCP) = 50\\% \\times S(ABCD)$.",
      solution: `**Phương pháp: Bổ đề diện tích điểm trong hình bình hành.**
- Kẻ đường thẳng qua $P$ vuông góc với hai đáy $AD$ và $BC$.
  Gọi khoảng cách từ $P$ đến $AD$ là $h_1$ và đến $BC$ là $h_2$.
  Chiều cao của hình bình hành là $h = h_1 + h_2$, và đáy $AD = BC$.
- Ta có:
  $$S(APD) + S(BCP) = \\frac{1}{2}AD \\times h_1 + \\frac{1}{2}BC \\times h_2 = \\frac{1}{2}AD \\times (h_1 + h_2) = \\frac{1}{2} S(ABCD)$$
  Như vậy: $S(APD) + S(BCP) = 50\\% \\times S(ABCD)$.
- Theo đề bài: $S(APD) = 74$ và $S(BCP) = 13\\% \\times S(ABCD)$.
- Thay vào bổ đề:
  $$74 + 13\\% \\times S(ABCD) = 50\\% \\times S(ABCD)$$
  $$(50\\% - 13\\%) \\times S(ABCD) = 74$$
  $$37\\% \\times S(ABCD) = 74 \\implies S(ABCD) = 74 : 0.37 = 200$$
**Đáp số: 200.**`
    },
    {
      id: 21,
      category: "Tổ hợp",
      categoryEn: "Combinatorics",
      categoryId: "combinatorics",
      questionEn: "At least how many numbers should be chosen from 1 to 222 arbitrarily to ensure that there are at least two numbers whose difference is 32?",
      questionVi: "Cần chọn tùy ý ít nhất bao nhiêu số từ 1 đến 222 để chắc chắn rằng có ít nhất hai số có hiệu bằng 32?",
      image: null,
      answer: "127",
      acceptableAnswers: ["127"],
      unit: "số",
      hint: "Nguyên lý Dirichlet: Chia các số từ 1 đến 222 thành các chuỗi có hiệu bằng 32 (theo số dư khi chia cho 32). Tìm số lượng lớn nhất có thể chọn sao cho KHÔNG có 2 số nào có hiệu bằng 32, rồi cộng thêm 1.",
      solution: `**Phương pháp: Nguyên lý Dirichlet và bài toán hiệu số cố định.**
- Ta cần tìm số phần tử lớn nhất có thể chọn sao cho KHÔNG có 2 số nào có hiệu bằng 32 (trường hợp xấu nhất).
- Ta có $222 = 32 \\times 6 + 30$. Chia các số thành 32 chuỗi số dư theo modulo 32:
  + Với 30 số dư $r \\in \\{1, 2, \\dots, 30\\}$: Mỗi chuỗi có 7 số $(r, r+32, r+64, \\dots, r+192)$. Trong 7 số liên tiếp cách nhau 32, để không có 2 số liên tiếp nào cùng được chọn, ta chọn tối đa được 4 số (ở các vị trí 1, 3, 5, 7).
    Tổng cộng chọn được: $30 \\times 4 = 120$ số.
  + Với 2 số dư $r \\in \\{31, 32\\}$: Mỗi chuỗi có 6 số $(r, r+32, \\dots, r+160)$. Trong 6 số, chọn tối đa được 3 số không liên tiếp.
    Tổng cộng chọn được: $2 \\times 3 = 6$ số.
- Số lượng số tối đa có thể chọn mà không có cặp nào có hiệu bằng 32 là:
  $$120 + 6 = 126\\text{ (số)}$$
- Theo nguyên lý Dirichlet, nếu ta chọn ra $126 + 1 = 127$ số thì chắc chắn phải tồn tại ít nhất 2 số có hiệu bằng 32.
**Đáp số: 127.**`
    },
    {
      id: 22,
      category: "Tổ hợp",
      categoryEn: "Combinatorics",
      categoryId: "combinatorics",
      questionEn: "There are 9 boys and 6 girls. 2 boys and 2 girls are chosen to form a research group. How many different combination(s) is / are there?",
      questionVi: "Có 9 bạn nam và 6 bạn nữ. Cần chọn ra 2 bạn nam và 2 bạn nữ để lập thành một nhóm nghiên cứu. Hỏi có bao nhiêu cách chọn khác nhau?",
      image: null,
      answer: "540",
      acceptableAnswers: ["540"],
      unit: "cách",
      hint: "Tính số cách chọn 2 bạn nam từ 9 bạn: $\\frac{9 \\times 8}{2}$. Tính số cách chọn 2 bạn nữ từ 6 bạn: $\\frac{6 \\times 5}{2}$. Sau đó nhân hai kết quả lại.",
      solution: `**Phương pháp: Quy tắc nhân và tổ hợp chọn cặp độc lập.**
- Số cách chọn 2 bạn nam từ 9 bạn nam:
  $$\\frac{9 \\times 8}{2} = 36\\text{ (cách)}$$
- Số cách chọn 2 bạn nữ từ 6 bạn nữ:
  $$\\frac{6 \\times 5}{2} = 15\\text{ (cách)}$$
- Vì việc chọn nam và chọn nữ là hai công đoạn độc lập, theo quy tắc nhân, tổng số cách chọn một nhóm gồm 2 nam và 2 nữ là:
  $$36 \\times 15 = 540\\text{ (cách)}$$
**Đáp số: 540.**`
    },
    {
      id: 23,
      category: "Tổ hợp",
      categoryEn: "Combinatorics",
      categoryId: "combinatorics",
      questionEn: "How many 3-digit number(s) without repeated digits can be formed by digits 0, 2, 3, 6, 8, 9 that is / are divisible by 3?",
      questionVi: "Có thể lập được bao nhiêu số có 3 chữ số khác nhau từ các chữ số 0, 2, 3, 6, 8, 9 sao cho số đó chia hết cho 3?",
      image: null,
      answer: "18",
      acceptableAnswers: ["18"],
      unit: "số",
      hint: "Phân loại các chữ số $\\{0, 2, 3, 6, 8, 9\\}$ theo số dư khi chia cho 3: Nhóm dư 0: $\\{0, 3, 6, 9\\}$; Nhóm dư 1: Rỗng; Nhóm dư 2: $\\{2, 8\\}$. Ba số có tổng chia hết cho 3 chỉ có thể cùng thuộc nhóm dư 0.",
      solution: `**Phương pháp: Dấu hiệu chia hết cho 3 và phân nhóm đồng dư.**
- Phân loại các chữ số $\\{0, 2, 3, 6, 8, 9\\}$ theo số dư khi chia cho 3:
  + Nhóm dư 0: $\\{0, 3, 6, 9\\}$ (4 chữ số).
  + Nhóm dư 1: Rỗng (0 chữ số).
  + Nhóm dư 2: $\\{2, 8\\}$ (2 chữ số).
- Để số có 3 chữ số chia hết cho 3 thì tổng 3 chữ số phải chia hết cho 3.
  Vì không có chữ số nào ở nhóm dư 1, nên ta KHÔNG THỂ chọn bộ 3 chữ số gồm (1 số dư 0, 1 số dư 1, 1 số dư 2) hay 3 số cùng dư 2 (vì nhóm dư 2 chỉ có 2 chữ số).
  Do đó, **cả 3 chữ số bắt buộc phải cùng thuộc nhóm dư 0: $\\{0, 3, 6, 9\\}$**.
- Chọn 3 chữ số từ $\\{0, 3, 6, 9\\}$:
  + **Bộ không chứa chữ số 0:** $\\{3, 6, 9\\} \\implies$ lập được $3! = 3 \\times 2 \\times 1 = 6$ số.
  + **Các bộ chứa chữ số 0:** gồm $\\{0, 3, 6\\}, \\{0, 3, 9\\}, \\{0, 6, 9\\}$ (3 bộ).
    Với mỗi bộ có chữ số 0: chữ số hàng trăm có 2 cách chọn (khác 0), hàng chục có 2 cách chọn, hàng đơn vị có 1 cách chọn $\\implies 2 \\times 2 \\times 1 = 4$ số.
    Ba bộ lập được: $3 \\times 4 = 12$ số.
- Tổng số lượng các số thỏa mãn là:
  $$6 + 12 = 18\\text{ (số)}$$
**Đáp số: 18.**`
    },
    {
      id: 24,
      category: "Tổ hợp",
      categoryEn: "Combinatorics",
      categoryId: "combinatorics",
      questionEn: "How many positive integer(s) less than 200 without repeated digits is / are there?",
      questionVi: "Có bao nhiêu số nguyên dương nhỏ hơn 200 có các chữ số khác nhau?",
      image: null,
      answer: "162",
      acceptableAnswers: ["162"],
      unit: "số",
      hint: "Phân loại đếm số theo số lượng chữ số: Các số có 1 chữ số, 2 chữ số và 3 chữ số (nhỏ hơn 200 thì chữ số hàng trăm bắt buộc là 1).",
      solution: `**Phương pháp: Phân loại đếm số theo số lượng chữ số.**
- Các số nguyên dương nhỏ hơn 200 có các chữ số phân biệt gồm:
  + **Số có 1 chữ số (từ 1 đến 9):** Có 9 số.
  + **Số có 2 chữ số (từ 10 đến 99):**
    Chữ số hàng chục có 9 cách chọn (từ 1 đến 9).
    Chữ số hàng đơn vị có 9 cách chọn (khác chữ số hàng chục).
    $\\implies 9 \\times 9 = 81$ số.
  + **Số có 3 chữ số nhỏ hơn 200 (từ 100 đến 199, có dạng $\\overline{1bc}$):**
    Chữ số hàng trăm là 1 (có 1 cách chọn).
    Chữ số hàng chục $b \\in \\{0, 2, 3, \\dots, 9\\}$ (9 cách chọn, $b \\ne 1$).
    Chữ số hàng đơn vị $c$ có 8 cách chọn ($c \\ne 1$ và $c \\ne b$).
    $\\implies 1 \\times 9 \\times 8 = 72$ số.
- Tổng số các số thỏa mãn là:
  $$9 + 81 + 72 = 162\\text{ (số)}$$
**Đáp số: 162.**`
    },
    {
      id: 25,
      category: "Tổ hợp",
      categoryEn: "Combinatorics",
      categoryId: "combinatorics",
      questionEn: "How many positive integer(s) from 1 to 6666 with two '6' and one '7' is / are there?",
      questionVi: "Có bao nhiêu số nguyên dương từ 1 đến 6666 có chứa đúng hai chữ số 6 và đúng một chữ số 7?",
      image: null,
      answer: "36",
      acceptableAnswers: ["36"],
      unit: "số",
      hint: "Số này có ít nhất 3 chữ số (hai số 6 và một số 7). Chia thành hai trường hợp: Số có 3 chữ số và Số có 4 chữ số (lưu ý số $\\le 6666$).",
      solution: `**Phương pháp: Phân loại đếm số thỏa mãn điều kiện chữ số.**
- Số cần tìm chứa đúng hai chữ số 6 và đúng một chữ số 7, do đó số này có ít nhất 3 chữ số.
- **Trường hợp 1: Số có 3 chữ số (từ 100 đến 999):**
  + Được tạo thành từ đúng bộ chữ số $\\{6, 6, 7\\}$.
  + Số cách sắp xếp là: $\\frac{3!}{2!} = 3$ số ($667, 676, 766$). Cả 3 số đều $< 6666$.
- **Trường hợp 2: Số có 4 chữ số nhỏ hơn hoặc bằng 6666:**
  Gồm hai chữ số 6, một chữ số 7 và một chữ số $d \\in \\{0, 1, 2, 3, 4, 5, 8, 9\\}$ (8 khả năng của $d$).
  Vì số $\\le 6666$ nên chữ số hàng nghìn phải $\\le 6$:
  + *Nếu chữ số hàng nghìn là 6:*
    Ba chữ số còn lại gồm đúng một số 6, một số 7 và một số $d$.
    - Nếu hàng trăm là 6: số có dạng $\\overline{66d7}$, để $\\le 6666$ thì $d \\le 5$ ($d \\in \\{0, 1, 2, 3, 4, 5\\}$) $\\implies$ có 6 số.
    - Nếu hàng trăm là $d \\le 5$ (6 cách chọn): số có dạng $\\overline{6d...}$, hai vị trí cuối là 6 và 7 có $2! = 2$ cách xếp $\\implies 6 \\times 2 = 12$ số.
    $\\implies$ Hàng nghìn là 6 có: $6 + 12 = 18$ số.
  + *Nếu chữ số hàng nghìn là $d \\in \\{1, 2, 3, 4, 5\\}$ (5 cách chọn, $d \\ne 0$):*
    Lúc này số luôn $< 6000 < 6666$. Ba vị trí còn lại là $\\{6, 6, 7\\}$ có $\\frac{3!}{2!} = 3$ cách xếp.
    $\\implies$ Có $5 \\times 3 = 15$ số.
  $\\implies$ Tổng số có 4 chữ số là: $18 + 15 = 33$ số.
- Tổng cộng cả số có 3 chữ số và 4 chữ số là:
  $$3 + 33 = 36\\text{ (số)}$$
**Đáp số: 36.**`
    }
  ]
};

// Cẩm nang công thức vàng TIMO Khối 6
const FORMULA_CHEATSHEET = [
  {
    title: "Hàm phi Euler $\\varphi(n)$",
    category: "Lý thuyết số",
    summary: "Đếm số các số nguyên dương nhỏ hơn $n$ và nguyên tố cùng nhau với $n$.",
    formula: "\\varphi(n) = n \\times \\left(1 - \\frac{1}{p_1}\\right) \\left(1 - \\frac{1}{p_2}\\right) \\dots \\left(1 - \\frac{1}{p_k}\\right)",
    example: "Với $1386 = 2 \\times 3^2 \\times 7 \\times 11$:<br>$\\varphi(1386) = 1386 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{6}{7} \\times \\frac{10}{11} = 360$."
  },
  {
    title: "Chuỗi sai phân triệt tiêu (Telescoping)",
    category: "Số học",
    summary: "Tách phân số có mẫu là tích 2 số cách đều $k$ đơn vị để triệt tiêu phần giữa.",
    formula: "\\frac{k}{n(n+k)} = \\frac{1}{n} - \\frac{1}{n+k}",
    example: "$\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{20 \\times 21} = 1 - \\frac{1}{21} = \\frac{20}{21}$."
  },
  {
    title: "Bổ đề diện tích điểm trong hình bình hành",
    category: "Hình học",
    summary: "Với mọi điểm $P$ nằm trong hình bình hành $ABCD$, tổng diện tích 2 tam giác đối đỉnh bằng một nửa hình bình hành.",
    formula: "S(\\Delta APD) + S(\\Delta BCP) = S(\\Delta ABP) + S(\\Delta CDP) = 50\\% \\times S(ABCD)",
    example: "Nếu $S(APD) = 74$ và $S(BCP) = 13\\% S$, thì $74 + 13\\% S = 50\\% S \\implies 37\\% S = 74 \\implies S = 200$."
  },
  {
    title: "Nguyên lý lồng chim bồ câu (Dirichlet)",
    category: "Tổ hợp",
    summary: "Nếu nhốt $n + 1$ chú thỏ vào $n$ chiếc lồng thì luôn có ít nhất một lồng chứa từ 2 chú thỏ trở lên.",
    formula: "\\text{Số phần tử cần chọn} = \\text{Số lượng tối đa không thỏa mãn} + 1",
    example: "Để chọn các số từ 1 đến 222 sao cho có 2 số có hiệu bằng 32: Số tối đa chọn được mà không cặp nào có hiệu bằng 32 là 126 $\\implies$ Cần chọn ít nhất $126 + 1 = 127$ số."
  },
  {
    title: "Tổ hợp chọn cặp đôi $\\binom{n}{2}$",
    category: "Tổ hợp",
    summary: "Số cách chọn 2 phần tử tùy ý từ $n$ phần tử không phân biệt thứ tự.",
    formula: "\\binom{n}{2} = \\frac{n(n - 1)}{2}",
    example: "Chọn 2 nam từ 9 nam: $\\frac{9 \\times 8}{2} = 36$ cách; Chọn 2 nữ từ 6 nữ: $\\frac{6 \\times 5}{2} = 15$ cách $\\implies$ Tổng $36 \\times 15 = 540$ nhóm."
  },
  {
    title: "Tối ưu hóa chu vi hình chữ nhật",
    category: "Hình học",
    summary: "Khi diện tích hình chữ nhật cố định, chu vi nhỏ nhất khi hai cạnh có độ dài gần nhau nhất.",
    formula: "a \\times b = S \\implies P = 2(a + b) \\text{ đạt min khi } |a - b| \\text{ nhỏ nhất}",
    example: "Với $S = 504$, vì $\\sqrt{504} \\approx 22.45$, ta chọn cặp ước nguyên gần 22 nhất là $21 \\times 24 = 504 \\implies P_{\\min} = 2(21 + 24) = 90$."
  }
];
