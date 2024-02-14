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
          <div className="absolute text-sm text-amber-500 bg-amber-200 rounded">준비완료</div>
        </div>
      )}
      <video className="h-10vh w-20vw" autoPlay={true} ref={videoRef} />
    </>
  );
}
