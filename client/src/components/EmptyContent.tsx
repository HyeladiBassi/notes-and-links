import React from 'react';
import { Stack, Typography, SxProps } from '@mui/material';

interface EmptyContentProps {
  icon: React.ReactNode;
  title: string;
  message?: string;
  containerSx?: SxProps;
}

const EmptyContent = ({ icon, title, message, containerSx }: EmptyContentProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={containerSx || {}}>
      {icon}
      <Typography>{title}</Typography>
      {message ? <Typography variant="body2">{message}</Typography> : null}
    </Stack>
  );
};

export default EmptyContent;
