/**
 * 참석 의사(RSVP)를 구글 스프레드시트에 받아 적는 코드입니다.
 *
 * 쓰는 방법은 README.md 의 "참석 의사 접수 연결하기"를 보세요.
 * 요약: 하객 리스트 시트 → 확장 프로그램 → Apps Script → 이 파일 전체를 붙여넣기
 *       → setup 실행 → 배포(웹 앱, 실행: 나, 액세스: 모든 사용자)
 *       → 끝이 /exec 인 주소를 index.html 의 CONFIG.rsvpEndpoint 에 넣기
 *
 * 이 코드는 시트 주인의 권한으로 실행되므로, 하객은 로그인하지 않아도 답을 보낼 수 있습니다.
 * 시트 자체를 공개할 필요는 없습니다.
 */
const SETTINGS = {
  // 하객 리스트 시트: https://docs.google.com/spreadsheets/d/1R7I0eYxUiP7VPKBWQtJkJCMdjMoS0a2E2uRbxbTHz5s/edit
  spreadsheetId: '1R7I0eYxUiP7VPKBWQtJkJCMdjMoS0a2E2uRbxbTHz5s',
  sheetName: 'RSVP'
};
const HEADERS = ['번호','접수 날짜 (한국시간)','성함','1부 참석','2부 참석','3부 참석','미리 알려주실 것','연락처','요청 ID'];
const COL_NEEDS = 7, COL_PHONE = 8, COL_REQUEST = 9;
function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function sheet_() {
  const book = SpreadsheetApp.openById(SETTINGS.spreadsheetId);
  book.setSpreadsheetTimeZone('Asia/Seoul');
  let sheet = book.getSheetByName(SETTINGS.sheetName);
  if (!sheet) sheet = book.insertSheet(SETTINGS.sheetName);
  /* 아직 접수된 줄이 없으면 제목 줄을 새로 씁니다 (항목이 바뀌었을 때도 그대로 맞춰집니다) */
  if (sheet.getLastRow() <= 1) {
    sheet.clear();
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#2e5b4f').setFontColor('#ffffff');
    sheet.setColumnWidth(2,180);
    sheet.setColumnWidth(3,140);
    sheet.setColumnWidth(COL_NEEDS,320);
    sheet.setColumnWidth(COL_PHONE,160);
    sheet.hideColumns(COL_REQUEST);
  }
  const actual = sheet.getRange(1,1,1,HEADERS.length).getValues()[0];
  if (JSON.stringify(actual) !== JSON.stringify(HEADERS)) throw new Error('Unexpected sheet columns');
  return sheet;
}
/** 최초 1회 실행하여 권한을 승인하고 RSVP 탭을 만드세요. */
function setup() { sheet_(); }

/**
 * 받는 항목을 바꿨을 때 한 번 실행하세요.
 * 지금까지 받은 RSVP 탭은 날짜를 붙여 그대로 보관하고, 새 제목 줄로 새 탭을 만듭니다.
 */
function resetSheet() {
  const book = SpreadsheetApp.openById(SETTINGS.spreadsheetId);
  const old = book.getSheetByName(SETTINGS.sheetName);
  if (old) old.setName(SETTINGS.sheetName + '_' + Utilities.formatDate(new Date(),'Asia/Seoul','yyyyMMdd_HHmm'));
  sheet_();
}
/** 응답 내용은 외부에서 읽을 수 없으며 상태만 반환합니다. */
function doGet() { return jsonResponse_({ok:true, service:'wedding-rsvp'}); }
function validate_(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid data');
  if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 80) throw new Error('Invalid name');
  if (typeof data.needs !== 'string' || data.needs.length > 500) throw new Error('Invalid note');
  if (typeof data.phone !== 'string' || data.phone.length > 40) throw new Error('Invalid phone');
  if (typeof data.requestId !== 'string' || !/^[A-Za-z0-9-]{10,100}$/.test(data.requestId)) throw new Error('Invalid request');
  ['part1','part2','part3'].forEach(key => { if (typeof data[key] !== 'boolean') throw new Error('Invalid checkbox'); });
  return data;
}
function safeText_(text) {
  text = String(text).trim();
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}
function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 6000) throw new Error('Invalid payload');
    const data = validate_(JSON.parse(e.postData.contents));
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    const sheet = sheet_();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const match = sheet.getRange(2,COL_REQUEST,lastRow-1,1).createTextFinder(data.requestId).matchEntireCell(true).findNext();
      if (match) return jsonResponse_({ok:true, number:Number(sheet.getRange(match.getRow(),1).getValue()),requestId:data.requestId,duplicate:true});
    }
    const numbers = lastRow > 1 ? sheet.getRange(2,1,lastRow-1,1).getValues().map(row => Number(row[0]) || 0) : [];
    const number = numbers.reduce((max,n) => Math.max(max,n),0) + 1;
    const date = Utilities.formatDate(new Date(),'Asia/Seoul','yyyy-MM-dd HH:mm:ss');
    const row = lastRow + 1;
    sheet.getRange(row,3).setNumberFormat('@');
    sheet.getRange(row,COL_NEEDS).setNumberFormat('@');
    sheet.getRange(row,COL_PHONE).setNumberFormat('@');
    sheet.getRange(row,1,1,HEADERS.length).setValues([[number,date,safeText_(data.name),data.part1,data.part2,data.part3,safeText_(data.needs),safeText_(data.phone),data.requestId]]);
    SpreadsheetApp.flush();
    return jsonResponse_({ok:true,number: number,requestId:data.requestId});
  } catch (error) {
    /* 실행 기록에도 남겨 둡니다 */
    console.error('RSVP 저장 실패', error);
    /* reason 은 원인을 찾기 위한 짧은 영문 메모입니다. 하객 화면에는 보이지 않습니다. */
    return jsonResponse_({ok:false,message:'저장하지 못했습니다. 설정과 입력값을 확인해 주세요.',reason:String((error && error.message) || error)});
  } finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}
