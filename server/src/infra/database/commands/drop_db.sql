--  remarks: drop all tables under the public schema (CASCADE also drops dependent views/FKs)
--  remarks: enum types intentionally left alone; schema.sql creates them idempotently (duplicate_object caught)

BEGIN;

DROP TABLE IF EXISTS
  candidate_education,
  candidate_experience,
  candidate_tests,
  candidate_preferences,
  select_weighting,
  select_criteria,
  probation_intakes,
  sys_users,
  candidates,
  staff,
  departments
CASCADE;    -- learnt: prevent errors due to foreign keys connection during dropping

COMMIT;