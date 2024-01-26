const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-screen md:max-w-md md:h-screen bg-gray-300 mx-auto">{children}</div>
  );
};

export default MainLayout;
