import { useFormContext } from "react-hook-form";
import { useFieldContext } from "./root";
import { AlertCircleIcon } from "lucide-react";
import { getNestedValue } from "@/utils/get-nested-values";

type Props = {
  errorFeedback?: string;
};

export function FieldError({ errorFeedback }: Props) {
  const {
    formState: { errors },
  } = useFormContext();
  const { name } = useFieldContext();

  const errorMessage =
    errorFeedback ||
    (getNestedValue(errors, name)?.message as string | undefined);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 truncate text-red-500">
      <AlertCircleIcon className="size-3.5 shrink-0" />
      <span title={errorMessage} className="truncate text-sm">
        {errorMessage}
      </span>
    </div>
  );
}
