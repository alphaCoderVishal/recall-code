import test from 'node:test';import assert from 'node:assert/strict';import {questionProgress,progressSummary} from '../src/progress.js';
test('question colors follow latest ratings and paused cards; repeat attempts do not inflate completed cards',()=>{
 const data={questions:[{id:'q'}],cards:[{id:'a',questionId:'q',reviews:0,suspended:false},{id:'b',questionId:'q',reviews:0,suspended:false}],history:[]};
 assert.equal(questionProgress(data,'q').state,'new');
 data.cards[0].reviews=2;data.history=[{cardId:'a',rating:'Again',at:1},{cardId:'a',rating:'Good',at:2}];assert.equal(questionProgress(data,'q').state,'learning');assert.equal(progressSummary(data).reviewed,1);assert.equal(progressSummary(data).attempts,2);
 data.cards[1].reviews=1;data.history.push({cardId:'b',rating:'Again',at:3});assert.equal(questionProgress(data,'q').state,'retry');
 data.history.push({cardId:'b',rating:'Easy',at:4});assert.equal(questionProgress(data,'q').state,'strong');
 data.history.push({cardId:'b',rating:'Hard',at:5});assert.equal(questionProgress(data,'q').state,'learning');
 data.cards[1].suspended=true;assert.equal(questionProgress(data,'q').state,'strong');
});
