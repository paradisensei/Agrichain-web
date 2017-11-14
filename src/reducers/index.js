import { routerReducer } from 'react-router-redux';

import web3 from './web3';
import ipfs from './ipfs';

export default {
  routing: routerReducer,
  web3: web3,
  ipfs: ipfs
};