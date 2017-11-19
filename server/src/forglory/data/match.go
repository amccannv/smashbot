package data

import (
	"errors"
)

/*
match_status:
0: challenged
1: in progress
2: reported
3: finished
4: rejected
*/

type Match struct {
	Id               int    `db:"id"`
	Slug             string `db:"slug"`
	UserOne          int    `db:"player_one"`
	UserTwo          int    `db:"player_two"`
	UserOneScore     int    `db:"player_one_score"`
	UserTwoScore     int    `db:"player_two_score"`
	UserOneEloChange int    `db:"player_one_elo_change"`
	UserTwoEloChange int    `db:"player_two_elo_change"`
}

func (match *Match) GetById(id int) error {
	db := DB

	sql := `SELECT
			id,
			slug,
			player_one,
			player_two,
			player_one_score,
			player_two_score,
			player_one_elo_change,
			player_two_elo_change
		FROM
			game
		WHERE
			id = ?`

	err := db.Get(match, sql, id)

	if err != nil {
		return err
	}

	return nil
}

func (match *Match) GetByColumn(columnName string, columnValue interface{}) error {
	db := DB

	sql := `SELECT
			id,
			slug,
			player_one,
			player_two,
			player_one_score,
			player_two_score,
			player_one_elo_change,
			player_two_elo_change
		FROM
			game`
	sql += " WHERE " + columnName + " = ?"

	err := db.Get(match, sql, columnValue)

	if err != nil {
		return err
	}

	return nil
}

func (match *Match) Create() (int, error) {
	db := DB

	sql := `INSERT INTO
			game
		(
			slug,
			player_one,
			player_two,
			player_one_score,
			player_two_score,
			player_one_elo_change,
			player_two_elo_change
		)
			VALUES
		(
			:slug,
			:player_one,
			:player_two,
			:player_one_score,
			:player_two_score,
			:player_one_elo_change,
			:player_two_elo_change
		)`

	result, err := db.NamedExec(sql, &match)
	if err != nil {
		return 0, errors.New("Error creating match" + err.Error())
	}

	lastInsertId, err := result.LastInsertId()
	if err != nil {
		return 0, errors.New("Error getting match last insert id: " + err.Error())
	}

	return int(lastInsertId), nil
}

func (match *Match) Update() (wasUpdated bool, err error) {
	db := DB

	if match.Id == 0 {
		return false, errors.New("Id field must be specified in order to update a match record.")
	}

	sql := `UPDATE 
			game
		SET
			slug = :slug,
			player_one = :player_one,
			player_two = :player_two,
			player_one_score = :player_one_score,
			player_two_score = :player_two_score,
			player_one_elo_change = :player_one_elo_change,
			player_two_elo_change = :player_two_elo_change
		WHERE
			id = :id`

	_, err = db.NamedExec(sql, &match)
	if err != nil {
		return false, errors.New("Error executing match update sql: " + err.Error())
	}

	return true, nil
}

func GetMatches() ([]*Match, error) {
	matches := []*Match{}

	db := DB

	sql := `SELECT
			id,
			slug,
			player_one,
			player_two,
			player_one_score,
			player_two_score,
			player_one_elo_change,
			player_two_elo_change
		FROM
			game
		ORDER BY id DESC`

	err := db.Select(&matches, sql)

	if err != nil {
		return nil, err
	}

	return matches, nil
}
