import React, { useState, useRef } from 'react';
import './Contactt.css';
import Button2 from '../Button2/Button2';
import { Fade } from 'react-reveal';
import emailjs from '@emailjs/browser';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contactt = () => {
  const [sendmail, setsendmail] = useState<any>({});

  const loginHandler = (e: any) => {
    setsendmail({ ...sendmail, [e.target.name]: e.target.value });
  };

  const formRef = useRef<any>(null);

  console.log("ref",formRef.current);

  const handleClickBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    emailjs
      .sendForm('service_ibq1b1i', 'template_9ivg4da',formRef.current, 'KGKjRSyJd1IJQhcXg')
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Email sent');
          setsendmail({
            name: '',
            email: '',
            text: '',
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">
          <Fade bottom>
            <h4 className="mt-4 ms-3">Contact Information</h4>
          </Fade>
          <Fade bottom>
            <div className="contact-box">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-10 p-0">
                  <form className="bg-white w-100" ref={formRef}> 
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Your Name"
                        name="name"
                        value={sendmail.name}
                        onChange={loginHandler}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email.."
                        name="email"
                        value={sendmail.email}
                        onChange={loginHandler}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Type Your message Here..."
                        rows={8}
                        name="text"
                        onChange={loginHandler}
                        value={sendmail.text}
                      />
                    </div>
                    <Button2 name="Send" onClick={handleClickBtn} />
                  </form>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Contactt;
