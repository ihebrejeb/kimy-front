import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card, Typography, CardHeader, IconButton } from "@material-ui/core/";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./SearchBar.module.css";

function SearchPage({ setTitle, title }) {
  return (
    <div className={styles.header__search}>
      <SearchIcon></SearchIcon>
      <input
        placeholder="Search  here"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-16"
        disableUnderline
        fullWidth
      />
    </div>
  );
}

// const [myOptions, setMyOptions] = useState([]);

// const getDataFromAPI = () => {
//   console.log("Options Fetched from API");

//   fetch("http://localhost:4000/activity")
//     .then((response) => {
//       return response.json();
//     })
//     .then((res) => {
//       console.log(res.data);
//       for (var i = 0; i < res.data.length; i++) {
//         myOptions.push(res.data[i].title);
//       }
//       setMyOptions(myOptions);
//     });
// };

// return (
//   <div>
//     <Autocomplete
//       style={{ width: 500 }}
//       freeSolo
//       autoComplete
//       autoHighlight
//       options={myOptions}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           onChange={getDataFromAPI}
//           variant="outlined"
//           label="Search Box"
//         />
//       )}
//     />
//   </div>
// );

export default SearchPage;
