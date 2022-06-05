const express = require('express')
const router = express.Router()

const puppeteer = require('puppeteer');

const warrenty = router.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.setViewport({ deviceScaleFactor: 1 })
        await page.goto(req.headers.url);
        await page.click('#warrantytab > a')
        let warrenty = await page.evaluate((x) => {
            let innerHTML = document.querySelectorAll('#options > div > div.col-9.col-md-10 > label')
            let price = document.querySelectorAll('#options > div > div.col-3.col-md-2')
            price = [...price]
            let textArray = [...innerHTML]
            let finalResult = []
            if(textArray.length == 0){
                res.status(404).send({ error: "No warrenty found" })
            }
            for (let i = 0; i < textArray.length; i++) {
                finalResult.push({
                    'description': textArray[i].innerText,
                    'price': price[i].innerText
                })
            }
            return finalResult
        })
        res.status(200).json({
            warrenty
        })
        await browser.close();
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = warrenty