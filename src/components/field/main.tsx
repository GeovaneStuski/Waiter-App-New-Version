import { Slot } from '@radix-ui/react-slot';
import { ComponentProps, ReactNode } from 'react';
import { useFieldContext } from './root';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

type RenderFn = ComponentProps<typeof Controller>['render'];

type Props<TController extends boolean> = {
  controller?: TController;
  className?: string;
  children: TController extends true ? RenderFn : ReactNode;
};

export function FieldMain<TController extends boolean>({
  controller = false as TController,
  className,
  children,
}: Props<TController>) {
  const { register, control } = useFormContext();
  const { name } = useFieldContext();

  if (controller) {
    return (
      <Controller name={name} control={control} render={children as RenderFn} />
    );
  }

  return (
    <Slot
      id={name}
      className={cn(
        'group-data-[error=true]:border-red-500 group-data-[error=true]:bg-red-500/5',
        className,
      )}
      {...register(name)}
    >
      {children as ReactNode}
    </Slot>
  );
}
