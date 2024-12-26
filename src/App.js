import "./App.css";
import { AppRouter } from './AppRouter';
import { UserProvider } from "./modules/users/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppRouter />
      </div>
    </UserProvider>
  );
};

export default App;