import { useContext, useEffect } from "react";
import { authContext } from "./useAuth";
import {useNavigate} from "react-router-dom";

function useRequireAuth(redirectUrl = '/client/auth/login'){
  const auth = useContext(authContext);

  const navigate = useNavigate();

  const refreshUser = async () => {
      try{
          await auth.getMe()
      }catch{
          await auth.logout()
      }
  }

  useEffect(() => {
      if(auth.user === null) {
          refreshUser()
      }
  },[])

  useEffect(() => {
      if(!auth.user){
          navigate(redirectUrl);
      }
  },[auth.user])

  return auth;
}

export { useRequireAuth };