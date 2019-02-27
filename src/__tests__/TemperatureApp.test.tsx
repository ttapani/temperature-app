import fetchMock from 'fetch-mock';
import puppeteer from 'puppeteer';

const weatherResponse = {
    id: 1337,
    name: 'Mordor',
    main: {
        temp: 80,
    }
}

class MockWeatherApi {
    mockWeatherData () {
        fetchMock.get('http://api.openweathermap.org/data/2.5/weather', weatherResponse)
    }
}

export const mockWeatherApi = new MockWeatherApi();

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
        await page.type('#search-input', 'Budapest');

        await page.waitForSelector('#location-name');
        const name = await page.$eval('#location-name', element => element.firstChild!.textContent);
        expect(name).toBe('Budapest');
        
        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        const favourite = await page.$eval('#favourites-list #location-name', element => element.textContent);
        expect(favourite).toBe('Budapest');

        browser.close();
    }, 16000);

    test('user can favourite a location', async () => {
        const instance = await initPuppeteer();
        let { browser, page } = instance;
        
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#search-input');
        
        await page.click('#search-input');
        await page.type('#search-input', 'Budapest');

        await page.waitForSelector('#location-name');
        const name = await page.$eval('#location-name', element => element.firstChild!.textContent);
        expect(name).toBe('Budapest');
        
        await page.click('#favourite-button');
        await page.waitForSelector('#favourites-list');
        const favourite = await page.$eval('#favourites-list li:first-child #location-name', element => element.textContent);
        expect(favourite).toBe('Budapest');

        browser.close();
    }, 16000);
});