import React from 'react';
import { HeartPulse, ShieldCheck, Users, Globe } from 'lucide-react';
import { STORE_NAME } from '../constants';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            About {STORE_NAME}
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
            Empowering healthcare professionals with style, comfort, and durability. We believe that when you look good and feel good, you do your best work.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Elevating the Standard of Medical Apparel
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Founded in Nairobi, {STORE_NAME} began with a simple observation: healthcare professionals work incredibly hard, yet their uniforms often lack comfort and personality. We set out to change that by curating a collection of premium scrubs, lab coats, and accessories that meet the rigorous demands of the medical field while allowing for personal expression.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <HeartPulse className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Passion for Healthcare
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  We understand the heartbeat of the medical community. Every product is selected to support the heroes who save lives every day.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Uncompromised Quality
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  From authentic Littmann stethoscopes to premium fabric blends, we ensure every item in our inventory meets global standards.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Community Focused
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  We are more than a store; we are a partner in your career journey, offering customization and support for students and veterans alike.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Nationwide Reach
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  Serving professionals across the country with reliable delivery and top-tier customer service.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Image Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-96 md:h-[500px]">
        <img 
            src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Medical Team" 
            className="w-full h-full object-cover"
        />
        <div className="bg-slate-50 dark:bg-slate-800 p-12 flex flex-col justify-center">
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join the Dr. Nurse Family</h3>
             <p className="text-gray-600 dark:text-gray-300 mb-6">
                 Whether you are a medical student just starting out or a specialized surgeon, we have the attire that fits your needs. Experience the difference of quality workwear.
             </p>
             <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                 — The Dr. Nurse Collections Team
             </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;