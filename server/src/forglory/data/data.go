package data

var (
	DB *DBx
)

func main() {
	var err error
	DB, err = NewDb()
	if err != nil {
		panic(err)
	}
}
