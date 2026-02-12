let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;


import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleRegister } from "./register.js";

import { showCategories, handleCategories } from "./categories.js";
import { handleAddEdit } from "./addEdit.js";

document.addEventListener("DOMContentLoaded", () => {
    
  token = localStorage.getItem("token");
  console.log(token || "no token")
  message = document.getElementById("message");
  handleLoginRegister();
  handleLogin();
  handleRegister();

  handleCategories();
  handleAddEdit();

  
  if (token) {
    showCategories();
  } else {
    showLoginRegister();
  }
});