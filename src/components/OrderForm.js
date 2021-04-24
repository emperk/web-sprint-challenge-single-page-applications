import React from "react";
import { Link } from "react-router-dom";

const OrderForm = (props) => {
  const { values } = props;
  console.log('values', values)

  return <div>
    <h3>{values.orderName}</h3>
    <div>
      Order your pizza
      <Link to="/pizza/order-pizza">Order pizza</Link>
    </div>
  </div>;
};

export default OrderForm;
