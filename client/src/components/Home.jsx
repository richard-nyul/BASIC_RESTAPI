import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  //Checking if the user is logged in when the component is mounting

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/getUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <button className="signout-btn" type="button" onClick={handleSignOut}>
        Sign out
      </button>
      <div className="users-container">
        {data &&
          data.map((user) => (
            <div className="user-container" key={user.id}>
              <h2>Name: {user.name}</h2>
              <p>Username: {user.username}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
