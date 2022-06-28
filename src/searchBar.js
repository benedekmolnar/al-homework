import './searchBar.css';
import {TextField} from "@mui/material";
import LoadingButton from "@mui/material/Button";

function SearchBar(){

    return(
        <div className="container">
            <TextField fullWidth label="Search for a movie">SearchBar</TextField>
            <LoadingButton variant="outlined">Submit</LoadingButton>
        </div>
    )
}

export default SearchBar;