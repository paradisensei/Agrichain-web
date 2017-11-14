import React from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import ProductCard from './ProductCard.jsx'


class Partners extends React.Component {

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
    let products;

    if (this.state.products.length > 0) {
      products = (
        <div style={{width: '100%'}}>
          <h3>Organic products:</h3>
          <Grid container spacing={24}>
            {
              this.state.products.map((p, i) =>
                <ProductCard key={i} details={p} />
              )
            }
          </Grid>
        </div>
      );
    }

    return (
      <div style={{width: '100%'}}>
        {products}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.instance,
  ipfs: state.ipfs.api
});

export default connect(mapStateToProps)(Partners);