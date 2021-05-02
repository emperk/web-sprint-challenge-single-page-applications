import * as yup from "yup";

export default yup.object().shape({
  orderName: yup
    .string()
    .required("A name is required for your order.")
    .min(3, "Your order name must be 3 characters long."),
  specialDeliveryInstructions: yup
    .string(),
  pizzaSize: yup
    .string()
    .oneOf(["extraLarge", "large", "medium", "personal"], "Please select a size for your pizza."),
  // we are done with checkboxes
  pepperoni: yup.boolean(),
  cheese: yup.boolean(),
  threeMeat: yup.boolean(),
  pineapple: yup.boolean(),
});
