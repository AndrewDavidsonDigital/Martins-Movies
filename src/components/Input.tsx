import { cn } from '@/utils/cn';

interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  value?: string;
  onChange?: (value: string) => void;
  onKbEnter?: () => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export function Input(props: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && props.onKbEnter){
      props.onKbEnter();
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-2 mb-4", props.className)}>
      {props.label && (
        <label htmlFor={props.id} className="text-slate-800/80">
          {props.label}
        </label>
      )}
      <input
        id={props.id}
        name={props.name}
        type={props.type ?? "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        onKeyDown={(e) => handleKeydown(e)}
        disabled={props.disabled ?? false}
        required={props.required ?? false}
        autoComplete={props.autoComplete}
        className="h-12 px-4 py-2 border border-slate-500/50 rounded-md text-slate-800/80 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
      />
    </div>
  );
}
