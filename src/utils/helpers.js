export const calcTime = time => {
    const hours = Math.floor(time/60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
};

export const convertMoney = money => {
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
    });
    return formatter.format(money);
};

export const FILETFILM_APP_LOGGEDIN = "FILETFILM_APP_LOGGEDIN";

export const renderLogin = () => {
    const flag = localStorage.getItem(FILETFILM_APP_LOGGEDIN);
    console.log('flag', flag);
    return flag;
}