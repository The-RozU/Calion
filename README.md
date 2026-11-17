# Calion · portal uniwersum

**Aktualny motyw: Karczma Calionu v0.0.52.**

Strona internetowa poświęcona uniwersum Calionu, jego krainom, historii, postaciom, bestiariuszowi, rasom, frakcjom i przyszłym grom. Motyw wizualny łączy średniowieczną karczmę Gildii Poszukiwaczy, pikselowe ilustracje dark fantasy, miedziane i srebrne okucia, skórzane dodatki oraz pergaminowe kroniki.

## Zobacz stronę

Publikacja GitHub Pages: https://the-rozu.github.io/Calion/

Repozytorium: https://github.com/The-RozU/Calion

## Gałęzie

- **main** — publiczna wersja witryny.
- **dev-mode** — rozwój głównej wersji, zmiany testowane przed przeniesieniem na `main`.
- **karczma** — zachowany wariant testowy, z którego wybrano nowy layout (v0.0.24).

Wersję v0.0.25 wdrożono do `dev-mode` i `main`, zachowując w historii `main` osobny commit usuwający poprzednie pliki Survivors. W repozytorium są obecnie wyłącznie pliki strony i jej zasoby. Gry pozostają zapowiedziami, dopóki nie zostaną świadomie dodane.

## Zawartość

- Strona główna w stylu karczmy z pixelartowym wnętrzem, drewnianą tablicą ogłoszeń i oprawionymi w skórę księgami.
- Atlas świata z mapą okolic Calionu w formacie WebP i możliwością powiększenia.
- Kroniki, opisy postaci, bestiariusz, frakcje i rasy.
- Wyszukiwanie artykułów i szczegóły wpisów w oknach dialogowych.
- Katalog zapowiadanych gier, bez niedziałających linków do usuniętych projektów.
- Układ responsywny, dopasowany do szerokich ekranów i urządzeń mobilnych.

## Pliki

- `index.html` — struktura portalu.
- `assets/style.css` — wspólne style i elementy encyklopedii.
- `assets/karczma.css` — aktualny motyw karczemny, nadpisujący style bazowe.
- `assets/app.js` — nawigacja, wpisy kronik, wyszukiwanie, biblioteka gier i obsługa mapy.
- `assets/images/` — lokalne ilustracje pixelartowe WebP, mapa, bezszwowa tekstura desek i materiały źródłowe.
- `.github/workflows/` — narzędzia do regenerowania zoptymalizowanych ilustracji WebP.

### Tekstura drewna

Tło witryny wykorzystuje `assets/images/drewno-bezszwowe.webp`, przygotowane do płynnego powtarzania na obu osiach. Na komputerze i telefonie deski są zakotwiczone w stronie i przewijają się razem z jej zawartością, bez efektu podążania za oknem przeglądarki.

## Uruchomienie lokalne

W katalogu repozytorium uruchom serwer statyczny, np. `python -m http.server 8080`, i otwórz `http://localhost:8080`. Projekt nie wymaga instalacji zależności ani procesu kompilacji.

## Dalsze prace

Rozbudowa kanonu na podstawie dokumentów świata Calionu, ilustracji postaci i potworów, szczegółowych artykułów i interaktywnej mapy. Gry zostaną włączone dopiero po dopracowaniu witryny.

## 0.0.26 — Lżejsze pergaminy i tablica

- Usunięto ciężkie drewniano-metalowe obramowania sekcji mapy i kart kronik. Pergaminy spoczywają bezpośrednio na teksturze drewna.
- Mapa ma własne naturalne krawędzie, subtelny cień i dwa małe miedziane mocowania; link do atlasu przeniesiono pod ilustrację, by nie zasłaniał podpisów.
- Luźne kartki informacyjne przypięto pojedynczym gwoździem; lekko zaokrąglone, asymetryczne krawędzie i delikatne zagięcie narożnika zastępują ramki.
- Ralfor i Wargi otrzymali cień pergaminu, pojedynczy metalowy pinezkowy akcent i obrazy bez ram; responsywny układ zachowano.
- Zmiany wyłącznie na `dev-mode`, do zatwierdzenia przed publikacją na `main`.

## 0.0.27 — Nieoprawione pergaminy i mapa bez czarnego tła

- Osobne, nieregularne obrysy papieru wykonane na pseudo-elementach, bez cięcia pinezek i rzucanych cieni.
- Delikatne zagniecenia, różne krawędzie kartek i mniej geometryczne rozmieszczenie kronik.
- Mapa na stronie głównej korzysta z przygotowanej przez GitHub Actions wersji WebP z przezroczystością (`mapa-przypieta.webp`), podczas gdy pełna mapa w atlasie pozostaje bez zmian.
- Wersja dostępna tylko w `dev-mode`, przed publikacją na `main`.

## 0.0.28 — Poprawka pergaminu na telefonach

- Usunięto błąd wyświetlania tła przypiętych kartek w mobilnym Chromium: papier pozostaje na warstwie `z-index:0` ponad deskami, treść na `z-index:2`, zagięcie na `z-index:3`, mocowania na `z-index:4`.
- Poprawiono analogiczny problem w kartach Ralfora i Wargów oraz uproszczono cieniowanie poniżej 670 px szerokości.
- Zmiany tylko na `dev-mode`.

## 0.0.29 — Widoczne kartki na telefonach

- Małe notatki wykorzystują teraz własny element `tavern-note-sheet` z nieprzezroczystym pergaminowym tłem zamiast pseudo-elementu za treścią.
- Pinezki są osobno poza przycinanym papierem; nieregularne krawędzie i zagięte rogi zachowane.
- Zabezpieczenie dla mobilnego Chromium/Samsung Internet: brak ujemnych warstw i filtrów na kontenerze małych kartek.
- Zmiany tylko na `dev-mode`.

## 0.0.30 — Gwoździe i osobne drewniane szyldy

- Zastąpiono ciężkie kwadratowe elementy mocowań w nagłówku małymi okrągłymi miedzianymi nitami.
- Cztery skróty (Atlas krain, Dawne kroniki, Znane postacie, Bestiariusz) są osobnymi drewnianymi szyldami z własnymi krawędziami, odstępami i delikatnymi nitami.
- Zachowano mobilny układ 2×2, poprawiono odstępy, kontrast i dostępność klawiaturową.
- Tylko gałąź `dev-mode`.

## 0.0.31 — Atlas z wycinkami mapy

- Kafelki miejsc mają wycinki istniejącej mapy: Calion, Elderon i Durnhollow. Miejsca wewnątrz miasta współdzielą wycinek Calionu, bez wymyślania dokładnej lokalizacji.
- Drewniane tło i osobne pergaminowe karty dopasowano do strony głównej.
- Miejsca mają własne adresy `#/swiat/<id>`, istniejący pełny opis i mapę poglądową. Szczegółowe plany miejsc zostaną dodane później.
- Zachowano sześć wpisów, wyszukiwanie oraz powiększaną mapę ogólną. Zmiany tylko na `dev-mode`.

## 0.0.32 — Miejsca w mieście i regiony w atlasie

- Wpisy „Pięć stref Calionu”, „Slumsy Calionu” i „Pod Znakiem Miecza” są dostępne w sekcji „Poznaj Calion bliżej” na stronie miasta. Zachowują własne adresy i opisy, z linkiem powrotnym do Calionu.
- Atlas ogólny pokazuje Calion, Elderon, Durnhollow, Bagna Milczenia, Las Orklag i Vellan. Wyszukiwanie i licznik dotyczą miejsc tego poziomu.
- Nowe wycinki WebP oraz krótkie opisy oparto na istniejącej mapie okolic. Dokument „Świat” nie zawiera szczegółowych wpisów o tych trzech regionach.
- Zmiany tylko na `dev-mode`.

## 0.0.33 — Panel redaktora i oddzielne treści

- Wszystkie opisy przeniesiono bez utraty wpisów do `assets/content.json`. Portal pobiera go bez cache, a jego wersja steruje numerem widocznym na stronie.
- Link w stopce prowadzi do prywatnego panelu redaktora, dostosowanego do telefonu. Panel obsługuje nowe wpisy, działy, opisy, mapy i miejsca nadrzędne.
- Panel zapisuje wyłącznie treści w `dev-mode`; publikacja na `main` nadal jest osobną decyzją. Każdy zapis inkrementuje wersję treści.
- Jednorazowa konfiguracja w panelu: utworzenie prywatnej GitHub App i instalacja tylko w repozytorium Calion. Dane dostępowe przechowuje szyfrowany magazyn serwerowy, nie publiczny portal.

## 0.0.36 — Pozioma oś Kronik

- Drewniane tło, miedziana oś i pergamin opisu dopasowane do strony głównej.
- Zamiast kafelków: przewijana poziomo oś z datami i klikalnymi wydarzeniami. Poniżej pełny opis wybranego punktu.
- Dane i daty pochodzą z istniejących wpisów historii w content.json, także nowych dodanych w panelu; wyszukiwanie filtruje oś. Punkty są chronologiczne, z umownymi odstępami.
- Przyciski poprzednie/następne oraz strzałki klawiatury uzupełniają przewijanie dotykowe.
- Tylko dev-mode. Wersje 0.0.34–35 dotyczą oddzielnego panelu redaktora.

## 0.0.37 — Czytelna oś i wspólna oprawa kompendium

- Oś czasu i jej nawigacja spoczywają na jednolitym ciemnym tle, oddzielonym od tekstury drewna.
- Postacie, Bestiariusz, Frakcje i Rasy mają drewniane tło i osobne pergaminowe karty z miedzianymi mocowaniami, większymi nagłówkami i czytelnymi opisami.
- Wspólna responsywna siatka (3/2/1 kolumny), kolory i typografia zgodne ze stroną główną.
- Treści, wyszukiwanie i szczegóły wpisów zachowane; dopracowanie poszczególnych działów pozostaje na kolejny etap. Tylko dev-mode.

## 0.0.38 — Pierwsze siedem postaci

- Dział Postacie zawiera wskazaną listę w kolejności: Daren Velk, Ralfor Żelaznobrody, Leoryk Thalborn, Elmera Valen, Geran Voss, Loran Dask, Lokar.
- Rozwinięto nazwiska Ralfora i Leoryka, zachowując ich identyfikatory i dotychczasowe opisy. Opisy strażników oparto na dokumencie Świat.
- Daren zachowuje potwierdzone miano Czarny Lis; pełne biografie Darena i Lokara pozostają do uzupełnienia. Pozostali bohaterowie mogą zostać przywróceni z historii Git przy rozbudowie listy.
- Bez zmian w pozostałych działach; tylko dev-mode.

## 0.0.39 — Test kafelka Darena

- Wyłącznie Daren Velk otrzymuje dwukolumnowy kafelek: miejsce na portret po lewej, nazwa u góry i krótki opis u dołu prawej części.
- Układ pozostaje poziomy również na telefonie. Portret jest na razie oznaczonym pustym miejscem; zachowano otwieranie kroniki i wyszukiwanie.
- Pozostałe postacie i działy bez zmiany układu. Tylko dev-mode.

## 0.0.40 — Portret Darena Velka

- Wstawiono przesłaną ilustrację Darena do lewego pola próbnego kafelka jako WebP.
- Oryginalny obraz zachowano w całości; kadr na popiersie wybiera CSS w oknie portretu, z uszami u góry i górą tułowia poniżej.
- Zmiana wyłącznie Darena; treści i pozostałe karty zachowane. Tylko dev-mode.

## 0.0.41 — Spójne przewijanie drewnianego tła

- Na PC ustawiono ten sam sposób przewijania tła co na telefonie: background-attachment: scroll dla obu warstw.
- Usunięto zbędny osobny wyjątek mobilny. Tekstura, kolory i układ strony zachowane. Tylko dev-mode.

## 0.0.49 — Formatowanie opisów

- Panel redaktora udostępnia pogrubienie, kursywę, podkreślenie, nagłówki, rozmiary, cztery kolory oraz listy. Krótkie opisy obsługują pogrubienie i kursywę.
- Panel i portal współdzielą bezpieczny renderer oznaczeń w tekście; HTML, linki, skrypty i dowolne style nie są interpretowane. Zwykły tekst i dotychczasowe opisy działają bez migracji.
- Zaznacz tekst w panelu i wybierz przycisk; oznaczenia są widoczne w edycji, a ich efekt w Podglądzie i po zapisie na stronie dev-mode.
- Testy renderera: `npm ci && npm test` (zależność wyłącznie deweloperska). Tylko dev-mode.

## 0.0.51 — Karty postaci w stylu fantasy RPG

- Lista postaci ma teraz osobne portretowe dossier: 2 kolumny na PC, 1 na mniejszych ekranach; Daren i Ralfor wykorzystują istniejące portrety. Każda postać otwiera nową kartę bohatera z portretem lub oznaczeniem braku portretu, danymi i kroniką. Pozostałe działy zachowują dotychczasowe okna.
- Daren Velk ma sześć potwierdzonych cech Calionu (STR 4, DEX 13, CON 4, INT 9, WIS 5, CHA 5), PŻ maksymalne według wzoru z zasad, opisane zdolności, ekwipunek i relacje. Ralfor także ma znane dane oraz portret.
- Nieznane statystyki pozostałych postaci nie są wymyślane. Opisy wciąż pochodzą z `assets/content.json`, w tym formatowanie z panelu redaktora.
- Moduł `assets/character-sheet.js` i styl `assets/character-sheet.css` są odseparowane od pozostałego portalu. Zmiany tylko na `dev-mode`.

## 0.0.52 — Gildyjne akta osobowe zamiast karty RPG

- Postacie otwierają teraz akta Gildii Poszukiwaczy. Usunięto sześć cech, HP, rangi gildyjne, zdolności i ekwipunek z kart czytanych przez odbiorców.
- Układ zawiera wizerunek, informacje ze spisów, znane powiązania, wzmianki z kronik i zapisane opisy fabularne. Nazewnictwo jest pisane z perspektywy świata Calionu.
- Dane zebrano wyłącznie z już ustalonych historii; brakujące informacje nie są uzupełniane fikcyjnymi danymi. Pozostałe działy bez zmian.
- Tylko `dev-mode`.
