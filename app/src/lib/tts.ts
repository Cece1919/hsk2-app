// Web Speech API TTS (zh-CN) with graceful fallback
export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  utter.rate = 0.85;
  const voices = synth.getVoices();
  const zh = voices.find((v) => v.lang === 'zh-CN') || voices.find((v) => v.lang.replace('_', '-').startsWith('zh'));
  if (zh) utter.voice = zh;
  synth.speak(utter);
}

// Warm up the voices list (some browsers load it async)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
