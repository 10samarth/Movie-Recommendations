import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import bgImage from "./assets/main-bg.png";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000/";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const getMovieRecommendations = useCallback(
    async (e) => {
      e.preventDefault();
      setShowLoader(true);
      try {
        const response = await axios.post(`${API_BASE_URL}`, { movieName });
        console.log(response);
        if (response.status != 200) {
          alert(response.data.message);
        } else {
          let posters = JSON.parse(response.data.poster);
          let titles = JSON.parse(response.data.titles);
          let moviesRecommended = [];
          for (let poster in posters) {
            console.log("HERE---", poster);
            let posterURi = await getMoviePoster(posters[poster]);
            let movie = {
              name: titles[poster],
              poster: posterURi,
            };
            moviesRecommended.push(movie);
          }
          setShowLoader(false);
          console.log(moviesRecommended);
          setMovies(moviesRecommended);
        }
      } catch (error) {
        console.log(error);
        setShowLoader(false);
      }
    },
    [movieName]
  );

  const getMoviePoster = async (id) => {
    const movieDetailURI = `https://api.themoviedb.org/3/movie/${id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`;

    try {
      const response = await axios.get(movieDetailURI);
      console.log({ response });
      if (response.status != 200) {
        alert(response.data);
        return "";
      } else {
        //do something
        console.log("SUCESS", response);
        let posterPath = response.data?.poster_path;
        return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "";
      }
    } catch (error) {
      console.log("error - Couldn't find movie details for id ", id);
      return "";
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100vw 100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          opacity: 0.8,
          width: "50vw",
          padding: 10,
          margin: 10,
          marginBottom: 25,
        }}
      >
        <h4
          style={{
            color: "white",
            alignSelf: "center",
            margin: 0,
            fontSize: 25,
          }}
        >
          Movie Recommendation Engine
        </h4>
        <h6
          style={{
            color: "white",
            alignSelf: "center",
            margin: 0,
            fontSize: 15,
          }}
        >
          Team - Big O
        </h6>
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={movieName}
              placeholder="Enter Movie Name"
              style={{ alignSelf: "center", marginTop: "2vh" }}
              onChange={(e) => {
                setMovieName(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ justifySelf: "center" }}
            onClick={getMovieRecommendations}
          >
            Get Recommendations
          </Button>
        </Form>
      </div>

      {showLoader ? (
        <Spinner
          animation="border"
          variant="danger"
          style={{ height: "5rem", width: "5rem" }}
        />
      ) : (
        <div
          style={{
            overflowX: "auto",
            flexDirection: "row",
            whiteSpace: "nowrap",
            width: "90vw",
          }}
        >
          {" "}
          {movies.map((val, idx) => {
            return (
              <Col style={{ display: "inline-block", float: "none" }} key={idx}>
                <Card style={{ width: "20rem", height: "45vh", margin: 10 }}>
                  <Card.Img
                    variant="top"
                    src={val.poster}
                    style={{ height: "35vh" }}
                  />
                  <div class="card-body">
                    <h5 class="card-title">{val.name}</h5>
                  </div>
                </Card>
              </Col>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
