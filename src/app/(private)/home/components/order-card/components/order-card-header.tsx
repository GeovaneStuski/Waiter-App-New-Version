type Props = {
  icon: string;
  title: string;
}

export function OrderCardHeader({ icon, title }: Props) {
  return (
    <div className="items-center h-11 flex gap-2 text-lg">
      <span>{icon}</span>
      <span className="font-semibold">{title}</span>
    </div>
  )
}