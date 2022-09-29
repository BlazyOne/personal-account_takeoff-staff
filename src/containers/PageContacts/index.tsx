import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { currentUser, clearUser } from '../../redux/slices/user';
import { contactsItems } from '../../redux/slices/contacts';
import { downloadContactsData } from '../../redux/actions/contacts';
import { Layout, Button, Input, Select } from 'antd';
import { ContactsCard, NewContactModal } from '../../components';
import { LogoutOutlined } from '@ant-design/icons';
import '../../styles/blocks/header.scss';
import '../../styles/blocks/contacts-controls.scss';

enum SortValues {
  DEFAULT = 'default',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
}

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const PageContacts: FC = () => {
  const dispatch = useAppDispatch();
  const currentUserRedux = useAppSelector(currentUser);
  const contactsItemsRedux = useAppSelector(contactsItems);

  const [sortType, setSortType] = useState<SortValues>(SortValues.DEFAULT);
  const [searchString, setSearchString] = useState('');
  const [sortedItems, setSortedItems] = useState(contactsItemsRedux);
  const [filteredItems, setFilteredItems] = useState(contactsItemsRedux);

  const [showNewContactModal, setShowNewContactModal] = useState(false);

  useEffect(() => {
    if (currentUserRedux) {
      dispatch(downloadContactsData(currentUserRedux.id));
    }
  }, [currentUserRedux, dispatch]);

  useEffect(() => {
    if (contactsItemsRedux && contactsItemsRedux?.length > 0) {
      let sortedItemsTemp = contactsItemsRedux.slice();

      if (sortType === SortValues.NAME_ASC) {
        sortedItemsTemp = sortedItemsTemp?.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      } else if (sortType === SortValues.NAME_DESC) {
        sortedItemsTemp = sortedItemsTemp?.sort((a, b) => {
          return -a.name.localeCompare(b.name);
        })
      }

      setSortedItems(sortedItemsTemp);
    }
  }, [sortType, contactsItemsRedux]);

  useEffect(() => {
    let filteredItemsTemp

    if (!searchString ) {
      filteredItemsTemp = sortedItems;
    } else {
      filteredItemsTemp = sortedItems?.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchString)
          || (item.email && item.email.some((email) => {
              return email.toLowerCase().includes(searchString);
            }))
          || (item.phone && item.phone.some((phone) => {
              return phone.toLowerCase().includes(searchString);
            }))
          || (item.address && item.address.some((address) => {
              return address.toLowerCase().includes(searchString);
            }))
        ) {
          return true;
        }
      }) as typeof contactsItemsRedux;
    }

    setFilteredItems(filteredItemsTemp);
  }, [searchString, sortedItems]);

  return (
    <Layout className='site-layout'>
      <Header className='header'>
        <div className='container header__wrapper'>
          <span className='header__user'>Current User: {currentUserRedux?.name}</span>
          <Button
            className='header__logout-btn'
            type='primary'
            icon={<LogoutOutlined />}
            onClick={() => dispatch(clearUser())}
          >
            Logout
          </Button>
        </div>
      </Header>
      <Content className='site-layout__content'>
        <div className='container site-layout__contacts-content-wrapper'>
          <div className='site-layout__contacts-controls contacts-controls'>
            <Search
              placeholder='input search text'
              className='contacts-controls__search'
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
            <div className='contacts-controls__sorting'>
              <span className='contacts-controls__sorting-label'>Sorting:</span>
              <Select
                className='contacts-controls__sorting-select'
                defaultValue={SortValues.DEFAULT}
                onChange={(value) => {
                  setSortType(value);
                }}
              >
                <Option value={SortValues.DEFAULT}>Default</Option>
                <Option value={SortValues.NAME_ASC}>Name asc.</Option>
                <Option value={SortValues.NAME_DESC}>Name desc.</Option>
              </Select>
            </div>
            <Button
              type='primary'
              onClick={() => setShowNewContactModal(true)}
            >
              New contact
            </Button>
            <NewContactModal
              isOpen={showNewContactModal}
              closeModal={() => setShowNewContactModal(false)}
            />
          </div>
          {
            filteredItems && filteredItems.length > 0 && (
              filteredItems.map((item) => {
                return <ContactsCard data={item} className='site-layout__contacts-card' key={item.id} />
              })
            )
          }
        </div>
      </Content>
    </Layout>
  );
};

export default PageContacts;