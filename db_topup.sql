-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2025 at 12:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_topup`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `image`, `title`, `status`, `type`, `created_at`, `updated_at`) VALUES
(1, 'categories/FlZBfjezab60drkusEwjkplQrhxrFj0QlWFlRmAI.png', 'MLBB', 1, 1, '2024-10-15 07:59:14', '2025-01-07 06:48:33'),
(3, 'categories/shDpOQyWaZLQzK1K8oPNYMJN6PjzqYV8wnjDicak.jpg', 'PUBG', 1, 2, '2025-01-07 06:49:07', '2025-01-07 06:49:07'),
(4, 'categories/ZTZolJ2irLVltDXrjmwoRflBdcJs2TqHFWZZjYLa.jpg', 'GENSHIN', 1, 2, '2025-01-07 06:49:31', '2025-01-07 06:49:31'),
(5, 'categories/DfcjTNhCec8sFDZe80t8ZBsXzydCy1SfW4UhcBHn.jpg', 'HONOR OF KINGS', 1, 2, '2025-01-07 06:50:13', '2025-01-07 06:50:13'),
(6, 'categories/q633t9ZfmRbSZMzcsYMeFJfBR9NrdjFsbsxsg6bS.jpg', 'CALL OF DUTY', 1, 2, '2025-01-07 06:51:08', '2025-01-07 06:51:08'),
(7, 'categories/TjjkdlzxGjBqUPOnPQ04SsCOO7loB6XsnOH3lBh8.jpg', 'VALORANT', 1, 2, '2025-01-07 06:51:28', '2025-01-07 06:51:28'),
(8, 'categories/zZS2RXcnH5uGEp5iMRQaTtgdtcQedM9JmJsq828h.jpg', 'FREE FIRE', 1, 2, '2025-01-07 06:51:47', '2025-01-07 06:51:47'),
(9, 'categories/LnHHOJq1MuZXTa3UibdzvdcE10BWCU2RJ8wDrRKF.jpg', 'NETFLIX', 1, 3, '2025-01-07 06:52:45', '2025-01-07 06:52:45'),
(10, 'categories/0Oq32maB0E4XDAXnliQ0o0A6sUcAZIRyhmYj7w9x.jpg', 'DISNET HOT STAR', 1, 3, '2025-01-07 06:53:07', '2025-01-07 06:53:07'),
(11, 'categories/gZ39ndvyY3sq7jX4Yz4KIr3urlcwiATzYLMeeO2J.jpg', 'YOUTUBE', 1, 3, '2025-01-07 06:53:22', '2025-01-07 06:53:22'),
(12, 'categories/M8SLciv8QfmorAf9KMiifQlmzEB53CLiS1d3AvUz.png', 'VIDIO', 1, 3, '2025-01-07 06:53:36', '2025-01-07 06:53:36'),
(13, 'categories/AtX43SZ3rLEZF5cuhUCCCJaY75JJAVpdknB2dPEf.png', 'WeTv', 1, 3, '2025-01-07 06:53:56', '2025-01-07 06:53:56'),
(14, 'categories/Jdp5f7u1LtZKYLEbyovygWohMaT1fMFjHZa89hJg.png', 'VIU', 1, 3, '2025-01-07 06:54:05', '2025-01-07 06:55:51'),
(15, 'categories/7nbBeKcFlmaAhrpztpY3MNSRARnNwb6JtTMSId2s.jpg', 'CANVA', 1, 3, '2025-01-07 06:54:49', '2025-01-07 06:54:49'),
(16, 'categories/vghm5CVZjIXc2idzPswfXEp3ouwMvrc75AUMf2Sf.jpg', 'CHATGPT 4o', 1, 3, '2025-01-07 06:55:07', '2025-01-07 06:56:46'),
(17, 'categories/6NPyaeItQ4Bv4tPHvrUYIaQfascKOhi3kZbDdKbP.jpg', 'CAPCUT', 1, 3, '2025-01-07 06:57:17', '2025-01-07 06:57:17'),
(18, 'categories/BvqwPVZwJanpB6dJM8YWwutcgw5o1HCXph7995X3.jpg', 'MICROSOFT 365', 1, 3, '2025-01-07 06:57:30', '2025-01-07 06:57:30'),
(19, 'categories/Pf9GTXguxwTCzx3ehc3fEcob1ug076Q1MrFyAmUA.jpg', 'SPOTIFY', 1, 3, '2025-01-07 06:57:50', '2025-01-07 06:57:50'),
(20, 'categories/f6t9gUEmnljHBsMFmj4Lh22myqBBMTLjeishfp4l.jpg', 'ZOOM PRO', 1, 3, '2025-01-07 06:58:01', '2025-01-07 06:58:01'),
(21, 'categories/5nB1sS1exWxy9Ju8O5c9oOxmuNU3ATdZOr3jGdmC.png', 'JOKI ML', 1, 4, '2025-01-07 09:12:59', '2025-01-07 09:12:59'),
(22, 'categories/M8rVZuvoK9eTHrKsA1YPDrlK5yh8cuhKebXuMpXe.jpg', 'JOKI WEB', 1, 4, '2025-01-07 09:14:50', '2025-01-07 09:14:50'),
(23, 'categories/HCAB7u9hQRmDBJajeJu9TquoIng7tyBYLlrB11M7.jpg', 'JOKI TUGAS', 1, 4, '2025-01-07 09:17:37', '2025-01-07 09:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_10_11_124414_create_products_table', 1),
(5, '2024_10_11_130918_create_products_table', 2),
(6, '2024_10_12_152750_create_categories_table', 3),
(7, '2024_10_15_134040_add_role_to_users_table', 4),
(8, '2024_10_17_173722_create_purchase_orders_table', 5),
(9, '2024_10_17_180015_create_orders_table', 6),
(10, '2025_07_13_152305_create_payment_options_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_options`
--

CREATE TABLE `payment_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `no_rek` varchar(255) DEFAULT NULL,
  `atas_nama` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_options`
--

INSERT INTO `payment_options` (`id`, `key_name`, `label`, `no_rek`, `atas_nama`, `created_at`, `updated_at`) VALUES
(1, 'dana', 'DANA', '085157746677', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(2, 'gopay', 'GoPay', '085157746677', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(3, 'ovo', 'OVO', '085157746677', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(4, 'bca_va', 'BCA Virtual Account', '4141224284', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(5, 'mandiri_va', 'Mandiri Virtual Account', '1200013671826', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(6, 'seabank_va', 'SeaBank Virtual Account', '901152172987', 'STEVEN LIE', '2025-07-13 08:27:34', '2025-07-13 08:27:34'),
(7, 'qris', 'QRIS', '-', 'CUNGSSTORE', '2025-07-13 08:27:34', '2025-07-13 08:27:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_category` int(11) DEFAULT 0,
  `code` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` bigint(20) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `id_category`, `code`, `image`, `title`, `description`, `price`, `stock`, `created_at`, `updated_at`) VALUES
(5, 1, 'MLBBP100', 'products/BPu7kH7N6W8w8cHCXDMg8XuXkhRX6ZNkjshVmlZO.png', 'PROMO 100', 'PROMO DIAMOND', 21500, 1000, '2025-01-07 08:08:19', '2025-07-13 12:02:28'),
(8, 1, 'MLBBP300', 'products/8Vp14bCCUUgefnyEYK3lAbEeh3MR5kl7cxnydwxB.png', 'PROMO 300', 'PROMO DIAMOND', 65000, 1000, '2025-01-07 10:53:57', '2025-01-07 10:57:40'),
(9, 1, 'MLBBP500', 'products/MCc8U6s40kdcDcADQFbzZYR4mMBgL2eqNFSdtUxx.png', 'PROMO 500', 'PROMO DIAMOND', 100000, 1000, '2025-01-07 10:55:05', '2025-01-07 10:57:44'),
(10, 1, 'MLBBP1000', 'products/gxgEvUV4XaG0NMhuDtRRMcANoad2VkCycmQ4sKnb.png', 'PROMO 1000', 'PROMO DIAMOND', 190000, 1000, '2025-01-07 10:56:03', '2025-01-07 10:57:47'),
(11, 1, 'MLBBP1900', 'products/XkEvMIzCiKLTRJrgfh97Y2WywPdDC0vbjTpxWG8H.png', 'PROMO 1900', 'PROMO DIAMOND', 190000, 1000, '2025-01-07 10:57:11', '2025-01-07 10:57:51'),
(12, 1, 'MLBB85', 'products/8syP6TjTVEQtIdmWA12ngWk6l7Tn144ujDTXcdrF.png', '85', 'DIAMOND MLBB', 22400, 1000, '2025-01-07 11:02:39', '2025-01-07 11:02:39'),
(13, 1, 'MLBB170', 'products/cP9Au7FwL13zFCUGogMZuH0NhohcSXPXOPJpkBka.png', '170', 'DIAMOND MLBB', 45000, 1000, '2025-01-07 11:04:13', '2025-01-07 11:04:13'),
(14, 1, 'MLBB170', 'products/H0EF37lIxnpPPe7PFhyIgYdRjCdr5Io4CVwZv366.png', '296', 'DIAMOND MLBB', 45000, 1000, '2025-01-07 11:06:02', '2025-01-07 11:06:02'),
(15, 1, 'MLBB408', 'products/QtkB8IxGxcbhjiJaFFmeCYSTTALLYYtEkoIXPd9k.png', '408', 'DIAMOND MLBB', 108400, 1000, '2025-01-07 11:06:57', '2025-01-07 11:06:57'),
(16, 1, 'MLBB568', 'products/y7bYHA8TnOj5XG16HOZigN8Isjl4CqNMGeLB6naq.png', '568', 'DIAMOND MLBB', 148300, 1000, '2025-01-07 11:07:58', '2025-01-07 11:07:58'),
(17, 3, 'PUBG8100', 'products/UBB2SJIfLDxXFmHqrXHk7ynC6cgsky6urw39SsYY.jpg', '8100 UC', 'UC PUBG', 1322000, 1000, '2025-01-07 11:12:02', '2025-01-07 11:12:02'),
(18, 4, 'GENSHIN8080', 'products/D46fb2m7xIubCimJ3IoodwJz0qMZ5fpwgukMIb9o.jpg', '8080 Crystal', 'CRYSTAL GENSHIN', 1180000, 1000, '2025-01-07 11:13:45', '2025-01-07 11:13:45'),
(19, 5, 'HOK9160', 'products/R76QgXVrlkvJovvPkYb2zxtbFXsIbI5dvtaWdtVO.jpg', '9160 TOKEN', 'TOKEN HOK', 1300264, 1000, '2025-01-07 11:15:35', '2025-01-07 11:15:35'),
(20, 6, 'CODM7656', 'products/92mjnPBqeGMJBNhDmclxhQ7jPqPJ8Xjgf4okVgdk.jpg', '7656 CP', 'CP CODM', 910397, 1000, '2025-01-07 11:17:27', '2025-01-07 11:17:27'),
(21, 7, 'VALORANT2050', 'products/g1ZFxh9V8DN75U8CHWjRPRullAhlXXJBwdTIkpcW.jpg', '2050 VP', 'VP VALORANT', 210800, 1000, '2025-01-07 11:19:15', '2025-01-07 11:20:52'),
(22, 8, 'FF7290', 'products/RrenixsVZ6W7N2djTc7eoCYier2HoOgGYximaphH.jpg', '7290 Diamond', 'Diamond FF', 899397, 1000, '2025-01-07 11:21:57', '2025-01-07 11:21:57'),
(23, 9, 'NETFLIX1P2U', 'products/8EJubNSHygqfzLS8ArRTifQIMVAkjGxBImGU1osC.jpg', 'NETFLIX1P2U', 'NETFLIX1P2U', 23000, 1000, '2025-01-07 11:22:36', '2025-01-07 11:22:36'),
(24, 10, 'DISNEY', 'products/52ZGjsy8cxe3sStoZLGw4iBLJ8eARivJ3Gy7EBcX.jpg', 'Disney 3U', 'DISNEY', 40000, 1000, '2025-01-07 11:24:33', '2025-01-07 11:24:33'),
(25, 11, 'YOUTUBE', 'products/sowyfsziB53wleEpMxfNn42LQQV2KlgxY9rECrsR.jpg', 'YOUTUBE INDPLAN 3 MONTH', 'YOUTUBE INDPLAN 3 MONTH', 20000, 1000, '2025-01-07 11:25:35', '2025-01-07 11:25:35'),
(26, 12, 'VIDIO', 'products/arD9HdDtl0Nz0vRWfJnqS5M9SyEDvJBEiukqM7EO.png', 'VIDIO PRIVATE 1 MONTH', 'VIDIO PRIVATE 1 MONTH', 30000, 1000, '2025-01-07 11:26:49', '2025-01-07 11:26:49'),
(27, 13, 'WETV', 'products/4tqrq02no3vVE4uaS1z8r7WnHyzsTP4ny1r1arPI.png', 'WeTv Private 1 MONTH', 'WeTv Private', 30000, 1000, '2025-01-07 11:27:38', '2025-01-07 11:27:38'),
(28, 14, 'VIU', 'products/zW6SNFXMg9UR0QyyJCW2YvTPCrNMkhcp3wfjV8QU.png', 'VIU ANTI LIMIT 1 MONTH', 'VIU ANTI LIMIT 1 MONTH', 10000, 1000, '2025-01-07 11:28:49', '2025-01-07 11:28:49'),
(29, 15, 'CANVA', 'products/RtALb8hZk0MPOt81wYP0R1Smi8CtgSspmGOIv09A.jpg', 'CANVA PRO 12 MONTH', 'CANVA PRO 12 MONTH', 20000, 1000, '2025-01-07 11:29:27', '2025-01-07 11:29:27'),
(30, 16, 'CHATGPT', 'products/YaeIZDNHRrq5Rz852X75sKKNljQXysBr9rmrQjud.jpg', 'ChatGPT 4o 1 MONTH', 'ChatGPT 4o 1 MONTH', 40000, 1000, '2025-01-07 11:31:19', '2025-01-07 11:31:19'),
(31, 17, 'CAPCUT', 'products/kiCvqL7y1IIddNWeHN8q6W3QtIsi4L6fjcJ8Vamz.jpg', 'CapCut PRO 12 MONTH', 'CapCut PRO 12 MONTH', 30000, 1000, '2025-01-07 11:32:25', '2025-01-07 11:32:25'),
(32, 18, 'MICROSOFT', 'products/eJlPuItC37OuoJAh7tehTiUFzB4ENkukaiyk4aOd.jpg', 'MICROSOFT 365 3 MONTH', 'MICROSOFT 365 3 MONTH', 20000, 1000, '2025-01-07 11:34:54', '2025-01-07 11:34:54'),
(33, 19, 'SPOTIFY', 'products/QWdBTvGdN5G6dc3k8kBKfjEPlHNIWk115JGxZXMC.jpg', 'SPOTIFY INDPLAN 3 MONTH', 'SPOTIFY INDPLAN 3 MONTH', 35000, 1000, '2025-01-07 11:36:15', '2025-01-07 11:36:15'),
(34, 20, 'ZOOM', 'products/Rab8BNvTQFWb0uwp5dHJixopTHHpfF9KS15054b9.jpg', 'ZOOM PRO 1 MONTH (100 Peserta)', 'ZOOM PRO 1 MONTH (100 Peserta)', 20000, 1000, '2025-01-07 11:36:54', '2025-01-07 11:36:54'),
(35, 21, 'JOKIML', 'products/jRU1ThT6s1uqBBgD2jGz7dOt0uY5qctg5HG72hSA.png', 'FULL GRADING', 'JOKIML', 120000, 1000, '2025-01-07 11:38:00', '2025-01-07 11:38:00'),
(36, 23, 'JOKILA', 'products/IvwNF1hllPApK2K9Of1Xpxgo9f8qprXPlTASx5pC.jpg', 'JOKI LP', 'JOKI LP', 50000, 1000, '2025-01-07 11:43:06', '2025-01-07 11:44:14'),
(37, 22, 'JOKIWEB', 'products/Eo9ibDYzECvJH50DjjmktYlKsRA8WqZQ2QFdAA2W.jpg', 'SMALL PROJECT', 'SMALL PROJECT', 150000, 1000, '2025-01-07 11:44:43', '2025-01-07 11:44:43'),
(38, 23, 'JOKILA', 'products/ATtV6iJ5jlZ0YspYBEwYrZk42AElK2IMSFN0oGHo.jpg', 'JOKI LA', 'JOKI LA', 50000, 1000, '2025-01-07 11:45:49', '2025-01-07 11:45:49'),
(39, 22, 'JOKIWEB', 'products/8Epluxe1lT6dIEbyKY0M2XW3g3UVSjBkf9Tbnn7V.jpg', 'MEDIUM PROJECT', 'MEDIUM PROJECT', 350000, 1000, '2025-01-07 11:46:20', '2025-01-07 11:46:20'),
(40, 23, 'JOKITUGAS', 'products/pPqYpYkhfRS29xrqnESrKmmajF2h00kMtyRFvU29.jpg', 'JOKI TUGAS 10K - 100K (Tergantung tingkat kesulitan)', 'JOKITUGAS', 100000, 1000, '2025-01-07 11:47:36', '2025-01-07 11:47:36'),
(41, 22, 'JOKIWEB', 'products/fDp5KsIq0ujAwD6OktH3AKw0uMlkHK6y8GT2W06r.jpg', 'LARGE PROJECT', 'LARGE PROJECT', 1000000, 1000, '2025-01-07 11:48:33', '2025-01-07 11:48:33');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `game_id` bigint(20) DEFAULT NULL,
  `game_server` bigint(20) DEFAULT NULL,
  `payment_method` varchar(225) DEFAULT NULL,
  `order_number` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `whatsapp` varchar(225) DEFAULT NULL,
  `sender_name` varchar(225) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `user_id`, `category_id`, `product_id`, `game_id`, `game_server`, `payment_method`, `order_number`, `amount`, `whatsapp`, `sender_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CCD21C2DC', 21500, '+6281252342573', 'Ryv', 0, '2025-07-13 08:12:18', '2025-07-13 08:12:18'),
(2, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CCF98F3E0', 21500, '+6281252342573', 'Ryv', 0, '2025-07-13 08:12:57', '2025-07-13 08:12:57'),
(3, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CD5D1D0F5', 21500, '+6281252342573', 'Ryv', 0, '2025-07-13 08:14:37', '2025-07-13 08:14:37'),
(4, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CDDE293A1', 21500, '+6281252342573', 'RYV', 0, '2025-07-13 08:16:46', '2025-07-13 08:16:46'),
(5, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CE415BF20', 21500, '+6282917341974164178', 'tfvuki', 0, '2025-07-13 08:18:25', '2025-07-13 08:18:25'),
(6, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CE874C52F', 21500, '+628217283612838', 'ghdb', 0, '2025-07-13 08:19:35', '2025-07-13 08:19:35'),
(7, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873CEF3EF06F', 21500, '+628127193184', 'Ryv', 0, '2025-07-13 08:21:23', '2025-07-13 08:21:23'),
(8, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873D16B494F4', 21500, '+6281252342573', 'XXXX', 1, '2025-07-13 08:31:55', '2025-07-13 08:32:21'),
(9, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873D27B28B08', 21500, '+6281252342573', 'Ryv', 0, '2025-07-13 08:36:27', '2025-07-13 08:36:27'),
(10, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873D2B1E4C02', 21500, '+6281252342573', '9070', 1, '2025-07-13 08:37:21', '2025-07-13 08:41:36'),
(11, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873E06283698', 21500, '+6281252342573', 'Ryv', 1, '2025-07-13 09:35:46', '2025-07-13 09:36:07'),
(12, 1, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873E2E0A17FF', 21500, '+6281252342573', 'Ryv', 1, '2025-07-13 09:46:24', '2025-07-13 09:46:38'),
(13, 2, 1, 5, 206062851, 9070, 'gopay', 'ORD/ML/2025/07/6873EBCF5D2FE', 21500, '+6281252342573', 'Ryv', 1, '2025-07-13 10:24:31', '2025-07-13 10:25:01'),
(14, 2, 21, 35, NULL, NULL, 'bca_va', 'ORD/ML/2025/07/6873ECA113522', 120000, '+6281252342573', 'Ryvins', 1, '2025-07-13 10:28:01', '2025-07-13 10:28:26'),
(15, 2, 21, 35, NULL, NULL, 'dana', 'ORD/ML/2025/07/6873EDF0410F4', 120000, '+6281252342573', 'Ryv', 1, '2025-07-13 10:33:36', '2025-07-13 10:49:58'),
(16, 2, 21, 35, NULL, NULL, 'dana', 'ORD/ML/2025/07/6873EE36E2993', 120000, '+6281252342573', 'Ryvins', 1, '2025-07-13 10:34:46', '2025-07-13 10:50:03'),
(17, 2, 21, 35, 206062851, 9070, 'qris', 'ORD/ML/2025/07/6873EEF45AFFF', 120000, '+6281252342573', 'Ryvs', 1, '2025-07-13 10:37:56', '2025-07-13 10:50:08'),
(18, 2, 21, 35, 206062851, 9070, 'seabank_va', 'ORD/ML/2025/07/6873EFAE1E34D', 120000, '+628127618361874', 'hsxjbdsj', 0, '2025-07-13 10:41:02', '2025-07-13 10:41:02'),
(19, 2, 1, 5, 206062851, 9070, 'seabank_va', 'ORD/ML/2025/07/6873F1B1BA812', 21500, '+6281252342573', 'Ryv', 1, '2025-07-13 10:49:37', '2025-07-13 10:50:13'),
(20, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/6873F2EDE01B3', 21500, '+6281252342573', 'Ryvins', 0, '2025-07-13 10:54:53', '2025-07-13 10:54:53'),
(21, 2, 1, 5, 206062851, 9070, 'gopay', 'ORD/ML/2025/07/6873F3CC09695', 21500, '+6281252342573', 'Ryvins', 1, '2025-07-13 10:58:36', '2025-07-13 12:44:40'),
(22, 2, 1, 5, 206062851, 9070, 'mandiri_va', 'ORD/ML/2025/07/6873F88ABAB41', 21500, '+6285157746677', 'Tepen', 1, '2025-07-13 11:18:50', '2025-07-13 11:19:39'),
(23, 2, 1, 5, 206062851, 9070, 'bca_va', 'ORD/ML/2025/07/6873F93B54F9E', 21500, '+6281252342573', 'Ryvins', 1, '2025-07-13 11:21:47', '2025-07-13 11:22:10'),
(24, 2, 1, 5, 206062851, 9070, 'dana', 'ORD/ML/2025/07/687408B7A6178', 21500, '+6281252342573', 'RYVINS', 1, '2025-07-13 12:27:51', '2025-07-13 12:31:21'),
(25, 2, 1, 12, 181122554, 2923, 'dana', 'ORD/ML/2025/07/6876CCE5601E3', 22400, '+6281717175551', 'Cinta', 1, '2025-07-15 14:49:25', '2025-07-15 14:49:42'),
(26, 2, 1, 12, 181122554, 2923, 'dana', 'ORD/ML/2025/07/6876CD44AEEEC', 22400, '+6285157746677', 'Steven Lie', 1, '2025-07-15 14:51:00', '2025-07-15 14:51:22'),
(27, 2, 9, 23, NULL, NULL, 'dana', 'ORD/ML/2025/07/6876CD7F14BF6', 23000, '+6285157746677', 'Steven Lie', 1, '2025-07-15 14:51:59', '2025-07-15 14:54:29');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('7niLoI0nqzirwiaHm95tZqcuM0AnVOzB02b3tVN7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSG9KaXBneDBzT05oWEp5SHcya1V2SjY0amVRYldoTHdNeFRYWnRNVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752616481),
('irIF0rcLw5CsYbUixjPiqA3vFL49GhX5drIFlTCd', NULL, '127.0.0.1', 'axios/1.10.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZkw4akJ6dlFpOXJvbWlRT25WUGhxSFIySm5pcnQ4dkt1VDV3ejd4ViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752616469),
('TVlOLNZF8D7KAnx425bY9nShTyA7kgMoO3waI5KP', NULL, '127.0.0.1', 'axios/1.10.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUmpuNHo1ZHFUSTlWZnRYajJzaTlldlV3VEFoV3RrTGlSaEpoeFpvciI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752616282),
('YhF48VM9LbhZa5s2bzrAMhkbKCGe15rWVSIMCRYD', NULL, '127.0.0.1', 'axios/1.10.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibU9FSG1rQjFGU205SG55TjVMM1FxSjNBRTNLY3pmQm9Rdkx0eTVTSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752616182),
('ZPaMzo6wj3VwkI24WeNKSgflp5qtdfOY2GdKwZ7l', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic2NWMTJaWmVmRnMyS3U2Z1FDOXF5eUFqR1B0ZUphZDlGazhONVZaSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752615905);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin', 'admin@mail.com', NULL, '$2y$12$MpS3ZppmZqBXGjvkEF2Mpu6oqRTInGq7fqmKwdfRdH0QAoi8u0YSm', NULL, '2024-10-11 06:23:14', '2024-10-11 06:23:14', 1),
(2, 'Test User1', 'user@mail.com', NULL, '$2y$12$0ZsseBNmtvmp18YxfTdOM.95OY98tYMf98PJ152Bh.Jsmwig.jxFW', NULL, '2024-10-15 08:06:24', '2025-07-13 10:21:16', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_options`
--
ALTER TABLE `payment_options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_options_key_name_unique` (`key_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `purchase_orders_order_number_unique` (`order_number`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_options`
--
ALTER TABLE `payment_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
