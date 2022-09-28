import { ContactsItem } from '../../redux/slices/contacts'

export interface IContactsCard {
  className?: string
  data: ContactsItem | null
}