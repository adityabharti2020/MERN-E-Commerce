import { isRejected } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on server it will return only relevent data (will not show password role etc that are related to confidential data)
    resolve({ data });
  });
}
export function fetchAllUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users");
    const data = await response.json();
    console.log("user data", data);
    resolve({ data });
  });
}
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    // console.log("login loginInfo", loginInfo);

    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(`http://localhost:8080/users?email${email}`);
    const data = await response.json();
    // console.log("API email", data[0].email);
    // console.log("API password", data[0].password);
    // console.log("Form email", email);
    // console.log("Form password", password);
    if (data.length) {
      if (password === data[0].password) {
        // data: { user: data[0], message: "You have logged in successfully" },

        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong credentials" });
      }
    } else {
      reject({ message: "user not found" });
    }
  });
}
