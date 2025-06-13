// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

// icons
const icons = {
    DashboardOutlined,
    NightShelterOutlinedIcon,
    ChromeOutlined,
    QuestionOutlined,
    PeopleOutlinedIcon,
    LabelImportantIcon,
    Person2OutlinedIcon,
    ThumbUpOutlinedIcon
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
            icon: icons.PeopleOutlinedIcon,
            children: [
                {
                    id: 'allstaff',
                    title: 'All Staff',
                    type: 'item',
                    url: '/allstaff',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'roles',
                    title: 'Roles',
                    type: 'item',
                    url: '/roles',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'manageGuests',
            title: 'Manage Guests',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.Person2OutlinedIcon,
            children: [
                {
                    id: 'activeguest',
                    title: 'Active Guest',
                    type: 'item',
                    url: '/activeguest',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'bannedguest',
                    title: 'Banned Guest ',
                    type: 'item',
                    url: '/bannedguest',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'emailunverified',
                    title: 'Email Unverified',
                    type: 'item',
                    url: '/emailunverified',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },

                {
                    id: 'mobileverified',
                    title: 'Mobile Unverified',
                    type: 'item',
                    url: '/mobileverified',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'allguest',
                    title: 'All Guest',
                    type: 'item',
                    url: '/allguest',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'sendnotification',
                    title: 'SendNotification',
                    type: 'item',
                    url: '/sendnotification',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'subscriber',
            title: 'Subscriber',
            type: 'mainItem',
            url: '/subscriberPage',
            icon: icons.ThumbUpOutlinedIcon,
            breadcrumbs: false
        },
    ]
};

export default actors;
