"use strict";
// 수정할 설정은 이곳에 모아 두었습니다. 실제 계좌만 입력하세요.
const CONFIG = {
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycbwetwQiNgKdylXpBnYESJqUHxDIjlA87Jw_RYugkydROHKPX89hQdJNS38qcMehAcRU/exec",
  captions: "",
  livestream: "",
  groomAccounts: [], // 예: {name: "신랑 엄지", nameEn: "Groom Eom Ji", bank: "은행명", bankEn: "Bank", number: "계좌번호"}
  brideAccounts: []
};
const EN = {
"관악문화예절원 위치 지도":"Map of Gwanak Culture & Etiquette Center",
"엄지 ♡ 이도연 | 결혼식에 초대합니다":"Eom Ji ♡ Lee Doyeon | Wedding Invitation",
"본문 바로가기":"Skip to content", "한국어":"한국어", "가":"A",
"초대합니다":"Our invitation", "우리 두 사람":"Our families", "함께한 날들":"Our days", "예식 순서":"Programme", "안내 사항":"Good to know", "오시는 길":"Getting here", "참석 의사":"RSVP", "마음 전하실 곳":"With thanks",
"결혼식에 초대합니다":"You're invited to our wedding", "엄지":"Eom Ji", "이도연":"Lee Doyeon", "2026년 10월 24일 토요일 17시":"Saturday, October 24, 2026 · 5 PM", "관악문화예절원":"Gwanak Culture & Etiquette Center",
"함께 웃고, 이따금 다투고, 다시 손을 잡으며 여러 번의 봄과 겨울을 지나왔습니다.":"Through many springs and winters, we have laughed together, sometimes disagreed, and always found our way back to holding hands.",
"그 계절마다 곁을 지켜주신 분들이 계셨기에 오늘 이 자리를 마련할 수 있었습니다. 이제 두 사람이 서로의 가족이 되려 합니다.":"Your love and support through every season have brought us to this day. Now, we are ready to become each other's family.",
"귀한 걸음 하시어 저희의 첫날을 함께 지켜봐 주세요. 마주 앉아 따뜻한 밥 한 끼 나누어 주시면 그것으로 더없이 기쁘겠습니다.":"Please join us as we begin this new chapter. Nothing would make us happier than sharing a warm meal and this special day with you.",
"신랑":"Groom", "엄지의 아버지":"Ji's father", "엄봉호":"Eom Bongho", "엄지의 어머니":"Ji's mother", "박미성":"Park Miseong", "신부":"Bride", "이도연의 어머니":"Doyeon's mother", "정나일선":"Jeong Nailseon",
"함께한 사진은 곧 올릴 예정입니다.":"Photos of our days together are coming soon.",
"1부 · 전통혼례":"Part 1 · Traditional wedding", "17:00 – 18:00 · 관악문화예절원 마당":"5–6 PM · Center courtyard", "마당에서 진행되므로 굽이 낮은 신발을 권해드립니다.":"The ceremony takes place in the courtyard. We recommend flat or low-heeled shoes.", "예식 시작 전에 여유 있게 도착해 주세요.":"Please allow time to arrive before the ceremony begins.",
"2부 · 피로연":"Part 2 · Wedding reception", "18:00 – 19:00 · 관악문화예절원 마당":"6–7 PM · Center courtyard", "한정식 뷔페로 준비했습니다.":"A Korean buffet will be served.", "신랑이 통기타를 연주하며 축가를 부릅니다.":"The groom will sing a wedding song accompanied by his acoustic guitar.", "비건 · 채식 메뉴":"Vegan & vegetarian options", "자세한 메뉴는 추후 안내드립니다.":"Menu details will be shared soon.", "동물성 재료 없이 따로 조리합니다. 필요하신 분은 참석 의사 폼에 알려주시면 인원수만큼 준비하겠습니다.":"Vegan meals will be prepared separately without animal ingredients. Please request one in your RSVP so we can prepare enough for everyone.", "축가 가사 보기":"Read the song lyrics (Korean)",
"3부 · 피로연(2차)":"Part 3 · After-party", "편한 옷으로 갈아입고 오셔도 좋습니다.":"Feel free to change into comfortable clothes.", "인원 파악을 위해 참석 의사 폼에서 3부 참석 여부도 알려주세요.":"Please indicate whether you will join Part 3 in your RSVP.", "편하게 읽으시라고":"For comfortable reading",
"편하게 읽으실 수 있도록 글씨 크기와 언어 선택 기능을 준비했습니다. 화면 위쪽 버튼으로 글씨를 150%까지 키우실 수 있고, 한국어와 영어를 오갈 수 있습니다. 스크린리더(안드로이드 TalkBack · 아이폰 VoiceOver)로 처음부터 끝까지 읽으실 수 있으며, 사진에는 설명을 붙였습니다. 마우스 없이 키보드만으로도 모든 기능을 쓰실 수 있습니다.":"Use the buttons at the top to enlarge the text up to 150% or switch between Korean and English. The invitation includes image descriptions and keyboard controls, and can be read with screen readers such as TalkBack and VoiceOver.",
"문자통역":"Live captions", "예식 전 과정을 실시간 문자로 옮겨드립니다. 아래 링크를 휴대폰으로 열어두시면 자리에서 바로 보실 수 있습니다.":"Live captions will be provided throughout the ceremony. Open the link on your phone to follow along from your seat.", "문자통역 링크 준비 중":"Caption link coming soon", "문자통역 열기":"Open live captions", "장애인 화장실 · 이동 안내":"Accessible facilities & routes", "장애인 화장실 위치와 계단 없는 이동 경로는 확인 후 안내드리겠습니다. 도움이 필요하시면 예절원으로 문의해 주세요.":"We will share accessible restroom locations and step-free routes once confirmed. Please contact the center if you need assistance.", "온라인 중계":"Watch online", "먼 곳에서 함께해 주시는 분들을 위해 1부 전통혼례를 실시간으로 중계합니다. 예식 10분 전부터 접속하실 수 있습니다.":"For those joining us from afar, Part 1 will be livestreamed. The stream will open 10 minutes before the ceremony.", "중계 링크 준비 중":"Livestream link coming soon", "중계 보러 가기":"Watch the livestream",
"서울시 관악구 낙성대로3길 45 (봉천동)":"45 Nakseongdae-ro 3-gil, Gwanak-gu, Seoul (Bongcheon-dong)", "① 2호선 낙성대역 4번 출구":"① Nakseongdae Station · Line 2 · Exit 4", "② 마을버스 관악02번 탑승":"② Take local bus Gwanak 02 (관악02)", "③ 관악영어마을 하차":"③ Get off at Gwanak English Village (관악영어마을)", "④ 횡단보도 건너 관악문화예절원":"④ Cross at the crosswalk to the center", "카카오맵":"Kakao Map", "네이버지도":"NAVER Map", "지하철":"Subway", "2호선 낙성대역 4번 출구로 나오세요.":"Take Line 2 to Nakseongdae Station and use Exit 4.", "버스":"Bus", "마을버스 관악02번을 타고 관악영어마을에서 내린 후 횡단보도를 건너세요.":"Take local bus Gwanak 02 (관악02), get off at Gwanak English Village (관악영어마을), then cross at the crosswalk.", "주차":"Parking", "관악구민종합체육센터 주차장(유료, 공영) 이용가능, 단 주차공간이 매우 협소하오니 대중교통 이용을 권장드립니다.":"Paid public parking is available at the Gwanak Community Sports Center. Spaces are very limited, so we recommend using public transportation.",
"참석 의사 전하기":"Send your RSVP", "정성껏 준비할 수 있도록, 1·2·3부 참석 여부를 미리 알려주시면 감사하겠습니다.":"Please let us know which parts of the celebration you will attend so we can prepare for your visit.", "참석 의사 보내기":"Send your RSVP", "이 화면에서 참석 여부를 알려주실 수 있습니다.":"You can RSVP right here on this page.", "신랑에게":"For the groom", "신부에게":"For the bride", "공유하기":"Share invitation", "링크 복사":"Copy link", "엄지 · 이도연":"Eom Ji · Lee Doyeon", "참석 여부를 알려주시면":"Please send your RSVP", "정성껏 준비하겠습니다.":"so we can welcome you.", "참석 의사 전달하기":"RSVP", "참석 여부 전달":"Your RSVP", "성함 (필수)":"Name (required)", "신랑측 / 신부측 (필수)":"Guest of (required)", "신랑측":"Groom", "신부측":"Bride", "참석하시는 순서":"Which parts will you attend?", "참석이 어려우시면 모두 비워 두셔도 됩니다.":"Leave all unchecked if you cannot attend.", "비건식이 필요합니다":"I need a vegan meal", "연락처 (선택)":"Phone number (optional)", "입력하신 정보는 예식 준비와 참석 확인을 위해 사용됩니다.":"Your information will be used to prepare the wedding and confirm attendance.", "참석 여부 보내기":"Send RSVP", "참석 여부가 전달되었습니다. 감사합니다.":"Your RSVP has been received. Thank you!", "다시 작성하기":"Send another response",
"메뉴 열기":"Open menu", "메뉴 닫기":"Close menu", "청첩장 메뉴":"Invitation menu", "참석 여부 창 닫기":"Close RSVP", "글씨 크기":"Text size", "글씨 크기 100%":"Text size 100%", "글씨 크기 125%":"Text size 125%", "글씨 크기 150%":"Text size 150%", "신랑 엄지와 신부 이도연":"Groom Eom Ji and bride Lee Doyeon", "계좌 정보는 추후 안내드립니다.":"Account details will be shared soon.", "복사":"Copy", "복사되었습니다.":"Copied.", "복사하지 못했습니다. 링크나 번호를 직접 선택해 복사해 주세요.":"Could not copy. Please select the link or number and copy it manually.", "참석 접수는 준비 중입니다. 아직 전송되지 않았습니다.":"RSVP is not open yet. Your response has not been sent.", "전달 중입니다…":"Sending…", "성함을 입력해 주세요.":"Please enter your name.", "신랑측 또는 신부측을 선택해 주세요.":"Please select groom or bride.", "저장 여부를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.":"We could not confirm receipt. Please try again shortly."
}
;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const venueMap = $('#venue-map');
const venueMapKo = venueMap.getAttribute('src');
let language = 'ko';
const t = text => language === 'en' ? EN[text] || text : text;
const translations = [];
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 4500); }
function preference(key, value) { try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch {} }
function collectTranslations() {
 const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 let node;
 while ((node = walker.nextNode())) {
  if (node.parentElement.closest('script, style, #lyrics, .accounts')) continue;
  const ko = node.textContent.trim();
  if (EN[ko]) translations.push({node, ko, original: node.textContent});
 }
 $$('[aria-label], img[alt]').forEach(el => ['aria-label','alt'].forEach(attr => {
  const ko = el.getAttribute(attr); if (EN[ko]) {el.dataset[attr === 'alt' ? 'altKo' : 'ariaKo'] = ko;}
 }));
}
function setLanguage(lang) {
 language = lang === 'en' ? 'en' : 'ko'; document.documentElement.lang = language;
 venueMap.title = t('관악문화예절원 위치 지도');
 const mapSrc = language === 'en' ? venueMapKo.replaceAll('!1sko!2skr', '!1sen!2skr') : venueMapKo;
 if (venueMap.getAttribute('src') !== mapSrc) venueMap.src = mapSrc;
 translations.forEach(({node, ko, original}) => node.textContent = language === 'en' ? original.replace(ko, EN[ko]) : original);
 $$('[data-aria-ko]').forEach(el => el.setAttribute('aria-label', t(el.dataset.ariaKo)));
 $$('[data-alt-ko]').forEach(el => el.alt = t(el.dataset.altKo));
 $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === language)));
 document.title = t('엄지 ♡ 이도연 | 결혼식에 초대합니다');
 renderAccounts(); renderStatus(); updateMenuLabel(); preference('wedding-language', language);
}
function setSize(value) {
 const size = [1, 1.25, 1.5].includes(Number(value)) ? Number(value) : 1;
 document.documentElement.style.fontSize = `${16 * size}px`; document.documentElement.dataset.size = size;
 $$('[data-size]').filter(el => el.tagName === 'BUTTON').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.size) === size)));
 preference('wedding-text-size', String(size));
}
function renderAccounts() {
 $$('.accounts').forEach(box => {
  box.replaceChildren(); const rows = CONFIG[box.dataset.group] || [];
  if (!rows.length) { const p=document.createElement('p'); p.className='pending'; p.textContent=t('계좌 정보는 추후 안내드립니다.'); box.append(p); }
  rows.forEach(row => {
   const card = document.createElement('div'); card.className='account';
   const name = document.createElement('p'); name.textContent=language === 'en' ? row.nameEn || row.name : row.name;
   const number = document.createElement('p'); number.textContent=`${language === 'en' ? row.bankEn || row.bank : row.bank} ${row.number}`;
   const button = document.createElement('button'); button.type='button'; button.textContent=t('복사'); button.addEventListener('click',()=>copy(row.number));
   card.append(name,number,button); box.append(card);
  });
 });
}
async function copy(value) { try { await navigator.clipboard.writeText(value); toast(t('복사되었습니다.')); } catch { toast(t('복사하지 못했습니다. 링크나 번호를 직접 선택해 복사해 주세요.')); } }
function updateMenuLabel() { $('.menu-toggle').setAttribute('aria-label', t($('#menu').hidden ? '메뉴 열기' : '메뉴 닫기')); }
function closeMenu() { $('#menu').hidden=true; $('.menu-toggle').setAttribute('aria-expanded','false'); updateMenuLabel(); }
$('.menu-toggle').addEventListener('click',()=>{ $('#menu').hidden=!$('#menu').hidden; $('.menu-toggle').setAttribute('aria-expanded',String(!$('#menu').hidden)); updateMenuLabel(); });
$$('#menu a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && !$('#menu').hidden){closeMenu();$('.menu-toggle').focus();}});
$('#lyrics-toggle').addEventListener('click',()=>{ $('#lyrics').hidden=!$('#lyrics').hidden; $('#lyrics-toggle').setAttribute('aria-expanded',String(!$('#lyrics').hidden)); });
$$('[data-config-link]').forEach(a=>{ const key=a.dataset.configLink; if (/^https:\/\//.test(CONFIG[key])) {a.href=CONFIG[key];a.target='_blank';a.rel='noopener';a.textContent=key==='captions'?'문자통역 열기':'중계 보러 가기';} else a.setAttribute('aria-disabled','true'); });
let returnFocus;
const modal = $('#rsvp-modal');
function openRsvp() {closeMenu(); returnFocus=document.activeElement; modal.showModal();document.body.classList.add('modal-open');$('#rsvp-name').focus();}
function closeRsvp() {modal.close();}
modal.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus();});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeRsvp();}});
$$('[data-open-rsvp]').forEach(b=>b.addEventListener('click',openRsvp));
$('[data-close]').addEventListener('click',closeRsvp);
let pending = false, statusKey = '', pendingRequest = null;
function renderStatus() { $('#rsvp-status').textContent=t(statusKey); $('#rsvp-submit').textContent=t(pending?'전달 중입니다…':'참석 여부 보내기'); }
const newRequestId=()=>crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
$('#rsvp-form').addEventListener('submit', async e=>{
 e.preventDefault();if(pending)return;
 const data=new FormData(e.currentTarget);
 const payload={name:String(data.get('name')||'').trim(),side:data.get('side'),phone:String(data.get('phone')||'').trim(),vegan:data.has('vegan'),part1:data.has('part1'),part2:data.has('part2'),part3:data.has('part3')};
 if(!payload.name){statusKey='성함을 입력해 주세요.';renderStatus();$('#rsvp-name').focus();return;}
 if(!['groom','bride'].includes(payload.side)){statusKey='신랑측 또는 신부측을 선택해 주세요.';renderStatus();return;}
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(CONFIG.rsvpEndpoint)){statusKey='참석 접수는 준비 중입니다. 아직 전송되지 않았습니다.';renderStatus();return;}
 const fingerprint=JSON.stringify(payload);
 if(!pendingRequest || pendingRequest.fingerprint!==fingerprint)pendingRequest={fingerprint,id:newRequestId()};
 payload.requestId=pendingRequest.id;
 pending=true;statusKey='';$('#rsvp-submit').disabled=true;renderStatus();
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
 try{
  const response=await fetch(CONFIG.rsvpEndpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),signal:controller.signal,redirect:'follow'});
  if(!response.ok)throw new Error('HTTP failure');
  const result=await response.json();
  if(result.ok!==true || result.requestId!==payload.requestId || !Number.isInteger(result.number) || result.number<1)throw new Error('Receipt not confirmed');
  $('#rsvp-form').hidden=true;$('#rsvp-success').hidden=false;$('#rsvp-success').focus();pendingRequest=null;
 }catch{statusKey='저장 여부를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.';}
 finally{clearTimeout(timeout);pending=false;$('#rsvp-submit').disabled=false;renderStatus();}
});
$('#rsvp-reset').addEventListener('click',()=>{$('#rsvp-form').reset();$('#rsvp-form').hidden=false;$('#rsvp-success').hidden=true;statusKey='';pendingRequest=null;renderStatus();$('#rsvp-name').focus();});
$$('[data-copy-link]').forEach(b=>b.addEventListener('click',()=>copy(location.href.split('#')[0])));
$$('[data-share]').forEach(b=>b.addEventListener('click',async()=>{try{if(navigator.share)await navigator.share({title:document.title,url:location.href.split('#')[0]});else await copy(location.href.split('#')[0]);}catch(e){if(e.name!=='AbortError')await copy(location.href.split('#')[0]);}}));
collectTranslations();
$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
$$('button[data-size]').forEach(b=>b.addEventListener('click',()=>setSize(b.dataset.size)));
setLanguage(preference('wedding-language'));setSize(preference('wedding-text-size'));
new ResizeObserver(entries=>document.documentElement.style.setProperty('--bar-height',`${entries[0].target.getBoundingClientRect().height}px`)).observe($('.rsvp-bar'));
if(new URLSearchParams(location.search).get('act')==='attend')openRsvp();
