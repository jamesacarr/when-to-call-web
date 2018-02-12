import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SearchIcon from 'material-ui-icons/Search';

class TitleBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    query: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value }, () => this.props.query(value));
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.search}>
              <SearchIcon/>
            </div>
            <input placeholder="Search for business" className={classes.input} value={value} onChange={this.handleChange}/>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TitleBar;
