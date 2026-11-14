# SPARROW Sport Club — Panel Trenera (MVP 1.0)

Prywatna, mobilna aplikacja dla trenera Sparrow Sport Club. Działa na Androidzie jako PWA, bez logowania i bez serwera. Po pierwszym otwarciu online aplikacja może uruchamiać się także offline. Dane treningów pozostają w pamięci przeglądarki/instalacji na telefonie (IndexedDB; awaryjnie localStorage).

## Funkcje już dostępne

- treningi grupowe: plan ćwiczeń, stanowiska, liczba obwodów, Tabata opcjonalna;
- treningi indywidualne: plan ćwiczeń, serie, powtórzenia, obciążenie;
- rozgrzewka i rozciąganie jako proste, zwijane sekcje z opcjonalnymi notatkami;
- timer: praca / zmiana stanowiska / przerwa między obwodami, pauza, przechodzenie między fazami oraz pięć zaakceptowanych nagrań obsługujących sześć typów sygnałów;
- zapis planów, powielanie, historia wykonanych treningów;
- lokalne szkice nowych treningów, które można wznowić po cofnięciu lub ponownym otwarciu aplikacji;
- podopieczni: kartoteki i indywidualne wpisy postępów;
- eksport i przywracanie lokalnych danych w JSON dostępne w **Ustawieniach**;
- wygląd nawiązujący do przesłanych znaków Sparrow: granat, niebieski, sportowa typografia, cienie i wypukłe przyciski;
- ekran startowy z **przykładowym** planem 8 stanowisk (można usunąć lub zmodyfikować).

## Ważne ograniczenia prototypu

- **Odtwarzanie nagrań równolegle z muzyką** trzeba przetestować na konkretnym Androidzie. Aplikacja korzysta z Web Audio do odtwarzania lokalnych nagrań, ale współpraca ze Spotify zależy od telefonu i przeglądarki. Nie gwarantujemy nieprzerywania muzyki.
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

Wersja: **1.0.24 — prototyp do testów na Androidzie, nie finalna aplikacja produkcyjna**.

### Panel Ustawienia v1.0.23

- dźwięki globalnie: włącz/wyłącz;
- wibracje: włącz/wyłącz, niezależnie od dźwięków;
- sześć niezależnych przełączników: przygotowanie 10–1, głos GO!, odliczanie 3+1 na końcu ćwiczenia/zmiany stanowiska, tykanie zegara, odliczanie 10–1 między obwodami, fanfara końca treningu;
- nie ma wyboru alternatywnych brzmień ani automatycznych sygnałów zastępczych. Wszystkie bieżące nagrania są zapisane lokalnie w cache PWA.
## Ikona aplikacji na telefon (v1.0.23)

- Wybrana przez właściciela ikona SPARROW w granacie i błękicie, przygotowana w PNG 192 × 192, 512 × 512 i wersji maskowalnej 512 × 512 dla Androida.
- Ikona instalacji jest przypisana w `manifest.webmanifest`; ikona dla iOS w `index.html` (180 × 180).
- Jeśli aplikacja była już zainstalowana, Android może przez jakiś czas zachowywać starą ikonę. Przed ewentualnym odinstalowaniem należy **wyeksportować kopię zapasową JSON w Ustawieniach**, ponieważ usunięcie aplikacji może wyczyścić lokalne dane treningowe.

## Szkice treningów (v1.0.24)

Nowy trening jest zapisywany jako lokalny szkic w trakcie wpisywania. Wróć do niego przez **Kontynuuj szkic** tam, gdzie rozpoczęto plan. Dopiero **Zapisz trening** dodaje go do listy planów. **Usuń szkic** pozwala zacząć od nowa.
