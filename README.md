# AutoBazar — stručný návod (slovensky)

Tento repozitár obsahuje dve hlavné časti aplikácie AutoBazar:

- `autobazar-backend` — backend napísaný v Java (Spring Boot), poskytuje REST API a spravuje persistenciu v MySQL.
- `autobazar-frontend` — frontend napísaný v React (Vite), zobrazuje inzeráty a komunikuje s backendom cez API.

Cieľ tohto README: rýchlo vysvetliť použité technológie a presne popísať, ako lokálne spustiť databázu, backend a frontend.

---

CHECKLIST (čo tento README poskytuje):
- Popis backend a frontend komponentov ✅
- Zoznam použitých technológií ✅
- Presné príkazy na spustenie MySQL (lokálne alebo Docker) ✅
- Spustenie backendu (Maven wrapper) ✅
- Spustenie frontendu (npm / Vite) ✅

---

Použité technológie
- Backend: Java + Spring Boot (Spring Web, Spring Data JPA), Maven
- Databáza: MySQL (použiteľné lokálne alebo v Docker konteineri)
- Frontend: React (JSX/TS), Vite, MUI / štýly (projekt používa komponenty a vlastné CSS)
- Build / run: `mvnw.cmd` (backend), `npm` / `vite` (frontend)


1) Spustenie databázy (MySQL)

Možnosť A — lokálna inštalácia MySQL
- Nainštalujte MySQL podľa OS a vytvorte databázu (napr. `autobazar`) a používateľa.
- Skontrolujte `autobazar-backend/src/main/resources/application.properties` a prípadne upravte `spring.datasource.url`, `username`, `password`.

Možnosť B — rýchle spustenie s Docker (odporúčané pre vývoj):

```powershell
# spustí MySQL 8 v Docker konteineri (heslo/root a databázu upravte podľa potreby)
docker run --name autobazar-db -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=autobazar -e MYSQL_USER=autobazar -e MYSQL_PASSWORD=secret -p 3306:3306 -d mysql:8

# skontrolovať logy
docker logs -f autobazar-db
```

Po spustení DB si skontrolujte možné pripojenie (napr. MySQL Workbench, DBeaver alebo `mysql` CLI).

Poznámka: Spring Boot môže pri štarte vytvoriť tabuľky automaticky podľa konfigurácie (`spring.jpa.hibernate.ddl-auto` v `application.properties`).


2) Spustenie backendu (Spring Boot)

Predpoklad: MySQL beží a `application.properties` obsahuje správne prihlasovacie údaje.

Otvorte PowerShell v priečinku `autobazar-backend` a spustite:

```powershell
cd 'C:\Users\marti\Desktop\škola\3. ročník\VAII\semestralka\autobazar-backend'
.\mvnw.cmd spring-boot:run
```

Alternatíva (vytvorenie jar a spustenie):

```powershell
.\mvnw.cmd package -DskipTests
java -jar target\autobazar-backend-0.0.1-SNAPSHOT.jar
```

Očakávanie: API bude dostupné na `http://localhost:8080` (ak v `application.properties` nie je zmenený port).

Dôležité miesta v backend projekte:
- Konfigurácia DB a uploadu: `src/main/resources/application.properties`
- Kontrolery (REST endpointy): `src/main/java/com/martin/autobazar/controller`


3) Spustenie frontendu (Vite + React)

Otvorte nový PowerShell v priečinku `autobazar-frontend` a spustite:

```powershell
cd 'C:\Users\marti\Desktop\škola\3. ročník\VAII\semestralka\autobazar-frontend'
npm install
npm run dev
```

- Vite vypíše lokálnu adresu, zvyčajne `http://localhost:5173`.
- Frontend používa `autobazar-frontend/src/api.ts` pre konštantu `API_BASE`. Ak backend beží inde než `http://localhost:8080`, upravte tam URL.


4) Rýchly test (overenie)

Po spustení DB + backend + frontend otvorte v prehliadači frontend URL a skúste:
- Načítať stránku „Buy a car / Search results“ — frontend vykoná `GET /api/listings/all`.

Ak chcete otestovať API priamo (PowerShell):

```powershell
curl http://localhost:8080/api/brands
curl http://localhost:8080/api/fuel-types
curl http://localhost:8080/api/features/pairs
curl http://localhost:8080/api/listings/all
```


5) Užitočné tipy a riešenie problémov
- CORS: frontend bežiaci na porte 5173 vyžaduje povolenie CORS v backend kontroleroch — projekt už obsahuje @CrossOrigin pre niektoré controllery.
- Ak frontend nevie komunikovať s backendom, skontrolujte `API_BASE` a konzolu (F12 -> Network).
- Ak backend hlási chyby pripojenia k DB, skontrolujte prístupové údaje a či DB port 3306 je dostupný.
- Ak nahrávanie obrázkov neukladá súbory, skontrolujte nastavenie upload priečinka v `application.properties` a práva súborového systému.


6) Ďalšie možnosti (voliteľné)
- Build frontendu na produkciu: `npm run build` v priečinku `autobazar-frontend` (vytvorí `dist/`).
- Deploy backendu: zabalíte jar (`mvn package`) a nasadíte na server/container.


Ak chcete, môžem README ďalej upraviť na mieru (pridať krok seedovania DB s príkladovým SQL, alebo pridať Docker Compose konfiguráciu, ktorá spustí backend + MySQL + frontend). Napíšte, čo preferujete.
