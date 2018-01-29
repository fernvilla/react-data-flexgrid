import React, { Component } from "react";
import PropTypes from "prop-types";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

fontawesome.library.add(solid, faSearch);

export default class Search extends Component {
  static propTypes = {
    filter: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = { showSearchInput: false };
  }

  toggleSearch = () => {
    this.setState({ showSearchInput: !this.state.showSearchInput });
  };

  renderInput() {
    return (
      <input
        type="search"
        placeholder="Search"
        onChange={e => this.props.filter(e.target.value)}
        className="flexgrid-search-input"
      />
    );
  }

  render() {
    return (
      <div className="flexgrid-search-row">
        <FontAwesomeIcon icon="search" className="flexgrid-search-icon" onClick={this.toggleSearch} />

        {this.renderInput()}
      </div>
    );
  }
}
