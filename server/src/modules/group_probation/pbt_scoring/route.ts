import express from 'express';
import PbtScoreController from './controller';
import { TPbtScoreBase, TSchemaBase } from '../../../util/types';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const pbt_score_controller = new PbtScoreController(
  db_structure.pbt_score.table,
  [...db_structure.pbt_score.columns] as Extract<
    keyof (TPbtScoreBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.slt_criteria.primary_key,
);

//  Build routes

router
  .route('/')
  .get(pbt_score_controller.get_record_batch())
  .post(pbt_score_controller.create_record_batch())
  .patch(pbt_score_controller.update_record_details_batch())
  .delete(pbt_score_controller.remove_record_batch());

router
  .route('/activation')
  .patch(pbt_score_controller.update_record_active_batch());
router.route('/empty').delete(pbt_score_controller.empty_record_all());

router.route('/:id').get(pbt_score_controller.get_record_by_id());

//  Testort

export default router;
