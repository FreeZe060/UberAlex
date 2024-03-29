-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour uberalex
DROP DATABASE IF EXISTS `uberalex`;
CREATE DATABASE IF NOT EXISTS `uberalex` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uberalex`;

-- Listage de la structure de table uberalex. admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Identifiant` varchar(50) NOT NULL DEFAULT '0',
  `Mdp` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Donnée Administrateur';

-- Listage des données de la table uberalex.admin : ~0 rows (environ)
DELETE FROM `admin`;

-- Listage de la structure de table uberalex. client
DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Prenom` varchar(50) NOT NULL DEFAULT '0',
  `Nom` varchar(50) NOT NULL DEFAULT '',
  `Mdp` varchar(50) NOT NULL DEFAULT '',
  `AdressMail` varchar(50) NOT NULL DEFAULT '',
  `AdressPostal` varchar(50) NOT NULL DEFAULT '',
  `Solde` float NOT NULL DEFAULT '0',
  `Notif` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Donnée Client';

-- Listage des données de la table uberalex.client : ~0 rows (environ)
DELETE FROM `client`;

-- Listage de la structure de table uberalex. produit
DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NomPlat` varchar(50) NOT NULL DEFAULT '0',
  `Photo` blob NOT NULL,
  `Prix` int NOT NULL DEFAULT '0',
  `id_restaurateur` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_restaurateur` (`id_restaurateur`),
  CONSTRAINT `id_restaurateur` FOREIGN KEY (`id_restaurateur`) REFERENCES `restaurateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Donnée en lien avec un Produit';

-- Listage des données de la table uberalex.produit : ~0 rows (environ)
DELETE FROM `produit`;

-- Listage de la structure de table uberalex. restaurateur
DROP TABLE IF EXISTS `restaurateur`;
CREATE TABLE IF NOT EXISTS `restaurateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL DEFAULT '0',
  `Mdp` varchar(50) NOT NULL DEFAULT '0',
  `Adresse` varchar(50) NOT NULL DEFAULT '0',
  `AdresseMail` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Donnée en lien avec le restaurateur';

-- Listage des données de la table uberalex.restaurateur : ~0 rows (environ)
DELETE FROM `restaurateur`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
