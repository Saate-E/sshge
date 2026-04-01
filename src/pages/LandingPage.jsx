import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../assets/images.jpg";
import eventBanner from "../assets/hero.jpg";
import eventVideo from "../assets/Download.mp4";

function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <img
            src={headerLogo}
            alt="Light Nation"
            className="h-10 w-auto rounded-lg object-cover sm:h-12 lg:h-14"
          />
          <Link
            to="/register"
            className="shrink-0 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400 sm:px-5 sm:py-2.5"
          >
            Register
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid w-full items-center gap-8 rounded-3xl border border-white/10 bg-linear-to-br from-orange-950 via-slate-900 to-slate-950 p-6 shadow-2xl sm:gap-10 sm:p-8 md:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:p-14 xl:p-16">
            <div className="order-2 w-full lg:order-1">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                HolyGhost Experience
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
                South-South Holy Ghost Experience is a Light Nation event in
                Port Harcourt where attendees can quickly register onsite and
                receive a unique registration number instantly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-400 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                >
                  REGISTER NOW
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-center lg:order-2 lg:justify-end">
              <img
                src={eventBanner}
                alt="HolyGhost Experience event banner"
                className="h-[300px] w-full max-w-xl rounded-2xl border border-white/10 object-cover shadow-xl sm:h-72 md:h-80 lg:h-[420px] xl:h-[500px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl sm:p-8 lg:p-10">
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <CountdownCard label="Days" value={timeLeft.days} />
              <CountdownCard label="Hours" value={timeLeft.hours} />
              <CountdownCard label="Minutes" value={timeLeft.minutes} />
              <CountdownCard label="Seconds" value={timeLeft.seconds} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:p-10">
            <div className="w-full h-[400px]">
              <video
                className="h-full w-full object-cover"
                controls
                autoPlay
                preload="metadata"
                src={eventVideo}
              ></video>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <DetailCard
                icon="calendar"
                label="Date"
                value={timeLeft.targetLabel}
              />
              <DetailCard icon="clock" label="Time" value="5:00 PM" />
              <DetailCard
                icon="location"
                label="Venue"
                value="Port Harcourt, Rivers State"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CountdownCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-center sm:p-5">
      <p className="text-3xl font-bold text-white sm:text-4xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-orange-950/60 to-slate-950 p-5 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
          <DetailIcon type={icon} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
          {label}
        </p>
      </div>
      <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
        {value}
      </p>
    </div>
  );
}

function getTimeLeft() {
  const eventDate = getUpcomingAprilTwentyEighth();
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    targetLabel: formatEventDate(eventDate),
  };
}

function getUpcomingAprilTwentyEighth() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const thisYearEvent = new Date(currentYear, 3, 28, 23, 59, 59);

  return now <= thisYearEvent
    ? thisYearEvent
    : new Date(currentYear + 1, 3, 28, 23, 59, 59);
}

function formatEventDate(date) {
  return `28th April ${date.getFullYear()}`;
}

function DetailIcon({ type }) {
  if (type === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M8 3v3M16 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M12 7v5l3 3M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default LandingPage;
