import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'
const Header = () => {
    const auth=useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{ display: "flex" }}>
        <Logo/>
            <div>
                {auth?.isLoggedIn?(
                    <>
                        <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor='black'/>
                        <NavigationLink bg="#51538f" to="/" text="Logout" textColor='black' onClick={auth.logout}/>

                    </>
                ):(
                <>
                        <NavigationLink bg="#00fffc" to="/signup" text="SignUp" textColor='black'/>
                        <NavigationLink bg="#51538f" to="/login" text="Login" textColor='black' />

                </>)}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header