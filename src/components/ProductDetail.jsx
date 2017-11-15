import React from 'react';
import {connect} from 'react-redux';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import ProductCard from './ProductCard';

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      product: {
        title: 'Product title',
        description: 'Product description',
        image: 'http://res.cloudinary.com/vonpix-srl/image/upload/c_scale,h_100/v1510725141/x_Agrichain-Original_ase5vc.png',
        price: ' - ', quantity: '- kg', timestamp: '',
        lat: 0, lng: 0
      },
      currentLocation: {
        lat: 0,
        lng: 0
      },
      userPosition: false
    }
  }

  componentWillMount() {
    const {web3} = this.props;

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
              // TODO - FIND A NODE!
              // const arr = this.state.products.slice();
              // concatenate base & decimal coordinate's parts
              // const latitude = product[2] + '.' + product[3];
              // const longitude = product[4] + '.' + product[5];
              // arr.push({
              //   title: product[0],
              //   image: 'https://ipfs.io/ipfs/' + product[1],
              //   latitude: latitude,
              //   longitude: longitude,
              //   price: product[6],
              //   quantity: product[7],
              //   timestamp: product[8]
              // });
              // this.setState({
              //   products: arr
              // });
            })
          }
        })
      })
    });
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          },
          userPosition: true
        });
      })
    }
  }

  render() {
    let cardDetails = this.state.product;
    cardDetails['grid'] = {xs: 12, sm: 12, lg: 12};
    cardDetails['hideMap'] = true;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div className="main-title">
            <Typography type="display2" gutterBottom>
              {this.state.product.title}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProductCard details={cardDetails}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div ref='map'>
            <Map google={this.props.google}
                 center={{
                   lat: this.state.currentLocation.lat,
                   lng: this.state.currentLocation.lng
                 }}
                 zoom={7}
                 style={{width: '100%', position: 'relative', height: '500px'}}
                 className={'map'}>
              {this.state.userPosition &&
              <Marker
                icon={{
                  url: 'https://lh3.googleusercontent.com/5OM8W6oF0NdKd_8aEKlpSybDejudy-AFsxT6E3p_Acb9iLNCrdQXwhXwJhsNcVAJNhs=w300',
                  scaledSize: {height: 20, width: 20}
                }}
                position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}} />
              }
              <Marker
                title={this.state.product.title}
                name={this.state.product.title}
                icon={{
                  url: "http://res.cloudinary.com/vonpix-srl/image/upload/c_scale,h_40/v1510725141/x_Agrichain-Cropped_ni6v3q.png",
                  scaledSize: {height: 40, width: 40}
                }}
                position={{lat: this.state.product.lat, lng: this.state.product.lng}}/>
            </Map>
          </div>
        </Grid>
      </Grid>
    );
  }
}


const mapStateToProps = (state) => ({
  web3: state.web3.instance
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyD87DpuuGzcAhgMXG7c6yzYpajkQwLck4s"
})(connect(mapStateToProps)(GoogleMap));

export default WrappedContainer
