/** Google 스프레드시트 → 확장 프로그램 → Apps Script에 붙여 넣으세요. */
const SETTINGS = {
  spreadsheetId: '1_O2tANr8eJBz49NY5AlVh8zZg84aOMTt4pL9ah9eT4I',
  sheetName: 'RSVP'
};
const HEADERS = ['번호','접수 날짜 (한국시간)','성함','신랑측/신부측','비건식 필요','1부 참석','2부 참석','3부 참석','연락처','요청 ID'];
function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function sheet_() {
  const book = SpreadsheetApp.openById(SETTINGS.spreadsheetId);
  book.setSpreadsheetTimeZone('Asia/Seoul');
  let sheet = book.getSheetByName(SETTINGS.sheetName);
  if (!sheet) sheet = book.insertSheet(SETTINGS.sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#2e5b4f').setFontColor('#ffffff');
    sheet.setColumnWidth(2,180);
    sheet.setColumnWidth(3,140);
    sheet.setColumnWidth(9,160);
    sheet.hideColumns(10);
  }
  const actual = sheet.getRange(1,1,1,HEADERS.length).getValues()[0];
  if (JSON.stringify(actual) !== JSON.stringify(HEADERS)) throw new Error('Unexpected sheet columns');
  return sheet;
}
/** 최초 1회 실행하여 권한을 승인하고 RSVP 탭을 만드세요. */
function setup() { sheet_(); }
/** 응답 내용은 외부에서 읽을 수 없으며 상태만 반환합니다. */
function doGet() { return jsonResponse_({ok:true, service:'wedding-rsvp'}); }
function validate_(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid data');
  if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 80) throw new Error('Invalid name');
  if (!['groom','bride'].includes(data.side)) throw new Error('Invalid side');
  if (typeof data.phone !== 'string' || data.phone.length > 40) throw new Error('Invalid phone');
  if (typeof data.requestId !== 'string' || !/^[A-Za-z0-9-]{10,100}$/.test(data.requestId)) throw new Error('Invalid request');
  ['vegan','part1','part2','part3'].forEach(key => { if (typeof data[key] !== 'boolean') throw new Error('Invalid checkbox'); });
  return data;
}
function safeText_(text) {
  text = String(text).trim();
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}
function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 4000) throw new Error('Invalid payload');
    const data = validate_(JSON.parse(e.postData.contents));
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    const sheet = sheet_();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const match = sheet.getRange(2,10,lastRow-1,1).createTextFinder(data.requestId).matchEntireCell(true).findNext();
      if (match) return jsonResponse_({ok:true, number:Number(sheet.getRange(match.getRow(),1).getValue()),requestId:data.requestId,duplicate:true});
    }
    const numbers = lastRow > 1 ? sheet.getRange(2,1,lastRow-1,1).getValues().map(row => Number(row[0]) || 0) : [];
    const number = numbers.reduce((max,n) => Math.max(max,n),0) + 1;
    const date = Utilities.formatDate(new Date(),'Asia/Seoul','yyyy-MM-dd HH:mm:ss');
    const row = lastRow + 1;
    sheet.getRange(row,3).setNumberFormat('@');
    sheet.getRange(row,9).setNumberFormat('@');
    sheet.getRange(row,1,1,HEADERS.length).setValues([[number,date,safeText_(data.name),data.side === 'groom' ? '신랑측' : '신부측',data.vegan,data.part1,data.part2,data.part3,safeText_(data.phone),data.requestId]]);
    SpreadsheetApp.flush();
    return jsonResponse_({ok:true,number: number,requestId:data.requestId});
  } catch (error) {
    return jsonResponse_({ok:false,message:'저장하지 못했습니다. 설정과 입력값을 확인해 주세요.'});
  } finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}
