# Lest you forget! README

Detta README-dokument ger en omfattande översikt över Lest you forget!-lösningen som har distribuerats [här]([https://joni2307-typescript-moment2-628bed4d16d9.herokuapp.com/](https://joni2307-typescript-moment2-628bed4d16d9.herokuapp.com/). Lösningen är konstruerad med TypeScript, HTML och CSS.

## Innehållsförteckning

- [Översikt](#översikt)
- [Filstruktur](#filstruktur)
- [Användning](#användning)
- [Utvecklingsinstallation](#utvecklingsinstallation)
- [Beroenden](#beroenden)
- [Kontakt](#kontakt)

## Översikt

Lest you forget! är en enkel webbapplikation som är utformad för att hantera uppgifter med varierande prioriteringar. Användare kan lägga till, redigera, markera som slutförda, återkalla slutförande och ta bort uppgifter. Applikationen är byggd med TypeScript för backend-funktionalitet och HTML/CSS för användargränssnittet.

## Filstruktur

Projektets filstruktur är organiserad enligt följande:

- `src/`: Innehåller källkodsfiler.
  - `index.html`: HTML-fil för applikationens UI.
  - `UIhandler.ts`: TypeScript-fil som innehåller logiken för interaktion med användargränssnittet.
  - `todo.ts`: TypeScript-fil som definierar Todo-gränssnittet och TodoList-klassen.
- `dist/`: Innehåller kompilerade TypeScript-filer och andra tillgångar som genererats av paketeraren Parcel. (ej uppladdade för versionshantering)
- `styles.css`: CSS-fil för att styla UI:et.

## Användning

Användare kan komma åt Todo App genom den tillhandahållna länken [här](https://joni2307-typescript-moment2-628bed4d16d9.herokuapp.com/). När applikationen har laddats kan användare utföra följande åtgärder:

- **Lägga till uppgifter**: Ange en uppgiftsbeskrivning och välj dess prioritet, klicka sedan på knappen "Add task".
- **Redigera uppgifter**: Klicka på "Edit"-knappen bredvid en uppgift, gör ändringar och klicka sedan på "Save changes" för att uppdatera uppgiften.
- **Markera som slutförda**: Klicka på "Mark as completed"-knappen bredvid en uppgift.
- **Återkalla slutförandemarkering**: Klicka på "Revert completion"-knappen bredvid en slutförd uppgift.
- **Ta bort uppgifter**: Klicka på "Delete"-knappen bredvid en uppgift för att ta bort den från listan.
- **Återställa inmatningsfältet**: Klicka på knappen "Reset input fields" för att rensa uppgifts- och prioriteringsfälten. (även knappen "Discard changes" i editeringsläget fungerar på samma sätt)

## Utvecklingsinstallation

För att ställa in utvecklingsmiljön lokalt, följ dessa steg:

1. Klona lagringsplatsen till din lokala maskin genom den tillhandahållna länken [här](https://github.com/Fa-collab1/TypeScript-Moment2/)
2. Navigera till projektets katalog.
3. Kör `npm install` för att installera beroenden.
4. Kör `npm start` för att starta utvecklingsservern.
5. Kom åt applikationen i din webbläsare på `http://localhost:1234`. (eller annan port som anges av ditt system)

## Beroenden

Projektet använder följande beroenden:

- **TypeScript**: Ett övermängd av JavaScript som lägger till valfri statisk typning. ("typescript": "^5.4.4" med "compilerOptions": {"outDir": "./dist","target": "es5","module": "commonjs","strict": true,"lib": ["es2016", "dom"]}})
- **Parcel**: En webbapplikationspaketare som hjälper till att paketera tillgångar som JavaScript-, CSS- och HTML-filer. ("@parcel/packager-raw-url": "^2.12.0","@parcel/transformer-webmanifest": "^2.12.0","parcel": "^2.12.0")

 ## Kontakt
- Utvecklare: [Joni2307](mailto:joni2307@student.miun.se)
skapad inom kursen VT2024 DT208G Datateknik GR (B), Programmering i TypeScript (distans)

 
