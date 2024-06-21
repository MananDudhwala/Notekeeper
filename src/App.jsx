import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './Components/CSS/Transition.css'
import './Components/CSS/Fonts.css'
import Notification from './Components/Component/Notification';
import LandingPage from './Components/Page/LandingPage';
import { CSSTransition } from 'react-transition-group';
import WarningModal from './Components/Component/WarningModal';
import PasswordReset from './Components/Page/PasswordReset';
import LoginPage from './Components/Page/LoginPage';
import SignupPage from './Components/Page/SignUpPage';
import Homepage from './Components/Page/Homepage';
import VerifyAccount from './Components/Page/VerifyAccount';

export default function App() {

  const navigate = useNavigate();
  const [appTheme, setAppTheme] = useState('dark');
  const [notification, setNotification] = useState({ show: false });
  const [warning, setWarning] = useState({ show: false });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);



  useEffect(() => {
    // Fetch User's Preference on darkmode.
    const autoDarkMode = JSON.parse(localStorage.getItem('Notekeeper-AutoDarkMode'));

    if (autoDarkMode) {
      // Apply darkmode if it is night else lightmode. 
      if (new Date().getHours() > 18 || new Date().getHours() < 6)
        setAppTheme('dark');
    } else {
      // Apply User's Preference on App Theme.
      updateTheme(localStorage.getItem('Notekeeper-AppTheme') || 'dark');
    }





    const activeUser = JSON.parse(localStorage.getItem('Notekeper-ActiveUser'));
    activeUser && setUser(activeUser);

    // Set timeout of 1 sec to stop main loading. It is schedule after 1sec so the App Logo won't dissappear immediately.
    setTimeout(() => setLoading(false), 1000);


  }, []);

  const updateTheme = (theme) => {
    setAppTheme(theme);
    localStorage.setItem('Notekeeper-AppTheme', theme);
  }



  const changeUser = (user) => {
    setUser(user);

    // if user !== null, which means user is not logged out, then navigate user to home page.
    user && navigate('/home');

    //Store user data in the local storage for fast access.
    localStorage.setItem('Notekeeper-ActiveUser', JSON.stringify(user));
  }

  const updateWarning = (obj) => setWarning(obj);

  const updateNotification = (obj) => {
    setNotification({ ...obj, show: true });

    // Hide the in-app notification after a period of 4 seconds.
    setTimeout(() => setNotification({ ...obj, show: false }), 4000);
  }

  return (
    <div className={`Notekeeper ${appTheme}mode`}>

      <CSSTransition in={notification.show} timeout={300} classNames="notification" unmountOnExit>
        <Notification notification={notification} />
      </CSSTransition>

      <CSSTransition in={warning.show} timeout={300} classNames="zoomIn" unmountOnExit>
        <WarningModal warning={warning} updateWarning={updateWarning} />
      </CSSTransition>

      {loading ?
        <div id='loadingIcon'>
          <div id="loadingAppLogo">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="2000" height="2000" viewBox="0 0 1500 1500"><rect width="1500" height="1500" fill="#ffffff"></rect><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,249.65634694812542,375.4623655913978)"><svg viewBox="0 0 332 248" data-background-color="#f8f8f8" preserveAspectRatio="xMidYMid meet" height="1120" width="1500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0.11409281322235643,0.4000000000000057)"><svg viewBox="0 0 331.7718143735553 247.2" height="247.2" width="331.7718143735553"><g><svg viewBox="0 0 395.52 294.69816230354616" height="247.2" width="331.7718143735553"><g transform="matrix(1,0,0,1,0,218.78554290277484)"><svg viewBox="0 0 395.52 75.91261940077129" height="75.91261940077129" width="395.52"><g id="textblocktransform"><svg viewBox="0 0 395.52 75.91261940077129" height="75.91261940077129" width="395.52" id="textblock"><g><svg viewBox="0 0 395.52 75.91261940077129" height="75.91261940077129" width="395.52"><g transform="matrix(1,0,0,1,0,0)"><svg width="395.52" viewBox="4.69 -36.74 246.87 47.38000000000001" height="75.91261940077129" data-palette-color="#61777f"><path d="M8.5 0L4.69 0 4.69-33.84 8.86-33.84 21.39-12.16Q22.31-10.45 23.25-8.69 24.19-6.93 25.02-5.2L25.02-5.2 25.24-5.2Q25.07-7.74 24.9-10.46 24.73-13.18 24.73-15.82L24.73-15.82 24.73-33.84 28.54-33.84 28.54 0 24.41 0 11.84-21.63Q10.91-23.34 10-25.12 9.08-26.9 8.18-28.64L8.18-28.64 7.98-28.64Q8.13-26.1 8.31-23.45 8.5-20.8 8.5-18.19L8.5-18.19 8.5 0ZM47.12 0.61L47.12 0.61Q44.09 0.61 41.46-0.93 38.84-2.47 37.24-5.38 35.64-8.3 35.64-12.45L35.64-12.45Q35.64-16.63 37.24-19.57 38.84-22.51 41.46-24.06 44.09-25.61 47.12-25.61L47.12-25.61Q50.19-25.61 52.83-24.06 55.47-22.51 57.07-19.57 58.66-16.63 58.66-12.45L58.66-12.45Q58.66-8.3 57.07-5.38 55.47-2.47 52.83-0.93 50.19 0.61 47.12 0.61ZM47.12-2.66L47.12-2.66Q50.46-2.66 52.54-5.36 54.61-8.06 54.61-12.45L54.61-12.45Q54.61-16.87 52.54-19.59 50.46-22.31 47.12-22.31L47.12-22.31Q44.94-22.31 43.26-21.07 41.57-19.82 40.63-17.61 39.69-15.41 39.69-12.45L39.69-12.45Q39.69-8.06 41.77-5.36 43.85-2.66 47.12-2.66ZM73.09 0.61L73.09 0.61Q69.16 0.61 67.62-1.66 66.08-3.93 66.08-7.62L66.08-7.62 66.08-21.73 62.37-21.73 62.37-24.78 66.3-24.98 66.77-33.08 70.06-33.08 70.06-24.98 76.92-24.98 76.92-21.73 70.06-21.73 70.06-7.52Q70.06-5.2 70.92-3.91 71.77-2.61 73.97-2.61L73.97-2.61Q74.63-2.61 75.36-2.75 76.09-2.88 76.85-3.22L76.85-3.22 77.73-0.44Q76.73 0 75.53 0.31 74.34 0.61 73.09 0.61ZM92.62 0.61L92.62 0.61Q89.32 0.61 86.63-0.95 83.93-2.51 82.33-5.44 80.73-8.37 80.73-12.45L80.73-12.45Q80.73-16.53 82.33-19.48 83.93-22.44 86.49-24.02 89.06-25.61 91.91-25.61L91.91-25.61Q96.62-25.61 99.21-22.46 101.8-19.31 101.8-13.89L101.8-13.89Q101.8-12.52 101.65-11.57L101.65-11.57 84.64-11.57Q84.83-7.5 87.13-5 89.42-2.51 93.08-2.51L93.08-2.51Q94.96-2.51 96.53-3.02 98.09-3.52 99.43-4.42L99.43-4.42 100.82-1.95Q99.19-0.83 97.21-0.11 95.23 0.61 92.62 0.61ZM84.59-14.43L84.59-14.43 98.31-14.43Q98.31-18.36 96.65-20.41 94.99-22.46 91.96-22.46L91.96-22.46Q89.25-22.46 87.11-20.36 84.98-18.26 84.59-14.43ZM111.93 0L108.02 0 108.02-36.74 111.93-36.74 111.93-11.57 112.07-11.57 122.96-24.98 127.38-24.98 119.03-14.94 128.53 0 124.21 0 116.79-12.21 111.93-6.64 111.93 0ZM143.3 0.61L143.3 0.61Q140 0.61 137.3-0.95 134.61-2.51 133.01-5.44 131.41-8.37 131.41-12.45L131.41-12.45Q131.41-16.53 133.01-19.48 134.61-22.44 137.17-24.02 139.73-25.61 142.59-25.61L142.59-25.61Q147.3-25.61 149.89-22.46 152.48-19.31 152.48-13.89L152.48-13.89Q152.48-12.52 152.33-11.57L152.33-11.57 135.31-11.57Q135.51-7.5 137.8-5 140.1-2.51 143.76-2.51L143.76-2.51Q145.64-2.51 147.2-3.02 148.77-3.52 150.11-4.42L150.11-4.42 151.5-1.95Q149.87-0.83 147.89-0.11 145.91 0.61 143.3 0.61ZM135.27-14.43L135.27-14.43 148.99-14.43Q148.99-18.36 147.33-20.41 145.67-22.46 142.64-22.46L142.64-22.46Q139.93-22.46 137.79-20.36 135.66-18.26 135.27-14.43ZM168.74 0.61L168.74 0.61Q165.44 0.61 162.74-0.95 160.04-2.51 158.44-5.44 156.85-8.37 156.85-12.45L156.85-12.45Q156.85-16.53 158.44-19.48 160.04-22.44 162.61-24.02 165.17-25.61 168.03-25.61L168.03-25.61Q172.74-25.61 175.33-22.46 177.91-19.31 177.91-13.89L177.91-13.89Q177.91-12.52 177.77-11.57L177.77-11.57 160.75-11.57Q160.95-7.5 163.24-5 165.54-2.51 169.2-2.51L169.2-2.51Q171.08-2.51 172.64-3.02 174.2-3.52 175.55-4.42L175.55-4.42 176.94-1.95Q175.3-0.83 173.32-0.11 171.35 0.61 168.74 0.61ZM160.7-14.43L160.7-14.43 174.42-14.43Q174.42-18.36 172.76-20.41 171.1-22.46 168.08-22.46L168.08-22.46Q165.37-22.46 163.23-20.36 161.09-18.26 160.7-14.43ZM188.09 10.64L184.14 10.64 184.14-24.98 187.43-24.98 187.8-22.09 187.9-22.09Q189.61-23.49 191.69-24.55 193.78-25.61 195.93-25.61L195.93-25.61Q200.81-25.61 203.35-22.14 205.89-18.68 205.89-12.87L205.89-12.87Q205.89-8.62 204.38-5.6 202.86-2.59 200.39-0.99 197.91 0.61 195 0.61L195 0.61Q193.29 0.61 191.54-0.15 189.78-0.9 188-2.29L188-2.29 188.09 2.1 188.09 10.64ZM194.39-2.71L194.39-2.71Q197.59-2.71 199.7-5.43 201.81-8.15 201.81-12.82L201.81-12.82Q201.81-17.04 200.23-19.68 198.64-22.31 195-22.31L195-22.31Q193.37-22.31 191.68-21.4 190-20.48 188.09-18.75L188.09-18.75 188.09-5.4Q189.88-3.93 191.5-3.32 193.12-2.71 194.39-2.71ZM222.66 0.61L222.66 0.61Q219.36 0.61 216.67-0.95 213.97-2.51 212.37-5.44 210.77-8.37 210.77-12.45L210.77-12.45Q210.77-16.53 212.37-19.48 213.97-22.44 216.53-24.02 219.1-25.61 221.95-25.61L221.95-25.61Q226.66-25.61 229.25-22.46 231.84-19.31 231.84-13.89L231.84-13.89Q231.84-12.52 231.69-11.57L231.69-11.57 214.68-11.57Q214.87-7.5 217.17-5 219.46-2.51 223.12-2.51L223.12-2.51Q225-2.51 226.57-3.02 228.13-3.52 229.47-4.42L229.47-4.42 230.86-1.95Q229.23-0.83 227.25-0.11 225.27 0.61 222.66 0.61ZM214.63-14.43L214.63-14.43 228.35-14.43Q228.35-18.36 226.69-20.41 225.03-22.46 222-22.46L222-22.46Q219.29-22.46 217.16-20.36 215.02-18.26 214.63-14.43ZM242.02 0L238.06 0 238.06-24.98 241.36-24.98 241.73-20.46 241.82-20.46Q243.14-22.8 244.97-24.21 246.8-25.61 248.93-25.61L248.93-25.61Q250.54-25.61 251.56-25.1L251.56-25.1 250.69-21.73Q250.15-21.9 249.67-21.97 249.2-22.05 248.42-22.05L248.42-22.05Q246.83-22.05 245.07-20.74 243.31-19.43 242.02-16.16L242.02-16.16 242.02 0Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#000000" class="wordmark-text-0" data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g transform="matrix(1,0,0,1,106.28837608626905,0)"><svg viewBox="0 0 182.94324782746187 182.94324782746187" height="182.94324782746187" width="182.94324782746187"><g><svg></svg></g><g id="icon-0"><svg viewBox="0 0 182.94324782746187 182.94324782746187" height="182.94324782746187" width="182.94324782746187"><g><path d="M0 91.472c0-50.518 40.953-91.472 91.472-91.472 50.518 0 91.472 40.953 91.471 91.472 0 50.518-40.953 91.472-91.471 91.471-50.518 0-91.472-40.953-91.472-91.471zM91.472 176.097c46.738 0 84.626-37.888 84.625-84.625 0-46.738-37.888-84.626-84.625-84.626-46.738 0-84.626 37.888-84.626 84.626 0 46.738 37.888 84.626 84.626 84.625z" data-fill-palette-color="accent" fill="#000000" stroke="transparent"></path><ellipse rx="90.55690767459363" ry="90.55690767459363" cx="91.47162391373094" cy="91.47162391373094" fill="#000000" stroke="transparent" stroke-width="0" fill-opacity="1" data-fill-palette-color="accent"></ellipse></g><g transform="matrix(1,0,0,1,40.157339463060936,40.27413897881795)"><svg viewBox="0 0 102.62856890134 102.39496986982597" height="102.39496986982597" width="102.62856890134"><g><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="1.496 1.549 47.009 46.902" enable-background="new 0 0 50 50" xml:space="preserve" height="102.39496986982597" width="102.62856890134" class="icon-dxe-0" data-fill-palette-color="quaternary" id="dxe-0"><g fill="#f8f8f8" data-fill-palette-color="quaternary"><path fill="#ffffff" d="M32.121 47.295L32.119 47.264 32.111 47.274 32.021 44.881 32.033 44.885 31.855 40.067 39.478 18.833V13.988L28.215 1.549H1.496V48.451H39.478V34.401L36.867 41.697zM38.871 14.716H29.702C28.577 14.716 27.664 13.688 27.664 12.416L27.608 2.277zM8.713 18.05H32.033V19.342H8.713zM8.773 21.618H32.092V22.911H8.773zM8.832 25.187H32.152V26.479H8.832zM8.892 28.756H32.212V30.049H8.892zM8.951 32.324H32.271V33.617H8.951z" data-fill-palette-color="quaternary"></path><polygon fill="#ffffff" points="32.813,39.791 32.991,44.641 36.225,40.828 47.488,9.353 44.131,8.262  " data-fill-palette-color="quaternary"></polygon><path fill="#ffffff" d="M46.836 5.467C45.714 5.104 45.156 5.051 45.156 5.051L44.561 6.71 47.91 7.796 48.505 6.128A12.4 12.4 0 0 0 46.836 5.467" data-fill-palette-color="quaternary"></path></g></svg></g></svg></g></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="331.7718143735553" height="247.2" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>
          </div>
          <div id='loadingCompanyName'>
            <span>by</span>
            <h2>Manan Dudhwala</h2>
          </div>
        </div>
        :
        <Routes>
          <Route path="*" element={<Homepage user={user} changeUser={changeUser} appTheme={appTheme} updateTheme={updateTheme} updateNotification={updateNotification} updateWarning={updateWarning} />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage changeUser={changeUser} updateNotification={updateNotification} updateWarning={updateWarning} />} />
          <Route path="/signup" element={<SignupPage changeUser={changeUser} updateNotification={updateNotification} />} />
          <Route path="/passwordReset" element={<PasswordReset updateNotification={updateNotification} />} />
          <Route path="/passwordReset/:passwordKey" element={<PasswordReset user={user} updateNotification={updateNotification} />} />
          <Route path="/verifyAccount/:verifyKey" element={<VerifyAccount user={user} changeUser={changeUser} updateNotification={updateNotification} />} />
        </Routes>
      }
    </div>
  );
}
