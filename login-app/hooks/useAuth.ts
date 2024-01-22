import axios from "axios";
import {useContext} from "react";
import {AuthenticationContext} from "../src/app/context/AuthContext"


const useAuth = () => {

    const { loading, data, error, setAuthState} = useContext(AuthenticationContext);

    const signin = async ({email, password}: {email:string, password:string}) =>{
        setAuthState({
            loading:true,
            data: null,
            error: null
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin",{
                email,
                password
            });
            setAuthState({
                loading:false,
                data: response.data,
                error: null
            });         
        } catch (error: any) {
            setAuthState({
                loading:false,
                data: null,
                error: error.response.data.errorMessage,
            });     
        }
    }

    const signup = async ({firstName,lastName,email,password,repPassword}:{
        firstName:string,lastName:string,email:string,password:string,repPassword:string
    }) =>{
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                firstName,
                lastName,
                email,
                password,
                repPassword
            });
            console.log("res: ", response);            
        } catch (error) {
            console.log("error: ", error);
        }
    }
    // return {signin,signup};
    return { loading, data, error, signin, signup}

}

export default useAuth;