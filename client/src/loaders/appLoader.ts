import { redirect } from 'react-router-dom';

export const appLoader = () => {
  const token = localStorage.getItem('accessToken') !== null;
  if (!token) return redirect('/login');
  return null;
};
