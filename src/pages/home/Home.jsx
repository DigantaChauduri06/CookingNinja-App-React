import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
//Components
import RecipeList from "../../components/RecipeList";
// Style
import "./Home.css";

function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snap) => {
        if (snap.empty) {
          setError("No Recipes to load click the create button to get started");
          setIsPending(false);
        } else {
          const result = [];
          snap.forEach((e) => {
            result.push({ id: e.id, ...e.data() });
          });
          setData(result);
          setIsPending(false);
        }
      },
      (er) => {
        setError(er.message);
        setIsPending(false);
      }
    );
    return () => {
      console.log("Tata bye bye");
      unsub();
    };
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <h3>Hang on...</h3>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;
