import { cn } from '@/utils/cn';

interface CheckboxProps {
  id?: string;
  name?: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export function Checkbox(props: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked);
    }
  };

  return (
    <div className={cn("w-full flex gap-2 mb-4", props.className)}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={props.checked || false}
          onChange={handleChange}
          disabled={props.disabled || false}
          className="w-4 h-4 text-brand bg-white border-slate-500/50 rounded focus:ring-brand focus:ring-2"
        />
        <span className="text-slate-800/80">{props.label}</span>
      </label>
    </div>
  );
}
