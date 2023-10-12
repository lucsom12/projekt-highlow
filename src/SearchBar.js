import React from "react";

const SearchBar = ({
  searchInput,
  setSearchInput,
  searchResults,
  searchArtist,
  setSearchResults,
}) => {
  return (
    <div className="row d-flex">
      <div className="col-12">
        <input
          className="form-control"
          type="input"
          id="exampleFormControlInput1"
          value={searchInput}
          placeholder="Search for an Artist!"
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>

        <ul className="list-group">
          {searchResults.slice(0, 7).map((result) => (
            <li
              className="list-group-item list-group-item-action"
              key={result.id}
              onClick={() => {
                searchArtist(result.name);
                setSearchResults([]);
              }}
            >
              {result.images && (
                <img
                  className=""
                  src={result.images[0] ? result.images[0].url : ""}
                  alt={result.name}
                  width="50"
                  height="50"
                />
              )}
              {result.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
