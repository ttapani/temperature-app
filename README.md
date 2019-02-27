## React-web-lämpötilasovellus

Node.js (+8.10) ympäristössäsi aja

### `yarn && yarn start`

Käynnistää sovelluksen kehitystilassa<br>
Mene selaimella [http://localhost:3000](http://localhost:3000).

Testit ajetaan

### `yarn test`

Ajaa muutaman e2e testin puppeteerilla, muutaman yksikkötestin mountatulle komponentille sekä snapshotit.<br>

### `yarn build`

Kääntää sovelluksen tuotantoon minifioituna /build-hakemistoon.<br>

## Tietoa ja käyttöohjeita

* Kirjoita haluamasi kaupungin nimi hakuruutuun ja valitse sydämestä sijainti suosikiksi
* Tukee openweathermapin sisältämiä kaupunkeja
* Suosikit tallennetaan selaimen localstorageen palautettavaksi
* Sovellus hakee uusimmat tiedot automaattisesti viiden minuutin välein