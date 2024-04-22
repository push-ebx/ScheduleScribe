import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {init} from "@/lib/slices/userSlice.js";
import {useDispatch} from "react-redux";
import {Loader} from "@/components/ui/loader/index.jsx";

export const ProtectedRoute = ({children}) => {
  const {user, isFetching} = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user && !isFetching) {
    navigate("/auth");
  } else if (!isFetching && user) {
    dispatch(init({
      username: user.username,
      id: user.id,
    }));
  }

  return (
    user ?
    children :
    <Loader/>
  );
};