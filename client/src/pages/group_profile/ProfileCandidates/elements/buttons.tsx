import { COLORS } from '../../../../styles/color';
import ButtonConfirm from '../../../../elements/ButtonConfirm';

//  ==========  Section: Candidate Details  ==========

//  remarks: resume to initial value that fetched from SQL
export function ButtonCandidateDetailsReset({ reset }: { reset: () => void }) {
  return (
    <ButtonConfirm
      label='Reset'
      style={{ background: COLORS.light_gray, color: COLORS.dark_teal }}
      onClick={reset}
    />
  );
}

export function ButtonCandidateDetailsSubmit() {
  return (
    <ButtonConfirm
      label='Save'
      style={{ background: COLORS.dark_teal, color: COLORS.light_gray }}
      type='submit'
    />
  );
}

//  ==========  Section: Candidate Qualification  ==========

export function ButtonCandidateEduReset({ reset }: { reset: () => void }) {
  return (
    <ButtonConfirm
      label='Reset'
      style={{ background: COLORS.light_gray, color: COLORS.dark_teal }}
      onClick={reset}
    />
  );
}

export function ButtonCandidateEduSubmit() {
  return (
    <ButtonConfirm
      label='Save'
      style={{ background: COLORS.dark_teal, color: COLORS.light_gray }}
      type='submit'
    />
  );
}