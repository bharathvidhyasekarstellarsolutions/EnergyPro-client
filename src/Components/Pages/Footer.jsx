import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} EnergyPro. All Rights Reserved.</p>
                <ul className="flex justify-center space-x-4">
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
