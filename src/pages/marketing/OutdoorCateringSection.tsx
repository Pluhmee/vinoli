import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAppStore } from '@/store/useAppStore';

export function OutdoorCateringSection() {
  const setCatererModalOpen = useAppStore((s) => s.setCatererModalOpen);

  return (
    <section
      id="outdoor-catering"
      className="mx-auto max-w-7xl px-3 pb-14 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-[#240442] text-[#FDF9ED] sm:rounded-[2.25rem]">
        <div className="grid lg:grid-cols-12">
          {/* Left Poster Column */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#FC7B0F]">
              Outdoor Party &amp; Event Feasts
            </p>

            <h2
              style={{ fontFamily: "'Poppins', var(--font-display)" }}
              className="mt-3 text-2xl font-black uppercase leading-[1.06] tracking-tight text-[#FDF9ED] sm:text-4xl"
            >
              Need professional outdoor event caterers?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#FDF9ED]/80 sm:text-base">
              Hosting a wedding, birthday bash, corporate summit, or family celebration?
              Connect directly with verified outdoor caterers or join Nigeria’s party
              catering network.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={ROUTES.CATERING}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FC7B0F] px-7 text-sm font-extrabold text-white transition hover:bg-[#FF8E2B]"
              >
                <span>View outdoor caterers</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setCatererModalOpen(true)}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#FDF9ED]/30 px-7 text-sm font-extrabold text-[#FDF9ED] transition hover:border-[#FC7B0F] hover:text-[#FC7B0F]"
              >
                Register as an event caterer
              </button>
            </div>
          </div>

          {/* Right Unobstructed Editorial Photograph */}
          <div className="h-64 sm:h-80 lg:col-span-5 lg:h-auto lg:min-h-[24rem]">
            <img
              src="/images/outdoor-catering.jpg"
              alt="Outdoor event chafing dish buffet under celebration marquee"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OutdoorCateringSection;
