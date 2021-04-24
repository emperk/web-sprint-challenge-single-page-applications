// import React from "react";

// const App = () => {
//   return (
//     <>
//       <h1>Lambda Eats</h1>
//       <p>You can remove this code and create your own header</p>
//     </>
//   );
// };
// export default App;

import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";

// import components for different routes

import OrderForm from "./components/OrderForm";
import IndividualOrder from "./components/IndividualOrder";
import Home from "./components/Home";
import axios from "axios";
import schema from "./validation/formSchema";
import "./App.css";
import * as yup from "yup";

// initial states //

const initialFormValues = {
  // text inputs //
  orderName: "Hawaiian",
  // dropdown //
  pizzaSize: "",
  // checkboxes FOR TOPPINGS //
  pepperoni: false,
  cheese: false,
  threeMeat: false,
  pineapple: false,
  // text inputs //
  specialDeliveryInstructions: "",
};

const initialFormErrors = {
  orderName: "",
  pizzaSize: "",
  specialDeliveryInstructions: "",
};

const initialOrders = [];
const initialDisabled = true;

export default function App(props) {
  const [orders, setOrders] = useState(initialOrders); // array of all the orders
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getOrders = () => {
    axios
      .get("https://reqres.in/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((res) => {
        setOrders([res.data, ...orders]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })

      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value, // not an array
    });
  };

  const formSubmit = () => {
    const newOrder = {
      orderName: formValues.orderName.trim(),
      pizzaSize: formValues.pizzaSize.trim(),
      specialDeliveryInstructions: formValues.specialDeliveryInstructions.trim(),
      toppings: ["pepperoni", "cheese", "threeMeat", "pineapple"].filter(
        (topping) => formValues[topping]
      ),
    };
    postNewOrder(newOrder);
  };

  // side effects //

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <div className="App">
        <h1>Lambda Eats</h1>
        <nav>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/pizza">Order Now!</Link>
          </div>
        </nav>
      </div>
      <Switch>
        <Route path="/pizza/:formId">
          <IndividualOrder />
        </Route>
        <Route path="/pizza">
          <OrderForm
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
