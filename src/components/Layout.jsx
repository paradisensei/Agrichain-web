import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import PinDropIcon from 'material-ui-icons/PinDrop';
import ExtiToAppIcon from 'material-ui-icons/ExitToApp';
import Drawer from 'material-ui/Drawer';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#43a047',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
      A100: '#b9f6ca',
      A200: '#69f0ae',
      A400: '#00e676',
      A700: '#00c853',
      contrastDefaultColor: 'dark'
    }
  }
});

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    width: '240px',
  },
});

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  _toggleDrawer = () => {
    this.setState({ open: !(this.state.open) });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{width: '100%'}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this._toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Agrichain
              </Typography>
              <div>
                <IconButton aria-haspopup="true" color="contrast">
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this._toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button onClick={() => window.location='/'}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => window.location='/map'}>
                  <ListItemIcon>
                    <PinDropIcon />
                  </ListItemIcon>
                  <ListItemText primary="Near-me" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Check-out" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ExtiToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <div className="main-container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Layout);
