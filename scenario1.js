//Scenario: User navigates to shop page
const { chromium } = require('playwright');

(async()=>{
    const browser = await chromium.launch({headless: false, slowMo: 100});
    const context = await browser.newContext();
    const page = await context.newPage();

    //Navigating to Sky home page
    await page.goto('https://www.sky.com/');

    //Accept cookies popup
    const frame1 = page.frameLocator('//iframe[@title="SP Consent Message"]')
    if (frame1 != null)
    {
        await frame1.locator('//button[@title="Agree"]').click();
    }
    // await page.frameLocator('[title="SP Consent Message"]').locator('//button[@title="Agree"]').click();

    // Navigating to Deals page
    await page.goto('https://www.sky.com/deals');
    if (frame1 != null)
    {
        await frame1.locator('//button[@title="Agree"]').click();
    }
    const deals = await page.locator('text=Sky Deals').innerText();
    console.log(deals);

    await browser.close();
})();