import axios from "axios";

export function GetEvents() {
  return axios.get("/api/get-events/");
}
