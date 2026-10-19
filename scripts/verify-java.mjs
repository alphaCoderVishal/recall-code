import {readCatalog} from './catalog.mjs';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import {resolve,join,sep} from 'node:path';
import {spawn} from 'node:child_process';
const questions=await readCatalog(),base=resolve('.java-verification'),project=resolve('.');
if(!base.startsWith(project+sep)||base===project)throw new Error('Unsafe verification directory');
await rm(base,{recursive:true,force:true});await mkdir(join(base,'classes'),{recursive:true});
const files=[];
const helper=`class ListNode {int val;ListNode next;ListNode(){}ListNode(int v){val=v;}ListNode(int v,ListNode n){val=v;next=n;}}
class TreeNode {int val;TreeNode left,right;TreeNode(){}TreeNode(int v){val=v;}TreeNode(int v,TreeNode l,TreeNode r){val=v;left=l;right=r;}}`;
for(const q of questions){
  const pkg=`p${q.number}`,dir=join(base,pkg);await mkdir(dir,{recursive:true});
  const name=q.code.match(/public\s+class\s+(\w+)/)?.[1]||'Solution';
  let code=`package ${pkg};\n${q.code}\n`;
  for(const node of ['ListNode','TreeNode'])if(new RegExp(`\\b${node}\\b`).test(q.code)&&!new RegExp(`class\\s+${node}\\b`).test(q.code))code+=helper.split('\n').find(line=>line.startsWith(`class ${node}`))+'\n';
  const source=join(dir,name+'.java'),verify=join(dir,'TestMain.java');
  await writeFile(source,code);await writeFile(verify,`package ${pkg};\nimport java.util.*;\npublic class TestMain { public static void main(String[] args) throws Exception {\n${q.testCode}\n}}`);files.push(source,verify);
}
function run(command,args,timeout=120000){return new Promise((resolve,reject)=>{const child=spawn(command,args,{windowsHide:true});let output='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);const timer=setTimeout(()=>{child.kill();reject(new Error('Process timed out'));},timeout);child.on('error',e=>{clearTimeout(timer);reject(e)});child.on('exit',code=>{clearTimeout(timer);resolve({code,output})});});}
const argfile=join(base,'sources.txt');await writeFile(argfile,files.map(f=>`"${f.replaceAll('\\','/')}"`).join('\n'));
const compiled=await run('javac',['--release','17','-encoding','UTF-8','-d',join(base,'classes'),'@'+argfile]);
if(compiled.code){console.error(compiled.output);process.exit(1);}
let next=0;const failures=[];
await Promise.all(Array.from({length:6},async()=>{while(next<questions.length){const q=questions[next++],result=await run('java',['-cp',join(base,'classes'),`p${q.number}.TestMain`],15000);if(result.code)failures.push({id:q.id,error:result.output});}}));
await mkdir('docs',{recursive:true});
await writeFile('docs/java-verification.json',JSON.stringify({verifiedAt:new Date().toISOString(),javaTarget:17,questionCount:questions.length,passed:questions.length-failures.length,failures},null,2)+'\n');
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exit(1);}
console.log(`Compiled ${questions.length} Java solutions; all ${questions.length} example/edge-case test programs passed.`);
