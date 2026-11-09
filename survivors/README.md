# Calion Survivors · prototyp 0.0.5

Pierwsza niezależna próba gry typu Survivors w świecie Calionu. Wersja **0.0.5** to w pełni działający prototyp przeglądarkowy, bez zależności, budowania projektu ani zewnętrznych zasobów.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Wystarczy Chrome, Firefox, Edge lub Safari. Aby sprawdzić na telefonie, uruchom stronę przez dowolny serwer statyczny, np. `python -m http.server 8000` w tym katalogu, a potem otwórz adres komputera w tej samej sieci (`http://ADRES_IP:8000`).

## Sterowanie

- PC: `WASD` lub strzałki; łuk automatycznie strzela do najbliższego wroga.
- `P` / `Esc`: pauza i wznowienie (Esc w pełnym ekranie wychodzi z trybu pełnoekranowego).
- `F`: przełączenie pełnego ekranu; także przycisk obok pauzy i przycisk w menu startowym.
- `C`: panel statystyk na HUD oraz pod kartami (wstrzymuje walkę), zamykanie C, Esc lub ✕.
- Podczas awansu: kliknij jedną z trzech kart lub naciśnij `1`, `2`, `3`.
- Telefon: dwa joysticki dotykowe. Domyślnie prawy jest widoczny w pełni, a lewy w 10%; dotknięcie dowolnego joysticka zamienia ich widoczność i aktywuje sterowanie.

## Zakres prototypu

- Jedna klasa (Łotrzyk), jedna broń (Łuk), jedna arena (Zapomniany Trakt), pięć typów wrogów (3 slime’y i 2 gobliny).
- Ruch w czterech kierunkach, kamera śledząca postać, automatyczne celowanie, kolizje, punkty życia.
- Zdobywanie EXP i **powolniejsze** poziomowanie o rosnącym koszcie, zatrzymanie gry na wybór jednej z **3 losowych kart**.
- Limity poziomów kart, **2 sloty modyfikatorów**; odbijanie i dzielenie strzał można łączyć. Podział ma tylko jedno pokolenie, a odbicia są limitowane.
- Pięciominutowa próba przetrwania; ekran wygranej lub porażki oraz statystyki.
- Proceduralne proste grafiki pixel art w odcieniach ciemnego drewna, stali, kamienia i mchu. Docelowe sprite'y WebP i animacje zastąpią te tymczasowe rysunki.

## Zmiany w 0.0.5

- Karty wyraźnie pokazują numer wyboru 1, 2 albo 3 na dole.
- Pod kartami skrócone statystyki buildu oraz otwieranie szczegółowego panelu.
- Panel statystyk postaci pokazuje żywotność, EXP, obrażenia, interwał, szybkość strzelania, teoretyczny DPS, zasięg, szybkość ruchu, modyfikatory i ulepszenia.
- Statystyki liczone z tych samych parametrów co walka, otwarcie panelu zatrzymuje czas.
- Mocniejsze strzały: +2 obrażenia na poziom zamiast +5. Postęp 17 → 19 → 21 → 23.

## Zmiany w 0.0.4

- Przycisk pełnego ekranu obok pauzy w HUD, dostępny również jako przycisk w menu startowym.
- Skrót F do włączania/wyłączania pełnego ekranu.
- Wskaźnik stanu przycisku, obsługa powrotu do okna i przeliczania rozdzielczości Canvas.
- W przeglądarkach nieobsługujących Fullscreen API wyświetlany jest komunikat zamiast błędu.

## Zmiany w 0.0.3

- Kamera oddalona jeszcze trochę, z 0.82 do 0.74.
- Pięć typów przeciwników, odblokowywanych co 30 sekund. Wcześniejsze typy pozostają w puli:
  - 0 s: Zielony slime (wolny, najłatwiejszy).
  - 30 s: Niebieski slime (szybszy, wykonuje krótkie skoki na boki i zrywy).
  - 60 s: Czerwony slime (duży, wytrzymały, okazjonalnie przyspiesza).
  - 90 s: Goblin (walka wręcz, zygzakowaty pościg).
  - 120 s: Goblin łucznik (utrzymuje dystans, ostrzeliwuje i cofa się).
- Dodatkowe strzały przeciwników, czytelnie odróżnione od strzał gracza.
- EXP zależy od typu pokonanego wroga.
- Karty pokazują **obecny** poziom ulepszenia, np. 0/3 przed pierwszym wyborem. Opis mówi tylko co daje karta.
- Skalowanie rozstawu pojawiania się wrogów tak, by aktywnie walczyli również na szerokich ekranach.

## Zmiany w 0.0.2

- Dwa joysticki na telefonie (lewy i prawy), z przygaszeniem nieużywanego do 10%.
- Przełączanie aktywnego joysticka przez dotknięcie, sterowanie wyłącznie jednym joystickiem naraz.
- Kamera oddalona do 82% poprzedniego przybliżenia, widać większy obszar areny.

## Świadomie poza wersją 0.0.5

Brak pozostałych klas, ruletki startowej, konta, monet, sklepu, zapisywania postępu, rzadkości kart, kooperacji i gotowych animowanych assetów. To osobny prototyp, nie zmienia istniejącej strony świata Calionu.

## Główne parametry balansu (na próbę)

- RUN: `RUN_DURATION=300` sekund w `game.js`.
- Wprowadzanie typów wrogów: `ENEMY_UNLOCK_INTERVAL=30` sekund i `ENEMY_ROSTER`.
- Poziomy: `neededXp(level) = 8 + (level - 1) * 9`.
- 2 sloty modyfikatorów, do 2 poziomów każdy.
- Liczba przeciwników i pocisków jest ograniczona dla wydajności i czytelności.

## Pliki

- `index.html` – struktura strony i HUD.
- `style.css` – styl średniowieczny, UI i responsywność.
- `game.js` – logika i renderer Canvas 2D, bez bibliotek.

Żadnych plików graficznych nie trzeba na tym etapie pobierać. Wszystko działa lokalnie także bez połączenia z internetem.