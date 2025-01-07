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


const actors = {
    id: 'actors',
    title: 'Actors',
    type: 'group',
    children: [
        {
            id: 'manageStaff',
            title: 'Manage Staff',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.NightShelterOutlinedIcon,
            children: [
                {
                    id: 'allstaff',
                    title: 'All Staff',
                    type: 'item',
                    url: '/allstaff',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'roles',
                    title: 'Roles',
                    type: 'item',
                    url: '/roles',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'manageGuests',
            title: 'Manage Guests',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.NightShelterOutlinedIcon,
            children: [
                {
                    id: 'activeguest',
                    title: 'Active Guest',
                    type: 'item',
                    url: '/activeguest',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'bannedguest',
                    title: 'Banned Guest ',
                    type: 'item',
                    url: '/bannedguest',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'emailunverified',
                    title: 'Email Unverified',
                    type: 'item',
                    url: '/emailunverified',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },

                {
                    id: 'mobileverified',
                    title: 'Mobile Unverified',
                    type: 'item',
                    url: '/mobileverified',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'allguest',
                    title: 'All Guest',
                    type: 'item',
                    url: '/allguest',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'sendnotification',
                    title: 'SendNotification',
                    type: 'item',
                    url: '/sendnotification',
                    icon: icons.ChromeOutlined,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'subscriber',
            title: 'Subscriber',
            type: 'item',
            url: '/subscriberPage',
            icon: icons.ChromeOutlined,
            breadcrumbs: false
        },
    ]
};

export default actors;
