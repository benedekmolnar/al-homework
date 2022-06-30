import './searchBar.css';
import {apiPost} from "./utility";
import {useState} from "react";
import {TextField, CircularProgress} from "@mui/material";
import LoadingButton from "@mui/material/Button";
import DisplayBar from "./displayBar";

function SearchBar(){

    const [userInput, setUserInput] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchBarChange = (e) => {
        setUserInput(e.target.value);
    }

    async function handleSubmitClick(){
        setLoading(true);
        let query = `
            query SearchMovies {
            searchMovies(query: "${userInput}") {
                    name
                    score
                    genres {name}
                  }
                }
             `
        await apiPost("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then(result => setData(result.data.searchMovies))
        setLoading(false);
    }

    return(
        <div className="main-container">
            <div className="search-container">
                <TextField onChange={handleSearchBarChange} fullWidth label="Search for a movie">SearchBar</TextField>
                <LoadingButton onClick={handleSubmitClick} variant="outlined">Submit</LoadingButton>
            </div>
            {loading && <CircularProgress/>}
            <div className="display-container">
                <DisplayBar result={data}/>
            </div>
        </div>
    )
}

export default SearchBar;