# Wybór architektury - Samotna lokalna aplikacja frontendowa bez bazy danych

## Kontekst (znane drivery):

### 1. Wymagania funkcjonalne
  - **Ewidencja informacji o dokonanych naprawach**
  - Przypomnienie o konieczności wymiany oleju
  - **Tylko jeden użytkownik**
  - **Nie wymaga logowania**
  - **Brak dostępu do Internetu przez użytkownika**
  - Konieczność zapewnienia kopii zapasowych co jakiś czas
##2. Atrybuty jakościowe
  - Brak
### 3. Ograniczenia projektowe
  - **Jak najszybciej**
  - **Ograniczona wiedza - największa wiedza w zakresie aplikacji frontendowych (Angular), mniejsza w Django, słaba wiedza w zakresie aplikacji backendowych** 
### 4. Konwencje
  - **Pisanie kodu z zastosowaniem technologii powiązanych z Angularem**
### 5. Cele projektowe
  - Nauka nowych technologii przy okazji napisania aplikacji
  - **Rozwijanie umiejętności pisania aplikacji w Angular**
   
## Konsekwencje
  - Konieczność korzystania z przeglądarki (w przypadku braku zastosowania Elektrona)
  - Możliwość rozwoju aplikacji - dodanie aplikacji backendowej, bazy danych, hostowania aplikacji
  - Możliwość koszystania z json-server zamiast bazy danych
  
## Alternatywy
  - Architektura mikroserwisowa - odrzucone ze względu na brak wiedzy i czasu
  - Aplikacja desktopowa - odrzucone ze względu na wyższy próg wejścia (ograniczenia wiedzy) oraz ze względu na konwencję pisania aplikacji w Angular (najszybciej + największa i najświeższa wiedza). W przyszłośći możliwość wykorzystania Elektrona do zmiany z aplikacji webowej na desktopową przy zachowaniu kodu źródłowego.
  - Aplikacja mobilna - odrzucone ze względu na wyższe koszty (czas) zapewnienia wymagań funkcjonalnych (kopia zapasowa), brak wiedzy, trudność wdrożenia 
  
