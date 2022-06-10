<p>Użyte polecenia:<br>
  <b>
  docker build -t ek00/zad2:nazwa_obrazu* -f Dockerfile .<br>
  docker push ek00/zad2:nazwa_obrazu*<br>
  . secrets.sh<br>
  docker compose -f docker-compose.yml up<br></b>
  *nazwa_obrazu=client_prod/server_prod/nginx_prod/worker_prod
 
 Plik produlcyjny korzysta z gotowych, zbudowanych i wrzuconych na repozytorium DockerHub obrazów.
 W pliku produkcyjnym tak samo jak w rozwojowym są dwie utworzone sieci: front i back. Dodatkowo został dodany wolumen do przechowywania danych z Postgresa. Zmienne środowiskowe są również
przechowywane w folderach .config, lecz ich wartości są przechowywane w pliku secrets.sh, któy jest instalowany w Shellu. Stamtąd są pobierane i odpowiednio przypisywane do zmiennych.

</p>
    
<p align="center">
  <img src="images/prod/1.png" />
  <img src="images/prod/2.png" />
  <img src="images/1.png" />
  <img src="images/2.png" />
  <img src="images/4.png" />
  
</p
