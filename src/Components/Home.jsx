import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../Firebase/FirebaseConfig";
import { useAuth } from "../Auth/AuthContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { useMediaQuery } from "@mui/material";

function Home() {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 18 : 24;
  const usersCollectionRef = collection(db, "Movies");
  const navigate = useNavigate();
  const { currentUser, setUserLoggedIn, moviesList, setMoviesList } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else setUserLoggedIn(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMoviesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  const handleDelete = async (movie) => {
    const userDoc = doc(db, "Movies", movie.id);
    await deleteDoc(userDoc);
    setMoviesList((prevMovies) =>
      prevMovies.filter((data) => data.id !== movie.id)
    );
  };

  const rated = (
    <StarOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  const unRated = (
    <StarOutlineOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  return (
    <div className="movie-cards">
      {moviesList.map((movie) => {
        return (
          <div className="movie-card">
            <div style={{ fontWeight: 550, fontSize: sizes, marginBottom: 30 }}>
              {movie.Title}
            </div>
            <div className="card-rating-operator">
              <div
                style={{
                  fontWeight: 300,
                  fontSize: mobView ? 10 : tabView ? 12 : 18,
                  color: "#515050",
                  display: "flex",
                }}
              >
                Rating: {[...Array(movie.Rating)].map((data) => rated)}
                {[...Array(5 - movie.Rating)].map((data) => unRated)}
              </div>

              <div className="card-edit-del-buttons">
                <EditOutlinedIcon
                  onClick={() => navigate(`/${movie.id}`)}
                  sx={{ cursor: "pointer", fontSize: sizes }}
                />
                <DeleteOutlineOutlinedIcon
                  onClick={() => handleDelete(movie)}
                  sx={{
                    margin: "0px 5px",
                    cursor: "pointer",
                    color: "#ff0000ab",
                    fontSize: sizes,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="add-card" onClick={() => navigate("/create")}>
        <AddCircleTwoToneIcon />
      </div>
    </div>
  );
}

export default Home;
