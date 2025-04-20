import { Label } from "@/components/ui/label";
import { ComponentProps } from "react";
import { useFieldContext } from "./root";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Label> & {
  isRequired?: boolean;
};

export function FieldLabel({ isRequired = false, className, ...props }: Props) {
  const { name } = useFieldContext();

  const content = (
    <Label
      htmlFor={name}
      className={cn("group-data-[error=true]:text-red-800", className)}
      {...props}
    />
  );

  if (isRequired) {
    return (
      <div className="flex items-center gap-0.5">
        {content}

        <span className="text-sm font-bold text-red-500">*</span>
      </div>
    );
  }

  return content;
}
