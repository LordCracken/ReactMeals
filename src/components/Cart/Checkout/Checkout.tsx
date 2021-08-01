import React from 'react';

import classes from './Checkout.module.css';

import useInput from '../../../hooks/use-input';

import { UserData } from '../Cart';

interface CheckoutProps {
  onConfirm: (userData: UserData) => void;
  onCancel: () => void;
}

const notEmpty = (value: string) => !!value.trim();
const isPostal = (value: string) => value.trim().length === 5;

const Checkout = ({ onConfirm, onCancel }: CheckoutProps) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    classes: nameControlClasses,
    valueChangeHadler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(notEmpty, classes.control, classes.invalid);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    classes: streetControlClasses,
    valueChangeHadler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(notEmpty, classes.control, classes.invalid);

  const {
    value: enteredPostal,
    isValid: postalIsValid,
    hasError: postalHasError,
    classes: postalControlClasses,
    valueChangeHadler: postalChangeHandler,
    inputBlurHandler: postalInputBlurHandler,
  } = useInput(isPostal, classes.control, classes.invalid);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    classes: cityControlClasses,
    valueChangeHadler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(notEmpty, classes.control, classes.invalid);

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      nameInputBlurHandler();
      streetInputBlurHandler();
      postalInputBlurHandler();
      cityInputBlurHandler();
      return;
    }

    onConfirm({ name: enteredName, street: enteredStreet, city: enteredCity, postalCode: enteredPostal });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={enteredName} onChange={nameChangeHandler} onBlur={nameInputBlurHandler} />
        {nameHasError && <p>Please enter a name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetHasError && <p>Please enter a street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalInputBlurHandler}
        />
        {postalHasError && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={enteredCity} onChange={cityChangeHandler} onBlur={cityInputBlurHandler} />
        {cityHasError && <p>Please enter a city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
