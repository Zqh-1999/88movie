/*
 Navicat Premium Data Transfer

 Source Server         : lixaoyulocal
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : video_website

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 14/10/2019 19:46:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cz_ip_address
-- ----------------------------
DROP TABLE IF EXISTS `cz_ip_address`;
CREATE TABLE `cz_ip_address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '访问id',
  `film_id` int(11) NULL DEFAULT NULL COMMENT '影片id',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '影片地址',
  `url_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'url的hash值',
  `film_num` int(11) NULL DEFAULT NULL COMMENT '集数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
