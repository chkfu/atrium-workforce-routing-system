const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.createContext();
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5175/manage-candidates');
    await page.waitForLoadState('networkidle');
    console.log('Page loaded');
    
    // Look for create button
    const buttons = await page.locator('button').count();
    console.log('Found ' + buttons + ' buttons');
    
    // Take initial screenshot
    await page.screenshot({ path: '/tmp/candidates_page.png' });
    console.log('Saved candidates_page.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();
