"\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p1234

create schema localblog;
use localblog;

create user 'localblog'@'%' identified by '1234';
grant all privileges on localblog.* to 'localblog'@'%';

CREATE TABLE users (
  idUsers       INT NOT NULL AUTO_INCREMENT,
  id            VARCHAR(50) NOT NULL,
  nick          VARCHAR(30) NOT NULL,
  pw            VARCHAR(30) NOT NULL,
  joinDate      TIMESTAMP NOT NULL,
  lastLogin     TIMESTAMP NOT NULL,
  tier          VARCHAR(10) NOT NULL,
  about         VARCHAR(300),
  img           VARCHAR(200),
  PRIMARY KEY(idUsers));

INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier) 
      VALUES ('master@lol.com', '마스터이', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44', '돌');
INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier) 
      VALUES ('tester@hoon.com', '테스터훈', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44', '돌');

CREATE TABLE posts (
  idposts             INT NOT NULL AUTO_INCREMENT,
  title               VARCHAR(30) NOT NULL,
  content             VARCHAR(2000) NOT NULL,
  registrationDate    TIMESTAMP NOT NULL,
  img                 VARCHAR(200),
  writer              VARCHAR(30) NOT NULL,
  writerImg           VARCHAR(200),
  commentCnt          INT NOT NULL,
  views               INT NOT NULL,
  PRIMARY KEY(idposts));

INSERT INTO posts (title, content, registrationDate, writer, commentCnt, views) 
      VALUES ('제목 테스트입니다1', '글 테스트입니다1', '2023-04-11 00:00:00', '테스터훈', 0, 0);
INSERT INTO posts (title, content, registrationDate, writer, commentCnt, views) 
      VALUES ('제목 테스트입니다2', '글 테스트입니다2', '2023-04-11 00:00:00', '마스터이', 0, 0);
INSERT INTO posts (title, content, registrationDate, writer, commentCnt, views) 
      VALUES ('제목 테스트입니다3', '글 테스트입니다3', '2023-04-11 00:00:00', '마스터이', 0, 0);
INSERT INTO posts (title, content, registrationDate, writer, commentCnt, views) 
      VALUES ('제목 테스트입니다4', '글 테스트입니다4', '2023-04-11 00:00:00', '마스터이', 0, 0);
INSERT INTO posts (title, content, registrationDate, writer, commentCnt, views) 
      VALUES ('제목 테스트입니다5', '글 테스트입니다5', '2023-04-11 00:00:00', '마스터이', 0, 0);


CREATE TABLE comment (
    idComment               INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    com_nick                VARCHAR(30) NOT NULL,
    com_content             LONGTEXT NOT NULL,
    postId                  INT NOT NULL
);

INSERT INTO comment (com_nick, com_content, postId) 
      VALUES ('마스터이', '댓글테스트', 1);

CREATE TABLE `localblog`.`playlist` (
  `idplaylist` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `maker` VARCHAR(45) NOT NULL,
  `img`   VARCHAR(200),
  `views` INT NOT NULL,
  `count` INT NOT NULL,
PRIMARY KEY (`idplaylist`));

INSERT INTO playlist (title, maker, views, count) 
      VALUES ('test1', '마스터이', 0, 1);
INSERT INTO playlist (title, maker, views, count) 
      VALUES ('test1', '마스터이', 0, 0);
INSERT INTO playlist (title, maker, views, count) 
      VALUES ('test1', '마스터이', 0, 0);
INSERT INTO playlist (title, maker, views, count) 
      VALUES ('test1', '마스터이', 0, 0);

CREATE TABLE `localblog`.`song` (
  `idsong`              INT NOT NULL AUTO_INCREMENT,
  `title`               LONGTEXT NOT NULL,
  `link`                LONGTEXT NOT NULL,
  `playlistID`          INT NOT NULL,
PRIMARY KEY (`idsong`));

INSERT INTO song (title, link, playlistId) 
      VALUES ('그냥노창 - 없는계절 (Feat. 아이네, C JAMM, YUNHWAY) 1시간', 'Fo7hvvPbUpY', 1);
