
import bcrypt from 'bcrypt'
import ValueError from '../../util/errors/ValueError';
import loggers from '../../infra/loggers';
import { PASSWORD_CHARSET_REGEX } from './constants'

//  functions

export async function hash_password(raw_password: string){
  //  remarks: validations
  if (!raw_password) 
        throw new ValueError(400, `[AuthService] error: password input not found.`);
      if (!PASSWORD_CHARSET_REGEX.test(raw_password)){
        throw new ValueError(400, `[AuthService] error: only accept english alphabets, numbers and special characters for passwords.`);
      }
      const salt_rounds = Number(process.env.PASSWORD_SALT_ROUND);
      if (!Number.isInteger(salt_rounds)) {
    throw new ValueError(400, `[AuthService] error: invalid PASSWORD_SALT_ROUND configuration.`);
  }
    try {
      
      return await bcrypt.hash(raw_password, salt_rounds);
    } 
    //  remarks: error handling
    catch (err) {
      const err_msg = '[AuthService] error: failed to hash password.'
      loggers.auth_logger.error(
        `${err_msg}: ${err}`
      );
      throw new ValueError(400, `${err_msg}: ${err}`);
    }
  }