import { request } from './request'

export function getuserdata() {
    return request({
        url:'/user'
    })
}
export function getuserdatabyID(id) {
    return request({
        method: "post",
        url:`/user/${id}`
    })
}


export function userRegister(formdata) {
    return request({
        method: "post",
        url: '/user',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}


export function userDataChange(id,data) {
    return request({
        method: "put",
        url: `/user/${id}`,
        data,
        headers: { 'Content-Type': 'application/json' }
    })
}

export function userGoodsAdd(id,data) {
    return request({
        method: "post",
        url: `/user/${id}/goodslist`,
        data,
        headers: { 'Content-Type': 'application/json' }
    })
}
export function userGoodsDelete(id,data) {
    return request({
        method: "delete",
        url: `/user/${id}/goodslist`,
        data,
    })
}

// ---------货物---------------------------------------------
// ---------货物---------------------------------------------
export function getGoodsdata() {
    return request({
        method: "get",
        url: '/goods'
    })
}


export function goodsAdd(formdata) {
    return request({
        method: "post",
        url: '/goods',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
export function goodsDelete(id) {
    return request({
        method: "delete",
        url: `/goods/${id}`
    })
}

//---------司机-------------------------------------------------
//---------司机-------------------------------------------------
export function getdriverdata() {
    return request({
        method: "get",
        url: '/driver'
    })
}
export function driversAdd(formdata) {
    return request({
        method: "post",
        url: '/driver',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export function driverDataChange(id,data) {
    return request({
        method: "put",
        url: `/driver/${id}`,
        data,
        headers: { 'Content-Type': 'application/json' }
    })
}


