'use client';

import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import '../status/thank.css';

export default function Status() {

  return (
    <div className="verify-container" style={{marginTop:'4%'}}>
   
      <div className="verify-box" style={{ maxWidth:'500px'}}>
        <FaCheckCircle size={60} color="#ff8c2f" />
        <h2>Thank you!</h2>
        <center><p style={{maxWidth:'400px', margin:'15px 0'}}>Your message has been sent.  We will come back to you within 24 hours on business days.</p>
        </center>
        <Link href="/">
          <button className="login-btn">Home</button>
        </Link>
      </div>
    </div>
  );
}
