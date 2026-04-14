import express from 'express';
import HireCriteriaController from '../controllers/HireCriteriaController';
import { THireCriteriaBase, TSchemaBase } from '../util/types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const hire_criteria_controller = new HireCriteriaController(
  db_structure.hire_criteria.table,
  [...db_structure.hire_criteria.columns] as Extract<
    keyof (THireCriteriaBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.hire_criteria.primary_key,
);

//  Build routes

router
  .route('/')
  .get(hire_criteria_controller.get_record_batch())
  .post(hire_criteria_controller.create_record_batch())
  .patch(hire_criteria_controller.update_record_details_batch())
  .delete(hire_criteria_controller.remove_record_batch());

router
  .route('/activation')
  .patch(hire_criteria_controller.update_record_active_batch());
router.route('/empty').delete(hire_criteria_controller.empty_record_all());

router.route('/:id').get(hire_criteria_controller.get_record_by_id());

//  Testort

export default router;
