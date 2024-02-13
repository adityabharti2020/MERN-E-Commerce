// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    // console.log("fetched data", data);
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    console.log("current data", data);
    resolve({ data });
  });
}
export function fetchAllProductsByFilter({ filter, sort, pagination }) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order:"desc"}
  // pagination ={_page:1,_limit:10}
  // Todo on server we will support multi value
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      console.log("last category value", lastCategoryValue);
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    // console.log("pagination", pagination);
    // const skip = (page - 1) * limit;
    queryString += `${key}=${pagination[key]}&`;
  }
  // console.log("Query string", queryString);
  return new Promise(async (resolve) => {
    const paginationResponse = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const TotalResponse = await fetch("http://localhost:8080/products");
    // console.log("TotalResponse", TotalResponse);
    const data = await paginationResponse.json();
    const Totaldata = await TotalResponse.json();
    // console.log("Totaldata", Totaldata.length);
    // const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { product: data, totalItems: Totaldata.length } });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    // console.log("fetched data", data);
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    // console.log("fetched data", data);
    resolve({ data });
  });
}
