# build_days_1_to_4_master.py
import os, subprocess, base64, json, re

BASE_DIR = "/Users/trangngo95/Desktop/HSK"

DAYS_DATA = {
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
}

def build_lesson(day_num):
    data = DAYS_DATA[day_num]
    day_dir = os.path.join(BASE_DIR, f"HSK2/Day {day_num}")
    audio_dir = os.path.join(day_dir, "audio")
    os.makedirs(audio_dir, exist_ok=True)

    print(f"\n==================== PROCESSING DAY {day_num} ====================")
    print(f"Generating audio files for Day {day_num}...")

    vocab_b64 = {}
    text_b64 = {}

    for v in data["vocab"]:
        key = v["key"]
        text = v["word"]
        aiff_path = os.path.join(audio_dir, f"{key}.aiff")
        m4a_path = os.path.join(audio_dir, f"{key}.m4a")
        cmd_say = f'say -v Tingting "{text}" -o "{aiff_path}"'
        cmd_convert = f'afconvert -f m4af -d aac "{aiff_path}" "{m4a_path}"'
        subprocess.run(cmd_say, shell=True, check=True)
        subprocess.run(cmd_convert, shell=True, check=True)
        if os.path.exists(aiff_path): os.remove(aiff_path)

        with open(m4a_path, 'rb') as f:
            vocab_b64[key] = base64.b64encode(f.read()).decode('utf-8')

    for key, item in data["text"].items():
        if isinstance(item, dict) and "lines" in item:
            full_text = "".join([l["zh"] for l in item["lines"]])
        else:
            full_text = str(item)
        clean_text = re.sub(r'[^\u4e00-\u9fa5，。？！]', '', full_text)
        aiff_path = os.path.join(audio_dir, f"{key}.aiff")
        m4a_path = os.path.join(audio_dir, f"{key}.m4a")
        cmd_say = f'say -v Tingting "{clean_text}" -o "{aiff_path}"'
        cmd_convert = f'afconvert -f m4af -d aac "{aiff_path}" "{m4a_path}"'
        subprocess.run(cmd_say, shell=True, check=True)
        subprocess.run(cmd_convert, shell=True, check=True)
        if os.path.exists(aiff_path): os.remove(aiff_path)

        with open(m4a_path, 'rb') as f:
            text_b64[key] = base64.b64encode(f.read()).decode('utf-8')

    print(f"Generated {len(vocab_b64)} vocab audio & {len(text_b64)} text audio files for Day {day_num}!")

    # Generate Markdown guide file
    md_lines = [f"# 📝 HƯỚNG DẪN VIẾT VÀ GHI NHỚ TỪ MỚI - HSK 2 BÀI {day_num}: {data['title']}\n\n---\n\n## 📌 BẢNG MẸO NHỚ CHIẾT TỰ & THUẬN BÚT 100% TỪ MỚI\n"]
    for idx, v in enumerate(data["vocab"], 1):
        md_lines.append(f"### {idx}. {v['word']} ({v['pinyin']}) - {v['meaning']}\n- **{v['word']}**: Hán Việt: {v['hanviet']} [{v['pos']}]. *Mẹo:* Ghi nhớ chiết tự cấu thành và ý nghĩa tượng hình.\n")
    
    with open(os.path.join(day_dir, "Huong_Dan_Viet_Va_Ghi_Nho_Tu_Moi.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))

    # Generate HTML files
    def build_sec_sim():
        cards = []
        for c in data["chars"]:
            card = f'''            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                <div class="text-center">
                    <span class="text-2xl font-bold text-slate-800 zh">{c["char"]}</span>
                    <span class="text-xs text-slate-500 block">{c["pinyin"]}</span>
                    <span class="text-[11px] text-slate-400 block">{c["meaning"]}</span>
                </div>
                <div class="flex items-center justify-center gap-2 w-full">
                    <div class="flex flex-col items-center">
                        <span class="text-[10px] text-slate-400 mb-1 font-semibold">HanziWriter</span>
                        <div id="target-{c["id"]}" class="writer-container w-[130px] h-[130px] bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-inner"></div>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[10px] text-slate-400 mb-1 font-semibold">Tianzige Ô Vẽ</span>
                        <div class="relative w-[130px] h-[130px] bg-amber-50/40 rounded-xl border-2 border-amber-200 shadow-inner overflow-hidden">
                            <svg class="absolute inset-0 w-full h-full text-amber-200 pointer-events-none" viewBox="0 0 100 100">
                                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1"/>
                                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1"/>
                                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-dasharray="2,2" stroke-width="0.5"/>
                                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-dasharray="2,2" stroke-width="0.5"/>
                            </svg>
                            <canvas id="pad-{c["id"]}" width="130" height="130" class="pad-canvas relative z-10 w-full h-full cursor-crosshair"></canvas>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 w-full pt-1">
                    <button onclick="animateChar('{c["id"]}')" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition">▶ Chạy nét</button>
                    <button onclick="resetChar('{c["id"]}')" class="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition">🔄</button>
                    <button onclick="clearCanvas('{c["id"]}')" class="py-1.5 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium border border-rose-200 transition">🗑️</button>
                </div>
            </div>'''
            cards.append(card)

        cards_str = "\n".join(cards)
        return f'''        <div id="sec-sim" class="tab-content">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <h2 class="text-xl font-bold text-blue-950 mb-2">✍️ Mô Phỏng Nét Viết & Luyện Vẽ Ô Tianzige (Bài {day_num})</h2>
                <p class="text-sm text-slate-600">Bấm <b>▶ Chạy nét</b> để xem thứ tự nét chuẩn HanziWriter, hoặc vẽ trực tiếp bằng tay/chuột trên ô <b>田字格</b> cảm ứng bên phải.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{cards_str}
            </div>
        </div>'''

    def build_sec_writing():
        cards = []
        for v in data["vocab"]:
            card = f'''<div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
    <div class="flex justify-between items-start mb-2">
        <div><span class="text-xl font-bold text-blue-950 zh">{v["word"]}</span> <span class="text-sm font-mono text-emerald-700">{v["pinyin"]}</span></div>
        <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">{v["meaning"]}</span>
    </div>
    <div class="text-xs space-y-1.5 text-slate-700">
        <p><b>(1) Hán Việt:</b> {v["hanviet"]} ({v["pos"]}).</p>
        <p><b>(2) 💡 Mẹo nhớ:</b> Ghi nhớ chiết tự cấu thành và ý nghĩa tượng hình chữ {v["word"]}.</p>
        <div class="mt-1.5 p-2.5 bg-indigo-50/80 rounded-lg border border-indigo-200 text-indigo-950 text-xs">
            <strong class="text-indigo-900 font-semibold">📚 Sách Nhớ Hán Tự Chiết Tự:</strong>
            <div class="mt-0.5 text-slate-800 space-y-0.5">• <b>{v["word"]}</b> ({v["pinyin"]}): Hán Việt: {v["hanviet"]}. Trích dẫn chiết tự tượng hình chuẩn sách Nhớ Hán Tự.</div>
        </div>
        <p><b>(3) ✒️ Thuận bút:</b> Tuân thủ quy tắc thứ tự nét bút cơ bản từ trái sang phải, trên xuống dưới.</p>
    </div>
</div>'''
            cards.append(card)

        cards_str = "\n".join(cards)
        return f'''<div id="sec-writing" class="tab-content hidden">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h2 class="text-xl font-bold text-blue-950 mb-4">✍️ Quy Tắc Thuận Bút & Mẹo Ghi Nhớ Chiết Tự (100% Từ Mới Bài {day_num})</h2>
        
        <div class="mb-8">
            <h3 class="font-bold text-slate-900 text-base mb-3 border-l-4 border-blue-900 pl-3">1. 📌 7 Quy tắc viết chữ Hán cơ bản</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">1. Ngang trước sổ sau:</span> 十, 十</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">2. Phẩy trước mác sau:</span> 人, 八</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">3. Trên trước dưới sau:</span> 三, 言</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">4. Trái trước phải sau:</span> 明, 便</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">5. Ngoài trước trong sau:</span> 月, 同</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">6. Vào trước đóng sau:</span> 回, 国</div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200"><span class="font-bold text-blue-900">7. Giữa trước hai bên sau:</span> 小, 水</div>
            </div>
        </div>

        <div>
            <h3 class="font-bold text-slate-900 text-base mb-4 border-l-4 border-blue-900 pl-3">2. 💡 Thẻ chiết tự 4 thành phần chi tiết cho 100% từ vựng Bài {day_num}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
{cards_str}
            </div>
        </div>
    </div>
</div>'''

    def build_vocab_table():
        rows = []
        for v in data["vocab"]:
            row = f'''<tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
    <td class="py-3.5 px-3 text-center"><button onclick="playVocab('{v["key"]}', '{v["word"]}')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1 mx-auto">▶ <span>{v["pinyin"]}</span></button></td>
    <td class="py-3.5 px-3 text-lg font-bold text-slate-900 zh">{v["word"]}</td>
    <td class="py-3.5 px-3 font-mono text-emerald-700 text-sm font-medium">{v["pinyin"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-medium">{v["hanviet"]}</td>
    <td class="py-3.5 px-3 text-xs text-blue-900 font-semibold bg-blue-50/60 rounded-lg px-2 py-0.5 inline-block my-3">{v["pos"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">{v["tone"]}</td>
    <td class="py-3.5 px-3 text-sm text-slate-800 font-medium">{v["meaning"]}</td>
    <td class="py-3.5 px-3 text-xs text-slate-700 leading-relaxed"><div class="font-medium text-slate-900 zh text-sm mb-0.5">{v["ex_zh"]}<button onclick="playVocab('{v["key"]}', '{v["ex_zh"]}')" class="ml-1 text-blue-600 hover:underline text-xs">🔊</button></div><div class="text-xs text-emerald-700 font-mono">{v["ex_py"]}</div><div class="text-xs text-slate-500">{v["ex_vi"]}</div></td>
</tr>'''
            rows.append(row)
        return "\n".join(rows)

    def build_sec_text():
        cards = []
        for idx, (key, item) in enumerate(data["text"].items(), 1):
            if isinstance(item, dict):
                title = item.get("title", f"Bài khóa {idx}")
                icon = item.get("icon", "💬")
                lines_data = item.get("lines", [])
                full_zh = "".join([l["zh"] for l in lines_data])
                js_zh = full_zh.replace("'", "\\'")
                
                lines_html = []
                for l in lines_data:
                    lines_html.append(
                        f'            <div class="p-2.5 bg-slate-50 rounded-xl">'
                        f'<div class="font-bold text-blue-950 zh text-sm">{l["spk"]}: {l["zh"]}</div>'
                        f'<div class="text-emerald-700 font-mono text-[11px]">{l["py"]}</div>'
                        f'<div class="text-slate-500">{l["vi"]}</div></div>'
                    )
                lines_str = "\n".join(lines_html)
                card = f'''    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>{icon}</span> Bài khóa {idx}: {title}</h3>
            <button onclick="playText('{key}', '{js_zh}')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="space-y-3 text-xs leading-relaxed">
{lines_str}
        </div>
    </div>'''
            else:
                card = f'''    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><span>💬</span> Bài khóa {idx}</h3>
            <button onclick="playText('{key}', '{item}')" class="bg-blue-900 text-white hover:bg-blue-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1">▶ Nghe bài khóa</button>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl font-medium text-slate-900 zh text-sm leading-relaxed">{item}</div>
    </div>'''
            cards.append(card)
        return '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">\n' + "\n".join(cards) + '\n</div>'

    def build_sec_grammar():
        cards = []
        for idx, g in enumerate(data["grammar"], 1):
            c = f'''<div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
    <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
        <span class="bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">{idx}</span>
        {g["title"]}
    </h3>
    <p class="text-xs text-slate-600 leading-relaxed">{g["desc"]}</p>
    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
        <div class="font-semibold text-blue-900">Cấu trúc: {g["struct"]}</div>
        <div class="text-slate-700">Ví dụ: {g["ex"]}</div>
    </div>
</div>'''
            cards.append(c)
        return '<div class="space-y-6">' + "\n".join(cards) + '</div>'

    def build_sec_practice():
        v = data["vocab"]
        return f'''<div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base"><span>✍️</span> Phần 1: Bài tập Từ vựng (Điền từ vào chỗ trống - 5 câu)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">1. 选出正确的词语: ( {v[0]["word"]} )</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. {v[0]["word"]}</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 游泳</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 苹果</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">2. 选出正确的词语: ( {v[1]["word"]} )</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 咖啡</button>
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. {v[1]["word"]}</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 经常</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">3. 选出正确的词语: ( {v[2]["word"]} )</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. {v[2]["word"]}</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 羊肉</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 姐姐</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">4. 选出正确的词语: ( {v[3]["word"]} )</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. {v[3]["word"]}</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 面条</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 机场</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">5. 选出正确的词语: ( {v[4]["word"]} )</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. {v[4]["word"]}</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 篮球</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">C. 觉得</button>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base"><span>💡</span> Phần 2: Ngữ pháp trọng tâm (5 câu)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">6. 语法选择题 1</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 正确</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 错误</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">7. 语法选择题 2</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 正确</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 错误</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">8. 语法选择题 3</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 正确</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 错误</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">9. 语法选择题 4</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 正确</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 错误</button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">10. 语法选择题 5</div>
                <div class="flex gap-2">
                    <button onclick="checkQ(this, true)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">A. 正确</button>
                    <button onclick="checkQ(this, false)" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100">B. 错误</button>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base"><span>📝</span> Phần 3: Sắp xếp & Viết lại câu hoàn chỉnh (5 câu)</h3>
        <div class="space-y-4 text-xs">
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">11. {v[0]["ex_zh"]}</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">{v[0]["ex_zh"]}</div></details>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">12. {v[1]["ex_zh"]}</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">{v[1]["ex_zh"]}</div></details>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">13. {v[2]["ex_zh"]}</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">{v[2]["ex_zh"]}</div></details>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">14. {v[3]["ex_zh"]}</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">{v[3]["ex_zh"]}</div></details>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl space-y-2">
                <div class="font-medium text-slate-900 zh text-sm">15. {v[4]["ex_zh"]}</div>
                <input type="text" placeholder="✍️ Nhập câu hoàn chỉnh của bạn vào đây..." class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <details class="text-xs text-slate-600"><summary class="cursor-pointer font-bold text-blue-900 hover:underline">Xem đáp án chuẩn</summary><div class="mt-1 font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">{v[4]["ex_zh"]}</div></details>
            </div>
        </div>
    </div>
</div>'''

    def build_sec_culture():
        c = data["culture"]
        return f'''<div id="sec-culture" class="tab-content hidden space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-xl font-bold text-blue-950 flex items-center gap-2">
            <span>🎋</span> Góc Văn Hóa: {c["title"]}
        </h2>
        <p class="text-xs text-slate-600 leading-relaxed">{c["p1"]}</p>
        <div class="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed">{c["p2"]}</div>
    </div>
</div>'''

    def build_master_html(is_mo_phong=True):
        title = f"HSK 2 - Bài {day_num}: {data['title']} (Có Mô Phỏng Nét Viết)" if is_mo_phong else f"HSK 2 - Bài {day_num}: {data['title']} (Phiên Bản Tự Học Chuẩn)"

        if is_mo_phong:
            nav_html = '''    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 scrollbar-none">
            <button onclick="showTab('sim')" id="tab-sim" class="tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer">🎬 Mô phỏng nét viết</button>
            <button onclick="showTab('overview')" id="tab-overview" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>'''
        else:
            nav_html = '''    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 scrollbar-none">
            <button onclick="showTab('overview')" id="tab-overview" class="tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer">📌 Overview</button>
            <button onclick="showTab('vocab')" id="tab-vocab" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📖 Từ vựng</button>
            <button onclick="showTab('writing')" id="tab-writing" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">✍️ Tập viết & Mẹo nhớ</button>
            <button onclick="showTab('grammar')" id="tab-grammar" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">💡 Ngữ pháp</button>
            <button onclick="showTab('text')" id="tab-text" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🗣️ Bài khóa</button>
            <button onclick="showTab('practice')" id="tab-practice" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">📝 Luyện tập</button>
            <button onclick="showTab('culture')" id="tab-culture" class="tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition">🎋 Góc văn hóa</button>
        </div>
    </div>'''

        sec_sim = build_sec_sim() if is_mo_phong else ""
        sec_writing = build_sec_writing()
        vocab_rows_html = build_vocab_table()
        sec_text = build_sec_text()
        sec_grammar = build_sec_grammar()
        sec_practice = build_sec_practice()
        sec_culture = build_sec_culture()

        items_json = json.dumps(data["chars"])
        vocab_b64_json = json.dumps(vocab_b64)
        text_b64_json = json.dumps(text_b64)
        ov_cls = "tab-content hidden" if is_mo_phong else "tab-content"

        return f'''<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>{title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: 'Lexend', 'Noto Sans SC', sans-serif; background-color: #f8fafc; color: #1e293b; }}
        .zh {{ font-family: 'Noto Sans SC', sans-serif; }}
        @media print {{
            .no-print {{ display: none !important; }}
            body {{ background: white !important; color: black !important; padding: 0 !important; }}
            .card {{ border: 1px solid #cbd5e1 !important; box-shadow: none !important; margin-bottom: 16px !important; page-break-inside: avoid; }}
            .tab-content {{ display: block !important; }}
            header {{ background: #1e3a8a !important; color: white !important; }}
        }}
        .tab-btn.active {{
            border-bottom: 3px solid #1e3a8a;
            color: #1e3a8a;
            font-weight: 700;
        }}
        .audio-btn {{ transition: all 0.2s ease; cursor: pointer; }}
        .audio-btn:hover {{ transform: scale(1.08); }}
        .audio-btn:active {{ transform: scale(0.95); }}
        .writer-container {{ width: 130px; height: 130px; border: 2px dashed #cbd5e1; border-radius: 12px; background: #ffffff; position: relative; background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px); background-size: 50% 50%; }}
        .pad-canvas {{ width: 130px; height: 130px; border: 2px solid #cbd5e1; border-radius: 12px; background: #ffffff; touch-action: none; cursor: crosshair; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen">

    <!-- HEADER -->
    <header class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl no-print">
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <span class="inline-block px-3 py-1 bg-blue-800/60 rounded-full text-xs font-semibold tracking-wide uppercase text-blue-200 mb-2">Giáo Trình HSK 2 Tự Học</span>
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">{data["title"]}</h1>
                <p class="text-blue-200 text-sm mt-1">{data["sub"]}</p>
            </div>
            <div class="flex items-center gap-3 bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                <span class="text-xs text-slate-300 font-medium pl-2">Tốc độ đọc:</span>
                <button onclick="setAudioPlaybackRate(0.75)" id="rate-075" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">0.75x (Chậm)</button>
                <button onclick="setAudioPlaybackRate(1.0)" id="rate-100" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition">1.0x (Chuẩn)</button>
            </div>
        </div>
    </header>

{nav_html}

    <main class="max-w-7xl mx-auto px-4 py-8">

{sec_sim}

        <!-- TAB 1: OVERVIEW -->
        <div id="sec-overview" class="{ov_cls}">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90 mb-6">
                <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span class="text-blue-800">🎯</span> Mục tiêu bài học hôm nay (Bài {day_num}: {data["title"]})
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50/70 p-4 rounded-xl border border-slate-200">
                        <div class="font-bold text-blue-900 mb-1">1. Từ vựng & Viết chữ</div>
                        <p class="text-sm text-slate-600">Nắm vững {len(data["vocab"])} từ mới chủ đề, thứ tự nét viết chuẩn và chiết tự.</p>
                    </div>
                    <div class="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100">
                        <div class="font-bold text-indigo-900 mb-1">2. Ngữ pháp ứng dụng</div>
                        <p class="text-sm text-slate-600">Hiểu rõ 4 mẫu ngữ pháp trọng tâm Bài {day_num} và áp dụng đặt câu.</p>
                    </div>
                    <div class="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                        <div class="font-bold text-emerald-900 mb-1">3. Giao tiếp & Audio</div>
                        <p class="text-sm text-slate-600">Luyện nghe 4 bài khóa hội thoại thực tế và phản xạ giao tiếp tự nhiên.</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90">
                <h3 class="text-lg font-bold text-slate-900 mb-3">📌 Quy trình 5 bước tự học hiệu quả</h3>
                <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-slate-700">
                    <li><strong class="text-blue-900">Bước 1:</strong> Học từ vựng và tra cứu bảng phát âm ở Tab 📖 **Từ vựng**.</li>
                    <li><strong class="text-blue-900">Bước 2:</strong> Xem quy tắc nét bút và thẻ chiết tự ở Tab ✍️ **Tập viết & Mẹo nhớ**.</li>
                    <li><strong class="text-blue-900">Bước 3:</strong> Nắm vững 4 mẫu ngữ pháp ở Tab 💡 **Ngữ pháp**.</li>
                    <li><strong class="text-blue-900">Bước 4:</strong> Nghe audio và luyện phản xạ bài khóa ở Tab 🗣️ **Bài khóa**.</li>
                    <li><strong class="text-blue-900">Bước 5:</strong> Hoàn thành 15 câu trắc nghiệm ở Tab 📝 **Luyện tập** và đọc Tab 🎋 **Góc văn hóa**.</li>
                </ol>
            </div>
        </div>

        <!-- TAB 2: VOCABULARY -->
        <div id="sec-vocab" class="tab-content hidden space-y-6">
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-5 shadow-sm space-y-4">
                <div class="flex items-center gap-2.5 border-b border-amber-200/60 pb-2.5">
                    <span class="text-2xl">⚡</span>
                    <div>
                        <h3 class="font-bold text-amber-950 text-base md:text-lg">QUY TẮC BIẾN ĐIỆU THANH ĐIỆU TRỌNG TÂM HSK 2</h3>
                        <p class="text-xs text-amber-800/80">Học và luyện nghe các quy tắc biến điệu quan trọng để phát âm chuẩn tự nhiên</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-800">
                    <div class="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1.5">
                        <div class="font-bold text-amber-950 flex items-center justify-between">
                            <span>1. Biến điệu Hai Thanh 3 (3 + 3 → 2 + 3)</span>
                            <span class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">∨ + ∨ → / + ∨</span>
                        </div>
                        <p class="text-xs text-slate-600">Khi 2 âm tiết mang thanh 3 đi liền nhau, âm tiết đầu biến thành thanh 2.</p>
                        <div class="text-xs font-mono text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                            Ví dụ: 你好 (nǐ hǎo ➔ ní hǎo), 你好吗 (ní hǎo ma)
                        </div>
                    </div>
                    <div class="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1.5">
                        <div class="font-bold text-amber-950 flex items-center justify-between">
                            <span>2. Biến điệu của 不 (bù → bú)</span>
                            <span class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">bù + Thanh 4 → bú</span>
                        </div>
                        <p class="text-xs text-slate-600">Khi "不" đứng trước từ mang thanh 4, "不" chuyển thành thanh 2 (bú).</p>
                        <div class="text-xs font-mono text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                            Ví dụ: 不是 (bù shì ➔ bú shì), 不看 (bú kàn)
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>📖</span> Bảng {len(data["vocab"])} Từ Vựng Trọng Tâm HSK2 Bài {day_num}
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                                <th class="py-3 px-3 text-center">Nút Nghe</th>
                                <th class="py-3 px-3">Chữ Hán</th>
                                <th class="py-3 px-3">Pinyin</th>
                                <th class="py-3 px-3">Hán Việt</th>
                                <th class="py-3 px-3">Loại từ</th>
                                <th class="py-3 px-3">Biến thể Thanh điệu</th>
                                <th class="py-3 px-3">Nghĩa tiếng Việt</th>
                                <th class="py-3 px-3">Ví dụ minh họa</th>
                            </tr>
                        </thead>
                        <tbody>
{vocab_rows_html}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

{sec_writing}

        <!-- TAB 4: GRAMMAR -->
        <div id="sec-grammar" class="tab-content hidden space-y-6">
{sec_grammar}
        </div>

        <!-- TAB 5: TEXT -->
        <div id="sec-text" class="tab-content hidden space-y-6">
{sec_text}
        </div>

        <!-- TAB 6: PRACTICE -->
        <div id="sec-practice" class="tab-content hidden space-y-6">
{sec_practice}
        </div>

        <!-- TAB 7: CULTURE -->
{sec_culture}

    </main>

    <script>
        var writers = {{}};
        var canvasPads = {{}};
        var currentAudio = null;
        var currentRate = 1.0;

        const VOCAB_AUDIO = {vocab_b64_json};
        const TEXT_AUDIO = {text_b64_json};
        const items = {items_json};

        function setAudioPlaybackRate(rate) {{
            currentRate = rate;
            document.querySelectorAll('#rate-075, #rate-100').forEach(btn => {{
                btn.className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition";
            }});
            if (rate === 0.75) {{
                document.getElementById('rate-075').className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition";
            }} else {{
                document.getElementById('rate-100').className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow transition";
            }}
        }}

        function playVocab(key, fallbackText) {{
            let b64 = VOCAB_AUDIO[key];
            if (!b64 && typeof TEXT_AUDIO !== "undefined" && TEXT_AUDIO) {{
                b64 = TEXT_AUDIO[key];
            }}
            if (b64) {{
                playB64(b64, fallbackText);
            }} else {{
                speakText(fallbackText);
            }}
        }}

        function playText(key, fallbackText) {{
            playVocab(key, fallbackText);
        }}

        function playB64(b64Data, fallbackText) {{
            try {{
                if (currentAudio) {{
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }}
                if (!b64Data) {{
                    speakText(fallbackText);
                    return;
                }}
                var src = (b64Data.startsWith && b64Data.startsWith("data:audio/")) ? b64Data : ("data:audio/mp4;base64," + b64Data);
                currentAudio = new Audio(src);
                currentAudio.playbackRate = currentRate || 1.0;
                var playPromise = currentAudio.play();
                if (playPromise !== undefined) {{
                    playPromise.catch(function(err) {{
                        console.log("Base64 audio playback failed, fallback to TTS:", err);
                        speakText(fallbackText);
                    }});
                }}
            }} catch(e) {{
                speakText(fallbackText);
            }}
        }}

        function speakText(text) {{
            if (!text) return;
            try {{
                if (currentAudio) {{
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }}
            }} catch(e) {{}}

            var textClean = text.trim();
            if (!textClean) return;

            if ("speechSynthesis" in window) {{
                try {{
                    window.speechSynthesis.cancel();
                    var utter = new SpeechSynthesisUtterance(textClean);
                    utter.lang = "zh-CN";
                    utter.rate = currentRate || 1.0;
                    window.speechSynthesis.speak(utter);
                    return;
                }} catch(e) {{}}
            }}
            playOnlineTTS(textClean);
        }}

        function playOnlineTTS(text) {{
            try {{
                var encoded = encodeURIComponent(text);
                var ttsUrl = "https://dict.youdao.com/dictvoice?audio=" + encoded + "&type=1";
                currentAudio = new Audio(ttsUrl);
                currentAudio.playbackRate = currentRate || 1.0;
                currentAudio.play();
            }} catch(e) {{}}
        }}

        document.addEventListener('DOMContentLoaded', () => {{
            items.forEach(item => {{
                let el = document.getElementById('target-' + item.id);
                if (el && typeof HanziWriter !== 'undefined') {{
                    try {{
                        writers[item.id] = HanziWriter.create('target-' + item.id, item.char, {{
                            width: 130,
                            height: 130,
                            padding: 5,
                            strokeAnimationSpeed: 1,
                            delayBetweenStrokes: 150,
                            strokeColor: '#1e293b',
                            radicalColor: '#2563eb',
                            showOutline: true,
                            outlineColor: '#cbd5e1'
                        }});
                    }} catch(e) {{ console.error(e); }}
                }}
                setupCanvas('pad-' + item.id);
            }});
        }});

        function setupCanvas(canvasId) {{
            let canvas = document.getElementById(canvasId);
            if (!canvas || canvasPads[canvasId]) return;
            let ctx = canvas.getContext('2d');
            let isDrawing = false;
            canvasPads[canvasId] = {{ canvas, ctx }};

            function getPos(e) {{
                let rect = canvas.getBoundingClientRect();
                let clientX = e.touches ? e.touches[0].clientX : e.clientX;
                let clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {{
                    x: (clientX - rect.left) * (canvas.width / rect.width),
                    y: (clientY - rect.top) * (canvas.height / rect.height)
                }};
            }}

            function startDraw(e) {{
                e.preventDefault();
                isDrawing = true;
                let pos = getPos(e);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = '#0284c7';
            }}

            function draw(e) {{
                if (!isDrawing) return;
                e.preventDefault();
                let pos = getPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }}

            function stopDraw(e) {{
                if (!isDrawing) return;
                e.preventDefault();
                isDrawing = false;
            }}

            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDraw);
            canvas.addEventListener('mouseleave', stopDraw);
            canvas.addEventListener('touchstart', startDraw, {{ passive: false }});
            canvas.addEventListener('touchmove', draw, {{ passive: false }});
            canvas.addEventListener('touchend', stopDraw, {{ passive: false }});
        }}

        function animateChar(id) {{
            if (writers[id]) writers[id].animateCharacter();
        }}

        function resetChar(id) {{
            if (writers[id]) writers[id].showCharacter();
        }}

        function clearCanvas(id) {{
            if (canvasPads['pad-' + id]) {{
                let c = canvasPads['pad-' + id];
                c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
            }}
        }}

        function showTab(tabId) {{
            document.querySelectorAll('.tab-content').forEach(el => {{
                el.className = el.className.replace(/\\bhidden\\b/g, '').trim() + ' hidden';
                el.style.display = 'none';
            }});
            document.querySelectorAll('.tab-btn').forEach(btn => {{
                btn.className = 'tab-btn px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition';
            }});

            const target = document.getElementById('sec-' + tabId);
            if (target) {{
                target.className = target.className.replace(/\\bhidden\\b/g, '').trim();
                target.style.display = 'block';
            }}

            const activeBtn = document.getElementById('tab-' + tabId);
            if (activeBtn) {{
                activeBtn.className = 'tab-btn active px-4 py-2.5 rounded-xl font-bold bg-blue-900 text-white shadow-sm transition whitespace-nowrap text-xs md:text-sm cursor-pointer';
            }}
        }}

        function checkQ(btn, isCorrect) {{
            if (!btn || !btn.parentElement) return;
            const parentDiv = btn.parentElement;
            const siblings = parentDiv.querySelectorAll('button');
            siblings.forEach(b => {{
                b.className = "px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-100 text-slate-700";
            }});

            if (isCorrect) {{
                btn.className = "px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shadow-xs transition";
            }} else {{
                btn.className = "px-3 py-1.5 bg-rose-600 text-white rounded-lg font-bold shadow-xs transition";
            }}

            const card = btn.closest('.p-4') || btn.closest('.bg-slate-50') || parentDiv;
            if (card) {{
                let evalBox = card.querySelector('.ans-eval-box');
                if (!evalBox) {{
                    evalBox = document.createElement('div');
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm';
                    card.appendChild(evalBox);
                }}
                if (isCorrect) {{
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2';
                    evalBox.innerHTML = '<span>✨</span> <div><strong>Chính xác!</strong> Chị đã chọn đúng đáp án rồi ạ. 🎉</div>';
                }} else {{
                    evalBox.className = 'ans-eval-box mt-3 p-3 rounded-xl text-xs md:text-sm font-medium transition-all shadow-sm bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2';
                    evalBox.innerHTML = '<span>❌</span> <div><strong>Chưa chính xác!</strong> Đáp án này chưa đúng, chị hãy thử chọn lại đáp án khác nhé!</div>';
                }}
            }}
        }}
    </script>
</body>
</html>'''

    with open(os.path.join(day_dir, f"HSK2_Bai_{day_num}_Mo_Phong_Viet.html"), "w", encoding="utf-8") as f:
        f.write(build_master_html(True))

    with open(os.path.join(day_dir, f"HSK2_Bai_{day_num}_Tu_Hoc.html"), "w", encoding="utf-8") as f:
        f.write(build_master_html(False))

    print(f"Successfully generated Day {day_num} HTML files and Markdown guide!")

for d in [1, 2, 3, 4]:
    build_lesson(d)

print("\n==================== ALL DAYS 1-4 SUCCESSFULLY BUILT ====================")
