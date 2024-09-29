import PrivateRoute from './PrivateRoute.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/ecommerce/Home.js';
import UsersSmart from './components/friends/UsersSmart.js';
import EmptyCheckout from './components/checkout/EmptyCheckout.js'
import EmptySharedBasket from './components/checkout/EmptySharedBaskets.js';
import EmptySharedFriendBasket from './components/checkout/EmptySharedFriendBasket.js';
import SurveyResults from './components/chat/SurveyResults.js';
import MyFeed from './components/social/MyFeed.js'
import Friends from './components/friends/Friends.js';
import MyChatEmpty from './components/chat/MyChatEmpty.js';
import Requests from './components/friends/Requests.js';
import Login from './components/authentication/Login.js';
import Redirect from './components/authentication/Redirect.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Home} />} />
          <Route path="/login-success" element={<PrivateRoute component={Redirect} isRedirect={true} />} />
          <Route path="/users" element={<PrivateRoute component={UsersSmart} />} />
          <Route path="/checkout" element={<PrivateRoute component={EmptyCheckout}/>} />
          <Route path="/baskets" element={<PrivateRoute component={EmptySharedBasket} />} />
          <Route path="/basket/:userId" element={<PrivateRoute component={EmptySharedFriendBasket} />} />
          <Route path="/surveyResults" element={<PrivateRoute component={SurveyResults} />} />
          <Route path="/social" element={<PrivateRoute component={MyFeed} />} />
          <Route path="/dashboard" element={<PrivateRoute component={Friends} />} />
          <Route path="/chat" element={<PrivateRoute component={MyChatEmpty} />} />
          <Route path="/requests" element={<PrivateRoute component={Requests} />} />
          <Route path="/login" element={<PrivateRoute component={Login} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
