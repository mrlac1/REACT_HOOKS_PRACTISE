import React, { useState } from "react";
import FetchDataCustomHook from "./FetchDataCustomHook";
const ManageDatas = () => {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, setUrl] = FetchDataCustomHook(
    "http://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  const submitForm = (event) => {
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Error ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default ManageDatas;
