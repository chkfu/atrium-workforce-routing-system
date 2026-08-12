import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionDetails } from './elements/layout';
import Accordion from '../../../elements/Accordion';
import { ISelectWeight } from '../../../utils/types/redux_types';
import axios from 'axios';
import { API } from '../../../config/api';
import Error from '../../../pages/group_navigation/Error';
import LoadSpinner from '../../../elements/LoadSpinner';
import { PAGE_PRELOAD_TIME } from '../../../config/constant';
import { HREF } from '../../../config/href';
import { ProfileBackButton } from '../../../elements/BackButtons';

export default function ProfileSelectWeight(): JSX.Element {
  //  remarks: identify the specific department profile to be viewed
  const { id } = useParams<{ id: string }>();

  //  remarks: local state management
  const [targetSelectWeight, setTargetSelectWeight] = useState<ISelectWeight | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [, setIsLoading] = useState<boolean>(false);
  const [, setGetError] = useState<string>('');

  //  remarks: loading time with timeout error page
  useEffect(() => {
    const page_timeout = setTimeout(() => setPageLoading(false), PAGE_PRELOAD_TIME);
    //  learnt: be reminded to set clear timeout
    return () => clearTimeout(page_timeout);
  }, [id])

  //  remarks: querying select weighting data from SQL
  useEffect(() => {
    axios
      .get(`${API.SELECT_WEIGHTING}/${id}`)
      .then((res) => {
        const data = res.data.data.record;
        setTargetSelectWeight(data);
      })
      .catch((err: any) => {
        console.error('[ProfileSelectWeight] error: fetching target select weight:', err);
        // remarks: state change for re-render
        setTargetSelectWeight(null);
        setGetError(err.message || '[ProfileSelectWeight] error: Failed to load select weight');
      });
  }, [id]);

  //  remarks: display
  if (targetSelectWeight) {
    return (
      <div id="select-weight-profile-container">
        <ProfileBackButton path_staff={HREF.MANAGE_SELECT_WEIGHT} path_candidate={HREF.CANDIDATE_DASHBOARD} />
        <Accordion title="Selection Weight Profile">
          <SectionDetails targetSelectWeight={targetSelectWeight}  setIsLoading={setIsLoading} />
        </Accordion>
      </div>
    );
  } else if (pageLoading) {
    return <LoadSpinner />;
  } else {
    return <Error />;
  }
}
