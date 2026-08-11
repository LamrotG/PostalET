/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dataPath = path.join(repoRoot, 'public', 'postal.json');
if (!fs.existsSync(dataPath)) { console.error('postal.json missing'); process.exit(1); }
const places = JSON.parse(fs.readFileSync(dataPath,'utf8'));

function normalize(text){
  return String(text||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}

function searchByName(q){
  const n = normalize(q);
  const condensed = n.replace(/\s+/g,'');
  return places.filter(p => {
    const target = normalize(p.name||p.search_text||p.full_name || '');
    return target.includes(n) || target.replace(/\s+/g,'').includes(condensed);
  }).slice(0,10);
}

function levenshtein(a,b){
  const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=0;i<=m;i++)dp[i][0]=i; for(let j=0;j<=n;j++)dp[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){ const cost=a[i-1]===b[j-1]?0:1; dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost); }
  return dp[m][n];
}

function fuzzySearch(q){
  const n=normalize(q); const cq=n.replace(/\s+/g,'');
  const res=[];
  for(const p of places){
    const target = normalize(p.name||p.search_text||p.full_name||'');
    const ct=target.replace(/\s+/g,'');
    const d=levenshtein(cq,ct);
    if(d<=2) res.push({p,d});
  }
  res.sort((a,b)=>a.d-b.d);
  return res.map(r=>r.p).slice(0,10);
}

const queries = ['Addis Ababa','Addisababa','Mekelle','NonexistentPlace'];
for(const q of queries){
  const res = searchByName(q);
  console.log(`Query: ${q} -> ${res.length} results`);
  if (res.length>0) console.log(' Sample:', res[0].name);
  if (res.length===0) {
    const fr=fuzzySearch(q);
    console.log(` Fuzzy -> ${fr.length} results`, fr.length?(' Sample: '+fr[0].name):'');
  }
}
