
import React from 'react';
import { HeartPulse, ShieldCheck, Award, TrendingUp } from 'lucide-react';
import { STORE_NAME } from '../constants';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden isolate">
        <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <div className="mx-auto max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-sm">
                Redefining Medical Elegance
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-200">
                More Than Uniforms. A Statement of Care. Discover apparel designed to honor the dignity of your profession.
              </p>
          </div>
        </div>
      </div>

      {/* Our Story / History Section */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full z-0"></div>
                    <img 
                        src="https://res.cloudinary.com/dldtmvsow/image/upload/v1767449732/467624679_18063795511754000_8701816835706790505_n_1_soz1xr.jpg" 
                        alt="Founder working" 
                        className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg z-20 border border-gray-100 dark:border-slate-700 max-w-xs">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Established</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">2018</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">The year Dr. Nurse Collection was established in Nairobi.</p>
                    </div>
                </div>
                
                <div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm mb-2 block">Our Story</span>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                        Crafted for the healers of the world
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                        <p>
                            Born from the need for scrubs that work as hard as you do, we are dedicated to empowering healthcare professionals. Our journey began in a small clinic, witnessing firsthand the gap between functional medical wear and professional elegance.
                        </p>
                        <p>
                            Today, {STORE_NAME} stands at the intersection of medical science and textile innovation, ensuring every stitch supports your movement during those critical 12-hour shifts.
                        </p>
                        <p>
                             We started with a single sewing machine and a dream. Now, we dress thousands of professionals across the region, yet our heart remains the same: to serve those who serve us.
                        </p>
                    </div>
                    
                    <div className="mt-10">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30">
                            Read Our Full History
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Our Core Values</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Built on the pillars of integrity and innovation, we promise apparel that doesn't just fit, but performs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Value 1 */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
                    <div className="mx-auto h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Uncompromising Quality</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Fabrics engineered for durability and longevity in clinical settings. Antimicrobial and fluid-repellent technologies standard.
                    </p>
                </div>

                {/* Value 2 */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
                    <div className="mx-auto h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                        <HeartPulse className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">All-Day Comfort</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Ergonomically designed for 12-hour shifts. 4-way stretch materials that move with you during demanding procedures.
                    </p>
                </div>

                {/* Value 3 */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
                    <div className="mx-auto h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                         <Award className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Modern Style</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Professionalism meets modern tailoring. Feel confident and look polished from rounds to recovery.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* Quote / Vision */}
      <section className="relative py-24 bg-blue-50 dark:bg-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="order-2 lg:order-1 relative">
                   <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 scale-95 opacity-20"></div>
                   <img 
                        src="https://res.cloudinary.com/dldtmvsow/image/upload/v1767449119/95585814_125070815831321_3263762497387102208_n_1_yrrkqv.jpg" 
                        alt="Visionary Look" 
                        className="rounded-2xl shadow-2xl relative z-10"
                   />
               </div>
               <div className="order-1 lg:order-2">
                   <div className="text-blue-600 dark:text-blue-400 text-6xl font-serif opacity-30 mb-4">"</div>
                   <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                       We believe healthcare heroes deserve to look and feel their best every single day.
                   </h2>
                   <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 italic">
                       "Our journey began with a simple sketch and a desire to bring dignity back to medical apparel. When you put on our scrubs, I want you to feel the respect we have for the work you do."
                   </p>
                   <div>
                       <p className="font-bold text-xl text-gray-900 dark:text-white">Dr. Stephen Maroa</p>
                       <p className="text-blue-600 dark:text-blue-400">Founder & CEO</p>
                   </div>
               </div>
          </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet the Team</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">The dedicated professionals behind the fabric.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: 'James Wilson', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
                    { name: 'Elena Rodriguez', role: 'Product Manager', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
                    { name: 'Michael Chang', role: 'Operations Director', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
                    { name: 'Amara Okafor', role: 'Customer Success', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200' }
                ].map((member) => (
                    <div key={member.name} className="text-center group">
                        <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform">
                            <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
