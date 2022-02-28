import React from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";

import "./Search.css";

function Search() {
  const [searchParams] = useSearchParams();
  // const quereyParams = new URLSearchParams();
  // searchParams.get("q");
  const query = searchParams.get("q");
  const url = `http://localhost:8080/recipes?q=${query}`;
  const { data, isPending, error } = useFetch(url);
  return (
    <div>
      <h2 className="page-title">Recipe Including "{query}"</h2>
      {error && <p className="error">Error Happend!!! Not Found</p>}
      {isPending && <p className="loading">Hang on ...</p>}
      {data &&
        (data.length !== 0 ? (
          <RecipeList recipes={data} />
        ) : (
          <p>No Matching recipe found!!!</p>
        ))}
    </div>
  );
}

export default Search;
