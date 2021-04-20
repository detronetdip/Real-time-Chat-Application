-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 20, 2021 at 06:35 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id16415890_gchat`
--
CREATE DATABASE IF NOT EXISTS `id16415890_gchat` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id16415890_gchat`;

-- --------------------------------------------------------

--
-- Table structure for table `chatp`
--

CREATE TABLE `chatp` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chatp`
--

INSERT INTO `chatp` (`id`, `code`, `user`, `role`) VALUES
(12, 'z46os39s', 'g', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `codetab`
--

CREATE TABLE `codetab` (
  `id` int(11) NOT NULL,
  `tname` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `codetab`
--

INSERT INTO `codetab` (`id`, `tname`, `code`) VALUES
(7, 'fgg', 'z46os39s');

-- --------------------------------------------------------

--
-- Table structure for table `fgg`
--

CREATE TABLE `fgg` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `fgg`
--

INSERT INTO `fgg` (`id`, `sender`, `message`) VALUES
(1, 'G-chat', 'Welcome to G-chat.\nThis message is system generated,do not worry.\n Happy chating');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatp`
--
ALTER TABLE `chatp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `codetab`
--
ALTER TABLE `codetab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fgg`
--
ALTER TABLE `fgg`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatp`
--
ALTER TABLE `chatp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `codetab`
--
ALTER TABLE `codetab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fgg`
--
ALTER TABLE `fgg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
