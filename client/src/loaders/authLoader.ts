import { redirect } from 'react-router-dom';

export const authLoader = () => {
  const token = localStorage.getItem('accessToken') !== null;
  if (token) return redirect('/');
  return null;
};
