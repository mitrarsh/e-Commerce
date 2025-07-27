import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
  <div className="white-text-block footer-block">
    <h2>Exclusive</h2>
    <h3>Subscribe</h3>
    <a>Get 10% off your first order</a>
    <div className="email-bar email-bar-black">
      <input
        className="email-input"
        type="text"
        placeholder="Enter your email"
      />
      <img src="/assets/images/icons/sendwhite.svg" alt="" />
    </div>
  </div>
  <div className="white-text-block footer-block">
    <h3>Support</h3>
    <a>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</a>
    <a>exclusive@gmail.com</a>
    <a>+88015-88888-9999</a>
  </div>
  <div className="white-text-block footer-block">
    <h3>Account</h3>
    <a>My Account</a>
    <a>Login / Register</a>
    <a>cart</a>
    <a>Wishlist</a>
    <a>Shop</a>
  </div>
  <div className="white-text-block footer-block">
    <h3>Quick Link</h3>
    <a>Privacy Policy</a>
    <a>Terms Of Use</a>
    <a>FAQ</a>
    <a>Contact</a>
  </div>
  <div className="white-text-block footer-block">
    <h3>Download App</h3>
    <div className="download-block">
      <p>Save $3 with App New User Only</p>
      <div className="download-logos">
        <img className="qpcode" src="/assets/images/icons/Qr Code.svg" alt="" />
        <img
          className="googleplay"
          src="/assets/images/icons/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg"
          alt=""
        />
        <img
          className="appstore"
          src="/assets/images/icons/download-appstore.svg"
          alt=""
        />
      </div>
      <div className="footer-icons">
        <img src="/assets/images/icons/Icon-Facebook.svg" alt="" />
        <img src="/assets/images/icons/twitetr.svg" alt="" />
        <img src="/assets/images/icons/icon-instagram.svg" alt="" />
        <img src="/assets/images/icons/Icon-Linkedin.svg" alt="" />
      </div>
    </div>
  </div>
  <div className="copyright">
    <img
      src="/assets/images/icons/icon-copyright.svg"
      alt=""
      className="copyright-icon"
    />
    <p className="copyright-text">Copyright Rimel 2022. All right reserved</p>
  </div>
</div>

  )
}

export default Footer