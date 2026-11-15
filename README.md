# Calion | Portal uniwersum

Wstępny projekt strony **Calion** łączącej lore świata, kroniki, postacie, bestiariusz, frakcje i gry przeglądarkowe.

## Wersja

Portal: **0.0.21** (prototyp). Zachowana istniejąca gra **Calion Survivors 0.0.18** w katalogu `survivors/`.

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

## Wersja 0.0.21 — Mroczny Atlas

Nowa główna strona w stylu dark fantasy pixel art na podstawie zaakceptowanej makiety. Ilustracje są lokalnymi plikami WebP. Sekcje atlasu, kronik, postaci i bestiariusza zachowują dotychczasową zawartość. Wszystkie gry oznaczono jako przyszłe, bez prób uruchamiania usuniętych plików. Wdrożenie testowe tylko na gałęzi `dev-mode`.
