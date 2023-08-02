import { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Favorite, Restore, LocationOn } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const useValuesAsNavigation = () => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes('notes')) setValue(0);
    if (pathname.includes('tags')) setValue(1);
  }, []);

  const changeValue = useCallback(
    (newValue: number) => {
      switch (newValue) {
        case 1:
          setValue(1);
          return navigate('/tags');
        case 0:
        default:
          setValue(1);
          return navigate('/notes');
      }
    },
    [value]
  );

  return useMemo(
    () => ({
      value,
      changeValue,
    }),
    [value, changeValue]
  );
};

const BottomBar = () => {
  const { value, changeValue } = useValuesAsNavigation();

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => changeValue(newValue)}
    >
      <BottomNavigationAction label="Links" icon={<Restore />} />
      <BottomNavigationAction label="Add Link" icon={<Favorite />} />
      <BottomNavigationAction label="Tags" icon={<LocationOn />} />
    </BottomNavigation>
  );
};

export default BottomBar;
