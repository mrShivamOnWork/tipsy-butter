type Props = {
  name: string;
  description: string;
  price: string;
};

export function MenuListItem({ name, description, price }: Props) {
  return (
    <div className="group py-2">
      <div className="flex items-baseline gap-3">
        <h4 className="font-headline-md text-xl text-chalk-white group-hover:text-tertiary-fixed-dim transition-colors shrink-0">
          {name}
        </h4>
        <span className="dotted-leader text-white/20" />
        <span className="font-label-accent text-tertiary-fixed-dim shrink-0">{price}</span>
      </div>
      <p className="font-body-md text-sm text-white/55 italic mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
