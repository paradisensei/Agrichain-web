import React from 'react';
import { connect } from 'react-redux';

class Partners extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [0]
    }
  }

  render() {
    let products;

    if (this.state.products.length > 0) {
      products = <div>
        <h3>Organic products:</h3>
        <ul>
          {
            this.state.products.map(p =>
              <li>
                <p>Image</p>
                <p>Origin</p>
                <p>Price</p>
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