import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { RecipeList } from './modules/recipies/RecipeList';
import { SearchBar } from './modules/recipies/SearchBar';
import { RecipeDetails } from './modules/recipies/RecipeDetails';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './modules/users/LoginPage';
import { Navbar } from './components/Navbar';
import { RecipeCategories } from './modules/recipies/RecipeCategories';
import { Register } from './modules/users/Register';
import { Home } from './components/Home'; 
import { UserSettings } from "./modules/users/MyAccount";
import { RecipeForm } from "./modules/recipies/RecipeForm";


export const AppRouter = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/recipes/:id']; 
  const hideNavbar = hideNavbarRoutes.some(route =>
    location.pathname.startsWith(route.replace(':id', ''))
  );

  return (
    <>
       {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="search" element={<SearchBar />} />
                <Route path="categories" element={<RecipeCategories />} />
                <Route path="new" element={<RecipeForm />} />
                <Route path=":id" element={<RecipeDetails />} />
                <Route index element={<RecipeList />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </>
  );
};