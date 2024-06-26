import { useEffect, useState, useRef } from 'react';
import '../CSS/LoginPage.css';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import appLogo from '../Logos/appLogo.png';
import googleLogo from '../Logos/google.png';
import facebookLogo from '../Logos/facebook.png';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Component/Loading';
export default function LoginPage(props) {

    const navigate = useNavigate();
    const [inputType, setInputType] = useState('password');
    const passwordInput = useRef(null);
    const [rememberMeBtn, setRememberMeBtn] = useState(true);
    const [container, setContainer] = useState('login');
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [savedLoginArray, setSavedLoginArray] = useState([]);
    const [loading, setLoading] = useState('loading');

    useEffect(() => {
        // Navigate the user to homepage if the user is an active user, i.e. this user has signed up/loged in and is currently using the web app with their account, except the Guest User.
        const activeUser = JSON.parse(localStorage.getItem('Notekeeper-ActiveUser'));
        activeUser && activeUser.authProvider !== "guest" && navigate('/home');

        // Fetch the array of the saved credential of the users for password-less sign-in method.
        const arr = JSON.parse(localStorage.getItem('Notekeeper-SavedLoginArray')) || [];
        setSavedLoginArray(arr);

        setLoading('');

        // Stop the user from going back to the previous page, so the user does not mistakenly move to the logout page. This will ensure the native experience for the user.
        window.history.pushState(null, null, window.location.href);

        const handlePopState = () => window.history.go(1);

        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState); //Remove the event listener as soon as this component unmount.
    }, []);

    const saveUser = (el, provider) => {

        const userElement = {
            name: el.displayName,
            avatar: el.photoURL,
            email: el.email,
            authProvider: provider,
            isVerified: el.emailVerified,
            createdAt: new Date(el.metadata.creationTime),
            key: el.uid
        }
        // send the credentials of the user to be stored and reflected globally.
        props.changeUser(userElement);
    }

    const saveUserDataArray = (user) => {

        // save some of the credentials of the user for password-less sign-in method.
        let element = [...savedLoginArray];

        // check if the user's credentials are already saved or not and work accordingly.
        if (!element.find(el => window.atob(el.email) === user.email)) {

            element.push({
                email: window.btoa(user.email),
                avatar: user.avatar,
                uid: window.btoa(user.uid)
            });

            element.length > 10 && element.shift();

            localStorage.setItem('Notekeeper-SavedLoginArray', JSON.stringify(element));
        }
    }

    const removeSavedAccount = (user) => {
        // Simple function to remove the saved credentials of the user.
        let element = [...savedLoginArray];

        element = element.filter(el => el.uid !== user.uid);
        localStorage.setItem('Notekeeper-SavedLoginArray', JSON.stringify(element));
        setSavedLoginArray(element);

        // if there is no saved credentials anymore, then move the user from savedCredentials container to Login container.
        element.length === 0 && setContainer('login');
    }

    const signInWithGoogle = () => {
        if (navigator.onLine) {
            // Set the loading to transition so the user will get to see a transition loading effect. This will increase the experience of the user and will prevent the user from clicking multiple times on the same button.
            setLoading('transition');

            // Create a new instance of Google Authentication Provider.
            const googleProvider = new GoogleAuthProvider();

            // Sign-in the user with a popup. This will pop-up a page where the user will sign-in with their respective google account.
            signInWithPopup(auth, googleProvider)
                .then(res => {

                    // Now we have some part of the credentials of the signed-in user.
                    const user = res.user;

                    // Sent the user object and auth provider to the saveUser function. Now this user will be saved an called an active user.
                    saveUser(user, 'google');

                    // Save the credentials of this user in the firestore database if it is the first time this user is Signed-in.
                    getDocs(query(collection(db, "users"), where("email", "==", user.email)))
                        .then(docs => {
                            docs.empty && addDoc(collection(db, "users"), {
                                uid: user.uid,
                                name: user.displayName,
                                authProvider: "google",
                                email: user.email,
                                avatar: user.photoURL,
                                isVerified: user.emailVerified,
                            });
                        }).catch((err) => {
                            console.error(err)
                            setLoading('');
                            props.updateNotification({ type: 'red', msg: 'Something went wrong. If possible, please check the console and report this error with the screenshot of it from the console.' });
                        })
                })
                .catch(err => {
                    console.error(err);
                    setLoading('');
                    err.code.includes('account-exist') &&
                        props.updateNotification({ type: 'red', msg: 'Email already register. Try to Log-in with a different method.' });
                });
        } else
            props.updateNotification({ type: 'red', msg: "Seems like you're offline. Try again when you're online." });
    }

    const signInWithFacebook = () => {
        if (navigator.onLine) {

            // Set the loading to transition so the user will get to see a transition loading effect. This will increase the experience of the user and will prevent the user from clicking multiple times on the same button.
            setLoading('transition');

            // Create a new instance of the Facebook Authentication Provider.
            const facebookProvider = new FacebookAuthProvider();

            // Sign-in the user with a popup. This will pop-up a page where the user will sign-in with their respective facebook account.
            signInWithPopup(auth, facebookProvider)
                .then((res) => {

                    // Now we have some part of the credentials of the signed-in user.
                    const user = res.user;

                    // Sent the user object and auth provider to the saveUser function. Now this user will be saved an called an active user.
                    saveUser(user, 'facebook');

                    // Save the credentials of this user in the firestore database if it is the first time this user is Signed-in.
                    getDocs(query(collection(db, "users"), where("email", "==", user.email)))
                        .then((docs) => {
                            docs.empty && addDoc(collection(db, "users"), {
                                uid: user.uid,
                                name: user.displayName,
                                authProvider: "facebook",
                                email: user.email,
                                avatar: user.photoURL,
                                isVerified: user.emailVerified,
                            })
                        }).catch(err => {
                            console.error(err);
                            setLoading('');
                            props.updateNotification({ type: 'red', msg: 'Something went wrong. If possible, please check the console and report this error with the screenshot of it from the console.' });
                        })
                }).catch((err) => {
                    console.error(err);
                    setLoading('');
                    if (err.code.includes('account-exist'))
                        props.updateNotification({ type: 'red', msg: 'Email already register. Try to Sign-in with a different method.' });
                })
        } else
            props.updateNotification({ type: 'red', msg: "Seems like you're offline. Try again when you're online." });
    };

    const signInWithEmail = () => {
        if (navigator.onLine) {

            // Set the loading to transition so the user will get to see a transition loading effect. This will increase the experience of the user and will prevent the user from clicking multiple times on the same button.
            setLoading('transition');

            // Check if there is any user with the provided email, if yes the proceed else show an error message.
            getDocs(query(collection(db, "users"), where("email", "==", emailVal)))
                .then(res => {
                    if (res.docs.length) {

                        const fetchedUser = res.docs[0].data();

                        // Check if this user has signed-in with email or any other method and work accordingly.
                        if (fetchedUser.authProvider === 'email') {

                            // Check if the provided password matches passowrd of the fetched user, if yes then proceed else show an error message.
                            if (fetchedUser.password === passwordVal) {
                                const user = {
                                    avatar: fetchedUser.avatar,
                                    createdAt: fetchedUser.createdAt,
                                    email: fetchedUser.email,
                                    isVerified: fetchedUser.isVerified,
                                    name: fetchedUser.name,
                                    key: fetchedUser.uid,
                                }

                                // Now that the provided email and password matches the credentials of the fetched user, save the credentials of the user and now this will be the active user. 
                                props.changeUser(user, "email");

                                // If the remember me button is checked, save some part of the credentials of this user in an array in the localstorage for password-less signed-in method.
                                rememberMeBtn && saveUserDataArray(user);
                            } else {
                                setLoading('');
                                props.updateNotification({ type: 'red', msg: 'Incorrect Email or Password!' });
                            }
                        } else {
                            setLoading('');
                            props.updateNotification({ type: 'red', msg: 'Email is registered with a different login method.' });
                        }
                    } else {
                        setLoading('');
                        props.updateNotification({ type: 'red', msg: 'No User Found! Check your email and try again.' });
                    }
                }).catch(error => {
                    setLoading('');
                    console.error(error);
                    props.updateNotification({ type: 'red', msg: 'Something went wrong! Please try again.' })
                })
        } else
            props.updateNotification({ type: 'red', msg: "Seems like you're offline. Try again when you're online." });
    }

    const loginInWithExistingAccount = (user) => {
        if (navigator.onLine) {

            // Set the loading to transition so the user will get to see a transition loading effect. This will increase the experience of the user and will prevent the user from clicking multiple times on the same button.
            setLoading('Transition');

            // Check if there is a user with the provided email and if the user-id is same as the provided id.
            getDocs(query(collection(db, "users"), where("email", "==", window.atob(user.email))))
                .then(res => {

                    // Check if all the provided data matches with the data of fetched user. If yes, then save this user as active user. If no, then remove the credentials of this user and ask them to log-in again.
                    if (res.docs.length && res.docs[0].data().uid === window.atob(user.uid)) {
                        const fetchedUser = res.docs[0].data();
                        props.changeUser(fetchedUser, "email");
                    } else {
                        setLoading('');
                        setEmailVal(window.atob(user.email));
                        setContainer('login');
                        props.updateNotification({ type: 'red', msg: 'Session expired! Please Log-in again.' });
                        removeSavedAccount(user);
                    }
                }).catch(error => {
                    setLoading('');
                    console.error(error);
                    props.updateNotification({ type: 'red', msg: "Something went wrong. Please try again!" })
                })
        } else
            props.updateNotification({ type: 'red', msg: "Seems like you're offline. Try again when you're online." });
    }

    return (
        <div id='loginPage'>

            {loading && <Loading use={loading} />}

            <div id="loginPageLeft">
                <h2>WELCOME BACK</h2>
            </div>

            <div id="loginPageRight">
                <SwitchTransition>
                    <CSSTransition key={container} timeout={300} classNames="slideRight">
                        {container === 'login' ?
                            <div id='loginCont'>
                                <div id="loginBox">

                                    <img src={appLogo} alt="App Logo" />

                                    <div className="inputForm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v24c0 48.6-39.4 88-88 88c-33.4 0-62.5-18.7-77.4-46.1c-20.4 28-53.4 46.1-90.6 46.1c-61.9 0-112-50.1-112-112s50.1-112 112-112c31.3 0 59.7 12.9 80 33.6V176c0-8.8 7.2-16 16-16s16 7.2 16 16v80 24c0 30.9 25.1 56 56 56s56-25.1 56-56V256C480 132.3 379.7 32 256 32zm80 224a80 80 0 1 0 -160 0 80 80 0 1 0 160 0z"></path></svg>
                                        <input value={emailVal} type="email" autoFocus placeholder='Email' onChange={(e => setEmailVal(e.target.value))} onKeyUp={(e) => e.key === 'Enter' && passwordInput.current?.focus()} />
                                    </div>

                                    <div className="inputForm">
                                        <button onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
                                            {inputType === 'password' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M128 128v64H320V128c0-53-43-96-96-96s-96 43-96 96zM96 192V128C96 57.3 153.3 0 224 0s128 57.3 128 128v64h16c44.2 0 80 35.8 80 80V432c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V272c0-44.2 35.8-80 80-80H96zM32 272V432c0 26.5 21.5 48 48 48H368c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48z"></path></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512"><path d="M352 128c0-53 43-96 96-96s96 43 96 96v80c0 8.8 7.2 16 16 16s16-7.2 16-16V128C576 57.3 518.7 0 448 0S320 57.3 320 128v64H80c-44.2 0-80 35.8-80 80V432c0 44.2 35.8 80 80 80H368c44.2 0 80-35.8 80-80V272c0-44.2-35.8-80-80-80H352V128zm-16 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48H336z"></path></svg>
                                            }
                                        </button>
                                        <input ref={passwordInput} type={inputType} value={passwordVal} placeholder='Password' onChange={e => setPasswordVal(e.target.value)} />
                                    </div>

                                    <div id="loginHelpBox">
                                        <button id="loginRememberBtn" onClick={() => setRememberMeBtn(!rememberMeBtn)}>
                                            {rememberMeBtn ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM331.3 203.3l-128 128c-6.2 6.2-16.4 6.2-22.6 0l-64-64c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L192 297.4 308.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M384 64c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path></svg>
                                            }
                                            Remember me
                                        </button>
                                        <Link to={'/passwordReset'}>
                                            Forget Password?
                                        </Link>
                                    </div>

                                    {emailVal.length > 7 && emailVal.includes('@') && emailVal.includes('.com') && passwordVal.length > 7 ?
                                        <button id="main" className="loginBtns" onClick={signInWithEmail}>Log In</button>
                                        :
                                        <button id="disable" className="loginBtns">Log In</button>
                                    }

                                    <div id="loginPageSignupOption">New here?
                                        <Link to={'/signup'}>
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>

                                <div id="loginOr">
                                    <span></span>
                                    <p>or</p>
                                    <span></span>
                                </div>

                                <div id="loginOptionsBox">

                                    <button className="loginBtns" onClick={signInWithGoogle}>
                                        <img src={googleLogo} alt="" />
                                        Continue with Google
                                    </button>

                                    <button className="loginBtns" onClick={signInWithFacebook}>
                                        <img src={facebookLogo} alt="" />
                                        Continue with Facebook
                                    </button>

                                    {savedLoginArray.length &&
                                        <button className="loginBtns" onClick={() => setContainer('existing')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M412.1 416.6C398.1 361.1 347.9 320 288 320H224c-59.9 0-110.1 41.1-124.1 96.6C58 375.9 32 319 32 256C32 132.3 132.3 32 256 32s224 100.3 224 224c0 63-26 119.9-67.9 160.6zm-28.5 23.4C347.5 465.2 303.5 480 256 480s-91.5-14.8-127.7-39.9c4-49.3 45.3-88.1 95.7-88.1h64c50.4 0 91.6 38.8 95.7 88.1zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-256a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm-80-48a80 80 0 1 0 160 0 80 80 0 1 0 -160 0z"></path></svg>
                                            Log in to Existing accounts
                                        </button>
                                    }
                                </div>
                            </div>
                            :
                            <div id="loginSavedAccountCont">

                                <div id="savedAccountCardsCont">
                                    {savedLoginArray.map((el, ind) => (
                                        <div key={ind} className="savedAccountCard" onClick={() => loginInWithExistingAccount(el)}>

                                            <button onClick={() => props.updateWarning({ show: true, msg: `Are you sure you want to remove credentials of account '${window.atob(el.email)}'?`, greenMsg: 'Cancel', redMsg: 'Remove', func: () => removeSavedAccount(el) })}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M432 256c0 8.8-7.2 16-16 16L32 272c-8.8 0-16-7.2-16-16s7.2-16 16-16l384 0c8.8 0 16 7.2 16 16z"></path></svg>
                                            </button>

                                            <div className="savedAccountCardTop">
                                                {el.avatar ?
                                                    <div className="userAvatar" style={{ backgroundImage: `url(${el.avatar})` }}></div>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 496c-54 0-103.9-17.9-144-48v0c0-61.9 50.1-112 112-112h64c61.9 0 112 50.1 112 112v0c5.3-4 10.4-8.2 15.4-12.6C409.1 370.6 354.5 320 288 320H224c-66.5 0-121.1 50.6-127.4 115.4C47.2 391.5 16 327.4 16 256C16 123.5 123.5 16 256 16s240 107.5 240 240s-107.5 240-240 240zm0 16A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm80-304a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg>
                                                }
                                            </div>

                                            <div className="savedAccountCardBottom">
                                                <p>{window.atob(el.email)}</p>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>

                                <div id="loginOptionsBox">
                                    <button className="loginBtns" onClick={() => setContainer('login')}>
                                        Log In with a new account
                                    </button>
                                </div>
                            </div>
                        }
                    </CSSTransition>

                </SwitchTransition>
            </div>
        </div>
    )
}
