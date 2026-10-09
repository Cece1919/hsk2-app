import asyncio
from playwright.async_api import async_playwright
import os

async def test_app():
    file_path = "file://" + os.path.abspath("/Users/trangngo95/Desktop/HSK/srs_notebook_app.html")
    print(f"Testing URL: {file_path}")

    page_errors = []
    console_errors = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        await page.goto(file_path)
        await page.wait_for_timeout(1000)

        # Check title
        title = await page.title()
        print(f"Page Title: {title}")

        # Check total words in Day 1 banner
        stat_total = await page.locator("#stat-total-words").inner_text()
        print(f"Stat Total Words: {stat_total}")

        # Test typing a new word in the form (e.g. 自行车)
        await page.fill("#input-hanzi", "自行车")
        await page.click("button:has-text('✨ Tra & Điền')")
        await page.wait_for_timeout(500)

        pinyin_val = await page.locator("#input-pinyin").input_value()
        meaning_val = await page.locator("#input-meaning").input_value()
        example_val = await page.locator("#input-example").input_value()

        print(f"Auto lookup result -> Pinyin: {pinyin_val} | Meaning: {meaning_val}")
        print(f"Example: {example_val}")

        # Click save button
        await page.click("button:has-text('LƯU VÀO BỘ NHỚ')")
        await page.wait_for_timeout(500)

        stat_total_after = await page.locator("#stat-total-words").inner_text()
        print(f"Stat Total Words after adding '自行车': {stat_total_after}")

        # Switch to SRS Flashcard tab
        await page.click("#nav-btn-srs")
        await page.wait_for_timeout(500)

        srs_visible = await page.is_visible("#sec-srs-view")
        print(f"SRS Flashcard view visible: {srs_visible}")

        # Switch to Notebook tab
        await page.click("#nav-btn-notebook")
        await page.wait_for_timeout(500)

        notebook_visible = await page.is_visible("#sec-notebook-view")
        print(f"Notebook view visible: {notebook_visible}")

        await browser.close()

    print(f"Page Errors: {len(page_errors)}")
    print(f"Console Errors: {len(console_errors)}")

    if page_errors:
        print("Page Errors Detail:", page_errors)
    if console_errors:
        print("Console Errors Detail:", console_errors)

if __name__ == '__main__':
    asyncio.run(test_app())
