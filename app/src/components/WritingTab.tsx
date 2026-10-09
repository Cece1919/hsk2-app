import { DECOMP, STROKE_RULES, RADICALS } from '../data/lessonData';
import { speak } from '../lib/tts';

export default function WritingTab() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">✍️ Part 1 · Basic Stroke Rules (基本笔顺规则)</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-200 text-slate-800 text-left">
                <th className="px-4 py-2 font-semibold w-12">#</th>
                <th className="px-4 py-2 font-semibold">Rule (Chinese)</th>
                <th className="px-4 py-2 font-semibold">Meaning</th>
                <th className="px-4 py-2 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              {STROKE_RULES.map((r, i) => (
                <tr key={i} className="odd:bg-white even:bg-slate-50 border-t border-slate-200">
                  <td className="px-4 py-2.5 text-slate-500">{i + 1}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">{r.rule}</td>
                  <td className="px-4 py-2.5 text-slate-700">{r.desc}</td>
                  <td className="px-4 py-2.5 text-blue-700 font-medium">{r.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">🧩 Part 2 · Key Radicals (部首)</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RADICALS.map((r) => (
            <div key={r.radical} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-red-700">{r.radical}</span>
                <div>
                  <div className="font-semibold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.meaning}</div>
                </div>
              </div>
              <div className="text-sm text-slate-700">
                In this lesson: <span className="font-medium text-slate-900">{r.examples}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">🃏 Part 3 · Character Decomposition Cards (16 words)</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {DECOMP.map((c) => (
            <div key={c.word} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => speak(c.word)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-shrink-0"
                  title={`Play ${c.pinyin}`}
                >
                  ▶
                </button>
                <span className="text-3xl font-bold text-slate-900">{c.word}</span>
                <span className="text-blue-700 font-medium">{c.pinyin}</span>
              </div>
              <dl className="text-sm space-y-2 flex-1">
                <div>
                  <dt className="font-semibold text-slate-500">Stroke Count</dt>
                  <dd className="text-slate-900">{c.strokeCount}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Components & Radical</dt>
                  <dd className="text-slate-900">{c.components}</dd>
                  <dd className="text-red-700">{c.radical}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Mnemonic Trick</dt>
                  <dd className="text-slate-800 italic">{c.mnemonic}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Stroke Order Sequence</dt>
                  <dd className="text-slate-800">{c.strokeOrder}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
