

 //API Constants

 export const BASE_URL = "http://lenouvelis.com/api/";

 export const kREGISTRATION_API = "register";
 export const kGETCOUNTRYLIST_API = "get-countries";

 export const kLOGIN_API = "login";

 export const kFORGOTPW_API = "forget-password";
 export const kVERIFYOTP_API = "verify-otp";
 export const kRESENDOTP_API = "resend-otp";
 export const kRESETPW_API = "reset-password";

 export const kGETPROFILE_API = "get-profile";
 export const kUPDATEPROFILE_API = "update-profile";
 export const kUPDATEPROFILEIMAGE_API = "update-image";
 export const kCHANGEPASSWORD_API = "change-password";


//Color Constants

export const kPurpleColor = "#6173E1";

//Validations
//Username
export const kUserNameEmpty = "Please enter username.";

//FulName
export const kFullNameEmpty = "Please enter name.";
export const kFirstNameEmpty = "Please enter first name.";
export const kLastNameEmpty = "Please enter last name.";

//Email
export const kEmailEmpty = "Please enter email.";
export const kEmailInvalid = "Please enter valid email.";

//Country
export const kCountryEmpty = "Please select country";
export const kTownEmpty = "Please select town.";
//Address
export const kAddressEmpty = "Please enter address.";

//Password
export const kPasswordEmpty = "Please enter password.";
export const kPasswordNewEmpty = "Please enter new password.";
export const kPasswordConfirmEmpty = "Please enter confirm password.";

export const kPasswordMinLength = "Password must contain at least 6 characters.";
export const kPasswordMaxLength = "Password should contain maximum 12 characters.";
export const kPasswordsNotMatched = "Passwords doesn't match."

//OTP
export const kOTPEmpty = "Please enter OTP."
export const kOTPSent = "OTP sent successfully."

//Phone No.(For future)
export const kPhoneNoEmpty = "Please enter phone no.";
export const kPhoneNoLength = "Phone no. should contain 10 digits.";

export const kSomethingWrong = "Something went wrong. Please try again later."
