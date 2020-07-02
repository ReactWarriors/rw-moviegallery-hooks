import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";

function useMoviesWillWatch() {
  const [moviesWillWatch, setMoviesWillWatch] = useState([]);

  const addMovieToWillWatch = (movie) => {
    // const updateMoviesWillWatch = [...moviesWillWatch, movie];
    // updateMoviesWillWatch.push(movie);

    setMoviesWillWatch((moviesWillWatch) => [...moviesWillWatch, movie]);
  };

  const deleteMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = moviesWillWatch.filter(
      (item) => item.id !== movie.id
    );

    setMoviesWillWatch(updateMoviesWillWatch);
  };

  return {
    moviesWillWatch,
    addMovieToWillWatch,
    deleteMovieFromWillWatch,
  };
}

function useMovies() {
  const [movies, setMovies] = useState([]);

  const getMovies = ({ sortBy }) => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sortBy}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovies(data.results);
      });
  };

  const deleteMovie = (movie) => {
    const updateMovies = movies.filter((item) => item.id !== movie.id);

    setMovies(updateMovies);
  };

  return {
    movies,
    getMovies,
    deleteMovie,
  };
}

function App() {
  const [sortBy, setSortBy] = useState("revenue.desc");

  const { movies, getMovies, deleteMovie } = useMovies();

  const {
    moviesWillWatch,
    addMovieToWillWatch,
    deleteMovieFromWillWatch,
  } = useMoviesWillWatch();

  useEffect(() => {
    getMovies({ sortBy });
    return () => {}; // componentWillUnmount()
  }, [sortBy, getMovies]);

  const updateSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-9">
          <div className="row mb-4">
            <div className="col-12">
              <MovieTabs sort_by={sortBy} updateSortBy={updateSortBy} />
            </div>
          </div>
          <div className="row">
            {movies.map((movie) => {
              return (
                <div className="col-6 mb-4" key={movie.id}>
                  <MovieItem
                    data={movie}
                    deleteMovie={deleteMovie}
                    addMovieToWillWatch={addMovieToWillWatch}
                    deleteMovieFromWillWatch={deleteMovieFromWillWatch}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-3">
          <h4>Will Watch: {moviesWillWatch.length} movies</h4>
          <ul className="list-group">
            {moviesWillWatch.map((movie) => (
              <li key={movie.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <p>{movie.title}</p>
                  <p>{movie.vote_average}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
