import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputField(
  { label, placeholder, id }: { label: string; placeholder: string; id: string }
) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
      />
    </Field>
  )
}
