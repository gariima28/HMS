// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import { ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  NightShelterOutlinedIcon,
  ChromeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const manageHotel = {
  id: 'group-HotelsData',
  title: 'Manage Hotels',
  type: 'group',
  children: [
    {
      id: 'manageHotel',
      title: 'Manage Hotels',
      type: 'collapse',
      icon: icons.NightShelterOutlinedIcon,
      children: [
        {
          id: 'amenities',
          title: 'Amenities',
          type: 'item',
          url: '/amenities',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'facilities',
          title: 'Facilities',
          type: 'item',
          url: '/facilities',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'bedTypes',
          title: 'Bed Types',
          type: 'item',
          url: '/bedTypes',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'roomTypes',
          title: 'Room Types',
          type: 'item',
          url: '/roomTypes',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'room',
          title: 'Room',
          type: 'item',
          url: '/room',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'premiumServices',
          title: 'Premium Services',
          type: 'item',
          url: '/premiumServices',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        }
      ],
    }
  ]
};

export default manageHotel;
