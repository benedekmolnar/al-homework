import './searchBar.css';
import {TextField} from "@mui/material";
import LoadingButton from "@mui/material/Button";
import {useState} from "react";
import {apiPost} from "./utility";
import DisplayBar from "./displayBar";

function SearchBar(){
    const [userInput, setUserInput] = useState("");
    const [data, setData] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    async function handleClick(){
        let query = `
            query SearchMovies {
            searchMovies(query: "${userInput}") {
                    name
                    score
                    genres {name}
                  }
                }
             `
        return await apiPost("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then(result => setData(result.data.searchMovies))
    }

    return(
        <div className="main-container">
            <div className="search-container">
                <TextField onChange={handleChange} fullWidth label="Search for a movie">SearchBar</TextField>
                <LoadingButton onClick={handleClick} variant="outlined">Submit</LoadingButton>
            </div>
            <div className="display-container">
                <DisplayBar result={data}/>
            </div>
        </div>
    )
}

export default SearchBar;