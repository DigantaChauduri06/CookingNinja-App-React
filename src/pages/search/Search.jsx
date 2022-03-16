import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";

import "./Search.css";

function Search() {
  const [searchParams] = useSearchParams();
  // const quereyParams = new URLSearchParams();
  // searchParams.get("q");
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("q");
  console.log(query);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("recipes")
      .get(query)
      .then((doc) => {
        // console.log(doc.docs[0].data());
        if (!doc.empty) {
          const result = [];
          doc.forEach((e) => {
            result.push({ id: e.id, ...e.data() });
          });
          console.log(result);
          setData(result);
          setIsPending(false);
        }
      })
      .catch((e) => {
        setError(e.message);
        setIsPending(false);
      });
  }, []);
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
