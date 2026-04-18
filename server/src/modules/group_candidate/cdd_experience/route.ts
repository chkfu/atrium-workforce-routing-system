import express from 'express';
import CddExpController from './controller';
import { TCddExpBase, TSchemaBase } from '../../../util/types';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const cdd_exp_controller = new CddExpController(
  db_structure.cdd_exp.table,
  [...db_structure.cdd_exp.columns] as Extract<
    keyof (TCddExpBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.cdd_exp.primary_key,
);

//  Build routes

router
  .route('/')
  .get(cdd_exp_controller.get_record_batch())
  .post(cdd_exp_controller.create_record_batch())
  .patch(cdd_exp_controller.update_record_details_batch())
  .delete(cdd_exp_controller.remove_record_batch());

router
  .route('/activation')
  .patch(cdd_exp_controller.update_record_active_batch());
router.route('/empty').delete(cdd_exp_controller.empty_record_all());

router.route('/:id').get(cdd_exp_controller.get_record_by_id());

//  Export

export default router;
