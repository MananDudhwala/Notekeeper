import '../CSS/Sidebar.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar(props) {
    const page = useLocation().pathname;
    const navigate = useNavigate();


    return (
        <nav id="sidebar">

            <section id="sbHead">
                <button id="sbApplogo" className='tooltip tooltipRight' data-tooltipcontent="Notekeeper" onClick={() => props.updateTheme(props.appTheme === 'dark' ? 'light' : 'dark')}>
                    {props.appTheme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="128" height="128" viewBox="0 0 128 128"><g transform="matrix(0.8046875,0,0,0.8046875,12.221578124999994,12.10498962366249)"><svg viewBox="0 0 96 96" data-background-color="#f8f8f8" preserveAspectRatio="xMidYMid meet" height="128" width="128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0.25950000000000273,0.3681650109553516)"><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g id="textblocktransform"><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481" id="textblock"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="1.496 1.549 47.009 46.902" enable-background="new 0 0 50 50" xml:space="preserve" height="95.2636699780893" width="95.481" class="icon-icon-0" data-fill-palette-color="accent" id="icon-0"><g fill="#c8c8c8" data-fill-palette-color="accent"><path fill="#ffffff" d="M32.121 47.295L32.119 47.264 32.111 47.274 32.021 44.881 32.033 44.885 31.855 40.067 39.478 18.833V13.988L28.215 1.549H1.496V48.451H39.478V34.401L36.867 41.697zM38.871 14.716H29.702C28.577 14.716 27.664 13.688 27.664 12.416L27.608 2.277zM8.713 18.05H32.033V19.342H8.713zM8.773 21.618H32.092V22.911H8.773zM8.832 25.187H32.152V26.479H8.832zM8.892 28.756H32.212V30.049H8.892zM8.951 32.324H32.271V33.617H8.951z" data-fill-palette-color="accent"></path><polygon fill="#ffffff" points="32.813,39.791 32.991,44.641 36.225,40.828 47.488,9.353 44.131,8.262  " data-fill-palette-color="accent"></polygon><path fill="#ffffff" d="M46.836 5.467C45.714 5.104 45.156 5.051 45.156 5.051L44.561 6.71 47.91 7.796 48.505 6.128A12.4 12.4 0 0 0 46.836 5.467" data-fill-palette-color="accent"></path></g></svg></g></svg></g></svg></g></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="120" height="120" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="128" height="128" viewBox="0 0 128 128"><g transform="matrix(0.8046875,0,0,0.8046875,12.221578124999994,12.10498962366249)"><svg viewBox="0 0 96 96" data-background-color="#f8f8f8" preserveAspectRatio="xMidYMid meet" height="128" width="128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0.25950000000000273,0.3681650109553516)"><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g id="textblocktransform"><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481" id="textblock"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg viewBox="0 0 95.481 95.2636699780893" height="95.2636699780893" width="95.481"><g><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="1.496 1.549 47.009 46.902" enable-background="new 0 0 50 50" xml:space="preserve" height="95.2636699780893" width="95.481" class="icon-icon-0" data-fill-palette-color="accent" id="icon-0"><g fill="#c8c8c8" data-fill-palette-color="accent"><path fill="#000000" d="M32.121 47.295L32.119 47.264 32.111 47.274 32.021 44.881 32.033 44.885 31.855 40.067 39.478 18.833V13.988L28.215 1.549H1.496V48.451H39.478V34.401L36.867 41.697zM38.871 14.716H29.702C28.577 14.716 27.664 13.688 27.664 12.416L27.608 2.277zM8.713 18.05H32.033V19.342H8.713zM8.773 21.618H32.092V22.911H8.773zM8.832 25.187H32.152V26.479H8.832zM8.892 28.756H32.212V30.049H8.892zM8.951 32.324H32.271V33.617H8.951z" data-fill-palette-color="accent"></path><polygon fill="#000000" points="32.813,39.791 32.991,44.641 36.225,40.828 47.488,9.353 44.131,8.262  " data-fill-palette-color="accent"></polygon><path fill="#000000" d="M46.836 5.467C45.714 5.104 45.156 5.051 45.156 5.051L44.561 6.71 47.91 7.796 48.505 6.128A12.4 12.4 0 0 0 46.836 5.467" data-fill-palette-color="accent"></path></g></svg></g></svg></g></svg></g></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="120" height="120" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>}
                </button>
            </section>

            <section id="sbBody">
                <button id="home" className={`${page === '/home' ? `active` : ''} sbBtn tooltip tooltipRight`} data-tooltipcontent="Home" onClick={() => navigate('/home')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 17.99V14.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button id="search" className={`${page === '/search' ? `active` : ''} sbBtn tooltip tooltipRight`} data-tooltipcontent="Search" onClick={() => navigate('/search')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button id="create" className={`sbBtn tooltip tooltipRight`} data-tooltipcontent="Create" onClick={() => navigate('/create')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </button>
                <button id="folder" className={`${page.includes('/folder') ? `active` : ''} sbBtn tooltip tooltipRight`} data-tooltipcontent="Folders" onClick={() => navigate('/folder')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H448c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H291.9c-17 0-33.3-6.7-45.3-18.7L210.7 73.4c-6-6-14.1-9.4-22.6-9.4H64zM0 96C0 60.7 28.7 32 64 32H188.1c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"></path>
                    </svg>
                </button>
                <button id="setting" className={`${page.includes('/setting') ? `active` : ''} sbBtn tooltip tooltipRight`} data-tooltipcontent="Setting" onClick={() => navigate('/setting')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </section>

            <section id="sbFoot">
                <button id="sbUserOuter" className='tooltip tooltipRight' data-tooltipcontent={props.user.name} onClick={() => navigate("/setting/account")}>
                    {props.user.avatar ?
                        <img src={props.user.avatar} alt="" />
                        :
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                </button>
            </section>
        </nav>
    )
}