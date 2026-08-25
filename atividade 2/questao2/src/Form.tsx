import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePickerTime } from './DatePickerTime'
import { InputField } from './InputField'


export function Form({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <InputField label="Nome" placeholder="Digite seu nome" id="name" />
      <DatePickerTime />
      <Button className="hover:cursor-pointer" type="submit">
        Agendar
      </Button>
    </form>
  )
}