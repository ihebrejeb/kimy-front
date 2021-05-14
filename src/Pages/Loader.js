import React from "react";
import "./loader.css";
export default function Loader() {
  return (
    <div class="loader__container">
      <img src="/Logo.png" width="150px" alt="logo"></img>
      <div class="loader__wrapper">
        <div class="loader__left"></div>
        <div class="loader__right"></div>
        <div class="loader__left"></div>
      </div>
    </div>
  );
}
