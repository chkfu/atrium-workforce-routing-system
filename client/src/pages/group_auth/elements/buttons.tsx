import ButtonConfirm from '../../../elements/ButtonConfirm';
import { COLORS } from '../../../styles/color';


//  remarks: trigger login entry point
export const LoginSubmitButton = ({ isLoading }: { isLoading: boolean }): JSX.Element => {
  return (
    <div className="flex justify-end mt-8">
      <ButtonConfirm
        type="submit"
        label={isLoading ? 'Loading' : 'Login'}
        style={{
          background: isLoading ? COLORS.gray : COLORS.dark_teal,
          color: isLoading ? COLORS.dark_gray : 'white',
        }}
        disabled={isLoading}
      />
    </div>
  );
};

//  remarks: reset password (opt out stage), triggering token email sending
export const ResetTokenEmailButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-end mt-8">
      <ButtonConfirm
        label={isLoading ? 'Loading...' : 'Send Verification'}
        type="submit"
        style={{
          background: isLoading ? COLORS.gray : COLORS.dark_teal,
          color: isLoading ? COLORS.dark_gray : 'white',
        }}
        disabled={isLoading}
      />
    </div>
  );
};


//  remarks: reset password (opt in stage), exercising password change
export const ResetChangeSubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-end mt-8">
      <ButtonConfirm
        label={isLoading ? 'Loading...' : 'Confirm'}
        type="submit"
        style={{
          background: isLoading ? COLORS.gray : COLORS.dark_teal,
          color: isLoading ? COLORS.dark_gray : 'white',
        }}
        disabled={isLoading}
      />
    </div>
  );
};
