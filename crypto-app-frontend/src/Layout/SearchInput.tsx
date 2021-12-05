import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
//import Link from '@mui/material/Link';

function searchButton() {
  let elm: any = document.getElementById("coinSearchInputText");
  window.location.href=elm.value as string;
}



export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        id="coinSearchInputText"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Currency Symbol"
        inputProps={{ 'aria-label': 'search currency symbol' }
        }
      />
      <IconButton onClick={searchButton} sx={{ p: '10px' }} aria-label="search">
        
          <SearchIcon />
        
        
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}
