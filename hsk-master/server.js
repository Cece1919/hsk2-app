// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

// src/data/hskData.ts
var HSK_WORDS = [
  {
    "id": "pdf_001",
    "hanzi": "\u4F60\u597D",
    "pinyin": "n\u01D0 h\u01CEo",
    "hanViet": "N\u1EC5 H\u1EA3o",
    "vietnamese": "Xin ch\xE0o",
    "partOfSpeech": "Th\xE1n t\u1EEB",
    "level": 1,
    "category": "Ch\xE0o h\u1ECFi",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u5973 (N\u1EEF)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u4F60\u597D\uFF01\u5F88\u9AD8\u5174\u8BA4\u8BC6\u4F60\u3002",
        "pinyin": "N\u01D0 h\u01CEo! H\u011Bn g\u0101ox\xECng r\xE8nshi n\u01D0.",
        "vi": "Xin ch\xE0o! R\u1EA5t vui \u0111\u01B0\u1EE3c quen bi\u1EBFt b\u1EA1n."
      },
      {
        "zh": "\u674E\u8001\u5E08\uFF0C\u4F60\u597D\uFF01",
        "pinyin": "L\u01D0 l\u01CEosh\u012B, n\u01D0 h\u01CEo!",
        "vi": "Th\u1EA7y L\xFD, em ch\xE0o th\u1EA7y!"
      }
    ],
    "tips": "\u201C\u4F60\u201D g\u1ED3m b\u1ED9 Nh\xE2n \u0111\u1EE9ng (\u4EBB) v\xE0 Nh\u0129 (\u5C14). \u201C\u597D\u201D g\u1ED3m N\u1EEF (\u5973) v\xE0 T\u1EED (\u5B50), m\u1EB9 con sum v\u1EA7y l\xE0 \u0111i\u1EC1u t\u1ED1t l\xE0nh. Ph\u1ED3n th\u1EC3: \u4F60\u597D."
  },
  {
    "id": "pdf_002",
    "hanzi": "\u7ED9",
    "pinyin": "g\u011Bi",
    "hanViet": "C\u1EA5p",
    "vietnamese": "Cho, \u0111\u01B0a cho, bi\u1EBFu",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Gi\u1EDBi t\u1EEB",
    "level": 2,
    "category": "Giao ti\u1EBFp h\xE0ng ng\xE0y",
    "radical": "\u7E9F (M\u1ECBch)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u8BF7\u7ED9\u6211\u4E00\u676F\u6C34\u3002",
        "pinyin": "Q\u01D0ng g\u011Bi w\u01D2 y\xEC b\u0113i shu\u01D0.",
        "vi": "Xin cho t\xF4i m\u1ED9t c\u1ED1c n\u01B0\u1EDBc."
      },
      {
        "zh": "\u4ED6\u7ED9\u4E86\u6211\u4E00\u672C\u4E66\u3002",
        "pinyin": "T\u0101 g\u011Bi le w\u01D2 y\xEC b\u011Bn sh\u016B.",
        "vi": "Anh \u1EA5y \u0111\u01B0a cho t\xF4i m\u1ED9t quy\u1EC3n s\xE1ch."
      }
    ],
    "tips": "B\u1ED9 M\u1ECBch (\u7E9F) k\u1EBFt h\u1EE3p ch\u1EEF H\u1EE3p (\u5408). Cho \u0111i \u0111\u1EC3 t\u1EA1o m\u1ED1i li\xEAn k\u1EBFt h\xF2a h\u1EE3p. Ph\u1ED3n th\u1EC3: \u7D66."
  },
  {
    "id": "pdf_003",
    "hanzi": "\u65C5\u6E38",
    "pinyin": "l\u01DAy\xF3u",
    "hanViet": "L\u1EEF Du",
    "vietnamese": "Du l\u1ECBch",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "Du l\u1ECBch & \u0110i l\u1EA1i",
    "radical": "\u65B9 (Ph\u01B0\u01A1ng) + \u6C35 (Ba ch\u1EA5m th\u1EE7y)",
    "strokeCount": 22,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u6253\u7B97\u53BB\u4E2D\u56FD\u65C5\u6E38\u3002",
        "pinyin": "W\u01D2men d\u01CEsu\xE0n q\xF9 Zh\u014Dnggu\xF3 l\u01DAy\xF3u.",
        "vi": "Ch\xFAng t\xF4i d\u1EF1 \u0111\u1ECBnh \u0111i Trung Qu\u1ED1c du l\u1ECBch."
      },
      {
        "zh": "\u65C5\u6E38\u80FD\u8BA9\u4EBA\u5FC3\u60C5\u6109\u5FEB\u3002",
        "pinyin": "L\u01DAy\xF3u n\xE9ng r\xE0ng r\xE9n x\u012Bnq\xEDng y\xFAku\xE0i.",
        "vi": "Du l\u1ECBch c\xF3 th\u1EC3 gi\xFAp t\xE2m tr\u1EA1ng tho\u1EA3i m\xE1i."
      }
    ],
    "tips": "\u201C\u65C5\u201D b\u1ED9 Ph\u01B0\u01A1ng (\u65B9) c\u1EDD h\xE0nh qu\xE2n vi\u1EC5n chinh, \u201C\u6E38\u201D b\u1ED9 Th\u1EE7y (\u6C35) b\u01A1i l\u1ED9i rong ch\u01A1i. Ph\u1ED3n th\u1EC3: \u65C5\u904A."
  },
  {
    "id": "pdf_004",
    "hanzi": "\u5E0C\u671B",
    "pinyin": "x\u012Bw\xE0ng",
    "hanViet": "Hi V\u1ECDng",
    "vietnamese": "Hy v\u1ECDng, mong mu\u1ED1n",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "T\xE2m l\xFD & C\u1EA3m x\xFAc",
    "radical": "\u5DFE (C\xE2n) + \u6708 (Nguy\u1EC7t)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u6211\u5E0C\u671B\u660E\u5929\u662F\u4E2A\u597D\u5929\u6C14\u3002",
        "pinyin": "W\u01D2 x\u012Bw\xE0ng m\xEDngti\u0101n sh\xEC ge h\u01CEo ti\u0101nq\xEC.",
        "vi": "T\xF4i hy v\u1ECDng ng\xE0y mai tr\u1EDDi \u0111\u1EB9p."
      },
      {
        "zh": "\u5E0C\u671B\u4F60\u8003\u8BD5\u987A\u5229\uFF01",
        "pinyin": "X\u012Bw\xE0ng n\u01D0 k\u01CEosh\xEC sh\xF9nl\xEC!",
        "vi": "Hy v\u1ECDng b\u1EA1n thi c\u1EED thu\u1EADn l\u1EE3i!"
      }
    ],
    "tips": "\u201C\u5E0C\u201D l\xE0 mong \u0111\u1EE3i hi\u1EBFm c\xF3, \u201C\u671B\u201D \u0111\u1EE9ng tr\xEAn m\xF4 \u0111\u1EA5t h\u01B0\u1EDBng m\u1EAFt tr\xF4ng v\u1EA7ng tr\u0103ng tr\xF2n. Ph\u1ED3n th\u1EC3: \u5E0C\u671B."
  },
  {
    "id": "pdf_005",
    "hanzi": "\u6E29\u6545\u77E5\u65B0",
    "pinyin": "w\u0113n g\xF9 zh\u012B x\u012Bn",
    "hanViet": "\xD4n C\u1ED1 Tri T\xE2n",
    "vietnamese": "\xD4n c\u0169 bi\u1EBFt m\u1EDBi (h\u1ECDc c\xE1i c\u0169 \u0111\u1EC3 hi\u1EC3u c\xE1i m\u1EDBi)",
    "partOfSpeech": "Th\xE0nh ng\u1EEF",
    "level": 3,
    "category": "H\u1ECDc t\u1EADp & Th\xE0nh ng\u1EEF",
    "radical": "\u6C35 (Th\u1EE7y) + \u6535 (Ph\xE1c)",
    "strokeCount": 41,
    "examples": [
      {
        "zh": "\u5B66\u4E60\u8981\u7ECF\u5E38\u6E29\u6545\u77E5\u65B0\uFF0C\u624D\u80FD\u4E0D\u65AD\u8FDB\u6B65\u3002",
        "pinyin": "Xu\xE9x\xED y\xE0o j\u012Bngch\xE1ng w\u0113ng\xF9-zh\u012Bx\u012Bn, c\xE1in\xE9ng b\xFAdu\xE0n j\xECnb\xF9.",
        "vi": "H\u1ECDc t\u1EADp ph\u1EA3i th\u01B0\u1EDDng xuy\xEAn \xF4n c\u0169 bi\u1EBFt m\u1EDBi th\xEC m\u1EDBi kh\xF4ng ng\u1EEBng ti\u1EBFn b\u1ED9."
      }
    ],
    "tips": "Th\xE0nh ng\u1EEF trong Lu\u1EADn Ng\u1EEF c\u1EE7a Kh\u1ED5ng T\u1EED: Nh\u1EAFc l\u1EA1i vi\u1EC7c c\u0169 (\u6E29\u6545) \u0111\u1EC3 th\u1EA5u su\u1ED1t \u0111i\u1EC1u m\u1EDBi (\u77E5\u65B0). Ph\u1ED3n th\u1EC3: \u6EAB\u6545\u77E5\u65B0."
  },
  {
    "id": "pdf_006",
    "hanzi": "\u8BFB",
    "pinyin": "d\xFA",
    "hanViet": "\u0110\u1ED9c",
    "vietnamese": "\u0110\u1ECDc, h\u1ECDc t\u1EADp",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\u1ECDc t\u1EADp",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u8BF7\u5927\u5BB6\u8DDF\u6211\u8BFB\u3002",
        "pinyin": "Q\u01D0ng d\xE0ji\u0101 g\u0113n w\u01D2 d\xFA.",
        "vi": "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi \u0111\u1ECDc theo t\xF4i."
      },
      {
        "zh": "\u4ED6\u5728\u5317\u4EAC\u8BFB\u5927\u5B66\u3002",
        "pinyin": "T\u0101 z\xE0i B\u011Bij\u012Bng d\xFA d\xE0xu\xE9.",
        "vi": "Anh \u1EA5y h\u1ECDc \u0111\u1EA1i h\u1ECDc \u1EDF B\u1EAFc Kinh."
      }
    ],
    "tips": "B\u1ED9 Ng\xF4n (\u8BA0) \u0111\u1EE9ng \u0111\u1EA7u v\xEC \u0111\u1ECDc b\u1EB1ng l\u1EDDi n\xF3i; b\xEAn ph\u1EA3i l\xE0 M\u1EA1i (\u5356). Ph\u1ED3n th\u1EC3: \u8B80."
  },
  {
    "id": "pdf_007",
    "hanzi": "\u7F8A\u8089",
    "pinyin": "y\xE1ngr\xF2u",
    "hanViet": "D\u01B0\u01A1ng Nh\u1EE5c",
    "vietnamese": "Th\u1ECBt c\u1EEBu",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c",
    "radical": "\u7F8A (D\u01B0\u01A1ng) + \u8089 (Nh\u1EE5c)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u51AC\u5929\u5403\u7F8A\u8089\u706B\u9505\u5F88\u6696\u548C\u3002",
        "pinyin": "D\u014Dngti\u0101n ch\u012B y\xE1ngr\xF2u hu\u01D2gu\u014D h\u011Bn nu\u01CEnhuo.",
        "vi": "M\xF9a \u0111\xF4ng \u0103n l\u1EA9u th\u1ECBt c\u1EEBu r\u1EA5t \u1EA5m \xE1p."
      },
      {
        "zh": "\u8FD9\u5BB6\u5E97\u7684\u70E4\u7F8A\u8089\u4E32\u5F88\u6709\u540D\u3002",
        "pinyin": "Zh\xE8 ji\u0101 di\xE0n de k\u01CEo y\xE1ngr\xF2uchu\xE0n h\u011Bn y\u01D2um\xEDng.",
        "vi": "Xi\xEAn th\u1ECBt c\u1EEBu n\u01B0\u1EDBng c\u1EE7a qu\xE1n n\xE0y r\u1EA5t n\u1ED5i ti\u1EBFng."
      }
    ],
    "tips": "\u201C\u7F8A\u201D con d\xEA/c\u1EEBu v\u1EDBi hai c\xE1i s\u1EEBng nh\xF4 l\xEAn, \u201C\u8089\u201D mi\u1EBFng th\u1ECBt c\xF3 th\u1EDB v\xE2n. Ph\u1ED3n th\u1EC3: \u7F8A\u8089."
  },
  {
    "id": "pdf_008",
    "hanzi": "\u6253\u7BEE\u7403",
    "pinyin": "d\u01CE l\xE1nqi\xFA",
    "hanViet": "\u0110\u1EA3 Lam C\u1EA7u",
    "vietnamese": "Ch\u01A1i b\xF3ng r\u1ED5",
    "partOfSpeech": "C\u1EE5m \u0111\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Th\u1EC3 thao",
    "radical": "\u624C (T\xE0i g\u1EA3y) + \u7AF9 (Tr\xFAc)",
    "strokeCount": 28,
    "examples": [
      {
        "zh": "\u4E0B\u5348\u6211\u4EEC\u4E00\u8D77\u53BB\u6253\u7BEE\u7403\u5427\u3002",
        "pinyin": "Xi\xE0w\u01D4 w\u01D2men y\xECq\u01D0 q\xF9 d\u01CE l\xE1nqi\xFA ba.",
        "vi": "Chi\u1EC1u nay ch\xFAng ta c\xF9ng \u0111i ch\u01A1i b\xF3ng r\u1ED5 nh\xE9."
      },
      {
        "zh": "\u4ED6\u6253\u7BEE\u7403\u6253\u5F97\u975E\u5E38\u597D\u3002",
        "pinyin": "T\u0101 d\u01CE l\xE1nqi\xFA d\u01CE de f\u0113ich\xE1ng h\u01CEo.",
        "vi": "Anh \u1EA5y ch\u01A1i b\xF3ng r\u1ED5 r\u1EA5t c\u1EEB kh\xF4i."
      }
    ],
    "tips": "\u201C\u6253\u201D vung tay n\xE9m, \u201C\u7BEE\u201D r\u1ED5 b\u1EB1ng tre n\u1EE9a (b\u1ED9 Tr\xFAc \u7AF9), \u201C\u7403\u201D qu\u1EA3 b\xF3ng (b\u1ED9 Ng\u1ECDc \u7389). Ph\u1ED3n th\u1EC3: \u6253\u7C43\u7403."
  },
  {
    "id": "pdf_009",
    "hanzi": "\u7ECF\u5E38",
    "pinyin": "j\u012Bngch\xE1ng",
    "hanViet": "Kinh Th\u01B0\u1EDDng",
    "vietnamese": "Th\u01B0\u1EDDng th\u01B0\u1EDDng, th\u01B0\u1EDDng xuy\xEAn",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian & T\u1EA7n su\u1EA5t",
    "radical": "\u7E9F (M\u1ECBch) + \u5DFE (C\xE2n)",
    "strokeCount": 19,
    "examples": [
      {
        "zh": "\u4ED6\u7ECF\u5E38\u53BB\u56FE\u4E66\u9986\u501F\u4E66\u3002",
        "pinyin": "T\u0101 j\u012Bngch\xE1ng q\xF9 t\xFAsh\u016Bgu\u01CEn ji\xE8 sh\u016B.",
        "vi": "Anh \u1EA5y th\u01B0\u1EDDng xuy\xEAn \u0111\u1EBFn th\u01B0 vi\u1EC7n m\u01B0\u1EE3n s\xE1ch."
      },
      {
        "zh": "\u5468\u672B\u6211\u7ECF\u5E38\u5728\u5BB6\u4F11\u606F\u3002",
        "pinyin": "Zh\u014Dum\xF2 w\u01D2 j\u012Bngch\xE1ng z\xE0i ji\u0101 xi\u016Bxi.",
        "vi": "Cu\u1ED1i tu\u1EA7n t\xF4i th\u01B0\u1EDDng \u1EDF nh\xE0 ngh\u1EC9 ng\u01A1i."
      }
    ],
    "tips": "\u201C\u7ECF\u201D l\xE0 s\u1EE3i t\u01A1 d\u1ECDc li\xEAn t\u1EE5c tr\u1EA3i d\xE0i, \u201C\u5E38\u201D l\xE0 quy lu\u1EADt b\u1EA5t bi\u1EBFn. Kinh th\u01B0\u1EDDng = \u0111\u1EC1u \u0111\u1EB7n l\u1EB7p l\u1EA1i. Ph\u1ED3n th\u1EC3: \u7D93\u5E38."
  },
  {
    "id": "pdf_010",
    "hanzi": "\u975E\u5E38",
    "pinyin": "f\u0113ich\xE1ng",
    "hanViet": "Phi Th\u01B0\u1EDDng",
    "vietnamese": "R\u1EA5t, v\xF4 c\xF9ng, h\u1EBFt s\u1EE9c",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "M\u1EE9c \u0111\u1ED9",
    "radical": "\u975E (Phi) + \u5DFE (C\xE2n)",
    "strokeCount": 19,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u7684\u5929\u6C14\u975E\u5E38\u8212\u670D\u3002",
        "pinyin": "J\u012Bnti\u0101n de ti\u0101nq\xEC f\u0113ich\xE1ng sh\u016Bfu.",
        "vi": "H\xF4m nay th\u1EDDi ti\u1EBFt r\u1EA5t d\u1EC5 ch\u1ECBu."
      },
      {
        "zh": "\u6211\u975E\u5E38\u559C\u6B22\u5B66\u6C49\u8BED\u3002",
        "pinyin": "W\u01D2 f\u0113ich\xE1ng x\u01D0huan xu\xE9 H\xE0ny\u01D4.",
        "vi": "T\xF4i v\xF4 c\xF9ng th\xEDch h\u1ECDc ti\u1EBFng Trung."
      }
    ],
    "tips": "\u201C\u975E\u201D v\u01B0\u1EE3t tr\xEAn m\u1EE9c b\xECnh th\u01B0\u1EDDng (\u201Cth\u01B0\u1EDDng\u201D \u5E38). Phi th\u01B0\u1EDDng = \u0111\u1EB7c bi\u1EC7t, c\u1EF1c k\u1EF3. Ph\u1ED3n th\u1EC3: \u975E\u5E38."
  },
  {
    "id": "pdf_011",
    "hanzi": "\u884C",
    "pinyin": "x\xEDng / h\xE1ng",
    "hanViet": "H\xE0nh / H\xE0ng",
    "vietnamese": "\u0110\u01B0\u1EE3c, \u1ED5n / h\xE0ng ng\u0169, ng\xE2n h\xE0ng",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / T\xEDnh t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "Giao ti\u1EBFp h\xE0ng ng\xE0y",
    "radical": "\u884C (H\xE0nh)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u660E\u5929\u89C1\uFF0C\u884C\u5417\uFF1F\u2014\u2014\u884C\uFF01",
        "pinyin": "M\xEDngti\u0101n ji\xE0n, x\xEDng ma? \u2014\u2014 X\xEDng!",
        "vi": "Mai g\u1EB7p l\u1EA1i, \u0111\u01B0\u1EE3c kh\xF4ng? \u2014\u2014 \u0110\u01B0\u1EE3c!"
      },
      {
        "zh": "\u4ED6\u5728\u4E00\u5BB6\u94F6\u884C\u5DE5\u4F5C\u3002",
        "pinyin": "T\u0101 z\xE0i y\xEC ji\u0101 y\xEDnh\xE1ng g\u014Dngzu\xF2.",
        "vi": "Anh \u1EA5y l\xE0m vi\u1EC7c \u1EDF m\u1ED9t ng\xE2n h\xE0ng."
      }
    ],
    "tips": "Ch\u1EEF \u0111a \xE2m \u0111a ngh\u0129a: \u0110\u1ECDc \u201Cx\xEDng\u201D ngh\u0129a l\xE0 \u0111i l\u1EA1i, \u0111\u01B0\u1EE3c, \u0111\u1ED3ng \xFD. \u0110\u1ECDc \u201Ch\xE1ng\u201D ngh\u0129a l\xE0 ng\xE0nh ngh\u1EC1, h\xE0ng ng\u0169 (nh\u01B0 y\xEDnh\xE1ng \u94F6\u884C). Ph\u1ED3n th\u1EC3: \u884C."
  },
  {
    "id": "pdf_012",
    "hanzi": "\u8C22\u8C22",
    "pinyin": "xi\xE8xie",
    "hanViet": "T\u1EA1 T\u1EA1",
    "vietnamese": "C\u1EA3m \u01A1n",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "X\xE3 giao",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 24,
    "examples": [
      {
        "zh": "\u8C22\u8C22\u4F60\u7684\u70ED\u60C5\u62DB\u5F85\uFF01",
        "pinyin": "Xi\xE8xie n\u01D0 de r\xE8q\xEDng zh\u0101od\xE0i!",
        "vi": "C\u1EA3m \u01A1n s\u1EF1 ti\u1EBFp \u0111\xE3i n\u1ED3ng nhi\u1EC7t c\u1EE7a b\u1EA1n!"
      },
      {
        "zh": "\u4E0D\u7528\u8C22\uFF0C\u522B\u5BA2\u6C14\u3002",
        "pinyin": "B\xFA y\xF2ng xi\xE8, bi\xE9 k\xE8qi.",
        "vi": "Kh\xF4ng c\xF3 chi, \u0111\u1EEBng kh\xE1ch s\xE1o."
      }
    ],
    "tips": "B\u1ED9 Ng\xF4n (\u8BA0) \u0111\u1EE9ng \u0111\u1EA7u v\xEC n\xF3i l\u1EDDi t\u1EA1 \u01A1n; th\xE2n ch\u1EEF g\u1ED3m Th\xE2n (\u8EAB) v\xE0 Th\u1ED1n (\u5BF8). Ph\u1ED3n th\u1EC3: \u8B1D\u8B1D."
  },
  {
    "id": "pdf_013",
    "hanzi": "\u52AA\u529B",
    "pinyin": "n\u01D4l\xEC",
    "hanViet": "N\u1ED7 L\u1EF1c",
    "vietnamese": "C\u1ED1 g\u1EAFng, n\u1ED7 l\u1EF1c, ch\u0103m ch\u1EC9",
    "partOfSpeech": "T\xEDnh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Ph\u1EA9m ch\u1EA5t & H\xE0nh vi",
    "radical": "\u5973 (N\u1EEF) + \u529B (L\u1EF1c)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u53EA\u8981\u52AA\u529B\uFF0C\u5C31\u4E00\u5B9A\u4F1A\u6210\u529F\u3002",
        "pinyin": "Zh\u01D0y\xE0o n\u01D4l\xEC, ji\xF9 y\xEDd\xECng hu\xEC ch\xE9ngg\u014Dng.",
        "vi": "Ch\u1EC9 c\u1EA7n c\u1ED1 g\u1EAFng, nh\u1EA5t \u0111\u1ECBnh s\u1EBD th\xE0nh c\xF4ng."
      },
      {
        "zh": "\u4ED6\u5B66\u4E60\u975E\u5E38\u52AA\u529B\u3002",
        "pinyin": "T\u0101 xu\xE9x\xED f\u0113ich\xE1ng n\u01D4l\xEC.",
        "vi": "C\u1EADu \u1EA5y h\u1ECDc t\u1EADp r\u1EA5t ch\u0103m ch\u1EC9."
      }
    ],
    "tips": "\u201C\u52AA\u201D g\u1ED3m N\xF4 (\u5974) v\xE0 L\u1EF1c (\u529B), d\u1ED1c h\u1EBFt to\xE0n l\u1EF1c ph\u1EA5n \u0111\u1EA5u. Ph\u1ED3n th\u1EC3: \u52AA\u529B."
  },
  {
    "id": "pdf_014",
    "hanzi": "\u8BA9",
    "pinyin": "r\xE0ng",
    "hanViet": "Nh\u01B0\u1EE3ng",
    "vietnamese": "Cho ph\xE9p, nh\u01B0\u1EDDng, b\u1EA3o, khi\u1EBFn cho",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Giao ti\u1EBFp h\xE0ng ng\xE0y",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u8001\u5E08\u8BA9\u6211\u56DE\u7B54\u8FD9\u4E2A\u95EE\u9898\u3002",
        "pinyin": "L\u01CEosh\u012B r\xE0ng w\u01D2 hu\xEDd\xE1 zh\xE8 ge w\xE8nt\xED.",
        "vi": "Th\u1EA7y gi\xE1o b\u1EA3o t\xF4i tr\u1EA3 l\u1EDDi c\xE2u h\u1ECFi n\xE0y."
      },
      {
        "zh": "\u8FD9\u4EF6\u4E8B\u8BA9\u6211\u5F88\u9AD8\u5174\u3002",
        "pinyin": "Zh\xE8 ji\xE0n sh\xEC r\xE0ng w\u01D2 h\u011Bn g\u0101ox\xECng.",
        "vi": "Vi\u1EC7c n\xE0y khi\u1EBFn t\xF4i r\u1EA5t vui m\u1EEBng."
      }
    ],
    "tips": "B\u1ED9 Ng\xF4n (\u8BA0) n\xF3i l\u1EDDi nh\u01B0\u1EDDng nh\u1ECBn b\xEAn c\u1EA1nh ch\u1EEF Th\u01B0\u1EE3ng (\u4E0A). Ph\u1ED3n th\u1EC3: \u8B93."
  },
  {
    "id": "pdf_015",
    "hanzi": "\u5DF2\u7ECF",
    "pinyin": "y\u01D0j\u012Bng",
    "hanViet": "D\u0129 Kinh",
    "vietnamese": "\u0110\xE3, r\u1ED3i",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian & M\u1EE9c \u0111\u1ED9",
    "radical": "\u5DF1 (K\u1EF7) + \u7E9F (M\u1ECBch)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u5DF2\u7ECF\u5403\u8FC7\u665A\u996D\u4E86\u3002",
        "pinyin": "W\u01D2 y\u01D0j\u012Bng ch\u012B gu\xF2 w\u01CEnf\xE0n le.",
        "vi": "T\xF4i \u0111\xE3 \u0103n c\u01A1m t\u1ED1i r\u1ED3i."
      },
      {
        "zh": "\u65F6\u95F4\u4E0D\u65E9\u4E86\uFF0C\u7535\u5F71\u5DF2\u7ECF\u5F00\u59CB\u4E86\u3002",
        "pinyin": "Sh\xEDji\u0101n b\xF9 z\u01CEo le, di\xE0ny\u01D0ng y\u01D0j\u012Bng k\u0101ish\u01D0 le.",
        "vi": "Kh\xF4ng c\xF2n s\u1EDBm n\u1EEFa, phim \u0111\xE3 b\u1EAFt \u0111\u1EA7u r\u1ED3i."
      }
    ],
    "tips": "\u201C\u5DF2\u201D n\xE9t d\u1EEBng d\u1EE9t kho\xE1t bi\u1EC3u th\u1ECB s\u1EF1 vi\u1EC7c \u0111\xE3 ho\xE0n t\u1EA5t trong qu\xE1 kh\u1EE9. Ph\u1ED3n th\u1EC3: \u5DF2\u7D93."
  },
  {
    "id": "pdf_016",
    "hanzi": "\u7968",
    "pinyin": "pi\xE0o",
    "hanViet": "Phi\u1EBFu",
    "vietnamese": "V\xE9, phi\u1EBFu",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u0110i l\u1EA1i & Gi\u1EA3i tr\xED",
    "radical": "\u793A (Th\u1ECB)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u4E70\u4E86\u4E24\u5F20\u7535\u5F71\u7968\u3002",
        "pinyin": "W\u01D2 m\u01CEi le li\u01CEng zh\u0101ng di\xE0ny\u01D0ng pi\xE0o.",
        "vi": "T\xF4i \u0111\xE3 mua hai v\xE9 xem phim."
      },
      {
        "zh": "\u8BF7\u51FA\u793A\u60A8\u7684\u8F66\u7968\u3002",
        "pinyin": "Q\u01D0ng ch\u016Bsh\xEC n\xEDn de ch\u0113pi\xE0o.",
        "vi": "Xin vui l\xF2ng xu\u1EA5t tr\xECnh v\xE9 xe c\u1EE7a b\u1EA1n."
      }
    ],
    "tips": "B\xEAn tr\xEAn l\xE0 b\u1ED9 \xC1 (\u8980), b\xEAn d\u01B0\u1EDBi l\xE0 b\u1ED9 Th\u1ECB (\u793A). Chi\u1EBFc phi\u1EBFu ch\u1EE9ng nh\u1EADn quy\u1EC1n v\xE0o c\u1EEDa. Ph\u1ED3n th\u1EC3: \u7968."
  },
  {
    "id": "pdf_017",
    "hanzi": "\u6D17",
    "pinyin": "x\u01D0",
    "hanViet": "T\u1EA9y",
    "vietnamese": "R\u1EEDa, gi\u1EB7t, g\u1ED9i",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Sinh ho\u1EA1t h\xE0ng ng\xE0y",
    "radical": "\u6C35 (Ba ch\u1EA5m th\u1EE7y)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u996D\u524D\u8BF7\u5148\u6D17\u624B\u3002",
        "pinyin": "F\xE0n qi\xE1n q\u01D0ng xi\u0101n x\u01D0 sh\u01D2u.",
        "vi": "Tr\u01B0\u1EDBc khi \u0103n c\u01A1m xin h\xE3y r\u1EEDa tay tr\u01B0\u1EDBc."
      },
      {
        "zh": "\u4ECA\u5929\u5929\u6C14\u597D\uFF0C\u6211\u628A\u8863\u670D\u6D17\u4E86\u3002",
        "pinyin": "J\u012Bnti\u0101n ti\u0101nq\xEC h\u01CEo, w\u01D2 b\u01CE y\u012Bfu x\u01D0 le.",
        "vi": "H\xF4m nay tr\u1EDDi \u0111\u1EB9p, t\xF4i \u0111\xE3 gi\u1EB7t qu\u1EA7n \xE1o r\u1ED3i."
      }
    ],
    "tips": "B\u1ED9 Th\u1EE7y (\u6C35) l\xE0 n\u01B0\u1EDBc t\u1EA9y r\u1EEDa + Ti\xEAn (\u5148). R\u1EEDa s\u1EA1ch tr\u01B0\u1EDBc ti\xEAn. Ph\u1ED3n th\u1EC3: \u6D17."
  },
  {
    "id": "pdf_018",
    "hanzi": "\u65D7\u888D",
    "pinyin": "q\xEDp\xE1o",
    "hanViet": "K\u1EF3 B\xE0o",
    "vietnamese": "S\u01B0\u1EDDn x\xE1m (\xE1o d\xE0i truy\u1EC1n th\u1ED1ng ph\u1EE5 n\u1EEF Trung Qu\u1ED1c)",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 3,
    "category": "Trang ph\u1EE5c & V\u0103n h\xF3a",
    "radical": "\u65B9 (Ph\u01B0\u01A1ng) + \u8864 (\xC1o)",
    "strokeCount": 24,
    "examples": [
      {
        "zh": "\u5979\u7A7F\u8FD9\u4EF6\u7EA2\u8272\u65D7\u888D\u771F\u597D\u770B\u3002",
        "pinyin": "T\u0101 chu\u0101n zh\xE8 ji\xE0n h\xF3ngs\xE8 q\xEDp\xE1o zh\u0113n h\u01CEok\xE0n.",
        "vi": "C\xF4 \u1EA5y m\u1EB7c chi\u1EBFc s\u01B0\u1EDDn x\xE1m \u0111\u1ECF n\xE0y tr\xF4ng th\u1EADt \u0111\u1EB9p."
      },
      {
        "zh": "\u65D7\u888D\u662F\u4E2D\u56FD\u7684\u4F20\u7EDF\u670D\u88C5\u3002",
        "pinyin": "Q\xEDp\xE1o sh\xEC Zh\u014Dnggu\xF3 de chu\xE1nt\u01D2ng f\xFAzhu\u0101ng.",
        "vi": "S\u01B0\u1EDDn x\xE1m l\xE0 trang ph\u1EE5c truy\u1EC1n th\u1ED1ng c\u1EE7a Trung Qu\u1ED1c."
      }
    ],
    "tips": "\u201C\u65D7\u201D ng\u1ECDn c\u1EDD B\xE1t K\u1EF3 th\u1EDDi M\xE3n Thanh, \u201C\u888D\u201D \xE1o cho\xE0ng d\xE0i (b\u1ED9 Y \u8864). S\u01B0\u1EDDn x\xE1m xu\u1EA5t x\u1EE9 t\u1EEB y ph\u1EE5c ng\u01B0\u1EDDi B\xE1t K\u1EF3. Ph\u1ED3n th\u1EC3: \u65D7\u888D."
  },
  {
    "id": "pdf_019",
    "hanzi": "\u8BD5",
    "pinyin": "sh\xEC",
    "hanViet": "Th\xED",
    "vietnamese": "Th\u1EED, l\xE0m th\u1EED, thi c\u1EED",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u6211\u53EF\u4EE5\u8BD5\u4E00\u4E0B\u8FD9\u4EF6\u8863\u670D\u5417\uFF1F",
        "pinyin": "W\u01D2 k\u011By\u01D0 sh\xEC y\xEDxi\xE0 zh\xE8 ji\xE0n y\u012Bfu ma?",
        "vi": "T\xF4i c\xF3 th\u1EC3 m\u1EB7c th\u1EED chi\u1EBFc \xE1o n\xE0y kh\xF4ng?"
      },
      {
        "zh": "\u522B\u5BB3\u6015\uFF0C\u8BD5\u4E00\u8BD5\u5427\uFF01",
        "pinyin": "Bi\xE9 h\xE0ip\xE0, sh\xEC y\xED sh\xEC ba!",
        "vi": "\u0110\u1EEBng s\u1EE3, h\xE3y th\u1EED m\u1ED9t l\u1EA7n xem!"
      }
    ],
    "tips": "B\u1ED9 Ng\xF4n (\u8BA0) l\u1EDDi n\xF3i th\u0103m d\xF2 k\u1EBFt h\u1EE3p Th\u1EE9c (\u5F0F) quy c\xE1ch chu\u1EA9n m\u1EF1c. Ph\u1ED3n th\u1EC3: \u8A66."
  },
  {
    "id": "pdf_020",
    "hanzi": "\u4FBF\u5B9C",
    "pinyin": "pi\xE1nyi",
    "hanViet": "Ti\u1EC7n Nghi",
    "vietnamese": "R\u1EBB, gi\xE1 c\u1EA3 ph\u1EA3i ch\u0103ng",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 2,
    "category": "Mua s\u1EAFm & Gi\xE1 c\u1EA3",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u5B80 (Mi\xEAn)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u8FD9\u5BB6\u8D85\u5E02\u7684\u6C34\u679C\u5F88\u4FBF\u5B9C\u3002",
        "pinyin": "Zh\xE8 ji\u0101 ch\u0101osh\xEC de shu\u01D0gu\u01D2 h\u011Bn pi\xE1nyi.",
        "vi": "Hoa qu\u1EA3 \u1EDF si\xEAu th\u1ECB n\xE0y r\u1EA5t r\u1EBB."
      },
      {
        "zh": "\u80FD\u4FBF\u5B9C\u4E00\u70B9\u513F\u5417\uFF1F",
        "pinyin": "N\xE9ng pi\xE1nyi y\xECdi\u01CEnr ma?",
        "vi": "C\xF3 th\u1EC3 b\u1EDBt r\u1EBB h\u01A1n m\u1ED9t ch\xFAt \u0111\u01B0\u1EE3c kh\xF4ng?"
      }
    ],
    "tips": "\u201C\u4FBF\u201D ti\u1EC7n l\u1EE3i v\u1EEBa t\xFAi ti\u1EC1n, \u201C\u5B9C\u201D th\xEDch h\u1EE3p th\u1ECFa \u0111\xE1ng. R\u1EBB m\xE0 ti\u1EC7n \xEDch. Ph\u1ED3n th\u1EC3: \u4FBF\u5B9C."
  },
  {
    "id": "pdf_021",
    "hanzi": "\u6253\u7535\u8BDD",
    "pinyin": "d\u01CE di\xE0nhu\xE0",
    "hanViet": "\u0110\u1EA3 \u0110i\u1EC7n Tho\u1EA1i",
    "vietnamese": "G\u1ECDi \u0111i\u1EC7n tho\u1EA1i",
    "partOfSpeech": "C\u1EE5m \u0111\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Giao ti\u1EBFp li\xEAn l\u1EA1c",
    "radical": "\u624C (Th\u1EE7) + \u8BA0 (Ng\xF4n)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u5230\u4E86\u8BB0\u5F97\u7ED9\u6211\u6253\u7535\u8BDD\u3002",
        "pinyin": "D\xE0o le j\xECde g\u011Bi w\u01D2 d\u01CE di\xE0nhu\xE0.",
        "vi": "\u0110\u1EBFn n\u01A1i nh\u1EDB g\u1ECDi \u0111i\u1EC7n tho\u1EA1i cho t\xF4i nh\xE9."
      },
      {
        "zh": "\u4ED6\u6B63\u5728\u7ED9\u5988\u5988\u6253\u7535\u8BDD\u3002",
        "pinyin": "T\u0101 zh\xE8ngz\xE0i g\u011Bi m\u0101ma d\u01CE di\xE0nhu\xE0.",
        "vi": "Anh \u1EA5y \u0111ang g\u1ECDi \u0111i\u1EC7n tho\u1EA1i cho m\u1EB9."
      }
    ],
    "tips": "\u201C\u6253\u201D thao t\xE1c b\u1EA5m s\u1ED1 b\u1EB1ng tay, \u201C\u7535\u8BDD\u201D truy\u1EC1n \xE2m b\u1EB1ng s\xF3ng \u0111i\u1EC7n. Ph\u1ED3n th\u1EC3: \u6253\u96FB\u8A71."
  },
  {
    "id": "pdf_022",
    "hanzi": "\u5BF9\u4E0D\u8D77",
    "pinyin": "du\xECbuq\u01D0",
    "hanViet": "\u0110\u1ED1i B\u1EA5t Kh\u1EDFi",
    "vietnamese": "Xin l\u1ED7i",
    "partOfSpeech": "C\u1EE5m t\u1EEB x\xE3 giao",
    "level": 1,
    "category": "Ch\xE0o h\u1ECFi & X\xE3 giao",
    "radical": "\u5BF8 (Th\u1ED1n) + \u8D70 (T\u1EA9u)",
    "strokeCount": 19,
    "examples": [
      {
        "zh": "\u5BF9\u4E0D\u8D77\uFF0C\u6211\u8FDF\u5230\u4E86\u3002",
        "pinyin": "Du\xECbuq\u01D0, w\u01D2 ch\xEDd\xE0o le.",
        "vi": "Xin l\u1ED7i, t\xF4i \u0111\u1EBFn mu\u1ED9n m\u1EA5t r\u1ED3i."
      },
      {
        "zh": "\u6CA1\u5173\u7CFB\uFF0C\u8BF7\u8FDB\uFF01",
        "pinyin": "M\xE9i gu\u0101nxi, q\u01D0ng j\xECn!",
        "vi": "Kh\xF4ng sao \u0111\xE2u, xin m\u1EDDi v\xE0o!"
      }
    ],
    "tips": "\u201C\u5BF9\u201D \u0111\u1ED1i di\u1EC7n, \u201C\u4E0D\u8D77\u201D kh\xF4ng ng\u1EA9ng \u0111\u1EA7u l\xEAn n\u1ED5i v\xEC h\u1ED5 th\u1EB9n. L\u1EDDi t\u1EA1 l\u1ED7i ch\xE2n th\xE0nh. Ph\u1ED3n th\u1EC3: \u5C0D\u4E0D\u8D77."
  },
  {
    "id": "pdf_023",
    "hanzi": "\u996D\u5E97",
    "pinyin": "f\xE0ndi\xE0n",
    "hanViet": "Ph\u1EA1n \u0110i\u1EBFm",
    "vietnamese": "Kh\xE1ch s\u1EA1n, nh\xE0 h\xE0ng, qu\xE1n \u0103n",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ECBa \u0111i\u1EC3m",
    "radical": "\u9963 (Th\u1EF1c) + \u5E7F (Qu\u1EA3ng)",
    "strokeCount": 15,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u5728\u5B66\u6821\u5BF9\u9762\u7684\u996D\u5E97\u5403\u996D\u3002",
        "pinyin": "W\u01D2men z\xE0i xu\xE9xi\xE0o du\xECmi\xE0n de f\xE0ndi\xE0n ch\u012Bf\xE0n.",
        "vi": "Ch\xFAng t\xF4i \u0103n c\u01A1m \u1EDF qu\xE1n \u0103n \u0111\u1ED1i di\u1EC7n tr\u01B0\u1EDDng h\u1ECDc."
      },
      {
        "zh": "\u8FD9\u5BB6\u996D\u5E97\u7684\u670D\u52A1\u5F88\u597D\u3002",
        "pinyin": "Zh\xE8 ji\u0101 f\xE0ndi\xE0n de f\xFAw\xF9 h\u011Bn h\u01CEo.",
        "vi": "D\u1ECBch v\u1EE5 c\u1EE7a kh\xE1ch s\u1EA1n n\xE0y r\u1EA5t t\u1ED1t."
      }
    ],
    "tips": "\u201C\u996D\u201D c\u01A1m (b\u1ED9 Th\u1EF1c \u9963), \u201C\u5E97\u201D ti\u1EC7m qu\xE1n d\u01B0\u1EDBi m\xE1i nh\xE0 (b\u1ED9 Qu\u1EA3ng \u5E7F). Ph\u1ED3n th\u1EC3: \u98EF\u5E97."
  },
  {
    "id": "pdf_024",
    "hanzi": "\u5206\u949F",
    "pinyin": "f\u0113nzh\u014Dng",
    "hanViet": "Ph\xE2n Chung",
    "vietnamese": "Ph\xFAt (\u0111\u01A1n v\u1ECB th\u1EDDi gian)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian",
    "radical": "\u5200 (\u0110ao) + \u9485 (Kim)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u8BF7\u7A0D\u7B49\u6211\u4E94\u5206\u949F\u3002",
        "pinyin": "Q\u01D0ng sh\u0101o d\u011Bng w\u01D2 w\u01D4 f\u0113nzh\u014Dng.",
        "vi": "Xin \u0111\u1EE3i t\xF4i n\u0103m ph\xFAt."
      },
      {
        "zh": "\u4ECE\u8FD9\u91CC\u5230\u5730\u94C1\u7AD9\u8D70\u8DEF\u8981\u5341\u5206\u949F\u3002",
        "pinyin": "C\xF3ng zh\xE8l\u01D0 d\xE0o d\xECti\u011Bzh\xE0n z\u01D2ul\xF9 y\xE0o sh\xED f\u0113nzh\u014Dng.",
        "vi": "\u0110i b\u1ED9 t\u1EEB \u0111\xE2y \u0111\u1EBFn ga t\xE0u \u0111i\u1EC7n ng\u1EA7m m\u1EA5t m\u01B0\u1EDDi ph\xFAt."
      }
    ],
    "tips": "\u201C\u5206\u201D chia nh\u1ECF gi\u1ECDt th\u1EDDi gian, \u201C\u949F\u201D chi\u1EBFc chu\xF4ng/\u0111\u1ED3ng h\u1ED3 kim lo\u1EA1i (b\u1ED9 Kim \u9485). Ph\u1ED3n th\u1EC3: \u5206\u9418."
  },
  {
    "id": "pdf_025",
    "hanzi": "\u548C",
    "pinyin": "h\xE9",
    "hanViet": "H\xF2a",
    "vietnamese": "V\xE0, v\u1EDBi, c\xF9ng",
    "partOfSpeech": "Li\xEAn t\u1EEB / Gi\u1EDBi t\u1EEB",
    "level": 1,
    "category": "Ng\u1EEF ph\xE1p li\xEAn k\u1EBFt",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u6211\u548C\u4ED6\u662F\u597D\u670B\u53CB\u3002",
        "pinyin": "W\u01D2 h\xE9 t\u0101 sh\xEC h\u01CEo p\xE9ngyou.",
        "vi": "T\xF4i v\xE0 anh \u1EA5y l\xE0 b\u1EA1n t\u1ED1t."
      },
      {
        "zh": "\u7238\u7238\u548C\u5988\u5988\u90FD\u53BB\u5DE5\u4F5C\u4E86\u3002",
        "pinyin": "B\xE0ba h\xE9 m\u0101ma d\u014Du q\xF9 g\u014Dngzu\xF2 le.",
        "vi": "C\u1EA3 b\u1ED1 v\xE0 m\u1EB9 \u0111\u1EC1u \u0111i l\xE0m r\u1ED3i."
      }
    ],
    "tips": "C\xE2y l\xFAa (H\xF2a \u79BE) b\xEAn mi\u1EC7ng \u0103n (Kh\u1EA9u \u53E3), l\u01B0\u01A1ng th\u1EF1c d\u1ED3i d\xE0o th\xEC thi\xEAn h\u1EA1 th\xE1i b\xECnh h\xF2a m\u1EE5c. Ph\u1ED3n th\u1EC3: \u548C."
  },
  {
    "id": "pdf_026",
    "hanzi": "\u770B\u89C1",
    "pinyin": "k\xE0nji\xE0n",
    "hanViet": "Kh\xE1n Ki\u1EBFn",
    "vietnamese": "Nh\xECn th\u1EA5y, tr\xF4ng th\u1EA5y",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "Gi\xE1c quan & H\xE0nh \u0111\u1ED9ng",
    "radical": "\u76EE (M\u1EE5c) + \u89C1 (Ki\u1EBFn)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u4F60\u770B\u89C1\u6211\u7684\u624B\u673A\u4E86\u5417\uFF1F",
        "pinyin": "N\u01D0 k\xE0nji\xE0n w\u01D2 de sh\u01D2uj\u012B le ma?",
        "vi": "B\u1EA1n c\xF3 nh\xECn th\u1EA5y \u0111i\u1EC7n tho\u1EA1i c\u1EE7a t\xF4i \u0111\xE2u kh\xF4ng?"
      },
      {
        "zh": "\u6211\u5728\u95E8\u53E3\u770B\u89C1\u4E86\u4ED6\u3002",
        "pinyin": "W\u01D2 z\xE0i m\xE9nk\u01D2u k\xE0nji\xE0n le t\u0101.",
        "vi": "T\xF4i tr\xF4ng th\u1EA5y anh \u1EA5y \u1EDF ngo\xE0i c\u1EEDa."
      }
    ],
    "tips": "\u201C\u770B\u201D l\u1EA5y tay che m\u1EAFt ng\xF3 tr\xF4ng, \u201C\u89C1\u201D \u0111\xF4i m\u1EAFt tr\xF4ng th\u1EA5y r\xF5 r\xE0ng. Ph\u1ED3n th\u1EC3: \u770B\u898B."
  },
  {
    "id": "pdf_027",
    "hanzi": "\u51B7",
    "pinyin": "l\u011Bng",
    "hanViet": "L\xE3nh",
    "vietnamese": "L\u1EA1nh, r\xE9t bu\u1ED1t",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 1,
    "category": "Th\u1EDDi ti\u1EBFt",
    "radical": "\u51AB (B\u0103ng)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u5916\u9762\u5F88\u51B7\uFF0C\u591A\u7A7F\u70B9\u8863\u670D\u3002",
        "pinyin": "J\u012Bnti\u0101n w\xE0imian h\u011Bn l\u011Bng, du\u014D chu\u0101n di\u01CEn y\u012Bfu.",
        "vi": "H\xF4m nay b\xEAn ngo\xE0i r\u1EA5t l\u1EA1nh, m\u1EB7c th\xEAm qu\u1EA7n \xE1o v\xE0o nh\xE9."
      },
      {
        "zh": "\u6211\u4E0D\u559C\u6B22\u51AC\u5929\uFF0C\u56E0\u4E3A\u592A\u51B7\u4E86\u3002",
        "pinyin": "W\u01D2 b\xF9 x\u01D0huan d\u014Dngti\u0101n, y\u012Bnw\xE8i t\xE0i l\u011Bng le.",
        "vi": "T\xF4i kh\xF4ng th\xEDch m\xF9a \u0111\xF4ng v\xEC l\u1EA1nh qu\xE1."
      }
    ],
    "tips": "B\u1ED9 B\u0103ng (\u51AB) bi\u1EC3u th\u1ECB b\u0103ng tuy\u1EBFt bu\u1ED1t gi\xE1 b\xEAn c\u1EA1nh L\u1EC7nh (\u4EE4). Ph\u1ED3n th\u1EC3: \u51B7."
  },
  {
    "id": "pdf_028",
    "hanzi": "\u732B",
    "pinyin": "m\u0101o",
    "hanViet": "Mi\xEAu",
    "vietnamese": "Con m\xE8o",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED9ng v\u1EADt",
    "radical": "\u72AD (Khuy\u1EC3n)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u8FD9\u53EA\u5C0F\u767D\u732B\u771F\u53EF\u7231\uFF01",
        "pinyin": "Zh\xE8 zh\u012B xi\u01CEo b\xE1i m\u0101o zh\u0113n k\u011B'\xE0i!",
        "vi": "Ch\xFA m\xE8o con m\xE0u tr\u1EAFng n\xE0y d\u1EC5 th\u01B0\u01A1ng th\u1EADt!"
      },
      {
        "zh": "\u6211\u5BB6\u517B\u4E86\u4E00\u53EA\u732B\u548C\u4E24\u53EA\u72D7\u3002",
        "pinyin": "W\u01D2 ji\u0101 y\u01CEng le y\xEC zh\u012B m\u0101o h\xE9 li\u01CEng zh\u012B g\u01D2u.",
        "vi": "Nh\xE0 t\xF4i nu\xF4i m\u1ED9t con m\xE8o v\xE0 hai ch\xFA ch\xF3."
      }
    ],
    "tips": "B\u1ED9 Khuy\u1EC3n (\u72AD) ch\u1EC9 lo\xE0i th\xFA b\u1ED1n ch\xE2n, b\xEAn ph\u1EA3i l\xE0 Mi\xEAu (\u82D7) m\xF4 ph\u1ECFng ti\u1EBFng k\xEAu \u201Cmeo meo\u201D. Ph\u1ED3n th\u1EC3: \u8C93."
  },
  {
    "id": "pdf_029",
    "hanzi": "\u5546\u5E97",
    "pinyin": "sh\u0101ngdi\xE0n",
    "hanViet": "Th\u01B0\u01A1ng \u0110i\u1EBFm",
    "vietnamese": "C\u1EEDa h\xE0ng, ti\u1EC7m bu\xF4n",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ECBa \u0111i\u1EC3m & Mua s\u1EAFm",
    "radical": "\u53E3 (Kh\u1EA9u) + \u5E7F (Qu\u1EA3ng)",
    "strokeCount": 19,
    "examples": [
      {
        "zh": "\u5B66\u6821\u9644\u8FD1\u6709\u4E00\u5BB6\u6587\u5177\u5546\u5E97\u3002",
        "pinyin": "Xu\xE9xi\xE0o f\xF9j\xECn y\u01D2u y\xEC ji\u0101 w\xE9nj\xF9 sh\u0101ngdi\xE0n.",
        "vi": "G\u1EA7n tr\u01B0\u1EDDng h\u1ECDc c\xF3 m\u1ED9t c\u1EEDa h\xE0ng v\u0103n ph\xF2ng ph\u1EA9m."
      },
      {
        "zh": "\u6211\u53BB\u5546\u5E97\u4E70\u70B9\u4E1C\u897F\u3002",
        "pinyin": "W\u01D2 q\xF9 sh\u0101ngdi\xE0n m\u01CEi di\u01CEn d\u014Dngxi.",
        "vi": "T\xF4i \u0111i c\u1EEDa h\xE0ng mua m\u1ED9t \xEDt \u0111\u1ED3."
      }
    ],
    "tips": "\u201C\u5546\u201D bu\xF4n b\xE1n trao \u0111\u1ED5i, \u201C\u5E97\u201D n\u01A1i m\u1EDF qu\u1EA7y kinh doanh. Ph\u1ED3n th\u1EC3: \u5546\u5E97."
  },
  {
    "id": "pdf_030",
    "hanzi": "\u6C34\u679C",
    "pinyin": "shu\u01D0gu\u01D2",
    "hanViet": "Th\u1EE7y Qu\u1EA3",
    "vietnamese": "Hoa qu\u1EA3, tr\xE1i c\xE2y",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c",
    "radical": "\u6C34 (Th\u1EE7y) + \u6728 (M\u1ED9c)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u591A\u5403\u65B0\u9C9C\u6C34\u679C\u5BF9\u8EAB\u4F53\u597D\u3002",
        "pinyin": "Du\u014D ch\u012B x\u012Bnxi\u0101n shu\u01D0gu\u01D2 du\xEC sh\u0113nt\u01D0 h\u01CEo.",
        "vi": "\u0102n nhi\u1EC1u hoa qu\u1EA3 t\u01B0\u01A1i r\u1EA5t t\u1ED1t cho s\u1EE9c kh\u1ECFe."
      },
      {
        "zh": "\u4F60\u6700\u559C\u6B22\u5403\u4EC0\u4E48\u6C34\u679C\uFF1F",
        "pinyin": "N\u01D0 zu\xEC x\u01D0huan ch\u012B sh\xE9nme shu\u01D0gu\u01D2?",
        "vi": "B\u1EA1n th\xEDch \u0103n lo\u1EA1i tr\xE1i c\xE2y n\xE0o nh\u1EA5t?"
      }
    ],
    "tips": "Tr\xE1i c\xE2y m\u1ECDng n\u01B0\u1EDBc (Th\u1EE7y \u6C34) m\u1ECDc tr\u0129u c\xE0nh tr\xEAn ng\u1ECDn c\xE2y (Qu\u1EA3 \u679C). Ph\u1ED3n th\u1EC3: \u6C34\u679C."
  },
  {
    "id": "pdf_031",
    "hanzi": "\u4E0B\u96E8",
    "pinyin": "xi\xE0y\u01D4",
    "hanViet": "H\u1EA1 V\u0169",
    "vietnamese": "Tr\u1EDDi m\u01B0a, \u0111\u1ED5 m\u01B0a",
    "partOfSpeech": "C\u1EE5m \u0111\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "Th\u1EDDi ti\u1EBFt",
    "radical": "\u4E00 (Nh\u1EA5t) + \u96E8 (V\u0169)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u5916\u9762\u4E0B\u96E8\u4E86\uFF0C\u51FA\u95E8\u8BB0\u5F97\u5E26\u4F1E\u3002",
        "pinyin": "W\xE0imian xi\xE0y\u01D4 le, ch\u016Bm\xE9n j\xECde d\xE0i s\u01CEn.",
        "vi": "B\xEAn ngo\xE0i \u0111ang m\u01B0a, ra ngo\xE0i nh\u1EDB mang \xF4 theo nh\xE9."
      },
      {
        "zh": "\u660E\u5929\u53EF\u80FD\u4F1A\u4E0B\u5927\u96E8\u3002",
        "pinyin": "M\xEDngti\u0101n k\u011Bn\xE9ng hu\xEC xi\xE0 d\xE0y\u01D4.",
        "vi": "Ng\xE0y mai c\xF3 th\u1EC3 s\u1EBD c\xF3 m\u01B0a to."
      }
    ],
    "tips": "\u201C\u4E0B\u201D r\u01A1i xu\u1ED1ng t\u1EEB tr\xEAn cao, \u201C\u96E8\u201D t\u1EEBng h\u1EA1t m\u01B0a r\u01A1i xu\u1ED1ng t\u1EEB b\u1EA7u tr\u1EDDi. Ph\u1ED3n th\u1EC3: \u4E0B\u96E8."
  },
  {
    "id": "pdf_032",
    "hanzi": "\u4F11\u606F",
    "pinyin": "xi\u016Bxi",
    "hanViet": "H\u01B0u T\u1EE9c",
    "vietnamese": "Ngh\u1EC9 ng\u01A1i",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Sinh ho\u1EA1t h\xE0ng ng\xE0y",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u5FC3 (T\xE2m)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u5DE5\u4F5C\u7D2F\u4E86\u5C31\u4F11\u606F\u4E00\u4F1A\u513F\u5427\u3002",
        "pinyin": "G\u014Dngzu\xF2 l\xE8i le ji\xF9 xi\u016Bxi y\xEDhu\xECr ba.",
        "vi": "L\xE0m vi\u1EC7c m\u1EC7t r\u1ED3i th\xEC ngh\u1EC9 ng\u01A1i m\u1ED9t l\xE1t \u0111i."
      },
      {
        "zh": "\u533B\u751F\u8BA9\u6211\u591A\u5728\u5E8A\u4E0A\u4F11\u606F\u3002",
        "pinyin": "Y\u012Bsh\u0113ng r\xE0ng w\u01D2 du\u014D z\xE0i chu\xE1ng shang xi\u016Bxi.",
        "vi": "B\xE1c s\u0129 b\u1EA3o t\xF4i ngh\u1EC9 ng\u01A1i nhi\u1EC1u tr\xEAn gi\u01B0\u1EDDng."
      }
    ],
    "tips": "\u201C\u4F11\u201D ng\u01B0\u1EDDi (\u4EBB) d\u1EF1a l\u01B0ng v\xE0o g\u1ED1c c\xE2y (\u6728) ngh\u1EC9 m\xE1t; \u201C\u606F\u201D h\u01A1i th\u1EDF t\u0129nh l\u1EB7ng ph\xE1t ra t\u1EEB \u0111\xE1y l\xF2ng (\u5FC3). Ph\u1ED3n th\u1EC3: \u4F11\u606F."
  },
  {
    "id": "pdf_033",
    "hanzi": "\u81EA\u884C\u8F66",
    "pinyin": "z\xECx\xEDngch\u0113",
    "hanViet": "T\u1EF1 H\xE0nh Xa",
    "vietnamese": "Xe \u0111\u1EA1p",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng ti\u1EC7n giao th\xF4ng",
    "radical": "\u81EA (T\u1EF1) + \u8F66 (Xa)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u6211\u6BCF\u5929\u9A91\u81EA\u884C\u8F66\u53BB\u4E0A\u5B66\u3002",
        "pinyin": "W\u01D2 m\u011Biti\u0101n q\xED z\xECx\xEDngch\u0113 q\xF9 sh\xE0ngxu\xE9.",
        "vi": "T\xF4i c\u01B0\u1EE1i xe \u0111\u1EA1p \u0111i h\u1ECDc m\u1ED7i ng\xE0y."
      },
      {
        "zh": "\u4ED6\u7684\u65B0\u81EA\u884C\u8F66\u975E\u5E38\u6F02\u4EAE\u3002",
        "pinyin": "T\u0101 de x\u012Bn z\xECx\xEDngch\u0113 f\u0113ich\xE1ng pi\xE0oliang.",
        "vi": "Chi\u1EBFc xe \u0111\u1EA1p m\u1EDBi c\u1EE7a anh \u1EA5y r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "Chi\u1EBFc xe (\u8F66) t\u1EF1 m\xECnh (\u81EA) d\xF9ng s\u1EE9c ch\xE2n chuy\u1EC3n b\xE1nh v\u1EADn h\xE0nh (\u884C). Ph\u1ED3n th\u1EC3: \u81EA\u884C\u8ECA."
  },
  {
    "id": "pdf_034",
    "hanzi": "\u9762\u6761",
    "pinyin": "mi\xE0nti\xE1o",
    "hanViet": "Di\u1EC7n \u0110i\u1EC1u",
    "vietnamese": "M\xEC, s\u1EE3i m\xEC",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c",
    "radical": "\u9762 (Di\u1EC7n) + \u6728 (M\u1ED9c)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u4E2D\u5348\u6211\u60F3\u5403\u4E00\u7897\u725B\u8089\u9762\u6761\u3002",
        "pinyin": "Zh\u014Dngw\u01D4 w\u01D2 xi\u01CEng ch\u012B y\xEC w\u01CEn ni\xFAr\xF2u mi\xE0nti\xE1o.",
        "vi": "Tr\u01B0a nay t\xF4i mu\u1ED1n \u0103n m\u1ED9t b\xE1t m\xEC b\xF2."
      },
      {
        "zh": "\u4E2D\u56FD\u4EBA\u751F\u65E5\u65F6\u7ECF\u5E38\u5403\u957F\u5BFF\u9762\u3002",
        "pinyin": "Zh\u014Dnggu\xF3r\xE9n sh\u0113ngr\xEC sh\xED j\u012Bngch\xE1ng ch\u012B ch\xE1ngsh\xF2umi\xE0n.",
        "vi": "Ng\u01B0\u1EDDi Trung Qu\u1ED1c v\xE0o ng\xE0y sinh nh\u1EADt th\u01B0\u1EDDng \u0103n m\xEC tr\u01B0\u1EDDng th\u1ECD."
      }
    ],
    "tips": "\u201C\u9762\u201D b\u1ED9t m\xEC nh\xE0o m\u1ECBn, \u201C\u6761\u201D s\u1EE3i d\xE0i thon m\u1EA3nh. Ph\u1ED3n th\u1EC3: \u9EB5\u689D."
  },
  {
    "id": "pdf_035",
    "hanzi": "\u6E38\u6CF3",
    "pinyin": "y\xF3uy\u01D2ng",
    "hanViet": "Du V\u1ECBnh",
    "vietnamese": "B\u01A1i l\u1ED9i",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Th\u1EC3 thao & Ho\u1EA1t \u0111\u1ED9ng",
    "radical": "\u6C35 (Ba ch\u1EA5m th\u1EE7y)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u590F\u5929\u53BB\u6D77\u8FB9\u6E38\u6CF3\u975E\u5E38\u8212\u670D\u3002",
        "pinyin": "Xi\xE0ti\u0101n q\xF9 h\u01CEibi\u0101n y\xF3uy\u01D2ng f\u0113ich\xE1ng sh\u016Bfu.",
        "vi": "M\xF9a h\xE8 \u0111i ra b\u1EDD bi\u1EC3n b\u01A1i r\u1EA5t s\u1EA3ng kho\xE1i."
      },
      {
        "zh": "\u4F60\u4F1A\u6E38\u6CF3\u5417\uFF1F",
        "pinyin": "N\u01D0 hu\xEC y\xF3uy\u01D2ng ma?",
        "vi": "B\u1EA1n bi\u1EBFt b\u01A1i kh\xF4ng?"
      }
    ],
    "tips": "C\u1EA3 hai ch\u1EEF \u0111\u1EC1u mang b\u1ED9 Ba ch\u1EA5m th\u1EE7y (\u6C35) bi\u1EC3u th\u1ECB ho\u1EA1t \u0111\u1ED9ng v\u1EABy v\xF9ng d\u01B0\u1EDBi l\xE0n n\u01B0\u1EDBc. Ph\u1ED3n th\u1EC3: \u6E38\u6CF3."
  },
  {
    "id": "pdf_036",
    "hanzi": "\u4ECB\u7ECD",
    "pinyin": "ji\xE8sh\xE0o",
    "hanViet": "Gi\u1EDBi Thi\u1EC7u",
    "vietnamese": "Gi\u1EDBi thi\u1EC7u",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "X\xE3 giao & Giao ti\u1EBFp",
    "radical": "\u4EBA (Nh\xE2n) + \u7E9F (M\u1ECBch)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u6211\u6765\u7ED9\u5927\u5BB6\u4ECB\u7ECD\u4E00\u4E0B\u65B0\u540C\u4E8B\u3002",
        "pinyin": "W\u01D2 l\xE1i g\u011Bi d\xE0ji\u0101 ji\xE8sh\xE0o y\xEDxi\xE0 x\u012Bn t\xF3ngsh\xEC.",
        "vi": "T\xF4i xin gi\u1EDBi thi\u1EC7u v\u1EDBi m\u1ECDi ng\u01B0\u1EDDi m\u1ED9t ch\xFAt v\u1EC1 \u0111\u1ED3ng nghi\u1EC7p m\u1EDBi."
      },
      {
        "zh": "\u8BF7\u4ECB\u7ECD\u4E00\u4E0B\u4F60\u7684\u5BB6\u4E61\u3002",
        "pinyin": "Q\u01D0ng ji\xE8sh\xE0o y\xEDxi\xE0 n\u01D0 de ji\u0101xi\u0101ng.",
        "vi": "Xin h\xE3y gi\u1EDBi thi\u1EC7u m\u1ED9t ch\xFAt v\u1EC1 qu\xEA h\u01B0\u01A1ng c\u1EE7a b\u1EA1n."
      }
    ],
    "tips": "\u201C\u4ECB\u201D l\xE0 ng\u01B0\u1EDDi trung gian b\u1EAFc c\u1EA7u, \u201C\u7ECD\u201D s\u1EE3i t\u01A1 (\u7E9F) k\u1EBFt n\u1ED1i b\u1EA1n b\xE8 \u0111\xF4i b\xEAn. Ph\u1ED3n th\u1EC3: \u4ECB\u7D39."
  },
  {
    "id": "pdf_037",
    "hanzi": "\u61C2",
    "pinyin": "d\u01D2ng",
    "hanViet": "\u0110\u1ED5ng",
    "vietnamese": "Hi\u1EC3u, th\u1EA5u hi\u1EC3u, bi\u1EBFt",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Nh\u1EADn th\u1EE9c & Tr\xED tu\u1EC7",
    "radical": "\u5FC4 (T\xE2m \u0111\u1EE9ng)",
    "strokeCount": 15,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u95EE\u9898\u4F60\u542C\u61C2\u4E86\u5417\uFF1F",
        "pinyin": "Zh\xE8 ge w\xE8nt\xED n\u01D0 t\u012Bng d\u01D2ng le ma?",
        "vi": "C\xE2u h\u1ECFi n\xE0y b\u1EA1n nghe \u0111\xE3 hi\u1EC3u ch\u01B0a?"
      },
      {
        "zh": "\u6211\u61C2\u4ED6\u7684\u610F\u601D\u3002",
        "pinyin": "W\u01D2 d\u01D2ng t\u0101 de y\xECsi.",
        "vi": "T\xF4i hi\u1EC3u \xFD t\u1EE9 c\u1EE7a anh \u1EA5y."
      }
    ],
    "tips": "B\u1ED9 T\xE2m \u0111\u1EE9ng (\u5FC4) suy ngh\u0129 trong l\xF2ng k\u1EBFt h\u1EE3p v\u1EDBi ch\u1EEF \u0110\u1ED5ng (\u8463) minh b\u1EA1ch. Ph\u1ED3n th\u1EC3: \u61C2."
  },
  {
    "id": "pdf_038",
    "hanzi": "\u8F66\u7AD9",
    "pinyin": "ch\u0113zh\xE0n",
    "hanViet": "Xa Tr\u1EA1m",
    "vietnamese": "B\u1EBFn xe, nh\xE0 ga xe",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Giao th\xF4ng & \u0110\u1ECBa \u0111i\u1EC3m",
    "radical": "\u8F66 (Xa) + \u7ACB (L\u1EADp)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u6211\u5728\u516C\u5171\u6C7D\u8F66\u8F66\u7AD9\u7B49\u4F60\u3002",
        "pinyin": "W\u01D2 z\xE0i g\u014Dngg\xF2ng q\xECch\u0113 ch\u0113zh\xE0n d\u011Bng n\u01D0.",
        "vi": "T\xF4i \u0111\u1EE9ng \u1EDF tr\u1EA1m xe bu\xFDt \u0111\u1EE3i b\u1EA1n."
      },
      {
        "zh": "\u53BB\u706B\u8F66\u7AD9\u9700\u8981\u534A\u4E2A\u5C0F\u65F6\u3002",
        "pinyin": "Q\xF9 hu\u01D2ch\u0113zh\xE0n x\u016By\xE0o b\xE0n g\xE8 xi\u01CEosh\xED.",
        "vi": "\u0110\u1EBFn nh\xE0 ga xe l\u1EEDa c\u1EA7n n\u1EEDa ti\u1EBFng."
      }
    ],
    "tips": "\u201C\u8F66\u201D xe c\u1ED9, \u201C\u7AD9\u201D n\u01A1i \u0111\u1EE9ng ch\xE2n d\u1EEBng l\u1EA1i (b\u1ED9 L\u1EADp \u7ACB) \u0111\xF3n tr\u1EA3 kh\xE1ch. Ph\u1ED3n th\u1EC3: \u8ECA\u7AD9."
  },
  {
    "id": "pdf_039",
    "hanzi": "\u4E00\u8D77",
    "pinyin": "y\xECq\u01D0",
    "hanViet": "Nh\u1EA5t Kh\u1EDFi",
    "vietnamese": "C\xF9ng nhau, c\xF9ng m\u1ED9t n\u01A1i",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "M\u1ED1i quan h\u1EC7",
    "radical": "\u4E00 (Nh\u1EA5t) + \u8D70 (T\u1EA9u)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u4E00\u8D77\u53BB\u5403\u996D\u5427\uFF01",
        "pinyin": "W\u01D2men y\xECq\u01D0 q\xF9 ch\u012Bf\xE0n ba!",
        "vi": "Ch\xFAng ta c\xF9ng nhau \u0111i \u0103n c\u01A1m nh\xE9!"
      },
      {
        "zh": "\u4ED6\u4EEC\u5929\u5929\u5728\u4E00\u8D77\u5B66\u4E60\u3002",
        "pinyin": "T\u0101men ti\u0101nti\u0101n z\xE0i y\xECq\u01D0 xu\xE9x\xED.",
        "vi": "H\u1ECD ng\xE0y n\xE0o c\u0169ng c\xF9ng nhau h\u1ECDc t\u1EADp."
      }
    ],
    "tips": "\u201C\u4E00\u201D chung m\u1ED9t ch\xED h\u01B0\u1EDBng, \u201C\u8D77\u201D c\u1EA5t b\u01B0\u1EDBc \u0111\u1EE9ng l\xEAn (b\u1ED9 T\u1EA9u \u8D70). C\xF9ng \u0111\u1EE9ng d\u1EADy h\xE0nh \u0111\u1ED9ng. Ph\u1ED3n th\u1EC3: \u4E00\u8D77."
  },
  {
    "id": "pdf_040",
    "hanzi": "\u6BCF",
    "pinyin": "m\u011Bi",
    "hanViet": "M\u1ED7i",
    "vietnamese": "M\u1ED7i, t\u1EEBng",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB",
    "level": 2,
    "category": "S\u1ED1 l\u01B0\u1EE3ng & \u0110\u1EA1i t\u1EEB",
    "radical": "\u6BCD (M\u1EABu)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4ED6\u6BCF\u5929\u65E9\u4E0A\u90FD\u8DD1\u6B65\u3002",
        "pinyin": "T\u0101 m\u011Biti\u0101n z\u01CEoshang d\u014Du p\u01CEob\xF9.",
        "vi": "Anh \u1EA5y m\u1ED7i bu\u1ED5i s\xE1ng \u0111\u1EC1u ch\u1EA1y b\u1ED9."
      },
      {
        "zh": "\u8FD9\u91CC\u7684\u6BCF\u4E2A\u5B66\u751F\u90FD\u5F88\u6709\u793C\u8C8C\u3002",
        "pinyin": "Zh\xE8l\u01D0 de m\u011Bi g\xE8 xu\xE9sheng d\u014Du h\u011Bn y\u01D2u l\u01D0m\xE0o.",
        "vi": "M\u1ED7i m\u1ED9t h\u1ECDc sinh \u1EDF \u0111\xE2y \u0111\u1EC1u r\u1EA5t l\u1EC5 ph\xE9p."
      }
    ],
    "tips": "B\u1ED9 M\u1EABu (\u6BCD) ng\u01B0\u1EDDi m\u1EB9 sinh d\u01B0\u1EE1ng, nu\xF4i n\u1EA5ng ch\u0103m lo t\u1EEBng \u0111\u1EE9a con kh\xF4ng s\xF3t m\u1ED9t ai. Ph\u1ED3n th\u1EC3: \u6BCF."
  },
  {
    "id": "pdf_041",
    "hanzi": "\u897F\u5B89",
    "pinyin": "X\u012B'\u0101n",
    "hanViet": "T\xE2y An",
    "vietnamese": "Th\xE0nh ph\u1ED1 T\xE2y An (C\u1ED1 \u0111\xF4 Tr\u01B0\u1EDDng An)",
    "partOfSpeech": "Danh t\u1EEB ri\xEAng",
    "level": 3,
    "category": "\u0110\u1ECBa danh & L\u1ECBch s\u1EED",
    "radical": "\u897F (T\xE2y) + \u5B80 (Mi\xEAn)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u897F\u5B89\u662F\u8457\u540D\u7684\u5341\u4E09\u671D\u53E4\u90FD\u3002",
        "pinyin": "X\u012B'\u0101n sh\xEC zh\xF9m\xEDng de sh\xEDs\u0101n ch\xE1o g\u01D4d\u016B.",
        "vi": "T\xE2y An l\xE0 c\u1ED1 \u0111\xF4 m\u01B0\u1EDDi ba tri\u1EC1u \u0111\u1EA1i n\u1ED5i ti\u1EBFng."
      },
      {
        "zh": "\u6211\u60F3\u53BB\u897F\u5B89\u770B\u5175\u9A6C\u4FD1\u3002",
        "pinyin": "W\u01D2 xi\u01CEng q\xF9 X\u012B'\u0101n k\xE0n b\u012Bngm\u01CEy\u01D2ng.",
        "vi": "T\xF4i mu\u1ED1n \u0111\u1EBFn T\xE2y An \u0111\u1EC3 xem T\u01B0\u1EE3ng binh m\xE3 Binh M\xE3 D\u0169ng."
      }
    ],
    "tips": "\u201C\u897F\u201D ph\u01B0\u01A1ng T\xE2y, \u201C\u5B89\u201D b\xECnh an an \u0111\u1ECBnh d\u01B0\u1EDBi m\xE1i nh\xE0 (\u5B80). C\u1ED1 \u0111\xF4 ng\xE0n n\u0103m c\u1EE7a Trung Hoa. Ph\u1ED3n th\u1EC3: \u897F\u5B89."
  },
  {
    "id": "pdf_042",
    "hanzi": "\u6761",
    "pinyin": "ti\xE1o",
    "hanViet": "\u0110i\u1EC1u",
    "vietnamese": "Con, c\xE1i, chi\u1EBFc (l\u01B0\u1EE3ng t\u1EEB v\u1EADt d\xE0i nh\u01B0 c\xE1, qu\u1EA7n, s\xF4ng...)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB",
    "level": 2,
    "category": "L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u6728 (M\u1ED9c)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6CB3\u91CC\u6E38\u7740\u51E0\u6761\u5C0F\u9C7C\u3002",
        "pinyin": "H\xE9 l\u01D0 y\xF3u zhe j\u01D0 ti\xE1o xi\u01CEo y\xFA.",
        "vi": "D\u01B0\u1EDBi s\xF4ng \u0111ang b\u01A1i m\u1EA5y con c\xE1 nh\u1ECF."
      },
      {
        "zh": "\u5979\u4E70\u4E86\u4E00\u6761\u6F02\u4EAE\u7684\u88D9\u5B50\u3002",
        "pinyin": "T\u0101 m\u01CEi le y\xEC ti\xE1o pi\xE0oliang de q\xFAnzi.",
        "vi": "C\xF4 \u1EA5y mua m\u1ED9t chi\u1EBFc v\xE1y r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "B\u1ED9 M\u1ED9c (\u6728) c\xE0nh c\xE2y u\u1ED1n d\xE0i m\u1EC1m m\u1EA1i, d\xF9ng l\xE0m l\u01B0\u1EE3ng t\u1EEB cho nh\u1EEFng v\u1EADt thon d\xE0i. Ph\u1ED3n th\u1EC3: \u689D."
  },
  {
    "id": "pdf_043",
    "hanzi": "\u886C\u886B",
    "pinyin": "ch\xE8nsh\u0101n",
    "hanViet": "S\u1EA5n Sam",
    "vietnamese": "\xC1o s\u01A1 mi",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Trang ph\u1EE5c",
    "radical": "\u8864 (Y - \xC1o)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u8FD9\u4EF6\u767D\u886C\u886B\u5F88\u9002\u5408\u4F60\u3002",
        "pinyin": "Zh\xE8 ji\xE0n b\xE1i ch\xE8nsh\u0101n h\u011Bn sh\xECh\xE9 n\u01D0.",
        "vi": "Chi\u1EBFc \xE1o s\u01A1 mi tr\u1EAFng n\xE0y r\u1EA5t h\u1EE3p v\u1EDBi b\u1EA1n."
      },
      {
        "zh": "\u4E0A\u73ED\u8981\u7A7F\u6574\u9F50\u7684\u886C\u886B\u3002",
        "pinyin": "Sh\xE0ngb\u0101n y\xE0o chu\u0101n zh\u011Bngq\xED de ch\xE8nsh\u0101n.",
        "vi": "\u0110i l\xE0m ph\u1EA3i m\u1EB7c \xE1o s\u01A1 mi t\u1EC1 ch\u1EC9nh."
      }
    ],
    "tips": "C\u1EA3 hai ch\u1EEF \u0111\u1EC1u mang b\u1ED9 Y (\u8864) v\u1EA1t \xE1o che th\xE2n, d\u1EC7t may trang nh\xE3. Ph\u1ED3n th\u1EC3: \u896F\u886B."
  },
  {
    "id": "pdf_044",
    "hanzi": "\u91CD",
    "pinyin": "zh\xF2ng",
    "hanViet": "Tr\u1ECDng",
    "vietnamese": "N\u1EB7ng, nghi\xEAm tr\u1ECDng, quan tr\u1ECDng",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 2,
    "category": "T\xEDnh ch\u1EA5t & Tr\u1ECDng l\u01B0\u1EE3ng",
    "radical": "\u91CC (L\xFD)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u884C\u674E\u7BB1\u592A\u91CD\u4E86\uFF0C\u6211\u62FF\u4E0D\u52A8\u3002",
        "pinyin": "Zh\xE8 ge x\xEDnglixi\u0101ng t\xE0i zh\xF2ng le, w\u01D2 n\xE1 b\xFAd\xF2ng.",
        "vi": "Chi\u1EBFc vali n\xE0y n\u1EB7ng qu\xE1, t\xF4i x\xE1ch kh\xF4ng n\u1ED5i."
      },
      {
        "zh": "\u5065\u5EB7\u662F\u751F\u6D3B\u4E2D\u6700\u91CD\u8981\u7684\u4E8B\u60C5\u3002",
        "pinyin": "Ji\xE0nk\u0101ng sh\xEC sh\u0113nghu\xF3 zh\u014Dng zu\xEC zh\xF2ngy\xE0o de sh\xECqing.",
        "vi": "S\u1EE9c kh\u1ECFe l\xE0 \u0111i\u1EC1u quan tr\u1ECDng nh\u1EA5t trong cu\u1ED9c s\u1ED1ng."
      }
    ],
    "tips": "\u0110\u1EE9ng tr\xEAn m\u1EB7t \u0111\u1EA5t mang v\xE1c ng\xE0n d\u1EB7m (b\u1ED9 L\xFD \u91CC). Tr\u1ECDng = n\u1EB7ng tr\u0129u ng\xE0n c\xE2n. Ph\u1ED3n th\u1EC3: \u91CD."
  },
  {
    "id": "pdf_045",
    "hanzi": "\u5916\u9762",
    "pinyin": "w\xE0imian",
    "hanViet": "Ngo\u1EA1i Di\u1EC7n",
    "vietnamese": "B\xEAn ngo\xE0i, ph\xEDa ngo\xE0i",
    "partOfSpeech": "Danh t\u1EEB ch\u1EC9 ph\u01B0\u01A1ng v\u1ECB",
    "level": 1,
    "category": "V\u1ECB tr\xED & Ph\u01B0\u01A1ng h\u01B0\u1EDBng",
    "radical": "\u5915 (T\u1ECBch) + \u9762 (Di\u1EC7n)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u5916\u9762\u98CE\u5F88\u5927\uFF0C\u5FEB\u8FDB\u6765\u5427\u3002",
        "pinyin": "W\xE0imian f\u0113ng h\u011Bn d\xE0, ku\xE0i j\xECnl\xE1i ba.",
        "vi": "B\xEAn ngo\xE0i gi\xF3 to l\u1EAFm, mau v\xE0o trong \u0111i."
      },
      {
        "zh": "\u4ED6\u5728\u5916\u9762\u7B49\u4E86\u4F60\u5F88\u4E45\u3002",
        "pinyin": "T\u0101 z\xE0i w\xE0imian d\u011Bng le n\u01D0 h\u011Bn ji\u01D4.",
        "vi": "Anh \u1EA5y \u0111\u1EE3i b\u1EA1n \u1EDF b\xEAn ngo\xE0i r\u1EA5t l\xE2u r\u1ED3i."
      }
    ],
    "tips": "\u201C\u5916\u201D b\xF3ng chi\u1EC1u bu\xF4ng xu\u1ED1ng (T\u1ECBch \u5915) ph\xEDa ngo\xE0i c\u1EEDa, \u201C\u9762\u201D b\u1EC1 m\u1EB7t di\u1EC7n m\u1EA1o. Ph\u1ED3n th\u1EC3: \u5916\u9762."
  },
  {
    "id": "pdf_046",
    "hanzi": "\u9C7C",
    "pinyin": "y\xFA",
    "hanViet": "Ng\u01B0",
    "vietnamese": "Con c\xE1",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED9ng v\u1EADt & \u1EA8m th\u1EF1c",
    "radical": "\u9C7C (Ng\u01B0)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u732B\u6700\u559C\u6B22\u5403\u9C7C\u3002",
        "pinyin": "M\u0101o zu\xEC x\u01D0huan ch\u012B y\xFA.",
        "vi": "M\xE8o th\xEDch \u0103n c\xE1 nh\u1EA5t."
      },
      {
        "zh": "\u8FD9\u9053\u6E05\u84B8\u9C7C\u5473\u9053\u771F\u9C9C\u7F8E\uFF01",
        "pinyin": "Zh\xE8 d\xE0o q\u012Bngzh\u0113ng y\xFA w\xE8id\xE0o zh\u0113n xi\u0101nm\u011Bi!",
        "vi": "M\xF3n c\xE1 h\u1EA5p n\xE0y m\xF9i v\u1ECB th\u1EADt t\u01B0\u01A1i ngon!"
      }
    ],
    "tips": "Ch\u1EEF t\u01B0\u1EE3ng h\xECnh v\u1EBD l\u1EA1i h\xECnh d\u1EA1ng con c\xE1: \u0111\u1EA7u c\xE1 nh\u1ECDn, th\xE2n m\xECnh c\xF3 v\u1EA3y v\xE0 \u0111u\xF4i qu\u1EABy d\u01B0\u1EDBi n\u01B0\u1EDBc. Ph\u1ED3n th\u1EC3: \u9B5A."
  },
  {
    "id": "pdf_047",
    "hanzi": "\u4EF6",
    "pinyin": "ji\xE0n",
    "hanViet": "Ki\u1EC7n",
    "vietnamese": "Chi\u1EBFc, c\xE1i, v\u1EE5 (l\u01B0\u1EE3ng t\u1EEB \xE1o qu\u1EA7n, s\u1EF1 vi\u1EC7c, b\u01B0u ph\u1EA9m)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB",
    "level": 2,
    "category": "L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u725B (Ng\u01B0u)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u8FD9\u4EF6\u6BDB\u8863\u989C\u8272\u5F88\u6F02\u4EAE\u3002",
        "pinyin": "Zh\xE8 ji\xE0n m\xE1oy\u012B y\xE1ns\xE8 h\u011Bn pi\xE0oliang.",
        "vi": "Chi\u1EBFc \xE1o len n\xE0y m\xE0u s\u1EAFc r\u1EA5t \u0111\u1EB9p."
      },
      {
        "zh": "\u6211\u6709\u4E00\u4EF6\u91CD\u8981\u7684\u4E8B\u60C5\u8981\u544A\u8BC9\u4F60\u3002",
        "pinyin": "W\u01D2 y\u01D2u y\xED ji\xE0n zh\xF2ngy\xE0o de sh\xECqing y\xE0o g\xE0osu n\u01D0.",
        "vi": "T\xF4i c\xF3 m\u1ED9t chuy\u1EC7n quan tr\u1ECDng mu\u1ED1n n\xF3i v\u1EDBi b\u1EA1n."
      }
    ],
    "tips": "Ng\u01B0\u1EDDi (\u4EBB) d\u1EAFt con b\xF2 (\u725B) ph\xE2n chia t\u1EEBng ph\u1EA7n gia t\xE0i r\u1EA1ch r\xF2i. L\u01B0\u1EE3ng t\u1EEB ph\xE2n lo\u1EA1i s\u1EF1 v\u1EADt. Ph\u1ED3n th\u1EC3: \u4EF6."
  },
  {
    "id": "pdf_048",
    "hanzi": "\u53EF\u4EE5",
    "pinyin": "k\u011By\u01D0",
    "hanViet": "Kh\u1EA3 D\u0129",
    "vietnamese": "C\xF3 th\u1EC3, \u0111\u01B0\u1EE3c ph\xE9p, t\xE0m t\u1EA1m",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB n\u0103ng nguy\u1EC7n",
    "level": 2,
    "category": "Kh\u1EA3 n\u0103ng & Cho ph\xE9p",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u6211\u53EF\u4EE5\u5750\u5728\u8FD9\u91CC\u5417\uFF1F",
        "pinyin": "W\u01D2 k\u011By\u01D0 zu\xF2 z\xE0i zh\xE8l\u01D0 ma?",
        "vi": "T\xF4i c\xF3 th\u1EC3 ng\u1ED3i \u1EDF \u0111\xE2y \u0111\u01B0\u1EE3c kh\xF4ng?"
      },
      {
        "zh": "\u53EA\u8981\u8BA4\u771F\u5B66\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u505A\u5F97\u5F88\u597D\u3002",
        "pinyin": "Zh\u01D0y\xE0o r\xE8nzh\u0113n xu\xE9, n\u01D0 y\u011B k\u011By\u01D0 zu\xF2 de h\u011Bn h\u01CEo.",
        "vi": "Ch\u1EC9 c\u1EA7n ch\u0103m ch\u1EC9 h\u1ECDc, b\u1EA1n c\u0169ng c\xF3 th\u1EC3 l\xE0m r\u1EA5t t\u1ED1t."
      }
    ],
    "tips": "\u201C\u53EF\u201D \u01B0ng thu\u1EADn t\xE1n th\xE0nh, \u201C\u4EE5\u201D c\u0103n c\u1EE9 v\xE0o \u0111\xF3 m\xE0 th\u1EF1c hi\u1EC7n. C\xF3 th\u1EC3, ch\u1EA5p thu\u1EADn. Ph\u1ED3n th\u1EC3: \u53EF\u4EE5."
  },
  {
    "id": "pdf_049",
    "hanzi": "\u5496\u5561",
    "pinyin": "k\u0101f\u0113i",
    "hanViet": "C\xE0 Ph\xEA",
    "vietnamese": "C\xE0 ph\xEA",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u4F60\u60F3\u559D\u8336\u8FD8\u662F\u559D\u5496\u5561\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng h\u0113 ch\xE1 h\xE1ish\xEC h\u0113 k\u0101f\u0113i?",
        "vi": "B\u1EA1n mu\u1ED1n u\u1ED1ng tr\xE0 hay u\u1ED1ng c\xE0 ph\xEA?"
      },
      {
        "zh": "\u65E9\u4E0A\u4E00\u676F\u70ED\u5496\u5561\u8BA9\u6211\u7CBE\u795E\u9971\u6EE1\u3002",
        "pinyin": "Z\u01CEoshang y\xEC b\u0113i r\xE8 k\u0101f\u0113i r\xE0ng w\u01D2 j\u012Bngsh\xE9n b\u01CEom\u01CEn.",
        "vi": "Bu\u1ED5i s\xE1ng m\u1ED9t ly c\xE0 ph\xEA n\xF3ng khi\u1EBFn t\xF4i tr\xE0n \u0111\u1EA7y tinh th\u1EA7n."
      }
    ],
    "tips": "T\u1EEB m\u01B0\u1EE3n phi\xEAn \xE2m qu\u1ED1c t\u1EBF mang hai b\u1ED9 Kh\u1EA9u (\u53E3) bi\u1EC3u th\u1ECB th\u1EE9c u\u1ED1ng \u0111\u01B0a v\xE0o mi\u1EC7ng. Ph\u1ED3n th\u1EC3: \u5496\u5561."
  },
  {
    "id": "pdf_050",
    "hanzi": "\u7535\u89C6",
    "pinyin": "di\xE0nsh\xEC",
    "hanViet": "\u0110i\u1EC7n Th\u1ECB",
    "vietnamese": "Ti vi, truy\u1EC1n h\xECnh",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED3 gia d\u1EE5ng & Gi\u1EA3i tr\xED",
    "radical": "\u7535 (\u0110i\u1EC7n) + \u89C1 (Ki\u1EBFn)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u5168\u5BB6\u4EBA\u4E00\u8D77\u770B\u7535\u89C6\u3002",
        "pinyin": "W\u01D2men qu\xE1n ji\u0101 r\xE9n y\xECq\u01D0 k\xE0n di\xE0nsh\xEC.",
        "vi": "C\u1EA3 nh\xE0 ch\xFAng t\xF4i c\xF9ng nhau xem ti vi."
      },
      {
        "zh": "\u7761\u524D\u522B\u770B\u592A\u4E45\u7535\u89C6\u3002",
        "pinyin": "Shu\xEC qi\xE1n bi\xE9 k\xE0n t\xE0i ji\u01D4 di\xE0nsh\xEC.",
        "vi": "Tr\u01B0\u1EDBc khi ng\u1EE7 \u0111\u1EEBng xem ti vi qu\xE1 l\xE2u."
      }
    ],
    "tips": "\u201C\u7535\u201D lu\u1ED3ng \u0111i\u1EC7n ch\u1EDBp nho\xE1ng, \u201C\u89C6\u201D quan s\xE1t nh\xECn ng\u1EAFm (b\u1ED9 Ki\u1EBFn \u89C1). H\xECnh \u1EA3nh truy\u1EC1n b\u1EB1ng t\xEDn hi\u1EC7u \u0111i\u1EC7n. Ph\u1ED3n th\u1EC3: \u96FB\u8996."
  },
  {
    "id": "pdf_051",
    "hanzi": "\u82F9\u679C",
    "pinyin": "p\xEDnggu\u01D2",
    "hanViet": "B\xECnh Qu\u1EA3",
    "vietnamese": "Qu\u1EA3 t\xE1o",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c & Hoa qu\u1EA3",
    "radical": "\u8279 (Th\u1EA3o) + \u6728 (M\u1ED9c)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u4E00\u5929\u4E00\u4E2A\u82F9\u679C\uFF0C\u533B\u751F\u8FDC\u79BB\u6211\u3002",
        "pinyin": "Y\xEC ti\u0101n y\xED g\xE8 p\xEDnggu\u01D2, y\u012Bsh\u0113ng yu\u01CEnl\xED w\u01D2.",
        "vi": "M\u1ED7i ng\xE0y m\u1ED9t qu\u1EA3 t\xE1o, kh\u1ECFi lo g\u1EB7p b\xE1c s\u0129."
      },
      {
        "zh": "\u8FD9\u4E2A\u7EA2\u82F9\u679C\u53C8\u751C\u53C8\u8106\u3002",
        "pinyin": "Zh\xE8 ge h\xF3ng p\xEDnggu\u01D2 y\xF2u ti\xE1n y\xF2u cu\xEC.",
        "vi": "Qu\u1EA3 t\xE1o \u0111\u1ECF n\xE0y v\u1EEBa ng\u1ECDt l\u1EA1i v\u1EEBa gi\xF2n."
      }
    ],
    "tips": "\u201C\u82F9\u201D b\u1ED9 Th\u1EA3o (\u8279) lo\xE0i hoa tr\xE1i th\u1EA3o m\u1ED9c \u0111\u1ED3ng \xE2m B\xECnh (\u5E73) trong b\xECnh an may m\u1EAFn. Ph\u1ED3n th\u1EC3: \u860B\u679C."
  },
  {
    "id": "pdf_052",
    "hanzi": "\u516D",
    "pinyin": "li\xF9",
    "hanViet": "L\u1EE5c",
    "vietnamese": "S\u1ED1 s\xE1u (6)",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm",
    "radical": "\u516B (B\xE1t)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u6211\u6BCF\u5929\u65E9\u4E0A\u516D\u70B9\u8D77\u5E8A\u3002",
        "pinyin": "W\u01D2 m\u011Biti\u0101n z\u01CEoshang li\xF9 di\u01CEn q\u01D0chu\xE1ng.",
        "vi": "T\xF4i th\u1EE9c d\u1EADy l\xFAc s\xE1u gi\u1EDD s\xE1ng m\u1ED7i ng\xE0y."
      },
      {
        "zh": "\u516D\u516D\u5927\u987A\uFF0C\u4E8B\u4E8B\u5982\u610F\u3002",
        "pinyin": "Li\xF9 li\xF9 d\xE0 sh\xF9n, sh\xEC sh\xEC r\xFAy\xEC.",
        "vi": "L\u1EE5c l\u1EE5c \u0111\u1EA1i thu\u1EADn, v\u1EA1n s\u1EF1 hanh th\xF4ng."
      }
    ],
    "tips": "Trong v\u0103n h\xF3a Trung Hoa, s\u1ED1 6 t\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 tr\xF4i ch\u1EA3y, thu\u1EADn bu\u1ED3m xu\xF4i gi\xF3 (L\u1EE5c thu\u1EADn). Ph\u1ED3n th\u1EC3: \u516D."
  },
  {
    "id": "pdf_053",
    "hanzi": "\u94B1",
    "pinyin": "qi\xE1n",
    "hanViet": "Ti\u1EC1n",
    "vietnamese": "Ti\u1EC1n b\u1EA1c",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Kinh t\u1EBF & Mua s\u1EAFm",
    "radical": "\u9485 (Kim)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u8BF7\u95EE\u8FD9\u672C\u4E66\u591A\u5C11\u94B1\uFF1F",
        "pinyin": "Q\u01D0ngw\xE8n zh\xE8 b\u011Bn sh\u016B du\u014Dsh\u01CEo qi\xE1n?",
        "vi": "Xin h\u1ECFi quy\u1EC3n s\xE1ch n\xE0y bao nhi\xEAu ti\u1EC1n?"
      },
      {
        "zh": "\u4ED6\u82B1\u4E86\u5F88\u591A\u94B1\u4E70\u8FD9\u53F0\u7535\u8111\u3002",
        "pinyin": "T\u0101 hu\u0101 le h\u011Bn du\u014D qi\xE1n m\u01CEi zh\xE8 t\xE1i di\xE0nn\u01CEo.",
        "vi": "Anh \u1EA5y \u0111\xE3 ti\xEAu r\u1EA5t nhi\u1EC1u ti\u1EC1n mua chi\u1EBFc m\xE1y t\xEDnh n\xE0y."
      }
    ],
    "tips": "B\u1ED9 Kim (\u9485) kim lo\u1EA1i \u0111\xFAc th\xE0nh ti\u1EC1n xu c\u1ED5 c\xF3 v\u0169 kh\xED (Qua \u6208) b\u1EA3o v\u1EC7. Ph\u1ED3n th\u1EC3: \u9322."
  },
  {
    "id": "pdf_054",
    "hanzi": "\u8BF7",
    "pinyin": "q\u01D0ng",
    "hanViet": "Th\u1EC9nh",
    "vietnamese": "Xin m\u1EDDi, xin ph\xE9p, th\u1EC9nh c\u1EA7u",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "X\xE3 giao & L\u1ECBch s\u1EF1",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u8BF7\u8FDB\uFF0C\u8BF7\u5750\uFF0C\u8BF7\u559D\u8336\uFF01",
        "pinyin": "Q\u01D0ng j\xECn, q\u01D0ng zu\xF2, q\u01D0ng h\u0113 ch\xE1!",
        "vi": "Xin m\u1EDDi v\xE0o, m\u1EDDi ng\u1ED3i, m\u1EDDi d\xF9ng tr\xE0!"
      },
      {
        "zh": "\u6211\u60F3\u8BF7\u4F60\u5403\u665A\u996D\u3002",
        "pinyin": "W\u01D2 xi\u01CEng q\u01D0ng n\u01D0 ch\u012B w\u01CEnf\xE0n.",
        "vi": "T\xF4i mu\u1ED1n m\u1EDDi b\u1EA1n \u0103n c\u01A1m t\u1ED1i."
      }
    ],
    "tips": "D\xF9ng l\u1EDDi n\xF3i thanh tao trong tr\u1EBBo (b\u1ED9 Ng\xF4n \u8BA0 + ch\u1EEF Thanh \u9752) \u0111\u1EC3 b\xE0y t\u1ECF l\xF2ng k\xEDnh tr\u1ECDng. Ph\u1ED3n th\u1EC3: \u8ACB."
  },
  {
    "id": "pdf_055",
    "hanzi": "\u95E8",
    "pinyin": "m\xE9n",
    "hanViet": "M\xF4n",
    "vietnamese": "C\u1EEDa, c\u1ED5ng, m\xF4n (h\u1ECDc)",
    "partOfSpeech": "Danh t\u1EEB / L\u01B0\u1EE3ng t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED3 v\u1EADt & Ki\u1EBFn tr\xFAc",
    "radical": "\u95E8 (M\xF4n)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u51FA\u95E8\u7684\u65F6\u5019\u8BF7\u628A\u95E8\u5173\u597D\u3002",
        "pinyin": "Ch\u016Bm\xE9n de sh\xEDhou q\u01D0ng b\u01CE m\xE9n gu\u0101n h\u01CEo.",
        "vi": "Khi ra ngo\xE0i xin h\xE3y \u0111\xF3ng k\u1EF9 c\u1EEDa."
      },
      {
        "zh": "\u8FD9\u4E00\u5B66\u671F\u6211\u9009\u4E86\u56DB\u95E8\u8BFE\u3002",
        "pinyin": "Zh\xE8 y\xEC xu\xE9q\u012B w\u01D2 xu\u01CEn le s\xEC m\xE9n k\xE8.",
        "vi": "K\u1EF3 h\u1ECDc n\xE0y t\xF4i \u0111\xE3 \u0111\u0103ng k\xFD b\u1ED1n m\xF4n h\u1ECDc."
      }
    ],
    "tips": "Ch\u1EEF t\u01B0\u1EE3ng h\xECnh c\xE1nh c\u1ED5ng hai c\xE1nh v\u1EEFng ch\xE3i \u0111\xF3n kh\xE1ch v\xE0o nh\xE0. Ph\u1ED3n th\u1EC3: \u9580."
  },
  {
    "id": "pdf_056",
    "hanzi": "\u6B21",
    "pinyin": "c\xEC",
    "hanViet": "Th\u1EE9",
    "vietnamese": "L\u1EA7n, l\u01B0\u1EE3t, th\u1EE9 b\u1EADc",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB",
    "level": 2,
    "category": "L\u01B0\u1EE3ng t\u1EEB & S\u1ED1 l\u1EA7n",
    "radical": "\u51AB (B\u0103ng) + \u6B20 (Khi\u1EBFm)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u8FD9\u662F\u6211\u7B2C\u4E00\u6B21\u6765\u4E2D\u56FD\u3002",
        "pinyin": "Zh\xE8 sh\xEC w\u01D2 d\xEC-y\u012B c\xEC l\xE1i Zh\u014Dnggu\xF3.",
        "vi": "\u0110\xE2y l\xE0 l\u1EA7n \u0111\u1EA7u ti\xEAn t\xF4i \u0111\u1EBFn Trung Qu\u1ED1c."
      },
      {
        "zh": "\u8FD9\u4E2A\u7535\u5F71\u6211\u770B\u4E86\u5F88\u591A\u6B21\u3002",
        "pinyin": "Zh\xE8 ge di\xE0ny\u01D0ng w\u01D2 k\xE0n le h\u011Bn du\u014D c\xEC.",
        "vi": "B\u1ED9 phim n\xE0y t\xF4i \u0111\xE3 xem r\u1EA5t nhi\u1EC1u l\u1EA7n."
      }
    ],
    "tips": "Th\u1EE9 t\u1EF1 t\u1EEBng l\u01B0\u1EE3t n\u1ED1i ti\u1EBFp nhau kh\xF4ng gi\xE1n \u0111o\u1EA1n. Ph\u1ED3n th\u1EC3: \u6B21."
  },
  {
    "id": "pdf_057",
    "hanzi": "\u6253\u8F66",
    "pinyin": "d\u01CEch\u0113",
    "hanViet": "\u0110\u1EA3 Xa",
    "vietnamese": "B\u1EAFt xe, g\u1ECDi xe taxi",
    "partOfSpeech": "C\u1EE5m \u0111\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Giao th\xF4ng & \u0110i l\u1EA1i",
    "radical": "\u624C (Th\u1EE7) + \u8F66 (Xa)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u5FEB\u8981\u8FDF\u5230\u4E86\uFF0C\u6211\u4EEC\u6253\u8F66\u53BB\u5427\u3002",
        "pinyin": "Ku\xE0i y\xE0o ch\xEDd\xE0o le, w\u01D2men d\u01CEch\u0113 q\xF9 ba.",
        "vi": "S\u1EAFp mu\u1ED9n r\u1ED3i, ch\xFAng ta b\u1EAFt xe taxi \u0111i th\xF4i."
      },
      {
        "zh": "\u73B0\u5728\u7528\u624B\u673A\u6253\u8F66\u975E\u5E38\u65B9\u4FBF\u3002",
        "pinyin": "Xi\xE0nz\xE0i y\xF2ng sh\u01D2uj\u012B d\u01CEch\u0113 f\u0113ich\xE1ng f\u0101ngbi\xE0n.",
        "vi": "B\xE2y gi\u1EDD d\xF9ng \u0111i\u1EC7n tho\u1EA1i \u0111\u1EB7t xe r\u1EA5t ti\u1EC7n l\u1EE3i."
      }
    ],
    "tips": "\u201C\u6253\u201D v\u1EABy tay ra hi\u1EC7u \u0111\xF3n xe, \u201C\u8F66\u201D chi\u1EBFc xe \xF4 t\xF4. Ph\u1ED3n th\u1EC3: \u6253\u8ECA."
  },
  {
    "id": "pdf_058",
    "hanzi": "\u95F4",
    "pinyin": "ji\u0101n",
    "hanViet": "Gian",
    "vietnamese": "Gian, ph\xF2ng, gi\u1EEFa, kho\u1EA3ng c\xE1ch",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "L\u01B0\u1EE3ng t\u1EEB & Kh\xF4ng gian",
    "radical": "\u95E8 (M\xF4n)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u5BB6\u6709\u4E09\u95F4\u5927\u5367\u5BA4\u3002",
        "pinyin": "W\u01D2 ji\u0101 y\u01D2u s\u0101n ji\u0101n d\xE0 w\xF2sh\xEC.",
        "vi": "Nh\xE0 t\xF4i c\xF3 ba gian ph\xF2ng ng\u1EE7 l\u1EDBn."
      },
      {
        "zh": "\u670B\u53CB\u4E4B\u95F4\u5E94\u8BE5\u4E92\u76F8\u5E2E\u52A9\u3002",
        "pinyin": "P\xE9ngyou zh\u012Bji\u0101n y\u012Bngg\u0101i h\xF9xi\u0101ng b\u0101ngzh\xF9.",
        "vi": "Gi\u1EEFa b\u1EA1n b\xE8 n\xEAn gi\xFAp \u0111\u1EE1 l\u1EABn nhau."
      }
    ],
    "tips": "\xC1nh n\u1EAFng m\u1EB7t tr\u1EDDi (Nh\u1EADt \u65E5) l\u1ECDt qua khe gi\u1EEFa hai c\xE1nh c\u1EEDa (M\xF4n \u95E8). Ph\u1ED3n th\u1EC3: \u9593."
  },
  {
    "id": "pdf_059",
    "hanzi": "\u8FC7\u6765",
    "pinyin": "gu\xF2l\xE1i",
    "hanViet": "Qu\xE1 Lai",
    "vietnamese": "\u0110i qua \u0111\xE2y, l\u1EA1i \u0111\xE2y",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng di chuy\u1EC3n",
    "radical": "\u8FB6 (X\u01B0\u1EDBc) + \u6728 (M\u1ED9c)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u4F60\u5FEB\u8FC7\u6765\uFF0C\u770B\u770B\u8FD9\u662F\u4EC0\u4E48\uFF01",
        "pinyin": "N\u01D0 ku\xE0i gu\xF2l\xE1i, k\xE0nkan zh\xE8 sh\xEC sh\xE9nme!",
        "vi": "B\u1EA1n mau qua \u0111\xE2y xem n\xE0y l\xE0 c\xE1i g\xEC!"
      },
      {
        "zh": "\u4ED6\u5FAE\u7B11\u7740\u671D\u6211\u8D70\u4E86\u8FC7\u6765\u3002",
        "pinyin": "T\u0101 w\u0113ixi\xE0o zhe ch\xE1o w\u01D2 z\u01D2u le gu\xF2l\xE1i.",
        "vi": "Anh \u1EA5y m\u1EC9m c\u01B0\u1EDDi b\u01B0\u1EDBc l\u1EA1i g\u1EA7n ph\xEDa t\xF4i."
      }
    ],
    "tips": "\u201C\u8FC7\u201D b\u01B0\u1EDBc qua d\u1EB7m \u0111\u01B0\u1EDDng (\u8FB6), \u201C\u6765\u201D ti\u1EBFn v\u1EC1 g\u1EA7n ph\xEDa ng\u01B0\u1EDDi n\xF3i. Ph\u1ED3n th\u1EC3: \u904E\u4F86."
  },
  {
    "id": "pdf_060",
    "hanzi": "\u8FD9\u4E48",
    "pinyin": "zh\xE8me",
    "hanViet": "Gi\xE1 Ma",
    "vietnamese": "Nh\u01B0 th\u1EBF n\xE0y, \u0111\u1EBFn m\u1EE9c n\xE0y, nh\u01B0 v\u1EADy",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB ch\u1EC9 th\u1ECB",
    "level": 2,
    "category": "\u0110\u1EA1i t\u1EEB & M\u1EE9c \u0111\u1ED9",
    "radical": "\u8FB6 (X\u01B0\u1EDBc)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u600E\u4E48\u8D77\u5F97\u8FD9\u4E48\u65E9\uFF1F",
        "pinyin": "N\u01D0 z\u011Bnme q\u01D0 de zh\xE8me z\u01CEo?",
        "vi": "Sao b\u1EA1n th\u1EE9c d\u1EADy s\u1EDBm th\u1EBF n\xE0y?"
      },
      {
        "zh": "\u8FD9\u9053\u83DC\u8FD9\u4E48\u597D\u5403\uFF0C\u662F\u4F60\u505A\u7684\u5417\uFF1F",
        "pinyin": "Zh\xE8 d\xE0o c\xE0i zh\xE8me h\u01CEoch\u012B, sh\xEC n\u01D0 zu\xF2 de ma?",
        "vi": "M\xF3n \u0103n n\xE0y ngon th\u1EBF n\xE0y, c\xF3 ph\u1EA3i b\u1EA1n n\u1EA5u kh\xF4ng?"
      }
    ],
    "tips": "\u201C\u8FD9\u201D ch\u1EC9 \u0111\u1ED1i t\u01B0\u1EE3ng \u1EDF ngay tr\u01B0\u1EDBc m\u1EAFt. \u201C\u8FD9\u4E48\u201D bi\u1EC3u th\u1ECB m\u1EE9c \u0111\u1ED9 cao ngay hi\u1EC7n t\u1EA1i. Ph\u1ED3n th\u1EC3: \u9019\u9EBC."
  },
  {
    "id": "pdf_061",
    "hanzi": "\u62FF",
    "pinyin": "n\xE1",
    "hanViet": "N\xE3",
    "vietnamese": "C\u1EA7m, n\u1EAFm, l\u1EA5y, mang theo",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng",
    "radical": "\u624B (Th\u1EE7)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u5E2E\u6211\u62FF\u4E00\u4E0B\u8FD9\u4E2A\u5305\uFF0C\u597D\u5417\uFF1F",
        "pinyin": "B\u0101ng w\u01D2 n\xE1 y\xEDxi\xE0 zh\xE8 ge b\u0101o, h\u01CEo ma?",
        "vi": "Gi\xFAp t\xF4i c\u1EA7m chi\u1EBFc t\xFAi n\xE0y m\u1ED9t ch\xFAt \u0111\u01B0\u1EE3c kh\xF4ng?"
      },
      {
        "zh": "\u4ED6\u624B\u91CC\u62FF\u7740\u4E00\u675F\u9C9C\u82B1\u3002",
        "pinyin": "T\u0101 sh\u01D2u l\u01D0 n\xE1 zhe y\xED sh\xF9 xi\u0101nhu\u0101.",
        "vi": "Trong tay anh \u1EA5y \u0111ang c\u1EA7m m\u1ED9t b\xF3 hoa t\u01B0\u01A1i."
      }
    ],
    "tips": "B\xEAn tr\xEAn l\xE0 H\u1EE3p (\u5408), b\xEAn d\u01B0\u1EDBi l\xE0 Th\u1EE7 (\u624B). B\xE0n tay n\u1EAFm b\u1EAFt v\xE0 gom l\u1EA1i \u0111\u1ED3 v\u1EADt. Ph\u1ED3n th\u1EC3: \u62FF."
  },
  {
    "id": "pdf_062",
    "hanzi": "\u4E3A\u4EC0\u4E48",
    "pinyin": "w\xE8ish\xE9nme",
    "hanViet": "V\u1ECB Th\u1EADp Ma",
    "vietnamese": "T\u1EA1i sao, v\xEC sao",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n",
    "level": 2,
    "category": "H\u1ECFi nguy\xEAn nh\xE2n",
    "radical": "\u4E36 (Ch\u1EE7) + \u4EBB (Nh\xE2n)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u4ECA\u5929\u4E3A\u4EC0\u4E48\u8FDF\u5230\u4E86\uFF1F",
        "pinyin": "N\u01D0 j\u012Bnti\u0101n w\xE8ish\xE9nme ch\xEDd\xE0o le?",
        "vi": "H\xF4m nay t\u1EA1i sao b\u1EA1n l\u1EA1i \u0111\u1EBFn mu\u1ED9n?"
      },
      {
        "zh": "\u8BF7\u544A\u8BC9\u6211\u4E3A\u4EC0\u4E48\u4F1A\u8FD9\u6837\u3002",
        "pinyin": "Q\u01D0ng g\xE0osu w\u01D2 w\xE8ish\xE9nme hu\xEC zh\xE8y\xE0ng.",
        "vi": "Xin h\xE3y cho t\xF4i bi\u1EBFt v\xEC sao l\u1EA1i nh\u01B0 v\u1EADy."
      }
    ],
    "tips": "\u201C\u4E3A\u201D v\xEC l\xFD do g\xEC, \u201C\u4EC0\u4E48\u201D c\xE1i g\xEC. C\u1EE5m t\u1EEB h\u1ECFi c\u0103n nguy\xEAn c\u1ED1t l\xF5i. Ph\u1ED3n th\u1EC3: \u70BA\u4EC0\u9EBC."
  },
  {
    "id": "pdf_063",
    "hanzi": "\u751C",
    "pinyin": "ti\xE1n",
    "hanViet": "\u0110i\u1EC1m",
    "vietnamese": "Ng\u1ECDt, ng\u1ECDt ng\xE0o",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 2,
    "category": "M\xF9i v\u1ECB & \u1EA8m th\u1EF1c",
    "radical": "\u7518 (Cam)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u897F\u74DC\u771F\u751C\uFF01",
        "pinyin": "X\u012Bgu\u0101 zh\u0113n ti\xE1n!",
        "vi": "D\u01B0a h\u1EA5u ng\u1ECDt th\u1EADt!"
      },
      {
        "zh": "\u8FD9\u676F\u5976\u8336\u592A\u751C\u4E86\uFF0C\u5C11\u653E\u70B9\u7CD6\u5427\u3002",
        "pinyin": "Zh\xE8 b\u0113i n\u01CEich\xE1 t\xE0i ti\xE1n le, sh\u01CEo f\xE0ng di\u01CEn t\xE1ng ba.",
        "vi": "C\u1ED1c tr\xE0 s\u1EEFa n\xE0y ng\u1ECDt qu\xE1, b\u1EDBt \u0111\u01B0\u1EDDng \u0111i ch\xFAt nh\xE9."
      }
    ],
    "tips": "B\u1ED9 Cam (\u7518) v\u1ECB ng\u1ECDt trong mi\u1EC7ng k\u1EBFt h\u1EE3p Thi\u1EC7t (\u820C) chi\u1EBFc l\u01B0\u1EE1i n\u1EBFm v\u1ECB. Ph\u1ED3n th\u1EC3: \u751C."
  },
  {
    "id": "pdf_064",
    "hanzi": "\u7535\u8111",
    "pinyin": "di\xE0nn\u01CEo",
    "hanViet": "\u0110i\u1EC7n N\xE3o",
    "vietnamese": "M\xE1y vi t\xEDnh, m\xE1y t\xEDnh",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "C\xF4ng ngh\u1EC7 & Thi\u1EBFt b\u1ECB",
    "radical": "\u7535 (\u0110i\u1EC7n) + \u6708 (Nh\u1EE5c)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u6211\u6BCF\u5929\u7528\u7535\u8111\u5904\u7406\u5DE5\u4F5C\u3002",
        "pinyin": "W\u01D2 m\u011Biti\u0101n y\xF2ng di\xE0nn\u01CEo ch\u01D4l\u01D0 g\u014Dngzu\xF2.",
        "vi": "M\u1ED7i ng\xE0y t\xF4i d\xF9ng m\xE1y vi t\xEDnh \u0111\u1EC3 x\u1EED l\xFD c\xF4ng vi\u1EC7c."
      },
      {
        "zh": "\u8FD9\u53F0\u7535\u8111\u901F\u5EA6\u975E\u5E38\u5FEB\u3002",
        "pinyin": "Zh\xE8 t\xE1i di\xE0nn\u01CEo s\xF9d\xF9 f\u0113ich\xE1ng ku\xE0i.",
        "vi": "Chi\u1EBFc m\xE1y t\xEDnh n\xE0y t\u1ED1c \u0111\u1ED9 r\u1EA5t nhanh."
      }
    ],
    "tips": "\u201C\u7535\u201D d\xF2ng \u0111i\u1EC7n, \u201C\u8111\u201D b\u1ED9 n\xE3o tr\xED tu\u1EC7. C\u1ED7 m\xE1y c\xF3 tr\xED tu\u1EC7 \u0111i\u1EC7n t\u1EED si\xEAu vi\u1EC7t. Ph\u1ED3n th\u1EC3: \u96FB\u8166."
  },
  {
    "id": "pdf_065",
    "hanzi": "\u60F3",
    "pinyin": "xi\u01CEng",
    "hanViet": "T\u01B0\u1EDFng",
    "vietnamese": "Mu\u1ED1n, ngh\u0129, nh\u1EDB nhung",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "T\xE2m l\xFD & Suy ngh\u0129",
    "radical": "\u5FC3 (T\xE2m)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u6211\u60F3\u53BB\u4E2D\u56FD\u65C5\u6E38\u3002",
        "pinyin": "W\u01D2 xi\u01CEng q\xF9 Zh\u014Dnggu\xF3 l\u01DAy\xF3u.",
        "vi": "T\xF4i mu\u1ED1n \u0111i Trung Qu\u1ED1c du l\u1ECBch."
      },
      {
        "zh": "\u6211\u5F88\u60F3\u5FF5\u6211\u7684\u5BB6\u4EBA\u3002",
        "pinyin": "W\u01D2 h\u011Bn xi\u01CEngni\xE0n w\u01D2 de ji\u0101r\xE9n.",
        "vi": "T\xF4i r\u1EA5t nh\u1EDB nhung gia \u0111\xECnh c\u1EE7a m\xECnh."
      }
    ],
    "tips": "B\xEAn tr\xEAn l\xE0 T\u01B0\u01A1ng (\u76F8) h\xECnh \u1EA3nh hi\u1EC7n l\xEAn, b\xEAn d\u01B0\u1EDBi l\xE0 T\xE2m (\u5FC3) t\u1EA5m l\xF2ng ghi nh\u1EDB kh\xF4n ngu\xF4i. Ph\u1ED3n th\u1EC3: \u60F3."
  },
  {
    "id": "pdf_066",
    "hanzi": "\u53EB",
    "pinyin": "ji\xE0o",
    "hanViet": "Khi\u1EBFu",
    "vietnamese": "G\u1ECDi, t\xEAn l\xE0, k\xEAu",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "Giao ti\u1EBFp & T\xEAn g\u1ECDi",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F\u2014\u2014\u6211\u53EB\u738B\u660E\u3002",
        "pinyin": "N\u01D0 ji\xE0o sh\xE9nme m\xEDngzi? \u2014\u2014 W\u01D2 ji\xE0o W\xE1ng M\xEDng.",
        "vi": "B\u1EA1n t\xEAn l\xE0 g\xEC? \u2014\u2014 T\xF4i t\xEAn l\xE0 V\u01B0\u01A1ng Minh."
      },
      {
        "zh": "\u6709\u4EBA\u5728\u5916\u9762\u53EB\u4F60\u3002",
        "pinyin": "Y\u01D2u r\xE9n z\xE0i w\xE0imian ji\xE0o n\u01D0.",
        "vi": "C\xF3 ng\u01B0\u1EDDi \u0111ang \u1EDF b\xEAn ngo\xE0i g\u1ECDi b\u1EA1n."
      }
    ],
    "tips": "B\u1ED9 Kh\u1EA9u (\u53E3) m\u1EDF mi\u1EC7ng c\u1EA5t ti\u1EBFng g\u1ECDi ai \u0111\xF3. Ph\u1ED3n th\u1EC3: \u53EB."
  },
  {
    "id": "pdf_067",
    "hanzi": "\u5F00",
    "pinyin": "k\u0101i",
    "hanViet": "Khai",
    "vietnamese": "M\u1EDF, l\xE1i xe, b\u1EAFt \u0111\u1EA7u, n\u1EDF hoa",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "H\xE0nh \u0111\u1ED9ng",
    "radical": "\u5EFE (C\u1EE7ng)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u8BF7\u5F00\u95E8\uFF0C\u6211\u56DE\u6765\u4E86\u3002",
        "pinyin": "Q\u01D0ng k\u0101i m\xE9n, w\u01D2 hu\xEDl\xE1i le.",
        "vi": "Xin m\u1EDF c\u1EEDa, t\xF4i v\u1EC1 r\u1ED3i \u0111\xE2y."
      },
      {
        "zh": "\u4ED6\u6BCF\u5929\u5F00\u8F66\u53BB\u4E0A\u73ED\u3002",
        "pinyin": "T\u0101 m\u011Biti\u0101n k\u0101ich\u0113 q\xF9 sh\xE0ngb\u0101n.",
        "vi": "Anh \u1EA5y l\xE1i xe \xF4 t\xF4 \u0111i l\xE0m m\u1ED7i ng\xE0y."
      }
    ],
    "tips": "Hai b\xE0n tay nh\u1EA5c thanh then c\xE0i then c\u1EEDa m\u1EDF toang ra \u0111\xF3n \xE1nh s\xE1ng. Ph\u1ED3n th\u1EC3: \u958B."
  },
  {
    "id": "pdf_068",
    "hanzi": "\u51FA\u79DF\u8F66",
    "pinyin": "ch\u016Bz\u016Bch\u0113",
    "hanViet": "Xu\u1EA5t T\xF4 Xa",
    "vietnamese": "Xe taxi",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng ti\u1EC7n giao th\xF4ng",
    "radical": "\u8F66 (Xa)",
    "strokeCount": 19,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u5750\u51FA\u79DF\u8F66\u53BB\u673A\u573A\u5427\u3002",
        "pinyin": "W\u01D2men zu\xF2 ch\u016Bz\u016Bch\u0113 q\xF9 j\u012Bch\u01CEng ba.",
        "vi": "Ch\xFAng ta \u0111i taxi ra s\xE2n bay \u0111i."
      },
      {
        "zh": "\u51FA\u79DF\u8F66\u53F8\u673A\u975E\u5E38\u70ED\u60C5\u3002",
        "pinyin": "Ch\u016Bz\u016Bch\u0113 s\u012Bj\u012B f\u0113ich\xE1ng r\xE8q\xEDng.",
        "vi": "B\xE1c t\xE0i x\u1EBF taxi r\u1EA5t nhi\u1EC7t t\xECnh."
      }
    ],
    "tips": "\u201C\u51FA\u201D ra ngo\xE0i, \u201C\u79DF\u201D cho thu\xEA l\u1EA5y ti\u1EC1n, \u201C\u8F66\u201D xe. Chi\u1EBFc xe ph\u1EE5c v\u1EE5 \u0111\u01B0a \u0111\xF3n kh\xE1ch cho thu\xEA. Ph\u1ED3n th\u1EC3: \u51FA\u79DF\u8ECA."
  },
  {
    "id": "pdf_069",
    "hanzi": "\u90FD",
    "pinyin": "d\u014Du",
    "hanViet": "\u0110\xF4",
    "vietnamese": "\u0110\u1EC1u, c\u0169ng, \u0111\xE3",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 1,
    "category": "Ph\u1EA1m vi & M\u1EE9c \u0111\u1ED9",
    "radical": "\u961D (\u1EA4p)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u90FD\u662F\u5927\u5B66\u751F\u3002",
        "pinyin": "W\u01D2men d\u014Du sh\xEC d\xE0xu\xE9sh\u0113ng.",
        "vi": "Ch\xFAng t\xF4i \u0111\u1EC1u l\xE0 sinh vi\xEAn \u0111\u1EA1i h\u1ECDc."
      },
      {
        "zh": "\u8FD9\u4E9B\u82F9\u679C\u90FD\u975E\u5E38\u751C\u3002",
        "pinyin": "Zh\xE8xi\u0113 p\xEDnggu\u01D2 d\u014Du f\u0113ich\xE1ng ti\xE1n.",
        "vi": "Nh\u1EEFng qu\u1EA3 t\xE1o n\xE0y \u0111\u1EC1u r\u1EA5t ng\u1ECDt."
      }
    ],
    "tips": "Ch\u1EEF Gi\u1EA3 (\u8005) b\xEAn c\u1EA1nh b\u1ED9 \u1EA4p (\u961D). To\xE0n b\u1ED9 d\xE2n ch\xFAng trong \u1EA5p th\xE0nh th\u1ECB \u0111\u1EC1u t\u1EC1 t\u1EF1u. Ph\u1ED3n th\u1EC3: \u90FD."
  },
  {
    "id": "pdf_070",
    "hanzi": "\u660E\u5929",
    "pinyin": "m\xEDngti\u0101n",
    "hanViet": "Minh Thi\xEAn",
    "vietnamese": "Ng\xE0y mai",
    "partOfSpeech": "Danh t\u1EEB ch\u1EC9 th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u65E5 (Nh\u1EADt) + \u5927 (\u0110\u1EA1i)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u660E\u5929\u89C1\uFF0C\u795D\u4F60\u5468\u672B\u6109\u5FEB\uFF01",
        "pinyin": "M\xEDngti\u0101n ji\xE0n, zh\xF9 n\u01D0 zh\u014Dum\xF2 y\xFAku\xE0i!",
        "vi": "Ng\xE0y mai g\u1EB7p l\u1EA1i, ch\xFAc b\u1EA1n cu\u1ED1i tu\u1EA7n vui v\u1EBB!"
      },
      {
        "zh": "\u660E\u5929\u4E0A\u5348\u6211\u4EEC\u6709\u6C49\u8BED\u8BFE\u3002",
        "pinyin": "M\xEDngti\u0101n sh\xE0ngw\u01D4 w\u01D2men y\u01D2u H\xE0ny\u01D4 k\xE8.",
        "vi": "S\xE1ng mai ch\xFAng t\xF4i c\xF3 ti\u1EBFt h\u1ECDc ti\u1EBFng Trung."
      }
    ],
    "tips": "\u201C\u660E\u201D v\u1EA7ng th\xE1i d\u01B0\u01A1ng (Nh\u1EADt \u65E5) v\xE0 \xE1nh tr\u0103ng (Nguy\u1EC7t \u6708) r\u1EA1ng r\u1EE1, \u201C\u5929\u201D b\u1EA7u tr\u1EDDi. Ng\xE0y m\u1EDBi r\u1EA1ng \u0111\xF4ng. Ph\u1ED3n th\u1EC3: \u660E\u5929."
  },
  {
    "id": "pdf_071",
    "hanzi": "\u6CA1\u6709",
    "pinyin": "m\xE9iy\u01D2u",
    "hanViet": "M\u1ED9t H\u1EEFu",
    "vietnamese": "Kh\xF4ng c\xF3, ch\u01B0a",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Ph\xF3 t\u1EEB",
    "level": 1,
    "category": "Ph\u1EE7 \u0111\u1ECBnh",
    "radical": "\u6C35 (Th\u1EE7y) + \u6708 (Nguy\u1EC7t)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u6211\u684C\u5B50\u4E0A\u6CA1\u6709\u4E66\u3002",
        "pinyin": "W\u01D2 zhu\u014Dzi shang m\xE9iy\u01D2u sh\u016B.",
        "vi": "Tr\xEAn b\xE0n c\u1EE7a t\xF4i kh\xF4ng c\xF3 s\xE1ch."
      },
      {
        "zh": "\u4ED6\u8FD8\u6CA1\u6765\uFF0C\u6211\u4EEC\u8981\u7B49\u4E00\u4F1A\u513F\u3002",
        "pinyin": "T\u0101 h\xE1i m\xE9i l\xE1i, w\u01D2men y\xE0o d\u011Bng y\xEDhu\xECr.",
        "vi": "Anh \u1EA5y v\u1EABn ch\u01B0a \u0111\u1EBFn, ch\xFAng ta ph\u1EA3i \u0111\u1EE3i m\u1ED9t ch\xFAt."
      }
    ],
    "tips": "\u201C\u6CA1\u201D ch\xECm bi\u1EBFn m\u1EA5t trong d\xF2ng n\u01B0\u1EDBc (\u6C35), \u201C\u6709\u201D c\xF3. Mang ngh\u0129a ph\u1EE7 \u0111\u1ECBnh s\u1EF1 s\u1EDF h\u1EEFu ho\u1EB7c s\u1EF1 vi\u1EC7c. Ph\u1ED3n th\u1EC3: \u6C92\u6709."
  },
  {
    "id": "pdf_072",
    "hanzi": "\u80FD",
    "pinyin": "n\xE9ng",
    "hanViet": "N\u0103ng",
    "vietnamese": "C\xF3 th\u1EC3, c\xF3 n\u0103ng l\u1EF1c, c\xF3 kh\u1EA3 n\u0103ng",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB n\u0103ng nguy\u1EC7n",
    "level": 1,
    "category": "Kh\u1EA3 n\u0103ng",
    "radical": "\u6708 (Nh\u1EE5c)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u80FD\u5E2E\u6211\u4E00\u4E2A\u5FD9\u5417\uFF1F",
        "pinyin": "N\u01D0 n\xE9ng b\u0101ng w\u01D2 y\xED g\xE8 m\xE1ng ma?",
        "vi": "B\u1EA1n c\xF3 th\u1EC3 gi\xFAp t\xF4i m\u1ED9t tay \u0111\u01B0\u1EE3c kh\xF4ng?"
      },
      {
        "zh": "\u4ED6\u80FD\u8BF4\u4E00\u53E3\u6D41\u5229\u7684\u6C49\u8BED\u3002",
        "pinyin": "T\u0101 n\xE9ng shu\u014D y\xEC k\u01D2u li\xFAl\xEC de H\xE0ny\u01D4.",
        "vi": "Anh \u1EA5y c\xF3 th\u1EC3 n\xF3i m\u1ED9t gi\u1ECDng ti\u1EBFng Trung l\u01B0u lo\xE1t."
      }
    ],
    "tips": "Ch\u1EEF c\u1ED5 t\u01B0\u1EE3ng h\xECnh lo\xE0i g\u1EA5u to kh\u1ECFe ki\xEAn c\u01B0\u1EDDng, tr\xE0n \u0111\u1EA7y n\u0103ng l\u01B0\u1EE3ng th\u1EF1c hi\u1EC7n m\u1ECDi vi\u1EC7c. Ph\u1ED3n th\u1EC3: \u80FD."
  },
  {
    "id": "pdf_073",
    "hanzi": "\u8001\u5E08",
    "pinyin": "l\u01CEosh\u012B",
    "hanViet": "L\xE3o S\u01B0",
    "vietnamese": "Th\u1EA7y gi\xE1o, c\xF4 gi\xE1o",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Ngh\u1EC1 nghi\u1EC7p & X\xE3 h\u1ED9i",
    "radical": "\u8002 (L\xE3o) + \u5DFE (C\xE2n)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u5F20\u8001\u5E08\u5BF9\u5B66\u751F\u975E\u5E38\u8010\u5FC3\u3002",
        "pinyin": "Zh\u0101ng l\u01CEosh\u012B du\xEC xu\xE9sheng f\u0113ich\xE1ng n\xE0ix\u012Bn.",
        "vi": "C\xF4 Tr\u01B0\u01A1ng r\u1EA5t ki\xEAn nh\u1EABn \u0111\u1ED1i v\u1EDBi h\u1ECDc sinh."
      },
      {
        "zh": "\u795D\u8001\u5E08\u6559\u5E08\u8282\u5FEB\u4E50\uFF01",
        "pinyin": "Zh\xF9 l\u01CEosh\u012B ji\xE0osh\u012Bji\xE9 ku\xE0il\xE8!",
        "vi": "K\xEDnh ch\xFAc th\u1EA7y c\xF4 ng\xE0y nh\xE0 gi\xE1o vui v\u1EBB!"
      }
    ],
    "tips": "\u201C\u8001\u201D b\u1EADc ti\u1EC1n b\u1ED1i \u0111\u1EE9c cao v\u1ECDng tr\u1ECDng, \u201C\u5E08\u201D ng\u01B0\u1EDDi d\u1EABn l\u1ED1i m\u1EDF \u0111\u01B0\u1EDDng tri th\u1EE9c. Ph\u1ED3n th\u1EC3: \u8001\u5E2B."
  },
  {
    "id": "pdf_074",
    "hanzi": "\u56DB",
    "pinyin": "s\xEC",
    "hanViet": "T\u1EE9",
    "vietnamese": "S\u1ED1 b\u1ED1n (4)",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm",
    "radical": "\u56D7 (Vi)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u4E00\u5E74\u6709\u6625\u3001\u590F\u3001\u79CB\u3001\u51AC\u56DB\u4E2A\u5B63\u8282\u3002",
        "pinyin": "Y\xEC ni\xE1n y\u01D2u ch\u016Bn, xi\xE0, qi\u016B, d\u014Dng s\xEC g\xE8 j\xECji\xE9.",
        "vi": "M\u1ED9t n\u0103m c\xF3 b\u1ED1n m\xF9a: xu\xE2n, h\u1EA1, thu, \u0111\xF4ng."
      },
      {
        "zh": "\u6211\u4EEC\u5BBF\u820D\u4E00\u5171\u4F4F\u56DB\u4E2A\u4EBA\u3002",
        "pinyin": "W\u01D2men s\xF9sh\xE8 y\xEDg\xF2ng zh\xF9 s\xEC g\xE8 r\xE9n.",
        "vi": "K\xFD t\xFAc x\xE1 ch\xFAng t\xF4i \u1EDF t\u1ED5ng c\u1ED9ng b\u1ED1n ng\u01B0\u1EDDi."
      }
    ],
    "tips": "Khung \xF4 vu\xF4ng bao quanh (\u56D7) chia l\xE0m b\u1ED1n ph\xEDa \u0110\xF4ng - T\xE2y - Nam - B\u1EAFc. Ph\u1ED3n th\u1EC3: \u56DB."
  },
  {
    "id": "pdf_075",
    "hanzi": "\u540C\u5B66",
    "pinyin": "t\xF3ngxu\xE9",
    "hanViet": "\u0110\u1ED3ng H\u1ECDc",
    "vietnamese": "B\u1EA1n c\xF9ng l\u1EDBp, b\u1EA1n h\u1ECDc",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Tr\u01B0\u1EDDng h\u1ECDc & B\u1EA1n b\xE8",
    "radical": "\u53E3 (Kh\u1EA9u) + \u5B50 (T\u1EED)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u662F\u540C\u73ED\u540C\u5B66\uFF0C\u5173\u7CFB\u975E\u5E38\u597D\u3002",
        "pinyin": "W\u01D2men sh\xEC t\xF3ngb\u0101n t\xF3ngxu\xE9, gu\u0101nxi f\u0113ich\xE1ng h\u01CEo.",
        "vi": "Ch\xFAng t\xF4i l\xE0 b\u1EA1n c\xF9ng l\u1EDBp, quan h\u1EC7 r\u1EA5t th\xE2n thi\u1EBFt."
      },
      {
        "zh": "\u540C\u5B66\u4EEC\u6B63\u5728\u64CD\u573A\u4E0A\u8DD1\u6B65\u3002",
        "pinyin": "T\xF3ngxu\xE9men zh\xE8ngz\xE0i c\u0101och\u01CEng shang p\u01CEob\xF9.",
        "vi": "C\xE1c b\u1EA1n h\u1ECDc \u0111ang ch\u1EA1y b\u1ED9 tr\xEAn s\xE2n t\u1EADp."
      }
    ],
    "tips": "\u201C\u540C\u201D c\xF9ng chung d\u01B0\u1EDBi m\u1ED9t m\xE1i tr\u01B0\u1EDDng, \u201C\u5B66\u201D c\xF9ng nhau h\u1ECDc h\u1ECFi ti\u1EBFp thu tri th\u1EE9c. Ph\u1ED3n th\u1EC3: \u540C\u5B78."
  },
  {
    "id": "pdf_076",
    "hanzi": "\u9001",
    "pinyin": "s\xF2ng",
    "hanViet": "T\u1ED1ng",
    "vietnamese": "T\u1EB7ng, ti\u1EC5n \u0111\u01B0a, chuy\u1EC3n ph\xE1t",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & X\xE3 giao",
    "radical": "\u8FB6 (X\u01B0\u1EDBc)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u8FD9\u662F\u6211\u9001\u7ED9\u4F60\u7684\u751F\u65E5\u793C\u7269\u3002",
        "pinyin": "Zh\xE8 sh\xEC w\u01D2 s\xF2ng g\u011Bi n\u01D0 de sh\u0113ngr\xEC l\u01D0w\xF9.",
        "vi": "\u0110\xE2y l\xE0 m\xF3n qu\xE0 sinh nh\u1EADt t\xF4i t\u1EB7ng cho b\u1EA1n."
      },
      {
        "zh": "\u660E\u5929\u6211\u53BB\u673A\u573A\u9001\u4F60\u3002",
        "pinyin": "M\xEDngti\u0101n w\u01D2 q\xF9 j\u012Bch\u01CEng s\xF2ng n\u01D0.",
        "vi": "Ng\xE0y mai t\xF4i ra s\xE2n bay ti\u1EC5n b\u1EA1n."
      }
    ],
    "tips": "B\u1ED9 X\u01B0\u1EDBc (\u8FB6) b\u01B0\u1EDBc ch\xE2n ti\u1EC5n b\u1EA1n \u0111i tr\xEAn \u0111\u01B0\u1EDDng, trao g\u1EEDi t\u1EA5m l\xF2ng th\xE2n th\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u9001."
  },
  {
    "id": "pdf_077",
    "hanzi": "\u63A5",
    "pinyin": "ji\u0113",
    "hanViet": "Ti\u1EBFp",
    "vietnamese": "\u0110\xF3n, nh\u1EADn, ti\u1EBFp nh\u1EADn, nghe (m\xE1y)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Giao ti\u1EBFp",
    "radical": "\u624C (Th\u1EE7)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u53BB\u706B\u8F66\u7AD9\u63A5\u670B\u53CB\u3002",
        "pinyin": "W\u01D2 q\xF9 hu\u01D2ch\u0113zh\xE0n ji\u0113 p\xE9ngyou.",
        "vi": "T\xF4i \u0111i ra nh\xE0 ga xe l\u1EEDa \u0111\xF3n b\u1EA1n."
      },
      {
        "zh": "\u5FEB\u63A5\u7535\u8BDD\uFF0C\u54CD\u5F88\u4E45\u4E86\uFF01",
        "pinyin": "Ku\xE0i ji\u0113 di\xE0nhu\xE0, xi\u01CEng h\u011Bn ji\u01D4 le!",
        "vi": "Mau nghe \u0111i\u1EC7n tho\u1EA1i \u0111i, chu\xF4ng reo l\xE2u l\u1EAFm r\u1ED3i!"
      }
    ],
    "tips": "B\u1ED9 Th\u1EE7 (\u624C) \u0111\u01B0a tay ra ti\u1EBFp nh\u1EADn ho\u1EB7c \u0111\xF3n ng\u01B0\u1EDDi ph\u01B0\u01A1ng xa \u0111\u1EBFn. Ph\u1ED3n th\u1EC3: \u63A5."
  },
  {
    "id": "pdf_078",
    "hanzi": "\u7F51\u4E0A",
    "pinyin": "w\u01CEngshang",
    "hanViet": "V\xF5ng Th\u01B0\u1EE3ng",
    "vietnamese": "Tr\xEAn m\u1EA1ng (internet)",
    "partOfSpeech": "Danh t\u1EEB ch\u1EC9 n\u01A1i ch\u1ED1n",
    "level": 2,
    "category": "C\xF4ng ngh\u1EC7 & Internet",
    "radical": "\u5182 (Quynh) + \u4E00 (Nh\u1EA5t)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u73B0\u5728\u5F88\u591A\u4EBA\u559C\u6B22\u5728\u7F51\u4E0A\u4E70\u4E1C\u897F\u3002",
        "pinyin": "Xi\xE0nz\xE0i h\u011Bn du\u014D r\xE9n x\u01D0huan z\xE0i w\u01CEngshang m\u01CEi d\u014Dngxi.",
        "vi": "Hi\u1EC7n nay r\u1EA5t nhi\u1EC1u ng\u01B0\u1EDDi th\xEDch mua s\u1EAFm \u0111\u1ED3 tr\xEAn m\u1EA1ng."
      },
      {
        "zh": "\u7F51\u4E0A\u6709\u5F88\u591A\u514D\u8D39\u7684\u5B66\u4E60\u8D44\u6E90\u3002",
        "pinyin": "W\u01CEngshang y\u01D2u h\u011Bn du\u014D mi\u01CEnf\xE8i de xu\xE9x\xED z\u012Byu\xE1n.",
        "vi": "Tr\xEAn m\u1EA1ng c\xF3 r\u1EA5t nhi\u1EC1u t\xE0i nguy\xEAn h\u1ECDc t\u1EADp mi\u1EC5n ph\xED."
      }
    ],
    "tips": "\u201C\u7F51\u201D t\u1EA5m l\u01B0\u1EDBi k\u1EBFt n\u1ED1i kh\xF4ng gian m\u1EA1ng, \u201C\u4E0A\u201D \u1EDF tr\xEAn kh\xF4ng gian s\u1ED1. Ph\u1ED3n th\u1EC3: \u7DB2\u4E0A."
  },
  {
    "id": "pdf_079",
    "hanzi": "\u516C\u4EA4\u8F66",
    "pinyin": "g\u014Dngji\u0101och\u0113",
    "hanViet": "C\xF4ng Giao Xa",
    "vietnamese": "Xe bu\xFDt, xe bus c\xF4ng c\u1ED9ng",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng ti\u1EC7n giao th\xF4ng",
    "radical": "\u516B (B\xE1t) + \u8F66 (Xa)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u6211\u6BCF\u5929\u5750\u516C\u4EA4\u8F66\u53BB\u4E0A\u73ED\u3002",
        "pinyin": "W\u01D2 m\u011Biti\u0101n zu\xF2 g\u014Dngji\u0101och\u0113 q\xF9 sh\xE0ngb\u0101n.",
        "vi": "T\xF4i \u0111i l\xE0m b\u1EB1ng xe bu\xFDt m\u1ED7i ng\xE0y."
      },
      {
        "zh": "\u516C\u4EA4\u8F66\u4E0A\u4EBA\u5F88\u591A\uFF0C\u5F88\u62E5\u6324\u3002",
        "pinyin": "G\u014Dngji\u0101och\u0113 shang r\xE9n h\u011Bn du\u014D, h\u011Bn y\u014Dngj\u01D0.",
        "vi": "Tr\xEAn xe bu\xFDt r\u1EA5t \u0111\xF4ng ng\u01B0\u1EDDi, kh\xE1 ch\u1EADt ch\u1ED9i."
      }
    ],
    "tips": "\u201C\u516C\u201D c\xF4ng c\u1ED9ng, \u201C\u4EA4\u201D giao th\xF4ng li\xEAn l\u1EA1c, \u201C\u8F66\u201D xe c\u1ED9. Ph\u01B0\u01A1ng ti\u1EC7n di chuy\u1EC3n c\xF4ng c\u1ED9ng \u0111\xF4 th\u1ECB. Ph\u1ED3n th\u1EC3: \u516C\u4EA4\u8ECA."
  },
  {
    "id": "pdf_080",
    "hanzi": "\u5E2E\u5FD9",
    "pinyin": "b\u0101ngm\xE1ng",
    "hanViet": "Bang Mang",
    "vietnamese": "Gi\xFAp \u0111\u1EE1, gi\xFAp m\u1ED9t tay",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB ly h\u1EE3p",
    "level": 2,
    "category": "H\xE0nh vi & X\xE3 giao",
    "radical": "\u5DFE (C\xE2n) + \u5FC4 (T\xE2m)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u80FD\u8BF7\u4F60\u5E2E\u6211\u4E00\u4E2A\u5FD9\u5417\uFF1F",
        "pinyin": "N\xE9ng q\u01D0ng n\u01D0 b\u0101ng w\u01D2 y\xED g\xE8 m\xE1ng ma?",
        "vi": "C\xF3 th\u1EC3 nh\u1EDD b\u1EA1n gi\xFAp t\xF4i m\u1ED9t tay \u0111\u01B0\u1EE3c kh\xF4ng?"
      },
      {
        "zh": "\u975E\u5E38\u611F\u8C22\u4F60\u7684\u70ED\u60C5\u5E2E\u5FD9\uFF01",
        "pinyin": "F\u0113ich\xE1ng g\u01CEnxi\xE8 n\u01D0 de r\xE8q\xEDng b\u0101ngm\xE1ng!",
        "vi": "V\xF4 c\xF9ng c\u1EA3m \u01A1n s\u1EF1 nhi\u1EC7t t\xECnh gi\xFAp \u0111\u1EE1 c\u1EE7a b\u1EA1n!"
      }
    ],
    "tips": "\u201C\u5E2E\u201D gi\xFAp \u0111\u1EE1 t\u01B0\u01A1ng tr\u1EE3, \u201C\u5FD9\u201D b\u1EADn r\u1ED9n nhi\u1EC1u vi\u1EC7c. Gi\xFAp \u0111\u1EE1 khi ng\u01B0\u1EDDi kh\xE1c \u0111ang b\u1EADn r\u1ED9n kh\xF3 kh\u0103n. Ph\u1ED3n th\u1EC3: \u5E6B\u5FD9."
  },
  {
    "id": "pdf_081",
    "hanzi": "\u5317\u4EAC\u5927\u5B66",
    "pinyin": "B\u011Bij\u012Bng D\xE0xu\xE9",
    "hanViet": "B\u1EAFc Kinh \u0110\u1EA1i H\u1ECDc",
    "vietnamese": "\u0110\u1EA1i h\u1ECDc B\u1EAFc Kinh (B\u1EAFc \u0110\u1EA1i - PKU)",
    "partOfSpeech": "Danh t\u1EEB ri\xEAng",
    "level": 3,
    "category": "Gi\xE1o d\u1EE5c & \u0110\u1ECBa danh",
    "radical": "\u4EA0 (\u0110\u1EA7u) + \u5B50 (T\u1EED)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u5317\u4EAC\u5927\u5B66\u662F\u4E2D\u56FD\u6700\u8457\u540D\u7684\u9AD8\u7B49\u5B66\u5E9C\u4E4B\u4E00\u3002",
        "pinyin": "B\u011Bij\u012Bng D\xE0xu\xE9 sh\xEC Zh\u014Dnggu\xF3 zu\xEC zh\xF9m\xEDng de g\u0101od\u011Bng xu\xE9f\u01D4 zh\u012By\u012B.",
        "vi": "\u0110\u1EA1i h\u1ECDc B\u1EAFc Kinh l\xE0 m\u1ED9t trong nh\u1EEFng c\u01A1 s\u1EDF gi\xE1o d\u1EE5c \u0111\u1EA1i h\u1ECDc danh ti\u1EBFng nh\u1EA5t Trung Qu\u1ED1c."
      },
      {
        "zh": "\u4ED6\u7684\u68A6\u60F3\u662F\u8003\u4E0A\u5317\u4EAC\u5927\u5B66\u3002",
        "pinyin": "T\u0101 de m\xE8ngxi\u01CEng sh\xEC k\u01CEosh\xE0ng B\u011Bij\u012Bng D\xE0xu\xE9.",
        "vi": "\u01AF\u1EDBc m\u01A1 c\u1EE7a c\u1EADu \u1EA5y l\xE0 thi \u0111\u1ED7 v\xE0o \u0110\u1EA1i h\u1ECDc B\u1EAFc Kinh."
      }
    ],
    "tips": "\u0110\u1EA1i h\u1ECDc B\u1EAFc Kinh (th\u01B0\u1EDDng g\u1ECDi t\u1EAFt l\xE0 \u201CB\u1EAFc \u0110\u1EA1i\u201D \u5317\u5927), bi\u1EC3u t\u01B0\u1EE3ng h\u1ECDc thu\u1EADt h\xE0ng \u0111\u1EA7u ch\xE2u \xC1. Ph\u1ED3n th\u1EC3: \u5317\u4EAC\u5927\u5B78."
  },
  {
    "id": "pdf_082",
    "hanzi": "\u4E07",
    "pinyin": "w\xE0n",
    "hanViet": "V\u1EA1n",
    "vietnamese": "M\u01B0\u1EDDi ngh\xECn (10.000), mu\xF4n v\u1EA1n",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 2,
    "category": "S\u1ED1 \u0111\u1EBFm",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u624B\u673A\u552E\u4EF7\u4E09\u4E07\u591A\u5757\u94B1\u3002",
        "pinyin": "Zh\xE8 ge sh\u01D2uj\u012B sh\xF2uji\xE0 s\u0101n w\xE0n du\u014D ku\xE0i qi\xE1n.",
        "vi": "Chi\u1EBFc \u0111i\u1EC7n tho\u1EA1i n\xE0y gi\xE1 b\xE1n h\u01A1n ba v\u1EA1n t\u1EC7 (h\u01A1n 30.000 t\u1EC7)."
      },
      {
        "zh": "\u795D\u5927\u5BB6\u4E07\u4E8B\u5982\u610F\uFF0C\u8EAB\u4F53\u5065\u5EB7\uFF01",
        "pinyin": "Zh\xF9 d\xE0ji\u0101 w\xE0nsh\xEC r\xFAy\xEC, sh\u0113nt\u01D0 ji\xE0nk\u0101ng!",
        "vi": "Ch\xFAc m\u1ECDi ng\u01B0\u1EDDi mu\xF4n s\u1EF1 nh\u01B0 \xFD, s\u1EE9c kh\u1ECFe d\u1ED3i d\xE0o!"
      }
    ],
    "tips": "\u0110\u01A1n v\u1ECB \u0111\u1EBFm 4 s\u1ED1 0 trong h\u1EC7 th\u1ED1ng s\u1ED1 Trung Qu\u1ED1c: 1 v\u1EA1n (\u4E07) = 10.000. Ph\u1ED3n th\u1EC3: \u842C."
  },
  {
    "id": "pdf_083",
    "hanzi": "\u5C31",
    "pinyin": "ji\xF9",
    "hanViet": "T\u1EF1u",
    "vietnamese": "Th\xEC, li\u1EC1n, ngay, ch\xEDnh l\xE0",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "Ng\u1EEF ph\xE1p li\xEAn k\u1EBFt & Th\u1EDDi gian",
    "radical": "\u4EA0 (\u0110\u1EA7u) + \u5C22 (U\xF4ng)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u6211\u5403\u4E86\u65E9\u996D\u5C31\u53BB\u4E0A\u73ED\u3002",
        "pinyin": "W\u01D2 ch\u012B le z\u01CEof\xE0n ji\xF9 q\xF9 sh\xE0ngb\u0101n.",
        "vi": "T\xF4i \u0103n s\xE1ng xong l\xE0 \u0111i l\xE0m ngay."
      },
      {
        "zh": "\u8FD9\u4F4D\u5C31\u662F\u6211\u4EEC\u65B0\u6765\u7684\u6C49\u8BED\u8001\u5E08\u3002",
        "pinyin": "Zh\xE8 w\xE8i ji\xF9 sh\xEC w\u01D2men x\u012Bn l\xE1i de H\xE0ny\u01D4 l\u01CEosh\u012B.",
        "vi": "V\u1ECB n\xE0y ch\xEDnh l\xE0 gi\xE1o vi\xEAn ti\u1EBFng Trung m\u1EDBi \u0111\u1EBFn c\u1EE7a ch\xFAng t\xF4i."
      }
    ],
    "tips": "B\xEAn tr\xE1i l\xE0 Kinh (\u4EAC), b\xEAn ph\u1EA3i l\xE0 V\u01B0u (\u5C24). Bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng ti\u1EBFp di\u1EC5n nhanh ch\xF3ng ho\u1EB7c nh\u1EA5n m\u1EA1nh kh\u1EB3ng \u0111\u1ECBnh. Ph\u1ED3n th\u1EC3: \u5C31."
  },
  {
    "id": "pdf_084",
    "hanzi": "\u4E0D\u597D\u610F\u601D",
    "pinyin": "b\xF9 h\u01CEoy\xECsi",
    "hanViet": "B\u1EA5t H\u1EA3o \xDD T\u1EE9",
    "vietnamese": "Ng\u1EA1i qu\xE1, xin l\u1ED7i, l\xE0m phi\u1EC1n b\u1EA1n qu\xE1",
    "partOfSpeech": "C\u1EE5m t\u1EEB x\xE3 giao",
    "level": 2,
    "category": "X\xE3 giao & L\u1ECBch s\u1EF1",
    "radical": "\u4E00 (Nh\u1EA5t) + \u5FC3 (T\xE2m)",
    "strokeCount": 22,
    "examples": [
      {
        "zh": "\u4E0D\u597D\u610F\u601D\uFF0C\u6253\u6270\u60A8\u4E00\u4E0B\u3002",
        "pinyin": "B\xF9 h\u01CEoy\xECsi, d\u01CEr\u01CEo n\xEDn y\xEDxi\xE0.",
        "vi": "Ng\u1EA1i qu\xE1, xin l\xE0m phi\u1EC1n b\xE1c m\u1ED9t ch\xFAt."
      },
      {
        "zh": "\u8BA9\u4F60\u4E45\u7B49\u4E86\uFF0C\u771F\u4E0D\u597D\u610F\u601D\uFF01",
        "pinyin": "R\xE0ng n\u01D0 ji\u01D4 d\u011Bng le, zh\u0113n b\xF9 h\u01CEoy\xECsi!",
        "vi": "\u0110\u1EC3 b\u1EA1n \u0111\u1EE3i l\xE2u r\u1ED3i, th\u1EADt ng\u1EA1i qu\xE1!"
      }
    ],
    "tips": "\u201C\u4E0D\u597D\u610F\u601D\u201D l\xE0 c\xE2u c\u1EEDa mi\u1EC7ng l\u1ECBch s\u1EF1 ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a ng\u01B0\u1EDDi Trung Qu\u1ED1c khi xin l\u1ED7i nh\u1EB9 nh\xE0ng ho\u1EB7c nh\u1EDD v\u1EA3. Ph\u1ED3n th\u1EC3: \u4E0D\u597D\u610F\u601D."
  },
  {
    "id": "pdf_085",
    "hanzi": "\u8FC7",
    "pinyin": "gu\xF2",
    "hanViet": "Qu\xE1 / Qua",
    "vietnamese": "Qua, \u0111i qua; t\u1EEBng (tr\u1EE3 t\u1EEB ch\u1EC9 kinh nghi\u1EC7m)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Tr\u1EE3 t\u1EEB \u0111\u1ED9ng th\xE1i",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Ng\u1EEF ph\xE1p",
    "radical": "\u8FB6 (X\u01B0\u1EDBc)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u6211\u53BB\u8FC7\u4E00\u6B21\u5317\u4EAC\u3002",
        "pinyin": "W\u01D2 q\xF9 guo y\xED c\xEC B\u011Bij\u012Bng.",
        "vi": "T\xF4i t\u1EEBng \u0111i B\u1EAFc Kinh m\u1ED9t l\u1EA7n."
      },
      {
        "zh": "\u8FC7\u9A6C\u8DEF\u7684\u65F6\u5019\u8981\u5C0F\u5FC3\u3002",
        "pinyin": "Gu\xF2 m\u01CEl\xF9 de sh\xEDhou y\xE0o xi\u01CEox\u012Bn.",
        "vi": "Khi \u0111i qua \u0111\u01B0\u1EDDng c\u1EA7n ph\u1EA3i c\u1EA9n th\u1EADn."
      }
    ],
    "tips": "G\u1ED3m b\u1ED9 X\u01B0\u1EDBc (\u8FB6 - b\u01B0\u1EDBc \u0111i) v\xE0 ch\u1EEF Th\u1ED1n (\u5BF8). B\u01B0\u1EDBc \u0111i qua m\u1ED9t kho\u1EA3ng c\xE1ch. Khi l\xE0m tr\u1EE3 t\u1EEB \u0111\u1EB7t sau \u0111\u1ED9ng t\u1EEB bi\u1EC3u th\u1ECB t\u1EEBng tr\u1EA3i nghi\u1EC7m. Ph\u1ED3n th\u1EC3: \u904E."
  },
  {
    "id": "pdf_086",
    "hanzi": "\u5546\u573A",
    "pinyin": "sh\u0101ngch\u01CEng",
    "hanViet": "Th\u01B0\u01A1ng Tr\u01B0\u1EDDng",
    "vietnamese": "Trung t\xE2m th\u01B0\u01A1ng m\u1EA1i, khu mua s\u1EAFm",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Mua s\u1EAFm & \u0110\u1ECBa \u0111i\u1EC3m",
    "radical": "\u4EA0 (\u0110\u1EA7u) + \u571F (Th\u1ED5)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u5468\u672B\u8FD9\u5BB6\u5546\u573A\u91CC\u4EBA\u5F88\u591A\u3002",
        "pinyin": "Zh\u014Dum\xF2 zh\xE8 ji\u0101 sh\u0101ngch\u01CEng l\u01D0 r\xE9n h\u011Bn du\u014D.",
        "vi": "Cu\u1ED1i tu\u1EA7n trung t\xE2m th\u01B0\u01A1ng m\u1EA1i n\xE0y r\u1EA5t \u0111\xF4ng ng\u01B0\u1EDDi."
      },
      {
        "zh": "\u6211\u4EEC\u53BB\u5546\u573A\u4E70\u8863\u670D\u5427\u3002",
        "pinyin": "W\u01D2men q\xF9 sh\u0101ngch\u01CEng m\u01CEi y\u012Bfu ba.",
        "vi": "Ch\xFAng m\xECnh \u0111\u1EBFn trung t\xE2m th\u01B0\u01A1ng m\u1EA1i mua qu\u1EA7n \xE1o \u0111i."
      }
    ],
    "tips": "\u5546 (Th\u01B0\u01A1ng - bu\xF4n b\xE1n, th\u01B0\u01A1ng m\u1EA1i) + \u573A (Tr\u01B0\u1EDDng - n\u01A1i ch\u1ED1n, qu\u1EA3ng tr\u01B0\u1EDDng): N\u01A1i t\u1EADp trung bu\xF4n b\xE1n s\u1EA7m u\u1EA5t. Ph\u1ED3n th\u1EC3: \u5546\u5834."
  },
  {
    "id": "pdf_087",
    "hanzi": "\u8FDB\u53BB",
    "pinyin": "j\xECnqu",
    "hanViet": "Ti\u1EBFn Kh\u1EE9",
    "vietnamese": "\u0110i v\xE0o, b\u01B0\u1EDBc v\xE0o (h\u01B0\u1EDBng ra xa ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Ph\u01B0\u01A1ng h\u01B0\u1EDBng",
    "radical": "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u5916\u9762\u5F88\u51B7\uFF0C\u5FEB\u8FDB\u53BB\u5427\u3002",
        "pinyin": "W\xE0imi\xE0n h\u011Bn l\u011Bng, ku\xE0i j\xECnqu ba.",
        "vi": "B\xEAn ngo\xE0i r\u1EA5t l\u1EA1nh, mau \u0111i v\xE0o trong \u0111i."
      },
      {
        "zh": "\u4ED6\u63A8\u5F00\u95E8\u8D70\u4E86\u8FDB\u53BB\u3002",
        "pinyin": "T\u0101 tu\u012Bk\u0101i m\xE9n z\u01D2u le j\xECnqu.",
        "vi": "Anh \u1EA5y \u0111\u1EA9y c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o trong."
      }
    ],
    "tips": "\u8FDB (Ti\u1EBFn - ti\u1EBFn v\xE0o trong) + \u53BB (Kh\u1EE9 - \u0111i xa kh\u1ECFi ng\u01B0\u1EDDi n\xF3i): H\xE0nh \u0111\u1ED9ng di chuy\u1EC3n v\xE0o b\xEAn trong."
  },
  {
    "id": "pdf_088",
    "hanzi": "\u88E4\u5B50",
    "pinyin": "k\xF9zi",
    "hanViet": "Kh\u1ED1 T\u1EED",
    "vietnamese": "Chi\u1EBFc qu\u1EA7n, c\xE1i qu\u1EA7n",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Trang ph\u1EE5c & Mua s\u1EAFm",
    "radical": "\u8864 (Y) + \u5B50 (T\u1EED)",
    "strokeCount": 15,
    "examples": [
      {
        "zh": "\u8FD9\u6761\u88E4\u5B50\u6709\u70B9\u513F\u957F\u3002",
        "pinyin": "Zh\xE8 ti\xE1o k\xF9zi y\u01D2udi\u01CEnr ch\xE1ng.",
        "vi": "Chi\u1EBFc qu\u1EA7n n\xE0y h\u01A1i d\xE0i m\u1ED9t ch\xFAt."
      },
      {
        "zh": "\u4F60\u7A7F\u8FD9\u6761\u9ED1\u8272\u7684\u88E4\u5B50\u5F88\u597D\u770B\u3002",
        "pinyin": "N\u01D0 chu\u0101n zh\xE8 ti\xE1o h\u0113is\xE8 de k\xF9zi h\u011Bn h\u01CEok\xE0n.",
        "vi": "B\u1EA1n m\u1EB7c chi\u1EBFc qu\u1EA7n m\xE0u \u0111en n\xE0y r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "\u88E4 mang b\u1ED9 Y (\u8864- trang ph\u1EE5c) v\xE0 ch\u1EEF Kh\u1ED1 (\u5E93 - nh\xE0 kho). T\u1EED (\u5B50) l\xE0 h\u1EADu t\u1ED1 danh t\u1EEB. L\u01B0\u1EE3ng t\u1EEB l\xE0 \u6761 (ti\xE1o). Ph\u1ED3n th\u1EC3: \u8932\u5B50."
  },
  {
    "id": "pdf_089",
    "hanzi": "\u767D\u8272",
    "pinyin": "b\xE1is\xE8",
    "hanViet": "B\u1EA1ch S\u1EAFc",
    "vietnamese": "M\xE0u tr\u1EAFng",
    "partOfSpeech": "Danh t\u1EEB / T\xEDnh t\u1EEB",
    "level": 2,
    "category": "M\xE0u s\u1EAFc",
    "radical": "\u767D (B\u1EA1ch) + \u2E88 (S\u1EAFc)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u559C\u6B22\u7A7F\u767D\u8272\u7684\u886C\u886B\u3002",
        "pinyin": "W\u01D2 x\u01D0huan chu\u0101n b\xE1is\xE8 de ch\xE8nsh\u0101n.",
        "vi": "T\xF4i th\xEDch m\u1EB7c \xE1o s\u01A1 mi m\xE0u tr\u1EAFng."
      },
      {
        "zh": "\u51AC\u5929\u4E0B\u96EA\u4E86\uFF0C\u5230\u5904\u90FD\u662F\u767D\u8272\u7684\u3002",
        "pinyin": "D\u014Dngti\u0101n xi\xE0xu\u011B le, d\xE0och\xF9 d\u014Du sh\xEC b\xE1is\xE8 de.",
        "vi": "M\xF9a \u0111\xF4ng tuy\u1EBFt r\u01A1i, kh\u1EAFp n\u01A1i \u0111\u1EC1u l\xE0 m\xE0u tr\u1EAFng."
      }
    ],
    "tips": "\u767D (B\u1EA1ch - m\xE0u tr\u1EAFng tinh kh\xF4i) + \u8272 (S\u1EAFc - m\xE0u s\u1EAFc). Bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a s\u1EF1 trong tr\u1EBBo, gi\u1EA3n d\u1ECB, tinh khi\u1EBFt."
  },
  {
    "id": "pdf_090",
    "hanzi": "\u56E0\u4E3A",
    "pinyin": "y\u012Bnw\xE8i",
    "hanViet": "Nh\xE2n Vi",
    "vietnamese": "B\u1EDFi v\xEC, v\xEC",
    "partOfSpeech": "Li\xEAn t\u1EEB",
    "level": 2,
    "category": "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    "radical": "\u56D7 (Vi) + \u4E36 (Ch\u1EE7)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u56E0\u4E3A\u4E0B\u96E8\uFF0C\u6240\u4EE5\u6211\u4EEC\u6CA1\u53BB\u516C\u56ED\u3002",
        "pinyin": "Y\u012Bnw\xE8i xi\xE0y\u01D4, su\u01D2y\u01D0 w\u01D2men m\xE9i q\xF9 g\u014Dngyu\xE1n.",
        "vi": "B\u1EDFi v\xEC tr\u1EDDi m\u01B0a n\xEAn ch\xFAng t\xF4i kh\xF4ng \u0111i c\xF4ng vi\xEAn."
      },
      {
        "zh": "\u4ED6\u4ECA\u5929\u6CA1\u6765\uFF0C\u56E0\u4E3A\u4ED6\u751F\u75C5\u4E86\u3002",
        "pinyin": "T\u0101 j\u012Bnti\u0101n m\xE9i l\xE1i, y\u012Bnw\xE8i t\u0101 sh\u0113ngb\xECng le.",
        "vi": "H\xF4m nay anh \u1EA5y kh\xF4ng \u0111\u1EBFn v\xEC anh \u1EA5y b\u1ECB \u1ED1m."
      }
    ],
    "tips": "\u56E0 (Nh\xE2n - nguy\xEAn do) + \u4E3A (Vi - l\xE0m v\xEC). Th\u01B0\u1EDDng k\u1EBFt h\u1EE3p v\u1EDBi \u6240\u4EE5 (su\u01D2y\u01D0) t\u1EA1o c\u1EA5u tr\xFAc 'B\u1EDFi v\xEC... cho n\xEAn...'. Ph\u1ED3n th\u1EC3: \u56E0\u70BA."
  },
  {
    "id": "pdf_091",
    "hanzi": "\u7EA2\u8272",
    "pinyin": "h\xF3ngs\xE8",
    "hanViet": "H\u1ED3ng S\u1EAFc",
    "vietnamese": "M\xE0u \u0111\u1ECF",
    "partOfSpeech": "Danh t\u1EEB / T\xEDnh t\u1EEB",
    "level": 2,
    "category": "M\xE0u s\u1EAFc",
    "radical": "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u4E2D\u56FD\u65B0\u5E74\u5927\u5BB6\u5E38\u7A7F\u7EA2\u8272\u7684\u8863\u670D\u3002",
        "pinyin": "Zh\u014Dnggu\xF3 x\u012Bnni\xE1n d\xE0ji\u0101 ch\xE1ng chu\u0101n h\xF3ngs\xE8 de y\u012Bfu.",
        "vi": "V\xE0o T\u1EBFt Nguy\xEAn \u0110\xE1n Trung Qu\u1ED1c, m\u1ECDi ng\u01B0\u1EDDi th\u01B0\u1EDDng m\u1EB7c \u0111\u1ED3 m\xE0u \u0111\u1ECF."
      },
      {
        "zh": "\u90A3\u4E2A\u7EA2\u8272\u7684\u82F9\u679C\u770B\u8D77\u6765\u5F88\u597D\u5403\u3002",
        "pinyin": "N\xE0 ge h\xF3ngs\xE8 de p\xEDnggu\u01D2 k\xE0n q\u01D0l\xE1i h\u011Bn h\u01CEoch\u012B.",
        "vi": "Qu\u1EA3 t\xE1o m\xE0u \u0111\u1ECF kia tr\xF4ng ngon qu\xE1."
      }
    ],
    "tips": "\u7EA2 mang b\u1ED9 M\u1ECBch (\u7E9F- s\u1EE3i t\u01A1 nhu\u1ED9m \u0111\u1ECF r\u1EF1c r\u1EE1) k\u1EBFt h\u1EE3p C\xF4ng (\u5DE5). T\u01B0\u1EE3ng tr\u01B0ng cho may m\u1EAFn, ph\xFAc l\u1ED9c v\xE0 hoan h\u1EF7. Ph\u1ED3n th\u1EC3: \u7D05\u8272."
  },
  {
    "id": "pdf_092",
    "hanzi": "\u6240\u4EE5",
    "pinyin": "su\u01D2y\u01D0",
    "hanViet": "S\u1EDF D\u0129",
    "vietnamese": "Cho n\xEAn, v\xEC th\u1EBF, do \u0111\xF3",
    "partOfSpeech": "Li\xEAn t\u1EEB",
    "level": 2,
    "category": "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    "radical": "\u6237 (H\u1ED9) + \u4EBA (Nh\xE2n)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u6211\u5F88\u5FD9\uFF0C\u6240\u4EE5\u4E0D\u80FD\u548C\u4F60\u53BB\u5403\u996D\u3002",
        "pinyin": "J\u012Bnti\u0101n w\u01D2 h\u011Bn m\xE1ng, su\u01D2y\u01D0 b\xF9 n\xE9ng h\xE9 n\u01D0 q\xF9 ch\u012Bf\xE0n.",
        "vi": "H\xF4m nay t\xF4i r\u1EA5t b\u1EADn, cho n\xEAn kh\xF4ng th\u1EC3 \u0111i \u0103n c\u01A1m c\xF9ng b\u1EA1n."
      },
      {
        "zh": "\u4ED6\u5F88\u52AA\u529B\uFF0C\u6240\u4EE5\u6210\u7EE9\u5F88\u597D\u3002",
        "pinyin": "T\u0101 h\u011Bn n\u01D4l\xEC, su\u01D2y\u01D0 ch\xE9ngj\xEC h\u011Bn h\u01CEo.",
        "vi": "Anh \u1EA5y r\u1EA5t ch\u0103m ch\u1EC9, v\xEC th\u1EBF th\xE0nh t\xEDch r\u1EA5t t\u1ED1t."
      }
    ],
    "tips": "\u6240 (S\u1EDF - n\u01A1i ch\u1ED1n, nguy\xEAn do) + \u4EE5 (D\u0129 - l\u1EA5y \u0111\xF3 l\xE0m l\xFD do). D\u1EABn xu\u1EA5t k\u1EBFt qu\u1EA3 t\u1EA5t y\u1EBFu t\u1EEB nguy\xEAn nh\xE2n tr\u01B0\u1EDBc \u0111\xF3."
  },
  {
    "id": "pdf_093",
    "hanzi": "\u4E66\u5305",
    "pinyin": "sh\u016Bb\u0101o",
    "hanViet": "Th\u01B0 Bao",
    "vietnamese": "C\u1EB7p s\xE1ch, ba l\xF4 \u0111i h\u1ECDc",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u0110\u1ED3 d\xF9ng h\u1ECDc t\u1EADp",
    "radical": "\u4E5B (\u1EA4t) + \u52F9 (Bao)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4ED6\u7684\u4E66\u5305\u91CC\u88C5\u6EE1\u4E86\u8BFE\u672C\u3002",
        "pinyin": "T\u0101 de sh\u016Bb\u0101o l\u01D0 zhu\u0101ng m\u01CEn le k\xE8b\u011Bn.",
        "vi": "Trong c\u1EB7p s\xE1ch c\u1EE7a c\u1EADu \u1EA5y ch\u1EE9a \u0111\u1EA7y s\xE1ch gi\xE1o khoa."
      },
      {
        "zh": "\u8FD9\u4E2A\u4E66\u5305\u8D28\u91CF\u5F88\u597D\uFF0C\u4E5F\u5F88\u8F7B\u3002",
        "pinyin": "Zh\xE8 ge sh\u016Bb\u0101o zh\xECli\xE0ng h\u011Bn h\u01CEo, y\u011B h\u011Bn q\u012Bng.",
        "vi": "Chi\u1EBFc c\u1EB7p s\xE1ch n\xE0y ch\u1EA5t l\u01B0\u1EE3ng r\u1EA5t t\u1ED1t v\xE0 c\u0169ng r\u1EA5t nh\u1EB9."
      }
    ],
    "tips": "\u4E66 (Th\u01B0 - s\xE1ch v\u1EDF) + \u5305 (Bao - b\u1ECDc, t\xFAi x\xE1ch). Chi\u1EBFc t\xFAi \u0111\u1EF1ng s\xE1ch v\u1EDF t\xE0i li\u1EC7u c\u1EE7a h\u1ECDc sinh. Ph\u1ED3n th\u1EC3: \u66F8\u5305."
  },
  {
    "id": "pdf_094",
    "hanzi": "\u8FC7\u53BB",
    "pinyin": "gu\xF2qu",
    "hanViet": "Qu\xE1 Kh\u1EE9",
    "vietnamese": "\u0110i qua, qua b\xEAn kia; (gu\xF2q\xF9) qu\xE1 kh\u1EE9, tr\u01B0\u1EDBc \u0111\xE2y",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng / Danh t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian & H\xE0nh \u0111\u1ED9ng",
    "radical": "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u8D70\u8FC7\u53BB\u770B\u770B\u5427\u3002",
        "pinyin": "W\u01D2men z\u01D2u gu\xF2qu k\xE0nkan ba.",
        "vi": "Ch\xFAng m\xECnh \u0111i qua \u0111\xF3 xem th\u1EED \u0111i."
      },
      {
        "zh": "\u8FC7\u53BB\u7684\u4E8B\u5C31\u8BA9\u5B83\u8FC7\u53BB\u5427\u3002",
        "pinyin": "Gu\xF2q\xF9 de sh\xEC ji\xF9 r\xE0ng t\u0101 gu\xF2qu ba.",
        "vi": "Chuy\u1EC7n qu\xE1 kh\u1EE9 th\xEC c\u1EE9 \u0111\u1EC3 n\xF3 tr\xF4i qua \u0111i."
      }
    ],
    "tips": "\u8FC7 (\u0110i qua m\u1ED9t ranh gi\u1EDBi) + \u53BB (\u0110i xa kh\u1ECFi ng\u01B0\u1EDDi n\xF3i). \u0110\u1ECDc thanh nh\u1EB9 khi l\xE0m \u0111\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng, \u0111\u1ECDc thanh 4 khi ch\u1EC9 m\u1ED1c th\u1EDDi gian qu\xE1 kh\u1EE9. Ph\u1ED3n th\u1EC3: \u904E\u53BB."
  },
  {
    "id": "pdf_095",
    "hanzi": "\u7EFF\u8272",
    "pinyin": "l\u01DCs\xE8",
    "hanViet": "L\u1EE5c S\u1EAFc",
    "vietnamese": "M\xE0u xanh l\xE1 c\xE2y",
    "partOfSpeech": "Danh t\u1EEB / T\xEDnh t\u1EEB",
    "level": 2,
    "category": "M\xE0u s\u1EAFc",
    "radical": "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u516C\u56ED\u91CC\u6709\u5F88\u591A\u7EFF\u8272\u7684\u6811\u6728\u3002",
        "pinyin": "G\u014Dngyu\xE1n l\u01D0 y\u01D2u h\u011Bn du\u014D l\u01DCs\xE8 de sh\xF9m\xF9.",
        "vi": "Trong c\xF4ng vi\xEAn c\xF3 r\u1EA5t nhi\u1EC1u c\xE2y c\u1ED1i m\xE0u xanh l\xE1."
      },
      {
        "zh": "\u591A\u770B\u7EFF\u8272\u5BF9\u773C\u775B\u597D\u3002",
        "pinyin": "Du\u014D k\xE0n l\u01DCs\xE8 du\xEC y\u01CEnjing h\u01CEo.",
        "vi": "Nh\xECn nhi\u1EC1u m\xE0u xanh l\xE1 c\xE2y r\u1EA5t t\u1ED1t cho m\u1EAFt."
      }
    ],
    "tips": "\u7EFF mang b\u1ED9 M\u1ECBch (\u7E9F- s\u1EE3i t\u01A1 nhu\u1ED9m m\xE0u l\u1EE5c c\u1ECF c\xE2y) + L\u1EE5c (\u5F55). T\u01B0\u1EE3ng tr\u01B0ng cho thi\xEAn nhi\xEAn, s\u1EE9c s\u1ED1ng v\xE0 s\u1EF1 t\u01B0\u01A1i m\xE1t. Ph\u1ED3n th\u1EC3: \u7DA0\u8272."
  },
  {
    "id": "pdf_096",
    "hanzi": "\u9ED1\u8272",
    "pinyin": "h\u0113is\xE8",
    "hanViet": "H\u1EAFc S\u1EAFc",
    "vietnamese": "M\xE0u \u0111en",
    "partOfSpeech": "Danh t\u1EEB / T\xEDnh t\u1EEB",
    "level": 2,
    "category": "M\xE0u s\u1EAFc",
    "radical": "\u9ED1 (H\u1EAFc) + \u2E88 (S\u1EAFc)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u4ED6\u6234\u7740\u4E00\u526F\u9ED1\u8272\u7684\u773C\u955C\u3002",
        "pinyin": "T\u0101 d\xE0i zhe y\xED f\xF9 h\u0113is\xE8 de y\u01CEnj\xECng.",
        "vi": "Anh \u1EA5y \u0111eo m\u1ED9t c\u1EB7p k\xEDnh m\u1EAFt m\xE0u \u0111en."
      },
      {
        "zh": "\u6211\u4E70\u4E86\u4E00\u8F86\u9ED1\u8272\u7684\u81EA\u884C\u8F66\u3002",
        "pinyin": "W\u01D2 m\u01CEi le y\xED li\xE0ng h\u0113is\xE8 de z\xECx\xEDngch\u0113.",
        "vi": "T\xF4i \u0111\xE3 mua m\u1ED9t chi\u1EBFc xe \u0111\u1EA1p m\xE0u \u0111en."
      }
    ],
    "tips": "\u9ED1 (H\u1EAFc - \u1ED1ng kh\xF3i v\u1EDBi b\u1ED1n \u0111\u1ED1m l\u1EEDa b\u1ED1c kh\xF3i \u0111en) + \u8272 (S\u1EAFc). Bi\u1EC3u th\u1ECB m\xE0u t\u1ED1i, trang tr\u1ECDng, huy\u1EC1n b\xED."
  },
  {
    "id": "pdf_097",
    "hanzi": "\u66F4",
    "pinyin": "g\xE8ng",
    "hanViet": "Canh / C\xE1nh",
    "vietnamese": "C\xE0ng, h\u01A1n n\u1EEFa (d\xF9ng trong c\xE2u so s\xE1nh)",
    "partOfSpeech": "Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "Ph\xF3 t\u1EEB & So s\xE1nh",
    "radical": "\u66F0 (Vi\u1EBFt)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u660E\u5929\u5929\u6C14\u4F1A\u66F4\u597D\u3002",
        "pinyin": "M\xEDngti\u0101n ti\u0101nq\xEC hu\xEC g\xE8ng h\u01CEo.",
        "vi": "Th\u1EDDi ti\u1EBFt ng\xE0y mai s\u1EBD c\xE0ng t\u1ED1t h\u01A1n n\u1EEFa."
      },
      {
        "zh": "\u8FD9\u672C\u4E66\u6BD4\u90A3\u672C\u66F4\u6709\u610F\u601D\u3002",
        "pinyin": "Zh\xE8 b\u011Bn sh\u016B b\u01D0 n\xE0 b\u011Bn g\xE8ng y\u01D2u y\xECsi.",
        "vi": "Cu\u1ED1n s\xE1ch n\xE0y th\xFA v\u1ECB h\u01A1n cu\u1ED1n s\xE1ch kia."
      }
    ],
    "tips": "Ch\u1EEF Canh \u66F4 ban \u0111\u1EA7u ch\u1EC9 vi\u1EC7c \u0111\xE1nh tr\u1ED1ng canh \u0111\u1ED5i gi\u1EDD. V\u1EC1 sau chuy\u1EC3n ngh\u0129a th\xE0nh ph\xF3 t\u1EEB so s\xE1nh bi\u1EC3u th\u1ECB m\u1EE9c \u0111\u1ED9 cao h\u01A1n n\u1EEFa."
  },
  {
    "id": "pdf_098",
    "hanzi": "\u989C\u8272",
    "pinyin": "y\xE1ns\xE8",
    "hanViet": "Nhan S\u1EAFc",
    "vietnamese": "M\xE0u s\u1EAFc",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "M\xE0u s\u1EAFc & Mi\xEAu t\u1EA3",
    "radical": "\u9875 (Hi\u1EC7t) + \u2E88 (S\u1EAFc)",
    "strokeCount": 21,
    "examples": [
      {
        "zh": "\u4F60\u6700\u559C\u6B22\u4EC0\u4E48\u989C\u8272\uFF1F",
        "pinyin": "N\u01D0 zu\xEC x\u01D0huan sh\xE9nme y\xE1ns\xE8?",
        "vi": "B\u1EA1n th\xEDch m\xE0u s\u1EAFc n\xE0o nh\u1EA5t?"
      },
      {
        "zh": "\u8FD9\u79CD\u82B1\u7684\u989C\u8272\u975E\u5E38\u6F02\u4EAE\u3002",
        "pinyin": "Zh\xE8 zh\u01D2ng hu\u0101 de y\xE1ns\xE8 f\u0113ich\xE1ng pi\xE0oliang.",
        "vi": "M\xE0u s\u1EAFc c\u1EE7a lo\xE0i hoa n\xE0y v\xF4 c\xF9ng \u0111\u1EB9p \u0111\u1EBD."
      }
    ],
    "tips": "\u989C (Nhan - khu\xF4n m\u1EB7t, th\u1EA7n s\u1EAFc, g\u1ED3m b\u1ED9 Hi\u1EC7t \u9875) + \u8272 (S\u1EAFc - m\xE0u v\u1EBB). Ngh\u0129a g\u1ED1c l\xE0 s\u1EAFc di\u1EC7n g\u01B0\u01A1ng m\u1EB7t, m\u1EDF r\u1ED9ng ra m\u1ECDi m\xE0u s\u1EAFc trong t\u1EF1 nhi\xEAn. Ph\u1ED3n th\u1EC3: \u984F\u8272."
  },
  {
    "id": "pdf_099",
    "hanzi": "\u5FEB",
    "pinyin": "ku\xE0i",
    "hanViet": "Kho\xE1i",
    "vietnamese": "Nhanh, mau ch\xF3ng; s\u1EAFp (s\u1EAFp s\u1EEDa)",
    "partOfSpeech": "T\xEDnh t\u1EEB / Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "T\xEDnh ch\u1EA5t & T\u1ED1c \u0111\u1ED9",
    "radical": "\u5FC4 (T\xE2m)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4ED6\u8D70\u5F97\u975E\u5E38\u5FEB\u3002",
        "pinyin": "T\u0101 z\u01D2u de f\u0113ich\xE1ng ku\xE0i.",
        "vi": "Anh \u1EA5y \u0111i r\u1EA5t nhanh."
      },
      {
        "zh": "\u5FEB\u70B9\u513F\uFF0C\u706B\u8F66\u8981\u5F00\u4E86\uFF01",
        "pinyin": "Ku\xE0i di\u01CEnr, hu\u01D2ch\u0113 y\xE0o k\u0101i le!",
        "vi": "Nhanh l\xEAn ch\xFAt, xe l\u1EEDa s\u1EAFp ch\u1EA1y r\u1ED3i!"
      }
    ],
    "tips": "B\u1ED9 T\xE2m \u0111\u1EE9ng (\u5FC4) ch\u1EC9 t\xE2m tr\u1EA1ng h\xE2n hoan s\u1EA3ng kho\xE1i v\xE0 t\xEDnh mau l\u1EB9 kh\u1EA9n tr\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u5FEB."
  },
  {
    "id": "pdf_100",
    "hanzi": "\u4E0B\u6765",
    "pinyin": "xi\xE0lai",
    "hanViet": "H\u1EA1 Lai",
    "vietnamese": "\u0110i xu\u1ED1ng, xu\u1ED1ng \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    "radical": "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u5728\u697C\u4E0A\u7B49\u6211\uFF0C\u6211\u9A6C\u4E0A\u4E0B\u6765\u3002",
        "pinyin": "N\u01D0 z\xE0i l\xF3ush\xE0ng d\u011Bng w\u01D2, w\u01D2 m\u01CEsh\xE0ng xi\xE0lai.",
        "vi": "B\u1EA1n \u0111\u1EE3i t\xF4i \u1EDF tr\xEAn l\u1EA7u, t\xF4i xu\u1ED1ng ngay \u0111\xE2y."
      },
      {
        "zh": "\u5FEB\u4ECE\u6811\u4E0A\u4E0B\u6765\uFF0C\u592A\u5371\u9669\u4E86\uFF01",
        "pinyin": "Ku\xE0i c\xF3ng sh\xF9 sh\xE0ng xi\xE0lai, t\xE0i w\u0113ixi\u01CEn le!",
        "vi": "Mau t\u1EEB tr\xEAn c\xE2y leo xu\u1ED1ng \u0111\xE2y, nguy hi\u1EC3m qu\xE1!"
      }
    ],
    "tips": "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Lai (\u6765 - \u0111\u1EBFn/l\u1EA1i). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng ch\u1EC9 chuy\u1EC3n \u0111\u1ED9ng t\u1EEB tr\xEAn cao xu\u1ED1ng ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    "id": "pdf_101",
    "hanzi": "\u4E0A\u6765",
    "pinyin": "sh\xE0nglai",
    "hanViet": "Th\u01B0\u1EE3ng Lai",
    "vietnamese": "\u0110i l\xEAn, l\xEAn \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    "radical": "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u4E0A\u6765\u5427\uFF0C\u6211\u5BB6\u5728\u4E09\u697C\u3002",
        "pinyin": "N\u01D0 sh\xE0nglai ba, w\u01D2 ji\u0101 z\xE0i s\u0101n l\xF3u.",
        "vi": "B\u1EA1n l\xEAn \u0111\xE2y \u0111i, nh\xE0 t\xF4i \u1EDF t\u1EA7ng ba."
      },
      {
        "zh": "\u8BF7\u5927\u5BB6\u5FEB\u70B9\u513F\u4E0A\u8F66\u6765\u3002",
        "pinyin": "Q\u01D0ng d\xE0ji\u0101 ku\xE0i di\u01CEnr sh\xE0ngch\u0113 lai.",
        "vi": "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi mau b\u01B0\u1EDBc l\xEAn xe n\xE0o."
      }
    ],
    "tips": "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng di chuy\u1EC3n t\u1EEB d\u01B0\u1EDBi th\u1EA5p l\xEAn ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    "id": "pdf_102",
    "hanzi": "\u4E0A\u53BB",
    "pinyin": "sh\xE0ngqu",
    "hanViet": "Th\u01B0\u1EE3ng Kh\u1EE9",
    "vietnamese": "\u0110i l\xEAn \u0111\xF3, b\u01B0\u1EDBc l\xEAn (r\u1EDDi xa ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    "radical": "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u7535\u68AF\u574F\u4E86\uFF0C\u6211\u4EEC\u8D70\u697C\u68AF\u4E0A\u53BB\u5427\u3002",
        "pinyin": "Di\xE0nt\u012B hu\xE0i le, w\u01D2men z\u01D2u l\xF3ut\u012B sh\xE0ngqu ba.",
        "vi": "Thang m\xE1y h\u1ECFng r\u1ED3i, ch\xFAng m\xECnh \u0111i thang b\u1ED9 l\xEAn tr\xEAn \u0111\xF3 \u0111i."
      },
      {
        "zh": "\u628A\u884C\u674E\u642C\u4E0A\u53BB\u3002",
        "pinyin": "B\u01CE x\xEDngli b\u0101n sh\xE0ngqu.",
        "vi": "Khu\xE2n h\xE0nh l\xFD l\xEAn tr\xEAn \u0111\xF3."
      }
    ],
    "tips": "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Xu h\u01B0\u1EDBng di chuy\u1EC3n t\u1EEB v\u1ECB tr\xED hi\u1EC7n t\u1EA1i l\xEAn m\u1ED9t n\u01A1i cao h\u01A1n xa ng\u01B0\u1EDDi n\xF3i."
  },
  {
    "id": "pdf_103",
    "hanzi": "\u4E0B\u9762",
    "pinyin": "xi\xE0mi\xE0n",
    "hanViet": "H\u1EA1 Di\u1EC7n",
    "vietnamese": "B\xEAn d\u01B0\u1EDBi, ph\xEDa d\u01B0\u1EDBi, ph\u1EA7n d\u01B0\u1EDBi",
    "partOfSpeech": "Danh t\u1EEB ch\u1EC9 ph\u01B0\u01A1ng v\u1ECB",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u4E00 (Nh\u1EA5t) + \u9762 (Di\u1EC7n)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u732B\u5728\u684C\u5B50\u4E0B\u9762\u7761\u89C9\u3002",
        "pinyin": "M\u0101o z\xE0i zhu\u014Dzi xi\xE0mi\xE0n shu\xECji\xE0o.",
        "vi": "Con m\xE8o \u0111ang ng\u1EE7 \u1EDF d\u01B0\u1EDBi g\u1EA7m b\xE0n."
      },
      {
        "zh": "\u6811\u4E0B\u9762\u5F88\u51C9\u5FEB\u3002",
        "pinyin": "Sh\xF9 xi\xE0mi\xE0n h\u011Bn li\xE1ngkuai.",
        "vi": "D\u01B0\u1EDBi b\xF3ng c\xE2y r\u1EA5t m\xE1t m\u1EBB."
      }
    ],
    "tips": "H\u1EA1 (\u4E0B - d\u01B0\u1EDBi) + Di\u1EC7n (\u9762 - m\u1EB7t/ph\xEDa). Ch\u1EC9 v\u1ECB tr\xED \u1EDF kho\u1EA3ng kh\xF4ng gian ph\xEDa d\u01B0\u1EDBi c\u1EE7a v\u1EADt th\u1EC3."
  },
  {
    "id": "pdf_104",
    "hanzi": "\u9762",
    "pinyin": "mi\xE0n",
    "hanViet": "Di\u1EC7n / Mi\u1EBFn",
    "vietnamese": "M\u1EB7t, b\u1EC1 m\u1EB7t, ph\u01B0\u01A1ng di\u1EC7n; m\xEC s\u1EE3i, b\u1ED9t m\xEC",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & \u1EA8m th\u1EF1c",
    "radical": "\u9762 (Di\u1EC7n)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u4E2D\u5348\u6211\u60F3\u5403\u4E00\u7897\u725B\u8089\u9762\u3002",
        "pinyin": "J\u012Bnti\u0101n zh\u014Dngw\u01D4 w\u01D2 xi\u01CEng ch\u012B y\xEC w\u01CEn ni\xFAr\xF2umi\xE0n.",
        "vi": "Tr\u01B0a nay t\xF4i mu\u1ED1n \u0103n m\u1ED9t b\xE1t m\xEC b\xF2."
      },
      {
        "zh": "\u6211\u4EEC\u89C1\u4E00\u9762\u5427\u3002",
        "pinyin": "W\u01D2men ji\xE0n y\xED mi\xE0n ba.",
        "vi": "Ch\xFAng m\xECnh g\u1EB7p m\u1EB7t nhau m\u1ED9t l\u1EA7n nh\xE9."
      }
    ],
    "tips": "B\u1ED9 Di\u1EC7n (\u9762) h\xECnh d\xE1ng khu\xF4n m\u1EB7t ng\u01B0\u1EDDi v\u1EDBi \u0111\u01B0\u1EDDng n\xE9t bao quanh. Trong \u1EA9m th\u1EF1c ch\u1EEF \u9762 (ph\u1ED3n th\u1EC3 \u9EB5) d\xF9ng ch\u1EC9 c\xE1c m\xF3n m\xEC s\u1EE3i v\xE0 b\u1ED9t l\xE0m b\xE1nh."
  },
  {
    "id": "pdf_105",
    "hanzi": "\u7B49",
    "pinyin": "d\u011Bng",
    "hanViet": "\u0110\u1EB3ng",
    "vietnamese": "\u0110\u1EE3i, ch\u1EDD; b\u1EB1ng nhau; v\xE2n v\xE2n",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Th\u1EDDi gian",
    "radical": "\u2EAE (Tr\xFAc)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u8BF7\u5728\u95E8\u53E3\u7B49\u6211\u4E94\u5206\u949F\u3002",
        "pinyin": "Q\u01D0ng z\xE0i m\xE9nk\u01D2u d\u011Bng w\u01D2 w\u01D4 f\u0113nzh\u014Dng.",
        "vi": "Xin vui l\xF2ng \u0111\u1EE3i t\xF4i \u1EDF c\u1EEDa n\u0103m ph\xFAt nh\xE9."
      },
      {
        "zh": "\u6211\u7B49\u4E86\u5F88\u4E45\uFF0C\u4ED6\u8FD8\u662F\u6CA1\u6765\u3002",
        "pinyin": "W\u01D2 d\u011Bng le h\u011Bn ji\u01D4, t\u0101 h\xE1ish\xEC m\xE9i l\xE1i.",
        "vi": "T\xF4i \u0111\xE3 ch\u1EDD r\u1EA5t l\xE2u r\u1ED3i m\xE0 anh \u1EA5y v\u1EABn ch\u01B0a \u0111\u1EBFn."
      }
    ],
    "tips": "B\u1ED9 Tr\xFAc (\u2EAE) \u1EDF tr\xEAn c\xF9ng ch\u1EEF T\u1EF1 (\u5BFA) ng\xF4i ch\xF9a. Ban \u0111\u1EA7u l\xE0 c\xE1c th\u1EBB tre ghi th\u1EE9 b\u1EADc ph\u1EA9m c\u1EA5p, sau m\u01B0\u1EE3n ngh\u0129a th\xE0nh h\xE0nh \u0111\u1ED9ng ch\u1EDD \u0111\u1EE3i."
  },
  {
    "id": "pdf_106",
    "hanzi": "\u4E00\u4F1A\u513F",
    "pinyin": "y\xEDhu\xECr",
    "hanViet": "Nh\u1EA5t H\u1ED9i Nhi",
    "vietnamese": "M\u1ED9t l\xE1t, m\u1ED9t ch\u1ED1c, m\u1ED9t ch\xFAt",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian / Ph\xF3 t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian & T\u1EA7n su\u1EA5t",
    "radical": "\u4E00 (Nh\u1EA5t) + \u4EBA (Nh\xE2n) + \u513F (Nhi)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4F60\u5148\u5750\u4E00\u4F1A\u513F\uFF0C\u6211\u6CE1\u676F\u8336\u7ED9\u4F60\u3002",
        "pinyin": "N\u01D0 xi\u0101n zu\xF2 y\xEDhu\xECr, w\u01D2 p\xE0o b\u0113i ch\xE1 g\u011Bi n\u01D0.",
        "vi": "B\u1EA1n ng\u1ED3i m\u1ED9t l\xE1t \u0111\xE3 nh\xE9, t\xF4i pha c\u1ED1c tr\xE0 cho b\u1EA1n."
      },
      {
        "zh": "\u4ED6\u770B\u4E86\u4E00\u4F1A\u513F\u4E66\u5C31\u53BB\u7761\u89C9\u4E86\u3002",
        "pinyin": "T\u0101 k\xE0n le y\xEDhu\xECr sh\u016B ji\xF9 q\xF9 shu\xECji\xE0o le.",
        "vi": "Anh \u1EA5y \u0111\u1ECDc s\xE1ch m\u1ED9t l\xE1t r\u1ED3i \u0111i ng\u1EE7."
      }
    ],
    "tips": "Nh\u1EA5t (\u4E00) + H\u1ED9i (\u4F1A - t\u1EE5 l\u1EA1i/th\u1EDDi kh\u1EAFc) + Nhi (\u513F - \xE2m u\u1ED1n l\u01B0\u1EE1i). Bi\u1EC3u th\u1ECB kho\u1EA3ng th\u1EDDi gian r\u1EA5t ng\u1EAFn, ch\u1ED1c l\xE1t. Ph\u1ED3n th\u1EC3: \u4E00\u6703\u5152."
  },
  {
    "id": "pdf_107",
    "hanzi": "\u4E0B\u53BB",
    "pinyin": "xi\xE0qu",
    "hanViet": "H\u1EA1 Kh\u1EE9",
    "vietnamese": "\u0110i xu\u1ED1ng \u0111\xF3, ti\u1EBFp t\u1EE5c (h\u01B0\u1EDBng xa ng\u01B0\u1EDDi n\xF3i ho\u1EB7c ti\u1EBFp di\u1EC5n)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    "radical": "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u4ECE\u8FD9\u91CC\u8D70\u4E0B\u53BB\u5C31\u662F\u5730\u94C1\u7AD9\u3002",
        "pinyin": "C\xF3ng zh\xE8l\u01D0 z\u01D2u xi\xE0qu ji\xF9 sh\xEC d\xECti\u011B zh\xE0n.",
        "vi": "T\u1EEB \u0111\xE2y \u0111i b\u1ED9 xu\u1ED1ng d\u01B0\u1EDBi l\xE0 tr\u1EA1m t\xE0u \u0111i\u1EC7n ng\u1EA7m."
      },
      {
        "zh": "\u8BF7\u4F60\u7EE7\u7EED\u8BF4\u4E0B\u53BB\u3002",
        "pinyin": "Q\u01D0ng n\u01D0 j\xECx\xF9 shu\u014D xi\xE0qu.",
        "vi": "Xin b\u1EA1n h\xE3y ti\u1EBFp t\u1EE5c n\xF3i ti\u1EBFp \u0111i."
      }
    ],
    "tips": "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Ngo\xE0i ngh\u0129a ch\u1EC9 h\u01B0\u1EDBng \u0111i xu\u1ED1ng n\u01A1i kh\xE1c, c\xF2n d\xF9ng l\xE0m b\u1ED5 ng\u1EEF xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng ti\u1EBFp di\u1EC5n."
  },
  {
    "id": "pdf_108",
    "hanzi": "\u8FDB\u6765",
    "pinyin": "j\xECnlai",
    "hanViet": "Ti\u1EBFn Lai",
    "vietnamese": "\u0110i v\xE0o, v\xE0o \u0111\xE2y (h\u01B0\u1EDBng v\xE0o trong n\u01A1i ng\u01B0\u1EDDi n\xF3i \u1EDF)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    "level": 2,
    "category": "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Giao ti\u1EBFp",
    "radical": "\u8FB6 (X\u01B0\u1EDBc) + \u6728 (M\u1ED9c)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u5916\u9762\u51B7\uFF0C\u5FEB\u8BF7\u8FDB\u6765\u559D\u676F\u70ED\u8336\uFF01",
        "pinyin": "W\xE0imi\xE0n l\u011Bng, ku\xE0i q\u01D0ng j\xECnlai h\u0113 b\u0113i r\xE8ch\xE1!",
        "vi": "B\xEAn ngo\xE0i l\u1EA1nh l\u1EAFm, mau m\u1EDDi v\xE0o \u0111\xE2y u\u1ED1ng ch\xE9n tr\xE0 n\xF3ng!"
      },
      {
        "zh": "\u4ED6\u6572\u4E86\u6572\u95E8\u5C31\u8D70\u8FDB\u6765\u4E86\u3002",
        "pinyin": "T\u0101 qi\u0101o le qi\u0101o m\xE9n ji\xF9 z\u01D2u j\xECnlai le.",
        "vi": "Anh \u1EA5y g\xF5 c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o ph\xF2ng."
      }
    ],
    "tips": "Ti\u1EBFn (\u8FDB - \u0111i v\xE0o) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). Ch\u1EC9 h\xE0nh \u0111\u1ED9ng b\u01B0\u1EDBc v\xE0o t\u1EEB ngo\xE0i v\xE0o trong h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i. Ph\u1ED3n th\u1EC3: \u9032\u4F86."
  },
  {
    "id": "pdf_109",
    "hanzi": "\u7237\u7237",
    "pinyin": "y\xE9ye",
    "hanViet": "Gia Gia",
    "vietnamese": "\xD4ng n\u1ED9i, \xF4ng (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng ng\u01B0\u1EDDi gi\xE0)",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    "radical": "\u7236 (Ph\u1EE5)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u7237\u7237\u6BCF\u5929\u65E9\u4E0A\u90FD\u4F1A\u53BB\u516C\u56ED\u6253\u592A\u6781\u62F3\u3002",
        "pinyin": "Y\xE9ye m\u011Biti\u0101n z\u01CEoshang d\u014Du hu\xEC q\xF9 g\u014Dngyu\xE1n d\u01CE t\xE0ij\xEDqu\xE1n.",
        "vi": "\xD4ng n\u1ED9i m\u1ED7i s\xE1ng \u0111\u1EC1u \u0111i ra c\xF4ng vi\xEAn t\u1EADp Th\xE1i C\u1EF1c Quy\u1EC1n."
      },
      {
        "zh": "\u4ECA\u5E74\u7237\u7237\u4E03\u5341\u5C81\u4E86\uFF0C\u8EAB\u4F53\u5F88\u5065\u5EB7\u3002",
        "pinyin": "J\u012Bnni\xE1n y\xE9ye q\u012Bsh\xED su\xEC le, sh\u0113nt\u01D0 h\u011Bn ji\xE0nk\u0101ng.",
        "vi": "N\u0103m nay \xF4ng n\u1ED9i b\u1EA3y m\u01B0\u01A1i tu\u1ED5i r\u1ED3i, s\u1EE9c kh\u1ECFe r\u1EA5t t\u1ED1t."
      }
    ],
    "tips": "Ch\u1EEF Gia (\u7237) g\u1ED3m b\u1ED9 Ph\u1EE5 (\u7236 - cha gi\xE0) \u1EDF tr\xEAn v\xE0 ch\u1EEF Nguy (\u5371) \u1EDF d\u01B0\u1EDBi. L\u1EB7p l\u1EA1i hai ch\u1EEF \u7237\u7237 t\u1EA1o th\xE0nh ti\u1EBFng g\u1ECDi \xF4ng n\u1ED9i th\xE2n th\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u723A\u723A."
  },
  {
    "id": "pdf_110",
    "hanzi": "\u5976\u5976",
    "pinyin": "n\u01CEinai",
    "hanViet": "N\xE3i N\xE3i",
    "vietnamese": "B\xE0 n\u1ED9i, b\xE0 (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng b\xE0 c\u1EE5)",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    "radical": "\u5973 (N\u1EEF)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u5976\u5976\u505A\u7684\u5305\u5B50\u975E\u5E38\u597D\u5403\u3002",
        "pinyin": "N\u01CEinai zu\xF2 de b\u0101ozi f\u0113ich\xE1ng h\u01CEoch\u012B.",
        "vi": "B\xE1nh bao b\xE0 n\u1ED9i l\xE0m ngon v\xF4 c\xF9ng."
      },
      {
        "zh": "\u6211\u5E38\u7ED9\u5976\u5976\u6253\u7535\u8BDD\u95EE\u597D\u3002",
        "pinyin": "W\u01D2 ch\xE1ng g\u011Bi n\u01CEinai d\u01CE di\xE0nhu\xE0 w\xE8nh\u01CEo.",
        "vi": "T\xF4i th\u01B0\u1EDDng g\u1ECDi \u0111i\u1EC7n tho\u1EA1i h\u1ECFi th\u0103m s\u1EE9c kh\u1ECFe b\xE0 n\u1ED9i."
      }
    ],
    "tips": "B\u1ED9 N\u1EEF (\u5973) k\u1EBFt h\u1EE3p N\xE3i (\u4E43). Ti\u1EBFng g\u1ECDi l\u1EB7p l\u1EA1i \u5976\u5976 l\xE0 x\u01B0ng h\xF4 g\u1EA7n g\u0169i, \u1EA5m \xE1p d\xE0nh cho b\xE0 n\u1ED9i trong gia \u0111\xECnh."
  },
  {
    "id": "pdf_111",
    "hanzi": "\u793C\u7269",
    "pinyin": "l\u01D0w\xF9",
    "hanViet": "L\u1EC5 V\u1EADt",
    "vietnamese": "M\xF3n qu\xE0, qu\xE0 t\u1EB7ng",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u0110\u1EDDi s\u1ED1ng & Giao ti\u1EBFp",
    "radical": "\u793B (K\u1EF3) + \u725C (Ng\u01B0u)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u8FD9\u662F\u6211\u9001\u7ED9\u4F60\u7684\u751F\u65E5\u793C\u7269\u3002",
        "pinyin": "Zh\xE8 sh\xEC w\u01D2 s\xF2ng g\u011Bi n\u01D0 de sh\u0113ngr\xEC l\u01D0w\xF9.",
        "vi": "\u0110\xE2y l\xE0 m\xF3n qu\xE0 sinh nh\u1EADt t\xF4i t\u1EB7ng b\u1EA1n."
      },
      {
        "zh": "\u4ED6\u6536\u5230\u4E86\u4E00\u4EFD\u7279\u522B\u7684\u793C\u7269\u3002",
        "pinyin": "T\u0101 sh\u014Dud\xE0o le y\xED f\xE8n t\xE8bi\xE9 de l\u01D0w\xF9.",
        "vi": "Anh \u1EA5y \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t m\xF3n qu\xE0 v\xF4 c\xF9ng \u0111\u1EB7c bi\u1EC7t."
      }
    ],
    "tips": "L\u1EC5 (\u793C - l\u1EC5 ngh\u0129a t\xF4n k\xEDnh, b\u1ED9 K\u1EF3 \u793B) + V\u1EADt (\u7269 - \u0111\u1ED3 v\u1EADt, b\u1ED9 Ng\u01B0u \u725C). M\xF3n \u0111\u1ED3 v\u1EADt ch\u1EE9a \u0111\u1EF1ng t\u1EA5m l\xF2ng v\xE0 s\u1EF1 t\xF4n tr\u1ECDng trao g\u1EEDi nhau. Ph\u1ED3n th\u1EC3: \u79AE\u7269."
  },
  {
    "id": "pdf_112",
    "hanzi": "\u51C6\u5907",
    "pinyin": "zh\u01D4nb\xE8i",
    "hanViet": "Chu\u1EA9n B\u1ECB",
    "vietnamese": "Chu\u1EA9n b\u1ECB, d\u1EF1 \u0111\u1ECBnh; s\u1EF1 chu\u1EA9n b\u1ECB",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & K\u1EBF ho\u1EA1ch",
    "radical": "\u51AB (B\u0103ng) + \u5902 (Truy)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u4F60\u5728\u51C6\u5907\u660E\u5929\u7684\u8003\u8BD5\u5417\uFF1F",
        "pinyin": "N\u01D0 z\xE0i zh\u01D4nb\xE8i m\xEDngti\u0101n de k\u01CEosh\xEC ma?",
        "vi": "B\u1EA1n \u0111ang chu\u1EA9n b\u1ECB cho k\u1EF3 thi ng\xE0y mai ph\u1EA3i kh\xF4ng?"
      },
      {
        "zh": "\u6211\u4EEC\u5DF2\u7ECF\u51C6\u5907\u597D\u51FA\u53D1\u4E86\u3002",
        "pinyin": "W\u01D2men y\u01D0j\u012Bng zh\u01D4nb\xE8i h\u01CEo ch\u016Bf\u0101 le.",
        "vi": "Ch\xFAng t\xF4i \u0111\xE3 chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng \u0111\u1EC3 l\xEAn \u0111\u01B0\u1EDDng r\u1ED3i."
      }
    ],
    "tips": "Chu\u1EA9n (\u51C6 - ti\xEAu chu\u1EA9n chu\u1EA9n m\u1EF1c, b\u1ED9 B\u0103ng \u51AB) + B\u1ECB (\u5907 - chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng, g\u1ED3m b\u1ED9 Truy \u5902). Ph\u1ED3n th\u1EC3: \u6E96\u5099."
  },
  {
    "id": "pdf_113",
    "hanzi": "\u5976\u8336",
    "pinyin": "n\u01CEich\xE1",
    "hanViet": "N\xE3i Tr\xE0",
    "vietnamese": "Tr\xE0 s\u1EEFa",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u5973 (N\u1EEF) + \u8279 (Th\u1EA3o)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u4E0B\u5348\u6211\u4EEC\u4E00\u8D77\u559D\u676F\u73CD\u73E0\u5976\u8336\u5427\uFF01",
        "pinyin": "Xi\xE0w\u01D4 w\u01D2men y\xECq\u01D0 h\u0113 b\u0113i zh\u0113nzh\u016B n\u01CEich\xE1 ba!",
        "vi": "Chi\u1EC1u nay t\u1EE5i m\xECnh c\xF9ng \u0111i u\u1ED1ng m\u1ED9t ly tr\xE0 s\u1EEFa tr\xE2n ch\xE2u nh\xE9!"
      },
      {
        "zh": "\u8FD9\u5BB6\u5E97\u7684\u5976\u8336\u65E2\u9999\u53C8\u597D\u559D\u3002",
        "pinyin": "Zh\xE8 ji\u0101 di\xE0n de n\u01CEich\xE1 j\xEC xi\u0101ng y\xF2u h\u01CEoh\u0113.",
        "vi": "Tr\xE0 s\u1EEFa c\u1EE7a ti\u1EC7m n\xE0y v\u1EEBa th\u01A1m l\u1EA1i v\u1EEBa ngon."
      }
    ],
    "tips": "N\xE3i (\u5976 - s\u1EEFa t\u01B0\u01A1i th\u01A1m m\xE1t) + Tr\xE0 (\u8336 - l\xE1 ch\xE8 b\u1ED9 Th\u1EA3o \u8279). \u0110\u1ED3 u\u1ED1ng tr\xE0 s\u1EEFa \u0111\u01B0\u1EE3c gi\u1EDBi tr\u1EBB kh\u1EAFp n\u01A1i v\xF4 c\xF9ng y\xEAu th\xEDch."
  },
  {
    "id": "pdf_114",
    "hanzi": "\u8DDF",
    "pinyin": "g\u0113n",
    "hanViet": "C\u0103n",
    "vietnamese": "C\xF9ng, v\u1EDBi; \u0111i theo, g\xF3t ch\xE2n",
    "partOfSpeech": "Gi\u1EDBi t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "Ng\u1EEF ph\xE1p & Giao ti\u1EBFp",
    "radical": "\u{27FB7} (T\xFAc)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u5468\u672B\u6211\u60F3\u8DDF\u4F60\u4E00\u8D77\u53BB\u56FE\u4E66\u9986\u3002",
        "pinyin": "Zh\u014Dum\xF2 w\u01D2 xi\u01CEng g\u0113n n\u01D0 y\xECq\u01D0 q\xF9 t\xFAsh\u016Bgu\u01CEn.",
        "vi": "Cu\u1ED1i tu\u1EA7n t\xF4i mu\u1ED1n c\xF9ng b\u1EA1n \u0111i \u0111\u1EBFn th\u01B0 vi\u1EC7n."
      },
      {
        "zh": "\u8BF7\u5927\u5BB6\u8DDF\u6211\u4E00\u8D77\u8BFB\u8FD9\u4E2A\u6C49\u5B57\u3002",
        "pinyin": "Q\u01D0ng d\xE0ji\u0101 g\u0113n w\u01D2 y\xECq\u01D0 d\xFA zh\xE8 ge h\xE0nz\xEC.",
        "vi": "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi \u0111\u1ECDc ch\u1EEF H\xE1n n\xE0y theo t\xF4i."
      }
    ],
    "tips": "B\u1ED9 T\xFAc (\u{27FB7} - b\xE0n ch\xE2n) k\u1EBFt h\u1EE3p ch\u1EEF C\u1EA5n (\u826E). Ngh\u0129a g\u1ED1c l\xE0 g\xF3t ch\xE2n, m\u1EDF r\u1ED9ng th\xE0nh \u0111i theo sau ai \u0111\xF3, r\u1ED3i tr\u1EDF th\xE0nh gi\u1EDBi t\u1EEB k\u1EBFt n\u1ED1i 'c\xF9ng v\u1EDBi ai'."
  },
  {
    "id": "pdf_115",
    "hanzi": "\u8D70",
    "pinyin": "z\u01D2u",
    "hanViet": "T\u1EA9u",
    "vietnamese": "\u0110i, b\u01B0\u1EDBc \u0111i; r\u1EDDi \u0111i, \u0111i kh\u1ECFi",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Di chuy\u1EC3n",
    "radical": "\u8D70 (T\u1EA9u)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u4E00\u8D77\u8D70\u8DEF\u53BB\u5B66\u6821\u5427\u3002",
        "pinyin": "W\u01D2men y\xECq\u01D0 z\u01D2ul\xF9 q\xF9 xu\xE9xi\xE0o ba.",
        "vi": "T\u1EE5i m\xECnh c\xF9ng \u0111i b\u1ED9 t\u1EDBi tr\u01B0\u1EDDng h\u1ECDc \u0111i."
      },
      {
        "zh": "\u65F6\u95F4\u4E0D\u65E9\u4E86\uFF0C\u6211\u8BE5\u8D70\u4E86\u3002",
        "pinyin": "Sh\xEDji\u0101n b\xF9 z\u01CEo le, w\u01D2 g\u0101i z\u01D2u le.",
        "vi": "Th\u1EDDi gian kh\xF4ng c\xF2n s\u1EDBm n\u1EEFa, t\xF4i ph\u1EA3i \u0111i \u0111\xE2y."
      }
    ],
    "tips": "B\u1ED9 T\u1EA9u (\u8D70) h\xECnh t\u01B0\u1EE3ng ng\u01B0\u1EDDi \u0111ang vung tay s\u1EA3i b\u01B0\u1EDBc ch\u1EA1y mau. Trong ti\u1EBFng H\xE1n hi\u1EC7n \u0111\u1EA1i bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng \u0111i l\u1EA1i ho\u1EB7c r\u1EDDi kh\u1ECFi m\u1ED9t n\u01A1i."
  },
  {
    "id": "pdf_116",
    "hanzi": "\u9152\u5E97",
    "pinyin": "ji\u01D4di\xE0n",
    "hanViet": "T\u1EEDu \u0110i\u1EBFm",
    "vietnamese": "Kh\xE1ch s\u1EA1n, kh\xE1ch s\u1EA1n l\u1EDBn",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Du l\u1ECBch & \u0110\u1ECBa \u0111i\u1EC3m",
    "radical": "\u6C35 (Th\u1EE7y) + \u5E7F (Qu\u1EA3ng)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u9884\u8BA2\u4E86\u4E00\u5BB6\u9760\u8FD1\u6D77\u8FB9\u7684\u9152\u5E97\u3002",
        "pinyin": "W\u01D2men y\xF9d\xECng le y\xEC ji\u0101 k\xE0oj\xECn h\u01CEibi\u0101n de ji\u01D4di\xE0n.",
        "vi": "Ch\xFAng t\xF4i \u0111\xE3 \u0111\u1EB7t tr\u01B0\u1EDBc m\u1ED9t kh\xE1ch s\u1EA1n \u1EDF g\u1EA7n b\u1EDD bi\u1EC3n."
      },
      {
        "zh": "\u8FD9\u5BB6\u4E94\u661F\u7EA7\u9152\u5E97\u7684\u670D\u52A1\u975E\u5E38\u5468\u5230\u3002",
        "pinyin": "Zh\xE8 ji\u0101 w\u01D4x\u012Bngj\xED ji\u01D4di\xE0n de f\xFAw\xF9 f\u0113ich\xE1ng zh\u014Dud\xE0o.",
        "vi": "D\u1ECBch v\u1EE5 c\u1EE7a kh\xE1ch s\u1EA1n n\u0103m sao n\xE0y v\xF4 c\xF9ng chu \u0111\xE1o."
      }
    ],
    "tips": "T\u1EEDu (\u9152 - r\u01B0\u1EE3u ngon, b\u1ED9 Th\u1EE7y \u6C35) + \u0110i\u1EBFm (\u5E97 - ti\u1EC7m qu\xE1n, b\u1ED9 Qu\u1EA3ng \u5E7F). X\u01B0a l\xE0 qu\xE1n r\u01B0\u1EE3u c\xF3 ch\u1ED7 tr\u1ECD l\u1EA1i, nay l\xE0 t\u1EEB ph\u1ED5 bi\u1EBFn nh\u1EA5t ch\u1EC9 kh\xE1ch s\u1EA1n hi\u1EC7n \u0111\u1EA1i."
  },
  {
    "id": "pdf_117",
    "hanzi": "\u751F\u65E5",
    "pinyin": "sh\u0113ngr\xEC",
    "hanViet": "Sinh Nh\u1EADt",
    "vietnamese": "Ng\xE0y sinh nh\u1EADt, sinh nh\u1EADt",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "Th\u1EDDi gian & L\u1EC5 h\u1ED9i",
    "radical": "\u751F (Sinh) + \u65E5 (Nh\u1EADt)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF0C\u5FC3\u60F3\u4E8B\u6210\uFF01",
        "pinyin": "Zh\xF9 n\u01D0 sh\u0113ngr\xEC ku\xE0il\xE8, x\u012Bnxi\u01CEngsh\xECch\xE9ng!",
        "vi": "Ch\xFAc b\u1EA1n sinh nh\u1EADt vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!"
      },
      {
        "zh": "\u4F60\u7684\u751F\u65E5\u662F\u51E0\u6708\u51E0\u53F7\uFF1F",
        "pinyin": "N\u01D0 de sh\u0113ngr\xEC sh\xEC j\u01D0 yu\xE8 j\u01D0 h\xE0o?",
        "vi": "Sinh nh\u1EADt c\u1EE7a b\u1EA1n l\xE0 ng\xE0y m\u1EA5y th\xE1ng m\u1EA5y?"
      }
    ],
    "tips": "Sinh (\u751F - sinh ra, ch\xE0o \u0111\u1EDDi) + Nh\u1EADt (\u65E5 - ng\xE0y m\u1EB7t tr\u1EDDi). Ng\xE0y k\u1EF7 ni\u1EC7m m\u1ED9t ng\u01B0\u1EDDi c\u1EA5t ti\u1EBFng kh\xF3c ch\xE0o \u0111\u1EDDi."
  },
  {
    "id": "pdf_118",
    "hanzi": "\u5FD8",
    "pinyin": "w\xE0ng",
    "hanViet": "Vong",
    "vietnamese": "Qu\xEAn, b\u1ECF qu\xEAn",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "T\xE2m l\xFD & Tr\xED nh\u1EDB",
    "radical": "\u5FC3 (T\xE2m)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u5FD8\u4E86\u5E26\u5BB6\u91CC\u7684\u94A5\u5319\u4E86\u3002",
        "pinyin": "W\u01D2 w\xE0ng le d\xE0i ji\u0101l\u01D0 de y\xE0oshi le.",
        "vi": "T\xF4i qu\xEAn mang ch\xECa kh\xF3a nh\xE0 r\u1ED3i."
      },
      {
        "zh": "\u5343\u4E07\u522B\u5FD8\u4E86\u660E\u5929\u65E9\u4E0A\u7684\u4F1A\u8BAE\u3002",
        "pinyin": "Qi\u0101nw\xE0n bi\xE9 w\xE0ng le m\xEDngti\u0101n z\u01CEoshang de hu\xECy\xEC.",
        "vi": "Nh\u1EA5t \u0111\u1ECBnh \u0111\u1EEBng qu\xEAn cu\u1ED9c h\u1ECDp s\xE1ng mai nh\xE9."
      }
    ],
    "tips": "B\xEAn tr\xEAn l\xE0 ch\u1EEF Vong (\u4EA1 - m\u1EA5t m\xE1t, bi\u1EBFn m\u1EA5t), b\xEAn d\u01B0\u1EDBi l\xE0 ch\u1EEF T\xE2m (\u5FC3 - tr\xE1i tim, t\xE2m tr\xED). \xDD ngh\u0129 m\u1EA5t \u0111i kh\u1ECFi t\xE2m tr\xED ch\xEDnh l\xE0 qu\xEAn. Ph\u1ED3n th\u1EC3: \u5FD8."
  },
  {
    "id": "pdf_119",
    "hanzi": "\u753B",
    "pinyin": "hu\xE0",
    "hanViet": "H\u1ECDa",
    "vietnamese": "V\u1EBD (\u0111\u1ED9ng t\u1EEB); b\u1EE9c tranh, b\u1EE9c h\u1ECDa (danh t\u1EEB)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "Ngh\u1EC7 thu\u1EADt & S\u1EDF th\xEDch",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u59B9\u59B9\u5F88\u559C\u6B22\u753B\u753B\u513F\u3002",
        "pinyin": "M\xE8imei h\u011Bn x\u01D0huan hu\xE0 hu\xE0r.",
        "vi": "Em g\xE1i r\u1EA5t th\xEDch v\u1EBD tranh."
      },
      {
        "zh": "\u5899\u4E0A\u6302\u7740\u4E00\u5E45\u4E2D\u56FD\u5C71\u6C34\u753B\u3002",
        "pinyin": "Qi\xE1ng sh\xE0ng gu\xE0 zhe y\xEC f\xFA Zh\u014Dnggu\xF3 sh\u0101nshu\u01D0hu\xE0.",
        "vi": "Tr\xEAn t\u01B0\u1EDDng treo m\u1ED9t b\u1EE9c tranh s\u01A1n th\u1EE7y Trung Qu\u1ED1c."
      }
    ],
    "tips": "Ch\u1EEF H\u1ECDa t\u01B0\u1EE3ng h\xECnh c\xE2y b\xFAt l\xF4ng \u0111ang ph\xE1c h\u1ECDa ranh gi\u1EDBi ru\u1ED9ng \u0111\u1EA5t \u7530. V\u1EEBa l\xE0 v\u1EBD tranh v\u1EEBa l\xE0 b\u1EE9c tranh. Ph\u1ED3n th\u1EC3: \u756B."
  },
  {
    "id": "pdf_120",
    "hanzi": "\u753B\u7B14",
    "pinyin": "hu\xE0b\u01D0",
    "hanViet": "H\u1ECDa B\xFAt",
    "vietnamese": "B\xFAt v\u1EBD, c\u1ECD v\u1EBD",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "D\u1EE5ng c\u1EE5 h\u1ECDc t\u1EADp & Ngh\u1EC7 thu\u1EADt",
    "radical": "\u4E00 (Nh\u1EA5t) + \u2EAE (Tr\xFAc)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u4ED6\u62FF\u8D77\u753B\u7B14\u5F00\u59CB\u5728\u753B\u7EB8\u4E0A\u4F5C\u753B\u3002",
        "pinyin": "T\u0101 n\xE1 q\u01D0 hu\xE0b\u01D0 k\u0101ish\u01D0 z\xE0i hu\xE0zh\u01D0 sh\xE0ng zu\xF2hu\xE0.",
        "vi": "Anh \u1EA5y c\u1EA7m c\u1ECD v\u1EBD l\xEAn b\u1EAFt \u0111\u1EA7u v\u1EBD tranh tr\xEAn gi\u1EA5y."
      },
      {
        "zh": "\u8FD9\u5957\u753B\u7B14\u7684\u6BDB\u8D28\u975E\u5E38\u67D4\u8F6F\u7EC6\u817B\u3002",
        "pinyin": "Zh\xE8 t\xE0o hu\xE0b\u01D0 de m\xE1ozh\xEC f\u0113ich\xE1ng r\xF3uru\u01CEn x\xECn\xEC.",
        "vi": "B\u1ED9 c\u1ECD v\u1EBD n\xE0y l\xF4ng r\u1EA5t m\u1EC1m m\u1EA1i v\xE0 tinh t\u1EBF."
      }
    ],
    "tips": "H\u1ECDa (\u753B - v\u1EBD tranh) + B\xFAt (\u7B14 - c\xE2y b\xFAt th\xE2n b\u1EB1ng tr\xFAc \u2EAE v\xE0 l\xF4ng th\xFA \u6BDB). C\xE2y b\xFAt chuy\xEAn d\xF9ng \u0111\u1EC3 h\u1ED9i h\u1ECDa. Ph\u1ED3n th\u1EC3: \u756B\u7B46."
  },
  {
    "id": "pdf_121",
    "hanzi": "\u86CB\u7CD5",
    "pinyin": "d\xE0ng\u0101o",
    "hanViet": "\u0110\u1EA3n Cao",
    "vietnamese": "B\xE1nh ga-t\xF4, b\xE1nh kem, b\xE1nh ng\u1ECDt l\xE0m t\u1EEB tr\u1EE9ng",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c & B\xE1nh ng\u1ECDt",
    "radical": "\u866B (Tr\xF9ng) + \u7C73 (M\u1EC5)",
    "strokeCount": 21,
    "examples": [
      {
        "zh": "\u5988\u5988\u4EB2\u624B\u505A\u4E86\u4E00\u4E2A\u6C34\u679C\u751F\u65E5\u86CB\u7CD5\u3002",
        "pinyin": "M\u0101ma q\u012Bnsh\u01D2u zu\xF2 le y\xED ge shu\u01D0gu\u01D2 sh\u0113ngr\xEC d\xE0ng\u0101o.",
        "vi": "M\u1EB9 t\u1EF1 tay l\xE0m m\u1ED9t chi\u1EBFc b\xE1nh kem sinh nh\u1EADt hoa qu\u1EA3."
      },
      {
        "zh": "\u8FD9\u5757\u5DE7\u514B\u529B\u86CB\u7CD5\u9999\u751C\u677E\u8F6F\u3002",
        "pinyin": "Zh\xE8 ku\xE0i qi\u01CEok\xE8l\xEC d\xE0ng\u0101o xi\u0101ngti\xE1n s\u014Dngru\u01CEn.",
        "vi": "Mi\u1EBFng b\xE1nh ga-t\xF4 s\xF4-c\xF4-la n\xE0y th\u01A1m ng\u1ECDt v\xE0 x\u1ED1p m\u1EC1m."
      }
    ],
    "tips": "\u0110\u1EA3n (\u86CB - qu\u1EA3 tr\u1EE9ng g\xE0) + Cao (\u7CD5 - b\xE1nh ng\u1ECDt l\xE0m t\u1EEB g\u1EA1o n\u1EBFp \u7C73). Lo\u1EA1i b\xE1nh x\u1ED1p m\u1EC1m th\u01A1m ph\u1EE9c t\u1EEB b\u1ED9t v\xE0 tr\u1EE9ng."
  },
  {
    "id": "pdf_122",
    "hanzi": "\u5FEB\u4E50",
    "pinyin": "ku\xE0il\xE8",
    "hanViet": "Kho\xE1i L\u1EA1c",
    "vietnamese": "Vui v\u1EBB, h\u1EA1nh ph\xFAc, h\xE2n hoan",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 2,
    "category": "C\u1EA3m x\xFAc & Tinh th\u1EA7n",
    "radical": "\u5FC4 (T\xE2m) + \u4E3F (Phi\u1EC7t)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u795D\u5927\u5BB6\u65B0\u5E74\u5FEB\u4E50\uFF0C\u4E07\u4E8B\u5982\u610F\uFF01",
        "pinyin": "Zh\xF9 d\xE0ji\u0101 x\u012Bnni\xE1n ku\xE0il\xE8, w\xE0nsh\xECr\xFAy\xEC!",
        "vi": "Ch\xFAc m\u1ECDi ng\u01B0\u1EDDi n\u0103m m\u1EDBi vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!"
      },
      {
        "zh": "\u53EA\u8981\u4E00\u5BB6\u4EBA\u5728\u4E00\u8D77\uFF0C\u5FC3\u91CC\u5C31\u5F88\u8F7B\u5FEB\u5FEB\u4E50\u3002",
        "pinyin": "Zh\u01D0y\xE0o y\xEC ji\u0101 r\xE9n z\xE0i y\xECq\u01D0, x\u012Bnl\u01D0 ji\xF9 h\u011Bn q\u012Bngku\xE0i ku\xE0il\xE8.",
        "vi": "Ch\u1EC9 c\u1EA7n c\u1EA3 nh\xE0 \u1EDF b\xEAn nhau, trong l\xF2ng li\u1EC1n c\u1EA3m th\u1EA5y r\u1EA5t vui v\u1EBB h\u1EA1nh ph\xFAc."
      }
    ],
    "tips": "Kho\xE1i (\u5FEB - h\xE2n hoan nhanh ch\xF3ng b\u1ED9 T\xE2m \u5FC4) + L\u1EA1c (\u4E50 - \xE2m nh\u1EA1c ti\u1EBFng c\u01B0\u1EDDi hoan h\u1EF7). Ni\u1EC1m vui tr\xE0n ng\u1EADp t\xE2m h\u1ED3n. Ph\u1ED3n th\u1EC3: \u5FEB\u6A02."
  },
  {
    "id": "pdf_123",
    "hanzi": "\u6253\u5F00",
    "pinyin": "d\u01CEk\u0101i",
    "hanViet": "\u0110\u1EA3 Khai",
    "vietnamese": "M\u1EDF ra, b\u1EADt (thi\u1EBFt b\u1ECB, c\xF4ng t\u1EAFc)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "H\xE0nh \u0111\u1ED9ng & Thao t\xE1c",
    "radical": "\u624C (Th\u1EE7) + \u95E8 (M\xF4n)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u8BF7\u628A\u4E66\u6253\u5F00\u5230\u7B2C\u5341\u9875\u3002",
        "pinyin": "Q\u01D0ng b\u01CE sh\u016B d\u01CEk\u0101i d\xE0o d\xEC sh\xED y\xE8.",
        "vi": "Xin m\u1EDDi m\u1EDF s\xE1ch ra trang s\u1ED1 m\u01B0\u1EDDi."
      },
      {
        "zh": "\u5929\u6C14\u6709\u70B9\u70ED\uFF0C\u5FEB\u6253\u5F00\u7A7A\u8C03\u5427\u3002",
        "pinyin": "Ti\u0101nq\xEC y\u01D2udi\u01CEn r\xE8, ku\xE0i d\u01CEk\u0101i k\u014Dngti\xE1o ba.",
        "vi": "Th\u1EDDi ti\u1EBFt h\u01A1i n\xF3ng, mau b\u1EADt \u0111i\u1EC1u h\xF2a l\xEAn \u0111i."
      }
    ],
    "tips": "\u0110\u1EA3 (\u6253 - d\xF9ng b\xE0n tay \u624C t\xE1c \u0111\u1ED9ng) + Khai (\u5F00 - m\u1EDF toang c\xE1nh c\u1ED5ng). Thao t\xE1c m\u1EDF s\xE1ch, m\u1EDF h\u1ED9p ho\u1EB7c b\u1EADt ngu\u1ED3n thi\u1EBFt b\u1ECB."
  },
  {
    "id": "pdf_124",
    "hanzi": "\u957F",
    "pinyin": "ch\xE1ng",
    "hanViet": "Tr\u01B0\u1EDDng / Tr\u01B0\u1EDFng",
    "vietnamese": "D\xE0i (kho\u1EA3ng c\xE1ch, th\u1EDDi gian); (zh\u01CEng) l\u1EDBn l\xEAn, tr\u01B0\u1EDFng th\xE0nh",
    "partOfSpeech": "T\xEDnh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 2,
    "category": "T\xEDnh ch\u1EA5t & K\xEDch th\u01B0\u1EDBc",
    "radical": "\u957F (Tr\u01B0\u1EDDng)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u5979\u7684\u5934\u53D1\u53C8\u9ED1\u53C8\u957F\u3002",
        "pinyin": "T\u0101 de t\xF3ufa y\xF2u h\u0113i y\xF2u ch\xE1ng.",
        "vi": "M\xE1i t\xF3c c\u1EE7a c\xF4 \u1EA5y v\u1EEBa \u0111en v\u1EEBa d\xE0i."
      },
      {
        "zh": "\u8FD9\u6761\u6CB3\u975E\u5E38\u957F\uFF0C\u6D41\u7ECF\u5F88\u591A\u57CE\u5E02\u3002",
        "pinyin": "Zh\xE8 ti\xE1o h\xE9 f\u0113ich\xE1ng ch\xE1ng, li\xFAj\u012Bng h\u011Bn du\u014D ch\xE9ngsh\xEC.",
        "vi": "Con s\xF4ng n\xE0y r\u1EA5t d\xE0i, ch\u1EA3y qua r\u1EA5t nhi\u1EC1u th\xE0nh ph\u1ED1."
      }
    ],
    "tips": "B\u1ED9 Tr\u01B0\u1EDDng (\u957F) v\u1EBD h\xECnh t\u01B0\u1EE3ng m\xE1i t\xF3c d\xE0i c\u1EE7a v\u1ECB tr\u01B0\u1EDFng l\xE3o. \u0110\u1ECDc ch\xE1ng l\xE0 d\xE0i, \u0111\u1ECDc zh\u01CEng l\xE0 l\u1EDBn l\xEAn, sinh tr\u01B0\u1EDFng. Ph\u1ED3n th\u1EC3: \u9577."
  },
  {
    "id": "pdf_125",
    "hanzi": "\u8089",
    "pinyin": "r\xF2u",
    "hanViet": "Nh\u1EE5c",
    "vietnamese": "Th\u1ECBt, mi\u1EBFng th\u1ECBt",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u1EA8m th\u1EF1c & Dinh d\u01B0\u1EE1ng",
    "radical": "\u8089 (Nh\u1EE5c)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u665A\u4E0A\u6211\u4EEC\u5403\u7EA2\u70E7\u8089\u5427\u3002",
        "pinyin": "J\u012Bnti\u0101n w\u01CEnshang w\u01D2men ch\u012B h\xF3ngsh\u0101or\xF2u ba.",
        "vi": "T\u1ED1i nay ch\xFAng ta \u0103n th\u1ECBt kho t\xE0u nh\xE9."
      },
      {
        "zh": "\u533B\u751F\u5EFA\u8BAE\u4ED6\u591A\u5403\u852C\u83DC\uFF0C\u5C11\u5403\u8089\u3002",
        "pinyin": "Y\u012Bsh\u0113ng ji\xE0ny\xEC t\u0101 du\u014D ch\u012B sh\u016Bc\xE0i, sh\u01CEo ch\u012B r\xF2u.",
        "vi": "B\xE1c s\u0129 khuy\xEAn anh \u1EA5y n\xEAn \u0103n nhi\u1EC1u rau v\xE0 b\u1EDBt \u0103n th\u1ECBt l\u1EA1i."
      }
    ],
    "tips": "B\u1ED9 Nh\u1EE5c (\u8089) t\u01B0\u1EE3ng h\xECnh mi\u1EBFng th\u1ECBt c\u1EAFt l\xE1t c\xF3 th\u1EDB m\u1EE1 \u0111an xen. Khi l\xE0m b\u1ED9 th\u1EE7 b\xEAn tr\xE1i th\u01B0\u1EDDng bi\u1EBFn th\xE0nh d\u1EA1ng b\u1ED9 Nguy\u1EC7t \u6708."
  },
  {
    "id": "pdf_126",
    "hanzi": "\u5730",
    "pinyin": "de",
    "hanViet": "\u0110\u1ECBa",
    "vietnamese": "Tr\u1EE3 t\u1EEB li\xEAn k\u1EBFt ph\xF3 t\u1EEB h\xF3a (ch\u1EC9 ph\u01B0\u01A1ng th\u1EE9c h\xE0nh \u0111\u1ED9ng); (d\xEC) m\u1EB7t \u0111\u1EA5t, \u0111\u1EA5t \u0111ai",
    "partOfSpeech": "Tr\u1EE3 t\u1EEB / Danh t\u1EEB",
    "level": 2,
    "category": "Ng\u1EEF ph\xE1p & Tr\u1EE3 t\u1EEB",
    "radical": "\u571F (Th\u1ED5)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u5B69\u5B50\u4EEC\u9AD8\u5174\u5730\u8DF3\u4E86\u8D77\u6765\u3002",
        "pinyin": "H\xE1izimen g\u0101ox\xECng de ti\xE0o le q\u01D0l\xE1i.",
        "vi": "L\u0169 tr\u1EBB vui m\u1EEBng nh\u1EA3y c\u1EABng l\xEAn."
      },
      {
        "zh": "\u5979\u8BA4\u771F\u5730\u542C\u8001\u5E08\u8BB2\u8BFE\u3002",
        "pinyin": "T\u0101 r\xE8nzh\u0113n de t\u012Bng l\u01CEosh\u012B ji\u01CEngk\xE8.",
        "vi": "C\xF4 \u1EA5y ch\u0103m ch\xFA l\u1EAFng nghe th\u1EA7y c\xF4 gi\u1EA3ng b\xE0i."
      }
    ],
    "tips": "B\u1ED9 Th\u1ED5 (\u571F - \u0111\u1EA5t \u0111ai) + D\xE3 (\u4E5F). \u0110\u1ECDc thanh nh\u1EB9 'de' \u0111\u1EE9ng sau t\xEDnh t\u1EEB b\u1ED5 ngh\u0129a cho \u0111\u1ED9ng t\u1EEB (VD: \u9AD8\u5174\u5730 - m\u1ED9t c\xE1ch vui v\u1EBB); \u0111\u1ECDc thanh b\u1ED1n 'd\xEC' ngh\u0129a l\xE0 \u0111\u1EA5t \u0111ai."
  },
  {
    "id": "pdf_127",
    "hanzi": "\u5E8A",
    "pinyin": "chu\xE1ng",
    "hanViet": "S\xE0ng",
    "vietnamese": "Chi\u1EBFc gi\u01B0\u1EDDng, gi\u01B0\u1EDDng ng\u1EE7",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 2,
    "category": "\u0110\u1ED3 d\xF9ng gia \u0111\xECnh & Ph\xF2ng ng\u1EE7",
    "radical": "\u5E7F (Qu\u1EA3ng)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u8FD9\u5F20\u5E8A\u53C8\u5927\u53C8\u8212\u9002\u3002",
        "pinyin": "Zh\xE8 zh\u0101ng chu\xE1ng y\xF2u d\xE0 y\xF2u sh\u016Bsh\xEC.",
        "vi": "Chi\u1EBFc gi\u01B0\u1EDDng n\xE0y v\u1EEBa r\u1ED9ng v\u1EEBa \xEAm \xE1i."
      },
      {
        "zh": "\u4ED6\u6BCF\u5929\u65E9\u4E0A\u4E03\u70B9\u51C6\u65F6\u8D77\u5E8A\u3002",
        "pinyin": "T\u0101 m\u011Biti\u0101n z\u01CEoshang q\u012B di\u01CEn zh\u01D4nsh\xED q\u01D0chu\xE1ng.",
        "vi": "C\u1EADu \u1EA5y m\u1ED7i s\xE1ng \u0111\xFAng b\u1EA3y gi\u1EDD l\xE0 th\u1EE9c d\u1EADy ra kh\u1ECFi gi\u01B0\u1EDDng."
      }
    ],
    "tips": "B\u1ED9 Qu\u1EA3ng (\u5E7F - gian nh\xE0 c\xF3 m\xE1i che) bao b\u1ECDc ch\u1EEF M\u1ED9c (\u6728 - g\u1ED7). Chi\u1EBFc gi\u01B0\u1EDDng b\u1EB1ng g\u1ED7 \u0111\u1EB7t trong gian ph\xF2ng ng\u1EE7 \u0111\u1EC3 ngh\u1EC9 ng\u01A1i. Ph\u1ED3n th\u1EC3: \u5E8A / \u7240."
  },
  {
    "id": "pdf_128",
    "hanzi": "\u8212\u670D",
    "pinyin": "sh\u016Bfu",
    "hanViet": "Th\u01B0 Ph\u1EE5c",
    "vietnamese": "D\u1EC5 ch\u1ECBu, tho\u1EA3i m\xE1i, kh\u1ECFe kho\u1EAFn",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 2,
    "category": "C\u1EA3m gi\xE1c & S\u1EE9c kh\u1ECFe",
    "radical": "\u820C (Thi\u1EC7t) + \u6708 (Ng\u1EE5c/Nh\u1EE5c)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u5750\u5728\u6C99\u53D1\u4E0A\u559D\u8336\u771F\u8212\u670D\uFF01",
        "pinyin": "Zu\xF2 z\xE0i sh\u0101f\u0101 sh\xE0ng h\u0113 ch\xE1 zh\u0113n sh\u016Bfu!",
        "vi": "Ng\u1ED3i tr\xEAn gh\u1EBF s\xF4-pha u\u1ED1ng tr\xE0 th\u1EADt l\xE0 tho\u1EA3i m\xE1i d\u1EC5 ch\u1ECBu!"
      },
      {
        "zh": "\u4ECA\u5929\u6211\u8EAB\u4F53\u6709\u70B9\u513F\u4E0D\u8212\u670D\uFF0C\u60F3\u8BF7\u5047\u4F11\u606F\u3002",
        "pinyin": "J\u012Bnti\u0101n w\u01D2 sh\u0113nt\u01D0 y\u01D2udi\u01CEnr b\xF9 sh\u016Bfu, xi\u01CEng q\u01D0ngji\xE0 xi\u016Bxi.",
        "vi": "H\xF4m nay trong ng\u01B0\u1EDDi t\xF4i h\u01A1i kh\xF3 ch\u1ECBu, mu\u1ED1n xin ngh\u1EC9 ph\xE9p ngh\u1EC9 ng\u01A1i."
      }
    ],
    "tips": "Th\u01B0 (\u8212 - du\u1ED7i ra khoan kho\xE1i, b\u1ED9 Thi\u1EC7t \u820C) + Ph\u1EE5c (\u670D - thu\u1EA7n ph\u1EE5c \xEAm thu\u1EADn, b\u1ED9 Nh\u1EE5c \u6708). Tr\u1EA1ng th\xE1i tinh th\u1EA7n v\xE0 th\u1EC3 ch\u1EA5t th\u01B0 th\xE1i, d\u1EC5 ch\u1ECBu."
  },
  {
    "id": "pdf_129",
    "hanzi": "\u6211",
    "pinyin": "w\u01D2",
    "hanViet": "Ng\xE3",
    "vietnamese": "T\xF4i, tao, m\xECnh, b\u1EA3n th\xE2n",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nh\xE2n x\u01B0ng",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u6208 (Qua - v\u0169 kh\xED)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u662F\u8D8A\u5357\u4EBA\u3002",
        "pinyin": "W\u01D2 sh\xEC Yu\xE8n\xE1n r\xE9n.",
        "vi": "T\xF4i l\xE0 ng\u01B0\u1EDDi Vi\u1EC7t Nam."
      },
      {
        "zh": "\u6211\u6709\u4E24\u4E2A\u4E2D\u56FD\u670B\u53CB\u3002",
        "pinyin": "W\u01D2 y\u01D2u li\u01CEng g\xE8 Zh\u014Dnggu\xF3 p\xE9ngyou.",
        "vi": "T\xF4i c\xF3 hai ng\u01B0\u1EDDi b\u1EA1n Trung Qu\u1ED1c."
      }
    ],
    "tips": "Ch\u1EEF \u6211 g\u1ED3m b\u1ED9 Th\u1EE7 (\u624B - tay c\u1EA7m) k\u1EBFt h\u1EE3p v\u1EDBi v\u0169 kh\xED Qua (\u6208). \xDD ngh\u0129a nguy\xEAn th\u1EE7y l\xE0 tay c\u1EA7m v\u0169 kh\xED b\u1EA3o v\u1EC7 b\u1EA3n th\xE2n (b\u1EA3n ng\xE3)."
  },
  {
    "id": "pdf_130",
    "hanzi": "\u4F60",
    "pinyin": "n\u01D0",
    "hanViet": "N\u1EC5",
    "vietnamese": "B\u1EA1n, c\u1EADu, m\xE0y, anh, ch\u1ECB",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nh\xE2n x\u01B0ng",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4F60\u662F\u5B66\u751F\u5417\uFF1F",
        "pinyin": "N\u01D0 sh\xEC xu\xE9sheng ma?",
        "vi": "B\u1EA1n c\xF3 ph\u1EA3i l\xE0 h\u1ECDc sinh kh\xF4ng?"
      },
      {
        "zh": "\u4F60\u5728\u770B\u4EC0\u4E48\u4E66\uFF1F",
        "pinyin": "N\u01D0 z\xE0i k\xE0n sh\xE9nme sh\u016B?",
        "vi": "B\u1EA1n \u0111ang \u0111\u1ECDc s\xE1ch g\xEC th\u1EBF?"
      }
    ],
    "tips": "B\u1ED9 Nh\xE2n \u0111\u1EE9ng (\u4EBB) bi\u1EC3u th\u1ECB con ng\u01B0\u1EDDi, b\xEAn ph\u1EA3i l\xE0 ch\u1EEF Nh\u0129 (\u5C14). 'N\u1EC5' l\xE0 ng\u01B0\u1EDDi \u0111\u1ED1i di\u1EC7n \u0111ang tr\xF2 chuy\u1EC7n c\xF9ng ta."
  },
  {
    "id": "pdf_131",
    "hanzi": "\u4ED6",
    "pinyin": "t\u0101",
    "hanViet": "Tha",
    "vietnamese": "Anh \u1EA5y, \xF4ng \u1EA5y, c\u1EADu \u1EA5y, ch\xFA \u1EA5y (ng\xF4i th\u1EE9 3 nam)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nh\xE2n x\u01B0ng",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u4ED6\u662F\u6211\u4EEC\u7684\u6C49\u8BED\u8001\u5E08\u3002",
        "pinyin": "T\u0101 sh\xEC w\u01D2men de H\xE0ny\u01D4 l\u01CEosh\u012B.",
        "vi": "Th\u1EA7y \u1EA5y l\xE0 gi\xE1o vi\xEAn ti\u1EBFng Trung c\u1EE7a ch\xFAng t\xF4i."
      },
      {
        "zh": "\u4ED6\u4ECA\u5929\u53BB\u5317\u4EAC\u4E86\u3002",
        "pinyin": "T\u0101 j\u012Bnti\u0101n q\xF9 B\u011Bij\u012Bng le.",
        "vi": "Anh \u1EA5y h\xF4m nay \u0111i B\u1EAFc Kinh r\u1ED3i."
      }
    ],
    "tips": "B\u1ED9 Nh\xE2n \u0111\u1EE9ng (\u4EBB) k\u1EBFt h\u1EE3p ch\u1EEF D\xE3 (\u4E5F). D\xF9ng ch\u1EC9 ng\u01B0\u1EDDi nam gi\u1EDBi \u1EDF ng\xF4i th\u1EE9 ba."
  },
  {
    "id": "pdf_132",
    "hanzi": "\u5979",
    "pinyin": "t\u0101",
    "hanViet": "Tha",
    "vietnamese": "C\xF4 \u1EA5y, b\xE0 \u1EA5y, ch\u1ECB \u1EA5y (ng\xF4i th\u1EE9 3 n\u1EEF)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nh\xE2n x\u01B0ng",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u5973 (N\u1EEF)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u5979\u5F88\u6F02\u4EAE\uFF0C\u4E5F\u5F88\u806A\u660E\u3002",
        "pinyin": "T\u0101 h\u011Bn pi\xE0oliang, y\u011B h\u011Bn c\u014Dngming.",
        "vi": "C\xF4 \u1EA5y r\u1EA5t xinh \u0111\u1EB9p v\xE0 c\u0169ng r\u1EA5t th\xF4ng minh."
      },
      {
        "zh": "\u5979\u662F\u738B\u533B\u751F\u7684\u5973\u513F\u3002",
        "pinyin": "T\u0101 sh\xEC W\xE1ng y\u012Bsh\u0113ng de n\u01DA'\xE9r.",
        "vi": "Ch\u1ECB \u1EA5y l\xE0 con g\xE1i c\u1EE7a b\xE1c s\u0129 V\u01B0\u01A1ng."
      }
    ],
    "tips": "B\u1ED9 N\u1EEF (\u5973) k\u1EBFt h\u1EE3p ch\u1EEF D\xE3 (\u4E5F). Chuy\xEAn d\xF9ng ch\u1EC9 ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF, ph\xE1i n\u1EEF \u1EDF ng\xF4i th\u1EE9 ba."
  },
  {
    "id": "pdf_133",
    "hanzi": "\u6211\u4EEC",
    "pinyin": "w\u01D2men",
    "hanViet": "Ng\xE3 M\xF4n",
    "vietnamese": "Ch\xFAng t\xF4i, ch\xFAng ta",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nh\xE2n x\u01B0ng s\u1ED1 nhi\u1EC1u",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u6208 (Qua) + \u4EBB (Nh\xE2n)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u90FD\u662F\u5927\u5B66\u751F\u3002",
        "pinyin": "W\u01D2men d\u014Du sh\xEC d\xE0xu\xE9sh\u0113ng.",
        "vi": "Ch\xFAng t\xF4i \u0111\u1EC1u l\xE0 sinh vi\xEAn \u0111\u1EA1i h\u1ECDc."
      },
      {
        "zh": "\u6211\u4EEC\u4E00\u8D77\u53BB\u770B\u7535\u5F71\u5427\uFF01",
        "pinyin": "W\u01D2men y\xECq\u01D0 q\xF9 k\xE0n di\xE0ny\u01D0ng ba!",
        "vi": "Ch\xFAng ta c\xF9ng nhau \u0111i xem phim nh\xE9!"
      }
    ],
    "tips": "Ch\u1EEF \u6211 (t\xF4i) gh\xE9p v\u1EDBi tr\u1EE3 t\u1EEB \u4EEC (ch\u1EC9 s\u1ED1 nhi\u1EC1u) t\u1EA1o th\xE0nh 'ch\xFAng t\xF4i, ch\xFAng ta'."
  },
  {
    "id": "pdf_134",
    "hanzi": "\u8FD9",
    "pinyin": "zh\xE8",
    "hanViet": "Gi\xE1",
    "vietnamese": "\u0110\xE2y, n\xE0y (\u0111\u1EA1i t\u1EEB ch\u1EC9 th\u1ECB g\u1EA7n)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB ch\u1EC9 th\u1ECB",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & Ch\u1EC9 th\u1ECB",
    "radical": "\u8FB6 (X\u01B0\u1EDBc - \u0111i l\u1EA1i)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u8FD9\u662F\u8C01\u7684\u7535\u8111\uFF1F",
        "pinyin": "Zh\xE8 sh\xEC sh\xE9i de di\xE0nn\u01CEo?",
        "vi": "\u0110\xE2y l\xE0 m\xE1y vi t\xEDnh c\u1EE7a ai?"
      },
      {
        "zh": "\u8FD9\u672C\u4E66\u5F88\u6709\u610F\u601D\u3002",
        "pinyin": "Zh\xE8 b\u011Bn sh\u016B h\u011Bn y\u01D2u y\xECsi.",
        "vi": "Quy\u1EC3n s\xE1ch n\xE0y r\u1EA5t hay."
      }
    ],
    "tips": "B\u1ED9 X\u01B0\u1EDBc (\u8FB6) ch\u1EC9 ph\u01B0\u01A1ng h\u01B0\u1EDBng, b\xEAn trong l\xE0 ch\u1EEF V\u0103n (\u6587). D\xF9ng ch\u1EC9 s\u1EF1 v\u1EADt, ng\u01B0\u1EDDi \u1EDF c\u1EF1 ly g\u1EA7n."
  },
  {
    "id": "pdf_135",
    "hanzi": "\u8FD9\u513F",
    "pinyin": "zh\xE8r",
    "hanViet": "Gi\xE1 Nhi",
    "vietnamese": "\u1EDE \u0111\xE2y, ch\u1ED7 n\xE0y, n\u01A1i n\xE0y",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB ch\u1EC9 n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & Ch\u1EC9 th\u1ECB",
    "radical": "\u8FB6 (X\u01B0\u1EDBc) + \u513F (Nhi)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u8BF7\u95EE\uFF0C\u6211\u53EF\u4EE5\u5750\u8FD9\u513F\u5417\uFF1F",
        "pinyin": "Q\u01D0ngw\xE8n, w\u01D2 k\u011By\u01D0 zu\xF2 zh\xE8r ma?",
        "vi": "Xin h\u1ECFi, t\xF4i c\xF3 th\u1EC3 ng\u1ED3i \u1EDF \u0111\xE2y kh\xF4ng?"
      },
      {
        "zh": "\u8FD9\u513F\u7684\u5929\u6C14\u975E\u5E38\u597D\u3002",
        "pinyin": "Zh\xE8r de ti\u0101nq\xEC f\u0113ich\xE1ng h\u01CEo.",
        "vi": "Th\u1EDDi ti\u1EBFt \u1EDF ch\u1ED7 n\xE0y v\xF4 c\xF9ng \u0111\u1EB9p."
      }
    ],
    "tips": "Ch\u1EEF \u8FD9 k\u1EBFt h\u1EE3p \xE2m cu\u1ED1n l\u01B0\u1EE1i \u513F (Er) t\u1EA1o th\xE0nh \u0111\u1EA1i t\u1EEB ch\u1EC9 v\u1ECB tr\xED g\u1EA7n ng\u01B0\u1EDDi n\xF3i."
  },
  {
    "id": "pdf_136",
    "hanzi": "\u90A3",
    "pinyin": "n\xE0",
    "hanViet": "Na",
    "vietnamese": "Kia, \u0111\xF3 (\u0111\u1EA1i t\u1EEB ch\u1EC9 th\u1ECB xa)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB ch\u1EC9 th\u1ECB",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & Ch\u1EC9 th\u1ECB",
    "radical": "\u961D (\u1EA4p - tai ph\u1EA3i)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u90A3\u662F\u4F60\u7684\u81EA\u884C\u8F66\u5417\uFF1F",
        "pinyin": "N\xE0 sh\xEC n\u01D0 de z\xECx\xEDngch\u0113 ma?",
        "vi": "Kia c\xF3 ph\u1EA3i l\xE0 xe \u0111\u1EA1p c\u1EE7a b\u1EA1n kh\xF4ng?"
      },
      {
        "zh": "\u90A3\u4E2A\u82F9\u679C\u5F88\u5927\u5F88\u7EA2\u3002",
        "pinyin": "N\xE0 ge p\xEDnggu\u01D2 h\u011Bn d\xE0 h\u011Bn h\xF3ng.",
        "vi": "Qu\u1EA3 t\xE1o kia r\u1EA5t to v\xE0 \u0111\u1ECF."
      }
    ],
    "tips": "D\xF9ng \u0111\u1EC3 ch\u1EC9 v\u1EADt ho\u1EB7c ng\u01B0\u1EDDi \u1EDF xa v\u1ECB tr\xED c\u1EE7a ng\u01B0\u1EDDi n\xF3i v\xE0 ng\u01B0\u1EDDi nghe."
  },
  {
    "id": "pdf_137",
    "hanzi": "\u90A3\u513F",
    "pinyin": "n\xE0r",
    "hanViet": "Na Nhi",
    "vietnamese": "Kia, \u0111\u1EB1ng kia, \u1EDF ch\u1ED7 kia",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB ch\u1EC9 n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & Ch\u1EC9 th\u1ECB",
    "radical": "\u961D (\u1EA4p) + \u513F (Nhi)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u706B\u8F66\u7AD9\u5C31\u5728\u90A3\u513F\u3002",
        "pinyin": "Hu\u01D2ch\u0113zh\xE0n ji\xF9 z\xE0i n\xE0r.",
        "vi": "Ga t\xE0u h\u1ECFa \u1EDF ngay \u0111\u1EB1ng kia."
      },
      {
        "zh": "\u4ED6\u5728\u90A3\u513F\u5DE5\u4F5C\u4E86\u4E09\u5E74\u3002",
        "pinyin": "T\u0101 z\xE0i n\xE0r g\u014Dngzu\xF2 le s\u0101n ni\xE1n.",
        "vi": "Anh \u1EA5y l\xE0m vi\u1EC7c \u1EDF ch\u1ED7 kia \u0111\u01B0\u1EE3c 3 n\u0103m r\u1ED3i."
      }
    ],
    "tips": "Ch\u1EEF \u90A3 gh\xE9p v\u1EDBi cu\u1ED1n l\u01B0\u1EE1i \u513F ch\u1EC9 v\u1ECB tr\xED \u1EDF xa t\u1EA7m tay ho\u1EB7c t\u1EA7m nh\xECn."
  },
  {
    "id": "pdf_138",
    "hanzi": "\u54EA",
    "pinyin": "n\u01CE",
    "hanViet": "N\u1EA3",
    "vietnamese": "N\xE0o, \u0111\xE2u (\u0111\u1EA1i t\u1EEB nghi v\u1EA5n ch\u1ECDn l\u1EF1a)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4F60\u662F\u54EA\u56FD\u4EBA\uFF1F",
        "pinyin": "N\u01D0 sh\xEC n\u01CE gu\xF3 r\xE9n?",
        "vi": "B\u1EA1n l\xE0 ng\u01B0\u1EDDi n\u01B0\u1EDBc n\xE0o?"
      },
      {
        "zh": "\u4F60\u60F3\u4E70\u54EA\u4EF6\u8863\u670D\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng m\u01CEi n\u01CE ji\xE0n y\u012Bfu?",
        "vi": "B\u1EA1n mu\u1ED1n mua b\u1ED9 qu\u1EA7n \xE1o n\xE0o?"
      }
    ],
    "tips": "B\u1ED9 Kh\u1EA9u (\u53E3 - mi\u1EC7ng h\u1ECFi han) \u0111\u1EE9ng tr\u01B0\u1EDBc ch\u1EEF \u90A3 (kia). C\xF3 mi\u1EC7ng h\u1ECFi th\xEC bi\u1EBFn th\xE0nh t\u1EEB nghi v\u1EA5n 'n\xE0o, c\xE1i n\xE0o'."
  },
  {
    "id": "pdf_139",
    "hanzi": "\u54EA\u513F",
    "pinyin": "n\u01CEr",
    "hanViet": "N\u1EA3 Nhi",
    "vietnamese": "\u0110\xE2u, \u1EDF \u0111\xE2u, ch\u1ED7 n\xE0o (h\u1ECFi n\u01A1i ch\u1ED1n)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u53E3 (Kh\u1EA9u) + \u513F (Nhi)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u4F60\u53BB\u54EA\u513F\u4E70\u4E1C\u897F\uFF1F",
        "pinyin": "N\u01D0 q\xF9 n\u01CEr m\u01CEi d\u014Dngxi?",
        "vi": "B\u1EA1n \u0111i \u0111\xE2u mua \u0111\u1ED3 v\u1EADy?"
      },
      {
        "zh": "\u8BF7\u95EE\uFF0C\u6D17\u624B\u95F4\u5728\u54EA\u513F\uFF1F",
        "pinyin": "Q\u01D0ngw\xE8n, x\u01D0sh\u01D2uji\u0101n z\xE0i n\u01CEr?",
        "vi": "Xin h\u1ECFi, nh\xE0 v\u1EC7 sinh \u1EDF \u0111\xE2u \u1EA1?"
      }
    ],
    "tips": "\u54EA k\u1EBFt h\u1EE3p \xE2m cu\u1ED1n l\u01B0\u1EE1i \u513F chuy\xEAn d\xF9ng h\u1ECFi v\u1ECB tr\xED, ph\u01B0\u01A1ng h\u01B0\u1EDBng, \u0111\u1ECBa \u0111i\u1EC3m."
  },
  {
    "id": "pdf_140",
    "hanzi": "\u8C01",
    "pinyin": "sh\xE9i",
    "hanViet": "Th\xF9y",
    "vietnamese": "Ai, ng\u01B0\u1EDDi n\xE0o",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4ED6\u662F\u8C01\uFF1F",
        "pinyin": "T\u0101 sh\xEC sh\xE9i?",
        "vi": "C\u1EADu \u1EA5y l\xE0 ai th\u1EBF?"
      },
      {
        "zh": "\u8C01\u5728\u5916\u9762\u8BF4\u8BDD\uFF1F",
        "pinyin": "Sh\xE9i z\xE0i w\xE0imi\xE0n shu\u014Dhu\xE0?",
        "vi": "Ai \u0111ang n\xF3i chuy\u1EC7n \u1EDF b\xEAn ngo\xE0i v\u1EADy?"
      }
    ],
    "tips": "B\u1ED9 Ng\xF4n (\u8BA0) k\u1EBFt h\u1EE3p ch\u1EEF Chuy (\u96B9 - chim \u0111u\xF4i ng\u1EAFn). L\u1EDDi n\xF3i c\u1EA5t l\xEAn h\u1ECFi danh t\xEDnh m\u1ED9t ng\u01B0\u1EDDi."
  },
  {
    "id": "pdf_141",
    "hanzi": "\u4EC0\u4E48",
    "pinyin": "sh\xE9nme",
    "hanViet": "Th\u1EADp Ma",
    "vietnamese": "C\xE1i g\xEC, g\xEC (\u0111\u1EA1i t\u1EEB nghi v\u1EA5n \u0111\u1ED3 v\u1EADt, h\xE0nh \u0111\u1ED9ng)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u4E48 (Ma)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4F60\u5728\u770B\u4EC0\u4E48\uFF1F",
        "pinyin": "N\u01D0 z\xE0i k\xE0n sh\xE9nme?",
        "vi": "B\u1EA1n \u0111ang nh\xECn c\xE1i g\xEC \u0111\u1EA5y?"
      },
      {
        "zh": "\u8FD9\u662F\u4EC0\u4E48\u83DC\uFF1F\u771F\u597D\u5403\uFF01",
        "pinyin": "Zh\xE8 sh\xEC sh\xE9nme c\xE0i? Zh\u0113n h\u01CEoch\u012B!",
        "vi": "\u0110\xE2y l\xE0 m\xF3n \u0103n g\xEC th\u1EBF? Ngon qu\xE1!"
      }
    ],
    "tips": "T\u1EEB \u0111\u1EC3 h\u1ECFi th\xF4ng d\u1EE5ng b\u1EADc nh\u1EA5t trong ti\u1EBFng Trung: \u4EC0\u4E48 + Danh t\u1EEB (t\xEAn g\xEC, s\xE1ch g\xEC, chuy\u1EC7n g\xEC)."
  },
  {
    "id": "pdf_142",
    "hanzi": "\u591A\u5C11",
    "pinyin": "du\u014Dshao",
    "hanViet": "\u0110a Thi\u1EC3u",
    "vietnamese": "Bao nhi\xEAu (h\u1ECFi s\u1ED1 l\u01B0\u1EE3ng tr\xEAn 10 ho\u1EB7c gi\xE1 c\u1EA3)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n s\u1ED1 l\u01B0\u1EE3ng",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u5915 (T\u1ECBch) + \u5C0F (Ti\u1EC3u)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u591A\u5C11\u94B1\uFF1F",
        "pinyin": "Zh\xE8ge du\u014Dshao qi\xE1n?",
        "vi": "C\xE1i n\xE0y bao nhi\xEAu ti\u1EC1n?"
      },
      {
        "zh": "\u4F60\u4EEC\u5B66\u6821\u6709\u591A\u5C11\u4E2A\u5B66\u751F\uFF1F",
        "pinyin": "N\u01D0men xu\xE9xi\xE0o y\u01D2u du\u014Dshao g\xE8 xu\xE9sheng?",
        "vi": "Tr\u01B0\u1EDDng c\xE1c b\u1EA1n c\xF3 bao nhi\xEAu h\u1ECDc sinh?"
      }
    ],
    "tips": "Gh\xE9p gi\u1EEFa \u591A (nhi\u1EC1u) v\xE0 \u5C11 (\xEDt). V\u1EEBa h\u1ECFi s\u1ED1 l\u01B0\u1EE3ng nhi\u1EC1u v\u1EEBa h\u1ECFi gi\xE1 c\u1EA3 mua b\xE1n h\xE0ng ng\xE0y."
  },
  {
    "id": "pdf_143",
    "hanzi": "\u51E0",
    "pinyin": "j\u01D0",
    "hanViet": "K\u1EF7",
    "vietnamese": "M\u1EA5y, v\xE0i (h\u1ECFi s\u1ED1 l\u01B0\u1EE3ng nh\u1ECF d\u01B0\u1EDBi 10)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n s\u1ED1 l\u01B0\u1EE3ng",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u51E0 (K\u1EF7 - c\xE1i b\xE0n con)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u73B0\u5728\u51E0\u70B9\u4E86\uFF1F",
        "pinyin": "Xi\xE0nz\xE0i j\u01D0 di\u01CEn le?",
        "vi": "B\xE2y gi\u1EDD l\xE0 m\u1EA5y gi\u1EDD r\u1ED3i?"
      },
      {
        "zh": "\u4F60\u5BB6\u6709\u51E0\u53E3\u4EBA\uFF1F",
        "pinyin": "N\u01D0 ji\u0101 y\u01D2u j\u01D0 k\u01D2u r\xE9n?",
        "vi": "Nh\xE0 b\u1EA1n c\xF3 m\u1EA5y ng\u01B0\u1EDDi?"
      }
    ],
    "tips": "Ch\u1EEF \u51E0 ch\u1EC9 c\xF3 2 n\xE9t, d\xF9ng h\u1ECFi s\u1ED1 \u0111\u1EBFm th\u01B0\u1EDDng d\u01B0\u1EDBi 10 (m\u1EA5y ng\u01B0\u1EDDi, m\u1EA5y gi\u1EDD, th\u1EE9 m\u1EA5y)."
  },
  {
    "id": "pdf_144",
    "hanzi": "\u600E\u4E48",
    "pinyin": "z\u011Bnme",
    "hanViet": "Ch\u1EA9m Ma",
    "vietnamese": "L\xE0m sao, th\u1EBF n\xE0o, b\u1EB1ng c\xE1ch n\xE0o (h\u1ECFi c\xE1ch th\u1EE9c/nguy\xEAn nh\xE2n)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n c\xE1ch th\u1EE9c",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u5FC3 (T\xE2m)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u6C49\u5B57\u600E\u4E48\u8BFB\uFF1F",
        "pinyin": "Zh\xE8ge h\xE0nz\xEC z\u011Bnme d\xFA?",
        "vi": "Ch\u1EEF H\xE1n n\xE0y \u0111\u1ECDc nh\u01B0 th\u1EBF n\xE0o?"
      },
      {
        "zh": "\u4F60\u600E\u4E48\u6CA1\u6765\u4E0A\u8BFE\uFF1F",
        "pinyin": "N\u01D0 z\u011Bnme m\xE9i l\xE1i sh\xE0ngk\xE8?",
        "vi": "L\xE0m sao m\xE0 h\xF4m nay b\u1EA1n kh\xF4ng \u0111\u1EBFn l\u1EDBp?"
      }
    ],
    "tips": "Ch\u1EEF \u600E c\xF3 b\u1ED9 T\xE2m (\u5FC3) \u1EDF d\u01B0\u1EDBi suy ng\u1EABm tr\u0103n tr\u1EDF. \u0110\u1EE9ng tr\u01B0\u1EDBc \u0111\u1ED9ng t\u1EEB h\u1ECFi c\xE1ch th\u1EE9c th\u1EF1c hi\u1EC7n h\xE0nh \u0111\u1ED9ng."
  },
  {
    "id": "pdf_145",
    "hanzi": "\u600E\u4E48\u6837",
    "pinyin": "z\u011Bnmey\xE0ng",
    "hanViet": "Ch\u1EA9m Ma D\u1EA1ng",
    "vietnamese": "Nh\u01B0 th\u1EBF n\xE0o, ra sao (h\u1ECFi t\xEDnh ch\u1EA5t, t\xECnh tr\u1EA1ng, th\u0103m d\xF2 \xFD ki\u1EBFn)",
    "partOfSpeech": "\u0110\u1EA1i t\u1EEB nghi v\u1EA5n",
    "level": 1,
    "category": "Nghi v\u1EA5n & C\xE2u h\u1ECFi",
    "radical": "\u5FC3 (T\xE2m) + \u6728 (M\u1ED9c)",
    "strokeCount": 21,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u5929\u6C14\u600E\u4E48\u6837\uFF1F",
        "pinyin": "J\u012Bnti\u0101n ti\u0101nq\xEC z\u011Bnmey\xE0ng?",
        "vi": "Th\u1EDDi ti\u1EBFt h\xF4m nay th\u1EBF n\xE0o?"
      },
      {
        "zh": "\u6211\u4EEC\u53BB\u559D\u5976\u8336\uFF0C\u600E\u4E48\u6837\uFF1F",
        "pinyin": "W\u01D2men q\xF9 h\u0113 n\u01CEich\xE1, z\u011Bnmey\xE0ng?",
        "vi": "Ch\xFAng m\xECnh \u0111i u\u1ED1ng tr\xE0 s\u1EEFa \u0111i, th\u1EA5y th\u1EBF n\xE0o?"
      }
    ],
    "tips": "Th\u01B0\u1EDDng \u0111\u1EE9ng cu\u1ED1i c\xE2u \u0111\u1EC3 h\u1ECFi th\u0103m t\xECnh h\xECnh, s\u1EE9c kh\u1ECFe ho\u1EB7c \u0111\u1EC1 xu\u1EA5t g\u1EE3i \xFD th\u0103m d\xF2 \xFD ki\u1EBFn \u0111\u1ED1i ph\u01B0\u01A1ng."
  },
  {
    "id": "pdf_146",
    "hanzi": "\u4E00",
    "pinyin": "y\u012B",
    "hanViet": "Nh\u1EA5t",
    "vietnamese": "S\u1ED1 1, m\u1ED9t",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 1,
    "examples": [
      {
        "zh": "\u8BF7\u7ED9\u6211\u4E00\u676F\u8336\u3002",
        "pinyin": "Q\u01D0ng g\u011Bi w\u01D2 y\xEC b\u0113i ch\xE1.",
        "vi": "Xin cho t\xF4i m\u1ED9t c\u1ED1c tr\xE0."
      },
      {
        "zh": "\u6211\u4EEC\u662F\u4E00\u4E2A\u5B66\u6821\u7684\u5B66\u751F\u3002",
        "pinyin": "W\u01D2men sh\xEC y\xED g\xE8 xu\xE9xi\xE0o de xu\xE9sheng.",
        "vi": "Ch\xFAng t\xF4i l\xE0 h\u1ECDc sinh c\xF9ng m\u1ED9t tr\u01B0\u1EDDng."
      }
    ],
    "tips": "N\xE9t ngang duy nh\u1EA5t t\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 kh\u1EDFi \u0111\u1EA7u, duy nh\u1EA5t v\xE0 tr\u1ECDn v\u1EB9n c\u1EE7a v\u0169 tr\u1EE5."
  },
  {
    "id": "pdf_147",
    "hanzi": "\u4E8C",
    "pinyin": "\xE8r",
    "hanViet": "Nh\u1ECB",
    "vietnamese": "S\u1ED1 2, hai",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E8C (Nh\u1ECB)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u662F\u661F\u671F\u4E8C\u3002",
        "pinyin": "J\u012Bnti\u0101n sh\xEC x\u012Bngq\u012B'\xE8r.",
        "vi": "H\xF4m nay l\xE0 th\u1EE9 ba."
      },
      {
        "zh": "\u4E8C\u6708\u6709\u4E8C\u5341\u516B\u5929\u3002",
        "pinyin": "\xC8ryu\xE8 y\u01D2u \xE8rsh\xEDb\u0101 ti\u0101n.",
        "vi": "Th\xE1ng hai c\xF3 28 ng\xE0y."
      }
    ],
    "tips": "Hai n\xE9t ngang bi\u1EC3u th\u1ECB tr\u1EDDi v\xE0 \u0111\u1EA5t, \xE2m v\xE0 d\u01B0\u01A1ng, s\u1ED1 2 trong to\xE1n h\u1ECDc."
  },
  {
    "id": "pdf_148",
    "hanzi": "\u4E09",
    "pinyin": "s\u0101n",
    "hanViet": "Tam",
    "vietnamese": "S\u1ED1 3, ba",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u6211\u6709\u4E09\u4E2A\u597D\u670B\u53CB\u3002",
        "pinyin": "W\u01D2 y\u01D2u s\u0101n g\xE8 h\u01CEo p\xE9ngyou.",
        "vi": "T\xF4i c\xF3 3 ng\u01B0\u1EDDi b\u1EA1n t\u1ED1t."
      },
      {
        "zh": "\u4E09\u6708\u7684\u5929\u6C14\u5F88\u6696\u548C\u3002",
        "pinyin": "S\u0101nyu\xE8 de ti\u0101nq\xEC h\u011Bn nu\u01CEnhuo.",
        "vi": "Th\u1EDDi ti\u1EBFt th\xE1ng ba r\u1EA5t \u1EA5m \xE1p."
      }
    ],
    "tips": "Ba n\xE9t ngang t\u01B0\u1EE3ng tr\u01B0ng cho Thi\xEAn - \u0110\u1ECBa - Nh\xE2n (Tam t\xE0i) t\u1EA1o n\xEAn v\u1EA1n v\u1EADt h\xF2a h\u1EE3p."
  },
  {
    "id": "pdf_149",
    "hanzi": "\u4E94",
    "pinyin": "w\u01D4",
    "hanViet": "Ng\u0169",
    "vietnamese": "S\u1ED1 5, n\u0103m",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E8C (Nh\u1ECB)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u4E94\u4E2A\u4EBA\u4E00\u8D77\u6765\u5403\u996D\u3002",
        "pinyin": "W\u01D4 g\xE8 r\xE9n y\xECq\u01D0 l\xE1i ch\u012Bf\xE0n.",
        "vi": "N\u0103m ng\u01B0\u1EDDi c\xF9ng nhau \u0111\u1EBFn \u0103n c\u01A1m."
      },
      {
        "zh": "\u4E0B\u5348\u4E94\u70B9\u6211\u4EEC\u4E0B\u73ED\u3002",
        "pinyin": "Xi\xE0w\u01D4 w\u01D4 di\u01CEn w\u01D2men xi\xE0b\u0101n.",
        "vi": "5 gi\u1EDD chi\u1EC1u ch\xFAng t\xF4i tan l\xE0m."
      }
    ],
    "tips": "Ng\u0169 h\xE0nh (Kim M\u1ED9c Th\u1EE7y H\u1ECFa Th\u1ED5). S\u1ED1 5 l\xE0 trung t\xE2m dung h\xF2a c\xE2n b\u1EB1ng."
  },
  {
    "id": "pdf_150",
    "hanzi": "\u4E03",
    "pinyin": "q\u012B",
    "hanViet": "Th\u1EA5t",
    "vietnamese": "S\u1ED1 7, b\u1EA3y",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u4E00\u4E2A\u661F\u671F\u6709\u4E03\u5929\u3002",
        "pinyin": "Y\xED g\xE8 x\u012Bngq\u012B y\u01D2u q\u012B ti\u0101n.",
        "vi": "M\u1ED9t tu\u1EA7n c\xF3 b\u1EA3y ng\xE0y."
      },
      {
        "zh": "\u4E03\u6708\u662F\u6700\u70ED\u7684\u65F6\u5019\u3002",
        "pinyin": "Q\u012Byu\xE8 sh\xEC zu\xEC r\xE8 de sh\xEDhou.",
        "vi": "Th\xE1ng b\u1EA3y l\xE0 th\u1EDDi \u0111i\u1EC3m n\xF3ng nh\u1EA5t."
      }
    ],
    "tips": "G\u1ED3m n\xE9t ngang v\xE0 n\xE9t cong m\xF3c \u0111\u1EE9ng. Th\u1EA5t tinh, 7 s\u1EAFc c\u1EA7u v\u1ED3ng."
  },
  {
    "id": "pdf_151",
    "hanzi": "\u516B",
    "pinyin": "b\u0101",
    "hanViet": "B\xE1t",
    "vietnamese": "S\u1ED1 8, t\xE1m (con s\u1ED1 may m\u1EAFn, ph\xE1t t\xE0i)",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u516B (B\xE1t)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u660E\u5929\u65E9\u4E0A\u516B\u70B9\u89C1\uFF01",
        "pinyin": "M\xEDngti\u0101n z\u01CEoshang b\u0101 di\u01CEn ji\xE0n!",
        "vi": "H\u1EB9n g\u1EB7p v\xE0o 8 gi\u1EDD s\xE1ng mai nh\xE9!"
      },
      {
        "zh": "\u8FD9\u4EF6\u8863\u670D\u516B\u5341\u516B\u5757\u94B1\u3002",
        "pinyin": "Zh\xE8 ji\xE0n y\u012Bfu b\u0101sh\xEDb\u0101 ku\xE0i qi\xE1n.",
        "vi": "B\u1ED9 qu\u1EA7n \xE1o n\xE0y 88 \u0111\u1ED3ng."
      }
    ],
    "tips": "Ph\xE1t \xE2m 'b\u0101' g\u1EA7n v\u1EDBi 'f\u0101' (Ph\xE1t t\xE0i, ph\xE1t l\u1ED9c) n\xEAn ng\u01B0\u1EDDi Trung Qu\u1ED1c r\u1EA5t y\xEAu chu\u1ED9ng s\u1ED1 8."
  },
  {
    "id": "pdf_152",
    "hanzi": "\u4E5D",
    "pinyin": "ji\u01D4",
    "hanViet": "C\u1EEDu",
    "vietnamese": "S\u1ED1 9, ch\xEDn (v\u0129nh c\u1EEDu, tr\u01B0\u1EDDng t\u1ED3n)",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E3F (Phi\u1EC7t)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u4E5D\u70B9\u6211\u4EEC\u5728\u706B\u8F66\u7AD9\u89C1\u9762\u3002",
        "pinyin": "Ji\u01D4 di\u01CEn w\u01D2men z\xE0i hu\u01D2ch\u0113zh\xE0n ji\xE0nmi\xE0n.",
        "vi": "Ch\xEDn gi\u1EDD ch\xFAng m\xECnh g\u1EB7p nhau \u1EDF ga t\xE0u h\u1ECFa."
      },
      {
        "zh": "\u4ED6\u4ECA\u5E74\u4E5D\u5C81\u4E86\u3002",
        "pinyin": "T\u0101 j\u012Bnni\xE1n ji\u01D4 su\xEC le.",
        "vi": "N\u0103m nay c\u1EADu b\xE9 ch\xEDn tu\u1ED5i r\u1ED3i."
      }
    ],
    "tips": "S\u1ED1 9 \u0111\u1ED3ng \xE2m v\u1EDBi \u4E45 (ji\u01D4 - d\xE0i l\xE2u, tr\u01B0\u1EDDng th\u1ECD, thi\xEAn tr\u01B0\u1EDDng \u0111\u1ECBa c\u1EEDu)."
  },
  {
    "id": "pdf_153",
    "hanzi": "\u5341",
    "pinyin": "sh\xED",
    "hanViet": "Th\u1EADp",
    "vietnamese": "S\u1ED1 10, m\u01B0\u1EDDi",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u5341 (Th\u1EADp)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u684C\u5B50\u4E0A\u6709\u5341\u672C\u4E66\u3002",
        "pinyin": "Zhu\u014Dzi shang y\u01D2u sh\xED b\u011Bn sh\u016B.",
        "vi": "Tr\xEAn b\xE0n c\xF3 m\u01B0\u1EDDi quy\u1EC3n s\xE1ch."
      },
      {
        "zh": "\u73B0\u5728\u662F\u5341\u6708\u3002",
        "pinyin": "Xi\xE0nz\xE0i sh\xEC sh\xED yu\xE8.",
        "vi": "B\xE2y gi\u1EDD l\xE0 th\xE1ng m\u01B0\u1EDDi."
      }
    ],
    "tips": "H\xECnh ch\u1EEF th\u1EADp giao nhau ho\xE0n h\u1EA3o bi\u1EC3u th\u1ECB 'th\u1EADp to\xE0n th\u1EADp m\u1EF9' (m\u01B0\u1EDDi ph\xE2n v\u1EB9n m\u01B0\u1EDDi)."
  },
  {
    "id": "pdf_154",
    "hanzi": "\u96F6",
    "pinyin": "l\xEDng",
    "hanViet": "Linh",
    "vietnamese": "S\u1ED1 0, kh\xF4ng",
    "partOfSpeech": "S\u1ED1 t\u1EEB",
    "level": 1,
    "category": "S\u1ED1 \u0111\u1EBFm & L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u96E8 (V\u0169 - m\u01B0a)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u6211\u7684\u623F\u95F4\u53F7\u662F\u4E09\u96F6\u4E94\u3002",
        "pinyin": "W\u01D2 de f\xE1ngji\u0101n h\xE0o sh\xEC s\u0101n l\xEDng w\u01D4.",
        "vi": "S\u1ED1 ph\xF2ng c\u1EE7a t\xF4i l\xE0 305."
      },
      {
        "zh": "\u4ECA\u5929\u6E29\u5EA6\u662F\u96F6\u5EA6\u3002",
        "pinyin": "J\u012Bnti\u0101n w\u0113nd\xF9 sh\xEC l\xEDng d\xF9.",
        "vi": "Nhi\u1EC7t \u0111\u1ED9 h\xF4m nay l\xE0 kh\xF4ng \u0111\u1ED9."
      }
    ],
    "tips": "B\u1ED9 V\u0169 (\u96E8) \u1EDF tr\xEAn gi\u1ECDt n\u01B0\u1EDBc l\u1EA5t ph\u1EA5t r\u01A1i xu\u1ED1ng, bi\u1EC3u th\u1ECB l\u01B0\u1EE3ng r\u1EA5t nh\u1ECF b\u1EB1ng kh\xF4ng."
  },
  {
    "id": "pdf_155",
    "hanzi": "\u7238\u7238",
    "pinyin": "b\xE0ba",
    "hanViet": "Ba Ba",
    "vietnamese": "B\u1ED1, cha, ba",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gia \u0111\xECnh & Th\xE2n nh\xE2n",
    "radical": "\u7236 (Ph\u1EE5 - cha)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u6211\u7238\u7238\u662F\u4E00\u540D\u533B\u751F\u3002",
        "pinyin": "W\u01D2 b\xE0ba sh\xEC y\xEC m\xEDng y\u012Bsh\u0113ng.",
        "vi": "B\u1ED1 t\xF4i l\xE0 m\u1ED9t b\xE1c s\u0129."
      },
      {
        "zh": "\u7238\u7238\u6BCF\u5929\u9A91\u81EA\u884C\u8F66\u53BB\u4E0A\u73ED\u3002",
        "pinyin": "B\xE0ba m\u011Biti\u0101n q\xED z\xECx\xEDngch\u0113 q\xF9 sh\xE0ngb\u0101n.",
        "vi": "B\u1ED1 m\u1ED7i ng\xE0y \u0111\u1EC1u \u0111i xe \u0111\u1EA1p \u0111i l\xE0m."
      }
    ],
    "tips": "B\u1ED9 Ph\u1EE5 (\u7236 - ng\u01B0\u1EDDi cha ch\u1ED1ng g\u1EADy \u0111\u1EE9ng \u0111\u1EA7u gia \u0111\xECnh) k\u1EBFt h\u1EE3p \xE2m Ba (\u5DF4) t\u1EA1o th\xE0nh ti\u1EBFng g\u1ECDi th\xE2n th\u01B0\u01A1ng."
  },
  {
    "id": "pdf_156",
    "hanzi": "\u5988\u5988",
    "pinyin": "m\u0101ma",
    "hanViet": "Ma Ma",
    "vietnamese": "M\u1EB9, m\xE1, u",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gia \u0111\xECnh & Th\xE2n nh\xE2n",
    "radical": "\u5973 (N\u1EEF - ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u5988\u5988\u505A\u7684\u4E2D\u56FD\u83DC\u771F\u597D\u5403\uFF01",
        "pinyin": "M\u0101ma zu\xF2 de Zh\u014Dnggu\xF3 c\xE0i zh\u0113n h\u01CEoch\u012B!",
        "vi": "M\xF3n \u0103n Trung Qu\u1ED1c m\u1EB9 n\u1EA5u ngon th\u1EADt \u0111\u1EA5y!"
      },
      {
        "zh": "\u6211\u7231\u6211\u7684\u5988\u5988\u3002",
        "pinyin": "W\u01D2 \xE0i w\u01D2 de m\u0101ma.",
        "vi": "T\xF4i y\xEAu m\u1EB9 c\u1EE7a t\xF4i."
      }
    ],
    "tips": "B\u1ED9 N\u1EEF (\u5973) k\u1EBFt h\u1EE3p ch\u1EEF M\xE3 (\u9A6C - con ng\u1EF1a l\xE0m vi\u1EC7c nh\u1EABn n\u1EA1i). Ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF t\u1EA7n t\u1EA3o ch\u0103m lo cho gia \u0111\xECnh."
  },
  {
    "id": "pdf_157",
    "hanzi": "\u513F\u5B50",
    "pinyin": "\xE9rzi",
    "hanViet": "Nhi T\u1EED",
    "vietnamese": "Con trai",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gia \u0111\xECnh & Th\xE2n nh\xE2n",
    "radical": "\u513F (Nhi) + \u5B50 (T\u1EED)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u4ED6\u513F\u5B50\u4ECA\u5E74\u516D\u5C81\u4E86\u3002",
        "pinyin": "T\u0101 \xE9rzi j\u012Bnni\xE1n li\xF9 su\xEC le.",
        "vi": "Con trai anh \u1EA5y n\u0103m nay 6 tu\u1ED5i r\u1ED3i."
      },
      {
        "zh": "\u5F20\u8001\u5E08\u6709\u4E00\u4E2A\u5F88\u806A\u660E\u7684\u513F\u5B50\u3002",
        "pinyin": "Zh\u0101ng l\u01CEosh\u012B y\u01D2u y\xED g\xE8 h\u011Bn c\u014Dngming de \xE9rzi.",
        "vi": "Th\u1EA7y Tr\u01B0\u01A1ng c\xF3 m\u1ED9t ng\u01B0\u1EDDi con trai r\u1EA5t th\xF4ng minh."
      }
    ],
    "tips": "\u513F (\u0111\u1EE9a tr\u1EBB ng\xE2y th\u01A1) + \u5B50 (con c\xE1i). D\xF9ng \u0111\u1EC3 ch\u1EC9 ng\u01B0\u1EDDi con trai trong gia \u0111\xECnh."
  },
  {
    "id": "pdf_158",
    "hanzi": "\u5973\u513F",
    "pinyin": "n\u01DA'\xE9r",
    "hanViet": "N\u1EEF Nhi",
    "vietnamese": "Con g\xE1i",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gia \u0111\xECnh & Th\xE2n nh\xE2n",
    "radical": "\u5973 (N\u1EEF) + \u513F (Nhi)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u674E\u533B\u751F\u7684\u5973\u513F\u5F88\u6F02\u4EAE\u3002",
        "pinyin": "L\u01D0 y\u012Bsh\u0113ng de n\u01DA'\xE9r h\u011Bn pi\xE0oliang.",
        "vi": "Con g\xE1i c\u1EE7a b\xE1c s\u0129 L\xFD r\u1EA5t xinh \u0111\u1EB9p."
      },
      {
        "zh": "\u6211\u6709\u4E24\u4E2A\u5973\u513F\u548C\u4E00\u4E2A\u513F\u5B50\u3002",
        "pinyin": "W\u01D2 y\u01D2u li\u01CEng g\xE8 n\u01DA'\xE9r h\xE9 y\xED g\xE8 \xE9rzi.",
        "vi": "T\xF4i c\xF3 hai ng\u01B0\u1EDDi con g\xE1i v\xE0 m\u1ED9t ng\u01B0\u1EDDi con trai."
      }
    ],
    "tips": "Ch\u1EEF \u5973 (ng\u01B0\u1EDDi n\u1EEF) \u0111\u1EE9ng tr\u01B0\u1EDBc ch\u1EEF \u513F (con c\xE1i). 'N\u1EEF nhi' l\xE0 ng\u01B0\u1EDDi con g\xE1i ru\u1ED9t th\u1ECBt."
  },
  {
    "id": "pdf_159",
    "hanzi": "\u5B66\u751F",
    "pinyin": "xu\xE9sheng",
    "hanViet": "H\u1ECDc Sinh",
    "vietnamese": "H\u1ECDc sinh, ng\u01B0\u1EDDi h\u1ECDc",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Tr\u01B0\u1EDDng h\u1ECDc & Ngh\u1EC1 nghi\u1EC7p",
    "radical": "\u5B50 (T\u1EED) + \u751F (Sinh)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u73ED\u6709\u4E8C\u5341\u4E2A\u5B66\u751F\u3002",
        "pinyin": "W\u01D2men b\u0101n y\u01D2u \xE8rsh\xED g\xE8 xu\xE9sheng.",
        "vi": "L\u1EDBp ch\xFAng t\xF4i c\xF3 20 h\u1ECDc sinh."
      },
      {
        "zh": "\u4ED6\u662F\u5317\u4EAC\u5927\u5B66\u7684\u5B66\u751F\u3002",
        "pinyin": "T\u0101 sh\xEC B\u011Bij\u012Bng D\xE0xu\xE9 de xu\xE9sheng.",
        "vi": "C\u1EADu \u1EA5y l\xE0 sinh vi\xEAn c\u1EE7a \u0110\u1EA1i h\u1ECDc B\u1EAFc Kinh."
      }
    ],
    "tips": "H\u1ECDc (\u5B66 - ti\u1EBFp thu tri th\u1EE9c) + Sinh (\u751F - sinh s\xF4i, n\u1EA3y n\u1EDF, ng\u01B0\u1EDDi tr\u1EBB tu\u1ED5i c\u1EA7u tri th\u1EE9c)."
  },
  {
    "id": "pdf_160",
    "hanzi": "\u670B\u53CB",
    "pinyin": "p\xE9ngyou",
    "hanViet": "B\u1EB1ng H\u1EEFu",
    "vietnamese": "B\u1EA1n b\xE8, b\u1EA1n h\u1EEFu",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Giao ti\u1EBFp x\xE3 h\u1ED9i",
    "radical": "\u6708 (Nguy\u1EC7t) + \u53C8 (H\u1EF1u)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u4ED6\u662F\u6211\u7684\u597D\u670B\u53CB\u3002",
        "pinyin": "T\u0101 sh\xEC w\u01D2 de h\u01CEo p\xE9ngyou.",
        "vi": "Anh \u1EA5y l\xE0 ng\u01B0\u1EDDi b\u1EA1n t\u1ED1t c\u1EE7a t\xF4i."
      },
      {
        "zh": "\u5468\u672B\u6211\u548C\u670B\u53CB\u4E00\u8D77\u53BB\u65C5\u6E38\u3002",
        "pinyin": "Zh\u014Dum\xF2 w\u01D2 h\xE9 p\xE9ngyou y\xECq\u01D0 q\xF9 l\u01DAy\xF3u.",
        "vi": "Cu\u1ED1i tu\u1EA7n t\xF4i c\xF9ng b\u1EA1n b\xE8 \u0111i du l\u1ECBch."
      }
    ],
    "tips": "B\u1EB1ng (\u670B - hai chu\u1ED7i ng\u1ECDc song h\xE0nh) + H\u1EEFu (\u53CB - hai b\xE0n tay \u0111an si\u1EBFt c\xF9ng ch\xED h\u01B0\u1EDBng). T\xECnh b\u1EA1n keo s\u01A1n g\u1EAFn b\xF3."
  },
  {
    "id": "pdf_161",
    "hanzi": "\u533B\u751F",
    "pinyin": "y\u012Bsh\u0113ng",
    "hanViet": "Y Sinh",
    "vietnamese": "B\xE1c s\u0129, th\u1EA7y thu\u1ED1c",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Ngh\u1EC1 nghi\u1EC7p & S\u1EE9c kh\u1ECFe",
    "radical": "\u531A (Ph\u01B0\u01A1ng) + \u751F (Sinh)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u738B\u533B\u751F\u5728\u533B\u9662\u5DE5\u4F5C\u3002",
        "pinyin": "W\xE1ng y\u012Bsh\u0113ng z\xE0i y\u012Byu\xE0n g\u014Dngzu\xF2.",
        "vi": "B\xE1c s\u0129 V\u01B0\u01A1ng l\xE0m vi\u1EC7c t\u1EA1i b\u1EC7nh vi\u1EC7n."
      },
      {
        "zh": "\u8EAB\u4F53\u4E0D\u8212\u670D\u8981\u53BB\u770B\u533B\u751F\u3002",
        "pinyin": "Sh\u0113nt\u01D0 b\xF9 sh\u016Bfu y\xE0o q\xF9 k\xE0n y\u012Bsh\u0113ng.",
        "vi": "Trong ng\u01B0\u1EDDi kh\xF3 ch\u1ECBu th\xEC ph\u1EA3i \u0111i kh\xE1m b\xE1c s\u0129."
      }
    ],
    "tips": "Y (\u533B - y thu\u1EADt, thu\u1ED1c men ch\u1EEFa b\u1EC7nh) + Sinh (\u751F - th\u1EA7y, ng\u01B0\u1EDDi l\xE0m ngh\u1EC1 y t\u1EBF c\u1EE9u ng\u01B0\u1EDDi)."
  },
  {
    "id": "pdf_162",
    "hanzi": "\u5148\u751F",
    "pinyin": "xi\u0101nsheng",
    "hanViet": "Ti\xEAn Sinh",
    "vietnamese": "\xD4ng, ng\xE0i, anh, ch\u1ED3ng",
    "partOfSpeech": "Danh t\u1EEB x\u01B0ng h\xF4",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u513F (Nhi) + \u751F (Sinh)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u674E\u5148\u751F\uFF0C\u60A8\u597D\uFF01",
        "pinyin": "L\u01D0 xi\u0101nsheng, n\xEDn h\u01CEo!",
        "vi": "Ch\xE0o \xF4ng L\xFD \u1EA1!"
      },
      {
        "zh": "\u8FD9\u4F4D\u5148\u751F\u60F3\u4E70\u4E00\u672C\u4E66\u3002",
        "pinyin": "Zh\xE8 w\xE8i xi\u0101nsheng xi\u01CEng m\u01CEi y\xEC b\u011Bn sh\u016B.",
        "vi": "V\u1ECB qu\xFD \xF4ng n\xE0y mu\u1ED1n mua m\u1ED9t quy\u1EC3n s\xE1ch."
      }
    ],
    "tips": "Ti\xEAn sinh (ng\u01B0\u1EDDi sinh ra tr\u01B0\u1EDBc, b\u1EADc \u0111\xE0n anh \u0111\xE1ng k\xEDnh tr\u1ECDng), d\xF9ng \u0111\u1EC3 g\u1ECDi l\u1ECBch s\u1EF1 ph\xE1i nam ho\u1EB7c g\u1ECDi ch\u1ED3ng."
  },
  {
    "id": "pdf_163",
    "hanzi": "\u5C0F\u59D0",
    "pinyin": "xi\u01CEoji\u011B",
    "hanViet": "Ti\u1EC3u Th\u01B0",
    "vietnamese": "C\xF4, c\xF4 g\xE1i, ti\u1EC3u th\u01B0 (c\xE1ch x\u01B0ng h\xF4 l\u1ECBch thi\u1EC7p v\u1EDBi ph\u1EE5 n\u1EEF tr\u1EBB)",
    "partOfSpeech": "Danh t\u1EEB x\u01B0ng h\xF4",
    "level": 1,
    "category": "\u0110\u1EA1i t\u1EEB & X\u01B0ng h\xF4",
    "radical": "\u5C0F (Ti\u1EC3u) + \u5973 (N\u1EEF)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u738B\u5C0F\u59D0\uFF0C\u8BF7\u559D\u8336\u3002",
        "pinyin": "W\xE1ng xi\u01CEoji\u011B, q\u01D0ng h\u0113 ch\xE1.",
        "vi": "M\u1EDDi c\xF4 V\u01B0\u01A1ng u\u1ED1ng tr\xE0."
      },
      {
        "zh": "\u670D\u52A1\u5458\u5C0F\u59D0\u975E\u5E38\u70ED\u60C5\u3002",
        "pinyin": "F\xFAw\xF9yu\xE1n xi\u01CEoji\u011B f\u0113ich\xE1ng r\xE8q\xEDng.",
        "vi": "C\xF4 ph\u1EE5c v\u1EE5 r\u1EA5t nhi\u1EC7t t\xECnh chu \u0111\xE1o."
      }
    ],
    "tips": "Ti\u1EC3u (\u5C0F - tr\u1EBB trung) + Th\u01B0 (\u59D0 - ch\u1ECB em g\xE1i). X\u01B0ng h\xF4 l\u1ECBch thi\u1EC7p t\xF4n k\xEDnh v\u1EDBi n\u1EEF gi\u1EDBi tr\u1EBB tu\u1ED5i."
  },
  {
    "id": "pdf_164",
    "hanzi": "\u4ECA\u5929",
    "pinyin": "j\u012Bnti\u0101n",
    "hanViet": "Kim Thi\xEAn",
    "vietnamese": "H\xF4m nay, ng\xE0y h\xF4m nay",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u4EBA (Nh\xE2n) + \u5927 (\u0110\u1EA1i)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u661F\u671F\u4E94\uFF0C\u660E\u5929\u4E0D\u4E0A\u73ED\u3002",
        "pinyin": "J\u012Bnti\u0101n x\u012Bngq\u012Bw\u01D4, m\xEDngti\u0101n b\xFA sh\xE0ngb\u0101n.",
        "vi": "H\xF4m nay l\xE0 th\u1EE9 s\xE1u, ng\xE0y mai kh\xF4ng ph\u1EA3i \u0111i l\xE0m."
      },
      {
        "zh": "\u4ECA\u5929\u5317\u4EAC\u5929\u6C14\u5F88\u597D\u3002",
        "pinyin": "J\u012Bnti\u0101n B\u011Bij\u012Bng ti\u0101nq\xEC h\u011Bn h\u01CEo.",
        "vi": "H\xF4m nay th\u1EDDi ti\u1EBFt \u1EDF B\u1EAFc Kinh r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "Kim (\u4ECA - hi\u1EC7n t\u1EA1i l\xFAc n\xE0y) + Thi\xEAn (\u5929 - ng\xE0y, b\u1EA7u tr\u1EDDi). Ng\xE0y h\xF4m nay \u0111ang di\u1EC5n ra."
  },
  {
    "id": "pdf_165",
    "hanzi": "\u6628\u5929",
    "pinyin": "zu\xF3ti\u0101n",
    "hanViet": "T\u1EA1c Thi\xEAn",
    "vietnamese": "H\xF4m qua, ng\xE0y h\xF4m qua",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u65E5 (Nh\u1EADt - m\u1EB7t tr\u1EDDi) + \u5927 (\u0110\u1EA1i)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u6628\u5929\u4E0B\u5348\u4E0B\u5927\u96E8\u4E86\u3002",
        "pinyin": "Zu\xF3ti\u0101n xi\xE0w\u01D4 xi\xE0 d\xE0y\u01D4 le.",
        "vi": "Chi\u1EC1u h\xF4m qua tr\u1EDDi \u0111\xE3 \u0111\u1ED5 m\u01B0a to."
      },
      {
        "zh": "\u6628\u5929\u4F60\u5728\u5BB6\u505A\u4EC0\u4E48\uFF1F",
        "pinyin": "Zu\xF3ti\u0101n n\u01D0 z\xE0i ji\u0101 zu\xF2 sh\xE9nme?",
        "vi": "H\xF4m qua b\u1EA1n \u1EDF nh\xE0 l\xE0m nh\u1EEFng g\xEC?"
      }
    ],
    "tips": "T\u1EA1c (\u6628 - b\u1ED9 Nh\u1EADt \u65E5 ch\u1EC9 ng\xE0y m\u1EB7t tr\u1EDDi \u0111\xE3 l\u1EB7n qua) + Thi\xEAn (\u5929 - ng\xE0y). Ng\xE0y h\xF4m qua \u0111\xE3 tr\xF4i qua."
  },
  {
    "id": "pdf_166",
    "hanzi": "\u4E0A\u5348",
    "pinyin": "sh\xE0ngw\u01D4",
    "hanViet": "Th\u01B0\u1EE3ng Ng\u1ECD",
    "vietnamese": "Bu\u1ED5i s\xE1ng (tr\u01B0\u1EDBc 12h tr\u01B0a)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u4E00 (Nh\u1EA5t) + \u5341 (Th\u1EADp)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u4E0A\u5348\u4E5D\u70B9\u53BB\u5B66\u6821\u4E0A\u8BFE\u3002",
        "pinyin": "W\u01D2 sh\xE0ngw\u01D4 ji\u01D4 di\u01CEn q\xF9 xu\xE9xi\xE0o sh\xE0ngk\xE8.",
        "vi": "9 gi\u1EDD s\xE1ng t\xF4i \u0111\u1EBFn tr\u01B0\u1EDDng \u0111i h\u1ECDc."
      },
      {
        "zh": "\u4ECA\u5929\u4E0A\u5348\u4ED6\u4E0D\u5728\u529E\u516C\u5BA4\u3002",
        "pinyin": "J\u012Bnti\u0101n sh\xE0ngw\u01D4 t\u0101 b\xFA z\xE0i b\xE0ng\u014Dngsh\xEC.",
        "vi": "S\xE1ng nay anh \u1EA5y kh\xF4ng c\xF3 \u1EDF v\u0103n ph\xF2ng."
      }
    ],
    "tips": "Th\u01B0\u1EE3ng (\u4E0A - tr\u01B0\u1EDBc, tr\xEAn) + Ng\u1ECD (\u5348 - gi\u1EDD Ng\u1ECD 12h tr\u01B0a). Kho\u1EA3ng th\u1EDDi gian t\u1EEB s\xE1ng s\u1EDBm t\u1EDBi tr\u01B0\u1EDBc gi\u1EDD tr\u01B0a."
  },
  {
    "id": "pdf_167",
    "hanzi": "\u4E2D\u5348",
    "pinyin": "zh\u014Dngw\u01D4",
    "hanViet": "Trung Ng\u1ECD",
    "vietnamese": "Bu\u1ED5i tr\u01B0a (kho\u1EA3ng 11h30 - 13h)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u4E28 (C\u1ED5n) + \u5341 (Th\u1EADp)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u4E2D\u5348\u6211\u4EEC\u4E00\u8D77\u53BB\u996D\u5E97\u5403\u996D\u5427\u3002",
        "pinyin": "Zh\u014Dngw\u01D4 w\u01D2men y\xECq\u01D0 q\xF9 f\xE0ndi\xE0n ch\u012Bf\xE0n ba.",
        "vi": "Bu\u1ED5i tr\u01B0a t\u1EE5i m\xECnh c\xF9ng nhau ra nh\xE0 h\xE0ng \u0103n c\u01A1m nh\xE9."
      },
      {
        "zh": "\u4ED6\u4E2D\u5348\u4E60\u60EF\u7761\u4E00\u4F1A\u513F\u89C9\u3002",
        "pinyin": "T\u0101 zh\u014Dngw\u01D4 x\xEDgu\xE0n shu\xEC y\xEDhu\xECr ji\xE0o.",
        "vi": "Bu\u1ED5i tr\u01B0a anh \u1EA5y c\xF3 th\xF3i quen ch\u1EE3p m\u1EAFt ng\u1EE7 m\u1ED9t l\xE1t."
      }
    ],
    "tips": "Trung (\u4E2D - ch\xEDnh gi\u1EEFa) + Ng\u1ECD (\u5348 - gi\u1EEFa ng\xE0y). Ch\xEDnh ng\u1ECD l\xE0 l\xFAc m\u1EB7t tr\u1EDDi \u0111\u1EE9ng b\xF3ng gi\u1EEFa \u0111\u1EC9nh \u0111\u1EA7u."
  },
  {
    "id": "pdf_168",
    "hanzi": "\u4E0B\u5348",
    "pinyin": "xi\xE0w\u01D4",
    "hanViet": "H\u1EA1 Ng\u1ECD",
    "vietnamese": "Bu\u1ED5i chi\u1EC1u (sau 12h tr\u01B0a t\u1EDBi ho\xE0ng h\xF4n)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u4E00 (Nh\u1EA5t) + \u5341 (Th\u1EADp)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4E0B\u5348\u4E09\u70B9\u6211\u4EEC\u6709\u4E00\u4E2A\u4F1A\u8BAE\u3002",
        "pinyin": "Xi\xE0w\u01D4 s\u0101n di\u01CEn w\u01D2men y\u01D2u y\xED g\xE8 hu\xECy\xEC.",
        "vi": "3 gi\u1EDD chi\u1EC1u ch\xFAng t\xF4i c\xF3 m\u1ED9t cu\u1ED9c h\u1ECDp."
      },
      {
        "zh": "\u4E0B\u5348\u4F60\u60F3\u53BB\u54EA\u513F\u559D\u5496\u5561\uFF1F",
        "pinyin": "Xi\xE0w\u01D4 n\u01D0 xi\u01CEng q\xF9 n\u01CEr h\u0113 k\u0101f\u0113i?",
        "vi": "Bu\u1ED5i chi\u1EC1u b\u1EA1n mu\u1ED1n \u0111i \u0111\xE2u u\u1ED1ng c\xE0 ph\xEA?"
      }
    ],
    "tips": "H\u1EA1 (\u4E0B - sau, d\u01B0\u1EDBi) + Ng\u1ECD (\u5348 - gi\u1EDD Ng\u1ECD). Kho\u1EA3ng th\u1EDDi gian m\u1EB7t tr\u1EDDi nghi\xEAng b\xF3ng sau bu\u1ED5i tr\u01B0a."
  },
  {
    "id": "pdf_169",
    "hanzi": "\u5E74",
    "pinyin": "ni\xE1n",
    "hanViet": "Ni\xEAn",
    "vietnamese": "N\u0103m, tu\u1ED5i",
    "partOfSpeech": "Danh t\u1EEB / L\u01B0\u1EE3ng t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u5E72 (Can)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4ED6\u5728\u4E2D\u56FD\u4F4F\u4E86\u4E09\u5E74\u3002",
        "pinyin": "T\u0101 z\xE0i Zh\u014Dnggu\xF3 zh\xF9 le s\u0101n ni\xE1n.",
        "vi": "Anh \u1EA5y \u0111\xE3 s\u1ED1ng \u1EDF Trung Qu\u1ED1c ba n\u0103m."
      },
      {
        "zh": "\u65B0\u5E74\u5FEB\u4E50\uFF0C\u4E07\u4E8B\u5982\u610F\uFF01",
        "pinyin": "X\u012Bnni\xE1n ku\xE0il\xE8, w\xE0nsh\xEC r\xFAy\xEC!",
        "vi": "Ch\xFAc m\u1EEBng n\u0103m m\u1EDBi, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!"
      }
    ],
    "tips": "X\u01B0a kia 'Ni\xEAn' ch\u1EC9 v\u1EE5 m\xF9a l\xFAa ch\xEDn tr\xF2n m\u1ED9t chu k\u1EF3 th\u1EDDi ti\u1EBFt 365 ng\xE0y."
  },
  {
    "id": "pdf_170",
    "hanzi": "\u6708",
    "pinyin": "yu\xE8",
    "hanViet": "Nguy\u1EC7t",
    "vietnamese": "Th\xE1ng, m\u1EB7t tr\u0103ng",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u6708 (Nguy\u1EC7t)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u4E00\u5E74\u6709\u5341\u4E8C\u4E2A\u6708\u3002",
        "pinyin": "Y\xEC ni\xE1n y\u01D2u sh\xED'\xE8r g\xE8 yu\xE8.",
        "vi": "M\u1ED9t n\u0103m c\xF3 m\u01B0\u1EDDi hai th\xE1ng."
      },
      {
        "zh": "\u6211\u4E0B\u4E2A\u6708\u53BB\u5317\u4EAC\u51FA\u5DEE\u3002",
        "pinyin": "W\u01D2 xi\xE0 g\xE8 yu\xE8 q\xF9 B\u011Bij\u012Bng ch\u016Bch\u0101i.",
        "vi": "Th\xE1ng sau t\xF4i \u0111i B\u1EAFc Kinh c\xF4ng t\xE1c."
      }
    ],
    "tips": "H\xECnh v\xE0nh tr\u0103ng khuy\u1EBFt bi\u1EBFn \u0111\u1ED5i theo tu\u1EA7n ho\xE0n 30 ng\xE0y th\xE0nh m\u1ED9t th\xE1ng trong \xE2m l\u1ECBch."
  },
  {
    "id": "pdf_171",
    "hanzi": "\u65E5",
    "pinyin": "r\xEC",
    "hanViet": "Nh\u1EADt",
    "vietnamese": "Ng\xE0y, m\u1EB7t tr\u1EDDi (th\u01B0\u1EDDng d\xF9ng trong v\u0103n vi\u1EBFt/ng\xE0y th\xE1ng)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u65E5 (Nh\u1EADt)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u662F\u5341\u6708\u4E00\u65E5\u3002",
        "pinyin": "J\u012Bnti\u0101n sh\xEC sh\xED yu\xE8 y\u012B r\xEC.",
        "vi": "H\xF4m nay l\xE0 ng\xE0y 1 th\xE1ng 10."
      },
      {
        "zh": "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF01",
        "pinyin": "Zh\xF9 n\u01D0 sh\u0113ngr\xEC ku\xE0il\xE8!",
        "vi": "Ch\xFAc b\u1EA1n sinh nh\u1EADt vui v\u1EBB!"
      }
    ],
    "tips": "H\xECnh m\u1EB7t tr\u1EDDi tr\xF2n c\xF3 ch\u1EA5m \u0111en \u1EDF t\xE2m. Trong ng\xE0y th\xE1ng v\u0103n b\u1EA3n lu\xF4n d\xF9ng \u65E5 (thay cho \u53F7 trong kh\u1EA9u ng\u1EEF)."
  },
  {
    "id": "pdf_172",
    "hanzi": "\u53F7",
    "pinyin": "h\xE0o",
    "hanViet": "H\xE0o",
    "vietnamese": "Ng\xE0y (trong kh\u1EA9u ng\u1EEF), s\u1ED1 (s\u1ED1 ph\xF2ng, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian / S\u1ED1 hi\u1EC7u",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u51E0\u6708\u51E0\u53F7\uFF1F",
        "pinyin": "J\u012Bnti\u0101n j\u01D0 yu\xE8 j\u01D0 h\xE0o?",
        "vi": "H\xF4m nay l\xE0 ng\xE0y m\u1EA5y th\xE1ng m\u1EA5y?"
      },
      {
        "zh": "\u4ECA\u5929\u662F\u4E94\u53F7\uFF0C\u660E\u5929\u662F\u516D\u53F7\u3002",
        "pinyin": "J\u012Bnti\u0101n sh\xEC w\u01D4 h\xE0o, m\xEDngti\u0101n sh\xEC li\xF9 h\xE0o.",
        "vi": "H\xF4m nay l\xE0 m\xF9ng 5, ng\xE0y mai l\xE0 m\xF9ng 6."
      }
    ],
    "tips": "Kh\u1EA9u ng\u1EEF ng\u01B0\u1EDDi Trung Qu\u1ED1c lu\xF4n d\xF9ng '\u53F7' khi n\xF3i ng\xE0y trong th\xE1ng (vd: 5\u53F7 - m\xF9ng 5)."
  },
  {
    "id": "pdf_173",
    "hanzi": "\u661F\u671F",
    "pinyin": "x\u012Bngq\u012B",
    "hanViet": "Tinh K\u1EF3",
    "vietnamese": "Tu\u1EA7n l\u1EC5, th\u1EE9 (trong tu\u1EA7n)",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u65E5 (Nh\u1EADt) + \u6708 (Nguy\u1EC7t)",
    "strokeCount": 21,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u661F\u671F\u51E0\uFF1F",
        "pinyin": "J\u012Bnti\u0101n x\u012Bngq\u012B j\u01D0?",
        "vi": "H\xF4m nay l\xE0 th\u1EE9 m\u1EA5y?"
      },
      {
        "zh": "\u4E0B\u4E2A\u661F\u671F\u6211\u4EEC\u8981\u8003\u8BD5\u3002",
        "pinyin": "Xi\xE0 g\xE8 x\u012Bngq\u012B w\u01D2men y\xE0o k\u01CEosh\xEC.",
        "vi": "Tu\u1EA7n sau ch\xFAng t\xF4i ph\u1EA3i thi."
      }
    ],
    "tips": "Tinh k\u1EF3 (chu k\u1EF3 theo d\xF5i c\xE1c v\xEC tinh t\xFA tr\xEAn b\u1EA7u tr\u1EDDi). Th\u1EE9 2 \u0111\u1EBFn th\u1EE9 7: \u661F\u671F\u4E00 \u0111\u1EBFn \u661F\u671F\u516D; Ch\u1EE7 nh\u1EADt: \u661F\u671F\u5929 / \u661F\u671F\u65E5."
  },
  {
    "id": "pdf_174",
    "hanzi": "\u70B9",
    "pinyin": "di\u01CEn",
    "hanViet": "\u0110i\u1EC3m",
    "vietnamese": "Gi\u1EDD (th\u1EDDi kh\u1EAFc), gi\u1ECDt, \u0111i\u1EC3m, m\u1ED9t ch\xFAt",
    "partOfSpeech": "Danh t\u1EEB / L\u01B0\u1EE3ng t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u706C (H\u1ECFa - b\u1ED1n ch\u1EA5m h\u1ECFa)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u73B0\u5728\u662F\u65E9\u4E0A\u516B\u70B9\u4E09\u5341\u5206\u3002",
        "pinyin": "Xi\xE0nz\xE0i sh\xEC z\u01CEoshang b\u0101 di\u01CEn s\u0101nsh\xED f\u0113n.",
        "vi": "B\xE2y gi\u1EDD l\xE0 8 gi\u1EDD 30 ph\xFAt s\xE1ng."
      },
      {
        "zh": "\u8BF7\u7ED9\u6211\u4E00\u70B9\u513F\u6C34\u3002",
        "pinyin": "Q\u01D0ng g\u011Bi w\u01D2 y\xECdi\u01CEnr shu\u01D0.",
        "vi": "Xin cho t\xF4i m\u1ED9t ch\xFAt n\u01B0\u1EDBc."
      }
    ],
    "tips": "Ch\u1EEF Chi\u1EBFm (\u5360) k\u1EBFt h\u1EE3p 4 ch\u1EA5m H\u1ECFa (\u706C). Ch\u1EC9 m\u1ED9t \u0111i\u1EC3m th\u1EDDi gian tr\xEAn m\u1EB7t \u0111\u1ED3ng h\u1ED3: \u516B\u70B9 (8 gi\u1EDD)."
  },
  {
    "id": "pdf_175",
    "hanzi": "\u73B0\u5728",
    "pinyin": "xi\xE0nz\xE0i",
    "hanViet": "Hi\u1EC7n T\u1EA1i",
    "vietnamese": "B\xE2y gi\u1EDD, hi\u1EC7n t\u1EA1i, l\xFAc n\xE0y",
    "partOfSpeech": "Danh t\u1EEB th\u1EDDi gian",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u738B (V\u01B0\u01A1ng/Ng\u1ECDc) + \u571F (Th\u1ED5)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u4F60\u73B0\u5728\u5728\u505A\u4EC0\u4E48\uFF1F",
        "pinyin": "N\u01D0 xi\xE0nz\xE0i z\xE0i zu\xF2 sh\xE9nme?",
        "vi": "B\xE2y gi\u1EDD b\u1EA1n \u0111ang l\xE0m g\xEC \u0111\u1EA5y?"
      },
      {
        "zh": "\u73B0\u5728\u662F\u5317\u4EAC\u65F6\u95F4\u516B\u70B9\u6574\u3002",
        "pinyin": "Xi\xE0nz\xE0i sh\xEC B\u011Bij\u012Bng sh\xEDji\u0101n b\u0101 di\u01CEn zh\u011Bng.",
        "vi": "B\xE2y gi\u1EDD l\xE0 \u0111\xFAng 8 gi\u1EDD gi\u1EDD B\u1EAFc Kinh."
      }
    ],
    "tips": "Hi\u1EC7n (\u73B0 - ng\u1ECDc hi\u1EC7n ra tr\u01B0\u1EDBc m\u1EAFt) + T\u1EA1i (\u5728 - c\xF3 m\u1EB7t \u1EDF \u0111\xE2y). Th\u1EDDi \u0111i\u1EC3m ngay l\xFAc n\xE0y."
  },
  {
    "id": "pdf_176",
    "hanzi": "\u65F6\u5019",
    "pinyin": "sh\xEDhou",
    "hanViet": "Th\u1EDDi H\u1EADu",
    "vietnamese": "L\xFAc, khi, th\u1EDDi \u0111i\u1EC3m",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Th\u1EDDi gian",
    "radical": "\u65E5 (Nh\u1EADt) + \u4EBB (Nh\xE2n)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u4F60\u4EC0\u4E48\u65F6\u5019\u53BB\u4E2D\u56FD\uFF1F",
        "pinyin": "N\u01D0 sh\xE9nme sh\xEDhou q\xF9 Zh\u014Dnggu\xF3?",
        "vi": "Khi n\xE0o b\u1EA1n \u0111i Trung Qu\u1ED1c?"
      },
      {
        "zh": "\u6211\u5403\u996D\u7684\u65F6\u5019\u4E0D\u770B\u7535\u89C6\u3002",
        "pinyin": "W\u01D2 ch\u012Bf\xE0n de sh\xEDhou b\xFA k\xE0n di\xE0nsh\xEC.",
        "vi": "L\xFAc \u0103n c\u01A1m t\xF4i kh\xF4ng xem ti vi."
      }
    ],
    "tips": "C\u1EA5u tr\xFAc v\xE0ng: ...\u7684\u65F6\u5019 (L\xFAc/Khi \u0111ang l\xE0m g\xEC \u0111\xF3) ho\u1EB7c \u4EC0\u4E48\u65F6\u5019 (Khi n\xE0o, bao gi\u1EDD)."
  },
  {
    "id": "pdf_177",
    "hanzi": "\u5BB6",
    "pinyin": "ji\u0101",
    "hanViet": "Gia",
    "vietnamese": "Nh\xE0, gia \u0111\xECnh",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gia \u0111\xECnh & N\u01A1i ch\u1ED1n",
    "radical": "\u5B80 (Mi\xEAn - m\xE1i nh\xE0)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u6B22\u8FCE\u6765\u6211\u5BB6\u73A9\u513F\uFF01",
        "pinyin": "Hu\u0101ny\xEDng l\xE1i w\u01D2 ji\u0101 w\xE1nr!",
        "vi": "Hoan ngh\xEAnh b\u1EA1n \u0111\u1EBFn nh\xE0 t\xF4i ch\u01A1i!"
      },
      {
        "zh": "\u4ED6\u5BB6\u5728\u5317\u4EAC\u3002",
        "pinyin": "T\u0101 ji\u0101 z\xE0i B\u011Bij\u012Bng.",
        "vi": "Gia \u0111\xECnh anh \u1EA5y \u1EDF B\u1EAFc Kinh."
      }
    ],
    "tips": "M\xE1i nh\xE0 (\u5B80) che ch\u1EDF cho con heo/l\u1EE3n (\u8C55 - t\xE0i s\u1EA3n \u1EA5m no c\u1EE7a n\xF4ng h\u1ED9 x\u01B0a). M\xE1i \u1EA5m gia \u0111\xECnh."
  },
  {
    "id": "pdf_178",
    "hanzi": "\u5B66\u6821",
    "pinyin": "xu\xE9xi\xE0o",
    "hanViet": "H\u1ECDc Hi\u1EC7u",
    "vietnamese": "Tr\u01B0\u1EDDng h\u1ECDc",
    "partOfSpeech": "Danh t\u1EEB n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "N\u01A1i ch\u1ED1n & Gi\xE1o d\u1EE5c",
    "radical": "\u5B50 (T\u1EED) + \u6728 (M\u1ED9c)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u7684\u5B66\u6821\u975E\u5E38\u5927\uFF0C\u4E5F\u5F88\u6F02\u4EAE\u3002",
        "pinyin": "W\u01D2men de xu\xE9xi\xE0o f\u0113ich\xE1ng d\xE0, y\u011B h\u011Bn pi\xE0oliang.",
        "vi": "Tr\u01B0\u1EDDng h\u1ECDc c\u1EE7a ch\xFAng t\xF4i r\u1EA5t l\u1EDBn v\xE0 c\u0169ng r\u1EA5t \u0111\u1EB9p."
      },
      {
        "zh": "\u5B66\u6821\u79BB\u6211\u5BB6\u4E0D\u592A\u8FDC\u3002",
        "pinyin": "Xu\xE9xi\xE0o l\xED w\u01D2 ji\u0101 b\xFA t\xE0i yu\u01CEn.",
        "vi": "Tr\u01B0\u1EDDng h\u1ECDc c\xE1ch nh\xE0 t\xF4i kh\xF4ng xa l\u1EAFm."
      }
    ],
    "tips": "H\u1ECDc (\u5B66 - n\u01A1i r\xE8n \u0111\u1EE9c luy\u1EC7n t\xE0i) + Hi\u1EC7u (\u6821 - tr\u01B0\u1EDDng \u1ED1c b\u1EB1ng g\u1ED7 v\u1EEFng ch\xE3i)."
  },
  {
    "id": "pdf_179",
    "hanzi": "\u533B\u9662",
    "pinyin": "y\u012Byu\xE0n",
    "hanViet": "Y Vi\u1EC7n",
    "vietnamese": "B\u1EC7nh vi\u1EC7n",
    "partOfSpeech": "Danh t\u1EEB n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "Y t\u1EBF & N\u01A1i ch\u1ED1n",
    "radical": "\u531A (Ph\u01B0\u01A1ng) + \u961D (Ph\u1EE5 - g\xF2 \u0111\u1EA5t)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u4ED6\u5728\u533B\u9662\u4F4F\u4E86\u4E09\u5929\u9662\u3002",
        "pinyin": "T\u0101 z\xE0i y\u012Byu\xE0n zh\xF9 le s\u0101n ti\u0101n yu\xE0n.",
        "vi": "Anh \u1EA5y \u0111\xE3 n\u1EB1m vi\u1EC7n 3 ng\xE0y t\u1EA1i b\u1EC7nh vi\u1EC7n."
      },
      {
        "zh": "\u706B\u8F66\u7AD9\u65C1\u8FB9\u6709\u4E00\u5BB6\u5927\u533B\u9662\u3002",
        "pinyin": "Hu\u01D2ch\u0113zh\xE0n p\xE1ngbi\u0101n y\u01D2u y\xEC ji\u0101 d\xE0 y\u012Byu\xE0n.",
        "vi": "B\xEAn c\u1EA1nh ga t\xE0u h\u1ECFa c\xF3 m\u1ED9t b\u1EC7nh vi\u1EC7n l\u1EDBn."
      }
    ],
    "tips": "Y (\u533B - y h\u1ECDc, ch\u1EEFa tr\u1ECB) + Vi\u1EC7n (\u9662 - khu\xF4n vi\xEAn, t\xF2a nh\xE0 ch\u1EE9c n\u0103ng l\u1EDBn)."
  },
  {
    "id": "pdf_180",
    "hanzi": "\u706B\u8F66\u7AD9",
    "pinyin": "hu\u01D2ch\u0113zh\xE0n",
    "hanViet": "H\u1ECFa Xa Tr\u1EA1m",
    "vietnamese": "Ga t\xE0u h\u1ECFa, ga xe l\u1EEDa",
    "partOfSpeech": "Danh t\u1EEB n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "Giao th\xF4ng & N\u01A1i ch\u1ED1n",
    "radical": "\u706B (H\u1ECFa) + \u8F66 (Xa) + \u7ACB (L\u1EADp)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u6211\u4EEC\u5750\u51FA\u79DF\u8F66\u53BB\u706B\u8F66\u7AD9\u3002",
        "pinyin": "W\u01D2men zu\xF2 ch\u016Bz\u016Bch\u0113 q\xF9 hu\u01D2ch\u0113zh\xE0n.",
        "vi": "Ch\xFAng t\xF4i \u0111i taxi \u0111\u1EBFn ga t\xE0u h\u1ECFa."
      },
      {
        "zh": "\u4ED6\u5728\u706B\u8F66\u7AD9\u95E8\u53E3\u7B49\u670B\u53CB\u3002",
        "pinyin": "T\u0101 z\xE0i hu\u01D2ch\u0113zh\xE0n m\xE9nk\u01D2u d\u011Bng p\xE9ngyou.",
        "vi": "Anh \u1EA5y \u0111\u1EE9ng tr\u01B0\u1EDBc c\u1EEDa ga t\xE0u h\u1ECFa \u0111\u1EE3i b\u1EA1n."
      }
    ],
    "tips": "H\u1ECFa xa (\u706B\u8F66 - t\xE0u h\u1ECFa ch\u1EA1y m\xE1y h\u01A1i n\u01B0\u1EDBc) + Tr\u1EA1m (\u7AD9 - n\u01A1i d\u1EEBng ch\xE2n \u0111\u1EE9ng \u0111\xF3n kh\xE1ch)."
  },
  {
    "id": "pdf_181",
    "hanzi": "\u4E2D\u56FD",
    "pinyin": "Zh\u014Dnggu\xF3",
    "hanViet": "Trung Qu\u1ED1c",
    "vietnamese": "N\u01B0\u1EDBc Trung Qu\u1ED1c",
    "partOfSpeech": "Danh t\u1EEB ri\xEAng",
    "level": 1,
    "category": "\u0110\u1ECBa l\xFD & Qu\u1ED1c gia",
    "radical": "\u4E28 (C\u1ED5n) + \u56D7 (Vi - bao quanh)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u6211\u60F3\u53BB\u4E2D\u56FD\u5B66\u6C49\u8BED\u3002",
        "pinyin": "W\u01D2 xi\u01CEng q\xF9 Zh\u014Dnggu\xF3 xu\xE9 H\xE0ny\u01D4.",
        "vi": "T\xF4i mu\u1ED1n \u0111i Trung Qu\u1ED1c \u0111\u1EC3 h\u1ECDc ti\u1EBFng H\xE1n."
      },
      {
        "zh": "\u4E2D\u56FD\u6709\u5F88\u591A\u597D\u5403\u7684\u83DC\u3002",
        "pinyin": "Zh\u014Dnggu\xF3 y\u01D2u h\u011Bn du\u014D h\u01CEoch\u012B de c\xE0i.",
        "vi": "Trung Qu\u1ED1c c\xF3 r\u1EA5t nhi\u1EC1u m\xF3n \u0103n ngon."
      }
    ],
    "tips": "Trung (\u4E2D - trung t\xE2m) + Qu\u1ED1c (\u56FD - \u0111\u1EA5t n\u01B0\u1EDBc c\xF3 b\u1EDD c\xF5i bao b\u1ECDc ng\u1ECDc ng\xE0)."
  },
  {
    "id": "pdf_182",
    "hanzi": "\u5317\u4EAC",
    "pinyin": "B\u011Bij\u012Bng",
    "hanViet": "B\u1EAFc Kinh",
    "vietnamese": "B\u1EAFc Kinh (th\u1EE7 \u0111\xF4 c\u1EE7a Trung Qu\u1ED1c)",
    "partOfSpeech": "Danh t\u1EEB ri\xEAng",
    "level": 1,
    "category": "\u0110\u1ECBa l\xFD & Qu\u1ED1c gia",
    "radical": "\u5315 (Ch\u1EE7y) + \u4EA0 (\u0110\u1EA7u)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u5317\u4EAC\u662F\u4E2D\u56FD\u7684\u9996\u90FD\u3002",
        "pinyin": "B\u011Bij\u012Bng sh\xEC Zh\u014Dnggu\xF3 de sh\u01D2ud\u016B.",
        "vi": "B\u1EAFc Kinh l\xE0 th\u1EE7 \u0111\xF4 c\u1EE7a Trung Qu\u1ED1c."
      },
      {
        "zh": "\u660E\u5929\u6211\u8981\u53BB\u5317\u4EAC\u51FA\u5DEE\u3002",
        "pinyin": "M\xEDngti\u0101n w\u01D2 y\xE0o q\xF9 B\u011Bij\u012Bng ch\u016Bch\u0101i.",
        "vi": "Ng\xE0y mai t\xF4i ph\u1EA3i \u0111i B\u1EAFc Kinh c\xF4ng t\xE1c."
      }
    ],
    "tips": "B\u1EAFc (\u5317 - ph\u01B0\u01A1ng B\u1EAFc) + Kinh (\u4EAC - kinh \u0111\xF4 l\u1EDBn nguy nga tr\xE1ng l\u1EC7)."
  },
  {
    "id": "pdf_183",
    "hanzi": "\u4E0A",
    "pinyin": "sh\xE0ng",
    "hanViet": "Th\u01B0\u1EE3ng",
    "vietnamese": "Tr\xEAn, l\xEAn tr\xEAn, \u0111i h\u1ECDc/l\xE0m (th\u01B0\u1EE3ng)",
    "partOfSpeech": "Ph\u01B0\u01A1ng v\u1ECB t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u684C\u5B50\u4E0A\u6709\u4E00\u672C\u4E66\u548C\u4E00\u4E2A\u82F9\u679C\u3002",
        "pinyin": "Zhu\u014Dzi shang y\u01D2u y\xEC b\u011Bn sh\u016B h\xE9 y\xED g\xE8 p\xEDnggu\u01D2.",
        "vi": "Tr\xEAn b\xE0n c\xF3 m\u1ED9t quy\u1EC3n s\xE1ch v\xE0 m\u1ED9t qu\u1EA3 t\xE1o."
      },
      {
        "zh": "\u4ED6\u5728\u697C\u4E0A\u7B49\u4F60\u3002",
        "pinyin": "T\u0101 z\xE0i l\xF3u sh\xE0ng d\u011Bng n\u01D0.",
        "vi": "Anh \u1EA5y \u0111ang \u1EDF tr\xEAn t\u1EA7ng \u0111\u1EE3i b\u1EA1n."
      }
    ],
    "tips": "Ch\u1EEF ch\u1EC9 th\u1ECB: n\xE9t ngang bi\u1EC3u th\u1ECB m\u1EB7t \u0111\u1EA5t, n\xE9t \u0111\u1EE9ng v\u01B0\u01A1n l\xEAn ph\xEDa tr\xEAn."
  },
  {
    "id": "pdf_184",
    "hanzi": "\u4E0B",
    "pinyin": "xi\xE0",
    "hanViet": "H\u1EA1",
    "vietnamese": "D\u01B0\u1EDBi, xu\u1ED1ng, sau (h\u1EA1)",
    "partOfSpeech": "Ph\u01B0\u01A1ng v\u1ECB t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u5C0F\u732B\u5728\u6905\u5B50\u4E0B\u9762\u7761\u89C9\u3002",
        "pinyin": "Xi\u01CEom\u0101o z\xE0i y\u01D0zi xi\xE0mi\xE0n shu\xECji\xE0o.",
        "vi": "M\xE8o con \u0111ang ng\u1EE7 \u1EDF d\u01B0\u1EDBi g\u1EA7m gh\u1EBF."
      },
      {
        "zh": "\u5916\u9762\u6B63\u5728\u4E0B\u96E8\uFF0C\u522B\u51FA\u53BB\u4E86\u3002",
        "pinyin": "W\xE0imi\xE0n zh\xE8ngz\xE0i xi\xE0y\u01D4, bi\xE9 ch\u016Bqu le.",
        "vi": "B\xEAn ngo\xE0i \u0111ang m\u01B0a, \u0111\u1EEBng \u0111i ra ngo\xE0i n\u1EEFa."
      }
    ],
    "tips": "Ch\u1EEF ch\u1EC9 th\u1ECB: n\xE9t \u0111\u1EE9ng ch\u1EC9 xu\u1ED1ng ph\xEDa d\u01B0\u1EDBi m\u1EB7t \u0111\u1EA5t."
  },
  {
    "id": "pdf_185",
    "hanzi": "\u524D",
    "pinyin": "qi\xE1n",
    "hanViet": "Ti\u1EC1n",
    "vietnamese": "Tr\u01B0\u1EDBc, ph\xEDa tr\u01B0\u1EDBc, \u0111\u1EB1ng tr\u01B0\u1EDBc",
    "partOfSpeech": "Ph\u01B0\u01A1ng v\u1ECB t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u5200 (\u0110ao)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u5B66\u6821\u524D\u9762\u6709\u4E00\u4E2A\u5927\u516C\u56ED\u3002",
        "pinyin": "Xu\xE9xi\xE0o qi\xE1nmi\xE0n y\u01D2u y\xED g\xE8 d\xE0 g\u014Dngyu\xE1n.",
        "vi": "Ph\xEDa tr\u01B0\u1EDBc tr\u01B0\u1EDDng h\u1ECDc c\xF3 m\u1ED9t c\xF4ng vi\xEAn l\u1EDBn."
      },
      {
        "zh": "\u5750\u5728\u6211\u524D\u9762\u7684\u90A3\u4E2A\u4EBA\u662F\u8C01\uFF1F",
        "pinyin": "Zu\xF2 z\xE0i w\u01D2 qi\xE1nmi\xE0n de n\xE0 ge r\xE9n sh\xEC sh\xE9i?",
        "vi": "Ng\u01B0\u1EDDi ng\u1ED3i \u0111\u1EB1ng tr\u01B0\u1EDBc t\xF4i l\xE0 ai th\u1EBF?"
      }
    ],
    "tips": "Ti\u1EC1n (ph\xEDa tr\u01B0\u1EDBc m\u1EB7t ta, \u0111i l\xEAn ph\xEDa tr\u01B0\u1EDBc). Ng\u01B0\u1EE3c ngh\u0129a v\u1EDBi \u540E (h\u1EADu)."
  },
  {
    "id": "pdf_186",
    "hanzi": "\u540E",
    "pinyin": "h\xF2u",
    "hanViet": "H\u1EADu",
    "vietnamese": "Sau, ph\xEDa sau, \u0111\u1EB1ng sau",
    "partOfSpeech": "Ph\u01B0\u01A1ng v\u1ECB t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u5546\u5E97\u540E\u9762\u662F\u4E00\u4E2A\u5927\u996D\u5E97\u3002",
        "pinyin": "Sh\u0101ngdi\xE0n h\xF2umi\xE0n sh\xEC y\xED g\xE8 d\xE0 f\xE0ndi\xE0n.",
        "vi": "Ph\xEDa sau c\u1EEDa h\xE0ng l\xE0 m\u1ED9t nh\xE0 h\xE0ng l\u1EDBn."
      },
      {
        "zh": "\u4E09\u5929\u540E\u6211\u4EEC\u518D\u89C1\u9762\u3002",
        "pinyin": "S\u0101n ti\u0101n h\xF2u w\u01D2men z\xE0i ji\xE0nmi\xE0n.",
        "vi": "Ba ng\xE0y sau ch\xFAng m\xECnh g\u1EB7p l\u1EA1i."
      }
    ],
    "tips": "H\u1EADu (\u0111\u1EB1ng sau l\u01B0ng, ho\u1EB7c th\u1EDDi gian v\u1EC1 sau). Ph\u1ED3n th\u1EC3: \u5F8C."
  },
  {
    "id": "pdf_187",
    "hanzi": "\u91CC",
    "pinyin": "l\u01D0",
    "hanViet": "L\xFD",
    "vietnamese": "Trong, b\xEAn trong, trong l\xF2ng",
    "partOfSpeech": "Ph\u01B0\u01A1ng v\u1ECB t\u1EEB",
    "level": 1,
    "category": "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    "radical": "\u91CC (L\xFD)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4E66\u5305\u91CC\u6709\u5F88\u591A\u4E66\u548C\u753B\u7B14\u3002",
        "pinyin": "Sh\u016Bb\u0101o l\u01D0 y\u01D2u h\u011Bn du\u014D sh\u016B h\xE9 hu\xE0b\u01D0.",
        "vi": "Trong c\u1EB7p s\xE1ch c\xF3 r\u1EA5t nhi\u1EC1u s\xE1ch v\xE0 b\xFAt v\u1EBD."
      },
      {
        "zh": "\u6C34\u676F\u91CC\u6CA1\u6709\u6C34\u4E86\u3002",
        "pinyin": "Shu\u01D0b\u0113i l\u01D0 m\xE9iy\u01D2u shu\u01D0 le.",
        "vi": "Trong c\u1ED1c n\u01B0\u1EDBc kh\xF4ng c\xF2n n\u01B0\u1EDBc n\u1EEFa r\u1ED3i."
      }
    ],
    "tips": "Ru\u1ED9ng (\u7530) k\u1EBFt h\u1EE3p \u0111\u1EA5t (\u571F). B\xEAn trong khu\xF4n vi\xEAn \u0111\u1EA5t \u0111ai l\xE0ng m\u1EA1c (H\u01B0\u01A1ng l\xFD)."
  },
  {
    "id": "pdf_188",
    "hanzi": "\u6C34",
    "pinyin": "shu\u01D0",
    "hanViet": "Th\u1EE7y",
    "vietnamese": "N\u01B0\u1EDBc, d\xF2ng n\u01B0\u1EDBc u\u1ED1ng",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u6C34 (Th\u1EE7y)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u8BF7\u559D\u4E00\u676F\u70ED\u6E29\u6C34\u3002",
        "pinyin": "Q\u01D0ng h\u0113 y\xEC b\u0113i r\xE8 w\u0113nshu\u01D0.",
        "vi": "Xin m\u1EDDi u\u1ED1ng m\u1ED9t ly n\u01B0\u1EDBc \u1EA5m."
      },
      {
        "zh": "\u53E3\u6E34\u4E86\u5C31\u8981\u591A\u559D\u6C34\u3002",
        "pinyin": "K\u01D2uk\u011B le ji\xF9 y\xE0o du\u014D h\u0113 shu\u01D0.",
        "vi": "Kh\xE1t n\u01B0\u1EDBc th\xEC ph\u1EA3i u\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc v\xE0o."
      }
    ],
    "tips": "Ch\u1EEF t\u01B0\u1EE3ng h\xECnh u\u1ED1n l\u01B0\u1EE3n nh\u01B0 d\xF2ng n\u01B0\u1EDBc s\xF4ng ng\xF2i m\xE1t l\xE0nh nu\xF4i d\u01B0\u1EE1ng v\u1EA1n v\u1EADt."
  },
  {
    "id": "pdf_189",
    "hanzi": "\u8336",
    "pinyin": "ch\xE1",
    "hanViet": "Tr\xE0",
    "vietnamese": "Tr\xE0, ch\xE8",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u8279 (Th\u1EA3o - c\u1ECF c\xE2y)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4E2D\u56FD\u4EBA\u90FD\u5F88\u559C\u6B22\u559D\u8336\u3002",
        "pinyin": "Zh\u014Dnggu\xF3 r\xE9n d\u014Du h\u011Bn x\u01D0huan h\u0113 ch\xE1.",
        "vi": "Ng\u01B0\u1EDDi Trung Qu\u1ED1c \u0111\u1EC1u r\u1EA5t th\xEDch u\u1ED1ng tr\xE0."
      },
      {
        "zh": "\u4F60\u60F3\u559D\u8336\u8FD8\u662F\u559D\u5496\u5561\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng h\u0113 ch\xE1 h\xE1ish\xEC h\u0113 k\u0101f\u0113i?",
        "vi": "B\u1EA1n mu\u1ED1n u\u1ED1ng tr\xE0 hay u\u1ED1ng c\xE0 ph\xEA?"
      }
    ],
    "tips": "B\u1ED9 Th\u1EA3o (\u8279) \u1EDF tr\xEAn, ch\u1EEF Nh\xE2n (\u4EBA) \u1EDF gi\u1EEFa, b\u1ED9 M\u1ED9c (\u6728) \u1EDF d\u01B0\u1EDBi. Con ng\u01B0\u1EDDi h\xF2a m\xECnh gi\u1EEFa thi\xEAn nhi\xEAn c\xE2y l\xE1 tr\xE0."
  },
  {
    "id": "pdf_190",
    "hanzi": "\u7C73\u996D",
    "pinyin": "m\u01D0f\xE0n",
    "hanViet": "M\u1EC5 Ph\u1EA1n",
    "vietnamese": "C\u01A1m, c\u01A1m tr\u1EAFng",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u7C73 (M\u1EC5) + \u9963 (Th\u1EF1c)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u670D\u52A1\u5458\uFF0C\u8BF7\u7ED9\u6211\u4EEC\u4E24\u7897\u7C73\u996D\u3002",
        "pinyin": "F\xFAw\xF9yu\xE1n, q\u01D0ng g\u011Bi w\u01D2men li\u01CEng w\u01CEn m\u01D0f\xE0n.",
        "vi": "Ph\u1EE5c v\u1EE5 \u01A1i, cho ch\xFAng t\xF4i hai b\xE1t c\u01A1m tr\u1EAFng."
      },
      {
        "zh": "\u4ECA\u5929\u4E2D\u5348\u6211\u5403\u4E86\u7C73\u996D\u548C\u9C7C\u3002",
        "pinyin": "J\u012Bnti\u0101n zh\u014Dngw\u01D4 w\u01D2 ch\u012B le m\u01D0f\xE0n h\xE9 y\xFA.",
        "vi": "Tr\u01B0a nay t\xF4i \u0111\xE3 \u0103n c\u01A1m tr\u1EAFng v\u1EDBi c\xE1."
      }
    ],
    "tips": "M\u1EC5 (\u7C73 - h\u1EA1t g\u1EA1o) n\u1EA5u ch\xEDn v\u1EDBi b\u1ED9 Th\u1EF1c (\u9963 - th\u1EE9c \u0103n) th\xE0nh c\u01A1m ngon nu\xF4i d\u01B0\u1EE1ng th\u1EC3 l\u1EF1c."
  },
  {
    "id": "pdf_191",
    "hanzi": "\u83DC",
    "pinyin": "c\xE0i",
    "hanViet": "Th\u1EA3i",
    "vietnamese": "M\xF3n \u0103n, th\u1EE9c \u0103n, rau c\u1EE7",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    "radical": "\u8279 (Th\u1EA3o)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u4F60\u559C\u6B22\u5403\u4E2D\u56FD\u83DC\u8FD8\u662F\u8D8A\u5357\u83DC\uFF1F",
        "pinyin": "N\u01D0 x\u01D0huan ch\u012B Zh\u014Dnggu\xF3 c\xE0i h\xE1ish\xEC Yu\xE8n\xE1n c\xE0i?",
        "vi": "B\u1EA1n th\xEDch \u0103n m\xF3n Trung Qu\u1ED1c hay m\xF3n Vi\u1EC7t Nam?"
      },
      {
        "zh": "\u684C\u5B50\u4E0A\u6446\u6EE1\u4E86\u7F8E\u5473\u7684\u83DC\u3002",
        "pinyin": "Zhu\u014Dzi shang b\u01CEi m\u01CEn le m\u011Biw\xE8i de c\xE0i.",
        "vi": "Tr\xEAn b\xE0n b\xE0y \u0111\u1EA7y nh\u1EEFng m\xF3n \u0103n th\u01A1m ngon."
      }
    ],
    "tips": "B\u1ED9 Th\u1EA3o (\u8279 - rau c\u1EE7) k\u1EBFt h\u1EE3p Th\xE1i (\u91C7 - h\xE1i l\u01B0\u1EE3m). V\u1EEBa c\xF3 ngh\u0129a l\xE0 rau xanh v\u1EEBa ch\u1EC9 m\xF3n \u0103n \u0111\xE3 n\u1EA5u ch\xEDn."
  },
  {
    "id": "pdf_192",
    "hanzi": "\u684C\u5B50",
    "pinyin": "zhu\u014Dzi",
    "hanViet": "Tr\xE1c T\u1EED",
    "vietnamese": "C\xE1i b\xE0n",
    "partOfSpeech": "Danh t\u1EEB \u0111\u1ED3 v\u1EADt",
    "level": 1,
    "category": "\u0110\u1ED3 d\xF9ng & Gia \u0111\xECnh",
    "radical": "\u6728 (M\u1ED9c) + \u5B50 (T\u1EED)",
    "strokeCount": 13,
    "examples": [
      {
        "zh": "\u8FD9\u5F20\u684C\u5B50\u662F\u6728\u5934\u505A\u7684\u3002",
        "pinyin": "Zh\xE8 zh\u0101ng zhu\u014Dzi sh\xEC m\xF9tou zu\xF2 de.",
        "vi": "Chi\u1EBFc b\xE0n n\xE0y \u0111\u01B0\u1EE3c l\xE0m b\u1EB1ng g\u1ED7."
      },
      {
        "zh": "\u7535\u8111\u5728\u684C\u5B50\u4E0A\u653E\u7740\u3002",
        "pinyin": "Di\xE0nn\u01CEo z\xE0i zhu\u014Dzi shang f\xE0ng zhe.",
        "vi": "M\xE1y t\xEDnh \u0111ang \u0111\u01B0\u1EE3c \u0111\u1EC3 \u1EDF tr\xEAn b\xE0n."
      }
    ],
    "tips": "Ch\u1EEF Tr\xE1c (\u684C - g\u1ED3m ch\u1EEF Th\u01B0\u1EE3ng \u4E0A v\xE0 b\u1ED9 M\u1ED9c \u6728: m\u1EB7t ph\u1EB3ng b\u1EB1ng g\u1ED7 \u0111\u1EB7t cao)."
  },
  {
    "id": "pdf_193",
    "hanzi": "\u6905\u5B50",
    "pinyin": "y\u01D0zi",
    "hanViet": "Y T\u1EED",
    "vietnamese": "C\xE1i gh\u1EBF",
    "partOfSpeech": "Danh t\u1EEB \u0111\u1ED3 v\u1EADt",
    "level": 1,
    "category": "\u0110\u1ED3 d\xF9ng & Gia \u0111\xECnh",
    "radical": "\u6728 (M\u1ED9c) + \u5B50 (T\u1EED)",
    "strokeCount": 15,
    "examples": [
      {
        "zh": "\u8BF7\u5750\u5728\u8FD9\u628A\u6905\u5B50\u4E0A\u3002",
        "pinyin": "Q\u01D0ng zu\xF2 z\xE0i zh\xE8 b\u01CE y\u01D0zi shang.",
        "vi": "Xin m\u1EDDi ng\u1ED3i l\xEAn chi\u1EBFc gh\u1EBF n\xE0y."
      },
      {
        "zh": "\u623F\u95F4\u91CC\u6709\u56DB\u628A\u6905\u5B50\u3002",
        "pinyin": "F\xE1ngji\u0101n l\u01D0 y\u01D2u s\xEC b\u01CE y\u01D0zi.",
        "vi": "Trong ph\xF2ng c\xF3 4 chi\u1EBFc gh\u1EBF."
      }
    ],
    "tips": "B\u1ED9 M\u1ED9c (\u6728 - g\u1ED7) k\u1EBFt h\u1EE3p ch\u1EEF K\u1EF3 (\u5947). L\u01B0\u1EE3ng t\u1EEB d\xF9ng cho gh\u1EBF l\xE0 \u628A (b\u01CE)."
  },
  {
    "id": "pdf_194",
    "hanzi": "\u7535\u5F71",
    "pinyin": "di\xE0ny\u01D0ng",
    "hanViet": "\u0110i\u1EC7n \u1EA2nh",
    "vietnamese": "Phim \u0111i\u1EC7n \u1EA3nh, b\u1ED9 phim",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Gi\u1EA3i tr\xED & \u0110\u1EDDi s\u1ED1ng",
    "radical": "\u7530 (\u0110i\u1EC1n/L\xF4i) + \u5F61 (Tam th\u1EC3)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u4ECA\u665A\u6211\u4EEC\u4E00\u8D77\u53BB\u770B\u7535\u5F71\u5427\uFF01",
        "pinyin": "J\u012Bnw\u01CEn w\u01D2men y\xECq\u01D0 q\xF9 k\xE0n di\xE0ny\u01D0ng ba!",
        "vi": "T\u1ED1i nay t\u1EE5i m\xECnh c\xF9ng nhau \u0111i xem phim \u0111i!"
      },
      {
        "zh": "\u8FD9\u90E8\u7535\u5F71\u975E\u5E38\u611F\u4EBA\u3002",
        "pinyin": "Zh\xE8 b\xF9 di\xE0ny\u01D0ng f\u0113ich\xE1ng g\u01CEnr\xE9n.",
        "vi": "B\u1ED9 phim \u0111i\u1EC7n \u1EA3nh n\xE0y v\xF4 c\xF9ng x\xFAc \u0111\u1ED9ng."
      }
    ],
    "tips": "\u0110i\u1EC7n (\u7535 - \xE1nh s\xE1ng \u0111i\u1EC7n n\u0103ng) chi\u1EBFu h\xECnh b\xF3ng (\u5F71 - b\xF3ng h\xECnh tr\xEAn m\xE0n \u1EA3nh)."
  },
  {
    "id": "pdf_195",
    "hanzi": "\u98DE\u673A",
    "pinyin": "f\u0113ij\u012B",
    "hanViet": "Phi C\u01A1",
    "vietnamese": "M\xE1y bay",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Giao th\xF4ng & Ph\u01B0\u01A1ng ti\u1EC7n",
    "radical": "\u98DE (Phi) + \u6728 (M\u1ED9c)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4ED6\u5750\u98DE\u673A\u53BB\u5317\u4EAC\u4E86\u3002",
        "pinyin": "T\u0101 zu\xF2 f\u0113ij\u012B q\xF9 B\u011Bij\u012Bng le.",
        "vi": "Anh \u1EA5y \u0111i m\xE1y bay \u0111\u1EBFn B\u1EAFc Kinh r\u1ED3i."
      },
      {
        "zh": "\u5929\u7A7A\u4E2D\u6709\u4E00\u67B6\u5927\u98DE\u673A\u3002",
        "pinyin": "Ti\u0101nk\u014Dng zh\u014Dng y\u01D2u y\xED ji\xE0 d\xE0 f\u0113ij\u012B.",
        "vi": "Tr\xEAn b\u1EA7u tr\u1EDDi c\xF3 m\u1ED9t chi\u1EBFc m\xE1y bay l\u1EDBn."
      }
    ],
    "tips": "Phi (\u98DE - bay l\u01B0\u1EE3n tr\xEAn tr\u1EDDi) + C\u01A1 (\u673A - c\u1ED7 m\xE1y m\xF3c hi\u1EC7n \u0111\u1EA1i)."
  },
  {
    "id": "pdf_196",
    "hanzi": "\u72D7",
    "pinyin": "g\u01D2u",
    "hanViet": "C\u1EA9u",
    "vietnamese": "Con ch\xF3",
    "partOfSpeech": "Danh t\u1EEB \u0111\u1ED9ng v\u1EADt",
    "level": 1,
    "category": "\u0110\u1ED9ng v\u1EADt",
    "radical": "\u72AD (Khuy\u1EC3n)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u6211\u5BB6\u6709\u4E00\u53EA\u975E\u5E38\u53EF\u7231\u7684\u5C0F\u72D7\u3002",
        "pinyin": "W\u01D2 ji\u0101 y\u01D2u y\xEC zh\u012B f\u0113ich\xE1ng k\u011B'\xE0i de xi\u01CEog\u01D2u.",
        "vi": "Nh\xE0 t\xF4i c\xF3 m\u1ED9t ch\xFA ch\xF3 con v\xF4 c\xF9ng \u0111\xE1ng y\xEAu."
      },
      {
        "zh": "\u90A3\u53EA\u72D7\u4E00\u76F4\u5728\u95E8\u53E3\u53EB\u3002",
        "pinyin": "N\xE0 zh\u012B g\u01D2u y\xECzh\xED z\xE0i m\xE9nk\u01D2u ji\xE0o.",
        "vi": "Con ch\xF3 kia c\u1EE9 s\u1EE7a su\u1ED1t \u1EDF tr\u01B0\u1EDBc c\u1EEDa."
      }
    ],
    "tips": "B\u1ED9 Khuy\u1EC3n (\u72AD - lo\xE0i ch\xF3 th\xFA) k\u1EBFt h\u1EE3p \xE2m C\xFA (\u53E5). B\u1EA1n trung th\xE0nh b\u1EA3o v\u1EC7 t\u1ED5 \u1EA5m c\u1EE7a lo\xE0i ng\u01B0\u1EDDi."
  },
  {
    "id": "pdf_197",
    "hanzi": "\u5929\u6C14",
    "pinyin": "ti\u0101nq\xEC",
    "hanViet": "Thi\xEAn Kh\xED",
    "vietnamese": "Th\u1EDDi ti\u1EBFt, kh\xED tr\u1EDDi",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Th\u1EDDi ti\u1EBFt & T\u1EF1 nhi\xEAn",
    "radical": "\u5927 (\u0110\u1EA1i) + \u6C14 (Kh\xED)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u5929\u6C14\u5F88\u597D\uFF0C\u4E0D\u592A\u51B7\u4E5F\u4E0D\u592A\u70ED\u3002",
        "pinyin": "J\u012Bnti\u0101n ti\u0101nq\xEC h\u011Bn h\u01CEo, b\xFA t\xE0i l\u011Bng y\u011B b\xFA t\xE0i r\xE8.",
        "vi": "H\xF4m nay th\u1EDDi ti\u1EBFt r\u1EA5t d\u1EC5 ch\u1ECBu, kh\xF4ng qu\xE1 l\u1EA1nh c\u0169ng kh\xF4ng qu\xE1 n\xF3ng."
      },
      {
        "zh": "\u660E\u5929\u7684\u5929\u6C14\u600E\u4E48\u6837\uFF1F",
        "pinyin": "M\xEDngti\u0101n de ti\u0101nq\xEC z\u011Bnmey\xE0ng?",
        "vi": "Th\u1EDDi ti\u1EBFt ng\xE0y mai th\u1EBF n\xE0o?"
      }
    ],
    "tips": "Thi\xEAn (\u5929 - tr\u1EDDi \u0111\u1EA5t) + Kh\xED (\u6C14 - lu\u1ED3ng kh\xF4ng kh\xED, h\u01A1i th\u1EDF thi\xEAn nhi\xEAn chuy\u1EC3n v\u1EA7n)."
  },
  {
    "id": "pdf_198",
    "hanzi": "\u4E66",
    "pinyin": "sh\u016B",
    "hanViet": "Th\u01B0",
    "vietnamese": "S\xE1ch, quy\u1EC3n s\xE1ch",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "H\u1ECDc t\u1EADp & \u0110\u1ED3 v\u1EADt",
    "radical": "\u4E5B (\u1EA4t)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u6211\u559C\u6B22\u5728\u623F\u95F4\u91CC\u770B\u4E66\u3002",
        "pinyin": "W\u01D2 x\u01D0huan z\xE0i f\xE1ngji\u0101n l\u01D0 k\xE0n sh\u016B.",
        "vi": "T\xF4i th\xEDch \u0111\u1ECDc s\xE1ch \u1EDF trong ph\xF2ng."
      },
      {
        "zh": "\u8FD9\u662F\u6211\u4E70\u7684\u6C49\u8BED\u4E66\u3002",
        "pinyin": "Zh\xE8 sh\xEC w\u01D2 m\u01CEi de H\xE0ny\u01D4 sh\u016B.",
        "vi": "\u0110\xE2y l\xE0 cu\u1ED1n s\xE1ch ti\u1EBFng H\xE1n t\xF4i m\u1EDBi mua."
      }
    ],
    "tips": "H\xECnh c\xE2y b\xFAt vi\u1EBFt ghi l\u1EA1i tri th\u1EE9c tr\xEAn th\u1EBB tre th\u1EBB gi\u1EA5y. Ph\u1ED3n th\u1EC3: \u66F8."
  },
  {
    "id": "pdf_199",
    "hanzi": "\u540D\u5B57",
    "pinyin": "m\xEDngzi",
    "hanViet": "Danh T\u1EF1",
    "vietnamese": "T\xEAn, h\u1ECD t\xEAn",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Giao ti\u1EBFp x\xE3 h\u1ED9i",
    "radical": "\u53E3 (Kh\u1EA9u) + \u5B80 (Mi\xEAn)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F",
        "pinyin": "N\u01D0 ji\xE0o sh\xE9nme m\xEDngzi?",
        "vi": "B\u1EA1n t\xEAn l\xE0 g\xEC?"
      },
      {
        "zh": "\u4ED6\u7684\u4E2D\u6587\u540D\u5B57\u5F88\u597D\u542C\u3002",
        "pinyin": "T\u0101 de zh\u014Dngw\xE9n m\xEDngzi h\u011Bn h\u01CEot\u012Bng.",
        "vi": "T\xEAn ti\u1EBFng Trung c\u1EE7a c\u1EADu \u1EA5y nghe r\u1EA5t hay."
      }
    ],
    "tips": "Danh (\u540D - ban \u0111\xEAm T\u1ECBch \u5915 c\u1EA5t ti\u1EBFng Kh\u1EA9u \u53E3 g\u1ECDi t\xEAn \u0111\u1EC3 nh\u1EADn di\u1EC7n) + T\u1EF1 (\u5B57 - ch\u1EEF vi\u1EBFt)."
  },
  {
    "id": "pdf_200",
    "hanzi": "\u6C49\u8BED",
    "pinyin": "H\xE0ny\u01D4",
    "hanViet": "H\xE1n Ng\u1EEF",
    "vietnamese": "Ti\u1EBFng H\xE1n, ti\u1EBFng Trung Qu\u1ED1c",
    "partOfSpeech": "Danh t\u1EEB ng\xF4n ng\u1EEF",
    "level": 1,
    "category": "Ng\xF4n ng\u1EEF & H\u1ECDc t\u1EADp",
    "radical": "\u6C35 (Th\u1EE7y) + \u8BA0 (Ng\xF4n)",
    "strokeCount": 14,
    "examples": [
      {
        "zh": "\u6211\u6B63\u5728\u52AA\u529B\u5B66\u4E60\u6C49\u8BED\u3002",
        "pinyin": "W\u01D2 zh\xE8ngz\xE0i n\u01D4l\xEC xu\xE9x\xED H\xE0ny\u01D4.",
        "vi": "T\xF4i \u0111ang n\u1ED7 l\u1EF1c ch\u0103m ch\u1EC9 h\u1ECDc ti\u1EBFng Trung."
      },
      {
        "zh": "\u6C49\u8BED\u867D\u7136\u96BE\uFF0C\u4F46\u662F\u5F88\u6709\u8DA3\u3002",
        "pinyin": "H\xE0ny\u01D4 su\u012Br\xE1n n\xE1n, d\xE0nsh\xEC h\u011Bn y\u01D2uq\xF9.",
        "vi": "Ti\u1EBFng Trung tuy kh\xF3 nh\u01B0ng r\u1EA5t th\xFA v\u1ECB."
      }
    ],
    "tips": "H\xE1n (\u6C49 - d\xF2ng s\xF4ng H\xE1n Th\u1EE7y, t\u1ED9c ng\u01B0\u1EDDi H\xE1n) + Ng\u1EEF (\u8BED - l\u1EDDi \u0103n ti\u1EBFng n\xF3i d\xF9ng ch\u1EEF Ng\xF4n \u8BA0)."
  },
  {
    "id": "pdf_201",
    "hanzi": "\u5B57",
    "pinyin": "z\xEC",
    "hanViet": "T\u1EF1",
    "vietnamese": "Ch\u1EEF, ch\u1EEF vi\u1EBFt, k\xFD t\u1EF1",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "Ng\xF4n ng\u1EEF & H\u1ECDc t\u1EADp",
    "radical": "\u5B80 (Mi\xEAn) + \u5B50 (T\u1EED)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u6C49\u5B57\u600E\u4E48\u5199\uFF1F",
        "pinyin": "Zh\xE8ge h\xE0nz\xEC z\u011Bnme xi\u011B?",
        "vi": "Ch\u1EEF H\xE1n n\xE0y vi\u1EBFt nh\u01B0 th\u1EBF n\xE0o?"
      },
      {
        "zh": "\u4ED6\u5199\u7684\u5B57\u975E\u5E38\u6F02\u4EAE\u3002",
        "pinyin": "T\u0101 xi\u011B de z\xEC f\u0113ich\xE1ng pi\xE0oliang.",
        "vi": "Ch\u1EEF anh \u1EA5y vi\u1EBFt r\u1EA5t \u0111\u1EB9p m\u1EAFt."
      }
    ],
    "tips": "M\xE1i nh\xE0 (\u5B80) \u01B0\u01A1m m\u1EA7m nu\xF4i d\u01B0\u1EE1ng con tr\u1EBB (\u5B50) h\u1ECDc t\u1EEBng n\xE9t ch\u1EEF v\u0103n h\xF3a ng\xE0n n\u0103m."
  },
  {
    "id": "pdf_202",
    "hanzi": "\u4E1C\u897F",
    "pinyin": "d\u014Dngxi",
    "hanViet": "\u0110\xF4ng T\xE2y",
    "vietnamese": "\u0110\u1ED3 v\u1EADt, th\u1EE9 \u0111\u1ED3, m\xF3n \u0111\u1ED3",
    "partOfSpeech": "Danh t\u1EEB",
    "level": 1,
    "category": "\u0110\u1EDDi s\u1ED1ng h\xE0ng ng\xE0y",
    "radical": "\u4E00 (Nh\u1EA5t) + \u8980 (T\xE2y)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u4F60\u60F3\u53BB\u5546\u573A\u4E70\u4EC0\u4E48\u4E1C\u897F\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng q\xF9 sh\u0101ngdi\xE0n m\u01CEi sh\xE9nme d\u014Dngxi?",
        "vi": "B\u1EA1n mu\u1ED1n ra trung t\xE2m th\u01B0\u01A1ng m\u1EA1i mua m\xF3n \u0111\u1ED3 g\xEC?"
      },
      {
        "zh": "\u684C\u5B50\u4E0A\u6709\u5F88\u591A\u5403\u7684\u4E1C\u897F\u3002",
        "pinyin": "Zhu\u014Dzi shang y\u01D2u h\u011Bn du\u014D ch\u012B de d\u014Dngxi.",
        "vi": "Tr\xEAn b\xE0n c\xF3 r\u1EA5t nhi\u1EC1u \u0111\u1ED3 \u0103n ngon."
      }
    ],
    "tips": "X\u01B0a h\u1ECDp ch\u1EE3 t\u1EEB ph\xEDa \u0110\xF4ng (\u4E1C) sang ph\xEDa T\xE2y (\u897F) bu\xF4n b\xE1n h\xE0ng h\xF3a kh\u1EAFp b\u1ED1n ph\u01B0\u01A1ng t\u1EA1o n\xEAn t\u1EEB '\u0111\u1ED3 \u0111\u1EA1c'."
  },
  {
    "id": "pdf_203",
    "hanzi": "\u662F",
    "pinyin": "sh\xEC",
    "hanViet": "Th\u1ECB",
    "vietnamese": "L\xE0, ph\u1EA3i, \u0111\xFAng v\u1EADy (\u0111\u1ED9ng t\u1EEB li\xEAn k\u1EBFt ph\xE1n \u0111o\xE1n)",
    "partOfSpeech": "H\u1EC7 t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED9ng t\u1EEB ph\xE1n \u0111o\xE1n",
    "radical": "\u65E5 (Nh\u1EADt)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u6211\u662F\u8D8A\u5357\u4EBA\uFF0C\u4ED6\u662F\u4E2D\u56FD\u4EBA\u3002",
        "pinyin": "W\u01D2 sh\xEC Yu\xE8n\xE1n r\xE9n, t\u0101 sh\xEC Zh\u014Dnggu\xF3 r\xE9n.",
        "vi": "T\xF4i l\xE0 ng\u01B0\u1EDDi Vi\u1EC7t Nam, anh \u1EA5y l\xE0 ng\u01B0\u1EDDi Trung Qu\u1ED1c."
      },
      {
        "zh": "\u8FD9\u662F\u4F60\u7684\u4E66\u5305\u5417\uFF1F\u2014\u2014\u662F\u7684\u3002",
        "pinyin": "Zh\xE8 sh\xEC n\u01D0 de sh\u016Bb\u0101o ma? \u2014\u2014 Sh\xEC de.",
        "vi": "\u0110\xE2y l\xE0 c\u1EB7p s\xE1ch c\u1EE7a b\u1EA1n ph\u1EA3i kh\xF4ng? \u2014\u2014 \u0110\xFAng v\u1EADy."
      }
    ],
    "tips": "M\u1EB7t tr\u1EDDi (\u65E5) soi r\xF5 \u0111i\u1EC1u ch\xE2n ch\xEDnh \u0111\xFAng \u0111\u1EAFn (Ch\xEDnh \u6B63). Kh\u1EB3ng \u0111\u1ECBnh t\xEDnh ch\u1EA5t, th\xE2n ph\u1EADn c\u1EE7a ch\u1EE7 ng\u1EEF."
  },
  {
    "id": "pdf_204",
    "hanzi": "\u6709",
    "pinyin": "y\u01D2u",
    "hanViet": "H\u1EEFu",
    "vietnamese": "C\xF3, s\u1EDF h\u1EEFu, t\u1ED3n t\u1EA1i",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB t\u1ED3n t\u1EA1i",
    "level": 1,
    "category": "\u0110\u1ED9ng t\u1EEB tr\u1EA1ng th\xE1i",
    "radical": "\u6708 (Nguy\u1EC7t)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u6211\u6709\u5F88\u591A\u4E2D\u56FD\u670B\u53CB\u3002",
        "pinyin": "W\u01D2 y\u01D2u h\u011Bn du\u014D Zh\u014Dnggu\xF3 p\xE9ngyou.",
        "vi": "T\xF4i c\xF3 r\u1EA5t nhi\u1EC1u b\u1EA1n b\xE8 Trung Qu\u1ED1c."
      },
      {
        "zh": "\u684C\u5B50\u4E0A\u6709\u4E00\u676F\u6C34\u3002",
        "pinyin": "Zhu\u014Dzi shang y\u01D2u y\xEC b\u0113i shu\u01D0.",
        "vi": "Tr\xEAn b\xE0n c\xF3 m\u1ED9t c\u1ED1c n\u01B0\u1EDBc."
      }
    ],
    "tips": "B\xE0n tay (\u624B) n\u1EAFm gi\u1EEF mi\u1EBFng th\u1ECBt (\u6708). Bi\u1EC3u th\u1ECB vi\u1EC7c s\u1EDF h\u1EEFu ho\u1EB7c s\u1EF1 t\u1ED3n t\u1EA1i c\u1EE7a s\u1EF1 v\u1EADt."
  },
  {
    "id": "pdf_205",
    "hanzi": "\u5728",
    "pinyin": "z\xE0i",
    "hanViet": "T\u1EA1i",
    "vietnamese": "\u1EDE, t\u1EA1i, \u0111ang (l\xE0m g\xEC)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Gi\u1EDBi t\u1EEB / Ph\xF3 t\u1EEB",
    "level": 1,
    "category": "\u0110\u1ED9ng t\u1EEB & Ng\u1EEF ph\xE1p",
    "radical": "\u571F (Th\u1ED5)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4ED6\u73B0\u5728\u5728\u5B66\u6821\u5B66\u4E60\u3002",
        "pinyin": "T\u0101 xi\xE0nz\xE0i z\xE0i xu\xE9xi\xE0o xu\xE9x\xED.",
        "vi": "Hi\u1EC7n t\u1EA1i anh \u1EA5y \u0111ang \u1EDF tr\u01B0\u1EDDng h\u1ECDc t\u1EADp."
      },
      {
        "zh": "\u6211\u6B63\u5728\u770B\u4E66\u5462\u3002",
        "pinyin": "W\u01D2 zh\xE8ngz\xE0i k\xE0n sh\u016B ne.",
        "vi": "T\xF4i \u0111ang \u0111\u1ECDc s\xE1ch \u0111\xE2y n\xE0y."
      }
    ],
    "tips": "B\u1ED9 Th\u1ED5 (\u571F - \u0111\u1EA5t \u0111ai). V\u1EEBa ch\u1EC9 n\u01A1i ch\u1ED1n (\u1EDF \u0111\xE2u) v\u1EEBa \u0111\u1EE9ng tr\u01B0\u1EDBc \u0111\u1ED9ng t\u1EEB bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng \u0111ang ti\u1EBFp di\u1EC5n."
  },
  {
    "id": "pdf_206",
    "hanzi": "\u53BB",
    "pinyin": "q\xF9",
    "hanViet": "Kh\u1EE9",
    "vietnamese": "\u0110i, r\u1EDDi \u0111i (r\u1EDDi xa v\u1ECB tr\xED ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB di chuy\u1EC3n",
    "level": 1,
    "category": "\u0110\u1ED9ng t\u1EEB di chuy\u1EC3n",
    "radical": "\u53B6 (Kh\u1EE9/Kh\u01B0)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u660E\u5929\u4F60\u60F3\u53BB\u54EA\u513F\u65C5\u6E38\uFF1F",
        "pinyin": "M\xEDngti\u0101n n\u01D0 xi\u01CEng q\xF9 n\u01CEr l\u01DAy\xF3u?",
        "vi": "Ng\xE0y mai b\u1EA1n mu\u1ED1n \u0111i \u0111\xE2u du l\u1ECBch?"
      },
      {
        "zh": "\u6211\u53BB\u5546\u5E97\u4E70\u82F9\u679C\u3002",
        "pinyin": "W\u01D2 q\xF9 sh\u0101ngdi\xE0n m\u01CEi p\xEDnggu\u01D2.",
        "vi": "T\xF4i \u0111i c\u1EEDa h\xE0ng mua t\xE1o."
      }
    ],
    "tips": "Ng\u01B0\u1EDDi b\u01B0\u1EDBc ch\xE2n r\u1EDDi kh\u1ECFi t\u1ED5 \u1EA5m \u0111i ra ngo\xE0i. Ng\u01B0\u1EE3c h\u01B0\u1EDBng v\u1EDBi \u6765 (\u0111\u1EBFn g\u1EA7n)."
  },
  {
    "id": "pdf_207",
    "hanzi": "\u6765",
    "pinyin": "l\xE1i",
    "hanViet": "Lai",
    "vietnamese": "\u0110\u1EBFn, l\u1EA1i g\u1EA7n, t\u1EDBi (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB di chuy\u1EC3n",
    "level": 1,
    "category": "\u0110\u1ED9ng t\u1EEB di chuy\u1EC3n",
    "radical": "\u6728 (M\u1ED9c)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u5FEB\u8BF7\u8FDB\u6765\u559D\u676F\u8336\u5427\uFF01",
        "pinyin": "Ku\xE0i q\u01D0ng j\xECnl\xE1i h\u0113 b\u0113i ch\xE1 ba!",
        "vi": "M\u1EDDi mau v\xE0o \u0111\xE2y u\u1ED1ng ch\xE9n tr\xE0 nh\xE9!"
      },
      {
        "zh": "\u4ED6\u4EC0\u4E48\u65F6\u5019\u6765\u6211\u4EEC\u5BB6\uFF1F",
        "pinyin": "T\u0101 sh\xE9nme sh\xEDhou l\xE1i w\u01D2men ji\u0101?",
        "vi": "Khi n\xE0o anh \u1EA5y \u0111\u1EBFn nh\xE0 ch\xFAng ta?"
      }
    ],
    "tips": "Nguy\xEAn ngh\u0129a l\xE0 c\xE2y l\xFAa m\xEC t\u1EEB ph\u01B0\u01A1ng xa \u0111\u01B0\u1EE3c m\xF9a mang l\u1EA1i \u1EA5m no. Di chuy\u1EC3n v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i."
  },
  {
    "id": "pdf_208",
    "hanzi": "\u5403",
    "pinyin": "ch\u012B",
    "hanViet": "C\u1EADt",
    "vietnamese": "\u0102n, d\xF9ng b\u1EEFa",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "\u0110\u1EDDi s\u1ED1ng & \u1EA8m th\u1EF1c",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4F60\u5403\u7C73\u996D\u8FD8\u662F\u5403\u9762\u6761\uFF1F",
        "pinyin": "N\u01D0 ch\u012B m\u01D0f\xE0n h\xE1ish\xEC ch\u012B mi\xE0nti\xE1o?",
        "vi": "B\u1EA1n \u0103n c\u01A1m hay \u0103n m\xEC s\u1EE3i?"
      },
      {
        "zh": "\u4F60\u5403\u8FC7\u4E2D\u56FD\u70E4\u9E2D\u5417\uFF1F",
        "pinyin": "N\u01D0 ch\u012B guo Zh\u014Dnggu\xF3 k\u01CEoy\u0101 ma?",
        "vi": "B\u1EA1n t\u1EEBng \u0103n v\u1ECBt quay Trung Qu\u1ED1c ch\u01B0a?"
      }
    ],
    "tips": "B\u1ED9 Kh\u1EA9u (\u53E3 - chi\u1EBFc mi\u1EC7ng) d\xF9ng \u0111\u1EC3 nhai nu\u1ED1t th\u1EE9c \u0103n. Ch\u1EEF H\xE1n ph\u1ED3n th\u1EC3: \u55AB."
  },
  {
    "id": "pdf_209",
    "hanzi": "\u559D",
    "pinyin": "h\u0113",
    "hanViet": "H\u1EA1t",
    "vietnamese": "U\u1ED1ng (n\u01B0\u1EDBc, tr\xE0, canh)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "\u0110\u1EDDi s\u1ED1ng & \u1EA8m th\u1EF1c",
    "radical": "\u53E3 (Kh\u1EA9u)",
    "strokeCount": 12,
    "examples": [
      {
        "zh": "\u53E3\u6E34\u4E86\u5C31\u8981\u591A\u559D\u6C34\u3002",
        "pinyin": "K\u01D2uk\u011B le ji\xF9 y\xE0o du\u014D h\u0113 shu\u01D0.",
        "vi": "Kh\xE1t n\u01B0\u1EDBc th\xEC ph\u1EA3i u\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc v\xE0o."
      },
      {
        "zh": "\u4F60\u60F3\u559D\u4E2D\u56FD\u8336\u5417\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng h\u0113 Zh\u014Dnggu\xF3 ch\xE1 ma?",
        "vi": "B\u1EA1n c\xF3 mu\u1ED1n u\u1ED1ng tr\xE0 Trung Qu\u1ED1c kh\xF4ng?"
      }
    ],
    "tips": "B\u1ED9 Kh\u1EA9u (\u53E3) k\u1EBFt h\u1EE3p ch\u1EEF H\u1EA1t (\u66F7 - h\xE1o kh\xE1t ng\xF3ng tr\xF4ng). Mi\u1EC7ng u\u1ED1ng t\u1EEBng ng\u1EE5m n\u01B0\u1EDBc gi\u1EA3i kh\xE1t."
  },
  {
    "id": "pdf_210",
    "hanzi": "\u770B",
    "pinyin": "k\xE0n",
    "hanViet": "Kh\xE1n",
    "vietnamese": "Xem, nh\xECn, \u0111\u1ECDc (s\xE1ch), th\u0103m kh\xE1m",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB gi\xE1c quan",
    "level": 1,
    "category": "Gi\xE1c quan & Nh\u1EADn th\u1EE9c",
    "radical": "\u76EE (M\u1EE5c - m\u1EAFt)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u4ED6\u5728\u623F\u95F4\u91CC\u770B\u4E66\u3002",
        "pinyin": "T\u0101 z\xE0i f\xE1ngji\u0101n l\u01D0 k\xE0n sh\u016B.",
        "vi": "C\u1EADu \u1EA5y \u0111ang \u1EDF trong ph\xF2ng \u0111\u1ECDc s\xE1ch."
      },
      {
        "zh": "\u4ECA\u665A\u6211\u4EEC\u53BB\u770B\u7535\u5F71\u5427\u3002",
        "pinyin": "J\u012Bnw\u01CEn w\u01D2men q\xF9 k\xE0n di\xE0ny\u01D0ng ba.",
        "vi": "T\u1ED1i nay ch\xFAng m\xECnh \u0111i xem phim \u0111i\u1EC7n \u1EA3nh nh\xE9."
      }
    ],
    "tips": "B\xE0n tay Th\u1EE7 (\u624B) che ph\xEDa tr\xEAn \u0111\xF4i m\u1EAFt M\u1EE5c (\u76EE) \u0111\u1EC3 ph\xF3ng t\u1EA7m m\u1EAFt nh\xECn ra xa quan s\xE1t."
  },
  {
    "id": "pdf_211",
    "hanzi": "\u542C",
    "pinyin": "t\u012Bng",
    "hanViet": "Th\xEDnh",
    "vietnamese": "Nghe, l\u1EAFng nghe",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB gi\xE1c quan",
    "level": 1,
    "category": "Gi\xE1c quan & Nh\u1EADn th\u1EE9c",
    "radical": "\u53E3 (Kh\u1EA9u) + \u65A4 (C\xE2n)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u5F88\u559C\u6B22\u542C\u4E2D\u56FD\u97F3\u4E50\u3002",
        "pinyin": "W\u01D2 h\u011Bn x\u01D0huan t\u012Bng Zh\u014Dnggu\xF3 y\u012Bnyu\xE8.",
        "vi": "T\xF4i r\u1EA5t th\xEDch nghe \xE2m nh\u1EA1c Trung Qu\u1ED1c."
      },
      {
        "zh": "\u4F60\u542C\u61C2\u8001\u5E08\u8BF4\u7684\u8BDD\u4E86\u5417\uFF1F",
        "pinyin": "N\u01D0 t\u012Bng d\u01D2ng l\u01CEosh\u012B shu\u014D de hu\xE0 le ma?",
        "vi": "B\u1EA1n c\xF3 nghe hi\u1EC3u l\u1EDDi c\xF4 gi\xE1o n\xF3i kh\xF4ng?"
      }
    ],
    "tips": "D\xF9ng mi\u1EC7ng h\u1ECFi v\xE0 tai l\u1EAFng nghe \xE2m thanh truy\u1EC1n t\u1EDBi. Ph\u1ED3n th\u1EC3: \u807D (c\xF3 b\u1ED9 Nh\u0129 \u8033 l\u1EAFng nghe b\u1EB1ng c\u1EA3 t\u1EA5m l\xF2ng)."
  },
  {
    "id": "pdf_212",
    "hanzi": "\u8BF4\u8BDD",
    "pinyin": "shu\u014Dhu\xE0",
    "hanViet": "Thuy\u1EBFt Tho\u1EA1i",
    "vietnamese": "N\xF3i chuy\u1EC7n, chuy\u1EC7n tr\xF2",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB ly h\u1EE3p",
    "level": 1,
    "category": "Giao ti\u1EBFp & Ng\xF4n ng\u1EEF",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u8BF7\u5927\u5BB6\u5B89\u9759\uFF0C\u4E0D\u8981\u8BF4\u8BDD\u3002",
        "pinyin": "Q\u01D0ng d\xE0ji\u0101 \u0101nj\xECng, b\xFA y\xE0o shu\u014Dhu\xE0.",
        "vi": "Xin m\u1ECDi ng\u01B0\u1EDDi gi\u1EEF tr\u1EADt t\u1EF1, \u0111\u1EEBng n\xF3i chuy\u1EC7n."
      },
      {
        "zh": "\u4ED6\u6B63\u5728\u548C\u674E\u8001\u5E08\u8BF4\u8BDD\u5462\u3002",
        "pinyin": "T\u0101 zh\xE8ngz\xE0i h\xE9 L\u01D0 l\u01CEosh\u012B shu\u014Dhu\xE0 ne.",
        "vi": "Anh \u1EA5y \u0111ang n\xF3i chuy\u1EC7n v\u1EDBi th\u1EA7y L\xFD \u0111\u1EA5y."
      }
    ],
    "tips": "Thuy\u1EBFt (\u8BF4 - n\xF3i) + Tho\u1EA1i (\u8BDD - l\u1EDDi n\xF3i). C\u1EA3 hai ch\u1EEF \u0111\u1EC1u mang b\u1ED9 Ng\xF4n (\u8BA0) bi\u1EC3u th\u1ECB ho\u1EA1t \u0111\u1ED9ng giao ti\u1EBFp b\u1EB1ng ng\xF4n t\u1EEB."
  },
  {
    "id": "pdf_213",
    "hanzi": "\u5199",
    "pinyin": "xi\u011B",
    "hanViet": "T\u1EA3",
    "vietnamese": "Vi\u1EBFt (ch\u1EEF, th\u01B0, b\xE0i)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "H\u1ECDc t\u1EADp & K\u1EF9 n\u0103ng",
    "radical": "\u5196 (M\u1ECBch - n\u1EAFp \u0111\u1EADy)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u6211\u4F1A\u5199\u5F88\u591A\u6C49\u5B57\u3002",
        "pinyin": "W\u01D2 hu\xEC xi\u011B h\u011Bn du\u014D h\xE0nz\xEC.",
        "vi": "T\xF4i bi\u1EBFt vi\u1EBFt r\u1EA5t nhi\u1EC1u ch\u1EEF H\xE1n."
      },
      {
        "zh": "\u4ED6\u6B63\u5728\u7ED9\u670B\u53CB\u5199\u4FE1\u3002",
        "pinyin": "T\u0101 zh\xE8ngz\xE0i g\u011Bi p\xE9ngyou xi\u011B x\xECn.",
        "vi": "C\u1EADu \u1EA5y \u0111ang vi\u1EBFt th\u01B0 cho b\u1EA1n b\xE8."
      }
    ],
    "tips": "C\u1EA7m b\xFAt \u0111\u1EB7t n\xE9t n\u1EAFn n\xF3t t\u1EEBng ch\u1EEF tr\xEAn trang gi\u1EA5y. Ph\u1ED3n th\u1EC3: \u5BEB."
  },
  {
    "id": "pdf_214",
    "hanzi": "\u4E70",
    "pinyin": "m\u01CEi",
    "hanViet": "M\xE3i",
    "vietnamese": "Mua, s\u1EAFm s\u1EEDa",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB th\u01B0\u01A1ng m\u1EA1i",
    "level": 1,
    "category": "Mua s\u1EAFm & \u0110\u1EDDi s\u1ED1ng",
    "radical": "\u4E5B (\u1EA4t)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4F60\u60F3\u4E70\u4EC0\u4E48\u6C34\u679C\uFF1F",
        "pinyin": "N\u01D0 xi\u01CEng m\u01CEi sh\xE9nme shu\u01D0gu\u01D2?",
        "vi": "B\u1EA1n mu\u1ED1n mua lo\u1EA1i tr\xE1i c\xE2y n\xE0o?"
      },
      {
        "zh": "\u6628\u5929\u6211\u4E70\u4E86\u4E00\u53F0\u65B0\u7535\u8111\u3002",
        "pinyin": "Zu\xF3ti\u0101n w\u01D2 m\u01CEi le y\xEC t\xE1i x\u012Bn di\xE0nn\u01CEo.",
        "vi": "H\xF4m qua t\xF4i \u0111\xE3 mua m\u1ED9t chi\u1EBFc m\xE1y t\xEDnh m\u1EDBi."
      }
    ],
    "tips": "M\u1EB9o nh\u1EDB: 'M\xE3i' l\xE0 mua (d\u1EA5u h\u1ECFi), 'M\u1EA1i' l\xE0 b\xE1n (d\u1EA5u n\u1EB7ng). Ph\u1ED3n th\u1EC3: \u8CB7 (c\xF3 b\u1ED9 B\u1ED1i \u8C9D ti\u1EC1n t\xE0i)."
  },
  {
    "id": "pdf_215",
    "hanzi": "\u5750",
    "pinyin": "zu\xF2",
    "hanViet": "T\u1ECDa",
    "vietnamese": "Ng\u1ED3i, \u0111i (b\u1EB1ng ph\u01B0\u01A1ng ti\u1EC7n xe, t\xE0u, m\xE1y bay)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB",
    "level": 1,
    "category": "H\xE0nh \u0111\u1ED9ng & \u0110i l\u1EA1i",
    "radical": "\u571F (Th\u1ED5)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u8BF7\u5750\uFF0C\u559D\u676F\u70ED\u8336\u5427\u3002",
        "pinyin": "Q\u01D0ng zu\xF2, h\u0113 b\u0113i r\xE8 ch\xE1 ba.",
        "vi": "Xin m\u1EDDi ng\u1ED3i, u\u1ED1ng c\u1ED1c tr\xE0 n\xF3ng nh\xE9."
      },
      {
        "zh": "\u6211\u4EEC\u5750\u98DE\u673A\u53BB\u5317\u4EAC\u3002",
        "pinyin": "W\u01D2men zu\xF2 f\u0113ij\u012B q\xF9 B\u011Bij\u012Bng.",
        "vi": "Ch\xFAng t\xF4i ng\u1ED3i m\xE1y bay \u0111i B\u1EAFc Kinh."
      }
    ],
    "tips": "Hai ng\u01B0\u1EDDi (\u4EBA \u4EBA) ng\u1ED3i \u0111\u1ED1i di\u1EC7n nhau \u0111\xE0m \u0111\u1EA1o tr\xEAn m\xF4 \u0111\u1EA5t (\u571F). \u0110i t\xE0u xe c\u0169ng d\xF9ng \u5750."
  },
  {
    "id": "pdf_216",
    "hanzi": "\u4F4F",
    "pinyin": "zh\xF9",
    "hanViet": "Tr\u1EE5",
    "vietnamese": "\u1EDE, c\u01B0 tr\xFA, sinh s\u1ED1ng, tr\xFA ng\u1EE5",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB n\u01A1i ch\u1ED1n",
    "level": 1,
    "category": "\u0110\u1EDDi s\u1ED1ng & N\u01A1i \u1EDF",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u4F60\u4F4F\u5728\u54EA\u513F\uFF1F",
        "pinyin": "N\u01D0 zh\xF9 z\xE0i n\u01CEr?",
        "vi": "B\u1EA1n \u0111ang s\u1ED1ng \u1EDF \u0111\xE2u v\u1EADy?"
      },
      {
        "zh": "\u4ED6\u4F4F\u5728\u5B66\u6821\u65C1\u8FB9\u7684\u516C\u5BD3\u91CC\u3002",
        "pinyin": "T\u0101 zh\xF9 z\xE0i xu\xE9xi\xE0o p\xE1ngbi\u0101n de g\u014Dngy\xF9 l\u01D0.",
        "vi": "Anh \u1EA5y s\u1ED1ng trong khu c\u0103n h\u1ED9 b\xEAn c\u1EA1nh tr\u01B0\u1EDDng h\u1ECDc."
      }
    ],
    "tips": "B\u1ED9 Nh\xE2n (\u4EBB) k\u1EBFt h\u1EE3p ch\u1EEF Ch\u1EE7 (\u4E3B). Con ng\u01B0\u1EDDi an c\u01B0 l\u1EA1c nghi\u1EC7p l\xE0m ch\u1EE7 n\u01A1i \u1EDF c\u1EE7a m\xECnh."
  },
  {
    "id": "pdf_217",
    "hanzi": "\u8BA4\u8BC6",
    "pinyin": "r\xE8nshi",
    "hanViet": "Nh\u1EADn Th\u1EE9c",
    "vietnamese": "Quen bi\u1EBFt, bi\u1EBFt m\u1EB7t, nh\u1EADn ra",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB giao ti\u1EBFp",
    "level": 1,
    "category": "Giao ti\u1EBFp x\xE3 h\u1ED9i",
    "radical": "\u8BA0 (Ng\xF4n)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u5F88\u9AD8\u5174\u8BA4\u8BC6\u4F60\uFF01",
        "pinyin": "H\u011Bn g\u0101ox\xECng r\xE8nshi n\u01D0!",
        "vi": "R\u1EA5t vui \u0111\u01B0\u1EE3c l\xE0m quen v\u1EDBi b\u1EA1n!"
      },
      {
        "zh": "\u4F60\u8BA4\u8BC6\u90A3\u4E2A\u7A7F\u767D\u8272\u8863\u670D\u7684\u4EBA\u5417\uFF1F",
        "pinyin": "N\u01D0 r\xE8nshi n\xE0 ge chu\u0101n b\xE1is\xE8 y\u012Bfu de r\xE9n ma?",
        "vi": "B\u1EA1n c\xF3 quen ng\u01B0\u1EDDi \u0111ang m\u1EB7c \xE1o tr\u1EAFng kia kh\xF4ng?"
      }
    ],
    "tips": "C\u1EA3 hai ch\u1EEF \u0111\u1EC1u mang b\u1ED9 Ng\xF4n (\u8BA0) trao \u0111\u1ED5i tr\xF2 chuy\u1EC7n \u0111\u1EC3 th\u1EA5u hi\u1EC3u v\xE0 quen bi\u1EBFt nhau."
  },
  {
    "id": "pdf_218",
    "hanzi": "\u5B66\u4E60",
    "pinyin": "xu\xE9x\xED",
    "hanViet": "H\u1ECDc T\u1EADp",
    "vietnamese": "H\u1ECDc t\u1EADp, r\xE8n luy\u1EC7n h\u1ECDc h\u1ECFi",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 1,
    "category": "H\u1ECDc t\u1EADp & Gi\xE1o d\u1EE5c",
    "radical": "\u5B50 (T\u1EED) + \u4E59 (\u1EA4t)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u4ED6\u6BCF\u5929\u52AA\u529B\u5B66\u4E60\u6C49\u8BED\u3002",
        "pinyin": "T\u0101 m\u011Biti\u0101n n\u01D4l\xEC xu\xE9x\xED H\xE0ny\u01D4.",
        "vi": "M\u1ED7i ng\xE0y c\u1EADu \u1EA5y \u0111\u1EC1u ch\u0103m ch\u1EC9 h\u1ECDc ti\u1EBFng H\xE1n."
      },
      {
        "zh": "\u795D\u4F60\u5B66\u4E60\u8FDB\u6B65\uFF01",
        "pinyin": "Zh\xF9 n\u01D0 xu\xE9x\xED j\xECnb\xF9!",
        "vi": "Ch\xFAc b\u1EA1n h\u1ECDc t\u1EADp ti\u1EBFn b\u1ED9!"
      }
    ],
    "tips": "H\u1ECDc (\u5B66 - ti\u1EBFp thu tri th\u1EE9c) + T\u1EADp (\u4E60 - c\xE1nh chim t\u1EADp v\u1ED7 bay nhi\u1EC1u l\u1EA7n \u0111\u1EC3 th\xE0nh th\u1EA1o)."
  },
  {
    "id": "pdf_219",
    "hanzi": "\u5DE5\u4F5C",
    "pinyin": "g\u014Dngzu\xF2",
    "hanViet": "C\xF4ng T\xE1c",
    "vietnamese": "L\xE0m vi\u1EC7c, c\xF4ng vi\u1EC7c",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    "level": 1,
    "category": "Ngh\u1EC1 nghi\u1EC7p & \u0110\u1EDDi s\u1ED1ng",
    "radical": "\u5DE5 (C\xF4ng) + \u4EBB (Nh\xE2n)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4F60\u5728\u54EA\u513F\u5DE5\u4F5C\uFF1F",
        "pinyin": "N\u01D0 z\xE0i n\u01CEr g\u014Dngzu\xF2?",
        "vi": "B\u1EA1n l\xE0m vi\u1EC7c \u1EDF \u0111\xE2u?"
      },
      {
        "zh": "\u8FD9\u4EFD\u5DE5\u4F5C\u5F88\u6709\u610F\u4E49\u3002",
        "pinyin": "Zh\xE8 f\xE8n g\u014Dngzu\xF2 h\u011Bn y\u01D2u y\xECy\xEC.",
        "vi": "C\xF4ng vi\u1EC7c n\xE0y r\u1EA5t c\xF3 \xFD ngh\u0129a."
      }
    ],
    "tips": "C\xF4ng (\u5DE5 - c\xF4ng c\u1EE5 lao \u0111\u1ED9ng) + T\xE1c (\u4F5C - con ng\u01B0\u1EDDi t\u1EA1o ra s\u1EA3n ph\u1EA9m gi\xE1 tr\u1ECB)."
  },
  {
    "id": "pdf_220",
    "hanzi": "\u7761\u89C9",
    "pinyin": "shu\xECji\xE0o",
    "hanViet": "Th\u1EE5y Gi\xE1c",
    "vietnamese": "\u0110i ng\u1EE7, ng\u1EE7 say",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB ly h\u1EE3p",
    "level": 1,
    "category": "Sinh ho\u1EA1t h\xE0ng ng\xE0y",
    "radical": "\u76EE (M\u1EE5c - m\u1EAFt)",
    "strokeCount": 20,
    "examples": [
      {
        "zh": "\u592A\u665A\u4E86\uFF0C\u5FEB\u53BB\u7761\u89C9\u5427\u3002",
        "pinyin": "T\xE0i w\u01CEn le, ku\xE0i q\xF9 shu\xECji\xE0o ba.",
        "vi": "Mu\u1ED9n qu\xE1 r\u1ED3i, mau \u0111i ng\u1EE7 th\xF4i n\xE0o."
      },
      {
        "zh": "\u4ED6\u6BCF\u5929\u665A\u4E0A\u5341\u70B9\u7761\u89C9\u3002",
        "pinyin": "T\u0101 m\u011Biti\u0101n w\u01CEnshang sh\xED di\u01CEn shu\xECji\xE0o.",
        "vi": "M\u1ED7i t\u1ED1i anh \u1EA5y \u0111\u1EC1u ng\u1EE7 l\xFAc 10 gi\u1EDD."
      }
    ],
    "tips": "Th\u1EE5y (\u7761 - \u0111\xF4i m\u1EAFt \u76EE bu\xF4ng r\xE8m r\u0169 xu\u1ED1ng Th\xF9y \u5782) bi\u1EC3u th\u1ECB c\u01A1n bu\u1ED3n ng\u1EE7 \xEAm \u0111\u1EC1m."
  },
  {
    "id": "pdf_221",
    "hanzi": "\u505A",
    "pinyin": "zu\xF2",
    "hanViet": "T\u1ED1",
    "vietnamese": "L\xE0m, ch\u1EBF t\u1EA1o, n\u1EA5u (c\u01A1m), l\xE0m ngh\u1EC1",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB h\xE0nh \u0111\u1ED9ng",
    "level": 1,
    "category": "H\xE0nh \u0111\u1ED9ng & \u0110\u1EDDi s\u1ED1ng",
    "radical": "\u4EBB (Nh\xE2n \u0111\u1EE9ng)",
    "strokeCount": 11,
    "examples": [
      {
        "zh": "\u4F60\u5728\u505A\u4EC0\u4E48\u5462\uFF1F",
        "pinyin": "N\u01D0 z\xE0i zu\xF2 sh\xE9nme ne?",
        "vi": "B\u1EA1n \u0111ang l\xE0m g\xEC \u0111\u1EA5y?"
      },
      {
        "zh": "\u5988\u5988\u6B63\u5728\u53A8\u623F\u505A\u996D\u3002",
        "pinyin": "M\u0101ma zh\xE8ngz\xE0i ch\xFAf\xE1ng zu\xF2f\xE0n.",
        "vi": "M\u1EB9 \u0111ang \u1EDF trong b\u1EBFp n\u1EA5u c\u01A1m."
      }
    ],
    "tips": "B\u1ED9 Nh\xE2n (\u4EBB) k\u1EBFt h\u1EE3p ch\u1EEF C\u1ED5 (\u53E4) v\xE0 Ph\u1ED9c (\u6535). Con ng\u01B0\u1EDDi b\u1EAFt tay h\xE0nh \u0111\u1ED9ng t\u1EA1o t\xE1c n\xEAn s\u1EF1 vi\u1EC7c."
  },
  {
    "id": "pdf_222",
    "hanzi": "\u559C\u6B22",
    "pinyin": "x\u01D0huan",
    "hanViet": "H\u1EC9 Hoan",
    "vietnamese": "Th\xEDch, y\xEAu th\xEDch, \u01B0ng \xFD",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB t\xE2m l\xFD",
    "level": 1,
    "category": "C\u1EA3m x\xFAc & S\u1EDF th\xEDch",
    "radical": "\u53E3 (Kh\u1EA9u) + \u6B20 (Khi\u1EBFm)",
    "strokeCount": 18,
    "examples": [
      {
        "zh": "\u6211\u5F88\u559C\u6B22\u559D\u4E2D\u56FD\u5976\u8336\u3002",
        "pinyin": "W\u01D2 h\u011Bn x\u01D0huan h\u0113 Zh\u014Dnggu\xF3 n\u01CEich\xE1.",
        "vi": "T\xF4i r\u1EA5t th\xEDch u\u1ED1ng tr\xE0 s\u1EEFa Trung Qu\u1ED1c."
      },
      {
        "zh": "\u4F60\u559C\u6B22\u542C\u4EC0\u4E48\u97F3\u4E50\uFF1F",
        "pinyin": "N\u01D0 x\u01D0huan t\u012Bng sh\xE9nme y\u012Bnyu\xE8?",
        "vi": "B\u1EA1n th\xEDch nghe th\u1EC3 lo\u1EA1i \xE2m nh\u1EA1c n\xE0o?"
      }
    ],
    "tips": "H\u1EC9 (\u559C - ni\u1EC1m vui h\xE2n hoan) + Hoan (\u6B22 - vui m\u1EEBng reo ca m\u1EDF l\xF2ng \u0111\xF3n nh\u1EADn)."
  },
  {
    "id": "pdf_223",
    "hanzi": "\u7231",
    "pinyin": "\xE0i",
    "hanViet": "\xC1i",
    "vietnamese": "Y\xEAu, th\u01B0\u01A1ng, y\xEAu m\u1EBFn, th\xEDch say m\xEA",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB t\xE2m l\xFD",
    "level": 1,
    "category": "C\u1EA3m x\xFAc & T\xECnh c\u1EA3m",
    "radical": "\u722B (Tr\u1EA3o)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u6211\u7231\u6211\u7684\u7238\u7238\u5988\u5988\u3002",
        "pinyin": "W\u01D2 \xE0i w\u01D2 de b\xE0ba m\u0101ma.",
        "vi": "T\xF4i y\xEAu th\u01B0\u01A1ng b\u1ED1 m\u1EB9 t\xF4i tha thi\u1EBFt."
      },
      {
        "zh": "\u4ED6\u5F88\u7231\u770B\u4E66\u548C\u5B66\u4E60\u3002",
        "pinyin": "T\u0101 h\u011Bn \xE0i k\xE0n sh\u016B h\xE9 xu\xE9x\xED.",
        "vi": "C\u1EADu \u1EA5y r\u1EA5t say m\xEA \u0111\u1ECDc s\xE1ch v\xE0 h\u1ECDc t\u1EADp."
      }
    ],
    "tips": "Ch\u1EEF \xC1i ch\u1EE9a \u0111\u1EF1ng t\xECnh c\u1EA3m bao dung n\u1ED3ng h\u1EADu d\xE0nh cho ng\u01B0\u1EDDi th\xE2n v\xE0 cu\u1ED9c s\u1ED1ng. Ph\u1ED3n th\u1EC3: \u611B (c\xF3 b\u1ED9 T\xE2m \u5FC3)."
  },
  {
    "id": "pdf_224",
    "hanzi": "\u4F1A",
    "pinyin": "hu\xEC",
    "hanViet": "H\u1ED9i",
    "vietnamese": "Bi\u1EBFt (qua h\u1ECDc h\u1ECFi r\xE8n luy\u1EC7n), s\u1EBD (x\u1EA3y ra trong t\u01B0\u01A1ng lai)",
    "partOfSpeech": "\u0110\u1ED9ng t\u1EEB n\u0103ng nguy\u1EC7n",
    "level": 1,
    "category": "K\u1EF9 n\u0103ng & N\u0103ng l\u1EF1c",
    "radical": "\u4EBA (Nh\xE2n)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4F60\u4F1A\u8BF4\u6C49\u8BED\u5417\uFF1F\u2014\u2014\u6211\u4F1A\u4E00\u70B9\u513F\u3002",
        "pinyin": "N\u01D0 hu\xEC shu\u014D H\xE0ny\u01D4 ma? \u2014\u2014 W\u01D2 hu\xEC y\xECdi\u01CEnr.",
        "vi": "B\u1EA1n bi\u1EBFt n\xF3i ti\u1EBFng H\xE1n kh\xF4ng? \u2014\u2014 T\xF4i bi\u1EBFt m\u1ED9t ch\xFAt."
      },
      {
        "zh": "\u660E\u5929\u4F1A\u4E0B\u96E8\u5417\uFF1F",
        "pinyin": "M\xEDngti\u0101n hu\xEC xi\xE0y\u01D4 ma?",
        "vi": "Ng\xE0y mai li\u1EC7u c\xF3 m\u01B0a kh\xF4ng?"
      }
    ],
    "tips": "Nh\xE2n (\u4EBA) t\u1EE5 h\u1ED9i r\xE8n luy\u1EC7n ki\u1EBFn th\u1EE9c k\u1EF9 n\u0103ng. Ch\u1EC9 n\u0103ng l\u1EF1c c\xF3 \u0111\u01B0\u1EE3c qua h\u1ECDc t\u1EADp ho\u1EB7c kh\u1EA3 n\u0103ng x\u1EA3y ra."
  },
  {
    "id": "pdf_225",
    "hanzi": "\u597D",
    "pinyin": "h\u01CEo",
    "hanViet": "H\u1EA3o",
    "vietnamese": "T\u1ED1t, \u0111\u1EB9p, kh\u1ECFe, ngon, ho\xE0n th\xE0nh",
    "partOfSpeech": "T\xEDnh t\u1EEB",
    "level": 1,
    "category": "T\xEDnh ch\u1EA5t & Mi\xEAu t\u1EA3",
    "radical": "\u5973 (N\u1EEF) + \u5B50 (T\u1EED)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u8FD9\u672C\u4E66\u975E\u5E38\u597D\uFF01",
        "pinyin": "Zh\xE8 b\u011Bn sh\u016B f\u0113ich\xE1ng h\u01CEo!",
        "vi": "Quy\u1EC3n s\xE1ch n\xE0y c\u1EF1c k\u1EF3 hay!"
      },
      {
        "zh": "\u674E\u8001\u5E08\u662F\u4E00\u4F4D\u597D\u8001\u5E08\u3002",
        "pinyin": "L\u01D0 l\u01CEosh\u012B sh\xEC y\xED w\xE8i h\u01CEo l\u01CEosh\u012B.",
        "vi": "Th\u1EA7y L\xFD l\xE0 m\u1ED9t ng\u01B0\u1EDDi th\u1EA7y gi\xE1o r\u1EA5t t\u1ED1t."
      }
    ],
    "tips": "Ng\u01B0\u1EDDi ph\u1EE5 n\u1EEF N\u1EEF (\u5973) b\xEAn c\u1EA1nh con th\u01A1 T\u1EED (\u5B50). M\u1EB9 con qu\u1EA5n qu\xFDt \u1EA5m \xEAm l\xE0 \u0111i\u1EC1u t\u1ED1t l\xE0nh nh\u1EA5t."
  },
  {
    "id": "pdf_226",
    "hanzi": "\u5927",
    "pinyin": "d\xE0",
    "hanViet": "\u0110\u1EA1i",
    "vietnamese": "To, l\u1EDBn, nhi\u1EC1u tu\u1ED5i",
    "partOfSpeech": "T\xEDnh t\u1EEB mi\xEAu t\u1EA3",
    "level": 1,
    "category": "K\xEDch th\u01B0\u1EDBc & T\xEDnh ch\u1EA5t",
    "radical": "\u5927 (\u0110\u1EA1i)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u8FD9\u4E2A\u82F9\u679C\u5F88\u5927\u5F88\u751C\u3002",
        "pinyin": "Zh\xE8ge p\xEDnggu\u01D2 h\u011Bn d\xE0 h\u011Bn ti\xE1n.",
        "vi": "Qu\u1EA3 t\xE1o n\xE0y r\u1EA5t to v\xE0 r\u1EA5t ng\u1ECDt."
      },
      {
        "zh": "\u8FD9\u6240\u5B66\u6821\u975E\u5E38\u5927\u3002",
        "pinyin": "Zh\xE8 su\u01D2 xu\xE9xi\xE0o f\u0113ich\xE1ng d\xE0.",
        "vi": "Ng\xF4i tr\u01B0\u1EDDng n\xE0y v\xF4 c\xF9ng to l\u1EDBn."
      }
    ],
    "tips": "H\xECnh \u1EA3nh m\u1ED9t ng\u01B0\u1EDDi (\u4EBA) dang r\u1ED9ng hai tay hai ch\xE2n h\u1EBFt c\u1EE1 \u0111\u1EC3 bi\u1EC3u th\u1ECB s\u1EF1 to l\u1EDBn v\u0129 \u0111\u1EA1i."
  },
  {
    "id": "pdf_227",
    "hanzi": "\u5C0F",
    "pinyin": "xi\u01CEo",
    "hanViet": "Ti\u1EC3u",
    "vietnamese": "Nh\u1ECF, b\xE9, \xEDt tu\u1ED5i",
    "partOfSpeech": "T\xEDnh t\u1EEB mi\xEAu t\u1EA3",
    "level": 1,
    "category": "K\xEDch th\u01B0\u1EDBc & T\xEDnh ch\u1EA5t",
    "radical": "\u5C0F (Ti\u1EC3u)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u8FD9\u53EA\u5C0F\u732B\u771F\u53EF\u7231\uFF01",
        "pinyin": "Zh\xE8 zh\u012B xi\u01CEom\u0101o zh\u0113n k\u011B'\xE0i!",
        "vi": "Ch\xFA m\xE8o con n\xE0y \u0111\xE1ng y\xEAu qu\xE1!"
      },
      {
        "zh": "\u623F\u95F4\u6709\u70B9\u513F\u5C0F\uFF0C\u4F46\u662F\u5F88\u5E72\u51C0\u3002",
        "pinyin": "F\xE1ngji\u0101n y\u01D2udi\u01CEnr xi\u01CEo, d\xE0nsh\xEC h\u011Bn g\u0101nj\xECng.",
        "vi": "C\u0103n ph\xF2ng h\u01A1i nh\u1ECF m\u1ED9t ch\xFAt nh\u01B0ng r\u1EA5t s\u1EA1ch s\u1EBD."
      }
    ],
    "tips": "Chia m\u1ED9t v\u1EADt nh\u1ECF b\xE9 ra l\xE0m \u0111\xF4i \u1EDF gi\u1EEFa. Ng\u01B0\u1EE3c ngh\u0129a tr\u1EF1c ti\u1EBFp v\u1EDBi \u5927 (to l\u1EDBn)."
  },
  {
    "id": "pdf_228",
    "hanzi": "\u591A",
    "pinyin": "du\u014D",
    "hanViet": "\u0110a",
    "vietnamese": "Nhi\u1EC1u, v\u01B0\u1EE3t qu\xE1",
    "partOfSpeech": "T\xEDnh t\u1EEB mi\xEAu t\u1EA3",
    "level": 1,
    "category": "S\u1ED1 l\u01B0\u1EE3ng & T\xEDnh ch\u1EA5t",
    "radical": "\u5915 (T\u1ECBch - \u0111\xEAm t\u1ED1i)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u6765\u5F00\u4F1A\u7684\u4EBA\u5F88\u591A\u3002",
        "pinyin": "J\u012Bnti\u0101n l\xE1i k\u0101ihu\xEC de r\xE9n h\u011Bn du\u014D.",
        "vi": "H\xF4m nay ng\u01B0\u1EDDi \u0111\u1EBFn h\u1ECDp r\u1EA5t nhi\u1EC1u."
      },
      {
        "zh": "\u4F60\u591A\u559D\u70B9\u6C34\u5427\u3002",
        "pinyin": "N\u01D0 du\u014D h\u0113 di\u01CEn shu\u01D0 ba.",
        "vi": "B\u1EA1n u\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc th\xEAm m\u1ED9t ch\xFAt nh\xE9."
      }
    ],
    "tips": "Hai ch\u1EEF T\u1ECBch (\u5915) ch\u1ED3ng l\xEAn nhau: \u0111\xEAm n\xE0y qua \u0111\xEAm kh\xE1c tr\xF4i qua th\u1EADt l\xE0 nhi\u1EC1u."
  },
  {
    "id": "pdf_229",
    "hanzi": "\u5C11",
    "pinyin": "sh\u01CEo",
    "hanViet": "Thi\u1EC3u",
    "vietnamese": "\xCDt, thi\u1EBFu th\u1ED1n",
    "partOfSpeech": "T\xEDnh t\u1EEB mi\xEAu t\u1EA3",
    "level": 1,
    "category": "S\u1ED1 l\u01B0\u1EE3ng & T\xEDnh ch\u1EA5t",
    "radical": "\u5C0F (Ti\u1EC3u)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u676F\u5B50\u91CC\u7684\u6C34\u5F88\u5C11\u3002",
        "pinyin": "B\u0113izi l\u01D0 de shu\u01D0 h\u011Bn sh\u01CEo.",
        "vi": "N\u01B0\u1EDBc trong c\u1ED1c c\xF2n r\u1EA5t \xEDt."
      },
      {
        "zh": "\u4ED6\u8BF4\u8BDD\u5F88\u5C11\uFF0C\u505A\u4E8B\u5F88\u8BA4\u771F\u3002",
        "pinyin": "T\u0101 shu\u014Dhu\xE0 h\u011Bn sh\u01CEo, zu\xF2sh\xEC h\u011Bn r\xE8nzh\u0113n.",
        "vi": "Anh \u1EA5y \xEDt khi n\xF3i chuy\u1EC7n, l\xE0m vi\u1EC7c r\u1EA5t nghi\xEAm t\xFAc."
      }
    ],
    "tips": "Ch\u1EEF Ti\u1EC3u (\u5C0F) th\xEAm m\u1ED9t n\xE9t ph\u1EA9y g\u1EA1t \u0111i: \u0111\xE3 nh\u1ECF nay l\u1EA1i c\xE0ng \xEDt \u1ECFi h\u01A1n. Ng\u01B0\u1EE3c v\u1EDBi \u591A."
  },
  {
    "id": "pdf_230",
    "hanzi": "\u70ED",
    "pinyin": "r\xE8",
    "hanViet": "Nhi\u1EC7t",
    "vietnamese": "N\xF3ng (th\u1EDDi ti\u1EBFt, \u0111\u1ED3 \u0103n), nhi\u1EC7t t\xECnh",
    "partOfSpeech": "T\xEDnh t\u1EEB c\u1EA3m gi\xE1c",
    "level": 1,
    "category": "C\u1EA3m gi\xE1c & Th\u1EDDi ti\u1EBFt",
    "radical": "\u706C (H\u1ECFa - b\u1ED1n ch\u1EA5m l\u1EEDa)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u4ECA\u5929\u5929\u6C14\u592A\u70ED\u4E86\uFF01",
        "pinyin": "J\u012Bnti\u0101n ti\u0101nq\xEC t\xE0i r\xE8 le!",
        "vi": "Th\u1EDDi ti\u1EBFt h\xF4m nay n\xF3ng qu\xE1 \u0111i m\u1EA5t!"
      },
      {
        "zh": "\u8BF7\u559D\u676F\u70ED\u8336\u6696\u6696\u8EAB\u5B50\u3002",
        "pinyin": "Q\u01D0ng h\u0113 b\u0113i r\xE8 ch\xE1 nu\u01CEnnuan sh\u0113nzi.",
        "vi": "M\u1EDDi u\u1ED1ng ch\xE9n tr\xE0 n\xF3ng cho \u1EA5m ng\u01B0\u1EDDi."
      }
    ],
    "tips": "Ph\xEDa d\u01B0\u1EDBi l\xE0 4 ch\u1EA5m l\u1EEDa (\u706C) b\u1ED1c nhi\u1EC7t l\u01B0\u1EE3ng h\u1EEBng h\u1EF1c. Ng\u01B0\u1EE3c ngh\u0129a v\u1EDBi \u51B7 (l\u1EA1nh)."
  },
  {
    "id": "pdf_231",
    "hanzi": "\u9AD8\u5174",
    "pinyin": "g\u0101ox\xECng",
    "hanViet": "Cao H\u1EE9ng",
    "vietnamese": "Vui m\u1EEBng, ph\u1EA5n kh\u1EDFi, h\xE2n hoan",
    "partOfSpeech": "T\xEDnh t\u1EEB c\u1EA3m x\xFAc",
    "level": 1,
    "category": "C\u1EA3m x\xFAc & T\xE2m l\xFD",
    "radical": "\u9AD8 (Cao) + \u516B (B\xE1t)",
    "strokeCount": 16,
    "examples": [
      {
        "zh": "\u8BA4\u8BC6\u4F60\uFF0C\u6211\u5F88\u9AD8\u5174\uFF01",
        "pinyin": "R\xE8nshi n\u01D0, w\u01D2 h\u011Bn g\u0101ox\xECng!",
        "vi": "L\xE0m quen v\u1EDBi b\u1EA1n, t\xF4i r\u1EA5t vui l\xF2ng!"
      },
      {
        "zh": "\u542C\u5230\u8FD9\u4E2A\u597D\u6D88\u606F\uFF0C\u5927\u5BB6\u90FD\u9AD8\u5174\u6781\u4E86\u3002",
        "pinyin": "T\u012Bng d\xE0o zh\xE8 ge h\u01CEo xi\u0101oxi, d\xE0ji\u0101 d\u014Du g\u0101ox\xECng j\xED le.",
        "vi": "Nghe \u0111\u01B0\u1EE3c tin t\u1ED1t n\xE0y, m\u1ECDi ng\u01B0\u1EDDi ai n\u1EA5y \u0111\u1EC1u v\xF4 c\xF9ng ph\u1EA5n kh\u1EDFi."
      }
    ],
    "tips": "Cao (\u9AD8 - d\xE2ng cao) + H\u1EE9ng (\u5174 - h\xE0o h\u1EE9ng). T\xE2m tr\u1EA1ng vui t\u01B0\u01A1i h\xE0o h\u1EE9ng d\xE2ng tr\xE0o."
  },
  {
    "id": "pdf_232",
    "hanzi": "\u6F02\u4EAE",
    "pinyin": "pi\xE0oliang",
    "hanViet": "Phi\xEAu L\u01B0\u1EE3ng",
    "vietnamese": "Xinh \u0111\u1EB9p, \u0111\u1EB9p \u0111\u1EBD, m\u1EF9 l\u1EC7, xu\u1EA5t s\u1EAFc",
    "partOfSpeech": "T\xEDnh t\u1EEB mi\xEAu t\u1EA3",
    "level": 1,
    "category": "V\u1EBB \u0111\u1EB9p & Ngo\u1EA1i h\xECnh",
    "radical": "\u6C35 (Th\u1EE7y) + \u4EA0 (\u0110\u1EA7u)",
    "strokeCount": 23,
    "examples": [
      {
        "zh": "\u8FD9\u6761\u65B0\u88D9\u5B50\u771F\u6F02\u4EAE\uFF01",
        "pinyin": "Zh\xE8 ti\xE1o x\u012Bn q\xFAnzi zh\u0113n pi\xE0oliang!",
        "vi": "Chi\u1EBFc v\xE1y m\u1EDBi n\xE0y xinh \u0111\u1EB9p th\u1EADt \u0111\u1EA5y!"
      },
      {
        "zh": "\u90A3\u5EA7\u57CE\u5E02\u7684\u98CE\u666F\u5F88\u6F02\u4EAE\u3002",
        "pinyin": "N\xE0 zu\xF2 ch\xE9ngsh\xEC de f\u0113ngj\u01D0ng h\u011Bn pi\xE0oliang.",
        "vi": "Phong c\u1EA3nh c\u1EE7a th\xE0nh ph\u1ED1 kia r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "Phi\xEAu (\u6F02 - n\u01B0\u1EDBc \xF3ng \xE1nh trong veo) + L\u01B0\u1EE3ng (\u4EAE - t\u01B0\u01A1i s\xE1ng r\u1EA1ng ng\u1EDDi)."
  },
  {
    "id": "pdf_233",
    "hanzi": "\u4E0D",
    "pinyin": "b\xF9",
    "hanViet": "B\u1EA5t",
    "vietnamese": "Kh\xF4ng, ch\u1EB3ng (ph\u1EE7 \u0111\u1ECBnh th\xF4ng th\u01B0\u1EDDng)",
    "partOfSpeech": "Ph\xF3 t\u1EEB ph\u1EE7 \u0111\u1ECBnh",
    "level": 1,
    "category": "Ph\u1EE7 \u0111\u1ECBnh & Ng\u1EEF ph\xE1p",
    "radical": "\u4E00 (Nh\u1EA5t)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u6211\u4E0D\u662F\u8001\u5E08\uFF0C\u6211\u662F\u5B66\u751F\u3002",
        "pinyin": "W\u01D2 b\xFA sh\xEC l\u01CEosh\u012B, w\u01D2 sh\xEC xu\xE9sheng.",
        "vi": "T\xF4i kh\xF4ng ph\u1EA3i l\xE0 gi\xE1o vi\xEAn, t\xF4i l\xE0 h\u1ECDc sinh."
      },
      {
        "zh": "\u4ECA\u5929\u5929\u6C14\u4E0D\u592A\u51B7\u3002",
        "pinyin": "J\u012Bnti\u0101n ti\u0101nq\xEC b\xFA t\xE0i l\u011Bng.",
        "vi": "H\xF4m nay th\u1EDDi ti\u1EBFt kh\xF4ng l\u1EA1nh l\u1EAFm."
      }
    ],
    "tips": "\u0110\u1EE9ng tr\u01B0\u1EDBc thanh 4 \u0111\u1ED5i gi\u1ECDng th\xE0nh 'b\xFA' (vd: \u4E0D\u662F b\xFA sh\xEC, \u4E0D\u8981 b\xFA y\xE0o)."
  },
  {
    "id": "pdf_234",
    "hanzi": "\u6CA1",
    "pinyin": "m\xE9i",
    "hanViet": "M\u1ED9t",
    "vietnamese": "Ch\u01B0a, kh\xF4ng c\xF3 (ph\u1EE7 \u0111\u1ECBnh c\u1EE7a h\xE0nh \u0111\u1ED9ng qu\xE1 kh\u1EE9/c\xF3)",
    "partOfSpeech": "Ph\xF3 t\u1EEB ph\u1EE7 \u0111\u1ECBnh",
    "level": 1,
    "category": "Ph\u1EE7 \u0111\u1ECBnh & Ng\u1EEF ph\xE1p",
    "radical": "\u6C35 (Th\u1EE7y)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u6211\u6628\u5929\u6CA1\u53BB\u4E0A\u8BFE\u3002",
        "pinyin": "W\u01D2 zu\xF3ti\u0101n m\xE9i q\xF9 sh\xE0ngk\xE8.",
        "vi": "H\xF4m qua t\xF4i \u0111\xE3 kh\xF4ng \u0111i h\u1ECDc."
      },
      {
        "zh": "\u4ED6\u8FD8\u6CA1\u5403\u665A\u996D\u5462\u3002",
        "pinyin": "T\u0101 h\xE1i m\xE9i ch\u012B w\u01CEnf\xE0n ne.",
        "vi": "Anh \u1EA5y v\u1EABn c\xF2n ch\u01B0a \u0103n c\u01A1m t\u1ED1i."
      }
    ],
    "tips": "B\u1ED9 Th\u1EE7y (\u6C35) ch\xECm l\u1EC9m kh\xF4ng th\u1EA5y v\u1EBFt t\xEDch. Chuy\xEAn d\xF9ng ph\u1EE7 \u0111\u1ECBnh cho h\xE0nh vi qu\xE1 kh\u1EE9 ho\u1EB7c s\u1EDF h\u1EEFu (\u6CA1\u6709)."
  },
  {
    "id": "pdf_235",
    "hanzi": "\u5F88",
    "pinyin": "h\u011Bn",
    "hanViet": "H\u1EA9n",
    "vietnamese": "R\u1EA5t, l\u1EAFm (ph\xF3 t\u1EEB ch\u1EC9 m\u1EE9c \u0111\u1ED9)",
    "partOfSpeech": "Ph\xF3 t\u1EEB m\u1EE9c \u0111\u1ED9",
    "level": 1,
    "category": "M\u1EE9c \u0111\u1ED9 & Ng\u1EEF ph\xE1p",
    "radical": "\u5F73 (X\xEDch - b\u01B0\u1EDBc ch\xE2n)",
    "strokeCount": 9,
    "examples": [
      {
        "zh": "\u6211\u5F88\u559C\u6B22\u5B66\u4E60\u6C49\u8BED\u3002",
        "pinyin": "W\u01D2 h\u011Bn x\u01D0huan xu\xE9x\xED H\xE0ny\u01D4.",
        "vi": "T\xF4i r\u1EA5t th\xEDch h\u1ECDc ti\u1EBFng H\xE1n."
      },
      {
        "zh": "\u4ECA\u5929\u7684\u5929\u6C14\u5F88\u597D\u3002",
        "pinyin": "J\u012Bnti\u0101n de ti\u0101nq\xEC h\u011Bn h\u01CEo.",
        "vi": "Th\u1EDDi ti\u1EBFt h\xF4m nay r\u1EA5t \u0111\u1EB9p."
      }
    ],
    "tips": "Ph\xF3 t\u1EEB m\u1EE9c \u0111\u1ED9 \u0111\u1EE9ng tr\u01B0\u1EDBc t\xEDnh t\u1EEB, \u0111\xF3ng vai tr\xF2 li\xEAn k\u1EBFt t\u1EF1 nhi\xEAn trong c\xE2u v\u1ECB ng\u1EEF t\xEDnh t\u1EEB."
  },
  {
    "id": "pdf_236",
    "hanzi": "\u592A",
    "pinyin": "t\xE0i",
    "hanViet": "Th\xE1i",
    "vietnamese": "Qu\xE1, l\u1EAFm (th\u01B0\u1EDDng \u0111i v\u1EDBi \u592A...\u4E86)",
    "partOfSpeech": "Ph\xF3 t\u1EEB m\u1EE9c \u0111\u1ED9",
    "level": 1,
    "category": "M\u1EE9c \u0111\u1ED9 & Ng\u1EEF ph\xE1p",
    "radical": "\u5927 (\u0110\u1EA1i)",
    "strokeCount": 4,
    "examples": [
      {
        "zh": "\u8FD9\u4EF6\u8863\u670D\u592A\u6F02\u4EAE\u4E86\uFF01",
        "pinyin": "Zh\xE8 ji\xE0n y\u012Bfu t\xE0i pi\xE0oliang le!",
        "vi": "B\u1ED9 qu\u1EA7n \xE1o n\xE0y \u0111\u1EB9p qu\xE1 \u0111i th\xF4i!"
      },
      {
        "zh": "\u592A\u8C22\u8C22\u4F60\u4E86\uFF0C\u5E2E\u4E86\u6211\u5927\u5FD9\uFF01",
        "pinyin": "T\xE0i xi\xE8xie n\u01D0 le, b\u0101ng le w\u01D2 d\xE0 m\xE1ng!",
        "vi": "C\u1EA3m \u01A1n b\u1EA1n nhi\u1EC1u qu\xE1, \u0111\xE3 gi\xFAp t\xF4i vi\u1EC7c l\u1EDBn!"
      }
    ],
    "tips": "Ch\u1EEF \u0110\u1EA1i (\u5927) th\xEAm d\u1EA5u ch\u1EA5m ph\xEDa d\u01B0\u1EDBi: \u0111\xE3 to l\u1EDBn nay l\u1EA1i v\u01B0\u1EE3t m\u1EE9c. Th\u01B0\u1EDDng k\u1EBFt h\u1EE3p: \u592A...\u4E86 (t\xE0i... le)."
  },
  {
    "id": "pdf_237",
    "hanzi": "\u4E2A",
    "pinyin": "g\xE8",
    "hanViet": "C\xE1",
    "vietnamese": "C\xE1i, con, ng\u01B0\u1EDDi (l\u01B0\u1EE3ng t\u1EEB v\u1EA1n n\u0103ng th\xF4ng d\u1EE5ng nh\u1EA5t)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB chung",
    "level": 1,
    "category": "L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4EBA (Nh\xE2n)",
    "strokeCount": 3,
    "examples": [
      {
        "zh": "\u6211\u5403\u4E86\u4E00\u4E2A\u5927\u82F9\u679C\u3002",
        "pinyin": "W\u01D2 ch\u012B le y\xED g\xE8 d\xE0 p\xEDnggu\u01D2.",
        "vi": "T\xF4i \u0111\xE3 \u0103n m\u1ED9t qu\u1EA3 t\xE1o to."
      },
      {
        "zh": "\u90A3\u4E2A\u4EBA\u662F\u6211\u7684\u4E2D\u56FD\u670B\u53CB\u3002",
        "pinyin": "N\xE0 ge r\xE9n sh\xEC w\u01D2 de Zh\u014Dnggu\xF3 p\xE9ngyou.",
        "vi": "Ng\u01B0\u1EDDi kia l\xE0 ng\u01B0\u1EDDi b\u1EA1n Trung Qu\u1ED1c c\u1EE7a t\xF4i."
      }
    ],
    "tips": "L\u01B0\u1EE3ng t\u1EEB \u0111a n\u0103ng s\u1ED1 1 trong ti\u1EBFng Trung, d\xF9ng cho ng\u01B0\u1EDDi, qu\u1EA3 t\xE1o, ph\xF2ng h\u1ECDc, c\xE2u h\u1ECFi, v\u1EA5n \u0111\u1EC1."
  },
  {
    "id": "pdf_238",
    "hanzi": "\u5C81",
    "pinyin": "su\xEC",
    "hanViet": "Tu\u1EBF",
    "vietnamese": "Tu\u1ED5i (l\u01B0\u1EE3ng t\u1EEB ch\u1EC9 tu\u1ED5i t\xE1c)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB tu\u1ED5i",
    "level": 1,
    "category": "L\u01B0\u1EE3ng t\u1EEB & Tu\u1ED5i t\xE1c",
    "radical": "\u5C71 (S\u01A1n - n\xFAi)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4ED6\u4ECA\u5E74\u4E8C\u5341\u5C81\u4E86\u3002",
        "pinyin": "T\u0101 j\u012Bnni\xE1n \xE8rsh\xED su\xEC le.",
        "vi": "N\u0103m nay c\u1EADu \u1EA5y 20 tu\u1ED5i r\u1ED3i."
      },
      {
        "zh": "\u4F60\u7684\u513F\u5B50\u51E0\u5C81\u4E86\uFF1F",
        "pinyin": "N\u01D0 de \xE9rzi j\u01D0 su\xEC le?",
        "vi": "Con trai b\u1EA1n m\u1EA5y tu\u1ED5i r\u1ED3i?"
      }
    ],
    "tips": "B\u1ED9 S\u01A1n (\u5C71) \u1EDF tr\xEAn ch\u1EEF T\u1ECBch (\u5915). Tu\u1EBF nguy\u1EC7t n\u0103m th\xE1ng tr\xF4i qua c\u1ED9ng th\xEAm m\u1ED9t tu\u1ED5i \u0111\u1EDDi."
  },
  {
    "id": "pdf_239",
    "hanzi": "\u672C",
    "pinyin": "b\u011Bn",
    "hanViet": "B\u1ED5n / B\u1EA3n",
    "vietnamese": "Quy\u1EC3n, cu\u1ED1n (l\u01B0\u1EE3ng t\u1EEB d\xF9ng cho s\xE1ch, v\u1EDF, t\u1EEB \u0111i\u1EC3n)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB",
    "level": 1,
    "category": "L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u6728 (M\u1ED9c)",
    "strokeCount": 5,
    "examples": [
      {
        "zh": "\u6211\u60F3\u4E70\u4E00\u672C\u6C49\u8BED\u8BCD\u5178\u3002",
        "pinyin": "W\u01D2 xi\u01CEng m\u01CEi y\xEC b\u011Bn H\xE0ny\u01D4 c\xEDdi\u01CEn.",
        "vi": "T\xF4i mu\u1ED1n mua m\u1ED9t cu\u1ED1n t\u1EEB \u0111i\u1EC3n ti\u1EBFng H\xE1n."
      },
      {
        "zh": "\u684C\u5B50\u4E0A\u6709\u4E09\u672C\u4E66\u3002",
        "pinyin": "Zhu\u014Dzi shang y\u01D2u s\u0101n b\u011Bn sh\u016B.",
        "vi": "Tr\xEAn b\xE0n c\xF3 3 quy\u1EC3n s\xE1ch."
      }
    ],
    "tips": "G\u1ED1c c\xE2y (\u6728) c\xF3 n\xE9t ngang \u1EDF d\u01B0\u1EDBi ch\u1EC9 r\u1EC5 g\u1ED1c c\u1ED9i ngu\u1ED3n. D\xF9ng l\xE0m l\u01B0\u1EE3ng t\u1EEB cho s\xE1ch v\u1EDF."
  },
  {
    "id": "pdf_240",
    "hanzi": "\u4E9B",
    "pinyin": "xi\u0113",
    "hanViet": "T\u1EC9",
    "vietnamese": "M\u1ED9t v\xE0i, m\u1ED9t s\u1ED1, m\u1ED9t \xEDt (l\u01B0\u1EE3ng t\u1EEB s\u1ED1 nhi\u1EC1u)",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB b\u1EA5t \u0111\u1ECBnh",
    "level": 1,
    "category": "L\u01B0\u1EE3ng t\u1EEB",
    "radical": "\u4E8C (Nh\u1ECB)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u8FD9\u4E9B\u82F9\u679C\u90FD\u5F88\u751C\u3002",
        "pinyin": "Zh\xE8xi\u0113 p\xEDnggu\u01D2 d\u014Du h\u011Bn ti\xE1n.",
        "vi": "Nh\u1EEFng qu\u1EA3 t\xE1o n\xE0y \u0111\u1EC1u r\u1EA5t ng\u1ECDt."
      },
      {
        "zh": "\u6211\u4E70\u4E86\u4E00\u4E9B\u4E66\u548C\u6C34\u679C\u3002",
        "pinyin": "W\u01D2 m\u01CEi le y\xECxi\u0113 sh\u016B h\xE9 shu\u01D0gu\u01D2.",
        "vi": "T\xF4i \u0111\xE3 mua m\u1ED9t v\xE0i quy\u1EC3n s\xE1ch v\xE0 hoa qu\u1EA3."
      }
    ],
    "tips": "Gh\xE9p v\u1EDBi \u8FD9 / \u90A3 th\xE0nh \u8FD9\u4E9B (nh\u1EEFng th\u1EE9 n\xE0y), \u90A3\u4E9B (nh\u1EEFng th\u1EE9 kia), \u4E00\u4E9B (m\u1ED9t v\xE0i/m\u1ED9t s\u1ED1)."
  },
  {
    "id": "pdf_241",
    "hanzi": "\u5757",
    "pinyin": "ku\xE0i",
    "hanViet": "Kh\u1ED1i",
    "vietnamese": "\u0110\u1ED3ng (\u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 kh\u1EA9u ng\u1EEF), mi\u1EBFng, c\u1EE5c, t\u1EA3ng",
    "partOfSpeech": "L\u01B0\u1EE3ng t\u1EEB ti\u1EC1n t\u1EC7 / h\xECnh kh\u1ED1i",
    "level": 1,
    "category": "L\u01B0\u1EE3ng t\u1EEB & Ti\u1EC1n t\u1EC7",
    "radical": "\u571F (Th\u1ED5)",
    "strokeCount": 7,
    "examples": [
      {
        "zh": "\u8FD9\u676F\u5976\u8336\u5341\u4E94\u5757\u94B1\u3002",
        "pinyin": "Zh\xE8 b\u0113i n\u01CEich\xE1 sh\xEDw\u01D4 ku\xE0i qi\xE1n.",
        "vi": "C\u1ED1c tr\xE0 s\u1EEFa n\xE0y 15 \u0111\u1ED3ng."
      },
      {
        "zh": "\u6211\u60F3\u5403\u4E00\u5757\u897F\u74DC\u3002",
        "pinyin": "W\u01D2 xi\u01CEng ch\u012B y\xED ku\xE0i x\u012Bgu\u0101.",
        "vi": "T\xF4i mu\u1ED1n \u0103n m\u1ED9t mi\u1EBFng d\u01B0a h\u1EA5u."
      }
    ],
    "tips": "Kh\u1EA9u ng\u1EEF g\u1ECDi \u0111\u1ED3ng ti\u1EC1n l\xE0 '\u5757' (kh\u1ED1i/t\u1EA3ng b\u1EA1c x\u01B0a). 1 \u5757 = 1 Nguy\xEAn (\u5143)."
  },
  {
    "id": "pdf_242",
    "hanzi": "\u7684",
    "pinyin": "de",
    "hanViet": "\u0110\xEDch",
    "vietnamese": "C\u1EE7a (s\u1EDF h\u1EEFu), m\xE0 (tr\u1EE3 t\u1EEB k\u1EBFt c\u1EA5u \u0111\u1ECBnh ng\u1EEF)",
    "partOfSpeech": "Tr\u1EE3 t\u1EEB k\u1EBFt c\u1EA5u",
    "level": 1,
    "category": "Ng\u1EEF ph\xE1p c\u1ED1t l\xF5i",
    "radical": "\u767D (B\u1EA1ch) + \u52FA (Ch\u01B0\u1EDBc)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u8FD9\u662F\u6211\u7684\u6C49\u8BED\u8001\u5E08\u3002",
        "pinyin": "Zh\xE8 sh\xEC w\u01D2 de H\xE0ny\u01D4 l\u01CEosh\u012B.",
        "vi": "\u0110\xE2y l\xE0 gi\xE1o vi\xEAn ti\u1EBFng H\xE1n c\u1EE7a t\xF4i."
      },
      {
        "zh": "\u5979\u4E70\u4E86\u4E00\u4EF6\u5F88\u6F02\u4EAE\u7684\u8863\u670D\u3002",
        "pinyin": "T\u0101 m\u01CEi le y\xED ji\xE0n h\u011Bn pi\xE0oliang de y\u012Bfu.",
        "vi": "C\xF4 \u1EA5y \u0111\xE3 mua m\u1ED9t b\u1ED9 qu\u1EA7n \xE1o r\u1EA5t xinh \u0111\u1EB9p."
      }
    ],
    "tips": "Tr\u1EE3 t\u1EEB t\u1EA7n su\u1EA5t xu\u1EA5t hi\u1EC7n s\u1ED1 1 trong ti\u1EBFng Trung: A \u7684 B (B c\u1EE7a A, ho\u1EB7c t\xEDnh t\u1EEB + \u7684 + danh t\u1EEB)."
  },
  {
    "id": "pdf_243",
    "hanzi": "\u4E86",
    "pinyin": "le",
    "hanViet": "Li\u1EC5u",
    "vietnamese": "R\u1ED3i (tr\u1EE3 t\u1EEB ng\u1EEF th\xE1i bi\u1EC3u th\u1ECB \u0111\xE3 ho\xE0n th\xE0nh ho\u1EB7c thay \u0111\u1ED5i tr\u1EA1ng th\xE1i)",
    "partOfSpeech": "Tr\u1EE3 t\u1EEB ng\u1EEF kh\xED / Th\u1EDDi th\xE1i",
    "level": 1,
    "category": "Ng\u1EEF ph\xE1p c\u1ED1t l\xF5i",
    "radical": "\u4E59 (\u1EA4t)",
    "strokeCount": 2,
    "examples": [
      {
        "zh": "\u6211\u5403\u8FC7\u665A\u996D\u4E86\u3002",
        "pinyin": "W\u01D2 ch\u012B guo w\u01CEnf\xE0n le.",
        "vi": "T\xF4i \u0111\xE3 \u0103n c\u01A1m t\u1ED1i r\u1ED3i."
      },
      {
        "zh": "\u5929\u6C14\u51B7\u4E86\uFF0C\u591A\u7A7F\u70B9\u8863\u670D\u5427\u3002",
        "pinyin": "Ti\u0101nq\xEC l\u011Bng le, du\u014D chu\u0101n di\u01CEn y\u012Bfu ba.",
        "vi": "Tr\u1EDDi tr\u1EDF l\u1EA1nh r\u1ED3i \u0111\u1EA5y, m\u1EB7c th\xEAm qu\u1EA7n \xE1o v\xE0o nh\xE9."
      }
    ],
    "tips": "\u0110\u1EE9ng sau \u0111\u1ED9ng t\u1EEB bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng \u0111\xE3 ho\xE0n t\u1EA5t, ho\u1EB7c \u0111\u1EE9ng cu\u1ED1i c\xE2u bi\u1EC3u th\u1ECB tr\u1EA1ng th\xE1i m\u1EDBi xu\u1EA5t hi\u1EC7n."
  },
  {
    "id": "pdf_244",
    "hanzi": "\u5417",
    "pinyin": "ma",
    "hanViet": "Ma",
    "vietnamese": "Kh\xF4ng, \xE0, \u01B0, ch\u0103ng (tr\u1EE3 t\u1EEB nghi v\u1EA5n c\xE2u h\u1ECFi c\xF3/kh\xF4ng)",
    "partOfSpeech": "Tr\u1EE3 t\u1EEB nghi v\u1EA5n",
    "level": 1,
    "category": "Nghi v\u1EA5n & Ng\u1EEF ph\xE1p",
    "radical": "\u53E3 (Kh\u1EA9u) + \u9A6C (M\xE3)",
    "strokeCount": 6,
    "examples": [
      {
        "zh": "\u4F60\u662F\u8D8A\u5357\u4EBA\u5417\uFF1F\u2014\u2014\u662F\u7684\u3002",
        "pinyin": "N\u01D0 sh\xEC Yu\xE8n\xE1n r\xE9n ma? \u2014\u2014 Sh\xEC de.",
        "vi": "B\u1EA1n c\xF3 ph\u1EA3i l\xE0 ng\u01B0\u1EDDi Vi\u1EC7t Nam kh\xF4ng? \u2014\u2014 \u0110\xFAng v\u1EADy."
      },
      {
        "zh": "\u4ED6\u4ECA\u5929\u6765\u5B66\u6821\u5417\uFF1F",
        "pinyin": "T\u0101 j\u012Bnti\u0101n l\xE1i xu\xE9xi\xE0o ma?",
        "vi": "H\xF4m nay anh \u1EA5y c\xF3 \u0111\u1EBFn tr\u01B0\u1EDDng kh\xF4ng?"
      }
    ],
    "tips": "\u0110\u1EB7t \u1EDF cu\u1ED1i c\xE2u tr\u1EA7n thu\u1EADt \u0111\u1EC3 bi\u1EBFn c\xE2u th\xE0nh c\xE2u h\u1ECFi Yes/No: ...\u5417\uFF1F"
  },
  {
    "id": "pdf_245",
    "hanzi": "\u5462",
    "pinyin": "ne",
    "hanViet": "Ni",
    "vietnamese": "Nh\xE9, th\xEC sao, \u0111\xE2u r\u1ED3i (tr\u1EE3 t\u1EEB ng\u1EEF kh\xED h\u1ECFi v\u1EAFn t\u1EAFt ho\u1EB7c \u0111ang di\u1EC5n ra)",
    "partOfSpeech": "Tr\u1EE3 t\u1EEB ng\u1EEF kh\xED",
    "level": 1,
    "category": "Ng\u1EEF kh\xED & Ng\u1EEF ph\xE1p",
    "radical": "\u53E3 (Kh\u1EA9u) + \u5C38 (Thi)",
    "strokeCount": 8,
    "examples": [
      {
        "zh": "\u6211\u662F\u5B66\u751F\uFF0C\u4F60\u5462\uFF1F",
        "pinyin": "W\u01D2 sh\xEC xu\xE9sheng, n\u01D0 ne?",
        "vi": "T\xF4i l\xE0 h\u1ECDc sinh, c\xF2n b\u1EA1n th\xEC sao?"
      },
      {
        "zh": "\u6211\u7684\u624B\u673A\u5462\uFF1F\u5728\u8FD9\u513F\u5462\uFF01",
        "pinyin": "W\u01D2 de sh\u01D2uj\u012B ne? Z\xE0i zh\xE8r ne!",
        "vi": "\u0110i\u1EC7n tho\u1EA1i c\u1EE7a t\xF4i \u0111\xE2u r\u1ED3i? \u1EDE \u0111\xE2y n\xE0y!"
      }
    ],
    "tips": "D\xF9ng \u0111\u1EC3 h\u1ECFi ti\u1EBFp n\u1ED1i (A \u5462\uFF1F- C\xF2n A th\xEC sao?), ho\u1EB7c nh\u1EA5n m\u1EA1nh h\xE0nh \u0111\u1ED9ng \u0111ang di\u1EC5n ra (\u5728...\u5462)."
  },
  {
    "id": "pdf_246",
    "hanzi": "\u4E0D\u5BA2\u6C14",
    "pinyin": "b\xFA k\xE8qi",
    "hanViet": "B\u1EA5t Kh\xE1ch Kh\xED",
    "vietnamese": "Kh\xF4ng c\xF3 chi, \u0111\u1EEBng kh\xE1ch s\xE1o (\u0111\xE1p l\u1EA1i l\u1EDDi c\u1EA3m \u01A1n)",
    "partOfSpeech": "C\u1EE5m t\u1EEB giao ti\u1EBFp",
    "level": 1,
    "category": "Giao ti\u1EBFp l\u1ECBch thi\u1EC7p",
    "radical": "\u4E00 (Nh\u1EA5t) + \u5B80 (Mi\xEAn) + \u6C14 (Kh\xED)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u8C22\u8C22\u4F60\u7684\u5E2E\u52A9\uFF01\u2014\u2014\u4E0D\u5BA2\u6C14\u3002",
        "pinyin": "Xi\xE8xie n\u01D0 de b\u0101ngzh\xF9! \u2014\u2014 B\xFA k\xE8qi.",
        "vi": "C\u1EA3m \u01A1n s\u1EF1 gi\xFAp \u0111\u1EE1 c\u1EE7a b\u1EA1n! \u2014\u2014 \u0110\u1EEBng kh\xE1ch s\xE1o nh\xE9."
      },
      {
        "zh": "\u522B\u5BA2\u6C14\uFF0C\u90FD\u662F\u597D\u670B\u53CB\u3002",
        "pinyin": "Bi\xE9 k\xE8qi, d\u014Du sh\xEC h\u01CEo p\xE9ngyou.",
        "vi": "\u0110\u1EEBng kh\xE1ch s\xE1o, \u0111\u1EC1u l\xE0 b\u1EA1n t\u1ED1t c\u1EE7a nhau c\u1EA3 m\xE0."
      }
    ],
    "tips": "L\u1EDDi h\u1ED3i \u0111\xE1p ti\xEAu chu\u1EA9n v\xE0 l\u1ECBch s\u1EF1 nh\u1EA5t m\u1ED7i khi nh\u1EADn \u0111\u01B0\u1EE3c c\xE2u 'C\u1EA3m \u01A1n' (\u8C22\u8C22)."
  },
  {
    "id": "pdf_247",
    "hanzi": "\u518D\u89C1",
    "pinyin": "z\xE0iji\xE0n",
    "hanViet": "T\xE1i Ki\u1EBFn",
    "vietnamese": "T\u1EA1m bi\u1EC7t, h\u1EB9n g\u1EB7p l\u1EA1i",
    "partOfSpeech": "C\u1EE5m t\u1EEB giao ti\u1EBFp",
    "level": 1,
    "category": "Ch\xE0o h\u1ECFi & T\u1EA1m bi\u1EC7t",
    "radical": "\u5182 (Quynh) + \u89C1 (Ki\u1EBFn)",
    "strokeCount": 10,
    "examples": [
      {
        "zh": "\u8001\u5E08\uFF0C\u518D\u89C1\uFF01\u660E\u5929\u89C1\uFF01",
        "pinyin": "L\u01CEosh\u012B, z\xE0iji\xE0n! M\xEDngti\u0101n ji\xE0n!",
        "vi": "Em ch\xE0o th\u1EA7y, t\u1EA1m bi\u1EC7t th\u1EA7y! H\u1EB9n mai g\u1EB7p l\u1EA1i \u1EA1!"
      },
      {
        "zh": "\u592A\u665A\u4E86\uFF0C\u6211\u8981\u56DE\u5BB6\u4E86\uFF0C\u518D\u89C1\uFF01",
        "pinyin": "T\xE0i w\u01CEn le, w\u01D2 y\xE0o hu\xED ji\u0101 le, z\xE0iji\xE0n!",
        "vi": "Mu\u1ED9n qu\xE1 r\u1ED3i, m\xECnh ph\u1EA3i v\u1EC1 nh\xE0 \u0111\xE2y, t\u1EA1m bi\u1EC7t nh\xE9!"
      }
    ],
    "tips": "T\xE1i (\u518D - l\u1EA1i l\u1EA7n n\u1EEFa) + Ki\u1EBFn (\u89C1 - g\u1EB7p g\u1EE1). T\u1EA1m bi\u1EC7t nh\u01B0ng h\u1EB9n ng\xE0y t\u01B0\u01A1ng ph\xF9ng t\u01B0\u01A1i s\xE1ng."
  },
  {
    "id": "pdf_248",
    "hanzi": "\u6CA1\u5173\u7CFB",
    "pinyin": "m\xE9i gu\u0101nxi",
    "hanViet": "M\u1ED9t Quan H\u1EC7",
    "vietnamese": "Kh\xF4ng sao \u0111\xE2u, kh\xF4ng c\xF3 g\xEC (\u0111\xE1p l\u1EA1i l\u1EDDi xin l\u1ED7i)",
    "partOfSpeech": "C\u1EE5m t\u1EEB giao ti\u1EBFp",
    "level": 1,
    "category": "Giao ti\u1EBFp l\u1ECBch thi\u1EC7p",
    "radical": "\u6C35 (Th\u1EE7y) + \u95E8 (M\xF4n) + \u5E7A (Y\xEAu)",
    "strokeCount": 17,
    "examples": [
      {
        "zh": "\u5BF9\u4E0D\u8D77\uFF0C\u6211\u8FDF\u5230\u4E86\u3002\u2014\u2014\u6CA1\u5173\u7CFB\u3002",
        "pinyin": "Du\xECbuq\u01D0, w\u01D2 ch\xEDd\xE0o le. \u2014\u2014 M\xE9i gu\u0101nxi.",
        "vi": "Xin l\u1ED7i, t\xF4i \u0111\u1EBFn mu\u1ED9n m\u1EA5t r\u1ED3i. \u2014\u2014 Kh\xF4ng sao \u0111\xE2u."
      },
      {
        "zh": "\u6253\u6270\u4F60\u4E86\u3002\u2014\u2014\u6CA1\u5173\u7CFB\uFF0C\u8BF7\u8FDB\uFF01",
        "pinyin": "D\u01CEr\u01CEo n\u01D0 le. \u2014\u2014 M\xE9i gu\u0101nxi, q\u01D0ng j\xECn!",
        "vi": "L\xE0m phi\u1EC1n b\u1EA1n r\u1ED3i. \u2014\u2014 Kh\xF4ng h\u1EC1 g\xEC, m\u1EDDi v\xE0o!"
      }
    ],
    "tips": "L\u1EDDi h\u1ED3i \u0111\xE1p bao dung, l\u1ECBch s\u1EF1 nh\u1EA5t m\u1ED7i khi \u0111\u1ED1i ph\u01B0\u01A1ng n\xF3i l\u1EDDi 'Xin l\u1ED7i' (\u5BF9\u4E0D\u8D77)."
  }
];

// src/data/commonVocab.ts
var COMMON_EXTRA_WORDS = [
  {
    hanzi: "\u73B0\u5728",
    pinyin: "xi\xE0nz\xE0i",
    hanViet: "Hi\u1EC7n T\u1EA1i",
    vietnamese: "B\xE2y gi\u1EDD, hi\u1EC7n t\u1EA1i",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u738B (V\u01B0\u01A1ng/Ng\u1ECDc) + \u571F (Th\u1ED5)",
    strokeCount: 14,
    examples: [
      { zh: "\u4F60\u73B0\u5728\u5728\u505A\u4EC0\u4E48\uFF1F", pinyin: "N\u01D0 xi\xE0nz\xE0i z\xE0i zu\xF2 sh\xE9nme?", vi: "B\xE2y gi\u1EDD b\u1EA1n \u0111ang l\xE0m g\xEC \u0111\u1EA5y?" },
      { zh: "\u73B0\u5728\u662F\u5317\u4EAC\u65F6\u95F4\u516B\u70B9\u6574\u3002", pinyin: "Xi\xE0nz\xE0i sh\xEC B\u011Bij\u012Bng sh\xEDji\u0101n b\u0101 di\u01CEn zh\u011Bng.", vi: "B\xE2y gi\u1EDD l\xE0 \u0111\xFAng 8 gi\u1EDD theo gi\u1EDD B\u1EAFc Kinh." }
    ],
    tips: "\u73B0 (Ng\u1ECDc \u738B k\u1EBFt h\u1EE3p Ki\u1EBFn \u89C1: ng\u1ECDc l\u1ED9 ra tr\u01B0\u1EDBc m\u1EAFt l\xE0 hi\u1EC7n t\u1EA1i). \u5728 (B\u1ED9 Th\u1ED5 \u571F ch\u1EC9 s\u1EF1 t\u1ED3n t\u1EA1i \u1EDF n\u01A1i ch\u1ED1n, th\u1EDDi \u0111i\u1EC3m)."
  },
  {
    hanzi: "\u718A\u732B",
    pinyin: "xi\xF3ngm\u0101o",
    hanViet: "H\xF9ng Mi\xEAu",
    vietnamese: "G\u1EA5u tr\xFAc",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED9ng v\u1EADt",
    radical: "\u706C (H\u1ECFa) + \u72AD (Khuy\u1EC3n)",
    strokeCount: 25,
    examples: [
      { zh: "\u5927\u718A\u732B\u662F\u4E2D\u56FD\u56FD\u5B9D\u3002", pinyin: "D\xE0xi\xF3ngm\u0101o sh\xEC zh\u014Dnggu\xF3 gu\xF3b\u01CEo.", vi: "G\u1EA5u tr\xFAc l\u1EDBn l\xE0 qu\u1ED1c b\u1EA3o c\u1EE7a Trung Qu\u1ED1c." },
      { zh: "\u90A3\u53EA\u5C0F\u718A\u732B\u6B63\u5728\u5403\u7AF9\u5B50\u3002", pinyin: "N\xE0 zh\u012B xi\u01CEoxi\xF3ngm\u0101o zh\xE8ngz\xE0i ch\u012B zh\xFAzi.", vi: "Ch\xFA g\u1EA5u tr\xFAc nh\u1ECF kia \u0111ang \u0103n tr\xFAc." }
    ],
    tips: "\u718A (H\xF9ng - lo\xE0i g\u1EA5u to l\u1EDBn c\xF3 4 \u0111\u1ED1m l\u1EEDa \u706C ph\xEDa d\u01B0\u1EDBi). \u732B (Mi\xEAu - b\u1ED9 th\xFA \u72AD k\u1EBFt h\u1EE3p Mi\xEAu \u82D7 k\xEAu meo meo)."
  },
  {
    hanzi: "\u5F00\u5FC3",
    pinyin: "k\u0101ix\u012Bn",
    hanViet: "Khai T\xE2m",
    vietnamese: "Vui v\u1EBB, ph\u1EA5n kh\u1EDFi, h\u1EA1nh ph\xFAc",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m x\xFAc",
    radical: "\u95E8 (M\xF4n) + \u5FC3 (T\xE2m)",
    strokeCount: 8,
    examples: [
      { zh: "\u4ECA\u5929\u6536\u5230\u793C\u7269\uFF0C\u6211\u975E\u5E38\u5F00\u5FC3\uFF01", pinyin: "J\u012Bnti\u0101n sh\u014Dud\xE0o l\u01D0w\xF9, w\u01D2 f\u0113ich\xE1ng k\u0101ix\u012Bn!", vi: "H\xF4m nay nh\u1EADn \u0111\u01B0\u1EE3c qu\xE0, t\xF4i v\xF4 c\xF9ng vui s\u01B0\u1EDBng!" },
      { zh: "\u795D\u4F60\u6BCF\u5929\u90FD\u5F00\u5F00\u5FC3\u5FC3\u3002", pinyin: "Zh\xF9 n\u01D0 m\u011Biti\u0101n d\u014Du k\u0101ik\u0101ix\u012Bnx\u012Bn.", vi: "Ch\xFAc b\u1EA1n m\u1ED7i ng\xE0y \u0111\u1EC1u tr\xE0n ng\u1EADp ni\u1EC1m vui." }
    ],
    tips: "\u5F00 (Khai - m\u1EDF ra c\xE1nh c\u1EEDa \u0111\xF3n n\u1EAFng). \u5FC3 (T\xE2m - tr\xE1i tim). M\u1EDF r\u1ED9ng t\u1EA5m l\xF2ng th\xEC t\u1EF1 kh\u1EAFc th\u1EA5y vui t\u01B0\u01A1i, h\u1EA1nh ph\xFAc."
  },
  {
    hanzi: "\u52AA\u529B",
    pinyin: "n\u01D4l\xEC",
    hanViet: "N\u1ED7 L\u1EF1c",
    vietnamese: "C\u1ED1 g\u1EAFng, ch\u0103m ch\u1EC9, n\u1ED7 l\u1EF1c",
    partOfSpeech: "T\xEDnh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "Ph\u1EA9m ch\u1EA5t & H\xE0nh vi",
    radical: "\u5973 (N\u1EEF) + \u529B (L\u1EF1c)",
    strokeCount: 9,
    examples: [
      { zh: "\u53EA\u8981\u52AA\u529B\uFF0C\u5C31\u4E00\u5B9A\u4F1A\u6210\u529F\u3002", pinyin: "Zh\u01D0y\xE0o n\u01D4l\xEC, ji\xF9 y\xEDd\xECng hu\xEC ch\xE9ngg\u014Dng.", vi: "Ch\u1EC9 c\u1EA7n c\u1ED1 g\u1EAFng, nh\u1EA5t \u0111\u1ECBnh s\u1EBD th\xE0nh c\xF4ng." },
      { zh: "\u4ED6\u5B66\u4E2D\u6587\u975E\u5E38\u52AA\u529B\u3002", pinyin: "T\u0101 xu\xE9 zh\u014Dngw\xE9n f\u0113ich\xE1ng n\u01D4l\xEC.", vi: "C\u1EADu \u1EA5y h\u1ECDc ti\u1EBFng Trung r\u1EA5t ch\u0103m ch\u1EC9." }
    ],
    tips: "\u52AA g\u1ED3m N\xF4 (\u5974) v\xE0 L\u1EF1c (\u529B), d\u1ED3n to\xE0n b\u1ED9 s\u1EE9c l\u1EF1c ph\u1EA5n \u0111\u1EA5u kh\xF4ng ng\u1EEBng ngh\u1EC9."
  },
  {
    hanzi: "\u82F9\u679C",
    pinyin: "p\xEDnggu\u01D2",
    hanViet: "B\xECnh Qu\u1EA3",
    vietnamese: "Qu\u1EA3 t\xE1o",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED3 \u0103n th\u1EE9c u\u1ED1ng",
    radical: "\u8279 (Th\u1EA3o)",
    strokeCount: 16,
    examples: [
      { zh: "\u6211\u559C\u6B22\u5403\u7EA2\u82F9\u679C\u3002", pinyin: "W\u01D2 x\u01D0hu\u0101n ch\u012B h\xF3ng p\xEDnggu\u01D2.", vi: "T\xF4i th\xEDch \u0103n t\xE1o \u0111\u1ECF." },
      { zh: "\u8FD9\u4E2A\u82F9\u679C\u5F88\u751C\u3002", pinyin: "Zh\xE8ge p\xEDnggu\u01D2 h\u011Bn ti\xE1n.", vi: "Qu\u1EA3 t\xE1o n\xE0y r\u1EA5t ng\u1ECDt." }
    ],
    tips: "Ch\u1EEF \u82F9 c\xF3 b\u1ED9 Th\u1EA3o (\u8279) ch\u1EC9 th\u1EF1c v\u1EADt. Ch\u1EEF \u679C v\u1EBD h\xECnh c\xE2y c\xF3 qu\u1EA3 tr\xF2n tr\u0129u tr\u1ECBt tr\xEAn c\xE0nh."
  },
  {
    hanzi: "\u5496\u5561",
    pinyin: "k\u0101f\u0113i",
    hanViet: "C\xE0 Ph\xEA",
    vietnamese: "C\xE0 ph\xEA",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 \u0103n th\u1EE9c u\u1ED1ng",
    radical: "\u53E3 (Kh\u1EA9u)",
    strokeCount: 16,
    examples: [
      { zh: "\u4F60\u60F3\u559D\u5496\u5561\u5417\uFF1F", pinyin: "N\u01D0 xi\u01CEng h\u0113 k\u0101f\u0113i ma?", vi: "B\u1EA1n mu\u1ED1n u\u1ED1ng c\xE0 ph\xEA kh\xF4ng?" },
      { zh: "\u6211\u6BCF\u5929\u65E9\u4E0A\u559D\u4E00\u676F\u70ED\u5496\u5561\u3002", pinyin: "W\u01D2 m\u011Biti\u0101n z\u01CEoshang h\u0113 y\xEC b\u0113i r\xE8 k\u0101f\u0113i.", vi: "T\xF4i u\u1ED1ng m\u1ED9t c\u1ED1c c\xE0 ph\xEA n\xF3ng m\u1ED7i s\xE1ng." }
    ],
    tips: "C\u1EA3 hai ch\u1EEF \u0111\u1EC1u c\xF3 b\u1ED9 Kh\u1EA9u (\u53E3) v\xEC l\xE0 \u0111\u1ED3 u\u1ED1ng b\u1EB1ng mi\u1EC7ng, m\u01B0\u1EE3n \xE2m t\u1EEB ti\u1EBFng Anh 'coffee'."
  },
  {
    hanzi: "\u624B\u673A",
    pinyin: "sh\u01D2uj\u012B",
    hanViet: "Th\u1EE7 C\u01A1",
    vietnamese: "\u0110i\u1EC7n tho\u1EA1i di \u0111\u1ED9ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "C\xF4ng ngh\u1EC7 \u0111\u1EDDi s\u1ED1ng",
    radical: "\u624B (Th\u1EE7) + \u6728 (M\u1ED9c)",
    strokeCount: 10,
    examples: [
      { zh: "\u8FD9\u662F\u6211\u7684\u65B0\u624B\u673A\u3002", pinyin: "Zh\xE8 sh\xEC w\u01D2 de x\u012Bn sh\u01D2uj\u012B.", vi: "\u0110\xE2y l\xE0 chi\u1EBFc \u0111i\u1EC7n tho\u1EA1i m\u1EDBi c\u1EE7a t\xF4i." },
      { zh: "\u4ED6\u5728\u770B\u624B\u673A\u3002", pinyin: "T\u0101 z\xE0i k\xE0n sh\u01D2uj\u012B.", vi: "Anh \u1EA5y \u0111ang xem \u0111i\u1EC7n tho\u1EA1i." }
    ],
    tips: "\u624B (Th\u1EE7 - b\xE0n tay) + \u673A (C\u01A1 - m\xE1y m\xF3c): chi\u1EBFc m\xE1y c\u1EA7m tr\xEAn tay \u0111\u1EC3 li\xEAn l\u1EA1c."
  },
  {
    hanzi: "\u7535\u8111",
    pinyin: "di\xE0nn\u01CEo",
    hanViet: "\u0110i\u1EC7n N\xE3o",
    vietnamese: "M\xE1y vi t\xEDnh",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "C\xF4ng ngh\u1EC7 \u0111\u1EDDi s\u1ED1ng",
    radical: "\u7535 (\u0110i\u1EC7n) + \u6708 (Nh\u1EE5c/N\xE3o)",
    strokeCount: 16,
    examples: [
      { zh: "\u6211\u7528\u7535\u8111\u5DE5\u4F5C\u3002", pinyin: "W\u01D2 y\xF2ng di\xE0nn\u01CEo g\u014Dngzu\xF2.", vi: "T\xF4i d\xF9ng m\xE1y t\xEDnh \u0111\u1EC3 l\xE0m vi\u1EC7c." },
      { zh: "\u8FD9\u53F0\u7535\u8111\u5F88\u597D\u7528\u3002", pinyin: "Zh\xE8 t\xE1i di\xE0nn\u01CEo h\u011Bn h\u01CEoy\xF2ng.", vi: "Chi\u1EBFc m\xE1y t\xEDnh n\xE0y r\u1EA5t d\u1EC5 d\xF9ng." }
    ],
    tips: "\u7535 (\u0110i\u1EC7n l\u1EF1c) + \u8111 (B\u1ED9 n\xE3o): b\u1ED9 n\xE3o \u0111i\u1EC7n t\u1EED x\u1EED l\xFD th\xF4ng tin th\xF4ng minh."
  },
  {
    hanzi: "\u6C7D\u8F66",
    pinyin: "q\xECch\u0113",
    hanViet: "Kh\xED Xa",
    vietnamese: "Xe h\u01A1i, xe \xF4 t\xF4",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Giao th\xF4ng",
    radical: "\u6C35 (Th\u1EE7y) + \u8F66 (Xa)",
    strokeCount: 11,
    examples: [
      { zh: "\u4ED6\u4E70\u4E86\u4E00\u8F86\u65B0\u6C7D\u8F66\u3002", pinyin: "T\u0101 m\u01CEi le y\xED li\xE0ng x\u012Bn q\xECch\u0113.", vi: "Anh \u1EA5y \u0111\xE3 mua m\u1ED9t chi\u1EBFc xe h\u01A1i m\u1EDBi." },
      { zh: "\u8DEF\u4E0A\u6709\u5F88\u591A\u6C7D\u8F66\u3002", pinyin: "L\xF9 shang y\u01D2u h\u011Bn du\u014D q\xECch\u0113.", vi: "Tr\xEAn \u0111\u01B0\u1EDDng c\xF3 r\u1EA5t nhi\u1EC1u \xF4 t\xF4." }
    ],
    tips: "\u6C7D (H\u01A1i n\u01B0\u1EDBc, \u0111\u1ED9ng c\u01A1) + \u8F66 (B\xE1nh xe, xe c\u1ED9): c\u1ED7 xe chuy\u1EC3n \u0111\u1ED9ng nh\u1EDD \u0111\u1ED9ng c\u01A1."
  },
  {
    hanzi: "\u98DE\u673A",
    pinyin: "f\u0113ij\u012B",
    hanViet: "Phi C\u01A1",
    vietnamese: "M\xE1y bay",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Giao th\xF4ng",
    radical: "\u98DE (Phi) + \u6728 (M\u1ED9c)",
    strokeCount: 9,
    examples: [
      { zh: "\u6211\u5750\u98DE\u673A\u53BB\u5317\u4EAC\u3002", pinyin: "W\u01D2 zu\xF2 f\u0113ij\u012B q\xF9 B\u011Bij\u012Bng.", vi: "T\xF4i \u0111i m\xE1y bay \u0111\u1EBFn B\u1EAFc Kinh." },
      { zh: "\u98DE\u673A\u51C6\u65F6\u8D77\u98DE\u4E86\u3002", pinyin: "F\u0113ij\u012B zh\u01D4nsh\xED q\u01D0f\u0113i le.", vi: "M\xE1y bay \u0111\xE3 c\u1EA5t c\xE1nh \u0111\xFAng gi\u1EDD." }
    ],
    tips: "\u98DE (Phi - bay) + \u673A (C\u01A1 - c\u1ED7 m\xE1y): c\u1ED7 m\xE1y bay l\u01B0\u1EE3n tr\xEAn b\u1EA7u tr\u1EDDi."
  },
  {
    hanzi: "\u4ECA\u5929",
    pinyin: "j\u012Bnti\u0101n",
    hanViet: "Kim Thi\xEAn",
    vietnamese: "H\xF4m nay",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u4EBA (Nh\xE2n) + \u5927 (\u0110\u1EA1i)",
    strokeCount: 8,
    examples: [
      { zh: "\u4ECA\u5929\u662F\u4E2A\u597D\u65E5\u5B50\u3002", pinyin: "J\u012Bnti\u0101n sh\xEC ge h\u01CEo r\xECzi.", vi: "H\xF4m nay l\xE0 m\u1ED9t ng\xE0y tuy\u1EC7t v\u1EDDi." },
      { zh: "\u4F60\u4ECA\u5929\u53BB\u5B66\u6821\u5417\uFF1F", pinyin: "N\u01D0 j\u012Bnti\u0101n q\xF9 xu\xE9xi\xE0o ma?", vi: "H\xF4m nay b\u1EA1n c\xF3 \u0111i h\u1ECDc kh\xF4ng?" }
    ],
    tips: "\u4ECA (Kim - th\u1EDDi nay, hi\u1EC7n t\u1EA1i) + \u5929 (Thi\xEAn - ng\xE0y, tr\u1EDDi): ng\xE0y hi\u1EC7n t\u1EA1i."
  },
  {
    hanzi: "\u660E\u5929",
    pinyin: "m\xEDngti\u0101n",
    hanViet: "Minh Thi\xEAn",
    vietnamese: "Ng\xE0y mai",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u65E5 (Nh\u1EADt) + \u5927 (\u0110\u1EA1i)",
    strokeCount: 12,
    examples: [
      { zh: "\u660E\u5929\u89C1\uFF01", pinyin: "M\xEDngti\u0101n ji\xE0n!", vi: "H\u1EB9n g\u1EB7p l\u1EA1i v\xE0o ng\xE0y mai!" },
      { zh: "\u660E\u5929\u5929\u6C14\u600E\u4E48\u6837\uFF1F", pinyin: "M\xEDngti\u0101n ti\u0101nq\xEC z\u011Bnmey\xE0ng?", vi: "Ng\xE0y mai th\u1EDDi ti\u1EBFt th\u1EBF n\xE0o?" }
    ],
    tips: "\u660E (Nh\u1EADt \u65E5 + Nguy\u1EC7t \u6708 = s\xE1ng s\u1EE7a, ng\xE0y s\xE1ng ti\u1EBFp theo) + \u5929 (Ng\xE0y)."
  },
  {
    hanzi: "\u6628\u5929",
    pinyin: "zu\xF3ti\u0101n",
    hanViet: "T\u1EA1c Thi\xEAn",
    vietnamese: "H\xF4m qua",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u65E5 (Nh\u1EADt)",
    strokeCount: 13,
    examples: [
      { zh: "\u6628\u5929\u6211\u4E70\u4E86\u4E00\u672C\u4E66\u3002", pinyin: "Zu\xF3ti\u0101n w\u01D2 m\u01CEi le y\xEC b\u011Bn sh\u016B.", vi: "H\xF4m qua t\xF4i \u0111\xE3 mua m\u1ED9t cu\u1ED1n s\xE1ch." },
      { zh: "\u6628\u5929\u665A\u4E0A\u4E0B\u96E8\u4E86\u3002", pinyin: "Zu\xF3ti\u0101n w\u01CEnshang xi\xE0y\u01D4 le.", vi: "T\u1ED1i h\xF4m qua tr\u1EDDi \u0111\xE3 \u0111\u1ED5 m\u01B0a." }
    ],
    tips: "\u6628 c\xF3 b\u1ED9 Nh\u1EADt (\u65E5) k\u1EBFt h\u1EE3p Tr\u1EA1 (\u4E4D): m\u1EB7t tr\u1EDDi c\u1EE7a ng\xE0y v\u1EEBa l\u01B0\u1EDBt qua."
  },
  {
    hanzi: "\u65E9\u4E0A",
    pinyin: "z\u01CEoshang",
    hanViet: "T\u1EA3o Th\u01B0\u1EE3ng",
    vietnamese: "Bu\u1ED5i s\xE1ng, s\xE1ng s\u1EDBm",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u65E5 (Nh\u1EADt) + \u4E00 (Nh\u1EA5t)",
    strokeCount: 9,
    examples: [
      { zh: "\u65E9\u4E0A\u597D\uFF0C\u674E\u8001\u5E08\uFF01", pinyin: "Z\u01CEoshang h\u01CEo, L\u01D0 l\u01CEosh\u012B!", vi: "Ch\xE0o bu\u1ED5i s\xE1ng th\u1EA7y L\xFD!" },
      { zh: "\u6211\u6BCF\u5929\u65E9\u4E0A\u516D\u70B9\u8D77\u5E8A\u3002", pinyin: "W\u01D2 m\u011Biti\u0101n z\u01CEoshang li\xF9 di\u01CEn q\u01D0chu\xE1ng.", vi: "M\u1ED7i s\xE1ng t\xF4i th\u1EE9c d\u1EADy l\xFAc s\xE1u gi\u1EDD." }
    ],
    tips: "\u65E9 g\u1ED3m Nh\u1EADt (\u65E5 - m\u1EB7t tr\u1EDDi) m\u1ECDc tr\xEAn m\u1EA7m c\u1ECF Th\u1EADp (\u5341)."
  },
  {
    hanzi: "\u665A\u4E0A",
    pinyin: "w\u01CEnshang",
    hanViet: "V\xE3n Th\u01B0\u1EE3ng",
    vietnamese: "Bu\u1ED5i t\u1ED1i, ban \u0111\xEAm",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Th\u1EDDi gian",
    radical: "\u65E5 (Nh\u1EADt) + \u4E00 (Nh\u1EA5t)",
    strokeCount: 14,
    examples: [
      { zh: "\u4ECA\u5929\u665A\u4E0A\u6211\u4EEC\u4E00\u8D77\u770B\u7535\u5F71\u5427\u3002", pinyin: "J\u012Bnti\u0101n w\u01CEnshang w\u01D2men y\xECq\u01D0 k\xE0n di\xE0ny\u01D0ng ba.", vi: "T\u1ED1i nay ch\xFAng m\xECnh c\xF9ng xem phim nh\xE9." },
      { zh: "\u665A\u4E0A\u597D\uFF01", pinyin: "W\u01CEnshang h\u01CEo!", vi: "Ch\xE0o bu\u1ED5i t\u1ED1i!" }
    ],
    tips: "\u665A c\xF3 b\u1ED9 Nh\u1EADt (\u65E5) v\xE0 Mi\u1EC5n (\u514D): m\u1EB7t tr\u1EDDi l\u1EB7n tr\xE1nh sang m\u1ED9t b\xEAn nh\u01B0\u1EDDng ch\u1ED7 cho b\xF3ng t\u1ED1i."
  },
  {
    hanzi: "\u8C22\u8C22",
    pinyin: "xi\xE8xie",
    hanViet: "T\u1EA1 T\u1EA1",
    vietnamese: "C\u1EA3m \u01A1n",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Th\xE1n t\u1EEB",
    level: 1,
    category: "Giao ti\u1EBFp",
    radical: "\u8BA0 (Ng\xF4n)",
    strokeCount: 24,
    examples: [
      { zh: "\u8C22\u8C22\u4F60\u7684\u70ED\u60C5\u5E2E\u52A9\uFF01", pinyin: "Xi\xE8xie n\u01D0 de r\xE8q\xEDng b\u0101ngzh\xF9!", vi: "C\u1EA3m \u01A1n s\u1EF1 gi\xFAp \u0111\u1EE1 nhi\u1EC7t t\xECnh c\u1EE7a b\u1EA1n!" },
      { zh: "\u4E0D\u7528\u8C22\uFF0C\u8FD9\u662F\u6211\u5E94\u8BE5\u505A\u7684\u3002", pinyin: "B\xFAy\xF2ng xi\xE8, zh\xE8 sh\xEC w\u01D2 y\u012Bngg\u0101i zu\xF2 de.", vi: "Kh\xF4ng c\xF3 chi, \u0111\xE2y l\xE0 vi\u1EC7c t\xF4i n\xEAn l\xE0m." }
    ],
    tips: "\u8C22 c\xF3 b\u1ED9 Ng\xF4n (\u8BA0- l\u1EDDi n\xF3i), Th\xE2n (\u8EAB - c\xFAi m\xECnh) v\xE0 Th\u1ED1n (\u5BF8 - m\u1EF1c th\u01B0\u1EDBc): l\u1EDDi c\u1EA3m \u01A1n cung k\xEDnh."
  },
  {
    hanzi: "\u518D\u89C1",
    pinyin: "z\xE0iji\xE0n",
    hanViet: "T\xE1i Ki\u1EBFn",
    vietnamese: "T\u1EA1m bi\u1EC7t, h\u1EB9n g\u1EB7p l\u1EA1i",
    partOfSpeech: "Th\xE1n t\u1EEB",
    level: 1,
    category: "Giao ti\u1EBFp",
    radical: "\u5182 (Quynh) + \u89C1 (Ki\u1EBFn)",
    strokeCount: 10,
    examples: [
      { zh: "\u8001\u5E08\u518D\u89C1\uFF0C\u660E\u5929\u89C1\uFF01", pinyin: "L\u01CEosh\u012B z\xE0iji\xE0n, m\xEDngti\u0101n ji\xE0n!", vi: "Em ch\xE0o th\u1EA7y \u1EA1, h\u1EB9n mai g\u1EB7p l\u1EA1i th\u1EA7y!" },
      { zh: "\u6211\u4EEC\u8981\u51FA\u53D1\u4E86\uFF0C\u518D\u89C1\uFF01", pinyin: "W\u01D2men y\xE0o ch\u016Bf\u0101 le, z\xE0iji\xE0n!", vi: "Ch\xFAng t\xF4i ph\u1EA3i xu\u1EA5t ph\xE1t r\u1ED3i, t\u1EA1m bi\u1EC7t nh\xE9!" }
    ],
    tips: "\u518D (T\xE1i - th\xEAm l\u1EA7n n\u1EEFa) + \u89C1 (Ki\u1EBFn - nh\xECn th\u1EA5y, g\u1EB7p m\u1EB7t): h\u1EB9n ng\xE0y t\u01B0\u01A1ng ng\u1ED9."
  },
  {
    hanzi: "\u5BF9\u4E0D\u8D77",
    pinyin: "du\xECbuq\u01D0",
    hanViet: "\u0110\u1ED1i B\u1EA5t Kh\u1EDFi",
    vietnamese: "Xin l\u1ED7i",
    partOfSpeech: "C\u1EE5m t\u1EEB / Th\xE1n t\u1EEB",
    level: 1,
    category: "Giao ti\u1EBFp",
    radical: "\u5BF8 (Th\u1ED1n) + \u8D70 (T\u1EA9u)",
    strokeCount: 18,
    examples: [
      { zh: "\u5BF9\u4E0D\u8D77\uFF0C\u6211\u8FDF\u5230\u4E86\u3002", pinyin: "Du\xECbuq\u01D0, w\u01D2 ch\xEDd\xE0o le.", vi: "Xin l\u1ED7i, t\xF4i \u0111\u1EBFn mu\u1ED9n m\u1EA5t r\u1ED3i." },
      { zh: "\u6CA1\u5173\u7CFB\uFF0C\u8BF7\u8FDB\u5427\u3002", pinyin: "M\xE9igu\u0101nxi, q\u01D0ng j\xECn ba.", vi: "Kh\xF4ng sao \u0111\xE2u, m\u1EDDi b\u1EA1n v\xE0o." }
    ],
    tips: "\u5BF9 (\u0110\u1ED1i di\u1EC7n) + \u4E0D\u8D77 (Kh\xF4ng ng\u1EA9ng \u0111\u1EA7u l\xEAn n\u1ED5i v\xEC \xE1y n\xE1y): b\xE0y t\u1ECF l\u1EDDi xin l\u1ED7i ch\xE2n th\xE0nh."
  },
  {
    hanzi: "\u6CA1\u5173\u7CFB",
    pinyin: "m\xE9igu\u0101nxi",
    hanViet: "M\u1ED9t Quan H\u1EC7",
    vietnamese: "Kh\xF4ng sao \u0111\xE2u, kh\xF4ng c\xF3 g\xEC",
    partOfSpeech: "C\u1EE5m t\u1EEB",
    level: 1,
    category: "Giao ti\u1EBFp",
    radical: "\u6C35 (Th\u1EE7y) + \u95E8 (M\xF4n)",
    strokeCount: 17,
    examples: [
      { zh: "\u6CA1\u5173\u7CFB\uFF0C\u8FD9\u53EA\u662F\u4E00\u4EF6\u5C0F\u4E8B\u3002", pinyin: "M\xE9igu\u0101nxi, zh\xE8 zh\u01D0sh\xEC y\xED ji\xE0n xi\u01CEosh\xEC.", vi: "Kh\xF4ng sao \u0111\xE2u, \u0111\xE2y ch\u1EC9 l\xE0 vi\u1EC7c nh\u1ECF th\xF4i m\xE0." },
      { zh: "A: \u5BF9\u4E0D\u8D77\uFF01 B: \u6CA1\u5173\u7CFB\uFF01", pinyin: "A: Du\xECbuq\u01D0! B: M\xE9igu\u0101nxi!", vi: "A: Xin l\u1ED7i nh\xE9! B: Kh\xF4ng c\xF3 g\xEC \u0111\xE2u!" }
    ],
    tips: "\u6CA1 (Kh\xF4ng c\xF3) + \u5173\u7CFB (M\u1ED1i li\xEAn h\u1EC7/\u1EA3nh h\u01B0\u1EDFng): kh\xF4ng \u1EA3nh h\u01B0\u1EDFng g\xEC, kh\xF4ng c\xF3 g\xEC \u0111\xE1ng b\u1EADn t\xE2m."
  },
  {
    hanzi: "\u8BA4\u8BC6",
    pinyin: "r\xE8nshi",
    hanViet: "Nh\u1EADn Th\u1EE9c",
    vietnamese: "Quen bi\u1EBFt, nh\u1EADn bi\u1EBFt",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 1,
    category: "Giao ti\u1EBFp",
    radical: "\u8BA0 (Ng\xF4n)",
    strokeCount: 9,
    examples: [
      { zh: "\u5F88\u9AD8\u5174\u8BA4\u8BC6\u4F60\uFF01", pinyin: "H\u011Bn g\u0101ox\xECng r\xE8nshi n\u01D0!", vi: "R\u1EA5t vui \u0111\u01B0\u1EE3c l\xE0m quen v\u1EDBi b\u1EA1n!" },
      { zh: "\u4F60\u8BA4\u8BC6\u90A3\u4E2A\u7A7F\u767D\u886C\u886B\u7684\u4EBA\u5417\uFF1F", pinyin: "N\u01D0 r\xE8nshi n\xE0ge chu\u0101n b\xE1i ch\xE8nsh\u0101n de r\xE9n ma?", vi: "B\u1EA1n c\xF3 quen ng\u01B0\u1EDDi m\u1EB7c \xE1o s\u01A1 mi tr\u1EAFng kia kh\xF4ng?" }
    ],
    tips: "\u8BA4 (B\u1ED9 Ng\xF4n \u8BA0 + Nh\xE2n \u4EBA). \u8BC6 (B\u1ED9 Ng\xF4n \u8BA0 + Ch\u1EC9 \u53EA). D\xF9ng l\u1EDDi n\xF3i nh\u1EADn di\u1EC7n v\xE0 hi\u1EC3u r\xF5 nhau."
  },
  {
    hanzi: "\u660E\u767D",
    pinyin: "m\xEDngbai",
    hanViet: "Minh B\u1EA1ch",
    vietnamese: "Hi\u1EC3u r\xF5, r\xF5 r\xE0ng",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "Nh\u1EADn th\u1EE9c",
    radical: "\u65E5 (Nh\u1EADt) + \u767D (B\u1EA1ch)",
    strokeCount: 13,
    examples: [
      { zh: "\u4F60\u660E\u767D\u6211\u7684\u610F\u601D\u4E86\u5417\uFF1F", pinyin: "N\u01D0 m\xEDngbai w\u01D2 de y\xECsi le ma?", vi: "B\u1EA1n \u0111\xE3 hi\u1EC3u \xFD t\xF4i ch\u01B0a?" },
      { zh: "\u6211\u5DF2\u7ECF\u542C\u660E\u767D\u4E86\u3002", pinyin: "W\u01D2 y\u01D0j\u012Bng t\u012Bng m\xEDngbai le.", vi: "T\xF4i \u0111\xE3 nghe v\xE0 hi\u1EC3u r\xF5 r\u1ED3i." }
    ],
    tips: "\u660E (S\xE1ng s\u1EE7a, th\u1EA5u su\u1ED1t) + \u767D (Tr\u1EAFng tinh, minh b\u1EA1ch): m\u1ECDi vi\u1EC7c s\xE1ng t\u1ECF, hi\u1EC3u th\u1EA5u t\xE2m \xFD."
  },
  {
    hanzi: "\u5B66\u4E60",
    pinyin: "xu\xE9x\xED",
    hanViet: "H\u1ECDc T\u1EADp",
    vietnamese: "H\u1ECDc t\u1EADp, h\u1ECDc h\u1ECFi",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 1,
    category: "H\u1ECDc t\u1EADp",
    radical: "\u5B50 (T\u1EED) + \u4E59 (\u1EA4t)",
    strokeCount: 11,
    examples: [
      { zh: "\u6211\u4EEC\u52AA\u529B\u5B66\u4E60\u4E2D\u6587\u3002", pinyin: "W\u01D2men n\u01D4l\xEC xu\xE9x\xED zh\u014Dngw\xE9n.", vi: "Ch\xFAng t\xF4i c\u1ED1 g\u1EAFng h\u1ECDc ti\u1EBFng Trung." },
      { zh: "\u6BCF\u5929\u5B66\u4E60\u4E00\u70B9\u70B9\uFF0C\u8FDB\u6B65\u770B\u5F97\u89C1\u3002", pinyin: "M\u011Biti\u0101n xu\xE9x\xED y\xEC di\u01CEndi\u01CEn, j\xECnb\xF9 k\xE0n de ji\xE0n.", vi: "M\u1ED7i ng\xE0y h\u1ECDc m\u1ED9t ch\xFAt, ti\u1EBFn b\u1ED9 s\u1EBD th\u1EA5y r\xF5." }
    ],
    tips: "\u5B66 (\u0110\u1EE9a tr\u1EBB \u5B50 d\u01B0\u1EDBi m\xE1i tr\u01B0\u1EDDng). \u4E60 (C\xE1nh chim non v\u1ED7 c\xE1nh t\u1EADp bay nhi\u1EC1u l\u1EA7n)."
  },
  {
    hanzi: "\u6C49\u8BED",
    pinyin: "h\xE0ny\u01D4",
    hanViet: "H\xE1n Ng\u1EEF",
    vietnamese: "Ti\u1EBFng Trung, ti\u1EBFng H\xE1n",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Ng\xF4n ng\u1EEF",
    radical: "\u6C35 (Th\u1EE7y) + \u8BA0 (Ng\xF4n)",
    strokeCount: 14,
    examples: [
      { zh: "\u4ED6\u7684\u6C49\u8BED\u8BF4\u5F97\u975E\u5E38\u6D41\u5229\u3002", pinyin: "T\u0101 de h\xE0ny\u01D4 shu\u014D de f\u0113ich\xE1ng li\xFAl\xEC.", vi: "Ti\u1EBFng Trung c\u1EE7a anh \u1EA5y n\xF3i r\u1EA5t l\u01B0u lo\xE1t." },
      { zh: "\u6211\u60F3\u8003\u6C49\u8BED\u6C34\u5E73\u8003\u8BD5 HSK\u3002", pinyin: "W\u01D2 xi\u01CEng k\u01CEo h\xE0ny\u01D4 shu\u01D0p\xEDng k\u01CEosh\xEC HSK.", vi: "T\xF4i mu\u1ED1n thi ch\u1EE9ng ch\u1EC9 H\xE1n ng\u1EEF HSK." }
    ],
    tips: "\u6C49 (D\xF2ng s\xF4ng H\xE1n Th\u1EE7y, d\xE2n t\u1ED9c H\xE1n) + \u8BED (B\u1ED9 Ng\xF4n \u8BA0 trao \u0111\u1ED5i ng\xF4n t\u1EEB)."
  },
  {
    hanzi: "\u4E2D\u6587",
    pinyin: "zh\u014Dngw\xE9n",
    hanViet: "Trung V\u0103n",
    vietnamese: "Ti\u1EBFng Trung, ch\u1EEF Trung",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Ng\xF4n ng\u1EEF",
    radical: "\u4E28 (C\u1ED5n) + \u6587 (V\u0103n)",
    strokeCount: 8,
    examples: [
      { zh: "\u4F60\u5B66\u4E86\u591A\u4E45\u4E2D\u6587\u4E86\uFF1F", pinyin: "N\u01D0 xu\xE9 le du\u014Dji\u01D4 zh\u014Dngw\xE9n le?", vi: "B\u1EA1n h\u1ECDc ti\u1EBFng Trung \u0111\u01B0\u1EE3c bao l\xE2u r\u1ED3i?" },
      { zh: "\u8FD9\u672C\u4E2D\u6587\u4E66\u5F88\u6709\u8DA3\u3002", pinyin: "Zh\xE8 b\u011Bn zh\u014Dngw\xE9n sh\u016B h\u011Bn y\u01D2uq\xF9.", vi: "Cu\u1ED1n s\xE1ch ti\u1EBFng Trung n\xE0y r\u1EA5t th\xFA v\u1ECB." }
    ],
    tips: "\u4E2D (Trung t\xE2m) + \u6587 (V\u0103n t\u1EF1, ch\u1EEF vi\u1EBFt v\xE0 v\u0103n h\xF3a ph\u01B0\u01A1ng \u0110\xF4ng)."
  },
  {
    hanzi: "\u8001\u5E08",
    pinyin: "l\u01CEosh\u012B",
    hanViet: "L\xE3o S\u01B0",
    vietnamese: "Th\u1EA7y c\xF4 gi\xE1o, gi\xE1o vi\xEAn",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Ngh\u1EC1 nghi\u1EC7p",
    radical: "\u8002 (L\xE3o) + \u5DFE (C\xE2n)",
    strokeCount: 12,
    examples: [
      { zh: "\u738B\u8001\u5E08\u6559\u6211\u4EEC\u8BED\u6CD5\u3002", pinyin: "W\xE1ng l\u01CEosh\u012B ji\u0101o w\u01D2men y\u01D4f\u01CE.", vi: "C\xF4 V\u01B0\u01A1ng d\u1EA1y ch\xFAng t\xF4i ng\u1EEF ph\xE1p." },
      { zh: "\u8001\u5E08\u597D\uFF01", pinyin: "L\u01CEosh\u012B h\u01CEo!", vi: "Em ch\xE0o c\xF4/th\u1EA7y \u1EA1!" }
    ],
    tips: "\u8001 (Ng\u01B0\u1EDDi l\u1EDBn tu\u1ED5i \u0111\u1EE9c cao v\u1ECDng tr\u1ECDng) + \u5E08 (Ng\u01B0\u1EDDi th\u1EA7y truy\u1EC1n d\u1EA1y khu\xF4n ph\xE9p \u0111\u1EA1o l\xFD)."
  },
  {
    hanzi: "\u5B66\u751F",
    pinyin: "xu\xE9sheng",
    hanViet: "H\u1ECDc Sinh",
    vietnamese: "H\u1ECDc sinh, sinh vi\xEAn",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "H\u1ECDc t\u1EADp",
    radical: "\u5B50 (T\u1EED) + \u751F (Sinh)",
    strokeCount: 13,
    examples: [
      { zh: "\u5927\u5B66\u91CC\u6709\u5F88\u591A\u5916\u56FD\u7559\u5B66\u751F\u3002", pinyin: "D\xE0xu\xE9 l\u01D0 y\u01D2u h\u011Bn du\u014D w\xE0igu\xF3 li\xFAxu\xE9sh\u0113ng.", vi: "Trong tr\u01B0\u1EDDng \u0111\u1EA1i h\u1ECDc c\xF3 r\u1EA5t nhi\u1EC1u du h\u1ECDc sinh n\u01B0\u1EDBc ngo\xE0i." },
      { zh: "\u4ED6\u662F\u4E00\u4E2A\u52E4\u594B\u7684\u597D\u5B66\u751F\u3002", pinyin: "T\u0101 sh\xEC y\xED ge q\xEDnf\xE8n de h\u01CEo xu\xE9sheng.", vi: "C\u1EADu \u1EA5y l\xE0 m\u1ED9t h\u1ECDc sinh ch\u0103m ch\u1EC9 g\u01B0\u01A1ng m\u1EABu." }
    ],
    tips: "\u5B66 (H\u1ECDc tri th\u1EE9c) + \u751F (M\u1EA7m non sinh tr\u01B0\u1EDFng): ng\u01B0\u1EDDi tr\u1EBB tu\u1ED5i theo \u0111u\u1ED5i h\u1ECDc v\u1EA5n."
  },
  {
    hanzi: "\u51C6\u5907",
    pinyin: "zh\u01D4nb\xE8i",
    hanViet: "Chu\u1EA9n B\u1ECB",
    vietnamese: "Chu\u1EA9n b\u1ECB, s\u1EB5n s\xE0ng",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh vi",
    radical: "\u51AB (B\u0103ng) + \u5902 (Tr\u0129)",
    strokeCount: 18,
    examples: [
      { zh: "\u4F60\u51C6\u5907\u597D\u8003\u8BD5\u4E86\u5417\uFF1F", pinyin: "N\u01D0 zh\u01D4nb\xE8i h\u01CEo k\u01CEosh\xEC le ma?", vi: "B\u1EA1n \u0111\xE3 chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng cho k\u1EF3 thi ch\u01B0a?" },
      { zh: "\u5988\u5988\u6B63\u5728\u53A8\u623F\u51C6\u5907\u665A\u9910\u3002", pinyin: "M\u0101ma zh\xE8ngz\xE0i ch\xFAf\xE1ng zh\u01D4nb\xE8i w\u01CEnc\u0101n.", vi: "M\u1EB9 \u0111ang \u1EDF trong b\u1EBFp chu\u1EA9n b\u1ECB b\u1EEFa t\u1ED1i." }
    ],
    tips: "\u51C6 (Khu\xF4n chu\u1EA9n \u0111ong \u0111\u1EBFm) + \u5907 (D\u1EF1 ph\xF2ng \u0111\u1EA7y \u0111\u1EE7): s\u1EAFp \u0111\u1EB7t m\u1ECDi th\u1EE9 t\u1EC1 ch\u1EC9nh."
  },
  {
    hanzi: "\u5F00\u59CB",
    pinyin: "k\u0101ish\u01D0",
    hanViet: "Khai Th\u1EE7y",
    vietnamese: "B\u1EAFt \u0111\u1EA7u, kh\u1EDFi \u0111\u1EA7u",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian",
    radical: "\u95E8 (M\xF4n) + \u5973 (N\u1EEF)",
    strokeCount: 12,
    examples: [
      { zh: "\u4F1A\u8BAE\u9A6C\u4E0A\u5C31\u8981\u5F00\u59CB\u4E86\u3002", pinyin: "Hu\xECy\xEC m\u01CEsh\xE0ng ji\xF9 y\xE0o k\u0101ish\u01D0 le.", vi: "Cu\u1ED9c h\u1ECDp chu\u1EA9n b\u1ECB b\u1EAFt \u0111\u1EA7u ngay b\xE2y gi\u1EDD r\u1ED3i." },
      { zh: "\u826F\u597D\u7684\u5F00\u59CB\u662F\u6210\u529F\u7684\u4E00\u534A\u3002", pinyin: "Li\xE1ngh\u01CEo de k\u0101ish\u01D0 sh\xEC ch\xE9ngg\u014Dng de y\xEDb\xE0n.", vi: "V\u1EA1n s\u1EF1 kh\u1EDFi \u0111\u1EA7u nan, \u0111\u1EA7u xu\xF4i \u0111u\xF4i l\u1ECDt." }
    ],
    tips: "\u5F00 (Khai - m\u1EDF m\xE0n ra) + \u59CB (Th\u1EE7y - ngu\u1ED3n c\u1ED9i ban s\u01A1)."
  },
  {
    hanzi: "\u5E2E\u52A9",
    pinyin: "b\u0101ngzh\xF9",
    hanViet: "Bang Tr\u1EE3",
    vietnamese: "Gi\xFAp \u0111\u1EE1, h\u1ED7 tr\u1EE3",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Giao ti\u1EBFp",
    radical: "\u5DFE (C\xE2n) + \u529B (L\u1EF1c)",
    strokeCount: 16,
    examples: [
      { zh: "\u975E\u5E38\u611F\u8C22\u4F60\u7684\u70ED\u5FC3\u5E2E\u52A9\uFF01", pinyin: "F\u0113ich\xE1ng g\u01CEnxi\xE8 n\u01D0 de r\xE8x\u012Bn b\u0101ngzh\xF9!", vi: "V\xF4 c\xF9ng c\u1EA3m \u01A1n s\u1EF1 t\u01B0\u01A1ng tr\u1EE3 nhi\u1EC7t t\xECnh c\u1EE7a b\u1EA1n!" },
      { zh: "\u8BF7\u95EE\u6709\u4EC0\u4E48\u6211\u53EF\u4EE5\u5E2E\u52A9\u4F60\u7684\u5417\uFF1F", pinyin: "Q\u01D0ngw\xE8n y\u01D2u sh\xE9nme w\u01D2 k\u011By\u01D0 b\u0101ngzh\xF9 n\u01D0 de ma?", vi: "Xin h\u1ECFi c\xF3 vi\u1EC7c g\xEC t\xF4i c\xF3 th\u1EC3 gi\xFAp \u0111\u01B0\u1EE3c b\u1EA1n kh\xF4ng?" }
    ],
    tips: "\u5E2E (Bang tr\u1EE3) + \u52A9 (Hi\u1EBFn d\xE2ng s\u1EE9c L\u1EF1c \u529B): chung tay g\xF3p s\u1EE9c \u0111\u1EE1 \u0111\u1EA7n nhau."
  },
  {
    hanzi: "\u533B\u751F",
    pinyin: "y\u012Bsh\u0113ng",
    hanViet: "Y Sinh",
    vietnamese: "B\xE1c s\u0129",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Ngh\u1EC1 nghi\u1EC7p",
    radical: "\u531A (Ph\u01B0\u01A1ng) + \u751F (Sinh)",
    strokeCount: 12,
    examples: [
      { zh: "\u4ED6\u662F\u533B\u9662\u91CC\u6700\u597D\u7684\u533B\u751F\u3002", pinyin: "T\u0101 sh\xEC y\u012Byu\xE0n l\u01D0 zu\xEC h\u01CEo de y\u012Bsh\u0113ng.", vi: "\xD4ng \u1EA5y l\xE0 b\xE1c s\u0129 gi\u1ECFi nh\u1EA5t trong b\u1EC7nh vi\u1EC7n." },
      { zh: "\u6211\u751F\u75C5\u4E86\uFF0C\u8981\u770B\u533B\u751F\u3002", pinyin: "W\u01D2 sh\u0113ngb\xECng le, y\xE0o k\xE0n y\u012Bsh\u0113ng.", vi: "T\xF4i b\u1ECB \u1ED1m r\u1ED3i, c\u1EA7n \u0111i kh\xE1m b\xE1c s\u0129." }
    ],
    tips: "\u533B (Y thu\u1EADt ch\u1EEFa b\u1EC7nh) + \u751F (Ng\u01B0\u1EDDi, sinh m\u1EC7nh): ng\u01B0\u1EDDi ch\u1EEFa l\xE0nh sinh m\u1EC7nh."
  },
  {
    hanzi: "\u533B\u9662",
    pinyin: "y\u012Byu\xE0n",
    hanViet: "Y Vi\u1EC7n",
    vietnamese: "B\u1EC7nh vi\u1EC7n",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u531A (Ph\u01B0\u01A1ng) + \u961D (Ph\u1EE5)",
    strokeCount: 16,
    examples: [
      { zh: "\u533B\u9662\u79BB\u8FD9\u91CC\u4E0D\u8FDC\u3002", pinyin: "Y\u012Byu\xE0n l\xED zh\xE8l\u01D0 b\xF9 yu\u01CEn.", vi: "B\u1EC7nh vi\u1EC7n c\xE1ch \u0111\xE2y kh\xF4ng xa." },
      { zh: "\u5979\u5728\u533B\u9662\u5F53\u62A4\u58EB\u3002", pinyin: "T\u0101 z\xE0i y\u012Byu\xE0n d\u0101ng h\xF9shi.", vi: "C\xF4 \u1EA5y l\xE0m y t\xE1 \u1EDF b\u1EC7nh vi\u1EC7n." }
    ],
    tips: "\u533B (Y t\u1EBF) + \u9662 (Khu vi\u1EC7n, t\xF2a nh\xE0): n\u01A1i ch\u0103m s\xF3c v\xE0 kh\xE1m ch\u1EEFa b\u1EC7nh."
  },
  {
    hanzi: "\u5B66\u6821",
    pinyin: "xu\xE9xi\xE0o",
    hanViet: "H\u1ECDc Hi\u1EC7u",
    vietnamese: "Tr\u01B0\u1EDDng h\u1ECDc",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u5B50 (T\u1EED) + \u6728 (M\u1ED9c)",
    strokeCount: 18,
    examples: [
      { zh: "\u6211\u4EEC\u7684\u5B66\u6821\u5F88\u5927\u5F88\u6F02\u4EAE\u3002", pinyin: "W\u01D2men de xu\xE9xi\xE0o h\u011Bn d\xE0 h\u011Bn pi\xE0oliang.", vi: "Tr\u01B0\u1EDDng c\u1EE7a ch\xFAng t\xF4i r\u1EA5t to v\xE0 \u0111\u1EB9p." },
      { zh: "\u5B69\u5B50\u4EEC\u6BCF\u5929\u53BB\u5B66\u6821\u3002", pinyin: "H\xE1izimen m\u011Biti\u0101n q\xF9 xu\xE9xi\xE0o.", vi: "C\xE1c em nh\u1ECF m\u1ED7i ng\xE0y \u0111\u1EC1u \u0111\u1EBFn tr\u01B0\u1EDDng." }
    ],
    tips: "\u5B66 (H\u1ECDc t\u1EADp) + \u6821 (Khu\xF4n vi\xEAn nh\xE0 tr\u01B0\u1EDDng): n\u01A1i truy\u1EC1n d\u1EA1y tri th\u1EE9c cho h\u1ECDc tr\xF2."
  },
  {
    hanzi: "\u5DE5\u4F5C",
    pinyin: "g\u014Dngzu\xF2",
    hanViet: "C\xF4ng T\xE1c",
    vietnamese: "C\xF4ng vi\u1EC7c, l\xE0m vi\u1EC7c",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u5DE5 (C\xF4ng) + \u4EBB (Nh\xE2n)",
    strokeCount: 10,
    examples: [
      { zh: "\u4F60\u559C\u6B22\u4F60\u7684\u5DE5\u4F5C\u5417\uFF1F", pinyin: "N\u01D0 x\u01D0hu\u0101n n\u01D0 de g\u014Dngzu\xF2 ma?", vi: "B\u1EA1n c\xF3 th\xEDch c\xF4ng vi\u1EC7c c\u1EE7a m\xECnh kh\xF4ng?" },
      { zh: "\u6211\u7238\u7238\u5728\u94F6\u884C\u5DE5\u4F5C\u3002", pinyin: "W\u01D2 b\xE0ba z\xE0i y\xEDnh\xE1ng g\u014Dngzu\xF2.", vi: "B\u1ED1 t\xF4i l\xE0m vi\u1EC7c \u1EDF ng\xE2n h\xE0ng." }
    ],
    tips: "\u5DE5 (C\xF4ng c\u1EE5 ch\u1EBF t\u1EA1o) + \u4F5C (Nh\xE2n \u0111\u1EE9ng l\xE0m ra): con ng\u01B0\u1EDDi d\xF9ng c\xF4ng c\u1EE5 t\u1EA1o ra th\xE0nh qu\u1EA3."
  },
  {
    hanzi: "\u65F6\u95F4",
    pinyin: "sh\xEDji\u0101n",
    hanViet: "Th\u1EDDi Gian",
    vietnamese: "Th\u1EDDi gian",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian",
    radical: "\u65E5 (Nh\u1EADt) + \u95E8 (M\xF4n)",
    strokeCount: 11,
    examples: [
      { zh: "\u4F60\u73B0\u5728\u6709\u65F6\u95F4\u5417\uFF1F", pinyin: "N\u01D0 xi\xE0nz\xE0i y\u01D2u sh\xEDji\u0101n ma?", vi: "B\xE2y gi\u1EDD b\u1EA1n c\xF3 th\u1EDDi gian kh\xF4ng?" },
      { zh: "\u65F6\u95F4\u8FC7\u5F97\u771F\u5FEB\u3002", pinyin: "Sh\xEDji\u0101n gu\xF2 de zh\u0113n ku\xE0i.", vi: "Th\u1EDDi gian tr\xF4i th\u1EADt l\xE0 nhanh." }
    ],
    tips: "\u65F6 c\xF3 b\u1ED9 Nh\u1EADt (\u65E5 - m\u1EB7t tr\u1EDDi ch\u1EC9 gi\u1EDD). \u95F4 c\xF3 ch\u1EEF Nh\u1EADt trong c\u1ED5ng (\u95E8) ch\u1EC9 kho\u1EA3ng gi\u1EEFa c\xE1c th\u1EDDi kh\u1EAFc."
  },
  {
    hanzi: "\u94B1",
    pinyin: "qi\xE1n",
    hanViet: "Ti\u1EC1n",
    vietnamese: "Ti\u1EC1n b\u1EA1c",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Mua s\u1EAFm",
    radical: "\u9485 (Kim)",
    strokeCount: 10,
    examples: [
      { zh: "\u8FD9\u4E2A\u591A\u5C11\u94B1\uFF1F", pinyin: "Zh\xE8ge du\u014Dshao qi\xE1n?", vi: "C\xE1i n\xE0y bao nhi\xEAu ti\u1EC1n?" },
      { zh: "\u6211\u94B1\u5305\u91CC\u6CA1\u6709\u94B1\u4E86\u3002", pinyin: "W\u01D2 qi\xE1nb\u0101o l\u01D0 m\xE9iy\u01D2u qi\xE1n le.", vi: "Trong v\xED t\xF4i h\u1EBFt ti\u1EC1n r\u1ED3i." }
    ],
    tips: "B\u1ED9 Kim (\u9485) t\u01B0\u1EE3ng tr\u01B0ng cho ti\u1EC1n xu kim lo\u1EA1i \u0111\xFAc ng\xE0y x\u01B0a."
  },
  {
    hanzi: "\u670B\u53CB",
    pinyin: "p\xE9ngyou",
    hanViet: "B\u1EB1ng H\u1EEFu",
    vietnamese: "B\u1EA1n b\xE8",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "M\u1ED1i quan h\u1EC7",
    radical: "\u6708 (Nguy\u1EC7t) + \u53CB (H\u1EEFu)",
    strokeCount: 12,
    examples: [
      { zh: "\u4ED6\u662F\u6211\u7684\u597D\u670B\u53CB\u3002", pinyin: "T\u0101 sh\xEC w\u01D2 de h\u01CEo p\xE9ngyou.", vi: "Anh \u1EA5y l\xE0 ng\u01B0\u1EDDi b\u1EA1n t\u1ED1t c\u1EE7a t\xF4i." },
      { zh: "\u5F88\u9AD8\u5174\u4EA4\u5230\u65B0\u670B\u53CB\u3002", pinyin: "H\u011Bn g\u0101ox\xECng ji\u0101od\xE0o x\u012Bn p\xE9ngyou.", vi: "R\u1EA5t vui \u0111\u01B0\u1EE3c k\u1EBFt b\u1EA1n m\u1EDBi." }
    ],
    tips: "\u670B g\u1ED3m 2 m\u1EB7t tr\u0103ng (\u6708) k\u1EC1 nhau. \u53CB g\u1ED3m hai b\xE0n tay n\u1EAFm l\u1EA5y nhau trong t\xECnh th\xE2n \xE1i."
  },
  {
    hanzi: "\u6F02\u4EAE",
    pinyin: "pi\xE0oliang",
    hanViet: "Phi\xEAu L\u01B0\u1EE3ng",
    vietnamese: "Xinh \u0111\u1EB9p, \u0111\u1EB9p \u0111\u1EBD",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 1,
    category: "Mi\xEAu t\u1EA3",
    radical: "\u6C35 (Th\u1EE7y) + \u4EA0 (\u0110\u1EA7u)",
    strokeCount: 23,
    examples: [
      { zh: "\u8FD9\u4EF6\u8863\u670D\u771F\u6F02\u4EAE\uFF01", pinyin: "Zh\xE8 ji\xE0n y\u012Bfu zh\u0113n pi\xE0oliang!", vi: "B\u1ED9 qu\u1EA7n \xE1o n\xE0y \u0111\u1EB9p th\u1EADt \u0111\u1EA5y!" },
      { zh: "\u4F60\u7684\u4E2D\u56FD\u5B57\u5199\u5F97\u5F88\u6F02\u4EAE\u3002", pinyin: "N\u01D0 de zh\u014Dnggu\xF3 z\xEC xi\u011B de h\u011Bn pi\xE0oliang.", vi: "Ch\u1EEF Trung Qu\u1ED1c c\u1EE7a b\u1EA1n vi\u1EBFt r\u1EA5t \u0111\u1EB9p." }
    ],
    tips: "\u6F02 c\xF3 b\u1ED9 Th\u1EE7y (\u6C35) \xF3ng \xE1nh. \u4EAE l\xE0 s\xE1ng s\u1EE7a, r\u1EA1ng r\u1EE1 thanh t\xFA."
  },
  {
    hanzi: "\u559C\u6B22",
    pinyin: "x\u01D0huan",
    hanViet: "H\u1EC9 Hoan",
    vietnamese: "Th\xEDch, y\xEAu th\xEDch",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 1,
    category: "C\u1EA3m x\xFAc",
    radical: "\u53E3 (Kh\u1EA9u) + \u6B20 (Khi\u1EBFm)",
    strokeCount: 18,
    examples: [
      { zh: "\u6211\u559C\u6B22\u5B66\u4E2D\u6587\u3002", pinyin: "W\u01D2 x\u01D0huan xu\xE9 zh\u014Dngw\xE9n.", vi: "T\xF4i th\xEDch h\u1ECDc ti\u1EBFng Trung." },
      { zh: "\u4F60\u559C\u6B22\u559D\u8336\u8FD8\u662F\u5496\u5561\uFF1F", pinyin: "N\u01D0 x\u01D0huan h\u0113 ch\xE1 h\xE1ish\xEC k\u0101f\u0113i?", vi: "B\u1EA1n th\xEDch u\u1ED1ng tr\xE0 hay c\xE0 ph\xEA?" }
    ],
    tips: "\u559C (Ni\u1EC1m vui, n\u1EE5 c\u01B0\u1EDDi tr\xEAn mi\u1EC7ng \u53E3) + \u6B22 (M\u1EEBng r\u1EE1, h\xE2n hoan)."
  },
  {
    hanzi: "\u7C73\u996D",
    pinyin: "m\u01D0f\xE0n",
    hanViet: "M\u1EC5 Ph\u1EA1n",
    vietnamese: "C\u01A1m tr\u1EAFng",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED3 \u0103n th\u1EE9c u\u1ED1ng",
    radical: "\u7C73 (M\u1EC5) + \u9963 (Th\u1EF1c)",
    strokeCount: 13,
    examples: [
      { zh: "\u6211\u60F3\u5403\u4E00\u7897\u7C73\u996D\u3002", pinyin: "W\u01D2 xi\u01CEng ch\u012B y\xEC w\u01CEn m\u01D0f\xE0n.", vi: "T\xF4i mu\u1ED1n \u0103n m\u1ED9t b\xE1t c\u01A1m tr\u1EAFng." },
      { zh: "\u4E2D\u56FD\u4EBA\u548C\u8D8A\u5357\u4EBA\u90FD\u5403\u7C73\u996D\u3002", pinyin: "Zh\u014Dnggu\xF3 r\xE9n h\xE9 yu\xE8n\xE1n r\xE9n d\u014Du ch\u012B m\u01D0f\xE0n.", vi: "Ng\u01B0\u1EDDi Trung Qu\u1ED1c v\xE0 ng\u01B0\u1EDDi Vi\u1EC7t Nam \u0111\u1EC1u \u0103n c\u01A1m." }
    ],
    tips: "\u7C73 (H\u1EA1t g\u1EA1o) + \u996D (B\u1ED9 Th\u1EF1c \u9963 ch\u1EC9 \u0111\u1ED3 \u0103n, n\u1EA5u ch\xEDn t\u1EEB g\u1EA1o)."
  },
  {
    hanzi: "\u8336",
    pinyin: "ch\xE1",
    hanViet: "Tr\xE0",
    vietnamese: "Tr\xE0, ch\xE8",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED3 \u0103n th\u1EE9c u\u1ED1ng",
    radical: "\u8279 (Th\u1EA3o)",
    strokeCount: 9,
    examples: [
      { zh: "\u8BF7\u559D\u4E00\u676F\u70ED\u8336\u3002", pinyin: "Q\u01D0ng h\u0113 y\xEC b\u0113i r\xE8 ch\xE1.", vi: "Xin m\u1EDDi u\u1ED1ng m\u1ED9t t\xE1ch tr\xE0 n\xF3ng." },
      { zh: "\u4E2D\u56FD\u4EBA\u5F88\u559C\u6B22\u559D\u8336\u3002", pinyin: "Zh\u014Dnggu\xF3 r\xE9n h\u011Bn x\u01D0hu\u0101n h\u0113 ch\xE1.", vi: "Ng\u01B0\u1EDDi Trung Qu\u1ED1c r\u1EA5t th\xEDch u\u1ED1ng tr\xE0." }
    ],
    tips: "Tr\xEAn l\xE0 Th\u1EA3o (\u8279 - ng\u1ECDn c\u1ECF), gi\u1EEFa l\xE0 Nh\xE2n (\u4EBA - ng\u01B0\u1EDDi h\xE1i tr\xE0), d\u01B0\u1EDBi l\xE0 M\u1ED9c (\u6728 - th\xE2n c\xE2y)."
  },
  {
    hanzi: "\u732B",
    pinyin: "m\u0101o",
    hanViet: "Mi\xEAu",
    vietnamese: "Con m\xE8o",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED9ng v\u1EADt",
    radical: "\u72AD (Khuy\u1EC3n)",
    strokeCount: 11,
    examples: [
      { zh: "\u8FD9\u53EA\u5C0F\u732B\u5F88\u53EF\u7231\u3002", pinyin: "Zh\xE8 zh\u012B xi\u01CEom\u0101o h\u011Bn k\u011B'\xE0i.", vi: "Ch\xFA m\xE8o con n\xE0y r\u1EA5t \u0111\xE1ng y\xEAu." },
      { zh: "\u6211\u5BB6\u6709\u4E00\u53EA\u767D\u732B\u3002", pinyin: "W\u01D2 ji\u0101 y\u01D2u y\xEC zh\u012B b\xE1i m\u0101o.", vi: "Nh\xE0 t\xF4i c\xF3 m\u1ED9t con m\xE8o tr\u1EAFng." }
    ],
    tips: "B\u1ED9 Khuy\u1EC3n (\u72AD) ch\u1EC9 lo\xE0i th\xFA b\u1ED1n ch\xE2n, b\xEAn ph\u1EA3i l\xE0 ch\u1EEF Mi\xEAu (\u82D7) t\u01B0\u1EE3ng thanh ti\u1EBFng k\xEAu 'meo meo'."
  },
  {
    hanzi: "\u72D7",
    pinyin: "g\u01D2u",
    hanViet: "C\u1EA9u",
    vietnamese: "Con ch\xF3",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED9ng v\u1EADt",
    radical: "\u72AD (Khuy\u1EC3n)",
    strokeCount: 8,
    examples: [
      { zh: "\u8FD9\u53EA\u72D7\u5F88\u806A\u660E\u3002", pinyin: "Zh\xE8 zh\u012B g\u01D2u h\u011Bn c\u014Dngm\xEDng.", vi: "Ch\xFA ch\xF3 n\xE0y r\u1EA5t th\xF4ng minh." },
      { zh: "\u4ED6\u5728\u516C\u56ED\u91CC\u905B\u72D7\u3002", pinyin: "T\u0101 z\xE0i g\u014Dngyu\xE1n l\u01D0 li\xF9 g\u01D2u.", vi: "Anh \u1EA5y d\u1EAFt ch\xF3 \u0111i d\u1EA1o trong c\xF4ng vi\xEAn." }
    ],
    tips: "B\u1ED9 Khuy\u1EC3n (\u72AD - lo\xE0i th\xFA), k\u1EBFt h\u1EE3p ch\u1EEF C\xFA (\u53E5) h\xE0i \xE2m."
  },
  {
    hanzi: "\u5929\u6C14",
    pinyin: "ti\u0101nq\xEC",
    hanViet: "Thi\xEAn Kh\xED",
    vietnamese: "Th\u1EDDi ti\u1EBFt",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u5927 (\u0110\u1EA1i) + \u6C14 (Kh\xED)",
    strokeCount: 8,
    examples: [
      { zh: "\u4ECA\u5929\u5929\u6C14\u5F88\u597D\uFF0C\u9633\u5149\u660E\u5A9A\u3002", pinyin: "J\u012Bnti\u0101n ti\u0101nq\xEC h\u011Bn h\u01CEo, y\xE1nggu\u0101ng m\xEDngm\xE8i.", vi: "H\xF4m nay th\u1EDDi ti\u1EBFt r\u1EA5t \u0111\u1EB9p, n\u1EAFng \u1EA5m chan h\xF2a." },
      { zh: "\u660E\u5929\u7684\u5929\u6C14\u600E\u4E48\u6837\uFF1F", pinyin: "M\xEDngti\u0101n de ti\u0101nq\xEC z\u011Bnmey\xE0ng?", vi: "Th\u1EDDi ti\u1EBFt ng\xE0y mai th\u1EBF n\xE0o?" }
    ],
    tips: "\u5929 (B\u1EA7u tr\u1EDDi) + \u6C14 (Lu\u1ED3ng kh\xF4ng kh\xED): s\u1EF1 thay \u0111\u1ED5i c\u1EE7a kh\xED h\u1EADu tr\xEAn b\u1EA7u tr\u1EDDi."
  },
  {
    hanzi: "\u8FD0\u52A8",
    pinyin: "y\xF9nd\xF2ng",
    hanViet: "V\u1EADn \u0110\u1ED9ng",
    vietnamese: "V\u1EADn \u0111\u1ED9ng, th\u1EC3 thao",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "S\u1EE9c kh\u1ECFe",
    radical: "\u8FB6 (Quai x\u01B0\u1EDBc) + \u529B (L\u1EF1c)",
    strokeCount: 13,
    examples: [
      { zh: "\u7ECF\u5E38\u8FD0\u52A8\u5BF9\u8EAB\u4F53\u597D\u3002", pinyin: "J\u012Bngch\xE1ng y\xF9nd\xF2ng du\xEC sh\u0113nt\u01D0 h\u01CEo.", vi: "Th\u01B0\u1EDDng xuy\xEAn th\u1EC3 d\u1EE5c th\u1EC3 thao r\u1EA5t t\u1ED1t cho c\u01A1 th\u1EC3." },
      { zh: "\u4F60\u6700\u559C\u6B22\u4EC0\u4E48\u8FD0\u52A8\uFF1F", pinyin: "N\u01D0 zu\xEC x\u01D0huan sh\xE9nme y\xF9nd\xF2ng?", vi: "B\u1EA1n th\xEDch m\xF4n th\u1EC3 thao n\xE0o nh\u1EA5t?" }
    ],
    tips: "\u8FD0 (V\u1EADn chuy\u1EC3n di chuy\u1EC3n) + \u52A8 (D\xF9ng s\u1EE9c L\u1EF1c \u529B v\u1EADn h\xE0nh)."
  },
  {
    hanzi: "\u7535\u5F71",
    pinyin: "di\xE0ny\u01D0ng",
    hanViet: "\u0110i\u1EC7n \u1EA2nh",
    vietnamese: "Phim \u1EA3nh, b\u1ED9 phim",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Gi\u1EA3i tr\xED",
    radical: "\u7535 (\u0110i\u1EC7n) + \u5F61 (Sam)",
    strokeCount: 20,
    examples: [
      { zh: "\u5468\u672B\u6211\u4EEC\u53BB\u770B\u7535\u5F71\u5427\uFF01", pinyin: "Zh\u014Dum\xF2 w\u01D2men q\xF9 k\xE0n di\xE0ny\u01D0ng ba!", vi: "Cu\u1ED1i tu\u1EA7n ch\xFAng m\xECnh \u0111i xem phim nh\xE9!" },
      { zh: "\u8FD9\u90E8\u7535\u5F71\u975E\u5E38\u611F\u4EBA\u3002", pinyin: "Zh\xE8 b\xF9 di\xE0ny\u01D0ng f\u0113ich\xE1ng g\u01CEnr\xE9n.", vi: "B\u1ED9 phim n\xE0y r\u1EA5t c\u1EA3m \u0111\u1ED9ng." }
    ],
    tips: "\u7535 (\u0110i\u1EC7n n\u0103ng) + \u5F71 (H\xECnh \u1EA3nh b\xF3ng m\u1EDD): h\xECnh b\xF3ng chuy\u1EC3n \u0111\u1ED9ng tr\xEAn m\xE0n \u1EA3nh nh\u1EDD \xE1nh s\xE1ng \u0111i\u1EC7n t\u1EED."
  },
  {
    hanzi: "\u8863\u670D",
    pinyin: "y\u012Bfu",
    hanViet: "Y Ph\u1EE5c",
    vietnamese: "Qu\u1EA7n \xE1o, y ph\u1EE5c",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u8863 (Y) + \u6708 (Nguy\u1EC7t)",
    strokeCount: 14,
    examples: [
      { zh: "\u8FD9\u4EF6\u8863\u670D\u592A\u8D35\u4E86\u3002", pinyin: "Zh\xE8 ji\xE0n y\u012Bfu t\xE0i gu\xEC le.", vi: "Chi\u1EBFc \xE1o n\xE0y \u0111\u1EAFt qu\xE1 r\u1ED3i." },
      { zh: "\u6211\u60F3\u4E70\u51E0\u4EF6\u65B0\u8863\u670D\u3002", pinyin: "W\u01D2 xi\u01CEng m\u01CEi j\u01D0 ji\xE0n x\u012Bn y\u012Bfu.", vi: "T\xF4i mu\u1ED1n mua v\xE0i b\u1ED9 qu\u1EA7n \xE1o m\u1EDBi." }
    ],
    tips: "\u8863 (T\xE0 \xE1o v\u1EA1t c\u1ED5) + \u670D (M\u1EB7c l\xEAn ng\u01B0\u1EDDi cho ph\u1EE5c t\xF9ng th\u1EDDi ti\u1EBFt)."
  },
  {
    hanzi: "\u5065\u5EB7",
    pinyin: "ji\xE0nk\u0101ng",
    hanViet: "Ki\u1EC7n Khang",
    vietnamese: "Kh\u1ECFe m\u1EA1nh, s\u1EE9c kh\u1ECFe",
    partOfSpeech: "T\xEDnh t\u1EEB / Danh t\u1EEB",
    level: 3,
    category: "S\u1EE9c kh\u1ECFe",
    radical: "\u4EBB (Nh\xE2n \u0111\u1EE9ng) + \u5E7F (Qu\u1EA3ng)",
    strokeCount: 22,
    examples: [
      { zh: "\u795D\u4F60\u8EAB\u4F53\u5065\u5EB7\uFF0C\u4E07\u4E8B\u5982\u610F\uFF01", pinyin: "Zh\xF9 n\u01D0 sh\u0113nt\u01D0 ji\xE0nk\u0101ng, w\xE0nsh\xEC r\xFAy\xEC!", vi: "Ch\xFAc b\u1EA1n th\xE2n th\u1EC3 kh\u1ECFe m\u1EA1nh, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!" },
      { zh: "\u5065\u5EB7\u662F\u4EBA\u751F\u6700\u5927\u7684\u8D22\u5BCC\u3002", pinyin: "Ji\xE0nk\u0101ng sh\xEC r\xE9nsh\u0113ng zu\xEC d\xE0 de c\xE1if\xF9.", vi: "S\u1EE9c kh\u1ECFe l\xE0 t\xE0i s\u1EA3n l\u1EDBn nh\u1EA5t c\u1EE7a \u0111\u1EDDi ng\u01B0\u1EDDi." }
    ],
    tips: "\u5065 (Nh\xE2n \u0111\u1EE9ng \u4EBB tr\xE1ng ki\u1EC7n) + \u5EB7 (B\xECnh y\xEAn, khang trang sung t\xFAc)."
  },
  {
    hanzi: "\u8212\u670D",
    pinyin: "sh\u016Bfu",
    hanViet: "Th\u01B0 Ph\u1EE5c",
    vietnamese: "Tho\u1EA3i m\xE1i, d\u1EC5 ch\u1ECBu",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m gi\xE1c",
    radical: "\u820C (Thi\u1EC7t) + \u6708 (Nguy\u1EC7t)",
    strokeCount: 20,
    examples: [
      { zh: "\u5750\u5728\u6C99\u53D1\u4E0A\u771F\u8212\u670D\u3002", pinyin: "Zu\xF2 z\xE0i sh\u0101f\u0101 shang zh\u0113n sh\u016Bfu.", vi: "Ng\u1ED3i tr\xEAn gh\u1EBF sofa th\u1EADt l\xE0 tho\u1EA3i m\xE1i." },
      { zh: "\u6211\u4ECA\u5929\u8EAB\u4F53\u6709\u70B9\u4E0D\u8212\u670D\u3002", pinyin: "W\u01D2 j\u012Bnti\u0101n sh\u0113nt\u01D0 y\u01D2udi\u01CEn b\xF9 sh\u016Bfu.", vi: "H\xF4m nay trong ng\u01B0\u1EDDi t\xF4i h\u01A1i kh\xF3 ch\u1ECBu." }
    ],
    tips: "\u8212 (M\u1EDF r\u1ED9ng th\u01B0 th\xE1i) + \u670D (V\u1EEBa v\u1EB7n tho\u1EA3i m\xE1i)."
  },
  {
    hanzi: "\u975E\u5E38",
    pinyin: "f\u0113ich\xE1ng",
    hanViet: "Phi Th\u01B0\u1EDDng",
    vietnamese: "V\xF4 c\xF9ng, r\u1EA5t, h\u1EBFt s\u1EE9c",
    partOfSpeech: "Ph\xF3 t\u1EEB",
    level: 2,
    category: "M\u1EE9c \u0111\u1ED9",
    radical: "\u975E (Phi) + \u5DFE (C\xE2n)",
    strokeCount: 19,
    examples: [
      { zh: "\u6211\u975E\u5E38\u559C\u6B22\u8FD9\u9996\u4E2D\u56FD\u6B4C\u3002", pinyin: "W\u01D2 f\u0113ich\xE1ng x\u01D0hu\u0101n zh\xE8 sh\u01D2u zh\u014Dnggu\xF3 g\u0113.", vi: "T\xF4i v\xF4 c\xF9ng y\xEAu th\xEDch b\xE0i h\xE1t ti\u1EBFng Trung n\xE0y." },
      { zh: "\u4ECA\u5929\u5916\u9762\u975E\u5E38\u51B7\u3002", pinyin: "J\u012Bnti\u0101n w\xE0imi\xE0n f\u0113ich\xE1ng l\u011Bng.", vi: "H\xF4m nay b\xEAn ngo\xE0i c\u1EF1c k\u1EF3 l\u1EA1nh." }
    ],
    tips: "\u975E (Kh\xF4ng ph\u1EA3i b\xECnh th\u01B0\u1EDDng) + \u5E38 (Th\u01B0\u1EDDng l\u1EC7): v\u01B0\u1EE3t xa m\u1EE9c th\xF4ng th\u01B0\u1EDDng."
  },
  {
    hanzi: "\u7279\u522B",
    pinyin: "t\xE8bi\xE9",
    hanViet: "\u0110\u1EB7c Bi\u1EC7t",
    vietnamese: "\u0110\u1EB7c bi\u1EC7t, r\u1EA5t",
    partOfSpeech: "T\xEDnh t\u1EEB / Ph\xF3 t\u1EEB",
    level: 2,
    category: "M\u1EE9c \u0111\u1ED9",
    radical: "\u725C (Ng\u01B0u) + \u5202 (\u0110ao)",
    strokeCount: 17,
    examples: [
      { zh: "\u8FD9\u4E2A\u83DC\u5473\u9053\u7279\u522B\u597D\u3002", pinyin: "Zh\xE8ge c\xE0i w\xE8idao t\xE8bi\xE9 h\u01CEo.", vi: "M\xF3n \u0103n n\xE0y h\u01B0\u01A1ng v\u1ECB \u0111\u1EB7c bi\u1EC7t ngon." },
      { zh: "\u5979\u4ECA\u5929\u7A7F\u4E86\u4E00\u4EF6\u7279\u522B\u7684\u8863\u670D\u3002", pinyin: "T\u0101 j\u012Bnti\u0101n chu\u0101n le y\xED ji\xE0n t\xE8bi\xE9 de y\u012Bfu.", vi: "H\xF4m nay c\xF4 \u1EA5y m\u1EB7c m\u1ED9t b\u1ED9 \u0111\u1ED3 r\u1EA5t \u0111\u1EB7c bi\u1EC7t." }
    ],
    tips: "\u7279 (Ng\u01B0u \u725C \u0111\u1EB7c th\xF9) + \u522B (\u0110ao \u5202 ph\xE2n bi\u1EC7t r\xF5 r\xE0ng)."
  },
  {
    hanzi: "\u8FC7",
    pinyin: "gu\xF2",
    hanViet: "Qu\xE1 / Qua",
    vietnamese: "Qua, \u0111i qua; t\u1EEBng (tr\u1EE3 t\u1EEB kinh nghi\u1EC7m)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Tr\u1EE3 t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Ng\u1EEF ph\xE1p",
    radical: "\u8FB6 (X\u01B0\u1EDBc)",
    strokeCount: 6,
    examples: [
      { zh: "\u6211\u53BB\u8FC7\u4E00\u6B21\u5317\u4EAC\u3002", pinyin: "W\u01D2 q\xF9 guo y\xED c\xEC B\u011Bij\u012Bng.", vi: "T\xF4i t\u1EEBng \u0111i B\u1EAFc Kinh m\u1ED9t l\u1EA7n." },
      { zh: "\u8FC7\u9A6C\u8DEF\u7684\u65F6\u5019\u8981\u5C0F\u5FC3\u3002", pinyin: "Gu\xF2 m\u01CEl\xF9 de sh\xEDhou y\xE0o xi\u01CEox\u012Bn.", vi: "Khi \u0111i qua \u0111\u01B0\u1EDDng c\u1EA7n ph\u1EA3i c\u1EA9n th\u1EADn." }
    ],
    tips: "G\u1ED3m b\u1ED9 X\u01B0\u1EDBc (\u8FB6) v\xE0 ch\u1EEF Th\u1ED1n (\u5BF8). B\u01B0\u1EDBc \u0111i qua m\u1ED9t kho\u1EA3ng c\xE1ch. Ph\u1ED3n th\u1EC3: \u904E."
  },
  {
    hanzi: "\u5546\u573A",
    pinyin: "sh\u0101ngch\u01CEng",
    hanViet: "Th\u01B0\u01A1ng Tr\u01B0\u1EDDng",
    vietnamese: "Trung t\xE2m th\u01B0\u01A1ng m\u1EA1i, khu mua s\u1EAFm",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Mua s\u1EAFm & \u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u4EA0 (\u0110\u1EA7u) + \u571F (Th\u1ED5)",
    strokeCount: 17,
    examples: [
      { zh: "\u5468\u672B\u8FD9\u5BB6\u5546\u573A\u91CC\u4EBA\u5F88\u591A\u3002", pinyin: "Zh\u014Dum\xF2 zh\xE8 ji\u0101 sh\u0101ngch\u01CEng l\u01D0 r\xE9n h\u011Bn du\u014D.", vi: "Cu\u1ED1i tu\u1EA7n trung t\xE2m th\u01B0\u01A1ng m\u1EA1i n\xE0y r\u1EA5t \u0111\xF4ng ng\u01B0\u1EDDi." },
      { zh: "\u6211\u4EEC\u53BB\u5546\u573A\u4E70\u8863\u670D\u5427\u3002", pinyin: "W\u01D2men q\xF9 sh\u0101ngch\u01CEng m\u01CEi y\u012Bfu ba.", vi: "Ch\xFAng m\xECnh \u0111\u1EBFn trung t\xE2m th\u01B0\u01A1ng m\u1EA1i mua qu\u1EA7n \xE1o \u0111i." }
    ],
    tips: "\u5546 (Bu\xF4n b\xE1n) + \u573A (N\u01A1i ch\u1ED1n, qu\u1EA3ng tr\u01B0\u1EDDng): N\u01A1i bu\xF4n b\xE1n s\u1EA7m u\u1EA5t. Ph\u1ED3n th\u1EC3: \u5546\u5834."
  },
  {
    hanzi: "\u8FDB\u53BB",
    pinyin: "j\xECnqu",
    hanViet: "Ti\u1EBFn Kh\u1EE9",
    vietnamese: "\u0110i v\xE0o, b\u01B0\u1EDBc v\xE0o (h\u01B0\u1EDBng ra xa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Ph\u01B0\u01A1ng h\u01B0\u1EDBng",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    strokeCount: 12,
    examples: [
      { zh: "\u5916\u9762\u5F88\u51B7\uFF0C\u5FEB\u8FDB\u53BB\u5427\u3002", pinyin: "W\xE0imi\xE0n h\u011Bn l\u011Bng, ku\xE0i j\xECnqu ba.", vi: "B\xEAn ngo\xE0i r\u1EA5t l\u1EA1nh, mau \u0111i v\xE0o trong \u0111i." },
      { zh: "\u4ED6\u63A8\u5F00\u95E8\u8D70\u4E86\u8FDB\u53BB\u3002", pinyin: "T\u0101 tu\u012Bk\u0101i m\xE9n z\u01D2u le j\xECnqu.", vi: "Anh \u1EA5y \u0111\u1EA9y c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o trong." }
    ],
    tips: "\u8FDB (Ti\u1EBFn v\xE0o trong) + \u53BB (\u0110i xa kh\u1ECFi v\u1ECB tr\xED n\xF3i): Di chuy\u1EC3n v\xE0o ph\xEDa trong."
  },
  {
    hanzi: "\u6761",
    pinyin: "ti\xE1o",
    hanViet: "\u0110i\u1EC1u",
    vietnamese: "Con, c\xE1i, chi\u1EBFc (l\u01B0\u1EE3ng t\u1EEB cho qu\u1EA7n, v\xE1y, c\xE1, s\xF4ng, \u0111\u01B0\u1EDDng...)",
    partOfSpeech: "L\u01B0\u1EE3ng t\u1EEB",
    level: 2,
    category: "L\u01B0\u1EE3ng t\u1EEB & Mi\xEAu t\u1EA3",
    radical: "\u6728 (M\u1ED9c)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u60F3\u4E70\u4E00\u6761\u65B0\u88E4\u5B50\u3002", pinyin: "W\u01D2 xi\u01CEng m\u01CEi y\xEC ti\xE1o x\u012Bn k\xF9zi.", vi: "T\xF4i mu\u1ED1n mua m\u1ED9t chi\u1EBFc qu\u1EA7n m\u1EDBi." },
      { zh: "\u8FD9\u6761\u8DEF\u4E00\u76F4\u5F80\u524D\u8D70\u5C31\u5230\u4E86\u3002", pinyin: "Zh\xE8 ti\xE1o l\xF9 y\xECzh\xED w\u01CEng qi\xE1n z\u01D2u ji\xF9 d\xE0o le.", vi: "Con \u0111\u01B0\u1EDDng n\xE0y c\u1EE9 \u0111i th\u1EB3ng v\u1EC1 ph\xEDa tr\u01B0\u1EDBc l\xE0 t\u1EDBi." }
    ],
    tips: "Ch\u1EEF \u0110i\u1EC1u mang b\u1ED9 M\u1ED9c (\u6728 - c\xE0nh c\xE2y thon d\xE0i). L\u01B0\u1EE3ng t\u1EEB cho v\u1EADt thon d\xE0i. Ph\u1ED3n th\u1EC3: \u689D."
  },
  {
    hanzi: "\u88E4\u5B50",
    pinyin: "k\xF9zi",
    hanViet: "Kh\u1ED1 T\u1EED",
    vietnamese: "Chi\u1EBFc qu\u1EA7n, c\xE1i qu\u1EA7n",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Trang ph\u1EE5c & Mua s\u1EAFm",
    radical: "\u8864 (Y) + \u5B50 (T\u1EED)",
    strokeCount: 15,
    examples: [
      { zh: "\u8FD9\u6761\u88E4\u5B50\u6709\u70B9\u513F\u957F\u3002", pinyin: "Zh\xE8 ti\xE1o k\xF9zi y\u01D2udi\u01CEnr ch\xE1ng.", vi: "Chi\u1EBFc qu\u1EA7n n\xE0y h\u01A1i d\xE0i m\u1ED9t ch\xFAt." },
      { zh: "\u4F60\u7A7F\u8FD9\u6761\u9ED1\u8272\u7684\u88E4\u5B50\u5F88\u597D\u770B\u3002", pinyin: "N\u01D0 chu\u0101n zh\xE8 ti\xE1o h\u0113is\xE8 de k\xF9zi h\u011Bn h\u01CEok\xE0n.", vi: "B\u1EA1n m\u1EB7c chi\u1EBFc qu\u1EA7n m\xE0u \u0111en n\xE0y r\u1EA5t \u0111\u1EB9p." }
    ],
    tips: "B\u1ED9 Y (\u8864- trang ph\u1EE5c) + Kh\u1ED1 (\u5E93 - kho c\u1EA5t). L\u01B0\u1EE3ng t\u1EEB l\xE0 \u6761 (ti\xE1o). Ph\u1ED3n th\u1EC3: \u8932\u5B50."
  },
  {
    hanzi: "\u767D\u8272",
    pinyin: "b\xE1is\xE8",
    hanViet: "B\u1EA1ch S\u1EAFc",
    vietnamese: "M\xE0u tr\u1EAFng",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u767D (B\u1EA1ch) + \u2E88 (S\u1EAFc)",
    strokeCount: 11,
    examples: [
      { zh: "\u6211\u559C\u6B22\u7A7F\u767D\u8272\u7684\u886C\u886B\u3002", pinyin: "W\u01D2 x\u01D0huan chu\u0101n b\xE1is\xE8 de ch\xE8nsh\u0101n.", vi: "T\xF4i th\xEDch m\u1EB7c \xE1o s\u01A1 mi m\xE0u tr\u1EAFng." },
      { zh: "\u51AC\u5929\u4E0B\u96EA\u4E86\uFF0C\u5230\u5904\u90FD\u662F\u767D\u8272\u7684\u3002", pinyin: "D\u014Dngti\u0101n xi\xE0xu\u011B le, d\xE0och\xF9 d\u014Du sh\xEC b\xE1is\xE8 de.", vi: "M\xF9a \u0111\xF4ng tuy\u1EBFt r\u01A1i, kh\u1EAFp n\u01A1i \u0111\u1EC1u l\xE0 m\xE0u tr\u1EAFng." }
    ],
    tips: "\u767D (Tr\u1EAFng tinh kh\xF4i) + \u8272 (M\xE0u s\u1EAFc). Bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a s\u1EF1 gi\u1EA3n d\u1ECB, tinh khi\u1EBFt."
  },
  {
    hanzi: "\u56E0\u4E3A",
    pinyin: "y\u012Bnw\xE8i",
    hanViet: "Nh\xE2n Vi",
    vietnamese: "B\u1EDFi v\xEC, v\xEC",
    partOfSpeech: "Li\xEAn t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    radical: "\u56D7 (Vi) + \u4E36 (Ch\u1EE7)",
    strokeCount: 10,
    examples: [
      { zh: "\u56E0\u4E3A\u4E0B\u96E8\uFF0C\u6240\u4EE5\u6211\u4EEC\u6CA1\u53BB\u516C\u56ED\u3002", pinyin: "Y\u012Bnw\xE8i xi\xE0y\u01D4, su\u01D2y\u01D0 w\u01D2men m\xE9i q\xF9 g\u014Dngyu\xE1n.", vi: "B\u1EDFi v\xEC tr\u1EDDi m\u01B0a n\xEAn ch\xFAng t\xF4i kh\xF4ng \u0111i c\xF4ng vi\xEAn." },
      { zh: "\u4ED6\u4ECA\u5929\u6CA1\u6765\uFF0C\u56E0\u4E3A\u4ED6\u751F\u75C5\u4E86\u3002", pinyin: "T\u0101 j\u012Bnti\u0101n m\xE9i l\xE1i, y\u012Bnw\xE8i t\u0101 sh\u0113ngb\xECng le.", vi: "H\xF4m nay anh \u1EA5y kh\xF4ng \u0111\u1EBFn v\xEC anh \u1EA5y b\u1ECB \u1ED1m." }
    ],
    tips: "\u56E0 (Nguy\xEAn do) + \u4E3A (V\xEC \u0111i\u1EC1u g\xEC). \u0110i v\u1EDBi \u6240\u4EE5 (su\u01D2y\u01D0) t\u1EA1o c\u1EA5u tr\xFAc nguy\xEAn nh\xE2n - k\u1EBFt qu\u1EA3. Ph\u1ED3n th\u1EC3: \u56E0\u70BA."
  },
  {
    hanzi: "\u8BD5",
    pinyin: "sh\xEC",
    hanViet: "Th\xED",
    vietnamese: "Th\u1EED, l\xE0m th\u1EED, m\u1EB7c th\u1EED",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Mua s\u1EAFm",
    radical: "\u8BA0 (Ng\xF4n)",
    strokeCount: 8,
    examples: [
      { zh: "\u6211\u53EF\u4EE5\u8BD5\u4E00\u4E0B\u8FD9\u4EF6\u8863\u670D\u5417\uFF1F", pinyin: "W\u01D2 k\u011By\u01D0 sh\xEC y\xEDxi\xE0 zh\xE8 ji\xE0n y\u012Bfu ma?", vi: "T\xF4i c\xF3 th\u1EC3 m\u1EB7c th\u1EED b\u1ED9 qu\u1EA7n \xE1o n\xE0y m\u1ED9t ch\xFAt kh\xF4ng?" },
      { zh: "\u8FD9\u9053\u9898\u5F88\u96BE\uFF0C\u4F46\u6211\u60F3\u8BD5\u8BD5\u3002", pinyin: "Zh\xE8 d\xE0o t\xED h\u011Bn n\xE1n, d\xE0n w\u01D2 xi\u01CEng sh\xECshi.", vi: "C\xE2u h\u1ECFi n\xE0y r\u1EA5t kh\xF3, nh\u01B0ng t\xF4i mu\u1ED1n l\xE0m th\u1EED xem sao." }
    ],
    tips: "Ng\xF4n (\u8BA0- l\u1EDDi n\xF3i) + Th\u1EE9c (\u5F0F - m\u1EABu th\u1EED). L\u1EDDi n\xF3i th\u0103m d\xF2, th\u1EED nghi\u1EC7m. Ph\u1ED3n th\u1EC3: \u8A66."
  },
  {
    hanzi: "\u7EA2\u8272",
    pinyin: "h\xF3ngs\xE8",
    hanViet: "H\u1ED3ng S\u1EAFc",
    vietnamese: "M\xE0u \u0111\u1ECF",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    strokeCount: 12,
    examples: [
      { zh: "\u4E2D\u56FD\u65B0\u5E74\u5927\u5BB6\u5E38\u7A7F\u7EA2\u8272\u7684\u8863\u670D\u3002", pinyin: "Zh\u014Dnggu\xF3 x\u012Bnni\xE1n d\xE0ji\u0101 ch\xE1ng chu\u0101n h\xF3ngs\xE8 de y\u012Bfu.", vi: "V\xE0o T\u1EBFt Nguy\xEAn \u0110\xE1n Trung Qu\u1ED1c, m\u1ECDi ng\u01B0\u1EDDi th\u01B0\u1EDDng m\u1EB7c \u0111\u1ED3 m\xE0u \u0111\u1ECF." },
      { zh: "\u90A3\u4E2A\u7EA2\u8272\u7684\u82F9\u679C\u770B\u8D77\u6765\u5F88\u597D\u5403\u3002", pinyin: "N\xE0 ge h\xF3ngs\xE8 de p\xEDnggu\u01D2 k\xE0n q\u01D0l\xE1i h\u011Bn h\u01CEoch\u012B.", vi: "Qu\u1EA3 t\xE1o m\xE0u \u0111\u1ECF kia tr\xF4ng ngon qu\xE1." }
    ],
    tips: "\u7EA2 (S\u1EE3i t\u01A1 \u7E9F nhu\u1ED9m m\xE0u \u0111\u1ECF t\u01B0\u01A1i) + \u8272 (M\xE0u s\u1EAFc). T\u01B0\u1EE3ng tr\u01B0ng cho may m\u1EAFn, ph\xFAc t\xE0i. Ph\u1ED3n th\u1EC3: \u7D05\u8272."
  },
  {
    hanzi: "\u6240\u4EE5",
    pinyin: "su\u01D2y\u01D0",
    hanViet: "S\u1EDF D\u0129",
    vietnamese: "Cho n\xEAn, v\xEC th\u1EBF, do \u0111\xF3",
    partOfSpeech: "Li\xEAn t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    radical: "\u6237 (H\u1ED9) + \u4EBA (Nh\xE2n)",
    strokeCount: 12,
    examples: [
      { zh: "\u4ECA\u5929\u6211\u5F88\u5FD9\uFF0C\u6240\u4EE5\u4E0D\u80FD\u548C\u4F60\u53BB\u5403\u996D\u3002", pinyin: "J\u012Bnti\u0101n w\u01D2 h\u011Bn m\xE1ng, su\u01D2y\u01D0 b\xF9 n\xE9ng h\xE9 n\u01D0 q\xF9 ch\u012Bf\xE0n.", vi: "H\xF4m nay t\xF4i r\u1EA5t b\u1EADn, cho n\xEAn kh\xF4ng th\u1EC3 \u0111i \u0103n c\u01A1m c\xF9ng b\u1EA1n." },
      { zh: "\u4ED6\u5F88\u52AA\u529B\uFF0C\u6240\u4EE5\u6210\u7EE9\u5F88\u597D\u3002", pinyin: "T\u0101 h\u011Bn n\u01D4l\xEC, su\u01D2y\u01D0 ch\xE9ngj\xEC h\u011Bn h\u01CEo.", vi: "Anh \u1EA5y r\u1EA5t ch\u0103m ch\u1EC9, v\xEC th\u1EBF th\xE0nh t\xEDch r\u1EA5t t\u1ED1t." }
    ],
    tips: "\u6240 (N\u01A1i ch\u1ED1n, nguy\xEAn c\u1EDB) + \u4EE5 (L\u1EA5y l\xE0m c\u1EDB). Bi\u1EC3u th\u1ECB k\u1EBFt qu\u1EA3 t\u1EA5t y\u1EBFu."
  },
  {
    hanzi: "\u4E66\u5305",
    pinyin: "sh\u016Bb\u0101o",
    hanViet: "Th\u01B0 Bao",
    vietnamese: "C\u1EB7p s\xE1ch, ba l\xF4 \u0111i h\u1ECDc",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 d\xF9ng h\u1ECDc t\u1EADp",
    radical: "\u4E5B (\u1EA4t) + \u52F9 (Bao)",
    strokeCount: 9,
    examples: [
      { zh: "\u4ED6\u7684\u4E66\u5305\u91CC\u88C5\u6EE1\u4E86\u8BFE\u672C\u3002", pinyin: "T\u0101 de sh\u016Bb\u0101o l\u01D0 zhu\u0101ng m\u01CEn le k\xE8b\u011Bn.", vi: "Trong c\u1EB7p s\xE1ch c\u1EE7a c\u1EADu \u1EA5y ch\u1EE9a \u0111\u1EA7y s\xE1ch gi\xE1o khoa." },
      { zh: "\u8FD9\u4E2A\u4E66\u5305\u8D28\u91CF\u5F88\u597D\uFF0C\u4E5F\u5F88\u8F7B\u3002", pinyin: "Zh\xE8 ge sh\u016Bb\u0101o zh\xECli\xE0ng h\u011Bn h\u01CEo, y\u011B h\u011Bn q\u012Bng.", vi: "Chi\u1EBFc c\u1EB7p s\xE1ch n\xE0y ch\u1EA5t l\u01B0\u1EE3ng r\u1EA5t t\u1ED1t v\xE0 c\u0169ng r\u1EA5t nh\u1EB9." }
    ],
    tips: "\u4E66 (S\xE1ch) + \u5305 (T\xFAi, bao b\u1ECDc). Chi\u1EBFc t\xFAi \u0111\u1EF1ng s\xE1ch c\u1EE7a h\u1ECDc sinh. Ph\u1ED3n th\u1EC3: \u66F8\u5305."
  },
  {
    hanzi: "\u8FC7\u53BB",
    pinyin: "gu\xF2qu",
    hanViet: "Qu\xE1 Kh\u1EE9",
    vietnamese: "\u0110i qua, qua b\xEAn kia; (gu\xF2q\xF9) qu\xE1 kh\u1EE9, tr\u01B0\u1EDBc \u0111\xE2y",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng / Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & H\xE0nh \u0111\u1ED9ng",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    strokeCount: 11,
    examples: [
      { zh: "\u6211\u4EEC\u8D70\u8FC7\u53BB\u770B\u770B\u5427\u3002", pinyin: "W\u01D2men z\u01D2u gu\xF2qu k\xE0nkan ba.", vi: "Ch\xFAng m\xECnh \u0111i qua \u0111\xF3 xem th\u1EED \u0111i." },
      { zh: "\u8FC7\u53BB\u7684\u4E8B\u5C31\u8BA9\u5B83\u8FC7\u53BB\u5427\u3002", pinyin: "Gu\xF2q\xF9 de sh\xEC ji\xF9 r\xE0ng t\u0101 gu\xF2qu ba.", vi: "Chuy\u1EC7n qu\xE1 kh\u1EE9 th\xEC c\u1EE9 \u0111\u1EC3 n\xF3 tr\xF4i qua \u0111i." }
    ],
    tips: "\u8FC7 (B\u0103ng qua) + \u53BB (\u0110i xa kh\u1ECFi v\u1ECB tr\xED n\xF3i). Thanh nh\u1EB9 l\xE0 \u0111\u1ED9ng t\u1EEB, thanh 4 l\xE0 danh t\u1EEB th\u1EDDi gian. Ph\u1ED3n th\u1EC3: \u904E\u53BB."
  },
  {
    hanzi: "\u7EFF\u8272",
    pinyin: "l\u01DCs\xE8",
    hanViet: "L\u1EE5c S\u1EAFc",
    vietnamese: "M\xE0u xanh l\xE1 c\xE2y",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    strokeCount: 17,
    examples: [
      { zh: "\u516C\u56ED\u91CC\u6709\u5F88\u591A\u7EFF\u8272\u7684\u6811\u6728\u3002", pinyin: "G\u014Dngyu\xE1n l\u01D0 y\u01D2u h\u011Bn du\u014D l\u01DCs\xE8 de sh\xF9m\xF9.", vi: "Trong c\xF4ng vi\xEAn c\xF3 r\u1EA5t nhi\u1EC1u c\xE2y c\u1ED1i m\xE0u xanh l\xE1." },
      { zh: "\u591A\u770B\u7EFF\u8272\u5BF9\u773C\u775B\u597D\u3002", pinyin: "Du\u014D k\xE0n l\u01DCs\xE8 du\xEC y\u01CEnjing h\u01CEo.", vi: "Nh\xECn nhi\u1EC1u m\xE0u xanh l\xE1 c\xE2y r\u1EA5t t\u1ED1t cho m\u1EAFt." }
    ],
    tips: "\u7EFF (T\u01A1 \u7E9F nhu\u1ED9m m\xE0u l\u1EE5c l\xE1 c\u1ECF) + \u8272 (M\xE0u s\u1EAFc). T\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 s\u1ED1ng m\xE1t l\xE0nh. Ph\u1ED3n th\u1EC3: \u7DA0\u8272."
  },
  {
    hanzi: "\u9ED1\u8272",
    pinyin: "h\u0113is\xE8",
    hanViet: "H\u1EAFc S\u1EAFc",
    vietnamese: "M\xE0u \u0111en",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u9ED1 (H\u1EAFc) + \u2E88 (S\u1EAFc)",
    strokeCount: 18,
    examples: [
      { zh: "\u4ED6\u6234\u7740\u4E00\u526F\u9ED1\u8272\u7684\u773C\u955C\u3002", pinyin: "T\u0101 d\xE0i zhe y\xED f\xF9 h\u0113is\xE8 de y\u01CEnj\xECng.", vi: "Anh \u1EA5y \u0111eo m\u1ED9t c\u1EB7p k\xEDnh m\u1EAFt m\xE0u \u0111en." },
      { zh: "\u6211\u4E70\u4E86\u4E00\u8F86\u9ED1\u8272\u7684\u81EA\u884C\u8F66\u3002", pinyin: "W\u01D2 m\u01CEi le y\xED li\xE0ng h\u0113is\xE8 de z\xECx\xEDngch\u0113.", vi: "T\xF4i \u0111\xE3 mua m\u1ED9t chi\u1EBFc xe \u0111\u1EA1p m\xE0u \u0111en." }
    ],
    tips: "\u9ED1 (L\xF2 kh\xF3i l\u1EEDa \u0111en) + \u8272 (M\xE0u s\u1EAFc). Bi\u1EC3u th\u1ECB m\xE0u t\u1ED1i, huy\u1EC1n b\xED, l\u1ECBch thi\u1EC7p."
  },
  {
    hanzi: "\u66F4",
    pinyin: "g\xE8ng",
    hanViet: "Canh / C\xE1nh",
    vietnamese: "C\xE0ng, h\u01A1n n\u1EEFa (so s\xE1nh m\u1EE9c \u0111\u1ED9)",
    partOfSpeech: "Ph\xF3 t\u1EEB",
    level: 2,
    category: "Ph\xF3 t\u1EEB & So s\xE1nh",
    radical: "\u66F0 (Vi\u1EBFt)",
    strokeCount: 7,
    examples: [
      { zh: "\u660E\u5929\u5929\u6C14\u4F1A\u66F4\u597D\u3002", pinyin: "M\xEDngti\u0101n ti\u0101nq\xEC hu\xEC g\xE8ng h\u01CEo.", vi: "Th\u1EDDi ti\u1EBFt ng\xE0y mai s\u1EBD c\xE0ng t\u1ED1t h\u01A1n n\u1EEFa." },
      { zh: "\u8FD9\u672C\u4E66\u6BD4\u90A3\u672C\u66F4\u6709\u610F\u601D\u3002", pinyin: "Zh\xE8 b\u011Bn sh\u016B b\u01D0 n\xE0 b\u011Bn g\xE8ng y\u01D2u y\xECsi.", vi: "Cu\u1ED1n s\xE1ch n\xE0y th\xFA v\u1ECB h\u01A1n cu\u1ED1n s\xE1ch kia." }
    ],
    tips: "Canh \u66F4 ch\u1EC9 s\u1EF1 thay \u0111\u1ED5i phi\xEAn canh, chuy\u1EC3n ngh\u0129a th\xE0nh ph\xF3 t\u1EEB so s\xE1nh bi\u1EC3u th\u1ECB m\u1EE9c \u0111\u1ED9 cao h\u01A1n."
  },
  {
    hanzi: "\u989C\u8272",
    pinyin: "y\xE1ns\xE8",
    hanViet: "Nhan S\u1EAFc",
    vietnamese: "M\xE0u s\u1EAFc",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc & Mi\xEAu t\u1EA3",
    radical: "\u9875 (Hi\u1EC7t) + \u2E88 (S\u1EAFc)",
    strokeCount: 21,
    examples: [
      { zh: "\u4F60\u6700\u559C\u6B22\u4EC0\u4E48\u989C\u8272\uFF1F", pinyin: "N\u01D0 zu\xEC x\u01D0huan sh\xE9nme y\xE1ns\xE8?", vi: "B\u1EA1n th\xEDch m\xE0u s\u1EAFc n\xE0o nh\u1EA5t?" },
      { zh: "\u8FD9\u79CD\u82B1\u7684\u989C\u8272\u975E\u5E38\u6F02\u4EAE\u3002", pinyin: "Zh\xE8 zh\u01D2ng hu\u0101 de y\xE1ns\xE8 f\u0113ich\xE1ng pi\xE0oliang.", vi: "M\xE0u s\u1EAFc c\u1EE7a lo\xE0i hoa n\xE0y v\xF4 c\xF9ng \u0111\u1EB9p \u0111\u1EBD." }
    ],
    tips: "\u989C (Nhan di\u1EC7n tr\xEAn m\u1EB7t) + \u8272 (M\xE0u v\u1EBB). M\u1EDF r\u1ED9ng ra c\xE1c gam m\xE0u trong th\u1EBF gi\u1EDBi t\u1EF1 nhi\xEAn. Ph\u1ED3n th\u1EC3: \u984F\u8272."
  },
  {
    hanzi: "\u5FEB",
    pinyin: "ku\xE0i",
    hanViet: "Kho\xE1i",
    vietnamese: "Nhanh, mau ch\xF3ng; s\u1EAFp",
    partOfSpeech: "T\xEDnh t\u1EEB / Ph\xF3 t\u1EEB",
    level: 2,
    category: "T\xEDnh ch\u1EA5t & T\u1ED1c \u0111\u1ED9",
    radical: "\u5FC4 (T\xE2m)",
    strokeCount: 7,
    examples: [
      { zh: "\u4ED6\u8D70\u5F97\u975E\u5E38\u5FEB\u3002", pinyin: "T\u0101 z\u01D2u de f\u0113ich\xE1ng ku\xE0i.", vi: "Anh \u1EA5y \u0111i r\u1EA5t nhanh." },
      { zh: "\u5FEB\u70B9\u513F\uFF0C\u706B\u8F66\u8981\u5F00\u4E86\uFF01", pinyin: "Ku\xE0i di\u01CEnr, hu\u01D2ch\u0113 y\xE0o k\u0101i le!", vi: "Nhanh l\xEAn ch\xFAt, xe l\u1EEDa s\u1EAFp ch\u1EA1y r\u1ED3i!" }
    ],
    tips: "B\u1ED9 T\xE2m \u0111\u1EE9ng (\u5FC4) ch\u1EC9 t\xE2m tr\u1EA1ng h\xE2n hoan s\u1EA3ng kho\xE1i v\xE0 t\xEDnh mau l\u1EB9 kh\u1EA9n tr\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u5FEB."
  },
  {
    hanzi: "\u4E0B\u6765",
    pinyin: "xi\xE0lai",
    hanViet: "H\u1EA1 Lai",
    vietnamese: "\u0110i xu\u1ED1ng, xu\u1ED1ng \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    strokeCount: 10,
    examples: [
      { zh: "\u4F60\u5728\u697C\u4E0A\u7B49\u6211\uFF0C\u6211\u9A6C\u4E0A\u4E0B\u6765\u3002", pinyin: "N\u01D0 z\xE0i l\xF3ush\xE0ng d\u011Bng w\u01D2, w\u01D2 m\u01CEsh\xE0ng xi\xE0lai.", vi: "B\u1EA1n \u0111\u1EE3i t\xF4i \u1EDF tr\xEAn l\u1EA7u, t\xF4i xu\u1ED1ng ngay \u0111\xE2y." },
      { zh: "\u5FEB\u4ECE\u6811\u4E0A\u4E0B\u6765\uFF0C\u592A\u5371\u9669\u4E86\uFF01", pinyin: "Ku\xE0i c\xF3ng sh\xF9 sh\xE0ng xi\xE0lai, t\xE0i w\u0113ixi\u01CEn le!", vi: "Mau t\u1EEB tr\xEAn c\xE2y leo xu\u1ED1ng \u0111\xE2y, nguy hi\u1EC3m qu\xE1!" }
    ],
    tips: "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Lai (\u6765 - \u0111\u1EBFn/l\u1EA1i). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng ch\u1EC9 chuy\u1EC3n \u0111\u1ED9ng t\u1EEB tr\xEAn cao xu\u1ED1ng ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0A\u6765",
    pinyin: "sh\xE0nglai",
    hanViet: "Th\u01B0\u1EE3ng Lai",
    vietnamese: "\u0110i l\xEAn, l\xEAn \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    strokeCount: 10,
    examples: [
      { zh: "\u4F60\u4E0A\u6765\u5427\uFF0C\u6211\u5BB6\u5728\u4E09\u697C\u3002", pinyin: "N\u01D0 sh\xE0nglai ba, w\u01D2 ji\u0101 z\xE0i s\u0101n l\xF3u.", vi: "B\u1EA1n l\xEAn \u0111\xE2y \u0111i, nh\xE0 t\xF4i \u1EDF t\u1EA7ng ba." },
      { zh: "\u8BF7\u5927\u5BB6\u5FEB\u70B9\u513F\u4E0A\u8F66\u6765\u3002", pinyin: "Q\u01D0ng d\xE0ji\u0101 ku\xE0i di\u01CEnr sh\xE0ngch\u0113 lai.", vi: "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi mau b\u01B0\u1EDBc l\xEAn xe n\xE0o." }
    ],
    tips: "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng di chuy\u1EC3n t\u1EEB d\u01B0\u1EDBi th\u1EA5p l\xEAn ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0A\u53BB",
    pinyin: "sh\xE0ngqu",
    hanViet: "Th\u01B0\u1EE3ng Kh\u1EE9",
    vietnamese: "\u0110i l\xEAn \u0111\xF3, b\u01B0\u1EDBc l\xEAn (r\u1EDDi xa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    strokeCount: 8,
    examples: [
      { zh: "\u7535\u68AF\u574F\u4E86\uFF0C\u6211\u4EEC\u8D70\u697C\u68AF\u4E0A\u53BB\u5427\u3002", pinyin: "Di\xE0nt\u012B hu\xE0i le, w\u01D2men z\u01D2u l\xF3ut\u012B sh\xE0ngqu ba.", vi: "Thang m\xE1y h\u1ECFng r\u1ED3i, ch\xFAng m\xECnh \u0111i thang b\u1ED9 l\xEAn tr\xEAn \u0111\xF3 \u0111i." },
      { zh: "\u628A\u884C\u674E\u642C\u4E0A\u53BB\u3002", pinyin: "B\u01CE x\xEDngli b\u0101n sh\xE0ngqu.", vi: "Khu\xE2n h\xE0nh l\xFD l\xEAn tr\xEAn \u0111\xF3." }
    ],
    tips: "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Xu h\u01B0\u1EDBng di chuy\u1EC3n t\u1EEB v\u1ECB tr\xED hi\u1EC7n t\u1EA1i l\xEAn m\u1ED9t n\u01A1i cao h\u01A1n xa ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0B\u9762",
    pinyin: "xi\xE0mi\xE0n",
    hanViet: "H\u1EA1 Di\u1EC7n",
    vietnamese: "B\xEAn d\u01B0\u1EDBi, ph\xEDa d\u01B0\u1EDBi, ph\u1EA7n d\u01B0\u1EDBi",
    partOfSpeech: "Danh t\u1EEB ch\u1EC9 ph\u01B0\u01A1ng v\u1ECB",
    level: 2,
    category: "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    radical: "\u4E00 (Nh\u1EA5t) + \u9762 (Di\u1EC7n)",
    strokeCount: 12,
    examples: [
      { zh: "\u732B\u5728\u684C\u5B50\u4E0B\u9762\u7761\u89C9\u3002", pinyin: "M\u0101o z\xE0i zhu\u014Dzi xi\xE0mi\xE0n shu\xECji\xE0o.", vi: "Con m\xE8o \u0111ang ng\u1EE7 \u1EDF d\u01B0\u1EDBi g\u1EA7m b\xE0n." },
      { zh: "\u6811\u4E0B\u9762\u5F88\u51C9\u5FEB\u3002", pinyin: "Sh\xF9 xi\xE0mi\xE0n h\u011Bn li\xE1ngkuai.", vi: "D\u01B0\u1EDBi b\xF3ng c\xE2y r\u1EA5t m\xE1t m\u1EBB." }
    ],
    tips: "H\u1EA1 (\u4E0B - d\u01B0\u1EDBi) + Di\u1EC7n (\u9762 - m\u1EB7t/ph\xEDa). Ch\u1EC9 v\u1ECB tr\xED \u1EDF kho\u1EA3ng kh\xF4ng gian ph\xEDa d\u01B0\u1EDBi c\u1EE7a v\u1EADt th\u1EC3."
  },
  {
    hanzi: "\u9762",
    pinyin: "mi\xE0n",
    hanViet: "Di\u1EC7n / Mi\u1EBFn",
    vietnamese: "M\u1EB7t, b\u1EC1 m\u1EB7t, ph\u01B0\u01A1ng di\u1EC7n; m\xEC s\u1EE3i, b\u1ED9t m\xEC",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Ph\u01B0\u01A1ng v\u1ECB & \u1EA8m th\u1EF1c",
    radical: "\u9762 (Di\u1EC7n)",
    strokeCount: 9,
    examples: [
      { zh: "\u4ECA\u5929\u4E2D\u5348\u6211\u60F3\u5403\u4E00\u7897\u725B\u8089\u9762\u3002", pinyin: "J\u012Bnti\u0101n zh\u014Dngw\u01D4 w\u01D2 xi\u01CEng ch\u012B y\xEC w\u01CEn ni\xFAr\xF2umi\xE0n.", vi: "Tr\u01B0a nay t\xF4i mu\u1ED1n \u0103n m\u1ED9t b\xE1t m\xEC b\xF2." },
      { zh: "\u6211\u4EEC\u89C1\u4E00\u9762\u5427\u3002", pinyin: "W\u01D2men ji\xE0n y\xED mi\xE0n ba.", vi: "Ch\xFAng m\xECnh g\u1EB7p m\u1EB7t nhau m\u1ED9t l\u1EA7n nh\xE9." }
    ],
    tips: "B\u1ED9 Di\u1EC7n (\u9762) h\xECnh d\xE1ng khu\xF4n m\u1EB7t ng\u01B0\u1EDDi v\u1EDBi \u0111\u01B0\u1EDDng n\xE9t bao quanh. Trong \u1EA9m th\u1EF1c ch\u1EEF \u9762 (ph\u1ED3n th\u1EC3 \u9EB5) d\xF9ng ch\u1EC9 c\xE1c m\xF3n m\xEC s\u1EE3i v\xE0 b\u1ED9t l\xE0m b\xE1nh."
  },
  {
    hanzi: "\u7B49",
    pinyin: "d\u011Bng",
    hanViet: "\u0110\u1EB3ng",
    vietnamese: "\u0110\u1EE3i, ch\u1EDD; b\u1EB1ng nhau; v\xE2n v\xE2n",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Th\u1EDDi gian",
    radical: "\u2EAE (Tr\xFAc)",
    strokeCount: 12,
    examples: [
      { zh: "\u8BF7\u5728\u95E8\u53E3\u7B49\u6211\u4E94\u5206\u949F\u3002", pinyin: "Q\u01D0ng z\xE0i m\xE9nk\u01D2u d\u011Bng w\u01D2 w\u01D4 f\u0113nzh\u014Dng.", vi: "Xin vui l\xF2ng \u0111\u1EE3i t\xF4i \u1EDF c\u1EEDa n\u0103m ph\xFAt nh\xE9." },
      { zh: "\u6211\u7B49\u4E86\u5F88\u4E45\uFF0C\u4ED6\u8FD8\u662F\u6CA1\u6765\u3002", pinyin: "W\u01D2 d\u011Bng le h\u011Bn ji\u01D4, t\u0101 h\xE1ish\xEC m\xE9i l\xE1i.", vi: "T\xF4i \u0111\xE3 ch\u1EDD r\u1EA5t l\xE2u r\u1ED3i m\xE0 anh \u1EA5y v\u1EABn ch\u01B0a \u0111\u1EBFn." }
    ],
    tips: "B\u1ED9 Tr\xFAc (\u2EAE) \u1EDF tr\xEAn c\xF9ng ch\u1EEF T\u1EF1 (\u5BFA) ng\xF4i ch\xF9a. Ban \u0111\u1EA7u l\xE0 c\xE1c th\u1EBB tre ghi th\u1EE9 b\u1EADc ph\u1EA9m c\u1EA5p, sau m\u01B0\u1EE3n ngh\u0129a th\xE0nh h\xE0nh \u0111\u1ED9ng ch\u1EDD \u0111\u1EE3i."
  },
  {
    hanzi: "\u4E00\u4F1A\u513F",
    pinyin: "y\xEDhu\xECr",
    hanViet: "Nh\u1EA5t H\u1ED9i Nhi",
    vietnamese: "M\u1ED9t l\xE1t, m\u1ED9t ch\u1ED1c, m\u1ED9t ch\xFAt",
    partOfSpeech: "Danh t\u1EEB th\u1EDDi gian / Ph\xF3 t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & T\u1EA7n su\u1EA5t",
    radical: "\u4E00 (Nh\u1EA5t) + \u4EBA (Nh\xE2n) + \u513F (Nhi)",
    strokeCount: 9,
    examples: [
      { zh: "\u4F60\u5148\u5750\u4E00\u4F1A\u513F\uFF0C\u6211\u6CE1\u676F\u8336\u7ED9\u4F60\u3002", pinyin: "N\u01D0 xi\u0101n zu\xF2 y\xEDhu\xECr, w\u01D2 p\xE0o b\u0113i ch\xE1 g\u011Bi n\u01D0.", vi: "B\u1EA1n ng\u1ED3i m\u1ED9t l\xE1t \u0111\xE3 nh\xE9, t\xF4i pha c\u1ED1c tr\xE0 cho b\u1EA1n." },
      { zh: "\u4ED6\u770B\u4E86\u4E00\u4F1A\u513F\u4E66\u5C31\u53BB\u7761\u89C9\u4E86\u3002", pinyin: "T\u0101 k\xE0n le y\xEDhu\xECr sh\u016B ji\xF9 q\xF9 shu\xECji\xE0o le.", vi: "Anh \u1EA5y \u0111\u1ECDc s\xE1ch m\u1ED9t l\xE1t r\u1ED3i \u0111i ng\u1EE7." }
    ],
    tips: "Nh\u1EA5t (\u4E00) + H\u1ED9i (\u4F1A - t\u1EE5 l\u1EA1i/th\u1EDDi kh\u1EAFc) + Nhi (\u513F - \xE2m u\u1ED1n l\u01B0\u1EE1i). Bi\u1EC3u th\u1ECB kho\u1EA3ng th\u1EDDi gian r\u1EA5t ng\u1EAFn, ch\u1ED1c l\xE1t. Ph\u1ED3n th\u1EC3: \u4E00\u6703\u5152."
  },
  {
    hanzi: "\u4E0B\u53BB",
    pinyin: "xi\xE0qu",
    hanViet: "H\u1EA1 Kh\u1EE9",
    vietnamese: "\u0110i xu\u1ED1ng \u0111\xF3, ti\u1EBFp t\u1EE5c (h\u01B0\u1EDBng xa ng\u01B0\u1EDDi n\xF3i ho\u1EB7c ti\u1EBFp di\u1EC5n)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    strokeCount: 8,
    examples: [
      { zh: "\u4ECE\u8FD9\u91CC\u8D70\u4E0B\u53BB\u5C31\u662F\u5730\u94C1\u7AD9\u3002", pinyin: "C\xF3ng zh\xE8l\u01D0 z\u01D2u xi\xE0qu ji\xF9 sh\xEC d\xECti\u011B zh\xE0n.", vi: "T\u1EEB \u0111\xE2y \u0111i b\u1ED9 xu\u1ED1ng d\u01B0\u1EDBi l\xE0 tr\u1EA1m t\xE0u \u0111i\u1EC7n ng\u1EA7m." },
      { zh: "\u8BF7\u4F60\u7EE7\u7EED\u8BF4\u4E0B\u53BB\u3002", pinyin: "Q\u01D0ng n\u01D0 j\xECx\xF9 shu\u014D xi\xE0qu.", vi: "Xin b\u1EA1n h\xE3y ti\u1EBFp t\u1EE5c n\xF3i ti\u1EBFp \u0111i." }
    ],
    tips: "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Ngo\xE0i ngh\u0129a ch\u1EC9 h\u01B0\u1EDBng \u0111i xu\u1ED1ng n\u01A1i kh\xE1c, c\xF2n d\xF9ng l\xE0m b\u1ED5 ng\u1EEF xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng ti\u1EBFp di\u1EC5n."
  },
  {
    hanzi: "\u8FDB\u6765",
    pinyin: "j\xECnlai",
    hanViet: "Ti\u1EBFn Lai",
    vietnamese: "\u0110i v\xE0o, v\xE0o \u0111\xE2y (h\u01B0\u1EDBng v\xE0o trong n\u01A1i ng\u01B0\u1EDDi n\xF3i \u1EDF)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Giao ti\u1EBFp",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u6728 (M\u1ED9c)",
    strokeCount: 14,
    examples: [
      { zh: "\u5916\u9762\u51B7\uFF0C\u5FEB\u8BF7\u8FDB\u6765\u559D\u676F\u70ED\u8336\uFF01", pinyin: "W\xE0imi\xE0n l\u011Bng, ku\xE0i q\u01D0ng j\xECnlai h\u0113 b\u0113i r\xE8ch\xE1!", vi: "B\xEAn ngo\xE0i l\u1EA1nh l\u1EAFm, mau m\u1EDDi v\xE0o \u0111\xE2y u\u1ED1ng ch\xE9n tr\xE0 n\xF3ng!" },
      { zh: "\u4ED6\u6572\u4E86\u6572\u95E8\u5C31\u8D70\u8FDB\u6765\u4E86\u3002", pinyin: "T\u0101 qi\u0101o le qi\u0101o m\xE9n ji\xF9 z\u01D2u j\xECnlai le.", vi: "Anh \u1EA5y g\xF5 c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o ph\xF2ng." }
    ],
    tips: "Ti\u1EBFn (\u8FDB - \u0111i v\xE0o) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). Ch\u1EC9 h\xE0nh \u0111\u1ED9ng b\u01B0\u1EDBc v\xE0o t\u1EEB ngo\xE0i v\xE0o trong h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i. Ph\u1ED3n th\u1EC3: \u9032\u4F86."
  },
  {
    hanzi: "\u7237\u7237",
    pinyin: "y\xE9ye",
    hanViet: "Gia Gia",
    vietnamese: "\xD4ng n\u1ED9i, \xF4ng (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng ng\u01B0\u1EDDi gi\xE0)",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    radical: "\u7236 (Ph\u1EE5)",
    strokeCount: 12,
    examples: [
      { zh: "\u7237\u7237\u6BCF\u5929\u65E9\u4E0A\u90FD\u4F1A\u53BB\u516C\u56ED\u6253\u592A\u6781\u62F3\u3002", pinyin: "Y\xE9ye m\u011Biti\u0101n z\u01CEoshang d\u014Du hu\xEC q\xF9 g\u014Dngyu\xE1n d\u01CE t\xE0ij\xEDqu\xE1n.", vi: "\xD4ng n\u1ED9i m\u1ED7i s\xE1ng \u0111\u1EC1u \u0111i ra c\xF4ng vi\xEAn t\u1EADp Th\xE1i C\u1EF1c Quy\u1EC1n." },
      { zh: "\u4ECA\u5E74\u7237\u7237\u4E03\u5341\u5C81\u4E86\uFF0C\u8EAB\u4F53\u5F88\u5065\u5EB7\u3002", pinyin: "J\u012Bnni\xE1n y\xE9ye q\u012Bsh\xED su\xEC le, sh\u0113nt\u01D0 h\u011Bn ji\xE0nk\u0101ng.", vi: "N\u0103m nay \xF4ng n\u1ED9i b\u1EA3y m\u01B0\u01A1i tu\u1ED5i r\u1ED3i, s\u1EE9c kh\u1ECFe r\u1EA5t t\u1ED1t." }
    ],
    tips: "Ch\u1EEF Gia (\u7237) g\u1ED3m b\u1ED9 Ph\u1EE5 (\u7236 - cha gi\xE0) \u1EDF tr\xEAn v\xE0 ch\u1EEF Nguy (\u5371) \u1EDF d\u01B0\u1EDBi. L\u1EB7p l\u1EA1i hai ch\u1EEF \u7237\u7237 t\u1EA1o th\xE0nh ti\u1EBFng g\u1ECDi \xF4ng n\u1ED9i th\xE2n th\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u723A\u723A."
  },
  {
    hanzi: "\u5976\u5976",
    pinyin: "n\u01CEinai",
    hanViet: "N\xE3i N\xE3i",
    vietnamese: "B\xE0 n\u1ED9i, b\xE0 (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng b\xE0 c\u1EE5)",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    radical: "\u5973 (N\u1EEF)",
    strokeCount: 10,
    examples: [
      { zh: "\u5976\u5976\u505A\u7684\u5305\u5B50\u975E\u5E38\u597D\u5403\u3002", pinyin: "N\u01CEinai zu\xF2 de b\u0101ozi f\u0113ich\xE1ng h\u01CEoch\u012B.", vi: "B\xE1nh bao b\xE0 n\u1ED9i l\xE0m ngon v\xF4 c\xF9ng." },
      { zh: "\u6211\u5E38\u7ED9\u5976\u5976\u6253\u7535\u8BDD\u95EE\u597D\u3002", pinyin: "W\u01D2 ch\xE1ng g\u011Bi n\u01CEinai d\u01CE di\xE0nhu\xE0 w\xE8nh\u01CEo.", vi: "T\xF4i th\u01B0\u1EDDng g\u1ECDi \u0111i\u1EC7n tho\u1EA1i h\u1ECFi th\u0103m s\u1EE9c kh\u1ECFe b\xE0 n\u1ED9i." }
    ],
    tips: "B\u1ED9 N\u1EEF (\u5973) k\u1EBFt h\u1EE3p N\xE3i (\u4E43). Ti\u1EBFng g\u1ECDi l\u1EB7p l\u1EA1i \u5976\u5976 l\xE0 x\u01B0ng h\xF4 g\u1EA7n g\u0169i, \u1EA5m \xE1p d\xE0nh cho b\xE0 n\u1ED9i trong gia \u0111\xECnh."
  },
  {
    hanzi: "\u793C\u7269",
    pinyin: "l\u01D0w\xF9",
    hanViet: "L\u1EC5 V\u1EADt",
    vietnamese: "M\xF3n qu\xE0, qu\xE0 t\u1EB7ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1EDDi s\u1ED1ng & Giao ti\u1EBFp",
    radical: "\u793B (K\u1EF3) + \u725C (Ng\u01B0u)",
    strokeCount: 13,
    examples: [
      { zh: "\u8FD9\u662F\u6211\u9001\u7ED9\u4F60\u7684\u751F\u65E5\u793C\u7269\u3002", pinyin: "Zh\xE8 sh\xEC w\u01D2 s\xF2ng g\u011Bi n\u01D0 de sh\u0113ngr\xEC l\u01D0w\xF9.", vi: "\u0110\xE2y l\xE0 m\xF3n qu\xE0 sinh nh\u1EADt t\xF4i t\u1EB7ng b\u1EA1n." },
      { zh: "\u4ED6\u6536\u5230\u4E86\u4E00\u4EFD\u7279\u522B\u7684\u793C\u7269\u3002", pinyin: "T\u0101 sh\u014Dud\xE0o le y\xED f\xE8n t\xE8bi\xE9 de l\u01D0w\xF9.", vi: "Anh \u1EA5y \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t m\xF3n qu\xE0 v\xF4 c\xF9ng \u0111\u1EB7c bi\u1EC7t." }
    ],
    tips: "L\u1EC5 (\u793C - l\u1EC5 ngh\u0129a t\xF4n k\xEDnh, b\u1ED9 K\u1EF3 \u793B) + V\u1EADt (\u7269 - \u0111\u1ED3 v\u1EADt, b\u1ED9 Ng\u01B0u \u725C). M\xF3n \u0111\u1ED3 v\u1EADt ch\u1EE9a \u0111\u1EF1ng t\u1EA5m l\xF2ng v\xE0 s\u1EF1 t\xF4n tr\u1ECDng trao g\u1EEDi nhau. Ph\u1ED3n th\u1EC3: \u79AE\u7269."
  },
  {
    hanzi: "\u5976\u8336",
    pinyin: "n\u01CEich\xE1",
    hanViet: "N\xE3i Tr\xE0",
    vietnamese: "Tr\xE0 s\u1EEFa",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    radical: "\u5973 (N\u1EEF) + \u8279 (Th\u1EA3o)",
    strokeCount: 14,
    examples: [
      { zh: "\u4E0B\u5348\u6211\u4EEC\u4E00\u8D77\u559D\u676F\u73CD\u73E0\u5976\u8336\u5427\uFF01", pinyin: "Xi\xE0w\u01D4 w\u01D2men y\xECq\u01D0 h\u0113 b\u0113i zh\u0113nzh\u016B n\u01CEich\xE1 ba!", vi: "Chi\u1EC1u nay t\u1EE5i m\xECnh c\xF9ng \u0111i u\u1ED1ng m\u1ED9t ly tr\xE0 s\u1EEFa tr\xE2n ch\xE2u nh\xE9!" },
      { zh: "\u8FD9\u5BB6\u5E97\u7684\u5976\u8336\u65E2\u9999\u53C8\u597D\u559D\u3002", pinyin: "Zh\xE8 ji\u0101 di\xE0n de n\u01CEich\xE1 j\xEC xi\u0101ng y\xF2u h\u01CEoh\u0113.", vi: "Tr\xE0 s\u1EEFa c\u1EE7a ti\u1EC7m n\xE0y v\u1EEBa th\u01A1m l\u1EA1i v\u1EEBa ngon." }
    ],
    tips: "N\xE3i (\u5976 - s\u1EEFa t\u01B0\u01A1i th\u01A1m m\xE1t) + Tr\xE0 (\u8336 - l\xE1 ch\xE8 b\u1ED9 Th\u1EA3o \u8279). \u0110\u1ED3 u\u1ED1ng tr\xE0 s\u1EEFa \u0111\u01B0\u1EE3c gi\u1EDBi tr\u1EBB kh\u1EAFp n\u01A1i v\xF4 c\xF9ng y\xEAu th\xEDch."
  },
  {
    hanzi: "\u8DDF",
    pinyin: "g\u0113n",
    hanViet: "C\u0103n",
    vietnamese: "C\xF9ng, v\u1EDBi; \u0111i theo, g\xF3t ch\xE2n",
    partOfSpeech: "Gi\u1EDBi t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Giao ti\u1EBFp",
    radical: "\u{27FB7} (T\xFAc)",
    strokeCount: 13,
    examples: [
      { zh: "\u5468\u672B\u6211\u60F3\u8DDF\u4F60\u4E00\u8D77\u53BB\u56FE\u4E66\u9986\u3002", pinyin: "Zh\u014Dum\xF2 w\u01D2 xi\u01CEng g\u0113n n\u01D0 y\xECq\u01D0 q\xF9 t\xFAsh\u016Bgu\u01CEn.", vi: "Cu\u1ED1i tu\u1EA7n t\xF4i mu\u1ED1n c\xF9ng b\u1EA1n \u0111i \u0111\u1EBFn th\u01B0 vi\u1EC7n." },
      { zh: "\u8BF7\u5927\u5BB6\u8DDF\u6211\u4E00\u8D77\u8BFB\u8FD9\u4E2A\u6C49\u5B57\u3002", pinyin: "Q\u01D0ng d\xE0ji\u0101 g\u0113n w\u01D2 y\xECq\u01D0 d\xFA zh\xE8 ge h\xE0nz\xEC.", vi: "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi \u0111\u1ECDc ch\u1EEF H\xE1n n\xE0y theo t\xF4i." }
    ],
    tips: "B\u1ED9 T\xFAc (\u{27FB7} - b\xE0n ch\xE2n) k\u1EBFt h\u1EE3p ch\u1EEF C\u1EA5n (\u826E). Ngh\u0129a g\u1ED1c l\xE0 g\xF3t ch\xE2n, m\u1EDF r\u1ED9ng th\xE0nh \u0111i theo sau ai \u0111\xF3, r\u1ED3i tr\u1EDF th\xE0nh gi\u1EDBi t\u1EEB k\u1EBFt n\u1ED1i 'c\xF9ng v\u1EDBi ai'."
  },
  {
    hanzi: "\u8D70",
    pinyin: "z\u01D2u",
    hanViet: "T\u1EA9u",
    vietnamese: "\u0110i, b\u01B0\u1EDBc \u0111i; r\u1EDDi \u0111i, \u0111i kh\u1ECFi",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Di chuy\u1EC3n",
    radical: "\u8D70 (T\u1EA9u)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u4EEC\u4E00\u8D77\u8D70\u8DEF\u53BB\u5B66\u6821\u5427\u3002", pinyin: "W\u01D2men y\xECq\u01D0 z\u01D2ul\xF9 q\xF9 xu\xE9xi\xE0o ba.", vi: "T\u1EE5i m\xECnh c\xF9ng \u0111i b\u1ED9 t\u1EDBi tr\u01B0\u1EDDng h\u1ECDc \u0111i." },
      { zh: "\u65F6\u95F4\u4E0D\u65E9\u4E86\uFF0C\u6211\u8BE5\u8D70\u4E86\u3002", pinyin: "Sh\xEDji\u0101n b\xF9 z\u01CEo le, w\u01D2 g\u0101i z\u01D2u le.", vi: "Th\u1EDDi gian kh\xF4ng c\xF2n s\u1EDBm n\u1EEFa, t\xF4i ph\u1EA3i \u0111i \u0111\xE2y." }
    ],
    tips: "B\u1ED9 T\u1EA9u (\u8D70) h\xECnh t\u01B0\u1EE3ng ng\u01B0\u1EDDi \u0111ang vung tay s\u1EA3i b\u01B0\u1EDBc ch\u1EA1y mau. Trong ti\u1EBFng H\xE1n hi\u1EC7n \u0111\u1EA1i bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng \u0111i l\u1EA1i ho\u1EB7c r\u1EDDi kh\u1ECFi m\u1ED9t n\u01A1i."
  },
  {
    hanzi: "\u9152\u5E97",
    pinyin: "ji\u01D4di\xE0n",
    hanViet: "T\u1EEDu \u0110i\u1EBFm",
    vietnamese: "Kh\xE1ch s\u1EA1n, kh\xE1ch s\u1EA1n l\u1EDBn",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Du l\u1ECBch & \u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u6C35 (Th\u1EE7y) + \u5E7F (Qu\u1EA3ng)",
    strokeCount: 17,
    examples: [
      { zh: "\u6211\u4EEC\u9884\u8BA2\u4E86\u4E00\u5BB6\u9760\u8FD1\u6D77\u8FB9\u7684\u9152\u5E97\u3002", pinyin: "W\u01D2men y\xF9d\xECng le y\xEC ji\u0101 k\xE0oj\xECn h\u01CEibi\u0101n de ji\u01D4di\xE0n.", vi: "Ch\xFAng t\xF4i \u0111\xE3 \u0111\u1EB7t tr\u01B0\u1EDBc m\u1ED9t kh\xE1ch s\u1EA1n \u1EDF g\u1EA7n b\u1EDD bi\u1EC3n." },
      { zh: "\u8FD9\u5BB6\u4E94\u661F\u7EA7\u9152\u5E97\u7684\u670D\u52A1\u975E\u5E38\u5468\u5230\u3002", pinyin: "Zh\xE8 ji\u0101 w\u01D4x\u012Bngj\xED ji\u01D4di\xE0n de f\xFAw\xF9 f\u0113ich\xE1ng zh\u014Dud\xE0o.", vi: "D\u1ECBch v\u1EE5 c\u1EE7a kh\xE1ch s\u1EA1n n\u0103m sao n\xE0y v\xF4 c\xF9ng chu \u0111\xE1o." }
    ],
    tips: "T\u1EEDu (\u9152 - r\u01B0\u1EE3u ngon, b\u1ED9 Th\u1EE7y \u6C35) + \u0110i\u1EBFm (\u5E97 - ti\u1EC7m qu\xE1n, b\u1ED9 Qu\u1EA3ng \u5E7F). X\u01B0a l\xE0 qu\xE1n r\u01B0\u1EE3u c\xF3 ch\u1ED7 tr\u1ECD l\u1EA1i, nay l\xE0 t\u1EEB ph\u1ED5 bi\u1EBFn nh\u1EA5t ch\u1EC9 kh\xE1ch s\u1EA1n hi\u1EC7n \u0111\u1EA1i."
  },
  {
    hanzi: "\u751F\u65E5",
    pinyin: "sh\u0113ngr\xEC",
    hanViet: "Sinh Nh\u1EADt",
    vietnamese: "Ng\xE0y sinh nh\u1EADt, sinh nh\u1EADt",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & L\u1EC5 h\u1ED9i",
    radical: "\u751F (Sinh) + \u65E5 (Nh\u1EADt)",
    strokeCount: 9,
    examples: [
      { zh: "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF0C\u5FC3\u60F3\u4E8B\u6210\uFF01", pinyin: "Zh\xF9 n\u01D0 sh\u0113ngr\xEC ku\xE0il\xE8, x\u012Bnxi\u01CEngsh\xECch\xE9ng!", vi: "Ch\xFAc b\u1EA1n sinh nh\u1EADt vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!" },
      { zh: "\u4F60\u7684\u751F\u65E5\u662F\u51E0\u6708\u51E0\u53F7\uFF1F", pinyin: "N\u01D0 de sh\u0113ngr\xEC sh\xEC j\u01D0 yu\xE8 j\u01D0 h\xE0o?", vi: "Sinh nh\u1EADt c\u1EE7a b\u1EA1n l\xE0 ng\xE0y m\u1EA5y th\xE1ng m\u1EA5y?" }
    ],
    tips: "Sinh (\u751F - sinh ra, ch\xE0o \u0111\u1EDDi) + Nh\u1EADt (\u65E5 - ng\xE0y m\u1EB7t tr\u1EDDi). Ng\xE0y k\u1EF7 ni\u1EC7m m\u1ED9t ng\u01B0\u1EDDi c\u1EA5t ti\u1EBFng kh\xF3c ch\xE0o \u0111\u1EDDi."
  },
  {
    hanzi: "\u5FD8",
    pinyin: "w\xE0ng",
    hanViet: "Vong",
    vietnamese: "Qu\xEAn, b\u1ECF qu\xEAn",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "T\xE2m l\xFD & Tr\xED nh\u1EDB",
    radical: "\u5FC3 (T\xE2m)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u5FD8\u4E86\u5E26\u5BB6\u91CC\u7684\u94A5\u5319\u4E86\u3002", pinyin: "W\u01D2 w\xE0ng le d\xE0i ji\u0101l\u01D0 de y\xE0oshi le.", vi: "T\xF4i qu\xEAn mang ch\xECa kh\xF3a nh\xE0 r\u1ED3i." },
      { zh: "\u5343\u4E07\u522B\u5FD8\u4E86\u660E\u5929\u65E9\u4E0A\u7684\u4F1A\u8BAE\u3002", pinyin: "Qi\u0101nw\xE0n bi\xE9 w\xE0ng le m\xEDngti\u0101n z\u01CEoshang de hu\xECy\xEC.", vi: "Nh\u1EA5t \u0111\u1ECBnh \u0111\u1EEBng qu\xEAn cu\u1ED9c h\u1ECDp s\xE1ng mai nh\xE9." }
    ],
    tips: "B\xEAn tr\xEAn l\xE0 ch\u1EEF Vong (\u4EA1 - m\u1EA5t m\xE1t, bi\u1EBFn m\u1EA5t), b\xEAn d\u01B0\u1EDBi l\xE0 ch\u1EEF T\xE2m (\u5FC3 - tr\xE1i tim, t\xE2m tr\xED). \xDD ngh\u0129 m\u1EA5t \u0111i kh\u1ECFi t\xE2m tr\xED ch\xEDnh l\xE0 qu\xEAn. Ph\u1ED3n th\u1EC3: \u5FD8."
  },
  {
    hanzi: "\u753B",
    pinyin: "hu\xE0",
    hanViet: "H\u1ECDa",
    vietnamese: "V\u1EBD (\u0111\u1ED9ng t\u1EEB); b\u1EE9c tranh, b\u1EE9c h\u1ECDa (danh t\u1EEB)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Ngh\u1EC7 thu\u1EADt & S\u1EDF th\xEDch",
    radical: "\u4E00 (Nh\u1EA5t)",
    strokeCount: 8,
    examples: [
      { zh: "\u59B9\u59B9\u5F88\u559C\u6B22\u753B\u753B\u513F\u3002", pinyin: "M\xE8imei h\u011Bn x\u01D0huan hu\xE0 hu\xE0r.", vi: "Em g\xE1i r\u1EA5t th\xEDch v\u1EBD tranh." },
      { zh: "\u5899\u4E0A\u6302\u7740\u4E00\u5E45\u4E2D\u56FD\u5C71\u6C34\u753B\u3002", pinyin: "Qi\xE1ng sh\xE0ng gu\xE0 zhe y\xEC f\xFA Zh\u014Dnggu\xF3 sh\u0101nshu\u01D0hu\xE0.", vi: "Tr\xEAn t\u01B0\u1EDDng treo m\u1ED9t b\u1EE9c tranh s\u01A1n th\u1EE7y Trung Qu\u1ED1c." }
    ],
    tips: "Ch\u1EEF H\u1ECDa t\u01B0\u1EE3ng h\xECnh c\xE2y b\xFAt l\xF4ng \u0111ang ph\xE1c h\u1ECDa ranh gi\u1EDBi ru\u1ED9ng \u0111\u1EA5t \u7530. V\u1EEBa l\xE0 v\u1EBD tranh v\u1EEBa l\xE0 b\u1EE9c tranh. Ph\u1ED3n th\u1EC3: \u756B."
  },
  {
    hanzi: "\u753B\u7B14",
    pinyin: "hu\xE0b\u01D0",
    hanViet: "H\u1ECDa B\xFAt",
    vietnamese: "B\xFAt v\u1EBD, c\u1ECD v\u1EBD",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "D\u1EE5ng c\u1EE5 h\u1ECDc t\u1EADp & Ngh\u1EC7 thu\u1EADt",
    radical: "\u4E00 (Nh\u1EA5t) + \u2EAE (Tr\xFAc)",
    strokeCount: 18,
    examples: [
      { zh: "\u4ED6\u62FF\u8D77\u753B\u7B14\u5F00\u59CB\u5728\u753B\u7EB8\u4E0A\u4F5C\u753B\u3002", pinyin: "T\u0101 n\xE1 q\u01D0 hu\xE0b\u01D0 k\u0101ish\u01D0 z\xE0i hu\xE0zh\u01D0 sh\xE0ng zu\xF2hu\xE0.", vi: "Anh \u1EA5y c\u1EA7m c\u1ECD v\u1EBD l\xEAn b\u1EAFt \u0111\u1EA7u v\u1EBD tranh tr\xEAn gi\u1EA5y." },
      { zh: "\u8FD9\u5957\u753B\u7B14\u7684\u6BDB\u8D28\u975E\u5E38\u67D4\u8F6F\u7EC6\u817B\u3002", pinyin: "Zh\xE8 t\xE0o hu\xE0b\u01D0 de m\xE1ozh\xEC f\u0113ich\xE1ng r\xF3uru\u01CEn x\xECn\xEC.", vi: "B\u1ED9 c\u1ECD v\u1EBD n\xE0y l\xF4ng r\u1EA5t m\u1EC1m m\u1EA1i v\xE0 tinh t\u1EBF." }
    ],
    tips: "H\u1ECDa (\u753B - v\u1EBD tranh) + B\xFAt (\u7B14 - c\xE2y b\xFAt th\xE2n b\u1EB1ng tr\xFAc \u2EAE v\xE0 l\xF4ng th\xFA \u6BDB). C\xE2y b\xFAt chuy\xEAn d\xF9ng \u0111\u1EC3 h\u1ED9i h\u1ECDa. Ph\u1ED3n th\u1EC3: \u756B\u7B46."
  },
  {
    hanzi: "\u86CB\u7CD5",
    pinyin: "d\xE0ng\u0101o",
    hanViet: "\u0110\u1EA3n Cao",
    vietnamese: "B\xE1nh ga-t\xF4, b\xE1nh kem, b\xE1nh ng\u1ECDt l\xE0m t\u1EEB tr\u1EE9ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & B\xE1nh ng\u1ECDt",
    radical: "\u866B (Tr\xF9ng) + \u7C73 (M\u1EC5)",
    strokeCount: 21,
    examples: [
      { zh: "\u5988\u5988\u4EB2\u624B\u505A\u4E86\u4E00\u4E2A\u6C34\u679C\u751F\u65E5\u86CB\u7CD5\u3002", pinyin: "M\u0101ma q\u012Bnsh\u01D2u zu\xF2 le y\xED ge shu\u01D0gu\u01D2 sh\u0113ngr\xEC d\xE0ng\u0101o.", vi: "M\u1EB9 t\u1EF1 tay l\xE0m m\u1ED9t chi\u1EBFc b\xE1nh kem sinh nh\u1EADt hoa qu\u1EA3." },
      { zh: "\u8FD9\u5757\u5DE7\u514B\u529B\u86CB\u7CD5\u9999\u751C\u677E\u8F6F\u3002", pinyin: "Zh\xE8 ku\xE0i qi\u01CEok\xE8l\xEC d\xE0ng\u0101o xi\u0101ngti\xE1n s\u014Dngru\u01CEn.", vi: "Mi\u1EBFng b\xE1nh ga-t\xF4 s\xF4-c\xF4-la n\xE0y th\u01A1m ng\u1ECDt v\xE0 x\u1ED1p m\u1EC1m." }
    ],
    tips: "\u0110\u1EA3n (\u86CB - qu\u1EA3 tr\u1EE9ng g\xE0) + Cao (\u7CD5 - b\xE1nh ng\u1ECDt l\xE0m t\u1EEB g\u1EA1o n\u1EBFp \u7C73). Lo\u1EA1i b\xE1nh x\u1ED1p m\u1EC1m th\u01A1m ph\u1EE9c t\u1EEB b\u1ED9t v\xE0 tr\u1EE9ng."
  },
  {
    hanzi: "\u5FEB\u4E50",
    pinyin: "ku\xE0il\xE8",
    hanViet: "Kho\xE1i L\u1EA1c",
    vietnamese: "Vui v\u1EBB, h\u1EA1nh ph\xFAc, h\xE2n hoan",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m x\xFAc & Tinh th\u1EA7n",
    radical: "\u5FC4 (T\xE2m) + \u4E3F (Phi\u1EC7t)",
    strokeCount: 12,
    examples: [
      { zh: "\u795D\u5927\u5BB6\u65B0\u5E74\u5FEB\u4E50\uFF0C\u4E07\u4E8B\u5982\u610F\uFF01", pinyin: "Zh\xF9 d\xE0ji\u0101 x\u012Bnni\xE1n ku\xE0il\xE8, w\xE0nsh\xECr\xFAy\xEC!", vi: "Ch\xFAc m\u1ECDi ng\u01B0\u1EDDi n\u0103m m\u1EDBi vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!" },
      { zh: "\u53EA\u8981\u4E00\u5BB6\u4EBA\u5728\u4E00\u8D77\uFF0C\u5FC3\u91CC\u5C31\u5F88\u8F7B\u5FEB\u5FEB\u4E50\u3002", pinyin: "Zh\u01D0y\xE0o y\xEC ji\u0101 r\xE9n z\xE0i y\xECq\u01D0, x\u012Bnl\u01D0 ji\xF9 h\u011Bn q\u012Bngku\xE0i ku\xE0il\xE8.", vi: "Ch\u1EC9 c\u1EA7n c\u1EA3 nh\xE0 \u1EDF b\xEAn nhau, trong l\xF2ng li\u1EC1n c\u1EA3m th\u1EA5y r\u1EA5t vui v\u1EBB h\u1EA1nh ph\xFAc." }
    ],
    tips: "Kho\xE1i (\u5FEB - h\xE2n hoan nhanh ch\xF3ng b\u1ED9 T\xE2m \u5FC4) + L\u1EA1c (\u4E50 - \xE2m nh\u1EA1c ti\u1EBFng c\u01B0\u1EDDi hoan h\u1EF7). Ni\u1EC1m vui tr\xE0n ng\u1EADp t\xE2m h\u1ED3n. Ph\u1ED3n th\u1EC3: \u5FEB\u6A02."
  },
  {
    hanzi: "\u6253\u5F00",
    pinyin: "d\u01CEk\u0101i",
    hanViet: "\u0110\u1EA3 Khai",
    vietnamese: "M\u1EDF ra, b\u1EADt (thi\u1EBFt b\u1ECB, c\xF4ng t\u1EAFc)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Thao t\xE1c",
    radical: "\u624C (Th\u1EE7) + \u95E8 (M\xF4n)",
    strokeCount: 7,
    examples: [
      { zh: "\u8BF7\u628A\u4E66\u6253\u5F00\u5230\u7B2C\u5341\u9875\u3002", pinyin: "Q\u01D0ng b\u01CE sh\u016B d\u01CEk\u0101i d\xE0o d\xEC sh\xED y\xE8.", vi: "Xin m\u1EDDi m\u1EDF s\xE1ch ra trang s\u1ED1 m\u01B0\u1EDDi." },
      { zh: "\u5929\u6C14\u6709\u70B9\u70ED\uFF0C\u5FEB\u6253\u5F00\u7A7A\u8C03\u5427\u3002", pinyin: "Ti\u0101nq\xEC y\u01D2udi\u01CEn r\xE8, ku\xE0i d\u01CEk\u0101i k\u014Dngti\xE1o ba.", vi: "Th\u1EDDi ti\u1EBFt h\u01A1i n\xF3ng, mau b\u1EADt \u0111i\u1EC1u h\xF2a l\xEAn \u0111i." }
    ],
    tips: "\u0110\u1EA3 (\u6253 - d\xF9ng b\xE0n tay \u624C t\xE1c \u0111\u1ED9ng) + Khai (\u5F00 - m\u1EDF toang c\xE1nh c\u1ED5ng). Thao t\xE1c m\u1EDF s\xE1ch, m\u1EDF h\u1ED9p ho\u1EB7c b\u1EADt ngu\u1ED3n thi\u1EBFt b\u1ECB."
  },
  {
    hanzi: "\u957F",
    pinyin: "ch\xE1ng",
    hanViet: "Tr\u01B0\u1EDDng / Tr\u01B0\u1EDFng",
    vietnamese: "D\xE0i (kho\u1EA3ng c\xE1ch, th\u1EDDi gian); (zh\u01CEng) l\u1EDBn l\xEAn, tr\u01B0\u1EDFng th\xE0nh",
    partOfSpeech: "T\xEDnh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "T\xEDnh ch\u1EA5t & K\xEDch th\u01B0\u1EDBc",
    radical: "\u957F (Tr\u01B0\u1EDDng)",
    strokeCount: 4,
    examples: [
      { zh: "\u5979\u7684\u5934\u53D1\u53C8\u9ED1\u53C8\u957F\u3002", pinyin: "T\u0101 de t\xF3ufa y\xF2u h\u0113i y\xF2u ch\xE1ng.", vi: "M\xE1i t\xF3c c\u1EE7a c\xF4 \u1EA5y v\u1EEBa \u0111en v\u1EEBa d\xE0i." },
      { zh: "\u8FD9\u6761\u6CB3\u975E\u5E38\u957F\uFF0C\u6D41\u7ECF\u5F88\u591A\u57CE\u5E02\u3002", pinyin: "Zh\xE8 ti\xE1o h\xE9 f\u0113ich\xE1ng ch\xE1ng, li\xFAj\u012Bng h\u011Bn du\u014D ch\xE9ngsh\xEC.", vi: "Con s\xF4ng n\xE0y r\u1EA5t d\xE0i, ch\u1EA3y qua r\u1EA5t nhi\u1EC1u th\xE0nh ph\u1ED1." }
    ],
    tips: "B\u1ED9 Tr\u01B0\u1EDDng (\u957F) v\u1EBD h\xECnh t\u01B0\u1EE3ng m\xE1i t\xF3c d\xE0i c\u1EE7a v\u1ECB tr\u01B0\u1EDFng l\xE3o. \u0110\u1ECDc ch\xE1ng l\xE0 d\xE0i, \u0111\u1ECDc zh\u01CEng l\xE0 l\u1EDBn l\xEAn, sinh tr\u01B0\u1EDFng. Ph\u1ED3n th\u1EC3: \u9577."
  },
  {
    hanzi: "\u8089",
    pinyin: "r\xF2u",
    hanViet: "Nh\u1EE5c",
    vietnamese: "Th\u1ECBt, mi\u1EBFng th\u1ECBt",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & Dinh d\u01B0\u1EE1ng",
    radical: "\u8089 (Nh\u1EE5c)",
    strokeCount: 6,
    examples: [
      { zh: "\u4ECA\u5929\u665A\u4E0A\u6211\u4EEC\u5403\u7EA2\u70E7\u8089\u5427\u3002", pinyin: "J\u012Bnti\u0101n w\u01CEnshang w\u01D2men ch\u012B h\xF3ngsh\u0101or\xF2u ba.", vi: "T\u1ED1i nay ch\xFAng ta \u0103n th\u1ECBt kho t\xE0u nh\xE9." },
      { zh: "\u533B\u751F\u5EFA\u8BAE\u4ED6\u591A\u5403\u852C\u83DC\uFF0C\u5C11\u5403\u8089\u3002", pinyin: "Y\u012Bsh\u0113ng ji\xE0ny\xEC t\u0101 du\u014D ch\u012B sh\u016Bc\xE0i, sh\u01CEo ch\u012B r\xF2u.", vi: "B\xE1c s\u0129 khuy\xEAn anh \u1EA5y n\xEAn \u0103n nhi\u1EC1u rau v\xE0 b\u1EDBt \u0103n th\u1ECBt l\u1EA1i." }
    ],
    tips: "B\u1ED9 Nh\u1EE5c (\u8089) t\u01B0\u1EE3ng h\xECnh mi\u1EBFng th\u1ECBt c\u1EAFt l\xE1t c\xF3 th\u1EDB m\u1EE1 \u0111an xen. Khi l\xE0m b\u1ED9 th\u1EE7 b\xEAn tr\xE1i th\u01B0\u1EDDng bi\u1EBFn th\xE0nh d\u1EA1ng b\u1ED9 Nguy\u1EC7t \u6708."
  },
  {
    hanzi: "\u5730",
    pinyin: "de",
    hanViet: "\u0110\u1ECBa",
    vietnamese: "Tr\u1EE3 t\u1EEB li\xEAn k\u1EBFt ph\xF3 t\u1EEB h\xF3a (ch\u1EC9 ph\u01B0\u01A1ng th\u1EE9c h\xE0nh \u0111\u1ED9ng); (d\xEC) m\u1EB7t \u0111\u1EA5t, \u0111\u1EA5t \u0111ai",
    partOfSpeech: "Tr\u1EE3 t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Tr\u1EE3 t\u1EEB",
    radical: "\u571F (Th\u1ED5)",
    strokeCount: 6,
    examples: [
      { zh: "\u5B69\u5B50\u4EEC\u9AD8\u5174\u5730\u8DF3\u4E86\u8D77\u6765\u3002", pinyin: "H\xE1izimen g\u0101ox\xECng de ti\xE0o le q\u01D0l\xE1i.", vi: "L\u0169 tr\u1EBB vui m\u1EEBng nh\u1EA3y c\u1EABng l\xEAn." },
      { zh: "\u5979\u8BA4\u771F\u5730\u542C\u8001\u5E08\u8BB2\u8BFE\u3002", pinyin: "T\u0101 r\xE8nzh\u0113n de t\u012Bng l\u01CEosh\u012B ji\u01CEngk\xE8.", vi: "C\xF4 \u1EA5y ch\u0103m ch\xFA l\u1EAFng nghe th\u1EA7y c\xF4 gi\u1EA3ng b\xE0i." }
    ],
    tips: "B\u1ED9 Th\u1ED5 (\u571F - \u0111\u1EA5t \u0111ai) + D\xE3 (\u4E5F). \u0110\u1ECDc thanh nh\u1EB9 'de' \u0111\u1EE9ng sau t\xEDnh t\u1EEB b\u1ED5 ngh\u0129a cho \u0111\u1ED9ng t\u1EEB (VD: \u9AD8\u5174\u5730 - m\u1ED9t c\xE1ch vui v\u1EBB); \u0111\u1ECDc thanh b\u1ED1n 'd\xEC' ngh\u0129a l\xE0 \u0111\u1EA5t \u0111ai."
  },
  {
    hanzi: "\u5E8A",
    pinyin: "chu\xE1ng",
    hanViet: "S\xE0ng",
    vietnamese: "Chi\u1EBFc gi\u01B0\u1EDDng, gi\u01B0\u1EDDng ng\u1EE7",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 d\xF9ng gia \u0111\xECnh & Ph\xF2ng ng\u1EE7",
    radical: "\u5E7F (Qu\u1EA3ng)",
    strokeCount: 7,
    examples: [
      { zh: "\u8FD9\u5F20\u5E8A\u53C8\u5927\u53C8\u8212\u9002\u3002", pinyin: "Zh\xE8 zh\u0101ng chu\xE1ng y\xF2u d\xE0 y\xF2u sh\u016Bsh\xEC.", vi: "Chi\u1EBFc gi\u01B0\u1EDDng n\xE0y v\u1EEBa r\u1ED9ng v\u1EEBa \xEAm \xE1i." },
      { zh: "\u4ED6\u6BCF\u5929\u65E9\u4E0A\u4E03\u70B9\u51C6\u65F6\u8D77\u5E8A\u3002", pinyin: "T\u0101 m\u011Biti\u0101n z\u01CEoshang q\u012B di\u01CEn zh\u01D4nsh\xED q\u01D0chu\xE1ng.", vi: "C\u1EADu \u1EA5y m\u1ED7i s\xE1ng \u0111\xFAng b\u1EA3y gi\u1EDD l\xE0 th\u1EE9c d\u1EADy ra kh\u1ECFi gi\u01B0\u1EDDng." }
    ],
    tips: "B\u1ED9 Qu\u1EA3ng (\u5E7F - gian nh\xE0 c\xF3 m\xE1i che) bao b\u1ECDc ch\u1EEF M\u1ED9c (\u6728 - g\u1ED7). Chi\u1EBFc gi\u01B0\u1EDDng b\u1EB1ng g\u1ED7 \u0111\u1EB7t trong gian ph\xF2ng ng\u1EE7 \u0111\u1EC3 ngh\u1EC9 ng\u01A1i. Ph\u1ED3n th\u1EC3: \u5E8A / \u7240."
  }
];

// src/data/dictionaryDatabase.ts
var COMPREHENSIVE_DICTIONARY = [
  // Phương tiện & Giao thông
  {
    hanzi: "\u9AD8\u94C1",
    pinyin: "g\u0101oti\u011B",
    hanViet: "Cao Thi\u1EBFt",
    vietnamese: "T\xE0u cao t\u1ED1c, \u0111\u01B0\u1EDDng s\u1EAFt cao t\u1ED1c",
    partOfSpeech: "Danh t\u1EEB",
    level: 4,
    category: "Giao th\xF4ng",
    radical: "\u9AD8 (Cao) + \u9485 (Kim)",
    strokeCount: 20,
    examples: [
      { zh: "\u6211\u5750\u9AD8\u94C1\u4ECE\u5317\u4EAC\u53BB\u4E0A\u6D77\u3002", pinyin: "W\u01D2 zu\xF2 g\u0101oti\u011B c\xF3ng B\u011Bij\u012Bng q\xF9 Sh\xE0ngh\u01CEi.", vi: "T\xF4i \u0111i t\xE0u cao t\u1ED1c t\u1EEB B\u1EAFc Kinh \u0111\u1EBFn Th\u01B0\u1EE3ng H\u1EA3i." },
      { zh: "\u9AD8\u94C1\u7684\u901F\u5EA6\u975E\u5E38\u5FEB\u3002", pinyin: "G\u0101oti\u011B de s\xF9d\xF9 f\u0113ich\xE1ng ku\xE0i.", vi: "T\u1ED1c \u0111\u1ED9 c\u1EE7a t\xE0u cao t\u1ED1c r\u1EA5t nhanh." }
    ],
    tips: "\u9AD8 (Cao - t\u1ED1c \u0111\u1ED9 cao) + \u94C1 (Thi\u1EBFt - \u0111\u01B0\u1EDDng s\u1EAFt): m\u1EA1ng l\u01B0\u1EDBi \u0111\u01B0\u1EDDng s\u1EAFt cao t\u1ED1c hi\u1EC7n \u0111\u1EA1i."
  },
  {
    hanzi: "\u706B\u8F66",
    pinyin: "hu\u01D2ch\u0113",
    hanViet: "H\u1ECFa Xa",
    vietnamese: "T\xE0u h\u1ECFa, xe l\u1EEDa",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Giao th\xF4ng",
    radical: "\u706B (H\u1ECFa) + \u8F66 (Xa)",
    strokeCount: 8,
    examples: [
      { zh: "\u706B\u8F66\u7AD9\u79BB\u8FD9\u91CC\u6709\u591A\u8FDC\uFF1F", pinyin: "Hu\u01D2ch\u0113zh\xE0n l\xED zh\xE8l\u01D0 y\u01D2u du\u014D yu\u01CEn?", vi: "Ga t\xE0u h\u1ECFa c\xE1ch \u0111\xE2y bao xa?" },
      { zh: "\u6211\u4EEC\u5750\u706B\u8F66\u53BB\u65C5\u884C\u3002", pinyin: "W\u01D2men zu\xF2 hu\u01D2ch\u0113 q\xF9 l\u01DAx\xEDng.", vi: "Ch\xFAng t\xF4i \u0111i du l\u1ECBch b\u1EB1ng t\xE0u h\u1ECFa." }
    ],
    tips: "\u706B (L\u1EEDa/\u0110\u1EA7u m\xE1y h\u01A1i n\u01B0\u1EDBc) + \u8F66 (Toa xe): \u0111o\xE0n t\xE0u ch\u1EA1y tr\xEAn \u0111\u01B0\u1EDDng ray s\u1EAFt."
  },
  {
    hanzi: "\u5730\u94C1",
    pinyin: "d\xECti\u011B",
    hanViet: "\u0110\u1ECBa Thi\u1EBFt",
    vietnamese: "T\xE0u \u0111i\u1EC7n ng\u1EA7m",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Giao th\xF4ng",
    radical: "\u571F (Th\u1ED5) + \u9485 (Kim)",
    strokeCount: 16,
    examples: [
      { zh: "\u5728\u57CE\u5E02\u91CC\u5750\u5730\u94C1\u5F88\u65B9\u4FBF\u3002", pinyin: "Z\xE0i ch\xE9ngsh\xEC l\u01D0 zu\xF2 d\xECti\u011B h\u011Bn f\u0101ngbi\xE0n.", vi: "\u0110i t\xE0u \u0111i\u1EC7n ng\u1EA7m trong th\xE0nh ph\u1ED1 r\u1EA5t ti\u1EC7n l\u1EE3i." },
      { zh: "\u4E0B\u4E00\u7AD9\u662F\u5730\u94C1\u6362\u4E58\u7AD9\u3002", pinyin: "Xi\xE0 y\xED zh\xE0n sh\xEC d\xECti\u011B hu\xE0nch\xE9ngzh\xE0n.", vi: "Tr\u1EA1m ti\u1EBFp theo l\xE0 ga trung chuy\u1EC3n t\xE0u \u0111i\u1EC7n ng\u1EA7m." }
    ],
    tips: "\u5730 (D\u01B0\u1EDBi l\xF2ng \u0111\u1EA5t) + \u94C1 (\u0110\u01B0\u1EDDng ray s\u1EAFt): ph\u01B0\u01A1ng ti\u1EC7n ng\u1EA7m \u0111\xF4 th\u1ECB."
  },
  {
    hanzi: "\u516C\u5171\u6C7D\u8F66",
    pinyin: "g\u014Dngg\xF2ng q\xECch\u0113",
    hanViet: "C\xF4ng C\u1ED9ng Kh\xED Xa",
    vietnamese: "Xe bu\xFDt",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Giao th\xF4ng",
    radical: "\u516B (B\xE1t) + \u8F66 (Xa)",
    strokeCount: 23,
    examples: [
      { zh: "\u6211\u6BCF\u5929\u5750\u516C\u5171\u6C7D\u8F66\u53BB\u4E0A\u73ED\u3002", pinyin: "W\u01D2 m\u011Biti\u0101n zu\xF2 g\u014Dngg\xF2ng q\xECch\u0113 q\xF9 sh\xE0ngb\u0101n.", vi: "M\u1ED7i ng\xE0y t\xF4i \u0111\u1EC1u \u0111i xe bu\xFDt \u0111i l\xE0m." },
      { zh: "\u516C\u5171\u6C7D\u8F66\u7AD9\u5C31\u5728\u524D\u9762\u3002", pinyin: "G\u014Dngg\xF2ng q\xECch\u0113zh\xE0n ji\xF9 z\xE0i qi\xE1nmi\xE0n.", vi: "Tr\u1EA1m d\u1EEBng xe bu\xFDt \u1EDF ngay ph\xEDa tr\u01B0\u1EDBc." }
    ],
    tips: "\u516C\u5171 (C\xF4ng c\u1ED9ng) + \u6C7D\u8F66 (Xe \xF4 t\xF4): ph\u01B0\u01A1ng ti\u1EC7n ch\u1EDF kh\xE1ch c\xF4ng c\u1ED9ng."
  },
  {
    hanzi: "\u51FA\u79DF\u8F66",
    pinyin: "ch\u016Bz\u016Bch\u0113",
    hanViet: "Xu\u1EA5t T\xF4 Xa",
    vietnamese: "Xe taxi",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Giao th\xF4ng",
    radical: "\u51F5 (Kh\u1EA3m) + \u8F66 (Xa)",
    strokeCount: 19,
    examples: [
      { zh: "\u6211\u4EEC\u6253\u51FA\u79DF\u8F66\u53BB\u673A\u573A\u5427\u3002", pinyin: "W\u01D2men d\u01CE ch\u016Bz\u016Bch\u0113 q\xF9 j\u012Bch\u01CEng ba.", vi: "Ch\xFAng ta b\u1EAFt taxi \u0111i s\xE2n bay nh\xE9." },
      { zh: "\u51FA\u79DF\u8F66\u53F8\u673A\u5F88\u70ED\u60C5\u3002", pinyin: "Ch\u016Bz\u016Bch\u0113 s\u012Bj\u012B h\u011Bn r\xE8q\xEDng.", vi: "T\xE0i x\u1EBF taxi r\u1EA5t nhi\u1EC7t t\xECnh." }
    ],
    tips: "\u51FA\u79DF (Cho thu\xEA ch\u1EDF kh\xE1ch) + \u8F66 (Xe \xF4 t\xF4): d\u1ECBch v\u1EE5 xe taxi thu\xEA chuy\u1EBFn."
  },
  {
    hanzi: "\u81EA\u884C\u8F66",
    pinyin: "z\xECx\xEDngch\u0113",
    hanViet: "T\u1EF1 H\xE0nh Xa",
    vietnamese: "Xe \u0111\u1EA1p",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Giao th\xF4ng",
    radical: "\u81EA (T\u1EF1) + \u8F66 (Xa)",
    strokeCount: 16,
    examples: [
      { zh: "\u4ED6\u9A91\u81EA\u884C\u8F66\u53BB\u4E0A\u5B66\u3002", pinyin: "T\u0101 q\xED z\xECx\xEDngch\u0113 q\xF9 sh\xE0ngxu\xE9.", vi: "C\u1EADu \u1EA5y \u0111\u1EA1p xe \u0111\u1EA1p \u0111i h\u1ECDc." },
      { zh: "\u9A91\u81EA\u884C\u8F66\u5BF9\u8EAB\u4F53\u5F88\u597D\u3002", pinyin: "Q\xED z\xECx\xEDngch\u0113 du\xEC sh\u0113nt\u01D0 h\u011Bn h\u01CEo.", vi: "\u0110\u1EA1p xe \u0111\u1EA1p r\u1EA5t t\u1ED1t cho s\u1EE9c kh\u1ECFe." }
    ],
    tips: "\u81EA (T\u1EF1 m\xECnh) + \u884C (Chuy\u1EC3n \u0111\u1ED9ng) + \u8F66 (Xe): c\u1ED7 xe t\u1EF1 th\xE2n \u0111\u1EA1p \u0111\u1EC3 l\u0103n b\xE1nh."
  },
  // Công nghệ & Đời sống hiện đại
  {
    hanzi: "\u4EBA\u5DE5\u667A\u80FD",
    pinyin: "r\xE9ng\u014Dng zh\xECn\xE9ng",
    hanViet: "Nh\xE2n C\xF4ng Tr\xED N\u0103ng",
    vietnamese: "Tr\xED tu\u1EC7 nh\xE2n t\u1EA1o, AI",
    partOfSpeech: "Danh t\u1EEB",
    level: 5,
    category: "C\xF4ng ngh\u1EC7",
    radical: "\u4EBA (Nh\xE2n) + \u6708 (Nh\u1EE5c/N\u0103ng)",
    strokeCount: 23,
    examples: [
      { zh: "\u4EBA\u5DE5\u667A\u80FD\u53D1\u5C55\u5F97\u975E\u5E38\u5FEB\u3002", pinyin: "R\xE9ng\u014Dng zh\xECn\xE9ng f\u0101zh\u01CEn de f\u0113ich\xE1ng ku\xE0i.", vi: "Tr\xED tu\u1EC7 nh\xE2n t\u1EA1o ph\xE1t tri\u1EC3n r\u1EA5t nhanh ch\xF3ng." },
      { zh: "\u6211\u4EEC\u6B63\u5728\u5B66\u4E60\u4EBA\u5DE5\u667A\u80FD\u6280\u672F\u3002", pinyin: "W\u01D2men zh\xE8ngz\xE0i xu\xE9x\xED r\xE9ng\u014Dng zh\xECn\xE9ng j\xECsh\xF9.", vi: "Ch\xFAng t\xF4i \u0111ang h\u1ECDc c\xF4ng ngh\u1EC7 tr\xED tu\u1EC7 nh\xE2n t\u1EA1o." }
    ],
    tips: "\u4EBA\u5DE5 (Do con ng\u01B0\u1EDDi ch\u1EBF t\u1EA1o) + \u667A\u80FD (Tr\xED th\xF4ng minh, t\xE0i n\u0103ng ph\xE2n t\xEDch)."
  },
  {
    hanzi: "\u7F51\u7EDC",
    pinyin: "w\u01CEnglu\xF2",
    hanViet: "V\xF5ng L\u1EA1c",
    vietnamese: "M\u1EA1ng internet, k\u1EBFt n\u1ED1i m\u1EA1ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "C\xF4ng ngh\u1EC7",
    radical: "\u7CF8 (M\u1ECBch) / \u7E9F",
    strokeCount: 14,
    examples: [
      { zh: "\u8FD9\u91CC\u7684\u7F51\u7EDC\u4FE1\u53F7\u975E\u5E38\u597D\u3002", pinyin: "Zh\xE8l\u01D0 de w\u01CEnglu\xF2 x\xECnh\xE0o f\u0113ich\xE1ng h\u01CEo.", vi: "T\xEDn hi\u1EC7u m\u1EA1ng \u1EDF \u0111\xE2y r\u1EA5t t\u1ED1t." },
      { zh: "\u73B0\u4EE3\u751F\u6D3B\u79BB\u4E0D\u5F00\u7F51\u7EDC\u3002", pinyin: "Xi\xE0nd\xE0i sh\u0113nghu\xF3 l\xED b\xF9 k\u0101i w\u01CEnglu\xF2.", vi: "\u0110\u1EDDi s\u1ED1ng hi\u1EC7n \u0111\u1EA1i kh\xF4ng th\u1EC3 t\xE1ch r\u1EDDi internet." }
    ],
    tips: "\u7F51 (L\u01B0\u1EDBi gi\u0103ng kh\u1EAFp n\u01A1i) + \u7EDC (D\xE2y ch\u1EB1ng li\xEAn l\u1EA1c \u0111an xen)."
  },
  {
    hanzi: "\u5FAE\u4FE1",
    pinyin: "w\u0113ix\xECn",
    hanViet: "Vi T\xEDn",
    vietnamese: "\u1EE8ng d\u1EE5ng WeChat",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "C\xF4ng ngh\u1EC7",
    radical: "\u5F73 (X\xEDch) + \u4EBB (Nh\xE2n)",
    strokeCount: 22,
    examples: [
      { zh: "\u4F60\u53EF\u4EE5\u52A0\u6211\u7684\u5FAE\u4FE1\u5417\uFF1F", pinyin: "N\u01D0 k\u011By\u01D0 ji\u0101 w\u01D2 de w\u0113ix\xECn ma?", vi: "B\u1EA1n c\xF3 th\u1EC3 k\u1EBFt b\u1EA1n WeChat v\u1EDBi t\xF4i kh\xF4ng?" },
      { zh: "\u6211\u7528\u5FAE\u4FE1\u626B\u7801\u4ED8\u6B3E\u3002", pinyin: "W\u01D2 y\xF2ng w\u0113ix\xECn s\u01CEom\u01CE f\xF9ku\u01CEn.", vi: "T\xF4i d\xF9ng WeChat qu\xE9t m\xE3 thanh to\xE1n." }
    ],
    tips: "\u5FAE (Vi - nh\u1ECF g\u1ECDn, vi di\u1EC7u) + \u4FE1 (T\xEDn - tin nh\u1EAFn, th\u01B0 t\u1EEB trao \u0111\u1ED5i)."
  },
  {
    hanzi: "\u51B0\u7BB1",
    pinyin: "b\u012Bngxi\u0101ng",
    hanViet: "B\u0103ng T\u01B0\u01A1ng",
    vietnamese: "T\u1EE7 l\u1EA1nh",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "\u0110\u1ED3 gia d\u1EE5ng",
    radical: "\u51AB (B\u0103ng) + \u7AF9 (Tr\xFAc)",
    strokeCount: 20,
    examples: [
      { zh: "\u725B\u5976\u653E\u5728\u51B0\u7BB1\u91CC\u3002", pinyin: "Ni\xFAn\u01CEi f\xE0ng z\xE0i b\u012Bngxi\u0101ng l\u01D0.", vi: "S\u1EEFa b\xF2 \u0111\u01B0\u1EE3c \u0111\u1EC3 \u1EDF trong t\u1EE7 l\u1EA1nh." },
      { zh: "\u6211\u5BB6\u4E70\u4E86\u4E00\u53F0\u65B0\u51B0\u7BB1\u3002", pinyin: "W\u01D2 ji\u0101 m\u01CEi le y\xEC t\xE1i x\u012Bn b\u012Bngxi\u0101ng.", vi: "Nh\xE0 t\xF4i v\u1EEBa mua m\u1ED9t chi\u1EBFc t\u1EE7 l\u1EA1nh m\u1EDBi." }
    ],
    tips: "\u51B0 (B\u0103ng tuy\u1EBFt gi\xE1 bu\u1ED1t) + \u7BB1 (H\xF2m, chi\u1EBFc t\u1EE7 ch\u1EE9a \u0111\u1ED3)."
  },
  {
    hanzi: "\u6D17\u8863\u673A",
    pinyin: "x\u01D0y\u012Bj\u012B",
    hanViet: "T\u1EA9y Y C\u01A1",
    vietnamese: "M\xE1y gi\u1EB7t",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "\u0110\u1ED3 gia d\u1EE5ng",
    radical: "\u6C35 (Th\u1EE7y) + \u6728 (M\u1ED9c)",
    strokeCount: 21,
    examples: [
      { zh: "\u8863\u670D\u653E\u5728\u6D17\u8863\u673A\u91CC\u6D17\u3002", pinyin: "Y\u012Bfu f\xE0ng z\xE0i x\u01D0y\u012Bj\u012B l\u01D0 x\u01D0.", vi: "Qu\u1EA7n \xE1o cho v\xE0o m\xE1y gi\u1EB7t \u0111\u1EC3 gi\u1EB7t." },
      { zh: "\u8FD9\u53F0\u6D17\u8863\u673A\u5F88\u597D\u7528\u3002", pinyin: "Zh\xE8 t\xE1i x\u01D0y\u012Bj\u012B h\u011Bn h\u01CEoy\xF2ng.", vi: "Chi\u1EBFc m\xE1y gi\u1EB7t n\xE0y d\xF9ng r\u1EA5t th\xEDch." }
    ],
    tips: "\u6D17 (Gi\u1EB7t r\u1EEDa) + \u8863 (Qu\u1EA7n \xE1o) + \u673A (M\xE1y m\xF3c t\u1EF1 \u0111\u1ED9ng)."
  },
  {
    hanzi: "\u7A7A\u8C03",
    pinyin: "k\u014Dngti\xE1o",
    hanViet: "Kh\xF4ng \u0110i\u1EC1u",
    vietnamese: "M\xE1y \u0111i\u1EC1u h\xF2a kh\xF4ng kh\xED",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "\u0110\u1ED3 gia d\u1EE5ng",
    radical: "\u7A74 (Huy\u1EC7t) + \u8BA0 (Ng\xF4n)",
    strokeCount: 18,
    examples: [
      { zh: "\u590F\u5929\u623F\u95F4\u91CC\u8981\u5F00\u7A7A\u8C03\u3002", pinyin: "Xi\xE0ti\u0101n f\xE1ngji\u0101n l\u01D0 y\xE0o k\u0101i k\u014Dngti\xE1o.", vi: "M\xF9a h\xE8 trong ph\xF2ng c\u1EA7n b\u1EADt \u0111i\u1EC1u h\xF2a." },
      { zh: "\u8BF7\u628A\u7A7A\u8C03\u6E29\u5EA6\u8C03\u9AD8\u4E00\u70B9\u3002", pinyin: "Q\u01D0ng b\u01CE k\u014Dngti\xE1o w\u0113nd\xF9 ti\xE1o g\u0101o y\xECdi\u01CEn.", vi: "Xin ch\u1EC9nh nhi\u1EC7t \u0111\u1ED9 \u0111i\u1EC1u h\xF2a cao l\xEAn m\u1ED9t ch\xFAt." }
    ],
    tips: "\u7A7A (Kh\xF4ng kh\xED trong kh\xF4ng gian) + \u8C03 (\u0110i\u1EC1u h\xF2a nhi\u1EC7t \u0111\u1ED9)."
  },
  // Hoa quả & Đồ ăn thức uống
  {
    hanzi: "\u8349\u8393",
    pinyin: "c\u01CEom\xE9i",
    hanViet: "Th\u1EA3o Mai",
    vietnamese: "Qu\u1EA3 d\xE2u t\xE2y",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "Hoa qu\u1EA3",
    radical: "\u8279 (Th\u1EA3o)",
    strokeCount: 20,
    examples: [
      { zh: "\u7EA2\u7EA2\u7684\u8349\u8393\u5F88\u751C\u5F88\u597D\u5403\u3002", pinyin: "H\xF3ngh\xF3ng de c\u01CEom\xE9i h\u011Bn ti\xE1n h\u011Bn h\u01CEoch\u012B.", vi: "Nh\u1EEFng qu\u1EA3 d\xE2u t\xE2y \u0111\u1ECF m\u1ECDng r\u1EA5t ng\u1ECDt v\xE0 ngon." },
      { zh: "\u6211\u60F3\u4E70\u4E00\u76D2\u65B0\u9C9C\u7684\u8349\u8393\u3002", pinyin: "W\u01D2 xi\u01CEng m\u01CEi y\xEC h\xE9 x\u012Bnxi\u0101n de c\u01CEom\xE9i.", vi: "T\xF4i mu\u1ED1n mua m\u1ED9t h\u1ED9p d\xE2u t\xE2y t\u01B0\u01A1i ngon." }
    ],
    tips: "C\u1EA3 hai ch\u1EEF \u0111\u1EC1u c\xF3 b\u1ED9 Th\u1EA3o (\u8279) ch\u1EC9 lo\xE0i qu\u1EA3 m\u1ECDng th\u01A1m ng\u1ECDt thu\u1ED9c h\u1ECD th\u1EA3o m\u1ED9c m\u1ECDc s\xE1t \u0111\u1EA5t."
  },
  {
    hanzi: "\u897F\u74DC",
    pinyin: "x\u012Bgu\u0101",
    hanViet: "T\xE2y Qua",
    vietnamese: "Qu\u1EA3 d\u01B0a h\u1EA5u",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "Hoa qu\u1EA3",
    radical: "\u897F (T\xE2y) + \u74DC (Qua)",
    strokeCount: 11,
    examples: [
      { zh: "\u590F\u5929\u5403\u51B0\u897F\u74DC\u771F\u723D\u5FEB\uFF01", pinyin: "Xi\xE0ti\u0101n ch\u012B b\u012Bng x\u012Bgu\u0101 zh\u0113n shu\u01CEngkuai!", vi: "M\xF9a h\xE8 \u0103n d\u01B0a h\u1EA5u \u01B0\u1EDBp l\u1EA1nh th\u1EADt l\xE0 s\u1EA3ng kho\xE1i!" },
      { zh: "\u8FD9\u4E2A\u897F\u74DC\u53C8\u5927\u53C8\u751C\u3002", pinyin: "Zh\xE8ge x\u012Bgu\u0101 y\xF2u d\xE0 y\xF2u ti\xE1n.", vi: "Qu\u1EA3 d\u01B0a h\u1EA5u n\xE0y v\u1EEBa to v\u1EEBa ng\u1ECDt." }
    ],
    tips: "\u897F (Ph\u01B0\u01A1ng T\xE2y \u0111\u01B0a v\xE0o Trung Nguy\xEAn) + \u74DC (H\u1ECD qu\u1EA3 b\u1EA7u b\xED m\u1ECDng n\u01B0\u1EDBc)."
  },
  {
    hanzi: "\u9999\u8549",
    pinyin: "xi\u0101ngji\u0101o",
    hanViet: "H\u01B0\u01A1ng Ti\xEAu",
    vietnamese: "Qu\u1EA3 chu\u1ED1i",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Hoa qu\u1EA3",
    radical: "\u8279 (Th\u1EA3o) + \u9999 (H\u01B0\u01A1ng)",
    strokeCount: 21,
    examples: [
      { zh: "\u7334\u5B50\u6700\u559C\u6B22\u5403\u9999\u8549\u3002", pinyin: "H\xF3uzi zu\xEC x\u01D0huan ch\u012B xi\u0101ngji\u0101o.", vi: "Nh\u1EEFng ch\xFA kh\u1EC9 th\xEDch \u0103n chu\u1ED1i nh\u1EA5t." },
      { zh: "\u4E70\u4E00\u628A\u9999\u8549\u591A\u5C11\u94B1\uFF1F", pinyin: "M\u01CEi y\xEC b\u01CE xi\u0101ngji\u0101o du\u014Dshao qi\xE1n?", vi: "Mua m\u1ED9t n\u1EA3i chu\u1ED1i h\u1EBFt bao nhi\xEAu ti\u1EC1n?" }
    ],
    tips: "\u9999 (H\u01B0\u01A1ng th\u01A1m ng\xE0o ng\u1EA1t) + \u8549 (C\xE2y chu\u1ED1i h\u1ECD c\u1ECF l\xE1 to)."
  },
  {
    hanzi: "\u725B\u5976",
    pinyin: "ni\xFAn\u01CEi",
    hanViet: "Ng\u01B0u N\xE3i",
    vietnamese: "S\u1EEFa b\xF2, s\u1EEFa t\u01B0\u01A1i",
    partOfSpeech: "Danh t\u1EEB",
    level: 1,
    category: "\u0110\u1ED3 u\u1ED1ng",
    radical: "\u725B (Ng\u01B0u) + \u5973 (N\u1EEF)",
    strokeCount: 9,
    examples: [
      { zh: "\u6BCF\u5929\u65E9\u4E0A\u4E00\u676F\u70ED\u725B\u5976\u3002", pinyin: "M\u011Biti\u0101n z\u01CEoshang y\xEC b\u0113i r\xE8 ni\xFAn\u01CEi.", vi: "M\u1ED7i bu\u1ED5i s\xE1ng u\u1ED1ng m\u1ED9t c\u1ED1c s\u1EEFa b\xF2 n\xF3ng." },
      { zh: "\u559D\u725B\u5976\u6709\u52A9\u4E8E\u9AA8\u9ABC\u5065\u5EB7\u3002", pinyin: "H\u0113 ni\xFAn\u01CEi y\u01D2uzh\xF9y\xFA g\u01D4g\xE9 ji\xE0nk\u0101ng.", vi: "U\u1ED1ng s\u1EEFa gi\xFAp \xEDch cho s\u1EF1 ch\u1EAFc kh\u1ECFe c\u1EE7a x\u01B0\u01A1ng c\u1ED1t." }
    ],
    tips: "\u725B (Con b\xF2 c\xE1i hi\u1EC1n l\xE0nh) + \u5976 (D\xF2ng s\u1EEFa ng\u1ECDt th\u01A1m b\u1ED5 d\u01B0\u1EE1ng)."
  },
  {
    hanzi: "\u9762\u5305",
    pinyin: "mi\xE0nb\u0101o",
    hanViet: "Di\u1EC7n Bao",
    vietnamese: "B\xE1nh m\xEC",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 \u0103n",
    radical: "\u9762 (Di\u1EC7n) + \u52F9 (Bao)",
    strokeCount: 14,
    examples: [
      { zh: "\u65E9\u9910\u6211\u5403\u9762\u5305\u548C\u9E21\u86CB\u3002", pinyin: "Z\u01CEoc\u0101n w\u01D2 ch\u012B mi\xE0nb\u0101o h\xE9 j\u012Bd\xE0n.", vi: "B\u1EEFa s\xE1ng t\xF4i \u0103n b\xE1nh m\xEC v\xE0 tr\u1EE9ng g\xE0." },
      { zh: "\u8FD9\u5BB6\u9762\u5305\u5E97\u7684\u9762\u5305\u5F88\u9999\u3002", pinyin: "Zh\xE8 ji\u0101 mi\xE0nb\u0101odi\xE0n de mi\xE0nb\u0101o h\u011Bn xi\u0101ng.", vi: "B\xE1nh m\xEC c\u1EE7a ti\u1EC7m b\xE1nh n\xE0y r\u1EA5t th\u01A1m." }
    ],
    tips: "\u9762 (B\u1ED9t m\xEC nghi\u1EC1n m\u1ECBn) + \u5305 (T\xFAi b\u1ECDc x\u1ED1p m\u1EC1m n\u01B0\u1EDBng ch\xEDn)."
  },
  {
    hanzi: "\u9E21\u86CB",
    pinyin: "j\u012Bd\xE0n",
    hanViet: "K\xEA \u0110\u1EA3n",
    vietnamese: "Qu\u1EA3 tr\u1EE9ng g\xE0",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 \u0103n",
    radical: "\u9E1F (\u0110i\u1EC3u) + \u758B (S\u01A1)",
    strokeCount: 18,
    examples: [
      { zh: "\u6BCF\u5929\u5403\u4E00\u4E2A\u6C34\u716E\u9E21\u86CB\u3002", pinyin: "M\u011Biti\u0101n ch\u012B y\xED ge shu\u01D0zh\u01D4 j\u012Bd\xE0n.", vi: "M\u1ED7i ng\xE0y \u0103n m\u1ED9t qu\u1EA3 tr\u1EE9ng g\xE0 lu\u1ED9c." },
      { zh: "\u897F\u7EA2\u67FF\u7092\u9E21\u86CB\u662F\u4E00\u9053\u4E2D\u56FD\u540D\u83DC\u3002", pinyin: "X\u012Bh\xF3ngsh\xEC ch\u01CEo j\u012Bd\xE0n sh\xEC y\xED d\xE0o zh\u014Dnggu\xF3 m\xEDngc\xE0i.", vi: "C\xE0 chua x\xE0o tr\u1EE9ng l\xE0 m\u1ED9t m\xF3n \u0103n Trung Qu\u1ED1c n\u1ED5i ti\u1EBFng." }
    ],
    tips: "\u9E21 (Con g\xE0 c\xF3 b\u1ED9 \u0110i\u1EC3u \u9E1F) + \u86CB (Qu\u1EA3 tr\u1EE9ng h\xECnh b\u1EA7u d\u1EE5c ch\u1EE9a s\u1EF1 s\u1ED1ng)."
  },
  {
    hanzi: "\u9762\u6761",
    pinyin: "mi\xE0nti\xE1o",
    hanViet: "Di\u1EC7n \u0110i\u1EC1u",
    vietnamese: "M\xEC s\u1EE3i, b\xFAn ph\u1EDF",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 \u0103n",
    radical: "\u9762 (Di\u1EC7n) + \u6728 (M\u1ED9c)",
    strokeCount: 16,
    examples: [
      { zh: "\u751F\u65E5\u90A3\u5929\u8981\u5403\u4E00\u7897\u957F\u5BFF\u9762\u6761\u3002", pinyin: "Sh\u0113ngr\xEC n\xE0 ti\u0101n y\xE0o ch\u012B y\xEC w\u01CEn ch\xE1ngsh\xF2umi\xE0nti\xE1o.", vi: "Ng\xE0y sinh nh\u1EADt c\u1EA7n \u0103n m\u1ED9t b\xE1t m\xEC tr\u01B0\u1EDDng th\u1ECD." },
      { zh: "\u8FD9\u7897\u725B\u8089\u9762\u6761\u771F\u597D\u5403\u3002", pinyin: "Zh\xE8 w\u01CEn ni\xFAr\xF2umi\xE0nti\xE1o zh\u0113n h\u01CEoch\u012B.", vi: "B\xE1t m\xEC b\xF2 n\xE0y ngon qu\xE1." }
    ],
    tips: "\u9762 (B\u1ED9t m\xEC) + \u6761 (S\u1EE3i d\xE0i bu\xF4ng r\u1EE7 dai ngon)."
  },
  {
    hanzi: "\u997A\u5B50",
    pinyin: "ji\u01CEozi",
    hanViet: "Ki\u1EC3u T\u1EED",
    vietnamese: "B\xE1nh ch\u1EBBo, s\u1EE7i c\u1EA3o",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "\u0110\u1ED3 \u0103n",
    radical: "\u9963 (Th\u1EF1c) + \u5B50 (T\u1EED)",
    strokeCount: 12,
    examples: [
      { zh: "\u8FC7\u5E74\u7684\u65F6\u5019\u4E2D\u56FD\u4EBA\u559C\u6B22\u5305\u997A\u5B50\u3002", pinyin: "Gu\xF2ni\xE1n de sh\xEDhou zh\u014Dnggu\xF3r\xE9n x\u01D0hu\u0101n b\u0101o ji\u01CEozi.", vi: "Khi \u0111\xF3n n\u0103m m\u1EDBi ng\u01B0\u1EDDi Trung Qu\u1ED1c th\xEDch g\xF3i s\u1EE7i c\u1EA3o." },
      { zh: "\u70ED\u817E\u817E\u7684\u6C34\u997A\u771F\u7F8E\u5473\u3002", pinyin: "R\xE8t\u0113ngt\u0113ng de shu\u01D0ji\u01CEo zh\u0113n m\u011Biw\xE8i.", vi: "Nh\u1EEFng chi\u1EBFc s\u1EE7i c\u1EA3o n\xF3ng h\u1ED5i th\u1EADt \u0111\u1EADm \u0111\xE0." }
    ],
    tips: "\u997A c\xF3 b\u1ED9 Th\u1EF1c (\u9963) ch\u1EC9 m\xF3n \u0103n truy\u1EC1n th\u1ED1ng sum v\u1EA7y h\xECnh n\xE9n b\u1EA1c may m\u1EAFn."
  },
  // Học tập & Công việc & Tài chính
  {
    hanzi: "\u5956\u5B66\u91D1",
    pinyin: "ji\u01CEngxu\xE9j\u012Bn",
    hanViet: "T\u01B0\u1EDFng H\u1ECDc Kim",
    vietnamese: "H\u1ECDc b\u1ED5ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 4,
    category: "H\u1ECDc t\u1EADp",
    radical: "\u5927 (\u0110\u1EA1i) + \u9485 (Kim)",
    strokeCount: 22,
    examples: [
      { zh: "\u4ED6\u51ED\u501F\u4F18\u5F02\u7684\u6210\u7EE9\u83B7\u5F97\u4E86\u5956\u5B66\u91D1\u3002", pinyin: "T\u0101 p\xEDngji\xE8 y\u014Duy\xEC de ch\xE9ngj\xEC hu\xF2d\xE9 le ji\u01CEngxu\xE9j\u012Bn.", vi: "C\u1EADu \u1EA5y nh\u1EDD v\xE0o th\xE0nh t\xEDch xu\u1EA5t s\u1EAFc \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c h\u1ECDc b\u1ED5ng." },
      { zh: "\u6211\u60F3\u7533\u8BF7\u53BB\u4E2D\u56FD\u7559\u5B66\u7684\u5956\u5B66\u91D1\u3002", pinyin: "W\u01D2 xi\u01CEng sh\u0113nq\u01D0ng q\xF9 zh\u014Dnggu\xF3 li\xFAxu\xE9 de ji\u01CEngxu\xE9j\u012Bn.", vi: "T\xF4i mu\u1ED1n n\u1ED9p h\u1ED3 s\u01A1 xin h\u1ECDc b\u1ED5ng du h\u1ECDc Trung Qu\u1ED1c." }
    ],
    tips: "\u5956 (Khen th\u01B0\u1EDFng) + \u5B66 (H\u1ECDc v\u1EA5n) + \u91D1 (Ti\u1EC1n b\u1EA1c kh\xEDch l\u1EC7 t\xE0i n\u0103ng)."
  },
  {
    hanzi: "\u4FDD\u9669",
    pinyin: "b\u01CEoxi\u01CEn",
    hanViet: "B\u1EA3o Hi\u1EC3m",
    vietnamese: "B\u1EA3o hi\u1EC3m, an to\xE0n ch\u1EAFc ch\u1EAFn",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 4,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u4EBB (Nh\xE2n) + \u961D (Ph\u1EE5)",
    strokeCount: 18,
    examples: [
      { zh: "\u4E70\u533B\u7597\u4FDD\u9669\u975E\u5E38\u6709\u5FC5\u8981\u3002", pinyin: "M\u01CEi y\u012Bli\xE1o b\u01CEoxi\u01CEn f\u0113ich\xE1ng y\u01D2u b\xECy\xE0o.", vi: "Mua b\u1EA3o hi\u1EC3m y t\u1EBF l\xE0 vi\u1EC7c v\xF4 c\xF9ng c\u1EA7n thi\u1EBFt." },
      { zh: "\u8FD9\u6837\u5B89\u6392\u66F4\u52A0\u4FDD\u9669\u5B89\u5168\u3002", pinyin: "Zh\xE8y\xE0ng \u0101np\xE1i g\xE8ngji\u0101 b\u01CEoxi\u01CEn \u0101nqu\xE1n.", vi: "S\u1EAFp x\u1EBFp nh\u01B0 th\u1EBF n\xE0y s\u1EBD an to\xE0n v\xE0 ch\u1EAFc ch\u1EAFn h\u01A1n." }
    ],
    tips: "\u4FDD (B\u1EA3o b\u1ECDc ch\u1EDF che) + \u9669 (Ng\u0103n ng\u1EEBa nguy hi\u1EC3m tai \u01B0\u01A1ng)."
  },
  {
    hanzi: "\u8003\u8BD5",
    pinyin: "k\u01CEosh\xEC",
    hanViet: "Kh\u1EA3o Th\xED",
    vietnamese: "K\u1EF3 thi, thi c\u1EED, ki\u1EC3m tra",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "H\u1ECDc t\u1EADp",
    radical: "\u8002 (L\xE3o) + \u8BA0 (Ng\xF4n)",
    strokeCount: 14,
    examples: [
      { zh: "\u660E\u5929\u6211\u4EEC\u8981\u53C2\u52A0\u6C49\u8BED\u8003\u8BD5\u3002", pinyin: "M\xEDngti\u0101n w\u01D2men y\xE0o c\u0101nji\u0101 h\xE0ny\u01D4 k\u01CEosh\xEC.", vi: "Ng\xE0y mai ch\xFAng t\xF4i ph\u1EA3i tham gia k\u1EF3 thi ti\u1EBFng H\xE1n." },
      { zh: "\u795D\u4F60\u8003\u8BD5\u53D6\u5F97\u597D\u6210\u7EE9\uFF01", pinyin: "Zh\xF9 n\u01D0 k\u01CEosh\xEC q\u01D4d\xE9 h\u01CEo ch\xE9ngj\xEC!", vi: "Ch\xFAc b\u1EA1n thi \u0111\u1EA1t k\u1EBFt qu\u1EA3 t\u1ED1t nh\xE9!" }
    ],
    tips: "\u8003 (Kh\u1EA3o s\xE1t tr\xECnh \u0111\u1ED9) + \u8BD5 (Th\u1EED nghi\u1EC7m ki\u1EBFn th\u1EE9c t\xEDch l\u0169y)."
  },
  {
    hanzi: "\u6210\u7EE9",
    pinyin: "ch\xE9ngj\xEC",
    hanViet: "Th\xE0nh T\xEDch",
    vietnamese: "Th\xE0nh t\xEDch, k\u1EBFt qu\u1EA3 \u0111i\u1EC3m s\u1ED1",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "H\u1ECDc t\u1EADp",
    radical: "\u6208 (Qua) + \u7E9F (M\u1ECBch)",
    strokeCount: 17,
    examples: [
      { zh: "\u4ED6\u7684HSK\u8003\u8BD5\u6210\u7EE9\u975E\u5E38\u9AD8\u3002", pinyin: "T\u0101 de HSK k\u01CEosh\xEC ch\xE9ngj\xEC f\u0113ich\xE1ng g\u0101o.", vi: "\u0110i\u1EC3m thi HSK c\u1EE7a c\u1EADu \u1EA5y r\u1EA5t cao." },
      { zh: "\u7ECF\u8FC7\u52AA\u529B\uFF0C\u4ED6\u7684\u5B66\u4E60\u6210\u7EE9\u63D0\u9AD8\u4E86\u3002", pinyin: "J\u012Bnggu\xF2 n\u01D4l\xEC, t\u0101 de xu\xE9x\xED ch\xE9ngj\xEC t\xEDg\u0101o le.", vi: "Qua qu\xE1 tr\xECnh c\u1ED1 g\u1EAFng, th\xE0nh t\xEDch h\u1ECDc t\u1EADp c\u1EE7a b\u1EA1n \u1EA5y \u0111\xE3 ti\u1EBFn b\u1ED9." }
    ],
    tips: "\u6210 (\u0110\u1EA1t \u0111\u01B0\u1EE3c k\u1EBFt qu\u1EA3 vi\xEAn m\xE3n) + \u7EE9 (D\u1EC7t n\xEAn k\u1EF3 t\xEDch r\u1EF1c r\u1EE1)."
  },
  {
    hanzi: "\u6210\u529F",
    pinyin: "ch\xE9ngg\u014Dng",
    hanViet: "Th\xE0nh C\xF4ng",
    vietnamese: "Th\xE0nh c\xF4ng",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 3,
    category: "S\u1EF1 nghi\u1EC7p",
    radical: "\u6208 (Qua) + \u529B (L\u1EF1c)",
    strokeCount: 11,
    examples: [
      { zh: "\u575A\u6301\u5230\u5E95\u5C31\u4E00\u5B9A\u4F1A\u6210\u529F\u3002", pinyin: "Ji\u0101nch\xED d\xE0od\u01D0 ji\xF9 y\xEDd\xECng hu\xEC ch\xE9ngg\u014Dng.", vi: "Ki\xEAn tr\xEC \u0111\u1EBFn c\xF9ng nh\u1EA5t \u0111\u1ECBnh s\u1EBD th\xE0nh c\xF4ng." },
      { zh: "\u795D\u8D3A\u4F60\u7684\u65B0\u9879\u76EE\u83B7\u5F97\u5DE8\u5927\u6210\u529F\uFF01", pinyin: "Zh\xF9h\xE8 n\u01D0 de x\u012Bn xi\xE0ngm\xF9 hu\xF2d\xE9 j\xF9d\xE0 ch\xE9ngg\u014Dng!", vi: "Ch\xFAc m\u1EEBng d\u1EF1 \xE1n m\u1EDBi c\u1EE7a b\u1EA1n g\u1EB7t h\xE1i th\xE0nh c\xF4ng l\u1EDBn!" }
    ],
    tips: "\u6210 (Ho\xE0n th\xE0nh \xFD nguy\u1EC7n) + \u529F (C\xF4ng s\u1EE9c r\xE8n gi\u0169a c\xF3 th\xE0nh t\u1EF1u)."
  },
  {
    hanzi: "\u5E0C\u671B",
    pinyin: "x\u012Bw\xE0ng",
    hanViet: "Hi V\u1ECDng",
    vietnamese: "Hi v\u1ECDng, mong mu\u1ED1n",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "C\u1EA3m x\xFAc",
    radical: "\u5DFE (C\xE2n) + \u6708 (Nguy\u1EC7t)",
    strokeCount: 18,
    examples: [
      { zh: "\u5E0C\u671B\u4F60\u6BCF\u5929\u90FD\u5F00\u5F00\u5FC3\u5FC3\u3002", pinyin: "X\u012Bw\xE0ng n\u01D0 m\u011Biti\u0101n d\u014Du k\u0101ik\u0101ix\u012Bnx\u012Bn.", vi: "Hi v\u1ECDng b\u1EA1n m\u1ED7i ng\xE0y \u0111\u1EC1u tr\xE0n ng\u1EADp n\u1EE5 c\u01B0\u1EDDi vui v\u1EBB." },
      { zh: "\u53EA\u8981\u6709\u5E0C\u671B\uFF0C\u751F\u6D3B\u5C31\u5145\u6EE1\u9633\u5149\u3002", pinyin: "Zh\u01D0y\xE0o y\u01D2u x\u012Bw\xE0ng, sh\u0113nghu\xF3 ji\xF9 ch\u014Dngm\u01CEn y\xE1nggu\u0101ng.", vi: "Ch\u1EC9 c\u1EA7n c\xF3 hi v\u1ECDng, cu\u1ED9c s\u1ED1ng s\u1EBD ng\u1EADp tr\xE0n \xE1nh n\u1EAFng." }
    ],
    tips: "\u5E0C (Khao kh\xE1t m\u1ECFng manh qu\xFD gi\xE1) + \u671B (Ng\xF3ng tr\xF4ng \xE1nh tr\u0103ng tr\xF2n h\u01B0\u1EDBng t\u1EDBi t\u01B0\u01A1ng lai)."
  },
  {
    hanzi: "\u51B3\u5B9A",
    pinyin: "ju\xE9d\xECng",
    hanViet: "Quy\u1EBFt \u0110\u1ECBnh",
    vietnamese: "Quy\u1EBFt \u0111\u1ECBnh",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 3,
    category: "H\xE0nh vi",
    radical: "\u6C35 (Th\u1EE7y) + \u5B80 (Mi\xEAn)",
    strokeCount: 15,
    examples: [
      { zh: "\u6211\u51B3\u5B9A\u660E\u5E74\u53BB\u4E2D\u56FD\u65C5\u884C\u3002", pinyin: "W\u01D2 ju\xE9d\xECng m\xEDngni\xE1n q\xF9 zh\u014Dnggu\xF3 l\u01DAx\xEDng.", vi: "T\xF4i quy\u1EBFt \u0111\u1ECBnh sang n\u0103m s\u1EBD \u0111i du l\u1ECBch Trung Qu\u1ED1c." },
      { zh: "\u8FD9\u662F\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u51B3\u5B9A\u3002", pinyin: "Zh\xE8 sh\xEC y\xED ge f\u0113ich\xE1ng zh\xF2ngy\xE0o de ju\xE9d\xECng.", vi: "\u0110\xE2y l\xE0 m\u1ED9t quy\u1EBFt \u0111\u1ECBnh v\xF4 c\xF9ng quan tr\u1ECDng." }
    ],
    tips: "\u51B3 (Quy\u1EBFt \u0111o\xE1n d\u1EE9t kho\xE1t) + \u5B9A (An \u0111\u1ECBnh v\u1EEFng v\xE0ng d\u01B0\u1EDBi m\xE1i nh\xE0 \u5B80)."
  },
  {
    hanzi: "\u806A\u660E",
    pinyin: "c\u014Dngm\xEDng",
    hanViet: "Th\xF4ng Minh",
    vietnamese: "Th\xF4ng minh, s\xE1ng d\u1EA1",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "Ph\u1EA9m ch\u1EA5t",
    radical: "\u8033 (Nh\u0129) + \u65E5 (Nh\u1EADt)",
    strokeCount: 23,
    examples: [
      { zh: "\u8FD9\u4E2A\u5B69\u5B50\u975E\u5E38\u806A\u660E\u61C2\u4E8B\u3002", pinyin: "Zh\xE8ge h\xE1izi f\u0113ich\xE1ng c\u014Dngm\xEDng d\u01D2ngsh\xEC.", vi: "\u0110\u1EE9a b\xE9 n\xE0y r\u1EA5t th\xF4ng minh v\xE0 hi\u1EC3u chuy\u1EC7n." },
      { zh: "\u8FD9\u662F\u4E00\u4E2A\u5F88\u806A\u660E\u7684\u89E3\u51B3\u529E\u6CD5\u3002", pinyin: "Zh\xE8 sh\xEC y\xED ge h\u011Bn c\u014Dngm\xEDng de ji\u011Bju\xE9 b\xE0nf\u01CE.", vi: "\u0110\xE2y l\xE0 m\u1ED9t c\xE1ch gi\u1EA3i quy\u1EBFt r\u1EA5t th\xF4ng minh." }
    ],
    tips: "\u806A c\xF3 b\u1ED9 Nh\u0129 (\u8033 - tai th\xEDnh hi\u1EC3u nhanh). \u660E g\u1ED3m Nh\u1EADt v\xE0 Nguy\u1EC7t (m\u1EAFt s\xE1ng t\u1ECF t\u01B0\u1EDDng)."
  },
  {
    hanzi: "\u8BA4\u771F",
    pinyin: "r\xE8nzh\u0113n",
    hanViet: "Nh\u1EADn Ch\xE2n",
    vietnamese: "Ch\u0103m ch\u1EC9, nghi\xEAm t\xFAc, c\u1EA9n th\u1EADn",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 3,
    category: "Ph\u1EA9m ch\u1EA5t",
    radical: "\u8BA0 (Ng\xF4n) + \u76EE (M\u1EE5c)",
    strokeCount: 14,
    examples: [
      { zh: "\u4ED6\u5DE5\u4F5C\u6001\u5EA6\u975E\u5E38\u8BA4\u771F\u3002", pinyin: "T\u0101 g\u014Dngzu\xF2 t\xE0id\xF9 f\u0113ich\xE1ng r\xE8nzh\u0113n.", vi: "Th\xE1i \u0111\u1ED9 l\xE0m vi\u1EC7c c\u1EE7a anh \u1EA5y r\u1EA5t nghi\xEAm t\xFAc v\xE0 t\u1EADn t\xE2m." },
      { zh: "\u540C\u5B66\u4EEC\u90FD\u5728\u8BA4\u771F\u5730\u542C\u8001\u5E08\u8BB2\u8BFE\u3002", pinyin: "T\xF3ngxu\xE9men d\u014Du z\xE0i r\xE8nzh\u0113n de t\u012Bng l\u01CEosh\u012B ji\u01CEngk\xE8.", vi: "C\xE1c b\u1EA1n h\u1ECDc \u0111\u1EC1u \u0111ang ch\u0103m ch\xFA l\u1EAFng nghe c\xF4 gi\xE1o gi\u1EA3ng b\xE0i." }
    ],
    tips: "\u8BA4 (Nh\u1EADn th\u1EE9c r\xF5 r\xE0ng) + \u771F (Ch\xE2n th\u1EADt ngay th\u1EB3ng, kh\xF4ng ch\xFAt gi\u1EA3 d\u1ED1i)."
  },
  {
    hanzi: "\u70ED\u60C5",
    pinyin: "r\xE8q\xEDng",
    hanViet: "Nhi\u1EC7t T\xECnh",
    vietnamese: "Nhi\u1EC7t t\xECnh, hi\u1EBFu kh\xE1ch, ni\u1EC1m n\u1EDF",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 3,
    category: "Ph\u1EA9m ch\u1EA5t",
    radical: "\u706C (H\u1ECFa) + \u5FC4 (T\xE2m)",
    strokeCount: 21,
    examples: [
      { zh: "\u4E2D\u56FD\u670B\u53CB\u975E\u5E38\u70ED\u60C5\u597D\u5BA2\u3002", pinyin: "Zh\u014Dnggu\xF3 p\xE9ngyou f\u0113ich\xE1ng r\xE8q\xEDng h\xE0ok\xE8.", vi: "Nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n Trung Qu\u1ED1c r\u1EA5t nhi\u1EC7t t\xECnh v\xE0 m\u1EBFn kh\xE1ch." },
      { zh: "\u5979\u70ED\u60C5\u5730\u6B22\u8FCE\u6BCF\u4E00\u4F4D\u5BA2\u4EBA\u3002", pinyin: "T\u0101 r\xE8q\xEDng de hu\u0101ny\xEDng m\u011Bi y\xED w\xE8i k\xE8r\xE9n.", vi: "C\xF4 \u1EA5y ni\u1EC1m n\u1EDF ch\xE0o \u0111\xF3n t\u1EEBng v\u1ECB kh\xE1ch qu\xFD." }
    ],
    tips: "\u70ED (Ng\u1ECDn l\u1EEDa \u1EA5m \xE1p \u0111\u01B0\u1EE3m t\xECnh) + \u60C5 (Tr\xE1i tim d\u1EA1t d\xE0o t\xECnh ngh\u0129a)."
  },
  {
    hanzi: "\u793C\u8C8C",
    pinyin: "l\u01D0m\xE0o",
    hanViet: "L\u1EC5 M\u1EA1o",
    vietnamese: "L\u1EC5 ph\xE9p, l\u1ECBch thi\u1EC7p",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 4,
    category: "Ph\u1EA9m ch\u1EA5t",
    radical: "\u793B (Th\u1ECB) + \u8C78 (Tr\u0129)",
    strokeCount: 19,
    examples: [
      { zh: "\u5BF9\u957F\u8F88\u8BF4\u8BDD\u8981\u6709\u793C\u8C8C\u3002", pinyin: "Du\xEC zh\u01CEngb\xE8i shu\u014Dhu\xE0 y\xE0o y\u01D2u l\u01D0m\xE0o.", vi: "N\xF3i chuy\u1EC7n v\u1EDBi ng\u01B0\u1EDDi l\u1EDBn tu\u1ED5i c\u1EA7n ph\u1EA3i l\u1EC5 ph\xE9p." },
      { zh: "\u4ED6\u662F\u4E00\u4E2A\u975E\u5E38\u6709\u793C\u8C8C\u7684\u5E74\u8F7B\u4EBA\u3002", pinyin: "T\u0101 sh\xEC y\xED ge f\u0113ich\xE1ng y\u01D2u l\u01D0m\xE0o de ni\xE1nq\u012Bngr\xE9n.", vi: "C\u1EADu \u1EA5y l\xE0 m\u1ED9t ng\u01B0\u1EDDi tr\u1EBB tu\u1ED5i r\u1EA5t c\xF3 l\u1EC5 \u0111\u1ED9." }
    ],
    tips: "\u793C (L\u1EC5 nghi ph\xE9p t\u1EAFc) + \u8C8C (Dung m\u1EA1o phong th\xE1i h\xF2a nh\xE3 k\xEDnh tr\u1ECDng)."
  },
  {
    hanzi: "\u73AF\u5883",
    pinyin: "hu\xE1nj\xECng",
    hanViet: "Ho\xE0n C\u1EA3nh",
    vietnamese: "M\xF4i tr\u01B0\u1EDDng, ho\xE0n c\u1EA3nh xung quanh",
    partOfSpeech: "Danh t\u1EEB",
    level: 3,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u738B (V\u01B0\u01A1ng/Ng\u1ECDc) + \u571F (Th\u1ED5)",
    strokeCount: 22,
    examples: [
      { zh: "\u6211\u4EEC\u5E94\u8BE5\u5171\u540C\u4FDD\u62A4\u751F\u6D3B\u73AF\u5883\u3002", pinyin: "W\u01D2men y\u012Bngg\u0101i g\xF2ngt\xF3ng b\u01CEoh\xF9 sh\u0113nghu\xF3 hu\xE1nj\xECng.", vi: "Ch\xFAng ta n\xEAn chung tay b\u1EA3o v\u1EC7 m\xF4i tr\u01B0\u1EDDng s\u1ED1ng." },
      { zh: "\u8FD9\u91CC\u7684\u5B66\u4E60\u73AF\u5883\u5341\u5206\u5B89\u9759\u3002", pinyin: "Zh\xE8l\u01D0 de xu\xE9x\xED hu\xE1nj\xECng sh\xEDf\u0113n \u0101nj\xECng.", vi: "M\xF4i tr\u01B0\u1EDDng h\u1ECDc t\u1EADp \u1EDF \u0111\xE2y r\u1EA5t y\xEAn t\u0129nh." }
    ],
    tips: "\u73AF (V\xF2ng ng\u1ECDc bao b\u1ECDc chung quanh) + \u5883 (Ranh gi\u1EDBi c\xF5i \u0111\u1EA5t)."
  },
  {
    hanzi: "\u4FDD\u62A4",
    pinyin: "b\u01CEoh\xF9",
    hanViet: "B\u1EA3o H\u1ED9",
    vietnamese: "B\u1EA3o v\u1EC7, che ch\u1EDF",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 3,
    category: "H\xE0nh vi",
    radical: "\u4EBB (Nh\xE2n) + \u624C (Th\u1EE7)",
    strokeCount: 16,
    examples: [
      { zh: "\u5927\u718A\u732B\u662F\u56FD\u5BB6\u91CD\u70B9\u4FDD\u62A4\u52A8\u7269\u3002", pinyin: "D\xE0xi\xF3ngm\u0101o sh\xEC gu\xF3ji\u0101 zh\xF2ngdi\u01CEn b\u01CEoh\xF9 d\xF2ngw\xF9.", vi: "G\u1EA5u tr\xFAc l\u1EDBn l\xE0 lo\xE0i \u0111\u1ED9ng v\u1EADt \u0111\u01B0\u1EE3c nh\xE0 n\u01B0\u1EDBc b\u1EA3o v\u1EC7 tr\u1ECDng \u0111i\u1EC3m." },
      { zh: "\u6211\u4EEC\u8981\u597D\u597D\u4FDD\u62A4\u89C6\u529B\u3002", pinyin: "W\u01D2men y\xE0o h\u01CEoh\u01CEo b\u01CEoh\xF9 sh\xECl\xEC.", vi: "Ch\xFAng ta ph\u1EA3i b\u1EA3o v\u1EC7 t\u1ED1t th\u1ECB l\u1EF1c \u0111\xF4i m\u1EAFt." }
    ],
    tips: "\u4FDD (Gi\u1EEF g\xECn che ch\u1EDF) + \u62A4 (D\xF9ng b\xE0n tay \u624C che ch\u1EDF \u0111\xF9m b\u1ECDc)."
  },
  {
    hanzi: "\u4E60\u60EF",
    pinyin: "x\xEDgu\xE0n",
    hanViet: "T\u1EADp Qu\xE1n",
    vietnamese: "Th\xF3i quen, t\u1EADp qu\xE1n, quen v\u1EDBi",
    partOfSpeech: "Danh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 3,
    category: "\u0110\u1EDDi s\u1ED1ng",
    radical: "\u7FBD (V\u0169) + \u5FC4 (T\xE2m)",
    strokeCount: 14,
    examples: [
      { zh: "\u65E9\u7761\u65E9\u8D77\u662F\u4E00\u4E2A\u597D\u4E60\u60EF\u3002", pinyin: "Z\u01CEoshu\xEC z\u01CEoq\u01D0 sh\xEC y\xED ge h\u01CEo x\xEDgu\xE0n.", vi: "Ng\u1EE7 s\u1EDBm d\u1EADy s\u1EDBm l\xE0 m\u1ED9t th\xF3i quen r\u1EA5t t\u1ED1t." },
      { zh: "\u6211\u5DF2\u7ECF\u4E60\u60EF\u4E86\u8FD9\u91CC\u7684\u6C14\u5019\u3002", pinyin: "W\u01D2 y\u01D0j\u012Bng x\xEDgu\xE0n le zh\xE8l\u01D0 de q\xECh\xF2u.", vi: "T\xF4i \u0111\xE3 quen d\u1EA7n v\u1EDBi kh\xED h\u1EADu n\u01A1i n\xE0y r\u1ED3i." }
    ],
    tips: "\u4E60 (Luy\u1EC7n t\u1EADp \u0111\xF4i c\xE1nh) + \u60EF (Tr\xE1i tim quen thu\u1ED9c b\u1EC1n b\u1EC9 duy tr\xEC)."
  },
  {
    hanzi: "\u575A\u6301",
    pinyin: "ji\u0101nch\xED",
    hanViet: "Ki\xEAn Tr\xEC",
    vietnamese: "Ki\xEAn tr\xEC, nh\u1EABn n\u1EA1i",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 4,
    category: "Ph\u1EA9m ch\u1EA5t",
    radical: "\u571F (Th\u1ED5) + \u624C (Th\u1EE7)",
    strokeCount: 18,
    examples: [
      { zh: "\u6BCF\u5929\u575A\u6301\u5B66\u4E2D\u6587\uFF0C\u8FDB\u6B65\u4F1A\u5F88\u5FEB\u3002", pinyin: "M\u011Biti\u0101n ji\u0101nch\xED xu\xE9 zh\u014Dngw\xE9n, j\xECnb\xF9 hu\xEC h\u011Bn ku\xE0i.", vi: "M\u1ED7i ng\xE0y ki\xEAn tr\xEC h\u1ECDc ti\u1EBFng Trung, b\u1EA1n s\u1EBD ti\u1EBFn b\u1ED9 r\u1EA5t nhanh." },
      { zh: "\u53EA\u8981\u575A\u6301\uFF0C\u68A6\u60F3\u5C31\u4F1A\u5B9E\u73B0\u3002", pinyin: "Zh\u01D0y\xE0o ji\u0101nch\xED, m\xE8ngxi\u01CEng ji\xF9 hu\xEC sh\xEDxi\xE0n.", vi: "Ch\u1EC9 c\u1EA7n ki\xEAn tr\xEC, \u01B0\u1EDBc m\u01A1 s\u1EBD tr\u1EDF th\xE0nh hi\u1EC7n th\u1EF1c." }
    ],
    tips: "\u575A (Ki\xEAn c\u1ED1 v\u1EEFng nh\u01B0 \u0111\u1EA5t \u0111\xE1) + \u6301 (D\xF9ng tay gi\u1EEF ch\u1EB7t kh\xF4ng bu\xF4ng l\u01A1i)."
  },
  {
    hanzi: "\u8FC7",
    pinyin: "gu\xF2",
    hanViet: "Qu\xE1 / Qua",
    vietnamese: "Qua, \u0111i qua; t\u1EEBng (tr\u1EE3 t\u1EEB ch\u1EC9 kinh nghi\u1EC7m)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Tr\u1EE3 t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Ng\u1EEF ph\xE1p",
    radical: "\u8FB6 (X\u01B0\u1EDBc)",
    strokeCount: 6,
    examples: [
      { zh: "\u6211\u53BB\u8FC7\u4E00\u6B21\u5317\u4EAC\u3002", pinyin: "W\u01D2 q\xF9 guo y\xED c\xEC B\u011Bij\u012Bng.", vi: "T\xF4i t\u1EEBng \u0111i B\u1EAFc Kinh m\u1ED9t l\u1EA7n." },
      { zh: "\u8FC7\u9A6C\u8DEF\u7684\u65F6\u5019\u8981\u5C0F\u5FC3\u3002", pinyin: "Gu\xF2 m\u01CEl\xF9 de sh\xEDhou y\xE0o xi\u01CEox\u012Bn.", vi: "Khi \u0111i qua \u0111\u01B0\u1EDDng c\u1EA7n ph\u1EA3i c\u1EA9n th\u1EADn." }
    ],
    tips: "G\u1ED3m b\u1ED9 X\u01B0\u1EDBc (\u8FB6) v\xE0 ch\u1EEF Th\u1ED1n (\u5BF8). B\u01B0\u1EDBc \u0111i qua m\u1ED9t kho\u1EA3ng c\xE1ch. Ph\u1ED3n th\u1EC3: \u904E."
  },
  {
    hanzi: "\u5546\u573A",
    pinyin: "sh\u0101ngch\u01CEng",
    hanViet: "Th\u01B0\u01A1ng Tr\u01B0\u1EDDng",
    vietnamese: "Trung t\xE2m th\u01B0\u01A1ng m\u1EA1i, khu mua s\u1EAFm",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Mua s\u1EAFm & \u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u4EA0 (\u0110\u1EA7u) + \u571F (Th\u1ED5)",
    strokeCount: 17,
    examples: [
      { zh: "\u5468\u672B\u8FD9\u5BB6\u5546\u573A\u91CC\u4EBA\u5F88\u591A\u3002", pinyin: "Zh\u014Dum\xF2 zh\xE8 ji\u0101 sh\u0101ngch\u01CEng l\u01D0 r\xE9n h\u011Bn du\u014D.", vi: "Cu\u1ED1i tu\u1EA7n trung t\xE2m th\u01B0\u01A1ng m\u1EA1i n\xE0y r\u1EA5t \u0111\xF4ng ng\u01B0\u1EDDi." },
      { zh: "\u6211\u4EEC\u53BB\u5546\u573A\u4E70\u8863\u670D\u5427\u3002", pinyin: "W\u01D2men q\xF9 sh\u0101ngch\u01CEng m\u01CEi y\u012Bfu ba.", vi: "Ch\xFAng m\xECnh \u0111\u1EBFn trung t\xE2m th\u01B0\u01A1ng m\u1EA1i mua qu\u1EA7n \xE1o \u0111i." }
    ],
    tips: "\u5546 (Bu\xF4n b\xE1n th\u01B0\u01A1ng nghi\u1EC7p) + \u573A (Qu\u1EA3ng tr\u01B0\u1EDDng, n\u01A1i t\u1EADp trung bu\xF4n b\xE1n). Ph\u1ED3n th\u1EC3: \u5546\u5834."
  },
  {
    hanzi: "\u8FDB\u53BB",
    pinyin: "j\xECnqu",
    hanViet: "Ti\u1EBFn Kh\u1EE9",
    vietnamese: "\u0110i v\xE0o, b\u01B0\u1EDBc v\xE0o (h\u01B0\u1EDBng ra xa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Ph\u01B0\u01A1ng h\u01B0\u1EDBng",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    strokeCount: 12,
    examples: [
      { zh: "\u5916\u9762\u5F88\u51B7\uFF0C\u5FEB\u8FDB\u53BB\u5427\u3002", pinyin: "W\xE0imi\xE0n h\u011Bn l\u011Bng, ku\xE0i j\xECnqu ba.", vi: "B\xEAn ngo\xE0i r\u1EA5t l\u1EA1nh, mau \u0111i v\xE0o trong \u0111i." },
      { zh: "\u4ED6\u63A8\u5F00\u95E8\u8D70\u4E86\u8FDB\u53BB\u3002", pinyin: "T\u0101 tu\u012Bk\u0101i m\xE9n z\u01D2u le j\xECnqu.", vi: "Anh \u1EA5y \u0111\u1EA9y c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o trong." }
    ],
    tips: "\u8FDB (Ti\u1EBFn v\xE0o trong) + \u53BB (\u0110i xa kh\u1ECFi v\u1ECB tr\xED n\xF3i): Di chuy\u1EC3n v\xE0o ph\xEDa trong."
  },
  {
    hanzi: "\u6761",
    pinyin: "ti\xE1o",
    hanViet: "\u0110i\u1EC1u",
    vietnamese: "Con, c\xE1i, chi\u1EBFc (l\u01B0\u1EE3ng t\u1EEB cho qu\u1EA7n, v\xE1y, c\xE1, s\xF4ng, \u0111\u01B0\u1EDDng...)",
    partOfSpeech: "L\u01B0\u1EE3ng t\u1EEB",
    level: 2,
    category: "L\u01B0\u1EE3ng t\u1EEB & Mi\xEAu t\u1EA3",
    radical: "\u6728 (M\u1ED9c)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u60F3\u4E70\u4E00\u6761\u65B0\u88E4\u5B50\u3002", pinyin: "W\u01D2 xi\u01CEng m\u01CEi y\xEC ti\xE1o x\u012Bn k\xF9zi.", vi: "T\xF4i mu\u1ED1n mua m\u1ED9t chi\u1EBFc qu\u1EA7n m\u1EDBi." },
      { zh: "\u8FD9\u6761\u8DEF\u4E00\u76F4\u5F80\u524D\u8D70\u5C31\u5230\u4E86\u3002", pinyin: "Zh\xE8 ti\xE1o l\xF9 y\xECzh\xED w\u01CEng qi\xE1n z\u01D2u ji\xF9 d\xE0o le.", vi: "Con \u0111\u01B0\u1EDDng n\xE0y c\u1EE9 \u0111i th\u1EB3ng v\u1EC1 ph\xEDa tr\u01B0\u1EDBc l\xE0 t\u1EDBi." }
    ],
    tips: "B\u1ED9 M\u1ED9c (\u6728 - c\xE0nh c\xE2y thon d\xE0i u\u1ED1n l\u01B0\u1EE3n). L\u01B0\u1EE3ng t\u1EEB cho v\u1EADt d\xE1ng d\xE0i. Ph\u1ED3n th\u1EC3: \u689D."
  },
  {
    hanzi: "\u88E4\u5B50",
    pinyin: "k\xF9zi",
    hanViet: "Kh\u1ED1 T\u1EED",
    vietnamese: "Chi\u1EBFc qu\u1EA7n, c\xE1i qu\u1EA7n",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Trang ph\u1EE5c & Mua s\u1EAFm",
    radical: "\u8864 (Y) + \u5B50 (T\u1EED)",
    strokeCount: 15,
    examples: [
      { zh: "\u8FD9\u6761\u88E4\u5B50\u6709\u70B9\u513F\u957F\u3002", pinyin: "Zh\xE8 ti\xE1o k\xF9zi y\u01D2udi\u01CEnr ch\xE1ng.", vi: "Chi\u1EBFc qu\u1EA7n n\xE0y h\u01A1i d\xE0i m\u1ED9t ch\xFAt." },
      { zh: "\u4F60\u7A7F\u8FD9\u6761\u9ED1\u8272\u7684\u88E4\u5B50\u5F88\u597D\u770B\u3002", pinyin: "N\u01D0 chu\u0101n zh\xE8 ti\xE1o h\u0113is\xE8 de k\xF9zi h\u011Bn h\u01CEok\xE0n.", vi: "B\u1EA1n m\u1EB7c chi\u1EBFc qu\u1EA7n m\xE0u \u0111en n\xE0y r\u1EA5t \u0111\u1EB9p." }
    ],
    tips: "B\u1ED9 Y (\u8864- trang ph\u1EE5c) + Kh\u1ED1 (\u5E93 - kho). L\u01B0\u1EE3ng t\u1EEB d\xF9ng \u6761 (ti\xE1o). Ph\u1ED3n th\u1EC3: \u8932\u5B50."
  },
  {
    hanzi: "\u767D\u8272",
    pinyin: "b\xE1is\xE8",
    hanViet: "B\u1EA1ch S\u1EAFc",
    vietnamese: "M\xE0u tr\u1EAFng",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u767D (B\u1EA1ch) + \u2E88 (S\u1EAFc)",
    strokeCount: 11,
    examples: [
      { zh: "\u6211\u559C\u6B22\u7A7F\u767D\u8272\u7684\u886C\u886B\u3002", pinyin: "W\u01D2 x\u01D0huan chu\u0101n b\xE1is\xE8 de ch\xE8nsh\u0101n.", vi: "T\xF4i th\xEDch m\u1EB7c \xE1o s\u01A1 mi m\xE0u tr\u1EAFng." },
      { zh: "\u51AC\u5929\u4E0B\u96EA\u4E86\uFF0C\u5230\u5904\u90FD\u662F\u767D\u8272\u7684\u3002", pinyin: "D\u014Dngti\u0101n xi\xE0xu\u011B le, d\xE0och\xF9 d\u014Du sh\xEC b\xE1is\xE8 de.", vi: "M\xF9a \u0111\xF4ng tuy\u1EBFt r\u01A1i, kh\u1EAFp n\u01A1i \u0111\u1EC1u l\xE0 m\xE0u tr\u1EAFng." }
    ],
    tips: "\u767D (B\u1EA1ch - tr\u1EAFng tinh kh\xF4i) + \u8272 (S\u1EAFc - m\xE0u v\u1EBB). Bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a s\u1EF1 gi\u1EA3n d\u1ECB, tinh khi\u1EBFt."
  },
  {
    hanzi: "\u56E0\u4E3A",
    pinyin: "y\u012Bnw\xE8i",
    hanViet: "Nh\xE2n Vi",
    vietnamese: "B\u1EDFi v\xEC, v\xEC",
    partOfSpeech: "Li\xEAn t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    radical: "\u56D7 (Vi) + \u4E36 (Ch\u1EE7)",
    strokeCount: 10,
    examples: [
      { zh: "\u56E0\u4E3A\u4E0B\u96E8\uFF0C\u6240\u4EE5\u6211\u4EEC\u6CA1\u53BB\u516C\u56ED\u3002", pinyin: "Y\u012Bnw\xE8i xi\xE0y\u01D4, su\u01D2y\u01D0 w\u01D2men m\xE9i q\xF9 g\u014Dngyu\xE1n.", vi: "B\u1EDFi v\xEC tr\u1EDDi m\u01B0a n\xEAn ch\xFAng t\xF4i kh\xF4ng \u0111i c\xF4ng vi\xEAn." },
      { zh: "\u4ED6\u4ECA\u5929\u6CA1\u6765\uFF0C\u56E0\u4E3A\u4ED6\u751F\u75C5\u4E86\u3002", pinyin: "T\u0101 j\u012Bnti\u0101n m\xE9i l\xE1i, y\u012Bnw\xE8i t\u0101 sh\u0113ngb\xECng le.", vi: "H\xF4m nay anh \u1EA5y kh\xF4ng \u0111\u1EBFn v\xEC anh \u1EA5y b\u1ECB \u1ED1m." }
    ],
    tips: "\u56E0 (Nguy\xEAn do) + \u4E3A (V\xEC \u0111i\u1EC1u g\xEC). \u0110i v\u1EDBi \u6240\u4EE5 (su\u01D2y\u01D0) t\u1EA1o c\u1EA5u tr\xFAc nguy\xEAn nh\xE2n - k\u1EBFt qu\u1EA3. Ph\u1ED3n th\u1EC3: \u56E0\u70BA."
  },
  {
    hanzi: "\u8BD5",
    pinyin: "sh\xEC",
    hanViet: "Th\xED",
    vietnamese: "Th\u1EED, l\xE0m th\u1EED, m\u1EB7c th\u1EED",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Mua s\u1EAFm",
    radical: "\u8BA0 (Ng\xF4n)",
    strokeCount: 8,
    examples: [
      { zh: "\u6211\u53EF\u4EE5\u8BD5\u4E00\u4E0B\u8FD9\u4EF6\u8863\u670D\u5417\uFF1F", pinyin: "W\u01D2 k\u011By\u01D0 sh\xEC y\xEDxi\xE0 zh\xE8 ji\xE0n y\u012Bfu ma?", vi: "T\xF4i c\xF3 th\u1EC3 m\u1EB7c th\u1EED b\u1ED9 qu\u1EA7n \xE1o n\xE0y m\u1ED9t ch\xFAt kh\xF4ng?" },
      { zh: "\u8FD9\u9053\u9898\u5F88\u96BE\uFF0C\u4F46\u6211\u60F3\u8BD5\u8BD5\u3002", pinyin: "Zh\xE8 d\xE0o t\xED h\u011Bn n\xE1n, d\xE0n w\u01D2 xi\u01CEng sh\xECshi.", vi: "C\xE2u h\u1ECFi n\xE0y r\u1EA5t kh\xF3, nh\u01B0ng t\xF4i mu\u1ED1n l\xE0m th\u1EED xem sao." }
    ],
    tips: "Ng\xF4n (\u8BA0- l\u1EDDi n\xF3i) + Th\u1EE9c (\u5F0F - ki\u1EC3u c\xE1ch m\u1EABu th\u1EED). L\u1EDDi n\xF3i th\u0103m d\xF2, th\u1EED nghi\u1EC7m. Ph\u1ED3n th\u1EC3: \u8A66."
  },
  {
    hanzi: "\u7EA2\u8272",
    pinyin: "h\xF3ngs\xE8",
    hanViet: "H\u1ED3ng S\u1EAFc",
    vietnamese: "M\xE0u \u0111\u1ECF",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    strokeCount: 12,
    examples: [
      { zh: "\u4E2D\u56FD\u65B0\u5E74\u5927\u5BB6\u5E38\u7A7F\u7EA2\u8272\u7684\u8863\u670D\u3002", pinyin: "Zh\u014Dnggu\xF3 x\u012Bnni\xE1n d\xE0ji\u0101 ch\xE1ng chu\u0101n h\xF3ngs\xE8 de y\u012Bfu.", vi: "V\xE0o T\u1EBFt Nguy\xEAn \u0110\xE1n Trung Qu\u1ED1c, m\u1ECDi ng\u01B0\u1EDDi th\u01B0\u1EDDng m\u1EB7c \u0111\u1ED3 m\xE0u \u0111\u1ECF." },
      { zh: "\u90A3\u4E2A\u7EA2\u8272\u7684\u82F9\u679C\u770B\u8D77\u6765\u5F88\u597D\u5403\u3002", pinyin: "N\xE0 ge h\xF3ngs\xE8 de p\xEDnggu\u01D2 k\xE0n q\u01D0l\xE1i h\u011Bn h\u01CEoch\u012B.", vi: "Qu\u1EA3 t\xE1o m\xE0u \u0111\u1ECF kia tr\xF4ng ngon qu\xE1." }
    ],
    tips: "\u7EA2 (S\u1EE3i t\u01A1 \u7E9F nhu\u1ED9m m\xE0u \u0111\u1ECF t\u01B0\u01A1i) + \u8272 (M\xE0u s\u1EAFc). T\u01B0\u1EE3ng tr\u01B0ng cho may m\u1EAFn, ph\xFAc t\xE0i. Ph\u1ED3n th\u1EC3: \u7D05\u8272."
  },
  {
    hanzi: "\u6240\u4EE5",
    pinyin: "su\u01D2y\u01D0",
    hanViet: "S\u1EDF D\u0129",
    vietnamese: "Cho n\xEAn, v\xEC th\u1EBF, do \u0111\xF3",
    partOfSpeech: "Li\xEAn t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Li\xEAn t\u1EEB",
    radical: "\u6237 (H\u1ED9) + \u4EBA (Nh\xE2n)",
    strokeCount: 12,
    examples: [
      { zh: "\u4ECA\u5929\u6211\u5F88\u5FD9\uFF0C\u6240\u4EE5\u4E0D\u80FD\u548C\u4F60\u53BB\u5403\u996D\u3002", pinyin: "J\u012Bnti\u0101n w\u01D2 h\u011Bn m\xE1ng, su\u01D2y\u01D0 b\xF9 n\xE9ng h\xE9 n\u01D0 q\xF9 ch\u012Bf\xE0n.", vi: "H\xF4m nay t\xF4i r\u1EA5t b\u1EADn, cho n\xEAn kh\xF4ng th\u1EC3 \u0111i \u0103n c\u01A1m c\xF9ng b\u1EA1n." },
      { zh: "\u4ED6\u5F88\u52AA\u529B\uFF0C\u6240\u4EE5\u6210\u7EE9\u5F88\u597D\u3002", pinyin: "T\u0101 h\u011Bn n\u01D4l\xEC, su\u01D2y\u01D0 ch\xE9ngj\xEC h\u011Bn h\u01CEo.", vi: "Anh \u1EA5y r\u1EA5t ch\u0103m ch\u1EC9, v\xEC th\u1EBF th\xE0nh t\xEDch r\u1EA5t t\u1ED1t." }
    ],
    tips: "\u6240 (N\u01A1i ch\u1ED1n, nguy\xEAn c\u1EDB) + \u4EE5 (L\u1EA5y l\xE0m c\u1EDB). Bi\u1EC3u th\u1ECB k\u1EBFt qu\u1EA3 t\u1EA5t y\u1EBFu."
  },
  {
    hanzi: "\u4E66\u5305",
    pinyin: "sh\u016Bb\u0101o",
    hanViet: "Th\u01B0 Bao",
    vietnamese: "C\u1EB7p s\xE1ch, ba l\xF4 \u0111i h\u1ECDc",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 d\xF9ng h\u1ECDc t\u1EADp",
    radical: "\u4E5B (\u1EA4t) + \u52F9 (Bao)",
    strokeCount: 9,
    examples: [
      { zh: "\u4ED6\u7684\u4E66\u5305\u91CC\u88C5\u6EE1\u4E86\u8BFE\u672C\u3002", pinyin: "T\u0101 de sh\u016Bb\u0101o l\u01D0 zhu\u0101ng m\u01CEn le k\xE8b\u011Bn.", vi: "Trong c\u1EB7p s\xE1ch c\u1EE7a c\u1EADu \u1EA5y ch\u1EE9a \u0111\u1EA7y s\xE1ch gi\xE1o khoa." },
      { zh: "\u8FD9\u4E2A\u4E66\u5305\u8D28\u91CF\u5F88\u597D\uFF0C\u4E5F\u5F88\u8F7B\u3002", pinyin: "Zh\xE8 ge sh\u016Bb\u0101o zh\xECli\xE0ng h\u011Bn h\u01CEo, y\u011B h\u011Bn q\u012Bng.", vi: "Chi\u1EBFc c\u1EB7p s\xE1ch n\xE0y ch\u1EA5t l\u01B0\u1EE3ng r\u1EA5t t\u1ED1t v\xE0 c\u0169ng r\u1EA5t nh\u1EB9." }
    ],
    tips: "\u4E66 (S\xE1ch) + \u5305 (T\xFAi, bao b\u1ECDc). Chi\u1EBFc t\xFAi \u0111\u1EF1ng s\xE1ch c\u1EE7a h\u1ECDc sinh sinh vi\xEAn. Ph\u1ED3n th\u1EC3: \u66F8\u5305."
  },
  {
    hanzi: "\u8FC7\u53BB",
    pinyin: "gu\xF2qu",
    hanViet: "Qu\xE1 Kh\u1EE9",
    vietnamese: "\u0110i qua, qua b\xEAn kia; (gu\xF2q\xF9) qu\xE1 kh\u1EE9, tr\u01B0\u1EDBc \u0111\xE2y",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng / Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & H\xE0nh \u0111\u1ED9ng",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u53B6 (Kh\u1EE9)",
    strokeCount: 11,
    examples: [
      { zh: "\u6211\u4EEC\u8D70\u8FC7\u53BB\u770B\u770B\u5427\u3002", pinyin: "W\u01D2men z\u01D2u gu\xF2qu k\xE0nkan ba.", vi: "Ch\xFAng m\xECnh \u0111i qua \u0111\xF3 xem th\u1EED \u0111i." },
      { zh: "\u8FC7\u53BB\u7684\u4E8B\u5C31\u8BA9\u5B83\u8FC7\u53BB\u5427\u3002", pinyin: "Gu\xF2q\xF9 de sh\xEC ji\xF9 r\xE0ng t\u0101 gu\xF2qu ba.", vi: "Chuy\u1EC7n qu\xE1 kh\u1EE9 th\xEC c\u1EE9 \u0111\u1EC3 n\xF3 tr\xF4i qua \u0111i." }
    ],
    tips: "\u8FC7 (B\u0103ng qua) + \u53BB (\u0110i xa kh\u1ECFi v\u1ECB tr\xED n\xF3i). Thanh nh\u1EB9 l\xE0 \u0111\u1ED9ng t\u1EEB, thanh 4 l\xE0 danh t\u1EEB th\u1EDDi gian. Ph\u1ED3n th\u1EC3: \u904E\u53BB."
  },
  {
    hanzi: "\u7EFF\u8272",
    pinyin: "l\u01DCs\xE8",
    hanViet: "L\u1EE5c S\u1EAFc",
    vietnamese: "M\xE0u xanh l\xE1 c\xE2y",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u7E9F (M\u1ECBch) + \u2E88 (S\u1EAFc)",
    strokeCount: 17,
    examples: [
      { zh: "\u516C\u56ED\u91CC\u6709\u5F88\u591A\u7EFF\u8272\u7684\u6811\u6728\u3002", pinyin: "G\u014Dngyu\xE1n l\u01D0 y\u01D2u h\u011Bn du\u014D l\u01DCs\xE8 de sh\xF9m\xF9.", vi: "Trong c\xF4ng vi\xEAn c\xF3 r\u1EA5t nhi\u1EC1u c\xE2y c\u1ED1i m\xE0u xanh l\xE1." },
      { zh: "\u591A\u770B\u7EFF\u8272\u5BF9\u773C\u775B\u597D\u3002", pinyin: "Du\u014D k\xE0n l\u01DCs\xE8 du\xEC y\u01CEnjing h\u01CEo.", vi: "Nh\xECn nhi\u1EC1u m\xE0u xanh l\xE1 c\xE2y r\u1EA5t t\u1ED1t cho m\u1EAFt." }
    ],
    tips: "\u7EFF (T\u01A1 \u7E9F nhu\u1ED9m m\xE0u l\u1EE5c l\xE1 c\u1ECF) + \u8272 (M\xE0u s\u1EAFc). T\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 s\u1ED1ng m\xE1t l\xE0nh. Ph\u1ED3n th\u1EC3: \u7DA0\u8272."
  },
  {
    hanzi: "\u9ED1\u8272",
    pinyin: "h\u0113is\xE8",
    hanViet: "H\u1EAFc S\u1EAFc",
    vietnamese: "M\xE0u \u0111en",
    partOfSpeech: "Danh t\u1EEB / T\xEDnh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc",
    radical: "\u9ED1 (H\u1EAFc) + \u2E88 (S\u1EAFc)",
    strokeCount: 18,
    examples: [
      { zh: "\u4ED6\u6234\u7740\u4E00\u526F\u9ED1\u8272\u7684\u773C\u955C\u3002", pinyin: "T\u0101 d\xE0i zhe y\xED f\xF9 h\u0113is\xE8 de y\u01CEnj\xECng.", vi: "Anh \u1EA5y \u0111eo m\u1ED9t c\u1EB7p k\xEDnh m\u1EAFt m\xE0u \u0111en." },
      { zh: "\u6211\u4E70\u4E86\u4E00\u8F86\u9ED1\u8272\u7684\u81EA\u884C\u8F66\u3002", pinyin: "W\u01D2 m\u01CEi le y\xED li\xE0ng h\u0113is\xE8 de z\xECx\xEDngch\u0113.", vi: "T\xF4i \u0111\xE3 mua m\u1ED9t chi\u1EBFc xe \u0111\u1EA1p m\xE0u \u0111en." }
    ],
    tips: "\u9ED1 (L\xF2 kh\xF3i l\u1EEDa \u0111en) + \u8272 (M\xE0u s\u1EAFc). Bi\u1EC3u th\u1ECB m\xE0u t\u1ED1i, huy\u1EC1n b\xED, l\u1ECBch thi\u1EC7p."
  },
  {
    hanzi: "\u66F4",
    pinyin: "g\xE8ng",
    hanViet: "Canh / C\xE1nh",
    vietnamese: "C\xE0ng, h\u01A1n n\u1EEFa (so s\xE1nh m\u1EE9c \u0111\u1ED9)",
    partOfSpeech: "Ph\xF3 t\u1EEB",
    level: 2,
    category: "Ph\xF3 t\u1EEB & So s\xE1nh",
    radical: "\u66F0 (Vi\u1EBFt)",
    strokeCount: 7,
    examples: [
      { zh: "\u660E\u5929\u5929\u6C14\u4F1A\u66F4\u597D\u3002", pinyin: "M\xEDngti\u0101n ti\u0101nq\xEC hu\xEC g\xE8ng h\u01CEo.", vi: "Th\u1EDDi ti\u1EBFt ng\xE0y mai s\u1EBD c\xE0ng t\u1ED1t h\u01A1n n\u1EEFa." },
      { zh: "\u8FD9\u672C\u4E66\u6BD4\u90A3\u672C\u66F4\u6709\u610F\u601D\u3002", pinyin: "Zh\xE8 b\u011Bn sh\u016B b\u01D0 n\xE0 b\u011Bn g\xE8ng y\u01D2u y\xECsi.", vi: "Cu\u1ED1n s\xE1ch n\xE0y th\xFA v\u1ECB h\u01A1n cu\u1ED1n s\xE1ch kia." }
    ],
    tips: "Canh \u66F4 ch\u1EC9 s\u1EF1 thay \u0111\u1ED5i phi\xEAn canh, chuy\u1EC3n ngh\u0129a th\xE0nh ph\xF3 t\u1EEB so s\xE1nh bi\u1EC3u th\u1ECB m\u1EE9c \u0111\u1ED9 cao h\u01A1n."
  },
  {
    hanzi: "\u989C\u8272",
    pinyin: "y\xE1ns\xE8",
    hanViet: "Nhan S\u1EAFc",
    vietnamese: "M\xE0u s\u1EAFc",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "M\xE0u s\u1EAFc & Mi\xEAu t\u1EA3",
    radical: "\u9875 (Hi\u1EC7t) + \u2E88 (S\u1EAFc)",
    strokeCount: 21,
    examples: [
      { zh: "\u4F60\u6700\u559C\u6B22\u4EC0\u4E48\u989C\u8272\uFF1F", pinyin: "N\u01D0 zu\xEC x\u01D0huan sh\xE9nme y\xE1ns\xE8?", vi: "B\u1EA1n th\xEDch m\xE0u s\u1EAFc n\xE0o nh\u1EA5t?" },
      { zh: "\u8FD9\u79CD\u82B1\u7684\u989C\u8272\u975E\u5E38\u6F02\u4EAE\u3002", pinyin: "Zh\xE8 zh\u01D2ng hu\u0101 de y\xE1ns\xE8 f\u0113ich\xE1ng pi\xE0oliang.", vi: "M\xE0u s\u1EAFc c\u1EE7a lo\xE0i hoa n\xE0y v\xF4 c\xF9ng \u0111\u1EB9p \u0111\u1EBD." }
    ],
    tips: "\u989C (Nhan di\u1EC7n tr\xEAn m\u1EB7t) + \u8272 (M\xE0u v\u1EBB). M\u1EDF r\u1ED9ng ra c\xE1c gam m\xE0u trong th\u1EBF gi\u1EDBi t\u1EF1 nhi\xEAn. Ph\u1ED3n th\u1EC3: \u984F\u8272."
  },
  {
    hanzi: "\u5FEB",
    pinyin: "ku\xE0i",
    hanViet: "Kho\xE1i",
    vietnamese: "Nhanh, mau ch\xF3ng; s\u1EAFp",
    partOfSpeech: "T\xEDnh t\u1EEB / Ph\xF3 t\u1EEB",
    level: 2,
    category: "T\xEDnh ch\u1EA5t & T\u1ED1c \u0111\u1ED9",
    radical: "\u5FC4 (T\xE2m)",
    strokeCount: 7,
    examples: [
      { zh: "\u4ED6\u8D70\u5F97\u975E\u5E38\u5FEB\u3002", pinyin: "T\u0101 z\u01D2u de f\u0113ich\xE1ng ku\xE0i.", vi: "Anh \u1EA5y \u0111i r\u1EA5t nhanh." },
      { zh: "\u5FEB\u70B9\u513F\uFF0C\u706B\u8F66\u8981\u5F00\u4E86\uFF01", pinyin: "Ku\xE0i di\u01CEnr, hu\u01D2ch\u0113 y\xE0o k\u0101i le!", vi: "Nhanh l\xEAn ch\xFAt, xe l\u1EEDa s\u1EAFp ch\u1EA1y r\u1ED3i!" }
    ],
    tips: "B\u1ED9 T\xE2m \u0111\u1EE9ng (\u5FC4) ch\u1EC9 t\xE2m tr\u1EA1ng h\xE2n hoan s\u1EA3ng kho\xE1i v\xE0 t\xEDnh mau l\u1EB9 kh\u1EA9n tr\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u5FEB."
  },
  {
    hanzi: "\u4E0B\u6765",
    pinyin: "xi\xE0lai",
    hanViet: "H\u1EA1 Lai",
    vietnamese: "\u0110i xu\u1ED1ng, xu\u1ED1ng \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    strokeCount: 10,
    examples: [
      { zh: "\u4F60\u5728\u697C\u4E0A\u7B49\u6211\uFF0C\u6211\u9A6C\u4E0A\u4E0B\u6765\u3002", pinyin: "N\u01D0 z\xE0i l\xF3ush\xE0ng d\u011Bng w\u01D2, w\u01D2 m\u01CEsh\xE0ng xi\xE0lai.", vi: "B\u1EA1n \u0111\u1EE3i t\xF4i \u1EDF tr\xEAn l\u1EA7u, t\xF4i xu\u1ED1ng ngay \u0111\xE2y." },
      { zh: "\u5FEB\u4ECE\u6811\u4E0A\u4E0B\u6765\uFF0C\u592A\u5371\u9669\u4E86\uFF01", pinyin: "Ku\xE0i c\xF3ng sh\xF9 sh\xE0ng xi\xE0lai, t\xE0i w\u0113ixi\u01CEn le!", vi: "Mau t\u1EEB tr\xEAn c\xE2y leo xu\u1ED1ng \u0111\xE2y, nguy hi\u1EC3m qu\xE1!" }
    ],
    tips: "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Lai (\u6765 - \u0111\u1EBFn/l\u1EA1i). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng ch\u1EC9 chuy\u1EC3n \u0111\u1ED9ng t\u1EEB tr\xEAn cao xu\u1ED1ng ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0A\u6765",
    pinyin: "sh\xE0nglai",
    hanViet: "Th\u01B0\u1EE3ng Lai",
    vietnamese: "\u0110i l\xEAn, l\xEAn \u0111\xE2y (h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u6728 (M\u1ED9c)",
    strokeCount: 10,
    examples: [
      { zh: "\u4F60\u4E0A\u6765\u5427\uFF0C\u6211\u5BB6\u5728\u4E09\u697C\u3002", pinyin: "N\u01D0 sh\xE0nglai ba, w\u01D2 ji\u0101 z\xE0i s\u0101n l\xF3u.", vi: "B\u1EA1n l\xEAn \u0111\xE2y \u0111i, nh\xE0 t\xF4i \u1EDF t\u1EA7ng ba." },
      { zh: "\u8BF7\u5927\u5BB6\u5FEB\u70B9\u513F\u4E0A\u8F66\u6765\u3002", pinyin: "Q\u01D0ng d\xE0ji\u0101 ku\xE0i di\u01CEnr sh\xE0ngch\u0113 lai.", vi: "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi mau b\u01B0\u1EDBc l\xEAn xe n\xE0o." }
    ],
    tips: "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). \u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng di chuy\u1EC3n t\u1EEB d\u01B0\u1EDBi th\u1EA5p l\xEAn ch\u1ED7 ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0A\u53BB",
    pinyin: "sh\xE0ngqu",
    hanViet: "Th\u01B0\u1EE3ng Kh\u1EE9",
    vietnamese: "\u0110i l\xEAn \u0111\xF3, b\u01B0\u1EDBc l\xEAn (r\u1EDDi xa ng\u01B0\u1EDDi n\xF3i)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    strokeCount: 8,
    examples: [
      { zh: "\u7535\u68AF\u574F\u4E86\uFF0C\u6211\u4EEC\u8D70\u697C\u68AF\u4E0A\u53BB\u5427\u3002", pinyin: "Di\xE0nt\u012B hu\xE0i le, w\u01D2men z\u01D2u l\xF3ut\u012B sh\xE0ngqu ba.", vi: "Thang m\xE1y h\u1ECFng r\u1ED3i, ch\xFAng m\xECnh \u0111i thang b\u1ED9 l\xEAn tr\xEAn \u0111\xF3 \u0111i." },
      { zh: "\u628A\u884C\u674E\u642C\u4E0A\u53BB\u3002", pinyin: "B\u01CE x\xEDngli b\u0101n sh\xE0ngqu.", vi: "Khu\xE2n h\xE0nh l\xFD l\xEAn tr\xEAn \u0111\xF3." }
    ],
    tips: "Th\u01B0\u1EE3ng (\u4E0A - l\xEAn) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Xu h\u01B0\u1EDBng di chuy\u1EC3n t\u1EEB v\u1ECB tr\xED hi\u1EC7n t\u1EA1i l\xEAn m\u1ED9t n\u01A1i cao h\u01A1n xa ng\u01B0\u1EDDi n\xF3i."
  },
  {
    hanzi: "\u4E0B\u9762",
    pinyin: "xi\xE0mi\xE0n",
    hanViet: "H\u1EA1 Di\u1EC7n",
    vietnamese: "B\xEAn d\u01B0\u1EDBi, ph\xEDa d\u01B0\u1EDBi, ph\u1EA7n d\u01B0\u1EDBi",
    partOfSpeech: "Danh t\u1EEB ch\u1EC9 ph\u01B0\u01A1ng v\u1ECB",
    level: 2,
    category: "Ph\u01B0\u01A1ng v\u1ECB & Kh\xF4ng gian",
    radical: "\u4E00 (Nh\u1EA5t) + \u9762 (Di\u1EC7n)",
    strokeCount: 12,
    examples: [
      { zh: "\u732B\u5728\u684C\u5B50\u4E0B\u9762\u7761\u89C9\u3002", pinyin: "M\u0101o z\xE0i zhu\u014Dzi xi\xE0mi\xE0n shu\xECji\xE0o.", vi: "Con m\xE8o \u0111ang ng\u1EE7 \u1EDF d\u01B0\u1EDBi g\u1EA7m b\xE0n." },
      { zh: "\u6811\u4E0B\u9762\u5F88\u51C9\u5FEB\u3002", pinyin: "Sh\xF9 xi\xE0mi\xE0n h\u011Bn li\xE1ngkuai.", vi: "D\u01B0\u1EDBi b\xF3ng c\xE2y r\u1EA5t m\xE1t m\u1EBB." }
    ],
    tips: "H\u1EA1 (\u4E0B - d\u01B0\u1EDBi) + Di\u1EC7n (\u9762 - m\u1EB7t/ph\xEDa). Ch\u1EC9 v\u1ECB tr\xED \u1EDF kho\u1EA3ng kh\xF4ng gian ph\xEDa d\u01B0\u1EDBi c\u1EE7a v\u1EADt th\u1EC3."
  },
  {
    hanzi: "\u9762",
    pinyin: "mi\xE0n",
    hanViet: "Di\u1EC7n / Mi\u1EBFn",
    vietnamese: "M\u1EB7t, b\u1EC1 m\u1EB7t, ph\u01B0\u01A1ng di\u1EC7n; m\xEC s\u1EE3i, b\u1ED9t m\xEC",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Ph\u01B0\u01A1ng v\u1ECB & \u1EA8m th\u1EF1c",
    radical: "\u9762 (Di\u1EC7n)",
    strokeCount: 9,
    examples: [
      { zh: "\u4ECA\u5929\u4E2D\u5348\u6211\u60F3\u5403\u4E00\u7897\u725B\u8089\u9762\u3002", pinyin: "J\u012Bnti\u0101n zh\u014Dngw\u01D4 w\u01D2 xi\u01CEng ch\u012B y\xEC w\u01CEn ni\xFAr\xF2umi\xE0n.", vi: "Tr\u01B0a nay t\xF4i mu\u1ED1n \u0103n m\u1ED9t b\xE1t m\xEC b\xF2." },
      { zh: "\u6211\u4EEC\u89C1\u4E00\u9762\u5427\u3002", pinyin: "W\u01D2men ji\xE0n y\xED mi\xE0n ba.", vi: "Ch\xFAng m\xECnh g\u1EB7p m\u1EB7t nhau m\u1ED9t l\u1EA7n nh\xE9." }
    ],
    tips: "B\u1ED9 Di\u1EC7n (\u9762) h\xECnh d\xE1ng khu\xF4n m\u1EB7t ng\u01B0\u1EDDi v\u1EDBi \u0111\u01B0\u1EDDng n\xE9t bao quanh. Trong \u1EA9m th\u1EF1c ch\u1EEF \u9762 (ph\u1ED3n th\u1EC3 \u9EB5) d\xF9ng ch\u1EC9 c\xE1c m\xF3n m\xEC s\u1EE3i v\xE0 b\u1ED9t l\xE0m b\xE1nh."
  },
  {
    hanzi: "\u7B49",
    pinyin: "d\u011Bng",
    hanViet: "\u0110\u1EB3ng",
    vietnamese: "\u0110\u1EE3i, ch\u1EDD; b\u1EB1ng nhau; v\xE2n v\xE2n",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Th\u1EDDi gian",
    radical: "\u2EAE (Tr\xFAc)",
    strokeCount: 12,
    examples: [
      { zh: "\u8BF7\u5728\u95E8\u53E3\u7B49\u6211\u4E94\u5206\u949F\u3002", pinyin: "Q\u01D0ng z\xE0i m\xE9nk\u01D2u d\u011Bng w\u01D2 w\u01D4 f\u0113nzh\u014Dng.", vi: "Xin vui l\xF2ng \u0111\u1EE3i t\xF4i \u1EDF c\u1EEDa n\u0103m ph\xFAt nh\xE9." },
      { zh: "\u6211\u7B49\u4E86\u5F88\u4E45\uFF0C\u4ED6\u8FD8\u662F\u6CA1\u6765\u3002", pinyin: "W\u01D2 d\u011Bng le h\u011Bn ji\u01D4, t\u0101 h\xE1ish\xEC m\xE9i l\xE1i.", vi: "T\xF4i \u0111\xE3 ch\u1EDD r\u1EA5t l\xE2u r\u1ED3i m\xE0 anh \u1EA5y v\u1EABn ch\u01B0a \u0111\u1EBFn." }
    ],
    tips: "B\u1ED9 Tr\xFAc (\u2EAE) \u1EDF tr\xEAn c\xF9ng ch\u1EEF T\u1EF1 (\u5BFA) ng\xF4i ch\xF9a. Ban \u0111\u1EA7u l\xE0 c\xE1c th\u1EBB tre ghi th\u1EE9 b\u1EADc ph\u1EA9m c\u1EA5p, sau m\u01B0\u1EE3n ngh\u0129a th\xE0nh h\xE0nh \u0111\u1ED9ng ch\u1EDD \u0111\u1EE3i."
  },
  {
    hanzi: "\u4E00\u4F1A\u513F",
    pinyin: "y\xEDhu\xECr",
    hanViet: "Nh\u1EA5t H\u1ED9i Nhi",
    vietnamese: "M\u1ED9t l\xE1t, m\u1ED9t ch\u1ED1c, m\u1ED9t ch\xFAt",
    partOfSpeech: "Danh t\u1EEB th\u1EDDi gian / Ph\xF3 t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & T\u1EA7n su\u1EA5t",
    radical: "\u4E00 (Nh\u1EA5t) + \u4EBA (Nh\xE2n) + \u513F (Nhi)",
    strokeCount: 9,
    examples: [
      { zh: "\u4F60\u5148\u5750\u4E00\u4F1A\u513F\uFF0C\u6211\u6CE1\u676F\u8336\u7ED9\u4F60\u3002", pinyin: "N\u01D0 xi\u0101n zu\xF2 y\xEDhu\xECr, w\u01D2 p\xE0o b\u0113i ch\xE1 g\u011Bi n\u01D0.", vi: "B\u1EA1n ng\u1ED3i m\u1ED9t l\xE1t \u0111\xE3 nh\xE9, t\xF4i pha c\u1ED1c tr\xE0 cho b\u1EA1n." },
      { zh: "\u4ED6\u770B\u4E86\u4E00\u4F1A\u513F\u4E66\u5C31\u53BB\u7761\u89C9\u4E86\u3002", pinyin: "T\u0101 k\xE0n le y\xEDhu\xECr sh\u016B ji\xF9 q\xF9 shu\xECji\xE0o le.", vi: "Anh \u1EA5y \u0111\u1ECDc s\xE1ch m\u1ED9t l\xE1t r\u1ED3i \u0111i ng\u1EE7." }
    ],
    tips: "Nh\u1EA5t (\u4E00) + H\u1ED9i (\u4F1A - t\u1EE5 l\u1EA1i/th\u1EDDi kh\u1EAFc) + Nhi (\u513F - \xE2m u\u1ED1n l\u01B0\u1EE1i). Bi\u1EC3u th\u1ECB kho\u1EA3ng th\u1EDDi gian r\u1EA5t ng\u1EAFn, ch\u1ED1c l\xE1t. Ph\u1ED3n th\u1EC3: \u4E00\u6703\u5152."
  },
  {
    hanzi: "\u4E0B\u53BB",
    pinyin: "xi\xE0qu",
    hanViet: "H\u1EA1 Kh\u1EE9",
    vietnamese: "\u0110i xu\u1ED1ng \u0111\xF3, ti\u1EBFp t\u1EE5c (h\u01B0\u1EDBng xa ng\u01B0\u1EDDi n\xF3i ho\u1EB7c ti\u1EBFp di\u1EC5n)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Di chuy\u1EC3n",
    radical: "\u4E00 (Nh\u1EA5t) + \u53B6 (Kh\u1EE9)",
    strokeCount: 8,
    examples: [
      { zh: "\u4ECE\u8FD9\u91CC\u8D70\u4E0B\u53BB\u5C31\u662F\u5730\u94C1\u7AD9\u3002", pinyin: "C\xF3ng zh\xE8l\u01D0 z\u01D2u xi\xE0qu ji\xF9 sh\xEC d\xECti\u011B zh\xE0n.", vi: "T\u1EEB \u0111\xE2y \u0111i b\u1ED9 xu\u1ED1ng d\u01B0\u1EDBi l\xE0 tr\u1EA1m t\xE0u \u0111i\u1EC7n ng\u1EA7m." },
      { zh: "\u8BF7\u4F60\u7EE7\u7EED\u8BF4\u4E0B\u53BB\u3002", pinyin: "Q\u01D0ng n\u01D0 j\xECx\xF9 shu\u014D xi\xE0qu.", vi: "Xin b\u1EA1n h\xE3y ti\u1EBFp t\u1EE5c n\xF3i ti\u1EBFp \u0111i." }
    ],
    tips: "H\u1EA1 (\u4E0B - xu\u1ED1ng) + Kh\u1EE9 (\u53BB - \u0111i r\u1EDDi xa). Ngo\xE0i ngh\u0129a ch\u1EC9 h\u01B0\u1EDBng \u0111i xu\u1ED1ng n\u01A1i kh\xE1c, c\xF2n d\xF9ng l\xE0m b\u1ED5 ng\u1EEF xu h\u01B0\u1EDBng bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng ti\u1EBFp di\u1EC5n."
  },
  {
    hanzi: "\u8FDB\u6765",
    pinyin: "j\xECnlai",
    hanViet: "Ti\u1EBFn Lai",
    vietnamese: "\u0110i v\xE0o, v\xE0o \u0111\xE2y (h\u01B0\u1EDBng v\xE0o trong n\u01A1i ng\u01B0\u1EDDi n\xF3i \u1EDF)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB xu h\u01B0\u1EDBng",
    level: 2,
    category: "Ph\u01B0\u01A1ng h\u01B0\u1EDBng & Giao ti\u1EBFp",
    radical: "\u8FB6 (X\u01B0\u1EDBc) + \u6728 (M\u1ED9c)",
    strokeCount: 14,
    examples: [
      { zh: "\u5916\u9762\u51B7\uFF0C\u5FEB\u8BF7\u8FDB\u6765\u559D\u676F\u70ED\u8336\uFF01", pinyin: "W\xE0imi\xE0n l\u011Bng, ku\xE0i q\u01D0ng j\xECnlai h\u0113 b\u0113i r\xE8ch\xE1!", vi: "B\xEAn ngo\xE0i l\u1EA1nh l\u1EAFm, mau m\u1EDDi v\xE0o \u0111\xE2y u\u1ED1ng ch\xE9n tr\xE0 n\xF3ng!" },
      { zh: "\u4ED6\u6572\u4E86\u6572\u95E8\u5C31\u8D70\u8FDB\u6765\u4E86\u3002", pinyin: "T\u0101 qi\u0101o le qi\u0101o m\xE9n ji\xF9 z\u01D2u j\xECnlai le.", vi: "Anh \u1EA5y g\xF5 c\u1EEDa r\u1ED3i b\u01B0\u1EDBc v\xE0o ph\xF2ng." }
    ],
    tips: "Ti\u1EBFn (\u8FDB - \u0111i v\xE0o) + Lai (\u6765 - l\u1EA1i/\u0111\u1EBFn). Ch\u1EC9 h\xE0nh \u0111\u1ED9ng b\u01B0\u1EDBc v\xE0o t\u1EEB ngo\xE0i v\xE0o trong h\u01B0\u1EDBng v\u1EC1 ph\xEDa ng\u01B0\u1EDDi n\xF3i. Ph\u1ED3n th\u1EC3: \u9032\u4F86."
  },
  {
    hanzi: "\u7237\u7237",
    pinyin: "y\xE9ye",
    hanViet: "Gia Gia",
    vietnamese: "\xD4ng n\u1ED9i, \xF4ng (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng ng\u01B0\u1EDDi gi\xE0)",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    radical: "\u7236 (Ph\u1EE5)",
    strokeCount: 12,
    examples: [
      { zh: "\u7237\u7237\u6BCF\u5929\u65E9\u4E0A\u90FD\u4F1A\u53BB\u516C\u56ED\u6253\u592A\u6781\u62F3\u3002", pinyin: "Y\xE9ye m\u011Biti\u0101n z\u01CEoshang d\u014Du hu\xEC q\xF9 g\u014Dngyu\xE1n d\u01CE t\xE0ij\xEDqu\xE1n.", vi: "\xD4ng n\u1ED9i m\u1ED7i s\xE1ng \u0111\u1EC1u \u0111i ra c\xF4ng vi\xEAn t\u1EADp Th\xE1i C\u1EF1c Quy\u1EC1n." },
      { zh: "\u4ECA\u5E74\u7237\u7237\u4E03\u5341\u5C81\u4E86\uFF0C\u8EAB\u4F53\u5F88\u5065\u5EB7\u3002", pinyin: "J\u012Bnni\xE1n y\xE9ye q\u012Bsh\xED su\xEC le, sh\u0113nt\u01D0 h\u011Bn ji\xE0nk\u0101ng.", vi: "N\u0103m nay \xF4ng n\u1ED9i b\u1EA3y m\u01B0\u01A1i tu\u1ED5i r\u1ED3i, s\u1EE9c kh\u1ECFe r\u1EA5t t\u1ED1t." }
    ],
    tips: "Ch\u1EEF Gia (\u7237) g\u1ED3m b\u1ED9 Ph\u1EE5 (\u7236 - cha gi\xE0) \u1EDF tr\xEAn v\xE0 ch\u1EEF Nguy (\u5371) \u1EDF d\u01B0\u1EDBi. L\u1EB7p l\u1EA1i hai ch\u1EEF \u7237\u7237 t\u1EA1o th\xE0nh ti\u1EBFng g\u1ECDi \xF4ng n\u1ED9i th\xE2n th\u01B0\u01A1ng. Ph\u1ED3n th\u1EC3: \u723A\u723A."
  },
  {
    hanzi: "\u5976\u5976",
    pinyin: "n\u01CEinai",
    hanViet: "N\xE3i N\xE3i",
    vietnamese: "B\xE0 n\u1ED9i, b\xE0 (c\xE1ch g\u1ECDi k\xEDnh tr\u1ECDng b\xE0 c\u1EE5)",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Gia \u0111\xECnh & X\u01B0ng h\xF4",
    radical: "\u5973 (N\u1EEF)",
    strokeCount: 10,
    examples: [
      { zh: "\u5976\u5976\u505A\u7684\u5305\u5B50\u975E\u5E38\u597D\u5403\u3002", pinyin: "N\u01CEinai zu\xF2 de b\u0101ozi f\u0113ich\xE1ng h\u01CEoch\u012B.", vi: "B\xE1nh bao b\xE0 n\u1ED9i l\xE0m ngon v\xF4 c\xF9ng." },
      { zh: "\u6211\u5E38\u7ED9\u5976\u5976\u6253\u7535\u8BDD\u95EE\u597D\u3002", pinyin: "W\u01D2 ch\xE1ng g\u011Bi n\u01CEinai d\u01CE di\xE0nhu\xE0 w\xE8nh\u01CEo.", vi: "T\xF4i th\u01B0\u1EDDng g\u1ECDi \u0111i\u1EC7n tho\u1EA1i h\u1ECFi th\u0103m s\u1EE9c kh\u1ECFe b\xE0 n\u1ED9i." }
    ],
    tips: "B\u1ED9 N\u1EEF (\u5973) k\u1EBFt h\u1EE3p N\xE3i (\u4E43). Ti\u1EBFng g\u1ECDi l\u1EB7p l\u1EA1i \u5976\u5976 l\xE0 x\u01B0ng h\xF4 g\u1EA7n g\u0169i, \u1EA5m \xE1p d\xE0nh cho b\xE0 n\u1ED9i trong gia \u0111\xECnh."
  },
  {
    hanzi: "\u793C\u7269",
    pinyin: "l\u01D0w\xF9",
    hanViet: "L\u1EC5 V\u1EADt",
    vietnamese: "M\xF3n qu\xE0, qu\xE0 t\u1EB7ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1EDDi s\u1ED1ng & Giao ti\u1EBFp",
    radical: "\u793B (K\u1EF3) + \u725C (Ng\u01B0u)",
    strokeCount: 13,
    examples: [
      { zh: "\u8FD9\u662F\u6211\u9001\u7ED9\u4F60\u7684\u751F\u65E5\u793C\u7269\u3002", pinyin: "Zh\xE8 sh\xEC w\u01D2 s\xF2ng g\u011Bi n\u01D0 de sh\u0113ngr\xEC l\u01D0w\xF9.", vi: "\u0110\xE2y l\xE0 m\xF3n qu\xE0 sinh nh\u1EADt t\xF4i t\u1EB7ng b\u1EA1n." },
      { zh: "\u4ED6\u6536\u5230\u4E86\u4E00\u4EFD\u7279\u522B\u7684\u793C\u7269\u3002", pinyin: "T\u0101 sh\u014Dud\xE0o le y\xED f\xE8n t\xE8bi\xE9 de l\u01D0w\xF9.", vi: "Anh \u1EA5y \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t m\xF3n qu\xE0 v\xF4 c\xF9ng \u0111\u1EB7c bi\u1EC7t." }
    ],
    tips: "L\u1EC5 (\u793C - l\u1EC5 ngh\u0129a t\xF4n k\xEDnh, b\u1ED9 K\u1EF3 \u793B) + V\u1EADt (\u7269 - \u0111\u1ED3 v\u1EADt, b\u1ED9 Ng\u01B0u \u725C). M\xF3n \u0111\u1ED3 v\u1EADt ch\u1EE9a \u0111\u1EF1ng t\u1EA5m l\xF2ng v\xE0 s\u1EF1 t\xF4n tr\u1ECDng trao g\u1EEDi nhau. Ph\u1ED3n th\u1EC3: \u79AE\u7269."
  },
  {
    hanzi: "\u51C6\u5907",
    pinyin: "zh\u01D4nb\xE8i",
    hanViet: "Chu\u1EA9n B\u1ECB",
    vietnamese: "Chu\u1EA9n b\u1ECB, d\u1EF1 \u0111\u1ECBnh; s\u1EF1 chu\u1EA9n b\u1ECB",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & K\u1EBF ho\u1EA1ch",
    radical: "\u51AB (B\u0103ng) + \u5902 (Truy)",
    strokeCount: 18,
    examples: [
      { zh: "\u4F60\u5728\u51C6\u5907\u660E\u5929\u7684\u8003\u8BD5\u5417\uFF1F", pinyin: "N\u01D0 z\xE0i zh\u01D4nb\xE8i m\xEDngti\u0101n de k\u01CEosh\xEC ma?", vi: "B\u1EA1n \u0111ang chu\u1EA9n b\u1ECB cho k\u1EF3 thi ng\xE0y mai ph\u1EA3i kh\xF4ng?" },
      { zh: "\u6211\u4EEC\u5DF2\u7ECF\u51C6\u5907\u597D\u51FA\u53D1\u4E86\u3002", pinyin: "W\u01D2men y\u01D0j\u012Bng zh\u01D4nb\xE8i h\u01CEo ch\u016Bf\u0101 le.", vi: "Ch\xFAng t\xF4i \u0111\xE3 chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng \u0111\u1EC3 l\xEAn \u0111\u01B0\u1EDDng r\u1ED3i." }
    ],
    tips: "Chu\u1EA9n (\u51C6 - ti\xEAu chu\u1EA9n chu\u1EA9n m\u1EF1c, b\u1ED9 B\u0103ng \u51AB) + B\u1ECB (\u5907 - chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng, g\u1ED3m b\u1ED9 Truy \u5902). Ph\u1ED3n th\u1EC3: \u6E96\u5099."
  },
  {
    hanzi: "\u5976\u8336",
    pinyin: "n\u01CEich\xE1",
    hanViet: "N\xE3i Tr\xE0",
    vietnamese: "Tr\xE0 s\u1EEFa",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & \u0110\u1ED3 u\u1ED1ng",
    radical: "\u5973 (N\u1EEF) + \u8279 (Th\u1EA3o)",
    strokeCount: 14,
    examples: [
      { zh: "\u4E0B\u5348\u6211\u4EEC\u4E00\u8D77\u559D\u676F\u73CD\u73E0\u5976\u8336\u5427\uFF01", pinyin: "Xi\xE0w\u01D4 w\u01D2men y\xECq\u01D0 h\u0113 b\u0113i zh\u0113nzh\u016B n\u01CEich\xE1 ba!", vi: "Chi\u1EC1u nay t\u1EE5i m\xECnh c\xF9ng \u0111i u\u1ED1ng m\u1ED9t ly tr\xE0 s\u1EEFa tr\xE2n ch\xE2u nh\xE9!" },
      { zh: "\u8FD9\u5BB6\u5E97\u7684\u5976\u8336\u65E2\u9999\u53C8\u597D\u559D\u3002", pinyin: "Zh\xE8 ji\u0101 di\xE0n de n\u01CEich\xE1 j\xEC xi\u0101ng y\xF2u h\u01CEoh\u0113.", vi: "Tr\xE0 s\u1EEFa c\u1EE7a ti\u1EC7m n\xE0y v\u1EEBa th\u01A1m l\u1EA1i v\u1EEBa ngon." }
    ],
    tips: "N\xE3i (\u5976 - s\u1EEFa t\u01B0\u01A1i th\u01A1m m\xE1t) + Tr\xE0 (\u8336 - l\xE1 ch\xE8 b\u1ED9 Th\u1EA3o \u8279). \u0110\u1ED3 u\u1ED1ng tr\xE0 s\u1EEFa \u0111\u01B0\u1EE3c gi\u1EDBi tr\u1EBB kh\u1EAFp n\u01A1i v\xF4 c\xF9ng y\xEAu th\xEDch."
  },
  {
    hanzi: "\u8DDF",
    pinyin: "g\u0113n",
    hanViet: "C\u0103n",
    vietnamese: "C\xF9ng, v\u1EDBi; \u0111i theo, g\xF3t ch\xE2n",
    partOfSpeech: "Gi\u1EDBi t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Giao ti\u1EBFp",
    radical: "\u{27FB7} (T\xFAc)",
    strokeCount: 13,
    examples: [
      { zh: "\u5468\u672B\u6211\u60F3\u8DDF\u4F60\u4E00\u8D77\u53BB\u56FE\u4E66\u9986\u3002", pinyin: "Zh\u014Dum\xF2 w\u01D2 xi\u01CEng g\u0113n n\u01D0 y\xECq\u01D0 q\xF9 t\xFAsh\u016Bgu\u01CEn.", vi: "Cu\u1ED1i tu\u1EA7n t\xF4i mu\u1ED1n c\xF9ng b\u1EA1n \u0111i \u0111\u1EBFn th\u01B0 vi\u1EC7n." },
      { zh: "\u8BF7\u5927\u5BB6\u8DDF\u6211\u4E00\u8D77\u8BFB\u8FD9\u4E2A\u6C49\u5B57\u3002", pinyin: "Q\u01D0ng d\xE0ji\u0101 g\u0113n w\u01D2 y\xECq\u01D0 d\xFA zh\xE8 ge h\xE0nz\xEC.", vi: "Xin m\u1EDDi m\u1ECDi ng\u01B0\u1EDDi \u0111\u1ECDc ch\u1EEF H\xE1n n\xE0y theo t\xF4i." }
    ],
    tips: "B\u1ED9 T\xFAc (\u{27FB7} - b\xE0n ch\xE2n) k\u1EBFt h\u1EE3p ch\u1EEF C\u1EA5n (\u826E). Ngh\u0129a g\u1ED1c l\xE0 g\xF3t ch\xE2n, m\u1EDF r\u1ED9ng th\xE0nh \u0111i theo sau ai \u0111\xF3, r\u1ED3i tr\u1EDF th\xE0nh gi\u1EDBi t\u1EEB k\u1EBFt n\u1ED1i 'c\xF9ng v\u1EDBi ai'."
  },
  {
    hanzi: "\u8D70",
    pinyin: "z\u01D2u",
    hanViet: "T\u1EA9u",
    vietnamese: "\u0110i, b\u01B0\u1EDBc \u0111i; r\u1EDDi \u0111i, \u0111i kh\u1ECFi",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Di chuy\u1EC3n",
    radical: "\u8D70 (T\u1EA9u)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u4EEC\u4E00\u8D77\u8D70\u8DEF\u53BB\u5B66\u6821\u5427\u3002", pinyin: "W\u01D2men y\xECq\u01D0 z\u01D2ul\xF9 q\xF9 xu\xE9xi\xE0o ba.", vi: "T\u1EE5i m\xECnh c\xF9ng \u0111i b\u1ED9 t\u1EDBi tr\u01B0\u1EDDng h\u1ECDc \u0111i." },
      { zh: "\u65F6\u95F4\u4E0D\u65E9\u4E86\uFF0C\u6211\u8BE5\u8D70\u4E86\u3002", pinyin: "Sh\xEDji\u0101n b\xF9 z\u01CEo le, w\u01D2 g\u0101i z\u01D2u le.", vi: "Th\u1EDDi gian kh\xF4ng c\xF2n s\u1EDBm n\u1EEFa, t\xF4i ph\u1EA3i \u0111i \u0111\xE2y." }
    ],
    tips: "B\u1ED9 T\u1EA9u (\u8D70) h\xECnh t\u01B0\u1EE3ng ng\u01B0\u1EDDi \u0111ang vung tay s\u1EA3i b\u01B0\u1EDBc ch\u1EA1y mau. Trong ti\u1EBFng H\xE1n hi\u1EC7n \u0111\u1EA1i bi\u1EC3u th\u1ECB h\xE0nh \u0111\u1ED9ng \u0111i l\u1EA1i ho\u1EB7c r\u1EDDi kh\u1ECFi m\u1ED9t n\u01A1i."
  },
  {
    hanzi: "\u9152\u5E97",
    pinyin: "ji\u01D4di\xE0n",
    hanViet: "T\u1EEDu \u0110i\u1EBFm",
    vietnamese: "Kh\xE1ch s\u1EA1n, kh\xE1ch s\u1EA1n l\u1EDBn",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Du l\u1ECBch & \u0110\u1ECBa \u0111i\u1EC3m",
    radical: "\u6C35 (Th\u1EE7y) + \u5E7F (Qu\u1EA3ng)",
    strokeCount: 17,
    examples: [
      { zh: "\u6211\u4EEC\u9884\u8BA2\u4E86\u4E00\u5BB6\u9760\u8FD1\u6D77\u8FB9\u7684\u9152\u5E97\u3002", pinyin: "W\u01D2men y\xF9d\xECng le y\xEC ji\u0101 k\xE0oj\xECn h\u01CEibi\u0101n de ji\u01D4di\xE0n.", vi: "Ch\xFAng t\xF4i \u0111\xE3 \u0111\u1EB7t tr\u01B0\u1EDBc m\u1ED9t kh\xE1ch s\u1EA1n \u1EDF g\u1EA7n b\u1EDD bi\u1EC3n." },
      { zh: "\u8FD9\u5BB6\u4E94\u661F\u7EA7\u9152\u5E97\u7684\u670D\u52A1\u975E\u5E38\u5468\u5230\u3002", pinyin: "Zh\xE8 ji\u0101 w\u01D4x\u012Bngj\xED ji\u01D4di\xE0n de f\xFAw\xF9 f\u0113ich\xE1ng zh\u014Dud\xE0o.", vi: "D\u1ECBch v\u1EE5 c\u1EE7a kh\xE1ch s\u1EA1n n\u0103m sao n\xE0y v\xF4 c\xF9ng chu \u0111\xE1o." }
    ],
    tips: "T\u1EEDu (\u9152 - r\u01B0\u1EE3u ngon, b\u1ED9 Th\u1EE7y \u6C35) + \u0110i\u1EBFm (\u5E97 - ti\u1EC7m qu\xE1n, b\u1ED9 Qu\u1EA3ng \u5E7F). X\u01B0a l\xE0 qu\xE1n r\u01B0\u1EE3u c\xF3 ch\u1ED7 tr\u1ECD l\u1EA1i, nay l\xE0 t\u1EEB ph\u1ED5 bi\u1EBFn nh\u1EA5t ch\u1EC9 kh\xE1ch s\u1EA1n hi\u1EC7n \u0111\u1EA1i."
  },
  {
    hanzi: "\u751F\u65E5",
    pinyin: "sh\u0113ngr\xEC",
    hanViet: "Sinh Nh\u1EADt",
    vietnamese: "Ng\xE0y sinh nh\u1EADt, sinh nh\u1EADt",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "Th\u1EDDi gian & L\u1EC5 h\u1ED9i",
    radical: "\u751F (Sinh) + \u65E5 (Nh\u1EADt)",
    strokeCount: 9,
    examples: [
      { zh: "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF0C\u5FC3\u60F3\u4E8B\u6210\uFF01", pinyin: "Zh\xF9 n\u01D0 sh\u0113ngr\xEC ku\xE0il\xE8, x\u012Bnxi\u01CEngsh\xECch\xE9ng!", vi: "Ch\xFAc b\u1EA1n sinh nh\u1EADt vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!" },
      { zh: "\u4F60\u7684\u751F\u65E5\u662F\u51E0\u6708\u51E0\u53F7\uFF1F", pinyin: "N\u01D0 de sh\u0113ngr\xEC sh\xEC j\u01D0 yu\xE8 j\u01D0 h\xE0o?", vi: "Sinh nh\u1EADt c\u1EE7a b\u1EA1n l\xE0 ng\xE0y m\u1EA5y th\xE1ng m\u1EA5y?" }
    ],
    tips: "Sinh (\u751F - sinh ra, ch\xE0o \u0111\u1EDDi) + Nh\u1EADt (\u65E5 - ng\xE0y m\u1EB7t tr\u1EDDi). Ng\xE0y k\u1EF7 ni\u1EC7m m\u1ED9t ng\u01B0\u1EDDi c\u1EA5t ti\u1EBFng kh\xF3c ch\xE0o \u0111\u1EDDi."
  },
  {
    hanzi: "\u5FD8",
    pinyin: "w\xE0ng",
    hanViet: "Vong",
    vietnamese: "Qu\xEAn, b\u1ECF qu\xEAn",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "T\xE2m l\xFD & Tr\xED nh\u1EDB",
    radical: "\u5FC3 (T\xE2m)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u5FD8\u4E86\u5E26\u5BB6\u91CC\u7684\u94A5\u5319\u4E86\u3002", pinyin: "W\u01D2 w\xE0ng le d\xE0i ji\u0101l\u01D0 de y\xE0oshi le.", vi: "T\xF4i qu\xEAn mang ch\xECa kh\xF3a nh\xE0 r\u1ED3i." },
      { zh: "\u5343\u4E07\u522B\u5FD8\u4E86\u660E\u5929\u65E9\u4E0A\u7684\u4F1A\u8BAE\u3002", pinyin: "Qi\u0101nw\xE0n bi\xE9 w\xE0ng le m\xEDngti\u0101n z\u01CEoshang de hu\xECy\xEC.", vi: "Nh\u1EA5t \u0111\u1ECBnh \u0111\u1EEBng qu\xEAn cu\u1ED9c h\u1ECDp s\xE1ng mai nh\xE9." }
    ],
    tips: "B\xEAn tr\xEAn l\xE0 ch\u1EEF Vong (\u4EA1 - m\u1EA5t m\xE1t, bi\u1EBFn m\u1EA5t), b\xEAn d\u01B0\u1EDBi l\xE0 ch\u1EEF T\xE2m (\u5FC3 - tr\xE1i tim, t\xE2m tr\xED). \xDD ngh\u0129 m\u1EA5t \u0111i kh\u1ECFi t\xE2m tr\xED ch\xEDnh l\xE0 qu\xEAn. Ph\u1ED3n th\u1EC3: \u5FD8."
  },
  {
    hanzi: "\u753B",
    pinyin: "hu\xE0",
    hanViet: "H\u1ECDa",
    vietnamese: "V\u1EBD (\u0111\u1ED9ng t\u1EEB); b\u1EE9c tranh, b\u1EE9c h\u1ECDa (danh t\u1EEB)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Ngh\u1EC7 thu\u1EADt & S\u1EDF th\xEDch",
    radical: "\u4E00 (Nh\u1EA5t)",
    strokeCount: 8,
    examples: [
      { zh: "\u59B9\u59B9\u5F88\u559C\u6B22\u753B\u753B\u513F\u3002", pinyin: "M\xE8imei h\u011Bn x\u01D0huan hu\xE0 hu\xE0r.", vi: "Em g\xE1i r\u1EA5t th\xEDch v\u1EBD tranh." },
      { zh: "\u5899\u4E0A\u6302\u7740\u4E00\u5E45\u4E2D\u56FD\u5C71\u6C34\u753B\u3002", pinyin: "Qi\xE1ng sh\xE0ng gu\xE0 zhe y\xEC f\xFA Zh\u014Dnggu\xF3 sh\u0101nshu\u01D0hu\xE0.", vi: "Tr\xEAn t\u01B0\u1EDDng treo m\u1ED9t b\u1EE9c tranh s\u01A1n th\u1EE7y Trung Qu\u1ED1c." }
    ],
    tips: "Ch\u1EEF H\u1ECDa t\u01B0\u1EE3ng h\xECnh c\xE2y b\xFAt l\xF4ng \u0111ang ph\xE1c h\u1ECDa ranh gi\u1EDBi ru\u1ED9ng \u0111\u1EA5t \u7530. V\u1EEBa l\xE0 v\u1EBD tranh v\u1EEBa l\xE0 b\u1EE9c tranh. Ph\u1ED3n th\u1EC3: \u756B."
  },
  {
    hanzi: "\u753B\u7B14",
    pinyin: "hu\xE0b\u01D0",
    hanViet: "H\u1ECDa B\xFAt",
    vietnamese: "B\xFAt v\u1EBD, c\u1ECD v\u1EBD",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "D\u1EE5ng c\u1EE5 h\u1ECDc t\u1EADp & Ngh\u1EC7 thu\u1EADt",
    radical: "\u4E00 (Nh\u1EA5t) + \u2EAE (Tr\xFAc)",
    strokeCount: 18,
    examples: [
      { zh: "\u4ED6\u62FF\u8D77\u753B\u7B14\u5F00\u59CB\u5728\u753B\u7EB8\u4E0A\u4F5C\u753B\u3002", pinyin: "T\u0101 n\xE1 q\u01D0 hu\xE0b\u01D0 k\u0101ish\u01D0 z\xE0i hu\xE0zh\u01D0 sh\xE0ng zu\xF2hu\xE0.", vi: "Anh \u1EA5y c\u1EA7m c\u1ECD v\u1EBD l\xEAn b\u1EAFt \u0111\u1EA7u v\u1EBD tranh tr\xEAn gi\u1EA5y." },
      { zh: "\u8FD9\u5957\u753B\u7B14\u7684\u6BDB\u8D28\u975E\u5E38\u67D4\u8F6F\u7EC6\u817B\u3002", pinyin: "Zh\xE8 t\xE0o hu\xE0b\u01D0 de m\xE1ozh\xEC f\u0113ich\xE1ng r\xF3uru\u01CEn x\xECn\xEC.", vi: "B\u1ED9 c\u1ECD v\u1EBD n\xE0y l\xF4ng r\u1EA5t m\u1EC1m m\u1EA1i v\xE0 tinh t\u1EBF." }
    ],
    tips: "H\u1ECDa (\u753B - v\u1EBD tranh) + B\xFAt (\u7B14 - c\xE2y b\xFAt th\xE2n b\u1EB1ng tr\xFAc \u2EAE v\xE0 l\xF4ng th\xFA \u6BDB). C\xE2y b\xFAt chuy\xEAn d\xF9ng \u0111\u1EC3 h\u1ED9i h\u1ECDa. Ph\u1ED3n th\u1EC3: \u756B\u7B46."
  },
  {
    hanzi: "\u86CB\u7CD5",
    pinyin: "d\xE0ng\u0101o",
    hanViet: "\u0110\u1EA3n Cao",
    vietnamese: "B\xE1nh ga-t\xF4, b\xE1nh kem, b\xE1nh ng\u1ECDt l\xE0m t\u1EEB tr\u1EE9ng",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & B\xE1nh ng\u1ECDt",
    radical: "\u866B (Tr\xF9ng) + \u7C73 (M\u1EC5)",
    strokeCount: 21,
    examples: [
      { zh: "\u5988\u5988\u4EB2\u624B\u505A\u4E86\u4E00\u4E2A\u6C34\u679C\u751F\u65E5\u86CB\u7CD5\u3002", pinyin: "M\u0101ma q\u012Bnsh\u01D2u zu\xF2 le y\xED ge shu\u01D0gu\u01D2 sh\u0113ngr\xEC d\xE0ng\u0101o.", vi: "M\u1EB9 t\u1EF1 tay l\xE0m m\u1ED9t chi\u1EBFc b\xE1nh kem sinh nh\u1EADt hoa qu\u1EA3." },
      { zh: "\u8FD9\u5757\u5DE7\u514B\u529B\u86CB\u7CD5\u9999\u751C\u677E\u8F6F\u3002", pinyin: "Zh\xE8 ku\xE0i qi\u01CEok\xE8l\xEC d\xE0ng\u0101o xi\u0101ngti\xE1n s\u014Dngru\u01CEn.", vi: "Mi\u1EBFng b\xE1nh ga-t\xF4 s\xF4-c\xF4-la n\xE0y th\u01A1m ng\u1ECDt v\xE0 x\u1ED1p m\u1EC1m." }
    ],
    tips: "\u0110\u1EA3n (\u86CB - qu\u1EA3 tr\u1EE9ng g\xE0) + Cao (\u7CD5 - b\xE1nh ng\u1ECDt l\xE0m t\u1EEB g\u1EA1o n\u1EBFp \u7C73). Lo\u1EA1i b\xE1nh x\u1ED1p m\u1EC1m th\u01A1m ph\u1EE9c t\u1EEB b\u1ED9t v\xE0 tr\u1EE9ng."
  },
  {
    hanzi: "\u5FEB\u4E50",
    pinyin: "ku\xE0il\xE8",
    hanViet: "Kho\xE1i L\u1EA1c",
    vietnamese: "Vui v\u1EBB, h\u1EA1nh ph\xFAc, h\xE2n hoan",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m x\xFAc & Tinh th\u1EA7n",
    radical: "\u5FC4 (T\xE2m) + \u4E3F (Phi\u1EC7t)",
    strokeCount: 12,
    examples: [
      { zh: "\u795D\u5927\u5BB6\u65B0\u5E74\u5FEB\u4E50\uFF0C\u4E07\u4E8B\u5982\u610F\uFF01", pinyin: "Zh\xF9 d\xE0ji\u0101 x\u012Bnni\xE1n ku\xE0il\xE8, w\xE0nsh\xECr\xFAy\xEC!", vi: "Ch\xFAc m\u1ECDi ng\u01B0\u1EDDi n\u0103m m\u1EDBi vui v\u1EBB, v\u1EA1n s\u1EF1 nh\u01B0 \xFD!" },
      { zh: "\u53EA\u8981\u4E00\u5BB6\u4EBA\u5728\u4E00\u8D77\uFF0C\u5FC3\u91CC\u5C31\u5F88\u8F7B\u5FEB\u5FEB\u4E50\u3002", pinyin: "Zh\u01D0y\xE0o y\xEC ji\u0101 r\xE9n z\xE0i y\xECq\u01D0, x\u012Bnl\u01D0 ji\xF9 h\u011Bn q\u012Bngku\xE0i ku\xE0il\xE8.", vi: "Ch\u1EC9 c\u1EA7n c\u1EA3 nh\xE0 \u1EDF b\xEAn nhau, trong l\xF2ng li\u1EC1n c\u1EA3m th\u1EA5y r\u1EA5t vui v\u1EBB h\u1EA1nh ph\xFAc." }
    ],
    tips: "Kho\xE1i (\u5FEB - h\xE2n hoan nhanh ch\xF3ng b\u1ED9 T\xE2m \u5FC4) + L\u1EA1c (\u4E50 - \xE2m nh\u1EA1c ti\u1EBFng c\u01B0\u1EDDi hoan h\u1EF7). Ni\u1EC1m vui tr\xE0n ng\u1EADp t\xE2m h\u1ED3n. Ph\u1ED3n th\u1EC3: \u5FEB\u6A02."
  },
  {
    hanzi: "\u6253\u5F00",
    pinyin: "d\u01CEk\u0101i",
    hanViet: "\u0110\u1EA3 Khai",
    vietnamese: "M\u1EDF ra, b\u1EADt (thi\u1EBFt b\u1ECB, c\xF4ng t\u1EAFc)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Thao t\xE1c",
    radical: "\u624C (Th\u1EE7) + \u95E8 (M\xF4n)",
    strokeCount: 7,
    examples: [
      { zh: "\u8BF7\u628A\u4E66\u6253\u5F00\u5230\u7B2C\u5341\u9875\u3002", pinyin: "Q\u01D0ng b\u01CE sh\u016B d\u01CEk\u0101i d\xE0o d\xEC sh\xED y\xE8.", vi: "Xin m\u1EDDi m\u1EDF s\xE1ch ra trang s\u1ED1 m\u01B0\u1EDDi." },
      { zh: "\u5929\u6C14\u6709\u70B9\u70ED\uFF0C\u5FEB\u6253\u5F00\u7A7A\u8C03\u5427\u3002", pinyin: "Ti\u0101nq\xEC y\u01D2udi\u01CEn r\xE8, ku\xE0i d\u01CEk\u0101i k\u014Dngti\xE1o ba.", vi: "Th\u1EDDi ti\u1EBFt h\u01A1i n\xF3ng, mau b\u1EADt \u0111i\u1EC1u h\xF2a l\xEAn \u0111i." }
    ],
    tips: "\u0110\u1EA3 (\u6253 - d\xF9ng b\xE0n tay \u624C t\xE1c \u0111\u1ED9ng) + Khai (\u5F00 - m\u1EDF toang c\xE1nh c\u1ED5ng). Thao t\xE1c m\u1EDF s\xE1ch, m\u1EDF h\u1ED9p ho\u1EB7c b\u1EADt ngu\u1ED3n thi\u1EBFt b\u1ECB."
  },
  {
    hanzi: "\u957F",
    pinyin: "ch\xE1ng",
    hanViet: "Tr\u01B0\u1EDDng / Tr\u01B0\u1EDFng",
    vietnamese: "D\xE0i (kho\u1EA3ng c\xE1ch, th\u1EDDi gian); (zh\u01CEng) l\u1EDBn l\xEAn, tr\u01B0\u1EDFng th\xE0nh",
    partOfSpeech: "T\xEDnh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "T\xEDnh ch\u1EA5t & K\xEDch th\u01B0\u1EDBc",
    radical: "\u957F (Tr\u01B0\u1EDDng)",
    strokeCount: 4,
    examples: [
      { zh: "\u5979\u7684\u5934\u53D1\u53C8\u9ED1\u53C8\u957F\u3002", pinyin: "T\u0101 de t\xF3ufa y\xF2u h\u0113i y\xF2u ch\xE1ng.", vi: "M\xE1i t\xF3c c\u1EE7a c\xF4 \u1EA5y v\u1EEBa \u0111en v\u1EEBa d\xE0i." },
      { zh: "\u8FD9\u6761\u6CB3\u975E\u5E38\u957F\uFF0C\u6D41\u7ECF\u5F88\u591A\u57CE\u5E02\u3002", pinyin: "Zh\xE8 ti\xE1o h\xE9 f\u0113ich\xE1ng ch\xE1ng, li\xFAj\u012Bng h\u011Bn du\u014D ch\xE9ngsh\xEC.", vi: "Con s\xF4ng n\xE0y r\u1EA5t d\xE0i, ch\u1EA3y qua r\u1EA5t nhi\u1EC1u th\xE0nh ph\u1ED1." }
    ],
    tips: "B\u1ED9 Tr\u01B0\u1EDDng (\u957F) v\u1EBD h\xECnh t\u01B0\u1EE3ng m\xE1i t\xF3c d\xE0i c\u1EE7a v\u1ECB tr\u01B0\u1EDFng l\xE3o. \u0110\u1ECDc ch\xE1ng l\xE0 d\xE0i, \u0111\u1ECDc zh\u01CEng l\xE0 l\u1EDBn l\xEAn, sinh tr\u01B0\u1EDFng. Ph\u1ED3n th\u1EC3: \u9577."
  },
  {
    hanzi: "\u8089",
    pinyin: "r\xF2u",
    hanViet: "Nh\u1EE5c",
    vietnamese: "Th\u1ECBt, mi\u1EBFng th\u1ECBt",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u1EA8m th\u1EF1c & Dinh d\u01B0\u1EE1ng",
    radical: "\u8089 (Nh\u1EE5c)",
    strokeCount: 6,
    examples: [
      { zh: "\u4ECA\u5929\u665A\u4E0A\u6211\u4EEC\u5403\u7EA2\u70E7\u8089\u5427\u3002", pinyin: "J\u012Bnti\u0101n w\u01CEnshang w\u01D2men ch\u012B h\xF3ngsh\u0101or\xF2u ba.", vi: "T\u1ED1i nay ch\xFAng ta \u0103n th\u1ECBt kho t\xE0u nh\xE9." },
      { zh: "\u533B\u751F\u5EFA\u8BAE\u4ED6\u591A\u5403\u852C\u83DC\uFF0C\u5C11\u5403\u8089\u3002", pinyin: "Y\u012Bsh\u0113ng ji\xE0ny\xEC t\u0101 du\u014D ch\u012B sh\u016Bc\xE0i, sh\u01CEo ch\u012B r\xF2u.", vi: "B\xE1c s\u0129 khuy\xEAn anh \u1EA5y n\xEAn \u0103n nhi\u1EC1u rau v\xE0 b\u1EDBt \u0103n th\u1ECBt l\u1EA1i." }
    ],
    tips: "B\u1ED9 Nh\u1EE5c (\u8089) t\u01B0\u1EE3ng h\xECnh mi\u1EBFng th\u1ECBt c\u1EAFt l\xE1t c\xF3 th\u1EDB m\u1EE1 \u0111an xen. Khi l\xE0m b\u1ED9 th\u1EE7 b\xEAn tr\xE1i th\u01B0\u1EDDng bi\u1EBFn th\xE0nh d\u1EA1ng b\u1ED9 Nguy\u1EC7t \u6708."
  },
  {
    hanzi: "\u5730",
    pinyin: "de",
    hanViet: "\u0110\u1ECBa",
    vietnamese: "Tr\u1EE3 t\u1EEB li\xEAn k\u1EBFt ph\xF3 t\u1EEB h\xF3a (ch\u1EC9 ph\u01B0\u01A1ng th\u1EE9c h\xE0nh \u0111\u1ED9ng); (d\xEC) m\u1EB7t \u0111\u1EA5t, \u0111\u1EA5t \u0111ai",
    partOfSpeech: "Tr\u1EE3 t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Ng\u1EEF ph\xE1p & Tr\u1EE3 t\u1EEB",
    radical: "\u571F (Th\u1ED5)",
    strokeCount: 6,
    examples: [
      { zh: "\u5B69\u5B50\u4EEC\u9AD8\u5174\u5730\u8DF3\u4E86\u8D77\u6765\u3002", pinyin: "H\xE1izimen g\u0101ox\xECng de ti\xE0o le q\u01D0l\xE1i.", vi: "L\u0169 tr\u1EBB vui m\u1EEBng nh\u1EA3y c\u1EABng l\xEAn." },
      { zh: "\u5979\u8BA4\u771F\u5730\u542C\u8001\u5E08\u8BB2\u8BFE\u3002", pinyin: "T\u0101 r\xE8nzh\u0113n de t\u012Bng l\u01CEosh\u012B ji\u01CEngk\xE8.", vi: "C\xF4 \u1EA5y ch\u0103m ch\xFA l\u1EAFng nghe th\u1EA7y c\xF4 gi\u1EA3ng b\xE0i." }
    ],
    tips: "B\u1ED9 Th\u1ED5 (\u571F - \u0111\u1EA5t \u0111ai) + D\xE3 (\u4E5F). \u0110\u1ECDc thanh nh\u1EB9 'de' \u0111\u1EE9ng sau t\xEDnh t\u1EEB b\u1ED5 ngh\u0129a cho \u0111\u1ED9ng t\u1EEB (VD: \u9AD8\u5174\u5730 - m\u1ED9t c\xE1ch vui v\u1EBB); \u0111\u1ECDc thanh b\u1ED1n 'd\xEC' ngh\u0129a l\xE0 \u0111\u1EA5t \u0111ai."
  },
  {
    hanzi: "\u5E8A",
    pinyin: "chu\xE1ng",
    hanViet: "S\xE0ng",
    vietnamese: "Chi\u1EBFc gi\u01B0\u1EDDng, gi\u01B0\u1EDDng ng\u1EE7",
    partOfSpeech: "Danh t\u1EEB",
    level: 2,
    category: "\u0110\u1ED3 d\xF9ng gia \u0111\xECnh & Ph\xF2ng ng\u1EE7",
    radical: "\u5E7F (Qu\u1EA3ng)",
    strokeCount: 7,
    examples: [
      { zh: "\u8FD9\u5F20\u5E8A\u53C8\u5927\u53C8\u8212\u9002\u3002", pinyin: "Zh\xE8 zh\u0101ng chu\xE1ng y\xF2u d\xE0 y\xF2u sh\u016Bsh\xEC.", vi: "Chi\u1EBFc gi\u01B0\u1EDDng n\xE0y v\u1EEBa r\u1ED9ng v\u1EEBa \xEAm \xE1i." },
      { zh: "\u4ED6\u6BCF\u5929\u65E9\u4E0A\u4E03\u70B9\u51C6\u65F6\u8D77\u5E8A\u3002", pinyin: "T\u0101 m\u011Biti\u0101n z\u01CEoshang q\u012B di\u01CEn zh\u01D4nsh\xED q\u01D0chu\xE1ng.", vi: "C\u1EADu \u1EA5y m\u1ED7i s\xE1ng \u0111\xFAng b\u1EA3y gi\u1EDD l\xE0 th\u1EE9c d\u1EADy ra kh\u1ECFi gi\u01B0\u1EDDng." }
    ],
    tips: "B\u1ED9 Qu\u1EA3ng (\u5E7F - gian nh\xE0 c\xF3 m\xE1i che) bao b\u1ECDc ch\u1EEF M\u1ED9c (\u6728 - g\u1ED7). Chi\u1EBFc gi\u01B0\u1EDDng b\u1EB1ng g\u1ED7 \u0111\u1EB7t trong gian ph\xF2ng ng\u1EE7 \u0111\u1EC3 ngh\u1EC9 ng\u01A1i. Ph\u1ED3n th\u1EC3: \u5E8A / \u7240."
  },
  {
    hanzi: "\u8212\u670D",
    pinyin: "sh\u016Bfu",
    hanViet: "Th\u01B0 Ph\u1EE5c",
    vietnamese: "D\u1EC5 ch\u1ECBu, tho\u1EA3i m\xE1i, kh\u1ECFe kho\u1EAFn",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m gi\xE1c & S\u1EE9c kh\u1ECFe",
    radical: "\u820C (Thi\u1EC7t) + \u6708 (Ng\u1EE5c/Nh\u1EE5c)",
    strokeCount: 20,
    examples: [
      { zh: "\u5750\u5728\u6C99\u53D1\u4E0A\u559D\u8336\u771F\u8212\u670D\uFF01", pinyin: "Zu\xF2 z\xE0i sh\u0101f\u0101 sh\xE0ng h\u0113 ch\xE1 zh\u0113n sh\u016Bfu!", vi: "Ng\u1ED3i tr\xEAn gh\u1EBF s\xF4-pha u\u1ED1ng tr\xE0 th\u1EADt l\xE0 tho\u1EA3i m\xE1i d\u1EC5 ch\u1ECBu!" },
      { zh: "\u4ECA\u5929\u6211\u8EAB\u4F53\u6709\u70B9\u513F\u4E0D\u8212\u670D\uFF0C\u60F3\u8BF7\u5047\u4F11\u606F\u3002", pinyin: "J\u012Bnti\u0101n w\u01D2 sh\u0113nt\u01D0 y\u01D2udi\u01CEnr b\xF9 sh\u016Bfu, xi\u01CEng q\u01D0ngji\xE0 xi\u016Bxi.", vi: "H\xF4m nay trong ng\u01B0\u1EDDi t\xF4i h\u01A1i kh\xF3 ch\u1ECBu, mu\u1ED1n xin ngh\u1EC9 ph\xE9p ngh\u1EC9 ng\u01A1i." }
    ],
    tips: "Th\u01B0 (\u8212 - du\u1ED7i ra khoan kho\xE1i, b\u1ED9 Thi\u1EC7t \u820C) + Ph\u1EE5c (\u670D - thu\u1EA7n ph\u1EE5c \xEAm thu\u1EADn, b\u1ED9 Nh\u1EE5c \u6708). Tr\u1EA1ng th\xE1i tinh th\u1EA7n v\xE0 th\u1EC3 ch\u1EA5t th\u01B0 th\xE1i, d\u1EC5 ch\u1ECBu."
  },
  {
    hanzi: "\u771F",
    pinyin: "zh\u0113n",
    hanViet: "Ch\xE2n",
    vietnamese: "Th\u1EADt, qu\u1EA3 th\u1EADt, th\u1EF1c s\u1EF1 (ph\xF3 t\u1EEB ch\u1EC9 m\u1EE9c \u0111\u1ED9, th\u01B0\u1EDDng d\xF9ng \u0111\u1EC3 khen ng\u1EE3i)",
    partOfSpeech: "Ph\xF3 t\u1EEB",
    level: 2,
    category: "T\xEDnh ch\u1EA5t & C\u1EA3m x\xFAc",
    radical: "\u76EE (M\u1EE5c)",
    strokeCount: 10,
    examples: [
      { zh: "\u8FD9\u4EF6\u8863\u670D\u771F\u6F02\u4EAE\uFF01", pinyin: "Zh\xE8 ji\xE0n y\u012Bfu zh\u0113n pi\xE0oliang!", vi: "B\u1ED9 qu\u1EA7n \xE1o n\xE0y \u0111\u1EB9p th\u1EADt \u0111\u1EA5y!" },
      { zh: "\u65F6\u95F4\u8FC7\u5F97\u771F\u5FEB\uFF0C\u6211\u4EEC\u8981\u56DE\u53BB\u4E86\u3002", pinyin: "Sh\xEDji\u0101n gu\xF2 de zh\u0113n ku\xE0i, w\u01D2men y\xE0o hu\xEDq\xF9 le.", vi: "Th\u1EDDi gian tr\xF4i th\u1EADt nhanh, ch\xFAng t\xF4i ph\u1EA3i v\u1EC1 r\u1ED3i." },
      { zh: "\u4ECA\u5929\u7684\u5929\u6C14\u771F\u597D\uFF0C\u6211\u4EEC\u51FA\u53BB\u6563\u6B65\u5427\u3002", pinyin: "J\u012Bnti\u0101n de ti\u0101nq\xEC zh\u0113n h\u01CEo, w\u01D2men ch\u016Bq\xF9 s\xE0nb\xF9 ba.", vi: "Th\u1EDDi ti\u1EBFt h\xF4m nay th\u1EADt \u0111\u1EB9p, ch\xFAng ta ra ngo\xE0i d\u1EA1o b\u1ED9 nh\xE9." }
    ],
    tips: "Ch\u1EEF Ch\xE2n (\u771F) c\xF3 b\u1ED9 M\u1EE5c \u76EE \u1EDF gi\u1EEFa. D\xF9ng l\xE0m ph\xF3 t\u1EEB \u0111\u1EE9ng tr\u01B0\u1EDBc t\xEDnh t\u1EEB \u0111\u1EC3 bi\u1EC3u th\u1ECB s\u1EF1 t\xE1n th\u01B0\u1EDFng ch\xE2n th\xE0nh."
  },
  {
    hanzi: "\u7D2F",
    pinyin: "l\xE8i",
    hanViet: "Luy",
    vietnamese: "M\u1EC7t, m\u1EC7t m\u1ECFi, v\u1EA5t v\u1EA3",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "C\u1EA3m gi\xE1c & S\u1EE9c kh\u1ECFe",
    radical: "\u7530 (\u0110i\u1EC1n)",
    strokeCount: 11,
    examples: [
      { zh: "\u4ECA\u5929\u5DE5\u4F5C\u592A\u5FD9\u4E86\uFF0C\u6211\u89C9\u5F97\u5F88\u7D2F\u3002", pinyin: "J\u012Bnti\u0101n g\u014Dngzu\xF2 t\xE0i m\xE1ng le, w\u01D2 ju\xE9de h\u011Bn l\xE8i.", vi: "H\xF4m nay c\xF4ng vi\u1EC7c b\u1EADn r\u1ED9n qu\xE1, t\xF4i c\u1EA3m th\u1EA5y r\u1EA5t m\u1EC7t." },
      { zh: "\u4F60\u7D2F\u4E0D\u7D2F\uFF1F\u5750\u4E0B\u6765\u4F11\u606F\u4E00\u4E0B\u5427\u3002", pinyin: "N\u01D0 l\xE8i bu l\xE8i? Zu\xF2 xi\xE0l\xE1i xi\u016Bxi y\xEDxi\xE0 ba.", vi: "B\u1EA1n c\xF3 m\u1EC7t kh\xF4ng? Ng\u1ED3i xu\u1ED1ng ngh\u1EC9 ng\u01A1i m\u1ED9t ch\xFAt nh\xE9." },
      { zh: "\u867D\u7136\u5F88\u7D2F\uFF0C\u4F46\u662F\u4ED6\u5F88\u5F00\u5FC3\u3002", pinyin: "Su\u012Br\xE1n h\u011Bn l\xE8i, d\xE0nsh\xEC t\u0101 h\u011Bn k\u0101ix\u012Bn.", vi: "Tuy r\u1EA5t m\u1EC7t, nh\u01B0ng anh \u1EA5y r\u1EA5t vui v\u1EBB." }
    ],
    tips: "B\xEAn tr\xEAn l\xE0 b\u1ED9 \u0110i\u1EC1n \u7530 (ru\u1ED9ng \u0111\u1ED3ng), b\xEAn d\u01B0\u1EDBi l\xE0 s\u1EE3i t\u01A1. L\xE0m vi\u1EC7c tr\xEAn ru\u1ED9ng \u0111\u1ED3ng v\u1EA5t v\u1EA3 to\xE1t m\u1ED3 h\xF4i n\xEAn c\u1EA3m th\u1EA5y m\u1EC7t m\u1ECFi."
  },
  {
    hanzi: "\u73A9",
    pinyin: "w\xE1n",
    hanViet: "Ngo\u1EA1n",
    vietnamese: "Ch\u01A1i, vui ch\u01A1i, \u0111i ch\u01A1i, gi\u1EA3i tr\xED",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & \u0110\u1EDDi s\u1ED1ng",
    radical: "\u738B (V\u01B0\u01A1ng / Ng\u1ECDc)",
    strokeCount: 8,
    examples: [
      { zh: "\u5468\u672B\u4F60\u6253\u7B97\u53BB\u54EA\u513F\u73A9\uFF1F", pinyin: "Zh\u014Dum\xF2 n\u01D0 d\u01CEsu\xE0n q\xF9 n\u01CEr w\xE1n?", vi: "Cu\u1ED1i tu\u1EA7n b\u1EA1n d\u1EF1 \u0111\u1ECBnh \u0111i \u0111\xE2u ch\u01A1i?" },
      { zh: "\u5C0F\u5B69\u5B50\u4EEC\u5728\u516C\u56ED\u91CC\u73A9\u5F97\u5F88\u9AD8\u5174\u3002", pinyin: "Xi\u01CEoh\xE1izimen z\xE0i g\u014Dngyu\xE1n l\u01D0 w\xE1n de h\u011Bn g\u0101ox\xECng.", vi: "B\u1ECDn tr\u1EBB ch\u01A1i \u0111\xF9a \u1EDF c\xF4ng vi\xEAn r\u1EA5t vui v\u1EBB." },
      { zh: "\u522B\u73A9\u624B\u673A\u4E86\uFF0C\u5FEB\u53BB\u590D\u4E60\u529F\u8BFE\u5427\u3002", pinyin: "Bi\xE9 w\xE1n sh\u01D2uj\u012B le, ku\xE0i q\xF9 f\xF9x\xED g\u014Dngk\xE8 ba.", vi: "\u0110\u1EEBng ngh\u1ECBch \u0111i\u1EC7n tho\u1EA1i n\u1EEFa, mau \u0111i \xF4n b\xE0i \u0111i." }
    ],
    tips: "B\u1ED9 V\u01B0\u01A1ng \u738B (ng\u1ECDc qu\xFD) + ch\u1EEF Nguy\xEAn \u5143: tay m\xE2n m\xEA c\u1EA7m ng\u1ECDc qu\xFD th\u01B0\u1EDFng ngo\u1EA1n, m\u1EDF r\u1ED9ng ngh\u0129a th\xE0nh vui ch\u01A1i."
  },
  {
    hanzi: "\u5B8C",
    pinyin: "w\xE1n",
    hanViet: "Ho\xE0n",
    vietnamese: "Xong, h\u1EBFt, ho\xE0n th\xE0nh (th\u01B0\u1EDDng l\xE0m b\u1ED5 ng\u1EEF k\u1EBFt qu\u1EA3 \u0111\u1EE9ng sau \u0111\u1ED9ng t\u1EEB)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / B\u1ED5 ng\u1EEF",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & K\u1EBFt qu\u1EA3",
    radical: "\u5B80 (Mi\xEAn)",
    strokeCount: 7,
    examples: [
      { zh: "\u6211\u5DF2\u7ECF\u505A\u5B8C\u4ECA\u5929\u7684\u4F5C\u4E1A\u4E86\u3002", pinyin: "W\u01D2 y\u01D0j\u012Bng zu\xF2 w\xE1n j\u012Bnti\u0101n de zu\xF2y\xE8 le.", vi: "T\xF4i \u0111\xE3 l\xE0m xong b\xE0i t\u1EADp h\xF4m nay r\u1ED3i." },
      { zh: "\u8FD9\u672C\u4E66\u4F60\u770B\u5B8C\u4E86\u5417\uFF1F", pinyin: "Zh\xE8 b\u011Bn sh\u016B n\u01D0 k\xE0n w\xE1n le ma?", vi: "Cu\u1ED1n s\xE1ch n\xE0y b\u1EA1n \u0111\xE3 \u0111\u1ECDc xong ch\u01B0a?" },
      { zh: "\u6211\u4EEC\u5403\u5B8C\u996D\u518D\u53BB\u5546\u5E97\u4E70\u4E1C\u897F\u3002", pinyin: "W\u01D2men ch\u012B w\xE1n f\xE0n z\xE0i q\xF9 sh\u0101ngdi\xE0n m\u01CEi d\u014Dngxi.", vi: "Ch\xFAng ta \u0103n c\u01A1m xong r\u1ED3i h\xE3y \u0111i c\u1EEDa h\xE0ng mua \u0111\u1ED3." }
    ],
    tips: "B\u1ED9 Mi\xEAn \u5B80 (m\xE1i nh\xE0) + ch\u1EEF Nguy\xEAn \u5143: d\u1EF1ng xong m\xE1i n\xF3c c\u0103n nh\xE0, bi\u1EC3u th\u1ECB c\xF4ng vi\u1EC7c \u0111\xE3 ho\xE0n t\u1EA5t, tr\u1ECDn v\u1EB9n."
  },
  {
    hanzi: "\u5143",
    pinyin: "yu\xE1n",
    hanViet: "Nguy\xEAn",
    vietnamese: "\u0110\u1ED3ng, t\u1EC7 (\u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 ch\xEDnh th\u1EE9c c\u1EE7a Trung Qu\u1ED1c)",
    partOfSpeech: "L\u01B0\u1EE3ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Mua s\u1EAFm & Ti\u1EC1n t\u1EC7",
    radical: "\u513F (Nhi) / \u4E8C (Nh\u1ECB)",
    strokeCount: 4,
    examples: [
      { zh: "\u8FD9\u676F\u5496\u5561\u4E8C\u5341\u4E94\u5143\u3002", pinyin: "Zh\xE8 b\u0113i k\u0101f\u0113i \xE8rsh\xEDw\u01D4 yu\xE1n.", vi: "C\u1ED1c c\xE0 ph\xEA n\xE0y 25 t\u1EC7 (\u0111\u1ED3ng)." },
      { zh: "\u8FD9\u4EF6\u8863\u670D\u4E00\u5171\u662F\u4E00\u767E\u4E94\u5341\u5143\u3002", pinyin: "Zh\xE8 ji\xE0n y\u012Bfu y\xEDg\xF2ng sh\xEC y\xECb\u01CEi w\u01D4sh\xED yu\xE1n.", vi: "B\u1ED9 qu\u1EA7n \xE1o n\xE0y t\u1ED5ng c\u1ED9ng l\xE0 150 t\u1EC7." },
      { zh: "\u8FD9\u672C\u6C49\u8BED\u8BCD\u5178\u53EA\u8981\u4E09\u5341\u5143\uFF0C\u5F88\u4FBF\u5B9C\u3002", pinyin: "Zh\xE8 b\u011Bn H\xE0ny\u01D4 c\xEDdi\u01CEn zh\u01D0 y\xE0o s\u0101nsh\xED yu\xE1n, h\u011Bn pi\xE1nyi.", vi: "Cu\u1ED1n t\u1EEB \u0111i\u1EC3n ti\u1EBFng H\xE1n n\xE0y ch\u1EC9 c\xF3 30 t\u1EC7, r\u1EA5t r\u1EBB." }
    ],
    tips: "Ch\u1EEF Nguy\xEAn \u5143 bi\u1EC3u th\u1ECB \u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 ch\xEDnh th\u1EE9c trong v\u0103n vi\u1EBFt, kh\u1EA9u ng\u1EEF th\u01B0\u1EDDng d\xF9ng \u5757 (ku\xE0i)."
  },
  {
    hanzi: "\u9519",
    pinyin: "cu\xF2",
    hanViet: "Th\xE1c",
    vietnamese: "Sai, l\u1ED7i sai, nh\u1EA7m l\u1EABn; (\u4E0D\u9519) kh\xF4ng t\u1EC7, r\u1EA5t t\u1ED1t",
    partOfSpeech: "T\xEDnh t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "\u0110\xE1nh gi\xE1 & Nh\u1EADn x\xE9t",
    radical: "\u9485 (Kim)",
    strokeCount: 13,
    examples: [
      { zh: "\u8FD9\u9053\u9898\u4F60\u505A\u9519\u4E86\uFF0C\u518D\u7B97\u4E00\u904D\u5427\u3002", pinyin: "Zh\xE8 d\xE0o t\xED n\u01D0 zu\xF2 cu\xF2 le, z\xE0i su\xE0n y\xED bi\xE0n ba.", vi: "C\xE2u n\xE0y b\u1EA1n l\xE0m sai r\u1ED3i, t\xEDnh l\u1EA1i m\u1ED9t l\u1EA7n n\u1EEFa nh\xE9." },
      { zh: "\u8FD9\u5BB6\u9910\u9986\u7684\u4E2D\u56FD\u83DC\u771F\u4E0D\u9519\uFF01", pinyin: "Zh\xE8 ji\u0101 c\u0101ngu\u01CEn de Zh\u014Dnggu\xF3 c\xE0i zh\u0113n b\xFAcu\xF2!", vi: "M\xF3n \u0103n Trung Qu\u1ED1c c\u1EE7a qu\xE1n n\xE0y th\u1EADt kh\xF4ng t\u1EC7 (r\u1EA5t ngon)!" }
    ],
    tips: "B\u1ED9 Kim \u9485 + ch\u1EEF T\xEDch \u6614: ban \u0111\u1EA7u l\xE0 m\u1EA1 v\xE0ng kh\u1EA3m ng\u1ECDc, sau d\xF9ng ch\u1EC9 s\u1EF1 sai l\u1EC7ch, l\u1EA7m l\u1EABn."
  },
  {
    hanzi: "\u5BF9",
    pinyin: "du\xEC",
    hanViet: "\u0110\u1ED1i",
    vietnamese: "\u0110\xFAng, ch\xEDnh x\xE1c; \u0111\u1ED1i v\u1EDBi, h\u01B0\u1EDBng v\u1EC1",
    partOfSpeech: "T\xEDnh t\u1EEB / Gi\u1EDBi t\u1EEB",
    level: 1,
    category: "\u0110\xE1nh gi\xE1 & Ng\u1EEF ph\xE1p",
    radical: "\u5BF8 (Th\u1ED1n)",
    strokeCount: 5,
    examples: [
      { zh: "\u4F60\u8BF4\u5F97\u5F88\u5BF9\uFF0C\u6211\u4E5F\u8FD9\u4E48\u89C9\u5F97\u3002", pinyin: "N\u01D0 shu\u014D de h\u011Bn du\xEC, w\u01D2 y\u011B zh\xE8me ju\xE9de.", vi: "B\u1EA1n n\xF3i r\u1EA5t \u0111\xFAng, t\xF4i c\u0169ng c\u1EA3m th\u1EA5y nh\u01B0 v\u1EADy." },
      { zh: "\u591A\u559D\u70ED\u6C34\u5BF9\u8EAB\u4F53\u5F88\u597D\u3002", pinyin: "Du\u014D h\u0113 r\xE8shu\u01D0 du\xEC sh\u0113nt\u01D0 h\u011Bn h\u01CEo.", vi: "U\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc \u1EA5m r\u1EA5t t\u1ED1t \u0111\u1ED1i v\u1EDBi s\u1EE9c kh\u1ECFe." }
    ],
    tips: "H\u1EEFu \u53C8 + Th\u1ED1n \u5BF8: \u0111o \u0111\u1EA1c ch\xEDnh x\xE1c, \u1EE9ng \u0111\u1ED1i chu\u1EA9n m\u1EF1c. Ph\u1ED3n th\u1EC3: \u5C0D."
  },
  {
    hanzi: "\u8D35",
    pinyin: "gu\xEC",
    hanViet: "Qu\xFD",
    vietnamese: "\u0110\u1EAFt, \u0111\u1EAFt \u0111\u1ECF; qu\xFD gi\xE1, t\xF4n k\xEDnh",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "Mua s\u1EAFm & \u0110\u1EDDi s\u1ED1ng",
    radical: "\u8D1D (B\u1ED1i)",
    strokeCount: 9,
    examples: [
      { zh: "\u8FD9\u4EF6\u8863\u670D\u592A\u8D35\u4E86\uFF0C\u4FBF\u5B9C\u4E00\u70B9\u513F\u5427\u3002", pinyin: "Zh\xE8 ji\xE0n y\u012Bfu t\xE0i gu\xEC le, pi\xE1nyi y\xECdi\u01CEnr ba.", vi: "B\u1ED9 qu\u1EA7n \xE1o n\xE0y \u0111\u1EAFt qu\xE1, r\u1EBB b\u1EDBt m\u1ED9t ch\xFAt \u0111i." },
      { zh: "\u8BF7\u95EE\u60A8\u8D35\u59D3\uFF1F", pinyin: "Q\u01D0ngw\xE8n n\xEDn gu\xEC x\xECng?", vi: "Xin h\u1ECFi qu\xFD t\xEDnh (h\u1ECD) c\u1EE7a ng\xE0i l\xE0 g\xEC?" }
    ],
    tips: "B\xEAn d\u01B0\u1EDBi c\xF3 b\u1ED9 B\u1ED1i \u8D1D (v\u1ECF s\xF2 - ti\u1EC1n t\u1EC7 th\u1EDDi x\u01B0a), bi\u1EC3u th\u1ECB \u0111\u1ED3 v\u1EADt c\xF3 gi\xE1 tr\u1ECB cao, \u0111\u1EAFt gi\xE1."
  },
  {
    hanzi: "\u6162",
    pinyin: "m\xE0n",
    hanViet: "M\u1EA1n",
    vietnamese: "Ch\u1EADm, t\u1EEB t\u1EEB",
    partOfSpeech: "T\xEDnh t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & T\u1ED1c \u0111\u1ED9",
    radical: "\u5FC4 (T\xE2m \u0111\u1EE9ng)",
    strokeCount: 14,
    examples: [
      { zh: "\u8BF7\u60A8\u8BF4\u5F97\u6162\u4E00\u70B9\u513F\uFF0C\u6211\u542C\u4E0D\u61C2\u3002", pinyin: "Q\u01D0ng n\xEDn shu\u014D de m\xE0n y\xECdi\u01CEnr, w\u01D2 t\u012Bng b\xF9 d\u01D2ng.", vi: "Xin ng\xE0i n\xF3i ch\u1EADm l\u1EA1i m\u1ED9t ch\xFAt, t\xF4i nghe kh\xF4ng hi\u1EC3u." },
      { zh: "\u8DEF\u4E0A\u8F66\u591A\uFF0C\u4F60\u5F00\u8F66\u6162\u70B9\u513F\u3002", pinyin: "L\xF9shang ch\u0113 du\u014D, n\u01D0 k\u0101ich\u0113 m\xE0n di\u01CEnr.", vi: "Tr\xEAn \u0111\u01B0\u1EDDng nhi\u1EC1u xe, b\u1EA1n l\xE1i xe ch\u1EADm m\u1ED9t ch\xFAt nh\xE9." }
    ],
    tips: "B\u1ED9 T\xE2m \u0111\u1EE9ng \u5FC4 + M\u1EA1n \u66FC: t\xE2m th\xE1i khoan thai, h\xE0nh \u0111\u1ED9ng ch\u1EADm r\xE3i, t\u1EEB t\u1ED1n."
  },
  {
    hanzi: "\u5FEB",
    pinyin: "ku\xE0i",
    hanViet: "Kho\xE1i",
    vietnamese: "Nhanh, mau l\u1EB9; s\u1EAFp (s\u1EAFp s\u1EEDa)",
    partOfSpeech: "T\xEDnh t\u1EEB / Ph\xF3 t\u1EEB",
    level: 2,
    category: "H\xE0nh \u0111\u1ED9ng & Th\u1EDDi gian",
    radical: "\u5FC4 (T\xE2m \u0111\u1EE9ng)",
    strokeCount: 7,
    examples: [
      { zh: "\u5FEB\u70B9\u513F\u8D70\uFF0C\u706B\u8F66\u5FEB\u8981\u5F00\u4E86\uFF01", pinyin: "Ku\xE0i di\u01CEnr z\u01D2u, hu\u01D2ch\u0113 ku\xE0iy\xE0o k\u0101i le!", vi: "\u0110i nhanh l\xEAn m\u1ED9t ch\xFAt, t\xE0u h\u1ECFa s\u1EAFp ch\u1EA1y r\u1ED3i!" },
      { zh: "\u4ED6\u7684\u6C49\u8BED\u8FDB\u6B65\u5F97\u771F\u5FEB\u3002", pinyin: "T\u0101 de H\xE0ny\u01D4 j\xECnb\xF9 de zh\u0113n ku\xE0i.", vi: "Ti\u1EBFng H\xE1n c\u1EE7a anh \u1EA5y ti\u1EBFn b\u1ED9 th\u1EADt l\xE0 nhanh." }
    ],
    tips: "B\u1ED9 T\xE2m \u0111\u1EE9ng \u5FC4 + Quy\u1EBFt \u592C: t\xE2m tr\u1EA1ng s\u1EA3ng kho\xE1i, b\u01B0\u1EDBc ch\xE2n nhanh nh\u1EB9n, mau l\u1EB9."
  },
  {
    hanzi: "\u7A7F",
    pinyin: "chu\u0101n",
    hanViet: "Xuy\xEAn",
    vietnamese: "M\u1EB7c (qu\u1EA7n \xE1o), \u0111i (gi\xE0y d\xE9p, t\u1EA5t)",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "Trang ph\u1EE5c & Sinh ho\u1EA1t",
    radical: "\u7A74 (Huy\u1EC7t)",
    strokeCount: 9,
    examples: [
      { zh: "\u4ECA\u5929\u5916\u9762\u51B7\uFF0C\u591A\u7A7F\u4EF6\u5927\u8863\u5427\u3002", pinyin: "J\u012Bnti\u0101n w\xE0imi\xE0n l\u011Bng, du\u014D chu\u0101n ji\xE0n d\xE0y\u012B ba.", vi: "H\xF4m nay b\xEAn ngo\xE0i tr\u1EDDi l\u1EA1nh, m\u1EB7c th\xEAm chi\u1EBFc \xE1o kho\xE1c d\xE0y nh\xE9." },
      { zh: "\u8FD9\u53CC\u65B0\u978B\u7A7F\u8D77\u6765\u5F88\u8212\u670D\u3002", pinyin: "Zh\xE8 shu\u0101ng x\u012Bn xi\xE9 chu\u0101n q\u01D0l\xE1i h\u011Bn sh\u016Bfu.", vi: "\u0110\xF4i gi\xE0y m\u1EDBi n\xE0y \u0111i v\xE0o r\u1EA5t tho\u1EA3i m\xE1i \xEAm \xE1i." }
    ],
    tips: "B\u1ED9 Huy\u1EC7t \u7A74 (hang h\u1ED1c) + Nha \u7259: lu\u1ED3n tay ch\xE2n qua trang ph\u1EE5c nh\u01B0 \u0111i xuy\xEAn qua hang, ngh\u0129a l\xE0 m\u1EB7c/mang v\xE0o."
  },
  {
    hanzi: "\u7B11",
    pinyin: "xi\xE0o",
    hanViet: "Ti\u1EBFu",
    vietnamese: "C\u01B0\u1EDDi, m\u1EC9m c\u01B0\u1EDDi, ch\xEA c\u01B0\u1EDDi",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "C\u1EA3m x\xFAc & Khu\xF4n m\u1EB7t",
    radical: "\u7AF9 (Tr\xFAc)",
    strokeCount: 10,
    examples: [
      { zh: "\u5979\u7B11\u8D77\u6765\u7684\u6837\u5B50\u975E\u5E38\u53EF\u7231\u3002", pinyin: "T\u0101 xi\xE0o q\u01D0l\xE1i de y\xE0ngzi f\u0113ich\xE1ng k\u011B'\xE0i.", vi: "D\xE1ng v\u1EBB m\u1EC9m c\u01B0\u1EDDi c\u1EE7a c\xF4 \u1EA5y v\xF4 c\xF9ng \u0111\xE1ng y\xEAu." },
      { zh: "\u5927\u5BB6\u90FD\u5F00\u5FC3\u5730\u7B11\u4E86\u3002", pinyin: "D\xE0ji\u0101 d\u014Du k\u0101ix\u012Bn de xi\xE0o le.", vi: "M\u1ECDi ng\u01B0\u1EDDi ai n\u1EA5y \u0111\u1EC1u n\u1EDF n\u1EE5 c\u01B0\u1EDDi vui v\u1EBB." }
    ],
    tips: "B\xEAn tr\xEAn l\xE0 b\u1ED9 Tr\xFAc \u7AF9, b\xEAn d\u01B0\u1EDBi l\xE0 ch\u1EEF Y\xEAu \u592D: gi\xF3 th\u1ED5i c\xE0nh tr\xFAc lay \u0111\u1ED9ng nh\u01B0 n\u1EE5 c\u01B0\u1EDDi vui v\u1EBB."
  },
  {
    hanzi: "\u5E2E\u52A9",
    pinyin: "b\u0101ngzh\xF9",
    hanViet: "Bang Tr\u1EE3",
    vietnamese: "Gi\xFAp \u0111\u1EE1, s\u1EF1 tr\u1EE3 gi\xFAp",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB / Danh t\u1EEB",
    level: 2,
    category: "Giao ti\u1EBFp & H\xE0nh \u0111\u1ED9ng",
    radical: "\u5DFE (C\xE2n) + \u529B (L\u1EF1c)",
    strokeCount: 16,
    examples: [
      { zh: "\u975E\u5E38\u611F\u8C22\u4F60\u5BF9\u6211\u7684\u5E2E\u52A9\uFF01", pinyin: "F\u0113ich\xE1ng g\u01CEnxi\xE8 n\u01D0 du\xEC w\u01D2 de b\u0101ngzh\xF9!", vi: "V\xF4 c\xF9ng c\u1EA3m \u01A1n b\u1EA1n v\xEC s\u1EF1 gi\xFAp \u0111\u1EE1 d\xE0nh cho t\xF4i!" },
      { zh: "\u4E92\u76F8\u5E2E\u52A9\u80FD\u8BA9\u53CB\u8C0A\u66F4\u6DF1\u539A\u3002", pinyin: "H\xF9xi\u0101ng b\u0101ngzh\xF9 n\xE9ng r\xE0ng y\u01D2uy\xEC g\xE8ng sh\u0113nh\xF2u.", vi: "Gi\xFAp \u0111\u1EE1 l\u1EABn nhau gi\xFAp t\xECnh b\u1EA1n ng\xE0y c\xE0ng s\xE2u s\u1EAFc h\u01A1n." }
    ],
    tips: "Bang \u5E2E (h\u1ED7 tr\u1EE3) + Tr\u1EE3 \u52A9 (g\xF3p s\u1EE9c l\u1EF1c): chung tay gi\xFAp s\u1EE9c cho ng\u01B0\u1EDDi kh\xE1c v\u01B0\u1EE3t qua kh\xF3 kh\u0103n."
  },
  {
    hanzi: "\u9001",
    pinyin: "s\xF2ng",
    hanViet: "T\u1ED1ng",
    vietnamese: "T\u1EB7ng, bi\u1EBFu; \u0111\u01B0a ti\u1EC5n",
    partOfSpeech: "\u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "Giao ti\u1EBFp & L\u1EC5 nghi",
    radical: "\u8FB6 (X\u01B0\u1EDBc)",
    strokeCount: 9,
    examples: [
      { zh: "\u670B\u53CB\u9001\u7ED9\u6211\u4E00\u672C\u5F88\u6709\u8DA3\u7684\u4E66\u3002", pinyin: "P\xE9ngyou s\xF2ng g\u011Bi w\u01D2 y\xEC b\u011Bn h\u011Bn y\u01D2uq\xF9 de sh\u016B.", vi: "B\u1EA1n t\xF4i t\u1EB7ng cho t\xF4i m\u1ED9t cu\u1ED1n s\xE1ch r\u1EA5t th\xFA v\u1ECB." },
      { zh: "\u6211\u53BB\u98DE\u673A\u573A\u9001\u4E00\u4F4D\u5916\u56FD\u670B\u53CB\u3002", pinyin: "W\u01D2 q\xF9 f\u0113ij\u012Bch\u01CEng s\xF2ng y\xED w\xE8i w\xE0igu\xF3 p\xE9ngyou.", vi: "T\xF4i \u0111\u1EBFn s\xE2n bay \u0111\u1EC3 ti\u1EC5n m\u1ED9t ng\u01B0\u1EDDi b\u1EA1n n\u01B0\u1EDBc ngo\xE0i." }
    ],
    tips: "B\u1ED9 Quai x\u01B0\u1EDBc \u8FB6 (b\u01B0\u1EDBc \u0111i) + Quan \u5173: c\u1EA5t b\u01B0\u1EDBc \u0111i theo \u0111\u1EC3 ti\u1EC5n bi\u1EC7t ho\u1EB7c mang \u0111\u1ED3 t\u1EDBi trao t\u1EB7ng."
  },
  {
    hanzi: "\u8003\u8BD5",
    pinyin: "k\u01CEosh\xEC",
    hanViet: "Kh\u1EA3o Th\xED",
    vietnamese: "K\u1EF3 thi, thi c\u1EED, ki\u1EC3m tra",
    partOfSpeech: "Danh t\u1EEB / \u0110\u1ED9ng t\u1EEB",
    level: 2,
    category: "H\u1ECDc t\u1EADp & Gi\xE1o d\u1EE5c",
    radical: "\u8002 (L\xE3o) + \u8BA0 (Ng\xF4n)",
    strokeCount: 14,
    examples: [
      { zh: "\u660E\u5929\u6211\u4EEC\u8981\u53C2\u52A0\u6C49\u8BED\u6C34\u5E73\u8003\u8BD5\u3002", pinyin: "M\xEDngti\u0101n w\u01D2men y\xE0o c\u0101nji\u0101 H\xE0ny\u01D4 shu\u01D0p\xEDng k\u01CEosh\xEC.", vi: "Ng\xE0y mai ch\xFAng t\xF4i ph\u1EA3i tham gia k\u1EF3 thi ki\u1EC3m tra tr\xECnh \u0111\u1ED9 ti\u1EBFng H\xE1n (HSK)." },
      { zh: "\u8FD9\u6B21\u8003\u8BD5\u5927\u5BB6\u90FD\u8003\u5F97\u5F88\u597D\u3002", pinyin: "Zh\xE8 c\xEC k\u01CEosh\xEC d\xE0ji\u0101 d\u014Du k\u01CEo de h\u011Bn h\u01CEo.", vi: "K\u1EF3 thi l\u1EA7n n\xE0y m\u1ECDi ng\u01B0\u1EDDi \u0111\u1EC1u l\xE0m b\xE0i r\u1EA5t t\u1ED1t." }
    ],
    tips: "Kh\u1EA3o \u8003 (ki\u1EC3m tra r\xE0 so\xE1t) + Th\xED \u8BD5 (th\u1EED nghi\u1EC7m ki\u1EBFn th\u1EE9c): cu\u1ED9c s\xE1t h\u1EA1ch ki\u1EC3m tra n\u0103ng l\u1EF1c."
  }
];
var HANZI_MASTER_MAP = {
  "\u9AD8": { pinyin: "g\u0101o", hanViet: "Cao", radical: "\u9AD8", strokes: 10 },
  "\u94C1": { pinyin: "ti\u011B", hanViet: "Thi\u1EBFt", radical: "\u9485", strokes: 10 },
  "\u4EBA": { pinyin: "r\xE9n", hanViet: "Nh\xE2n", radical: "\u4EBA", strokes: 2 },
  "\u5DE5": { pinyin: "g\u014Dng", hanViet: "C\xF4ng", radical: "\u5DE5", strokes: 3 },
  "\u667A": { pinyin: "zh\xEC", hanViet: "Tr\xED", radical: "\u65E5", strokes: 12 },
  "\u80FD": { pinyin: "n\xE9ng", hanViet: "N\u0103ng", radical: "\u6708", strokes: 10 },
  "\u8349": { pinyin: "c\u01CEo", hanViet: "Th\u1EA3o", radical: "\u8279", strokes: 9 },
  "\u8393": { pinyin: "m\xE9i", hanViet: "Mai", radical: "\u8279", strokes: 11 },
  "\u7F51": { pinyin: "w\u01CEng", hanViet: "V\xF5ng", radical: "\u5182", strokes: 6 },
  "\u7EDC": { pinyin: "lu\xF2", hanViet: "L\u1EA1c", radical: "\u7E9F", strokes: 9 },
  "\u5FAE": { pinyin: "w\u0113i", hanViet: "Vi", radical: "\u5F73", strokes: 13 },
  "\u4FE1": { pinyin: "x\xECn", hanViet: "T\xEDn", radical: "\u4EBB", strokes: 9 },
  "\u51B0": { pinyin: "b\u012Bng", hanViet: "B\u0103ng", radical: "\u51AB", strokes: 6 },
  "\u7BB1": { pinyin: "xi\u0101ng", hanViet: "T\u01B0\u01A1ng", radical: "\u7AF9", strokes: 15 },
  "\u6D17": { pinyin: "x\u01D0", hanViet: "T\u1EA9y", radical: "\u6C35", strokes: 9 },
  "\u8863": { pinyin: "y\u012B", hanViet: "Y", radical: "\u8863", strokes: 6 },
  "\u673A": { pinyin: "j\u012B", hanViet: "C\u01A1", radical: "\u6728", strokes: 6 },
  "\u7A7A": { pinyin: "k\u014Dng", hanViet: "Kh\xF4ng", radical: "\u7A74", strokes: 8 },
  "\u8C03": { pinyin: "ti\xE1o", hanViet: "\u0110i\u1EC1u", radical: "\u8BA0", strokes: 10 },
  "\u897F": { pinyin: "x\u012B", hanViet: "T\xE2y", radical: "\u897F", strokes: 6 },
  "\u74DC": { pinyin: "gu\u0101", hanViet: "Qua", radical: "\u74DC", strokes: 5 },
  "\u9999": { pinyin: "xi\u0101ng", hanViet: "H\u01B0\u01A1ng", radical: "\u9999", strokes: 9 },
  "\u8549": { pinyin: "ji\u0101o", hanViet: "Ti\xEAu", radical: "\u8279", strokes: 15 },
  "\u725B": { pinyin: "ni\xFA", hanViet: "Ng\u01B0u", radical: "\u725B", strokes: 4 },
  "\u5976": { pinyin: "n\u01CEi", hanViet: "N\xE3i", radical: "\u5973", strokes: 5 },
  "\u9762": { pinyin: "mi\xE0n", hanViet: "Di\u1EC7n", radical: "\u9762", strokes: 9 },
  "\u5305": { pinyin: "b\u0101o", hanViet: "Bao", radical: "\u52F9", strokes: 5 },
  "\u9E21": { pinyin: "j\u012B", hanViet: "K\xEA", radical: "\u9E1F", strokes: 7 },
  "\u86CB": { pinyin: "d\xE0n", hanViet: "\u0110\u1EA3n", radical: "\u758B", strokes: 11 },
  "\u6761": { pinyin: "ti\xE1o", hanViet: "\u0110i\u1EC1u", radical: "\u6728", strokes: 7 },
  "\u997A": { pinyin: "ji\u01CEo", hanViet: "Ki\u1EC3u", radical: "\u9963", strokes: 9 },
  "\u5B50": { pinyin: "zi", hanViet: "T\u1EED", radical: "\u5B50", strokes: 3 },
  "\u5956": { pinyin: "ji\u01CEng", hanViet: "T\u01B0\u1EDFng", radical: "\u5927", strokes: 9 },
  "\u5B66": { pinyin: "xu\xE9", hanViet: "H\u1ECDc", radical: "\u5B50", strokes: 8 },
  "\u91D1": { pinyin: "j\u012Bn", hanViet: "Kim", radical: "\u91D1", strokes: 8 },
  "\u4FDD": { pinyin: "b\u01CEo", hanViet: "B\u1EA3o", radical: "\u4EBB", strokes: 9 },
  "\u9669": { pinyin: "xi\u01CEn", hanViet: "Hi\u1EC3m", radical: "\u961D", strokes: 9 },
  "\u8003": { pinyin: "k\u01CEo", hanViet: "Kh\u1EA3o", radical: "\u8002", strokes: 6 },
  "\u8BD5": { pinyin: "sh\xEC", hanViet: "Th\xED", radical: "\u8BA0", strokes: 8 },
  "\u6210": { pinyin: "ch\xE9ng", hanViet: "Th\xE0nh", radical: "\u6208", strokes: 6 },
  "\u7EE9": { pinyin: "j\xEC", hanViet: "T\xEDch", radical: "\u7E9F", strokes: 11 },
  "\u529F": { pinyin: "g\u014Dng", hanViet: "C\xF4ng", radical: "\u529B", strokes: 5 },
  "\u5E0C": { pinyin: "x\u012B", hanViet: "Hi", radical: "\u5DFE", strokes: 7 },
  "\u671B": { pinyin: "w\xE0ng", hanViet: "V\u1ECDng", radical: "\u6708", strokes: 11 },
  "\u51B3": { pinyin: "ju\xE9", hanViet: "Quy\u1EBFt", radical: "\u51AB", strokes: 6 },
  "\u5B9A": { pinyin: "d\xECng", hanViet: "\u0110\u1ECBnh", radical: "\u5B80", strokes: 8 },
  "\u806A": { pinyin: "c\u014Dng", hanViet: "Th\xF4ng", radical: "\u8033", strokes: 15 },
  "\u660E": { pinyin: "m\xEDng", hanViet: "Minh", radical: "\u65E5", strokes: 8 },
  "\u8BA4": { pinyin: "r\xE8n", hanViet: "Nh\u1EADn", radical: "\u8BA0", strokes: 4 },
  "\u771F": { pinyin: "zh\u0113n", hanViet: "Ch\xE2n", radical: "\u76EE", strokes: 10 },
  "\u70ED": { pinyin: "r\xE8", hanViet: "Nhi\u1EC7t", radical: "\u706C", strokes: 10 },
  "\u60C5": { pinyin: "q\xEDng", hanViet: "T\xECnh", radical: "\u5FC4", strokes: 11 },
  "\u793C": { pinyin: "l\u01D0", hanViet: "L\u1EC5", radical: "\u793B", strokes: 5 },
  "\u8C8C": { pinyin: "m\xE0o", hanViet: "M\u1EA1o", radical: "\u8C78", strokes: 14 },
  "\u73AF": { pinyin: "hu\xE1n", hanViet: "Ho\xE0n", radical: "\u738B", strokes: 8 },
  "\u5883": { pinyin: "j\xECng", hanViet: "C\u1EA3nh", radical: "\u571F", strokes: 14 },
  "\u62A4": { pinyin: "h\xF9", hanViet: "H\u1ED9", radical: "\u624C", strokes: 7 },
  "\u4E60": { pinyin: "x\xED", hanViet: "T\u1EADp", radical: "\u4E59", strokes: 3 },
  "\u60EF": { pinyin: "gu\xE0n", hanViet: "Qu\xE1n", radical: "\u5FC4", strokes: 11 },
  "\u575A": { pinyin: "ji\u0101n", hanViet: "Ki\xEAn", radical: "\u571F", strokes: 7 },
  "\u6301": { pinyin: "ch\xED", hanViet: "Tr\xEC", radical: "\u624C", strokes: 9 },
  "\u5B87": { pinyin: "y\u01D4", hanViet: "V\u0169", radical: "\u5B80", strokes: 6 },
  "\u5B99": { pinyin: "zh\xF2u", hanViet: "Tr\u1EE5", radical: "\u5B80", strokes: 8 },
  "\u7231": { pinyin: "\xE0i", hanViet: "\xC1i", radical: "\u722B", strokes: 10 },
  "\u4E66": { pinyin: "sh\u016B", hanViet: "Th\u01B0", radical: "\u4E5B", strokes: 4 },
  "\u56FD": { pinyin: "gu\xF3", hanViet: "Qu\u1ED1c", radical: "\u56D7", strokes: 8 },
  "\u5BB6": { pinyin: "ji\u0101", hanViet: "Gia", radical: "\u5B80", strokes: 10 },
  "\u751F": { pinyin: "sh\u0113ng", hanViet: "Sinh", radical: "\u751F", strokes: 5 },
  "\u65E5": { pinyin: "r\xEC", hanViet: "Nh\u1EADt", radical: "\u65E5", strokes: 4 },
  "\u6708": { pinyin: "yu\xE8", hanViet: "Nguy\u1EC7t", radical: "\u6708", strokes: 4 },
  "\u6C34": { pinyin: "shu\u01D0", hanViet: "Th\u1EE7y", radical: "\u6C34", strokes: 4 },
  "\u706B": { pinyin: "hu\u01D2", hanViet: "H\u1ECFa", radical: "\u706B", strokes: 4 },
  "\u571F": { pinyin: "t\u01D4", hanViet: "Th\u1ED5", radical: "\u571F", strokes: 3 },
  "\u6728": { pinyin: "m\xF9", hanViet: "M\u1ED9c", radical: "\u6728", strokes: 4 },
  "\u5C71": { pinyin: "sh\u0101n", hanViet: "S\u01A1n", radical: "\u5C71", strokes: 3 },
  "\u6D77": { pinyin: "h\u01CEi", hanViet: "H\u1EA3i", radical: "\u6C35", strokes: 10 },
  "\u98CE": { pinyin: "f\u0113ng", hanViet: "Phong", radical: "\u98CE", strokes: 4 },
  "\u96E8": { pinyin: "y\u01D4", hanViet: "V\u0169", radical: "\u96E8", strokes: 8 },
  "\u82B1": { pinyin: "hu\u0101", hanViet: "Hoa", radical: "\u8279", strokes: 7 },
  "\u9E1F": { pinyin: "ni\u01CEo", hanViet: "\u0110i\u1EC3u", radical: "\u9E1F", strokes: 5 },
  "\u9C7C": { pinyin: "y\xFA", hanViet: "Ng\u01B0", radical: "\u9C7C", strokes: 8 },
  "\u7535": { pinyin: "di\xE0n", hanViet: "\u0110i\u1EC7n", radical: "\u7535", strokes: 5 },
  "\u8111": { pinyin: "n\u01CEo", hanViet: "N\xE3o", radical: "\u6708", strokes: 10 },
  "\u73B0": { pinyin: "xi\xE0n", hanViet: "Hi\u1EC7n", radical: "\u738B", strokes: 8 },
  "\u5728": { pinyin: "z\xE0i", hanViet: "T\u1EA1i", radical: "\u571F", strokes: 6 },
  "\u5496": { pinyin: "k\u0101", hanViet: "Gia", radical: "\u53E3", strokes: 8 },
  "\u5561": { pinyin: "f\u0113i", hanViet: "Phi", radical: "\u53E3", strokes: 11 },
  "\u82F9": { pinyin: "p\xEDng", hanViet: "B\xECnh", radical: "\u8279", strokes: 8 },
  "\u679C": { pinyin: "gu\u01D2", hanViet: "Qu\u1EA3", radical: "\u6728", strokes: 8 },
  "\u5F00": { pinyin: "k\u0101i", hanViet: "Khai", radical: "\u5EFE", strokes: 4 },
  "\u5FC3": { pinyin: "x\u012Bn", hanViet: "T\xE2m", radical: "\u5FC3", strokes: 4 },
  "\u98DE": { pinyin: "f\u0113i", hanViet: "Phi", radical: "\u98DE", strokes: 3 },
  "\u52AA": { pinyin: "n\u01D4", hanViet: "N\u1ED7", radical: "\u529B", strokes: 7 },
  "\u529B": { pinyin: "l\xEC", hanViet: "L\u1EF1c", radical: "\u529B", strokes: 2 },
  "\u732B": { pinyin: "m\u0101o", hanViet: "Mi\xEAu", radical: "\u72AD", strokes: 11 },
  "\u72D7": { pinyin: "g\u01D2u", hanViet: "C\u1EA9u", radical: "\u72AD", strokes: 8 },
  "\u8BED": { pinyin: "y\u01D4", hanViet: "Ng\u1EEF", radical: "\u8BA0", strokes: 9 },
  "\u6587": { pinyin: "w\xE9n", hanViet: "V\u0103n", radical: "\u6587", strokes: 4 },
  "\u6C49": { pinyin: "h\xE0n", hanViet: "H\xE1n", radical: "\u6C35", strokes: 5 },
  "\u5B57": { pinyin: "z\xEC", hanViet: "T\u1EF1", radical: "\u5B80", strokes: 6 },
  "\u4F5C": { pinyin: "zu\xF2", hanViet: "T\xE1c", radical: "\u4EBB", strokes: 7 },
  "\u4E1A": { pinyin: "y\xE8", hanViet: "Nghi\u1EC7p", radical: "\u4E00", strokes: 5 },
  "\u670B": { pinyin: "p\xE9ng", hanViet: "B\u1EB1ng", radical: "\u6708", strokes: 8 },
  "\u53CB": { pinyin: "y\u01D2u", hanViet: "H\u1EEFu", radical: "\u53C8", strokes: 4 },
  "\u53F8": { pinyin: "s\u012B", hanViet: "Ty", radical: "\u53E3", strokes: 5 },
  "\u65F6": { pinyin: "sh\xED", hanViet: "Th\u1EDDi", radical: "\u65E5", strokes: 7 },
  "\u95F4": { pinyin: "ji\u0101n", hanViet: "Gian", radical: "\u95E8", strokes: 7 },
  "\u996D": { pinyin: "f\xE0n", hanViet: "Ph\u1EA1n", radical: "\u9963", strokes: 7 },
  "\u83DC": { pinyin: "c\xE0i", hanViet: "Th\xE1i", radical: "\u8279", strokes: 11 },
  "\u4E70": { pinyin: "m\u01CEi", hanViet: "M\xE3i", radical: "\u4E59", strokes: 6 },
  "\u5356": { pinyin: "m\xE0i", hanViet: "M\u1EA1i", radical: "\u5341", strokes: 8 },
  "\u5403": { pinyin: "ch\u012B", hanViet: "C\u1EADt", radical: "\u53E3", strokes: 6 },
  "\u559D": { pinyin: "h\u0113", hanViet: "H\xE1t", radical: "\u53E3", strokes: 12 },
  "\u7761": { pinyin: "shu\xEC", hanViet: "Th\u1EE5y", radical: "\u76EE", strokes: 13 },
  "\u89C9": { pinyin: "ji\xE0o", hanViet: "Gi\xE1c", radical: "\u89C1", strokes: 9 },
  "\u770B": { pinyin: "k\xE0n", hanViet: "Kh\xE1n", radical: "\u76EE", strokes: 9 },
  "\u542C": { pinyin: "t\u012Bng", hanViet: "Th\xEDnh", radical: "\u53E3", strokes: 7 },
  "\u8BF4": { pinyin: "shu\u014D", hanViet: "Thuy\u1EBFt", radical: "\u8BA0", strokes: 9 },
  "\u8BFB": { pinyin: "d\xFA", hanViet: "\u0110\u1ED9c", radical: "\u8BA0", strokes: 10 },
  "\u5199": { pinyin: "xi\u011B", hanViet: "T\u1EA3", radical: "\u5196", strokes: 5 },
  "\u60F3": { pinyin: "xi\u01CEng", hanViet: "T\u01B0\u1EDFng", radical: "\u5FC3", strokes: 13 },
  "\u8981": { pinyin: "y\xE0o", hanViet: "Y\u1EBFu", radical: "\u8980", strokes: 9 },
  "\u53BB": { pinyin: "q\xF9", hanViet: "Kh\u1EE9", radical: "\u53B6", strokes: 5 },
  "\u6765": { pinyin: "l\xE1i", hanViet: "Lai", radical: "\u6728", strokes: 7 },
  "\u56DE": { pinyin: "hu\xED", hanViet: "H\u1ED3i", radical: "\u56D7", strokes: 6 },
  "\u5230": { pinyin: "d\xE0o", hanViet: "\u0110\xE1o", radical: "\u5202", strokes: 8 },
  "\u89C1": { pinyin: "ji\xE0n", hanViet: "Ki\u1EBFn", radical: "\u89C1", strokes: 4 },
  "\u53EB": { pinyin: "ji\xE0o", hanViet: "Khi\u1EBFu", radical: "\u53E3", strokes: 5 },
  "\u4EC0": { pinyin: "sh\xE9n", hanViet: "Th\u1EADp", radical: "\u4EBB", strokes: 4 },
  "\u4E48": { pinyin: "me", hanViet: "Ma", radical: "\u4E3F", strokes: 3 },
  "\u8C01": { pinyin: "sh\xE9i", hanViet: "Th\xF9y", radical: "\u8BA0", strokes: 10 },
  "\u54EA": { pinyin: "n\u01CE", hanViet: "N\u1EA3", radical: "\u53E3", strokes: 9 },
  "\u591A": { pinyin: "du\u014D", hanViet: "\u0110a", radical: "\u5915", strokes: 6 },
  "\u5C11": { pinyin: "sh\u01CEo", hanViet: "Thi\u1EC3u", radical: "\u5C0F", strokes: 4 },
  "\u5C81": { pinyin: "su\xEC", hanViet: "Tu\u1EBF", radical: "\u5C71", strokes: 6 },
  "\u5757": { pinyin: "ku\xE0i", hanViet: "Kh\u1ED1i", radical: "\u571F", strokes: 7 },
  "\u94B1": { pinyin: "qi\xE1n", hanViet: "Ti\u1EC1n", radical: "\u9485", strokes: 10 },
  "\u53F7": { pinyin: "h\xE0o", hanViet: "Hi\u1EC7u", radical: "\u53E3", strokes: 5 },
  "\u5E74": { pinyin: "ni\xE1n", hanViet: "Ni\xEAn", radical: "\u5E72", strokes: 6 },
  "\u6628": { pinyin: "zu\xF3", hanViet: "T\u1EA1c", radical: "\u65E5", strokes: 9 },
  "\u4ECA": { pinyin: "j\u012Bn", hanViet: "Kim", radical: "\u4EBA", strokes: 4 },
  "\u65E9": { pinyin: "z\u01CEo", hanViet: "T\u1EA3o", radical: "\u65E5", strokes: 6 },
  "\u4E0A": { pinyin: "sh\xE0ng", hanViet: "Th\u01B0\u1EE3ng", radical: "\u4E00", strokes: 3 },
  "\u4E0B": { pinyin: "xi\xE0", hanViet: "H\u1EA1", radical: "\u4E00", strokes: 3 },
  "\u524D": { pinyin: "qi\xE1n", hanViet: "Ti\u1EC1n", radical: "\u5202", strokes: 9 },
  "\u540E": { pinyin: "h\xF2u", hanViet: "H\u1EADu", radical: "\u53E3", strokes: 6 },
  "\u91CC": { pinyin: "l\u01D0", hanViet: "L\xFD", radical: "\u91CC", strokes: 7 },
  "\u5916": { pinyin: "w\xE0i", hanViet: "Ngo\u1EA1i", radical: "\u5915", strokes: 5 },
  "\u5927": { pinyin: "d\xE0", hanViet: "\u0110\u1EA1i", radical: "\u5927", strokes: 3 },
  "\u5C0F": { pinyin: "xi\u01CEo", hanViet: "Ti\u1EC3u", radical: "\u5C0F", strokes: 3 },
  "\u597D": { pinyin: "h\u01CEo", hanViet: "H\u1EA3o", radical: "\u5973", strokes: 6 },
  "\u51B7": { pinyin: "l\u011Bng", hanViet: "L\xE3nh", radical: "\u51AB", strokes: 7 },
  "\u6F02": { pinyin: "pi\xE0o", hanViet: "Phi\xEAu", radical: "\u6C35", strokes: 14 },
  "\u4EAE": { pinyin: "li\xE0ng", hanViet: "L\u01B0\u1EE3ng", radical: "\u4EA0", strokes: 9 },
  "\u5FD9": { pinyin: "m\xE1ng", hanViet: "Mang", radical: "\u5FC4", strokes: 6 },
  "\u7D2F": { pinyin: "l\xE8i", hanViet: "Luy", radical: "\u7530", strokes: 11 },
  "\u5FEB": { pinyin: "ku\xE0i", hanViet: "Kho\xE1i", radical: "\u5FC4", strokes: 7 },
  "\u6162": { pinyin: "m\xE0n", hanViet: "M\u1EA1n", radical: "\u5FC4", strokes: 14 },
  "\u8D35": { pinyin: "gu\xEC", hanViet: "Qu\xFD", radical: "\u8D1D", strokes: 9 },
  "\u65B0": { pinyin: "x\u012Bn", hanViet: "T\xE2n", radical: "\u65A4", strokes: 13 },
  "\u65E7": { pinyin: "ji\xF9", hanViet: "C\u1EF1u", radical: "\u65E5", strokes: 5 },
  "\u8DF3": { pinyin: "ti\xE0o", hanViet: "Khi\xEAu", radical: "\u8DB3", strokes: 13 },
  "\u821E": { pinyin: "w\u01D4", hanViet: "V\u0169", radical: "\u5915", strokes: 14 },
  "\u6B4C": { pinyin: "g\u0113", hanViet: "Ca", radical: "\u6B20", strokes: 14 },
  "\u5531": { pinyin: "ch\xE0ng", hanViet: "X\u01B0\u1EDBng", radical: "\u53E3", strokes: 11 },
  "\u6E38": { pinyin: "y\xF3u", hanViet: "Du", radical: "\u6C35", strokes: 12 },
  "\u620F": { pinyin: "x\xEC", hanViet: "H\xED", radical: "\u6208", strokes: 6 },
  "\u5F71": { pinyin: "y\u01D0ng", hanViet: "\u1EA2nh", radical: "\u5F61", strokes: 15 },
  "\u533B": { pinyin: "y\u012B", hanViet: "Y", radical: "\u531A", strokes: 7 },
  "\u9662": { pinyin: "yu\xE0n", hanViet: "Vi\u1EC7n", radical: "\u961D", strokes: 9 },
  "\u75C5": { pinyin: "b\xECng", hanViet: "B\u1EC7nh", radical: "\u7592", strokes: 10 },
  "\u8FC7": { pinyin: "gu\xF2", hanViet: "Qu\xE1", radical: "\u8FB6", strokes: 6 },
  "\u5546": { pinyin: "sh\u0101ng", hanViet: "Th\u01B0\u01A1ng", radical: "\u4EA0", strokes: 11 },
  "\u573A": { pinyin: "ch\u01CEng", hanViet: "Tr\u01B0\u1EDDng", radical: "\u571F", strokes: 6 },
  "\u8FDB": { pinyin: "j\xECn", hanViet: "Ti\u1EBFn", radical: "\u8FB6", strokes: 7 },
  "\u88E4": { pinyin: "k\xF9", hanViet: "Kh\u1ED1", radical: "\u8864", strokes: 12 },
  "\u767D": { pinyin: "b\xE1i", hanViet: "B\u1EA1ch", radical: "\u767D", strokes: 5 },
  "\u8272": { pinyin: "s\xE8", hanViet: "S\u1EAFc", radical: "\u2E88", strokes: 6 },
  "\u56E0": { pinyin: "y\u012Bn", hanViet: "Nh\xE2n", radical: "\u56D7", strokes: 6 },
  "\u4E3A": { pinyin: "w\xE8i", hanViet: "Vi", radical: "\u4E36", strokes: 4 },
  "\u7EA2": { pinyin: "h\xF3ng", hanViet: "H\u1ED3ng", radical: "\u7E9F", strokes: 6 },
  "\u6240": { pinyin: "su\u01D2", hanViet: "S\u1EDF", radical: "\u6237", strokes: 8 },
  "\u4EE5": { pinyin: "y\u01D0", hanViet: "D\u0129", radical: "\u4EBA", strokes: 4 },
  "\u7EFF": { pinyin: "l\u01DC", hanViet: "L\u1EE5c", radical: "\u7E9F", strokes: 11 },
  "\u9ED1": { pinyin: "h\u0113i", hanViet: "H\u1EAFc", radical: "\u9ED1", strokes: 12 },
  "\u66F4": { pinyin: "g\xE8ng", hanViet: "Canh", radical: "\u66F0", strokes: 7 },
  "\u989C": { pinyin: "y\xE1n", hanViet: "Nhan", radical: "\u9875", strokes: 15 },
  "\u7B49": { pinyin: "d\u011Bng", hanViet: "\u0110\u1EB3ng", radical: "\u7AF9", strokes: 12 },
  "\u4E00": { pinyin: "y\u012B", hanViet: "Nh\u1EA5t", radical: "\u4E00", strokes: 1 },
  "\u4F1A": { pinyin: "hu\xEC", hanViet: "H\u1ED9i", radical: "\u4EBA", strokes: 6 },
  "\u513F": { pinyin: "\xE9r", hanViet: "Nhi", radical: "\u513F", strokes: 2 },
  "\u7237": { pinyin: "y\xE9", hanViet: "Gia", radical: "\u7236", strokes: 6 },
  "\u7269": { pinyin: "w\xF9", hanViet: "V\u1EADt", radical: "\u725B", strokes: 8 },
  "\u51C6": { pinyin: "zh\u01D4n", hanViet: "Chu\u1EA9n", radical: "\u51AB", strokes: 10 },
  "\u5907": { pinyin: "b\xE8i", hanViet: "B\u1ECB", radical: "\u5902", strokes: 8 },
  "\u8336": { pinyin: "ch\xE1", hanViet: "Tr\xE0", radical: "\u8279", strokes: 9 },
  "\u8DDF": { pinyin: "g\u0113n", hanViet: "C\u0103n", radical: "\u8DB3", strokes: 13 },
  "\u8D70": { pinyin: "z\u01D2u", hanViet: "T\u1EA9u", radical: "\u8D70", strokes: 7 },
  "\u9152": { pinyin: "ji\u01D4", hanViet: "T\u1EEDu", radical: "\u6C35", strokes: 10 },
  "\u5E97": { pinyin: "di\xE0n", hanViet: "\u0110i\u1EBFm", radical: "\u5E7F", strokes: 8 },
  "\u5FD8": { pinyin: "w\xE0ng", hanViet: "Vong", radical: "\u5FC3", strokes: 7 },
  "\u753B": { pinyin: "hu\xE0", hanViet: "H\u1ECDa", radical: "\u4E00", strokes: 8 },
  "\u7B14": { pinyin: "b\u01D0", hanViet: "B\xFAt", radical: "\u7AF9", strokes: 10 },
  "\u7CD5": { pinyin: "g\u0101o", hanViet: "Cao", radical: "\u7C73", strokes: 16 },
  "\u4E50": { pinyin: "l\xE8", hanViet: "L\u1EA1c", radical: "\u4E3F", strokes: 5 },
  "\u6253": { pinyin: "d\u01CE", hanViet: "\u0110\u1EA3", radical: "\u624C", strokes: 5 },
  "\u957F": { pinyin: "ch\xE1ng", hanViet: "Tr\u01B0\u1EDDng", radical: "\u957F", strokes: 4 },
  "\u8089": { pinyin: "r\xF2u", hanViet: "Nh\u1EE5c", radical: "\u8089", strokes: 6 },
  "\u5730": { pinyin: "de", hanViet: "\u0110\u1ECBa", radical: "\u571F", strokes: 6 },
  "\u5E8A": { pinyin: "chu\xE1ng", hanViet: "S\xE0ng", radical: "\u5E7F", strokes: 7 },
  "\u8212": { pinyin: "sh\u016B", hanViet: "Th\u01B0", radical: "\u820C", strokes: 12 },
  "\u670D": { pinyin: "f\xFA", hanViet: "Ph\u1EE5c", radical: "\u6708", strokes: 8 },
  "\u73A9": { pinyin: "w\xE1n", hanViet: "Ngo\u1EA1n", radical: "\u738B", strokes: 8 },
  "\u5B8C": { pinyin: "w\xE1n", hanViet: "Ho\xE0n", radical: "\u5B80", strokes: 7 },
  "\u5143": { pinyin: "yu\xE1n", hanViet: "Nguy\xEAn", radical: "\u513F", strokes: 4 },
  "\u9519": { pinyin: "cu\xF2", hanViet: "Th\xE1c", radical: "\u9485", strokes: 13 },
  "\u5BF9": { pinyin: "du\xEC", hanViet: "\u0110\u1ED1i", radical: "\u5BF8", strokes: 5 },
  "\u7A7F": { pinyin: "chu\u0101n", hanViet: "Xuy\xEAn", radical: "\u7A74", strokes: 9 },
  "\u7B11": { pinyin: "xi\xE0o", hanViet: "Ti\u1EBFu", radical: "\u7AF9", strokes: 10 },
  "\u54ED": { pinyin: "k\u016B", hanViet: "Kh\u1ED1c", radical: "\u53E3", strokes: 10 },
  "\u627E": { pinyin: "zh\u01CEo", hanViet: "Tr\u1EA3o", radical: "\u624C", strokes: 7 },
  "\u5E2E": { pinyin: "b\u0101ng", hanViet: "Bang", radical: "\u5DFE", strokes: 9 },
  "\u52A9": { pinyin: "zh\xF9", hanViet: "Tr\u1EE3", radical: "\u529B", strokes: 7 },
  "\u9001": { pinyin: "s\xF2ng", hanViet: "T\u1ED1ng", radical: "\u8FB6", strokes: 9 },
  "\u6B21": { pinyin: "c\xEC", hanViet: "Th\u1EE9", radical: "\u6B20", strokes: 6 },
  "\u4EF6": { pinyin: "ji\xE0n", hanViet: "Ki\u1EC7n", radical: "\u4EBB", strokes: 6 },
  "\u5F20": { pinyin: "zh\u0101ng", hanViet: "Tr\u01B0\u01A1ng", radical: "\u5F13", strokes: 7 },
  "\u53CC": { pinyin: "shu\u0101ng", hanViet: "Song", radical: "\u53C8", strokes: 4 },
  "\u95EE": { pinyin: "w\xE8n", hanViet: "V\u1EA5n", radical: "\u95E8", strokes: 6 },
  "\u7B54": { pinyin: "d\xE1", hanViet: "\u0110\xE1p", radical: "\u7AF9", strokes: 12 },
  "\u9898": { pinyin: "t\xED", hanViet: "\u0110\u1EC1", radical: "\u9875", strokes: 15 },
  "\u61C2": { pinyin: "d\u01D2ng", hanViet: "Hi\u1EC3u", radical: "\u5FC4", strokes: 15 },
  "\u77EE": { pinyin: "\u01CEi", hanViet: "O\u1EA3i", radical: "\u77E2", strokes: 13 },
  "\u80D6": { pinyin: "p\xE0ng", hanViet: "B\xE0n", radical: "\u6708", strokes: 9 },
  "\u7626": { pinyin: "sh\xF2u", hanViet: "S\u1EA5u", radical: "\u7592", strokes: 14 }
};
function synthesizeChineseWordCard(rawQuery, vietnameseOverride, pinyinOverride, hanVietOverride) {
  const cleanTerm = rawQuery.trim();
  const allDictWords = [...COMPREHENSIVE_DICTIONARY, ...HSK_WORDS, ...COMMON_EXTRA_WORDS];
  const existingWord = allDictWords.find((w) => w.hanzi === cleanTerm);
  if (existingWord) {
    return {
      ...existingWord,
      hanzi: cleanTerm,
      vietnamese: vietnameseOverride?.trim() || existingWord.vietnamese,
      pinyin: pinyinOverride?.trim() || existingWord.pinyin,
      hanViet: hanVietOverride?.trim() || existingWord.hanViet
    };
  }
  const chars = Array.from(cleanTerm);
  let combinedPinyin = "";
  let combinedHanViet = "";
  let totalStrokes = 0;
  const radicals = [];
  for (const c of chars) {
    if (HANZI_MASTER_MAP[c]) {
      const info = HANZI_MASTER_MAP[c];
      combinedPinyin += (combinedPinyin ? " " : "") + info.pinyin;
      combinedHanViet += (combinedHanViet ? " " : "") + info.hanViet;
      totalStrokes += info.strokes;
      if (!radicals.includes(info.radical)) radicals.push(info.radical);
    } else {
      combinedPinyin += (combinedPinyin ? " " : "") + c;
      totalStrokes += 6;
    }
  }
  const pinyinFormatted = pinyinOverride || combinedPinyin || cleanTerm;
  const hanVietFormatted = hanVietOverride || combinedHanViet || "";
  const radicalFormatted = radicals.length > 0 ? radicals.join(", ") : "Ch\u1EEF H\xE1n";
  let finalVietnamese = (vietnameseOverride || "").trim();
  if (!finalVietnamese) {
    if (hanVietFormatted) {
      finalVietnamese = hanVietFormatted;
    } else {
      finalVietnamese = cleanTerm;
    }
  }
  const examples = [
    {
      zh: `\u5728\u65E5\u5E38\u4E2D\u6587\u4EA4\u6D41\u4E2D\uFF0C\u201C${cleanTerm}\u201D\u662F\u4E00\u4E2A\u975E\u5E38\u5B9E\u7528\u7684\u8BCD\u6C47\u3002`,
      pinyin: `Z\xE0i r\xECch\xE1ng Zh\u014Dngw\xE9n ji\u0101oli\xFA zh\u014Dng, \u201C${cleanTerm}\u201D sh\xEC y\xED g\xE8 f\u0113ich\xE1ng sh\xEDy\xF2ng de c\xEDhu\xEC.`,
      vi: `Trong giao ti\u1EBFp ti\u1EBFng Trung h\xE0ng ng\xE0y, \u201C${cleanTerm}\u201D (${finalVietnamese}) l\xE0 m\u1ED9t t\u1EEB v\u1EF1ng r\u1EA5t thi\u1EBFt th\u1EF1c.`
    },
    {
      zh: `\u638C\u63E1\u201C${cleanTerm}\u201D\u7684\u7528\u6CD5\u80FD\u5E2E\u52A9\u6211\u4EEC\u66F4\u81EA\u4FE1\u5730\u8868\u8FBE\u3002`,
      pinyin: `Zh\u01CEngw\xF2 \u201C${cleanTerm}\u201D de y\xF2ngf\u01CE n\xE9ng b\u0101ngzh\xF9 w\u01D2men g\xE8ng z\xECx\xECn de bi\u01CEod\xE1.`,
      vi: `N\u1EAFm v\u1EEFng c\xE1ch d\xF9ng c\u1EE7a \u201C${cleanTerm}\u201D s\u1EBD gi\xFAp ch\xFAng ta t\u1EF1 tin h\u01A1n khi di\u1EC5n \u0111\u1EA1t.`
    }
  ];
  return {
    hanzi: cleanTerm,
    pinyin: pinyinFormatted,
    hanViet: hanVietFormatted || "H\xE1n t\u1EF1",
    vietnamese: finalVietnamese,
    partOfSpeech: "Danh t\u1EEB",
    level: Math.min(6, Math.max(1, Math.ceil(chars.length * 1.5))),
    category: "T\u1EEB v\u1EF1ng c\u1EE7a t\xF4i",
    radical: radicalFormatted,
    strokeCount: totalStrokes || chars.length * 7,
    examples,
    tips: hanVietFormatted ? `T\u1EEB g\u1ED3m c\xE1c ch\u1EEF H\xE1n: ${chars.join(" + ")}. \xC2m H\xE1n Vi\u1EC7t t\u01B0\u01A1ng \u1EE9ng l\xE0: ${hanVietFormatted}. Ngh\u0129a: ${finalVietnamese}.` : `T\u1EEB ti\u1EBFng Trung: ${cleanTerm}. D\u1ECBch ngh\u0129a: ${finalVietnamese}.`
  };
}

// server.ts
dotenv.config();
var rootDir = process.cwd();
var publicDir = path.resolve(rootDir, "public");
var distDir = path.resolve(rootDir, "dist");
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json());
var staticOptions = {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
    if (filePath.endsWith(".webmanifest") || filePath.endsWith("manifest.json")) {
      res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }
    if (filePath.endsWith("sw.js")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      res.setHeader("Service-Worker-Allowed", "/");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  }
};
var ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var lookupCache = /* @__PURE__ */ new Map();
function seedLookupCache() {
  const allCoreWords = [...HSK_WORDS, ...COMMON_EXTRA_WORDS, ...COMPREHENSIVE_DICTIONARY];
  for (const w of allCoreWords) {
    if (w.hanzi) {
      lookupCache.set(w.hanzi.trim().toLowerCase(), w);
    }
    if (w.pinyin) {
      lookupCache.set(w.pinyin.trim().toLowerCase(), w);
      const pinyinNoTone = w.pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
      lookupCache.set(pinyinNoTone, w);
    }
    if (w.vietnamese) {
      lookupCache.set(w.vietnamese.trim().toLowerCase(), w);
    }
    if (w.hanViet) {
      lookupCache.set(w.hanViet.trim().toLowerCase(), w);
    }
  }
}
setTimeout(() => {
  try {
    seedLookupCache();
  } catch (err) {
    console.warn("[Cache] Background seed notice:", err);
  }
}, 50);
function findInLocalDict(term) {
  const q = term.toLowerCase().trim();
  const qNoTone = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const qAlpha = q.replace(/[^a-z0-9]/g, "");
  const allCoreWords = [...HSK_WORDS, ...COMMON_EXTRA_WORDS, ...COMPREHENSIVE_DICTIONARY];
  return allCoreWords.find((w) => {
    if (w.hanzi && (w.hanzi === term.trim() || term.trim().length >= 2 && w.hanzi.includes(term.trim()))) return true;
    if (w.pinyin) {
      const py = w.pinyin.toLowerCase().trim();
      const pyNoTone = py.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const pyAlpha = py.replace(/[^a-z0-9]/g, "");
      if (py === q || pyNoTone === qNoTone || qAlpha && pyAlpha === qAlpha) return true;
    }
    if (w.hanViet) {
      const hv = w.hanViet.toLowerCase().trim();
      const hvNoTone = hv.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (hv === q || hvNoTone === qNoTone) return true;
    }
    if (w.vietnamese) {
      const v = w.vietnamese.toLowerCase().trim();
      const vNoTone = v.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (v === q || vNoTone === qNoTone) return true;
      if (v.split(/[,;/]/).some((part) => part.trim() === q || part.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === qNoTone)) return true;
      if (q.length >= 2 && (v.includes(q) || q.includes(v))) return true;
    }
    return false;
  });
}
async function fetchOnlineTranslation(text, fromLang = "zh-CN", toLang = "vi") {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(fromLang)}&tl=${encodeURIComponent(toLang)}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (!res.ok) return "";
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map((item) => Array.isArray(item) && item[0] ? String(item[0]) : "").join("").trim();
    }
    return "";
  } catch {
    return "";
  }
}
app.post("/api/ai/lookup-word", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Vui l\xF2ng cung c\u1EA5p t\u1EEB kh\xF3a c\u1EA7n tra c\u1EE9u." });
    }
    const cleanQuery = query.trim();
    const cacheKey = cleanQuery.toLowerCase();
    const cacheKeyNoTone = cleanQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (lookupCache.has(cacheKey)) {
      return res.json({ word: lookupCache.get(cacheKey) });
    }
    if (lookupCache.has(cacheKeyNoTone)) {
      return res.json({ word: lookupCache.get(cacheKeyNoTone) });
    }
    const localMatch = findInLocalDict(cleanQuery);
    if (localMatch) {
      lookupCache.set(cacheKey, localMatch);
      return res.json({ word: localMatch });
    }
    let wordData = null;
    try {
      const callAIModel = async (modelName) => {
        return await ai.models.generateContent({
          model: modelName,
          contents: `B\u1EA1n l\xE0 chuy\xEAn gia t\u1EEB \u0111i\u1EC3n HSK ti\u1EBFng Trung - ti\u1EBFng Vi\u1EC7t chu\u1EA9n m\u1EF1c. H\xE3y ph\xE2n t\xEDch t\u1EEB kh\xF3a: "${cleanQuery}".
Y\xEAu c\u1EA7u b\u1EAFt bu\u1ED9c: Tr\u01B0\u1EDDng "vietnamese" PH\u1EA2I ch\u1EE9a ngh\u0129a ti\u1EBFng Vi\u1EC7t chi ti\u1EBFt, r\xF5 r\xE0ng, ph\u1ED5 bi\u1EBFn c\u1EE7a t\u1EEB n\xE0y (v\xED d\u1EE5: m\xE1y t\xEDnh, c\xE0 ph\xEA, qu\u1EA3 t\xE1o, c\u1ED1 g\u1EAFng...), tuy\u1EC7t \u0111\u1ED1i KH\xD4NG \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ho\u1EB7c ghi chung chung "T\u1EEB H\xE1n Ng\u1EEF".`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                hanzi: { type: Type.STRING },
                pinyin: { type: Type.STRING },
                hanViet: { type: Type.STRING },
                vietnamese: { type: Type.STRING },
                partOfSpeech: { type: Type.STRING },
                level: { type: Type.INTEGER },
                category: { type: Type.STRING },
                radical: { type: Type.STRING },
                strokeCount: { type: Type.INTEGER },
                examples: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      zh: { type: Type.STRING },
                      pinyin: { type: Type.STRING },
                      vi: { type: Type.STRING }
                    },
                    required: ["zh", "pinyin", "vi"]
                  }
                },
                tips: { type: Type.STRING }
              },
              required: ["hanzi", "pinyin", "hanViet", "vietnamese"]
            }
          }
        });
      };
      let response = null;
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("AI timeout")), 6e3));
        response = await Promise.race([callAIModel("gemini-3.1-flash-lite"), timeoutPromise]);
      } catch (liteErr) {
        console.warn("gemini-3.1-flash-lite failed or timed out, trying gemini-3.8-flash...", liteErr);
        try {
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("AI timeout")), 5e3));
          response = await Promise.race([callAIModel("gemini-3.8-flash"), timeoutPromise]);
        } catch (flashErr) {
          console.warn("gemini-3.8-flash also failed:", flashErr);
        }
      }
      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        if (parsed && parsed.hanzi && parsed.pinyin) {
          wordData = parsed;
        }
      }
    } catch (aiErr) {
      console.warn("AI lookup primary attempt did not succeed, falling back to linguistic engine...", aiErr);
    }
    const hasMeaningfulVietnamese = wordData && wordData.vietnamese && !wordData.vietnamese.includes("T\u1EEB H\xE1n Ng\u1EEF") && !wordData.vietnamese.startsWith("Ngh\u0129a t\u1EEB:");
    if (!wordData || !hasMeaningfulVietnamese) {
      const hasChinese = /[\u4e00-\u9fa5]/.test(cleanQuery);
      let targetChinese = cleanQuery;
      let detectedVietnamese = "";
      if (hasChinese) {
        detectedVietnamese = await fetchOnlineTranslation(cleanQuery, "zh-CN", "vi");
      } else {
        const viToZh = await fetchOnlineTranslation(cleanQuery, "vi", "zh-CN");
        if (viToZh && /[\u4e00-\u9fa5]/.test(viToZh)) {
          targetChinese = viToZh;
          detectedVietnamese = await fetchOnlineTranslation(targetChinese, "zh-CN", "vi") || cleanQuery;
        }
      }
      if (wordData) {
        if (detectedVietnamese) {
          wordData.vietnamese = detectedVietnamese;
        }
      } else if (/[\u4e00-\u9fa5]/.test(targetChinese)) {
        wordData = synthesizeChineseWordCard(targetChinese, detectedVietnamese);
      } else {
        const allWords = [...HSK_WORDS, ...COMMON_EXTRA_WORDS, ...COMPREHENSIVE_DICTIONARY];
        const fuzzyMatch = allWords.find(
          (w) => w.vietnamese.toLowerCase().includes(cacheKey) || cacheKey.includes(w.vietnamese.toLowerCase())
        );
        if (fuzzyMatch) {
          wordData = fuzzyMatch;
        }
      }
    }
    if (wordData) {
      if (lookupCache.size > 3e3) {
        const firstKey = lookupCache.keys().next().value;
        if (firstKey) lookupCache.delete(firstKey);
      }
      lookupCache.set(cacheKey, wordData);
      if (wordData.hanzi) {
        lookupCache.set(wordData.hanzi.toLowerCase(), wordData);
      }
      return res.json({ word: wordData });
    }
    return res.status(200).json({
      error: "Ch\u01B0a t\xECm th\u1EA5y t\u1EEB ph\xF9 h\u1EE3p. B\u1EA1n c\xF3 th\u1EC3 t\u1EF1 \u0111i\u1EC1n th\xF4ng tin v\xE0 l\u01B0u th\u1EBB ngay b\xEAn d\u01B0\u1EDBi!"
    });
  } catch (error) {
    console.error("Word lookup error:", error);
    return res.status(200).json({
      error: "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i tra c\u1EE9u l\xFAc n\xE0y. B\u1EA1n vui l\xF2ng t\u1EF1 \u0111i\u1EC1n th\xF4ng tin b\xEAn d\u01B0\u1EDBi nh\xE9."
    });
  }
});
var ttsCache = /* @__PURE__ */ new Map();
app.get("/api/tts", async (req, res) => {
  try {
    const text = (req.query.text || "").trim();
    if (!text) {
      return res.status(400).send("Missing text parameter");
    }
    if (ttsCache.has(text)) {
      const cached = ttsCache.get(text);
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      return res.send(cached);
    }
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(text)}`;
    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (!response.ok) {
      console.warn(`Upstream TTS returned status ${response.status} for "${text}"`);
      return res.status(response.status).send("TTS upstream error");
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (ttsCache.size > 500) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(text, buffer);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    return res.send(buffer);
  } catch (error) {
    console.error("TTS endpoint error:", error);
    return res.status(500).send("TTS server error");
  }
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
async function startServer() {
  const currentFile = fileURLToPath(import.meta.url);
  const isRunningFromDist = currentFile.includes("/dist/") || currentFile.includes("\\dist\\") || currentFile.endsWith("dist/server.js");
  const isProd = process.env.NODE_ENV === "production" && isRunningFromDist;
  const hasDist = fs.existsSync(path.resolve(distDir, "index.html"));
  app.use(express.static(publicDir, staticOptions));
  if (hasDist) {
    console.log("[HSK Master] Running with optimized pre-built static files (dist)");
    app.use(express.static(distDir, staticOptions));
    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(path.resolve(distDir, "index.html"));
    });
  } else {
    console.log("[HSK Master] dist not found, initializing Vite dev middleware...");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: false,
          ws: false
        },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (viteErr) {
      console.error("[HSK Master] Vite middleware failed to initialize:", viteErr);
    }
  }
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HSK Master] Server is fully ready and listening on http://0.0.0.0:${PORT}`);
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[HSK Master] Port ${PORT} already bound by process. Ready.`);
    } else {
      console.error("[HSK Master] Server listen error:", err);
    }
  });
}
startServer();
