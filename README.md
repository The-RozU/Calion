# Calion | Portal uniwersum

Wstępny projekt strony **Calion** łączącej lore świata, kroniki, postacie, bestiariusz, frakcje i gry przeglądarkowe.

## Wersja

Portal: **0.0.24** (prototyp). Zachowana istniejąca gra **Calion Survivors 0.0.18** w katalogu `survivors/`.

## Zawartość

- Strona startowa w klimacie medieval dark fantasy / pixel art; panorama Calionu zbudowana jako grafika wektorowa SVG w HTML, bez zewnętrznych zasobów graficznych.
- Atlas krain, historia z osią czasu, postacie, bestiariusz, frakcje i rasy.
- Karty encyklopedii, wyszukiwanie i szczegóły w oknach dialogowych.
- Biblioteka gier: osadzony **Calion Survivors**, **Karciana Szulernia** (zewnętrzny adres projektu), zapowiedzi Kalon, Calion TD i Idle RPG.
- Przycisk pełnego ekranu podczas gry (Fullscreen API), responsywny interfejs dla PC i telefonu.
- Statyczny HTML/CSS/JS bez kompilacji i bez backendu; gotowy pod GitHub Pages.

## Jak uruchomić

Otwórz `index.html` w przeglądarce albo uruchom lokalny serwer HTTP w katalogu projektu, np. `python -m http.server 8080` i wejdź na `http://localhost:8080`.

Na GitHub Pages ustaw w **Settings → Pages → Build and deployment → Deploy from a branch** odpowiednią gałąź i folder `/(root)`. **Uwaga:** repozytorium ma jedną publikowaną stronę Pages; zmiana źródła na `dev-mode` może zmienić aktualnie publiczną witrynę. Bez zgody właściciela nie zmieniamy `main` ani ustawień wdrożenia.

## Struktura

- `index.html` – portal i panorama Calionu
- `assets/style.css` – wygląd i układ responsywny
- `assets/app.js` – dane kronik, wyszukiwanie, nawigacja i biblioteka gier
- `survivors/` – oryginalna gra, bez zmian

## Dalszy rozwój

1. Rozbudowa wpisów na podstawie pełnego dokumentu **Świat** (obecne artykuły to skróty demonstracyjne).
2. Dedykowane grafiki lokacji i bohaterów w stylu medieval dark fantasy pixel art (preferowany format `.webp`).
3. Interaktywna mapa, powiązania między postaciami, filtrowanie bestiariusza.
4. Konfiguracja wersji demonstracyjnej Pages albo osobnego adresu podglądowego bez modyfikowania `main`.
5. Wspólne konto i zapis online w przyszłości, jeśli dodamy backend.

### Źródła treści

Wstępne streszczenia z projektowego dokumentu świata Calionu i wcześniejszej wersji Kronik; miejsca, dla których brak kompletnych szczegółów, są oznaczone jako wpisy do rozwinięcia, zamiast dopisywać niezatwierdzony kanon.

## Wersja 0.0.23 — Mroczny Atlas

Nowa główna strona w stylu dark fantasy pixel art na podstawie zaakceptowanej makiety. Ilustracje są lokalnymi plikami WebP. Sekcje atlasu, kronik, postaci i bestiariusza zachowują dotychczasową zawartość. Wszystkie gry oznaczono jako przyszłe, bez prób uruchamiania usuniętych plików. Wdrożenie testowe tylko na gałęzi `dev-mode`.


## 0.0.23 — widescreen i mapa

- Układ wykorzystuje prawie całą szerokość 16:9, do 1920 px.
- Obrazy nie są rozciągane z wymuszoną pikselizacją.
- Oryginalna mapa Calionu stanowi centralny punkt atlasu, bez dodatkowych etykiet zasłaniających nazwy.
- W dziale Świat jest pełna mapa z przyciskiem powiększenia; na telefonach można ją przewijać.
- Grafiki WebP z wyższej rozdzielczości są przygotowywane z plików źródłowych przez automatyzację assets.

- Gotowe ilustracje strony korzystają z lokalnych plików WebP, a większe JPEG pozostają źródłami do reprodukowalnej konwersji w GitHub Actions.

## Wariant testowy: Karczma Calionu v0.0.24

Ta wersja powstaje **wyłącznie na gałęzi `karczma`** jako alternatywa dla Mrocznego Atlasu na `dev-mode`. Zmiany nie powinny być automatycznie przenoszone na `main`.

### Założenia wizualne

- Pełnoekranowy pixelartowy kadr wnętrza karczmy jako hero.
- Tło z warstwowo stylizowanego ciemnego drewna; miedziane ćwieki i srebrne okucia; pergaminy i oprawa z brązowej skóry.
- Tablica Poszukiwaczy z mapą Calionu (zachowana oryginalna mapa WebP).
- Kroniki Ralfora i Wargów Elderonu prezentowane jako osobne pergaminowe wpisy.
- Podstrony encyklopedii, wyszukiwarka, pełnoekranowa mapa i zapowiedzi gier zachowują funkcjonalność.

Pliki: `assets/karczma.css` to samodzielna warstwa stylistyczna ponad istniejącym `assets/style.css`. Grafika `assets/images/karczma-wnetrze.webp` powstaje automatycznie z pliku `karczma-wnetrze.jpg` przez workflow `karczma-webp.yml`. Grafiki gry są lokalne, bez powrotu usuniętych plików Survivors.

## Karczma 0.0.24 — naturalne, bezszwowe deski

- Nowe tło bazuje na przesłanej pikselowej teksturze drewna. Zamiast gradientów i sztucznych pasków używa lokalnego pliku `assets/images/drewno-bezszwowe.webp`.
- Plik ma wymiary 1240×941 px i jest przygotowany tak, aby przeciwległe krawędzie łączyły się bez linii podczas powtarzania.
- Tło powtarza się w natywnej wielkości i pozostaje na miejscu podczas przewijania na komputerze; wersja mobilna korzysta ze zwykłego przewijania.
- Zmieniona tylko gałąź `karczma`. Pozostałe grafiki i działy strony bez zmian.
- Źródło JPG do ponownego wygenerowania WebP i workflow: `assets/images/drewno-bezszwowe-source.jpg`, `.github/workflows/karczma-wood-webp.yml`.
