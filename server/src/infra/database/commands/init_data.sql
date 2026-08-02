--  remarks: create first master admin account for the system, enable to initialise new initial data

BEGIN;

--  remarks: sys_admin master account

--  learnt: WITH new staff enable to identify the staff id, which later to be used in create user record
WITH new_staff AS (
  INSERT INTO "staff" (
    first_name,
    last_name,
    work_position,
    work_grade,
    work_email
  )
  SELECT
    'SYSTEM_ADMIN',
    'ATRIUM',
    'System Administrator',
    'grade_2_manager',
    'atrium.sysadmin@atrium.com'
  WHERE NOT EXISTS (SELECT 1 FROM "sys_users" WHERE username = 'atrium.sysadmin')
  RETURNING _id
)
INSERT INTO "sys_users" (
  username,
  email,
  _password,
  _password_confirm,
  user_role,
  staff_id,
  candidate_id,
  is_active
)
SELECT
  'atrium.sysadmin',
  'atrium.sysadmin@atrium.com',
  '$2b$10$fTnyAu9XV3gq6WvFHbBOR.k7.owEXHLCLjqwNLFMZep5ZYXF7djOe',
  '$2b$10$fTnyAu9XV3gq6WvFHbBOR.k7.owEXHLCLjqwNLFMZep5ZYXF7djOe',
  'grade_2_manager',
  new_staff._id,
  NULL,
  TRUE
FROM new_staff;        --  leanrt: refer to the new_staff reference


--  remarks: initialisedepartments

INSERT INTO "departments" (
  dept_name,
  dept_capacity,
  importance_weight,
  is_active
)
SELECT * FROM (
  VALUES
    ('Cloud Infrastructure', 8, 0.95, TRUE),
    ('Application Development', 12, 0.92, TRUE),
    ('Business Analytics', 7, 0.85, TRUE),
    ('Cyber Security', 6, 0.98, TRUE),
    ('Data Engineering', 9, 0.90, TRUE),
    ('Solutions Architecture', 8, 0.88, TRUE),
    ('Project Management Office', 5, 0.80, TRUE)
) AS new_departments (dept_name, dept_capacity, importance_weight, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM "departments" WHERE departments.dept_name = new_departments.dept_name
);

COMMIT;