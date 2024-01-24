import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video className="w-auto h-auto border-b-4 border-green-500" autoPlay={true} ref={videoRef} />
  );
}
