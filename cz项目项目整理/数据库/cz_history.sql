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

 Date: 14/10/2019 19:46:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cz_history
-- ----------------------------
DROP TABLE IF EXISTS `cz_history`;
CREATE TABLE `cz_history`  (
  `id` int(11) NOT NULL COMMENT '记录id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `flim_id` int(11) NULL DEFAULT NULL COMMENT '影片id',
  `add_time` datetime(0) NULL DEFAULT NULL COMMENT '观看时间',
  `null` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '预留',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
