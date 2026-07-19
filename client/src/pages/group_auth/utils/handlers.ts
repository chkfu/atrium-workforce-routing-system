import { AUTH_TYPES } from "./types"
import axios from "axios"
import { API } from "../../../config/api"
import { NavigateFunction } from "react-router-dom"
import { ROLE_DASHBOARD } from "./constants"
import { HREF } from "../../../config/href";

//  remarks: form login
export const handle_login = async (data: AUTH_TYPES['login'], navigate: NavigateFunction, setIsLoading: (loading: boolean) => void) => {
  //  remarks: validate inputs
  if (!data.username || !data._password) {
    alert(`[Login] error: invalid username or password not provided.`);
    return;
  }
  //  remarks: request with data
  let result;
  try {
    setIsLoading(true);
    const res = await axios.post(API.LOGIN, {
      username: data.username,
      _password: data._password,
    })
    result = res.data;
  }
  catch (err) {
    alert(`[Login] error: invalid username or password.`);
    return;
  }
  finally {
    setIsLoading(false)
  }
  //  remarks: redirect to corresponding dashboard page by role
  const has_dashboard = result?.token && ROLE_DASHBOARD[result.role];
  if (!has_dashboard) {
    alert(`[Login] error: unable to identify user. please contact system administrators.`);
    return;
  }
  navigate(has_dashboard);
}


//  remarks: reset password (opt_out)
export const handle_reset_opt_out = async(data: AUTH_TYPES['reset_pw_opt_out'], navigate: NavigateFunction, setIsLoading: (loading: boolean) => void) => {
  //  remarks: validate input
  if (!data.input){
    alert(`[Login] error: invalid username or password not provided.`);
    return;
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
  alert('[ResetPassword] Please check the email with the reset password URL')
  navigate(HREF.HOME)
}