# Projekt A – Musikgruppslista

Detta är en enkel webbapplikation där du kan bläddra bland, söka efter och se detaljer om olika musikgrupper. Projektet är gjort i utbildningssyfte.

## Funktioner

- **Lista alla musikgrupper:** På huvudsidan visas en lista med musikgrupper hämtade från ett API.
- **Sökfunktion:** Du kan söka efter musikgrupper genom att skriva i sökfältet. Listan filtreras direkt och visar bara grupper vars namn innehåller det du söker efter.
- **Paginering:** Listan visar 10 grupper per sida. Du kan bläddra mellan sidor med "Föregående" och "Nästa"-knappar.
- **Detaljsida:** Varje musikgrupp har en "Detalj"-knapp. När du klickar på den kommer du till en sida som visar mer information om gruppen, inklusive namn, genre, etableringsår, artister och album.

## Filstruktur

- `html/`
  - `index.html` – Startsida
  - `Music.html` – Lista och sök bland musikgrupper
  - `MusicDetail.html` – Detaljerad info om en musikgrupp
  - `name.html` – Om applikationen och utvecklaren
- `css/`
  - `index.css` – Stilmall för hela projektet
- `JavaScript/`
  - `script.js` – Funktionalitet för list- och söksidan
  - `musicDetail.js` – Funktionalitet för detaljsidan

## Hur fungerar det?

1. **Starta projektet** genom att öppna `index.html` eller `Music.html` i din webbläsare.
2. **Bläddra och sök** bland musikgrupper på `Music.html`.
3. **Klicka på "Detalj"** för att se mer information om en specifik grupp.
4. **Navigera** mellan sidor med hjälp av knapparna längst ner.

## Teknik

- HTML, CSS (med Bootstrap för layout), och JavaScript.
- Data hämtas från ett externt API.

## Utvecklare

Youssef

---

*Detta projekt är gjort som en inlämningsuppgift och är avsett för utbildningsändamål.*