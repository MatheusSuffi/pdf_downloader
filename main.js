const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const port = 3578

app.get('/new_report', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.url, {
      waitUntil: 'networkidle2',
    });
    await page.pdf({ path: 'relatorio.pdf', format: 'a4' });
  
    await browser.close();  

    return res.download('relatorio.pdf');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})