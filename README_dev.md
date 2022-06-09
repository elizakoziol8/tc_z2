<p>Użyte polecenia do zbudowania/uruchomienia usługi:<br>
  <b>docker compose -f dokcer-compose.dev.yml up --build<br>
    docker compose -f docker-compose.dev.yml up
  </b>
<br>
Plik docker-compose.dev.yml pozwala na uruchomienie usługi w fazie rozwojowej. Obrazy mikrousług są budowane na podstawie zdefiniowanych plików Dockerfile.dev.
  Plik docker-compose.dev.yml zawiera dwie sieci: front (do której podłączony jest nginx i wystawiony port 3050 jak w przykładzie) i back (tu podłączone są wszystkie kontenery). Zmienne środowiskowe są zdefiniowane w poszczególnych katalogach usług w podfolderze .config. Dla Postgressa folder .config znajduje się w głównym katalogu projektu. Kontenery widzą zmiany w kodzie na bieżąco, co jest spowodowane bindowaniem ich z katalogami z kodem źródłowym.
</p>

<p align="center">
 <img src="images/dev/1">
</p>
