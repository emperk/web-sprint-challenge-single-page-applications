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
import axios from "axios";
import * as yup from "yup";

// import components from the different routes here:
import OrderForm from "./components/OrderForm";
import IndividualOrder from "./components/IndividualOrder";
import Home from "./components/Home"
import schema from "./validation/formSchema"
//

//initial states (form values)//
const initialFormValues = {
  // text inputs //
  orderName: "",
  specialInstructions: "",
  //dropdown//
  pizzaSize: "",
  //checkboxes//
  pepperoni: false,
  cheese: false,
  threeMeat: false,
  pineapple: false,
};

//initial states(form errors) //

const initialFormErrors = {
  orderName: "",
  pizzaSize: "",
  specialInstructions: "",
};

const initialOrders = [];
const initialDisabled = true;

export default function App(props) {
  const [orders, setOrders] = useState(initialOrders); 
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getOrders = () => {
    axios
      .post('https://reqres.in/api/orders')
      .then((response) => {
        setOrders(response?.data?.data);
        console.log("Response Data from get orders: ", response.data);
      })
      .catch((error) => {
        console.log("The Error: ", error);
      });
  };

  const postNewOrder = (newOrder) => {
    axios
      .post('https://reqres.in/api/orders', newOrder)
      .then((response) => {
        console.log("The Response in Post new order: ", response);
        setOrders([response?.data, ...orders]);
        setFormValues(initialFormValues);
      })
      .catach((error) => {
        console.log("The Error:", error);
      });
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch((error) => 
        setFormErrors({
          ...formErrors, 
            [name]: error.errors[0]
        }))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  };

  const formSubmit = () => {
    const newOrder = {
      orderName: formValues.orderName.trim(),
      specialInstructions: formValues.specialInstructions.trim(),
      pizzaSize: formValues.pizzaSize.trim(),
      toppings: ["pepperoni", "cheese", "threeMeat", "pineapple"].filter(
        (topping) => formValues[topping]
      ),
    };
    postNewOrder(newOrder);
  };

  useEffect(() => {
    getOrders();
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  console.log("THE ORDERS: ", orders);

  return (
    <>
      <div className="App">
        <h1>Lambda Eats</h1>
        <nav>
          <div className="nav-links">
            <Link to="/" className="order-pizza">Home</Link>
            <Link to="/pizza" className="pizza-form">Order Now</Link>
          </div>
        </nav>
      </div>
      <Switch>
        <Route path="/pizza/:formID">
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
