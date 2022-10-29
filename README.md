# foodfighters
Solidabiksen koodihaastetta varten toteutettu sovellus, jossa eri ruoat ottavat mittaa toisistaan.

Sovellus on toteutettu frontin osalta Angularilla ja backendina toimii NestJS. Sovelluksessa on kaksi kortti-elementtiä, joihin voidaan valita ruoka PrimeNG autocomplete-komponentilla, Finelin APIa hyödyntäen. Taistelijat voidaan myös arpoa "shuffle"-painikkeilla. Taistelulogiikka on simppeli ja se nojaa vahvasti todennäköisyyksiin ja statseihin. Logiikka avautuu helposti lähdekoodista.

## Sovelluksen pystytys lokaalisti
Koneellasi tulee olla Node.js asenettuna, jotta voit ajaa npm-komentoja.

Lataa GitHub repositoryn sisältö koneelle ja avaa komentokehote (cmd prompt) ko. hakemistossa.

Navigoi frontend-hakemistoon ja aja komento:  
```npm install```  
Odota pakettien asennus loppuun, jonka jälkeen saat frontin pystyyn komennolla:  
```npm start```

Jätä fronttiterminaali käyntiin, avaa toinen terminaali-ikkuna sekä navigoi backend-hakemistoon ja asenna NestJS ajamalla komento:  
```npm install -g @nestjs/cli```  
Tämän jälkeen aja komento:  
```npm install```  
Odota pakettien asennus loppuun, jonka jälkeen saat backendin pystyyn komennolla:  
````npm start```

Navigoi osoitteeseen http://localhost:4200/ ja sovellus on nyt käytössäsi.

## Sovellus webissä
Voit käyttää sovellusta myös webissä seuraavan linkin kautta:  
http://foodfighters-env.eba-sybshmpm.eu-west-1.elasticbeanstalk.com/
