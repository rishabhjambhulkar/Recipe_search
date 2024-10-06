// import { useState, useEffect } from 'react';
// import { searchRecipes } from '../services';

// const useSearchRecipes = (initialQuery) => {
//     const [query, setQuery] = useState(initialQuery);
//     const [recipes, setRecipes] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             if (query) {
//                 setLoading(true);
//                 setError(null);
//                 try {
//                     const data = await searchRecipes(query);
//                     // console.log(data);
//                     setRecipes(data); // Set the fetched recipes
//                 } catch (err) {
//                     setError('Failed to fetch recipes');
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 setRecipes([]); // Clear recipes if query is empty
//             }
//         };

//         fetchRecipes();
//     }, [query]); // Effect will run when 'query' changes

//     return { recipes, loading, error, setQuery };
// };

// export default useSearchRecipes;




import { useState, useEffect } from 'react';
import { searchRecipes } from '../services';

const useSearchRecipes = (filters) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await searchRecipes(filters);
                setRecipes(result); // Assuming `result` contains the recipe array
            } catch (err) {
                setError('Error fetching recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [filters]);

    return { recipes, loading, error };
};

export default useSearchRecipes;
