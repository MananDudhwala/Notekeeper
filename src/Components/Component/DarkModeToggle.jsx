import '../CSS/DarkMode.css'

export default function DarkModeToggle(props) {
    return (
        <div id='themeToggleCont'>
            <div id="themeToggleLeft" onClick={() => props.changeTheme('light')}>
                <div id="themeToggleLTop">
                    <div id="light" className="themeDeviceCont">
                        <div className="themeDeviceContTop">
                            <div className="themeDeviceContTLeft">
                                <div className="themeDeviceBall"></div>
                            </div>
                            <div className="themeDeviceContTRight">
                                <div className="themeDeviceLine"></div>
                                <div className="themeDeviceLine"></div>
                            </div>
                        </div>
                        <div className="themeDeviceContBottom">
                            <div className="themeDeviceContBLeft">
                                <div className="themeDeviceBall"></div>
                            </div>
                            <div className="themeDeviceContBRight">
                                <div className="themeDeviceLine"></div>
                                <div className="themeDeviceLine"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="themeToggleLBottom">
                    {props.theme === 'light' ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path><path d="M256 160a96 96 0 1 0 0 192 96 96 0 1 0 0-192z"></path></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>
                    }
                </div>
            </div>
            <div id="themeToggleRight" onClick={() => props.changeTheme('dark')}>
                <div id="themeToggleRTop">
                    <div id="dark" className="themeDeviceCont">
                        <div className="themeDeviceContTop">
                            <div className="themeDeviceContTLeft">
                                <div className="themeDeviceBall"></div>
                            </div>
                            <div className="themeDeviceContTRight">
                                <div className="themeDeviceLine"></div>
                                <div className="themeDeviceLine"></div>
                            </div>
                        </div>
                        <div className="themeDeviceContBottom">
                            <div className="themeDeviceContBLeft">
                                <div className="themeDeviceBall"></div>
                            </div>
                            <div className="themeDeviceContBRight">
                                <div className="themeDeviceLine"></div>
                                <div className="themeDeviceLine"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="themeToggleRBottom">
                    {props.theme === 'dark' ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path><path d="M256 160a96 96 0 1 0 0 192 96 96 0 1 0 0-192z"></path></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>
                    }
                </div>
            </div>
        </div>
    )
}
