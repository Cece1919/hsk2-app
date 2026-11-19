# -*- coding: utf-8 -*-
import asyncio
import os
from playwright.async_api import async_playwright

DAY9_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh/Day 9"
ROOT_DIR = "/Users/trangngo95/Desktop/HSK/Trung-Anh"

async def test_file(file_path, is_8_tabs=True):
    file_name = os.path.basename(file_path)
    print(f"\n==========================================")
    print(f"Testing {file_name}...")
    print(f"==========================================")
    
    page_errors = []
    console_errors = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 900})
        page = await context.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        file_url = f"file://{file_path}"
        await page.goto(file_url, wait_until="networkidle")
        await asyncio.sleep(1)

        # Tabs to test
        tabs = ['overview', 'vocab', 'writing', 'grammar', 'text', 'practice', 'culture']
        if is_8_tabs:
            tabs = ['sim'] + tabs

        print(f"Checking {len(tabs)} tabs switching...")
        for tab in tabs:
            await page.evaluate(f"showTab('{tab}')")
            await asyncio.sleep(0.3)
            sec_visible = await page.is_visible(f"#sec-{tab}")
            assert sec_visible, f"Section #sec-{tab} is not visible!"
            print(f"  ✓ Tab '{tab}' switched and visible successfully.")

        # Test audio playback
        print("Testing playAudio() calls...")
        await page.evaluate("playAudio('huai')")
        await asyncio.sleep(0.3)
        await page.evaluate("playAudio('ex_huai')")
        await asyncio.sleep(0.3)
        await page.evaluate("playAudio('text1')")
        await asyncio.sleep(0.3)
        print("  ✓ playAudio calls executed without throwing errors.")

        # Test checkQ function
        print("Testing checkQ() exercise...")
        await page.evaluate("showTab('practice')")
        
        # Test wrong answer (for q1, expected is 'D')
        await page.fill("#q1", "A")
        await page.click("#sec-practice button:has-text('Kiểm tra')")
        res_wrong = await page.text_content("#res-q1")
        print(f"  ✓ checkQ result for wrong input 'A': {res_wrong}")
        assert "Chưa đúng" in res_wrong, "checkQ did not flag wrong answer!"
        
        # Test correct answer
        await page.fill("#q1", "D")
        await page.click("#sec-practice button:has-text('Kiểm tra')")
        res_correct = await page.text_content("#res-q1")
        print(f"  ✓ checkQ result for correct input 'D': {res_correct}")
        assert "Chính xác" in res_correct, "checkQ did not return success for correct answer!"

        # Verify check buttons do not leak answers
        check_buttons = await page.query_selector_all("#sec-practice button[onclick^='checkQ'], #sec-practice button[onclick^='checkRadio']")
        assert len(check_buttons) > 0, "No check buttons found!"
        for b in check_buttons:
            txt = (await b.text_content()).strip()
            assert txt == "Kiểm tra", f"Button text '{txt}' leaks answers or is not 'Kiểm tra'!"
        print(f"  ✓ Verified {len(check_buttons)} check buttons: 100% Anti-Spoiler (only 'Kiểm tra').")

        # Test AI grading function
        print("Testing AI grading (Phần 4: Đặt câu với AI Khổng Tử)...")
        # 1. Test correct sentence
        await page.fill("#ai-input-1", "儿子的个子没有他那么高。")
        await page.click("button:has-text('AI Chấm bài')")
        await asyncio.sleep(1.0)
        ai_res_1 = await page.text_content("#ai-result-1")
        print(f"  ✓ AI grading response: {ai_res_1[:120]}...")
        assert "10/10" in ai_res_1 or "Nhận Xét Từ Trợ Lý AI" in ai_res_1, "AI grading result missing score or feedback!"

        # 2. Test comparative sentence error detection (using 很 after 没有)
        await page.fill("#ai-input-1", "儿子的个子没有他很高")
        await page.click("button:has-text('AI Chấm bài')")
        await asyncio.sleep(1.0)
        ai_res_wrong = await page.text_content("#ai-result-1")
        print(f"  ✓ AI detected degree error after 没有: {ai_res_wrong[:120]}...")
        assert "phó từ mức độ" in ai_res_wrong or "很" in ai_res_wrong, "AI did not catch degree adverb error after 没有!"

        # 3. Test proposed model sentence: Hanzi + Pinyin + Vietnamese
        assert "儿子的个子没有他那么高。" in ai_res_wrong, "Missing complete Chinese characters in proposed model sentence!"
        assert "Érzi de gèzi méiyǒu tā nàme gāo." in ai_res_wrong, "Missing Pinyin in model sentence!"
        assert "Chiều cao của con trai không cao bằng cậu ấy." in ai_res_wrong, "Missing Vietnamese translation in model sentence!"
        print("  ✓ Verified model sentence has 100% synchronized Hanzi + Pinyin + Vietnamese translation.")

        # Test speak button
        speak_btn = await page.query_selector("#ai-result-1 button:has-text('Nghe đọc')")
        assert speak_btn is not None, "Missing speech button on AI proposed sentence!"
        print("  ✓ Verified 'Nghe đọc' speech button exists on AI proposed sentence.")

        # Capture screenshots for report
        screen_path = os.path.join(DAY9_DIR, f"{file_name}_verified.png")
        await page.screenshot(path=screen_path, full_page=False)
        print(f"  ✓ Saved screenshot: {screen_path}")

        # Capture AI Grading section screenshot
        await page.evaluate("document.getElementById('ai-result-1').scrollIntoView()")
        await asyncio.sleep(0.5)
        ai_screen_path = os.path.join(DAY9_DIR, f"{file_name}_AI_Grading.png")
        await page.screenshot(path=ai_screen_path, full_page=False)
        print(f"  ✓ Saved AI grading screenshot: {ai_screen_path}")

        await browser.close()

    print(f"\nRESULTS FOR {file_name}:")
    print(f"  Page errors: {len(page_errors)} -> {page_errors}")
    print(f"  Console errors: {len(console_errors)} -> {console_errors}")
    assert len(page_errors) == 0, f"Page errors found in {file_name}: {page_errors}"
    assert len(console_errors) == 0, f"Console errors found in {file_name}: {console_errors}"
    print(f"PASSED 100% PERFECTLY: {file_name} (0 Errors)\n")

async def main():
    print("==================================================")
    print("STARTING PLAYWRIGHT VERIFICATION FOR DAY 9 LESSON")
    print("==================================================")

    # 1. Test 8-Tab Version in Day 9/
    await test_file(os.path.join(DAY9_DIR, "HSK2_Bai_9_Mo_Phong_Viet.html"), is_8_tabs=True)

    # 2. Test 7-Tab Version in Day 9/
    await test_file(os.path.join(DAY9_DIR, "HSK2_Bai_9_Tu_Hoc.html"), is_8_tabs=False)

    # 3. Test Root 8-Tab Version (GitHub Pages)
    await test_file(os.path.join(ROOT_DIR, "HSK2_Bai_9_Mo_Phong_Viet.html"), is_8_tabs=True)

    # 4. Test Root 7-Tab Version (GitHub Pages)
    await test_file(os.path.join(ROOT_DIR, "HSK2_Bai_9_Tu_Hoc.html"), is_8_tabs=False)

    print("\n🎉 ALL 4 MASTER FILES VERIFIED SUCCESSFULLY WITH 0 ERRORS! 🎉")

if __name__ == "__main__":
    asyncio.run(main())
