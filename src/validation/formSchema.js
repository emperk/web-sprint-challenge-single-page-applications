import * as yup from "yup"

export default yup.object().shape({
  orderName: yup
    .string()
    .required("A name if required for your order.")
    .min(2, "name must be at least 2 characters"),
  specialInstructions: yup
    .string(),
  pizzaSize: yup
    .string()
    .oneOf(["extraLarge", "large", "medium", "personal"], "Please select a size for your pizza."),
  pepperoni: yup.boolean(),
  cheese: yup.boolean(),
  threeMeat: yup.boolean(),
  pineapple: yup.boolean(),
})