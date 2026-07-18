import { AUTH_TYPES } from "./types"
import axios from "axios"
import { API } from "../../../config/api"
import { NavigateFunction } from "react-router-dom"
import { ROLE_DASHBOARD } from "./constants"

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