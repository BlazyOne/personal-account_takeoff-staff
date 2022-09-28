import { FC, useState } from 'react';
import cx from 'classnames';
import { IContactsCard } from './ContactsCard.d';
import '../../styles/blocks/contacts-card.scss';

const ContactsCard : FC<IContactsCard> = ({ className, data }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={cx('contacts-card', className)}>
      <div className='contacts-card__title'>{data?.name}</div>
      {!isEditing && (
        <div className='contacts-card__display-wrapper'>
          {data?.email && data?.email.length > 0 && (
            <div className='contacts-card__item'>
              <div className='contacts-card__item-title'>
                E-mail:
              </div>
              <div className='contacts-card__item-values-wrapper'>
                {data.email.map((email, i) => {
                  return (
                    <div className='contacts-card__item-value' key={i}>{email}</div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.phone && data?.phone.length > 0 && (
            <div className='contacts-card__item'>
              <div className='contacts-card__item-title'>
                Phone:
              </div>
              <div className='contacts-card__item-values-wrapper'>
                {data.phone.map((phone, i) => {
                  return (
                    <div className='contacts-card__item-value' key={i}>{phone}</div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.address && data?.address.length > 0 && (
            <div className='contacts-card__item'>
              <div className='contacts-card__item-title'>
                Address:
              </div>
              <div className='contacts-card__item-values-wrapper'>
                {data.address.map((address, i) => {
                  return (
                    <div className='contacts-card__item-value' key={i}>{address}</div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsCard;