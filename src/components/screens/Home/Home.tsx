import React from "react";
import "./Home.css";
import IconButton from '@mui/material/IconButton';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Search from "../Search/search";




const Home: React.FC = () => {

  const dummyArray = [
    { id: 1,},
    { id: 2, },
    { id: 3, },
    { id: 4,},
    { id: 5,},
    { id: 6,},
    { id: 7,},
    { id: 8,},
    { id: 9,},
    { id: 10,},
    { id: 11,},
    { id: 12,},
    { id: 13,},
    { id: 14,},
    { id: 15,},

  ];

  return (
    <div className="home">

      <div className="container">
        <Search />

        <div className="card-sec mt-5">
            <div className="row">

            {dummyArray.map(item => (
              <div className="col-lg-4 col-md-6 mt-4" key={item.id}>
                  <div className="card-box">
              <div className="card-head">
                  <div className="icon-box">
                      <IconButton>
                        <ViewStreamIcon />
                      </IconButton>
                      <div className="band"><p>12</p></div>
                  </div>
                  <div className="text">
                  <center><h6>New pregnancy - 1st consult</h6>
                  <p>By <b>GP Scribe</b></p></center>
                  </div>
                  <div className="icon-box">
                      <IconButton>
                        <QuestionMarkIcon />
                      </IconButton>
                      <div className="band"><p>2</p></div>
                  </div>
              </div>

              <center>
                <p className="btm-text">First antenatal consult - dating scan and essentials</p>
              </center>
          </div>
        </div>
        ))}
              
            </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
