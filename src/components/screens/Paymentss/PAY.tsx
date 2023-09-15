import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Baseurl } from "../../../utils/BaseUrl";
import axios from "axios";

let API_Key = process.env.REACT_APP_API_KEY;
// require("dotenv").config();
console.log("process.env.publishable_API_Key", API_Key);

const TakeMoney: React.FC = () => {
  const onToken = async (token: Token) => {
    let res = await axios.post(
      Baseurl + "/stripe/stripePaymentSubscriptions",
      token
    );
    console.log("res", res.data);
  };

  return (
    <div>
      {API_Key && <StripeCheckout token={onToken} stripeKey={API_Key} />}
    </div>
  );
};

export default TakeMoney;
