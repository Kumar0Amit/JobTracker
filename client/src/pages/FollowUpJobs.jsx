import { useLoaderData } from 'react-router-dom';
import FollowUpJobsContainer from '../components/FollowUpJobsContainer';
import PageBtnContainer from '../components/PageBtnContainer';
import apiHandler from '../utils/apiHandler';

// ✅ Loader function with pagination support
export const loader = (queryClient) => async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;

  try {
    const { data } = await apiHandler.get(`/jobs/follow-ups?page=${page}`);
    return data; // contains jobs, totalJobs, numOfPages, currentPage
  } catch (error) {
    throw new Response('Error loading follow-up jobs', { status: 500 });
  }
};

// ✅ Component
function FollowUpJobs() {
  const { jobs, totalJobs, numOfPages, currentPage } = useLoaderData();

  return (
    <section className="dashboard-page">
      <h3 className="page-title">Follow-Up Reminders</h3>
      <FollowUpJobsContainer jobs={jobs} />
      {numOfPages > 1 && (
        <PageBtnContainer currentPage={currentPage} numOfPages={numOfPages} />
      )}
    </section>
  );
}

export default FollowUpJobs;


