import express from 'express';
import CandidateController from './controller';
import AuthController from '../../../auth/controller'
import { TCandidateBase, TSchemaBase, TUserBase } from '../../../util/types/schema_types';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const candidate_controller = new CandidateController(
  db_structure.candidates.table,
  [...db_structure.candidates.columns] as Extract<
    keyof (TCandidateBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.candidates.primary_key,
);

const auth_controller = new AuthController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[],
  db_structure.sys_users.primary_key,
)

//  Build routes

router
  .route('/')
  .get(auth_controller.access_control_token(), candidate_controller.get_record_batch())
  .post(candidate_controller.create_record_batch())
  .patch(candidate_controller.update_record_details_batch())
  .delete(candidate_controller.remove_record_batch());

router
  .route('/activation')
  .patch(candidate_controller.update_record_active_batch());
router.route('/empty').delete(candidate_controller.empty_record_all());

router.route('/:id').get(candidate_controller.get_record_by_id())

//  Export

export default router;
