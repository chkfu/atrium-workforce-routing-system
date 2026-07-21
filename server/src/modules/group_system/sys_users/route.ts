import express from 'express';
import SysUserController from './controller';
import AuthController from '../../../auth/controller';
import { TUserBase, TSchemaBase } from '../../../util/types/schema_types';
import { enum_user_role } from '../../../util/enums';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const user_controller = new SysUserController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.sys_users.primary_key,
);

const auth_controller = new AuthController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[],
  db_structure.sys_users.primary_key,
);

//  Build routes
//  remarks: this router is managed system admin, with specific user self-access.
//  remarks: staff actions should follows the core table's routes to proceed

router
  .route('/')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.get_record_batch(),
  )
  .post(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.create_record_batch(),
  )
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.update_record_details_batch(),
  )
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.update_record_active_batch(),
  )
  .patch(
    auth_controller.access_control_token(),
    user_controller.update_record_details_self(),   //  remarks: user's self-access entry point
  )
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.remove_record_batch(),
  );

router
  .route('/activation')
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.update_record_active_batch(),
  );

router
  .route('/empty')
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.empty_record_all(),
  );

router
  .route('/:id')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.sys_admin, false),
    user_controller.get_record_by_id(),
  );

//  Export

export default router;
