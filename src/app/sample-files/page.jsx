import React from 'react'
import "./SampleFiles.css";
import FormatSection from './FormatSection/FormatSection';
import DownloadSamples from './DownloadSamples/DownloadSamples';
import CTASection from './CTASection/CTASection';
const page = () => {
  return (
    <div className='sample-files-container'>
      <div className='sample-files-header'>
        <h1>Sample Files</h1>
        <p>Experience the difference between our three presets. Download sample files and view them on your VR headset to choose the perfect 3D experience.</p>
      </div>
      <FormatSection />
      <DownloadSamples />
      <CTASection />
    </div>
  )
}

export default page
