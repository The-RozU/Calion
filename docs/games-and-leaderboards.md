# Calion Games — portal gier, profile graczy i rankingi

Stan: wersja portalu 0.0.82. Na gałęzi dev-mode podłączono konto Supabase (rejestracja e-mail, logowanie, zmiana nicku) i odczyt tabel z RLS. Kalon dev-mode korzysta z Edge Function kalon-runs. Wyniki są BETA i jeszcze nie są odporne na oszustwa w grze przeglądarkowej.

## Biblioteka
- Kalon (0.5.6), grywalny w ramce z adresu https://the-rozu.github.io/Karcianka/
- Calion Survivors, projekt bez grywalnej publikacji w obecnym portalu
- Calion Tower Defence (0.0.2): https://the-rozu.github.io/Calion-TD/
- CalioBonk (0.0.29): https://the-rozu.github.io/CalioBonk/
- Endless Horde (0.0.19): https://the-rozu.github.io/Endless-Horde/

Trzy nowe gry są osadzone z GitHub Pages; ich rankingi są jeszcze niepodłączone. Idle RPG usunięto z katalogu i zakładek rankingów portalu, bez kasowania danych Supabase. Sesja Kalona jest przekazywana wyłącznie do jego ramki.

Gra jest uruchamiana wewnątrz zakładki Gry przez iframe. Jest przycisk pełnego ekranu i alternatywa w nowej karcie, gdy przeglądarka nie pozwala na osadzenie. Gry zostają w osobnych repozytoriach, więc nie dublujemy kodu. Gry obecnie niedostępne nie są oznaczone jako grywalne.

## Tożsamość
- Gość: może wejść do dowolnej dostępnej gry bez rejestracji. Lokalny zapis stanu zależy od gry i ustawień przeglądarki.
- Konto Calionu: jeden publiczny nick, ewentualny awatar, osiągnięcia i najlepsze wyniki z każdej gry.
- Przeglądanie rankingów jest publiczne; przesłanie wyniku i historia konta wymagają zalogowania.
- Rozważany backend: Supabase Auth (magic link, opcjonalnie Google / GitHub) + Postgres + Edge Functions.
- Właściciel musi utworzyć własny projekt i skonfigurować logowanie. GitHub Pages sam z siebie nie oferuje bazy danych ani bezpiecznej weryfikacji wyników.

## Ranking indywidualny
Osobna tablica dla każdej gry: miejsce, nick, najlepszy zweryfikowany wynik. W tabeli głównej jest tylko jedno najlepsze podejście na gracza i grę. Więcej podejść może znaleźć się w prywatnej historii konta.

Reguła naliczania punktów jest indywidualna dla każdej gry. W Kalonie kryterium będzie wynik ukończonej wyprawy, ale zatwierdzona formuła końcowa wymaga połączenia z mechaniką gry, ponieważ pojęcie punktów w interfejsie może oznaczać również wynik układów kart.

## Ranking ogólny
Nie sumujemy surowych punktów różnych gier. Ranking ogólny otrzymuje osobne punkty Calionu za miejsce zajęte w każdej opublikowanej grze, np. orientacyjnie: 1. miejsce 1000, 2. 800, 3. 650, dalsze lokaty odpowiednio mniej. Punkty z aktywnych gier sumują się, brak gry daje 0. Ranking powinien uwzględniać liczbę aktywnych graczy, aby nie nagradzać zbyt mocno pustych tabel. Dokładne progi i zasady remisów wymagają zatwierdzenia przy wdrożeniu serwera.

Możliwe późniejsze zakładki: ranking tygodnia, sezonowy oraz wszech czasów. Sezony powinny mieć osobne archiwa wyników.

## Proponowane struktury danych
- profiles: id UUID (odwołanie do użytkownika Auth), display_name, avatar_url, created_at
- games: id TEXT, title, published, score_unit, score_direction
- runs: id UUID, user_id, game_id, game_version, started_at, ended_at, score, verification_status
- best_scores: user_id, game_id, run_id, best_score, updated_at (unikalna para user_id + game_id)
- global_standings: wyliczane punkty Calionu z zatwierdzonych rankingów gier

Włącz RLS i ograniczenia dostępu do tabel. Przeglądarka może czytać wyłącznie publiczne profile i zatwierdzone wyniki. Nie może wstawiać własnych rekordów do best_scores. Zapis końcowego wyniku przeprowadza serwerowa funkcja z uwierzytelnieniem i limitami zapytań.

## Weryfikacja wyników
Samo zalogowanie użytkownika nie chroni przed oszukiwaniem wyniku, jeśli gra działa po stronie przeglądarki. Kalon musi zgłaszać zdarzenia ze swojej rozgrywki albo korzystać z powtarzalnych ziaren losowania, które serwer potrafi zweryfikować. Dopiero wynik zaakceptowany przez serwer może wejść do głównego rankingu.

Proponowany protokół:
1. Gracz loguje się do portalu.
2. Przy starcie rozgrywki serwer wystawia identyfikator rundy i podpisane parametry.
3. Gra emituje dane zakończenia rozgrywki oraz dziennik wymaganych zdarzeń.
4. Serwer potwierdza sesję, legalność stanu i wynik, a następnie aktualizuje najlepszy wynik.
5. Tablica ogólna przelicza punkty Calionu.

W przypadku wykorzystania postMessage z iframe należy walidować origin, source, identyfikator gry oraz wersję protokołu. Nie wolno wysyłać service_role ani sekretów przez przeglądarkę. Komunikat z gry nie jest sam w sobie dowodem uczciwego wyniku.

## Publiczny interfejs odczytu (po uruchomieniu backendu)
Frontend w assets/game-hub.js obsługuje opcjonalny obiekt ustawiony PRZED jego wczytaniem:

    window.CalionRankingConfig = { apiBase: "https://ADRES-SERWERA/leaderboard" };

Taki URL jest tylko wzorem. Nie dodawać go do produkcyjnego portalu dopóki usługa nie istnieje. Endpoint GET przyjmuje parametry board=overall lub board=kalon i limit=50. Odpowiedź JSON:

    {"entries":[{"nickname":"PRZYKŁADOWY_GRACZ","score":100}]}

To wyłącznie kształt odpowiedzi, nie prawdziwy wynik. Jeśli API nie jest podłączone, portal pokazuje informację o oczekującym systemie zamiast udawać ranking.

## Następne etapy
1. Test Kalona osadzonego w portalu na komputerze i telefonie, w poziomie i pionie.
2. Uruchomienie Supabase Auth i bazy; migracje, zabezpieczenia, publiczne endpointy.
3. Integracja kodu Kalona z bezpieczną weryfikacją ukończonej rozgrywki.
4. Aktywacja pierwszego prawdziwego rankingu gry i rankingu ogólnego; dodawanie kolejnych gier.


## Aktualne wdrożenie testowe (2026-11-23)
- Supabase: `https://jwwvwhomjqnozyqwbzwp.supabase.co`, projekt w darmowym planie, Frankfurt. W kodzie frontendu znajduje się jedynie klucz **publishable**.
- Konta przez Supabase Auth. Potwierdzenie e-mail może być wymagane w zależności od ustawień Auth. Profile mają publiczny nick i RLS.
- Publiczne zestawienia: `game_leaderboard`, `global_leaderboard`. Zapisy `player_game_scores` dostępne tylko backendowi.
- Kalon dev-mode: `https://raw.githack.com/The-RozU/Karcianka/dev-mode/index.html`. Produkcyjna wersja Kalona na GitHub Pages nie jest zmieniana.
- Funkcja `kalon-runs` wymaga JWT; serwer zakłada sesję przy rozpoczęciu, sprawdza czas i spójność podstawowych statystyk, a potem atomowo aktualizuje najlepszy wynik.
- Punktacja Kalona BETA: 1000 za pokonanego bossa + 20 za przeciwnika + 5 za losowe wydarzenie. Punktacja może zostać zmieniona.
- **Uczciwość:** statystyki przychodzą z klienta. Podstawowe sanity-checki serwera nie stanowią pełnej walidacji przebiegu gry; ranking jest testowy i nie należy traktować go jako turniejowego.
- Jeśli testujesz logowanie przez raw.githack, pamiętaj, że jest to tymczasowy host podglądowy o współdzielonej domenie. Docelowo podgląd z kontami trzeba hostować na własnym subdomenowym originie i skonfigurować Auth Site URL / Redirect URLs.

- Integracja iframe: `calion:request-session` / `calion:session`, z kontrolą `event.source`, `event.origin`, `game`, `version`. Długie wyprawy pobierają odświeżoną sesję przed zapisem.
- W trybie podglądu nie podawaj hasła używanego w innych usługach. `raw.githack.com` współdzieli origin między różnymi repozytoriami.
