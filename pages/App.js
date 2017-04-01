/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { CloseIcon, HomeIcon, InfoIcon, ErrorIcon } from '../utils/Icons';

@connect((store) =>
  ({
    title: store.appState.title,
    errorMsg: store.appState.errorMsg,
  }),
)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentWillReceiveProps() {
    this.closeMenu();
  }

  closeMenu = () => this.setState({ open: false });
  openMenu = () => this.setState({ open: true });

  render() {
    let message = '';
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
      });
    }

    if (this.props.errorMsg) {
      message = (
        <Paper className="error-page" zDepth={3}>
          <ErrorIcon />
          <p>{this.props.errorMsg}</p>
        </Paper>
      );
    }

    return (
      <div>
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem
            onTouchTap={this.closeMenu}
            rightIcon={<CloseIcon />}
          />
          <MenuItem
            primaryText="Home"
            containerElement={<Link to="/" />}
            leftIcon={<HomeIcon />}
          />
          <MenuItem
            primaryText="About"
            containerElement={<Link to="/about" />}
            leftIcon={<InfoIcon />}
          />
        </Drawer>
        <AppBar title={this.props.title} onLeftIconButtonTouchTap={this.openMenu} />
        {message}
        {children}
      </div>
    );
  }
}


App.propTypes = {
  title: React.PropTypes.string,
  errorMsg: React.PropTypes.string,
  route: React.PropTypes.shape({
    auth: React.PropTypes.shape({
      logout: React.PropTypes.func,
    }),
  }),
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
