# Wybór bazy danych - brak bazy danych - dane przechowywane w pliku .JSON

## Kontekst (znane drivery):

### 1. Wymagania funkcjonalne
  - **Ewidencja informacji o dokonanych naprawach**
  - Przypomnienie o konieczności wymiany oleju
  - **Tylko jeden użytkownik**
  - Nie wymaga logowania
  - **Brak dostępu do Internetu przez użytkownika**
  - **Konieczność zapewnienia kopii zapasowych co jakiś czas**
##2. Atrybuty jakościowe
  - Brak
### 3. Ograniczenia projektowe
  - **Jak najszybciej**
  - **Ograniczona wiedza - największa wiedza w zakresie aplikacji frontendowych (Angular), mniejsza w Django, słaba wiedza w zakresie aplikacji backendowych** 
### 4. Konwencje
  - Pisanie kodu z zastosowaniem technologii powiązanych z Angularem
### 5. Cele projektowe
  - Nauka nowych technologii przy okazji napisania aplikacji
  - Rozwijanie umiejętności pisania apliakcji w Angular
   
## Konsekwencje
  - Łatwość kopii zapasowych (konieczność trzymania pliku na Dropbox, który co jakiś czas przy dostępie do internetu zapweni kopię zapasową)
  - Brak potrzeby implementacji bazy danych 
  
## Alternatywy
  - Lokalna baza danych - odrzucone ze względu na czas implementacji (bardziej zaawansowane rozwiązanie, wymaga aplikacji backendowej). Jednak docelowo należy obecne rozwiązanie zmienić na lokalną bazę danych.
  - Baza danych na serwerze - odrzucone ze względu na czas implementacji i brak dostępu do internetu
