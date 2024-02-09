// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    // console.log("fetched data", data);
    resolve({ data });
  });
}
export function fetchAllProductsByFilter({ filter, sort }) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order:"desc"}
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
  // console.log("Query string", queryString);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    // console.log("fetched data", data);
    resolve({ data });
  });
}
