import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const forgetToken = `Bearer ${localStorage.getItem('forgetToken')}`;

// const ServerIP = 'http://192.168.20.109:5001'
const ServerIP = 'https://www.auth.edu2all.in/hms'

// ******************************************************************************************************
//  Login  //
// ******************************************************************************************************


export const loginApi = async (data) => {
    var res = await axios.post(`${ServerIP}/login/all`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getOTPApi = async (data) => {
    var res = await axios.post(`${ServerIP}/login/getOtp`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const verifyOTPApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = forgetToken;
    var res = await axios.post(`${ServerIP}/login/verify-otp`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const setPasswordApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = forgetToken;
    var res = await axios.post(`${ServerIP}/login/setPassword`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  Hotel Data  //
// ******************************************************************************************************


export const createHotelApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/hotel/addHotel`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getHotelByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/hotel/getHotelById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateHotelApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/hotel/updateHotel/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  Book Room API  //
// ******************************************************************************************************


export const getAllBookingApi = async (checkInDate, checkOutDate) => { //
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${ServerIP}/booking/availRoom`, data);
    var res = await axios.get(`${ServerIP}${ServerIP}/booking/getAll?startDate=${checkInDate}&endDate=${checkOutDate}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  Book Room API  //
// ******************************************************************************************************


export const getAvailableRoomApi = async (roomType, noOfRooms, checkInDate, checkOutDate) => { //
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${ServerIP}/booking/availRoom`, data);
    var res = await axios.get(`${ServerIP}/booking/availRoomByRoomType?roomTypeId=${roomType}&totalRoom=${noOfRooms}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  Delayed Checkout Data  //
// ******************************************************************************************************


export const allDelayedCheckout = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getDelayedCheckOut`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  PendingCheckIn Data  //
// ******************************************************************************************************


export const allPendingCheckIn = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getPendingCheckIn`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  UpcomingCheckIn Data  //
// ******************************************************************************************************


export const allUpcomingCheckIn = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getUpcomingCheckIn`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
//  Upcoming Checkout Data  //
// ******************************************************************************************************


export const allUpcomingCheckout = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getUpcomingCheckOut`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const addBookingAPI = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/booking/bookingRoom`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}
// ******************************************************************************************************
//  Amenities Data  //
// ******************************************************************************************************


export const allAmenitiesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/amenites/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addAmenitiesApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getAmenitiesDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/amenites/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateAmenitiesApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateAmenitiesStatus = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}





// ******************************************************************************************************
//  Facilities Data  //
// ******************************************************************************************************


export const allFacilitiesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/facilities/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addFacilitiesApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/facilities/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getFacilitiesDataByIdApi = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/facilities/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateFacilitiesApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/facilities/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
//  Room Data  //
// ******************************************************************************************************


export const allRoomApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/room/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addRoomApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/room/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getRoomDataByIdApi = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/room/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateRoomApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/room/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
//  Premium Services Data  //
// ******************************************************************************************************


export const allPremiumServicesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/preServ/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addPremiumServicesApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/preServ/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getPremiumServicesDataByIdApi = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/preServ/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updatePremiumServicesApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/preServ/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
//  BedTypes Data  //
// ******************************************************************************************************


export const allBedTypesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/bedTypes/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addBedTypesApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/bedTypes/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getBedTypesDataByIdApi = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/bedTypes/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateBedTypesApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/bedTypes/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteBedTypesApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${ServerIP}/bedTypes/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}





// ******************************************************************************************************
//  RoomTypes Data  //
// ******************************************************************************************************


export const allRoomTypesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/roomTypes/getAll`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addRoomTypesApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/roomTypes/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getRoomTypesDataByIdApi = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/roomTypes/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateRoomTypesApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/roomTypes/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
//  Check Out User
// ******************************************************************************************************


export const updateCheckOutOfUserApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/booking/updateCheckOut/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
//  Payment In Booking
// ******************************************************************************************************


export const getPaymentDetailsByBookingId = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/booking/getBookingDetails/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// export const getAllPaymentDetailsByBookingId = async (id) => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${ServerIP}/payment/getBookingDetails/${id}`);
//     if (res) {
//         return res;
//     } else {
//         return [];
//     }
// }

export const getAllPaymentDetailsByBookingId = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/payment/getAllPayments?bookingId=${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const postPaymentByBookingId = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/payment/pay/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
//  Premium Service Booking Module  //
// ******************************************************************************************************

export const addPServiceApi = async (date, roomNo, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/booking/addService?date=${date}&roomNo=${roomNo}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************







// post api 
export const RolePostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/role/create`, formData)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get All api in role
export const GetAllApi = async (page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/role/getAll?page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get by Id 

export const RoleGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${ServerIP}/role/getOne/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// all staff api 

// post api 
export const AllStaffPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/staff/create`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// } get all 
export const AllStaffGetAllApi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/staff/getAll?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

export const AllStaffGetAllByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/staff/getOne/${id}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const AllStaffUpdateByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(`http://89.116.122.211:5001/staff/update/${id}`, data)
    // const res = await axios.patch(`${ServerIP}/staff/update/${id}`, data)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const AllStaffBanApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${ServerIP}/staff/staffBanStatus/${id}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Banned guest 

export const AllStaffBannedApi = async (search,page,rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/getAllBannedGuest?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// active guest 

export const AllActiveguestGetAllApi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/active?search=${search}&page=${page}&size=${rowsPerPage}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// All Guest GetAll Api 

export const AllguestGetAllApi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/getAll?search=${search}&page=${page}&size=${rowsPerPage}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// get by id api 
export const AllActiveguestGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/getOne/${id}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// update api 
export const AllActiveguestUpdateApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${ServerIP}/guest/update/${id}`, formData)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Ban api 
export const BanApi = async (id, status) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${ServerIP}/guest/banUnbanGuestById/${id}?status=${status}`,)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all of eamil 
export const AllActiveEamilUnverifiedapi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/emailUnverified?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// get all of phone 
export const AllActivePhoneUnverifiedapi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/guest/phoneUnverified?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// pending ticket 
export const PendingTicketGetAllApi = async (search,page,rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/support/getPendingTickets?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// update api 
export const PendingTicketUpdateApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${ServerIP}/support/updateTicket/${id}`, formData)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// close ticket 
export const PendingCloseTicketApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/support/closeTicket/${id}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// close ticket 
export const ClosedTicketGetAllApi = async (search, page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/support/getClosedTickets?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Answered ticket 
export const AnsweredTicketGetAllApi = async (search,page,rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/support/getAnsTickets?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Reply ticket 
export const PendingReplyTicketApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/support/replyToTicket/${id}`, formData)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Get ticket by id 
export const GetTicketByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/support/getTicket/${id}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Get all tickets  
export const GetAlTicketApi = async (search,page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/support/getAllTickets?search=${search}&page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Send notification -----------
export const SendAllStaffMail = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/subscribe/sendMailNotification`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Send notification -----------

// Get all tickets  
export const SubscriberGetAllApi = async (page, rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/subscribe/getSubscriberList?page=${page}&size=${rowsPerPage}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// system setting 
export const LogoPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/logo/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// GetById api of logo setting 
export const LogoGetByIdApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/logo/getByHotelId`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// general setting 
export const GeneralPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/general/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Booking action report 
export const BookingActionReport = async (search,page,rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/report/booking/getAll?search=${search}&page=${page}&size=${rowsPerPage}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Received payment report 
export const ReceivedPaymentReport = async (search) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/records/payments/received/getAllPayments?search=${search}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Return payment report 
export const ReturnPaymentReport = async (search) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/records/payments/returned/getAllPayments?search=${search}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Login history 
export const LoginHistory = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Application extra 
export const ApplicationExtra = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/extra/application`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Server extra 
export const ServerExtra = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/extra/server`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

export const CacheExtraPostApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/extra/clearCache`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Cache extra 
export const CacheExtra = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/extra/cache`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Notification history 
export const NotificationHistory = async (search, fromDate, toDate) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/report/notification/history/getAll?search=${search}&fromDate=${fromDate}&toDate=${toDate}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Login history 
export const LogInHistory = async (search, fromDate, toDate) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/report/login/history/getAll?search=${search}&fromDate=${fromDate}&toDate=${toDate}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Notification get by id history 
export const NotificationHistoryGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/report/notification/history/getMessageById/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Report and request post api
export const ReportAndRequestPostApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${ServerIP}/request-report/create`, data)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Report and request get all api
export const ReportAndRequestGetAllApi = async (page,rowsPerPage) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${ServerIP}/request-report/getAll?page=${page}&size=${rowsPerPage}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
