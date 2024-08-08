import { useState, useEffect } from "react";
// import "./App.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../Firebase/FirebaseConfig";
import { useAuth } from "../Auth/AuthContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

function Home() {
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
  const rated = <StarOutlinedIcon sx={{ color: "#ffa500a1", fontSize: 24 }} />;
  const unRated = (
    <StarOutlineOutlinedIcon sx={{ color: "#ffa500a1", fontSize: 24 }} />
  );

  const handleDelete = async (movie) => {
    const userDoc = doc(db, "Movies", movie.id);
    await deleteDoc(userDoc);
    setMoviesList((prevMovies) =>
      prevMovies.filter((data) => data.id !== movie.id)
    );
  };

  return (
    <div className="movie-cards">
      {moviesList.map((movie) => {
        return (
          <div className="movie-card" key={movie.id}>
            <div style={{ fontWeight: 550, fontSize: 24, marginBottom: 30 }}>
              {movie.Title}
            </div>
            <div className="card-rating-operator">
              <div
                style={{
                  fontWeight: 300,
                  fontSize: 16,
                  color: "#515050",
                  display: "flex",
                }}
              >
                Rating: {[...Array(+movie.Rating)].map((data) => rated)}
                {[...Array(5 - +movie.Rating)].map((data) => unRated)}
              </div>

              <div className="card-edit-del-buttons">
                <EditOutlinedIcon
                  onClick={() => navigate(`/${movie.id}`)}
                  sx={{ cursor: "pointer", fontSize: 24 }}
                />
                <DeleteOutlineOutlinedIcon
                  onClick={() => handleDelete(movie)}
                  sx={{
                    margin: "0px 5px",
                    cursor: "pointer",
                    color: "#ff0000ab",
                    fontSize: 24,
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
