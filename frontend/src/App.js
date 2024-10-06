// import React, { useState } from "react";
// import {
//     Container,
//     Grid,
//     Typography,
//     Card,
//     CardContent,
//     Divider,
//     Button, // Import the Button component
// } from "@mui/material";
// import useSearchRecipes from "./hooks/useSearchRecipe";
// import Sidebar from "./components/Sidebar";

// function App() {
//     const [filters, setFilters] = useState({});
//     const { recipes, loading, error } = useSearchRecipes(filters); // Now using the hook

//     console.log(recipes); 
//     const handleFilterChange = (newFilters) => {
//         setFilters(newFilters); // Update filters when user applies them
//     };

//     // Function to clear the filters
//     const clearFilters = () => {
//         setFilters({}); // Reset filters to an empty object
//     };

//     return (
//         <Container maxWidth="lg" style={{ padding: "20px" }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={3}>
//                     <Sidebar onFilterChange={handleFilterChange} />
//                 </Grid>
//                 <Grid item xs={9}>
//                     <Typography variant="h3" gutterBottom>
//                         Recipe Search
//                     </Typography>
//                     <Button variant="outlined" color="primary" onClick={clearFilters} style={{ marginBottom: "20px" }}>
//                         Clear Search
//                     </Button>
//                     {loading && <Typography variant="h6">Loading...</Typography>}
//                     {error && <Typography variant="h6" color="error">{error}</Typography>}
//                     <Grid container spacing={2}>
//                         {Array.isArray(recipes) && recipes.length > 0 ? (
//                             recipes.map((recipe, index) => (
//                                 <Grid item xs={12} sm={6} key={index}>
//                                     <Card>
//                                         <CardContent>
//                                             <Typography variant="h5">{recipe.title}</Typography>
//                                             <Typography variant="body2" color="text.secondary">
//                                                 {recipe.desc}
//                                             </Typography>
//                                             <Divider style={{ margin: "10px 0" }} />
//                                             <Typography variant="h6">Ingredients:</Typography>
//                                             <Typography variant="body2">{recipe.ingredients.join(", ")}</Typography>
//                                             <Divider style={{ margin: "10px 0" }} />
//                                             <Typography variant="h6">Directions:</Typography>
//                                             <Typography variant="body2">{recipe.directions}</Typography>
//                                             <Typography variant="body1">
//                                                 <strong>Calories:</strong> {recipe.calories} | <strong>Protein:</strong> {recipe.protein}g | <strong>Sodium:</strong> {recipe.sodium}mg | <strong>Rating:</strong> {recipe.rating} / 5
//                                             </Typography>
//                                         </CardContent>
//                                     </Card>
//                                 </Grid>
//                             ))
//                         ) : (
//                             !loading && <Typography variant="h6">No recipes found.</Typography>
//                         )}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

// export default App;




import React, { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
    IconButton,
    SwipeableDrawer,
    useMediaQuery,
    Toolbar,
    AppBar,
    TextField
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger menu icon for mobile
import useSearchRecipes from "./hooks/useSearchRecipe";
import Sidebar from "./components/Sidebar"; // Assuming Sidebar is your filter component
import { useTheme } from '@mui/material/styles';

function App() {
    const [filters, setFilters] = useState({});
    const { recipes, loading, error } = useSearchRecipes(filters);

    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const recipesPerPage = 5; // Number of recipes per page
    const [drawerOpen, setDrawerOpen] = useState(false); // State to control the sidebar drawer

     // Centralized state for the search query
     const [query, setQuery] = useState('');

     console.log('query changed',query)
      // Function to handle filter changes (including search query)
    const handleFilterChange = (newFilters) => {
      console.log(newFilters)
      console.log('query changed',query)
      setFilters({ ...newFilters, query });
  };

    // Function to clear the filters
    const clearFilters = () => {
        setFilters({}); // Reset filters to an empty object
    };

    // Check if `recipes` is an array before using .slice()
    const validRecipes = Array.isArray(recipes) ? recipes : [];

    // Calculate the recipes to display based on the current page
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = validRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Total number of pages
    const totalPages = Math.ceil(validRecipes.length / recipesPerPage);

    // Handle page navigation
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // For responsive behavior
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    // Toggle Drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="fixed">
                <Toolbar>
                    {/* Hamburger Menu Icon for Mobile */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography ml={20} variant="h5" noWrap component="div">
                        Recipe App
                    </Typography>

                      {/* Search Input in Navbar */}
                      <TextField
                        label="Search by Keyword"
                        variant="outlined"
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{ ml: 20, bgcolor: "white", borderRadius: 1, width: '300px' }}
                    />
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer for Mobile */}
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    style={{ width: 250 }}
                >
                    {/* <Sidebar onFilterChange={setFilters} />  */}
                    <Sidebar onFilterChange={handleFilterChange} query = {query} />
                </div>
            </SwipeableDrawer>

            <Container maxWidth="lg" style={{ padding: "20px", marginTop: "80px" }}>
                <Grid container spacing={2}>
                    {/* Sidebar for larger screens */}
                    {!isMobile && (
                        <Grid item xs={3}>
                            {/* <Sidebar onFilterChange={setFilters} /> */}
                            <Sidebar onFilterChange={handleFilterChange} query = {query} />
                        </Grid>
                    )}

                    {/* Main Content */}
                    <Grid item xs={12} md={9}  >
                        {/* <Typography variant="h3" gutterBottom>
                            Recipe Search
                        </Typography> */}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={clearFilters}
                            style={{ marginBottom: "20px" }}
                        >
                            Clear Search
                        </Button>
                        {loading && <Typography variant="h6">Loading...</Typography>}
                        {error && <Typography variant="h6" color="error">{error}</Typography>}

                        <Grid container spacing={2}>
                            {validRecipes.length > 0 ? (
                                currentRecipes.map((recipe, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h5">{recipe.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {recipe.desc}
                                                </Typography>
                                                <Divider style={{ margin: "10px 0" }} />
                                                <Typography variant="h6">Ingredients:</Typography>
                                                <Typography variant="body2">{recipe.ingredients.join(", ")}</Typography>
                                                <Divider style={{ margin: "10px 0" }} />
                                                <Typography variant="h6">Directions:</Typography>
                                                <Typography variant="body2">{recipe.directions}</Typography>
                                                <Typography variant="body1">
                                                    <strong>Calories:</strong> {recipe.calories} | <strong>Protein:</strong> {recipe.protein}g | <strong>Sodium:</strong> {recipe.sodium}mg | <strong>Rating:</strong> {recipe.rating} / 5
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                !loading && <Typography ml={2} variant="h6">No recipes found.</Typography>
                            )}
                        </Grid>

                        {/* Pagination Controls */}
                        {validRecipes.length > recipesPerPage && (
                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    style={{ marginRight: "10px" }}
                                >
                                    Previous
                                </Button>

                                {/* Display current page and total pages */}
                                <Typography variant="body1" style={{ display: "inline-block", margin: "0 15px" }}>
                                    Page {currentPage} of {totalPages}
                                </Typography>

                                <Button
                                    variant="contained"
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
