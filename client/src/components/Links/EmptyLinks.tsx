import EmptyContent from 'components/EmptyContent';
import LinkIcon from '@mui/icons-material/Link';
import blue from '@mui/material/colors/blue';

const EmptyLinks = () => {
  return (
    <EmptyContent
      icon={
        <LinkIcon
          sx={{ fontSize: 100, color: blue[500], transform: 'rotate(-33.45deg)' }}
        />
      }
      title="No links saved yet"
      message="Click on the '+' below to add a link"
    />
  );
};

export default EmptyLinks;
