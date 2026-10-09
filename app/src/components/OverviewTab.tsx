const OBJECTIVES = [
  { hanzi: '用“过”谈论过去的经历', english: 'Understand and ask about past experiences using “过”.' },
  { hanzi: '用“的”字短语指代事物', english: 'Refer to objects by description using “的” phrases.' },
  { hanzi: '用“因为……，所以……”表达因果关系', english: 'Express cause and effect using “因为……，所以……”.' },
];

const STUDY_STEPS = [
  { step: 1, title: '听一听 Listen', desc: 'Play every vocabulary word and text audio. Just listen — do not read yet. Get your ears used to the sounds.' },
  { step: 2, title: '看一看 Watch', desc: 'Watch the stroke order animations for all 16 words. Notice the radicals 辶, 衤, 纟, 囗.' },
  { step: 3, title: '写一写 Write', desc: 'Trace each character in the tianzige pads until you can write it from memory.' },
  { step: 4, title: '读一读 Read', desc: 'Read the 4 texts aloud with the pinyin. Cover the English and check yourself.' },
  { step: 5, title: '练一练 Practice', desc: 'Do all 15 interactive questions. Review any mistakes with the memory cards.' },
];

export default function OverviewTab() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">🎯 Lesson Objectives</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {OBJECTIVES.map((o, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-2xl font-bold text-blue-700 mb-2">{o.hanzi}</div>
              <p className="text-sm text-slate-700">{o.english}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">🧭 5-Step Effective Self-Study Guide</h3>
        <ol className="space-y-3">
          {STUDY_STEPS.map((s) => (
            <li key={s.step} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 items-start">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">{s.step}</span>
              <div>
                <div className="font-semibold text-slate-900">{s.title}</div>
                <p className="text-sm text-slate-700">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3 className="text-md font-bold text-blue-900 mb-2">📚 About this lesson</h3>
        <p className="text-sm text-blue-900">
          Liu Xiaoxue goes shopping with her mom: a new shopping mall, white pants vs. red pants, and choosing a schoolbag.
          Along the way you will master the experienced-action particle 过, “的” phrases for “the red one”, and the
          cause-and-effect pair 因为……所以…….
        </p>
      </section>
    </div>
  );
}
