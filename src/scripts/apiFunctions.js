
export async function searchProducts(searchString) {
  const url = `https://preisrunter.at/api/search/products/?product=${searchString}`;
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function searchExactProduct(searchString) {
  const url = `https://preisrunter.at/api/search/products/?product=${searchString}&search=exact`;
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function searchLimitedResults(searchString, limit) {
  const url = `https://preisrunter.at/api/search/products/?product=${searchString}&searchLimit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function searchInMarket(searchString, market, limit) {
  const url = `https://preisrunter.at/api/search/products/?product=${searchString}&only${market}=true&searchLimit=${limit}`;

  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function enableRewePriceComparison(searchString) {
  const url = `https://preisrunter.at/api/search/products/?product=${searchString}&enableReweDe=true`;
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getAllMarkets() {
  const url = "https://preisrunter.at/api/search/markets/";
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getTodayPriceChanges() {
  const url = "https://preisrunter.at/api/history/today/";
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getProductPriceChanges(productId) {
  const url = `https://preisrunter.at/api/history/product/?id=${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getFullPriceHistory() {
  const url = "https://preisrunter.at/api/history/full/";
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getTopPriceChangesToday() {
  const url = "https://preisrunter.at/api/ranking/today/";
  const response = await fetch(url);
  const data = await response.json();
  // Process the received data
  return data;
}

export async function showCartItems(cartName) {
  const url = "https://preisrunter.at/api/cart/show/";
  const payload = { cartName: cartName };
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  // Process the received data
  return data;
}

export async function getProductBarcodeName(query) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${query}.json`;
  //console.log(url)

  try {
    const response = await fetch(url);
    const data = await response.json();
    return  data.product.brands;
  } catch (error) {
    return false;
  }
}

export async function getProductWithProductId(productID, market, returnSize) {
  const barcodeName = await getProductBarcodeName(productID);
  //console.log(barcodeName)

  if (barcodeName) {
    return await searchInMarket(barcodeName, market, returnSize);
  }
}

