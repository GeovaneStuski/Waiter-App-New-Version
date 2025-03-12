import { CircleUserIcon, HouseIcon, NotepadTextIcon, ScrollTextIcon, UsersIcon } from 'lucide-react';

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
    icon: ScrollTextIcon,
    position: 'middle'
  },
  {
    link: '/menu',
    label: 'Cardápio',
    icon: NotepadTextIcon,
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
] as const;