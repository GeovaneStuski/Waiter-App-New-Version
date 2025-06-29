import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    if (type !== "password") {
      return (
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none !ring-0 ring-offset-background duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
      );
    }

    const Icon = isPasswordVisible ? EyeIcon : EyeOffIcon;

    return (
      <div
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none ring-offset-background duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
      >
        <input
          className="h-full w-full border-none bg-transparent px-0 text-[0.850rem] font-medium !ring-0"
          {...props}
          type={isPasswordVisible ? "text" : "password"}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible((prevState) => !prevState)}
        >
          <Icon className="size-5" />
        </button>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
