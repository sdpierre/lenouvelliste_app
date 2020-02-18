export function setAppInfo(info) {
    return  {
        type: 'SET_APP_INFO',
        info
    }
}

export function setUserInfo(info) {
    console.log('serUserInfo ----', info)
    return {
        type: 'SET_USER_INFO',
        info
    }
}