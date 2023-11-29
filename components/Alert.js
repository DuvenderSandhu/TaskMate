import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Alert = () => {
  
  let dataObject = useSelector(state => state.alert)
  const [isVisible, setIsVisible] = useState(false);
  // const dataObject = { type: "success", message: "fdaj" };
  const type= dataObject.type
  const message=dataObject.message

  useEffect(() => {
    // Check if the object has keys
    if (Object.keys(dataObject).length !== 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [dataObject]);

  const handleClose = () => {
    setIsVisible(false);
  };

  setTimeout(()=>{
    setIsVisible(false)
  
  },2000)
  return (
    <>
      {isVisible && (
        <div
          className={`bg-${type}-200 border-t-4 border-${type}-500 rounded-b text-${type}-900 px-4 py-3 shadow-md mb-4`}
        >
          <div className="flex items-center">
            <div className="text-xl">
              {type === 'success' ? (
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1zM9 13a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0v2z"
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-1-9a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2h-1a1 1 0 0 0-1 1z"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="font-bold">{type === 'success' ? 'Success!' : 'Error!'}</p>
              <p className="text-sm">{message}</p>
            </div>
            <div className="ml-auto">
              <button onClick={handleClose} className="text-${type}-500 hover:text-${type}-800">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.414 6.586a2 2 0 0 0-2.828 0L10 7.172 8.828 6a2 2 0 0 0-2.828 2.828L7.172 10l-1.172 1.172a2 2 0 0 0 2.828 2.828L10 12.828l1.172 1.172a2 2 0 0 0 2.828-2.828L12.828 10l1.172-1.172a2 2 0 0 0 0-2.828z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;