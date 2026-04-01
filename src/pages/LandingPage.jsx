import { Link } from "react-router-dom";
import headerLogo from "../assets/images.jpg";
import eventBanner from "../assets/hero.jpg";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="h-[80px] sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur flex justify-between items-center px-10">
        <img
          src={headerLogo}
          alt="Light Nation"
          className="h-12 w-auto rounded-lg object-cover sm:h-14"
        />
        <Link
          to="/register"
          className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          Register
        </Link>
      </header>

      <main>
        <section className="mx-auto flex items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap w-full items-center gap-8 rounded-3xl border border-white/10 bg-linear-to-br from-orange-950 via-slate-900 to-slate-950 p-8 shadow-2xl sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
            <div className="w-full lg:w-[50%]">
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                HolyGhost Experience
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                South-South Holy Ghost Experience is a Light Nation event in
                Port Harcourt where attendees can quickly register onsite and
                receive a unique registration number instantly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-orange-400"
                >
                  REGISTER NOW
                </Link>
              </div>
            </div>

            <div className="flex w-full lg:w-[40%] h-[500px]  justify-center lg:justify-end">
              <img
                src={eventBanner}
                alt="HolyGhost Experience event banner"
                className=" w-full rounded-2xl h-full border border-white/10 object-cover shadow-xl"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
