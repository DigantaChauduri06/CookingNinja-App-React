import React, { useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import useTheme from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

function Create() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("");
  const [newIngridents, setNewIngridents] = useState("");
  const [ingridents, setIngridents] = useState([]);
  const [data, setData] = useState(null);
  const ingridentInput = useRef(null);
  const navigate = useNavigate();
  const { mode } = useTheme();

  // const { postData, data, error } = useFetch(
  //   "http://localhost:8080/recipes",
  //   "POST"
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingridents,
      cookingTime: time + " minutes",
      method,
    };
    projectFirestore
      .collection("recipes")
      .add(doc)
      .then((doc) => setData(doc))
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (data) navigate("/");
  }, [data]);
  const handleAdd = function (e) {
    e.preventDefault();
    const ing = newIngridents.trim();
    const alreadyExist = ingridents.includes(ing);
    console.log(ingridents, alreadyExist);
    if (!ing || alreadyExist) {
      return;
    } else {
      setIngridents((prev) => [...prev, ing]);
      setNewIngridents("");
      ingridentInput.current.focus();
    }
  };
  const LightColor = () => {
    console.log(mode);

    if (mode !== "Dark") return { color: "#1f1f1f" };
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className="title-form">Add A New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span style={LightColor()}>Recipe title: </span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span style={LightColor()}>Cooking Time (In minutes): </span>
          <input
            type="number"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            required
          />
        </label>
        <label>
          <span style={LightColor()}>Recipe Ingridients</span>
          <div className="ingidrients">
            <input
              type="text"
              onChange={(e) => setNewIngridents(e.target.value)}
              value={newIngridents}
              ref={ingridentInput}
            />
            <button className="ingi-but" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p className="ingi-list">
          {ingridents.map((ingi, idx) => {
            return (
              <span key={idx} className="ingi-list-items" style={LightColor()}>
                {ingi}
              </span>
            );
          })}
        </p>
        <label>
          <span style={LightColor()}>Cooking method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <div className="button-area" style={LightColor()}>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
