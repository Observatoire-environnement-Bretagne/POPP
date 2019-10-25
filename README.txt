
INSTALLATION
---------------------
PRÉREQUIS
---------
Pour installer la POPP, ces packages doivent être installés
PostgreSQL >=9.5
PHP >=5.6
Postgis >=1.5
Apache >=2.2
------------

DATABASE
------------
pour installer la base de données nous avons simplifié la démarche
un dump contenant quelques exemples est mis à votre disposition

Etapes :

1. Créer une base de données vide (popp par exemple)
2. Télécharger le projet vers le dossier de votre serveur web Apache (/var/www/html)
3. Le fichier sites/popp_db.sql  est mis à votre disposition
4. Importer ce fichier popp_db.sql dans la base de données créée (popp)
   via la commande psql popp < popp_db.sql



CONFIGURATION
--------------------------
1. ouvrir le fichier sites/default/settings.php
2. modifier les parametres d'accés à la base de données
3. modifier si necessaire le parametre $base_url dans ce même fichier
4. ouvrir le navigateur et tapez http://localhost/popp
on suppose que l'application est installée en local
