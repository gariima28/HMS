// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';

// icons
const icons = {
  DashboardOutlined,
  NightShelterOutlinedIcon
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
      type: 'item',
      url: '/delayedCheckouts',
      breadcrumbs: false,
      icon: icons.DashboardOutlined,
    },
    {
      id: 'pendingCheckins',
      title: 'Pending Check-Ins',
      type: 'item',
      url: '/pendingCheckins',
      breadcrumbs: false,
      icon: icons.DashboardOutlined,
    },
    {
      id: 'upcomingCheckins',
      title: 'Upcoming Check-Ins',
      type: 'item',
      url: '/upcomingCheckins',
      breadcrumbs: false,
      icon: icons.DashboardOutlined,
    },
    {
      id: 'upcomingCheckouts',
      title: 'Upcoming Checkouts',
      type: 'item',
      url: '/upcomingCheckouts',
      breadcrumbs: false,
      icon: icons.DashboardOutlined,
    },
    {
      id: 'bookRoom',
      title: 'Book Room',
      type: 'item',
      url: '/bookRoom',
      breadcrumbs: false,
      icon: icons.DashboardOutlined,
    },
    {
      id: 'manageBookings',
      title: 'Manage Bookings',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.NightShelterOutlinedIcon,
      children: [
        {
          id: 'todaysBooked',
          title: 'Todays Booked',
          type: 'item',
          url: '/todaysBooked',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'todaysCheckIns',
          title: 'Todays Check-Ins',
          type: 'item',
          url: '/todaysCheckIns',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'todaysCheckout',
          title: 'Todays Checkout',
          type: 'item',
          url: '/todaysCheckout',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'activeBookings',
          title: 'Active Bookings',
          type: 'item',
          url: '/activeBookings',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'checkedOutBookings',
          title: 'Checked Out Bookings',
          type: 'item',
          url: '/checkedOutBookings',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'canceledBookings',
          title: 'Canceled Bookings',
          type: 'item',
          url: '/canceledBookings',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'refundableBookings',
          title: 'Refundable Bookings',
          type: 'item',
          url: '/refundableBookings',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'delayedCheckoutBooking',
          title: 'Delayed Checkout',
          type: 'item',
          url: '/delayedCheckoutBooking',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'allBookings',
          title: 'All Bookings',
          type: 'item',
          url: '/allBookings',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
      ],
    },
    {
      id: 'premiumServices',
      title: 'Premium Services',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.NightShelterOutlinedIcon,
      children: [
        {
          id: 'addService',
          title: 'Add Service',
          type: 'item',
          url: '/addService',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'addedServices',
          title: 'Added Services',
          type: 'item',
          url: '/addedServices',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
      ],
    },
    {
      id: 'onlinePayments',
      title: 'Online Payments',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.NightShelterOutlinedIcon,
      children: [
        {
          id: 'pendingPayments',
          title: 'Pending Payments',
          type: 'item',
          url: '/pendingPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'approvedPayments',
          title: 'Approved Payments',
          type: 'item',
          url: '/approvedPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'successfullPayments',
          title: 'Successfull Payments',
          type: 'item',
          url: '/successfullPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'rejectedPayments',
          title: 'Rejected Payments',
          type: 'item',
          url: '/rejectedPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'failedPayments',
          title: 'Failed Payments',
          type: 'item',
          url: '/failedPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
        {
          id: 'allPayments',
          title: 'All Payments',
          type: 'item',
          url: '/allPayments',
          breadcrumbs: false,
          icon: icons.NightShelterOutlinedIcon
        },
      ],
    },
  ]
};

export default booking;
