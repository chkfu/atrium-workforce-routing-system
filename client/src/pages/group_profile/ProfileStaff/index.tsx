import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDepartment } from '../../../redux/slices/DepartmentSlice';
import { SectionDetails } from './elements/layout';
import Accordion from '../../../elements/Accordion';
import { IStaff } from '../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../config/api';
import Error from '../../../pages/group_navigation/Error';
import LoadSpinner from '../../../elements/LoadSpinner';
import { PAGE_PRELOAD_TIME } from '../../../config/constant';

export default function ProfileStaff(): JSX.Element {
  //  remarks: identify the specific staff profile to be viewed
  const { id } = useParams<{ id: string }>();

  //  remarks: dispatch for Redux
  const dispatch = useDispatch();

  //  remarks: local state management
  const [targetStaff, setTargetStaff] = useState<IStaff | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [getError, setGetError] = useState<any | null>(null);

  //  remarks: loading time with timeout error page
  useEffect(() => {
    const page_timeout = setTimeout(() => setPageLoading(false), PAGE_PRELOAD_TIME);
    //  learnt: be reminded to set clear timeout
    return () => clearTimeout(page_timeout);
  }, [id])

  //  remarks: load departments on mount
  useEffect(() => {
    axios
      .get(API.DEPARTMENTS)
      .then((res) => {
        const departments = res.data.data.result;
        dispatch(setDepartment(departments));
      })
      .catch((err: any) => {
        console.error('[ProfileStaff] error: fetching departments:', err);
        dispatch(setDepartment([]));
      });
  }, [dispatch]);

  //  remarks: querying staff data from SQL
  useEffect(() => {
    axios
      .get(`${API.STAFF}/${id}`)
      .then((res) => {
        const data = res.data.data.record;
        setTargetStaff(data);
      })
      .catch((err: any) => {
        console.error('[ProfileStaff] error: fetching target staff:', err);
        // remarks: state change for re-render
        setTargetStaff(null);
        setGetError(err.message || '[ProfileStaff] error: Failed to load staff');
      });
  }, [id]);

  //  remarks: query staff tasking
  //  ===========    TODO: currently pending    ============

  //  remarks: display
  if (!pageLoading && targetStaff) {
    return (
      <div id="staff-profile-container">
        <Accordion title="Staff Profile">
          <SectionDetails targetStaff={targetStaff} />
        </Accordion>
      </div>
    );
  } else if (!pageLoading && !targetStaff) {
    return <Error />;
  } else {
    return <LoadSpinner />;
  }
}
