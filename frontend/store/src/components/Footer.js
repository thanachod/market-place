import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


export const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div className='footer'>
            <div className='container'>
                <div className='footer-icons'>
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaYoutube />
                </div>
                <ul>
                    <li>Term of Use</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Term of Use</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Term of Use</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                </ul>

                <p className='copyright-text'>Copyright @{year} </p>
            </div>
        </div>
    )
}
