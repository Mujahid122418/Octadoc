
import React from 'react'
import './Community.css'
import Search from '../Search/search'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import IconButton from '@mui/material/IconButton';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Community = () => {

    const dummyArray = [
        { id: 1,},
        { id: 2, },
        { id: 3, },
        { id: 4,},
        { id: 5,},
      ];

  return (
    <div>
      <div className="container mt-5">
        <Search />
        <div className="community-box mt-5 mb-5">
            <h2><PublicOutlinedIcon /> Community Template</h2>

            
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
                  <p>By <b>Octados</b></p></center>
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
  )
}

export default Community
