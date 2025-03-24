import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();
const initialState={
    user : null,
    isAuthenticated :false,
}
function reducer(state,action){
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true };
      case 'logout':
        return { ...state, user: null, isAuthenticated: false };
        default : throw new Error("Unknown action");
    }
    
}

//4.Never use this in real apps, this is just for demo purposes , else it will be accessed to anyone who can see the source code of your app or jus by inspecting it
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({children}){
  //3. we need to create a state to know if the user is authenticated or not and another stores user object, we will do it using reducer
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );


  //2. lets now create functions for login and logout
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    else toast.error("Incorrect email or password!", {
      position: "top-right",
      autoClose: 3000,
    });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//1.lets create our custom hook to use this context
function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error("AuthContext was used outside AuthProvider");
    return context;

}

export { AuthProvider, useAuth };
