import React, {useState} from 'react'
import './navbar.css'
import { AiFillCloseCircle } from "react-icons/ai"
import { TbGridDots } from "react-icons/tb"
import logob from "../../Assets/logoblacktext.png"
import logow from "../../Assets/logowhitetext.png"

const Navbar = ({ toggleTheme, theme }) => {
    const [active, setActive] = useState('navBar')
    const [scroll, setScroll] = useState(false)
    // Fungsi untuk mengaktifkan navbar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    // Fungsi untuk menutup navbar
    const removeNavbar = () => {
        setActive('navBar')
    }

    // Fungsi untuk mengubah tema
    const handleThemeToggle = () => {
        toggleTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Fungsi untuk mengubah navbar
    const changeColor = () => {
        if (window.scrollY >= 90) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    window.addEventListener('scroll', changeColor)

    return (
    <section className="navBarSection">
        <header className={scroll ? "header-scroll flex" : "header flex"}>

            <div className="logoDiv">
                <span className="logo flex">
                    <img src={theme !== 'light' ? logow : logob} alt="logo" className='icon'/>
                </span>
            </div>

            <div className={active}>
                <ul className="navLists flex">

                    <li className="navItem">
                        <a href="#Home" className="navLink">Home</a>
                    </li>

                    <li className="navItem">
                        <a href="#Main" className="navLink">Tour</a>
                    </li>

                    <li className="navItem">
                        <a href="#Footer" className="navLink">About</a>
                    </li>

                    <li className="navItem">
                        <a href="#Contact" className="navLink">Contact</a>
                    </li>

                    <li className="navItem">
                        <span className="dark">{theme !== 'light' ? 'Dark' : 'Light'}</span>
                    </li>

                    <div className="mode">
                        <label className="switch">
                            <input type="checkbox" onChange={handleThemeToggle} checked={theme !== 'light' ? true : false}/>
                            <span className="slider"></span>
                        </label>
                        
                    </div>
                </ul>

                <div onClick={removeNavbar} className="closeNavbar">
                <AiFillCloseCircle className='icon'/>
                </div>
            </div>

            <div onClick={showNav} className="toggleNavbar">
            <TbGridDots className="icon"/>
            </div>

        </header>
    </section>
    )
}

export default Navbar
