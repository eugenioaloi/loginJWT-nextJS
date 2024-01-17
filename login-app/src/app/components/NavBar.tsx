import LoginModal from "./LoginModal";

export default function navBar(){
    return(
        <nav className='bg-white p-2 flex justify-between'>
            <a href="" className='font-bold text-gray-700 text-2xl'>
            Logo applicazione
            </a>
            <div>
            <div className='flex'>
              <LoginModal isSignin={true}/>
              <LoginModal isSignin={false}/>
            </div>
            </div>
        </nav>
    )
}