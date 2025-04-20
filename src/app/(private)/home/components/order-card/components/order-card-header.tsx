type Props = {
  icon: string;
  title: string;
};

export function OrderCardHeader({ icon, title }: Props) {
  return (
    <div className="flex h-11 items-center gap-2 text-lg">
      <span>{icon}</span>
      <span className="font-semibold">{title}</span>
    </div>
  );
}
