import axios from "axios";

export function GetData() {
  return axios.get("/api/get-volunteer-data/jj92");
}

export function GetUserInfo(username) {
  return axios.get("/api/get-volunteer-data/" + username);
}
