import React from 'react';


const Footer = () => {
  return (
    <footer className="footer bg-dark text-center text-white">
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} QuickCart | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
