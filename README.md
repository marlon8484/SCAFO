# ProdukcjaApp — instrukcja wdrożenia

## Krok 1 — Załóż konto GitHub
1. Wejdź na https://github.com i załóż darmowe konto
2. Kliknij **New repository** (zielony przycisk)
3. Nazwa repozytorium: `produkcja-app`
4. Zaznacz **Public**
5. Kliknij **Create repository**

## Krok 2 — Wgraj pliki
1. W repozytorium kliknij **uploading an existing file**
2. Przeciągnij wszystkie pliki z tego folderu:
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
3. Kliknij **Commit changes**

## Krok 3 — Włącz GitHub Pages
1. Wejdź w **Settings** repozytorium
2. W menu po lewej kliknij **Pages**
3. W sekcji **Branch** wybierz `main` i kliknij **Save**
4. Po chwili adres aplikacji to: `https://TWOJA_NAZWA.github.io/produkcja-app/`

## Krok 4 — Zainstaluj na telefonie

### Android (Chrome):
1. Otwórz adres aplikacji w Chrome
2. Pojawi się baner "Dodaj do ekranu głównego" — kliknij
3. Lub: menu (3 kropki) → Zainstaluj aplikację

### iPhone (Safari):
1. Otwórz adres w Safari
2. Kliknij ikonę Udostępnij (kwadrat ze strzałką)
3. Wybierz "Dodaj do ekranu głównego"

## PIN managera
Domyślny PIN managera to: **0000**
Zmień go przed wdrożeniem — otwórz index.html i znajdź linię:
`const MANAGER_PIN='0000';`
Zmień 0000 na własny 4-cyfrowy PIN.
