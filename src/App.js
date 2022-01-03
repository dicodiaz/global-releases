import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Movie from './Movie';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      apiKey: process.env.REACT_APP_API_KEY,
    };
  }

  componentDidMount() {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies) {
      this.setState({
        movies: localMovies,
      });
      return;
    }
    const { apiKey } = this.state;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
    axios.get(url).then((response) => {
      const newMovies = [...response.data.results];
      const pages = response.data.total_pages;
      if (pages === 1) return;
      const array = [...Array(pages - 1).keys()].map((page) =>
        axios
          .get(`${url}&page=${page + 2}`)
          .then((response) => newMovies.push(...response.data.results)),
      );
      Promise.all(array).then(() => {
        this.setState({
          movies: newMovies,
        });
        localStorage.setItem('movies', JSON.stringify(newMovies));
        console.log('fetched and storaged');
      });
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <main className="bg-dark text-white">
        <Container className="py-5">
          <h1 className="display-1 text-center mb-5">Global releases</h1>
          <Row xs={1} md={2} lg={3} xl={4} className="mx-0 gy-4 gy-md-5">
            {movies.map((movie) => {
              const { id } = movie;
              return (
                <Col key={id}>
                  <Movie movie={movie} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    );
  }
}
export default App;
