import express from 'express';
import SltScoreController from './controller';
import AuthController from '../../../auth/controller';
import { TSltScoreBase, TSchemaBase, TUserBase } from '../../../util/types/schema_types';
import { enum_user_role } from '../../../util/enums';
import db_structure from '../../../util/config/db_structure';

//  Import router

const router = express.Router();

const slt_score_controller = new SltScoreController(
  db_structure.slt_score.table,
  [...db_structure.slt_score.columns] as Extract<
    keyof (TSltScoreBase & TSchemaBase),
    string
  >[], // remarks: for suit into string[] required
  db_structure.slt_score.primary_key,
);

const auth_controller = new AuthController(
  db_structure.sys_users.table,
  [...db_structure.sys_users.columns] as Extract<
    keyof (TUserBase & TSchemaBase),
    string
  >[],
  db_structure.sys_users.primary_key,
);

//  Build routes

router
  .route('/')
  .get(slt_score_controller.get_candidate_score_desc());

//  Testort

export default router;
