import './searchBar.css';
import {TextField, TableHead, Table, TableCell, TableRow, TableBody} from "@mui/material";
import LoadingButton from "@mui/material/Button";
import {useState} from "react";
import {apiPost} from "./utility";

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

function DisplayBar({result}){
    if (result){
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.score}</TableCell>
                            <TableCell>{row.genres.map(function(genre, index) {
                                return <span key={index}>{ (index ? ', ' : '') + genre.name }</span>;
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

export default SearchBar;