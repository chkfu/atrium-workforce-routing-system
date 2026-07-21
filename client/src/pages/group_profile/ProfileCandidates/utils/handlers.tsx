import { ICandidate, ICandidateExp, ICandidatePref } from '../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../config/api';


//  ==========    Section: Candidate Details    ==========

//  remarks: update candidate details record
export async function handle_candidate_details_submit(id: string, data: ICandidate) {
  try {
    const { _id, created_at, updated_at, ...payload } = data;
    await axios.patch(`${API.CANDIDATES}`, {
      _ids: [String(id)],
      ...payload,
    });
    alert(`[ProfileCandidate] succeed: candidate ${id} has been updated successfully.`);
    return true;
  } catch (err: any) {
    alert(`[ProfileCandidate] error: ${err.response?.data?.message || err.message}`);
    return false;
  }
}

//  ==========    Sub-Section: Reusable Methods   ==========

//  remarks: for create new record
export async function create_candidate_subsection<T>(section_name: string, url: string, id: string, data: T) {
  if (!id) throw new Error(`[${section_name}] error: candidate_id is missing.`)
  try {
    const { _id, created_at, updated_at, candidate_id, ...payload } = data as any;
    const table_name = url.split('/').pop();
    await axios.post(url, {
      [table_name as string]: [
        {
          candidate_id: Number(id),
          ...payload,
        },
      ],
    });
    alert(`[${section_name}] succeed: candidate ${id} record has been created successfully.`);
    return true;
  } catch (err: any) {
    const err_msg = `[${section_name}] error: failed to create subsection record.`;
    alert(`[${section_name}] error: ${err_msg}`);
    console.error(err_msg, err);
    return false;
  }
}

//  remarks: for update existing record
export async function update_candidate_subsection<T>(section_name: string, url: string, candidate_id: string, data: T) {
  //  remarks: validate candidate id
  if (!candidate_id) throw new Error(`[${section_name}] error: candidate_id is missing.`)
  try {
    //  remarks: look up every existing preference record for this candidate, to detect duplicates
    const res = await axios.get(`${url}/column-list/candidate_id/${candidate_id}`);
    const result: any[] = res.data?.data?.records ?? [];

    if (result.length === 1) {
      //  remarks: unique record, then update
      await axios.patch(url, {
        _ids: [String(result[0]._id)],
        ...data,
      });
    } else {
      //  remarks: if 0, create a new one; 2 or more, remove old and create new
      //  remarks: already set unique at schema, delete action in case of accidents
      if (result.length > 1) {
        await axios.delete(url, {
          data: { _ids: result.map((el) => String(el._id)) },
        });
      }
      //  remarks: server's create_record_batch reads req.body[table_name], and
      const table_name = url.split('/').pop();
      await axios.post(url, {
        [table_name as string]: [
          {
            candidate_id,
            ...data,
          },
        ],
      });
    }
    alert(`[${section_name}] succeed: candidate ${candidate_id} record has been updated successfully.`);
    return true;
  } catch (err: any) {
    const err_msg = `[${section_name}] error: failed to update subsection record.`;
    alert(`[${section_name}] error: ${err_msg}`);
    console.error(err_msg, err);
    return false;
  }
}

//  ==========    Sub-Section: Supporting Mehtods    ==========


//  remarks: the function set for providing updated department list for selection
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

//  remarks: supporting to validate preference with yup validation
//  learnt: the 3 preferences must not repeat a department
export function no_dup_pref(this: any) {
  const picked = [
    this.parent.pref_dept_1st,
    this.parent.pref_dept_2nd,
    this.parent.pref_dept_3rd,
  ].filter(Boolean);
  return new Set(picked).size === picked.length;
}

