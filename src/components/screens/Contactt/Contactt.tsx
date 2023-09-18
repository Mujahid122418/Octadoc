import React, { useState } from 'react'
import './Contactt.css'
import Button2 from "../Button2/Button2";
import { Bounce } from 'react-reveal';

const Contactt = () => {

  const [loginn , setloginn] =useState<any>({});

  const loginHandler = (e:any) => {
      setloginn({...loginn , [e.target.name] : e.target.value})
  }


  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const config = {
      SecureToken : 'f8d28859-83e4-45a5-963f-54df7c3442c7',
      To : 'asadmian503@gmail.com',
      From : loginn.email,
      Subject : "This is the subject",
      Body : loginn.text
    };
    // if(loginn.email){

    // }
    
  };

  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">
          <Bounce left>
          <h4 className="mt-4 ms-3">Contact Information</h4>
          </Bounce>
          <Bounce bottom>
          <div className="contact-box">
            <div className="row   d-flex justify-content-center">
              <div className="col-lg-6 col-md-8 col-10 p-0">
                <form className="bg-white w-100">
                  
                  <div className="form-group">
                    <input
                      type="Text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Name"
                      name='name'
                      value={loginn.name}
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
                      name='email'
                      value={loginn.email}
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
                      name='text'
                      onChange={loginHandler}
                      value={loginn.text}
                    />
                  </div>

                  <Button2 name="Send" onClick={handleClickBtn} />
                </form>
              </div>
            </div>
          </div>
          </Bounce>
        </div>
      </div>
    </div>
  )
}

export default Contactt
