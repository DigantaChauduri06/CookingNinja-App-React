import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

import "./Recipe.css";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";

function Recipe() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setData(doc.data());
            setIsPending(false);
          } else {
            throw new Error("No Recipe found");
          }
        },
        (er) => {
          setError(er.message);
          setIsPending(false);
        }
      );
    return () => {
      console.log("Tata bye bye Recipe.jsx");
      unsub();
    };
  }, []);
  const { mode } = useTheme();
  return (
    <div className={`single-recipe ${mode}`}>
      {isPending && <div className="loading">Hang On...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <>
          <h1>{data.title}</h1>
          <div>
            {data && (
              <ul>
                {data.ingredients?.map((item, idx) => {
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            )}
          </div>
          <p>{data.method}</p>
        </>
      )}
    </div>
  );
}

export default Recipe;
