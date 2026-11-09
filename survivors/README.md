# Calion Survivors · prototyp 0.0.10

Pierwsza niezależna próba gry typu Survivors w świecie Calionu. Wersja **0.0.10** to w pełni działający prototyp przeglądarkowy, bez zależności, budowania projektu ani zewnętrznych zasobów.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Wystarczy Chrome, Firefox, Edge lub Safari. Aby sprawdzić na telefonie, uruchom stronę przez dowolny serwer statyczny, np. `python -m http.server 8000` w tym katalogu, a potem otwórz adres komputera w tej samej sieci (`http://ADRES_IP:8000`).

## Sterowanie

- PC: `WSAD` lub strzałki; łuk automatycznie strzela do najbliższego wroga.
- `P` / `Esc`: pauza i wznowienie (Esc w pełnym ekranie wychodzi z trybu pełnoekranowego).
- `F`: przełączenie pełnego ekranu; także przycisk obok pauzy i przycisk w menu startowym.
- `C`: panel statystyk na HUD oraz pod kartami (wstrzymuje walkę), zamykanie C, Esc lub ✕.
- Podczas awansu: kliknij jedną z trzech kart lub naciśnij `1`, `2`, `3`.
- Telefon: dwa joysticki dotykowe. Domyślnie prawy jest widoczny w pełni, a lewy w 10%; dotknięcie dowolnego joysticka zamienia ich widoczność i aktywuje sterowanie.

## Zakres prototypu

- Jedna klasa (Łotrzyk), jedna broń (Łuk), jedna arena (Zapomniany Trakt), pięć podstawowych typów wrogów (3 slime’y i 2 gobliny) oraz elitarny Spaczony slime.
- Ruch w czterech kierunkach, kamera śledząca postać, automatyczne celowanie, kolizje, punkty życia.
- Zdobywanie EXP i **powolniejsze** poziomowanie o rosnącym koszcie, zatrzymanie gry na wybór jednej z **3 losowych kart**.
- Limity poziomów kart, **2 sloty modyfikatorów**; odbijanie i dzielenie strzał **wzajemnie się wykluczają**. Podział ma tylko jedno pokolenie, a odbicia są limitowane.
- Pięciominutowa próba przetrwania; ekran wygranej lub porażki oraz statystyki.
- Proceduralne proste grafiki pixel art w odcieniach ciemnego drewna, stali, kamienia i mchu. Docelowe sprite'y WebP i animacje zastąpią te tymczasowe rysunki.

## Zmiany w 0.0.10

- Niebieski slime zamiast skoku wykonuje **sprint/szarżę**. Ostrzeżenie to wąska niebieska linia wskazująca od punktu startowego po koniec szarży. Ostrzeżenie trwa 0,42 sekundy, sprint trwa 0,26 sekundy i sięga do 112 jednostek.
- Sprint ma kolizję z graczem na całej przebytej trasie, daje maksymalnie jedno trafienie za **8 HP** i nie ma obrażeń obszarowych. Trasę ustala się na początku ostrzeżenia, więc można ją ominąć. Po sprincie slime odpoczywa przez 0,48 sekundy.
- Czerwony slime i Spaczony slime zachowują skok z okręgiem ostrzegawczym i obrażeniami obszarowymi, bez zmian balansu.
- Bohater po otrzymaniu obrażeń krótko rozbłyska ciepłym, jasnym konturem przez 0,23 sekundy. Po wygaśnięciu rozbłysku pozostaje dotychczasowe miganie sygnalizujące chwilową odporność na kolejne trafienia.
- Nie zmieniono obrażeń łuku, HP, liczby przeciwników ani rozwoju kart.

## Zmiany w 0.0.9

- Startowe HP Łotrzyka zmniejszone ze 120 do **100 HP**; ulepszenie Hart ducha pozostaje +20 HP.
- Tekst sterowania na ekranie startowym i w instrukcji: **PC: WSAD / strzałki**. Samo sterowanie W/A/S/D pozostaje bez zmian.
- Niebieski slime w v0.0.9 przygotowywał skok przez 0,42 s na odległość do 94 jednostek z niebieskim okręgiem celu (mechanika zastąpiona sprintem z linią w v0.0.10).
- Czerwony slime przygotowuje skok przez 0,68 s, pokonuje do 115 jednostek i przy lądowaniu zadaje **11 obrażeń** w promieniu **35 jednostek**. Obszar jest zaznaczony na ziemi przed atakiem. Można uniknąć trafienia, zmieniając pozycję.
- Co **60 sekund** (1:00, 2:00, 3:00, 4:00) pojawia się elitarny **Spaczony slime**: duży fioletowy wróg z koroną, zwiększonym HP (150 bazowo), większym zasięgiem skoku, ostrzeżeniem o ataku obszarowym (46 jednostek, 16 obrażeń), wyraźnym paskiem HP i 8 EXP za pokonanie.
- Częstotliwość pojawiania się zwykłych przeciwników nieznacznie zwiększona (interwał od 1,60 do 0,80 s, wcześniej od 1,85 do 0,92 s). Maksymalna liczba przeciwników zwiększona **48 → 58**. Miejsce dla elity jest rezerwowane również przy pełnym limicie.
- Ostrzeżenia i animacje lądowania są rysowane bez dodatkowych assetów. Atak obszarowy zadaje obrażenia tylko przy lądowaniu, nie przez cały czas ostrzeżenia.
- Poza tym zachowano dotychczasowe poziomy ulepszeń, szanse odbić i ograniczenia modyfikatorów.

## Zmiany w 0.0.8

- Paski życia **wszystkich wrogów** przeniesione pod sprite'y. Nadal pojawiają się po otrzymaniu obrażeń; to test położenia przed ostatecznym wyborem.
- **Odbijająca strzała** ma pięć poziomów szansy: 20%, 40%, 60%, 80%, 100%. Przed wyborem 0%, po pierwszej karcie 20%. Przy trafieniu i obecności kolejnego celu w zasięgu 140 jednostek wykonywany jest osobny rzut szansy. Maksymalnie dwa odbicia na strzałę, każde kolejne osłabia ją o 25%.
- **Odbijająca strzała** i **Rozdzielenie** wzajemnie się wykluczają w trakcie jednej wyprawy. Po wyborze jednego drugi nie pojawia się w kartach i nie może zostać wybrany nawet przez stary zapis oferty.
- Karta odbicia pokazuje aktualną i kolejną szansę procentową, a obie karty modyfikatorów wskazują konflikt.
- Panel statystyk pokazuje procent szansy odbicia i wyraźnie oznacza drugi modyfikator jako zablokowany z powodem. HUD pokazuje procent odbicia zamiast liczby odbić.
- Nie zmieniono bazowych obrażeń, HP przeciwników, ani pozostałych statystyk.

## Zmiany w 0.0.7

- Panel statystyk postaci: trzy kolumny obok siebie na PC dla statystyk i ulepszeń. Bardziej kompaktowe kafelki, mniejsze odstępy i większa maksymalna szerokość panelu. Na mniejszych ekranach automatycznie przechodzi do dwóch kolumn, żeby liczby i etykiety pozostały czytelne.
- Zielone i niebieskie slime’y wyświetlają teraz paski HP po otrzymaniu obrażeń, tak samo jak pozostali przeciwnicy. Kolorowe paski pokazują również ostatni 1 HP.
- Bez zmian w statystykach i sile przeciwników.

## Zmiany w 0.0.6

- Zielony slime ma 18 bazowych HP zamiast 14. Pierwsza podstawowa strzała zadaje 17 obrażeń, więc wymaga drugiego trafienia bez ulepszeń (HP wrogów wciąż rośnie delikatnie z czasem).
- Zestaw czytelnych, wektorowych ikonek przy wszystkich dokładnych statystykach i poziomach ulepszeń. Ikony wyróżniają życie, EXP, obrażenia, tempo ataku, ruch i modyfikatory. Bez zewnętrznych bibliotek i zasobów.
- Bez innych zmian balansu. +2 obrażenia za poziom pozostaje bez zmian.

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

## Świadomie poza wersją 0.0.9

Brak pozostałych klas, ruletki startowej, konta, monet, sklepu, zapisywania postępu, rzadkości kart, kooperacji i gotowych animowanych assetów. To osobny prototyp, nie zmienia istniejącej strony świata Calionu.

## Główne parametry balansu (na próbę)

- RUN: `RUN_DURATION=300` sekund w `game.js`.
- Wprowadzanie typów wrogów: `ENEMY_UNLOCK_INTERVAL=30` sekund i `ENEMY_ROSTER`.
- Poziomy: `neededXp(level) = 8 + (level - 1) * 9`.
- 2 sloty modyfikatorów w HUD (na razie dostępny jest jeden z dwóch wzajemnie wykluczających się efektów). Odbicie ma 5 poziomów (20–100% szansy), Rozdzielenie 2 poziomy.
- Liczba przeciwników i pocisków jest ograniczona dla wydajności i czytelności.

## Pliki

- `index.html` – struktura strony i HUD.
- `style.css` – styl średniowieczny, UI i responsywność.
- `game.js` – logika i renderer Canvas 2D, bez bibliotek.

Żadnych plików graficznych nie trzeba na tym etapie pobierać. Wszystko działa lokalnie także bez połączenia z internetem.