import { ContactsItem } from '../../redux/slices/contacts';

export interface IContactFormModal {
  isOpen: boolean
  closeModal: () => void,
  editingData?: ContactsItem | null,
}