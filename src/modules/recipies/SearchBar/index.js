import { useState } from "react"
import './styles.css';

export const SearchBar = ({ onSearch }) => {
    const [searchLetter, setSearchLetter] = useState('');

    const handleInputChange = (e) => {
        setSearchLetter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchLetter.length === 1) {
            onSearch(searchLetter);
        }
    };

    return (
        <form className="search-content" onSubmit={handleSubmit}>
            <h1 className="line-hero">Search for recipes</h1>
            <input
                className="input"
                type="text"
                placeholder="E..."
                value={searchLetter}
                onChange={handleInputChange}
                maxLength={1}
            />
            <button className="btn" type="submit">Search</button>
        </form>
    );
};