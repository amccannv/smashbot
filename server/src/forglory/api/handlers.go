package api

import (
	"encoding/json"
	data "forglory/data"
	"io/ioutil"
	"net/http"
)

//POST: /report
type reportRequestUser struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	RealName string `json:"real_name"`
	Picture  string `json:"image"`
	Score    int    `json:"score"`
}

type reportRequest struct {
	UserOne reportRequestUser `json:"userOne"`
	UserTwo reportRequestUser `json:"userTwo"`
}

type reportResponseUser struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Elo       int    `json:"elo"`
	EloChange int    `json:"elo_change"`
}

type reportResponseResult struct {
	Url    string `json:"url"`
	Winner string `json:"winner"`
}

type reportResponse struct {
	UserOne reportResponseUser   `json:"userOne"`
	UserTwo reportResponseUser   `json:"userTwo"`
	Result  reportResponseResult `json:"result"`
}

func ReportHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var reportDetails reportRequest
	json.Unmarshal(body, &reportDetails)

	match := &data.Match{
		Slug: RandomString(14),
	}

	// Get Users, insert if not exists, update if exists
	userOne := &data.User{}
	userTwo := &data.User{}

	err := userOne.GetByColumn("user_id", reportDetails.UserOne.Id)
	if err != nil {
		// User does not exist
		userOne = &data.User{
			UserId:   reportDetails.UserOne.Id,
			Name:     reportDetails.UserOne.Name,
			RealName: reportDetails.UserOne.RealName,
			Picture:  reportDetails.UserOne.Picture,
			Main:     "falco",
			Elo:      1000,
		}

		lastInsertId, err := userOne.Create()
		if err != nil {
			writeErrorResponse(w, 500, "couldn't create userOne"+err.Error())
			return
		}
		userOne.GetById(lastInsertId)
	}

	err = userTwo.GetByColumn("user_id", reportDetails.UserTwo.Id)
	if err != nil {
		// User does not exist
		userTwo = &data.User{
			UserId:   reportDetails.UserTwo.Id,
			Name:     reportDetails.UserTwo.Name,
			RealName: reportDetails.UserTwo.RealName,
			Picture:  reportDetails.UserTwo.Picture,
			Main:     "falco",
			Elo:      1000,
		}

		lastInsertId, err := userTwo.Create()
		if err != nil {
			writeErrorResponse(w, 500, "couldn't create userTwo"+err.Error())
			return
		}
		userTwo.GetById(lastInsertId)
	}

	var result int
	var winner string
	if reportDetails.UserOne.Score == reportDetails.UserTwo.Score {
		winner = ""
		result = 3
	} else if reportDetails.UserOne.Score > reportDetails.UserTwo.Score {
		winner = userOne.RealName
		result = 1
	} else {
		winner = userTwo.RealName
		result = 2
	}

	newUserOneElo, newUserTwoElo := CalculateElo(userOne.Id, userTwo.Id, result)
	userOneChange := newUserOneElo - userOne.Elo
	userTwoChange := newUserTwoElo - userTwo.Elo

	userOne.Elo = newUserOneElo
	userTwo.Elo = newUserTwoElo

	match.UserOne = userOne.Id
	match.UserTwo = userTwo.Id

	match.UserOneScore = reportDetails.UserOne.Score
	match.UserTwoScore = reportDetails.UserTwo.Score

	match.UserOneEloChange = userOneChange
	match.UserTwoEloChange = userTwoChange

	lastUpdatedId, err := match.Create()
	if err != nil {
		writeErrorResponse(w, 500, "couldn't update match"+err.Error())
	}
	match.GetById(lastUpdatedId)

	updated, err := userOne.Update()
	if !updated {
		writeErrorResponse(w, 500, "couldn't update userOne"+err.Error())
	}

	updated, err = userTwo.Update()
	if !updated {
		writeErrorResponse(w, 500, "couldn't update userTwo"+err.Error())
	}

	response := &reportResponse{
		UserOne: reportResponseUser{
			Id:        userOne.UserId,
			Name:      userOne.RealName,
			Elo:       userOne.Elo,
			EloChange: userOneChange,
		},
		UserTwo: reportResponseUser{
			Id:        userTwo.UserId,
			Name:      userTwo.RealName,
			Elo:       userTwo.Elo,
			EloChange: userTwoChange,
		},
		Result: reportResponseResult{
			Url:    buildLink("/game/" + string(match.Slug)),
			Winner: winner,
		},
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "couldn't make into json"+err.Error())
		return
	}

	writeJsonResponse(w, 200, responseJson)
}

//GET: /match/:match_id
type getMatchResponseUser struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	RealName string `json:"real_name"`
	Picture  string `json:"image"`
	Elo      int    `json:"elo"`
	Wins     int    `json:"wins"`
	Losses   int    `json:"losses"`
	Draws    int    `json:"draws"`
	Games    int    `json:"games"`
	Rank     int    `json:"rank"`
	Main     string `json:"main"`
	Score    int    `json:"score"`
	Slug     string `json:"slug"`
}

type getMatchResponse struct {
	UserOne getMatchResponseUser `json:"userOne"`
	UserTwo getMatchResponseUser `json:"userTwo"`
}

func GetMatchHandler(w http.ResponseWriter, r *http.Request) {
	slug := urlParamAsString(r, "match")

	match := &data.Match{}

	err := match.GetByColumn("slug", slug)
	if err != nil {
		writeErrorResponse(w, 404, "Match not found")
		return
	}

	userOne := &data.User{}
	userTwo := &data.User{}

	userOne.GetById(match.UserOne)
	userTwo.GetById(match.UserTwo)

	userOneRank, err := data.GetRanking(userOne.Elo)
	if err != nil {
		writeErrorResponse(w, 500, "error getting u1 rank"+err.Error())
		return
	}

	userOneHistory := &data.GameHistory{}
	err = userOneHistory.GetHistory(userOne.Id)
	if err != nil {
		writeErrorResponse(w, 500, "error getting u1 history"+err.Error())
		return
	}

	userTwoRank, err := data.GetRanking(userTwo.Elo)
	if err != nil {
		writeErrorResponse(w, 500, "error getting u2 rank"+err.Error())
		return
	}

	userTwoHistory := &data.GameHistory{}
	err = userTwoHistory.GetHistory(userTwo.Id)
	if err != nil {
		writeErrorResponse(w, 500, "error getting u2 history"+err.Error())
		return
	}

	response := &getMatchResponse{
		UserOne: getMatchResponseUser{
			Id:       userOne.UserId,
			Name:     userOne.Name,
			RealName: userOne.RealName,
			Picture:  userOne.Picture,
			Elo:      userOne.Elo,
			Wins:     userOneHistory.Wins,
			Losses:   userOneHistory.Losses,
			Draws:    userOneHistory.Draws,
			Games:    userOneHistory.Games,
			Rank:     userOneRank,
			Main:     userOne.Main,
			Score:    match.UserOneScore,
			Slug:     match.Slug,
		},
		UserTwo: getMatchResponseUser{
			Id:       userTwo.UserId,
			Name:     userTwo.Name,
			RealName: userTwo.RealName,
			Picture:  userTwo.Picture,
			Elo:      userTwo.Elo,
			Wins:     userTwoHistory.Wins,
			Losses:   userTwoHistory.Losses,
			Draws:    userTwoHistory.Draws,
			Games:    userTwoHistory.Games,
			Rank:     userTwoRank,
			Main:     userTwo.Main,
			Score:    match.UserTwoScore,
			Slug:     match.Slug,
		},
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "23y8238979")
		return
	}

	writeJsonResponse(w, 200, responseJson)
}

//GET: /user/{username}
type getUserResponse struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	RealName string `json:"real_name"`
	Picture  string `json:"image"`
	Elo      int    `json:"elo"`
	Wins     int    `json:"wins"`
	Losses   int    `json:"losses"`
	Draws    int    `json:"draws"`
	Games    int    `json:"games"`
	Rank     int    `json:"rank"`
	Main     string `json:"main"`
}

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	username := urlParamAsString(r, "username")

	user := &data.User{}

	err := user.GetByColumn("name", username)
	if err != nil {
		writeErrorResponse(w, 404, "User not found")
		return
	}

	rank, err := data.GetRanking(user.Elo)
	if err != nil {
		writeErrorResponse(w, 500, "error getting rank"+err.Error())
		return
	}

	userHistory := &data.GameHistory{}
	err = userHistory.GetHistory(user.Id)
	if err != nil {
		writeErrorResponse(w, 500, "error getting user history"+err.Error())
		return
	}

	response := &getUserResponse{
		Id:       user.UserId,
		Name:     user.Name,
		RealName: user.RealName,
		Picture:  user.Picture,
		Elo:      user.Elo,
		Wins:     userHistory.Wins,
		Losses:   userHistory.Losses,
		Draws:    userHistory.Draws,
		Games:    userHistory.Games,
		Rank:     rank,
		Main:     user.Main,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "23y8238979")
		return
	}

	writeJsonResponse(w, 200, responseJson)
}

func GetRanksHandler(w http.ResponseWriter, r *http.Request) {
	users, err := data.GetRanks()
	if err != nil {
		writeErrorResponse(w, 500, "couldnt get ranks: "+err.Error())
		return
	}

	responseUsers := []getUserResponse{}

	for rank, user := range users {
		userHistory := &data.GameHistory{}
		err = userHistory.GetHistory(user.Id)
		if err != nil {
			writeErrorResponse(w, 500, "error getting user history"+err.Error())
			return
		}

		responseUser := getUserResponse{
			Id:       user.UserId,
			Name:     user.Name,
			RealName: user.RealName,
			Picture:  user.Picture,
			Elo:      user.Elo,
			Wins:     userHistory.Wins,
			Losses:   userHistory.Losses,
			Draws:    userHistory.Draws,
			Games:    userHistory.Games,
			Rank:     rank + 1,
			Main:     user.Main,
		}
		responseUsers = append(responseUsers, responseUser)
	}

	responseJson, err := json.Marshal(responseUsers)
	if err != nil {
		writeErrorResponse(w, 500, "23y8238979")
		return
	}

	writeJsonResponse(w, 200, responseJson)
}

func GetMatchesHandler(w http.ResponseWriter, r *http.Request) {
	matches, err := data.GetMatches()
	if err != nil {
		writeErrorResponse(w, 500, "couldnt get ranks: "+err.Error())
		return
	}

	responseMatches := []getMatchResponse{}

	for _, match := range matches {

		userOne := &data.User{}
		userTwo := &data.User{}

		userOne.GetById(match.UserOne)
		userTwo.GetById(match.UserTwo)

		userOneRank, err := data.GetRanking(userOne.Elo)
		if err != nil {
			writeErrorResponse(w, 500, "error getting u1 rank"+err.Error())
			return
		}

		userOneHistory := &data.GameHistory{}
		err = userOneHistory.GetHistory(userOne.Id)
		if err != nil {
			writeErrorResponse(w, 500, "error getting u1 history"+err.Error())
			return
		}

		userTwoRank, err := data.GetRanking(userTwo.Elo)
		if err != nil {
			writeErrorResponse(w, 500, "error getting u2 rank"+err.Error())
			return
		}

		userTwoHistory := &data.GameHistory{}
		err = userTwoHistory.GetHistory(userTwo.Id)
		if err != nil {
			writeErrorResponse(w, 500, "error getting u2 history"+err.Error())
			return
		}

		responseMatch := getMatchResponse{
			UserOne: getMatchResponseUser{
				Id:       userOne.UserId,
				Name:     userOne.Name,
				RealName: userOne.RealName,
				Picture:  userOne.Picture,
				Elo:      userOne.Elo,
				Wins:     userOneHistory.Wins,
				Losses:   userOneHistory.Losses,
				Draws:    userOneHistory.Draws,
				Games:    userOneHistory.Games,
				Rank:     userOneRank,
				Main:     userOne.Main,
				Score:    match.UserOneScore,
				Slug:     match.Slug,
			},
			UserTwo: getMatchResponseUser{
				Id:       userTwo.UserId,
				Name:     userTwo.Name,
				RealName: userTwo.RealName,
				Picture:  userTwo.Picture,
				Elo:      userTwo.Elo,
				Wins:     userTwoHistory.Wins,
				Losses:   userTwoHistory.Losses,
				Draws:    userTwoHistory.Draws,
				Games:    userTwoHistory.Games,
				Rank:     userTwoRank,
				Main:     userTwo.Main,
				Score:    match.UserTwoScore,
				Slug:     match.Slug,
			},
		}
		responseMatches = append(responseMatches, responseMatch)
	}

	responseJson, err := json.Marshal(responseMatches)
	if err != nil {
		writeErrorResponse(w, 500, "23y8238979")
		return
	}

	writeJsonResponse(w, 200, responseJson)
}

func ChangeMainHandler(w http.ResponseWriter, r *http.Request) {
	id := urlParamAsString(r, "id")
	character := urlParamAsString(r, "character")

	user := &data.User{}

	err := user.GetByColumn("user_id", id)
	if err == nil {
		user.Main = character
		user.Update()
	}
}
