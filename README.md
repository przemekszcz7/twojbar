# Twój Bar - Domowe Obiady (Strona Internetowa)

Profesjonalna, responsywna i przytulna strona internetowa typu Single Page Application (SPA) dla restauracji **Twój Bar Domowe Obiady** z lokalizacją w Szczecinie.

## Funkcje strony:
1. **Dynamiczne godziny otwarcia i status**: Strona sprawdza czas strefy polskiej i automatycznie informuje klientów, czy lokal jest obecnie otwarty (Pn - Pt 12:00 - 17:00).
2. **Interaktywne Dania Dnia**: Automatycznie podświetla i rekomenduje rzetelny zestaw obiadowy na dzisiejszy dzień roboczy z opcją przełączania pozostałych dni tygodnia.
3. **Kalkulator Zamówień z dowozem**: Klienci mogą składać wirtualne zamówienia i obliczać szacowaną cenę obiadów przed wykonaniem połączenia telefonicznego.
4. **Referencje i Integracja z Facebookiem**: Blok opinii zintegrowany z autentycznymi recenzjami użytkowników oraz bezpośrednimi łączami do profilu FB.
5. **Responsywność i mobilność**: Pełne dostosowanie do ekranów smartfonów, tabletów i komputerów w oparciu o architekturę Tailwind CSS v4.

---

## 🚀 Przygotowanie do wdrożenia przez GitHub Pages (Deploy on Push)

Strona została w pełni przystosowana do darmowej publikacji w usłudze **GitHub Pages**. Zgodnie z wytycznymi, wdrożona została automatyzacja, która aktualizuje stronę przy każdym wypchnięciu zmian (`git push`).

### ⚙️ Jak aktywować automatyczne wdrożenia w repozytorium GitHub:

Po przekazaniu kodu do nowego repozytorium na Githubie wykonaj poniższe, proste kroki:

1. **Ustawienia uprawnień Actions (jednorazowo):**
   - Wejdź w zakładkę **Settings** (Ustawienia) Twojego repozytorium na GitHubie.
   - Wybierz z lewego menu sekcję **Actions** -> **General**.
   - Przewiń na sam dół do sekcji **Workflow permissions**.
   - Zaznacz opcję: **"Read and write permissions"** (pozwala to skryptowi we workflow zapisać skompilowane pliki do brancha `gh-pages`).
   - Kliknij zielony przycisk **Save**.

2. **Włącz GitHub Pages z odpowiedniej gałęzi:**
   - Gdy wykonasz pierwszego pusha do brancha `main` lub `master`, uruchomi się automatyczny proces budowania (zakładka **Actions** w GitHubie).
   - Skrypt stworzy automatyczną gałąź o nazwie `gh-pages` z wersją produkcyjną.
   - Po pierwszym pomyślnym wykonaniu akcji (zielony ptaszek), wejdź w **Settings** -> **Pages**.
   - W sekcji **Build and deployment** upewnij się, że jako Source ustawione jest **"Deploy from a branch"**.
   - W polu **Branch** wybierz z listy `gh-pages` oraz folder `/ (root)`.
   - Kliknij **Save**.

Twoja witryna ukaże się pod publicznym adresem: `https://[twój-login].github.io/[nazwa-repozytorium]/` w ciągu niespełna minuty! Dzięki konfiguracji `base: './'` w pliku `vite.config.ts` wszystkie zasoby graficzne, skrypty i arkusze stylów załadują się idealnie niezależnie od nazwy Twojego repozytorium.
