import express from 'express';
import HireWeightController from './controller';
import { THireWeightBase, TSchemaBase } from '../../../util/types';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const hire_weight_controller = new HireWeightController(
  db_structure.hire_weight.table,
  [...db_structure.hire_weight.columns] as Extract<
    keyof (THireWeightBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.hire_weight.primary_key,
);

//  Build routes

router
  .route('/')
  .get(hire_weight_controller.get_record_batch())
  .post(hire_weight_controller.create_record_batch())
  .patch(hire_weight_controller.update_record_details_batch())
  .delete(hire_weight_controller.remove_record_batch());

router
  .route('/activation')
  .patch(hire_weight_controller.update_record_active_batch());
router.route('/empty').delete(hire_weight_controller.empty_record_all());

router.route('/:id').get(hire_weight_controller.get_record_by_id());

//  Testort

export default router;
