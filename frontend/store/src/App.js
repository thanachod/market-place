import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFoundPage } from './pages/NotFoundPage';
import { Store } from './pages/Store';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminItems } from './pages/admin/AdminItems';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AddCategory } from './pages/admin/AddCategory';
import { EditCategory } from './pages/admin/EditCategory';
import { AddItem } from './pages/admin/AddItem';
import { EditItem } from './pages/admin/EditItem';
import { ItemCard } from './components/ItemCard';
import { ItemDetail } from './pages/item/ItemDetail';
import { Cart } from './pages/Cart';
import { Profile } from './pages/profile/Profile';
import { EditAccount } from './pages/profile/EditAccount';
import { Account } from './pages/profile/Account';
import { OrderDetail } from './pages/OrderDetail';
import { CartContextProvider } from './context/CartContext';
import { AdminOrders } from './pages/admin/AdminOrders';
import { UserContextProvider } from './context/UserContext';
import { Test } from './pages/Test';
import { Orders } from './pages/profile/Orders';
import { AdminUsers } from './pages/admin/AdminUsers';



axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
    <>
      <BrowserRouter>
      <UserContextProvider>
       
      <CartContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/order-detail/:id' element={<OrderDetail />} />

          {/* Items */}
          <Route path='/item/:id' element={<ItemDetail />} />
          <Route path='/cart' element={<Cart />} />

          {/* Profile */}
          <Route path='/account' element={<Account />} />
          <Route path='/edit-account' element={<EditAccount />} />
          <Route path='/account/orders' element={<Orders />} />

          {/* Admin */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin-items' element={<AdminItems />} />
          <Route path='/admin-categories' element={<AdminCategories />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/edit-category/:id' element={<EditCategory />} />
          <Route path='/add-item/' element={<AddItem />} />
          <Route path='/edit-item/:id' element={<EditItem />} />
          <Route path='/admin-users/' element={<AdminUsers />} />
          <Route path='/admin-orders/' element={<AdminOrders />} />
          <Route path='/test' element={<Test />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        </CartContextProvider>
         
      </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
