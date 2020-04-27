DROP USER IF EXISTS 'monBanquierUser';
CREATE USER IF NOT EXISTS 'monBanquierUser'@'%' IDENTIFIED BY 'IAMABANQUIER' ;
drop database if exists monBanquierBD;
create database IF NOT EXISTS monBanquierBD;
grant all on monBanquierBD.* to 'monBanquierUser'@'%' WITH GRANT OPTION ;


INSERT INTO
  users (userNom, userPrenom, userEmail, userPassword)
values(
    'Raschetti',
    'Simon',
    'simon.raschetti@orange.fr',
    '12345'
  );
INSERT INTO comptes (compteNom,compteDescription) values ('Courant','je suis une description');
INSERT INTO userCompte (userId,compteId) values (1,1);
