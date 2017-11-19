package api

import (
	data "forglory/data"
	"math"
)

func Round(a float64) int {
	if a < 0 {
		return int(math.Ceil(a - 0.5))
	}
	return int(math.Floor(a + 0.5))
}

//https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
//winner: 1 = user 1 win, 2 = user 2 win, 3 = tie
func CalculateElo(userOne_id int, userTwo_id int, winner int) (int, int) {
	userOne := &data.User{}
	userTwo := &data.User{}

	userOne.GetById(userOne_id)
	userTwo.GetById(userTwo_id)

	r1 := float64(userOne.Elo)
	r2 := float64(userTwo.Elo)

	tr1 := math.Pow(10, r1/400)
	tr2 := math.Pow(10, r2/400)

	e1 := tr1 / (tr1 + tr2)
	e2 := tr2 / (tr1 + tr2)

	var s1, s2 float64
	if winner == 1 {
		s1 = 1
		s2 = 0
	} else if winner == 2 {
		s1 = 0
		s2 = 1
	} else {
		s1 = 0.5
		s2 = 0.5
	}

	k_val := 32
	newr1 := r1 + float64(k_val)*(s1-e1)
	newr2 := r2 + float64(k_val)*(s2-e2)

	return Round(newr1), Round(newr2)
}
