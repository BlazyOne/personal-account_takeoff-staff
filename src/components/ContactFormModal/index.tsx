import { FC } from 'react';
import { IContactFormModal } from './ContactFormModal';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { currentUser } from '../../redux/slices/user';
import { addContactItem, editConactItem } from '../../redux/actions/contacts';
import { Modal, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../../styles/blocks/contact-form.scss';

export interface ContactFormValues {
  name: string
  email?: string[]
  phone?: string[]
  address?: string[]
}

const NewContactModal: FC<IContactFormModal> = ({ isOpen, closeModal, editingData }) => {
  const dispatch = useAppDispatch();
  const currentUserRedux = useAppSelector(currentUser);

  const [form] = Form.useForm();

  const onCreate = (values: ContactFormValues) => {
    const dataToSend = JSON.stringify(Object.assign({}, values, { userId: currentUserRedux?.id }));
    dispatch(addContactItem(dataToSend));
    form.resetFields();
    closeModal();
  };

  const onEdit = (values: ContactFormValues) => {
    const jsonData = JSON.stringify(Object.assign({}, values, { userId: currentUserRedux?.id }));
    dispatch(editConactItem({ contactId: editingData?.id as number, jsonData }));
    form.resetFields();
    closeModal()
  }

  const onFinish = editingData ? onEdit : onCreate;

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  const modalTitle = editingData ? 'Edit contact' : 'Create contact';
  const submitText = editingData ? 'Save' : 'Create';

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      title={modalTitle}
      // bodyStyle={{overflow: 'auto', maxHeight: 'calc(100vh - 200px)'}}
    >
      <Form
        className='contact-form'
        name='new-contact-form'
        layout='vertical'
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input name' }]}
          initialValue={editingData ? editingData.name : ''}
        >
          <Input/>
        </Form.Item>

        <Form.List
          name={'email'}
          initialValue={editingData ? editingData.email : undefined}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'E-mail' : ''}
                  required={false}
                  key={field.key}
                >
                  <div className='contact-form__item-wrapper contact-form__item-wrapper--deletable'>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          type: 'email',
                          message: "Please input e-mail or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder='E-mail' />
                    </Form.Item>
                    <Button
                      className='contact-form__item-delete-btn'
                      type='text'
                      shape='circle'
                      icon={<MinusCircleOutlined/>}
                      onClick={() => remove(field.name)}
                    />
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  icon={<PlusOutlined/>}
                >
                  Add E-mail
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List
          name={'phone'}
          initialValue={editingData ? editingData.phone : undefined}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Phone' : ''}
                  required={false}
                  key={field.key}
                >
                  <div className='contact-form__item-wrapper contact-form__item-wrapper--deletable'>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input phone or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder='Phone' />
                    </Form.Item>
                    <Button
                      className='contact-form__item-delete-btn'
                      type='text'
                      shape='circle'
                      icon={<MinusCircleOutlined/>}
                      onClick={() => remove(field.name)}
                    />
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  icon={<PlusOutlined/>}
                >
                  Add Phone
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List
          name={'address'}
          initialValue={editingData ? editingData.address : undefined}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Address' : ''}
                  required={false}
                  key={field.key}
                >
                  <div className='contact-form__item-wrapper contact-form__item-wrapper--deletable'>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input address or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input.TextArea placeholder='Address' autoSize={{ minRows: 1, maxRows: 3 }}/>
                    </Form.Item>
                    <Button
                      className='contact-form__item-delete-btn'
                      type='text'
                      shape='circle'
                      icon={<MinusCircleOutlined/>}
                      onClick={() => remove(field.name)}
                    />
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  icon={<PlusOutlined/>}
                >
                  Add Address
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <div className='contact-form__main-btns'>
            <Button className='contact-form__submit-btn' type="primary" htmlType="submit">
              {submitText}
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewContactModal;