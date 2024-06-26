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
INSERT INTO `member` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`, `balance`) VALUES
	(1, NULL, 'Alexandre ', 'Perez', '123', 'alex.perez@gmail.com', '6 Avenue Maria, 95100, ARGENTEUIL', 4600.00),
	(2, NULL, 'alex.perezac490@gmail.com', 'Xavier Perez', '123', 'alex.perezac490@gmail.com', '6 avenue maria, 95100, argenteuil', 0.00),
	(4, 'rog.jpg', 'Tim', 'Vannson', '123', 'Tim_V@outlook.fr', '10 rue Foncet, 06000, Nice', 5364.27);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.order : ~2 rows (environ)
INSERT INTO `order` (`id`, `id_restaurant`, `id_member`, `date`, `status`) VALUES
	(1, 1, 4, '2024-04-23 15:37:46', 'completed'),
	(8, 1, 4, '2024-05-27 17:47:46', 'pending');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.product : ~7 rows (environ)
INSERT INTO `product` (`id`, `id_restaurant`, `name`, `img`, `price`, `type`) VALUES
	(1, 1, '3 Tenders', 'tenders.jpg\r\n', 3.99, 'Petits Prix'),
	(2, 1, 'Frite', 'frites_kfc.jpg', 2.99, 'Unités'),
	(3, 1, '3 Crousti\' Fromage', 'croustifromage.png', 3.25, 'Petits Prix'),
	(4, 1, 'Pepsi', 'pepsi.jpg', 2.99, 'Boissons'),
	(5, 1, 'Cookie', 'cookie_kfc.jpg', 2.99, 'Desserts'),
	(6, 1, 'Menu Colonel Original Bacon', 'menu-chickenBacon.jpg', 10.95, 'Menus'),
	(7, 2, 'McFirst', 'mcfirst.webp', 9.90, 'Menus');

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

-- Listage des données de la table uberalex.relations_order_product : ~4 rows (environ)
INSERT INTO `relations_order_product` (`id_order`, `id_product`, `quantity`) VALUES
	(1, 1, 2),
	(1, 2, 1),
	(8, 2, 6),
	(8, 6, 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table uberalex.restaurant : ~5 rows (environ)
INSERT INTO `restaurant` (`id`, `id_restaurateur`, `name`, `img`, `desc`, `address`, `rating`, `distance`) VALUES
	(1, 1, 'KFC', 'KFC.png', 'Cool Chicken', '6 rue zeub', 4.40, 1.200000),
	(2, 2, 'McDonald\'s', 'mcdo.png', 'Cool Burger', '10 rue carasol', 4.20, 0.800000),
	(3, 2, 'Burger King', 'burgerking.webp', 'Cool King', '5 Avenue Lycée', 4.10, 1.500000),
	(4, 2, 'O\'Tacos', 'otacos.png', 'Cool Tacos', '22 rue du Maitre', 4.50, 2.200000),
	(5, 1, 'Starbucks', 'starbucks.jpg', 'Cool Frappuccino', 'Avenue Lafayette', 4.60, 3.000000);

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
INSERT INTO `restaurateur` (`id`, `img`, `first_name`, `last_name`, `password`, `email`, `address`) VALUES
	(1, NULL, 'alex.perezab470@gmail.com', 'Alexandre Perez', '123', 'alex.perezab470@gmail.com', '6 Avenue Maria_95100_ARGENTEUIL'),
	(2, NULL, 'Tim', 'Vannson', '123', 'tim.v@outlook.fr', '10 rue carasol');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
