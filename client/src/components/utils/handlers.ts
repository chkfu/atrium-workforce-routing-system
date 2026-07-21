import { API } from "../../config/api"
import axios from 'axios';
import { AppDispatch } from "../../redux/store";
import { clearAuth } from "../../redux/slices/AuthSlice";

export const handle_logout = async (dispatch: AppDispatch) => {
  try {
    await axios.post(API.LOGOUT);
  } catch (err) {
    const err_msg = `[Logout] error: failed to logout.`;
    alert(err_msg);
    console.error(`${err_msg}\n${err}`);
    return;
  }
  dispatch(clearAuth());
};
