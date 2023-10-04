import { memo, useState } from "react";
import { Fade } from "react-reveal";

import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
const SubscriptionModel = () => {
  const { user } = useSelector((state: RootState) => state?.auth);

  return <div></div>;
};

export default memo(SubscriptionModel);
