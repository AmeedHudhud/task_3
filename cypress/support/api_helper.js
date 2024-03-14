let cookie;
export const loginRequest = (account) => {
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
    expect(response.body).to.include("Welcome ameed!");
    const cookies = response.requestHeaders.Cookie;
    const [name, value] = cookies.trim().split("=");
    cy.setCookie(name, value);
    cookie = cookies;
  });
};
export const verifyIfCardEmpty = () => {
  cy.request({
    method: "GET",
    url: "https://petstore.octoperf.com/actions/Cart.action?viewCart=",
    headers: {
      Cookie: cookie,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include("Your cart is empty.");
  });
};
export const goToPage = (url) => {
  url.forEach((path) => {
    cy.request({
      method: "GET",
      url: path,
      headers: {
        Cookie: cookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
};
export const addProduct = (url) => {
  url.forEach((path) => {
    cy.request({
      method: "GET",
      url: path,
      headers: {
        Cookie: cookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
};
export const verifyOfExistance = (url, value, existance = true) => {
  if (existance) {
    cy.request({
      method: "GET",
      url: url,
      headers: {
        Cookie: cookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(value);
    });
  }
};
export const changeQuantity = (url,body) => {
  cy.request({
    method: "POST",
    url: url,
    headers: { Cookie: cookie },
    form: true,
    body: body,
  }).then((response) => {
    cy.log(response.body);
  });
};

export const deleteProduct = (url,value) => {
  cy.request({
    method: "GET",
    url: url,
    headers: {
      Cookie: cookie,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.not.include(value);
  });
}
