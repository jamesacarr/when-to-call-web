import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { CircularProgress } from 'material-ui/Progress';
import Toolbar from 'material-ui/Toolbar';
import SearchIcon from 'material-ui-icons/Search';

class TitleBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    performQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    setVisible: PropTypes.func.isRequired
  }

  handleChange = ({ target: { value } }) => {
    const { performQuery, setVisible } = this.props;

    setVisible(Boolean(value));
    performQuery(value);
  }

  render() {
    const { classes, loading, query } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.search}>
              <SearchIcon/>
            </div>
            <input placeholder="Search for business" className={classes.input} value={query} onChange={this.handleChange}/>
            {loading && (
              <div className={classes.loading}>
                <CircularProgress color="inherit" size={25}/>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TitleBar;
