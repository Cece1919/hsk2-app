import os

day_dir = "/Users/trangngo95/Desktop/HSK/HSK2/Day 4"
trung_anh_dir = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

# Falling petals CSS and HTML container
petals_css_js = """
    <style id="chinese-aesthetic-fx">
        @keyframes floatPetal {
            0% {
                transform: translateY(-40px) rotate(0deg) translateX(0);
                opacity: 0.85;
            }
            50% {
                transform: translateY(50vh) rotate(180deg) translateX(50px);
                opacity: 0.6;
            }
            100% {
                transform: translateY(105vh) rotate(360deg) translateX(-30px);
                opacity: 0;
            }
        }
        .falling-petal {
            position: fixed;
            top: -30px;
            pointer-events: none;
            z-index: 35;
            user-select: none;
            animation: floatPetal linear infinite;
        }
        .bg-watermark-pattern {
            background-image: radial-gradient(circle at 90% 10%, rgba(190, 18, 60, 0.04) 0%, transparent 40%),
                              radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.04) 0%, transparent 40%);
        }
    </style>

    <div id="petal-container" class="fixed inset-0 pointer-events-none z-30 overflow-hidden"></div>

    <script>
        function createFallingPetals() {
            var container = document.getElementById('petal-container');
            if (!container) return;
            var petalIcons = ['🌸', '🌺', '🍃', '🌸', '🌸'];
            var count = 12;

            for (var i = 0; i < count; i++) {
                var petal = document.createElement('div');
                petal.className = 'falling-petal';
                petal.textContent = petalIcons[i % petalIcons.length];
                
                var leftPos = Math.random() * 100;
                var duration = 8 + Math.random() * 7; // 8s - 15s
                var delay = Math.random() * 10; // 0s - 10s
                var size = 14 + Math.random() * 12; // 14px - 26px

                petal.style.left = leftPos + 'vw';
                petal.style.animationDuration = duration + 's';
                petal.style.animationDelay = delay + 's';
                petal.style.fontSize = size + 'px';
                petal.style.opacity = 0.7 + Math.random() * 0.3;

                container.appendChild(petal);
            }
        }
        document.addEventListener('DOMContentLoaded', createFallingPetals);
    </script>
"""

def inject_petals_and_watermark(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if 'id="chinese-aesthetic-fx"' not in content:
        # Inject CSS and script before </body>
        content = content.replace('</body>', petals_css_js + '\n</body>')
        # Add background watermark class to body
        content = content.replace('class="bg-[#fdfbf7]', 'class="bg-[#fdfbf7] bg-watermark-pattern')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Injected Falling Petals & Watermark into {filepath}")

inject_petals_and_watermark(os.path.join(day_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_petals_and_watermark(os.path.join(day_dir, "HSK2_Bai_4_Tu_Hoc.html"))
inject_petals_and_watermark(os.path.join(trung_anh_dir, "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_petals_and_watermark(os.path.join(trung_anh_dir, "HSK2_Bai_4_Tu_Hoc.html"))
inject_petals_and_watermark(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Mo_Phong_Viet.html"))
inject_petals_and_watermark(os.path.join(trung_anh_dir, "Day 4", "HSK2_Bai_4_Tu_Hoc.html"))

print("Falling petals animation & Chinese watermark background applied successfully!")

