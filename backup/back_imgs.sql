-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2022-03-20 10:16:22
-- サーバのバージョン： 10.4.13-MariaDB
-- PHP のバージョン: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `wild_noth2`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `back_imgs`
--

CREATE TABLE `back_imgs` (
  `id` int(11) NOT NULL,
  `back_img_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '背景画像名',
  `img_fn` varchar(256) DEFAULT NULL COMMENT '画像ファイル名',
  `sort_no` int(11) DEFAULT 0 COMMENT '順番',
  `delete_flg` tinyint(1) DEFAULT 0 COMMENT '無効フラグ',
  `update_user` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '更新者',
  `ip_addr` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT 'IPアドレス',
  `created` datetime DEFAULT NULL COMMENT '生成日時',
  `modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新日'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `back_imgs`
--

INSERT INTO `back_imgs` (`id`, `back_img_name`, `img_fn`, `sort_no`, `delete_flg`, `update_user`, `ip_addr`, `created`, `modified`) VALUES
(1, 'テスト', 'storage/BackImg/y2022/1/34561d6245fb9519/orig/DSC_0009_watercolor.jpg', 2, 0, '雨来虫', '::1', '2022-01-05 23:06:07', '2022-01-05 14:06:07'),
(2, '', 'storage/BackImg/y2022/2/84761d7a509c3b1d/orig/DSC_0001.JPG', 0, 0, '雨来虫', '::1', '2022-01-07 02:09:29', '2022-01-06 17:27:21'),
(3, '', 'storage/BackImg/y2022/3/44261d7a5445db23/orig/3-27.jpg', -2, 0, '雨来虫', '::1', '2022-01-07 02:28:20', '2022-01-06 17:28:20');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `back_imgs`
--
ALTER TABLE `back_imgs`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `back_imgs`
--
ALTER TABLE `back_imgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
