import { GRAMMAR } from '../data/lessonData';
import { speak } from '../lib/tts';

export default function GrammarTab() {
  return (
    <div className="space-y-6">
      {GRAMMAR.map((g, gi) => (
        <section key={gi} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            💡 {gi + 1}. {g.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <code className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-mono">{g.formula}</code>
            {g.formulaNeg && (
              <code className="px-3 py-1.5 rounded-lg bg-slate-700 text-white text-sm font-mono">{g.formulaNeg}</code>
            )}
          </div>
          <p className="text-sm text-slate-700 mb-4">{g.explanation}</p>
          <div className="space-y-2">
            {g.examples.map((e, ei) => (
              <div key={ei} className="flex items-start gap-2 bg-white rounded-xl border border-slate-200 p-3">
                <button
                  onClick={() => speak(e.hanzi)}
                  className="mt-0.5 w-7 h-7 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors text-xs flex-shrink-0"
                  title="Play example"
                >
                  ▶
                </button>
                <div>
                  <div className="text-slate-900 font-medium">{e.hanzi}</div>
                  <div className="text-blue-700 text-sm">{e.pinyin}</div>
                  <div className="text-slate-500 text-sm italic">{e.english}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
