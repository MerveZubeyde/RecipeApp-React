import "./App.css";
import { AppRouter } from './AppRouter';
import { UserProvider } from "./UserContext";

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