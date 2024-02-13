import background_pirate from "../assets/img/background_pirate.png";

const WebMobileLayout = ({ children }) => {
  return (
    <div
      className="w-full h-screen md:max-w-md md:h-screen border-2 border-black mx-auto  overflow-hidden"
      style={{
        backgroundImage: `url(${background_pirate})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default WebMobileLayout;
