// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import { ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  NightShelterOutlinedIcon, ChromeOutlined
};

const roleType = localStorage.getItem('roleType')

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },

    ...(roleType === 'SUPERADMIN' ? [ {
      id: 'hotels',
      title: 'Hotels',
      type: 'collapse',
      icon: icons.NightShelterOutlinedIcon,
      children: [
        {
          id: 'hotelDetails',
          title: 'Hotel Details',
          type: 'item',
          url: '/hotels',
          icon: icons.ChromeOutlined
        },
        {
          id: 'hotelForm',
          title: 'Create Hotels',
          type: 'item',
          url: '/hotelForm/add',
          icon: icons.ChromeOutlined
        }
      ],
    }] : []),
  ]
};

export default dashboard;
