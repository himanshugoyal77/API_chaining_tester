export const get = async (url) => {
  console.log("url", url);
  const response = await fetch(url);
  return await response.json();
};

export const create = async (url, postData) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getSingle = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
