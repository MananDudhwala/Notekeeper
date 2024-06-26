import { Link } from "react-router-dom"
import instagramIcon from '../Logos/instagram.png'
import githubIcon from '../Logos/github.png'
import gmailIcon from '../Logos/gmail.png'
import linkedinIcon from '../Logos/linkedin.png'
import twitterIcon from '../Logos/twitter.png'

export default function SettingAboutSection() {
    return (
        <div id="settingAboutSection">

            <div>

                <h3>Introduction</h3>

                <p>
                    Your ultimate digital companion for productivity and creativity. Notekeeper is a cutting-edge CRUD (Create, Read, Update, Delete) Web Application meticulously crafted to streamline note-taking, task management, and quick design creation, alongside intuitive photo editing functionalities.
                </p>

            </div>
            <div>

                <h3>Why Notekeeper?</h3>

                <p>
                    Notekeeper stands out as a Faster, More Secure, and Feature-Rich CRUD Web Application with Offline functionality. It caters to individuals who lead digital-centric lives, providing a personalized sanctuary to store diverse content ranging from online snippets to creative musings, TODO lists, design prototypes, and beyond.
                </p>

            </div>

            <div>

                <h3>Features That Empower</h3>

                <ul>
                    <li>
                        <strong>Speed and Security:</strong> Experience unparalleled efficiency and peace of mind with our emphasis on speed and security.
                    </li>
                    <li>
                        <strong>Guest Trial Availability:</strong> Dive into Notekeeper's functionalities with ease through our guest trial option.
                    </li>
                    <li>
                        <strong>Offline Functionality:</strong> Stay productive even without an internet connection, ensuring seamless access to your content anytime, anywhere.
                    </li>
                    <li>
                        <strong>Speech Recognition and Synthesis:</strong> Effortlessly transform your spoken words into written text and vice versa, enhancing accessibility and convenience.
                    </li>
                    <li>
                        <strong>Note to PDF/HTML:</strong> Convert your notes into PDF or HTML formats effortlessly, facilitating seamless sharing and archiving.
                    </li>
                    <li>
                        <strong>Folder and Search Functionality:</strong> Organize your content efficiently with folder management and robust search capabilities.
                    </li>
                    <li>
                        <strong>Sharing Functionality:</strong> Collaborate effortlessly by sharing your content with friends, colleagues, or collaborators.
                    </li>
                    <li>
                        <strong>No-Effort Data Synchronization:</strong> Enjoy hassle-free synchronization across devices, ensuring your content is always up to date.
                    </li>
                    <li>
                        <strong>Collection of Wallpapers:</strong> Set the mood with our curated collection of wallpapers, adding a personal touch to your digital space.
                    </li>
                    <li>
                        <strong>Customizable Color Themes:</strong> Personalize your digital environment with color choices that reflect your mood and style.
                    </li>
                    <li>
                        <strong>Midnight Mode:</strong> Protect your eyes during late-night sessions with our dedicated midnight mode.
                    </li>
                    <li>
                        <strong>Light and Dark Mode:</strong> Seamlessly transition between light and dark modes for optimal viewing comfort.
                    </li>
                </ul>

            </div>

            <footer>
                <p>Design and Developed with ❤️ by Manan Dudhwala</p>

                <span id="socialLinks">
                    <Link to="https://www.linkedin.com/in/manandudhwala/" target="_blank">
                        <img src={linkedinIcon} alt="" />
                    </Link>
                    <Link to="https://github.com/MananDudhwala" target="_blank">
                        <img className="invert" src={githubIcon} alt="" />
                    </Link>
                    <Link to="mailto:manandudhwala9201@gmail.com">
                        <img src={gmailIcon} alt="" />
                    </Link>
                </span>
            </footer>
        </div>
    )
}
