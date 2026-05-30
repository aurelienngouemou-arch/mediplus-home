import { chromium, devices } from 'playwright';

const iPhone = devices['iPhone 13'];
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ ...iPhone });
const page = await context.newPage();

// 1. Login
await page.goto('http://localhost:3000/admin/login');
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/01_login.png' });
await page.fill('input[type="email"]', 'test.admin@mediplus-home.local');
await page.fill('input[type="password"]', 'l6JxQYb(xf)oXyaBh$^i');
await page.click('button[type="submit"]');
await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/02_dashboard.png' });

// 2. Navigate to Ma Tournée
await page.goto('http://localhost:3000/admin/tournee');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/03_tournee.png' });

// 3. Open VisiteForm dialog
const btn = page.locator('button:has-text("Nouvelle visite")').first();
await btn.click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/04_visite_dialog.png' });

// 4. Check patient native select exists and interact
const patientSelect = page.locator('select').first();
const patientCount = await patientSelect.locator('option').count();
console.log('Patient options count:', patientCount);

// Select a patient if available
if (patientCount > 1) {
  await patientSelect.selectOption({ index: 1 });
  await page.waitForTimeout(500);
  console.log('Patient selected:', await patientSelect.inputValue());
}
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/05_patient_selected.png' });

// 5. Check acte select
const acteSelect = page.locator('select').nth(1);
const acteCount = await acteSelect.locator('option').count();
console.log('Acte options count:', acteCount);
await acteSelect.selectOption({ index: 1 });
await page.waitForTimeout(300);
console.log('Acte selected:', await acteSelect.inputValue());
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/06_acte_selected.png' });

// 6. Test "Autre" option
await acteSelect.selectOption({ value: 'autre' });
await page.waitForTimeout(300);
const autrInput = page.locator('input[placeholder="Décrire l\'acte…"]');
const autrVisible = await autrInput.isVisible();
console.log('Champ Autre visible:', autrVisible);
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/07_autre_acte.png' });

// 7. Check other modules
await page.goto('http://localhost:3000/admin/patients');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/08_patients.png' });

await page.goto('http://localhost:3000/admin/demandes');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: 'C:/Users/PC/AppData/Local/Temp/09_demandes.png' });

await browser.close();
console.log('DONE');
