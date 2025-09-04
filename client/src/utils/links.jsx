import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaBell } from 'react-icons/fa'; // ✅ Add FaBell for follow-ups
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  {
    text: 'add job',
    path: '.', // path is relative, so '.' refers to the parent. here it's same as '/dashboard'
    icon: <FaWpforms />,
  },
  {
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'follow-ups', // ✅ NEW LINK
    path: 'follow-ups',
    icon: <FaBell />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },
];

export default links;


