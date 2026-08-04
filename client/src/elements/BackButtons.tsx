import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ButtonConfirm from './ButtonConfirm';
import { COLORS } from '../styles/color';
import { HREF } from '../config/href';
import { ROLE_DASHBOARD } from '../pages/group_auth/utils/constants';

export function ProfileBackButton({
  path_staff,
  path_candidate,
}: {
  path_staff: string;
  path_candidate: string;
}) {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.user_role);
  return (
    <div className="flex flex-col items-start mb-12">
      <ButtonConfirm
        label="Back"
        style={{ background: COLORS.dark_teal , color: COLORS.light_gray }}
        onClick={() => {
          if (role === 'candidate') {
            navigate(path_candidate);
          } else {
            navigate(path_staff);
          }
        }}
      />
    </div>
  );
}

export function ManagePageBackButton() {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.user_role);
  return (
    <div className="flex flex-col items-start mb-12">
      <ButtonConfirm
        label="Back"
        style={{ background: COLORS.dark_teal , color: COLORS.light_gray }}
        onClick={() => {
          navigate(role ? ROLE_DASHBOARD[role] : HREF.HOME);
        }}
      />
    </div>
  );
}

