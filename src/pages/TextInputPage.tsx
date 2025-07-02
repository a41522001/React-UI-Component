import { useState } from 'react';
import TextInput from '../components/TextInput';
import Btn from '../components/Btn';
interface User {
  username: string;
  email: string;
  password: string;
}
const initialUser: User = {
  username: '',
  email: '',
  password: '',
};

const TextInputPage = () => {
  const [user, setUser] = useState<User>(initialUser);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const rules = {
    email: [(value: string) => emailRegex.test(value) || '請輸入正確的信箱格式'],
    password: [(value: string) => value.length >= 6 || '請輸入6位數或以上的密碼'],
  };
  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };
  const handleSubmitForm = (): void => {
    console.log(user);
  };
  return (
    <>
      <div className="flex flex-col items-center gap-3 border p-3 rounded border-zinc-500 max-w-80 mx-auto bg-sky-50">
        <form className="flex flex-col items-start gap-3" onSubmit={(e) => e.preventDefault()}>
          <TextInput
            value={user.username}
            onChange={handleSetUser}
            type="text"
            label="用戶名"
            className="max-w-40 w-full"
            wrapClassName="w-40"
            name="username"
            id="username"
          />
          <TextInput
            value={user.email}
            onChange={handleSetUser}
            type="text"
            label="電子信箱"
            className="max-w-40 w-full"
            wrapClassName="w-40"
            rules={rules.email}
            name="email"
            id="email"
          />
          <TextInput
            value={user.password}
            onChange={handleSetUser}
            type="password"
            label="密碼"
            className="max-w-40 w-full"
            wrapClassName="w-40"
            rules={rules.password}
            name="password"
            id="password"
          />
          <Btn className="btn-primary" onClick={handleSubmitForm}>
            送出
          </Btn>
        </form>
      </div>
      <div>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.password}</p>
      </div>
    </>
  );
};
export default TextInputPage;
