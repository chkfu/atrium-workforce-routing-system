import express from 'express';
import DepartmentsController from './controller';
import AuthController from '../../../auth/controller';
import { TDepartmentBase, TSchemaBase, TUserBase } from '../../../util/types/schema_types';
import { enum_user_role } from '../../../util/enums';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const dept_controller = new DepartmentsController(
  db_structure.departments.table,
  [...db_structure.departments.columns] as Extract<
    keyof (TDepartmentBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.departments.primary_key,
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

router
  .route('/')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.get_record_batch(),
  )
  .post(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.create_record_batch(),
  )
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.update_record_details_batch(),
  )
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.remove_record_batch(),
  );

router
  .route('/activation')
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.update_record_active_batch(),
  );

router
  .route('/empty')
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.empty_record_all(),
  );

router
  .route('/:id')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_2_manager, false),
    dept_controller.get_record_by_id(),
  );

//  Export

export default router;
