import { COLORS } from '../../../../styles/color';
import ButtonConfirm from '../../../../elements/ButtonConfirm';

//  ==========  Section: Candidate Details  ==========

//  remarks: resume to initial value that fetched from SQL
export function ButtonCandidateDetailsReset({ reset }: { reset: () => void }) {
  return (
    <ButtonConfirm
      label="Reset"
      style={{ background: COLORS.light_gray, color: COLORS.dark_teal }}
      onClick={reset}
    />
  );
}

export function ButtonCandidateDetailsSubmit({
  disabled = false,
  isLoading = false,
}: { disabled?: boolean; isLoading?: boolean } = {}) {
  return (
    <ButtonConfirm
      label={isLoading ? 'Loading...' : 'Save'}
      style={{ background: COLORS.dark_teal, color: COLORS.light_gray }}
      type="submit"
      disabled={disabled || isLoading}
    />
  );
}

//  ==========  Section: Candidate Qualification  ==========

export function ButtonCandidateTrigger({
  triggerCreateForm,
  setTriggerCreateForm,
}: {
  triggerCreateForm: boolean;
  setTriggerCreateForm: (value: boolean) => void;
}) {
  return (
    <ButtonConfirm
      label={triggerCreateForm ? 'Cancel' : 'Add'}
      onClick={() => setTriggerCreateForm(!triggerCreateForm)}
      style={
        triggerCreateForm
          ? { background: COLORS.light_gray, color: COLORS.dark_teal }
          : { background: COLORS.button_yellow }
      }
    />
  );
}

export function ButtonCandidateEduReset({ reset }: { reset: () => void }) {
  return (
    <ButtonConfirm
      label="Reset"
      style={{ background: COLORS.light_gray, color: COLORS.dark_teal }}
      onClick={reset}
    />
  );
}

export function ButtonCandidateEduSubmit({ isLoading = false }: { isLoading?: boolean } = {}) {
  return (
    <ButtonConfirm
      label={isLoading ? 'Loading...' : 'Save'}
      style={{ background: COLORS.dark_teal, color: COLORS.light_gray }}
      type="submit"
      disabled={isLoading}
    />
  );
}

//  remarks: shared delete button for existing subsection records (education, experience, ...)
export function ButtonCandidateSubsectionDelete({
  onClick,
  isLoading = false,
}: {
  onClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <ButtonConfirm
      label={isLoading ? 'Loading...' : 'Delete'}
      style={{ background: COLORS.error_red, color: COLORS.light_gray }}
      onClick={onClick}
      disabled={isLoading}
    />
  );
}
