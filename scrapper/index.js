const request = require("request");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function scrapPages(car, pages, callback) {
  let standPages =
    /<article data-variant="regular"[\s\S]*?<a href="(https:\/\/www\.standvirtual\.com\/anuncio\/.*?)"[\s\S]*?<\/article>/g;

  fs.appendFile(
    `${car}.csv`,
    "brand,model,version,fuel,month,year,km,displacement,power,gearbox,doors,seats,origin,price\n",
    function (err) {
      if (err) throw err;
    }
  );

  for (let i = 1; i < pages; i++) {
    await new Promise((r) => setTimeout(r, 16000 * i));
    let url = `https://www.standvirtual.com/carros?page=${i}`;

    request(
      {
        encoding: null,
        method: "GET",
        uri: url,
      },
      async function (error, response, body) {
        body = body.toString();
        let matches;
        let cars = [];
        while ((matches = standPages.exec(body))) {
          cars.push(matches[1]);
        }
        callback(car, cars);
      }
    );
  }
}

async function scrapCar(car, cars) {
  let info = {
    brand: "",
    model: "",
    version: "",
    fuel: "",
    month: "",
    year: "",
    km: "",
    displacement: "",
    power: "",
    gearbox: "",
    doors: "",
    seats: "",
    origin: "",
    price: "",
  };
  for (let i = 0; i < cars.length; i++) {
    await new Promise((r) => setTimeout(r, 500 * i));

    const { data } = await axios.get(cars[i]);
    const $ = cheerio.load(data);

    $("li > span.offer-params__label").each((_idx, el) => {
      let label = $(el).text();
      switch (label) {
        case "Marca":
          info.brand = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Modelo":
          info.model = $(el)
            .next()
            .text()
            .replace(/ {2,}/g, "")
            .replace(/[\n\r\t]+/g, "");
          break;
        case "Versão":
          info.version = $(el)
            .next()
            .text()
            .replace(/ {2,}/g, "")
            .replace(/[\n\r\t]+/g, "");
          break;
        case "Combustível":
          info.fuel = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Mês de Registo":
          info.month = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Ano":
          info.year = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Quilómetros":
          info.km = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "")
            .replace(/km/g, "");
          break;
        case "Cilindrada":
          info.displacement = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "")
            .replace(/cm3/g, "");
          break;
        case "Potência":
          info.power = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "")
            .replace(/cv/g, "");
          break;
        case "Tipo de Caixa":
          info.gearbox = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Nº de portas":
          info.doors = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Lotação":
          info.seats = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        case "Origem":
          info.origin = $(el)
            .next()
            .text()
            .replace(/ +/g, "")
            .replace(/[\s]+/g, "");
          break;
        default:
          break;
      }
    });
    info.price = $("span.offer-price__number")
      .first()
      .text()
      .replace(/ +/g, "")
      .replace(/[\s]+/g, "")
      .replace(/EUR+/g, "");
    let entry = "";
    for (x in info) {
      entry += info[x] + ",";
    }
    entry = entry.replace(/.$/, "\n");
    fs.appendFile(`${car}.csv`, entry, function (err) {
      if (err) throw err;
    });
  }
}

scrapPages("test", 1548, scrapCar);
