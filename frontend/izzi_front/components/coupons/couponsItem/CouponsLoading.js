import React from 'react';
import ContentLoader from "react-content-loader";
const CouponsLoading = () => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={400}
            viewBox="0 0 300 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="12" ry="12" width="290" height="266" />
        </ContentLoader>
    );
};

export default CouponsLoading;