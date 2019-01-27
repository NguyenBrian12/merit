import axios from "axios";

export function GetEvents() {
  return axios.get("/api/get-events/");
}
export function SignUpEvent(id) {
  return axios.post("/api/add-event/jj92/" + id);
}
export function AddEvent(id) {
  return axios.post("/api/");
}
export function CancelEvent(username, id) {
  return axios.post("/");
}
export function GetData() {
  return axios.get("/api/get-volunteer-data/jj92");
}
export function SubmitEvent(payload) {
  return axios.post("/api/", payload);
}
