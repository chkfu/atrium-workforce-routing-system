import express from 'express';
import UserController from './controller';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import db_structure from '../util/config/db_structure';

//  Import router

const router = express.Router();

const user_controller = new UserController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.sys_users.primary_key,
);

//  Build routes

router.route('/register_new_user').post(user_controller.register_new_user());

//  Export

export default router;
