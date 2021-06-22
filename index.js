const puppeteer = require('puppeteer');
const fs = require('fs');

async function main() {
    const browser = await puppeteer.launch({
        args : [
            '--disable-setuid-sandbox',
            '--no-sandbox',
            // '--single-process'
        ]
    });

    const page = await browser.newPage();

    page.on('console', (msg) => {
        for (let i = 0; i < msg.args().length; ++i) {
            console.log(`${i}: ${msg.args()[i]}`);
        }
    });

    page.on('error', err => console.log(err));

    page.on('response', response => {
        console.log(response.status());
        console.log(response.url());
    });

    await page.goto('http://localhost:5000/index.html', { waitUntil : 'networkidle0' });

    await page.close();
    await browser.close();
}

main().then(() => process.exit(0));
