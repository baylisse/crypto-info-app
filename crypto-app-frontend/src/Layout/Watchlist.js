import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from '@mui/material/Link';

const currUserID = "user01";
const apiEndpoint = "/Watchlist";
const watchlistAPI = "/GetWatchlist/" + currUserID;
async function populateWatchlist() {
    const watchlist = await (await fetch(watchlistAPI)).json();
    return watchlist.entries;
}
export default function BasicTable() {
    const [watchlistItems, setWatchlistItems] = useState([]);
    useEffect(() => {
        console.log("hello world");
        async function fetchData() {
            const watchlist = await populateWatchlist();
            setWatchlistItems(watchlist);
        }
        fetchData();
    }, []);
    return (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Currency Code</TableCell>
            <TableCell align="right">Bid Price&nbsp;(USD)</TableCell>
            <TableCell align="right">Ask Price&nbsp;(USD)</TableCell>
            <TableCell align="right">Currency Page</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlistItems.map((row) => (<TableRow key={row.currencyName} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.currencyName}
              </TableCell>
              <TableCell align="right">{row.currencyCode}</TableCell>
              <TableCell align="right">{row.bidPrice}</TableCell>
              <TableCell align="right">{row.askPrice}</TableCell>
              <TableCell align="right">
                <Button variant="contained" onClick={() => { window.location.href = ("/" + row.currencyCode); }}>Details</Button>
              </TableCell>
              
                <TableCell align="right">
                  <IconButton aria-label="delete" onClick={async () => {
                const res = await fetch(apiEndpoint, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ currencyCode: row.currencyCode })
                });
                console.log("watchlist delete result", res);
                const newWatchlist = await res.json();
                setWatchlistItems(newWatchlist);
            }}>
                    <Link href="/">
                      <DeleteIcon />
                    </Link>
                  </IconButton>
                </TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>);
}
