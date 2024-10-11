import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentUser) {
      UserService.getPublicContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {content.products &&
          content.products.map((p) => (
            <div key={p.name}>
              <h3>{p.name}</h3>
              <p>sku: {p.sku}</p>
              <p>upc: {p.upc}</p>
            </div>
          ))}
      </header>
    </div>
  );
};

export default Home;
