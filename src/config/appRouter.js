import { BrowserRouter, Route, Routes } from "react-router-dom";
import SinglePost from "../screens/singlepost";
import CommentsForm from "../screens/commentsform";
import Dashboard from "../screens/dashboard";
import UserLoginSignin from "../screens/UserLoginSignin";
import ProtectedRoute from "./ProtectedRoute";
import Institute from "../screens/InstituteScreens/institute";
import Admin from "../screens/AdminScreens/admin";
import Studentregistration from "../screens/StudentScreens/StudentRegistration";
import SingleDetail from "../screens/InstituteScreens/SingleDetail";
import PublicPage from "../screens/PublicPage";
import StudentForm from "../screens/InstituteScreens/StudentForm";
import ShowResults from "../screens/ShowResults";
import QuestionsRecieved from "../screens/AdminScreens/QuestionsRecieved";
import QuestionsResponse from "../screens/AdminScreens/QuestionsResponse";
import Carcards from "../screens/UserScreens/Carcards";
import SingleCard from "../screens/UserScreens/SingleCard";
import BookNow from "../screens/UserScreens/BookNow";
import Profile from "../screens/UserScreens/Profile";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/userloginsignup" element={<UserLoginSignin />} />
          <Route path="/" element={<PublicPage />} /> */}
          <Route path="/" element={<Carcards />} />
          <Route path="/SingleCard" element={<SingleCard />} />
          <Route
            path="/BookNow"
            element={<ProtectedRoute Component={BookNow} />}
          />

          <Route path="/userloginsignup" element={<UserLoginSignin />} />
          <Route path="/Profile" element={<Profile />} />

          <Route
            path="admin/*"
            element={<ProtectedRoute Component={Admin} />}
          />

          {/* <Route path="/ShowResults" element={<ShowResults />} />
          <Route path="singlepost/:id" element={<SinglePost />} />
          <Route path="SingleDetail/:id" element={<SingleDetail />} />
          <Route path="commentform" element={<CommentsForm />} />
          <Route path="/StudentForm/:id" element={<StudentForm />} />
          <Route path="commentform/:id" element={<CommentsForm />} />
          <Route path="QuestionsRecieved" element={<QuestionsRecieved />} />
          <Route path="QuestionsResponse/:id" element={<QuestionsResponse />} />
          <Route
            path="dashboard/*"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="institute/*"
            element={<ProtectedRoute Component={Institute} />}
          />
          <Route
            path="admin/*"
            element={<ProtectedRoute Component={Admin} />}
          /> */}
          {/* <Route path="/form" element={<Registration />} /> */}

          {/* <Route
            path="/studentRegistration"
            element={<Studentregistration />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
