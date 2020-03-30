import React from 'react';
import Navbar from '../client/Navbar';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Navbar',
  component: Navbar,
};

export const LoggedOut = () => <BrowserRouter><Navbar /></BrowserRouter>;

LoggedOut.story = {
  name: 'logged out',
};

export const LoggedIn = () => <BrowserRouter><Navbar user={{ name: 'User Name' }} /></BrowserRouter>;

LoggedIn.story = {
  name: 'logged in',
};
