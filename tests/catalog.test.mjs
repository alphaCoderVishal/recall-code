import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCatalog} from '../scripts/catalog.mjs';
import {TYPES,validateData,dueCards,DAY} from '../src/model.js';
const questions=await buildCatalog();
const {enrollQuestion,packData,unpackData}=await import('../src/catalog.js');
test('250 distinct complete questions with specific recall cards and executable cases',()=>{
  assert.equal(questions.length,250);assert.equal(new Set(questions.map(q=>q.number)).size,250);assert.equal(new Set(questions.map(q=>q.slug)).size,250);
  for(const q of questions){
    assert.match(q.id,/^lc-\d+$/);assert.equal(q.id,`lc-${q.number}`);assert.match(q.slug,/^[a-z0-9-]+$/);
    for(const key of ['title','context','examples','solution','timeComplexity','spaceComplexity','pitfall','followUp','code','testCode'])assert.ok(typeof q[key]==='string'&&q[key].trim().length>0,`${q.id}: ${key}`);
    assert.ok(q.cards.length>=3&&q.cards.length<=5,`${q.id} card count`);
    assert.equal(new Set(q.cards.map(c=>c.front)).size,q.cards.length);
    for(const card of q.cards){assert.ok(TYPES.includes(card.type),q.id);assert.ok(card.front.length>10&&card.back.length>10,q.id);}
    assert.match(q.code,/class\s+\w+/);assert.match(q.testCode,/AssertionError/);
  }
});
test('catalog enrollment is idempotent and existing user edits survive',()=>{
  let data={version:1,questions:[],cards:[],history:[]};data=enrollQuestion(data,questions[0].id);validateData(data);
  data.questions[0].notes='My own note';const again=enrollQuestion(data,questions[0].id);assert.equal(again,data);assert.equal(again.questions[0].notes,'My own note');
});
test('compact cloud snapshot roundtrip preserves code, custom edits and review state',()=>{
  let data={version:1,questions:[],cards:[],history:[]};for(const q of questions.slice(0,10))data=enrollQuestion(data,q.id);
  data.questions[0].notes='Personal';data.cards[0].back='My own explanation';data.cards[0].reviews=2;
  const compact=packData(data),restored=unpackData(compact);assert.deepEqual(restored.questions,data.questions);assert.deepEqual(restored.cards,data.cards);
  assert.ok(JSON.stringify(compact).length<JSON.stringify(data).length*.6);
});
test('daily new-card budget persists across review sessions; old cards remain due',()=>{
  let data={version:1,questions:[],cards:[],history:[],settings:{newCardsPerDay:2}};
  for(const q of questions.slice(0,3))data=enrollQuestion(data,q.id,0);
  const now=new Date(2026,9,20,12).getTime();assert.equal(dueCards(data,now).length,2);
  const c=data.cards[0];c.reviews=1;c.due=now+DAY;data.history.push({cardId:c.id,at:now,rating:'Good'});assert.equal(dueCards(data,now).length,1);
  data.settings.newCardsPerDay=0;c.due=0;assert.equal(dueCards(data,now).length,1);
});
