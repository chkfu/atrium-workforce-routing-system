import express from 'express';
import CddPrefController from './controller';
import { TCddPrefBase, TSchemaBase } from '../../util/types';
import db_structure from '../../util/config/db_structure';

//  Import router

const router = express.Router();

const cdd_pref_controller = new CddPrefController(
  db_structure.cdd_pref.table,
  [...db_structure.cdd_pref.columns] as Extract<
    keyof (TCddPrefBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.cdd_pref.primary_key,
);

//  Build routes

router
  .route('/')
  .get(cdd_pref_controller.get_record_batch())
  .post(cdd_pref_controller.create_record_batch())
  .patch(cdd_pref_controller.update_record_details_batch())
  .delete(cdd_pref_controller.remove_record_batch());

router
  .route('/activation')
  .patch(cdd_pref_controller.update_record_active_batch());
router.route('/empty').delete(cdd_pref_controller.empty_record_all());

router.route('/:id').get(cdd_pref_controller.get_record_by_id());

//  Prefort

export default router;
