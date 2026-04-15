import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import headerLogo from "../assets/image.png";
import {
  adminCredentials,
  isAdminAuthenticated,
  loginAdmin,
} from "../lib/adminAuth";

function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      form.email === adminCredentials.email &&
      form.password === adminCredentials.password
    ) {
      loginAdmin();
      navigate("/admin/dashboard");
      return;
    }

    setError("Incorrect admin email or password.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 border-b flex h-24 items-center justify-between border-white/10 bg-slate-950/90 backdrop-blur">
        <img
          src={headerLogo}
          alt="Light Nation"
          className="lg:w-[15%] w-[20%] object-contain"
        />
        <Link
          to="/"
          className="rounded-full mr-10 bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          Home
        </Link>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-89px)] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Admin Login
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            SSHGE Dashboard Access
          </h1>
          <p className="mt-3 text-slate-400">
            Sign in to view registration charts and the spreadsheet of
            registered people.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="admin@sshge.org"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Enter password"
            />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-orange-400"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>
      <input
        className="block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default AdminLoginPage;
