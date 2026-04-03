import pool from '../database/pool';
import { Request, Response, NextFunction } from 'express';
import { handle_async } from '../util/handle_async';
import department_services from '../services/department_service';

type type_new_dept = {
  dept_name: string;
  dept_capacity: number;
  importance_weight: number;
};

//  SECTION:  POST /api/v1/departments

const create_new_department = handle_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const dept_arr: type_new_dept[] = req.body.departments;
    //  remarks: for batch insert, customised inserted values with new string
    let inserted_val: string = '';
    dept_arr.map((dept) => {
      if (inserted_val.length != 0) {
        inserted_val += ', ';
      }
      inserted_val += `('${dept.dept_name}', ${dept.dept_capacity}, ${dept.importance_weight})`;
    });

    // reamrks: put the new string into service function to proceed
    const new_dept =
      await department_services.create_new_department(inserted_val);
    res.status(201).json({
      status: 'success',
      data: {
        department: new_dept,
      },
    });
  },
);

//  Export

export default {
  create_new_department,
};
