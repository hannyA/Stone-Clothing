import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";

const App = () => {
  const Shop = () => {
    return <h1>THis is the shop page</h1>;
  };

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
