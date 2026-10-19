import {test,expect} from '@playwright/test';
test('progress counts distinct cards and colors questions by latest recall',async({page})=>{
 await page.goto('/');for(let i=0;i<6;i++){await page.getByRole('button',{name:'Reveal answer',exact:true}).click();await page.getByRole('button',{name:i===5?/1 Again/:/3 Good/}).click();}
 await page.getByRole('button',{name:'Progress',exact:true}).click();await expect(page.getByRole('heading',{name:'See how far you’ve come.'})).toBeVisible();await expect(page.locator('.progress-stats')).toContainText('6/6');await expect(page.locator('.question-row.progress-strong')).toHaveCount(1);await expect(page.locator('.question-row.progress-retry')).toHaveCount(1);
 await page.reload();await page.getByRole('button',{name:'Progress',exact:true}).click();await expect(page.locator('.question-row.progress-retry')).toHaveCount(1);await page.screenshot({path:'test-results/progress-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'test-results/progress-mobile.png',fullPage:true});
});
