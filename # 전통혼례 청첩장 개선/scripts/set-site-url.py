"""배포 주소를 정적 HTML OG 메타태그에 반영: python3 scripts/set-site-url.py https://your-domain.example/"""
from pathlib import Path
from urllib.parse import urlsplit, urljoin
import re, sys, html
if len(sys.argv) != 2:
    raise SystemExit('사용법: python3 scripts/set-site-url.py https://실제-배포-주소/')
url = sys.argv[1]
p = urlsplit(url)
if p.scheme != 'https' or not p.netloc or p.query or p.fragment or p.username or p.password:
    raise SystemExit('쿼리/해시/계정 정보 없는 실제 HTTPS 페이지 주소를 입력하세요.')
root = Path(__file__).resolve().parent.parent
file = root / 'index.html'
s = file.read_text()
image = html.escape(urljoin(url, 'assets/og-wedding.jpg'), quote=True)
for attr in ['property="og:image"','name="twitter:image"']:
    s = re.sub(r'(<meta '+attr+r' content=")[^"]*(")',lambda m: m[1]+image+m[2],s)
s = re.sub(r'<meta property="og:url"[^>]*>\s*','',s)
s = re.sub(r'<link rel="canonical"[^>]*>\s*','',s)
value = html.escape(url, quote=True)
s = s.replace('</head>', '<meta property="og:url" content="'+value+'"><link rel="canonical" href="'+value+'"></head>')
file.write_text(s)
print('정적 OG 주소 반영 완료:', file.name)
