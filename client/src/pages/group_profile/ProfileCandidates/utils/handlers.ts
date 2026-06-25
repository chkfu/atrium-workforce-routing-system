import { ICandidate, ICandidateEdu } from '../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../config/api';

//  ==========    Section: Candidate Details    ==========

//  remarks: update candidate details record
export async function handle_candidate_details_submit(
  id: string,
  data: ICandidate,
) {
  try {
    const { _id, created_at, updated_at, ...payload } = data;
    await axios.patch(`${API.CANDIDATES}/${id}`, {
      _ids: [String(id)],
      ...payload,
    });
    alert(
      `[ProfileCandidate] succeed: candidate ${id} has been updated successfully.`,
    );
    return true;
  } catch (err: any) {
    alert(
      `[ProfileCandidate] error: ${err.response?.data?.message || err.message}`,
    );
    return false;
  }
}

//  ==========    Section: Candidate Education    ==========

//  remarks: create candidate education record
export async function handle_create_candidate_edu_submit(
  id: string,
  data: ICandidateEdu,
) {
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
      `[ProfileCandidate] succeed: the education record of candidate ${id} has been created successfully.`,
    );
    return true;
  } catch (err: any) {
    alert(
      `[ProfileCandidate] error: ${err.response?.data?.message || err.message}`,
    );
    return false;
  }
}
