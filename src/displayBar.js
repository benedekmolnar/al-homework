import "./displayBar.css";
import {apiGet} from "./utility";
import {useState} from "react";
import {Box, CircularProgress, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

function DisplayBar({result}){

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [filmSummary, setFilmSummary] = useState("No summary available");
    const [wikipediaLink, setWikipediaLink] = useState("");
    const [imdbLink, setImdbLink] = useState("");

    const handleModalClose = () => {
        setOpenModal(false);
        setFilmSummary("No summary available");
    };

    async function handleWikipediaClick(searchParam){
        setLoading(true);
        setOpenModal(true);
        setWikipediaLink("https://en.wikipedia.org/wiki/" + searchParam);

        await apiGet("https://imdb-api.com/en/API/SearchMovie/k_kozt50ag/" + searchParam)
            .then(result => setImdbLink("https://www.imdb.com/title/" + result.results[0].id + "/"));

        await apiGet("https://en.wikipedia.org/api/rest_v1/page/summary/" + searchParam)
            .then(response => setFilmSummary(response.extract));

        setLoading(false);
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
                    {result.map(
                        (row) => (
                        <TableRow key={row.name}>
                            <TableCell onClick={() => handleWikipediaClick(row.name)}>{row.name}</TableCell>
                            <TableCell>{row.score}</TableCell>
                            <TableCell>{row.genres.map(
                                function(genre, index) {
                                    return <span key={index}>{ (index ? ', ' : '') + genre.name }</span>;}
                            )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <Modal
                    open={openModal}
                    onClose={handleModalClose}
                    aria-labelledby="summary-modal-title"
                    aria-describedby="summary-modal-description"
                >
                    <Box className="summary-box">
                        {loading && <CircularProgress/>}
                        <Typography>
                            {filmSummary}
                        </Typography>
                        <p><a href={imdbLink}>IMDB</a></p>
                        <p><a href={wikipediaLink}>WIKIPEDIA</a></p>
                    </Box>
                </Modal>
            </Table>
        )
    }
}

export default DisplayBar;