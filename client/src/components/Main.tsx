import { Box } from '@mui/material';
import BottomBar from './BottomBar';
import SearchField from './Search';
import LinkIcon from 'assets/LinkIcon.svg';
import EmptyLinks from './Links/EmptyLinks';

const MainApp = () => {
  return (
    <>
      <SearchField />
      <EmptyLinks />
      <BottomBar />
    </>
  );
};

export default MainApp;
