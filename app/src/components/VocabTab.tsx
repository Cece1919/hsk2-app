import { VOCAB } from '../data/lessonData';
import { speak } from '../lib/tts';

const TONE_RULES = [
  { rule: 'Third + Third → Second + Third', detail: 'When two 3rd tones meet, the first one changes to 2nd tone.', example: '你好 níhǎo (pronounced níhǎo)' },
  { rule: '一 yī before a 4th tone → yí', detail: '一 becomes 2nd tone before a 4th-tone syllable.', example: '一定 yídìng, 一样 yíyàng' },
  { rule: '一 yī before 1st/2nd/3rd tone → yì', detail: '一 becomes 4th tone before non-4th tones; it stays yī when counting.', example: '一天 yìtiān, 一年 yìnián' },
  { rule: '不 bù before a 4th tone → bú', detail: '不 becomes 2nd tone before a 4th-tone syllable; between identical verbs it is neutral.', example: '不是 bú shì, 试试 shìshi' },
  { rule: 'Neutral tone in reduplication', detail: 'The second syllable of a reduplicated verb is light and quick.', example: '看看 kànkan, 试试 shìshi' },
];

export default function VocabTab() {
  return (
    <div className="space-y-6">
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="text-lg font-bold text-amber-900 mb-3">🔊 Tone Change Rules (变调规则)</h3>
        <ul className="space-y-2">
          {TONE_RULES.map((r, i) => (
            <li key={i} className="text-sm text-amber-900">
              <span className="font-semibold">{r.rule}</span> — {r.detail}{' '}
              <span className="text-amber-700">e.g. {r.example}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">📖 Vocabulary — 16 words</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-200 text-slate-800 text-left">
                <th className="px-3 py-2 font-semibold">#</th>
                <th className="px-3 py-2 font-semibold">Audio</th>
                <th className="px-3 py-2 font-semibold">Hanzi</th>
                <th className="px-3 py-2 font-semibold">Pinyin</th>
                <th className="px-3 py-2 font-semibold">Class</th>
                <th className="px-3 py-2 font-semibold">English</th>
                <th className="px-3 py-2 font-semibold">Example & Translation</th>
              </tr>
            </thead>
            <tbody>
              {VOCAB.map((v) => (
                <tr key={v.id} className="odd:bg-white even:bg-slate-50 border-t border-slate-200 align-top">
                  <td className="px-3 py-3 text-slate-500">{v.id}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => speak(v.word)}
                      className="w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      title={`Play ${v.pinyin}`}
                    >
                      ▶
                    </button>
                  </td>
                  <td className="px-3 py-3 text-xl font-bold text-slate-900">{v.word}</td>
                  <td className="px-3 py-3 text-blue-700 font-medium">{v.pinyin}</td>
                  <td className="px-3 py-3 text-slate-600">{v.wordClass}</td>
                  <td className="px-3 py-3 text-slate-800">{v.english}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => speak(v.exampleHanzi)}
                        className="mt-0.5 w-6 h-6 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors text-xs flex-shrink-0"
                        title="Play example"
                      >
                        ▶
                      </button>
                      <div>
                        <div className="text-slate-900">{v.exampleHanzi}</div>
                        <div className="text-slate-500 italic">{v.exampleEnglish}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
