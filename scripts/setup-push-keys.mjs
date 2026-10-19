import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
if((await readFile('worker/wrangler.toml','utf8')).includes('VAPID_PUBLIC_KEY'))throw new Error('Keys already configured. Do not rotate active subscriptions accidentally.');
const pair=await crypto.subtle.generateKey({name:'ECDSA',namedCurve:'P-256'},true,['sign','verify']);
const jwk=await crypto.subtle.exportKey('jwk',pair.privateKey);
const publicKey=Buffer.from(await crypto.subtle.exportKey('raw',pair.publicKey)).toString('base64url');
const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','secret','put','VAPID_PRIVATE_KEY','--config','worker/wrangler.toml'],{input:jwk.d,encoding:'utf8'});
if(result.status!==0){console.error('Could not store VAPID secret.');process.exit(1);}
const file=await readFile('worker/wrangler.toml','utf8');await writeFile('worker/wrangler.toml',file.replace('[vars]','[vars]\nVAPID_PUBLIC_KEY = "'+publicKey+'"'));
console.log('VAPID private key stored in Cloudflare; public key added to configuration.');

