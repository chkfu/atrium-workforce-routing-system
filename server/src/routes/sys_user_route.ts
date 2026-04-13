import express from 'express';
import SysUserController from '../controllers/SysUserController';
import { TSysUserBase, TSchemaBase } from '../util/types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const sys_user_controller = new SysUserController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TSysUserBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.sys_users.primary_key,
);

//  Build routes

router
  .route('/')
  .get(sys_user_controller.get_record_batch())
  .post(sys_user_controller.create_record_batch())
  .patch(sys_user_controller.update_record_details_batch())
  .delete(sys_user_controller.remove_record_batch());

router
  .route('/activation')
  .patch(sys_user_controller.update_record_active_batch());
router.route('/empty').delete(sys_user_controller.empty_record_all());

router.route('/:id').get(sys_user_controller.get_record_by_id());

//  Export

export default router;
