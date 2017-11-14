import React from 'react';
import { connect } from 'react-redux';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Grid from 'material-ui/Grid';
import ProductCard from './ProductCard.jsx'


class GoogleMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentWillMount() {
        const { web3, ipfs } = this.props;

        // Instantiate contract once web3 is provided.
        const contractInfo = require('../properties/AgrichainInfo.json');
        const contract = new web3.eth.Contract(contractInfo.abi, contractInfo.address);

        // get all farmer's addresses
        contract.methods.getFarmers().call((e, farmers) => {
            // for each farmer get his/her products
            farmers.forEach(f => {
                contract.methods.getProductsCount(f).call((e, count) => {
                    for (let i = 0; i < count; i++) {
                        contract.methods.products(f, i).call((e, product) => {
                            const arr = this.state.products.slice();
                            //TODO convert coordinates to real addresses using maps API
                            arr.push({
                                title: product[0],
                                image: 'https://ipfs.io/ipfs/' + product[1],
                                latitude: product[2],
                                longitude: product[3],
                                price: product[3],
                                quantity: product[4],
                                timestamp: product[5]
                            });
                            this.setState({
                                products: arr
                            });
                        })
                    }
                })
            })
        });
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Map google={this.props.google}
                     style={{width: '100%', height: '100%', position: 'relative'}}
                     className={'map'}
                     zoom={2}>
                    {
                        this.state.products.map( x => {
                            return (
                                <Marker
                                    title={x.title}
                                    name={x.title}
                                    position={{lat: x.latitude, lng: x.longitude}} />
                            );
                        })
                    }

                </Map>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    web3: state.web3.instance,
    ipfs: state.ipfs.api
});

const WrappedContainer = GoogleApiWrapper({
    apiKey: "AIzaSyD87DpuuGzcAhgMXG7c6yzYpajkQwLck4s"
})(connect(mapStateToProps)(GoogleMap));

export default WrappedContainer
