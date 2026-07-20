import { API } from "../../config/api"
import axios from 'axios';

export const handle_logout = async () => {
  try {
    await axios.post(API.LOGOUT);
  } catch (err) {
    const err_msg = `[Logout] error: failed to logout.`;
    alert(err_msg);
    console.error(`${err_msg}\n${err}`);
  }
};
