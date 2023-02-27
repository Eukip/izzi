import React from "react";

const ContentTop = (item) => {
    return (
        <div className="promoter-content__top">
            <div className="img">
                <img src={item.logo} alt="" />
            </div>
            <div className="description">
                <h3 className="title-box">{item.company_name}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    );
};

export default ContentTop;
