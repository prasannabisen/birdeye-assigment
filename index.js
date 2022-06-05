const express = require('express')
const app = express()

const puppeteer = require('puppeteer');

app.get('/specification', async (req, res) => {
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
})

app.get('/review', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.headers.url);
    let check = await page.evaluate(() => { //checking wether review button is on the page or not 
        if (document.querySelectorAll('#reviewtab > a').length != 0) {
            return true
        }
        return false
    })
    if (!check) {
        res.status(404).send({ error: "No review found" })
        return
    }
    await page.click('#reviewtab > a')
    let review = await page.evaluate((x) => {
        let FirstReview = document.querySelectorAll('#customerReviews > div > div.rightCol > blockquote > h6')
        FirstReview = [...FirstReview]
        let description = document.querySelectorAll('#customerReviews > div > div.rightCol > blockquote > p')
        description = [...description]
        let overallReview = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.itemReview > dd:nth-child(2) > div > strong')
        overallReview = [...overallReview]
        let valueReview = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.itemReview > dd:nth-child(4)')
        valueReview = [...valueReview]
        let featureReview = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.itemReview > dd:nth-child(6)')
        featureReview = [...featureReview]
        let qualityReview = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.itemReview > dd:nth-child(8)')
        qualityReview = [...qualityReview]
        let performanceReview = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.itemReview > dd:nth-child(10)')
        performanceReview = [...performanceReview]
        let name = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.reviewer > dd:nth-child(2)')
        name = [...name]
        let date = document.querySelectorAll('#customerReviews > div > div.leftCol > dl.reviewer > dd:nth-child(4)')
        date = [...date]
        let finalResult = []
        for (let i = 0; i < FirstReview.length; i++) {
            finalResult.push({
                'Name': name[i].innerText,
                'Date': date.innerText,
                'Review': FirstReview[i].innerText,
                'review description': description[i].innerText,
                'overall rating': overallReview[i].innerText,
                'value rating': valueReview[i].innerText,
                'feature rating': featureReview[i].innerText,
                'quality rating': qualityReview[i].innerText,
                'performance rating': performanceReview[i].innerText
            })
        }
        return finalResult
    })
    res.json({
        review
    })
    await browser.close();
})

app.get('/warrenty', async (req, res) => {
    const browser = await puppeteer.launch({ headless: false });
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
        for (let i = 0; i < textArray.length; i++) {
            finalResult.push({
                'description': textArray[i].innerText,
                'price': price[i].innerText
            })
        }
        return finalResult
    })
    res.json({
        warrenty
    })
    await browser.close();
})

app.listen(3000, () => { console.log("connected") })