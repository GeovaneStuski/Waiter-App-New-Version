import { Header } from "./components/header";
import { Form } from "./components/form";

export default function SignInPage() {
  return (
    <div className="h-full mx-auto w-full *:w-full max-w-[400px] flex flex-col justify-center items-center">
      <Header />

      <Form />
    </div>
  )
}