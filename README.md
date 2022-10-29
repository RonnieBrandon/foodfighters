# foodfighters
Solidabiksen koodihaastetta varten toteutettu sovellus, jossa eri ruoat ottavat mittaa toisistaan.

Sovellus on toteutettu frontin osalta Angularilla ja backendina toimii NestJS. Sovelluksessa on kaksi kortti-elementtiä, joihin voidaan valita ruoka Finelin API:n kautta hyödyntäen PrimeNG autocomplete-komponenttia. Taistelijat voidaan myös valita "shuffle"-painikkeilla.

## Sovelluksen pystytys lokaalisti
Koneellasi tulee olla Node.js asenettuna, jotta voit ajaa npm-komentoja.

Lataa GitHub repositoryn sisältö koneelle ja avaa komentokehote (cmd prompt) ko. hakemistossa.

Navigoi frontend-hakemistoon ja aja komento:  
```npm install```  
Odota pakettien asennus loppuun, jonka jälkeen saat frontin pystyyn komennolla:  
```npm start```

Navigoi backend-hakemistoon ja asenna NestJS ajamalla komento:
```npm install -g @nestjs/cli```  
Tämän jälkeen aja komento:  
````npm install``` 
Odota pakettien asennus loppuun, jonka jälkeen saat backendin pystyyn komennolla:
````npm start```

Navigoi osoitteeseen http://localhost:4200/ ja sovellus on nyt käytössäsi.
