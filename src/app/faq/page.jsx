'use client';

import { useState } from 'react';
import Image from 'next/image';
import './faq.css';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
const faqs = [
  {
    q: 'What is Xclusive3D.com?',
    a: 'Xclusive3D.com is an online service that converts ordinary 2D videos into side-by-side (SBS) 3D format, ready for immersive playback on devices like Apple Vision Pro and Meta Quest. You simply upload a video, and we handle the entire 3D conversion in the cloud.',
  },
  {
    q: 'Why should I convert 2D videos to 3D videos?',
    a: '3D adds depth and realism, making movies, demos, and personal memories more immersive on modern headsets. With Xclusive3D.com, you get this enhanced experience without needing complex tools.',
  },
  {
    q: 'What is a SBS 3D video?',
    a: 'SBS stands for side-by-side. Each video frame contains two images—one for the left eye and one for the right—placed next to each other. VR headsets combine these for a 3D effect.',
  },
  {
    q: 'Does Xclusive3D.com work on any video?',
    a: 'We support common formats like MP4, MOV, AVI, and resolutions up to 4K. Very large or protected files may not work, so we recommend testing with a short clip first.',
  },
  {
    q: 'How does Cloud Conversion work?',
    a: 'After upload, our Flask backend processes your video in the cloud. The converted 3D file is uploaded to Backblaze B2, and you receive a secure download link via email.',
  },
  {
    q: 'How long will the conversion process take?',
    a: 'Typically, a 5-minute 1080p video takes 3–4 minutes to convert. Longer or higher-res videos may take more time depending on server load.',
  },
  {
    q: 'What is the maximum resolution video I can upload?',
    a: 'We currently accept up to 4K (3840×2160) resolution. Higher-resolution support is coming soon.',
  },
  {
    q: 'Can I upload the converted 3D video direct to YouTube and will it be recognized as a 3D video?',
    a: 'Yes! Our 3D files include stereoscopic metadata that YouTube automatically detects, so your video will show up as 3D.',
  },
  {
    q: 'How much does it cost?',
    a: 'Conversion is credit-based. Each minute of video uses 1 credit. Plans start at $9 for 30 credits with bulk discounts.',
  },
  {
    q: 'What happens with my credits I have left?',
    a: 'Credits never expire. You can use them anytime for future conversions.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
     
        <h2 className="faq-title">Frequently Asked Questions</h2>
       <center> <p className='faq-subtitle'>Find answers to common questions about our 3D video conversion service</p></center>
      </div>

      <ul className="faq-list">
        {faqs.map(({ q, a }, idx) => (
          <li key={idx} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggle(idx)}
              aria-expanded={openIdx === idx}
            >
              <span>{q}</span>
              {openIdx === idx ? (
                <FiChevronUp className="chevron-icon" />
              ) : (
                <FiChevronDown className="chevron-icon" />
              )}
            </button>
            <div className={`faq-answer ${openIdx === idx ? 'show' : ''}`}>
              {a}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}