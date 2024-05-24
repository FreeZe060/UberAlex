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
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.admin : ~0 rows (environ)
DELETE FROM `admin`;

-- Listage de la structure de table uberalex. member
DROP TABLE IF EXISTS `member`;
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

-- Listage des données de la table uberalex.member : ~3 rows (environ)
DELETE FROM `member`;
INSERT INTO `member` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`, `balance`) VALUES
	(1, NULL, 'Alexandre ', 'Perez', '123', 'alex.perezab470@gmail.com', '6 Avenue Maria_95100_ARGENTEUIL', 0.00),
	(2, NULL, 'alex.perezac490@gmail.com', 'Xavier Perez', '123', 'alex.perezac490@gmail.com', '6 avenue maria_95100_argenteuil', 0.00),
	(4, 'rog.jpg', 'Tim', 'Vannson', '123', 'Tim_V@outlook.fr', '10 rue_06000_Nice', 0.00);

-- Listage de la structure de table uberalex. order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_restaurant` int NOT NULL,
  `id_member` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','completed') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`id_restaurant`) USING BTREE,
  KEY `member_id` (`id_member`) USING BTREE,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`id_member`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.order : ~1 rows (environ)
DELETE FROM `order`;
INSERT INTO `order` (`id`, `id_restaurant`, `id_member`, `date`, `status`) VALUES
	(1, 1, 4, '2024-04-23 15:37:46', 'completed');

-- Listage de la structure de table uberalex. product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_restaurant` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `type` enum('Unités','Menus','Boissons','Desserts','Petits Prix') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Unités',
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`id_restaurant`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.product : ~6 rows (environ)
DELETE FROM `product`;
INSERT INTO `product` (`id`, `id_restaurant`, `name`, `img`, `price`, `type`) VALUES
	(1, 1, '3 Tenders', 'tenders.jpg\r\n', 3.99, 'Petits Prix'),
	(2, 1, 'Frite', 'frites_kfc.jpg', 2.99, 'Unités'),
	(3, 1, '3 Crousti\' Fromage', 'croustifromage.png', 3.25, 'Petits Prix'),
	(4, 1, 'Pepsi', 'pepsi.jpg', 2.99, 'Boissons'),
	(5, 1, 'Cookie', 'cookie_kfc.png', 2.99, 'Desserts'),
	(6, 1, 'Menu Colonel Original Bacon', 'menu-chickenBacon.jpg', 10.95, 'Menus');

-- Listage de la structure de table uberalex. relations_order_product
DROP TABLE IF EXISTS `relations_order_product`;
CREATE TABLE IF NOT EXISTS `relations_order_product` (
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `quantity` int DEFAULT NULL,
  KEY `id_order` (`id_order`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `FK_relation_order_product_order` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`),
  CONSTRAINT `FK_relation_order_product_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.relations_order_product : ~2 rows (environ)
DELETE FROM `relations_order_product`;
INSERT INTO `relations_order_product` (`id_order`, `id_product`, `quantity`) VALUES
	(1, 1, 2),
	(1, 2, 1);

-- Listage de la structure de table uberalex. restaurant
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_restaurateur` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'default.jpg',
  `desc` varchar(50) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `distance` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurateur_id` (`id_restaurateur`) USING BTREE,
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`id_restaurateur`) REFERENCES `restaurateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.restaurant : ~2 rows (environ)
DELETE FROM `restaurant`;
INSERT INTO `restaurant` (`id`, `id_restaurateur`, `name`, `img`, `desc`, `address`, `rating`, `distance`) VALUES
	(1, 1, 'KFC', 'KFC.png', 'Cool Chicken', '6 rue zeub', 4.40, 1.200000),
	(2, 2, 'McDonald\'s', 'default.jpg', 'Cool Burger', '10 rue carasol', 4.20, 0.800000);

-- Listage de la structure de table uberalex. restaurateur
DROP TABLE IF EXISTS `restaurateur`;
CREATE TABLE IF NOT EXISTS `restaurateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.restaurateur : ~2 rows (environ)
DELETE FROM `restaurateur`;
INSERT INTO `restaurateur` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`) VALUES
	(1, NULL, 'alex.perezab470@gmail.com', 'Alexandre Perez', '123', 'alex.perezab470@gmail.com', '6 Avenue Maria_95100_ARGENTEUIL'),
	(2, NULL, 'Tim', 'Vannson', '123', 'tim.v@outlook.fr', '10 rue carasol');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
