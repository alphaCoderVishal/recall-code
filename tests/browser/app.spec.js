import { test, expect } from '@playwright/test';
test('review, full code, schedule and history persist across reload', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'A little recall. A stronger intuition.'})).toBeVisible();
  await page.getByRole('button',{name:'Full code',exact:true}).click();
  await expect(page.locator('pre.code')).toContainText('public int[] twoSum');
  await page.getByRole('button',{name:'Hide context',exact:true}).click();
  await expect(page.locator('aside')).toHaveCount(0);
  await page.getByRole('button',{name:'Open question context'}).click();
  await page.getByRole('button',{name:'Reveal answer',exact:true}).click();
  await page.getByRole('button',{name:/3 Good/}).click();
  await expect(page.locator('.question-label')).toContainText('Valid Parentheses');
  await page.reload();
  await page.getByRole('button',{name:'History',exact:true}).click();
  await expect(page.locator('.history-row')).toHaveCount(1);
  await expect(page.locator('.history-row')).toContainText('Good');
  expect(errors).toEqual([]);
});
test('create question with full code, add multiple cards, edit, pause and delete', async ({page}) => {
  await page.goto('/');await page.getByRole('button',{name:'Questions',exact:true}).click();
  await page.getByRole('button',{name:'+ Add question',exact:true}).click();
  await page.getByLabel('Question title').fill('Binary Search');
  await page.getByLabel('Problem context').fill('Find a target in a sorted array.');
  await page.getByLabel('Full solution code').fill('class Solution { /* sample */ }');
  await page.getByRole('button',{name:'Save',exact:true}).click();
  for(const prompt of ['What is the invariant?','What is the complexity?']){
    await page.getByRole('button',{name:'+ New flashcard'}).click();
    await page.getByLabel('Front').fill(prompt);await page.getByLabel('Back').fill('A focused answer.');await page.getByRole('button',{name:'Save',exact:true}).click();
  }
  await expect(page.locator('.study-card')).toHaveCount(2);
  await page.locator('.study-card').first().getByRole('button',{name:'Edit',exact:true}).click();
  await page.getByLabel('Back').fill('Keep the target inside the search interval.');await page.getByRole('button',{name:'Save',exact:true}).click();
  await page.locator('.study-card').first().getByRole('button',{name:'Pause'}).click();
  await expect(page.locator('.study-card').first()).toContainText('Paused');
  await page.reload();await page.getByRole('button',{name:'Card studio',exact:true}).click();await page.getByLabel('Question', {exact:true}).selectOption({label:'Binary Search'});
  await expect(page.locator('.study-card')).toHaveCount(2);
  await page.getByRole('button',{name:'Delete question',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Delete',exact:true}).click();
  await expect(page.locator('#question-select')).not.toContainText('Binary Search');
});
test('backup export and restore, malformed import leaves data unchanged',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Data & backup'}).click();
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export backup'}).click();expect((await download).suggestedFilename()).toMatch(/recallcode.*json/);
  const original=await page.evaluate(()=>localStorage.getItem('recallcode.v1'));
  await page.locator('#import-file').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{broken')});await expect(page.getByRole('status')).toContainText('not valid JSON');
  expect(await page.evaluate(()=>localStorage.getItem('recallcode.v1'))).toBe(original);
  const incoming=JSON.parse(original);incoming.questions[0].title='Restored question';
  await page.locator('#import-file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(incoming))});
  await page.getByRole('button',{name:'Replace & restore'}).click();await page.getByRole('button',{name:'Questions',exact:true}).click();await expect(page.locator('.list')).toContainText('Restored question');
});
test('corrupt saved data is retained for recovery',async({page})=>{
  await page.goto('/');await page.evaluate(()=>localStorage.setItem('recallcode.v1','{broken'));await page.reload();
  await expect(page.getByRole('alert')).toContainText('has not been overwritten');
  expect(await page.evaluate(()=>localStorage.getItem('recallcode.v1'))).toBe('{broken');
});
test('mobile layout and full code do not overflow',async({page})=>{
  await page.setViewportSize({width:375,height:812});await page.goto('/');await page.getByRole('button',{name:'Full code',exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'test-results/desktop.png',fullPage:true});
});
