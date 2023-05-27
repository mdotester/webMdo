import axios from 'axios';

const instance = axios.create();

// Req interceptor
instance.interceptors.request.use(function (request) {
    const isLogin = request.url.includes('login');
    if(!isLogin) {
        // Tambah authnya disini
        // request.headers.authorization = 
    }
    return request;
}, function (error) {
    return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;