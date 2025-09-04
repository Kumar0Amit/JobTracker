import { useAllJobsContext } from '../pages/AllJobs';
import Job from './Job';
import Wrapper from '../assets/styledWrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

function JobsContainer() {
  const {
    data: { jobs, totalJobs, numOfPages, currentPage },
  } = useAllJobsContext();

  if (jobs.length === 0) {
    return <Wrapper>No jobs to display</Wrapper>;
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'}
      </h5>

      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>

      {numOfPages > 1 && (
        <PageBtnContainer currentPage={currentPage} numOfPages={numOfPages} />
      )}
    </Wrapper>
  );
}

export default JobsContainer;



