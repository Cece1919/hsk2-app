import { TEXTS, TEXT4 } from '../data/lessonData';
import { speak } from '../lib/tts';

export default function TextTab() {
  return (
    <div className="space-y-6">
      {TEXTS.map((t) => (
        <section key={t.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Text {t.id} · {t.title} <span className="text-slate-500 font-normal">— {t.englishTitle}</span>
            </h3>
            <button
              onClick={() => speak(t.lines.map((l) => l.hanzi).join(' '))}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              ▶ Play full text
            </button>
          </div>
          <div className="space-y-2">
            {t.lines.map((l, li) => (
              <div key={li} className="flex items-start gap-2 bg-white rounded-xl border border-slate-200 p-3">
                <button
                  onClick={() => speak(l.hanzi)}
                  className="mt-1 w-7 h-7 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors text-xs flex-shrink-0"
                  title="Play line"
                >
                  ▶
                </button>
                <div>
                  <div className="text-sm font-semibold text-red-700">{l.speaker}</div>
                  <div className="text-slate-900 text-lg">{l.hanzi}</div>
                  <div className="text-blue-700 text-sm">{l.pinyin}</div>
                  <div className="text-slate-500 text-sm italic">{l.english}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-bold text-slate-900">
            Text 4 · 在房间写日记 <span className="text-slate-500 font-normal">— Writing in a diary</span>
          </h3>
          <button
            onClick={() => speak(TEXT4.hanzi)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            ▶ Play full text
          </button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
          <p className="text-slate-900 text-lg leading-relaxed">{TEXT4.hanzi}</p>
          <p className="text-blue-700 text-sm leading-relaxed">{TEXT4.pinyin}</p>
          <p className="text-slate-500 text-sm italic leading-relaxed">{TEXT4.english}</p>
        </div>
      </section>
    </div>
  );
}
