const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const port = 3578

app.get('/', async (req, res) => {
  console.log(`New request!`)
  if(req.query.url != undefined){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
    const page = await browser.newPage();
    console.log('entrando')
    await page.goto(req.query.url, {
      waitUntil: 'networkidle2', 
      

    });
    await page.pdf({ path: 'relatorio.pdf', format: 'a4' });
  
    await browser.close();  

    return res.download('relatorio.pdf');
  }else{
    return 'informe uma url'
  }
})
app.get('/ping', async (req, res) => {
  res.send('ok')
})

app.listen(process.env.PORT || 80, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

//var http = require("https");
//setInterval(function() {
//    http.get("https://checksegpdf.herokuapp.com/ping"); 
//}, 900000); // every 15 minutes (900000)
