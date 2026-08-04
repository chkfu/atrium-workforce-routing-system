import { ISelectWeight } from '../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../config/api';


//  ==========    Section: Dept Details    ==========

//  remarks: update dept details record
export async function handle_dept_details_submit(id: string, data: ISelectWeight, setIsLoading: (prev: boolean) => void) {
  try {
    const { _id, created_at, updated_at, ...payload } = data;
    setIsLoading(true);
    await axios.patch(`${API.SELECT_WEIGHTING}`, {
      _ids: [String(id)],
      ...payload,
    });
    alert(`[ProfileSltWeight] succeed: select weighting ${id} has been updated successfully.`);
    return true;
  } catch (err: any) {
    alert(`[ProfileSltWeight] error: ${err.response?.data?.message || err.message}`);
    return false;
  } finally {
    setIsLoading(false);
  }
}

//  remarks: build weighting select options for the department dropdown
export function init_select_weight_opts({ weight }: { weight: any[]; }): Array<{ value: string; label: string; }> {
  if (!weight || weight.length === 0) {
    return [];
  }
  const result = weight
    .filter((weight) => weight.is_active !== false)
    .map((weight) => ({
      value: String(weight._id),
      label: weight.weight_name,
    }));
  return result;
}
