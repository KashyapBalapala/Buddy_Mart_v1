import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './contexts/AuthContext'; // Adjust the import according to your AuthContext file path

export default function PrivateRoute({ component: Component, ...rest }) {
    // const { currentUser } = useAuth(); // Fetch the current user from your auth context

    const currentUser = true;
    return (
        currentUser ? <Component /> : <Navigate to="/login" />
    );
}
