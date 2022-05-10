import React, { useCallback, useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import bgImage from "./assets/main-bg.png";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000/";

function App() {
  const [movieName, setMovieName] = useState("");
  const [response, setResponse] = useState({});
  const getMovieRecommendations = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(movieName);
      try {
        const response = await axios.post(`${API_BASE_URL}`, { movieName });
        console.log({ response });
        if (response.status != 200) {
          alert(response.data.message);
        } else {
          setResponse(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [movieName]
  );
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "flex-start",
        display: "flex",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100vw 100vh",
        margin: 0,
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
    </div>
  );
}

export default App;
