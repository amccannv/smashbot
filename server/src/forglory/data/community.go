package data

import ()

type Community struct {
	Id   int    `db:"id"`
	Name string `db:"name"`
}

func (community *Community) GetById(id int) error {
	db := DB

	sql := `SELECT
			id,
			name
		FROM
			community
		WHERE
			id = ?`

	err := db.Get(community, sql, id)

	if err != nil {
		return err
	}

	return nil
}
