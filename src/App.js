import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserTable from './Table';
import "bootstrap/dist/css/bootstrap.css";
import Adduser from './Adduser';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserTable />}></Route>
        <Route path="/adduser" element={<Adduser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
