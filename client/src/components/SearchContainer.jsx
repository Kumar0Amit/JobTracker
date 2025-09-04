import { Form, useSubmit, Link, useSearchParams } from 'react-router-dom';
import { FormRow, FormRowSelect } from '.';
import { useAllJobsContext } from '../pages/AllJobs';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../utils/constants';
import Wrapper from '../assets/styledWrappers/DashboardFormPage';

const debounce = (onChange) => {
  let timeout;
  return (e) => {
    const form = e.currentTarget.form;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(form);
    }, 500); // faster feedback
  };
};

function SearchContainer() {
  const {
    searchValues: { search, jobStatus, jobType, sort },
  } = useAllJobsContext();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const handleReset = () => {
    const basePath = window.location.pathname;
    const preservedParams = new URLSearchParams(searchParams);
    preservedParams.delete('search');
    preservedParams.delete('jobStatus');
    preservedParams.delete('jobType');
    preservedParams.delete('sort');
    preservedParams.delete('page');
    window.location.href = `${basePath}?${preservedParams.toString()}`;
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search specific jobs</h5>
        <div className="form-center">
          <FormRow
            labelText="position or company"
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            defaultValue={sort}
            list={Object.values(JOB_SORT_BY)}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <button
            type="button"
            className="btn form-btn delete-btn"
            onClick={handleReset}
          >
            Reset search values
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer;


