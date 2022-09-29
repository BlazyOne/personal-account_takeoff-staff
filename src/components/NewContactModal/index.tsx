import { FC } from 'react';
import { INewContactModal } from './NewContactModal.d';
import { Modal, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../../styles/blocks/contact-form.scss';

interface ContactFormValues {
  name: string
  email?: string[]
}

const NewContactModal: FC<INewContactModal> = ({ isOpen, closeModal }) => {
  const onFinish = (values: ContactFormValues) => {
    console.log(values);
    // closeModal();
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => closeModal()}
      footer={null}
      // bodyStyle={{overflow: 'auto', maxHeight: 'calc(100vh - 200px)'}}
    >
      <Form
        className='contact-form'
        name='new-contact-form'
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input/>
        </Form.Item>

        <Form.List
          name={'email'}
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
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewContactModal;