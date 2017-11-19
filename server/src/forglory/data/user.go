package data

import (
	//"database/sql"
	"errors"
)

type User struct {
	Id       int    `db:"id"`
	UserId   string `db:"user_id"`
	Name     string `db:"name"`
	Main     string `db:"main"`
	RealName string `db:"real_name"`
	Picture  string `db:"picture"`
	Elo      int    `db:"elo"`
}

func (user *User) GetById(id int) error {
	db := DB

	sql := `SELECT
			id,
			user_id,
			name,
			main,
			real_name,
			picture,
			elo
		FROM
			user
		WHERE
			id = ?`

	err := db.Get(user, sql, id)

	if err != nil {
		return err
	}

	return nil
}

func (user *User) GetByUserId(userId int) error {
	db := DB

	sql := `SELECT
			id,
			user_id,
			name,
			main,
			real_name,
			picture,
			elo
		FROM
			user
		WHERE
			user_id = ?`

	err := db.Get(user, sql, userId)

	if err != nil {
		return err
	}

	return nil
}

func (user *User) GetByColumn(columnName string, columnValue interface{}) error {
	db := DB

	sql := `SELECT
			id,
			user_id,
			name,
			main,
			real_name,
			picture,
			elo
		FROM
			user`
	sql += " WHERE " + columnName + " = ?"

	err := db.Get(user, sql, columnValue)

	if err != nil {
		return err
	}

	return nil
}

func (user *User) Create() (int, error) {
	db := DB

	sql := `INSERT INTO
			user
		(
			user_id,
			name,
			main,
			real_name,
			picture,
			elo,
			community_id
		)
			VALUES
		(
			:user_id,
			:name,
			:main,
			:real_name,
			:picture,
			:elo,
			1
		)`

	result, err := db.NamedExec(sql, &user)
	if err != nil {
		return 0, err
	}

	lastInsertId, err := result.LastInsertId()
	if err != nil {
		return 0, errors.New("Error getting user last insert id: " + err.Error())
	}

	return int(lastInsertId), nil
}

func (user *User) Update() (wasUpdated bool, err error) {
	db := DB

	if user.Id == 0 {
		return false, errors.New("Id field must be specified in order to update a User record.")
	}

	sql := `UPDATE 
			user
		SET
			name = :name,
			main = :main,
			real_name = :real_name,
			picture = :picture,
			elo = :elo
		WHERE
			id = :id`

	_, err = db.NamedExec(sql, &user)
	if err != nil {
		return false, errors.New("Error executing user update sql: " + err.Error())
	}

	return true, nil
}

func GetRanking(elo int) (int, error) {
	db := DB

	sql := `SELECT
			(COUNT(1) + 1) as rank
		FROM
			user
		WHERE elo > ?
	`

	ranks, err := db.Query(sql, elo)
	defer ranks.Close()
	ranks.Next()
	var rank int
	err = ranks.Scan(&rank)
	if err != nil {
		return 0, nil
	}

	return rank, nil
}

type GameHistory struct {
	Wins   int `db:"wins"`
	Draws  int `db:"draws"`
	Losses int `db:"losses"`
	Games  int `db:"games"`
}

func (gameHistory *GameHistory) GetHistory(userId int) error {
	db := DB

	sql := `SELECT 
	(SELECT count(1) AS num FROM game WHERE (player_one = ? OR player_two = ?)) AS games,
	(SELECT count(1) AS num FROM game WHERE (player_one = ? AND player_one_score > player_two_score) OR (player_two = ? AND player_two_score > player_one_score)) AS wins,
	(SELECT count(1) AS num FROM game WHERE (player_one = ? AND player_one_score < player_two_score) OR (player_two = ? AND player_two_score < player_one_score)) AS losses,
	(SELECT count(1) AS num FROM game WHERE (player_one = ? OR player_two = ?) AND (player_one_score = player_two_score)) AS draws`

	err := db.Get(gameHistory, sql, userId, userId, userId, userId, userId, userId, userId, userId)

	if err != nil {
		return err
	}

	return nil
}

func GetRanks() ([]*User, error) {
	users := []*User{}

	db := DB

	sql := `SELECT
			id,
			user_id,
			name,
			main,
			real_name,
			picture,
			elo
		FROM
			user
		ORDER BY elo DESC`

	err := db.Select(&users, sql)

	if err != nil {
		return nil, err
	}

	return users, nil
}
