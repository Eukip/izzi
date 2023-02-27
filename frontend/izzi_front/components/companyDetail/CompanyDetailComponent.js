import React from "react";
import ContentTabs from "./contentTabs/ContentTabs";
import ContentTop from "./contentTop/ContentTop";

const CompanyDetailComponent = (item) => {
    return (
        <main className="promoter-page">
            <div className="crumb">
                <div className="container">
                    <div className="crumb-list">
                        <a className="crumb-item" href="">
                            Главная
                        </a>
                        <span className="crumb-item">{item.company_name}</span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="promoter-content">
                    <ContentTop {...item}/>
                    <ContentTabs  {...item}/>
                </div>
            </div>
        </main>
    );
};

export default CompanyDetailComponent;
