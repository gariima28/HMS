// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import BugReportIcon from '@mui/icons-material/BugReport';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
// icons
const icons = {
    DashboardOutlined,
    NightShelterOutlinedIcon,
    ChromeOutlined,
    QuestionOutlined,
    BugReportIcon,
    LabelImportantIcon,
    AddRoadIcon
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
            icon: icons.AddRoadIcon,
            children: [
                {
                    id: 'extraapplication',
                    title: 'Extra Application',
                    type: 'item',
                    url: '/extraapplication',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'extraserver',
                    title: 'Extra Server',
                    type: 'item',
                    url: '/extraserver',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'extracache',
                    title: 'Extra Cache',
                    type: 'item',
                    url: '/extracache',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
                {
                    id: 'extraupdate',
                    title: 'Extra Update',
                    type: 'item',
                    url: '/extraupdate',
                    icon: icons.LabelImportantIcon,
                    breadcrumbs: false
                },
            ],
        },
        {
            id: 'reportrequest',
            title: 'Report Request',
            type: 'mainItem',
            url: '/reportrequest',
            icon: icons.BugReportIcon,
            breadcrumbs: false
        },

    ]
};

export default extraaa;
