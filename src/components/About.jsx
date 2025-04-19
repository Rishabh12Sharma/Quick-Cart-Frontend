import React from 'react';
import './About.css'; // Custom CSS for styling

function About() {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About QuickCart</h1>
        <p>Your one-stop solution for fast, reliable, and affordable shopping.</p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At QuickCart, our mission is to revolutionize the online shopping experience
          by providing customers with a seamless, efficient, and enjoyable platform
          for all their purchasing needs. From electronics to fashion, we bring you
          a wide range of products at unbeatable prices.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer First:</strong> We prioritize our customers above all.</li>
          <li><strong>Quality:</strong> We ensure the best quality products from trusted brands.</li>
          <li><strong>Innovation:</strong> We're constantly improving to deliver the best user experience.</li>
          <li><strong>Sustainability:</strong> We are committed to eco-friendly practices and solutions.</li>
        </ul>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <p>
          Our team is made up of passionate professionals dedicated to bringing the best
          e-commerce experience to life. From tech experts to customer support champions, we work
          together to ensure QuickCart is your go-to platform.
        </p>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          Have questions? Feel free to <a href="/contact">reach out to us</a>. We're here to help you with
          any concerns or feedback you may have.
        </p>
      </section>
    </div>
  );
}

export default About;
