import { environment } from "src/environments/environment";


const BASE_ENDPOINT_URL =  environment.BASE_URL+environment.API_ENDPOINT;

export const API = {
    tourList : BASE_ENDPOINT_URL + 'tour/getList',
    getTour: BASE_ENDPOINT_URL + 'tour',
    login:  BASE_ENDPOINT_URL + 'signin',
    user:  BASE_ENDPOINT_URL + 'user',
    userUpdate:  BASE_ENDPOINT_URL + 'user/update',
    updatePassword:  BASE_ENDPOINT_URL + 'updatePassword',
    bookingTour: BASE_ENDPOINT_URL + 'tour/payment',
    createBooking: BASE_ENDPOINT_URL + 'createBookings',
    userList: BASE_ENDPOINT_URL + 'user/list',
    createChat: BASE_ENDPOINT_URL + 'createChat',
    fetchUserChat: BASE_ENDPOINT_URL + 'fetchUserChat',
    saveMessage: BASE_ENDPOINT_URL + 'saveMessage',
    fetchChatList: BASE_ENDPOINT_URL + 'fetchChat',
}