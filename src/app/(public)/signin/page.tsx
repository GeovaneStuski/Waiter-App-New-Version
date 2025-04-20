import { Header } from "./components/header";
import { Form } from "./components/form";

export default function SignInPage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[400px] flex-col items-center justify-center *:w-full">
      <Header />

      <Form />
    </div>
  );
}
