// project import
import booking from './booking';
import dashboard from './dashboard';
import manageHotel from './manageHotel';
import actors from './actors';
import supportReport from './supportReport';
import systemSettings from './systemSettings';
import extraaa from './extraaa';

const roleType = localStorage.getItem('roleType')

const menuItems = {
  items: roleType === 'SUPERADMIN' ? [dashboard] : roleType === 'ADMIN' ? [dashboard, manageHotel, booking, actors, supportReport, systemSettings, extraaa ] : []
};

export default menuItems;
