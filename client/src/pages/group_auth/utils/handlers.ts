import { AUTH_TYPES } from "./types"
import axios from "axios"
import { API } from "../../../config/api"
import { NavigateFunction } from "react-router-dom"
import { ROLE_DASHBOARD } from "./constants"
import { HREF } from "../../../config/href";
import { AppDispatch } from "../../../redux/store";
import { setAuth } from "../../../redux/slices/AuthSlice";

//  remarks: form login
export const handle_login = async (data: AUTH_TYPES['login'], navigate: NavigateFunction, setIsLoading: (loading: boolean) => void, dispatch: AppDispatch) => {
  //  remarks: validate inputs
  if (!data.input || !data._password) {
    return alert(`[Login] error: invalid username or password not provided.`);
  }
  //  remarks: request with data
  let result;
  try {
    setIsLoading(true);
    const res = await axios.post(API.LOGIN, {
      input: data.input,
      _password: data._password,
    })
    result = res.data;
  }
  catch (err) {
    return alert(`[Login] error: invalid username or password.`);
  }
  finally {
    setIsLoading(false)
  }
  //  remarks: redirect to corresponding dashboard page by role
  const has_dashboard = result?.token && ROLE_DASHBOARD[result.data.user_role];
  if (!has_dashboard) {
    alert(`[Login] error: unable to identify user. please contact system administrators.`);
    return;
  }
  //  remarks: populate auth redux slice with logged-in user's profile
  dispatch(setAuth(result.data));
  navigate(has_dashboard);
}


//  remarks: reset password (opt_out, token url sending)
export const handle_reset_opt_out = async(data: AUTH_TYPES['reset_pw_opt_out'], navigate: NavigateFunction, setIsLoading: (loading: boolean) => void) => {
  //  remarks: validate input
  if (!data.input){
    return alert(`[Login] error: invalid username or password not provided.`);
  }
  //  remarks: exercise token sending at server
  try {
    setIsLoading(true)
    await axios.post(API.RESET_OPT_OUT, {
      input: data.input
    })
  } catch (err){
    const err_msg = `[ResetPassword] error: failed to email reset password token to user.`
    alert(err_msg);
    console.error(err_msg, err);
    return;
  }
  finally{
    setIsLoading(false)
  }
  //  remarks: remind user to check email and redirect to home page
  alert('[ResetPassword] succeed: Please check the email with the reset password URL.')
  navigate(HREF.HOME)
}

//  remarks: reset password (opt_in, new password update)
export const handle_reset_opt_in = async(data: AUTH_TYPES['reset_pw_opt_in'], token: string, navigate: NavigateFunction, setIsLoading: (loading: boolean) => void) => {
  //  remarks:
  try {
    //  remakrs: validate inputs
    if (!data._password || !data._password_confirm)
      return alert(`[ResetPassword] error: password is missing. please try again`);
    if (!token)
      return alert(`[ResetPassword] error: token is missing. please try again`);
    //  remarks: exercise password change
    setIsLoading(true);
    await axios.post(`${API.RESET_OPT_IN}/${token}`, {
      _password: data._password,
      _password_confirm: data._password_confirm
    })
  } catch (err){
    const err_msg = `[ResetPassword] error: failed to reset the password. please contact the system administrator.`;
    alert(err_msg);
    console.error(err_msg, err);
    return;
  }
  finally {
    setIsLoading(false);
  }
  //  remarks: remind user to check email and redirect to login page
  alert(`[ResetPassword] succeed: reset successfully, please login with your new password.`);
  navigate(HREF.LOGIN)
}