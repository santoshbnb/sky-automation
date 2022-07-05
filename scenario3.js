//Scenario: User sees a list of deals on the deals page 
const { chromium } = require('playwright');

(async()=>{
    const browser = await chromium.launch({headless: false, slowMo: 100});
    const context = await browser.newContext();
    const page = await context.newPage();

    //Navigating to Sky home page
    await page.goto('https://www.sky.com/');

    //Accept cookies popup
    await page.frameLocator('[title="SP Consent Message"]').locator('//button[@title="Agree"]').click();

    // Navigating to Deals page
    await page.goto('https://www.sky.com/deals');
    const frame1 = page.frameLocator('//iframe[@title="SP Consent Message"]')
    if (frame1 != null)
    {
        frame1.locator('//button[@title="Agree"]').click();
    }
    await page.locator('text=Sky Deals').waitFor();
    await page.click('//span[text()="Sky Q"]');
    await page.locator('text=Sky Q Deals').isVisible();
    const price = await page.locator('//section[@id="deals"]/div/div').innerText();
    console.log(price)
    

    await browser.close();
})();