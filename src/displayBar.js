import {apiGet} from "./utility";
import {Box, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useState} from "react";
import "./displayBar.css";

function DisplayBar({result}){

    const [filmSummary, setFilmSummary] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    };

    async function handleWikipediaClick(searchParam){
        setOpenModal(true);
        return await apiGet("https://en.wikipedia.org/api/rest_v1/page/summary/" + searchParam)
            .then(response => setFilmSummary(response.extract))
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
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="summary-modal-title"
                    aria-describedby="summary-modal-description"
                >
                    <Box className="summary-box">
                        <Typography>
                            {filmSummary}
                        </Typography>
                    </Box>
                </Modal>
            </Table>
        )
    }
}

export default DisplayBar;