import React from "react";
import { Link } from "react-router-dom";

// const OrderForm = (props) => {
//   const { values } = props;
//   console.log('values', values)

//   return <div>
//     <h3>{values.orderName}</h3>
//     <div>
//       Order your pizza
//       <Link to="/pizza/order-pizza">Order pizza</Link>
//     </div>
//   </div>;
// };

// export default OrderForm;

export default function OrderForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };
  
  return (
    <form className="form container" onSubmit={onSubmit}>

      <h2>Build Your Own Pizza</h2>
      <div className="form-group pizza-size">
        <h4>Choice of Size</h4>
        <label>
          <select onChange={onChange} value={values.pizzaSize} name="pizzaSize">
            <option value="">- Select a Pizza Size -</option>
            <option value="extraLarge">Extra Large</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="personal">Personal (Small)</option>
          </select>
        </label>
      </div>
      <div className="form-group toppings">
        <h4>Add Toppings</h4>
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
        <h4>Special Instructions</h4>
        <input 
          value={values.specialDeliveryInstructions}
          onChange={onChange}
          name="specialDeliveryInstructions"
          type="text"
        />
      </div>

      <div className="form-group submit">
        <button disabled={disabled}>Submit My Order</button>
        <div className="errors">
          <div>{errors.orderName}</div>
          <div>{errors.pizzaSize}</div>
          <div>{errors.specialDeliveryInstructions}</div>
        </div>
      </div>
    </form>
  )
}

