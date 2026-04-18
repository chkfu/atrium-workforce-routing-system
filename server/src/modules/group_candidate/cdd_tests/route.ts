import express from 'express';
import CddTestController from './controller';
import { TCddTestBase, TSchemaBase } from '../../../util/types';
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

//  Build routes

router
  .route('/')
  .get(cdd_test_controller.get_record_batch())
  .post(cdd_test_controller.create_record_batch())
  .patch(cdd_test_controller.update_record_details_batch())
  .delete(cdd_test_controller.remove_record_batch());

router
  .route('/activation')
  .patch(cdd_test_controller.update_record_active_batch());
router.route('/empty').delete(cdd_test_controller.empty_record_all());

router.route('/:id').get(cdd_test_controller.get_record_by_id());

//  Testort

export default router;
