import { productsObject } from '../lib/tutorialProduct/product';
const CHANGE_ISSHOWTUTORIALCENTER = 'tutorialCenter/change_isShowTutorialCenter';
const CHANGE_ISSHOWTUTORIALSIDEBAR = 'tutorialCenter/change_isShowTutorialSidebar';
const CHANGE_ISSHOWTUTORIALICON = 'tutorialCenter/change_isShowTutorialIcon';
const CHANGE_ISSELECTEDTUTORIAL = 'tutorialCenter/change_isSelectedTutorial';
const CHANGE_CHOOSEPRODUCT = 'tutorialCenter/change_chooseproduct';
const CHANGE_PDFDATA = 'tutorialCenter/change_pdfData';
const RESET_CHOOSEPRODUCT = 'tutorialCenter/reset_chooseproduct';
const CHANGE_ACTIVEINDEX = 'tutorialCenter/changeActiveIndex';
const INIT_PRODUCTS = 'tutorialCenter/initProducts';
const CHANGE_PAGENUMBER = 'tutorialCenter/changePagenumber';

const initialState = {
  products: [],
  activeIndex: 1,
  isShowTutorialCenter: false,
  isShowTutorialSidebar: false,
  isShowTutorialIcon: false,
  isSelectedTutorial: false,
  chooseproduct: {},
  pdfData: [],
  pageNumber: 1
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case CHANGE_ISSHOWTUTORIALCENTER:
    return Object.assign({}, state, {
      isShowTutorialCenter: action.isShowTutorialCenter
    });
  case CHANGE_ISSHOWTUTORIALSIDEBAR:
    return Object.assign({}, state, {
      isShowTutorialSidebar: action.isShowTutorialSidebar
    });
  case CHANGE_ISSHOWTUTORIALICON:
    return Object.assign({}, state, {
      isShowTutorialIcon: action.isShowTutorialIcon
    });
  case CHANGE_ISSELECTEDTUTORIAL:
    return Object.assign({}, state, {
      isSelectedTutorial: action.isSelectedTutorial
    });
  case CHANGE_CHOOSEPRODUCT:
    return Object.assign({}, state, {
      chooseproduct: action.chooseproduct
    });
  case CHANGE_PDFDATA:
    return Object.assign({}, state, {
      pdfData: action.pdfData
    });
  case RESET_CHOOSEPRODUCT:
    return Object.assign({}, state, {
      chooseproduct: productsObject.products[1]
    });
  case CHANGE_ACTIVEINDEX:
    return Object.assign({}, state, {
      activeIndex: action.activeIndex
    });
  case INIT_PRODUCTS:
    return Object.assign({}, state, {
      products: action.products
    });
  case CHANGE_PAGENUMBER:
    return Object.assign({}, state, {
      pageNumber: action.pageNumber
    });
  default:
    return state;
  }
};


const changeIsShowTutorialCenter = function(flag){
  return {
    type: CHANGE_ISSHOWTUTORIALCENTER,
    isShowTutorialCenter: flag
  };
};
const changeIsShowTutorialSidebar = function(flag){
  return {
    type: CHANGE_ISSHOWTUTORIALSIDEBAR,
    isShowTutorialSidebar: flag
  };
};
const changeIsShowTutorialIcon = function(flag){
  return {
    type: CHANGE_ISSHOWTUTORIALICON,
    isShowTutorialIcon: flag
  };
};
const changeIsSelectedTutorial = function(flag){
  return {
    type: CHANGE_ISSELECTEDTUTORIAL,
    isSelectedTutorial: flag
  };
};
const changeChooseproduct = function(chooseproduct){
  return {
    type: CHANGE_CHOOSEPRODUCT,
    chooseproduct: chooseproduct
  };
};
const changePdfData = function(pdfData){
  return {
    type: CHANGE_PDFDATA,
    pdfData: pdfData
  };
};

const resetChooseproduct = function(){
  return {
    type: RESET_CHOOSEPRODUCT
  };
};
const changeActiveIndex = function(activeIndex){
  return {
    type: CHANGE_ACTIVEINDEX,
    activeIndex: activeIndex
  };
};
const initProducts = function(products){
  return {
    type: INIT_PRODUCTS,
    products: products
  };
};
const changePagenumber = function(pageNumber){
  return {
    type: CHANGE_PAGENUMBER,
    pageNumber: pageNumber
  };
};
export {
  reducer as default,
  initialState as tutorialCenterInitialState,
  changeIsShowTutorialCenter,
  changeIsShowTutorialSidebar,
  changeIsShowTutorialIcon,
  changeIsSelectedTutorial,
  changeChooseproduct,
  changePdfData,
  resetChooseproduct,
  changeActiveIndex,
  initProducts,
  changePagenumber
};
