import bcrypt from 'bcrypt';
import ValueError from '../../util/errors/ValueError';
import loggers from '../../infra/loggers';
import { PASSWORD_CHARSET_REGEX } from './constants';
import jwt, { SignOptions }  from 'jsonwebtoken';

//  functions

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
