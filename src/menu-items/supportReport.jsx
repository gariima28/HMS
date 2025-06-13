// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

// icons
const icons = {
    DashboardOutlined,
    NightShelterOutlinedIcon,
    ChromeOutlined,
    QuestionOutlined,
    LocalActivityOutlinedIcon,
    LabelImportantIcon,
    InsertChartOutlinedIcon

};


const supportReport = {
    id: 'support&report',
    title: 'Support & Report',
    type: 'group',
    children: [
        {
            id: 'supportTicket',
            title: 'Support Ticket',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.LocalActivityOutlinedIcon,
            children: [
                {
                    id: 'pendingticket',
                    title: 'Pending Ticket',
                    type: 'item',
                    url: '/pendingticket',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'closedticket',
                    title: 'Closed Tickets',
                    type: 'item',
                    url: '/closedticket',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'answertickets',
                    title: 'Answer Tickets',
                    type: 'item',
                    url: '/answertickets',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'allticket',
                    title: 'All Tickets',
                    type: 'item',
                    url: '/allticket',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'report',
            title: 'Report',
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.InsertChartOutlinedIcon,
            children: [
                {
                    id: 'bookingaction',
                    title: 'Booking Action',
                    type: 'item',
                    url: '/bookingaction',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'receivedpayment',
                    title: 'Received Payment',
                    type: 'item',
                    url: '/receivedpayment',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'returnpayment',
                    title: 'Return Payment',
                    type: 'item',
                    url: '/returnpayment',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'loginhistory',
                    title: 'LogIn History',
                    type: 'item',
                    url: '/loginhistory',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'notificationhistory',
                    title: 'Notification History',
                    type: 'item',
                    url: '/notificationhistory',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
            ],
        },
    ]
};

export default supportReport;
