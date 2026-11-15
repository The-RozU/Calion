# Calion · portal uniwersum

**Aktualny motyw: Karczma Calionu v0.0.25.**

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
