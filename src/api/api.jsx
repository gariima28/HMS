import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const Domain= 'http://89.116.122.211:5001';
// const LocalGirjesh = 'http://192.168.20.109:5001'
const ServerIP = 'http://89.116.122.211:5001'

// ******************************************************************************************************
                            //  Login  //
// ******************************************************************************************************


export const loginApi = async(data) => {
    var res = await axios.post(`${ServerIP}/login/all`,data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  Hotel Data  //
// ******************************************************************************************************


export const createHotelApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/hotel/addHotel`,data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  Book Room API  //
// ******************************************************************************************************


export const getAvailableRoomApi = async(roomType, noOfRooms, checkInDate, checkOutDate) => { //
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${ServerIP}/booking/availRoom`, data);
    var res = await axios.get(`${ServerIP}/booking/availRoomByRoomType?roomTypeId=${roomType}&totalRoom=${noOfRooms}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  Delayed Checkout Data  //
// ******************************************************************************************************


export const allDelayedCheckout = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getDelayedCheckOut`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  PendingCheckIn Data  //
// ******************************************************************************************************


export const allPendingCheckIn = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getPendingCheckIn`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  UpcomingCheckIn Data  //
// ******************************************************************************************************


export const allUpcomingCheckIn = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getUpcomingCheckIn`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            //  Upcoming Checkout Data  //
// ******************************************************************************************************


export const allUpcomingCheckout = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/booking/getUpcomingCheckOut`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const addBookingAPI = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/booking/bookingRoom`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}
// ******************************************************************************************************
                            //  Amenities Data  //
// ******************************************************************************************************


export const allAmenitiesApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/amenites/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addAmenitiesApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getAmenitiesDataByIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/amenites/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateAmenitiesApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateAmenitiesStatus = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/amenites/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}





// ******************************************************************************************************
                            //  Facilities Data  //
// ******************************************************************************************************


export const allFacilitiesApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/facilities/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addFacilitiesApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/facilities/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getFacilitiesDataByIdApi = async(id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/facilities/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateFacilitiesApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/facilities/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}



// ******************************************************************************************************
                            //  Room Data  //
// ******************************************************************************************************


export const allRoomApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/room/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addRoomApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/room/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getRoomDataByIdApi = async(id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/room/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateRoomApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/room/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}




// ******************************************************************************************************
                            //  Premium Services Data  //
// ******************************************************************************************************


export const allPremiumServicesApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/preServ/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addPremiumServicesApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/preServ/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getPremiumServicesDataByIdApi = async(id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/preServ/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updatePremiumServicesApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${ServerIP}/preServ/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}



// ******************************************************************************************************
                            //  BedTypes Data  //
// ******************************************************************************************************


export const allBedTypesApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/bedTypes/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addBedTypesApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/bedTypes/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getBedTypesDataByIdApi = async(id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/bedTypes/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateBedTypesApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/bedTypes/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deleteBedTypesApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${ServerIP}/bedTypes/delete/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}





// ******************************************************************************************************
                            //  RoomTypes Data  //
// ******************************************************************************************************


export const allRoomTypesApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/roomTypes/getAll`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addRoomTypesApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/roomTypes/add`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getRoomTypesDataByIdApi = async(id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${ServerIP}/roomTypes/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateRoomTypesApi = async(id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/roomTypes/update/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}





// ******************************************************************************************************
                            //  Premium Service Booking Module  //
// ******************************************************************************************************

export const addPServiceApi = async(date, roomNo, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${ServerIP}/booking/addService?date=${date}&roomNo=${roomNo}`,data);
    if (res) {
        return res;
    }else{
        return [];
    }
}
