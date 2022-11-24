import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import {FaPlay} from 'react-icons/fa'

const AnimatedButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={open}
        videoId="hAP2QF--2Dg"
        onClose={() => setOpen(false)}
      />
      <a
        onClick={() => setOpen(true)}
        href="#!"
        className="video-icon popup-youtube popup-video-btn text-decoration-none"
      >
        <i><FaPlay/></i>
      </a>
    </>
  );
};

export default dynamic(() => Promise.resolve(AnimatedButton), { ssr: false });
