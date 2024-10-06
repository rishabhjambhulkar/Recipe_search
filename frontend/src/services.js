import axios from 'axios';

const API_URL = 'http://localhost:8000/recipes/search';

export const searchRecipes = async (queryParams) => {
   
    // console.log(queryParams);
    // Check if the queryParams is empty
    if (Object.keys(queryParams).length === 0) {
        console.log("The object is empty, stopping execution.");
        return;  // Stop execution, or you can throw an error if needed
      }
    console.log(queryParams);
    try {
        const response = await axios.post(API_URL,  queryParams ); // Send the queryParams as an object
        return response.data; // Assuming the API returns the data directly
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
