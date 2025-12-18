const { chromium, devices } = require('@playwright/test');

  // =========================
  // ใส่ email pass ที่อยากใช้ทดสอบในช่องนี้
  // =========================
const users = [
  { email: 'bedevi7165@discounp.com', password: 'Qc_test1234' },
  { email: 'peviyoc374@discounp.com', password: 'Qc_test1234' },
  { email: 'woxokow251@discounp.com', password: 'Qc_test1234' },
  { email: 'febem77896@discounp.com', password: 'Qc_test1234' },
  { email: 'nosop18524@discounp.com', password: 'Qc_test1234' },
  { email: 'kites59327@crsay.com', password: 'Qc_test1234' },
  { email: 'feyid80432@discounp.com', password: 'Qc_test1234' },
  { email: 'mofil58552@crsay.com', password: 'Qc_test1234' },
  { email: 'moxego1735@discounp.com', password: 'Qc_test1234' },
  { email: 'civer17429@crsay.com', password: 'Qc_test1234' },
  { email: 'vojoti9516@discounp.com', password: 'Qc_test1234' },
  { email: 'raxami3071@crsay.com', password: 'Qc_test1234' },
  { email: 'dikisaw550@discounp.com', password: 'Qc_test1234' },
];

(async () => {


  // =========================
  // เปิด browser เต็มจอ
  // =========================
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'],
  });



  // =========================
  // Desktop context
  // =========================
  const desktopContext = await browser.newContext({
    viewport: null, // ใช้ขนาดจอจริง
  });



  // =========================
  // Mobile context (emulation)
  // =========================
  const mobileDevice = devices['iPhone 14'];
  const mobileContext = await browser.newContext({
    ...mobileDevice,
  });



  // =========================
  // เปิด Desktop tabs
  // =========================
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const page = await desktopContext.newPage();

    console.log(`🖥️ Desktop tab ${i + 1}: ${user.email}`);

    await page.goto('https://dc2hw.efin.finance/th/login');//ถ้าอยากเทสเว็บอื่นให้เปลี่ยน url ตรงนี้

     await page.fill('#emailOrPhone', user.email);
      await page.click('button[type="submit"]'); 
    await page.fill('#password', user.password);
    // ตั้งชื่อ tab ให้รู้ว่าเป็น user ไหน
    await page.evaluate((email) => {
      document.title = `DESKTOP | ${email}`; //sss
    }, user.email);

  }



  // =========================
  // เปิด Mobile tabs
  // =========================
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const page = await mobileContext.newPage();

    console.log(`📱 Mobile tab ${i + 1}: ${user.email}`);

    await page.goto('https://dc2hw.efin.finance/th/login');//ถ้าอยากเทสเว็บอื่นให้เปลี่ยน url ตรงนี้

    await page.fill('#emailOrPhone', user.email);
    await page.click('button[type="submit"]'); 
    await page.fill('#password', user.password);

    await page.evaluate((email) => {
      document.title = `MOBILE | ${email}`;
    }, user.email);

    // ❌ ไม่กด login
  }

})();
