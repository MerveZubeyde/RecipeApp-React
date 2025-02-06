import "./App.css";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./modules/users/UserContext";
import { RecipeProvider } from "./modules/recipies/RecipeContext";

function App() {
  return (
    <UserProvider>
      <RecipeProvider>
        <div className="App">
          <AppRouter />
        </div>
      </RecipeProvider>
    </UserProvider>
  );
}

export default App;
