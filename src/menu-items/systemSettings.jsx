// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';

// icons
const icons = {
    DashboardOutlined,
    NightShelterOutlinedIcon,
    ChromeOutlined,
    QuestionOutlined
};


const systemSettings = {
    id: 'systemSettings',
    title: 'System Settings',
    type: 'group',
    children: [
        {
            id: 'sysytemsetting',
            title: 'System Setting',
            type: 'item',
            url: '/sysytemsetting',
            icon: icons.ChromeOutlined,
            breadcrumbs: false
        },

    ]
};

export default systemSettings;
