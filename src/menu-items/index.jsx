// project import
import booking from './booking';
import dashboard from './dashboard';
import manageHotel from './manageHotel';

const roleType = localStorage.getItem('roleType')

const menuItems = {
  items: roleType === 'SUPERADMIN' ? [dashboard] : roleType ===  'ADMIN' ? [dashboard, manageHotel, booking] : []
};

export default menuItems;
