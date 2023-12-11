import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [availableQuantity, setAvailableQuantity] = useState(10);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > availableQuantity
    ) {
      setAmountIsValid(!amountIsValid);
      return;
    }

    // Update available quantity when adding to cart
    setAvailableQuantity((prevQuantity) => prevQuantity - enteredAmountNumber);
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Quantity Available"
        input={{
          ref: amountInputRef,
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {availableQuantity === 0 && <p>Out Of Stock</p>}
    </form>
  );
};

export default MealItemForm;
