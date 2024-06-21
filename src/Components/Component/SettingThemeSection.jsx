import DarkModeToggle from "./DarkModeToggle";

export default function SettingThemeSection(props) {

    return (
        <div id="settingThemeSection">

            <div id="settingThemeToggleCont">
                <DarkModeToggle theme={props.appTheme} changeTheme={props.updateTheme} />
            </div>

            <div className="settingToggleCont">

                <label>Automatic Dark-Mode</label>

                <button className={`toggleBtn ${props.autoDarkmode ? "check" : ''}`} onClick={() => props.changeAppSetting('AutoDarkMode', !props.autoDarkmode)} >
                    <span className="toggleBtnInner"></span>
                </button>
            </div>

            <p className='settingDesc'>Experience effortless visual comfort with our automatic dark mode feature. Seamlessly transitioning between dark and light modes, it adapts to your surroundings by enabling dark mode from sunset to sunrise. When the sun rises, the interface effortlessly brightens up, enhancing your readability and reducing eye strain.</p>

            <div className="settingToggleCont">

                <label>Mid-Night Mode</label>

                <button className={`toggleBtn ${props.midnightMode && 'check'}`} onClick={() => props.changeAppSetting('MidnightMode', !props.midnightMode)} >
                    <span className="toggleBtnInner"></span>
                </button>
            </div>

            <p className='settingDesc'>When the clock strikes midnight, our website's brilliance gently dims the brightness, creating a captivating ambiance for your late-night explorations.</p>
        </div>
    )
}
