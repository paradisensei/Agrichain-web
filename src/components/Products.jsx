import React from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ProductCard from './ProductCard.jsx'


class Partners extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentWillMount() {
    const { web3 } = this.props;

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
              // concatenate base & decimal coordinate's parts
              const latitude = product[2] + '.' + product[3];
              const longitude = product[4] + '.' + product[5];
              arr.push({
                title: product[0],
                image: 'https://ipfs.io/ipfs/' + product[1],
                latitude: latitude,
                longitude: longitude,
                price: product[6],
                quantity: product[7],
                timestamp: product[8]
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
    let products = "";

    if (this.state.products.length > 0) {
      products = (
        <div style={{width: '100%'}}>
          <div className="main-title">
            <Typography type="display2" gutterBottom>
              Local Goods
            </Typography>
          </div>
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
      <div>
        {products}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.instance
});

export default connect(mapStateToProps)(Partners);