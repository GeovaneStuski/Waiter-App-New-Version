import { cn } from "@/lib/utils";
import { getNestedValue } from "@/utils/get-nested-values";
import { ComponentProps, createContext, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type FieldContext = {
  name: string;
};

const Context = createContext({} as FieldContext);

interface FieldRootProps extends ComponentProps<"div"> {
  name: string;
}
export function FieldRoot({ name, className, ...props }: FieldRootProps) {
  const context = useMemo<FieldContext>(() => ({ name }), [name]);

  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = getNestedValue(errors, name)?.message;

  return (
    <Context.Provider value={context}>
      <div
        data-error={!!errorMessage}
        className={cn("group flex flex-col gap-1", className)}
        {...props}
      />
    </Context.Provider>
  );
}

export const useFieldContext = () => useContext(Context);
