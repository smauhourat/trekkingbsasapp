import React, { useState } from 'react';
import './ButtonState.css'; // Import your CSS file

const ButtonState = ({ onClick, cssClass, cssSuccessClass, loadingText, children }) => {
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
      className={`btn ${cssClass} ${isLoading ? 'btn-disabled' : (cssSuccessClass ? cssSuccessClass : 'btn-success')}`}
      onClick={handleClick}
      disabled={isLoading}
    >
          <div className='inline-flex'>
        {isLoading && (
            <i
                className="fa fa-spinner fa-spin"
                style={{ marginRight: "5px" }}
            />
        )}        
          <span>{isLoading ? loadingText : children}</span>
          </div>
    </button>
  );
};

export default ButtonState;
