import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();
  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video className="rounded-3xl" autoPlay={true} ref={videoRef} />;
}
