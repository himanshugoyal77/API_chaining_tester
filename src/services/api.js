export const get = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (url, postData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingle = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};
