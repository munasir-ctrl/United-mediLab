import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Microscope, Dna, Zap, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export function Hero() {
  // Explicitly type the ref so Framer Motion accepts it without errors
  const constraintsRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const floatingY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section ref={constraintsRef} className="relative overflow-hidden bg-navy-950 py-20 lg:py-32 text-white selection:bg-primary-500/30 selection:text-cyan-200">
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-md border border-white/10 mb-6 shadow-inner">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-slate-300">Perumbavoor's Premier Diagnostic Center</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl text-white text-balance leading-[1.1]">
              Digital Diagnostics. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-primary-400 bg-clip-text text-transparent">
                Trusted Results.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Precision laboratory testing and advanced digital health services in Perumbavoor, Kerala. Get secure, instant access to your reports anywhere.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/patient-reports"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-5 text-base font-semibold text-white shadow-xl shadow-primary-600/20 transition-all duration-300 hover:scale-105 hover:shadow-primary-600/40 active:scale-[0.98]"
              >
                <span className="relative flex items-center gap-3 z-10">
                  Get Your Digital Report
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Link>

              <Link
                to="/tests"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 px-8 py-5 text-base font-semibold text-white backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                <Zap className="h-5 w-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="absolute w-80 h-80 bg-primary-500/30 rounded-full blur-[100px] animate-pulse" />
            
            <motion.div 
              style={{ y: floatingY }} 
              className="relative w-full h-full flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 bg-navy-900 p-8 rounded-full border border-white/10 shadow-2xl shadow-black/50"
              >
                <Microscope className="h-24 w-24 text-cyan-400" strokeWidth={1.5} />
              </motion.div>

              <FloatingIcon Icon={Dna} top="15%" left="10%" delay={0} constraintsRef={constraintsRef} />
              <FloatingIcon Icon={BrainCircuit} bottom="15%" right="5%" delay={1.5} constraintsRef={constraintsRef} />
              <FloatingIcon Icon={Zap} top="10%" right="15%" delay={1} constraintsRef={constraintsRef} />
              
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

interface FloatingIconProps {
  Icon: React.ElementType;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function FloatingIcon({ Icon, top, left, right, bottom, delay, constraintsRef }: FloatingIconProps) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      variants={{
        hidden: { opacity: 0, scale: 0 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { 
            delay: 2 + delay, 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1] 
          } 
        }
      }}
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 5, delay: delay, ease: "easeInOut" }}
      style={{ top, left, right, bottom, position: 'absolute' }}
      className="z-0 cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white/5 p-5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
        <Icon className="h-10 w-10 text-teal-300 opacity-80" />
      </div>
    </motion.div>
  );
}