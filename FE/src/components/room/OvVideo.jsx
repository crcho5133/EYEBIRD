import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager, readyState }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {readyState && (
        <div className="flex justify-end">
          <div className="absolute text-sm text-green-500 bg-green-200 rounded">준비완료</div>
        </div>
      )}
      <video autoPlay={true} ref={videoRef} />
    </>
  );
}
