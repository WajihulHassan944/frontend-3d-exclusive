import React from 'react';
import './CustomerTestimonials.css';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    initials: 'MJ',
    name: 'Michael Johnson',
    role: 'Travel Content Creator',
    quote:
      'Incredible quality! My travel videos look absolutely stunning on my Quest 3. The depth perception makes viewers feel like they\'re actually there with me.',
  },
  {
    initials: 'SC',
    name: 'Sarah Chen',
    role: 'Food Influencer',
    quote:
      'Game changer for my YouTube channel! My 3D cooking videos get 10x more engagement. The cloud processing is lightning fast too.',
  },
  {
    initials: 'DR',
    name: 'David Rodriguez',
    role: 'Real Estate Agent',
    quote:
      'My real estate virtual tours are now incredibly immersive. Clients can truly experience properties before visiting. Sales increased by 40%!',
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="testimonial-wrapper">
     <div className='testimonails-main'>
         <h2 className="testimonial-title">What our customers say</h2>
      <p className="testimonial-subtitle">
        Join thousands of creators who transformed their content
      </p>

      <div className="testimonial-cards">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, idx) => (
                <FaStar key={idx} color="#FFD700" size={16} />
              ))}
            </div>
            <p className="quote">"{t.quote}"</p>
            <div className="user">
              <div className="avatar">{t.initials}</div>
              <div>
                <div className="username">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="value">15,000+</div>
          <div className="label">Videos Converted</div>
        </div>
        <div className="stat">
          <div className="value">4.9<span>★</span></div>
          <div className="label">Average Rating</div>
        </div>
        <div className="stat">
          <div className="value">99.8%</div>
          <div className="label">Customer Satisfaction</div>
        </div>
      </div>

     </div>
         </div>
  );
};

export default CustomerTestimonials;
