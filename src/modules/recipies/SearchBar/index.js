import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

export const SearchBar = () => {
  const [searchLetter, setSearchLetter] = useState('');
  const navigate = useNavigate();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchLetter.length === 1) {
      navigate(`/recipes?search=${searchLetter}`);
    }
  };

  const handleLetterClick = (letter) => {
    setSearchLetter(letter);
    navigate(`/recipes?search=${letter}`);
  };

  const handleBackButton = () => {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleBackButton} className="button back-btn">
        Back
      </button>
      <div className="container">
        <h1 className="search-heading">Search for Recipes</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="search-input" className="search-label">
            Enter a single letter to search for recipes:
          </label>
          <input
            type="text"
            placeholder="Enter a letter..."
            value={searchLetter}
            onChange={(e) => setSearchLetter(e.target.value.toUpperCase())}
            maxLength={1}
          />
          <button className="search-btn" type="submit">Search</button>
        </form>

        <div className="alphabet">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className="alphabet-button"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};