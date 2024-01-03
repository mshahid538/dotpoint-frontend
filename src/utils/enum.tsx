export enum responseEnum {
    SuccessCode = 200,
    ValidationCode = 404,
    ValidationCode2 = 400,
    ValidationCode3 = 409,
    InternalServerCode = 500,
    UnAuth = 401,
    TokenExpired = 410,
    TokenSuccess,
}
export const InvalidNumberKeys = [
    "KeyE",
    "Minus",
    "NumpadSubtract",
    "NumpadAdd",
    "NumpadDecimal",
    "Period"
];

export const fileExtensionEnum = ["png", "jpg", "jpeg", "webp", 'svg']