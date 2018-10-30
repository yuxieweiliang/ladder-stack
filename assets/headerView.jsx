/* global ReactServer*/
/* eslint no-console:off*/
import 'styles/com.scss';
import HeaderView from 'units/headerView';
document.querySelector('#header').innerHTML = ReactServer.renderToString(<HeaderView/>);


