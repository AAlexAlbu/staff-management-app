import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed out sucsesffully')
            navigate('/');
        }).catch(error => console.log(error))
    }

    return (
        <div>
            { authUser ? <><p>{`Signed In as ${authUser.email}`}</p><button onClick = {userSignOut} >Sign out</button></> : <p>Signed Out</p>}
        </div>
    )
}

export default AuthDetails;