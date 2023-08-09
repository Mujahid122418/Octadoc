import React from 'react'
import './search.css'
import SearchIcon from "@mui/icons-material/Search";

const search = () => {
  return (
    <div>
      <div className="search-box">
          <div className="rowc search-row w-100">
            <div className="col-lg-6 col-md-6 col-10">
              <div className="search-bar">
                <SearchIcon />
                <input type="text" placeholder="Search all Octados templates" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default search
