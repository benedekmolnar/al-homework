import {apiGet} from "./utility";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

function DisplayBar({result}){
    async function handleWikipediaClick(searchParam){
        return await apiGet("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + searchParam + "&origin=*").then(result => console.log(result))
    }
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
                            <TableCell onClick={() => handleWikipediaClick(row.name)}>{row.name}</TableCell>
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

export default DisplayBar;