import React from 'react';

const Search = ({ setSearchText }) => {
  const inputChangeHandler = e => {
    setSearchText(e.target.value);
  };

  return (
    <div className="fg-search">
      Search:
      <input type="search" onChange={inputChangeHandler} />
    </div>
  );
};

export default Search;
