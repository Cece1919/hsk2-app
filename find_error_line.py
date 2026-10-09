import asyncio
from playwright.async_api import async_playwright
import os

async def find_error_line():
    with open('srs_notebook_app.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Split script into functions / statements
    start_tag = "<script>"
    end_tag = "</script>"
    head = html[:html.find(start_tag) + len(start_tag)]
    tail = html[html.rfind(end_tag):]
    body_script = html[html.find(start_tag) + len(start_tag):html.rfind(end_tag)]

    script_lines = body_script.split('\n')

    # Binary search lines
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        for i in range(10, len(script_lines) + 1, 20):
            test_script = '\n'.join(script_lines[:i])
            test_html = head + test_script + "\n" + tail
            
            with open('temp_test.html', 'w', encoding='utf-8') as tf:
                tf.write(test_html)

            page = await browser.new_page()
            errs = []
            page.on("pageerror", lambda err: errs.append(str(err)))
            await page.goto("file://" + os.path.abspath("temp_test.html"))
            await page.wait_for_timeout(100)
            await page.close()

            if any("Invalid or unexpected token" in e for e in errs):
                print(f"Error appeared at or before line {i} of script!")
                # Print lines i-20 to i
                print("\n".join(f"{idx}: {l}" for idx, l in enumerate(script_lines[max(0, i-20):i], max(1, i-19))))
                break

        await browser.close()

if __name__ == '__main__':
    asyncio.run(find_error_line())
