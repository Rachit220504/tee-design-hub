import React from "react";
import { motion } from "framer-motion";

function AboutPage() {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        <h1>About Tee Design Hub</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, Tee Design Hub began with a simple mission: to provide high-quality, 
            custom t-shirts that help people express their unique personality and creativity.
          </p>
          <p>
            What started as a small passion project has grown into a thriving online platform 
            that connects designers, customers, and fashion enthusiasts from around the world.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Tee Design Hub, we believe that clothing is more than just fabric—it's a canvas 
            for self-expression. Our mission is to help you create t-shirts that tell your story 
            and showcase your individuality.
          </p>
          <p>
            We're committed to sustainable practices, ethical manufacturing, and supporting 
            independent designers while providing a seamless, enjoyable shopping experience.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Quality Commitment</h2>
          <p>
            Every t-shirt we produce is made from premium materials that are both comfortable 
            and durable. We use state-of-the-art printing technology to ensure vibrant, 
            long-lasting designs that withstand repeated washing.
          </p>
          <p>
            Our attention to detail extends from the stitching to the packaging, because we 
            believe quality should never be compromised.
          </p>
        </section>
        
        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user"></i>
              </div>
              <h3>Rachit Chandekar</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user"></i>
              </div>
              <h3>Shivam Singh</h3>
              <p>Creative Director</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user"></i>
              </div>
              <h3>Nitin</h3>
              <p>Head of Production</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default AboutPage;
