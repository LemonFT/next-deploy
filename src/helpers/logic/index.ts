import { len_verify_emails, value_otp_default_v1 } from "@/constants/others";

export const validateEmail = (value: string) => {
    const input = document.createElement('input');
    input.type = 'email';
    input.required = true;
    input.value = value;
    return /\S+@\S+\.\S+/.test(value);
};
const isNumberHasLen = (value: string, lenAllow: number) => {
    const regex = new RegExp(`^\\d{${lenAllow}}$`);
    return regex.test(value) && value.length === lenAllow;
};
export const validateOptEmail = (otp: string) => {
    return isNumberHasLen(otp, len_verify_emails);
}
export const validateFormatDefaultOtp = (otp: string) => {
    return !otp.includes(value_otp_default_v1) && otp.length === len_verify_emails ;
};
export const _useDebounce = (fucntion: Function, delay: number = 1000) => {
    let _idFunctional: any = null;
    return (...args: any[]) => {
        clearTimeout(_idFunctional);
        _idFunctional = setTimeout(() => fucntion(...args), delay);
    };
}
export const navigateUrlWithWindow = (url: string, type: 'push' | 'replace') => {
    if (type === 'push') {
        window.history.pushState({}, '', url);
    } else {
        window.history.replaceState({}, '', url);
    }
}