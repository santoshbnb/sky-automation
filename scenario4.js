//Scenario: This feature will make the search show the results that are determined by editorial, as generic searches
const { firefox } = require('playwright');

(async()=>{
    const browser = await firefox.launch({headless: false, slowMo: 100});
    const context = await browser.newContext();
    const page = await context.newPage();

    //Navigating to Sky home page
    await page.goto('https://www.sky.com/');

    //Accept cookies popup
    await page.frameLocator('[title="SP Consent Message"]').locator('//button[@title="Agree"]').click();
    
    //Clicking search button in home page
    await page.click('button[id="masthead-search-toggle"]');
    await page.locator('data-test-id=input-box').fill("Sky");
    // await page.waitForTimeout(5);
    const result = await page.locator('(//*[@data-test-id="articles-section"][1]/div/a)[1]').innerText();
    console.log(result);
    await browser.close();
})();