package api

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"io"
	"time"
	//log "github.com/sirupsen/logrus"
	"net/http"
)

func NewServer(listenAddress string, httpLogger io.Writer) (server *http.Server, err error) {
	router := NewRouter()

	server = &http.Server{
		Handler:      handlers.LoggingHandler(httpLogger, router),
		Addr:         listenAddress,
		WriteTimeout: 60 * time.Minute,
		ReadTimeout:  60 * time.Minute,
	}

	return server, nil
}

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/report", addDefaultHeaders(ReportHandler))
	router.HandleFunc("/match/{match}", addDefaultHeaders(GetMatchHandler))
	router.HandleFunc("/user/{username}", addDefaultHeaders(GetUserHandler))
	router.HandleFunc("/ranking", addDefaultHeaders(GetRanksHandler))
	router.HandleFunc("/matches", addDefaultHeaders(GetMatchesHandler))
	router.HandleFunc("/main/{id}/{character}", addDefaultHeaders(ChangeMainHandler))

	return router
}

func addDefaultHeaders(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		}
		// Stop here if its Preflighted OPTIONS request
		if r.Method == "OPTIONS" {
			return
		}

		fn(w, r)
	}
}
