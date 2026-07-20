import express from 'express';
import UserController from './controller';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const user_controller = new UserController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.sys_users.primary_key,
);

//  Build routes

//  remarks: sign-up / log-in
router.route('/register_new_user').post(user_controller.register_new_user());
router.route('/login_user').post(user_controller.login_user());
router.route('/logout_user').post(user_controller.logout_user());

//  remarks: password changes
router
  .route('/update_password_self')
  .patch(
    user_controller.access_control_token(),
    user_controller.update_password_self(),
  );
router.route('/reset_password_opt_out').post(user_controller.reset_password_opt_out());
router.route('/reset_password_opt_in/:token').post(user_controller.reset_password_opt_in());


//  Export

export default router;
