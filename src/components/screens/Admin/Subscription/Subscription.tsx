import { memo, useState } from "react";
import { Fade } from "react-reveal";

import * as React from "react";
import TimeCounter from "./Timer";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
const Subscription = () => {
  const { user } = useSelector((state: RootState) => state?.auth);

  const [subscriptionType, setSubscriptionType] = useState<string>("Monthly");

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
      <div className="container mb-5">
        <div className="form-box">
          <Fade bottom>
            <h4 className="mt-4">Update Subscription </h4>
            <h5 className="mt-4">
              You are currently subscribed to the {user?.isPurchasedPlan}{" "}
              Subscription ({user?.isPurchasedPlan}) plan.
              {user?.isPurchasedTime && (
                <TimeCounter targetUnixTimestamp={targetUnixTimestamp} />
              )}
            </h5>
          </Fade>

          <Fade bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div

                // className="col-lg-6 col-md-8 col-10"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
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
                      justifyContent: "space-around",
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

                    <div>
                      <label>$15.00 / Monthly</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default memo(Subscription);
