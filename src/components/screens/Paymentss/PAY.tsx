import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Baseurl } from "../../../utils/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import { AppDispatch } from "../../../redux/Store";
import { updateProfile } from "../../../redux/Auth/AuthAPI";

let API_Key = process.env.REACT_APP_API_KEY;

interface ModelProps {
  plan: String;
}
const TakeMoney: React.FC<ModelProps> = ({ plan }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state?.auth);

  const onToken = async (token: Token) => {
    console.log("plan 2", plan);
    let res = await axios.post(
      Baseurl + "/stripe/stripePaymentSubscriptions",
      token
    );

    if (res.data.success) {
      const currentTimeInMilliseconds = new Date().getTime();
      let saveInfo = {
        id: user._id,
        isPurchased: true,
        isPurchasedPlan: plan,
        isPurchasedTime: currentTimeInMilliseconds,
      };
      dispatch(updateProfile(saveInfo));
      console.log("save info", saveInfo);
      toast.success(res.data.message);
    }
  };

  return (
    <div>
      {API_Key && <StripeCheckout token={onToken} stripeKey={API_Key} />}
    </div>
  );
};

export default TakeMoney;
