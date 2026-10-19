import { test, expect } from '@playwright/test';
import { profileView } from '../../src/profile.js';
import { readFile } from 'node:fs/promises';

test('login navigation opens a dedicated guest profile', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Login',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Your account, your practice.'})).toBeVisible();
  await expect(page.getByText('Sign in to view your profile and keep your progress across devices.')).toBeVisible();
});

test('signed-in profile renders safe identity, stats and mobile layout', async ({page}) => {
  const user = {email:'learner@example.com',created_at:'2026-10-01T00:00:00Z',user_metadata:{full_name:'<img src=x> Learner'},identities:[{provider:'google'}]};
  await page.setContent('<main>'+profileView(user,{reviewed:12,strong:8,attempts:24},4,'<section class="account-panel"><h2>Account & sync</h2><p>Synced</p><button>Sign out</button></section>')+'</main>');
  await page.addStyleTag({content:(await readFile('src/styles.css','utf8')).replace(/@import[^;]+;/,'')});
  await expect(page.getByRole('heading',{name:'<img src=x> Learner'})).toBeVisible();
  await expect(page.locator('img')).toHaveCount(0);
  await expect(page.getByText('learner@example.com')).toBeVisible();
  await expect(page.getByRole('button',{name:'Manage leaderboard profile'})).toBeVisible();
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/profile-mobile.png',fullPage:true});
});
