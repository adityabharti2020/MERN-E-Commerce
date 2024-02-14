import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  selectAllUser,
  fetchAllUserAsync,
} from "../authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
    const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
//   const alluser = useSelector(selectAllUser);

  // console.log("Current user", user);
  if (!user) {
    navigate("/login");
  }else{
    // alert('You are logged in')
  }
  return children;
};

export default Protected;
