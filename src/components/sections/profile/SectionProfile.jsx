import React from 'react';

import './SectionProfile.scss';

const SectionProfile = (props) => {
  const { profile } = props;

  return (
    <div className="section-profile">
      <span className="section-profile__big-title">Connected as</span>
      <div className="section-profile__item">
        <span className="section-profile__item__title">Name:&nbsp;</span>
        <span className="section-profile__item__value">{profile.name}</span>
      </div>
      <div className="section-profile__item">
        <span className="section-profile__item__title">Email:&nbsp;</span>
        <span className="section-profile__item__value">{profile.email}</span>
      </div>
      <div className="section-profile__item">
        <span className="section-profile__item__title">Role:&nbsp;</span>
        <span className="section-profile__item__value">{profile.role}</span>
      </div>
    </div>
  );
};

export default SectionProfile;
