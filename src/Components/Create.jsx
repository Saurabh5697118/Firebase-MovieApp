import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "Movies");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      alert("please fill all the fields");
      return;
    }
    await addDoc(usersCollectionRef, {
      Title: title,
      Method: method,
      Rating: rating,
    });
    navigate("/home");
  };
  return (
    <div className="update-create-movie">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 40 }}>Create Movie </h2>
        <div className="creds">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="creds">
          <label htmlFor="method">Description</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
        <div className="creds">
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            value={rating}
            type="number"
            min={0}
            max={5}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="creds">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
