import ipfsAPI from 'ipfs-api';
import {
  IPFS_GATEWAY
} from '../properties/properties';

const initialState = {
  api: ipfsAPI(IPFS_GATEWAY)
};

export default function(state = initialState) {
  return state;
}