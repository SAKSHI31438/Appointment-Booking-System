import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-amber-100">
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
};

export default MainLayout;
