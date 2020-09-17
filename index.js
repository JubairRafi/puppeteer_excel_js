

const puppeteer = require('puppeteer');
const xlsx = require("xlsx");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const page1 = await browser.newPage();
  await page1.setViewport({
  width: 1000,
  height: 1000,
  deviceScaleFactor: 1,
    });
  await page1.goto('https://www.google.com/search?q=happy+birthday+wish&safe=active&sxsrf=ALeKk003D35znQH14OFbkRICdmx78NaDwg:1600267937676&source=lnms&tbm=isch&sa=X&ved=2ahUKEwivweHP9u3rAhXDILcAHX9YCEsQ_AUoAXoECA4QAw&biw=1536&bih=750#imgrc=ie_rIFO4Fy0nWM');
  await page1.screenshot({path: 'test.png'});


  await page.goto('https://www.proflowers.com/blog/happy-birthday-quotes');
  const result = await page.evaluate(() => {
      let headingFromWeb = document.querySelectorAll(".quote_text")
      const headingList = [...headingFromWeb];
      return headingList.map(h=>h.innerText);
      });


    const arrayOfArrayLinks = result.map(l=>[l]);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(arrayOfArrayLinks);
    xlsx.utils.book_append_sheet(wb,ws);
    xlsx.writeFile(wb,"birthdaywish.xlsx");

  await browser.close();
})();
