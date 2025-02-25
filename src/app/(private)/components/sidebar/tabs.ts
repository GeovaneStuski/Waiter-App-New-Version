import { CircleUserIcon, HouseIcon, NotepadText, ScrollText, UsersIcon } from "lucide-react"

export const tabs = [
  {
    link: '/home',
    label: 'Home',
    icon: HouseIcon,
    position: 'middle'
  },
  {
    link: '/history',
    label: 'Histórico',
    icon: ScrollText,
    position: 'middle'
  },
  {
    link: '/order',
    label: 'Cardápio',
    icon: NotepadText,
    position: 'middle'
  },
  {
    link: '/users',
    label: 'Usuários',
    icon: UsersIcon,
    position: 'middle'
  },
  {
    link: '/profile',
    label: 'Meu perfil',
    icon: CircleUserIcon,
    position: 'bottom'
  },
] as const