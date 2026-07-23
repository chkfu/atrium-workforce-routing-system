import { IDepartment } from '../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../config/api';
import { ISelectCriteria } from '../../../../utils/types/redux_types';


//  ==========    Section: Dept Details    ==========

//  remarks: update dept details record
export async function handle_dept_details_submit(id: string, data: IDepartment, setIsLoading: (prev: boolean) => void) {
  try {
    const { _id, created_at, updated_at, ...payload } = data;
    setIsLoading(true);
    await axios.patch(`${API.DEPARTMENTS}`, {
      _ids: [String(id)],
      ...payload,
    });
    alert(`[Profiledept] succeed: dept ${id} has been updated successfully.`);
    return true;
  } catch (err: any) {
    alert(`[Profiledept] error: ${err.response?.data?.message || err.message}`);
    return false;
  } finally {
    setIsLoading(false);
  }
}

//  remarks: build department select options for the department dropdown
export function init_select_dept_opts({ departments }: { departments: any[]; }): Array<{ value: string; label: string; }> {
  if (!departments || departments.length === 0) {
    return [];
  }
  const result = departments
    .filter((dept) => dept.is_active !== false)
    .map((dept) => ({
      value: String(dept._id),
      label: dept.dept_name,
    }));
  return result;
}


//  ==========    Section: Select Criteria    ==========

export async function handle_select_criteria_submit(dept_id: string, data: ISelectCriteria, setIsLoading: (prev: boolean) => void) {
  try {
    const { _id, dept_id: _dept_id, created_at, updated_at, ...payload } = data;
    //  remarks: create the new record, if not found
    if (!_id) {
      setIsLoading(true);
      await axios.post(API.SELECT_CRITERIA, {
        select_criteria: [{ dept_id: Number(dept_id), ...payload }],
      });
      alert(`[SelectCriteria] succeed: criteria for dept ${dept_id} has been created successfully.`);
      return;
    }
    //  remarks: update the existing record
    if (Number(dept_id) !== Number(data.dept_id)){
      alert(`[SelectCriteria] error: department id not matched`);
      return;
    }
    setIsLoading(true);
    await axios.patch(API.SELECT_CRITERIA, {
      _ids: [String(_id)],
      ...payload,
    });
    alert(`[SelectCriteria] succeed: criteria for dept ${dept_id} has been updated successfully.`);
    return;
    //  remarks: error handling
  } catch (err: any) {
    alert(`[Profiledept] error: select criteria change failure. please contact the system administrator.`)
    return;
  } finally {
    setIsLoading(false);
  }
}
