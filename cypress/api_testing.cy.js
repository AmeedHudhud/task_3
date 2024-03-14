import * as apiHelper from "../cypress/support/api_helper";
const ACCOUNT = {
  username: "ameed",
  password: "ameed0595",
  signon: "Login",
};

describe("GET Request Example", () => {
  let responseBody;
  let cookie;
  before(() => {
    apiHelper.loginRequest(ACCOUNT);
  });

  it.skip("login with invalid username OR passwword", () => {
    const account = {
      username: "ameed0",
      password: "ameed0595",
      signon: "Login",
    };

    cy.request({
      method: "POST",
      url: "https://petstore.octoperf.com/actions/Account.action",
      body: account,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "JSESSIONID=DD15901B45C483B047407A87A2CF2A11",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(
        '<div id="Content"><ul class="messages"><li>Invalid username or password.  Signon failed.</li></ul>'
      );
    });
  });

  it.only("verify that cart is empty before add any iteam", () => {
    apiHelper.verifyOfExistance(
      "https://petstore.octoperf.com/actions/Cart.action?viewCart=",
      "Your cart is empty."
    );
  });
  it.only("Add Product to Cart from menu and verify it is added", () => {
    apiHelper.goToPage([
      "https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH",
      "https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=FI-SW-01",
    ]);
    apiHelper.addProduct([
      "https://petstore.octoperf.com/actions/Cart.action?addItemToCart=&workingItemId=EST-1",
    ]);
    apiHelper.verifyOfExistance(
      "https://petstore.octoperf.com/actions/Cart.action?viewCart=",
      "EST-1"
    );
  });
  it.only("Add Product to Cart from information page and verify it is added", () => {
    apiHelper.goToPage([
      "https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=DOGS",
      "https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=K9-BD-01",
      "https://petstore.octoperf.com/actions/Catalog.action?viewItem=&itemId=EST-6",
    ]);
    apiHelper.addProduct([
      "https://petstore.octoperf.com/actions/Cart.action?addItemToCart=&workingItemId=EST-6",
    ]);
    apiHelper.verifyOfExistance(
      "https://petstore.octoperf.com/actions/Cart.action?viewCart=",
      "EST-6"
    );
  });
  it.only("check from total cost", () => {
    apiHelper.verifyOfExistance(
      "https://petstore.octoperf.com/actions/Cart.action?viewCart=",
      "$35.00"
    );
  });
  it.only("change quantity and verify it is changed and total cost is changed", () => {
    const body = {
      "EST-1": "5",
      updateCartQuantities: "Update Cart",
    };
    apiHelper.goToPage(['https://petstore.octoperf.com/actions/Cart.action?viewCart='])
    apiHelper.changeQuantity('https://petstore.octoperf.com/actions/Cart.action',body);
    apiHelper.verifyOfExistance('https://petstore.octoperf.com/actions/Cart.action?viewCart=','$82.50');
  });
  it.only('verify "Retuen to main menu" button will redirect user to main page', () => {
    apiHelper.goToPage(['https://petstore.octoperf.com/actions/Cart.action?viewCart='])
    apiHelper.verifyOfExistance('https://petstore.octoperf.com/actions/Catalog.action','Welcome ameed!')
  });
  it.only(`verify"Return to 'product name'" button will redirect user to product page`, () => {

    apiHelper.goToPage(['https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH','https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=FI-SW-01'])
    apiHelper.verifyOfExistance('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH','Fish')
  });
  it.only("check from sub total", () => {
    apiHelper.verifyOfExistance('https://petstore.octoperf.com/actions/Cart.action?viewCart=','$101.00')
  });
  it.only("remove product from cart and verify it is deleted", () => {
    apiHelper.goToPage(['https://petstore.octoperf.com/actions/Cart.action?viewCart='])
    apiHelper.deleteProduct('https://petstore.octoperf.com/actions/Cart.action?removeItemFromCart=&workingItemId=EST-1','Angelfish')
    
  });
  it.only("verify that cart table is empty after delete all product", () => {



    apiHelper.goToPage(['https://petstore.octoperf.com/actions/Cart.action?viewCart='])
    apiHelper.deleteProduct('https://petstore.octoperf.com/actions/Cart.action?removeItemFromCart=&workingItemId=EST-6','Male Adult Bulldog')
    apiHelper.verifyOfExistance('https://petstore.octoperf.com/actions/Cart.action?viewCart=','Your cart is empty.')
  });
});
