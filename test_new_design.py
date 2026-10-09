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

        title = await page.title()
        print(f"Page Title: {title}")

        # Switch to SRS tab first
        await page.click("#nav-btn-srs")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/Users/trangngo95/Desktop/HSK/new_design_srs_tab.png", full_page=True)
        print("Saved SRS Tab screenshot")

        # Test flipping card
        if await page.locator("#card-inner-box").is_visible():
            await page.click("#card-inner-box")
            await page.wait_for_timeout(500)
            await page.screenshot(path="/Users/trangngo95/Desktop/HSK/new_design_card_flipped.png", full_page=True)
            print("Saved Flipped Card screenshot")

        # Switch to Word Adder tab
        await page.click("#nav-btn-input")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/Users/trangngo95/Desktop/HSK/new_design_input_tab.png", full_page=True)
        print("Saved Input Tab screenshot")

        # Switch to Notebook tab
        await page.click("#nav-btn-notebook")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/Users/trangngo95/Desktop/HSK/new_design_notebook_tab.png", full_page=True)
        print("Saved Notebook Tab screenshot")

        await browser.close()

    print(f"Page Errors: {len(page_errors)}")
    print(f"Console Errors: {len(console_errors)}")

if __name__ == '__main__':
    asyncio.run(test_app())
