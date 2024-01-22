import axios from "axios";

const useAuth = () => {
    const signin = async ({email, password}: {email:string, password:string}) =>{
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin",{
                email,
                password
            });
            console.log("res: ", response);            
        } catch (error) {
            console.log("error: ", error);
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
    return {signin,signup};

}

export default useAuth() 