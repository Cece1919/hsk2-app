import sys
from playwright.sync_api import sync_playwright

def run_test():
    page_errors = []
    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("--- Testing HSK2_Bai_6_Mo_Phong_Viet.html ---")
        page.goto("file:///Users/trangngo95/Desktop/HSK/HSK2/Day%206/HSK2_Bai_6_Mo_Phong_Viet.html")
        page.wait_for_timeout(1000)

        tabs = ["sim", "overview", "vocab", "writing", "grammar", "text", "practice", "culture"]
        for t in tabs:
            page.click(f"#tab-{t}")
            page.wait_for_timeout(300)
            print(f"Clicked tab #{t}")

        print("--- Testing HSK2_Bai_6_Tu_Hoc.html ---")
        page.goto("file:///Users/trangngo95/Desktop/HSK/HSK2/Day%206/HSK2_Bai_6_Tu_Hoc.html")
        page.wait_for_timeout(1000)

        for t in ["overview", "vocab", "writing", "grammar", "text", "practice", "culture"]:
            page.click(f"#tab-{t}")
            page.wait_for_timeout(300)
            print(f"Clicked tab #{t}")

        print("--- Testing index.html (Lesson 6) ---")
        page.goto("file:///Users/trangngo95/Desktop/HSK/index.html")
        page.wait_for_timeout(1000)
        page.click("#btn-lesson-6")
        page.wait_for_timeout(500)

        browser.close()

    print(f"\nRESULTS: Page Errors: {len(page_errors)}, Console Errors: {len(console_errors)}")
    if page_errors:
        print("Page Errors:", page_errors)
        sys.exit(1)
    if console_errors:
        print("Console Errors:", console_errors)
        sys.exit(1)
    print("ALL TESTS PASSED WITH 0 ERRORS!")

if __name__ == "__main__":
    run_test()
