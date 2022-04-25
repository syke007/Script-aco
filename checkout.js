const puppeter = require('puppeteer');
const rand_url = "https://www.supremenewyork.com/shop/accessories/cg5m40vop/ppck7dnjr"
const rand_url2 = "https://www.supremenewyork.com/checkout"

//https://www.supremenewyork.com/shop/shoes/306637/35238?hh=6210188596250"

async function initBrowser(){
    const browser = await  puppeter.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(rand_url);
    return page;
}


async function Atc(page){
    await page.$eval("input[class='button']", elem => elem.click());
    await page.$eval("a[class='button checkout']", elem => elem.click());
    
}

async function Payment(page){

    //dados
    await page.goto(rand_url2);
    await page.waitFor(2000);
    await page.type("input[id='order_billing_name'", 'Jacinto Leite');
    await page.type("input[id='order_email'", 'cactusshop@gmail.com');
    await page.type("input[id='order_tel'", '966666666');
    await page.type("input[id='order_billing_address'", 'casa da mae do gouveia');
    await page.type("input[id='order_billing_address_2'", '5');
    await page.type("input[id='order_billing_address_3'", '');
    await page.type("input[id='order_billing_city'", 'lisabona');
    await page.type("input[id='order_billing_zip'", '7777777');
    const selectElem = await page.$('select[name="order[billing_country]"]');
    await selectElem.type('PORTUGAL');
    //document.querySelector("ins[id='order_terms'").parentElement.click();  
    
    //aceitar termos
    const checkboxEl = await page.waitForSelector("#order_terms");
    checkboxEl.click();


    //cc
    await page.waitFor(2000);
    await page.type("input[id='credit_card_number'",'4916242889221126');
    await page.select('#credit_card_month', '11')
    const selectElem2 = await page.$('select[id="credit_card_year"]');
    await selectElem2.type('2026');
    await page.type("input[id='credit_card_verification_value'", '697');

    //botao checkout
    await page.waitFor(4000);
    await page.$eval("input[class='button checkout']", elem => elem.click());
    

    


}
async function checkout(){
    const page = await initBrowser();
    await Atc(page);
    await Payment(page);
}

checkout();








