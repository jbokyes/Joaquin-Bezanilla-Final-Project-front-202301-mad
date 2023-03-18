import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UserStructure } from "../../models/user";
import { UsersApiRepo } from "../../services/repositories/users.repo";
import styles from "./register.module.scss";

export function Register() {
  const repo = useMemo(() => new UsersApiRepo(), []);
  const { registerUser } = useUsers(repo);

  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    debugger;
    const formNewUser = ev.currentTarget;

    const newUser: Partial<UserStructure> = {
      username: (formNewUser.elements[0] as HTMLFormElement).value,
      lastName: (formNewUser.elements[1] as HTMLInputElement).value,
      email: (formNewUser.elements[2] as HTMLInputElement).value,
      passwd: (formNewUser.elements[3] as HTMLInputElement).value,
    };
    await registerUser(newUser);
    formNewUser.reset();
  };

  return (
    <div className={styles.register}>
      <h2>Register</h2>

      <form data-testid="form" onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Name"
            className="register-form__field"
            name="name"
          />
        </div>
        <div>
          <p>Last name:</p>
          <input
            type="text"
            placeholder="Last Name"
            className="register-form__field"
            name="lastName"
          />
        </div>
        <div>
          <p>Email:</p>
          <input
            type="text"
            placeholder="email"
            className="register-form__field"
            name="email"
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="text"
            placeholder="Password"
            className="register-form__field"
            name="passwd"
          />
        </div>

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
