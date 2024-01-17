
interface inputsProps{
    inputs:{
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repPassword: string
    };
    handleChangeInput : (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSignin: boolean;
}

export default function AuthModalInputs({inputs, handleChangeInput, isSignin}:inputsProps){
    return(
        <div>
            {isSignin? null :
                <div className="my-3 flex justify-between text-sm">
                    <input 
                        type="text" 
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="First name"
                        value={inputs.firstName}
                        onChange={handleChangeInput}
                        name="firstName"
                    />
                    <input 
                        type="text" 
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="Last name"
                        value={inputs.lastName}
                        onChange={handleChangeInput}
                        name="lastName"
                    />
                </div>
            }    
        <div>
            <div className="my-3 flex justify-between text-sm">
                <input 
                    type="text" 
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleChangeInput}
                    name="email"
                />
            </div>
        </div>
        <div>
            <div className="my-3 flex justify-between text-sm">
                <input 
                    type="password" 
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleChangeInput}
                    name="password"
                />
            </div>
        </div>
        <div>
            {isSignin?null:
                <div className="my-3 flex justify-between text-sm">
                    <input 
                        type="password" 
                        className="border rounded p-2 py-3 w-full"
                        placeholder="Repeat Password"
                        value={inputs.repPassword}
                        onChange={handleChangeInput}
                        name="repPassword"
                    />
                </div>            
            }
        </div>
      </div>
    )
}