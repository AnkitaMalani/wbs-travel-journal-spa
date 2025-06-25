import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./Context";
import { me, signOut } from "@/data";

const AuthContextprovider = ({ childern }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cheackSession, setCheckSession] = useState(true);

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Hope to see you soon");
    } catch (error) {
      toast.error(error.message || "Troble signing Out, Please try again");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckSession(false);
      }
    };
    //if (cheackSession) getUser();
    cheackSession && getUser();
  }, [cheackSession]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setCheckSession,
        setIsAuthenticated,
        logout,
      }}
    >
      {childern}
    </AuthContext.Provider>
  );
};

export default AuthContextprovider;
