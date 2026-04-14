import express from 'express';
import PbtIntakeController from '../controllers/PbtIntakeController';
import { TPbtIntakeBase, TSchemaBase } from '../util/types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const pbt_intake_controller = new PbtIntakeController(
  db_structure.pbt_intakes.table,
  [...db_structure.pbt_intakes.columns] as Extract<
    keyof (TPbtIntakeBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.pbt_intakes.primary_key,
);

//  Build routes

router
  .route('/')
  .get(pbt_intake_controller.get_record_batch())
  .post(pbt_intake_controller.create_record_batch())
  .patch(pbt_intake_controller.update_record_details_batch())
  .delete(pbt_intake_controller.remove_record_batch());

router
  .route('/activation')
  .patch(pbt_intake_controller.update_record_active_batch());
router.route('/empty').delete(pbt_intake_controller.empty_record_all());

router.route('/:id').get(pbt_intake_controller.get_record_by_id());

//  Testort

export default router;
