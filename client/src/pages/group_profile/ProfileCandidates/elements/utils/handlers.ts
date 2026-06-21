import { ICandidate } from '../../../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../../../config/api';

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
  } catch (err: any) {
    alert(
      `[ProfileCandidate] error: ${err.response?.data?.message || err.message}`,
    );
  }
}
