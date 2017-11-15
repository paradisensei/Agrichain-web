import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Layout from '../components/Layout.jsx'

const Main = ({ classes, children }) => (
  <Layout className={classes.main}>
    {children}
  </Layout>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

const styleSheet = theme => ({
  main: {
    height: Screen.height,
    width: Screen.width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default withStyles(styleSheet)(Main);