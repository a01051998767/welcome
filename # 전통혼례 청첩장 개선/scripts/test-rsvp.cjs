// 외부 Google 시트에 쓰지 않고 서버 검증·재시도 중복 방지·순번을 확인합니다.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const rows=[];let locked=false;
function range(r,c,n=1,m=1){return {
 getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>rows[r+i-1]?.[c+j-1]??'')),
 getValue:()=>rows[r-1]?.[c-1],
 setValues(values){values.forEach((row,i)=>{rows[r+i-1]??=[];row.forEach((v,j)=>rows[r+i-1][c+j-1]=v);});return this;},
 setFontWeight(){return this},setBackground(){return this},setFontColor(){return this},setNumberFormat(){return this},
 createTextFinder(value){return {matchEntireCell(){return this},findNext(){const i=rows.findIndex((row,i)=>i>=r-1&&i<r-1+n&&row[c-1]===value);return i<0?null:{getRow:()=>i+1};}};}
};}
const sheet={getLastRow:()=>rows.length,appendRow:r=>rows.push(r),setFrozenRows(){},getRange:range,setColumnWidth(){},hideColumns(){}};
const context=vm.createContext({ContentService:{MimeType:{JSON:'json'},createTextOutput(text){return{setMimeType:()=>JSON.parse(text)}}},SpreadsheetApp:{openById:()=>({setSpreadsheetTimeZone(){},getSheetByName:()=>sheet}),flush(){}},Utilities:{formatDate:()=> '2026-09-12 17:00:00'},LockService:{getScriptLock:()=>({waitLock(){locked=true},hasLock:()=>locked,releaseLock(){locked=false}})}});
vm.runInContext(fs.readFileSync('scripts/Code.gs','utf8'),context);
const base={name:'테스트',side:'groom',phone:'',vegan:true,part1:true,part2:false,part3:false,requestId:'test-request-0001'};
const post=data=>context.doPost({postData:{contents:JSON.stringify(data)}});
assert.equal(post({...base,name:' '}).ok,false);assert.equal(rows.length,0);
assert.equal(post({...base,side:'other'}).ok,false);
assert.equal(post({...base,vegan:'true'}).ok,false);
assert.equal(post(base).number,1);assert.equal(rows.length,2);assert.equal(rows[1][8],'');assert.equal(rows[1][4],true);
assert.equal(post(base).duplicate,true);assert.equal(rows.length,2);
assert.equal(post({...base,requestId:'test-request-0002',name:'=1+1',phone:'+82-10-1234-5678',side:'bride'}).number,2);
assert.equal(rows[2][2],"'=1+1");assert.equal(rows[2][8],"'+82-10-1234-5678");assert.equal(rows[2][3],'신부측');assert.equal(locked,false);
assert.equal(context.doPost({postData:{contents:'{broken'}}).ok,false);
assert.equal(context.doPost({postData:{contents:'x'.repeat(4001)}}).ok,false);
assert.equal(context.doGet().service,'wedding-rsvp');
console.log('PASS: required fields, checkbox types, optional phone, numbering, request deduplication, formula escaping, malformed input, lock release, no data disclosure.');
