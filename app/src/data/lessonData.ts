// ── HSK 2 Lesson 4 · 你穿红色的很好看 ──────────────────────────────

export interface VocabWord {
  id: number;
  word: string;
  pinyin: string;
  wordClass: string;
  english: string;
  exampleHanzi: string;
  exampleEnglish: string;
}

export const VOCAB: VocabWord[] = [
  { id: 1, word: '过', pinyin: 'guò', wordClass: 'part.', english: 'used after a verb to indicate a past action or state', exampleHanzi: '我去过中国。', exampleEnglish: 'I have been to China.' },
  { id: 2, word: '商场', pinyin: 'shāngchǎng', wordClass: 'n.', english: 'department store; shopping mall', exampleHanzi: '这是新开的商场。', exampleEnglish: 'This is a newly opened shopping mall.' },
  { id: 3, word: '进去', pinyin: 'jìnqù', wordClass: 'v.', english: 'go/get in', exampleHanzi: '我们进去看看吧。', exampleEnglish: "Let's go inside and have a look." },
  { id: 4, word: '条', pinyin: 'tiáo', wordClass: 'm.', english: 'measure word for long, narrow, or thin things', exampleHanzi: '我想买条裤子。', exampleEnglish: 'I want to buy a pair of pants.' },
  { id: 5, word: '裤子', pinyin: 'kùzi', wordClass: 'n.', english: 'trousers; pants', exampleHanzi: '我没穿过红色的裤子。', exampleEnglish: "I've never worn red pants before." },
  { id: 6, word: '白色', pinyin: 'báisè', wordClass: 'n.', english: 'white', exampleHanzi: '我喜欢白色的衣服。', exampleEnglish: 'I like white clothes.' },
  { id: 7, word: '因为', pinyin: 'yīnwèi', wordClass: 'conj.', english: 'because', exampleHanzi: '因为我喜欢白色。', exampleEnglish: 'Because I like white.' },
  { id: 8, word: '试', pinyin: 'shì', wordClass: 'v.', english: 'try', exampleHanzi: '你试试那条红色的吧。', exampleEnglish: "Why don't you try that red one?" },
  { id: 9, word: '红色', pinyin: 'hóngsè', wordClass: 'n.', english: 'red', exampleHanzi: '你穿红色的很好看。', exampleEnglish: 'You look pretty good in red.' },
  { id: 10, word: '所以', pinyin: 'suǒyǐ', wordClass: 'conj.', english: 'so; therefore', exampleHanzi: '所以要试试啊！', exampleEnglish: "That's why you should give it a try!" },
  { id: 11, word: '书包', pinyin: 'shūbāo', wordClass: 'n.', english: 'schoolbag', exampleHanzi: '我想买个新书包。', exampleEnglish: 'I want to buy a new schoolbag.' },
  { id: 12, word: '过去', pinyin: 'guòqù', wordClass: 'v.', english: 'pass by; go over', exampleHanzi: '我们过去看看吧。', exampleEnglish: "Let's go over and take a look." },
  { id: 13, word: '绿色', pinyin: 'lǜsè', wordClass: 'n.', english: 'green', exampleHanzi: '我觉得绿色的更好看。', exampleEnglish: 'I think the green one looks better.' },
  { id: 14, word: '黑色', pinyin: 'hēisè', wordClass: 'n.', english: 'black', exampleHanzi: '你有一条黑色的裤子。', exampleEnglish: 'You already have a pair of black pants.' },
  { id: 15, word: '更', pinyin: 'gèng', wordClass: 'adv.', english: 'more; still/even more', exampleHanzi: '绿色的更好看。', exampleEnglish: 'The green one is even better.' },
  { id: 16, word: '颜色', pinyin: 'yánsè', wordClass: 'n.', english: 'color', exampleHanzi: '衣服的颜色很多。', exampleEnglish: 'The clothes come in many colors.' },
];

// ── Stroke simulation: per-character data ──────────────────────────
export const SIM_WORDS = [
  { word: '过', chars: ['过'] },
  { word: '商场', chars: ['商', '场'] },
  { word: '进去', chars: ['进', '去'] },
  { word: '条', chars: ['条'] },
  { word: '裤子', chars: ['裤', '子'] },
  { word: '白色', chars: ['白', '色'] },
  { word: '因为', chars: ['因', '为'] },
  { word: '试', chars: ['试'] },
  { word: '红色', chars: ['红', '色'] },
  { word: '所以', chars: ['所', '以'] },
  { word: '书包', chars: ['书', '包'] },
  { word: '过去', chars: ['过', '去'] },
  { word: '绿色', chars: ['绿', '色'] },
  { word: '黑色', chars: ['黑', '色'] },
  { word: '更', chars: ['更'] },
  { word: '颜色', chars: ['颜', '色'] },
];

// ── Writing & Memory: decomposition cards ─────────────────────────
export interface DecompCard {
  word: string;
  pinyin: string;
  strokeCount: string;
  components: string;
  radical: string;
  mnemonic: string;
  strokeOrder: string;
}

export const DECOMP: DecompCard[] = [
  { word: '过', pinyin: 'guò', strokeCount: '6', components: '辶 (walk) + 寸 (inch)', radical: '辶 · walk', mnemonic: 'Walk (辶) just an inch (寸) more — you have passed / experienced it.', strokeOrder: '横, 竖钩, 点, 点, 横折折撇, 捺' },
  { word: '商场', pinyin: 'shāngchǎng', strokeCount: '11 + 6 = 17', components: '商 (亠 + 𠄎 + 同) + 场 (土 + 𠃓)', radical: '商: 口 · mouth | 场: 土 · earth', mnemonic: 'A 商 shop built on 土 earth — that open space (场) is the mall.', strokeOrder: '商: 点, 横, 点, 撇, 竖, 横折钩, 撇, 点, 竖, 横折, 横 | 场: 横, 竖, 提, 横折折折钩, 撇' },
  { word: '进去', pinyin: 'jìnqù', strokeCount: '7 + 5 = 12', components: '进 (井 + 辶) + 去 (土 + 厶)', radical: '进: 辶 · walk | 去: 厶 · private', mnemonic: 'A well (井) that walks (辶) — go in (进). Earth (土) goes its own private (厶) way — leave (去).', strokeOrder: '进: 横, 横, 撇, 竖, 点, 横折折撇, 捺 | 去: 横, 竖, 横, 撇折, 点' },
  { word: '条', pinyin: 'tiáo', strokeCount: '7', components: '夂 (go) + 木 (wood)', radical: '木 · wood', mnemonic: 'Go (夂) down to the wood (木) and cut one long strip (条).', strokeOrder: '撇, 横撇, 捺, 横, 竖钩, 撇, 点' },
  { word: '裤子', pinyin: 'kùzi', strokeCount: '12 + 3 = 15', components: '裤 (衤 + 库) + 子', radical: '裤: 衤 · clothes | 子: 子', mnemonic: 'Clothes (衤) from a warehouse (库) — trousers. A child (子) wears them.', strokeOrder: '裤: 点, 横撇, 竖, 撇, 点, 点, 横, 撇, 横, 撇折, 竖, 提 | 子: 横撇, 竖钩, 横' },
  { word: '白色', pinyin: 'báisè', strokeCount: '5 + 6 = 11', components: '白 (日 + 丿) + 色 (⺈ + 巴)', radical: '白: 白 · white | 色: 色 · color', mnemonic: 'The sun (日) throws a ray (丿) — pure white (白). A knife (⺈) over a snake (巴) — a color (色).', strokeOrder: '白: 撇, 竖, 横折, 横, 横 | 色: 撇, 横撇, 横折, 竖, 横, 竖弯钩' },
  { word: '因为', pinyin: 'yīnwèi', strokeCount: '6 + 4 = 10', components: '因 (囗 + 大) + 为', radical: '因: 囗 · enclosure | 为: 丶 · dot', mnemonic: 'A person (大) boxed inside (囗) — trapped by a cause (因). Add effort (为) — that is why.', strokeOrder: '因: 竖, 横折, 横, 撇, 点, 横 | 为: 点, 撇, 横折钩, 点' },
  { word: '试', pinyin: 'shì', strokeCount: '8', components: '讠 (speech) + 式 (style)', radical: '讠 · speech', mnemonic: 'Test (试) it with words (讠) in a certain style (式).', strokeOrder: '点, 横折提, 横, 横, 竖, 提, 斜钩, 点' },
  { word: '红色', pinyin: 'hóngsè', strokeCount: '6 + 6 = 12', components: '红 (纟 + 工) + 色', radical: '红: 纟 · silk', mnemonic: 'Red (红) silk thread (纟) worked (工) by craftsmen; red is a lucky color (色).', strokeOrder: '红: 撇折, 撇折, 提, 横, 竖, 横 | 色: 撇, 横撇, 横折, 竖, 横, 竖弯钩' },
  { word: '所以', pinyin: 'suǒyǐ', strokeCount: '8 + 4 = 12', components: '所 (户 + 斤) + 以', radical: '所: 斤 · axe', mnemonic: 'By the door (户) hangs an axe (斤) — that is the reason (所); use it (以), therefore…', strokeOrder: '所: 点, 横折, 横, 撇, 撇, 撇, 横, 竖 | 以: 竖提, 点, 撇, 点' },
  { word: '书包', pinyin: 'shūbāo', strokeCount: '4 + 5 = 9', components: '书 + 包 (勹 + 巳)', radical: '包: 勹 · wrap', mnemonic: 'A book (书) wrapped (勹) up — that is a schoolbag (包).', strokeOrder: '书: 横折, 横折钩, 竖, 点 | 包: 撇, 横折钩, 横折, 横, 竖弯钩' },
  { word: '过去', pinyin: 'guòqù', strokeCount: '6 + 5 = 11', components: '过 (寸 + 辶) + 去 (土 + 厶)', radical: '过: 辶 · walk | 去: 厶 · private', mnemonic: 'Walk (辶) past (过) — the past is what went (去) away.', strokeOrder: '过: 横, 竖钩, 点, 点, 横折折撇, 捺 | 去: 横, 竖, 横, 撇折, 点' },
  { word: '绿色', pinyin: 'lǜsè', strokeCount: '11 + 6 = 17', components: '绿 (纟 + 录) + 色', radical: '绿: 纟 · silk', mnemonic: 'Green (绿) silk (纟) recorded (录) as the color of spring; it is a fresh color (色).', strokeOrder: '绿: 撇折, 撇折, 提, 横折, 横, 横, 竖钩, 点, 提, 撇, 捺 | 色: 撇, 横撇, 横折, 竖, 横, 竖弯钩' },
  { word: '黑色', pinyin: 'hēisè', strokeCount: '12 + 6 = 18', components: '黑 (里 + 灬) + 色', radical: '黑: 黑 · black', mnemonic: 'A field (田/里) over four drops of fire (灬) — soot makes black (黑), the darkest color (色).', strokeOrder: '黑: 竖, 横折, 点, 撇, 横, 竖, 横, 横, 点, 点, 点, 点 | 色: 撇, 横撇, 横折, 竖, 横, 竖弯钩' },
  { word: '更', pinyin: 'gèng', strokeCount: '7', components: '曰 (say) + 乂 (cross)', radical: '曰 · say', mnemonic: 'The sun (日) crossed (乂) higher — even more (更), still more.', strokeOrder: '横, 竖, 横折, 横, 横, 撇, 捺' },
  { word: '颜色', pinyin: 'yánsè', strokeCount: '15 + 6 = 21', components: '颜 (彦 + 页) + 色', radical: '颜: 页 · page/head', mnemonic: 'An elegant (彦) head (页) shows its face color (颜) — every color (色) shows on the face.', strokeOrder: '颜: 点, 横, 点, 撇, 横, 撇, 撇, 撇, 撇, 横, 撇, 竖, 横折, 撇, 点 | 色: 撇, 横撇, 横折, 竖, 横, 竖弯钩' },
];

// ── Basic stroke rules (7) ─────────────────────────────────────────
export const STROKE_RULES = [
  { rule: '先横后竖', desc: 'Horizontal before vertical', example: '十 (shí)' },
  { rule: '先撇后捺', desc: 'Left-falling before right-falling', example: '人 (rén)' },
  { rule: '从上到下', desc: 'Top to bottom', example: '三 (sān)' },
  { rule: '从左到右', desc: 'Left to right', example: '好 (hǎo)' },
  { rule: '先外后内', desc: 'Outside before inside', example: '月 (yuè)' },
  { rule: '先中间后两边', desc: 'Middle before the two sides', example: '小 (xiǎo)' },
  { rule: '先里头后封口', desc: 'Fill the inside, then close the box', example: '国 (guó)' },
];

// ── Radicals ───────────────────────────────────────────────────────
export const RADICALS = [
  { radical: '辶', name: 'chuò · walk', meaning: 'Movement, walking (walk radical)', examples: '过, 进, 过去' },
  { radical: '衤', name: 'yī · clothes', meaning: 'Clothing (clothes radical)', examples: '裤 (裤子)' },
  { radical: '纟', name: 'mì · silk', meaning: 'Silk, thread (silk radical)', examples: '红 (红色), 绿 (绿色)' },
  { radical: '囗', name: 'wéi · enclosure', meaning: 'Enclosure, surrounding box', examples: '因 (因为)' },
];

// ── Grammar ────────────────────────────────────────────────────────
export interface GrammarPoint {
  title: string;
  formula: string;
  formulaNeg?: string;
  explanation: string;
  examples: { hanzi: string; pinyin: string; english: string }[];
}

export const GRAMMAR: GrammarPoint[] = [
  {
    title: 'Aspect Particle “过”',
    formula: 'Subject + Verb + 过 + Object',
    formulaNeg: 'Negative: Subject + 没(有) + Verb + 过',
    explanation: '过 comes right after a verb to show the action happened at least once in the past — an experienced action. Use 没(有)…过 for the negative (“have never…”), and 吗 turns it into a yes/no question. It never combines with 了 for the same action.',
    examples: [
      { hanzi: '她去过中国。', pinyin: 'Tā qùguo Zhōngguó.', english: 'She has been to China.' },
      { hanzi: '我吃过饺子，很好吃。', pinyin: 'Wǒ chīguo jiǎozi, hěn hǎochī.', english: 'I have eaten dumplings — they are delicious.' },
      { hanzi: '她没去过中国。', pinyin: 'Tā méi qùguo Zhōngguó.', english: 'She has never been to China.' },
      { hanzi: '我们来过这家商场吗？', pinyin: 'Wǒmen láiguo zhè jiā shāngchǎng ma?', english: 'Have we been to this shopping mall before?' },
    ],
  },
  {
    title: 'Causal Sentence “因为……，所以……”',
    formula: '因为 + Cause, 所以 + Effect',
    explanation: '因为 (because) introduces the reason and 所以 (so) introduces the result. The two halves form one complex sentence. 就是因为… adds emphasis: “it is precisely because…”. In everyday speech, either half can appear alone.',
    examples: [
      { hanzi: '就是因为没穿过，所以要试试啊！', pinyin: 'Jiùshì yīnwèi méi chuānguo, suǒyǐ yào shìshi a!', english: 'It is precisely because you have never worn it that you should try it!' },
      { hanzi: '因为我生病了，今天没去上班。', pinyin: 'Yīnwèi wǒ shēngbìng le, jīntiān méi qù shàngbān.', english: 'Because I was sick, I did not go to work today.' },
      { hanzi: '因为是新开的，所以这几天东西很便宜。', pinyin: 'Yīnwèi shì xīn kāi de, suǒyǐ zhè jǐ tiān dōngxi hěn piányi.', english: 'Because it is newly opened, things are very cheap these days.' },
    ],
  },
  {
    title: '“的” Phrase (“的”字短语)',
    formula: 'Adjective / Verb / Noun + 的  (= Noun Phrase)',
    explanation: '的 turns a modifier into a stand-in for the noun: 红色的 = “the red one”. It works with colors, verbs (妈妈买的 = “the one Mom bought”), and possessives. The listener understands which noun you mean from context.',
    examples: [
      { hanzi: '红色的、绿色的、黑色的，你想买哪个？', pinyin: 'Hóngsè de, lǜsè de, hēisè de, nǐ xiǎng mǎi nǎ ge?', english: 'The red one, the green one, the black one — which do you want to buy?' },
      { hanzi: '这个面包是爸爸买的，妈妈买的在那儿。', pinyin: 'Zhège miànbāo shì bàba mǎi de, māma mǎi de zài nàr.', english: 'This bread was bought by Dad; the one Mom bought is over there.' },
      { hanzi: '我觉得绿色的更好看。', pinyin: 'Wǒ juéde lǜsè de gèng hǎokàn.', english: 'I think the green one looks better.' },
    ],
  },
];

// ── Texts ──────────────────────────────────────────────────────────
export interface LessonText {
  id: number;
  title: string;
  englishTitle: string;
  lines: { speaker: string; hanzi: string; pinyin: string; english: string }[];
}

export const TEXTS: LessonText[] = [
  {
    id: 1,
    title: '在商场门口',
    englishTitle: 'At the entrance of the shopping mall',
    lines: [
      { speaker: '刘小雪', hanzi: '妈妈，我们来过这家商场吗？', pinyin: 'Māma, wǒmen láiguo zhè jiā shāngchǎng ma?', english: 'Mom, have we been to this shopping mall before?' },
      { speaker: '王一雪', hanzi: '没来过，这是新开的。', pinyin: 'Méi láiguo, zhè shì xīn kāi de.', english: 'No, we haven\u2019t. This one is newly opened.' },
      { speaker: '刘小雪', hanzi: '我们进去看看吧。', pinyin: 'Wǒmen jìnqù kànkan ba.', english: 'Let\u2019s go inside and have a look.' },
      { speaker: '王一雪', hanzi: '好啊！你想买点儿什么？', pinyin: 'Hǎo a! Nǐ xiǎng mǎi diǎnr shénme?', english: 'Sure! What would you like to buy?' },
      { speaker: '刘小雪', hanzi: '我想买条裤子。', pinyin: 'Wǒ xiǎng mǎi tiáo kùzi.', english: 'I want to buy a pair of pants.' },
      { speaker: '王一雪', hanzi: '没问题。', pinyin: 'Méi wèntí.', english: 'No problem.' },
    ],
  },
  {
    id: 2,
    title: '在商场看衣服',
    englishTitle: 'Shopping for clothes',
    lines: [
      { speaker: '刘小雪', hanzi: '妈妈，我想买这条白色的裤子。', pinyin: 'Māma, wǒ xiǎng mǎi zhè tiáo báisè de kùzi.', english: 'Mom, I want to buy this pair of white pants.' },
      { speaker: '王一雪', hanzi: '你有很多白色的衣服，为什么还买白色的？', pinyin: 'Nǐ yǒu hěn duō báisè de yīfu, wèishénme hái mǎi báisè de?', english: 'You have a lot of white clothes. Why buy white again?' },
      { speaker: '刘小雪', hanzi: '因为我喜欢白色啊！', pinyin: 'Yīnwèi wǒ xǐhuan báisè a!', english: 'Because I like white!' },
      { speaker: '王一雪', hanzi: '我觉得这条白色的不太好看，你试试那条红色的吧。', pinyin: 'Wǒ juéde zhè tiáo báisè de bú tài hǎokàn, nǐ shìshi nà tiáo hóngsè de ba.', english: 'I don\u2019t think these white ones look good. Why don\u2019t you try that red pair?' },
      { speaker: '刘小雪', hanzi: '我没穿过红色的，红色的好看吗？', pinyin: 'Wǒ méi chuānguo hóngsè de, hóngsè de hǎokàn ma?', english: 'I\u2019ve never worn red before. Does red look good?' },
      { speaker: '王一雪', hanzi: '就是因为没穿过，所以要试试啊！', pinyin: 'Jiùshì yīnwèi méi chuānguo, suǒyǐ yào shìshi a!', english: 'It\u2019s precisely because you\u2019ve never worn it that you should give it a try!' },
    ],
  },
  {
    id: 3,
    title: '在商场看书包',
    englishTitle: 'Shopping for schoolbags',
    lines: [
      { speaker: '刘小雪', hanzi: '妈妈，我想买个新书包。', pinyin: 'Māma, wǒ xiǎng mǎi ge xīn shūbāo.', english: 'Mom, I want to buy a new schoolbag.' },
      { speaker: '王一雪', hanzi: '好，那边卖书包，我们过去看看吧。', pinyin: 'Hǎo, nàbiān mài shūbāo, wǒmen guòqù kànkan ba.', english: 'OK, they sell schoolbags over there. Let\u2019s go and have a look.' },
      { speaker: '刘小雪', hanzi: '这么多漂亮的书包！', pinyin: 'Zhème duō piàoliang de shūbāo!', english: 'So many beautiful schoolbags!' },
      { speaker: '王一雪', hanzi: '红色的、绿色的、黑色的，你想买哪个？', pinyin: 'Hóngsè de, lǜsè de, hēisè de, nǐ xiǎng mǎi nǎ ge?', english: 'The red one, the green one, the black one — which one do you want to buy?' },
      { speaker: '刘小雪', hanzi: '绿色的吧。', pinyin: 'Lǜsè de ba.', english: 'The green one, I guess.' },
      { speaker: '王一雪', hanzi: '不错，我也觉得绿色的更好看。', pinyin: 'Búcuò, wǒ yě juéde lǜsè de gèng hǎokàn.', english: 'Not bad. I also think the green one looks better.' },
    ],
  },
];

export const TEXT4 = {
  hanzi: '我和妈妈去了一家商场。因为是新开的，所以这几天东西很便宜。商场里的衣服颜色很多。我没穿过红色的裤子，妈妈让我试了试，我觉得我穿红色的也很好看。',
  pinyin: 'Wǒ hé māma qù le yì jiā shāngchǎng. Yīnwèi shì xīn kāi de, suǒyǐ zhè jǐ tiān dōngxi hěn piányi. Shāngchǎng lǐ de yīfu yánsè hěn duō. Wǒ méi chuānguo hóngsè de kùzi, māma ràng wǒ shì le shì, wǒ juéde wǒ chuān hóngsè de yě hěn hǎokàn.',
  english: 'Mom and I went to a shopping mall. Because it is newly opened, things are very cheap these days. The clothes in the mall come in many colors. I had never worn red pants before. Mom let me try them on, and I think I look pretty good in red too.',
};

// ── Practice ───────────────────────────────────────────────────────
export interface FillBlankQ { type: 'fill'; num: number; sentence: string; options: string[]; answer: string; }
export interface McqQ { type: 'mcq'; num: number; sentence: string; options: string[]; answer: string; }
export interface RearrangeQ { type: 'rearrange'; num: number; chunks: string[]; answer: string; }

export const PRACTICE_FILL: FillBlankQ[] = [
  { type: 'fill', num: 1, sentence: '我看见老师在教室里，你____找她吧。', options: ['A. 进去', 'B. 书包', 'C. 颜色', 'D. 条', 'E. 商场'], answer: 'A' },
  { type: 'fill', num: 2, sentence: '你已经有一____黑色的裤子了，别买了。', options: ['A. 进去', 'B. 书包', 'C. 颜色', 'D. 条', 'E. 商场'], answer: 'D' },
  { type: 'fill', num: 3, sentence: '我来过这家____，它是今年一月新开的。', options: ['A. 进去', 'B. 书包', 'C. 颜色', 'D. 条', 'E. 商场'], answer: 'E' },
  { type: 'fill', num: 4, sentence: '妈妈，你看见我的____了吗？', options: ['A. 进去', 'B. 书包', 'C. 颜色', 'D. 条', 'E. 商场'], answer: 'B' },
  { type: 'fill', num: 5, sentence: '你想买件什么____的衣服？', options: ['A. 进去', 'B. 书包', 'C. 颜色', 'D. 条', 'E. 商场'], answer: 'C' },
];

export const PRACTICE_MCQ: McqQ[] = [
  { type: 'mcq', num: 6, sentence: '我去____北京，那里很大很漂亮。', options: ['A. 过', 'B. 了', 'C. 着'], answer: 'A' },
  { type: 'mcq', num: 7, sentence: '____今天下雨，____我们没去公园。', options: ['A. 因为…所以…', 'B. 虽然…但是…'], answer: 'A' },
  { type: 'mcq', num: 8, sentence: '这两个书包，我更喜欢红色的____。', options: ['A. 的', 'B. 得', 'C. 地'], answer: 'A' },
  { type: 'mcq', num: 9, sentence: '你吃____饺子没有？', options: ['A. 过', 'B. 完', 'C. 好'], answer: 'A' },
  { type: 'mcq', num: 10, sentence: '这件衣服太贵了，买那件便宜____吧。', options: ['A. 的', 'B. 了', 'C. 过'], answer: 'A' },
];

export const PRACTICE_REARRANGE: RearrangeQ[] = [
  { type: 'rearrange', num: 11, chunks: ['没', '来过', '商场', '我们', '这家'], answer: '我们没来过这家商场。' },
  { type: 'rearrange', num: 12, chunks: ['红色的', '你', '很好看', '穿'], answer: '你穿红色的很好看。' },
  { type: 'rearrange', num: 13, chunks: ['新书包', '我', '想', '买个'], answer: '我想买个新书包。' },
  { type: 'rearrange', num: 14, chunks: ['东西', '很便宜', '因为', '是新开的', '所以'], answer: '因为是新开的，所以东西很便宜。' },
  { type: 'rearrange', num: 15, chunks: ['绿色的', '更好看', '我', '觉得'], answer: '我觉得绿色的更好看。' },
];

// ── Culture ────────────────────────────────────────────────────────
export const COLOR_CULTURE = [
  { color: '红色', pinyin: 'hóngsè', hex: '#dc2626', meaning: 'Luck, joy and celebration. Red is the most auspicious color in China: red envelopes (红包), weddings, lanterns, and Spring Festival decorations are all red. Wearing red brings good fortune.', },
  { color: '白色', pinyin: 'báisè', hex: '#e2e8f0', meaning: 'Traditionally linked to mourning and funerals, white is worn at funerals in many regions. Today young people also wear white as a modern, clean fashion color.' },
  { color: '绿色', pinyin: 'lǜsè', hex: '#16a34a', meaning: 'Nature, health and new life. Green hats are avoided — “戴绿帽子” means one\u2019s partner is unfaithful! Green jade (玉), however, symbolizes purity and protection.' },
  { color: '黑色', pinyin: 'hēisè', hex: '#111827', meaning: 'Formality and solemnity: black suits are worn at serious ceremonies. It can also suggest secrecy (黑名单 “black list”) but in fashion black is slimming and elegant.' },
];
