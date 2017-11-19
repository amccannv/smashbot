CREATE TABLE `community`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE `user`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`real_name` VARCHAR(255) NOT NULL,
	`picture` VARCHAR(255) NOT NULL,
	`community_id` INT NOT NULL,
	`main` VARCHAR(255) NOT NULL DEFAULT "falco",
	`elo` INT NOT NULL DEFAULT 1000,
	PRIMARY KEY PK_USER (id)
);

CREATE TABLE `game`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`slug` VARCHAR(255) NOT NULL,
	`challenge_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`player_one` INT NOT NULL,
	`player_two` INT NOT NULL,
	`player_one_score` INT NOT NULL,
	`player_two_score` INT NOT NULL,
	`player_one_elo_change` INT NOT NULL,
	`player_two_elo_change` INT NOT NULL,
	CONSTRAINT FK_MATCH_player_one FOREIGN KEY (player_one) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_MATCH_player_two FOREIGN KEY (player_two) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY PK_MATCH (id)
);
