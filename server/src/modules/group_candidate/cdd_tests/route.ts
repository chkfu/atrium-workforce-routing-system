import express from 'express';
import CddTestController from './controller';
import AuthController from '../../../auth/controller';
import { TCddTestBase, TSchemaBase, TUserBase } from '../../../util/types/schema_types';
import { enum_user_role } from '../../../util/enums';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const cdd_test_controller = new CddTestController(
  db_structure.cdd_test.table,
  [...db_structure.cdd_test.columns] as Extract<
    keyof (TCddTestBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.cdd_test.primary_key,
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
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.get_record_batch(),
  )
  .post(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.create_record_batch(),
  )
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.update_record_details_batch(),
  )
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.remove_record_batch(),
  );

router
  .route('/column-list/:col_key/:col_val')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.get_record_column_list(),
  );

router
  .route('/activation')
  .patch(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.update_record_active_batch(),
  );

router
  .route('/empty')
  .delete(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.empty_record_all(),
  );

router
  .route('/:id')
  .get(
    auth_controller.access_control_token(),
    auth_controller.access_restrict_roles(enum_user_role.grade_1_assistant, false),
    cdd_test_controller.get_record_by_id(),
  );

//  Testort

export default router;
