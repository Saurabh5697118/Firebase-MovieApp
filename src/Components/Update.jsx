import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { db } from "../Firebase/FirebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const Update = () => {
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
    if (!movieData.Title || !movieData.Rating || !movieData.Method) {
      alert("Kindly fill all the details");
      return;
    }
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
        <h2 style={{ marginBottom: 40 }}>Update Movie Details </h2>
        <div className="creds">
          <label htmlFor="Title">Title</label>
          <input
            id="Title"
            placeholder="Title..."
            value={movieData.Title}
            type="text"
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <label htmlFor="Method">Method</label>
          <textarea
            id="Method"
            placeholder="Description..."
            value={movieData.Method}
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <label htmlFor="Rating">Rating</label>
          <input
            id="Rating"
            value={movieData.Rating}
            type="number"
            placeholder="Rating..."
            max={5}
            min={0}
            onChange={(e) =>
              setMovieData({ ...movieData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
