from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844}) # iPhone viewport
        page.goto("file:///Users/trangngo95/Desktop/HSK/cece_notebook.html")
        page.wait_for_selector("#nav-btn-input")
        
        # Switch to input tab
        page.click("#nav-btn-input")
        time.sleep(0.5)

        # Type a custom word not in built-in dict, e.g. "苹果"
        page.fill("#input-hanzi", "苹果")
        page.click("#btn-ai-lookup")
        time.sleep(3) # Wait for AI auto-lookup

        # Take screenshot of AI filled input tab
        page.screenshot(path="/Users/trangngo95/.gemini/antigravity/brain/522acd10-44e4-49d9-a7d0-e011881f0191/test_ai_input_tab.png")
        
        # Check values
        py_val = page.input_value("#input-pinyin")
        hv_val = page.input_value("#input-hanviet")
        vi_val = page.input_value("#input-meaning")
        ex_val = page.input_value("#input-example")

        print(f"Pinyin: {py_val}")
        print(f"Hán Việt: {hv_val}")
        print(f"Meaning: {vi_val}")
        print(f"Example: {ex_val}")

        browser.close()

if __name__ == "__main__":
    run()
