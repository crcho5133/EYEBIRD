import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video className="w-full h-24" autoPlay={true} ref={videoRef} />;
}
