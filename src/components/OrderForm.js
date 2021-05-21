import React from "react";
import { Link } from "react-router-dom";

export default function OrderForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <h2>Build Your Own Pizza</h2>
      <div className="form-group pizza-size">
        <h5>Order Name</h5>
        <label>
          <input 
            type="text"
            name="orderName"
            value={values.orderName}
            onChange={onChange}
          />
        </label>
        <h5>Choose Size</h5>
        <label>
          <select onChange={onChange} value={values.pizzaSize} name="pizzaSize">
            <option value="">-- Select a Pizza Size --</option>
            <option value="extraLarge">Extra Large</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="personal">Personal (Small)</option>
          </select>
        </label>
      </div>

      <div className="form-group toppings">
        <h5>Add Toppings</h5>
        <label>
          Pepperoni
          <input 
            type="checkbox"
            name="pepperoni"
            checked={values.pepperoni}
            onChange={onChange}
          />
        </label>

        <label>
          Cheese
          <input 
            type="checkbox"
            name="cheese"
            checked={values.cheese}
            onChange={onChange}
          />
        </label>

        <label>
          Three Meat
          <input 
            type="checkbox"
            name="threeMeat"
            checked={values.threeMeat}
            onChange={onChange}
          />
        </label>

        <label>
          Pineapple
          <input 
            type="checkbox"
            name="pineapple"
            checked={values.pineapple}
            onChange={onChange}
          />
        </label>
      </div>

      <div className="form-input special">
        <h5>Special Instructions</h5>
        <input 
          type="text"
          name="specialInstructions"
          value={values.specialInstructions}
          onChange={onChange}
        />
      </div>

      <div className="form-group submit">
        <button disabled={disabled}>Submit My Order</button>
        <div className="errors">
          <div>{errors.orderName}</div>
          <div>{errors.pizzaSize}</div>
          <div>{errors.specialInstructions}</div>
        </div>
      </div>
    </form>
  )
}