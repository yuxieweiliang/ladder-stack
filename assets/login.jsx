/* global  React ReactServer*/
/* eslint no-console:off*/
import 'styles/com.scss';
import './styles/app.scss';
import Login from 'assets/login';

document.querySelector('#root').innerHTML = ReactServer.renderToString(<Login user="user"/>);
