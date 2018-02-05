import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SearchIcon from 'material-ui-icons/Search';
import debounce from 'debounce';

class TitleBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSearchChange: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  constructor(props) {
    super(props);

    this.onSearchChange = debounce(props.onSearchChange, 200);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value }, () => this.onSearchChange(value));
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography type="title" color="inherit">
            When To Call
          </Typography>
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
