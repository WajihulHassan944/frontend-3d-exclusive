"use client";
import React, { useEffect, useState } from "react";
import "./ComingSoon.css";
import { baseUrl } from "@/const";

const ComingSoon = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${baseUrl}/pages/url/coming-soon`);
        const data = await res.json();

        if (data?.pageByUrl?.sections?.length > 0) {
          setSectionData(data.pageByUrl.sections[0]);
        }

        setLoading(false);
      } catch (err) {
        console.log("Failed to load Coming Soon data:", err);
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="coming-soon-wrap">
        <div className="coming-soon-section loading-text">Loading...</div>
      </div>
    );
  }

  if (!sectionData) {
    return (
      <div className="coming-soon-wrap">
        <div className="coming-soon-section error-text">
          Unable to load page content.
        </div>
      </div>
    );
  }

  return (
    <div className="coming-soon-wrap">

      {/* WAVES SVG */}
      <svg
        className="hero-waves"
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <path>
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0 48 C120 26,240 26,360 48 S600 70,720 48 S960 26,1080 48 S1320 70,1440 48;
              M0 48 C120 70,240 70,360 48 S600 26,720 48 S960 70,1080 48 S1320 26,1440 48;
              M0 48 C120 26,240 26,360 48 S600 70,720 48 S960 26,1080 48 S1320 70,1440 48
            "
          />
        </path>

        <path>
          <animate
            attributeName="d"
            dur="13s"
            begin="-2s"
            repeatCount="indefinite"
            values="
              M0 78 C120 58,240 58,360 78 S600 98,720 78 S960 58,1080 78 S1320 98,1440 78;
              M0 78 C120 98,240 98,360 78 S600 58,720 78 S960 98,1080 78 S1320 58,1440 78;
              M0 78 C120 58,240 58,360 78 S600 98,720 78 S960 58,1080 78 S1320 98,1440 78
            "
          />
        </path>

        <path>
          <animate
            attributeName="d"
            dur="14s"
            begin="-4s"
            repeatCount="indefinite"
            values="
              M0 108 C120 90,240 90,360 108 S600 126,720 108 S960 90,1080 108 S1320 126,1440 108;
              M0 108 C120 126,240 126,360 108 S600 90,720 108 S960 126,1080 108 S1320 90,1440 108;
              M0 108 C120 90,240 90,360 108 S600 126,720 108 S960 90,1080 108 S1320 126,1440 108
            "
          />
        </path>

        <path>
          <animate
            attributeName="d"
            dur="15s"
            begin="-6s"
            repeatCount="indefinite"
            values="
              M0 138 C120 122,240 122,360 138 S600 154,720 138 S960 122,1080 138 S1320 154,1440 138;
              M0 138 C120 154,240 154,360 138 S600 122,720 138 S960 154,1080 138 S1320 122,1440 138;
              M0 138 C120 122,240 122,360 138 S600 154,720 138 S960 122,1080 138 S1320 154,1440 138
            "
          />
        </path>

        <path>
          <animate
            attributeName="d"
            dur="16s"
            begin="-8s"
            repeatCount="indefinite"
            values="
              M0 168 C120 154,240 154,360 168 S600 182,720 168 S960 154,1080 168 S1320 182,1440 168;
              M0 168 C120 182,240 182,360 168 S600 154,720 168 S960 182,1080 168 S1320 154,1440 168;
              M0 168 C120 154,240 154,360 168 S600 182,720 168 S960 154,1080 168 S1320 182,1440 168
            "
          />
        </path>

        <path>
          <animate
            attributeName="d"
            dur="17s"
            begin="-10s"
            repeatCount="indefinite"
            values="
              M0 198 C120 186,240 186,360 198 S600 210,720 198 S960 186,1080 198 S1320 210,1440 198;
              M0 198 C120 210,240 210,360 198 S600 186,720 198 S960 210,1080 198 S1320 186,1440 198;
              M0 198 C120 186,240 186,360 198 S600 210,720 198 S960 186,1080 198 S1320 210,1440 198
            "
          />
        </path>
      </svg>

      {/* MAIN SECTION */}
      <section className="coming-soon-section">
        <div className="dot1"></div>
        <div className="dot2"></div>

        <div className="content">
          <h1
            dangerouslySetInnerHTML={{
    __html: (sectionData?.title)
      .replace(/\\u003C/g, "<")    // decode escaped <
      .replace(/\\u003E/g, ">")    // decode escaped >
      .replace(/className=/g, "class="), // convert JSX to HTML
  }}
          />

          <center>
            <p>{sectionData.description}</p>
          </center>
        </div>

        {/* Circle Text + Logo */}
        <div className="circle-wrapper">
          <svg
            viewBox="0 0 200 200"
            className="circle-text"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                id="circlePath"
                d="
                  M100,100
                  m-80,0
                  a80,80 0 1,1 160,0
                  a80,80 0 1,1 -160,0
                "
              />
            </defs>

            <text dy="5">
              <textPath
                xlinkHref="#circlePath"
                textLength="500"
              >
                {sectionData.subDescription}
              </textPath>
            </text>
          </svg>

          <div className="logo-center">
            <img src="assets/logo.png" alt="Logo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
