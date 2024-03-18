import * as storeHelper  from "./support/JPetStoreHelper";

const LOGIN_BODY = {
  username: "ameed",
  password: "ameed0595",
  signon: "Login",
};
const CHANGE_QUANTITY_HEADER = {
  "EST-1": "5",
  updateCartQuantities: "Update Cart",
};
const VALID_CREDENTIALS = {
  username: "ameed",
  password: "ameed0595",
  // signon: "Login",
};
describe("GET Request Example", () => {
  before(() => {
    storeHelper .login(
      LOGIN_BODY.username,
      LOGIN_BODY.password,
      LOGIN_BODY.signon
    );
  });
  it("verify that cart is empty before add any iteam", () => {
    storeHelper.getBody(storeHelper .URL.cart).then((body) => {
      storeHelper .verifyTextExistence(
        body,
        storeHelper .MESSAGE.EMPTY_MESSAGE,
        true
      );
    });
  });
  it("Add Product to Cart and verify it is added", () => {
    storeHelper .addProduct(storeHelper .URL.LARGE_ANGEL_FISH).then((body) => {
      storeHelper .verifyProductExistence(body, storeHelper .PRODUCTS.FISH.TYPE);
    });
    storeHelper .addProduct(storeHelper .URL.FEMALE_PUPPY_BULLDOG).then((body) => {
      storeHelper .verifyProductExistence(body, storeHelper .PRODUCTS.DOG.TYPE);
    });
  });
  it("check total cost", () => {
    storeHelper .getBody(storeHelper.URL.cart).then((body) => {
      storeHelper .checkTotalCost(
        body,
        storeHelper .PRODUCTS.FISH.LARGE_ANGEL_FISH_ID
      );
    });
  });
  it("change quantity and verify it is changed and total cost is changed", () => {
    storeHelper .changeQuantity(CHANGE_QUANTITY_HEADER);
    storeHelper .getBody(storeHelper .URL.cart).then((body) => {
      storeHelper .checkTotalCost(
        body,
        storeHelper .PRODUCTS.FISH.LARGE_ANGEL_FISH_ID
      );
    });
  });

  it('verify "Retuen to main menu" button will redirect user to main page', () => {
    storeHelper .getBody(storeHelper .URL.cart)
    storeHelper .getBody(storeHelper .URL.MAIN_MENU).then((body)=>{
      storeHelper .verifyTextExistence(body,storeHelper .MESSAGE.Welcome_MESSAGE.replace('${username}',LOGIN_BODY.username))
    })
  });
  it(`verify"Return to 'product name'" button will redirect user to product page`, () => {
    storeHelper .getBody(`/${storeHelper .URL.ANGEL_FISH_PAGE}`)
    storeHelper .getBody(`/${storeHelper .URL.FISH_PAGE}`).then((body)=>{
      storeHelper .verifyTextExistence(body,storeHelper .PRODUCTS.FISH.NAME)
    })
  });
  it("check from sub total", () => {
    storeHelper .getBody(storeHelper .URL.cart).then((body)=>{
      storeHelper .checkSubTotal(body)
    })
  });
  it("delete product and verify it is deleted", () => {
    storeHelper .deleteProduct(storeHelper .PRODUCTS.FISH.LARGE_ANGEL_FISH_ID).then((body)=>{
      storeHelper .verifyProductExistence(body,storeHelper .PRODUCTS.FISH.TYPE,false)
    })
  });
  it("verify that cart table is empty after delete all product", () => {
    storeHelper .deleteProduct(storeHelper .PRODUCTS.DOG.FEMALE_PUPPY_BULL_DOG_ID).then((body)=>{
      storeHelper .verifyProductExistence(body,storeHelper .PRODUCTS.DOG.TYPE,false)
      storeHelper .verifyTextExistence(body,storeHelper .MESSAGE.EMPTY_MESSAGE )
    })
  });
});
