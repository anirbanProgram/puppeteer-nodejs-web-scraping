const express = require('express')
const dotenv = require('dotenv')
const puppeteer = require('puppeteer-extra')
const app = express()
dotenv.config()

//SET SERVER PORT
app.set('port', process.env.PORT || 3000)


app.get('/', (req, res) => {
    try {

        puppeteer.launch({
            headless: true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox']
        }).then(async browser => {
            const page = await browser.newPage()
            //Any url of a flipkart product page
            await page.goto('https://www.flipkart.com/mi-4a-pro-80-cm-32-inch-hd-ready-led-smart-android-tv/p/itmfdwh5jyqhmvzg?pid=TVSG22C4DXQRVSTT&lid=LSTTVSG22C4DXQRVSTTJZD2M0&marketplace=FLIPKART&store=ckf%2Fczl&srno=b_1_1&otracker=browse&fm=factBasedRecommendation%2FrecentlyViewed&iid=2e03c518-b59c-482e-9fbf-8115f7f6931c.TVSG22C4DXQRVSTT.SEARCH&ppt=pp&ppn=pp&ssid=nmlbpx2eds0000001627767974182')
            await page.waitForTimeout(5000)

            let productTitle = await page.$$eval('.B_NuCI', title => title.map((title) => { return title.innerText; }));
            console.log("Title: ", productTitle[0])

            let productPrice = await page.$$eval('._30jeq3._16Jk6d', price => price.map((price) => { return price.innerText; }));
            console.log("Price: ", productPrice[0])

            await browser.close()
            
            return res.status(200).send({ "Title": productTitle[0], "Price": productPrice[0] })
        })

    } catch (error) {
        console.log(error)
    }
})

// **** FOR HTTP SERVER ****
const server = app.listen(app.get('port'), () => {
    console.log('Server started at port ' + app.get('port'))
})


module.exports = app