import { memo, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
import { Modal, Box, CircularProgress } from "@mui/material";
import Button2 from "../../Button2/Button2";
import { isPurchasedModelFun } from "../../../../redux/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
interface ModelProps {
  isPurchasedModel: any;
}
const SubscriptionModel: React.FC<ModelProps> = ({ isPurchasedModel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const UpgradeBtn = () => {
    try {
      navigate("/payment");
      dispatch(isPurchasedModelFun(false));
    } catch (error) {}
  };
  return (
    <Modal
      open={isPurchasedModel}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <h2 id="parent-modal-title">Your subscription has Expired?</h2>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {/* {isLoadingSecton ? (
            <CircularProgress color="inherit" size={20} sx={{ mr: 2, mt: 1 }} />
          ) : (
            <Button2 name="Delete" onClick={() => HandelDeleteSection()} />
          )} */}
          <Button2 name="Upgrade" onClick={() => UpgradeBtn()} />
          <Button2
            name="Cancel"
            onClick={() => dispatch(isPurchasedModelFun(false))}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default memo(SubscriptionModel);
