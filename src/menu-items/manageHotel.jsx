// assets
import { ChromeOutlined, DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';

import { buildIcon } from 'iconify-icon';
import BusinessIcon from '@mui/icons-material/Business';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

// icons
const icons = {
  DashboardOutlined,
  // buildIcon,
  NightShelterOutlinedIcon,
  ChromeOutlined, BusinessIcon, LabelImportantIcon
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
      // icon: <Icon icon="solar:buildings-bold" width="24" height="24" style="color: #e10e0e" />,
      icon: icons.BusinessIcon,
      children: [
        {
          id: 'amenities',
          title: 'Amenities',
          type: 'item',
          url: '/amenities',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'facilities',
          title: 'Facilities',
          type: 'item',
          url: '/facilities',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'bedTypes',
          title: 'Bed Types',
          type: 'item',
          url: '/bedTypes',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'roomTypes',
          title: 'Room Types',
          type: 'item',
          url: '/roomTypes',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'room',
          title: 'Room',
          type: 'item',
          url: '/room',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'premiumServices',
          title: 'Premium Services',
          type: 'item',
          url: '/premiumServices',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        }
      ],
    }
  ]
};

export default manageHotel;
