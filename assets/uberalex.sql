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
CREATE DATABASE IF NOT EXISTS `uberalex` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uberalex`;

-- Listage de la structure de table uberalex. admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.admin : ~0 rows (environ)
DELETE FROM `admin`;

-- Listage de la structure de table uberalex. member
CREATE TABLE IF NOT EXISTS `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.member : ~2 rows (environ)
DELETE FROM `member`;
INSERT INTO `member` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`, `balance`) VALUES
	(1, NULL, 'Alexandre ', 'Perez', '123', 'alex.perezab470@gmail.com', '6 Avenue Maria_95100_ARGENTEUIL', 0.00),
	(2, NULL, 'alex.perezac490@gmail.com', 'Xavier Perez', '123', 'alex.perezac490@gmail.com', '6 avenue maria_95100_argenteuil', 0.00),
	(4, NULL, 'Tim', 'Vannson', '123', 'Tim_V@outlook.fr', '10 rue_06000_Nice', 0.00);

-- Listage de la structure de table uberalex. order
CREATE TABLE IF NOT EXISTS `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `member_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','completed') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.order : ~0 rows (environ)
DELETE FROM `order`;

-- Listage de la structure de table uberalex. product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.product : ~0 rows (environ)
DELETE FROM `product`;

-- Listage de la structure de table uberalex. restaurant
CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurateur_id` int NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'default.jpg',
  `name` varchar(100) NOT NULL,
  `desc` varchar(50) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurateur_id` (`restaurateur_id`),
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`restaurateur_id`) REFERENCES `restaurateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.restaurant : ~0 rows (environ)
DELETE FROM `restaurant`;
INSERT INTO `restaurant` (`id`, `restaurateur_id`, `img`, `name`, `desc`, `address`, `rating`) VALUES
	(1, 1, 'KFC.png', 'KFC', 'Cool Chicken', '6 rue zeub', 4.20);

-- Listage de la structure de table uberalex. restaurateur
CREATE TABLE IF NOT EXISTS `restaurateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.restaurateur : ~1 rows (environ)
DELETE FROM `restaurateur`;
INSERT INTO `restaurateur` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`) VALUES
	(1, NULL, 'alex.perezab470@gmail.com', 'Alexandre Perez', '123', 'alex.perezab470@gmail.com', '6 Avenue Maria_95100_ARGENTEUIL');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
