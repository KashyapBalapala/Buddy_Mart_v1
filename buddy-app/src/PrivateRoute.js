import { Route, Navigate } from 'react-router-dom';
import Login from './components/authentication/Login';
// import { useAuth } from './contexts/AuthContext'; // Adjust the import according to your AuthContext file path

export default function PrivateRoute({ component: Component, ...rest }) {
    // const { currentUser } = useAuth(); // Fetch the current user from your auth context
    const isUserLoggedIn = localStorage.getItem('user');
    // const isUserLoggedIn = true;
    return (
        isUserLoggedIn || rest?.isRedirect ? <Component /> : <Login />
    );
}
