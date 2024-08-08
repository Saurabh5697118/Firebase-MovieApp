import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

const Create = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
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
      <h2 style={{marginBottom: 40, fontSize: sizes}}>Create Movie </h2>
        <div className="creds">
        <label
        style={{ fontSize: sizes2 }}  htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          type="text"
          style={{ fontSize: sizes2 }} 
          onChange={(e) => setTitle(e.target.value)}
        /></div>
        <div className="creds">
        
        <label
        style={{ fontSize: sizes2 }}  htmlFor="method">Description</label>
        <textarea
          id="method"
          value={method}
          style={{ fontSize: sizes2 }} 
          onChange={(e) => setMethod(e.target.value)}
        /></div>
        <div className="creds">
        <label
        style={{ fontSize: sizes2 }}  htmlFor="rating">Rating</label>
        <input
          id="rating"
          value={rating}
          type="number"
          min={0}
          max={5}
          style={{ fontSize: sizes2 }} 
          onChange={(e) => setRating(e.target.value)}
        /></div>
        <div className="creds">
        <button 
        style={{ fontSize: sizes2 }} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
