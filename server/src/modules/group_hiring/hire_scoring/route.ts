import express from 'express';
import HireScoreController from './controller';
import { THireScoreBase, TSchemaBase } from '../../../util/types';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const hire_score_controller = new HireScoreController(
  db_structure.hire_score.table,
  [...db_structure.hire_score.columns] as Extract<
    keyof (THireScoreBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.hire_score.primary_key,
);

//  Build routes

router
  .route('/')
  .get(hire_score_controller.get_record_batch())
  .post(hire_score_controller.create_record_batch())
  .patch(hire_score_controller.update_record_details_batch())
  .delete(hire_score_controller.remove_record_batch());

router
  .route('/activation')
  .patch(hire_score_controller.update_record_active_batch());
router.route('/empty').delete(hire_score_controller.empty_record_all());

router.route('/:id').get(hire_score_controller.get_record_by_id());

//  Testort

export default router;
