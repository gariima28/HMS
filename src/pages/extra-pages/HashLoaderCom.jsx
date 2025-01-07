import React from 'react';
import styled from 'styled-components';
import { Circles } from "react-loader-spinner"

// Styled component for the Hash Loader container
const HashLoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Hash Loader component
const HashLoader = () => {
    return (
        <HashLoaderContainer>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </HashLoaderContainer>
        
    );
};

// Export the HashLoader component
export default HashLoader;
