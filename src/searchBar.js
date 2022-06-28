import './searchBar.css';
import {TextField} from "@mui/material";
import LoadingButton from "@mui/material/Button";
import {useState} from "react";

function SearchBar(){
    const [userInput, setUserInput] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleClick = () => {
        setSearchCriteria(userInput);
    }

    return(
        <div className="container">
            <TextField onChange={handleChange} fullWidth label="Search for a movie">SearchBar</TextField>
            <LoadingButton onClick={handleClick} variant="outlined">Submit</LoadingButton>
        </div>
    )
}

export default SearchBar;