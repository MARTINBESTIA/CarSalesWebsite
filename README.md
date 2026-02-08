# AutoBazar — inštalácia a spustenie

Tento repozitár obsahuje dve samostatné časti:
- `autobazar-backend` — Spring Boot aplikácia (Java, Spring Boot, Maven), poskytuje REST API pomocou ktorého komunikuje s frontendom, pristupuje k databáze a ukladá obrázky.
- `autobazar-frontend` — Vite + React frontend (TypeScript/JSX), používateľské rozhranie pre prehliadanie a správu inzerátov.


## Požiadavky
- Java 17+ (alebo verzia, ktorú používa project v `pom.xml`)
- Maven (môžete použiť zabudovaný `mvnw.cmd` v projekte)
- Node.js 18+ a npm (pre frontend)
- PowerShell (Windows: v ponuke je predvolený shell)

## 1) Spustenie backendu

1. Otvorte PowerShell a choďte do adresára backendu:

    ```powershell
    cd 'C:\Users\marti\Desktop\škola\3. ročník\VAII\semestralka\autobazar-backend'
    ```

2. Spustite aplikáciu pomocou zabudovaného skriptu Maven wrapper:

    ```powershell
    .\mvnw.cmd spring-boot:run
    ```

    - Aplikácia by mala po pár sekundách/bežných minútach bežať na porte 8080 (ak konfigurácia v `src/main/resources/application.properties` nebola zmenená).
    - Ak používate priamo Maven (globálne nainštalovaný), môžete použiť `mvn spring-boot:run`.

    Čo skontrolovať ak to neštartuje:
    - V konzole hľadajte chyby štartu (port busy, chyby DB, chýbajúce env premenné).
    - Skontrolujte `application.properties` v `src/main/resources` pre konfiguráciu DB, upload priečinka a CORS.


## 2) Spustenie frontendu

1. Otvorte nový PowerShell a choďte do adresára frontend:

    ```powershell
    cd 'C:\Users\marti\Desktop\škola\3. ročník\VAII\semestralka\autobazar-frontend'
    ```

2. Nainštalujte závislosti (ak ešte nie sú):

    ```powershell
    npm install
    ```

3. Spustite vývojový server Vite:

    ```powershell
    npm run dev
    ```

    - Frontend by mal bežať na adrese, ktorú Vite vypíše (štandardne `http://localhost:5173`).
    - Frontend volá backend cez konštantu `API_BASE` definovanú v `autobazar-frontend/src/api.ts`. Predpokladá sa `http://localhost:8080`.

    Ak máte backend na inom porte, upravte `autobazar-frontend/src/api.ts`.

## 3) Konfigurácia ukladania obrázkov (ak potrebné)

- Backend spravuje ukladanie obrázkov do priečinka (skontrolujte `application.properties` pre `app.upload.dir` alebo podobnú property).
- Ak nahrávanie neukladá obrázky, skontrolujte práva na priečinok a či `app.upload.dir` ukazuje na existujúce miesto.
- Po nahraní sa obrázky dostupné cez endpointy, ktoré generujú URL (frontend očakáva `mainImageUrl` alebo /api/listings/{id}/images).


## 4) Stručný prehľad užitočných endpointov (backend)

- GET /api/brands — vráti zoznam názvov značiek
- GET /api/fuel-types — vráti zoznam názvov palív
- GET /api/features/pairs — vráti pole { featureId, featureName }
- GET /api/listings/all — vráti všetky inzeráty (frontend ich používa na zobrazenie)
- GET /api/listings/{id} — detail listingu
- GET /api/listings/{id}/images — obrázky pre listing
- DELETE /api/listings/{id} — zmaže listing (backend implementuje mazanie aj s odstránením súvisiacich záznamov a súborov)
- /api/users/** — operácie s používateľmi (get by id/email, delete, update)

(Uvedené endpointy sú popisované z obsahu projektu a kontrolerov; konkrétne názvy môžu byť mierne rozdielne v závislosti od implementácie — vždy skontrolujte v `src/main/java/*/controller`.

## Dodatkové tipy pre vývojára
- Ak chcete debugovať priamo backend v IDE (IntelliJ / Eclipse): otvoríte `autobazar-backend` ako Maven projekt a spustíte aplikáciu z triedy s `@SpringBootApplication`.
- Frontend môžete buildnúť pre produkciu: v `autobazar-frontend` spustite `npm run build`. Výsledné súbory budú v `dist/`.
- Pre rýchle testovanie endpointov používajte rôzny API client, pravdepodobne postman, ja používam insomnia, pretože môj PC nepodporuje Postmana z nejakého dôvodu
 alebo `curl`. 
 - Tak tiež je možné vybudovať spustiteľný jar súbor ktorý potom stačí spustiť na serveri, a prostredníctvom index.html zapnete frontend
