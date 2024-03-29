'use client'

import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInput';
import useAuth from '../../../hooks/useAuth';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',  
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({isSignin}:{isSignin: boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signin, signup} = useAuth();  

  const renderContent = (isSigninContent: String, isSignupContent: String ) =>{
    return isSignin?isSigninContent:isSignupContent;
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value
    })
  }

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repPassword: ""
  })

  const [disabled, setDisabled] = useState(true);
  
  useEffect(()=>{
    if(isSignin){
      if(inputs.email && inputs.password){
        return setDisabled(false)//button activated
      }
      return setDisabled(true)
    }else{
      if(
        inputs.firstName && 
        inputs.lastName &&
        inputs.email && 
        inputs.password &&
        inputs.repPassword
      ){
        return setDisabled(false)//button activated
      }
      return setDisabled(true)
    }

  }, [inputs])

  const handleClick = () =>{
    if(isSignin){
      signin({email: inputs.email, password: inputs.password});
    }else{
      signup(
        {
          firstName:inputs.firstName,
          lastName:inputs.lastName,
          email:inputs.email,
          password:inputs.password,
          repPassword:inputs.repPassword
        }
      )
    }
  }


  return (
    <div>
      <button       
        className={`${renderContent("bg-blue-400 text-white","")} border p-1 px-4 rounded mr-3`}        
        onClick={handleOpen}
      >
        {renderContent("Sign in","Sign up")}
      </button>
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[400px]">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="p-text-sm">
                {renderContent("Sign in", "Create Account")}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent("Log into your account", "Create your new account")}
              </h2>
              <AuthModalInputs 
                inputs={inputs} 
                handleChangeInput={handleChangeInput} 
                isSignin={isSignin}/>
              <button 
                className='uppercase bg-green-500 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                disabled={disabled}
                onClick={handleClick}
              >
                {renderContent("Sign in", "Create account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}