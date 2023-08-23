import React, { useState ,useEffect } from 'react';
import './search.css';
import SearchIcon from "@mui/icons-material/Search";
import { AppDispatch } from "../../../redux/Store";
import { useDispatch } from "react-redux";
import { searchDataFun } from '../../../redux/Template/TemplateSlice';


const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setsear] = useState("");
  useEffect(() => {
    dispatch(searchDataFun(search))
  }, [search])
  
  
  return (
    <div>
      <div className="search-box">
        <div className="rowc search-row w-100">
          <div className="col-lg-6 col-md-6 col-10">
            <div className="search-bar">
              <SearchIcon />
              <input type="text" value={search} onChange={(e) => setsear(e.target.value)} placeholder="Search all GP Scribe templates" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;