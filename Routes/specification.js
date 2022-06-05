const express = require('express')
const router = express.Router()

const puppeteer = require('puppeteer');
const specification = router.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(req.headers.url);
        await page.click('#mainC > section > div > div.responsive-tabs > ul > li:nth-child(2) > a')
        let specification = await page.evaluate((x) => {
            let innerHTML = document.querySelectorAll('.prodSpec tr td')
            let textArray = [...innerHTML]
            let finalResult = {}
            for (let i = 0; i < textArray.length; i = i + 2) {
                finalResult[textArray[i].innerText] = textArray[i + 1].innerText
            }
            return finalResult
        })
        res.json({
            specification
        })
        // await browser.waitForTarget()
        await browser.close();
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = specification