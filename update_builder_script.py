import re

new_days_data = '''DAYS_DATA = {
    1: {
        "title": "第一课 九月去北京旅游最好",
        "sub": "Bài 1: Đi Bắc Kinh du lịch vào tháng 9 là tốt nhất",
        "vocab": [
            {"key": "jiu", "word": "就", "pinyin": "jiù", "hanviet": "Tựu", "pos": "phó từ", "tone": "Bình thường", "meaning": "Thì, ngay, chính là", "ex_zh": "我们这就出发。", "ex_py": "Wǒmen jiù zhè chūfā.", "ex_vi": "Chúng ta xuất phát ngay bây giờ."},
            {"key": "gei", "word": "给", "pinyin": "gěi", "hanviet": "Cấp", "pos": "giới từ", "tone": "Bình thường", "meaning": "Cho, cho ai, đưa cho", "ex_zh": "这是给你的书。", "ex_py": "Zhè shì gěi nǐ de shū.", "ex_vi": "Đây là cuốn sách cho bạn."},
            {"key": "rang", "word": "让", "pinyin": "ràng", "hanviet": "Nhượng", "pos": "động từ", "tone": "Bình thường", "meaning": "Bảo, nhường, cho phép", "ex_zh": "让我想想。", "ex_py": "Ràng wǒ xiǎngxiang.", "ex_vi": "Để tôi suy nghĩ một chút."},
            {"key": "jie", "word": "接", "pinyin": "jiē", "hanviet": "Tiếp", "pos": "động từ", "tone": "Bình thường", "meaning": "Đón, nhận, tiếp theo", "ex_zh": "我去机场接朋友。", "ex_py": "Wǒ qù jīchǎng jiē péngyou.", "ex_vi": "Tôi đi sân bay đón bạn."},
            {"key": "ci", "word": "次", "pinyin": "cì", "hanviet": "Thứ", "pos": "lượng từ", "tone": "Bình thường", "meaning": "Lần, lượt", "ex_zh": "我去过一次北京。", "ex_py": "Wǒ qù guo yí cì Běijīng.", "ex_vi": "Tôi từng đi Bắc Kinh một lần."},
            {"key": "lvyou", "word": "旅游", "pinyin": "lǚyóu", "hanviet": "Lữ Du", "pos": "động từ", "tone": "Bình thường", "meaning": "Du lịch, đi chơi", "ex_zh": "九月去北京旅游最好。", "ex_py": "Jiǔyuè qù Běijīng lǚyóu zuì hǎo.", "ex_vi": "Đi Bắc Kinh du lịch tháng 9 tốt nhất."},
            {"key": "bangmang", "word": "帮忙", "pinyin": "bāngmáng", "hanviet": "Bang Mang", "pos": "động từ ly hợp", "tone": "Bình thường", "meaning": "Giúp đỡ, nhờ giúp", "ex_zh": "谢谢你帮我的忙。", "ex_py": "Xièxie nǐ bāng wǒ de máng.", "ex_vi": "Cảm ơn bạn đã giúp tôi."},
            {"key": "buhaoyisi", "word": "不好意思", "pinyin": "bù hǎoyìsi", "hanviet": "Bất Hảo Ý Tư", "pos": "cụm từ", "tone": "Bình thường", "meaning": "Ngại quá, xin lỗi", "ex_zh": "真不好意思，我迟到了。", "ex_py": "Zhēn bù hǎoyìsi, wǒ chídào le.", "ex_vi": "Thật ngại quá, tôi đến muộn rồi."},
            {"key": "yijing", "word": "已经", "pinyin": "yǐjīng", "hanviet": "Dĩ Kinh", "pos": "phó từ", "tone": "Bình thường", "meaning": "Đã, rồi", "ex_zh": "我已经吃过了。", "ex_py": "Wǒ yǐjīng chī guo le.", "ex_vi": "Tôi đã ăn rồi."},
            {"key": "na", "word": "那", "pinyin": "nà", "hanviet": "Na", "pos": "liên từ", "tone": "Bình thường", "meaning": "Thế thì, vậy thì", "ex_zh": "那我们明天去吧。", "ex_py": "Nà wǒmen míngtiān qù ba.", "ex_vi": "Thế thì ngày mai chúng ta đi nhé."},
            {"key": "jieshao", "word": "介绍", "pinyin": "jièshào", "hanviet": "Giới Thiệu", "pos": "động từ", "tone": "Bình thường", "meaning": "Giới thiệu", "ex_zh": "我给你介绍一下。", "ex_py": "Wǒ gěi nǐ jièshào yíxià.", "ex_vi": "Tôi giới thiệu với bạn một chút."},
            {"key": "youshi", "word": "有时", "pinyin": "yǒushí", "hanviet": "Hữu Thì", "pos": "phó từ", "tone": "Bình thường", "meaning": "Có lúc, thỉnh thoảng", "ex_zh": "他有时看书，有时看电影。", "ex_py": "Tā yǒushí kàn shū, yǒushí kàn diànyǐng.", "ex_vi": "Cậu ấy có lúc đọc sách, có lúc xem phim."},
            {"key": "dong", "word": "懂", "pinyin": "dǒng", "hanviet": "Đổng", "pos": "động từ", "tone": "Bình thường", "meaning": "Hiểu, nắm rõ", "ex_zh": "我听懂了。", "ex_py": "Wǒ tīng dǒng le.", "ex_vi": "Tôi nghe hiểu rồi."},
            {"key": "yisi", "word": "意思", "pinyin": "yìsi", "hanviet": "Ý Tư", "pos": "danh từ", "tone": "Khinh thanh (si)", "meaning": "Ý nghĩa, sở thích", "ex_zh": "这是什么意思？", "ex_py": "Zhè shì shénme yìsi?", "ex_vi": "Đây là có ý nghĩa gì?"}
        ],
        "chars": [
            {"id": "jiu-1", "char": "就", "pinyin": "jiù", "meaning": "就 (Thì, chính)"},
            {"id": "gei-1", "char": "给", "pinyin": "gěi", "meaning": "给 (Cho, đưa)"},
            {"id": "rang-1", "char": "让", "pinyin": "ràng", "meaning": "让 (Nhường, bảo)"},
            {"id": "jie-1", "char": "接", "pinyin": "jiē", "meaning": "接 (Đón, nhận)"},
            {"id": "ci-1", "char": "次", "pinyin": "cì", "meaning": "次 (Lần, lượt)"},
            {"id": "lv-1", "char": "旅", "pinyin": "lǚ", "meaning": "旅游 (Du lịch)"},
            {"id": "you-1", "char": "游", "pinyin": "yóu", "meaning": "旅游 (Du lịch)"},
            {"id": "bang-1", "char": "帮", "pinyin": "bāng", "meaning": "帮忙 (Giúp đỡ)"},
            {"id": "mang-1", "char": "忙", "pinyin": "máng", "meaning": "帮忙 (Giúp đỡ)"},
            {"id": "yi-1", "char": "已", "pinyin": "yǐ", "meaning": "已经 (Đã)"},
            {"id": "jing-1", "char": "经", "pinyin": "jīng", "meaning": "已经 (Đã)"},
            {"id": "jie-2", "char": "介", "pinyin": "jiè", "meaning": "介绍 (Giới thiệu)"},
            {"id": "shao-1", "char": "绍", "pinyin": "shào", "meaning": "介绍 (Giới thiệu)"},
            {"id": "dong-1", "char": "懂", "pinyin": "dǒng", "meaning": "懂 (Hiểu)"}
        ],
        "text": {
            "text1": {
                "title": "在学校 (Ở trường)",
                "icon": "🏫",
                "lines": [
                    {"spk": "A", "zh": "我想去中国旅游，几月去最好？", "py": "Wǒ xiǎng qù Zhōngguó lǚyóu, jǐ yuè qù zuì hǎo?", "vi": "Tôi muốn đi Trung Quốc du lịch, đi tháng mấy là tốt nhất?"},
                    {"spk": "B", "zh": "九月去北京旅游最好。", "py": "Jiǔyuè qù Běijīng lǚyóu zuì hǎo.", "vi": "Đi Bắc Kinh du lịch tháng 9 là tốt nhất."},
                    {"spk": "A", "zh": "为什么？", "py": "Wèishénme?", "vi": "Tại sao?"},
                    {"spk": "B", "zh": "九月的北京天气最好，不冷也不热。", "py": "Jiǔyuè de Běijīng tiānqì zuì hǎo, bù lěng yě bù rè.", "vi": "Thời tiết Bắc Kinh tháng 9 tốt nhất, không lạnh cũng không nóng."}
                ]
            },
            "text2": {
                "title": "在运动场 (Ở sân vận động)",
                "icon": "⚽",
                "lines": [
                    {"spk": "A", "zh": "你喜欢什么运动？", "py": "Nǐ xǐhuan shénme yùndòng?", "vi": "Bạn thích môn thể thao gì?"},
                    {"spk": "B", "zh": "我最喜欢踢足球。", "py": "Wǒ zuì xǐhuan tī zúqiú.", "vi": "Tôi thích nhất là đá bóng."},
                    {"spk": "A", "zh": "下午我们一起去踢足球吧。", "py": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.", "vi": "Chiều nay chúng ta cùng đi đá bóng nhé."},
                    {"spk": "B", "zh": "好啊！几点去？", "py": "Hǎo a! Jǐ diǎn qù?", "vi": "Được thôi! Mấy giờ đi?"}
                ]
            },
            "text3": {
                "title": "在公司 (Ở công ty)",
                "icon": "🏢",
                "lines": [
                    {"spk": "A", "zh": "我们可以什么时候去北京？", "py": "Wǒmen kěyǐ shénme shíhou qù Běijīng?", "vi": "Khi nào chúng ta có thể đi Bắc Kinh?"},
                    {"spk": "B", "zh": "让我想想，下个星期六去吧。", "py": "Ràng wǒ xiǎngxiang, xià gè xīngqīliù qù ba.", "vi": "Để tôi suy nghĩ một chút, thứ 7 tuần sau đi nhé."},
                    {"spk": "A", "zh": "那太好了，我给你买机票。", "py": "Nà tài hǎo le, wǒ gěi nǐ mǎi jīpiào.", "vi": "Thế thì tốt quá, tôi mua vé máy bay cho bạn."},
                    {"spk": "B", "zh": "谢谢你！真不好意思，让你帮忙。", "py": "Xièxie nǐ! Zhēn bù hǎoyìsi, ràng nǐ bāngmáng.", "vi": "Cảm ơn bạn! Thật ngại quá, lại nhờ bạn giúp đỡ."}
                ]
            },
            "text4": {
                "title": "在机场 (Ở sân bay)",
                "icon": "✈️",
                "lines": [
                    {"spk": "A", "zh": "你去机场做什么？", "py": "Nǐ qù jīchǎng zuò shénme?", "vi": "Bạn đi sân bay làm gì?"},
                    {"spk": "B", "zh": "我去机场接朋友，他第一次来北京。", "py": "Wǒ qù jīchǎng jiē péngyou, tā dì yī cì lái Běijīng.", "vi": "Tôi đi sân bay đón bạn, cậu ấy lần đầu tiên đến Bắc Kinh."},
                    {"spk": "A", "zh": "我给你介绍一下，这是我的朋友小明。", "py": "Wǒ gěi nǐ jièshào yíxià, zhè shì wǒ de péngyou Xiǎomíng.", "vi": "Tôi giới thiệu với bạn một chút, đây là bạn tôi Tiểu Minh."},
                    {"spk": "B", "zh": "你好！欢迎你来北京！", "py": "Nǐ hǎo! Huānyíng nǐ lái Běijīng!", "vi": "Xin chào! Chào mừng bạn đến Bắc Kinh!"}
                ]
            }
        },
        "grammar": [
            {"title": "1. Phó từ mức độ '最' (Thích nhất, tốt nhất)", "desc": "Diễn đạt mức độ cao nhất trong các lựa chọn.", "struct": "最 + Tính từ / Động từ", "ex": "九月去北京旅游<b>最</b>好。(Đi Bắc Kinh tháng 9 tốt nhất.) / 我<b>最</b>喜欢踢足球。(Tôi thích đá bóng nhất.)"},
            {"title": "2. Cấu trúc câu kiêm ngữ '让' (Bảo, để, nhường)", "desc": "Chỉ thị hoặc cho phép ai đó làm việc gì.", "struct": "主语 + 让 + 人 + 动作", "ex": "<b>让</b>我想想。(Để tôi suy nghĩ.) / 妈妈<b>让</b>我去买苹果。(Mẹ bảo tôi đi mua táo.)"},
            {"title": "3. Động từ năng nguyện '要' (Muốn, cần làm gì)", "desc": "Diễn đạt dự định hoặc nhu cầu cần làm.", "struct": "主语 + 要 + 动作", "ex": "我们<b>要</b>去北京旅游。(Chúng tôi muốn đi Bắc Kinh du lịch.)"},
            {"title": "4. Cụm từ lịch sự '不好意思' (Ngại quá, xin lỗi)", "desc": "Dùng khi cảm thấy ngại ngùng hoặc xin lỗi lịch sự.", "struct": "真不好意思 + Lời giải thích", "ex": "真<b>不好意思</b>，我迟到了。(Thật ngại quá, tôi đến muộn rồi.)"}
        ],
        "culture": {
            "title": "Bắc Kinh Thu Sang & Món Vịt Quay Nổi Tiếng",
            "p1": "Người Trung Quốc có câu 'Mùa thu Bắc Kinh là thiên đường hạ giới'. Khí hậu tháng 9 bớt oi nóng, bầu trời trong xanh dịu mát.",
            "p2": "Vịt quay Bắc Kinh (北京烤鸭) với lớp da giòn rụm và thịt mềm thơm là món ăn truyền thống không thể bỏ qua khi ghé thăm thủ đô."
        }
    },
    2: {
        "title": "第二课 我每天六点起床",
        "sub": "Bài 2: Tôi thức dậy lúc 6 giờ mỗi ngày",
        "vocab": [
            {"key": "gongjiaoche", "word": "公交车", "pinyin": "gōngjiāochē", "hanviet": "Công Giao Xa", "pos": "danh từ", "tone": "Bình thường", "meaning": "Xe buýt, xe công cộng", "ex_zh": "我坐公交车去学校。", "ex_py": "Wǒ zuò gōngjiāochē qù xuéxiào.", "ex_vi": "Tôi đi xe buýt đến trường."},
            {"key": "dan", "word": "但", "pinyin": "dàn", "hanviet": "Đản", "pos": "liên từ", "tone": "Bình thường", "meaning": "Nhưng, nhưng mà", "ex_zh": "我想去，但没有时间。", "ex_py": "Wǒ xiǎng qù, dàn méiyǒu shíjiān.", "ex_vi": "Tôi muốn đi nhưng không có thời gian."},
            {"key": "chezhan", "word": "车站", "pinyin": "chēzhàn", "hanviet": "Xa Trạm", "pos": "danh từ", "tone": "Bình thường", "meaning": "Trạm xe, bến xe", "ex_zh": "我在车站等你。", "ex_py": "Wǒ zài chēzhàn děng nǐ.", "ex_vi": "Tôi đợi bạn ở trạm xe."},
            {"key": "yuan", "word": "远", "pinyin": "yuǎn", "hanviet": "Viễn", "pos": "tính từ", "tone": "Bình thường", "meaning": "Xa, khoảng cách xa", "ex_zh": "我家离学校不远。", "ex_py": "Wǒ jiā lí xuéxiào bù yuǎn.", "ex_vi": "Nhà tôi cách trường không xa."},
            {"key": "dache", "word": "打车", "pinyin": "dǎchē", "hanviet": "Đả Xa", "pos": "động từ", "tone": "Bình thường", "meaning": "Bắt xe taxi", "ex_zh": "太晚了，我们打车吧。", "ex_py": "Tài wǎn le, wǒmen dǎchē ba.", "ex_vi": "Muộn quá rồi, chúng ta bắt taxi nhé."},
            {"key": "haishi", "word": "还是", "pinyin": "háishì", "hanviet": "Hoàn Thị", "pos": "phó từ", "tone": "Bình thường", "meaning": "Hay là, vẫn là", "ex_zh": "你喝茶还是喝咖啡？", "ex_py": "Nǐ hē chá háishì hē kāfēi?", "ex_vi": "Bạn uống trà hay uống cà phê?"},
            {"key": "beijingdaxue", "word": "北京大学", "pinyin": "Běijīng Dàxué", "hanviet": "Bắc Kinh Đại Học", "pos": "danh từ riêng", "tone": "Bình thường", "meaning": "Đại học Bắc Kinh", "ex_zh": "他在北京大学学习。", "ex_py": "Tā zài Běijīng Dàxué xuéxí.", "ex_vi": "Cậu ấy học ở Đại học Bắc Kinh."},
            {"key": "a", "word": "啊", "pinyin": "a", "hanviet": "A", "pos": "trợ từ", "tone": "Thán từ", "meaning": "Thán từ cảm thán (À, nhé)", "ex_zh": "好啊，我们一起去！", "ex_py": "Hǎo a, wǒmen yìqǐ qù!", "ex_vi": "Được nhé, chúng ta cùng đi!"},
            {"key": "wan", "word": "万", "pinyin": "wàn", "hanviet": "Vạn", "pos": "số từ", "tone": "Bình thường", "meaning": "Mười nghìn (10.000)", "ex_zh": "这本书一万字。", "ex_py": "Zhè běn shū yí wàn zì.", "ex_vi": "Cuốn sách này mười nghìn chữ."},
            {"key": "ming", "word": "名", "pinyin": "míng", "hanviet": "Danh", "pos": "lượng từ", "tone": "Bình thường", "meaning": "Người (Lượng từ cho sinh viên, bác sĩ)", "ex_zh": "一名医生。", "ex_py": "Yì míng yīshēng.", "ex_vi": "Một vị bác sĩ."},
            {"key": "wangshang", "word": "网上", "pinyin": "wǎngshang", "hanviet": "Võng Thượng", "pos": "danh từ", "tone": "Bình thường", "meaning": "Trên mạng, internet", "ex_zh": "我在网上买衣服。", "ex_py": "Wǒ zài wǎngshang mǎi yīfu.", "ex_vi": "Tôi mua quần áo trên mạng."},
            {"key": "waiguo", "word": "外国", "pinyin": "wàiguó", "hanviet": "Ngoại Quốc", "pos": "danh từ", "tone": "Bình thường", "meaning": "Nước ngoài", "ex_zh": "他是外国留学生。", "ex_py": "Tā shì wàiguó liúxuéshēng.", "ex_vi": "Cậu ấy là lưu học sinh nước ngoài."},
            {"key": "jian", "word": "间", "pinyin": "jiān", "hanviet": "Gian", "pos": "lượng từ", "tone": "Bình thường", "meaning": "Căn, phòng (Lượng từ phòng)", "ex_zh": "一间教室。", "ex_py": "Yì jiān jiàoshì.", "ex_vi": "Một phòng học."},
            {"key": "jiaoshi", "word": "教室", "pinyin": "jiàoshì", "hanviet": "Giáo Thất", "pos": "danh từ", "tone": "Bình thường", "meaning": "Phòng học, lớp học", "ex_zh": "同学们在教室里。", "ex_py": "Tóngxuémen zài jiàoshì li.", "ex_vi": "Các bạn học sinh ở trong lớp học."},
            {"key": "piao", "word": "票", "pinyin": "piào", "hanviet": "Phiếu", "pos": "danh từ", "tone": "Bình thường", "meaning": "Vé (vé xe, vé xem phim)", "ex_zh": "我买了两张车票。", "ex_py": "Wǒ mǎi le liǎng zhāng chēpiào.", "ex_vi": "Tôi đã mua hai tấm vé xe."},
            {"key": "bie", "word": "别", "pinyin": "bié", "hanviet": "Biệt", "pos": "phó từ", "tone": "Bình thường", "meaning": "Đừng, không được", "ex_zh": "别说话，认真听！", "ex_py": "Bié shuōhuà, rènzhēn tīng!", "ex_vi": "Đừng nói chuyện, tập trung nghe!"},
            {"key": "guolai", "word": "过来", "pinyin": "guòlái", "hanviet": "Quá Lai", "pos": "động từ", "tone": "Bình thường", "meaning": "Băng qua, lại đây", "ex_zh": "请你过来一下。", "ex_py": "Qǐng nǐ guòlái yíxià.", "ex_vi": "Mời bạn qua đây một chút."}
        ],
        "chars": [
            {"id": "gong-1", "char": "公", "pinyin": "gōng", "meaning": "公交车 (Xe buýt)"},
            {"id": "zhan-1", "char": "站", "pinyin": "zhàn", "meaning": "车站 (Trạm xe)"},
            {"id": "yuan-1", "char": "远", "pinyin": "yuǎn", "meaning": "远 (Xa)"},
            {"id": "wan-1", "char": "万", "pinyin": "wàn", "meaning": "万 (Vạn, 10.000)"},
            {"id": "ming-1", "char": "名", "pinyin": "míng", "meaning": "名 (Danh, lượng từ)"},
            {"id": "wang-1", "char": "网", "pinyin": "wǎng", "meaning": "网上 (Trên mạng)"},
            {"id": "jiao-1", "char": "教", "pinyin": "jiào", "meaning": "教室 (Phòng học)"},
            {"id": "shi-1", "char": "室", "pinyin": "shì", "meaning": "教室 (Phòng học)"},
            {"id": "piao-1", "char": "票", "pinyin": "piào", "meaning": "票 (Vé)"},
            {"id": "bie-1", "char": "别", "pinyin": "bié", "meaning": "别 (Đừng)"}
        ],
        "text": {
            "text1": {
                "title": "在运动场 (Ở sân vận động)",
                "icon": "🏃",
                "lines": [
                    {"spk": "A", "zh": "你每天几点起床？", "py": "Nǐ měitiān jǐ diǎn qǐchuáng?", "vi": "Mỗi ngày bạn dậy lúc mấy giờ?"},
                    {"spk": "B", "zh": "我每天六点起床。", "py": "Wǒ měitiān liù diǎn qǐchuáng.", "vi": "Tôi thức dậy lúc 6 giờ mỗi ngày."},
                    {"spk": "A", "zh": "你怎么起得这么早？", "py": "Nǐ zěnme qǐ de zhème zǎo?", "vi": "Sao bạn thức dậy sớm thế?"},
                    {"spk": "B", "zh": "因为我每天早上去跑步。", "py": "Yīnwèi wǒ měitiān zǎoshang qù pǎobù.", "vi": "Vì tôi sáng nào cũng đi chạy bộ."}
                ]
            },
            "text2": {
                "title": "在路上 (Trên đường)",
                "icon": "🚌",
                "lines": [
                    {"spk": "A", "zh": "你怎么去学校？坐公交车还是打车？", "py": "Nǐ zěnme qù xuéxiào? Zuò gōngjiāochē háishì dǎchē?", "vi": "Bạn đi đến trường bằng gì? Đi xe buýt hay bắt taxi?"},
                    {"spk": "B", "zh": "我坐公交车去。车站离我家不远。", "py": "Wǒ zuò gōngjiāochē qù. Chēzhàn lí wǒ jiā bù yuǎn.", "vi": "Tôi đi xe buýt. Trạm xe cách nhà tôi không xa."},
                    {"spk": "A", "zh": "走过去要几分钟？", "py": "Zǒu guòqù yào jǐ fēnzhōng?", "vi": "Đi bộ qua đó mất mấy phút?"},
                    {"spk": "B", "zh": "不远，走五分钟就到了。", "py": "Bù yuǎn, zǒu wǔ fēnzhōng jiù dào le.", "vi": "Không xa, đi bộ 5 phút là tới rồi."}
                ]
            },
            "text3": {
                "title": "在北京大学 (Ở Đại học Bắc Kinh)",
                "icon": "🎓",
                "lines": [
                    {"spk": "A", "zh": "这间教室里有多少名学生？", "py": "Zhè jiān jiàoshì li yǒu duōshao míng xuésheng?", "vi": "Trong phòng học này có bao nhiêu học sinh?"},
                    {"spk": "B", "zh": "这里有三万名学生，很多是外国留学生。", "py": "Zhèlǐ yǒu sān wàn míng xuésheng, hěn duō shì wàiguó liúxuéshēng.", "vi": "Ở đây có 30.000 học sinh, rất nhiều là lưu học sinh nước ngoài."},
                    {"spk": "A", "zh": "我可以在网上买车票吗？", "py": "Wǒ kěyǐ zài wǎngshang mǎi chēpiào ma?", "vi": "Tôi có thể mua vé xe trên mạng được không?"},
                    {"spk": "B", "zh": "可以啊，在网上买票很方便。", "py": "Kěyǐ a, zài wǎngshang mǎi piào hěn fāngbiàn.", "vi": "Được chứ, mua vé trên mạng rất tiện lợi."}
                ]
            },
            "text4": {
                "title": "在教室 (Trong phòng học)",
                "icon": "📚",
                "lines": [
                    {"spk": "A", "zh": "别说话了，老师过来了！", "py": "Bié shuōhuà le, lǎoshī guòlái le!", "vi": "Đừng nói chuyện nữa, thầy giáo đi qua đây rồi!"},
                    {"spk": "B", "zh": "好的，别忘了明天早上八点有考试。", "py": "Hǎo de, bié wàng le míngtiān zǎoshang bā diǎn yǒu kǎoshì.", "vi": "Được rồi, đừng quên sáng mai 8 giờ có bài kiểm tra nhé."},
                    {"spk": "A", "zh": "我知道了，我一定准时到教室。", "py": "Wǒ zhīdào le, wǒ yídìng zhǔnshí dào jiàoshì.", "vi": "Tôi biết rồi, tôi nhất định sẽ đến lớp đúng giờ."},
                    {"spk": "B", "zh": "那我们就认真复习吧！", "py": "Nà wǒmen jiù rènzhēn fùxí ba!", "vi": "Thế thì chúng ta ôn tập chăm chỉ thôi!"}
                ]
            }
        },
        "grammar": [
            {"title": "1. Giới từ chỉ khoảng cách '离' (Cách)", "desc": "Dùng để biểu thị khoảng cách giữa hai địa điểm hoặc thời gian.", "struct": "A + 离 + B + 远 / 近 / [Khoảng cách]", "ex": "我家<b>离</b>学校很近。(Nhà tôi cách trường rất gần.)"},
            {"title": "2. Cấu trúc câu hỏi lựa chọn '还是' (Hay là)", "desc": "Dùng trong câu hỏi lựa chọn giữa hai phương án A và B.", "struct": "A + 还是 + B ?", "ex": "你喝茶<b>还是</b>喝咖啡？(Bạn uống trà hay uống cà phê?)"},
            {"title": "3. Phó từ cấm đoán '别' (Đừng)", "desc": "Dùng để khuyên ngăn hoặc cấm ai đó làm gì.", "struct": "别 + Động từ / Cụm động từ", "ex": "<b>别</b>迟到了。(Đừng đến muộn nhé.) / <b>别</b>说话。(Đừng nói chuyện.)"},
            {"title": "4. Đại từ chỉ số lượng '每' (Mỗi, mọi)", "desc": "Biểu thị từng đối tượng trong một tập hợp.", "struct": "每 + Lượng từ + Danh từ", "ex": "我<b>每</b>天六点起床。(Tôi mỗi ngày đều dậy lúc 6 giờ.)"}
        ],
        "culture": {
            "title": "Văn Hóa Tập Dưỡng Sinh & Chạy Bộ Buổi Sáng",
            "p1": "Tại Trung Quốc, thói quen dậy sớm tập thể dục (早起锻炼) đã trở thành nét đẹp đời sống sinh hoạt của người dân.",
            "p2": "Các công viên buổi sáng luôn nhộn nhịp người chạy bộ, luyện Thái Cực Quyền (太极拳) và múa quạt."
        }
    },
    3: {
        "title": "第三课 左边那个红色的是我的",
        "sub": "Bài 3: Cái màu đỏ bên trái là của tôi",
        "vocab": [
            {"key": "huilai", "word": "回来", "pinyin": "huílái", "hanviet": "Hồi Lai", "pos": "động từ", "tone": "Bình thường", "meaning": "Trở về, về đây", "ex_zh": "你什么时候回来？", "ex_py": "Nǐ shénme shíhou huílái?", "ex_vi": "Khi nào bạn trở về?"},
            {"key": "zheme", "word": "这么", "pinyin": "zhème", "hanviet": "Giá Ma", "pos": "đại từ", "tone": "Bình thường", "meaning": "Thế này, như thế này", "ex_zh": "你怎么这么高兴？", "ex_py": "Nǐ zěnme zhème gāoxìng?", "ex_vi": "Sao bạn lại vui như thế này?"},
            {"key": "wan", "word": "完", "pinyin": "wán", "hanviet": "Hoàn", "pos": "động từ / bổ ngữ", "tone": "Bình thường", "meaning": "Xong, hoàn thành", "ex_zh": "我做完作业了。", "ex_py": "Wǒ zuò wán zuòyè le.", "ex_vi": "Tôi làm xong bài tập rồi."},
            {"key": "yiqi", "word": "一起", "pinyin": "yìqǐ", "hanviet": "Nhất Khởi", "pos": "phó từ", "tone": "Bình thường", "meaning": "Cùng nhau, cùng", "ex_zh": "我们一起去吃饭吧。", "ex_py": "Wǒmen yìqǐ qù chī fàn ba.", "ex_vi": "Chúng ta cùng đi ăn cơm nhé."},
            {"key": "chuqu", "word": "出去", "pinyin": "chūqù", "hanviet": "Xuất Khứ", "pos": "động từ", "tone": "Bình thường", "meaning": "Đi ra ngoài", "ex_zh": "他已经出去了。", "ex_py": "Tā yǐjīng chūqù le.", "ex_vi": "Cậu ấy đã đi ra ngoài rồi."},
            {"key": "xi", "word": "洗", "pinyin": "xǐ", "hanviet": "Tẩy", "pos": "động từ", "tone": "Bình thường", "meaning": "Rửa, giặt", "ex_zh": "吃饭前要洗手。", "ex_py": "Chī fàn qián yào xǐ shǒu.", "ex_vi": "Trước khi ăn cơm phải rửa tay."},
            {"key": "ziji", "word": "自己", "pinyin": "zìjǐ", "hanviet": "Tự Kỷ", "pos": "đại từ", "tone": "Bình thường", "meaning": "Tự mình, bản thân", "ex_zh": "我自己去做。", "ex_py": "Wǒ zìjǐ qù zuò.", "ex_vi": "Tự tôi đi làm."},
            {"key": "na", "word": "拿", "pinyin": "ná", "hanviet": "Nã", "pos": "động từ", "tone": "Bình thường", "meaning": "Cầm, nắm, lấy", "ex_zh": "请帮我拿一下包。", "ex_py": "Qǐng bāng wǒ ná yíxià bāo.", "ex_vi": "Xin giúp tôi cầm túi một chút."},
            {"key": "shou", "word": "手", "pinyin": "shǒu", "hanviet": "Thủ", "pos": "danh từ", "tone": "Bình thường", "meaning": "Bàn tay, tay", "ex_zh": "我的手很冷。", "ex_py": "Wǒ de shǒu hěn lěng.", "ex_vi": "Bàn tay tôi rất lạnh."},
            {"key": "weishenme", "word": "为什么", "pinyin": "wèishénme", "hanviet": "Vi Thập Ma", "pos": "đại từ hỏi", "tone": "Bình thường", "meaning": "Tại sao, vì sao", "ex_zh": "你为什么没去？", "ex_py": "Nǐ wèishénme méi qù?", "ex_vi": "Tại sao bạn không đi?"},
            {"key": "bucuo", "word": "不错", "pinyin": "búcuò", "hanviet": "Bất Thác", "pos": "tính từ", "tone": "Bình thường", "meaning": "Không tệ, khá tốt", "ex_zh": "这个电影不错。", "ex_py": "Zhè gè diànyǐng búcuò.", "ex_vi": "Bộ phim này không tệ."},
            {"key": "song", "word": "送", "pinyin": "sòng", "hanviet": "Tống", "pos": "động từ", "tone": "Bình thường", "meaning": "Tặng, biếu, tiễn", "ex_zh": "这朵花送给你。", "ex_py": "Zhè duǒ huā sòng gěi nǐ.", "ex_vi": "Bông hoa này tặng bạn."},
            {"key": "huiqu", "word": "回去", "pinyin": "huíqù", "hanviet": "Hồi Khứ", "pos": "động từ", "tone": "Bình thường", "meaning": "Trở về, đi về", "ex_zh": "时间不早了，我该回去了。", "ex_py": "Shíjiān bù zǎo le, wǒ gāi huíqù le.", "ex_vi": "Thời gian không còn sớm, tôi phải về rồi."},
            {"key": "mei", "word": "每", "pinyin": "měi", "hanviet": "Mỗi", "pos": "đại từ", "tone": "Bình thường", "meaning": "Mỗi, mọi", "ex_zh": "每个人都有自己的名字。", "ex_py": "Měi gè rén dōu yǒu zìjǐ de míngzi.", "ex_vi": "Mỗi người đều có tên riêng."},
            {"key": "lei", "word": "累", "pinyin": "lèi", "hanviet": "Lụy", "pos": "tính từ", "tone": "Bình thường", "meaning": "Mệt, mệt mỏi", "ex_zh": "今天工作太累了。", "ex_py": "Jīntiān gōngzuò tài lèi le.", "ex_vi": "Hôm nay làm việc mệt quá."},
            {"key": "xian", "word": "西安", "pinyin": "Xī'ān", "hanviet": "Tây An", "pos": "danh từ riêng", "tone": "Bình thường", "meaning": "Thành phố Tây An", "ex_zh": "西安有很多历史古迹。", "ex_py": "Xī'ān yǒu hěn duō lìshǐ gǔjì.", "ex_vi": "Tây An có rất nhiều di tích lịch sử."}
        ],
        "chars": [
            {"id": "zuo-1", "char": "左", "pinyin": "zuǒ", "meaning": "左边 (Bên trái)"},
            {"id": "bian-1", "char": "边", "pinyin": "biān", "meaning": "左边 (Bên trái)"},
            {"id": "hong-1", "char": "红", "pinyin": "hóng", "meaning": "红色 (Màu đỏ)"},
            {"id": "se-1", "char": "色", "pinyin": "sè", "meaning": "红色 (Màu đỏ)"},
            {"id": "xi-1", "char": "洗", "pinyin": "xǐ", "meaning": "洗 (Rửa, giặt)"},
            {"id": "shou-1", "char": "手", "pinyin": "shǒu", "meaning": "手 (Bàn tay)"},
            {"id": "na-1", "char": "拿", "pinyin": "ná", "meaning": "拿 (Cầm, nắm)"},
            {"id": "lei-1", "char": "累", "pinyin": "lèi", "meaning": "累 (Mệt mỏi)"}
        ],
        "text": {
            "text1": {
                "title": "在家里 (Ở nhà)",
                "icon": "☕",
                "lines": [
                    {"spk": "A", "zh": "左边那个红色的杯子是谁的？", "py": "Zuǒbiān nà gè hóngsè de bēizi shì shéi de?", "vi": "Cái cốc màu đỏ bên trái là của ai thế?"},
                    {"spk": "B", "zh": "是我的。那个黑色的呢？", "py": "Shì wǒ de. Nà gè hēisè de ne?", "vi": "Là của tôi. Còn cái màu đen thì sao?"},
                    {"spk": "A", "zh": "那个黑色的也是我的，是我朋友送给我的。", "py": "Nà gè hēisè de yě shì wǒ de, shì wǒ péngyou sòng gěi wǒ de.", "vi": "Cái màu đen đó cũng là của tôi, là bạn tôi tặng tôi."},
                    {"spk": "B", "zh": "颜色真不错！", "py": "Yánsè zhēn búcuò!", "vi": "Màu sắc thật không tệ!"}
                ]
            },
            "text2": {
                "title": "在房间 (Trong phòng)",
                "icon": "📖",
                "lines": [
                    {"spk": "A", "zh": "你看完这本书了吗？", "py": "Nǐ kàn wán zhè běn shū le ma?", "vi": "Bạn đã đọc xong cuốn sách này chưa?"},
                    {"spk": "B", "zh": "还没看完，还有几页。", "py": "Hái méi kàn wán, hái yǒu jǐ yè.", "vi": "Vẫn chưa đọc xong, còn vài trang nữa."},
                    {"spk": "A", "zh": "你看完以后，拿给我看看吧。", "py": "Nǐ kàn wán yǐhòu, ná gěi wǒ kànkan ba.", "vi": "Sau khi xem xong, cầm cho tôi xem với nhé."},
                    {"spk": "B", "zh": "没问题，我今天晚上就能看完。", "py": "Méi wèntí, wǒ jīntiān wǎnshang jiù néng kàn wán.", "vi": "Không vấn đề gì, tối nay tôi có thể đọc xong."}
                ]
            },
            "text3": {
                "title": "在公司 (Ở công ty)",
                "icon": "🚶",
                "lines": [
                    {"spk": "A", "zh": "你要出去吗？什么时候回来？", "py": "Nǐ yào chūqù ma? Shénme shíhou huílái?", "vi": "Bạn muốn đi ra ngoài à? Khi nào trở về?"},
                    {"spk": "B", "zh": "我出去洗手，一会就回来。", "py": "Wǒ chūqù xǐ shǒu, yíhuì jiù huílái.", "vi": "Tôi ra ngoài rửa tay, một lát nữa về ngay."},
                    {"spk": "A", "zh": "那我们完事后一起去西安旅游吧。", "py": "Nà wǒmen wán shì hòu yìqǐ qù Xī'ān lǚyóu ba.", "vi": "Thế sau khi xong việc chúng ta cùng đi du lịch Tây An nhé."},
                    {"spk": "B", "zh": "太好了！我早就想去西安了。", "py": "Tài hǎo le! Wǒ zǎo jiù xiǎng qù Xī'ān le.", "vi": "Tuyệt quá! Tôi từ lâu đã muốn đi Tây An rồi."}
                ]
            },
            "text4": {
                "title": "在路上 (Trên đường)",
                "icon": "🎒",
                "lines": [
                    {"spk": "A", "zh": "你拿着这么重的东西，累不累？", "py": "Nǐ ná zhe zhème zhòng de dōngxi, lèi bú lèi?", "vi": "Bạn cầm đồ nặng thế này, có mệt không?"},
                    {"spk": "B", "zh": "不累，我自己能拿这个包。", "py": "Bù lèi, wǒ zìjǐ néng ná zhè gè bāo.", "vi": "Không mệt, tự tôi có thể cầm cái túi này."},
                    {"spk": "A", "zh": "时间不早了，我们赶紧回去吧。", "py": "Shíjiān bù zǎo le, wǒmen gǎnjǐn huíqù ba.", "vi": "Thời gian không còn sớm nữa, chúng ta mau về thôi."},
                    {"spk": "B", "zh": "好的，回到家我要好好休息。", "py": "Hǎo de, huí dào jiā wǒ yào hǎohǎo xiūxi.", "vi": "Được thôi, về đến nhà tôi phải nghỉ ngơi thật tốt."}
                ]
            }
        },
        "grammar": [
            {"title": "1. Kết cấu sở hữu với trợ từ '的'", "desc": "Lược bỏ danh từ phía sau khi ngữ cảnh đã rõ ràng.", "struct": "Tính từ / Danh từ / Đại từ + 的", "ex": "左边那个红色的（杯子）是我的。(Cái màu đỏ bên trái là của tôi.)"},
            {"title": "2. Bổ ngữ kết quả '完' (Xong, hoàn thành)", "desc": "Đứng sau động từ biểu thị hành động đã hoàn thành.", "struct": "Động từ + 完 + (Tân ngữ)", "ex": "看完 (Đọc xong) / 做完 (Làm xong) / 吃完 (Ăn xong)"},
            {"title": "3. Bổ ngữ xu hướng '来' và '去'", "desc": "Hành động hướng về phía người nói (来) hoặc xa người nói (去).", "struct": "Động từ + 来 / 去", "ex": "回来 (Về đây) / 进去 (Đi vào trong)"},
            {"title": "4. Đại từ chỉ bản thân '自己' (Tự mình)", "desc": "Nhấn mạnh tự bản thân thực hiện hành động.", "struct": "主语 + 自己 + Động từ", "ex": "我自己去做。(Tự tôi làm.)"}
        ],
        "culture": {
            "title": "Ý Nghĩa Màu Sắc Trong Văn Hóa Trung Hoa",
            "p1": "Màu đỏ (红色) tượng trưng cho may mắn, thịnh vượng và may mắn trong các dịp lễ tết mừng xuân.",
            "p2": "Tây An (西安) là một trong bốn đại cố đô lịch sử nổi tiếng với Đội quân đất nung (兵马俑)."
        }
    },
    4: {
        "title": "第四课 这个工作是他帮我介绍的",
        "sub": "Bài 4: Công việc này là do anh ấy giới thiệu cho tôi",
        "vocab": [
            {"key": "xigua", "word": "西瓜", "pinyin": "xīguā", "hanviet": "Tây Qua", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Dưa hấu", "ex_zh": "夏天的西瓜非常甜。", "ex_py": "Xiàtiān de xīguā fēicháng tián.", "ex_vi": "Dưa hấu mùa hè cực kỳ ngọt."},
            {"key": "tian", "word": "甜", "pinyin": "tián", "hanviet": "Điềm", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Ngọt, vị ngọt", "ex_zh": "这个苹果真甜！", "ex_py": "Zhè gè píngguǒ zhēn tián!", "ex_vi": "Quả táo này thật ngọt!"},
            {"key": "zhen", "word": "真", "pinyin": "zhēn", "hanviet": "Chân", "pos": "Phó từ", "tone": "Bình thường", "meaning": "Thật, quả thật", "ex_zh": "你真棒！", "ex_py": "Nǐ zhēn bàng!", "ex_vi": "Bạn thật giỏi!"},
            {"key": "tiao", "word": "条", "pinyin": "tiáo", "hanviet": "Điều", "pos": "Lượng từ", "tone": "Bình thường", "meaning": "Chiếc, sợi, con (quần, cá, đường)", "ex_zh": "一条红色的裤子。", "ex_py": "Yì tiáo hóngsè de kùzi.", "ex_vi": "Một chiếc quần màu đỏ."},
            {"key": "kuzi", "word": "裤子", "pinyin": "kùzi", "hanviet": "Khố Tử", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Quần, chiếc quần", "ex_zh": "这条裤子很合适。", "ex_py": "Zhè tiáo kùzi hěn héshì.", "ex_vi": "Chiếc quần này rất vừa vặn."},
            {"key": "chenshan", "word": "衬衫", "pinyin": "chènshān", "hanviet": "Sấn Sam", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Áo sơ mi", "ex_zh": "他穿一件白衬衫。", "ex_py": "Tā chuān yí jiàn bái chènshān.", "ex_vi": "Anh ấy mặc một chiếc áo sơ mi trắng."},
            {"key": "yuan", "word": "元", "pinyin": "yuán", "hanviet": "Nguyên", "pos": "Lượng từ", "tone": "Bình thường", "meaning": "Tệ (Đơn vị tiền tệ Trung Quốc)", "ex_zh": "一共一百元。", "ex_py": "Yígòng yì bǎi yuán.", "ex_vi": "Tổng cộng 100 tệ."},
            {"key": "qipao", "word": "旗袍", "pinyin": "qípáo", "hanviet": "Kỳ Báo", "pos": "Danh từ", "tone": "Bình thường", "meaning": "Áo sườn xám", "ex_zh": "中国旗袍非常美。", "ex_py": "Zhōngguó qípáo fēicháng měi.", "ex_vi": "Áo sườn xám Trung Quốc rất đẹp."},
            {"key": "mai", "word": "买", "pinyin": "mǎi", "hanviet": "Mãi", "pos": "Động từ", "tone": "Bình thường", "meaning": "Mua", "ex_zh": "你想买什么？", "ex_py": "Nǐ xiǎng mǎi shénme?", "ex_vi": "Bạn muốn mua gì?"},
            {"key": "shi", "word": "试", "pinyin": "shì", "hanviet": "Thử", "pos": "Động từ", "tone": "Bình thường", "meaning": "Thử (thử quần áo)", "ex_zh": "我能试试吗？", "ex_py": "Wǒ néng shìshi ma?", "ex_vi": "Tôi thử một chút được không?"},
            {"key": "heshi", "word": "合适", "pinyin": "héshì", "hanviet": "Hợp Thích", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Thích hợp, vừa vặn", "ex_zh": "这件衣服很合适。", "ex_py": "Zhè jiān yīfu hěn héshì.", "ex_vi": "Bộ quần áo này rất vừa vặn."},
            {"key": "zhong", "word": "重", "pinyin": "zhòng", "hanviet": "Trọng", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Nặng, trọng lượng lớn", "ex_zh": "这个箱子太重了。", "ex_py": "Zhè gè xiāngzi tài zhòng le.", "ex_vi": "Chiếc chiếc vali này nặng quá."},
            {"key": "qing", "word": "轻", "pinyin": "qīng", "hanviet": "Khinh", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Nhẹ, trọng lượng nhỏ", "ex_zh": "这个包很轻。", "ex_py": "Zhè gè bāo hěn qīng.", "ex_vi": "Cái túi này rất nhẹ."},
            {"key": "pianyi", "word": "便宜", "pinyin": "piányi", "hanviet": "Tiện Nghi", "pos": "Tính từ", "tone": "Khinh thanh (yi)", "meaning": "Rẻ, giá rẻ", "ex_zh": "苹果很便宜。", "ex_py": "Píngguǒ hěn piányi.", "ex_vi": "Táo rất rẻ."},
            {"key": "gui", "word": "贵", "pinyin": "guì", "hanviet": "Quý", "pos": "Tính từ", "tone": "Bình thường", "meaning": "Đắt, đắt tiền", "ex_zh": "太贵了，便宜一点吧。", "ex_py": "Tài guì le, piányi yìdiǎn ba.", "ex_vi": "Đắt quá, rẻ một chút đi."}
        ],
        "chars": [
            {"id": "xi-1", "char": "西", "pinyin": "xī", "meaning": "西瓜 (Dưa hấu)"},
            {"id": "gua-1", "char": "瓜", "pinyin": "guā", "meaning": "西瓜 (Dưa hấu)"},
            {"id": "tian-1", "char": "甜", "pinyin": "tián", "meaning": "甜 (Ngọt)"},
            {"id": "zhen-1", "char": "真", "pinyin": "zhēn", "meaning": "真 (Thật)"},
            {"id": "ku-1", "char": "裤", "pinyin": "kù", "meaning": "裤子 (Chiếc quần)"},
            {"id": "chen-1", "char": "衬", "pinyin": "chèn", "meaning": "衬衫 (Áo sơ mi)"},
            {"id": "mai-1", "char": "买", "pinyin": "mǎi", "meaning": "买 (Mua)"},
            {"id": "gui-1", "char": "贵", "pinyin": "guì", "meaning": "贵 (Đắt tiền)"}
        ],
        "text": {
            "text1": {
                "title": "在公司 (Ở công ty)",
                "icon": "💼",
                "lines": [
                    {"spk": "A", "zh": "这个工作是谁帮你介绍的？", "py": "Zhè gè gōngzuò shì shéi bāng nǐ jièshào de?", "vi": "Công việc này là do ai giới thiệu cho bạn thế?"},
                    {"spk": "B", "zh": "是我大学同学帮我介绍的。", "py": "Shì wǒ dàxué tóngxué bāng wǒ jièshào de.", "vi": "Là do bạn học đại học giúp tôi giới thiệu."},
                    {"spk": "A", "zh": "你觉得这个工作怎么样？", "py": "Nǐ juéde zhè gè gōngzuò zěnmeyàng?", "vi": "Bạn thấy công việc này thế nào?"},
                    {"spk": "B", "zh": "很不错，同事们都很好。", "py": "Hěn búcuò, tóngshìmen dōu hěn hǎo.", "vi": "Rất tốt, các đồng nghiệp đều rất tốt."}
                ]
            },
            "text2": {
                "title": "在水果店 (Ở cửa hàng hoa quả)",
                "icon": "🍉",
                "lines": [
                    {"spk": "A", "zh": "你要买西瓜吗？", "py": "Nǐ yào mǎi xīguā ma?", "vi": "Bạn muốn mua dưa hấu không?"},
                    {"spk": "B", "zh": "是的，这里的西瓜真甜！", "py": "Shì de, zhèlǐ de xīguā zhēn tián!", "vi": "Đúng vậy, dưa hấu ở đây ngọt thật đấy!"},
                    {"spk": "A", "zh": "这个西瓜多少钱一斤？", "py": "Zhè gè xīguā duōshao qián yì jīn?", "vi": "Dưa hấu này bao nhiêu tiền một cân?"},
                    {"spk": "B", "zh": "三元一斤，很便宜！", "py": "Sān yuán yì jīn, hěn piányi!", "vi": "3 tệ một cân, rất rẻ!"}
                ]
            },
            "text3": {
                "title": "在服装店 (Ở cửa hàng quần áo)",
                "icon": "👔",
                "lines": [
                    {"spk": "A", "zh": "这条裤子和这件衬衫多少钱？", "py": "Zhè tiáo kùzi hé zhè jiàn chènshān duōshao qián?", "vi": "Chiếc quần này và chiếc áo sơ mi này bao nhiêu tiền?"},
                    {"spk": "B", "zh": "一共两百元。", "py": "Yígòng liǎng bǎi yuán.", "vi": "Tổng cộng 200 tệ."},
                    {"spk": "A", "zh": "太贵了，便宜一点吧！", "py": "Tài guì le, piányi yìdiǎn ba!", "vi": "Đắt quá, rẻ một chút đi!"},
                    {"spk": "B", "zh": "那给你一百八十元吧。", "py": "Nà gěi nǐ yì bǎi bāshí yuán ba.", "vi": "Thế bớt cho bạn còn 180 tệ nhé."}
                ]
            },
            "text4": {
                "title": "在试衣间 (Ở phòng thử đồ)",
                "icon": "👗",
                "lines": [
                    {"spk": "A", "zh": "你试了这件旗袍吗？合适不合适？", "py": "Nǐ shì le zhè jiàn qípáo ma? Héshì bù héshì?", "vi": "Bạn đã thử chiếc áo sườn xám này chưa? Có vừa vặn không?"},
                    {"spk": "B", "zh": "我试了一下，非常合适，而且很轻。", "py": "Wǒ shì le yíxià, fēicháng héshì, érqiě hěn qīng.", "vi": "Tôi thử rồi, rất vừa vặn, hơn nữa còn rất nhẹ."},
                    {"spk": "A", "zh": "真漂亮！价格贵不贵？", "py": "Zhēn piàoliang! Jiàgé guì bú guì?", "vi": "Đẹp thật đấy! Giá có đắt không?"},
                    {"spk": "B", "zh": "不算贵，我很喜欢，就买这件了！", "py": "Bú suàn guì, wǒ hěn xǐhuan, jiù mǎi zhè jiàn le!", "vi": "Không tính là đắt, tôi rất thích, mua chiếc này luôn!"}
                ]
            }
        },
        "grammar": [
            {"title": "1. Cấu trúc nhấn mạnh '是...的'", "desc": "Dùng để nhấn mạnh thời gian, địa điểm, cách thức hoặc người thực hiện hành động đã xảy ra.", "struct": "主语 + 是 + [Đối tượng / Thời gian / Địa điểm] + 动作 + 的", "ex": "这个工作<b>是</b>他帮我介绍<b>的</b>。(Công việc này là do anh ấy giới thiệu cho tôi.)"},
            {"title": "2. Cấu trúc nhờ giúp đỡ '帮' (Giúp, giúp đỡ)", "desc": "Chỉ ai đó làm việc gì cho người khác.", "struct": "A + 帮 + B + 动作", "ex": "他<b>帮</b>我买了一件衬衫。(Anh ấy giúp tôi mua một chiếc áo sơ mi.)"},
            {"title": "3. Phó từ biểu thị sự thực '真' (Thật, quả thật)", "desc": "Diễn đạt cảm thán hoặc khẳng định mức độ.", "struct": "真 + Tính từ", "ex": "这里的西瓜<b>真</b>甜！(Dưa hấu ở đây thật ngọt!)"},
            {"title": "4. Động từ lặp lại '试试' (Thử một chút)", "desc": "Lặp lại động từ để diễn đạt sự thử nghiệm hoặc ngữ khí nhẹ nhàng.", "struct": "Động từ + Động từ (AA)", "ex": "我能<b>试试</b>这件衣服吗？(Tôi thử chiếc áo này được không?)"}
        ],
        "culture": {
            "title": "Áo Sườn Xám Trang Nhã & Nghệ Thuật Mua Sắm",
            "p1": "Sườn xám (旗袍) là trang phục truyền thống nổi tiếng đại diện cho vẻ đẹp đài các của phụ nữ Trung Hoa.",
            "p2": "Khi mua sắm ở Trung Quốc, việc trả giá nhẹ nhàng (砍价) với câu '便宜一点吧' là nét trải nghiệm văn hóa quen thuộc."
        }
    }
}'''

with open("/Users/trangngo95/Desktop/HSK/build_days_1_to_4_master.py", "r", encoding="utf-8") as f:
    content = f.read()

# Replace DAYS_DATA definition
content = re.sub(r'DAYS_DATA = \{.*?\n\}', new_days_data, content, flags=re.DOTALL)

# Update text audio processing loop
old_text_loop = '''    for key, text in data["text"].items():
        clean_text = re.sub(r'[^\\u4e00-\\u9fa5，。？！]', '', text)
        aiff_path = os.path.join(audio_dir, f"{key}.aiff")
        m4a_path = os.path.join(audio_dir, f"{key}.m4a")
        cmd_say = f'say -v Tingting "{clean_text}" -o "{aiff_path}"'
        cmd_convert = f'afconvert -f m4af -d aac "{aiff_path}" "{m4a_path}"'
        subprocess.run(cmd_say, shell=True, check=True)
        subprocess.run(cmd_convert, shell=True, check=True)
        if os.path.exists(aiff_path): os.remove(aiff_path)

        with open(m4a_path, 'rb') as f:
            text_b64[key] = base64.b64encode(f.read()).decode('utf-8')'''

new_text_loop = '''    for key, item in data["text"].items():
        if isinstance(item, dict) and "lines" in item:
            full_text = "".join([l["zh"] for l in item["lines"]])
        else:
            full_text = str(item)
        clean_text = re.sub(r'[^\\u4e00-\\u9fa5，。？！]', '', full_text)
        aiff_path = os.path.join(audio_dir, f"{key}.aiff")
        m4a_path = os.path.join(audio_dir, f"{key}.m4a")
        cmd_say = f'say -v Tingting "{clean_text}" -o "{aiff_path}"'
        cmd_convert = f'afconvert -f m4af -d aac "{aiff_path}" "{m4a_path}"'
        subprocess.run(cmd_say, shell=True, check=True)
        subprocess.run(cmd_convert, shell=True, check=True)
        if os.path.exists(aiff_path): os.remove(aiff_path)

        with open(m4a_path, 'rb') as f:
            text_b64[key] = base64.b64encode(f.read()).decode('utf-8')'''

content = content.replace(old_text_loop, new_text_loop)

# Update build_sec_text()
old_build_sec_text = '''    def build_sec_text():
        t = data["text"]
        return f\'\'\'<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa 1</h3>
            <button onclick="playText(\'text1\', \'{t["text1"]}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{t["text1"]}</div>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa 2</h3>
            <button onclick="playText(\'text2\', \'{t["text2"]}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{t["text2"]}</div>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa 3</h3>
            <button onclick="playText(\'text3\', \'{t["text3"]}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{t["text3"]}</div>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa 4</h3>
            <button onclick="playText(\'text4\', \'{t["text4"]}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{t["text4"]}</div>
    </div>
</div>\'\'\''''

new_build_sec_text = '''    def build_sec_text():
        cards = []
        for idx, (key, item) in enumerate(data["text"].items(), 1):
            if isinstance(item, dict):
                title = item.get("title", f"Bài khóa {idx}")
                icon = item.get("icon", "💬")
                lines_data = item.get("lines", [])
                full_zh = "".join([l["zh"] for l in lines_data])
                js_zh = full_zh.replace("'", "\\\\'")
                
                lines_html = []
                for l in lines_data:
                    lines_html.append(
                        f'            <div class="p-2.5 bg-slate-50 rounded-xl">'
                        f'<div class="font-bold text-blue-950 zh text-sm">{l["spk"]}: {l["zh"]}</div>'
                        f'<div class="text-emerald-700 font-mono text-[11px]">{l["py"]}</div>'
                        f'<div class="text-slate-500">{l["vi"]}</div></div>'
                    )
                lines_str = "\\n".join(lines_html)
                card = f\'\'\'    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>{icon}</span> Bài khóa {idx}: {title}</h3>
            <button onclick="playText(\'{key}\', \'{js_zh}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
{lines_str}
        </div>
    </div>\'\'\'
            else:
                card = f\'\'\'    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa {idx}</h3>
            <button onclick="playText(\'{key}\', \'{item}\')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{item}</div>
    </div>\'\'\'
            cards.append(card)
        return \'<div class="grid grid-cols-1 md:grid-cols-2 gap-6">\\n\' + "\\n".join(cards) + \'\\n</div>\''''

content = content.replace(old_build_sec_text, new_build_sec_text)

with open("/Users/trangngo95/Desktop/HSK/build_days_1_to_4_master.py", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated build_days_1_to_4_master.py successfully!")
