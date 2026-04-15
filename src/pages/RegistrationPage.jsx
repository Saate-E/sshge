import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import headerLogo from "../assets/image.png";
import { DownloadIcon } from "lucide-react";
import {
  contactOptions,
  genderOptions,
  membershipInterestOptions,
  membershipOptions,
  referralOptions,
  statesOfResidence,
} from "../data/options";
import {
  generateRegistrationNumber,
  getRegistrations,
  saveRegistrations,
} from "../lib/registration";

const defaultForm = {
  name: "",
  phoneNumber: "",
  gender: "",
  email: "",
  stateOfResidence: "",
  occupation: "",
  isMember: "",
  heardAboutEvent: "",
  wantsNextContact: "",
  expectations: "",
};

function RegistrationPage() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [submittedUser, setSubmittedUser] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "isMember" &&
      value === "No (Just attending the South-South Holy Ghost Experience)"
    ) {
      setForm((current) => ({
        ...current,
        isMember: value,
        heardAboutEvent: "",
        wantsNextContact: "",
      }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!/^\d{10,15}$/.test(form.phoneNumber.replace(/\s/g, ""))) {
      nextErrors.phoneNumber = "Enter a valid phone number.";
    }
    if (!form.gender) nextErrors.gender = "Select a gender.";
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.stateOfResidence) nextErrors.stateOfResidence = "Select a state.";
    if (!form.occupation.trim())
      nextErrors.occupation = "Occupation is required.";
    if (!form.isMember) nextErrors.isMember = "Please choose an option.";
    if (
      form.isMember ===
      "No (Just attending the South-South Holy Ghost Experience)"
    ) {
      if (!form.heardAboutEvent) {
        nextErrors.heardAboutEvent =
          "Please select how you heard about the event.";
      }

      if (!form.wantsNextContact) {
        nextErrors.wantsNextContact = "Please choose an option.";
      }
    }
    if (!form.expectations.trim()) {
      nextErrors.expectations = "Please tell us your expectations.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const registrations = getRegistrations();
    const registrationNumber = generateRegistrationNumber(
      form.phoneNumber,
      registrations,
    );
    const newRegistration = {
      ...form,
      registrationNumber,
      createdAt: new Date().toISOString(),
    };

    saveRegistrations([newRegistration, ...registrations]);
    setSubmittedUser(newRegistration);
    setForm(defaultForm);
    setErrors({});
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

      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl sm:p-8">
              {submittedUser ? (
                <SuccessCard attendee={submittedUser} />
              ) : (
                <>
                  <h1 className="mt-3 text-3xl font-semibold text-white">
                    South-South Holy Ghost Experience
                  </h1>
                  <p className="text-sm text-slate-400">Registration Form</p>
                  <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                    <InputField
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Enter full name"
                    />
                    <InputField
                      label="Phone number"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      error={errors.phoneNumber}
                      placeholder="08012345678"
                    />
                    <SelectField
                      label="Gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      error={errors.gender}
                      options={genderOptions}
                    />
                    <InputField
                      label="Email address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                    <SelectField
                      label="State of residence"
                      name="stateOfResidence"
                      value={form.stateOfResidence}
                      onChange={handleChange}
                      error={errors.stateOfResidence}
                      options={statesOfResidence}
                    />
                    <InputField
                      label="Occupation"
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      error={errors.occupation}
                      placeholder="Enter occupation"
                    />
                    <SelectField
                      label="Are you a member of Light Nation?"
                      name="isMember"
                      value={form.isMember}
                      onChange={handleChange}
                      error={errors.isMember}
                      options={membershipOptions}
                    />

                    {form.isMember ===
                      "No (Just attending the South-South Holy Ghost Experience)" && (
                      <>
                        <SelectField
                          label="How did you hear about the South-South Holy Ghost Experience?"
                          name="heardAboutEvent"
                          value={form.heardAboutEvent}
                          onChange={handleChange}
                          error={errors.heardAboutEvent}
                          options={referralOptions}
                        />

                        <SelectField
                          label="Would you like to be contacted for the next South-South Holy Ghost Experience / Other programs?"
                          name="wantsNextContact"
                          value={form.wantsNextContact}
                          onChange={handleChange}
                          error={errors.wantsNextContact}
                          options={contactOptions}
                        />
                      </>
                    )}

                    <TextAreaField
                      label="What are your expectations for the South-South Holy Ghost Experience?"
                      name="expectations"
                      value={form.expectations}
                      onChange={handleChange}
                      error={errors.expectations}
                      placeholder="Share your expectations..."
                    />
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-orange-400"
                    >
                      Submit Registration
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
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
      {error ? (
        <span className="mt-2 block text-sm text-rose-300">{error}</span>
      ) : null}
    </label>
  );
}

function SelectField({ label, name, value, onChange, error, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>
      <select
        className="block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-orange-400"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select an option</option>
        {options.map((option) => {
          const normalizedOption =
            typeof option === "string"
              ? { label: option, value: option }
              : option;

          return (
            <option key={normalizedOption.value} value={normalizedOption.value}>
              {normalizedOption.label}
            </option>
          );
        })}
      </select>
      {error ? (
        <span className="mt-2 block text-sm text-rose-300">{error}</span>
      ) : null}
    </label>
  );
}

function TextAreaField({ label, name, value, onChange, error, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>
      <textarea
        className="block min-h-36 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error ? (
        <span className="mt-2 block text-sm text-rose-300">{error}</span>
      ) : null}
    </label>
  );
}

function SuccessCard({ attendee }) {
  const cardRef = useRef();

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a", // IMPORTANT (slate-950 equivalent)
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `${attendee.name}-registration.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div>
      {/* CARD */}
      <div
        ref={cardRef}
        className="rounded-3xl border border-orange-400/30 bg-slate-900 p-6 shadow-lg"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">
          Success Card
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          ✅ You are successfully registered
        </h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">👤 User&apos;s Name</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {attendee.name}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">🔢 Registration Number</p>
            <p className="mt-1 text-3xl font-bold tracking-[0.2em] text-orange-300">
              {attendee.registrationNumber}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-300">
          Screenshot and Show this at the ENTRANCE.
        </p>
      </div>

      {/* <div className="mt-4 flex justify-end">
        <div
          onClick={handleDownload}
          className="cursor-pointer flex items-center gap-2 text-orange-300 hover:text-orange-400 transition"
          title="Download Card"
        >
          Download
          <DownloadIcon size={20} />
        </div>
      </div> */}
    </div>
  );
}

export default RegistrationPage;
