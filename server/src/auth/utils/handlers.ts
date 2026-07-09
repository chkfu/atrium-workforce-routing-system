import bcrypt from 'bcrypt';
import ValueError from '../../util/errors/ValueError';
import loggers from '../../infra/loggers';
import { PASSWORD_CHARSET_REGEX } from './constants';
import jwt, { SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import AuthError from '../../util/errors/AuthError';
import { Request } from 'express';
import { TUserBase } from '../../util/types/schema_types';
import UserService from '../service';
import crypto from 'crypto';

//  ==========  Password-related Methods  ==========

//  remarks: hashed password for database storage
export async function hash_password_bcrypt(raw_password: string) {
  //  remarks: validations
  if (!raw_password)
    throw new ValueError(400, `[AuthService] error: password input not found.`);
  if (!PASSWORD_CHARSET_REGEX.test(raw_password)) {
    throw new ValueError(
      400,
      `[AuthService] error: only accept english alphabets, numbers and special characters for passwords.`,
    );
  }
  const salt_rounds = Number(process.env.PASSWORD_SALT_ROUND);
  if (!Number.isInteger(salt_rounds)) {
    throw new ValueError(
      400,
      `[AuthService] error: invalid PASSWORD_SALT_ROUND configuration.`,
    );
  }
  try {
    return await bcrypt.hash(raw_password, salt_rounds);
  } catch (err) {
    //  remarks: error handling
    const err_msg = '[AuthService] error: failed to hash password.';
    loggers.auth_logger.error(`${err_msg}: ${err}`);
    throw new ValueError(400, `${err_msg}: ${err}`);
  }
}

//  remarks: compare input and existing password
export async function validate_password_bcrypt(
  _input_password: string,
  _stored_password: string,
) {
  return await bcrypt.compare(_input_password, _stored_password);
}

//  remarks: create jwt token for identity verification
export async function generate_jwt_token(id: number) {
  return await jwt.sign({ id }, process.env.JWT_SECRET as string, {
    //  learnt: the type is needed for env variables for specification
    expiresIn: process.env.JWT_EXPIRED as SignOptions['expiresIn'],
  });
}

//  ==========  Token-related Methods  ==========

//  remarks: call token from the request header for further verification
export function extract_token_from_header(req: Request) {
  let token: string | null = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //  remarks: token as 'Bearer 1a2b3c4d5e', extract the latter part
    token = req.headers.authorization.split(' ')[1];
  }
  //  (b) case of missing token, and terminate
  if (!token) {
    const err_msg = '[AuthController] error: require login for further access';
    loggers.auth_logger.error(err_msg);
    throw new AuthError(401, err_msg);
  }
  return token;
}

//  remarks: call jwt methods for checking
//  learnt: promisify enable to use await for packing jwt verify callbacks
export async function verify_token_jwt(input_token: string) {
  const verify_jwt = promisify(jwt.verify) as any;
  try {
    return await verify_jwt(input_token, process.env.JWT_SECRET as string);
  } catch (err) {
    const err_msg = `[AuthController] error: invalid or expired token - ${err}`;
    loggers.auth_logger.error(err_msg);
    throw new AuthError(401, err_msg);
  }
}

//  remarks: confirm access based on only valid user
export async function access_check_user_exist(
  service_class: UserService,
  decoded: { id: number; iat: number; exp: number },
) {
  const user = await service_class.get_record_by_id(String(decoded.id));
  if (!user) {
    const err_msg = '[AuthController] error: the target user is not existed.';
    loggers.auth_logger.error(err_msg);
    throw new AuthError(401, err_msg);
  }
  return user;
}

//  remarks: confirm access based on password changed date
//  learnt: not granted access, in case users changed their password later on
export function access_check_password_changed(
  user: TUserBase,
  decoded: {
    id: number;
    iat: number;
    exp: number;
  },
) {
  //  remarks: in here, decoded.iat has less digit in format, * 1000 for matching
  const result: boolean = new Date(decoded.iat * 1000) > user.pw_changed_at;
  if (result) {
    const err_msg =
      '[AuthController] error: password changed, please login again';
    loggers.auth_logger.error(err_msg);
    throw new AuthError(401, err_msg);
  }
}


//  remarks: handle_reset_password
//  remarks: raw token is sent to the user, hashed token is stored in the database
export function generate_password_reset_token() {
  const reset_token = crypto.randomBytes(32).toString('hex');
  const hashed_token = crypto.createHash('sha256').update(reset_token).digest('hex');
  return { reset_token, hashed_token };
}
