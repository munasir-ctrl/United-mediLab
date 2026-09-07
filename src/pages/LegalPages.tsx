import { SEO } from '@/components/SEO';

export function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" canonical="/privacy" />
      <section className="bg-navy-950 py-12 md:py-16">
        <div className="container-page">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-narrow prose prose-slate max-w-none">
          <div className="space-y-6 text-slate-600">
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
              This privacy policy is provided as a placeholder and should be reviewed by a legal professional before publication.
            </div>
            <h2 className="text-xl font-bold text-navy-900">Overview</h2>
            <p>United MediLab is committed to protecting the privacy of our patients and website visitors. This policy describes how we collect, use and protect your information.</p>
            <h2 className="text-xl font-bold text-navy-900">Patient Information</h2>
            <p>We collect patient information necessary for providing diagnostic services, including name, date of birth, contact details and medical test information. This information is stored securely and access is restricted.</p>
            <h2 className="text-xl font-bold text-navy-900">Report Access</h2>
            <p>Laboratory reports are stored securely and can only be accessed through our secure online portal using your Patient ID and date of birth. Access to reports is logged for security purposes.</p>
            <h2 className="text-xl font-bold text-navy-900">Data Security</h2>
            <p>We use industry-standard security measures including encryption, secure storage, and access controls to protect your information. Patient reports are stored in private storage and accessed only through signed, time-limited URLs.</p>
            <h2 className="text-xl font-bold text-navy-900">Contact</h2>
            <p>If you have questions about this privacy policy, please contact United MediLab directly.</p>
            <p className="text-sm text-slate-400">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <SEO title="Terms & Conditions" canonical="/terms" />
      <section className="bg-navy-950 py-12 md:py-16">
        <div className="container-page">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Terms &amp; Conditions</h1>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <div className="space-y-6 text-slate-600">
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
              These terms and conditions are provided as a placeholder and should be reviewed by a legal professional before publication.
            </div>
            <h2 className="text-xl font-bold text-navy-900">Use of Services</h2>
            <p>By using the United MediLab website and services, you agree to these terms and conditions. Our services include laboratory testing, diagnostic services, and online report access.</p>
            <h2 className="text-xl font-bold text-navy-900">Bookings</h2>
            <p>Booking requests submitted through our website are enquiries and are not confirmed until our team contacts you to schedule the appointment.</p>
            <h2 className="text-xl font-bold text-navy-900">Report Access</h2>
            <p>Access to laboratory reports through our online portal is provided for the convenience of patients. You are responsible for keeping your Patient ID confidential.</p>
            <h2 className="text-xl font-bold text-navy-900">Health Information</h2>
            <p>Information provided on this website is for general informational purposes only and is not a substitute for professional medical advice. Please consult your healthcare professional for medical guidance.</p>
            <h2 className="text-xl font-bold text-navy-900">Changes</h2>
            <p>We reserve the right to update these terms and conditions at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
            <p className="text-sm text-slate-400">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function LocationsPage() {
  return (
    <>
      <SEO title="Location" canonical="/locations" description="Visit United MediLab in Perumbavoor, Kerala. Find our address, contact details and directions." />
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">Our Location</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Visit United MediLab in Perumbavoor, Kerala.</p>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-navy-900">United MediLab</h2>
              <p className="mt-4 text-slate-600">
                Pattal, Perumbavoor - Kuruppampady Road,<br />
                Near Indian Oil Petrol Pump,<br />
                Perumbavoor, Kerala 683542, India
              </p>
              <p className="mt-4">
                <a href="tel:9539900048" className="text-primary-700 font-semibold hover:underline">9539900048</a>
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200/60">
              <div className="flex h-full min-h-[300px] items-center justify-center bg-gradient-to-br from-primary-50 to-cyan-50 p-8">
                <div className="text-center">
                  <p className="text-lg font-bold text-navy-900">United MediLab</p>
                  <p className="mt-1 text-sm text-slate-500">Perumbavoor, Kerala 683542</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
