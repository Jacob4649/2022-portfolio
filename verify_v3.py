import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Check career page
        await page.goto('http://localhost:3000/career')
        await page.wait_for_selector('text=Career')
        await page.screenshot(path='/home/jules/verification/career_v3.png', full_page=True)

        # Check projects page (table)
        await page.goto('http://localhost:3000/projects')
        await page.wait_for_selector('text=Projects')
        await page.screenshot(path='/home/jules/verification/projects_v3.png', full_page=True)

        # Check awards page (cards)
        await page.goto('http://localhost:3000/awards')
        await page.wait_for_selector('text=Awards & Recognition')
        await page.screenshot(path='/home/jules/verification/awards_v3.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
