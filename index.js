const chromium = require('chrome-aws-lambda');
const express = require('express');
const puppeteer = require('puppeteer-core');
const cors = require('cors');

const app = express();
const URL = 'https://batotoo.com/series/143694/why-ophelia-can-t-leave-the-duchy-official';

app.use(cors())

app.get('/', async (req, res) => {
    try {
        console.log('run');

        const browser = await puppeteer.launch({
            // headless: true,
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });
        const page = await browser.newPage();

        // Pergi ke halaman web target
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 1 * 60 * 60 * 1000 });

        // Mengambil konten HTML
        // const content = await page.content();
        // console.log(content);


        let links = await page.$$eval('.main div.p-2 a.chapt', elements => elements.map(element => element.href));

        links = links.reverse()

        res.json(links)
    } catch (error) {
        console.log('error', error);

        res.json(error)
    }
});

app.listen(3000, () => console.log('listen'));