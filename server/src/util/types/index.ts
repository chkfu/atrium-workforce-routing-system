//  consideration: as schema library, zod could validate types with built-in codes.

export type type_dept_row = {
  dept_name: string;
  dept_capacity: number;
  importance_weight: number;
  is_active: boolean;
};

export type type_staff_row = {
  first_name: string;
  last_name: string;
  gender: enum_gender;
  work_position: string;
  work_grade: enum_staff_grade;
  work_email: string | null;
  work_ext: string | null;
  dept_id: number | null;
  date_hired: Date | null;
  date_quit: Date | null;
  is_active: boolean;
};
// ＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋＋÷

export type TSchemaBase = {
  _id: number;
  created_at: Date;
  updated_at: Date;
};

//  tags: departments
export type TDepartmentBase = {
  dept_name: string;
  dept_capacity?: number;
  importance_weight?: number;
  is_active: boolean;
};

//  tags: staff
export type TStaffBase = {
  first_name: string;
  last_name: string;
  gender?: string;
  work_position: string;
  work_grade: string;
  work_email?: string;
  work_ext?: string;
  dept_id?: number;
  date_hired?: Date;
  date_quit?: Date;
  is_active: boolean;
};
