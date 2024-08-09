import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { db } from "../Firebase/FirebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const Update = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const usersCollectionRef = collection(db, "Movies");
  const navigate = useNavigate();
  const { moviesList, setMoviesList, currentUser, setUserLoggedIn } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else setUserLoggedIn(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMoviesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].id === id) {
          setMovieData({ ...data.docs[i].data(), id: id });
        }
      }
    };
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Title: movieData.Title,
      Rating: movieData.Rating,
      Method: movieData.Method,
    };
    const userDoc = doc(db, "Movies", id);
    await updateDoc(userDoc, payload);
    navigate("/home");
  };

  return (
    <div className="update-create-movie">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 40, fontSize: sizes }}>
          Update Movie Details{" "}
        </h2>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Title">
            Title
          </label>
          <input
            required
            id="Title"
            placeholder="Title..."
            value={movieData.Title}
            type="text"
            style={{ fontSize: sizes2 }}
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Method">
            Description
          </label>
          <textarea
            required
            id="Method"
            placeholder="Description..."
            value={movieData.Method}
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
            style={{ fontSize: sizes2 }}
          />
        </div>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Rating">
            Rating
          </label>
          <input
            required
            id="Rating"
            value={movieData.Rating}
            type="number"
            placeholder="Rating..."
            max={5}
            min={0}
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
            style={{ fontSize: sizes2 }}
          />
        </div>
        <div className="creds">
          <button style={{ fontSize: sizes2 }} type="submit">
            Submit
          </button>
        </div>
        <div className="creds">
          <button style={{ fontSize: sizes2, backgroundColor: "#e61212b8" }} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
