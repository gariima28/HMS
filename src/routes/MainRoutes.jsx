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
import Payments from 'pages/booking/Payments';
import AddedPServices from 'pages/booking/AddedPServices';
import BookingDetailsPage from 'pages/booking/BookingDetailsPage';
import AddUpdateRoomType from 'pages/manageHotel/AddUpdateRoomType';
import CancelBookingPage from 'pages/booking/CancelBookingPage';
import CheckOutInBookings from 'pages/booking/CheckOutInBookings';
import PremiumServicesInBookings from 'pages/booking/PremiumServicesInBookings';
import PaymentInBookings from 'pages/booking/PaymentInBookings';
import BookedRoomInBookings from 'pages/booking/BookedRoomInBookings';
import PaymentStatusDetailsPage from 'pages/booking/PaymentStatusDetailsPage';



// Saqib Pages
import AllStaff from 'pages/extra-pages/allStaff';
import Roles from 'pages/extra-pages/roles';
import AddRolesPage from 'pages/extra-pages/addRolesPage';
import EditRolesPage from 'pages/extra-pages/editRolesPage';
import ActiveGuest from 'pages/extra-pages/activeGuest';
import GuestDetails from 'pages/extra-pages/guestDetails';
import BannedGuest from 'pages/extra-pages/bannedguest';
import EmailUnverified from 'pages/extra-pages/emailUnverified';
import EmailVerDetails from 'pages/extra-pages/emailVerDetails';
import MobileVerified from 'pages/extra-pages/mobileUnverified';
import AllGuest from 'pages/extra-pages/allGuest';
import SendNotification from 'pages/extra-pages/sendNotification';
import SubscriberPage from 'pages/extra-pages/subscriberPage';
import Subscriber from 'pages/extra-pages/subscriber';
import PendingTicket from 'pages/extra-pages/pendingTicket';
import ClosedTicket from 'pages/extra-pages/closedTicket';
import AnswerTicket from 'pages/extra-pages/answerTicket';
import BookingAction from 'pages/extra-pages/bookingAction';
import ReceivedPayment from 'pages/extra-pages/receivedPayment';
import ReturnPayment from 'pages/extra-pages/returnPayment';
import LoginHistory from 'pages/extra-pages/loginHistory';
import NotificationHistory from 'pages/extra-pages/notificationHistory';
import ExtraApplication from 'pages/extra-pages/extraApplication';
import ReplyTicket from 'pages/extra-pages/replyTicket';
import ExtraServer from 'pages/extra-pages/extraServer';
import ExtraCache from 'pages/extra-pages/extraCache';
import ReportRequest from 'pages/extra-pages/reportRequest';
import ExtraUpdate from 'pages/extra-pages/extraUpdate';
import SystemSetting from 'pages/extra-pages/systemSetting';
import GeneralSettingPage from 'pages/extra-pages/generalSettinngPage';
import SystemSettinglogoFavicon from 'pages/extra-pages/systemSettingLogoFavi';
import SentMail from 'pages/extra-pages/sentMail';
import AllTicket from 'pages/extra-pages/allTicket';
import Error500Page from 'components/Error500Page';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));


const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'hotels',
      element: <HotelDetails />
    },
    {
      path: 'hotelForm/:id',
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
      path: 'addService/:id',
      element: <AddPServices />
    },
    {
      path: 'addedServices',
      element: <AddedPServices />
    },
    {
      path: 'payments/:id',
      element: <Payments />
    },
    {
      path: 'detailspayments/:paymentId',
      element: <PaymentStatusDetailsPage />
    },
    // {
    //   path: 'error-500',
    //   element: <Error500Page />
    // },
    // {
    //   path: 'payments/approved',
    //   element: <ApprovedPayments />
    // },
    // {
    //   path: 'payments/successfull',
    //   element: <SuccessfulPayments />
    // },
    // {
    //   path: 'payments/rejected',
    //   element: <RejectedPayments />
    // },
    // {
    //   path: 'payments/failed',
    //   element: <FailedPayments />
    // },
    // {
    //   path: 'payments/all',
    //   element: <AllPayments />
    // },
    {
      path: '/*',
      element: <DashboardDefault />
    },

    // Saqib
    {
      path: 'allstaff',
      element: <AllStaff />
    },
    {
      path: 'roles',
      element: <Roles />
    },
    {
      path: 'addrolespage',
      element: <AddRolesPage />
    },
    {
      path: 'editrolespage/:id',
      element: <EditRolesPage />
    },
    {
      path: 'activeguest',
      element: <ActiveGuest />
    },
    {
      path: 'guestdetails/:id',
      element: <GuestDetails />
    },
    {
      path: 'bannedguest',
      element: <BannedGuest />
    },
    {
      path: 'emailunverified',
      element: <EmailUnverified />
    },
    {
      path: 'emailverdetails',
      element: <EmailVerDetails />
    },
    {
      path: 'mobileverified',
      element: <MobileVerified />
    },
    {
      path: 'allguest',
      element: <AllGuest />
    },
    {
      path: 'sendnotification',
      element: <SendNotification />
    },
    {
      path: 'subscriber',
      element: <Subscriber />
    },
    {
      path: 'subscriberPage',
      element: <SubscriberPage />
    },
    {
      path: 'pendingticket',
      element: <PendingTicket />
    },
    {
      path: 'closedticket',
      element: <ClosedTicket />
    },
    {
      path: 'answertickets',
      element: <AnswerTicket />
    },
    {
      path: 'allticket',
      element: <AllTicket />
    },
    {
      path: 'bookingaction',
      element: <BookingAction />
    },
    {
      path: 'receivedpayment',
      element: <ReceivedPayment />
    },
    {
      path: 'returnpayment',
      element: <ReturnPayment />
    },
    {
      path: 'loginhistory',
      element: <LoginHistory />
    },
    {
      path: 'notificationhistory',
      element: <NotificationHistory />
    },
    {
      path: 'extraapplication',
      element: <ExtraApplication />
    },
    {
      path: 'extraserver',
      element: <ExtraServer />
    },
    {
      path: 'extracache',
      element: <ExtraCache />
    },
    {
      path: 'reportrequest',
      element: <ReportRequest />
    },
    {
      path: 'extraupdate',
      element: <ExtraUpdate />
    },
    {
      path: 'sysytemsetting',
      element: <SystemSetting />
    },
    {
      path: 'generalsettingPage',
      element: <GeneralSettingPage />
    },
    {
      path: 'systemsettinglogofavicon',
      element: <SystemSettinglogoFavicon />
    },
    {
      path: 'sentMail',
      element: <SentMail />
    },
    {
      // path: 'replyticket/:id',
      path: 'replyticket/:id',
      element: <ReplyTicket />
    }
  ]
};

export default MainRoutes;
