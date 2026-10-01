import os, sys, json, re
from bs4 import BeautifulSoup

import build_days_1_to_4_master as d14
import build_day7_master as d7

def clean_py(py):
    if not py: return ""
    s = py.lower()
    s = re.sub(r'[āáǎà]', 'a', s)
    s = re.sub(r'[ēéěè]', 'e', s)
    s = re.sub(r'[īíǐì]', 'i', s)
    s = re.sub(r'[ōóǒò]', 'o', s)
    s = re.sub(r'[ūúǔù]', 'u', s)
    s = re.sub(r'[ǖǘǚǜü]', 'v', s)
    s = re.sub(r'[^a-z0-9]', '', s)
    return s

def parse_html_vocab(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    rows = []
    for tr in soup.find_all('tr'):
        tds = [td.get_text(strip=True) for td in tr.find_all('td')]
        if len(tds) >= 7:
            # Format: [icon+py, hanzi, pinyin, hanviet, pos, tone, meaning, example]
            hz = tds[1]
            py = tds[2]
            hv = tds[3]
            vi = tds[6]
            eg = tds[7] if len(tds) > 7 else ''
            rows.append({
                'word': hz,
                'pinyin': py,
                'hanviet': hv,
                'meaning': vi,
                'ex_zh': eg
            })
    return rows

srs_bank = []

# 1. HSK 1 Core Bank (150 Words)
hsk1_raw = [
    ("爱", "ài", "Ái", "Yêu, thích", "爪 (Bộ Trảo) + 宀 + 心 (Tâm)", "Tấm lòng (心) che chở (宀) gửi gắm đến người mình thương ➔ Yêu (爱).", "我爱吃中国菜。(Wǒ ài chī Zhōngguó cài.)"),
    ("八", "bā", "Bát", "Số 8", "八 (Bộ Bát: Số 8)", "Hai nét phẩy mác xòe ra hai bên tượng hình số 8.", "我有八本书。(Wǒ yǒu bā běn shū.)"),
    ("爸爸", "bàba", "Bát bát", "Bố, cha", "父 (Bộ Phụ: Bố)", "Người cha (父) trụ cột che chở cho gia đình ➔ Bố (爸爸).", "爸爸在看报纸。(Bàba zài kàn bàozhǐ.)"),
    ("杯子", "bēizi", "Bôi tử", "Cái cốc, cái ly", "木 (Bộ Mộc: Gỗ) + 不 (Bất)", "Cốc ngày xưa làm từ gỗ (木) ➔ Cái cốc (杯子).", "杯子里有茶。(Bēizi li yǒu chá.)"),
    ("北京", "Běijīng", "Bắc Kinh", "Bắc Kinh (thủ đô Trung Quốc)", "北 (Bắc) + 京 (Kinh: Kinh đô)", "Kinh thành nằm ở phương Bắc ➔ Bắc Kinh (北京).", "我想去北京旅游。(Wǒ xiǎng qù Běijīng lǚyóu.)"),
    ("本", "běn", "Bổn / Bản", "Quyển, cuốn (lượng từ cho sách)", "木 (Bộ Mộc: Cây gỗ)", "Đánh dấu gốc rễ cây gỗ (木) ➔ Cuốn / Quyển (本).", "桌子上有三本书。(Zhuōzi shang yǒu sān běn shū.)"),
    ("不客气", "bú kèqi", "Bất khách khí", "Đừng khách khí, không có gì", "不 (Bất) + 客 (Khách) + 气 (Khí)", "Lời đáp xã giao khi được cảm ơn ➔ Không có gì (不客气).", "A: 谢谢你！ B: 不客气！"),
    ("不", "bù", "Bất", "Không (phó từ phủ định)", "一 (Nhất) + 丨", "Hình mầm cây chưa nhú lên mặt đất ➔ Không / Chưa (不).", "我不是老师。(Wǒ bú shì lǎoshī.)"),
    ("菜", "cài", "Thái", "Rau, món ăn", "艹 (Bộ Thảo: Cỏ) + 采 (Thái)", "Hái thảo mộc rau cỏ (艹) về làm thức ăn ➔ Món ăn (菜).", "今天的菜很好吃。(Jīntiān de cài hěn hǎochī.)"),
    ("茶", "chá", "Trà", "Trà, nước chè", "艹 (Thảo: Cỏ) + 人 (Nhân) + 木 (Mộc)", "Con người (人) hái lá cây (艹) hái từ cây gỗ (木) ➔ Uống trà (茶).", "请喝茶。(Qǐng hē chá.)"),
    ("吃", "chī", "Cật", "Ăn", "口 (Bộ Khẩu: Miệng) + 乞 (Khất)", "Dùng miệng (口) đưa thức ăn vào ➔ Ăn (吃).", "你想吃什么？(Nǐ xiǎng chī shénme?)"),
    ("出租车", "chūzūchē", "Xuất tô xa", "Xe taxi", "出 (Xuất) + 租 (Tô: Thuê) + 车 (Xa: Xe)", "Loại xe (车) đi ra ngoài (出) trả tiền thuê (租) ➔ Xe taxi (出租车).", "我们打出租车去吧。(Wǒmen dǎ chūzūchē qù ba.)"),
    ("打电话", "dǎ diànhuà", "Đả điện thoại", "Gọi điện thoại", "打 (Đả: Đập/Bấm) + 电 (Điện) + 话 (Thoại: Lời nói)", "Bấm máy (打) truyền sóng điện (电) phát ra lời nói (话) ➔ Gọi điện (打电话).", "他在打电话。(Tā zài dǎ diànhuà.)"),
    ("大", "dà", "Đại", "To, lớn", "大 (Bộ Đại: Người dang rộng tay chân)", "Hình người dơ hai tay rộng ra thể hiện sự to lớn ➔ To / Lớn (大).", " cái gian phòng này很大。(Zhè ge fángjiān hěn dà.)"),
    ("的", "de", "Đích", "Của (trợ từ sở hữu / định ngữ)", "白 (Bạch: Trắng) + 勺 (Chược: Thìa)", "Điểm mốc ngắm bắn trúng đích ➔ Của (的).", "这是我的书。(Zhè shì wǒ de shū.)"),
    ("点", "diǎn", "Điểm", "Giờ, chút ít", "占 (Chiêm) + 灬 (Bộ Hỏa: 4 chấm lửa)", "Các giọt nước nhỏ rơi xuống giọt một ➔ Giờ / Chút (点).", "现在几点了？(Xiànzài jǐ diǎn le?)"),
    ("电脑", "diànnǎo", "Điện não", "Máy tính, máy vi tính", "电 (Điện: Điện năng) + 脑 (Bộ Não: Bộ óc)", "Bộ óc (脑) điện tử thông minh xử lý dữ liệu ➔ Máy tính (电脑).", "我买了一台新电脑。(Wǒ mǎi le yì tái xīn diànnǎo.)"),
    ("电视", "diànshì", "Điện thị", "Tivi, truyền hình", "电 (Điện) + 视 (Thị: Nhìn)", "Màn hình điện (电) để thị giác (视) quan sát ➔ Tivi (电视).", "爸爸在看电视。(Bàba zài kàn diànshì.)"),
    ("电影", "diànyǐng", "Điện ảnh", "Phim, phim ảnh", "电 (Điện) + 影 (Ảnh: Hình ảnh)", "Hình ảnh (影) phát ra nhờ dòng điện ➔ Phim ảnh (电影).", "今晚我们看电影吧。(Jīnwǎn wǒmen kàn diànyǐng ba.)"),
    ("东西", "dōngxi", "Đông tây", "Đồ đạc, vật dụng", "东 (Đông) + 西 (Tây)", "Đi từ phương Đông sang phương Tây mua đồ ➔ Đồ đạc (东西).", "你买什么东西？(Nǐ mǎi shénme dōngxi?)"),
    ("都", "dōu", "Đô", "Đều, tất cả", "者 (Giả) + 阝 (Bộ Phụ: Thành quách)", "Mọi người ở thành đô (都) tụ họp lại ➔ Đều / Tất cả (都).", "我们都是留学生。(Wǒmen dōu shì liúxuéshēng.)"),
    ("读", "dú", "Độc", "Đọc", "讠 (Bộ Ngôn: Lời nói) + 卖 (Mại)", "Dùng lời nói (讠) đọc to bài văn ➔ Đọc (读).", "请读课文。(Qǐng dú kèwén.)"),
    ("对不起", "duìbuqǐ", "Đối bất khởi", "Xin lỗi", "对 (Đối) + 不 (Bất) + 起 (Khởi)", "Lời xin lỗi khi làm sai ➔ Xin lỗi (对不起).", "A: 对不起！ B: 没关系！"),
    ("多", "duō", "Đa", "Nhiều", "夕 (Tịch: Buổi tối) + 夕", "Hai buổi tối (夕) chồng lên nhau ➔ Nhiều (多).", "这里的人很多。(Zhèlǐ de rén hěn duō.)"),
    ("多少", "duōshao", "Đa thiếu", "Bao nhiêu", "多 (Nhiều) + 少 (Ít)", "Hỏi về số lượng nhiều hay ít ➔ Bao nhiêu (多少).", " cái này多少钱？(Zhè ge duōshao qián?)"),
    ("儿子", "érzi", "Nhi tử", "Con trai", "儿 (Nhi) + 子 (Tử)", "Người đứa con trai nhỏ trong nhà ➔ Con trai (儿子).", "他的儿子六岁了。(Tā de érzi liù suì le.)"),
    ("二", "èr", "Nhị", "Số 2", "二 (Bộ Nhị)", "Hai nét ngang song song ➔ Số 2 (二).", "现在二点了。(Xiànzài èr diǎn le.)"),
    ("饭店", "fàndiàn", "Phạn điếm", "Nhà hàng, khách sạn", "饭 (Phạn: Cơm) + 店 (Điếm: Cửa hàng)", "Cửa hàng (店) bán cơm thức ăn (饭) ➔ Nhà hàng (饭店).", "我们在饭店吃饭。(Wǒmen zài fàndiàn chīfàn.)"),
    ("飞机", "fēijī", "Phi cơ", "Máy bay", "飞 (Phi: Bay) + 机 (Cơ: Máy móc)", "Cỗ máy (机) bay (飞) trên bầu trời ➔ Máy bay (飞机).", "坐飞机去上海。(Zuò fēijī qù Shànghǎi.)"),
    ("分钟", "fēnzhōng", "Phân chung", "Phút (thời gian)", "分 (Phân: Chia) + 钟 (Chung: Đồng hồ)", "Một phần chia trên mặt đồng hồ (钟) ➔ Phút (分钟).", "等我五分钟。(Děng wǒ wǔ fēnzhōng.)"),
    ("高兴", "gāoxìng", "Cao hưng", "Vui mừng, phấn khởi", "高 (Cao) + 兴 (Hưng)", "Tâm trạng hưng phấn (兴) dâng cao (高) ➔ Vui mừng (高兴).", "认识你很高兴！(Rènshi nǐ hěn gāoxìng!)"),
    ("个", "gè", "Cá", "Cái, con (lượng từ chung)", "人 (Nhân: Người) + 丨", "Lượng từ phổ biến nhất cho người và vật ➔ Cái / Con (个).", "我有一个哥哥。(Wǒ yǒu yí ge gēge.)"),
    ("工作", "gōngzuò", "Công tác", "Làm việc, công việc", "工 (Công: Công việc) + 作 (Tác: Làm)", "Công việc (工) làm ra (作) thành quả ➔ Làm việc (工作).", "你在哪儿工作？(Nǐ zài nǎr gōngzuò?)"),
    ("狗", "gǒu", "Cẩu", "Con chó", "犭 (Bộ Khuyển: Con chó) + 句 (Cú)", "Loài động vật bốn chân (犭) trung thành ➔ Con chó (狗).", "我家有一只小狗。(Wǒ jiā yǒu yì zhī xiǎogǒu.)"),
    ("汉语", "Hànyǔ", "Hán ngữ", "Tiếng Trung, tiếng Hán", "汉 (Hán) + 语 (Ngữ: Ngôn ngữ)", "Ngôn ngữ (语) của dân tộc Hán (汉) ➔ Tiếng Trung (汉语).", "我在学汉语。(Wǒ zài xué Hànyǔ.)"),
    ("好", "hǎo", "Hảo", "Tốt, hay, đẹp", "女 (Nữ: Người mẹ) + 子 (Tử: Đứa con)", "Người mẹ (女) ôm đứa con (子) là điều tốt đẹp ➔ Tốt / Hay (好).", "今天天气很好。(Jīntiān tiānqì hěn hǎo.)"),
    ("喝", "hē", "Hát", "Uống", "口 (Bộ Khẩu: Miệng) + 曷", "Mở miệng (口) uống nước giải khát ➔ Uống (喝).", "请喝茶。(Qǐng hē chá.)"),
    ("和", "hé", "Hòa", "Và, với (liên từ)", "禾 (Hòa: Cây lúa) + 口 (Khẩu: Miệng)", "Mọi miệng (口) cùng ăn lúa (禾) hòa thuận ➔ Và / Với (和).", "我和你都是学生。(Wǒ hé nǐ dōu shì xuéshēng.)"),
    ("很", "hěn", "Rất", "Rất (phó từ chỉ mức độ)", "彳 (Bộ Xích) + 艮 (Cấn)", "Rất nhiều (很) cảm xúc dâng trào.", "汉语很好学。(Hànyǔ hěn hǎo xué.)"),
    ("后面", "hòumian", "Hậu diện", "Phía sau, đằng sau", "后 (Hậu: Sau) + 面 (Diện: Mặt)", "Mặt (面) phía sau lưng (后) ➔ Đằng sau (后面).", "学校后面有一家饭店。(Xuéxiào hòumian yǒu yì jiā fàndiàn.)"),
    ("回", "huí", "Hồi", "Về, quay về", "囗 (Bộ Vi: Vòng quanh) + 口 (Khẩu)", "Đi một vòng tròn (囗) rồi quay về ➔ Về (回).", "我想回家。(Wǒ xiǎng huí jiā.)"),
    ("会", "huì", "Hội", "Biết (qua học tập)", "人 (Nhân) + 云 (Vân)", "Con người (人) hội tụ lại học tập ➔ Biết (会).", "我会说汉语。(Wǒ huì shuō Hànyǔ.)"),
    ("几", "jǐ", "Kỷ", "Mấy, vài", "几 (Bộ Kỷ)", "Hỏi số lượng nhỏ dưới 10 ➔ Mấy / Vài (几).", "你有几个苹果？(Nǐ yǒu jǐ ge píngguǒ?)"),
    ("家", "jiā", "Gia", "Gia đình, nhà", "宀 (Mái nhà) + 豕 (Con heo)", "Dưới mái nhà (宀) có gia súc (豕) sinh sống ➔ Nhà (家).", "我家在北京。(Wǒ jiā zài Běijīng.)"),
    ("叫", "jiào", "Khiếu", "Tên là, gọi là", "口 (Khẩu: Miệng) + 丩", "Dùng miệng (口) cất tiếng gọi ➔ Gọi / Tên là (叫).", "你叫什么名字？(Nǐ jiào shénme míngzi?)"),
    ("今天", "jīntiān", "Kim thiên", "Hôm nay", "今 (Kim: Hiện tại) + 天 (Thiên: Ngày)", "Ngày (天) ở thời điểm hiện tại (今) ➔ Hôm nay (今天).", "今天是星期一。(Jīntiān shì xīngqīyī.)"),
    ("九", "jiǔ", "Cửu", "Số 9", "九 (Bộ Cửu)", "Hình cánh tay đang gập lại ➔ Số 9 (九).", "现在九点了。(Xiànzài jiǔ diǎn le.)"),
    ("开", "kāi", "Khai", "Mở, lái (xe)", "开 (Bộ Khai: Mở cửa)", "Hai tay mở then cửa ➔ Mở / Lái xe (开).", "我会开车。(Wǒ huì kāichē.)"),
    ("看", "kàn", "Khán", "Nhìn, xem, đọc", "手 (Thủ: Bàn tay) + 目 (Mục: Con mắt)", "Giơ bàn tay (手) che trên mắt (目) để nhìn xa ➔ Xem / Nhìn (看).", "你在看什么书？(Nǐ zài kàn shénme shū?)"),
    ("看见", "kànjiàn", "Khán kiến", "Nhìn thấy", "看 (Nhìn) + 见 (Kiến: Thấy)", "Nhìn (看) và nhận ra hình ảnh (见) ➔ Nhìn thấy (看见).", "我看见了一只猫。(Wǒ kànjiàn le yì zhī māo.)"),
    ("块", "kuài", "Khối", "Đồng (đơn vị tiền), miếng", "土 (Thổ: Đất) + 夬", "Cục đất (土) hay thỏi tiền ➔ Đồng tiền / Miếng (块).", " cái này苹果三块钱。(Zhè ge píngguǒ sān kuài qián.)"),
    ("来", "lái", "Lai", "Đến, tới", "木 (Mộc) + 𠂉", "Hình cây lúa mì từ xa tới ➔ Đến / Tới (来).", "他明天来我家。(Tā míngtiān lái wǒ jiā.)"),
    ("老师", "lǎoshī", "Lão sư", "Thầy giáo, cô giáo", "老 (Lão: Già/Kính trọng) + 师 (Sư: Thầy)", "Người thầy (师) kính trọng (老) truyền kiến thức ➔ Thầy cô (老师).", "王老师是我们的汉语老师。(Wáng lǎoshī shì wǒmen de Hànyǔ lǎoshī.)"),
    ("了", "le", "Liễu", "Rồi (trợ từ hoàn thành)", "了 (Bộ Liễu)", "Diễn tả hành động đã hoàn thành ➔ Rồi (了).", "我吃了饭了。(Wǒ chī le fàn le.)"),
    ("冷", "lěng", "Lãnh", "Lạnh", "冫 (Bộ Băng: Băng giá) + 令", "Băng giá (冫) phủ kín buốt giá ➔ Lạnh (冷).", "今天天气很冷。(Jīntiān tiānqì hěn lěng.)"),
    ("里", "lǐ", "Lý", "Bên trong", "日 (Mặt trời) + 土 (Đất)", "Thửa ruộng trong làng ➔ Bên trong (里).", "书包里有电脑。(Shūbāo li yǒu diànnǎo.)"),
    ("六", "liù", "Lục", "Số 6", "六 (Bộ Lục)", "Hình ngôi nhà có mái ➔ Số 6 (六).", "我有六个苹果。(Wǒ yǒu liù ge píngguǒ.)"),
    ("妈妈", "māma", "Mã mã", "Mẹ", "女 (Nữ: Người phụ nữ) + 马 (Mã)", "Người phụ nữ (女) vất vả vì con ➔ Mẹ (妈妈).", "妈妈在做饭。(Māma zài zuòfàn.)"),
    ("吗", "ma", "Mã", "Không? (trợ từ nghi vấn)", "口 (Khẩu: Miệng) + 马 (Mã)", "Dùng miệng (口) đặt câu hỏi cuối câu ➔ Không? (吗).", "你是中国人吗？(Nǐ shì Zhōngguó rén ma?)"),
    ("猫", "māo", "Miêu", "Con mèo", "犭 (Bộ Khuyển: Động vật) + 苗 (Miêu)", "Loài động vật (犭) hay kêu meo meo ➔ Con mèo (猫).", "小猫在椅子下面。(Xiǎomāo zài yǐzi xiàmiàn.)"),
    ("没关系", "méi guānxi", "Một quan hệ", "Không sao, không có gì", "没 (Một: Không) + 关 (Quan) + 系 (Hệ)", "Lời đáp lại khi được xin lỗi ➔ Không sao (没关系).", "A: 对不起！ B: 没关系！"),
    ("没有", "méiyǒu", "Một hữu", "Không có, chưa", "没 (Không) + 有 (Có)", "Phủ định sự tồn tại ➔ Không có (没有).", "我没有钱。(Wǒ méiyǒu qián.)"),
    ("米饭", "mǐfàn", "Mễ phạn", "Cơm", "米 (Mễ: Hạt gạo) + 饭 (Phạn: Cơm)", "Hạt gạo (米) nấu chín thành cơm (饭) ➔ Cơm (米饭).", "我喜欢吃米饭。(Wǒ xǐhuan chī mǐfàn.)"),
    ("名字", "míngzi", "Danh tự", "Tên", "名 (Danh: Tên) + 字 (Tự: Chữ)", "Chữ (字) ghi tên (名) gọi của một người ➔ Tên (名字).", "你的名字叫什么？(Nǐ de míngzi jiào shénme?)"),
    ("明天", "míngtiān", "Minh thiên", "Ngày mai", "日 (Mặt trời) + 月 (Mặt trăng) + 天 (Ngày)", "Nhật (日) Nguyệt (月) trôi qua ngày mới ➔ Ngày mai (明天).", "明天见！(Míngtiān jiàn!)"),
    ("哪", "nǎ", "Nào", "Nào, cái nào", "口 (Khẩu) + 那 (Na)", "Từ dùng để hỏi lựa chọn ➔ Nào (哪).", "你是哪国人？(Nǐ shì nǎ guó rén?)"),
    ("哪儿", "nǎr", "Nào nhi", "Đâu, ở đâu", "哪 (Nào) + 儿 (Nhi)", "Từ dùng để hỏi vị trí ➔ Đâu / Ở đâu (哪儿).", "你去哪儿？(Nǐ qù nǎr?)"),
    ("那", "nà", "Kia", "Đó, kia", "阝 (Bộ Phụ)", "Chỉ vật ở xa người nói ➔ Đó / Kia (那).", "那是我的电脑。(Nà shì wǒ de diànnǎo.)"),
    ("呢", "ne", "Ni", "Thì sao? (trợ từ ngắt câu)", "口 (Khẩu) + 尼", "Trợ từ ngữ khí đứng cuối câu ➔ Thì sao? (呢).", "你呢？(Nǐ ne?)"),
    ("能", "néng", "Năng", "Có thể (khả năng)", "厶 + 月 + 匕", "Con gấu có sức mạnh ➔ Có thể (能).", "我能去吗？(Wǒ néng qù ma?)"),
    ("你", "nǐ", "Nhĩ", "Bạn, cậu, anh", "亻 (Bộ Nhân đứng: Người) + 尔", "Người (亻) đối diện đang trò chuyện ➔ Bạn / Cậu (你).", "你好！(Nǐ hǎo!)"),
    ("年", "nián", "Niên", "Năm", "干 + 亅", "Mùa thu hoạch lúa chín ➔ Năm (年).", "今年是2026年。(Jīnnián shì èrlíngèrliù nián.)"),
    ("女儿", "nǚ'ér", "Nữ nhi", "Con gái", "女 (Nữ) + 儿 (Nhi)", "Đứa con là phái nữ ➔ Con gái (女儿).", "她有一个女儿。(Tā yǒu yí ge nǚ'ér.)"),
    ("朋友", "péngyou", "Bằng hữu", "Bạn bè", "朋 (Bằng) + 友 (Hữu)", "Hai bàn tay (友) nắm chặt gắn kết ➔ Bạn bè (朋友).", "他是我的好朋友。(Tā shì wǒ de hǎo péngyou.)"),
    ("漂亮", "piàoliang", "Phiêu lượng", "Đẹp, xinh đẹp", "氵 (Thủy) + 票 + 亮 (Sáng)", "Vẻ đẹp trong trẻo lấp lánh ➔ Xinh đẹp (漂亮).", " cái này衣服很漂亮。(Zhè ge yīfu hěn piàoliang.)"),
    ("苹果", "píngguǒ", "Bình quả", "Quả táo", "艹 (Thảo) + 平 + 果 (Quả)", "Trái cây (果) tròn trịa ➔ Quả táo (苹果).", "我想吃苹果。(Wǒ xiǎng chī píngguǒ.)"),
    ("七", "qī", "Thất", "Số 7", "七 (Bộ Thất)", "Nét cắt vuông góc ➔ Số 7 (七).", "七月是夏天。(Qī yuè shì xiàtiān.)"),
    ("钱", "qián", "Tiền", "Tiền", "钅 (Bộ Kim) + 戔", "Đồng kim loại (钅) dùng để trao đổi ➔ Tiền (钱).", " cái này多少钱？(Zhè ge duōshao qián?)"),
    ("前面", "qiánmiàn", "Tiền diện", "Phía trước", "前 (Tiền: Trước) + 面 (Diện: Mặt)", "Hướng về phía trước (前) ➔ Phía trước (前面).", "他在我前面。(Tā zài wǒ qiánmiàn.)"),
    ("请", "qǐng", "Thỉnh", "Mời, xin vui lòng", "讠 (Ngôn) + 青 (Thanh)", "Dùng lời nói (讠) lịch sự mời mọc ➔ Mời (请).", "请进！(Qǐng jìn!)"),
    ("去", "qù", "Khứ", "Đi", "土 (Đất) + 厶", "Rời khỏi nơi chốn ➔ Đi (去).", "我去学校。(Wǒ qù xuéxiào.)"),
    ("热", "rè", "Nhiệt", "Nóng", "执 + 灬 (Bộ Hỏa: Lửa)", "Lửa (灬) bốc lên ngùn ngụt ➔ Nóng (热).", "今天天很热。(Jīntiān tiān hěn rè.)"),
    ("人", "rén", "Nhân", "Người", "人 (Bộ Nhân)", "Hình người bước đi ➔ Người (人).", "他是中国人。(Tā shì Zhōngguó rén.)"),
    ("认识", "rènshi", "Nhận thức", "Quen biết, nhận ra", "讠 (Ngôn) + 认 + 识", "Dùng lời nói (讠) để ghi nhận kiến thức ➔ Quen biết (认识).", "很高兴认识你！(Hěn gāoxìng rènshi nǐ!)"),
    ("三", "sān", "Tam", "Số 3", "三 (Bộ Tam)", "Ba nét ngang song song ➔ Số 3 (三).", "三个人。(Sān ge rén.)"),
    ("商店", "shāngdiàn", "Thương điếm", "Cửa hàng, tiệm", "商 (Thương) + 店 (Điếm)", "Nơi tiệm (店) buôn bán (商) hàng hóa ➔ Cửa hàng (商店).", "我去商店买东西。(Wǒ qù shāngdiàn mǎi dōngxi.)"),
    ("上", "shàng", "Thượng", "Bên trên, lên", "卜 + 一", "Nằm ở vị trí phía trên đường ngang ➔ Trên / Lên (上).", "桌子上有一本书。(Zhuōzi shang yǒu yì běn shū.)"),
    ("上午", "shàngwǔ", "Thượng ngọ", "Buổi sáng", "上 (Trước) + 午 (Ngọ: Giờ trưa)", "Thời gian trước giờ ngọ trưa ➔ Buổi sáng (上午).", "上午我有课。(Shàngwǔ wǒ yǒu kè.)"),
    ("少", "shǎo", "Thiếu", "Ít", "小 (Tiểu) + 丿", "Bớt đi một chút nhỏ ➔ Ít (少).", "这里人很少。(Zhèlǐ rén hěn shǎo.)"),
    ("谁", "shéi", "Thùy", "Ai", "讠 (Ngôn) + 隹 (Chuy)", "Hỏi về người nào ➔ Ai (谁).", "他是谁？(Tā shì shéi?)"),
    ("什么", "shénme", "Thập ma", "Cái gì", "什 (Thập) + 么 (Ma)", "Từ dùng để hỏi vật ➔ Cái gì (什么).", "这是什么？(Zhè shì shénme?)"),
    ("十", "shí", "Thập", "Số 10", "十 (Bộ Thập)", "Dấu thập đếm đủ 10 ➔ Số 10 (十).", "我有十本书。(Wǒ yǒu shí běn shū.)"),
    ("时候", "shíhou", "Thời hậu", "Lúc, khi", "时 (Thời) + 候 (Hậu)", "Khoảng thời gian (时) ➔ Lúc / Khi (时候).", "你什么时候来？(Nǐ shénme shíhou lái?)"),
    ("是", "shì", "Thị", "Là, phải, đúng", "日 (Mặt trời) + 疋", "Mặt trời chiếu thẳng đứng minh bạch ➔ Là / Đúng (是).", "我是学生。(Wǒ shì xuéshēng.)"),
    ("书", "shū", "Thư", "Sách", "𦘒 + 亅", "Hình tay cầm bút viết lên trang giấy ➔ Sách (书).", "我在看书。(Wǒ zài kàn shū.)"),
    ("水", "shuǐ", "Thủy", "Nước", "水 (Bộ Thủy: Dòng nước)", "Dòng nước chảy cuồn cuộn ➔ Nước (水).", "请喝水。(Qǐng hē shuǐ.)"),
    ("水果", "shuǐguǒ", "Thủy quả", "Trái cây, hoa quả", "水 (Nước) + 果 (Trái cây)", "Trái cây (果) chứa nhiều nước (水) ➔ Hoa quả (水果).", "我想买水果。(Wǒ xiǎng mǎi shuǐguǒ.)"),
    ("睡觉", "shuìjiào", "Thụy giác", "Đi ngủ", "目 (Bộ Mắt) + 垂 + 觉", "Nhắm mắt (目) thả lỏng đi vào giấc ngủ ➔ Đi ngủ (睡觉).", "我要睡觉了。(Wǒ yào shuìjiào le.)"),
    ("说话", "shuōhuà", "Thuyết thoại", "Nói chuyện", "讠 (Ngôn) + 兑 + 话", "Mở lời (讠) nói ra suy nghĩ ➔ Nói chuyện (说话).", "别说话！(Bié shuōhuà!)"),
    ("四", "sì", "Tứ", "Số 4", "囗 + 儿", "Hình hộp chia 4 phần ➔ Số 4 (四).", "四个人。(Sì ge rén.)"),
    ("岁", "suì", "Tuế", "Tuổi", "山 (Núi) + 夕", "Thời gian trôi qua thêm một tuổi ➔ Tuổi (岁).", "我二十岁了。(Wǒ èrshí suì le.)"),
    ("他", "tā", "Tha", "Anh ấy, ông ấy", "亻 (Nhân đứng) + 也", "Người đàn ông khác (亻) ➔ Anh ấy (他).", "他是我的好朋友。(Tā shì wǒ de hǎo péngyou.)"),
    ("她", "tā", "Tha", "Cô ấy, chị ấy", "女 (Bộ Nữ) + 也", "Người phụ nữ (女) ➔ Cô ấy (她).", "她是我的老师。(Tā shì wǒ de lǎoshī.)"),
    ("太", "tài", "Thái", "Quá, rất", "大 (Đại) + 丶", "Thêm một chấm vào chữ 大 thể hiện vượt mức ➔ Quá (太).", "太好了！(Tài hǎo le!)"),
    ("天气", "tiānqì", "Thiên khí", "Thời tiết", "天 (Trời) + 气 (Khí)", "Khí (气) của đất trời (天) ➔ Thời tiết (天气).", "今天天气很好。(Jīntiān tiānqì hěn hǎo.)"),
    ("听", "tīng", "Thính", "Nghe", "口 (Khẩu) + 斤", "Dùng tai lắng nghe ➔ Nghe (听).", "我在听音乐。(Wǒ zài tīng yīnyuè.)"),
    ("同学", "tóngxué", "Đồng học", "Bạn cùng học", "同 (Đồng) + 学 (Học)", "Cùng nhau (同) học tập (学) ➔ Bạn học (同学).", "我们是同学。(Wǒmen s: shì tóngxué.)"),
    ("喂", "wèi", "Ủy", "Alo (khi nghe điện thoại)", "口 (Khẩu)", "Dùng miệng (口) cất tiếng chào khi nghe máy ➔ Alo (喂).", "喂，你是谁？(Wèi, nǐ shì shéi?)"),
    ("我", "wǒ", "Ngã", "Tôi, tớ, bản thân", "手 (Thủ) + 戈 (Binh khí)", "Bản thân tay cầm binh khí tự vệ ➔ Tôi (我).", "我是越南人。(Wǒ shì Yuènán rén.)"),
    ("五", "wǔ", "Ngũ", "Số 5", "五 (Bộ Ngũ)", "Số 5 ➔ 五.", "五个人。(Wǔ ge rén.)"),
    ("喜欢", "xǐhuan", "Hỷ hoan", "Thích, yêu thích", "喜 (Hỷ) + 欢 (Hoan)", "Cảm thấy hoan hỷ (欢) vui vẻ (喜) ➔ Yêu thích (喜欢).", "我喜欢学汉语。(Wǒ xǐhuan xué Hànyǔ.)"),
    ("下", "xià", "Hạ", "Bên dưới, xuống", "一 + 卜", "Nằm ở vị trí bên dưới đường ngang ➔ Dưới / Xuống (下).", "小猫在桌子下面。(Xiǎomāo zài zhuōzi xiàmiàn.)"),
    ("下午", "xiàwǔ", "Hạ ngọ", "Buổi chiều", "下 (Sau) + 午 (Ngọ)", "Khoảng thời gian sau giờ trưa ➔ Buổi chiều (下午).", "下午我去买东西。(Xiàwǔ wǒ qù mǎi dōngxi.)"),
    ("下雨", "xiàyǔ", "Hạ vũ", "Trời mưa", "下 (Rơi xuống) + 雨 (Mưa)", "Cơn mưa (雨) rơi xuống (下) ➔ Trời mưa (下雨).", "外面下雨了。(Wàimiàn xiàyǔ le.)"),
    ("先生", "xiānsheng", "Tiên sinh", "Ông, ngài, anh", "先 (Tiên) + 生 (Sinh)", "Cách xưng hô lịch sự với nam giới ➔ Tiên sinh / Ông (先生).", "王先生很忙。(Wáng xiānsheng hěn máng.)"),
    ("现在", "xiànzài", "Hiện tại", "Bây giờ, hiện tại", "现 (Hiện) + 在 (Tại)", "Thời điểm đang ở (在) hiện tại (现) ➔ Bây giờ (现在).", "现在几点了？(Xiànzài jǐ diǎn le?)"),
    ("想", "xiǎng", "Tưởng", "Muốn, nghĩ, nhớ", "相 (Tương) + 心 (Tâm)", "Hình ảnh ghi sâu vào trong lòng (心) ➔ Muốn / Nhớ (想).", "我想去中国。(Wǒ xiǎng qù Zhōngguó.)"),
    ("小", "xiǎo", "Tiểu", "Nhỏ, bé", "小 (Bộ Tiểu)", "Chia nhỏ vật thành 3 mẩu ➔ Nhỏ / Bé (小).", " cái này苹果很小。(Zhè ge píngguǒ hěn xiǎo.)"),
    ("小姐", "xiǎojiě", "Tiểu thư", "Cô gái, cô", "小 (Tiểu) + 姐 (Tỷ)", "Cách gọi xưng hô cô gái trẻ ➔ Cô / Tiểu thư (小姐).", "李小姐在看书。(Lǐ xiǎojiě zài kàn shū.)"),
    ("些", "xiē", "Tá", "Một vài, một số", "此 + 二", "Số lượng nhỏ không xác định ➔ Vài / Một số (些).", "Những东西是我的。(Zhèxiē dōngxi shì wǒ de.)"),
    ("写", "xiě", "Tả", "Viết", "冖 (Mái) + 与", "Đặt ngọn bút nét mực lên giấy ➔ Viết (写).", "在写汉字。(Zài xiě hànzì.)"),
    ("谢谢", "xièxie", "Tạ tạ", "Cảm ơn", "讠 (Ngôn) + 射 + 寸", "Lời nói (讠) từ tâm chân thành ➔ Cảm ơn (谢谢).", "谢谢你的帮助！(Xièxie nǐ de bāngzhù!)"),
    ("星期", "xīngqī", "Tinh kỳ", "Tuần, thứ", "星 (Sao) + 期 (Kỳ)", "Chu kỳ các vì sao ➔ Tuần / Thứ (星期).", "今天是星期一。(Jīntiān shì xīngqīyī.)"),
    ("学生", "xuéshēng", "Học sinh", "Học sinh, sinh viên", "学 (Học) + 生 (Sinh)", "Người sinh ra (生) để học tập (学) ➔ Học sinh (学生).", "我是汉语学生。(Wǒ shì Hànyǔ xuéshēng.)"),
    ("学习", "xuéxí", "Học tập", "Học tập, học", "学 (Học) + 习 (Tập)", "Học (学) đi đôi với luyện tập (习) ➔ Học tập (学习).", "我喜欢学习汉语。(Wǒ xǐhuan xuéxí Hànyǔ.)"),
    ("学校", "xuéxiào", "Học hiệu", "Trường học", "学 (Học) + 校 (Hiệu)", "Ngôi trường (校) dạy học (学) ➔ Trường học (学校).", "我们的学校很大。(Wǒmen de xuéxiào hěn dà.)"),
    ("一", "yī", "Nhất", "Số 1", "一 (Bộ Nhất)", "Một nét ngang cơ bản ➔ Số 1 (一).", "一个人。(Yí ge rén.)"),
    ("衣服", "yīfu", "Y phục", "Quần áo", "衣 (Y) + 服 (Phục)", "Trang phục khoác lên người ➔ Quần áo (衣服).", "这条衣服很漂亮。(Zhè tiáo yīfu hěn piàoliang.)"),
    ("医生", "yīshēng", "Y sinh", "Bác sĩ", "医 (Y) + 生 (Sinh)", "Người chữa bệnh ngành y (医) ➔ Bác sĩ (医生).", "他爸爸是医生。(Tā bàba shì yīshēng.)"),
    ("医院", "yīyuàn", "Y viện", "Bệnh viện", "医 (Y) + 院 (Viện)", "Tòa viện (院) khám chữa bệnh (医) ➔ Bệnh viện (医院).", "他在医院工作。(Tā zài yīyuàn gōngzuò.)"),
    ("椅子", "yǐzi", "Ỷ tử", "Cái ghế", "木 (Mộc) + 奇 + Tử", "Đồ vật bằng gỗ (木) để tựa lưng ➔ Cái ghế (椅子).", "请坐在椅子上。(Qǐng zuò zài yǐzi shang.)"),
    ("有", "yǒu", "Hữu", "Có", "𠂇 + 月", "Bàn tay cầm miếng thịt ➔ Có (有).", "我有三本书。(Wǒ yǒu sān běn shū.)"),
    ("月", "yuè", "Nguyệt", "Tháng, mặt trăng", "月 (Bộ Nguyệt)", "Hình vành trăng khuyết ➔ Tháng / Mặt trăng (月).", "一月很冷。(Yī yuè hěn lěng.)"),
    ("再见", "zàijiàn", "Tái kiến", "Tạm biệt", "再 (Tái) + 见 (Kiến)", "Hẹn gặp lại (见) lần nữa (再) ➔ Tạm biệt (再见).", "老师，再见！(Lǎoshī, zàijiàn!)"),
    ("在", "zài", "Tại", "Đang, ở tại", "土 (Đất) + 𠂇", "Hiện diện ở một vị trí trên mặt đất ➔ Ở / Đang (在).", "我在家看书。(Wǒ zài jiā kàn shū.)"),
    ("怎么", "zěnme", "Chẩm ma", "Làm sao, thế nào", "怎 (Chẩm) + 么 (Ma)", "Từ hỏi phương thức ➔ Thế nào (怎么).", " cái này字怎么读？(Zhè ge zì zěnme dú?)"),
    ("怎么样", "zěnmeyàng", "Chẩm ma dạng", "Thế nào, ra sao", "怎么 + 样 (Dạng)", "Hỏi tính chất / ý kiến ➔ Ra sao / Thế nào (怎么样).", "今天天气怎么样？(Jīntiān tiānqì zěnmeyàng?)"),
    ("张", "zhāng", "Trương", "Tờ, bức (lượng từ vật phẳng)", "弓 (Cung) + 长 (Trường)", "Mở rộng tấm phẳng ➔ Tờ / Bức (张).", "一张桌子。(Yì zhāng zhuōzi.)"),
    ("中国", "Zhōngguó", "Trung Quốc", "Trung Quốc", "中 (Trung) + 国 (Quốc)", "Đất nước ở trung tâm ➔ Trung Quốc (中国).", "我想去中国旅游。(Wǒ xiǎng qù Zhōngguó lǚyóu.)"),
    ("中午", "zhōngwǔ", "Trung ngọ", "Buổi trưa", "中 (Giữa) + 午 (Ngọ)", "Thời điểm chính giữa giờ ngọ ➔ Buổi trưa (中午).", "中午我们吃米饭。(Zhōngwǔ wǒmen chī mǐfàn.)"),
    ("住", "zhù", "Trú", "Ở, cư trú", "亻 (Nhân) + 主 (Chủ)", "Con người (亻) định cư sinh sống ➔ Ở / Trú (住).", "你住在哪儿？(Nǐ zhù zài nǎr?)"),
    ("桌子", "zhuōzi", "Trác tử", "Cái bàn", "木 (Mộc) + 卓 + 子", "Đồ vật bằng gỗ (木) có mặt phẳng ➔ Cái bàn (桌子).", "桌子上有一台电脑。(Zhuōzi shang yǒu yì tái diànnǎo.)"),
    ("字", "zì", "Tự", "Chữ, chữ Hán", "宀 (Mái) + Tử", "Đứa con trong nhà học viết ➔ Chữ (字).", " cái này汉字怎么写？(Zhè ge hànzì zěnme xiě?)"),
    ("昨天", "zuótiān", "Tạc thiên", "Hôm qua", "日 (Mặt trời) + 乍 + Thiên", "Ngày (天) vừa trôi qua (乍) ➔ Hôm qua (昨天).", "昨天是星期日。(Zuótiān shì xīngqīrì.)"),
    ("坐", "zuò", "Tọa", "Ngồi, đi (xe/máy bay)", "人 + 人 + 土", "Hai người (人) ngồi cạnh nhau trên mặt đất (土) ➔ Ngồi (坐).", "请坐！(Qǐng zuò!)"),
    ("做", "zuò", "Tác", "Làm", "亻 (Nhân) + 故", "Con người (亻) hành động làm ra kết quả ➔ Làm (做).", "你在做什么？(Nǐ zài zuò shénme?)")
]

for idx, item in enumerate(hsk1_raw):
    hz, py, hv, vi, rad, mne, eg = item
    srs_bank.append({
        "id": f"hsk1-{idx+1}",
        "level": "HSK 1",
        "day": 0,
        "tag": "HSK 1 • Ôn Tập Cốt Lõi",
        "hanzi": hz,
        "pinyin": py,
        "pinyin_clean": clean_py(py),
        "hanviet": hv,
        "meaning": vi,
        "radical": rad,
        "mnemonic": mne,
        "example": eg
    })

# 2. HSK 2 Items from HTML & Master Python Modules
d5_rows = parse_html_vocab('/Users/trangngo95/Desktop/HSK/HSK2/Day 5/HSK2_Bai_5_Tu_Hoc.html')
d6_rows = parse_html_vocab('/Users/trangngo95/Desktop/HSK/HSK2/Day 6/HSK2_Bai_6_Tu_Hoc.html')

hsk2_raw = [
    ('Day 1', d14.DAYS_DATA[1]['vocab']),
    ('Day 2', d14.DAYS_DATA[2]['vocab']),
    ('Day 3', d14.DAYS_DATA[3]['vocab']),
    ('Day 4', d14.DAYS_DATA[4]['vocab']),
    ('Day 5', d5_rows),
    ('Day 6', d6_rows),
    ('Day 7', d7.VOCAB_ROWS)
]

for day_label, vocab_list in hsk2_raw:
    day_num = int(day_label.replace('Day ', ''))
    for idx, item in enumerate(vocab_list):
        hz = item.get('hz', item.get('word', ''))
        py = item.get('py', item.get('pinyin', ''))
        hv = item.get('hv', item.get('hanviet', ''))
        vi = item.get('vi', item.get('meaning', ''))
        rad = item.get('rad', '')
        mne = item.get('mne', '')
        eg_zh = item.get('eg_zh', item.get('ex_zh', ''))
        eg_py = item.get('eg_py', item.get('ex_py', ''))
        eg_vi = item.get('eg_vi', item.get('ex_vi', ''))
        
        eg = item.get('eg', f"{eg_zh} ({eg_py} - {eg_vi})" if eg_py else eg_zh)

        srs_bank.append({
            "id": f"hsk2-d{day_num}-{idx+1}",
            "level": "HSK 2",
            "day": day_num,
            "tag": f"HSK 2 • Ngày {day_num}",
            "hanzi": hz,
            "pinyin": py,
            "pinyin_clean": clean_py(py),
            "hanviet": hv,
            "meaning": vi,
            "radical": rad,
            "mnemonic": mne,
            "example": eg
        })

print(f"Total SRS Vocab Bank items: {len(srs_bank)} (HSK 1: {len(hsk1_raw)}, HSK 2: {len(srs_bank)-len(hsk1_raw)})")

with open('/Users/trangngo95/Desktop/HSK/srs_full_database.json', 'w', encoding='utf-8') as f:
    json.dump(srs_bank, f, ensure_ascii=False, indent=2)

print("Saved srs_full_database.json successfully!")
