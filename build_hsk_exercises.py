import os
import json
import subprocess
import base64
import tempfile

VOCAB_DATA = [
  { "id": 1, "hz": "就", "py": "jiù", "hv": "Tự", "type": "phó từ / liên từ", "vi": "thì, liền, ngay, chính là", "mnemonic": "Bên trái có bộ Kinh 京 (thành phố), bên phải có 尤 (đặc biệt) -> Liền/chính là nơi đặc biệt.", "example_hz": "我下了课就去接你。", "example_py": "Wǒ xià le kè jiù qù jiē nǐ.", "example_vi": "Tôi tan học là đi đón bạn ngay." },
  { "id": 2, "hz": "给", "py": "gěi", "hv": "Cấp", "type": "động từ / giới từ", "vi": "cho, đưa cho, cho ai", "mnemonic": "Bộ Mịch 纟 (sợi chỉ) + 合 (hợp) -> Thu góp sợi chỉ cuộn lại cho người khác.", "example_hz": "请给我一杯咖啡。", "example_py": "Qǐng gěi wǒ yì bēi kāfēi.", "example_vi": "Xin cho tôi một ly cà phê." },
  { "id": 3, "hz": "让", "py": "ràng", "hv": "Nhượng", "type": "động từ", "vi": "cho phép, bảo, để cho, làm cho", "mnemonic": "Bộ Ngôn 讠 (lời nói) + 上 (trên) -> Dùng lời nói mời người trên đi trước -> nhường/để cho.", "example_hz": "妈妈不让我看电视。", "example_py": "Māmā bú ràng wǒ kàn diànshì.", "example_vi": "Mẹ không cho tôi xem tivi." },
  { "id": 4, "hz": "接", "py": "jiē", "hv": "Tiếp", "type": "động từ", "vi": "đón (người), nhận (điện thoại)", "mnemonic": "Bộ Thủ 扌 (tay) + 妾 (thiếp) -> Đưa tay ra đón người.", "example_hz": "我去车站接朋友。", "example_py": "Wǒ qù chēzhàn jiē péngyou.", "example_vi": "Tôi đi đến bến xe đón bạn." },
  { "id": 5, "hz": "次", "py": "cì", "hv": "Thứ", "type": "lượng từ", "vi": "lần, lượt", "mnemonic": "Bộ Băng 冫 (băng) + 欠 (thiếu) -> Lần lượt từng bước.", "example_hz": "这是我第一次去北京。", "example_py": "Zhè shì wǒ dì-yī cì qù Běijīng.", "example_vi": "Đây là lần đầu tiên tôi đi Bắc Kinh." },
  { "id": 6, "hz": "旅游", "py": "lǚyóu", "hv": "Lữ du", "type": "động từ / danh từ", "vi": "du lịch, đi du lịch", "mnemonic": "旅 (đoàn người đi xa) + 游 (bơi, bôn ba khắp nơi).", "example_hz": "我很喜欢去外国旅游。", "example_py": "Wǒ hěn xǐhuan qù wàiguó lǚyóu.", "example_vi": "Tôi rất thích đi du lịch nước ngoài." },
  { "id": 7, "hz": "帮忙", "py": "bāngmáng", "hv": "Bang mang", "type": "động từ ly hợp", "vi": "giúp đỡ, giúp một tay", "mnemonic": "帮 (giúp đỡ) + 忙 (bận rộn) -> Giúp đỡ khi ai đó bận rộn.", "example_hz": "谢谢你帮忙！", "example_py": "Xièxie nǐ bāngmáng!", "example_vi": "Cảm ơn bạn đã giúp đỡ!" },
  { "id": 8, "hz": "不好意思", "py": "bù hǎoyìsi", "hv": "Bất hảo ý tứ", "type": "cụm từ / tính từ", "vi": "ngại, ái ngại, xin lỗi", "mnemonic": "不 (không) + 好 (tốt) + 意思 (ý nghĩa/tình cảm) -> Ngại ngùng/xin lỗi.", "example_hz": "真不好意思，我迟到了。", "example_py": "Zhēn bù hǎoyìsi, wǒ chídào le.", "example_vi": "Thật ngại quá, tôi đến muộn rồi." },
  { "id": 9, "hz": "那", "py": "nà", "hv": "Na / Kia", "type": "đại từ / liên từ", "vi": "kia, thế thì, vậy thì", "mnemonic": "Bộ 𠂇 + 二 + 阝 (ấp) -> Chỉ vật ở xa (kia/vậy thì).", "example_hz": "那我们一起打车去吧。", "example_py": "Nà wǒmen yìqǐ dǎchē qù ba.", "example_vi": "Vậy thì chúng ta cùng bắt taxi đi nhé." },
  { "id": 10, "hz": "介绍", "py": "jièshào", "hv": "Giới thiệu", "type": "động từ", "vi": "giới thiệu", "mnemonic": "介 (ở giữa làm cầu nối) + 绍 (nối liền, bộ 纟).", "example_hz": "我来介绍一下，这是我的同学。", "example_py": "Wǒ lái jièshào yíxià, zhè shì wǒ de tóngxué.", "example_vi": "Để tôi giới thiệu một chút, đây là bạn học của tôi." },
  { "id": 11, "hz": "有时", "py": "yǒushí", "hv": "Hữu thời", "type": "phó từ", "vi": "có lúc, đôi khi", "mnemonic": "有 (có) + 时 (thời gian, thời khắc).", "example_hz": "他有时坐公交车去学校。", "example_py": "Tā yǒushí zuò gōngjiāochē qù xuéxiào.", "example_vi": "Anh ấy đôi khi đi xe buýt đến trường." },
  { "id": 12, "hz": "懂", "py": "dǒng", "hv": "Đổng", "type": "động từ", "vi": "hiểu, biết", "mnemonic": "Bộ Tâm 忄 (tấm lòng) + 重 (nặng) + 艹 -> Trong lòng suy nghĩ thấu đáo.", "example_hz": "这道题你听懂了吗？", "example_py": "Zhè dào tí nǐ tīng dǒng le ma?", "example_vi": "Câu này bạn nghe hiểu chưa?" },
  { "id": 13, "hz": "公交车", "py": "gōngjiāochē", "hv": "Công giao xa", "type": "danh từ", "vi": "xe buýt, xe công cộng", "mnemonic": "公 (công cộng) + 交 (giao thông) + 车 (xe).", "example_hz": "坐公交车很方便。", "example_py": "Zuò gōngjiāochē hěn fāngbiàn.", "example_vi": "Đi xe buýt rất tiện lợi." },
  { "id": 14, "hz": "but", "py": "dàn", "hv": "Đản", "type": "liên từ", "vi": "nhưng, nhưng mà (viết tắt của 但是)", "mnemonic": "Bộ Nhân 亻 + 旦 (bình minh) -> Người đứng nhìn hướng khác -> nhưng.", "example_hz": "汉语很难，但很有趣。", "example_py": "Hànyǔ hěn nán, dàn hěn yǒu qù.", "example_vi": "Tiếng Trung rất khó, nhưng rất thú vị." },
  { "id": 15, "hz": "车站", "py": "chēzhàn", "hv": "Xa trạm", "type": "danh từ", "vi": "trạm xe, bến xe", "mnemonic": "车 (xe) + 站 (đứng, trạm dừng).", "example_hz": "我在车站等你。", "example_py": "Wǒ zài chēzhàn děng nǐ.", "example_vi": "Tôi chờ bạn ở bến xe." },
  { "id": 16, "hz": "远", "py": "yuǎn", "hv": "Viễn", "type": "tính từ", "vi": "xa", "mnemonic": "Bộ Quai sước 辶 (di chuyển) + 元 (nguyên) -> Đi xa.", "example_hz": "北京大学离这里不远。", "example_py": "Běijīng Dàxué lí zhèlǐ bù yuǎn.", "example_vi": "Đại học Bắc Kinh không xa đây lắm." },
  { "id": 17, "hz": "打车", "py": "dǎchē", "hv": "Đả xa", "type": "động từ ly hợp", "vi": "bắt xe taxi, đi taxi", "mnemonic": "打 (vẫy, gọi) + 车 (xe).", "example_hz": "太晚了，我们打车回家吧。", "example_py": "Tài wǎn le, wǒmen dǎchē huí jiā ba.", "example_vi": "Muộn quá rồi, chúng ta bắt taxi về nhà đi." },
  { "id": 18, "hz": "还是", "py": "háishi", "hv": "Hoàn thị", "type": "phó từ / liên từ", "vi": "hay là (trong câu hỏi), vẫn", "mnemonic": "还 (vẫn) + 是 (là) -> Chọn cái này hay là cái kia.", "example_hz": "你想喝茶还是喝咖啡？", "example_py": "Nǐ xiǎng hē chá háishi hē kāfēi?", "example_vi": "Bạn muốn uống trà hay uống cà phê?" },
  { "id": 19, "hz": "北京大学", "py": "Běijīng Dàxué", "hv": "Bắc Kinh Đại học", "type": "danh từ riêng", "vi": "Đại học Bắc Kinh", "mnemonic": "Trường đại học hàng đầu Trung Quốc tại thủ đô Bắc Kinh.", "example_hz": "他是北京大学的学生。", "example_py": "Tā shì Běijīng Dàxué de xuésheng.", "example_vi": "Anh ấy là sinh viên Đại học Bắc Kinh." },
  { "id": 20, "hz": "万", "py": "wàn", "hv": "Vạn", "type": "số từ", "vi": "vạn (10.000)", "mnemonic": "Chữ 万 có 3 nét, biểu thị mười nghìn (10.000).", "example_hz": "这台电脑一万块钱。", "example_py": "Zhè tái diànnǎo yí wàn kuài qián.", "example_vi": "Chiếc máy tính này giá một vạn tệ (10.000 NDT)." },
  { "id": 21, "hz": "名", "py": "míng", "hv": "Danh", "type": "lượng từ / danh từ", "vi": "vị, người (lượng từ lịch sự chỉ người); tên", "mnemonic": "Bộ Tịch 夕 (đêm tối) + 口 (miệng) -> Ban đêm xướng tên nhau.", "example_hz": "我们学校有一千名外国学生。", "example_py": "Wǒmen xuéxiào yǒu yì qiān míng wàiguó xuésheng.", "example_vi": "Trường chúng tôi có 1000 lưu học sinh nước ngoài." },
  { "id": 22, "hz": "网上", "py": "wǎngshang", "hv": "Võng thượng", "type": "danh từ nơi chốn", "vi": "trên mạng, trên internet", "mnemonic": "网 (mạng lưới) + 上 (trên).", "example_hz": "我喜欢在网上买书。", "example_py": "Wǒ xǐhuan zài wǎngshang mǎi shū.", "example_vi": "Tôi thích mua sách trên mạng." },
  { "id": 23, "hz": "外国", "py": "wàiguó", "hv": "Ngoại quốc", "type": "danh từ", "vi": "nước ngoài", "mnemonic": "外 (bên ngoài) + 国 (đất nước).", "example_hz": "我想去外国工作。", "example_py": "Wǒ xiǎng qù wàiguó gōngzuò.", "example_vi": "Tôi muốn đi nước ngoài làm việc." },
  { "id": 24, "hz": "间", "py": "jiān", "hv": "Gian", "type": "lượng từ", "vi": "gian, căn (lượng từ cho phòng, căn nhà)", "mnemonic": "Bộ Môn 门 (cửa) + 日 (mặt trời) -> Ánh mặt trời lọt qua cửa phòng.", "example_hz": "这间教室很大。", "example_py": "Zhè jiān jiàoshì hěn dà.", "example_vi": "Phòng học này rất rộng." },
  { "id": 25, "hz": "教室", "py": "jiàoshì", "hv": "Giáo thất", "type": "danh từ", "vi": "phòng học, lớp học", "mnemonic": "教 (dạy học) + 室 (căn phòng).", "example_hz": "请大家进教室吧。", "example_py": "Qǐng dàjiā jìn jiàoshì ba.", "example_vi": "Mời mọi người vào phòng học." },
  { "id": 26, "hz": "别", "py": "bié", "hv": "Biệt", "type": "phó từ", "vi": "đừng, chớ", "mnemonic": "Bộ Đao 刂 (dao) + 另 (khác) -> Khuyên đừng chia rẽ.", "example_hz": "天黑了，别一个人出去。", "example_py": "Tiān hēi le, bié yí gè rén chūqù.", "example_vi": "Trời tối rồi, đừng đi ra ngoài một mình." },
  { "id": 27, "hz": "过来", "py": "guòlái", "hv": "Quá lai", "type": "động từ xu hướng", "vi": "đi qua đây, lại đây", "mnemonic": "过 (qua) + 来 (đến).", "example_hz": "请你过来一下。", "example_py": "Qǐng nǐ guòlái yíxià.", "example_vi": "Xin bạn qua đây một chút." },
  { "id": 28, "hz": "这么", "py": "zhème", "hv": "Giá ma", "type": "đại từ", "vi": "thế này, như thế này, đến mức này", "mnemonic": "这 (này) + 么 (chỉ mức độ).", "example_hz": "你怎么这么累？", "example_py": "Nǐ zěnme zhème lèi?", "example_vi": "Sao bạn lại mệt thế này?" },
  { "id": 29, "hz": "完", "py": "wán", "hv": "Hoàn", "type": "động từ / bổ ngữ", "vi": "xong, hết, hoàn thành", "mnemonic": "Bộ Miên 宀 (mái nhà) + 元 (đầu) -> Làm xong việc trọn vẹn.", "example_hz": "我已经做完作业了。", "example_py": "Wǒ yǐjīng zuò wán zuòyè le.", "example_vi": "Tôi đã làm xong bài tập rồi." },
  { "id": 30, "hz": "一起", "py": "yìqǐ", "hv": "Nhất khởi", "type": "phó từ", "vi": "cùng nhau", "mnemonic": "一 (một) + 起 (dậy, khởi xướng) -> Cùng đứng lên làm việc.", "example_hz": "我们一起去西安旅游吧。", "example_py": "Wǒmen yìqǐ qù Xī'ān lǚyóu ba.", "example_vi": "Chúng mình cùng nhau đi Tây An du lịch đi." },
  { "id": 31, "hz": "出去", "py": "chūqù", "hv": "Xuất khứ", "type": "động từ xu hướng", "vi": "đi ra ngoài", "mnemonic": "出 (ra) + 去 (đi).", "example_hz": "外面下雨了，别出去。", "example_py": "Wàimian xià yǔ le, bié chūqù.", "example_vi": "Bên ngoài mưa rồi, đừng đi ra ngoài." },
  { "id": 32, "hz": "洗", "py": "xǐ", "hv": "Tẩy", "type": "động từ", "vi": "rửa, giặt, gội", "mnemonic": "Bộ Thủy 氵 (nước) + 先 (trước) -> Dùng nước rửa sạch.", "example_hz": "饭前要洗手。", "example_py": "Fàn qián yào xǐ shǒu.", "example_vi": "Trước khi ăn phải rửa tay." },
  { "id": 33, "hz": "自己", "py": "zìjǐ", "hv": "Tự kỷ", "type": "đại từ", "vi": "bản thân, tự mình", "mnemonic": "自 (tự bản thân) + 己 (kỷ - bản thân).", "example_hz": "这是我自己做的菜。", "example_py": "Zhè shì wǒ zìjǐ zuò de cài.", "example_vi": "Đây là món ăn tự tay tôi làm." },
  { "id": 34, "hz": "拿", "py": "ná", "hv": "Nã", "type": "động từ", "vi": "cầm, lấy, nắm", "mnemonic": "Bộ Hợp 合 (gộp lại) + 手 (bàn tay) -> Chắp tay lại cầm lấy đồ.", "example_hz": "请帮我拿那本书。", "example_py": "Qǐng bāng wǒ ná nà běn shū.", "example_vi": "Xin giúp tôi lấy cuốn sách kia." },
  { "id": 35, "hz": "为什么", "py": "wèishénme", "hv": "Vi thập ma", "type": "đại từ nghi vấn", "vi": "tại sao, vì sao", "mnemonic": "为 (vì) + 什么 (gì) -> Vì lý do gì.", "example_hz": "你为什么没去上课？", "example_py": "Nǐ wèishénme méi qù shàngkè?", "example_vi": "Tại sao bạn không đi học?" },
  { "id": 36, "hz": "送", "py": "sòng", "hv": "Tống", "type": "động từ", "vi": "tặng, tiễn, đưa, giao", "mnemonic": "Bộ Quai sước 辶 + 关 (đóng) -> Tiễn bạn lên đường.", "example_hz": "我去机场送朋友。", "example_py": "Wǒ qù jīchǎng sòng péngyou.", "example_vi": "Tôi đi ra sân bay tiễn bạn." },
  { "id": 37, "hz": "回来", "py": "huílái", "hv": "Hồi lai", "type": "động từ xu hướng", "vi": "trở về, về lại", "mnemonic": "回 (trở về) + 来 (đến).", "example_hz": "你几点回来吃晚饭？", "example_py": "Nǐ jǐ diǎn huílái chī wǎnfàn?", "example_vi": "Mấy giờ bạn về ăn cơm tối?" },
  { "id": 38, "hz": "每", "py": "měi", "hv": "Mỗi", "type": "đại từ", "vi": "mỗi, mọi", "mnemonic": "Bộ Nhân 𠂉 + 母 (mẹ) -> Mẹ mỗi ngày chăm sóc gia đình.", "example_hz": "我每天早上六点起床。", "example_py": "Wǒ měi tiān zǎoshang liù diǎn qǐchuáng.", "example_vi": "Mỗi ngày tôi dậy lúc 6 giờ sáng." },
  { "id": 39, "hz": "累", "py": "lèi", "hv": "Lụy", "type": "tính từ", "vi": "mệt, mệt mỏi", "mnemonic": "Bộ Điền 田 (ruộng) + 纟 (tơ lụa) -> Làm ruộng quấn tơ rất mệt.", "example_hz": "今天工作很累。", "example_py": "Jīntiān gōngzuò hěn lèi.", "example_vi": "Hôm nay làm việc rất mệt." },
  { "id": 40, "hz": "西安", "py": "Xī'ān", "hv": "Tây An", "type": "danh từ riêng", "vi": "Thành phố Tây An", "mnemonic": "西 (phía Tây) + 安 (bình an) -> Cố đô Tây An.", "example_hz": "西安是一个很有名的历史城市。", "example_py": "Xī'ān shì yí gè hěn yǒumíng de lìshǐ chéngshì.", "example_vi": "Tây An là một thành phố lịch sử rất nổi tiếng." },
  { "id": 41, "hz": "已经", "py": "yǐjīng", "hv": "Dĩ kinh", "type": "phó từ", "vi": "đã, rồi", "mnemonic": "已 (đã qua) + 经 (trải qua).", "example_hz": "我已经学完 these 词了。", "example_py": "Wǒ yǐjīng xué wán zhèxiē cí le.", "example_vi": "Tôi đã học xong những từ này rồi." }
]
VOCAB_DATA[13]["hz"] = "但"
VOCAB_DATA[40]["example_hz"] = "我已经学完these词了。".replace("these", "these").replace("these", "these")
VOCAB_DATA[40]["example_hz"] = "我已经学完这些词了。"

QUIZ_QUESTIONS = [
    { "q": "Từ '打车' có nghĩa là gì?", "opts": ["Bắt xe buýt", "Đi bộ", "Bắt xe taxi", "Lái xe ô tô"], "ans": 2, "exp": "打车 (dǎchē): Bắt xe taxi / đi taxi." },
    { "q": "Chọn chữ Hán mang nghĩa 'thế thì, vậy thì':", "opts": ["但", "那", "每", "就"], "ans": 1, "exp": "那 (nà): thế thì, vậy thì." },
    { "q": "Từ '北京大学' dịch sang tiếng Việt là gì?", "opts": ["Đại học Bắc Kinh", "Đại học Thanh Hoa", "Trường HSK Bắc Kinh", "Thủ đồ Bắc Kinh"], "ans": 0, "exp": "北京大学 (Běijīng Dàxué): Đại học Bắc Kinh." },
    { "q": "Từ nào mang nghĩa 'cho phép, bảo, để cho'?", "opts": ["给", "送", "让", "接"], "ans": 2, "exp": "让 (ràng): cho phép, bảo, để cho, làm cho." },
    { "q": "Cụm từ '不好意思' dùng trong trường hợp nào?", "opts": ["Khi tức giận", "Khi muốn tỏ ý xin lỗi / ái ngại", "Khi khen ngợi", "Khi chúc mừng"], "ans": 1, "exp": "不好意思 (bù hǎoyìsi): Ngại quá, xin lỗi." },
    { "q": "Phiên âm Pinyin đúng của từ '已经' là gì?", "opts": ["yǐjīng", "yìqǐ", "yǒushí", "yíyàng"], "ans": 0, "exp": "已经 (yǐjīng): đã, rồi." },
    { "q": "Từ '公交车' có nghĩa là gì?", "opts": ["Xe máy", "Xe đạp", "Xe buýt", "Xe taxi"], "ans": 2, "exp": "公交车 (gōngjiāochē): xe buýt, xe công cộng." },
    { "q": "Điền từ thích hợp: 我下了课____去接你。", "opts": ["累", "就", "万", "间"], "ans": 1, "exp": "就 (jiù): biểu thị hành động xảy ra ngay sau đó." },
    { "q": "Từ '帮忙' thuộc loại từ gì và mang nghĩa gì?", "opts": ["Tính từ - bận rộn", "Động từ ly hợp - giúp đỡ", "Danh từ - bạn bè", "Phó từ - cùng nhau"], "ans": 1, "exp": "帮忙 (bāngmáng): Động từ ly hợp mang nghĩa giúp đỡ." },
    { "q": "Chữ '洗' trong câu '饭前要洗手' có nghĩa là gì?", "opts": ["Nấu", "Ăn", "Rửa / Giặt", "Cầm"], "ans": 2, "exp": "洗 (xǐ): rửa, giặt." },
    { "q": "Từ nào mang nghĩa 'bản thân, tự mình'?", "opts": ["自己", "这么", "为什么", "外国"], "ans": 0, "exp": "自己 (zìjǐ): bản thân, tự mình." },
    { "q": "Từ nào là từ trái nghĩa / liên quan khoảng cách với '近' (gần)?", "opts": ["远", "累", "完", "次"], "ans": 0, "exp": "远 (yuǎn): xa." },
    { "q": "Lượng từ dùng cho phòng học (教室) hoặc căn nhà là gì?", "opts": ["个", "间", "名", "次"], "ans": 1, "exp": "间 (jiān): gian, căn (lượng từ phòng)." },
    { "q": "Chọn câu dịch đúng cho 'Sao bạn mệt thế này?'", "opts": ["你为什么没来？", "你怎么这么累？", "你去哪儿？", "你懂不懂？"], "ans": 1, "exp": "你怎么这么累？ (Nǐ zěnme zhème lèi?)" },
    { "q": "Chữ '完' trong động từ '做完' đóng vai trò là gì?", "opts": ["Chủ ngữ", "Bổ ngữ kết quả (xong/hết)", "Lượng từ", "Bổ ngữ xu hướng"], "ans": 1, "exp": "完 (wán): Bổ ngữ kết quả biểu thị sự hoàn thành." }
]

FILL_QUESTIONS = [
    { "sentence": "我下了课 ____ 去接你。", "opts": ["就", "但", "累"], "ans": "就", "pinyin": "Wǒ xià le kè jiù qù jiē nǐ.", "vi": "Tôi tan học là đi đón bạn ngay." },
    { "sentence": "太晚了，我们 ____ 回家吧。", "opts": ["打车", "旅游", "介绍"], "ans": "打车", "pinyin": "Tài wǎn le, wǒmen dǎchē huí jiā ba.", "vi": "Muộn quá rồi, chúng ta bắt taxi về nhà đi." },
    { "sentence": "妈妈不 ____ 我看电视。", "opts": ["让", "洗", "拿"], "ans": "让", "pinyin": "Māmā bú ràng wǒ kàn diànshì.", "vi": "Mẹ không cho tôi xem tivi." },
    { "sentence": "这 ____ 教室很大，可以坐五十个学生。", "opts": ["间", "名", "次"], "ans": "间", "pinyin": "Zhè jiān jiàoshì hěn dà.", "vi": "Căn phòng học này rất rộng." },
    { "sentence": "你想喝茶 ____ 喝咖啡？", "opts": ["还是", "为什么", "这么"], "ans": "还是", "pinyin": "Nǐ xiǎng hē chá háishi hē kāfēi?", "vi": "Bạn muốn uống trà hay uống cà phê?" },
    { "sentence": "真 ____，我今天又迟到了。", "opts": ["不好意思", "已经", "网上"], "ans": "不好意思", "pinyin": "Zhēn bù hǎoyìsi, wǒ chídào le.", "vi": "Thật ngại quá, tôi hôm nay lại đến muộn rồi." },
    { "sentence": "我 ____ 做完作业了， सकते了。", "opts": ["已经", "别", "懂"], "ans": "已经", "pinyin": "Wǒ yǐjīng zuò wán zuòyè le.", "vi": "Tôi đã làm xong bài tập rồi." },
    { "sentence": "你 ____ 没去参加考试？", "opts": ["为什么", "过来", "有时"], "ans": "为什么", "pinyin": "Nǐ wèishénme méi qù chānjiā kǎoshì?", "vi": "Tại sao bạn không đi tham gia kỳ thi?" },
    { "sentence": "天黑了，____ 一个人出去。", "opts": ["别", "就", "每"], "ans": "别", "pinyin": "Tiān hēi le, bié yí gè rén chūqù.", "vi": "Trời tối rồi, đừng đi ra ngoài một mình." },
    { "sentence": "我们学校有一千 ____ 外国留学生。", "opts": ["名", "间", "次"], "ans": "名", "pinyin": "Wǒmen xuéxiào yǒu yì qiān míng wàiguó xuésheng.", "vi": "Trường chúng tôi có 1000 lưu học sinh nước ngoài." }
]
FILL_QUESTIONS[6]["sentence"] = "我 ____ 做完作业了，可以出去 play 了。"
FILL_QUESTIONS[6]["sentence"] = "我 ____ 做完作业了， commercial出去玩了。"
FILL_QUESTIONS[6]["sentence"] = "我 ____ 做完作业了， comfortable."
FILL_QUESTIONS[6]["sentence"] = "我 ____ 做完作业了，可以出去玩了。"

ORDER_QUESTIONS = [
    { 
        "target": "我下了课就去车站接你。", 
        "words": ["接你。", "去车站", "我", "就", "下了课"], 
        "pinyin": "Wǒ xià le kè jiù qù chēzhàn jiē nǐ.", 
        "vi": "Tôi tan học là đi đến bến xe đón bạn ngay.",
        "grammar": "📌 <b>Ngữ pháp liên tiếp với 就 (jiù):</b> Cấu trúc <code>S + V1 + 了 + (Tân ngữ) + 就 + V2</code> dùng biểu thị hai hành động xảy ra nối tiếp nhau ngay lập tức ('vừa... là... ngay'). Động từ <code>接</code> (đón) đứng trước tân ngữ chỉ người <code>你</code>."
    },
    { 
        "target": "妈妈不让我一个人出去。", 
        "words": ["不让", "一个人", "妈妈", "出去。", "我"], 
        "pinyin": "Māmā bú ràng wǒ yí gè rén chūqù.", 
        "vi": "Mẹ không cho tôi đi ra ngoài một mình.",
        "grammar": "📌 <b>Câu kiêm xưng với 让 (ràng):</b> Cấu trúc <code>S1 + 不让 + S2 + V</code> biểu thị ai đó không cho phép ai làm việc gì. Động từ xu hướng <code>出去</code> (đi ra ngoài) đứng cuối câu làm vị ngữ chính."
    },
    { 
        "target": "你想坐公交车还是打车？", 
        "words": ["打车？", "坐公交车", "想", "还是", "你"], 
        "pinyin": "Nǐ xiǎng zuò gōngjiāochē háishi dǎchē?", 
        "vi": "Bạn muốn đi xe buýt hay là bắt taxi?",
        "grammar": "📌 <b>Câu hỏi lựa chọn với 还是 (háishi):</b> Cấu trúc <code>S + 想 + A + 还是 + B?</code> liên kết 2 phương án động từ <code>坐公交车</code> (đi xe buýt) và <code>打车</code> (bắt taxi) để hỏi người nghe chọn 1 trong 2."
    },
    { 
        "target": "我已经做完今天的作业了。", 
        "words": ["今天的", "作业了。", "我已经", "做完"], 
        "pinyin": "Wǒ yǐjīng zuò wán jīntiān de zuòyè le.", 
        "vi": "Tôi đã làm xong bài tập hôm nay rồi.",
        "grammar": "📌 <b>Bổ ngữ kết quả 完 (wán) & Phó từ 已经 (yǐjīng):</b> Cấu trúc <code>S + 已经 + V + 完 + Tân ngữ + 了</code>. Động từ <code>做</code> (làm) kết hợp bổ ngữ <code>完</code> (xong) đứng trước cụm định ngữ <code>今天的作业</code>."
    },
    { 
        "target": "你为什么这么累？", 
        "words": ["这么累？", "为什么", "你"], 
        "pinyin": "Nǐ wèishénme zhème lèi?", 
        "vi": "Tại sao bạn lại mệt thế này?",
        "grammar": "📌 <b>Câu hỏi nguyên nhân 为什么 & Đại từ chỉ mức độ 这么:</b> <code>为什么</code> (tại sao) đứng sau chủ ngữ <code>你</code>; đại từ <code>这么</code> (thế này) đứng trực tiếp trước tính từ <code>累</code> (mệt) để nhấn mạnh mức độ."
    },
    { 
        "target": "我们一起去西安旅游吧。", 
        "words": ["西安", "旅游吧。", "我们", "去", "一起"], 
        "pinyin": "Wǒmen yìqǐ qù Xī'ān lǚyóu ba.", 
        "vi": "Chúng mình cùng nhau đi Tây An du lịch đi.",
        "grammar": "📌 <b>Phó từ 一起 (yìqǐ) & Trợ từ đề nghị 吧 (ba):</b> <code>一起</code> (cùng nhau) đứng trước động từ liên tiếp <code>去西安旅游</code>; trợ từ ngữ khí <code>吧</code> đặt cuối câu biểu thị lời rủ rê, gợi ý nhẹ nhàng."
    },
    { 
        "target": "请帮我拿那本书。", 
        "words": ["那本书。", "拿", "帮我", "请"], 
        "pinyin": "Qǐng bāng wǒ ná nà běn shū.", 
        "vi": "Xin giúp tôi lấy cuốn sách kia.",
        "grammar": "📌 <b>Cấu trúc nhờ cậy 帮 (bāng):</b> Cấu trúc <code>请 + 帮 + Tân ngữ chỉ người + V + Tân ngữ đồ vật</code>. <code>帮我</code> (giúp tôi) đứng trước động từ <code>拿</code> (cầm/lấy), lượng từ <code>本</code> đứng sau đại từ chỉ định <code>那</code>."
    },
    { 
        "target": "这是我自己做的中国菜。", 
        "words": ["做的", "我自己", "这是", "中国菜。"], 
        "pinyin": "Zhè shì wǒ zìjǐ zuò de Zhōngguó cài.", 
        "vi": "Đây là món ăn Trung Quốc do chính tôi tự làm.",
        "grammar": "📌 <b>Đại từ nhấn mạnh 自己 (zìjǐ) & Mệnh đề định ngữ 的:</b> <code>我自己</code> (chính bản thân tôi) đứng trước động từ <code>做</code>; cụm <code>我自己做的</code> đóng vai trò định ngữ bổ nghĩa cho danh từ trung tâm <code>中国菜</code>."
    }
]

TRANS_QUESTIONS = [
    {
        "type": "vi2zh",
        "prompt": "Tôi tan học xong là đi đến bến xe đón bạn ngay.",
        "target": "我下了课就去车站接你。",
        "pinyin": "Wǒ xià le kè jiù qù chēzhàn jiē nǐ.",
        "vocab": "就 (jiù), 车站 (chēzhàn), 接 (jiē)",
        "grammar": "Cấu trúc hành động nối tiếp: <code>V1 + 了 ... 就 + V2</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Mẹ không cho tôi đi ra ngoài một mình.",
        "target": "妈妈不让我一个人出去。",
        "pinyin": "Māmā bú ràng wǒ yí gè rén chūqù.",
        "vocab": "让 (ràng), 出去 (chūqù), 一个人",
        "grammar": "Câu kiêm xưng phủ định: <code>S1 + 不让 + S2 + V</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Bạn muốn đi xe buýt hay là bắt taxi?",
        "target": "你想坐公交车还是打车？",
        "pinyin": "Nǐ xiǎng zuò gōngjiāochē háishi dǎchē?",
        "vocab": "公交车 (gōngjiāochē), 还是 (háishi), 打车 (dǎchē)",
        "grammar": "Câu hỏi lựa chọn giữa 2 phương án: <code>A 还是 B?</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Thật ngại quá, hôm nay công việc mệt như thế này.",
        "target": "真不好意思，今天工作这么累。",
        "pinyin": "Zhēn bù hǎoyìsi, jīntiān gōngzuò zhème lèi.",
        "vocab": "不好意思 (bù hǎoyìsi), 这么 (zhème), 累 (lèi)",
        "grammar": "Cụm từ xin lỗi/ngại ngùng <code>不好意思</code> kết hợp <code>这么 + Tính từ</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Chúng tôi cùng nhau đi Tây An du lịch một lần rồi.",
        "target": "我们已经一起去过一次西安旅游了。",
        "pinyin": "Wǒmen yǐjīng yìqǐ qù guo yí cì Xī'ān lǚyóu le.",
        "vocab": "已经 (yǐjīng), 一起 (yìqǐ), 次 (cì), 西安 (Xī'ān), 旅游 (lǚyóu)",
        "grammar": "Phó từ <code>已经</code> chỉ quá khứ kết hợp động lượng từ <code>一次</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Thế thì để tôi giới thiệu cho bạn một vị bác sĩ nước ngoài nhé.",
        "target": "那我来给你介绍一名外国医生吧。",
        "pinyin": "Nà wǒ lái gěi nǐ jièshào yì míng wàiguó yīshēng ba.",
        "vocab": "那 (nà), 给 (gěi), 介绍 (jièshào), 名 (míng), 外国 (wàiguó)",
        "grammar": "Cấu trúc <code>给 + ai + 介绍</code> (Giới thiệu cho ai)."
    },
    {
        "type": "vi2zh",
        "prompt": "Rất nhiều người thích mua sắm trên mạng, nhưng tôi thích tự mình ra ngoài mua hơn.",
        "target": "很多人喜欢在网上买东西，但我喜欢自己出去买。",
        "pinyin": "Hěn duō rén xǐhuan zài wǎngshang mǎi dōngxi, dàn wǒ xǐhuan zìjǐ chūqù mǎi.",
        "vocab": "网上 (wǎngshang), 但 (dàn), 自己 (zìjǐ), 出去 (chūqù)",
        "grammar": "Liên từ biểu thị chuyển ngoặt <code>但</code> (nhưng) & đại từ nhấn mạnh <code>自己</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Cảm ơn bạn đã giúp đỡ, tôi đã rửa xong tất cả hoa quả rồi.",
        "target": "谢谢你帮忙，我已经洗完所有的水果了。",
        "pinyin": "Xièxie nǐ bāngmáng, wǒ yǐjīng xǐ wán suǒyǒu de shuǐguǒ le.",
        "vocab": "帮忙 (bāngmáng), 已经 (yǐjīng), 洗 (xǐ), 完 (wán)",
        "grammar": "Động từ ly hợp <code>帮忙</code> và bổ ngữ kết quả <code>洗完</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Đừng đi xa quá, phòng học của chúng ta ở ngay phía trước.",
        "target": "别走得太远，我们的教室就在前面。",
        "pinyin": "Bié zǒu de tài yuǎn, wǒmen de jiàoshì jiù zài qiánmiàn.",
        "vocab": "别 (bié), 远 (yuǎn), 教室 (jiàoshì), 就 (jiù)",
        "grammar": "Phó từ khuyên ngăn <code>别</code> và bổ ngữ trạng thái <code>走得太远</code>."
    },
    {
        "type": "vi2zh",
        "prompt": "Mỗi ngày tôi đều tự mình đi taxi từ trường về nhà.",
        "target": "我每天都自己打车从学校回来。",
        "pinyin": "Wǒ měitiān dōu zìjǐ dǎchē cóng xuéxiào huílái.",
        "vocab": "每 (měi), 自己 (zìjǐ), 打车 (dǎchē), 回来 (huílái)",
        "grammar": "Cụm <code>每天都</code> (Mỗi ngày đều) kết hợp động từ xu hướng <code>回来</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "你为什么在网上买这么贵的东西？",
        "pinyin": "Nǐ wèishénme zài wǎngshang mǎi zhème guì de dōngxi?",
        "target": "Tại sao bạn lại mua món đồ đắt như thế này trên mạng?",
        "vocab": "为什么 (wèishénme), 网上 (wǎngshang), 这么 (zhème)",
        "grammar": "Cấu trúc địa điểm trước động từ: <code>在 + 网上 + 买</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "请帮我拿那本书，我送给我的外国朋友。",
        "pinyin": "Qǐng bāng wǒ ná nà běn shū, wǒ sòng gěi wǒ de wàiguó péngyou.",
        "target": "Xin giúp tôi lấy cuốn sách kia, tôi tặng cho người bạn nước ngoài của tôi.",
        "vocab": "帮忙 (帮), 拿 (ná), 那 (nà), 送 (sòng), 给 (gěi), 外国 (wàiguó)",
        "grammar": "Cụm động từ tặng: <code>送给 + Người nhận</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "这间教室有一千名北京大学的学生。",
        "pinyin": "Zhè jiān jiàoshì yǒu yì qiān míng Běijīng Dàxué de xuésheng.",
        "target": "Căn phòng học này có 1000 sinh viên Đại học Bắc Kinh.",
        "vocab": "间 (jiān), 教室 (jiàoshì), 名 (míng), 北京大学 (Běijīng Dàxué)",
        "grammar": "Lượng từ phòng <code>间</code> và lượng từ lịch sự chỉ người <code>名</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "我听懂了，今天我自己坐公交车回来。",
        "pinyin": "Wǒ tīng dǒng le, jīntiān wǒ zìjǐ zuò gōngjiāochē huílái.",
        "target": "Tôi nghe hiểu rồi, hôm nay tự tôi đi xe buýt về.",
        "vocab": "懂 (dǒng), 自己 (zìjǐ), 公交车 (gōngjiāochē), 回来 (huílái)",
        "grammar": "Bổ ngữ kết quả <code>听懂</code> và đại từ bản thân <code>自己</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "别进教室，他有时在里面洗衣服。",
        "pinyin": "Bié jìn jiàoshì, tā yǒushí zài lǐmiàn xǐ yīfu.",
        "target": "Đừng vào phòng học, anh ấy đôi khi giặt quần áo ở bên trong.",
        "vocab": "别 (bié), 教室 (jiàoshì), 有时 (yǒushí), 洗 (xǐ)",
        "grammar": "Phó từ khuyên ngăn <code>别</code> (đừng) và phó từ tần suất <code>有时</code> (đôi khi)."
    },
    {
        "type": "zh2vi",
        "prompt": "这台电脑一万块钱，但他觉得不贵。",
        "pinyin": "Zhè tái diànnǎo yí wàn kuài qián, dàn tā juéde bú guì.",
        "target": "Chiếc máy tính này giá 1 vạn tệ (10.000 NDT), nhưng anh ấy cảm thấy không đắt.",
        "vocab": "万 (wàn), 但 (dàn)",
        "grammar": "Số từ <code>万</code> (vạn - 10.000) và liên từ <code>但</code> (nhưng)."
    },
    {
        "type": "zh2vi",
        "prompt": "你什么时候有空？我们再一起去一次西安吧。",
        "pinyin": "Nǐ shénme shíhou yǒu kòng? Wǒmen zài yìqǐ qù yí cì Xī'ān ba.",
        "target": "Khi nào bạn có thời gian rảnh? Chúng ta lại cùng nhau đi Tây An một lần nữa nhé.",
        "vocab": "一起 (yìqǐ), 次 (cì), 西安 (Xī'ān)",
        "grammar": "Phó từ <code>再</code> (lại nữa) kết hợp phó từ <code>一起</code> (cùng nhau)."
    },
    {
        "type": "zh2vi",
        "prompt": "老师让每一个学生做完作业才能回家。",
        "pinyin": "Lǎoshī ràng měi yí gè xuésheng zuò wán zuòyè cái néng huí jiā.",
        "target": "Thầy giáo yêu cầu/bảo mỗi một học sinh làm xong bài tập mới được về nhà.",
        "vocab": "让 (ràng), 每 (měi), 完 (wán)",
        "grammar": "Động từ biểu thị yêu cầu <code>让</code> và bổ ngữ kết quả <code>做完</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "真不好意思，这间房间太小了，不太好。",
        "pinyin": "Zhēn bù hǎoyìsi, zhè jiān fángjiān tài xiǎo le, bú tài hǎo.",
        "target": "Thật ngại quá, căn phòng này nhỏ quá, không tốt lắm.",
        "vocab": "不好意思 (bù hǎoyìsi), 间 (jiān)",
        "grammar": "Cụm từ <code>不好意思</code> và lượng từ <code>间</code>."
    },
    {
        "type": "zh2vi",
        "prompt": "他送我到车站，然后就回去了。",
        "pinyin": "Tā sòng wǒ dào chēzhàn, ránhòu jiù huíqù le.",
        "target": "Anh ấy đưa/tiễn tôi đến bến xe, sau đó liền đi về rồi.",
        "vocab": "送 (sòng), 车站 (chēzhàn), 就 (jiù)",
        "grammar": "Động từ <code>送</code> (tiễn/đưa) và liên từ nối tiếp <code>然后就</code>."
    }
]

MATCH_DATA = [
    [
        { "hz": "打车", "vi": "bắt xe taxi" },
        { "hz": "车站", "vi": "bến xe, trạm xe" },
        { "hz": "公交车", "vi": "xe buýt" },
        { "hz": "北京大学", "vi": "Đại học Bắc Kinh" },
        { "hz": "旅游", "vi": "du lịch" },
        { "hz": "帮忙", "vi": "giúp đỡ" }
    ],
    [
        { "hz": "不好意思", "vi": "thật ngại / xin lỗi" },
        { "hz": "介绍", "vi": "giới thiệu" },
        { "hz": "有时", "vi": "có lúc, đôi khi" },
        { "hz": "懂", "vi": "hiểu, biết" },
        { "hz": "远", "vi": "xa" },
        { "hz": "还是", "vi": "hay là (câu hỏi)" }
    ],
    [
        { "hz": "网上", "vi": "trên mạng" },
        { "hz": "外国", "vi": "nước ngoài" },
        { "hz": "教室", "vi": "phòng học" },
        { "hz": "过来", "vi": "lại đây, qua đây" },
        { "hz": "出去", "vi": "đi ra ngoài" },
        { "hz": "自己", "vi": "bản thân, tự mình" }
    ],
    [
        { "hz": "为什么", "vi": "tại sao" },
        { "hz": "回来", "vi": "trở về" },
        { "hz": "已经", "vi": "đã, rồi" },
        { "hz": "西安", "vi": "Tây An" },
        { "hz": "累", "vi": "mệt mỏi" },
        { "hz": "万", "vi": "vạn (10.000)" }
    ]
]

def collect_chinese_texts():
    texts = set()
    for v in VOCAB_DATA:
        texts.add(v["hz"])
        texts.add(v["example_hz"])
    for f in FILL_QUESTIONS:
        texts.add(f["sentence"].replace("____", f["ans"]))
        texts.add(f["ans"])
    for o in ORDER_QUESTIONS:
        clean_target = o["target"]
        texts.add(clean_target)
        for w in o["words"]:
            texts.add(w)
    for t in TRANS_QUESTIONS:
        if t["type"] == "vi2zh":
            texts.add(t["target"])
        else:
            texts.add(t["prompt"])
    for r in MATCH_DATA:
        for item in r:
            texts.add(item["hz"])
            
    words_41 = [
        "就", "给", "让", "接", "次", "旅游", "帮忙", "不好意思", "那", "介绍", "有时", "懂",
        "公交车", "但", "车站", "远", "打车", "还是", "北京大学", "万", "名", "网上", "外国",
        "间", "教室", "别", "过来", "这么", "完", "一起", "出去", "洗", "自己", "拿", "为什么",
        "送", "回来", "每", "累", "西安", "已经"
    ]
    for w in words_41:
        texts.add(w)
        
    return sorted(list(texts))

print("Collecting Chinese texts for pre-rendering Base64 Audio...")
chinese_texts = collect_chinese_texts()
print(f"Total unique Chinese strings to render: {len(chinese_texts)}")

audio_map = {}
temp_dir = tempfile.mkdtemp()

for idx, text in enumerate(chinese_texts, 1):
    caf_path = os.path.join(temp_dir, f"audio_{idx}.caf")
    m4a_path = os.path.join(temp_dir, f"audio_{idx}.m4a")
    
    cmd1 = ["say", "-v", "Tingting", text, "-o", caf_path]
    subprocess.run(cmd1, check=True)
    
    cmd2 = ["afconvert", "-f", "m4af", "-d", "aac", caf_path, m4a_path]
    subprocess.run(cmd2, check=True)
    
    with open(m4a_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
        audio_map[text] = f"data:audio/mp4;base64,{b64}"

print(f"Generated {len(audio_map)} Base64 audio entries successfully!")

audio_json = json.dumps(audio_map, ensure_ascii=False)
vocab_json = json.dumps(VOCAB_DATA, ensure_ascii=False)
quiz_json = json.dumps(QUIZ_QUESTIONS, ensure_ascii=False)
fill_json = json.dumps(FILL_QUESTIONS, ensure_ascii=False)
order_json = json.dumps(ORDER_QUESTIONS, ensure_ascii=False)
trans_json = json.dumps(TRANS_QUESTIONS, ensure_ascii=False)
match_json = json.dumps(MATCH_DATA, ensure_ascii=False)

dir1 = "/Users/trangngo95/Desktop/HSK/Tu_Vung"
os.makedirs(dir1, exist_ok=True)

path1 = os.path.join(dir1, "Tu_Vung_SRS_Luyen_Tap_41_Tu.html")
path2 = "/Users/trangngo95/Desktop/HSK/Luyen_Tap_Tu_Vung_41_Tu_HSK2.html"
artifact_dir = "/Users/trangngo95/.gemini/antigravity/brain/9ee38359-bde5-42c5-98b2-2329535b5489"
os.makedirs(artifact_dir, exist_ok=True)
path3 = os.path.join(artifact_dir, "hsk2_41_tu_vung_luyen_tap.html")

html_template = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài Tập Luyện Tập & Ghi Nhớ 41 Từ Vựng HSK 2 - Antigravity</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0f172a;
            --primary-light: #1e293b;
            --accent: #0284c7;
            --accent-hover: #0369a1;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --success: #16a34a;
            --success-bg: #dcfce7;
            --warning: #d97706;
            --warning-bg: #fef3c7;
            --danger: #dc2626;
            --danger-bg: #fee2e2;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Lexend', 'Noto Sans SC', sans-serif; background-color: var(--bg); color: var(--text-main); line-height: 1.6; padding: 20px; }
        .container { max-width: 1100px; margin: 0 auto; }

        header {
            background: linear-gradient(135deg, #0f172a, #1e3a8a, #312e81);
            color: white;
            padding: 25px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
            margin-bottom: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        header h1 { font-size: 1.7rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }
        header p { color: #94a3b8; font-size: 0.95rem; margin-top: 4px; }
        .header-badges { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .badge { background: rgba(255, 255, 255, 0.12); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); font-size: 0.88rem; font-weight: 500; }
        
        .speed-control { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.25); padding: 6px 14px; border-radius: 20px; font-size: 0.88rem; }
        .speed-btn { background: transparent; border: 1px solid rgba(255,255,255,0.4); color: white; padding: 2px 8px; border-radius: 12px; cursor: pointer; font-size: 0.8rem; }
        .speed-btn.active { background: var(--accent); border-color: var(--accent); font-weight: 600; }

        /* Navigation Tabs */
        .nav-tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            border-bottom: 2px solid var(--border);
            padding-bottom: 10px;
            overflow-x: auto;
            scrollbar-width: thin;
        }
        .tab-btn {
            background: var(--card-bg);
            border: 2px solid var(--border);
            padding: 12px 20px;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-muted);
            cursor: pointer;
            border-radius: 14px;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
        }
        .tab-btn:hover { color: var(--accent); border-color: var(--accent); background: rgba(2, 132, 199, 0.08); transform: translateY(-2px); }
        .tab-btn.active { color: #ffffff !important; background: var(--accent) !important; border-color: var(--accent) !important; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4); }

        .tab-content { display: none; animation: fadeIn 0.3s ease; }
        .tab-content.active { display: block !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        /* Search & Controls */
        .search-box {
            width: 100%;
            padding: 14px 20px;
            border-radius: 14px;
            border: 2px solid var(--border);
            font-size: 1rem;
            font-family: inherit;
            margin-bottom: 20px;
            outline: none;
            transition: border-color 0.2s;
            background: white;
        }
        .search-box:focus { border-color: var(--accent); }

        /* Vocab Grid */
        .grid-vocab { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
        .vocab-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            transition: all 0.25s ease;
            position: relative;
        }
        .vocab-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); border-color: var(--accent); }
        .vocab-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .hanzi-main { font-size: 2.2rem; font-weight: 700; color: var(--primary); font-family: 'Noto Sans SC', sans-serif; line-height: 1.2; }
        .py-tag { font-size: 1.1rem; font-weight: 600; color: var(--accent); }
        .hv-tag { font-size: 0.85rem; color: var(--text-muted); background: #f1f5f9; padding: 2px 8px; border-radius: 6px; font-weight: 500; }
        .type-tag { font-size: 0.8rem; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 6px; margin-left: 6px; font-style: italic; }
        .meaning { font-size: 1rem; font-weight: 600; color: var(--text-main); margin: 8px 0; }
        .mnemonic-box { background: #f0f9ff; border-left: 3px solid var(--accent); padding: 8px 12px; border-radius: 0 8px 8px 0; font-size: 0.88rem; color: #0369a1; margin-top: 8px; }
        .example-box { background: #fafafa; border: 1px solid var(--border); border-radius: 10px; padding: 10px; margin-top: 10px; font-size: 0.9rem; }
        .example-hz { font-family: 'Noto Sans SC', sans-serif; font-weight: 600; color: var(--primary); display: flex; align-items: center; justify-content: space-between; }
        .example-py { color: #0284c7; font-size: 0.85rem; font-family: monospace; margin: 2px 0; }
        .example-vi { color: #475569; font-size: 0.85rem; }

        .audio-btn {
            background: #f1f5f9;
            border: 1px solid var(--border);
            padding: 6px 12px;
            border-radius: 20px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.2s;
            color: var(--primary);
        }
        .audio-btn:hover { background: var(--accent); color: white; border-color: var(--accent); transform: scale(1.05); }
        .audio-btn-icon {
            width: 38px; height: 38px; border-radius: 50%; padding: 0; justify-content: center;
        }

        /* 3D Flashcard */
        .fc-wrapper { max-width: 550px; margin: 20px auto; text-align: center; }
        .flashcard-container { perspective: 1000px; height: 320px; cursor: pointer; margin-bottom: 20px; }
        .flashcard-inner {
            position: relative; width: 100%; height: 100%;
            text-align: center; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d; border-radius: 20px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }
        .flashcard-container.flipped .flashcard-inner { transform: rotateY(180deg); }
        .flashcard-front, .flashcard-back {
            position: absolute; width: 100%; height: 100%;
            -webkit-backface-visibility: hidden; backface-visibility: hidden;
            border-radius: 20px; display: flex; flex-direction: column;
            justify-content: center; align-items: center; padding: 30px;
            background: var(--card-bg); border: 2px solid var(--border);
        }
        .flashcard-front { color: var(--primary); }
        .flashcard-back { transform: rotateY(180deg); background: #f8fafc; }
        .fc-controls { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .btn-action {
            background: var(--primary); color: white; border: none;
            padding: 10px 22px; border-radius: 12px; font-weight: 600;
            cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-action:hover { background: var(--accent); transform: translateY(-2px); }
        .btn-know { background: var(--success); }
        .btn-know:hover { background: #15803d; }
        .btn-review { background: var(--warning); }
        .btn-review:hover { background: #b45309; }

        /* Quiz & Exercises */
        .quiz-card {
            background: var(--card-bg); border: 1px solid var(--border);
            border-radius: 18px; padding: 25px; margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .quiz-title { font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .quiz-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin-bottom: 14px; }
        .quiz-opt {
            background: var(--bg); border: 2px solid var(--border);
            padding: 12px 18px; border-radius: 12px; font-family: inherit;
            font-size: 1rem; cursor: pointer; text-align: left; transition: all 0.2s;
            font-weight: 500;
        }
        .quiz-opt:hover { border-color: var(--accent); background: #f0f9ff; }
        .quiz-opt.correct { background: var(--success-bg) !important; border-color: var(--success) !important; color: #15803d; font-weight: 700; }
        .quiz-opt.wrong { background: var(--danger-bg) !important; border-color: var(--danger) !important; color: #b91c1c; }
        .quiz-opt.disabled { cursor: not-allowed; opacity: 0.8; }
        .explanation-box { background: #f8fafc; border: 1px solid var(--border); padding: 14px 18px; border-radius: 12px; font-size: 0.92rem; margin-top: 12px; display: none; line-height: 1.6; }
        .grammar-tip { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-top: 8px; color: #1e40af; font-size: 0.9rem; }

        /* Sentence Ordering Game */
        .scramble-container { display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0; min-height: 50px; padding: 12px; background: #f1f5f9; border-radius: 12px; border: 2px dashed #cbd5e1; }
        .word-chip {
            background: white; border: 1px solid var(--accent); color: var(--accent);
            padding: 8px 14px; border-radius: 10px; font-weight: 600; font-family: 'Noto Sans SC', sans-serif;
            cursor: pointer; user-select: none; transition: all 0.2s; font-size: 1.1rem;
        }
        .word-chip:hover { background: var(--accent); color: white; transform: scale(1.05); }

        /* Matching Game */
        .match-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 700px; margin: 0 auto; }
        .match-card {
            background: white; border: 2px solid var(--border); padding: 16px;
            border-radius: 14px; text-align: center; font-weight: 600; cursor: pointer;
            transition: all 0.2s; font-size: 1.1rem; min-height: 60px; display: flex; align-items: center; justify-content: center;
        }
        .match-card:hover { border-color: var(--accent); background: #f0f9ff; }
        .match-card.selected { border-color: var(--accent); background: #e0f2fe; color: var(--accent); transform: scale(1.03); }
        .match-card.matched { background: var(--success-bg); border-color: var(--success); color: #15803d; opacity: 0.5; cursor: default; }

        /* Translation Section */
        .trans-input {
            width: 100%; padding: 12px 16px; border: 2px solid var(--border);
            border-radius: 12px; font-size: 1.05rem; font-family: 'Noto Sans SC', 'Lexend', sans-serif;
            margin-top: 8px; margin-bottom: 12px; outline: none; transition: border-color 0.2s;
            background: #ffffff;
        }
        .trans-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15); }

        /* Scoreboard */
        .score-banner {
            background: linear-gradient(135deg, #1e293b, #0f172a); color: white;
            padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 20px;
        }
        .score-num { font-size: 2.5rem; font-weight: 800; color: #38bdf8; }

        @media print {
            header, .nav-tabs, .search-box, .audio-btn, .no-print, .fc-controls { display: none !important; }
            .tab-content { display: block !important; page-break-before: always; }
            .vocab-card, .quiz-card { break-inside: avoid; border: 1px solid #ccc; box-shadow: none; }
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <div>
            <h1>🎯 Bài Tập Luyện Tập & Ghi Nhớ 41 Từ Vựng HSK 2</h1>
            <p>Phát Âm Offline Chuẩn 100% + Chấm Chữa Câu Dịch Tự Động & Giải Thích Ngữ Pháp Chi Tiết</p>
        </div>
        <div class="header-badges">
            <div class="badge">📚 41 Từ vựng</div>
            <div class="badge">📅 24/09/2026</div>
            <div class="speed-control">
                <span>⚡ Giọng đọc:</span>
                <button class="speed-btn" id="sp-075" onclick="setSpeed(0.75)">0.75x</button>
                <button class="speed-btn active" id="sp-100" onclick="setSpeed(1.0)">1.0x</button>
            </div>
        </div>
    </header>

    <div class="nav-tabs no-print">
        <button class="tab-btn active" id="btn-tab-0" onclick="switchTab(0)">📚 1. Danh Sách 41 Từ</button>
        <button class="tab-btn" id="btn-tab-1" onclick="switchTab(1)">🃏 2. Flashcard 3D</button>
        <button class="tab-btn" id="btn-tab-2" onclick="switchTab(2)">❓ 3. Trắc Nghiệm (15 Câu)</button>
        <button class="tab-btn" id="btn-tab-3" onclick="switchTab(3)">✍️ 4. Điền Từ (10 Câu)</button>
        <button class="tab-btn" id="btn-tab-4" onclick="switchTab(4)">🧩 5. Sắp Xếp Câu & Ngữ Pháp (8 Câu)</button>
        <button class="tab-btn" id="btn-tab-5" onclick="switchTab(5)">🌐 6. Luyện Dịch Câu (20 Câu)</button>
        <button class="tab-btn" id="btn-tab-6" onclick="switchTab(6)">🔗 7. Game Nối Từ</button>
    </div>

    <!-- TAB 1: VOCAB MASTER LIST -->
    <div id="tab-0" class="tab-content active" style="display:block;">
        <input type="text" class="search-box no-print" id="vocabSearch" placeholder="🔍 Tìm kiếm từ vựng (gõ Chữ Hán, Pinyin, Hán Việt hoặc Tiếng Việt)..." oninput="filterVocab()">
        <div class="grid-vocab" id="vocabGrid"></div>
    </div>

    <!-- TAB 2: FLASHCARD 3D -->
    <div id="tab-1" class="tab-content" style="display:none;">
        <div class="fc-wrapper">
            <div class="flashcard-container" id="fcContainer" onclick="flipCard()">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="hanzi-main" style="font-size: 4rem;" id="fcHz">就</div>
                        <div style="margin-top: 15px;">
                            <button class="audio-btn audio-btn-icon" onclick="event.stopPropagation(); speakCurrentFc();">🔊</button>
                        </div>
                        <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 20px;">(Nhấn vào thẻ để lật mặt sau 🔄)</div>
                    </div>
                    <div class="flashcard-back">
                        <div class="py-tag" style="font-size: 1.6rem;" id="fcPy">jiù</div>
                        <div class="hv-tag" style="margin: 8px 0;" id="fcHv">Tự</div>
                        <div class="meaning" style="font-size: 1.2rem; color: #0f172a;" id="fcVi">thì, liền, ngay, chính là</div>
                        <div class="mnemonic-box" style="text-align: left; margin-top: 10px; width: 100%;" id="fcMne"></div>
                        <div class="example-box" style="text-align: left; width: 100%; margin-top: 10px;" id="fcEg"></div>
                    </div>
                </div>
            </div>
            
            <div class="fc-controls no-print">
                <button class="btn-action" onclick="prevCard()">⬅️ Từ trước</button>
                <button class="btn-action btn-review" onclick="markCard(false)">❌ Cần ôn lại</button>
                <button class="btn-action btn-know" onclick="markCard(true)">✅ Đã thuộc</button>
                <button class="btn-action" onclick="nextCard()">Từ tiếp ➡️</button>
                <button class="btn-action" style="background: #64748b;" onclick="shuffleCards()">🎲 Xáo trộn</button>
            </div>
            <div style="margin-top: 15px; font-weight: 600; color: var(--text-muted);" id="fcProgress">Tiến độ: 1 / 41</div>
        </div>
    </div>

    <!-- TAB 3: QUIZ 15 QUESTIONS -->
    <div id="tab-2" class="tab-content" style="display:none;">
        <div class="score-banner no-print">
            <div>ĐIỂM BÀI TRẮC NGHIỆM</div>
            <div class="score-num" id="quizScore">0 / 15</div>
            <button class="btn-action" style="margin-top: 10px; background: var(--accent);" onclick="resetQuiz()">🔄 Làm lại bài kiểm tra</button>
        </div>
        <div id="quizList"></div>
    </div>

    <!-- TAB 4: FILL IN THE BLANKS -->
    <div id="tab-3" class="tab-content" style="display:none;">
        <div class="score-banner no-print">
            <div>ĐIỂM BÀI ĐIỀN TỪ VÀO CHỖ TRỐNG</div>
            <div class="score-num" id="fillScore">0 / 10</div>
            <button class="btn-action" style="margin-top: 10px; background: var(--accent);" onclick="resetFill()">🔄 Làm lại bài điền từ</button>
        </div>
        <div id="fillList"></div>
    </div>

    <!-- TAB 5: SENTENCE ORDERING WITH DETAILED GRAMMAR EXPLANATIONS -->
    <div id="tab-4" class="tab-content" style="display:none;">
        <div class="score-banner no-print">
            <div>ĐIỂM BÀI SẮP XẾP CÂU & NGỮ PHÁP</div>
            <div class="score-num" id="orderScore">0 / 8</div>
            <button class="btn-action" style="margin-top: 10px; background: var(--accent);" onclick="resetOrder()">🔄 Làm lại bài sắp xếp</button>
        </div>
        <div id="orderList"></div>
    </div>

    <!-- TAB 6: TRANSLATION EXERCISE (20 PRACTICAL SENTENCES) WITH EXACT GRADING -->
    <div id="tab-5" class="tab-content" style="display:none;">
        <div class="score-banner no-print">
            <div>ĐIỂM BÀI LUYỆN DỊCH CÂU (20 CÂU VIỆT - TRUNG & TRUNG - VIỆT)</div>
            <div class="score-num" id="transScore">0 / 20</div>
            <div style="font-size:1.05rem; color:#93c5fd; margin-top:5px;">Hệ thống tự động chấm điểm & so sánh bài dịch của chị với đáp án chuẩn</div>
            <div style="display:flex; justify-content:center; gap:12px; margin-top:12px; flex-wrap:wrap;">
                <button class="btn-action" style="background: var(--accent);" onclick="resetTrans()">🔄 Làm lại tất cả câu dịch</button>
                <button class="btn-action" style="background: #64748b;" onclick="showAllTranslations()">💡 Xem đáp án tất cả các câu</button>
            </div>
        </div>
        <div id="transList"></div>
    </div>

    <!-- TAB 7: MATCHING GAME -->
    <div id="tab-6" class="tab-content" style="display:none;">
        <div class="score-banner no-print">
            <div>GAME NỐI TỪ TRUNG - VIỆT</div>
            <div style="font-size: 1.1rem; color: #93c5fd;">Vòng: <span id="matchRound">1</span> / 4 | Đã nối đúng: <span id="matchCount">0</span> / 6 cặp</div>
            <button class="btn-action" style="margin-top: 10px; background: var(--accent);" onclick="nextMatchRound()">⏩ Vòng tiếp theo</button>
        </div>
        <div class="match-grid" id="matchGrid"></div>
    </div>
</div>

<script id="audio-data" type="application/json">
__AUDIO_JSON__
</script>

<script>
const VOCAB_DATA = __VOCAB_JSON__;
const QUIZ_QUESTIONS = __QUIZ_JSON__;
const FILL_QUESTIONS = __FILL_JSON__;
const ORDER_QUESTIONS = __ORDER_JSON__;
const TRANS_QUESTIONS = __TRANS_JSON__;
const MATCH_DATA = __MATCH_JSON__;

let AUDIO_MAP = null;
function getAudioMap() {
    if (AUDIO_MAP === null) {
        try {
            const elem = document.getElementById('audio-data');
            if (elem && elem.textContent) {
                AUDIO_MAP = JSON.parse(elem.textContent);
            } else {
                AUDIO_MAP = {};
            }
        } catch(e) {
            console.error("Error parsing audio JSON:", e);
            AUDIO_MAP = {};
        }
    }
    return AUDIO_MAP;
}

let speechSpeed = 1.0;
function setSpeed(sp) {
    speechSpeed = sp;
    const b075 = document.getElementById('sp-075');
    const b100 = document.getElementById('sp-100');
    if (b075) b075.classList.toggle('active', sp === 0.75);
    if (b100) b100.classList.toggle('active', sp === 1.0);
}

let currentAudio = null;

function speakText(text) {
    if (!text) return;
    text = text.trim();
    
    if (currentAudio) {
        try {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        } catch(e) {}
    }
    
    const audioMap = getAudioMap();
    const b64 = audioMap[text];
    
    if (b64) {
        try {
            currentAudio = new Audio(b64);
            currentAudio.playbackRate = speechSpeed || 1.0;
            const promise = currentAudio.play();
            if (promise !== undefined) {
                promise.catch(err => {
                    console.warn("Offline audio playback blocked/error, fallback to Web Speech:", err);
                    fallbackSpeech(text);
                });
            }
            return;
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }
    fallbackSpeech(text);
}

function fallbackSpeech(text) {
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        u.rate = speechSpeed || 1.0;
        window.speechSynthesis.speak(u);
    } catch(e) {
        console.error("Web speech error:", e);
    }
}

function switchTab(idx) {
    const btns = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    btns.forEach((btn, i) => {
        if (i === idx) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    contents.forEach((content, i) => {
        if (i === idx) {
            content.classList.add('active');
            content.style.display = 'block';
        } else {
            content.classList.remove('active');
            content.style.display = 'none';
        }
    });
}

/* TAB 1: VOCAB RENDERING */
function renderVocab(list) {
    const grid = document.getElementById('vocabGrid');
    if (!grid) return;
    grid.innerHTML = list.map(v => `
        <div class="vocab-card">
            <div class="vocab-top">
                <div>
                    <span class="hanzi-main">${v.hz}</span>
                    <span class="type-tag">${v.type}</span>
                </div>
                <div>
                    <span class="py-tag">${v.py}</span>
                    <button class="audio-btn audio-btn-icon" data-speech="${v.hz}" onclick="speakText(this.getAttribute('data-speech'))">🔊</button>
                </div>
            </div>
            <div class="hv-tag">Hán Việt: ${v.hv}</div>
            <div class="meaning">${v.vi}</div>
            <div class="mnemonic-box">💡 <b>Mẹo nhớ:</b> ${v.mnemonic}</div>
            <div class="example-box">
                <div class="example-hz">
                    <span>${v.example_hz}</span>
                    <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem;" data-speech="${v.example_hz}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe</button>
                </div>
                <div class="example-py">${v.example_py}</div>
                <div class="example-vi">Dịch: ${v.example_vi}</div>
            </div>
        </div>
    `).join('');
}

function filterVocab() {
    const q = document.getElementById('vocabSearch').value.toLowerCase().trim();
    const filtered = VOCAB_DATA.filter(v => 
        v.hz.includes(q) || v.py.toLowerCase().includes(q) || v.hv.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q)
    );
    renderVocab(filtered);
}

/* TAB 2: FLASHCARD SYSTEM */
let fcList = [...VOCAB_DATA];
let fcIndex = 0;
let isFlipped = false;

function updateFlashcard() {
    if (fcList.length === 0) return;
    const item = fcList[fcIndex];
    isFlipped = false;
    const container = document.getElementById('fcContainer');
    if (!container) return;
    container.classList.remove('flipped');
    document.getElementById('fcHz').innerText = item.hz;
    document.getElementById('fcPy').innerText = item.py;
    document.getElementById('fcHv').innerText = "Hán Việt: " + item.hv;
    document.getElementById('fcVi').innerText = item.vi;
    document.getElementById('fcMne').innerHTML = "💡 <b>Mẹo nhớ:</b> " + item.mnemonic;
    document.getElementById('fcEg').innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; color:#0f172a;">${item.example_hz}</div>
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem;" data-speech="${item.example_hz}" onclick="event.stopPropagation(); speakText(this.getAttribute('data-speech'))">🔊 Nghe</button>
        </div>
        <div style="color:#0284c7; font-size:0.85rem;">${item.example_py}</div>
        <div style="color:#475569; font-size:0.85rem;">Dịch: ${item.example_vi}</div>
    `;
    document.getElementById('fcProgress').innerText = `Tiến độ: ${fcIndex + 1} / ${fcList.length}`;
}

function flipCard() {
    isFlipped = !isFlipped;
    document.getElementById('fcContainer').classList.toggle('flipped', isFlipped);
}

function speakCurrentFc() {
    speakText(fcList[fcIndex].hz);
}

function nextCard() {
    fcIndex = (fcIndex + 1) % fcList.length;
    updateFlashcard();
}

function prevCard() {
    fcIndex = (fcIndex - 1 + fcList.length) % fcList.length;
    updateFlashcard();
}

function shuffleCards() {
    fcList.sort(() => Math.random() - 0.5);
    fcIndex = 0;
    updateFlashcard();
}

function markCard(known) {
    if (known) {
        alert("🎉 Tuyệt vời! Bạn đã ghi nhớ từ: " + fcList[fcIndex].hz);
    } else {
        alert("💪 Hãy luyện tập lại từ này thêm vài lần: " + fcList[fcIndex].hz);
    }
    nextCard();
}

/* TAB 3: QUIZ SYSTEM (15 QUESTIONS) */
let userQuizAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

function renderQuiz() {
    const list = document.getElementById('quizList');
    if (!list) return;
    list.innerHTML = QUIZ_QUESTIONS.map((q, idx) => `
        <div class="quiz-card" id="qcard-${idx}">
            <div class="quiz-title">
                <span>Câu ${idx + 1}: ${q.q}</span>
            </div>
            <div class="quiz-options">
                ${q.opts.map((opt, oIdx) => `
                    <button class="quiz-opt" id="qopt-${idx}-${oIdx}" onclick="answerQuiz(${idx}, ${oIdx})">
                        ${String.fromCharCode(65 + oIdx)}. ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="explanation-box" id="qexp-${idx}">
                💡 <b>Giải thích:</b> ${q.exp}
            </div>
        </div>
    `).join('');
}

function answerQuiz(qIdx, oIdx) {
    if (userQuizAnswers[qIdx] !== null) return;
    userQuizAnswers[qIdx] = oIdx;
    const q = QUIZ_QUESTIONS[qIdx];
    
    document.querySelectorAll(`#qcard-${qIdx} .quiz-opt`).forEach((btn, i) => {
        btn.classList.add('disabled');
        if (i === q.ans) btn.classList.add('correct');
        else if (i === oIdx) btn.classList.add('wrong');
    });

    const expBox = document.getElementById(`qexp-${qIdx}`);
    if (expBox) expBox.style.display = 'block';

    updateQuizScore();
}

function updateQuizScore() {
    let score = 0;
    userQuizAnswers.forEach((ans, idx) => {
        if (ans === QUIZ_QUESTIONS[idx].ans) score++;
    });
    const el = document.getElementById('quizScore');
    if (el) el.innerText = `${score} / ${QUIZ_QUESTIONS.length}`;
}

function resetQuiz() {
    userQuizAnswers.fill(null);
    renderQuiz();
    updateQuizScore();
}

/* TAB 4: FILL IN THE BLANKS (10 QUESTIONS) */
let userFillAnswers = new Array(FILL_QUESTIONS.length).fill(null);

function renderFill() {
    const list = document.getElementById('fillList');
    if (!list) return;
    list.innerHTML = FILL_QUESTIONS.map((q, idx) => {
        const fullSent = q.sentence.replace('____', q.ans);
        return `
        <div class="quiz-card" id="fcard-${idx}">
            <div class="quiz-title">
                <span>Câu ${idx + 1}: ${q.sentence.replace('____', '<b style="color:var(--accent);">[ _____ ]</b>')}</span>
                <button class="audio-btn" data-speech="${fullSent}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe câu</button>
            </div>
            <div class="quiz-options">
                ${q.opts.map(opt => `
                    <button class="quiz-opt" onclick="answerFill(${idx}, '${opt}')" id="fopt-${idx}-${opt}">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="explanation-box" id="fexp-${idx}">
                🔊 <b>Phiên âm:</b> ${q.pinyin}<br>
                💬 <b>Dịch nghĩa:</b> ${q.vi}
            </div>
        </div>
        `;
    }).join('');
}

function answerFill(qIdx, opt) {
    if (userFillAnswers[qIdx] !== null) return;
    userFillAnswers[qIdx] = opt;
    const q = FILL_QUESTIONS[qIdx];
    
    document.querySelectorAll(`#fcard-${qIdx} .quiz-opt`).forEach(btn => {
        btn.classList.add('disabled');
        if (btn.innerText.trim() === q.ans) btn.classList.add('correct');
        else if (btn.innerText.trim() === opt) btn.classList.add('wrong');
    });

    const expBox = document.getElementById(`fexp-${qIdx}`);
    if (expBox) expBox.style.display = 'block';
    updateFillScore();
}

function updateFillScore() {
    let score = 0;
    userFillAnswers.forEach((ans, idx) => {
        if (ans === FILL_QUESTIONS[idx].ans) score++;
    });
    const el = document.getElementById('fillScore');
    if (el) el.innerText = `${score} / ${FILL_QUESTIONS.length}`;
}

function resetFill() {
    userFillAnswers.fill(null);
    renderFill();
    updateFillScore();
}

/* TAB 5: SENTENCE ORDERING WITH DETAILED GRAMMAR EXPLANATIONS */
let orderState = ORDER_QUESTIONS.map(q => ({ current: [] }));

function renderOrder() {
    const list = document.getElementById('orderList');
    if (!list) return;
    list.innerHTML = ORDER_QUESTIONS.map((q, idx) => `
        <div class="quiz-card" id="ocard-${idx}">
            <div class="quiz-title">
                <span>Câu ${idx + 1}: Sắp xếp thành câu hoàn chỉnh</span>
            </div>
            <div class="scramble-container" id="obox-${idx}">
                <span style="color:#94a3b8; font-size:0.9rem; width:100%;" id="oprompt-${idx}">Nhấp vào các từ bên dưới để ghép câu...</span>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;" id="opool-${idx}">
                ${q.words.map((w, wIdx) => `
                    <button class="word-chip" id="ochip-${idx}-${wIdx}" onclick="pickOrderWord(${idx}, '${w}', ${wIdx})">${w}</button>
                `).join('')}
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn-action" style="background:var(--accent);" onclick="checkOrder(${idx})">✅ Kiểm tra</button>
                <button class="btn-action" style="background:#64748b;" onclick="resetSingleOrder(${idx})">🔄 Ghép lại</button>
            </div>
            <div class="explanation-box" id="oexp-${idx}"></div>
        </div>
    `).join('');
}

function pickOrderWord(qIdx, word, wIdx) {
    const chip = document.getElementById(`ochip-${qIdx}-${wIdx}`);
    if (!chip || chip.style.display === 'none') return;
    chip.style.display = 'none';

    orderState[qIdx].current.push({ word, wIdx });
    updateOrderBox(qIdx);
}

function updateOrderBox(qIdx) {
    const box = document.getElementById(`obox-${qIdx}`);
    if (!box) return;
    const items = orderState[qIdx].current;
    if (items.length === 0) {
        box.innerHTML = `<span style="color:#94a3b8; font-size:0.9rem; width:100%;">Nhấp vào các từ bên dưới để ghép câu...</span>`;
    } else {
        box.innerHTML = items.map((item, i) => `
            <button class="word-chip" onclick="unpickOrderWord(${qIdx}, ${i})">${item.word}</button>
        `).join('');
    }
}

function unpickOrderWord(qIdx, itemIdx) {
    const removed = orderState[qIdx].current.splice(itemIdx, 1)[0];
    const chip = document.getElementById(`ochip-${qIdx}-${removed.wIdx}`);
    if (chip) chip.style.display = 'inline-block';
    updateOrderBox(qIdx);
}

function checkOrder(qIdx) {
    const q = ORDER_QUESTIONS[qIdx];
    const userSentence = orderState[qIdx].current.map(x => x.word).join('');
    const exp = document.getElementById(`oexp-${qIdx}`);
    if (!exp) return;
    exp.style.display = 'block';

    const cleanTarget = q.target;

    if (userSentence === cleanTarget) {
        exp.className = "explanation-box correct";
        exp.style.background = "var(--success-bg)";
        exp.style.borderColor = "var(--success)";
        exp.innerHTML = `
            🎉 <b>Chính xác!</b><br>
            🔊 <b>Chữ Hán:</b> ${cleanTarget} 
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem;" data-speech="${cleanTarget}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe câu phát âm</button><br>
            <b>Pinyin:</b> ${q.pinyin}<br>
            <b>Dịch nghĩa:</b> ${q.vi}<br>
            <div class="grammar-tip">${q.grammar}</div>
        `;
    } else {
        exp.className = "explanation-box wrong";
        exp.style.background = "var(--danger-bg)";
        exp.style.borderColor = "var(--danger)";
        exp.innerHTML = `
            ❌ <b>Chưa đúng!</b> Đáp án chuẩn:<br>
            🔊 <b>Chữ Hán:</b> ${cleanTarget} 
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem;" data-speech="${cleanTarget}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe câu phát âm</button><br>
            <b>Pinyin:</b> ${q.pinyin}<br>
            <b>Dịch nghĩa:</b> ${q.vi}<br>
            <div class="grammar-tip">${q.grammar}</div>
        `;
    }
    updateOrderScore();
}

function resetSingleOrder(qIdx) {
    orderState[qIdx].current = [];
    document.querySelectorAll(`#opool-${qIdx} .word-chip`).forEach(btn => btn.style.display = 'inline-block');
    updateOrderBox(qIdx);
    const exp = document.getElementById(`oexp-${qIdx}`);
    if (exp) exp.style.display = 'none';
}

function updateOrderScore() {
    let score = 0;
    ORDER_QUESTIONS.forEach((q, idx) => {
        const userSentence = orderState[idx].current.map(x => x.word).join('');
        if (userSentence === q.target) score++;
    });
    const el = document.getElementById('orderScore');
    if (el) el.innerText = `${score} / ${ORDER_QUESTIONS.length}`;
}

function resetOrder() {
    ORDER_QUESTIONS.forEach((_, idx) => resetSingleOrder(idx));
    updateOrderScore();
}

/* TAB 6: TRANSLATION EXERCISE (20 PRACTICAL SENTENCES) WITH EXACT GRADING SYSTEM */
let userTransScores = new Array(TRANS_QUESTIONS.length).fill(null);

function normalizeStr(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '')
        .trim();
}

function getSimilarity(s1, s2) {
    const norm1 = normalizeStr(s1);
    const norm2 = normalizeStr(s2);
    if (norm1 === norm2) return 1.0;
    if (!norm1 || !norm2) return 0.0;
    
    const track = Array(norm2.length + 1).fill(null).map(() =>
        Array(norm1.length + 1).fill(null));
    for (let i = 0; i <= norm1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= norm2.length; j += 1) track[j][0] = j;
    
    for (let j = 1; j <= norm2.length; j += 1) {
        for (let i = 1; i <= norm1.length; i += 1) {
            const indicator = norm1[i - 1] === norm2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator
            );
        }
    }
    const dist = track[norm2.length][norm1.length];
    const maxLen = Math.max(norm1.length, norm2.length);
    return maxLen === 0 ? 1.0 : (1.0 - dist / maxLen);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function renderTranslation() {
    const list = document.getElementById('transList');
    if (!list) return;
    list.innerHTML = TRANS_QUESTIONS.map((q, idx) => {
        const speechText = q.type === 'vi2zh' ? q.target : q.prompt;
        return `
        <div class="quiz-card" id="tcard-${idx}">
            <div class="quiz-title">
                <span>Câu ${idx + 1} (${q.type === 'vi2zh' ? 'Dịch Việt ➔ Trung' : 'Dịch Trung ➔ Việt'}): ${q.prompt}</span>
                <button class="audio-btn" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe Tiếng Trung</button>
            </div>
            ${q.type === 'zh2vi' ? `<div style="color:var(--accent); font-size:0.9rem; font-family:monospace; margin-bottom:8px;">🔊 Pinyin: ${q.pinyin}</div>` : ''}
            <input type="text" class="trans-input" id="tinput-${idx}" placeholder="${q.type === 'vi2zh' ? 'Gõ bản dịch Chữ Hán hoặc Pinyin của bạn vào đây...' : 'Gõ bản dịch Tiếng Việt của bạn vào đây...'}" onkeydown="if(event.key==='Enter') checkTrans(${idx})">
            
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn-action" style="background:var(--accent);" onclick="checkTrans(${idx})">📝 Chấm Điểm & Xem Chữa Câu ${idx + 1}</button>
                <button class="audio-btn" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe phát âm</button>
            </div>

            <div class="explanation-box" id="texp-${idx}"></div>
        </div>
        `;
    }).join('');
}

function checkTrans(qIdx) {
    const q = TRANS_QUESTIONS[qIdx];
    const inputEl = document.getElementById(`tinput-${qIdx}`);
    const userInput = inputEl ? inputEl.value.trim() : '';
    const expBox = document.getElementById(`texp-${qIdx}`);
    const speechText = q.type === 'vi2zh' ? q.target : q.prompt;
    
    if (!expBox) return;
    expBox.style.display = 'block';
    
    if (!userInput) {
        expBox.className = "explanation-box wrong";
        expBox.style.background = "var(--warning-bg)";
        expBox.style.borderColor = "var(--warning)";
        expBox.innerHTML = `
            ⚠️ <b>Chị chưa gõ câu dịch!</b> Hãy gõ bản dịch vào ô bên trên rồi nhấn nút "Chấm điểm" nhé.<br><br>
            ✅ <b>Đáp án chuẩn:</b> <span style="font-size:1.15rem; font-weight:700; color:var(--primary);">${q.target}</span>
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem; margin-left:8px;" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe đọc</button><br>
            🔊 <b>Pinyin:</b> <span style="color:var(--accent); font-family:monospace;">${q.pinyin}</span><br>
            📚 <b>Từ vựng trọng tâm:</b> ${q.vocab}<br>
            <div class="grammar-tip">💡 <b>Ngữ pháp trọng tâm:</b> ${q.grammar}</div>
        `;
        userTransScores[qIdx] = 0;
        updateTransScore();
        return;
    }
    
    let isExact = false;
    let simScore = 0;
    
    if (q.type === 'vi2zh') {
        const normUser = normalizeStr(userInput);
        const normTargetHanzi = normalizeStr(q.target);
        
        if (normUser === normTargetHanzi) {
            isExact = true;
            simScore = 1.0;
        } else {
            const simHanzi = getSimilarity(userInput, q.target);
            const simPy = getSimilarity(userInput, q.pinyin);
            simScore = Math.max(simHanzi, simPy);
            if (simScore >= 0.90) isExact = true;
        }
    } else { // zh2vi
        simScore = getSimilarity(userInput, q.target);
        if (simScore >= 0.85) isExact = true;
    }
    
    const percent = Math.round(simScore * 100);
    
    if (isExact || simScore >= 0.88) {
        userTransScores[qIdx] = 1;
        expBox.className = "explanation-box correct";
        expBox.style.background = "var(--success-bg)";
        expBox.style.borderColor = "var(--success)";
        expBox.innerHTML = `
            🎉 <b>CHÍNH XÁC! (${percent}% khớp)</b><br>
            ✍️ <b>Bài dịch của chị:</b> <span style="font-weight:600; color:#0f172a;">${escapeHtml(userInput)}</span><br>
            ✅ <b>Đáp án chuẩn:</b> <span style="font-size:1.15rem; font-weight:700; color:#15803d;">${q.target}</span>
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem; margin-left:8px;" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe đọc</button><br>
            🔊 <b>Pinyin:</b> <span style="color:var(--accent); font-family:monospace;">${q.pinyin}</span><br>
            📚 <b>Từ vựng trọng tâm:</b> ${q.vocab}<br>
            <div class="grammar-tip">💡 <b>Ngữ pháp trọng tâm:</b> ${q.grammar}</div>
        `;
    } else if (simScore >= 0.55) {
        userTransScores[qIdx] = 0.5;
        expBox.className = "explanation-box warning";
        expBox.style.background = "var(--warning-bg)";
        expBox.style.borderColor = "var(--warning)";
        expBox.innerHTML = `
            ⚠️ <b>GẦN ĐÚNG (${percent}% khớp) - Chú ý đối chiếu lại từ vựng & ngữ pháp:</b><br>
            ✍️ <b>Bài dịch của chị:</b> <span style="font-weight:600; color:#b45309;">${escapeHtml(userInput)}</span><br>
            ✅ <b>Đáp án chuẩn:</b> <span style="font-size:1.15rem; font-weight:700; color:var(--primary);">${q.target}</span>
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem; margin-left:8px;" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe đọc</button><br>
            🔊 <b>Pinyin:</b> <span style="color:var(--accent); font-family:monospace;">${q.pinyin}</span><br>
            📚 <b>Từ vựng trọng tâm:</b> ${q.vocab}<br>
            <div class="grammar-tip">💡 <b>Ngữ pháp trọng tâm:</b> ${q.grammar}</div>
        `;
    } else {
        userTransScores[qIdx] = 0;
        expBox.className = "explanation-box wrong";
        expBox.style.background = "var(--danger-bg)";
        expBox.style.borderColor = "var(--danger)";
        expBox.innerHTML = `
            ❌ <b>CHƯA CHÍNH XÁC (${percent}% khớp)</b><br>
            ✍️ <b>Bài dịch của chị:</b> <span style="font-weight:600; color:#b91c1c; text-decoration:line-through;">${escapeHtml(userInput)}</span><br>
            ✅ <b>Đáp án chuẩn:</b> <span style="font-size:1.15rem; font-weight:700; color:var(--primary);">${q.target}</span>
            <button class="audio-btn" style="padding:2px 8px; font-size:0.8rem; margin-left:8px;" data-speech="${speechText}" onclick="speakText(this.getAttribute('data-speech'))">🔊 Nghe đọc</button><br>
            🔊 <b>Pinyin:</b> <span style="color:var(--accent); font-family:monospace;">${q.pinyin}</span><br>
            📚 <b>Từ vựng trọng tâm:</b> ${q.vocab}<br>
            <div class="grammar-tip">💡 <b>Ngữ pháp trọng tâm:</b> ${q.grammar}</div>
        `;
    }
    
    updateTransScore();
}

function updateTransScore() {
    let score = 0;
    let completed = 0;
    userTransScores.forEach(s => {
        if (s !== null) {
            completed++;
            score += s;
        }
    });
    const el = document.getElementById('transScore');
    if (el) el.innerText = `${score} / ${TRANS_QUESTIONS.length} (${completed} câu đã làm)`;
}

function resetTrans() {
    userTransScores.fill(null);
    TRANS_QUESTIONS.forEach((_, idx) => {
        const inputEl = document.getElementById(`tinput-${idx}`);
        if (inputEl) inputEl.value = '';
        const expEl = document.getElementById(`texp-${idx}`);
        if (expEl) expEl.style.display = 'none';
    });
    updateTransScore();
}

function showAllTranslations() {
    TRANS_QUESTIONS.forEach((_, idx) => checkTrans(idx));
}

/* TAB 7: MATCHING GAME */
let matchRoundIdx = 0;
let selectedMatchHz = null;
let selectedMatchVi = null;
let matchedPairs = 0;

function renderMatchRound() {
    const roundEl = document.getElementById('matchRound');
    if (roundEl) roundEl.innerText = matchRoundIdx + 1;
    matchedPairs = 0;
    const countEl = document.getElementById('matchCount');
    if (countEl) countEl.innerText = matchedPairs;
    selectedMatchHz = null;
    selectedMatchVi = null;

    const roundData = MATCH_DATA[matchRoundIdx];
    const hzList = [...roundData].sort(() => Math.random() - 0.5);
    const viList = [...roundData].sort(() => Math.random() - 0.5);

    const grid = document.getElementById('matchGrid');
    if (!grid) return;
    grid.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:10px;">
            ${hzList.map((item, i) => `
                <div class="match-card" id="mhz-${i}" onclick="clickMatchHz('${item.hz}', ${i})">${item.hz}</div>
            `).join('')}
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
            ${viList.map((item, i) => `
                <div class="match-card" id="mvi-${i}" onclick="clickMatchVi('${item.vi}', '${item.hz}', ${i})">${item.vi}</div>
            `).join('')}
        </div>
    `;
}

function clickMatchHz(hz, idx) {
    document.querySelectorAll('[id^="mhz-"]').forEach(el => el.classList.remove('selected'));
    selectedMatchHz = { hz, idx };
    const el = document.getElementById(`mhz-${idx}`);
    if (el) el.classList.add('selected');
    speakText(hz);
    checkMatchPair();
}

function clickMatchVi(vi, correctHz, idx) {
    document.querySelectorAll('[id^="mvi-"]').forEach(el => el.classList.remove('selected'));
    selectedMatchVi = { vi, correctHz, idx };
    const el = document.getElementById(`mvi-${idx}`);
    if (el) el.classList.add('selected');
    checkMatchPair();
}

function checkMatchPair() {
    if (!selectedMatchHz || !selectedMatchVi) return;

    if (selectedMatchHz.hz === selectedMatchVi.correctHz) {
        speakText(selectedMatchHz.hz);
        const hEl = document.getElementById(`mhz-${selectedMatchHz.idx}`);
        const vEl = document.getElementById(`mvi-${selectedMatchVi.idx}`);
        if (hEl) hEl.className = "match-card matched";
        if (vEl) vEl.className = "match-card matched";
        matchedPairs++;
        const countEl = document.getElementById('matchCount');
        if (countEl) countEl.innerText = matchedPairs;

        if (matchedPairs === 6) {
            setTimeout(() => {
                alert("🎉 Xuất sắc! Bạn đã hoàn thành vòng " + (matchRoundIdx + 1));
            }, 300);
        }
    } else {
        const hEl = document.getElementById(`mhz-${selectedMatchHz.idx}`);
        const vEl = document.getElementById(`mvi-${selectedMatchVi.idx}`);
        if (hEl) hEl.style.borderColor = 'var(--danger)';
        if (vEl) vEl.style.borderColor = 'var(--danger)';
        setTimeout(() => {
            if (hEl) {
                hEl.classList.remove('selected');
                hEl.style.borderColor = 'var(--border)';
            }
            if (vEl) {
                vEl.classList.remove('selected');
                vEl.style.borderColor = 'var(--border)';
            }
        }, 500);
    }
    selectedMatchHz = null;
    selectedMatchVi = null;
}

function nextMatchRound() {
    matchRoundIdx = (matchRoundIdx + 1) % MATCH_DATA.length;
    renderMatchRound();
}

// SAFE INITIALIZATION
function initApp() {
    try { renderVocab(VOCAB_DATA); } catch(e) { console.error("Vocab err:", e); }
    try { updateFlashcard(); } catch(e) { console.error("Fc err:", e); }
    try { renderQuiz(); } catch(e) { console.error("Quiz err:", e); }
    try { renderFill(); } catch(e) { console.error("Fill err:", e); }
    try { renderOrder(); } catch(e) { console.error("Order err:", e); }
    try { renderTranslation(); } catch(e) { console.error("Trans err:", e); }
    try { renderMatchRound(); } catch(e) { console.error("Match err:", e); }
    
    switchTab(0);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
window.onload = initApp;
</script>
</body>
</html>
"""

final_html = html_template.replace('__AUDIO_JSON__', audio_json)\
                          .replace('__VOCAB_JSON__', vocab_json)\
                          .replace('__QUIZ_JSON__', quiz_json)\
                          .replace('__FILL_JSON__', fill_json)\
                          .replace('__ORDER_JSON__', order_json)\
                          .replace('__TRANS_JSON__', trans_json)\
                          .replace('__MATCH_JSON__', match_json)

for path in [path1, path2, path3]:
    with open(path, "w", encoding="utf-8") as f:
        f.write(final_html)
    print(f"Successfully saved updated HTML to: {path}")

print("All HTML files built cleanly!")

