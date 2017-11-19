package data

//import "database/sql"
import "github.com/jmoiron/sqlx"
import _ "github.com/go-sql-driver/mysql"

type DBx struct {
	*sqlx.DB
}

func NewDb() (*DBx, error) {
	user := "root"
	password := "somepassword"
	host := "forglory.net:3306" //JJ
	database := "sys"

	db, err := sqlx.Connect("mysql", user+":"+password+"@tcp("+host+")/"+database)
	if err != nil {
		return nil, err
	}

	return &DBx{db}, nil
}
