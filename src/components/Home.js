import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const routeToOrder = () => {
    history.push("/pizza");
  }

  return (
    <div className="home-wrapper">
      <img 
        className="home-img"
        src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        alt=""
      />
      <button 
        onClick={routeToOrder}
        className="home-button shop-button"
      > 
        Order My Pizza!
      </button>
    </div>
  )
}