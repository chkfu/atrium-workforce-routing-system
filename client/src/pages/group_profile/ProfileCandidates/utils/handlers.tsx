import { ICandidate, ICandidateEdu, ICandidatePref } from '../../../../utils/types/redux_types';
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

//  ==========    Section: Candidate Education    ==========

//  remarks: create candidate education record
export async function handle_create_candidate_edu_submit(id: string, data: ICandidateEdu) {
  try {
    const { _id, created_at, updated_at, candidate_id, ...payload } = data;
    await axios.post(`${API.CANDIDATES_EDU}`, {
      candidate_education: [
        {
          candidate_id: Number(id),
          ...payload,
        },
      ],
    });
    alert(
      `[ProfileCandidate] succeed: the education record of candidate ${id} has been created successfully.`
    );
    return true;
  } catch (err: any) {
    alert(`[ProfileCandidate] error: ${err.response?.data?.message || err.message}`);
    return false;
  }
}

//  ==========    Section: Candidate Test / Preferences    ==========

export async function handle_candidate_subsection_unique<T>(section_name: string, url: string, candidate_id: string, data: T) {
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
    alert(`[${section_name}] error: ${err.response?.data?.message || err.message}`);
    return false;
  }
}

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

