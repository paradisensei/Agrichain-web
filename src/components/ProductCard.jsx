import React from 'react';
import Grid from 'material-ui/Grid';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


export default class ProductCard extends React.Component {

  constructor(props) {
    super(props);

    let grid = {xs: 12, sm: 6, lg: 4};
    if(this.props.details && this.props.details.grid){
      grid = this.props.details.grid;
    }

    this.state = {
      title: this.props.details.title || 'Product title',
      description: this.props.details.description || 'Product description',
      image: this.props.details.image || 'http://www.gardenweasel.com/wp-content/uploads/2014/08/potatoes-tubers-garden.jpg',
      quantity: this.props.details.quantity || '- kg',
      price: this.props.details.price || '-.-',
      latitude: this.props.details.latitude || '0',
      longitude: this.props.details.longitude || '0',
      timestamp: this.props.details.timestamp || '0',
      grid: grid,
      hideMap: this.props.details.hideMap || false
    };
  }

  render() {
    return (
      <Grid item xs={this.state.grid.xs} sm={this.state.grid.sm} lg={this.state.grid.lg}>
        <Card>
          <CardMedia
            style={{height: '285px'}}
            image={this.state.image}
            title={this.state.title}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {this.state.title}
            </Typography>
            <Typography component="p">
              {this.state.description}
            </Typography>
            <Typography type="headline" component="h3"
                        style={{width: '100%', margin: '30px 0px 0px', textAlign: 'center'}}>
              {this.state.quantity} - ${this.state.price}
            </Typography>

            {!(this.state.hideMap) &&
              <Grid container>
                <Grid item xs={12}>
                  <Button raised color="primary" style={{width: '100%', margin: '30px 0px 0px'}}
                    onClick={() => {window.location='/product'}}>
                    View more
                  </Button>
                </Grid>
              </Grid>
            }

            {this.state.hideMap &&
            <div>
              <Avatar alt="The Seller" src="https://teamer.net/assets/empty-profile.jpg" />
              <Typography type="body1" style={{display: 'inline-block'}}>
                The Local Farmer
              </Typography>
            </div>
            }
          </CardContent>
        </Card>
      </Grid>
    );
  }

}