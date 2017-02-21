-- MySQL dump 10.13  Distrib 5.7.15, for osx10.11 (x86_64)
--
-- Host: localhost    Database: bamazon_db
-- ------------------------------------------------------
-- Server version	5.6.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `bamazon_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bamazon_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bamazon_db`;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(30) NOT NULL,
  `over_head_costs` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Sporting Goods',20000.00),(2,'Electronics',70000.00),(3,'Designer',30000.00),(4,'Automotive',25000.00);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Football',1,25.67,5),(2,'Baseball',1,17.44,0),(3,'iPhone',2,595.00,2),(4,'Wireless Headphones',2,350.00,10),(5,'Jimmy Choo Tote',3,1495.00,5),(6,'Fendi DOTCOM Satchel',3,2400.00,4),(7,'SUV WeatherTech Floor Liner',4,111.21,10),(8,'Michelin Tire',4,216.00,5),(9,'Soccer ball',1,30.00,6),(10,'M. Jordan \'94 Autog Sneakers',3,8730.99,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity_purchased` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (8,7,4,'2017-02-21 04:25:26'),(9,8,4,'2017-02-21 17:57:38'),(10,8,1,'2017-02-21 18:00:31'),(11,8,1,'2017-02-21 18:12:07'),(12,8,1,'2017-02-21 18:13:34'),(13,8,1,'2017-02-21 18:26:31'),(14,8,1,'2017-02-21 18:27:25'),(15,8,1,'2017-02-21 18:31:05'),(16,8,1,'2017-02-21 18:38:49'),(17,8,1,'2017-02-21 18:40:15'),(18,8,1,'2017-02-21 18:43:41'),(19,8,1,'2017-02-21 18:45:06'),(20,8,1,'2017-02-21 18:46:01'),(21,8,1,'2017-02-21 18:46:17'),(22,8,1,'2017-02-21 18:46:46'),(23,8,1,'2017-02-21 18:47:51'),(24,8,1,'2017-02-21 18:48:42'),(25,8,1,'2017-02-21 18:49:36'),(26,7,1,'2017-02-21 18:54:05'),(27,7,1,'2017-02-21 18:57:06'),(28,7,2,'2017-02-21 18:58:06'),(29,6,1,'2017-02-21 19:00:12'),(30,10,1,'2017-02-21 19:01:55'),(31,5,1,'2017-02-21 19:04:47'),(32,3,1,'2017-02-21 19:05:58'),(33,3,1,'2017-02-21 19:07:26'),(34,3,2,'2017-02-21 19:09:45'),(35,3,1,'2017-02-21 19:14:11'),(36,3,1,'2017-02-21 19:15:31'),(37,3,1,'2017-02-21 19:16:35'),(38,1,5,'2017-02-21 19:27:34'),(39,6,1,'2017-02-21 19:32:06'),(40,3,1,'2017-02-21 19:57:32'),(41,2,3,'2017-02-21 20:39:21'),(42,6,1,'2017-02-21 20:55:35'),(43,10,2,'2017-02-21 21:14:46'),(44,10,2,'2017-02-21 21:20:43');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-21 16:46:21
