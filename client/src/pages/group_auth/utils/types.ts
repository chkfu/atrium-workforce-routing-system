//  remarks centralisation

export type AUTH_TYPES = {
  login: TLogin,
  reset_pw_opt_out: TResetPasswordOptOut,
  reset_pw_opt_in: TResetPasswordOptIn
}

//  remarks: types

type TLogin = {
    username: string,
    _password: string
  }

type TResetPasswordOptOut = {
    input: string
  }

type TResetPasswordOptIn = {
    _password: string,
    _password_confirm: string
  }