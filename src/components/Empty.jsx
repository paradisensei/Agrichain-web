import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Img from 'react-image'
import Logo from '../assets/logo.svg';
import Screen from '../lib/screen';

const Empty = ({ classes }) => (
  <div className={classes.main}>
    <Img src={Logo} className={`${classes.logo} rotatable`} alt="spinner" />
  </div>
);

Empty.propTypes = {
  classes: PropTypes.object.isRequired
};

const styleSheet = {
  main: {
    height: Screen.height,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: '25%',
    maxWidth: 200,
    filter: 'invert(10%)'
  }
};

export default withStyles(styleSheet)(Empty);