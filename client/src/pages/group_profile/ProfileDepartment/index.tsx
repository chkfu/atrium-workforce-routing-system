import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SectionDetails } from './elements/layout';
import Accordion from '../../../elements/Accordion';
import { IDepartment } from '../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../config/api';
import Error from '../../../pages/group_navigation/Error';
import LoadSpinner from '../../../elements/LoadSpinner';
import { PAGE_PRELOAD_TIME } from '../../../config/constant';

export default function ProfileDepartment(): JSX.Element {
  //  remarks: identify the specific department profile to be viewed
  const { id } = useParams<{ id: string }>();

  //  remarks: dispatch for Redux
  const dispatch = useDispatch();

  //  remarks: local state management
  const [targetDept, setTargetDept] = useState<IDepartment | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [getError, setGetError] = useState<any | null>(null);

  //  remarks: loading time with timeout error page
  useEffect(() => {
    const page_timeout = setTimeout(() => setPageLoading(false), PAGE_PRELOAD_TIME);
    //  learnt: be reminded to set clear timeout
    return () => clearTimeout(page_timeout);
  }, [id])

  //  remarks: querying department data from SQL
  useEffect(() => {
    axios
      .get(`${API.DEPARTMENTS}/${id}`)
      .then((res) => {
        const data = res.data.data.record;
        setTargetDept(data);
      })
      .catch((err: any) => {
        console.error('[ProfileDept] error: fetching target department:', err);
        // remarks: state change for re-render
        setTargetDept(null);
        setGetError(err.message || '[ProfileDept] error: Failed to load staff');
      });
  }, [id]);

  //  remarks: query select criteria - department-based
  // useEffect(() => {
  //   axios
  //     .get(`${API.SELECT_CRITERIA}/${id}`)
  //     .then((res) => {
  //       const data = res.data.data.record;
  //       setTargetSltCriteria(data);
  //     })
  //     .catch((err: any) => {
  //       const err_msg = `[ProfileDept] error: Failed to load select criteria.`
  //       console.error(err_msg, err);
  //       // remarks: state change for re-render
  //       setTargetSltCriteria(null);
  //       setGetError(err.message || err_msg);
  //     });
  // }, [id]);

  //  remarks: display
  if (targetDept) {
    return (
      <div id="dept-profile-container">
        <Accordion title="Department Profile">
          <SectionDetails targetDept={targetDept} />
        </Accordion>
      </div>
    );
  } else if (pageLoading) {
    return <LoadSpinner />;
  } else {
    return <Error />;
  }
}
