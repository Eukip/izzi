import { combineReducers } from "redux";
import couponsReducer from "./coupons";
import favoriteReducer from "./favorite";
import contactReducer from "./contact";
import aboutUsReducer from "./aboutUs";
import helpAnswersReducer from "./help";
import bannerCarouselReducer from "./bannerCarousel";
import bannerSliderReducer from "./bannerSlider";
import aboutMapReducer from "./aboutMap";
import categoriesReducer from './categories';
import tagsReducer from './tags';
import userAuthReducer from "./userAuthReducer";
import couponsDetailsReducer from './couponsDetail';
import companyReducer from './company';
import searchBarReducer from './searchBar';
import paymentWaysReducer from "./paymnetWays";
import makeOrderReducer from "./makeOrder";
import answerQuestionReducer from "./answerQuestions";
import qrCodeReducer from './qrCode';
import privacyPolicyReducer from "./privacyPolicyReducer";
import publicOfferReducer from "./publicOfferReducer";
import requisitesReducer from "./requisitesReducer"
import {errorReducer} from "./error.reducer";
import checkOrderQrCodeReducer from "./checkOrderQrCodeReducer";

const rootReducer = combineReducers({
    coupons: couponsReducer,
    favorite: favoriteReducer,
    contacts: contactReducer,
    aboutUs: aboutUsReducer,
    helpAnswers: helpAnswersReducer,
    bannerCarousel: bannerCarouselReducer,
    bannerSlider: bannerSliderReducer,
    aboutMap: aboutMapReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    userAuthReducer,
    couponDetails: couponsDetailsReducer,
    company: companyReducer,
    searchBar: searchBarReducer,
    paymentWays: paymentWaysReducer,
    makeOrder: makeOrderReducer,
    answerQuestion: answerQuestionReducer,
    qrCode: qrCodeReducer,
    privacyPolicy:privacyPolicyReducer,
    publicOffer:publicOfferReducer,
    requisites: requisitesReducer,
    errorReducer,
    checkOrderQrCode:checkOrderQrCodeReducer

});

export default rootReducer;
