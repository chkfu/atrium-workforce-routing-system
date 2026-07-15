import { IDepartment } from '../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../config/api';


//  ==========    Section: dept Details    ==========

//  remarks: update dept details record
export async function handle_dept_details_submit(id: string, data: IDepartment) {
  try {
    const { _id, created_at, updated_at, ...payload } = data;
    await axios.patch(`${API.DEPARTMENTS}`, {
      _ids: [String(id)],
      ...payload,
    });
    alert(`[Profiledept] succeed: dept ${id} has been updated successfully.`);
    return true;
  } catch (err: any) {
    alert(`[Profiledept] error: ${err.response?.data?.message || err.message}`);
    return false;
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