# Calion · portal uniwersum

**Aktualny motyw: Karczma Calionu v0.0.30.**

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

Tło witryny wykorzystuje `assets/images/drewno-bezszwowe.webp`, przygotowane do płynnego powtarzania na obu osiach. Na komputerze pozostaje nieruchome podczas przewijania, a na telefonach przewija się wraz ze stroną.

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
