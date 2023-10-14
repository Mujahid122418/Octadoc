import "./Paymentss.css";

import { Fade } from "react-reveal";

import PaymentInfo from "./PAY";

import GrainIcon from "@mui/icons-material/Grain";

const Paymentss = () => {
  return (
    <div>
      <div className="container mb-5">
        <div className="payments-cards_pay">
          <div className="row d-flex justify-content-around">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Fade>
                <div className="payment-card_pay">
                  <div className="card-head_pay">
                    <h5 className="mb-0">Monthly Subscription</h5>
                  </div>
                  <div className="card-bodyy_pay">
                    <center>
                      <div className="d-flex justify-content-center prise_pay">
                        <b>$10.00</b>
                        <p className="mb-0">/Monthly</p>
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
                        <PaymentInfo plan="Monthly" />
                      </div>
                    </ul>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <Fade bottom>
                <div className="payment-card_pay">
                  <div className="card-head_pay">
                    <h5 className="mb-0">Yearly Subscription</h5>
                  </div>
                  <div className="card-bodyy_pay">
                    <center>
                      <div className="d-flex justify-content-center prise_pay">
                        <b>$15.00</b>
                        <p className="mb-0">/Yearly</p>
                      </div>
                    </center>
                    <ul>
                      <li>
                        <GrainIcon className="ion" />
                        <i>
                          <p className="lead ">1 Year Trail</p>
                        </i>
                      </li>
                      <li>
                        <GrainIcon className="ion" />
                        Save $$$
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
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <PaymentInfo plan="Yearly" />
                      </div>
                    </ul>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>

        {/* <div className="form-box">
          <Fade bottom>
            <h4 className="mt-4 ms-3">Update Payment Method</h4>
          </Fade>
          <Fade bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div className="col-lg-10 col-md-8 col-10 p-0">
                  <form className="bg-white w-100">
                    <div className="form-group">
                      <label htmlFor="">Cardholder's Name</label>
                      <input
                        type="Text"
                        className="control form-control mt-0 "
                        id="exampleInputPassword1"
                      />
                    </div>

                    <div>
                      <label className="mt-3">Credit Card Number:</label>
                      <div className="d-flex justify-contant-between form-controll ">
                        <InputMask
                          sx={{ minWidth: "300px" }}
                          style={{ minWidth: "200px" }}
                          mask="9999 9999 9999 9999"
                          maskChar=""
                          placeholder="9999 9999 9999 9999"
                        />
                        <div className="d-flex">
                          <InputMask
                            mask="99/9999"
                            maskChar=""
                            placeholder="MM/YYYY"
                          />
                          <InputMask mask="999" maskChar="" placeholder="CVC" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="">ZIP / Postal Code</label>
                      <input
                        type="Text"
                        className="control form-control mt-0 "
                        id="exampleInputPassword1"
                      />
                    </div>

                    <Button2 name="Update" onClick={handleClickBtn} />
                  </form>
                </div>
              </div>
            </div>
          </Fade>

          <Fade bottom>
            <h4 className="mt-4 ms-3">Redeem Coupon</h4>
          </Fade>
          <Fade bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div className="col-lg-10 col-md-8 col-10 p-0">
                  <form className="bg-white w-100">
                    <div className="form-group mb-3">
                      <label htmlFor="">Coupon Code</label>
                      <input
                        type="Text"
                        className="control form-control mt-0 "
                        id="exampleInputPassword1"
                      />
                    </div>

                    <Button2 name="Redeem" onClick={handleClickBtn} />
                  </form>
                </div>
              </div>
            </div>
          </Fade>
        </div> */}
      </div>
    </div>
  );
};

export default Paymentss;
