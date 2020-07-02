import React, { useState } from "react";

function MovieItem(props) {
  const {
    data,
    deleteMovie,
    addMovieToWillWatch,
    deleteMovieFromWillWatch,
  } = props;

  const [willWatch, setWillWatch] = useState(false);

  const handleClickDeleteWillWatch = () => {
    setWillWatch(false);
    deleteMovieFromWillWatch(data);
  };

  const handleClickAddWillWatch = () => {
    setWillWatch(true);
    addMovieToWillWatch(data);
  };

  const handleDeleteMovie = () => {
    deleteMovie(data);
  };

  return (
    <div className="card">
      <img
        className="card-img-top"
        src={`https://image.tmdb.org/t/p/w500${
          data.backdrop_path || data.poster_path
        }`}
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title">{data.title}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Rating: {data.vote_average}</p>
          {willWatch ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClickDeleteWillWatch}
            >
              Will Watch
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClickAddWillWatch}
            >
              Will Watch
            </button>
          )}
        </div>
        <button type="button" onClick={handleDeleteMovie}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieItem;
