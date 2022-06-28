import './searchBar.css';
import {TextField} from "@mui/material";
import LoadingButton from "@mui/material/Button";
import {useState} from "react";
import {apiPost} from "./utility";

function SearchBar(){
    const [userInput, setUserInput] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleClick = () => {
        let query = `
            query SearchMovies {
            searchMovies(query: "${userInput}") {
                    id
                    name
                    score
                    genres {name}
                  }
                }
             `
        apiPost("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then(result => console.log(result))
    }

    return(
        <div className="container">
            <TextField onChange={handleChange} fullWidth label="Search for a movie">SearchBar</TextField>
            <LoadingButton onClick={handleClick} variant="outlined">Submit</LoadingButton>
        </div>
    )
}

export default SearchBar;