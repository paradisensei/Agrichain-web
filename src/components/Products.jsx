import React from 'react';
import { connect } from 'react-redux';

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
              //TODO fetch image from IPFS using hash
              //TODO convert coordinates to real addresses using maps API
              arr.push({
                image: product[0],
                latitude: product[1],
                longitude: product[2],
                price: product[3],
                timestamp: product[4]
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
      products = <div>
        <h3>Organic products:</h3>
        <ul>
          {
            this.state.products.map((p, i) =>
              <li key={i}>
                <p>{p.image}</p>
                <p>{p.latitude}</p>
                <p>{p.longitude}</p>
                <p>{p.price}</p>
                <p>{p.timestamp}</p>
                <p>Link to current producer's other products</p>
                <hr/>
              </li>
            )
          }
        </ul>
      </div>
    }

    return (
      <div>
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