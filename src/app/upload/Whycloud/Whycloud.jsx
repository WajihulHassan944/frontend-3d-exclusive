'use client';

import React from 'react';
import './Whycloud.css';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { MdOutlineAccessTime } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Whycloud = ({ sectionData }) => {
  if (!sectionData) return null;

  return (
    <div className="why-cloud-wrapper">
      <h2
        className="why-heading"
         dangerouslySetInnerHTML={{
            __html: (sectionData?.title ||
              'Start now with your <span class="highlight">immersive 3D</span> experience')
              .replace(/\\u003C/g, '<')
              .replace(/\\u003E/g, '>')
              .replace(/className=/g, 'class='),
          }}
      />
      <p className="why-subtext">{sectionData.description}</p>

      <motion.div
        className="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sectionData.cards?.map((card, index) => (
          <motion.div className="feature-item" variants={itemVariants} key={card._id}>
            <div className="icon-circle">
              {index === 0 && <Play className="why-icons" size={25} />}
              {index === 1 && <AiOutlineYoutube className="why-icons" />}
              {index === 2 && <FiDownload className="why-icons" />}
              {index === 3 && <MdOutlineAccessTime className="why-icons" />}
            </div>
            <div className="feature-text">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Whycloud;
