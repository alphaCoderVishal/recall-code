import {format} from 'prettier';
import {writeFile} from 'node:fs/promises';
for(const name of ['arrays','structures','graph-dp']){
 const {default:items}=await import(`../src/catalog/${name}.js`);
 for(const q of items)q.code=await format(q.code,{parser:'java',plugins:['prettier-plugin-java'],tabWidth:4});
 await writeFile(`src/catalog/${name}.js`,'// Original curated study guides; source provenance is in docs/research-'+name+'.md\nexport default '+JSON.stringify(items,null,2)+';\n');
}
