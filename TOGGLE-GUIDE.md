# 🔄 คู่มือเปิด-ปิดเว็บ Cside

ใช้ Worker script ที่ `src/index.js` แยก routing ตาม hostname

| URL | ปกติเห็นอะไร |
|---|---|
| `csidescrubs.com` / `www.csidescrubs.com` | **Coming Soon** (จนกว่าจะ launch) |
| `cside-static.csidescrub.workers.dev` | **เว็บจริง** (ทุกหน้า public/) — ใช้ preview/edit |

ดังนั้น workers.dev URL ใช้แก้/เช็คเว็บได้ตลอดเหมือนเดิม โดย csidescrubs.com ยังขึ้น Coming Soon

---

## 📁 โครงสร้าง

```
02-Website/cside-static/
├── public/                    ← เว็บจริง (ทุกหน้า)
├── coming-soon/               ← (ไม่ใช้แล้ว — เก็บ backup)
├── src/
│   └── index.js               ← Worker routing logic
├── wrangler.toml
└── TOGGLE-GUIDE.md            ← (คู่มือนี้)
```

---

## 🟢 LAUNCH — เปิดเว็บจริงที่ csidescrubs.com

แก้ใน `src/index.js` บรรทัด:

```js
const COMING_SOON_HOSTS = ['csidescrubs.com', 'www.csidescrubs.com'];
```

เปลี่ยนเป็น:

```js
const COMING_SOON_HOSTS = [];
```

แล้ว deploy:

```bash
cd /Users/macbook/Desktop/CYN/Cside/02-Website/cside-static
npx wrangler deploy
```

→ `csidescrubs.com` จะกลายเป็นเว็บจริง

---

## 🔴 ปิดกลับ — Coming Soon

แก้กลับใน `src/index.js`:

```js
const COMING_SOON_HOSTS = ['csidescrubs.com', 'www.csidescrubs.com'];
```

แล้ว deploy:

```bash
npx wrangler deploy
```

---

## 🛠️ แก้/preview เว็บจริงตอนยัง Coming Soon

แค่เปิด **https://cside-static.csidescrub.workers.dev/** — ทุกหน้าใช้งานได้
- https://cside-static.csidescrub.workers.dev/women/
- https://cside-static.csidescrub.workers.dev/men/
- https://cside-static.csidescrub.workers.dev/new-doctor/
- ... ฯลฯ

แก้ไฟล์ใน `public/` แล้ว `npx wrangler deploy` ก็เห็นที่ workers.dev ทันที

---

## 🎨 แก้ Coming Soon page

หน้า Coming Soon อยู่ในตัว worker script `src/index.js`
- แก้ HTML ในตัวแปร `COMING_SOON_HTML`
- Deploy ใหม่

---

## ⚠️ Troubleshoot

**ปัญหา: deploy แล้วยังขึ้นแบบเดิม**
- รอ ~30 วินาที แล้ว hard refresh (Cmd+Shift+R)
- หรือลอง incognito mode

**ปัญหา: workers.dev ขึ้น Coming Soon ด้วย**
- เช็คว่า `COMING_SOON_HOSTS` มีแค่ `csidescrubs.com` / `www.csidescrubs.com`
- ❌ ห้ามใส่ `cside-static.csidescrub.workers.dev` ใน array
