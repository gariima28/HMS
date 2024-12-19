import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import HotelDetails from 'pages/hotels/HotelDetails';
import CreateHotel from 'pages/hotels/CreateHotel';
import NoPageFound from 'pages/NoPageFound';
import Amenities from 'pages/manageHotel/Amenities';
import Facilities from 'pages/manageHotel/Facilities';
import BedTypes from 'pages/manageHotel/BedTypes';
import PremiumServices from 'pages/manageHotel/PremiumServices';
import Room from 'pages/manageHotel/Room';
import RoomTypes from 'pages/manageHotel/RoomTypes';
import DelayedCheckouts from 'pages/booking/DelayedCheckouts';
import PendingCheckIns from 'pages/booking/PendingCheckIns';
import UpcomingCheckIns from 'pages/booking/UpcomingCheckIns';
import UpcomingCheckouts from 'pages/booking/UpcomingCheckouts';
import BookRoom from 'pages/booking/BookRoom';
import AddPServices from 'pages/booking/AddPServices';
import TodaysBooked from 'pages/booking/TodaysBooked';
import TodaysCheckIn from 'pages/booking/TodaysCheckIn';
import TodaysCheckout from 'pages/booking/TodaysCheckout';
import ActiveBookings from 'pages/booking/ActiveBookings';
import CheckedOutBookings from 'pages/booking/CheckedOutBookings';
import CanceledBookings from 'pages/booking/CanceledBookings';
import RefundableBookings from 'pages/booking/RefundableBookings';
import DelayedCheckoutBooking from 'pages/booking/DelayedCheckoutBooking';
import AllBookings from 'pages/booking/AllBookings';
import PendingPayments from 'pages/booking/PendingPayments';
import ApprovedPayments from 'pages/booking/ApprovedPayments';
import SuccessfulPayments from 'pages/booking/SuccessfulPayments';
import RejectedPayments from 'pages/booking/RejectedPayments';
import FailedPayments from 'pages/booking/FailedPayments';
import AllPayments from 'pages/booking/AllPayments';
import AddedPServices from 'pages/booking/AddedPServices';
import BookingDetailsPage from 'pages/booking/BookingDetailsPage';
import AddUpdateRoomType from 'pages/manageHotel/AddUpdateRoomType';
import CancelBookingPage from 'pages/booking/CancelBookingPage';
import CheckOutInBookings from 'pages/booking/CheckOutInBookings';
import PremiumServicesInBookings from 'pages/booking/PremiumServicesInBookings';
import PaymentInBookings from 'pages/booking/PaymentInBookings';
import BookedRoomInBookings from 'pages/booking/BookedRoomInBookings';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const SamplePage1 = Loadable(lazy(() => import('pages/extra-pages/sample-page1')));
const SamplePage2 = Loadable(lazy(() => import('pages/extra-pages/sample-page2')));
const SamplePage3 = Loadable(lazy(() => import('pages/extra-pages/sample-page3')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'color',
      element: <Color />
    },
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'hotels',
      element: <HotelDetails />
    },
    {
      path: 'createHotel',
      element: <CreateHotel />
    },
    {
      path: 'amenities',
      element: <Amenities />
    },
    {
      path: 'facilities',
      element: <Facilities />
    },
    {
      path: 'bedTypes',
      element: <BedTypes />
    },
    {
      path: 'room',
      element: <Room />
    },
    {
      path: 'roomTypes',
      element: <RoomTypes />
    },
    {
      path: 'addUpdateRoomType/:id',
      element: <AddUpdateRoomType />
    },
    {
      path: 'premiumServices',
      element: <PremiumServices />
    },
    {
      path: 'delayedCheckouts',
      element: <DelayedCheckouts />
    },
    {
      path: 'pendingCheckins',
      element: <PendingCheckIns />
    },
    {
      path: 'upcomingCheckins',
      element: <UpcomingCheckIns />
    },
    {
      path: 'upcomingCheckouts',
      element: <UpcomingCheckouts />
    },
    {
      path: 'bookRoom',
      element: <BookRoom />
    },
    {
      path: 'todaysBooked',
      element: <TodaysBooked />
    },
    {
      path: 'todaysCheckIns',
      element: <TodaysCheckIn />
    },
    {
      path: 'todaysCheckout',
      element: <TodaysCheckout />
    },
    {
      path: 'activeBookings',
      element: <ActiveBookings />
    },
    {
      path: 'checkedOutBookings',
      element: <CheckedOutBookings />
    },
    {
      path: 'canceledBookings',
      element: <CanceledBookings />
    },
    {
      path: 'refundableBookings',
      element: <RefundableBookings />
    },
    {
      path: 'delayedCheckoutBooking',
      element: <DelayedCheckoutBooking />
    },
    {
      path: 'allBookings',
      element: <AllBookings />
    },
    {
      path: 'bookedRoomInBookings/:id',
      element: <BookedRoomInBookings />
    },
    {
      path: 'premiumServicesInBookings/:id',
      element: <PremiumServicesInBookings />
    },
    {
      path: 'paymentInBookings/:id',
      element: <PaymentInBookings />
    },
    {
      path: 'cancelBookings/:id',
      element: <CancelBookingPage />
    },
    {
      path: 'checkOutBookings/:id',
      element: <CheckOutInBookings />
    },
    {
      path: 'bookingDetailsPage/:id',
      element: <BookingDetailsPage />
    },
    {
      path: 'addService',
      element: <AddPServices />
    },
    {
      path: 'addedServices',
      element: <AddedPServices />
    },
    {
      path: 'pendingPayments',
      element: <PendingPayments />
    },
    {
      path: 'approvedPayments',
      element: <ApprovedPayments />
    },
    {
      path: 'successfullPayments',
      element: <SuccessfulPayments />
    },
    {
      path: 'rejectedPayments',
      element: <RejectedPayments />
    },
    {
      path: 'failedPayments',
      element: <FailedPayments />
    },
    {
      path: 'allPayments',
      element: <AllPayments />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: '/*',
      element: <NoPageFound />
    }
  ]
};

export default MainRoutes;
