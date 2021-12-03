import axios from "axios";

/**
 * GET curated photos from pexels API with back-end pagination
 * @param {number} pageIdx
 * @param {number} perPage
 * @return {Object}
 */

/**
 * Photos JSON return value
 * @typedef {Object}
 * @property {number} page
 * @property {number} per_page
 * @property {Object[]} photos
 * @property {number} total_results
 * @property {string} next_page
 * @property {string} prev_page
 */
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

/**
 * GET queried photos from pexels API with back-end pagination
 * @param {string} query
 * @param {number} pageIdx
 * @param {number} perPage
 * @return {Object}
 */

/**
 * Queried Photos JSON return value
 * @typedef {Object}
 * @property {number} page
 * @property {number} per_page
 * @property {Object[]} photos
 * @property {number} total_results
 * @property {string} next_page
 * @property {string} prev_page
 */
export const getQueriedPhotos = async (query, pageIdx = 1, perPage = 20) => {
  try {
    const { data } = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}&page=${pageIdx}&per_page=${perPage}`,
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

/**
 * GET single photo by ID from pexels API
 * @param {number} id
 * @return {Object}
 */

/**
 * Single Photo JSON return value
 * @typedef {Object}
 * @property {number} id
 * @property {number} width
 * @property {number} height
 * @property {string} url
 * @property {string} photographer
 * @property {string} photographer_url
 * @property {number} photographer_id
 * @property {string} avg_color
 * @property {Object{string}} src
 * @property {boolean} liked
 */
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
