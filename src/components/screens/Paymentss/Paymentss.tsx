import React from "react";
import "./Paymentss.css";
import Button2 from "../Button2/Button2";
import { Bounce } from "react-reveal";
import InputMask from "react-input-mask";

const Paymentss = () => {
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">
          <Bounce left>
            <h4 className="mt-4 ms-3">Update Payment Method</h4>
          </Bounce>
          <Bounce bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div className="col-lg-10 col-md-8 col-10 p-0">
                  <form className="bg-white w-100">
                    <div className="form-group">
                      <label  htmlFor="">Cardholder's Name</label>
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
                        sx={{minWidth: '300px'}}
                        style={{minWidth: '200px'}}
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
                      <label  htmlFor="">ZIP / Postal Code</label>
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
          </Bounce>



          <Bounce left>
            <h4 className="mt-4 ms-3">Redeem Coupon</h4>
          </Bounce>
          <Bounce bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div className="col-lg-10 col-md-8 col-10 p-0">
                  <form className="bg-white w-100">
                    <div className="form-group mb-3">
                      <label  htmlFor="">Coupon Code</label>
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
          </Bounce>


        </div>
      </div>
    </div>
  );
};

export default Paymentss;
