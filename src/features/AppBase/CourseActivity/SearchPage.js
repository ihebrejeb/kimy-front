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

export default SearchPage;
