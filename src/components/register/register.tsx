import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UserStructure } from "../../models/user";
import { UsersApiRepo } from "../../services/repositories/users.api.repo";

export function Register() {
  const repo = useMemo(() => new UsersApiRepo(), []);
  const { registerUser } = useUsers(repo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;

    const newUser: Partial<UserStructure> = {
      username: (formNewUser[0] as HTMLInputElement).value,
      lastName: (formNewUser[1] as HTMLInputElement).value,
      email: (formNewUser[2] as HTMLInputElement).value,
      passwd: (formNewUser[3] as HTMLInputElement).value,
    };
    registerUser(newUser);
    formNewUser.reset();
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form
        className="register-form"
        data-testid="form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          className="register-form__field"
          name="name"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="register-form__field"
          name="lastName"
        />
        <input
          type="text"
          placeholder="email"
          className="register-form__field"
          name="email"
        />
        <input
          type="text"
          placeholder="passwd"
          className="register-form__field"
          name="passwd"
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
