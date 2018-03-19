# Verkefni 5

Útfæra skal framenda ofan á próftöflu gögn úr verkefni 4. Gefin er vefþjónusta úr [sýnilausn á verkefni 4](https://github.com/vefforritun/vef2-2018-v4-synilausn) sem hægt er að nota:
https://vefforritun2-2018-v4-synilausn.herokuapp.com/

## Síður

Setja skal upp þrjár síður:

* Forsíða með yfirlit yfir tölfræði fengin frá `/stats`
* Dýnamísk síða fyrir hvert svið sem birtir fyrirsögn fyrir hverja deild ásamt prófum þeirra deilda
* „Síða fannst ekki“ síða

Leiðarkerfi skal vera á hverri síðu sem sýnir öll svið og sækja skal lista frá vefþjónustu, **ekki skal skrifa inn lista af öllum sviðum í kóða**.

## Svið

Á síðu sviðs skal birta heiti sviðs og hverja deild sem heldur próf. Þegar smellt er á heiti deildar er sú deild „opnuð“ og próf hennar birt í töflu með eftirfarandi gögnum:

* Auðkenni námskeiðs
* Heiti námskeiðs
* Fjölda nemenda í prófi
* Dagsetningu prófs

Ef önnur deild er opnuð skal loka öðrum deildum. Ef smellt er tvisvar á sömu deild skal hún opnuð og síðan lokuð. Þessa virkni skal útfæra með `state` og án þess að snerta DOM.

Heiti deildar skal vera með `+` fyrir framan ef lokuð og `-` fyrir framan ef opin.

## Útlit

Fyrir útlit gildir:

* Útlit skal vera skalanlegt
* Nota skal [Noto Sans](https://fonts.google.com/specimen/Noto+Sans) fyrir meginmál (bæði regular og bold) og [Noto Serif](https://fonts.google.com/specimen/Noto+Serif) fyrir fyrirsagnir
* Miðja skal allt efni og skal það ekki vera breiðara en `1200px`
* Leiðarkerfi skal miðjað undir fyrirsögn og valið svið skal vera feitletrað
* Bil eru `10px`, `20px` eða `40px`
* Leturstærð er `16px` fyrir meginmál, `32px` fyrir meginfyrirsögn
* Litur á annari hverri röð í töflum er `#eee`
* Padding á öllu er `10px` á allar hliðar

[Sjá skjáskot úr sýnilausn](layout/)

## Útfærsla

Nota skal [`create-react-app`](https://github.com/facebook/create-react-app), gefinn er grunnur með þeim components sem útfæra þarf.

Nota skal [`react-helmet`](https://github.com/nfl/react-helmet) til að setja `<title>` á hverri síðu, fyrir forsíðu: `Próftöflur`, fyrir svið: `<heiti sviðs> – Próftöflur`

Nota skal [`react-router`](https://reacttraining.com/react-router/web) til að setja upp leiðarkerfi vefs.

Fyrir alla componenta skal setja `PropTypes` rétt fyrir þau gögn sem þeir taka við.

Öll dependency eru skráð í `package.json`.

Nota skal `fetch` til að sækja gögn. Það þarf ekki að hugsa um að besta fjölda kalla í vefþjónustu, gera má köll aftur og aftur í sömu slóð til að birta mismunandi gögn.

Í `.env` er gefin slóð á vefþjónustu undir lykli `REACT_APP_SERVICE_URL` sem má nálgast í kóða með `process.env.REACT_APP_SERVICE_URL`. Lesa má nánar um þetta í [skjölun create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables).

Breytingar hafa verið gerðar á sýnilausn sem keyrir fyrir verkefnið:

* Lykill fyrir svið heitir `schools` ekki `departments`
* Hvert svið hefur aukalega heiti sitt í svari

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einka repos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2018-v4.git
> cd vef2-2018-v4
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Mat

* 40% – Forsíða og leiðarkerfi uppsett skv. forskrift
* 50% – Síða fyrir svið uppsett skv. forskrift
* 10% – Verkefni sett upp á Heroku

## Sett fyrir

Verkefni sett fyrir í fyrirlestri fimmtudaginn 15. mars 2018.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags fimmtudaginn 5. apríl 2018.

Skilaboð skulu innihalda slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)). Notendanöfn þeirra eru `ernir` og `elvarhelga`.

## Einkunn

Sett verða fyrir fimm minni verkefni þar sem fjögur bestu gilda 7,5% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópa verkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.
