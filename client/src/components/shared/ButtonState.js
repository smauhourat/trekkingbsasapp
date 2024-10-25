import React, { useState } from 'react';
import './ButtonState.css'; // Import your CSS file

const ButtonState = ({ onClick, loadingText, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true); // Disable the button

    try {
      await onClick(); // Call the provided onClick function
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <button
      className={`btn btn-small ${isLoading ? 'btn-disabled' : 'btn-success'}`}
      onClick={handleClick}
      disabled={isLoading}
    >
        {isLoading && (
            <i
                className="fa fa-spinner fa-spin"
                style={{ marginRight: "5px" }}
            />
        )}        
          {isLoading ? loadingText : children}
    </button>
  );
};

export default ButtonState;
