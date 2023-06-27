import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: {

    //     _id: "648b00a4023a50d11d8e455c",
    //     username: "john",
    //     email: "j@gmail.com",
    //     // password:        "$2b$10$JYfh2AIcKKjZcisvJPL5Cu/5oIApUq9eIRnQkQDvSJyogkUryGK/C",
    //     profilePicture: "person/1.jpeg",
    //     coverPicture: "",
    //     isAdmin:false,
    //     followers: [],
    //     followings: [
    //         "648a8fb6bc546deeead192a5",
    //         "6489ac91bb6493afd4fa230f"
    //       ]

    // },
    user: JSON.parse(localStorage.getItem("user")) || null,
    // userData: JSON.parse(localStorage.getItem("userData")) || null,

    isFetching: false,
    error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))

    }, [state.user])

    
    // const socialLogin = (userData) => {
    //     // Dispatch the action for social login success
    //     dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    
    //     // Additional logic for storing the social login data in local storage
    //     localStorage.setItem("socialUserData", JSON.stringify(userData));
    //     console.log(userData)
    //     console.log("sfnkncs")

    //   };
    //
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                userData: state.userData,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
                // socialLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};