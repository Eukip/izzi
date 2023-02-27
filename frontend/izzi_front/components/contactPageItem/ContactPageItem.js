import React from "react";

const ContactPageItem = ({description,vkontakte,odnoklassniki,phone1,phone2,phone3,email,facebook,instagram,address}) => {
  return (
    <div>
      <h3 className="title-box">Контакты</h3>
      <p className="description">
        {description}
      </p>
      <div className="promoter-contacts">
        <div className="contacts-block">
          <h4>Наши телефоны:</h4>
          <div className="links">
            <a className="phone" href={`tel: ${phone1}`}>
              {phone1}
            </a>
            <a className="phone" href={`tel: ${phone2}`}>
              {phone2}
            </a>
            <a className="phone" href={`tel: ${phone3}`} >
              {phone3}
            </a>
          </div>
        </div>
        <div className="contacts-block email-block">
          <div className="links-wrapper">
            <h4>Email:</h4>
            <div className="links">
              <a className="email">
                {email}
              </a>
            </div>
          </div>
          <div className="links-wrapper">
            <h4>Наш адрес:</h4>
            <div className="links">
              <a className="address">
                {address}
              </a>
            </div>
          </div>
        </div>
        <div className="contacts-block">
          <h4>Мы в социальных сетях:</h4>
          <div className="links">
            <a className="facebook" href={facebook}>
              Facebook
            </a>
            <a className="vk" href={vkontakte}>
              VKontakte
            </a>
            <a className="insta" href={instagram} >
              Instagram
            </a>
            <a className="ok" href={odnoklassniki}>
              Odnoklassniki
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageItem;
