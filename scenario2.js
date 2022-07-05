//Scenario:  User sees tiles on the shop page
const { firefox } = require('playwright');

(async()=>{
    const browser = await firefox.launch({headless: false, slowMo: 100});
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
    
    // Clicking on Sign in button
    await page.click('text=Sign in');
    await page.waitForNavigation();
    if (frame1 != null)
    {
        await frame1.locator('//button[@title="Agree"]').click();
    }
    //Entering email id in sign in page
    const frame2 = page.frameLocator("//iframe[@title='iFrame containing Sky Sign-In application']")
    if (frame2 != null)
    {
        await frame2.locator("#username").fill("test@abc.com");
        await frame2.locator("text=Continue").click();
        const signin = await frame2.locator("data-testid=CREATE_PASSWORD__TITLE").innerText();
        console.log(signin);
    };
    await browser.close();
})();