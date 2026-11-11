# SPARROW Sport Club — Panel Trenera (MVP 1.0)

Prywatna, mobilna aplikacja dla trenera Sparrow Sport Club. Działa na Androidzie jako PWA, bez logowania i bez serwera. Po pierwszym otwarciu online aplikacja może uruchamiać się także offline. Dane treningów pozostają w pamięci przeglądarki/instalacji na telefonie (IndexedDB; awaryjnie localStorage).

## Funkcje już dostępne

- treningi grupowe: plan ćwiczeń, stanowiska, liczba obwodów, Tabata opcjonalna;
- treningi indywidualne: plan ćwiczeń, serie, powtórzenia, obciążenie;
- rozgrzewka i rozciąganie jako proste, zwijane sekcje z opcjonalnymi notatkami;
- timer: praca / zmiana stanowiska / przerwa między obwodami, pauza, przejście do poprzedniej/następnej fazy, krótkie sygnały dźwiękowe i opcjonalna wibracja;
- zapis planów, powielanie, historia wykonanych treningów;
- podopieczni: kartoteki i indywidualne wpisy postępów;
- eksport i przywrócenie lokalnych danych w JSON;
- wygląd nawiązujący do przesłanych znaków Sparrow: granat, niebieski, sportowa typografia, cienie i wypukłe przyciski;
- ekran startowy z **przykładowym** planem 8 stanowisk (można usunąć lub zmodyfikować).

## Ważne ograniczenia prototypu

- **Dźwięk sygnałów z jednocześnie grającą playlistą** trzeba przetestować na konkretnym Androidzie. Sygnały generuje Web Audio, ale zachowanie Spotify i innych aplikacji zależy od Androida i przeglądarki. Nie gwarantujemy nieprzerywania muzyki.
- Po zablokowaniu ekranu lub ubiciu Chrome przez system dźwięki mogą nie odtwarzać się we właściwych chwilach. Timer liczy upływ czasu na podstawie zegara, ale pracy w tle nie należy uznawać za gwarantowaną. W aktywnym timerze aplikacja próbuje utrzymać ekran włączony (Screen Wake Lock).
- Dane podopiecznych nie są w tej wersji szyfrowane osobnym hasłem. Używaj blokady Androida. Nie zapisuj danych szczególnie wrażliwych.
- Usunięcie danych witryny/instalacji może usunąć wpisy. Wykonuj regularnie eksport kopii zapasowej.
- Repozytorium zawiera wyłącznie kod i grafikę klubu, **nie** dane rzeczywistych podopiecznych.

## Publikowanie na GitHub Pages

1. Utwórz osobne repozytorium `sparrow-trainer` na swoim koncie GitHub, najlepiej **Public** (strona będzie widoczna publicznie, ale dane zapisane lokalnie nie będą publikowane). Zaznacz „Add a README file”, by powstała gałąź `main`.
2. Wgraj zawartość tego folderu do katalogu głównego repozytorium, zachowując katalog `assets/`.
3. W `Settings → Pages` ustaw `Build and deployment → Deploy from a branch`, następnie `main` i `/ (root)` oraz `Save`.
4. Po wdrożeniu otwórz `https://artystaakrobata.github.io/sparrow-trainer/` w Chrome na Androidzie i wybierz z menu „Zainstaluj aplikację” lub „Dodaj do ekranu głównego”.
5. Otwórz ją raz przy dostępie do internetu, a następnie wyłącz internet i sprawdź ponowne uruchomienie.

> **Jeżeli ChatGPT ma dostęp do nowego repozytorium przez połączony GitHub, może wgrać za Ciebie pliki bez ręcznego kopiowania z ZIP.**

## Pliki

- `index.html` — struktura strony i uruchomienie
- `styles.css` — warstwa wizualna, efekt wypukłych kart i przycisków
- `app.js` — logika, planer, historia, timer, kartoteki, baza danych
- `sw.js` — cache potrzebny do działania offline
- `manifest.webmanifest` — dane instalacji PWA
- `assets/` — logo, emblemat, ikony

## Test na telefonie Jarka

1. Utwórz trening, zmień liczbę stanowisk i ustawienia pracy/przerwy.
2. Włącz muzykę z normalnej playlisty, potem Tabatę, sprawdź czy sygnały przyciszają, pauzują lub przerywają muzykę.
3. Przetestuj sygnały po zminimalizowaniu aplikacji i po zablokowaniu ekranu — zgłoś każde odchylenie.
4. Włącz tryb samolotowy i sprawdź trening oraz zapis postępów.
5. Utwórz kopię JSON, przywróć ją i zweryfikuj plan oraz kartotekę.

Wersja: **1.0.0 — prototyp do testów, nie finalna aplikacja produkcyjna**.