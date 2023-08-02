import { TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  // make requests and update lists in redux js toolkit

  return (
    <TextField onChange={e => setSearch(e.target.value)} value={search} />
  );
};

export default SearchBar;

