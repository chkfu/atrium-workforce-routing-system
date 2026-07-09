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

//  remarks: system admin actions
router
  .route('/')
  .get(user_controller.get_record_batch())
  .post(user_controller.create_record_batch())
  .patch(user_controller.update_record_details_batch())
  .patch(user_controller.update_record_active_batch)
  .delete(user_controller.remove_record_batch());

//  remarks: sign-up / log-in
router.route('/register_new_user').post(user_controller.register_new_user());
router.route('/login_user').post(user_controller.login_user());

//  remarks: password changes
router.route('/reset_password_opt_out').post(user_controller.reset_password_opt_out());
router.route('/reset_password_opt_in/:token').post(user_controller.reset_password_opt_in());


//  Export

export default router;
