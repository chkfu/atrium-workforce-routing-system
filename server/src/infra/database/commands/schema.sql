BEGIN;

--  ENUMS

--  remarks: postgres enums are not supported by 'create if not exists'
--           'DO $$ $$' for static catching; if not, script will crash
DO $$ BEGIN CREATE TYPE enum_staff_role AS ENUM ('pending', 'grade_1_assistant', 'grade_2_manager', 'grade_3_executive'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_user_role AS ENUM ('candidate', 'grade_1_assistant', 'grade_2_manager', 'grade_3_executive', 'sys_admin'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_gender AS ENUM ('male', 'female', 'other'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_prob_status AS ENUM ('selecting', 'training', 'completed', 'postponed', 'withdrawn', 'failed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_hire_decision AS ENUM ('approved', 'rejected', 'deferred'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_exp_nature AS ENUM ('fulltime', 'parttime', 'internship', 'volunteer'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_major_category AS ENUM ('stem', 'eng', 'bus', 'law', 'other'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE enum_inst_tier AS ENUM ('1st', '2nd', '3rd', 'other'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

--  1.  Core tables

CREATE TABLE IF NOT EXISTS departments(
  _id  SERIAL  PRIMARY KEY,
  dept_name  VARCHAR(50) NOT NULL,
  dept_capacity  INTEGER DEFAULT 50,
  importance_weight  NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS staff(
  _id  SERIAL  PRIMARY KEY,
  first_name  VARCHAR(50) NOT NULL,
  last_name  VARCHAR(50) NOT NULL,
  gender  enum_gender,
  work_position  VARCHAR(50),
  work_grade  enum_staff_role DEFAULT 'pending',
  work_email  VARCHAR(50) UNIQUE,
  work_ext  VARCHAR(20) UNIQUE,
  dept_id  INTEGER,
  date_hired  DATE,
  date_quit  DATE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active  BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_staff_dept
    FOREIGN KEY (dept_id)
    REFERENCES departments(_id)
    ON DELETE SET NULL,
  CONSTRAINT chk_staff_dates
    CHECK (date_quit IS NULL OR date_hired IS NULL OR date_quit >= date_hired)
);

CREATE INDEX IF NOT EXISTS idx_staff_dept_id ON staff(dept_id);

CREATE TABLE IF NOT EXISTS candidates(
  _id  SERIAL  PRIMARY KEY,
  first_name  VARCHAR(50) NOT NULL,
  last_name  VARCHAR(50) NOT NULL,
  gender  enum_gender,
  email  VARCHAR(50) UNIQUE,
  prob_status  enum_prob_status,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active  BOOLEAN DEFAULT TRUE
);

--  remarks: users table for system login, but staff and candidates refers to personal profiles
--  remarks: authentication related tables should be seperated, if needed to be in multi-cloud architecture
--           tradeoff: data lantency, systematic complexity, and cost of maintenance
CREATE TABLE IF NOT EXISTS sys_users(
  _id           SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  email         VARCHAR(50) UNIQUE NOT NULL,
  _password     VARCHAR(255) NOT NULL,
  _password_confirm VARCHAR(255) NOT NULL,
  user_role     enum_user_role,
  staff_id      INTEGER UNIQUE REFERENCES staff(_id) ON DELETE SET NULL,
  candidate_id  INTEGER UNIQUE REFERENCES candidates(_id) ON DELETE SET NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pw_changed_at TIMESTAMP,
  pw_reset_token  VARCHAR,
  pw_reset_expired  TIMESTAMPTZ,    
  is_active     BOOLEAN DEFAULT TRUE,

  --  learnt: ensure staff, candidate, or admin has their corresponding id for tracking
  CONSTRAINT check_user_role CHECK (
    (user_role = 'candidate'  AND candidate_id IS NOT NULL AND staff_id IS NULL) OR
    (user_role = 'grade_1_assistant'  AND staff_id IS NOT NULL AND candidate_id IS NULL) OR
    (user_role = 'grade_2_manager'  AND staff_id IS NOT NULL AND candidate_id IS NULL) OR
    (user_role = 'grade_3_executive'  AND staff_id IS NOT NULL AND candidate_id IS NULL) OR
    (user_role = 'sys_admin'  AND staff_id IS NULL AND candidate_id IS NULL)
  )
);

-- CREATE TABLE IF NOT EXISTS sys_audit(
--   _id  SERIAL  PRIMARY KEY,
--   processor_id  INTEGER,
--   tb_name  VARCHAR(50),
--   action_type  VARCHAR(50),
--   messages  TEXT,
--   CONSTRAINT fk_candidate_tests
--       FOREIGN KEY (candidate_id)
--       REFERENCES candidates(_id)
--       ON DELETE CASCADE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


--  2.  Candidates-supported table

CREATE TABLE IF NOT EXISTS candidate_education(
  _id  SERIAL  PRIMARY KEY,
  candidate_id  INTEGER,
  cert_degree  VARCHAR(50),
  cert_institute  VARCHAR(50),
  cert_major  VARCHAR(50),
  --  remarks: raw text above is for display; scoring reads these two classifications instead
  --           (avoids hardcoding major/institute name lists inside the scoring view)
  major_category  enum_major_category  DEFAULT 'other',
  inst_tier  enum_inst_tier  DEFAULT 'other',
  year_issued  INTEGER,
  is_verified  BOOLEAN  DEFAULT FALSE,
  CONSTRAINT fk_candidate_qual
    FOREIGN KEY (candidate_id) 
    REFERENCES candidates(_id)
    ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS candidate_experience(
  _id  SERIAL  PRIMARY KEY,
  candidate_id  INTEGER,
  exp_nature  enum_exp_nature,
  exp_role  VARCHAR(50),
  exp_institute  VARCHAR(50),
  date_start  DATE,
  date_end  DATE,
  is_verified  BOOLEAN  DEFAULT FALSE,
  CONSTRAINT fk_candidate_exp
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(_id)
    ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS candidate_tests(
  _id  SERIAL  PRIMARY KEY,
  candidate_id  INTEGER,
  score_aptitude  NUMERIC(5,2),
  score_interview_1st  NUMERIC(5,2),
  score_interview_2nd  NUMERIC(5,2),
  CONSTRAINT fk_candidate_tests
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(_id)
    ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS candidate_preferences(
  _id SERIAL  PRIMARY KEY,
  candidate_id  INTEGER,
  pref_dept_1st  INTEGER,
  pref_dept_2nd  INTEGER,
  pref_dept_3rd  INTEGER,
  CONSTRAINT fk_candidate_pref
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_candidate_pref_1st
    FOREIGN KEY (pref_dept_1st)
    REFERENCES departments(_id)
    ON DELETE SET NULL,
  CONSTRAINT fk_candidate_pref_2nd
    FOREIGN KEY (pref_dept_2nd)
    REFERENCES departments(_id)
    ON DELETE SET NULL,
  CONSTRAINT fk_candidate_pref_3rd
    FOREIGN KEY (pref_dept_3rd)
    REFERENCES departments(_id)
    ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

--  3. Selection Stage

CREATE TABLE IF NOT EXISTS select_weighting(
  _id  SERIAL  PRIMARY KEY,
  strategy_name VARCHAR(50),
  strategy_goal TEXT,
  --  remarks: education rules
  edu_degree_other INTEGER DEFAULT 20,
  edu_degree_bachelor INTEGER DEFAULT 30,
  edu_degree_postdip INTEGER DEFAULT 35,
  edu_degree_master INTEGER DEFAULT 40,
  edu_degree_doctoral INTEGER DEFAULT 50,
  edu_inst_other INTEGER DEFAULT 0,
  edu_inst_1st INTEGER DEFAULT 10,
  edu_inst_2nd INTEGER DEFAULT 7,
  edu_inst_3rd INTEGER DEFAULT 4,
  edu_major_stem INTEGER DEFAULT 5,
  edu_major_eng INTEGER DEFAULT 5,
  edu_major_bus INTEGER DEFAULT 3,
  edu_major_law INTEGER DEFAULT 3,
  edu_major_sosc INTEGER DEFAULT 0,
  edu_major_other INTEGER DEFAULT 0,
  --  remarks: experience rules
  exp_nature_ft INTEGER DEFAULT 40,
  exp_nature_pt INTEGER DEFAULT 20,
  exp_nature_intern INTEGER DEFAULT 30,
  exp_nature_vol INTEGER DEFAULT 10,
  exp_year_rate NUMERIC(5,2) DEFAULT 1.33 CHECK (exp_year_rate BETWEEN 0 AND 2),
  --  remarks: test score rules
  test_apt  NUMERIC(3,2) CHECK (test_apt BETWEEN 0 AND 1),
  test_int_1st  NUMERIC(3,2) CHECK (test_int_1st BETWEEN 0 AND 1),
  test_int_2nd  NUMERIC(3,2) CHECK (test_int_2nd BETWEEN 0 AND 1),
  CONSTRAINT chk_test_weight_sum CHECK (test_apt + test_int_1st + test_int_2nd <= 1),
  --  remarks: overall shares
  weight_edu  NUMERIC(3,2) DEFAULT 0.33 CHECK (weight_edu BETWEEN 0 AND 1),
  weight_exp  NUMERIC(3,2) DEFAULT 0.33 CHECK (weight_exp BETWEEN 0 AND 1),
  weight_test  NUMERIC(3,2) DEFAULT 0.33 CHECK (weight_test BETWEEN 0 AND 1),
  --  remarks: passing standard
  pass_edu  NUMERIC(5,2) DEFAULT 30 CHECK (pass_edu BETWEEN 0 AND 100),
  pass_exp  NUMERIC(5,2) DEFAULT 0 CHECK (pass_exp BETWEEN 0 AND 100),
  pass_test  NUMERIC(5,2) DEFAULT 50 CHECK (pass_test BETWEEN 0 AND 100),
  --  learnt: implement new rules with constraint
  CONSTRAINT chk_weight_sum CHECK (weight_edu + weight_exp + weight_test <= 1),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active  BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS select_criteria (
  _id  SERIAL PRIMARY KEY,
  dept_id  INTEGER UNIQUE,
  min_score_qual  NUMERIC(5,2) DEFAULT 0 CHECK (min_score_qual BETWEEN 0 AND 100),
  min_score_exp  NUMERIC(5,2) DEFAULT 0 CHECK (min_score_exp BETWEEN 0 AND 100),
  min_score_tests  NUMERIC(5,2) DEFAULT 0 CHECK (min_score_tests BETWEEN 0 AND 100),
  CONSTRAINT fk_dept 
    FOREIGN KEY (dept_id) REFERENCES departments(_id)
    ON DELETE CASCADE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active  BOOLEAN DEFAULT TRUE
);

-- [ attention: select scoring, please check view tables ]

--  4. probation stage

CREATE TABLE IF NOT EXISTS probation_intakes(
  _id  SERIAL  PRIMARY KEY,
  candidate_id  INTEGER,
  select_weight_id  INTEGER,
  dept_intake  INTEGER,
  round_intake  INTEGER,
  date_start  DATE,
  date_end  DATE,
  remarks  VARCHAR(50),
  CONSTRAINT fk_candidate_training
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(_id)
    ON DELETE SET NULL,
  CONSTRAINT fk_department_training
    FOREIGN KEY (dept_intake)
    REFERENCES departments(_id)
    ON DELETE SET NULL,
  CONSTRAINT fk_weighting_training
    FOREIGN KEY (select_weight_id)
    REFERENCES select_weighting(_id)
    ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);


--  ***  BUILD VIEWS TABLES

--  learnt: view table enable advanced logical pattern without additional space occupied (virtual)2d2    2222
CREATE OR REPLACE VIEW view_user_profile AS
SELECT sys_users.*, 
  COALESCE(candidates.first_name, staff.first_name) AS first_name,    -- remarks: first_name column could be first name from either table
  COALESCE(candidates.last_name, staff.last_name) AS last_name    -- remarks: last_name column could be last name from either table
FROM sys_users    -- remarks: sys_users as the main table, _id as primary identifier
LEFT JOIN candidates ON sys_users.candidate_id = candidates._id    -- remarks: based on foreign key, expand candidates details
LEFT JOIN staff ON sys_users.staff_id = staff._id;    -- remarks: based on foreign key, expand staff details


--  remarks: build 4 views candidates subtable for total score calculation (education example)

--  remarks: total score (candidate education)
--  learnt: forming with conditional statement with weighting details injection
CREATE OR REPLACE VIEW view_candidate_edu AS
SELECT 
  cedu.candidate_id,
  swei._id AS weight_id,
  MAX(
    CASE cedu.cert_degree
      WHEN 'bachelors' THEN swei.edu_degree_bachelor
      WHEN 'masters' THEN swei.edu_degree_master
      WHEN 'postdip' THEN swei.edu_degree_postdip
      WHEN 'doctoral' THEN swei.edu_degree_doctoral
      ELSE swei.edu_degree_other
    END
  )
  +
  SUM(
    CASE
      WHEN cedu.cert_institute IN ('ox', 'cam', 'imp', 'lse', 'ucl')
        THEN swei.edu_inst_1st
      WHEN cedu.cert_institute IN ('edin', 'kcl', 'warw', 'bris', 'manc', 'glas', 'dur')
        THEN swei.edu_inst_2nd
      WHEN cedu.cert_institute IN ('nott', 'shef', 'york', 'bham', 'sout', 'ex', 'qm', 'lanc', 'suss')
        THEN swei.edu_inst_3rd
      ELSE swei.edu_inst_other
    END
    +
    CASE cedu.cert_major
      WHEN 'stem' THEN swei.edu_major_stem
      WHEN 'eng' THEN swei.edu_major_eng
      WHEN 'bus' THEN swei.edu_major_bus
      WHEN 'law' THEN swei.edu_major_law
      WHEN 'arts' THEN swei.edu_major_other
      WHEN 'edu' THEN swei.edu_major_other
      WHEN 'human' THEN swei.edu_major_other
      WHEN 'med' THEN swei.edu_major_other
      WHEN 'sosci' THEN swei.edu_major_sosc
      ELSE swei.edu_major_other
    END
  ) AS edu_score_total
FROM candidate_education cedu
CROSS JOIN select_weighting swei
WHERE cedu.is_active = TRUE AND swei.is_active = TRUE
GROUP BY cedu.candidate_id, swei._id;

--  remarks: total score (candidate experience), (attempt 1)

CREATE OR REPLACE VIEW view_candidate_exp AS
SELECT 
  cexp.candidate_id,
  swei._id AS weight_id,
  SUM(
    CASE cexp.exp_nature
      WHEN 'fulltime' THEN swei.exp_nature_ft
      WHEN 'parttime' THEN swei.exp_nature_pt
      WHEN 'internship' THEN swei.exp_nature_intern
      WHEN 'volunteer' THEN swei.exp_nature_vol
      ELSE 0
    END
    * swei.exp_year_rate * ((cexp.date_end - cexp.date_start) / 365.0)
  ) AS exp_score_total
FROM candidate_experience cexp
CROSS JOIN select_weighting swei
WHERE cexp.is_active = TRUE AND swei.is_active = TRUE
GROUP BY cexp.candidate_id, swei._id;


--  remarks: total score (candidate test score), (attempt 2)

CREATE OR REPLACE VIEW view_candidate_tests AS
SELECT
  ctes.candidate_id,
  swei._id AS weight_id,
  SUM(
    ctes.score_aptitude * swei.test_apt
    +
    ctes.score_interview_1st * swei.test_int_1st
    +
    ctes.score_interview_2nd * swei.test_int_2nd
  ) AS test_score_total
FROM candidate_tests ctes
CROSS JOIN select_weighting swei
WHERE ctes.is_active = TRUE AND swei.is_active = TRUE
GROUP BY ctes.candidate_id, swei._id;


--  remarks: slt_scoring works on primary calculation without involvement of the customised factors (weighting, criteria)
--  remarks: result will only be stored in table slt_selection
--  reminder: to put coalesce to prevent crashes with null value

CREATE OR REPLACE VIEW view_select_scoring AS
SELECT
  cand._id AS candidate_id,
  CONCAT(cand.first_name, ' ', cand.last_name) AS candidate_name,
  swei._id AS weight_id,
  vedu.edu_score_total AS edu_score,
  vexp.exp_score_total AS exp_score,
  vtes.test_score_total AS test_score,
  (
    COALESCE(vedu.edu_score_total, 0) * swei.weight_edu
    +
    COALESCE(vexp.exp_score_total, 0) * swei.weight_exp
    +
    COALESCE(vtes.test_score_total, 0) * swei.weight_test
  ) AS total_score
FROM candidates cand
CROSS JOIN select_weighting swei
LEFT JOIN view_candidate_edu vedu ON cand._id = vedu.candidate_id AND vedu.weight_id = swei._id
LEFT JOIN view_candidate_exp vexp ON cand._id = vexp.candidate_id AND vexp.weight_id = swei._id
LEFT JOIN view_candidate_tests vtes ON cand._id = vtes.candidate_id AND vtes.weight_id = swei._id
WHERE swei.is_active = TRUE
ORDER BY total_score DESC;


--  remarks: department list with capacity updates
CREATE OR REPLACE VIEW view_department_criteria AS
SELECT
  dept._id AS dept_id,
  dept.dept_name,
  dept.dept_capacity,
  COALESCE(occ.staff_count, 0) AS staff_count,
  dept.dept_capacity - COALESCE(occ.staff_count, 0) AS remaining_capacity,
  dept.importance_weight,
  crit.min_score_qual,
  crit.min_score_exp,
  crit.min_score_tests
FROM departments dept
LEFT JOIN (
  SELECT dept_id, COUNT(*) AS staff_count
  FROM staff
  WHERE is_active = TRUE
  GROUP BY dept_id
) occ ON occ.dept_id = dept._id
LEFT JOIN select_criteria crit
  ON dept._id = crit.dept_id AND crit.is_active = TRUE
WHERE dept.is_active = TRUE
ORDER BY dept.importance_weight DESC;


--  remarks: probation instake list with projected details
CREATE OR REPLACE VIEW view_prob_intakes AS
SELECT
  pint._id AS intake_id,
  cand.first_name AS candidate_first_name,
  cand.last_name AS candidate_last_name,
  cand.gender AS candidate_gender,
  cand.prob_status AS candidate_prob_status,
  dept.dept_name AS intake_dept_name,
  swei.strategy_name AS intake_strategy_name,
  vss.edu_score AS intake_edu_score,
  vss.exp_score AS intake_exp_score,
  vss.test_score AS intake_test_score,
  vss.total_score AS intake_total_score,
  pint.is_active AS intake_is_active,
  pint.created_at AS intake_created_at,
  pint.updated_at AS intake_updated_at
FROM probation_intakes pint
LEFT JOIN candidates cand ON pint.candidate_id = cand._id
LEFT JOIN departments dept ON pint.dept_intake = dept._id
LEFT JOIN select_weighting swei ON pint.select_weight_id = swei._id
LEFT JOIN view_select_scoring vss
  ON pint.candidate_id = vss.candidate_id
  AND pint.select_weight_id = vss.weight_id
WHERE pint.is_active = TRUE
ORDER BY vss.total_score DESC;


COMMIT;
