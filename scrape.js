// in a new folder be sure to run "npm init -y" and "npm install puppeteer"
const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://en.wikipedia.org/wiki/Chiang_Kai-shek", {waitUntil : 'domcontentloaded'})

    const photoNames = await page.evaluate(() => {
        const imageNames = Array.from(document.querySelectorAll(".thumbcaption"))
        let nameArray = [...imageNames]
        fs.writeFile(names.txt, nameArray.map(h=>h.innerText));
    })

    const photos = await page.$$eval("img", imgs => {
        return imgs.map(x => x.src)
    })

    for (const photo of photos) {
        const imagepage = await page.goto(photo)
        const filename = "images"
        await fs.writeFile(filename + "/" + photo.split("/").pop(), await imagepage.buffer(), function(err){
            if (err) throw err;
        })
    }

    await browser.close()
}

start()
