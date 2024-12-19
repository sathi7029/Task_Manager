import React from "react";

function Error() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-2xl">404</div>
        <div className="text-xl font-semibold text-red-800">
          Page Not Found 🥲
        </div>
      </div>
    </>
  );
}

export default Error;
