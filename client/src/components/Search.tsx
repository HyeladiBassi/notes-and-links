import { Box, FormControl, Input, TextField, Icon, SxProps, InputLabel, InputAdornment } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { useState } from 'react';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';

export interface SearchBarProps {
  containerProps?: BoxProps;
  containerSx?: SxProps;
}

const SearchBar = ({ containerProps, containerSx }: SearchBarProps) => {
  const [search, setSearch] = useState('');

  // make requests and update lists in redux js toolkit
  // use the popper component to show a list of search results, only show 20 at max

  return (
    <Box width="100%" sx={{ '& > :not(style)': { m: 1 }, ...containerSx }} {...containerProps}>
      <TextField
        id="input-with-icon-adornment"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search links"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        size="small"
        sx={{
          borderRadius: '50px'
        }}
      />
    </Box>
  );
};

export default SearchBar;
