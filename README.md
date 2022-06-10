<p>Opracowana usługa bazuje na dostarczonym przykładzie. Zawiera 3 strony: Home, Kalkulator ciągu geometrycznego GS Cal i stronę Documentation.<br></br>
      Aby uzyskać wynik obliczenia należy odświeżyć stronę.</p>
      <p>Usługa możliwia obliczenie wartości k-tego wyrazu ciągu geometrycznego o współćzynniku k (k mniejsze od 30) dla pierwszego wyrazu ciągu równego 2 (worker). <br></br>
        Ponadto zostały dodane endpointy w serwerze, które umożliwiają wyświetlanie ostatnich 5 współczynników k i wyników obliczeń (server). <br></br>Współczynniki
        są przechowywane w nowej tabeli "results", która przechowuje datę i czas wstawienia rekordu. Jest to wykorzystane do sortowania najnowszych współczynników.<br></br>
        <p><li>/values - dodaje nowy wpis do bazy danych PostgresSQL i Redis (współczynnnik i wynik)</li>
        <li>/values/all - zwraca 5 ostatnich wprowadzonych współczynników </li>
        <li>/values/history - zwraca 5 ostatnich wyników</li></p>
      </p>
      <p>Dockerfiles:<br></br>
      <b>Worker</b><br></br>
      Oba Dockerfile (rozwojowy i produkcyjny) są podobne. Bazują na obrazie alpine. W Dockerfile'u produkcyjnym są instalowane pakiety i moduły node, wystawiony jest port 5000. 
      Uruchamia się serwer.<br></br>
      <b>Server</b><br></br>
      Oba (rozwojowy i produkcyjny) są podobne. Bazują na obrazie alpine. W Dockerfile'u produkcyjnym są instalowane pakiety i moduły node, wystawiony jest port 5000. 
      Uruchamia się serwer.<br></br>
      <b>Nginx</b><br></br>
      Obie wersje są identyczne. Instalacja serweru ngnix. Plik z domyślną konfiguracją jest przeniesiony do katalogu "/etc/nginx/http.d/".<br></br>
      <b>Client</b><br></br>
      Dockerfile rozwojowy nie różni się od przykładowego. Natomiast w produkcyjnym zastosowano budowanie wieloetapowe w celu próby zmniejszenia rozmiaru obrazu.
      Stage1 zawiera budowanie aplikacji, a w stage2 następuje instalacja, konfiguracja serweru nginx i kopiowanie aplikacji z stage1.
      </p>
      <br>Architektura usługi:<br>
  <img src="client/src/arch.png" />
