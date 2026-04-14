import express from 'express';
import HireIntakeController from '../controllers/HireIntakeController';
import { THireIntakeBase, TSchemaBase } from '../util/types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const hire_intake_controller = new HireIntakeController(
  db_structure.hire_intakes.table,
  [...db_structure.hire_intakes.columns] as Extract<
    keyof (THireIntakeBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.hire_intakes.primary_key,
);

//  Build routes

router
  .route('/')
  .get(hire_intake_controller.get_record_batch())
  .post(hire_intake_controller.create_record_batch())
  .patch(hire_intake_controller.update_record_details_batch())
  .delete(hire_intake_controller.remove_record_batch());

router
  .route('/activation')
  .patch(hire_intake_controller.update_record_active_batch());
router.route('/empty').delete(hire_intake_controller.empty_record_all());

router.route('/:id').get(hire_intake_controller.get_record_by_id());

//  Testort

export default router;
