import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

fontawesome.library.add(solid, faSearch);

export default class Search extends Component {
  state = { showSearchInput: false };

  static propTypes = {
    filter: PropTypes.func.isRequired
  };

  toggleSearch = () => {
    this.setState({ showSearchInput: !this.state.showSearchInput });
  };

  renderInput() {
    const containerStyle = { display: this.state.showSearchInput ? 'inline' : 'none' };

    return (
      <span className="flexgrid-search-container" style={containerStyle}>
        <input
          type="search"
          placeholder="Search"
          onChange={e => this.props.filter(e.target.value)}
          className="flexgrid-search-input"
        />
      </span>
    );
  }

  render() {
    return (
      <div className="flexgrid-search">
        <FontAwesomeIcon
          icon="search"
          className="flexgrid-search-icon"
          color={this.state.showSearchInput ? '#000' : ''}
          onClick={this.toggleSearch}
        />

        {this.renderInput()}
      </div>
    );
  }
}
