import React, { useState } from "react";
function Search({ search, onSearch }) {
  //   const [search, setSearch] = useState();
  //  const  onInputChange = (value) => {
  //       setSearch(value);
  //       onSearch(value);
  //   }
  return (
    <div className="search">
      <input
        type="text"
        name=""
        id=""
        className=""
        value={search}
        onChange={(e) => {
          onSearch(e);
        }}
      />
    </div>
  );
}

export default Search;
