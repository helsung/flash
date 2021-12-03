import axios from "axios";

export const getCuratedPhotos = async (pageIdx = 1, perPage = 20) => {
  try {
    const { data } = await axios.get(
      `https://api.pexels.com/v1/curated/?page=${pageIdx}&per_page=${perPage}`,
      {
        headers: {
          Authorization: process.env.NEXT_PEXELS_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error in getCuratedPhotos api call!");
  }
};

export const getQueriedPhotos = async (query) => {
  try {
    const { data } = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
      {
        headers: {
          Authorization: process.env.NEXT_PEXELS_KEY,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error in getQueriedPhotos api call!");
  }
};

export const getSinglePhoto = async (id) => {
  try {
    const { data } = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: process.env.NEXT_PEXELS_KEY,
      },
    });

    return data;
  } catch (error) {
    console.log("error in getSinglePhoto api call!");
  }
};
