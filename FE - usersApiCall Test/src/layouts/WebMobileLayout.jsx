const WebMobileLayout = ({ children }) => {
  return (
    <div className="w-full h-screen md:max-w-md md:h-screen border-2 border-black opacity-85 mx-auto">
      {children}
    </div>
  );
};

export default WebMobileLayout;
