import express from 'express';
import BaseController from '../controllers/BasicController';
import { TStaffBase } from '../util/types';

//  Import router

const router = express.Router();

//  Setup new controller
//  for binding entry criteria, added 'satisfies readonly (keyof TDepartmentBase)'
const staff_cols = [
  'first_name',
  'last_name',
  'gender',
  'work_position',
  'work_grade',
  'work_email',
  'work_ext',
  'dept_id',
  'date_hired',
  'date_quit',
  'is_active',
] as const satisfies readonly (keyof TStaffBase)[];

const staff_controller = new BaseController<TStaffBase>(
  'staff',
  [...staff_cols], // remarks: for suit into string[] required
  '_id',
);

//  Build routes

router
  .route('/')
  .get(staff_controller.get_record_batch())
  .post(staff_controller.create_record_batch())
  .patch(staff_controller.update_record_details_batch())
  .delete(staff_controller.remove_record_batch());

router
  .route('/activation')
  .patch(staff_controller.update_record_active_batch());
router.route('/empty').delete(staff_controller.empty_record_all());

router.route('/:id').get(staff_controller.get_record_by_id());

//  Export

export default router;
