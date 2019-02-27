import fetchMock from 'fetch-mock';
import puppeteer from 'puppeteer';


const initPuppeteer = async() => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    
    page.emulate({
        viewport: {
            width: 500,
            height: 2400
        },
        userAgent: ''
    });
    return { browser, page };
}

describe('Temperature app', () => {
    test('user can search locations', async () => {
        const instance = await initPuppeteer();
        let { browser, page } = instance;
        
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#search-input');
        
        await page.click('#search-input');
        await page.type('#search-input', 'Tampere');

        await page.waitForSelector('#location-name');
        const name = await page.$eval('#location-name', element => element.firstChild!.textContent);
        expect(name).toBe('Tampere');
        
        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        const favourite = await page.$eval('#favourites-list #location-name', element => element.textContent);
        expect(favourite).toBe('Tampere');

        browser.close();
    }, 16000);

    test('user can favourite a location', async () => {
        const instance = await initPuppeteer();
        let { browser, page } = instance;
        
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#search-input');
        
        await page.click('#search-input');
        await page.type('#search-input', 'Tampere');

        await page.waitForSelector('#location-name');
        const name = await page.$eval('#location-name', element => element.firstChild!.textContent);
        expect(name).toBe('Tampere');
        
        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        const favourite = await page.$eval('#favourites-list li:first-child #location-name', element => element.textContent);
        expect(favourite).toBe('Tampere');

        browser.close();
    }, 16000);

    test('user can remove a favourite', async () => {
        const instance = await initPuppeteer();
        let { browser, page } = instance;
        
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#search-input');
        
        await page.click('#search-input');
        await page.type('#search-input', 'Tampere');

        await page.waitForSelector('#location-name');
        const name = await page.$eval('#location-name', element => element.firstChild!.textContent);
        expect(name).toBe('Tampere');
        
        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        const favourite = await page.$eval('#favourites-list li:first-child #location-name', element => element.textContent);
        expect(favourite).toBe('Tampere');

        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        let empty = null;
        try {
            empty = await page.$eval('#favourites-list li:first-child #location-name', element => element.textContent);
        }
        catch (e) {
            
        }
        expect(empty).toBeNull();

        browser.close();
    }, 16000);
});