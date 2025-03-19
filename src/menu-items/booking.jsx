// assets
import { DashboardOutlined } from '@ant-design/icons';
import NightShelterOutlined from '@mui/icons-material/NightShelterOutlined';
import { ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ChromeOutlined,
  NightShelterOutlined
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
      icon: icons.NightShelterOutlined,
      children: [
        {
          id: 'todaysBooked',
          title: 'Todays Booked',
          type: 'item',
          url: '/todaysBooked',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'todaysCheckIns',
          title: 'Todays Check-Ins',
          type: 'item',
          url: '/todaysCheckIns',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'todaysCheckout',
          title: 'Todays Checkout',
          type: 'item',
          url: '/todaysCheckout',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'activeBookings',
          title: 'Active Bookings',
          type: 'item',
          url: '/activeBookings',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'checkedOutBookings',
          title: 'Checked Out Bookings',
          type: 'item',
          url: '/checkedOutBookings',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'canceledBookings',
          title: 'Canceled Bookings',
          type: 'item',
          url: '/canceledBookings',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'refundableBookings',
          title: 'Refundable Bookings',
          type: 'item',
          url: '/refundableBookings',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'delayedCheckoutBooking',
          title: 'Delayed Checkout',
          type: 'item',
          url: '/delayedCheckoutBooking',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'allBookings',
          title: 'All Bookings',
          type: 'item',
          url: '/allBookings',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
      ],
    },
    {
      id: 'premiumServices',
      title: 'Premium Services',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.NightShelterOutlined,
      children: [
        {
          id: 'addService',
          title: 'Add Service',
          type: 'item',
          url: '/addService',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'addedServices',
          title: 'Added Services',
          type: 'item',
          url: '/addedServices',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
      ],
    },
    {
      id: 'onlinePayments',
      title: 'Online Payments',
      type: 'collapse',
      breadcrumbs: false,
      icon: icons.NightShelterOutlined,
      children: [
        {
          id: 'pendingPayments',
          title: 'Pending Payments',
          type: 'item',
          url: '/payments/PENDING',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'approvedPayments',
          title: 'Approved Payments',
          type: 'item',
          url: '/payments/APPROVED',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'successfullPayments',
          title: 'Successfull Payments',
          type: 'item',
          url: '/payments/SUCCESSFUL',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'rejectedPayments',
          title: 'Rejected Payments',
          type: 'item',
          url: '/payments/REJECTED',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'failedPayments',
          title: 'Failed Payments',
          type: 'item',
          url: '/payments/FAILED',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
        {
          id: 'allPayments',
          title: 'All Payments',
          type: 'item',
          url: '/payments/all',
          breadcrumbs: false,
          icon: icons.ChromeOutlined
        },
      ],
    },
  ]
};

export default booking;
