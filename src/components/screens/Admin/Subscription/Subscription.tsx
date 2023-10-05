import { memo, useState } from "react";
import { Fade } from "react-reveal";
import './Subscription.css'
import * as React from "react";
import TimeCounter from "./Timer";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/Store";
import Button2 from "../../Button2/Button2";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GrainIcon from "@mui/icons-material/Grain";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
};

const Subscription = () => {
  const { user } = useSelector((state: RootState) => state?.auth);

  const [subscriptionType, setSubscriptionType] = useState<string>("Monthly");

  const [open, setOpen] = React.useState(false);
  const [openMode, setOpenMode] =useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

  };


  const handleSubscriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedSubscription = event.target.value;
    setSubscriptionType(selectedSubscription);
  };

  React.useEffect(() => {
    if (user) {
      setSubscriptionType(user?.isPurchasedPlan);
    }
  }, [user]);
  const targetUnixTimestamp =
    user?.isPurchasedPlan === "Monthly"
      ? +user?.isPurchasedTime + 2592000000
      : +user?.isPurchasedTime + 31536000000;
  return (
    <div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="payment-card_pay">
                  <div className="card-head_pay">
                    <h5 className="mb-0">{openMode} Subscription</h5>
                  </div>
                  <div className="card-bodyy_pay">
                    <center>
                      <div className="d-flex justify-content-center prise_pay">
                        <b>$10.00</b>
                        <p className="mb-0">/{openMode}</p>
                      </div>
                    </center>
                    <ul>
                      <li>
                        <GrainIcon className="ion" />
                        <i>
                          <p className="lead ">30 days Trail</p>
                        </i>
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Build interactive templates
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Access to a public template library
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Add critical questions
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Complete your notes with the patient in the room
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Easy Medicare compliance
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Cancel anytime
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Prompt support at the click of a button
                      </li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                      
                      </div>
                    </ul>
                  </div>
                </div>
        </Box>
      </Modal>


      <div className="container mb-5">
        <div className="form-box">
          <Fade bottom>
            <h4 className="mt-4">Update Subscription </h4>
            <h5 className="mt-4 heading-sub" >
              You are currently subscribed to the {user?.isPurchasedPlan}{" "}
              Subscription ({user?.isPurchasedPlan}) plan.
              {user?.isPurchasedTime && (
                <TimeCounter targetUnixTimestamp={targetUnixTimestamp} />
              )}
            </h5>
          </Fade>

          <Fade bottom>
            <div className="contact-sub">
              <div className="row ">
                <div
                // className="col-lg-6 col-md-8 col-10"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding:'10px',
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        style={{ width: 20, height: 20 }}
                        type="radio"
                        value="Monthly"
                        checked={subscriptionType === "Monthly"}
                        onChange={handleSubscriptionChange}
                      />
                      <label>Monthly Subscription</label>
                    </div>
                    <Button2  name="Features"  onClick={()=>{handleOpen();
                    setOpenMode("Monthly");
                    }} />
                    <div>
                      <label>$10.00 / Monthly</label>
                    </div>
                  </div>

                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding:'10px',
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        style={{ width: 20, height: 20 }}
                        type="radio"
                        value="Yearly"
                        checked={subscriptionType === "Yearly"}
                        onChange={handleSubscriptionChange}
                      />
                      Yearly Subscription
                    </div>
                    <Button2  name="Features"  onClick={()=>{handleOpen();
                    setOpenMode("Yearly");
                    }} />
                    <div>
                      <label>$15.00 / Monthly</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

          <div className="cancle-subscription">
            <Button2  name="Cancle Subscription"  onClick={handleClickBtn} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(Subscription);
