# POPP
La Plateforme des Observatoires Photographiques du Paysage de Bretagne, la POPP-Breizh, est un projet à l’initiative du Conseil Régional de Bretagne, de la DREAL Bretagne et de l’UMR CNRS 6590 ESO. Cet outil a pour finalité d’analyser les dynamiques paysagères en Bretagne.

La POPP-Breizh facilite l'exploitation des OPP par la gouvernance territoriale. La plateforme, en tant que telle, est un projet qui fédère les différents acteurs qui composent la gouvernance sur les territoires. Plus de trente acteurs de la connaissance paysagère en Bretagne se sont réunis au fur et à mesure du projet pour partager leurs compétences, leurs moyens et leurs expériences. Finalement, la plateforme impulse une dynamique régionale autour des questions paysagères avec 4 OPP en 2011 contre 25 en 2019. 

Depuis 2018, la POPP-Breizh est administrée par le pôle paysages de l’Observatoire de l’Environnement en Bretagne (OEB). Toute institution bretonne qui souhaite créer son OPP ou intégrer ses séries photographiques, peut contacter l’OEB afin de contribuer au projet. Par ailleurs, l’OEB recherche des partenaires dans d’autres régions en France ou à l’international pour déployer d’autres plateformes à partir du logiciel de la POPP.



<h1>INSTALLATION</h1>
La popp est développée sous le CMS Drupal

---------------------
<h2>PRÉREQUIS</h2>

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
5. Vous pouvez vous connecter avec le user admin/admin

Mailing :
pour la partie envoi de Mail, veuillez modifier files
parametres smtp sous : http://votre_url/admin/config/system/smtp
