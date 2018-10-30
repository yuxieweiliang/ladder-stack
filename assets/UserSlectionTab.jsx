/* global ReactDomServer*/
/* eslint no-console:off*/
import UserSelectionTab from 'units/userCardSelection';

import { userMsg } from './data';
// -----------------------------
//  病人简卡 + 病人名称 + 医生名称
// -----------------------------
document
  .querySelector('#List')
  .innerHTML = ReactDomServer
  .renderToString(
    <UserSelectionTab {...userMsg}/>
  );

