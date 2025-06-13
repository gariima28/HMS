// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';// icons
const icons = {
    DashboardOutlined,
    NightShelterOutlinedIcon,
    ChromeOutlined,
    QuestionOutlined,
    SettingsRoundedIcon
};


const systemSettings = {
    id: 'systemSettings',
    title: 'System Settings',
    type: 'group',
    children: [
        {
            id: 'sysytemsetting',
            title: 'System Setting',
            type: 'mainItem',
            url: '/sysytemsetting',
            icon: icons.SettingsRoundedIcon,
            breadcrumbs: false
        },

    ]
};

export default systemSettings;
