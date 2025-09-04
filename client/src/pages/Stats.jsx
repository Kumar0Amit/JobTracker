import { useQuery } from '@tanstack/react-query';
import { StatsContainer, ChartsContainer } from '../components';
import apiHandler from '../utils/apiHandler';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await apiHandler.get('/jobs/stats');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

function Stats() {
  const { data } = useQuery(statsQuery);

  const { defaultStats, monthlyApplications, followUpsDue } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} followUpsDue={followUpsDue} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}

export default Stats;


