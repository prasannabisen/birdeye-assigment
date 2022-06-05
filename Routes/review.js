const express = require('express')
const router = express.Router()

const puppeteer = require('puppeteer');
const review = router.get('/', async (req, res) => {
    try {
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
        res.status(200).json({
            review
        })
        await browser.close();
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = review