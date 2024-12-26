// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';

// icons
const icons = {
  DashboardOutlined,
  NightShelterOutlinedIcon
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
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'hotelForm',
          title: 'Create Hotels',
          type: 'item',
          url: '/hotelForm/add',
          icon: icons.NightShelterOutlinedIcon
        }
      ],
    }] : []),
  ]
};

export default dashboard;
