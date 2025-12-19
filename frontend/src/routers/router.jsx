import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout.jsx';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BookDetail from '../pages/BookDetail';

const router = createBrowserRouter([
{
path: "/",
element: <App/>,
children : [
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/cart",
        element: <Cart/>
    },
    {
        path:"/checkout",
        element: <Checkout/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/signup",
        element: <Signup/>
    },
    {
        path:"/book/:id",
        element: <BookDetail/>
    }
]
},
]);

export default router;