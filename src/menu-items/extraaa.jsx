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


const extraaa = {
    id: 'extraaa',
    title: 'Extra',
    type: 'group',
    children: [
        {
            id: 'extra',
            title: 'Extra',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.NightShelterOutlinedIcon,
            children: [
                {
                    id: 'extraapplication',
                    title: 'Extra Application',
                    type: 'item',
                    url: '/extraapplication',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'extraserver',
                    title: 'Extra Server',
                    type: 'item',
                    url: '/extraserver',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'extracache',
                    title: 'Extra Cache',
                    type: 'item',
                    url: '/extracache',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'extraupdate',
                    title: 'Extra Update',
                    type: 'item',
                    url: '/extraupdate',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'reportrequest',
            title: 'Report Request',
            type: 'item',
            url: '/reportrequest',
            icon: icons.ChromeOutlined,
            breadcrumbs: false
        },

    ]
};

export default extraaa;
