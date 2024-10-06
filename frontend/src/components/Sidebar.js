import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, FormGroup, Slider, Radio, RadioGroup } from '@mui/material';

const Sidebar = ({ onFilterChange, query }) => {
    // const [query, setQuery] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [calories, setCalories] = useState([0, 1000]);
    const [protein, setProtein] = useState([0, 100]);
    const [sodium, setSodium] = useState([0, 1000]);
    const [rating, setRating] = useState(0);
    const [caloriesFilterType, setCaloriesFilterType] = useState('none');
    const [proteinFilterType, setProteinFilterType] = useState('none');
    const [sodiumFilterType, setSodiumFilterType] = useState('none');
    const [ratingFilterType, setRatingFilterType] = useState('none');

    const ingredientOptions = ['oil', 'salt', 'sugar', 'ground', 'olive', 'sliced', 'pepper'];

    const applyFilters = () => {
        const filters = {};
    
        // Only add query if it's not an empty string
        if (query.trim() !== '') {
            filters.query = query;
        }
    
        // Only add ingredients if the array is not empty
        if (ingredients.length > 0) {
            filters.ingredients = ingredients;
        }
    
        // Only apply ranges if the filter type is 'range'
        if (caloriesFilterType === 'range') {
            filters.min_calories = calories[0];
            filters.max_calories = calories[1];
        }
    
        if (proteinFilterType === 'range') {
            filters.min_protein = protein[0];
            filters.max_protein = protein[1];
        }
    
        if (sodiumFilterType === 'range') {
            filters.min_sodium = sodium[0];
            filters.max_sodium = sodium[1];
        }
    
        if (ratingFilterType === 'range') {
            filters.min_rating = rating;
        }
    
        // Send the updated filters
        onFilterChange(filters);
    };
    

    useEffect(() => {
        applyFilters();
    }, [query, ingredients, calories, protein, sodium, rating, caloriesFilterType, proteinFilterType, sodiumFilterType, ratingFilterType]);

    return (
        <Box sx={{ padding: 2, width: '250px', borderRight: '1px solid #ccc' }}>
            <Typography variant="h6">Filters</Typography>

            {/* <TextField
                label="Search by Keyword"
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ mb: 2 }}
            /> */}

            <Typography variant="subtitle1">Ingredients</Typography>
            <FormGroup>
                {ingredientOptions.map((ingredient) => (
                    <FormControlLabel
                        control={<Checkbox
                            checked={ingredients.includes(ingredient)}
                            onChange={(e) => {
                                const selectedIngredients = [...ingredients];
                                if (e.target.checked) {
                                    selectedIngredients.push(ingredient);
                                } else {
                                    const index = selectedIngredients.indexOf(ingredient);
                                    selectedIngredients.splice(index, 1);
                                }
                                setIngredients(selectedIngredients);
                            }}
                        />}
                        label={ingredient}
                        key={ingredient}
                    />
                ))}
            </FormGroup>

            {/* Calories Filter */}
            <Typography variant="subtitle1">Calories</Typography>
            <RadioGroup row value={caloriesFilterType} onChange={(e) => setCaloriesFilterType(e.target.value)}>
                <FormControlLabel value="none" control={<Radio />} label="No Filter" />
                <FormControlLabel value="range" control={<Radio />} label="Range" />
            </RadioGroup>
            {caloriesFilterType === 'range' && (
                <>
                    <Slider
                        value={calories}
                        onChange={(e, newValue) => setCalories(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={2000}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">Current Range: {calories[0]} - {calories[1]} calories</Typography>
                </>
            )}

            {/* Protein Filter */}
            <Typography variant="subtitle1">Protein</Typography>
            <RadioGroup row value={proteinFilterType} onChange={(e) => setProteinFilterType(e.target.value)}>
                <FormControlLabel value="none" control={<Radio />} label="No Filter" />
                <FormControlLabel value="range" control={<Radio />} label="Range" />
            </RadioGroup>
            {proteinFilterType === 'range' && (
                <>
                    <Slider
                        value={protein}
                        onChange={(e, newValue) => setProtein(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">Current Range: {protein[0]} - {protein[1]} g</Typography>
                </>
            )}

            {/* Sodium Filter */}
            <Typography variant="subtitle1">Sodium</Typography>
            <RadioGroup row value={sodiumFilterType} onChange={(e) => setSodiumFilterType(e.target.value)}>
                <FormControlLabel value="none" control={<Radio />} label="No Filter" />
                <FormControlLabel value="range" control={<Radio />} label="Range" />
            </RadioGroup>
            {sodiumFilterType === 'range' && (
                <>
                    <Slider
                        value={sodium}
                        onChange={(e, newValue) => setSodium(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={3000}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">Current Range: {sodium[0]} - {sodium[1]} mg</Typography>
                </>
            )}

            {/* Rating Filter */}
            <Typography variant="subtitle1">Rating</Typography>
            <RadioGroup row value={ratingFilterType} onChange={(e) => setRatingFilterType(e.target.value)}>
                <FormControlLabel value="none" control={<Radio />} label="No Filter" />
                <FormControlLabel value="range" control={<Radio />} label="Range" />
            </RadioGroup>
            {ratingFilterType === 'range' && (
                <>
                    <Slider
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">Current Rating: {rating} stars</Typography>
                </>
            )}
        </Box>
    );
};

export default Sidebar;
