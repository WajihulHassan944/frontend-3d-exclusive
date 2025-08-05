'use client';
import React from 'react';
import "../blogDetails.css";
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="blogDetailsContainer">
      <div className="backLink">
        <Link href="/blogs">← Back to Blog</Link>
      </div>

      <div className="metaData">
        <span className="tag">Tutorial</span>
        <span className="date">📅 1/8/2024</span>
        <span className="time">⏱️ 7 min</span>
      </div>

      <h1 className="title">🕶️ How to Watch Full Side-by-Side and MV-HEVC 3D Videos from Xclusive3D on Meta Quest and Apple Vision Pro</h1>

      <p className="subheading">
        At Xclusive3D.com, we transform your regular 2D videos into immersive 3D experiences. Once you've downloaded your converted video—either in Full Side-by-Side (SBS) or MV-HEVC format—how do you actually watch it in 3D?
      </p>

      <div className="blogImageWrapper">
        <Image
          src="/blogs/three.jpg"
          alt="Watch 3D Videos in VR"
          width={1200}
          height={700}
          className="blogImage"
        />
      </div>

      <div className="blogContent">
        <h2>🕶️ How to Watch Full Side-by-Side and MV-HEVC 3D Videos from Xclusive3D on Meta Quest and Apple Vision Pro</h2>
        <p>
          At Xclusive3D.com, we transform your regular 2D videos into immersive 3D experiences. Once you've downloaded your converted video—either in Full Side-by-Side (SBS) or MV-HEVC format—how do you actually watch it in 3D?
        </p>
        <p>Let's walk through the steps for the Meta Quest and Apple Vision Pro.</p>

        <h3>✅ What You'll Need</h3>
        <ul>
          <li>A Meta Quest 2 / 3 / Pro or Apple Vision Pro headset</li>
          <li>A file transfer method (USB-C, cloud storage like Dropbox, Google Drive, iCloud)</li>
          <li>A 3D video player that supports SBS or MV-HEVC formats</li>
        </ul>

        <h3>📦 1. Full Side-by-Side (SBS) Videos</h3>
        <p>
          Full SBS videos display both the left and right eye frames side by side in one video frame. This is the most universally supported 3D video format.
        </p>

        <h4>🟪 Meta Quest (2 / 3 / Pro)</h4>
        <p>▶ Recommended app: Skybox VR, DEO VR, or Pigasus VR Media Player</p>
        <p>Steps:</p>
        <ul>
          <li>Transfer the .mp4 SBS video to your headset (via USB or wireless).</li>
          <li>Open Skybox VR or another compatible app.</li>
          <li>Select the file from your local storage or cloud.</li>
          <li>Choose 3D → SBS → Full from the playback settings.</li>
          <li>Enjoy your 3D experience!</li>
        </ul>
        <p>📝 Tip: Make sure your video resolution matches your headset's capabilities for best results—e.g., 3840x1080 for Full SBS 1080p.</p>

        <h4>🍏 Apple Vision Pro</h4>
        <p>▶ Recommended app: Infuse, nPlayer, or Spatial Video Player</p>
        <p>Steps:</p>
        <ul>
          <li>Use AirDrop, iCloud Drive, or Files app to transfer the video.</li>
          <li>Open the video in a supported app like Infuse.</li>
          <li>Enable SBS 3D mode (some apps automatically detect it).</li>
          <li>The Vision Pro will display the 3D video with immersive depth.</li>
        </ul>
        <p>📝 Note: Not all native apps currently support 3D formats, but third-party players are evolving fast. Stay updated with app capabilities.</p>

        <h3>🧬 2. MV-HEVC Format Videos</h3>
        <p>
          MV-HEVC (Multi-View High Efficiency Video Coding) is a newer format that stores both eye views in a more efficient way and is supported by modern Apple devices and a few high-end platforms.
        </p>

        <h4>🟪 Meta Quest</h4>
        <p>⚠️ MV-HEVC is NOT natively supported by Meta Quest players like Skybox or DEO VR.</p>
        <p>Solution:</p>
        <ul>
          <li>Convert the MV-HEVC back to a Full SBS format using a video tool (or request both formats from Xclusive3D).</li>
          <li>OR wait for future updates—Meta may eventually support MV-HEVC through third-party developers.</li>
        </ul>

        <h4>🍏 Apple Vision Pro</h4>
        <p>✅ MV-HEVC is natively supported by Apple Vision Pro for stereoscopic video playback.</p>
        <p>Steps:</p>
        <ul>
          <li>Transfer your .hevc or .mov (MV-HEVC) file via iCloud Drive, AirDrop, or Files app.</li>
          <li>Open with a compatible 3D video viewer or Apple's native spatial video support.</li>
          <li>If it doesn't open directly in 3D, try apps like nPlayer or Infuse, which are gradually adding support.</li>
        </ul>
        <p>📝 Pro Tip: Keep your VisionOS updated for the latest codec support.</p>

        <h3>💡 Which Format Should I Choose?</h3>
        <table className="formatTable">
          <thead>
            <tr>
              <th>Format</th>
              <th>Meta Quest</th>
              <th>Apple Vision Pro</th>
              <th>File Size</th>
              <th>Compatibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Full SBS MP4</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
              <td>Larger</td>
              <td>Universally supported</td>
            </tr>
            <tr>
              <td>MV-HEVC</td>
              <td>❌ No</td>
              <td>✅ Yes</td>
              <td>Smaller</td>
              <td>Advanced Apple devices only</td>
            </tr>
          </tbody>
        </table>
        <p>
          If you want maximum compatibility across devices, Full SBS is the safest bet. If you're optimizing for the Vision Pro, MV-HEVC offers better compression and quality.
        </p>

        <h3>👋 Final Thoughts</h3>
        <p>
          At Xclusive3D.com, we support both formats so you can enjoy immersive 3D content wherever you are—whether you're using the cutting-edge Vision Pro or the popular Meta Quest.
        </p>
        <p>
          Still unsure which format is right for you? Just reach out to our team or check the format recommendation during download!
        </p>

        <Link className="ctaButton" href="/signup">Get Started with Your VR Project</Link>
      </div>
    </div>
  );
};

export default page;
