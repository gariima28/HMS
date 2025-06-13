// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlined from '@mui/icons-material/NightShelterOutlined';
import { ChromeOutlined } from '@ant-design/icons';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import KeyIcon from '@mui/icons-material/Key';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// icons
const icons = {
  DashboardOutlined,
  ChromeOutlined,
  NightShelterOutlined,
  CalendarMonthIcon,
  PendingActionsIcon,
  UpcomingIcon,
  ShoppingCartCheckoutIcon,
  KeyIcon,
  AccountBalanceWalletIcon,
  SupportAgentIcon,
  LabelImportantIcon,
  AutoStoriesIcon

};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //


const booking = {
  id: 'BookingData',
  title: 'Booking',
  type: 'group',
  children: [
    {
      id: 'delayedCheckouts',
      title: 'Delayed Checkouts',
      type: 'mainItem',
      url: '/delayedCheckouts',
      breadcrumbs: false,
      icon: icons.CalendarMonthIcon,

    },
    {
      id: 'pendingCheckins',
      title: 'Pending Check-Ins',
      type: 'mainItem',
      url: '/pendingCheckins',
      breadcrumbs: false,
      icon: icons.PendingActionsIcon,
    },
    {
      id: 'upcomingCheckins',
      title: 'Upcoming Check-Ins',
      type: 'mainItem',
      url: '/upcomingCheckins',
      breadcrumbs: false,
      icon: icons.UpcomingIcon,
    },
    {
      id: 'upcomingCheckouts',
      title: 'Upcoming Checkouts',
      type: 'mainItem',
      url: '/upcomingCheckouts',
      breadcrumbs: false,
      icon: icons.ShoppingCartCheckoutIcon,
    },
    {
      id: 'bookRoom',
      title: 'Book Room',
      type: 'mainItem',
      url: '/bookRoom',
      breadcrumbs: false,
      icon: icons.KeyIcon,
    },
    {
      id: 'manageBookings',
      title: 'Manage Bookings',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.AutoStoriesIcon,
      children: [
        {
          id: 'todaysBooked',
          title: 'Todays Booked',
          type: 'item',
          url: '/todaysBooked',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'todaysCheckIns',
          title: 'Todays Check-Ins',
          type: 'item',
          url: '/todaysCheckIns',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'todaysCheckout',
          title: 'Todays Checkout',
          type: 'item',
          url: '/todaysCheckout',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'activeBookings',
          title: 'Active Bookings',
          type: 'item',
          url: '/activeBookings',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'checkedOutBookings',
          title: 'Checked Out Bookings',
          type: 'item',
          url: '/checkedOutBookings',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'canceledBookings',
          title: 'Canceled Bookings',
          type: 'item',
          url: '/canceledBookings',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'refundableBookings',
          title: 'Refundable Bookings',
          type: 'item',
          url: '/refundableBookings',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'delayedCheckoutBooking',
          title: 'Delayed Checkout',
          type: 'item',
          url: '/delayedCheckoutBooking',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'allBookings',
          title: 'All Bookings',
          type: 'item',
          url: '/allBookings',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
      ],
    },
    {
      id: 'premiumServices',
      title: 'Premium Services',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.SupportAgentIcon,
      children: [
        {
          id: 'addService',
          title: 'Add Service',
          type: 'item',
          url: '/addService/add',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'addedServices',
          title: 'Added Services',
          type: 'item',
          url: '/addedServices',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
      ],
    },
    {
      id: 'onlinePayments',
      title: 'Online Payments',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.AccountBalanceWalletIcon,
      children: [
        {
          id: 'pendingPayments',
          title: 'Pending Payments',
          type: 'item',
          url: '/payments/PENDING',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'approvedPayments',
          title: 'Approved Payments',
          type: 'item',
          url: '/payments/ACCEPTED',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'successfullPayments',
          title: 'Successfull Payments',
          type: 'item',
          url: '/payments/SUCCESSFUL',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'rejectedPayments',
          title: 'Rejected Payments',
          type: 'item',
          url: '/payments/REJECTED',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        // abc

        {
          id: 'failedPayments',
          title: 'Failed Payments',
          type: 'item',
          url: '/payments/FAILED',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
        {
          id: 'allPayments',
          title: 'All Payments',
          type: 'item',
          url: '/payments/all',
          breadcrumbs: false,
          icon: icons.LabelImportantIcon
        },
      ],
    },
  ]
};

export default booking;
