import React, { useRef, useEffect, forwardRef } from "react";

const OpenViduVideoComponent = forwardRef(({ streamManager, readyState }, ref) => {
  useEffect(() => {
    if (streamManager && ref.current) {
      streamManager.addVideoElement(ref.current);
    }
  }, [streamManager, ref]);

  return (
    <>
      {readyState && (
        <div className="flex justify-end">
          <div className="absolute text-sm text-amber-500 bg-amber-200 rounded">준비완료</div>
        </div>
      )}
      <video className="h-10vh w-20vw" autoPlay={true} ref={ref} />
    </>
  );
});

export default OpenViduVideoComponent;
