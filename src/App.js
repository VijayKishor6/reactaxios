import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserTable from './Table';
import "bootstrap/dist/css/bootstrap.css";
import Adduser from './Adduser';
import Login from './Login';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/userTable' element={<UserTable />}></Route>
        <Route path="/addUser" element={<Adduser />}></Route>
        <Route path="/editUser/:id" element={<Adduser />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
