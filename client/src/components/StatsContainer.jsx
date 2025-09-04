import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
  FaBell,
} from 'react-icons/fa';
import Wrapper from '../assets/styledWrappers/StatsContainer';
import StatItem from './StatItem';

function StatsContainer({ defaultStats, followUpsDue }) {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bg: '#fef3c7',
      height:'150px'
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bg: '#ffeeee',
    },
    {
      title: 'follow-ups due',
      count: followUpsDue || 0,
      icon: <FaBell />,
      color: '#0ea5e9',
      bg: '#e0f2fe',
      marginleft:'30px'
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </Wrapper>
  );
}

export default StatsContainer;


