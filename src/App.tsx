/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Mic2, Radio, Github, Twitter, Linkedin, ArrowUpRight, Play, Volume2, Zap, Target, Layers, Music, Activity } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Custom Cursor Component
const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 border-2 border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

// Audio Player Component
const AudioPlayer = ({ artistName }: { artistName: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="mt-4 bg-black/40 backdrop-blur-sm p-3 border border-white/10 rounded-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full hover:scale-110 transition-transform"
        >
          {isPlaying ? <Volume2 size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <div className="flex-grow">
          <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent" 
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Sample_Track.mp3</span>
            <span className="text-[8px] font-mono text-slate-400">0:45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sound Wave Component
const SoundWave = () => (
  <div className="flex items-end gap-1 h-12">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [10, 40, 15, 48, 20] }}
        transition={{ 
          duration: 0.5 + Math.random(), 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 0.1
        }}
        className="w-1 bg-accent"
      />
    ))}
  </div>
);

const ARTISTS = [
  { 
    name: 'Vocal_Viper', 
    seed: 'art1', 
    role: 'Bass_Specialist',
    bio: 'The undisputed king of sub-harmonics. Viper has been dominating the Mumbai underground scene since 2019 with his signature "Earthquake" bass.',
    socials: { ig: '@vocal_viper', yt: 'ViperBeats' }
  },
  { 
    name: 'Beat_Beast', 
    seed: 'art2', 
    role: 'Rhythm_Master',
    bio: 'A human metronome. Known for complex polyrhythms and high-speed technical patterns that defy physical limits.',
    socials: { ig: '@beatbeast_official', yt: 'BeastMode' }
  },
  { 
    name: 'Sonic_Samurai', 
    seed: 'art3', 
    role: 'Technical_God',
    bio: 'Precision is his weapon. The Samurai blends traditional Indian percussion sounds with modern electronic beatbox techniques.',
    socials: { ig: '@sonic_samurai', yt: 'SamuraiSonic' }
  },
  { 
    name: 'Echo_Enigma', 
    seed: 'art4', 
    role: 'Atmosphere_King',
    bio: 'Master of soundscapes. Using only his voice, he creates immersive environments that transport listeners to another dimension.',
    socials: { ig: '@echo_enigma', yt: 'EnigmaSounds' }
  },
  { 
    name: 'Rhythm_Rogue', 
    seed: 'art5', 
    role: 'Flow_Architect',
    bio: 'The smoothest flow in the city. Rogue seamlessly transitions between genres, from old-school hip-hop to modern trap beats.',
    socials: { ig: '@rhythm_rogue', yt: 'RogueFlow' }
  },
  { 
    name: 'Noise_Ninja', 
    seed: 'art6', 
    role: 'Sound_Designer',
    bio: 'A sonic scientist. Ninja specializes in mimicking non-musical sounds, from industrial machinery to wildlife.',
    socials: { ig: '@noise_ninja', yt: 'NinjaNoise' }
  },
];

export default function App() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Hero Animations
  const heroTextX = useTransform(smoothProgress, [0, 0.2], [0, -200]);
  const heroBgTextX = useTransform(smoothProgress, [0, 0.5], [0, 400]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-accent selection:text-black overflow-x-hidden font-display cursor-none">
      <CustomCursor />
      <div className="grain-overlay" />
      
      {/* Experimental Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 atmosphere"></div>
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        
        {/* Phonetic Particles (B, T, K, Pf) */}
        <div className="absolute inset-0 overflow-hidden">
          {['B', 'T', 'K', 'Pf', 'B', 'T', 'K', 'Pf'].map((p, i) => (
            <div 
              key={i} 
              className="phonetic-particle"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 5}vw`,
                animationDelay: `${i * 1.2}s`
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Frequency Bars Background */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-end justify-around px-10 opacity-20">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="frequency-bar"
              style={{ 
                height: `${Math.random() * 100 + 20}px`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>

        <div className="scanline"></div>
      </div>

      {/* Minimal Brutalist Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <div className="text-4xl font-impact tracking-tighter leading-none group cursor-pointer">
            MBH<span className="text-accent">.</span>
          </div>
        </motion.div>
        
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          <button className="brutal-btn text-xs">
            JOIN_THE_VOID
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Extreme Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Massive Background Text */}
          <motion.div 
            style={{ x: heroBgTextX }}
            className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none"
          >
            <span className="text-[60vw] font-impact leading-none whitespace-nowrap text-accent/20">MUMBAI</span>
          </motion.div>

          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity, x: heroTextX }}
            className="relative z-10 text-center"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block text-[20vw] font-impact leading-[0.8] tracking-tighter text-accent">
                  Mumbai 
                </span>
                <span className="block text-[20vw] font-impact leading-[0.8] tracking-tighter text-white mt-[-2vw] glitch-text">
                  Beatbox Hub
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Status Indicator */}
          <div className="absolute bottom-20 left-10 flex items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="font-mono text-[10px] tracking-[0.5em] text-slate-500 uppercase">
              //_VOCAL_ENGINE_ENGAGED_//
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">SCROLL_TO_ENTER</span>
          </motion.div>
        </section>

        {/* The "Frequency" Section - Chaotic Layout */}
        <section className="relative py-40 px-6 md:px-20 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-start">
              {/* Left Column: Text */}
              <div className="w-full md:w-1/2 sticky top-40">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-8xl font-impact uppercase leading-none mb-10">
                    THE_GULLY<br /><span className="text-primary">MANIFESTO</span>
                  </h2>
                  <div className="space-y-8 text-xl text-slate-400 font-light max-w-lg">
                    <p>
                      We are not a community. We are a <span className="text-white font-bold">glitch</span> in the system. 
                      Born in the narrow lanes of Mumbai, we use the human voice to dismantle the ordinary.
                    </p>
                    <p className="border-l-4 border-accent pl-6 italic">
                      "Every breath is a beat. Every beat is a bullet."
                    </p>
                  </div>
                  
                  <div className="mt-20 grid grid-cols-2 gap-10">
                    <div>
                      <div className="text-4xl font-impact text-accent mb-2">200+</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Artists_Active</div>
                    </div>
                    <div>
                      <div className="text-4xl font-impact text-primary mb-2">50+</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Street_Jams</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Chaotic Images */}
              <div className="w-full md:w-1/2 relative min-h-[800px]">
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="absolute top-0 right-0 w-3/4 aspect-square brutal-border overflow-hidden z-20"
                >
                  <img src="https://picsum.photos/seed/beat1/800/800" className="w-full h-full object-cover glitch-img" alt="Beatbox" referrerPolicy="no-referrer" />
                </motion.div>
                
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-1/3 left-0 w-1/2 aspect-video brutal-border overflow-hidden z-30"
                >
                  <img src="https://picsum.photos/seed/beat2/800/450" className="w-full h-full object-cover glitch-img" alt="Beatbox" referrerPolicy="no-referrer" />
                </motion.div>

                <motion.div 
                  initial={{ y: 200, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 right-10 w-2/3 aspect-[4/3] brutal-border overflow-hidden z-10"
                >
                  <img src="https://picsum.photos/seed/beat3/800/600" className="w-full h-full object-cover glitch-img" alt="Beatbox" referrerPolicy="no-referrer" />
                </motion.div>

                {/* Floating Labels */}
                <div className="absolute top-1/4 left-1/4 z-40 bg-accent text-white px-4 py-2 font-impact text-sm rotate-12">
                  RAW_POWER
                </div>
                <div className="absolute bottom-1/4 right-0 z-40 bg-primary text-white px-4 py-2 font-impact text-sm -rotate-6">
                  STREET_VIBE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The "Artists" Section - Scrollable Cards with Audio Players */}
        <section className="py-20 bg-white/5 relative overflow-hidden">
          <div className="mb-20 px-6 md:px-20">
            <h2 className="text-8xl font-impact uppercase leading-none mb-4">FEATURED_ARTISTS</h2>
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-white/20"></div>
              <span className="text-accent font-mono text-sm tracking-[0.5em]">SONIC_ARCHITECTS</span>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-20 px-6 md:px-20 no-scrollbar snap-x snap-mandatory">
            {ARTISTS.map((artist, i) => (
              <motion.div 
                key={i}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpandedArtist(expandedArtist === artist.name ? null : artist.name)}
                className={`flex-shrink-0 brutal-border bg-black/20 snap-center group cursor-pointer transition-all duration-300 ${
                  expandedArtist === artist.name ? 'w-[350px] md:w-[500px]' : 'w-[300px] md:w-[400px]'
                }`}
              >
                <div className="h-[400px] overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/${artist.seed}/800/1000`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
                    alt={artist.name} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                    {artist.role}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-impact uppercase group-hover:text-accent transition-colors">{artist.name}</h3>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: expandedArtist === artist.name ? 'auto' : 0, opacity: expandedArtist === artist.name ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-slate-400 text-sm leading-relaxed font-light">
                      {artist.bio}
                    </p>
                    <div className="mt-6 flex gap-4">
                      <a href="#" className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/30 px-2 py-1 hover:bg-accent hover:text-black transition-all">
                        IG: {artist.socials.ig}
                      </a>
                      <a href="#" className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/30 px-2 py-1 hover:bg-accent hover:text-black transition-all">
                        YT: {artist.socials.yt}
                      </a>
                    </div>
                  </motion.div>

                  <AudioPlayer artistName={artist.name} />
                  
                  <div className="mt-4 text-center">
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.3em]">
                      {expandedArtist === artist.name ? 'Click to collapse' : 'Click for more details'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The "Weapon" CTA - Extreme Version */}
        <section className="py-60 relative flex items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full grid-bg"></div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-[12rem] font-impact uppercase leading-[0.8] mb-10 text-outline-accent">
                BECOME_THE<br /><span className="text-primary">WEAPON.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-10 mt-20">
                <button className="brutal-btn scale-125">
                  ENTER_THE_HUB
                </button>
                <button className="px-12 py-4 border-4 border-white text-white font-impact text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  VIEW_SCENE
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-impact text-white/5 select-none pointer-events-none">
            REVOLUTION
          </div>
        </section>
      </main>

      {/* Experimental Footer */}
      <footer className="bg-black border-t-8 border-accent pt-32 pb-10 relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
            <div>
              <div className="text-8xl font-impact leading-none mb-10">
                MUMBAI<br />
                <span className="text-accent">BEATBOX</span><br />
                HUB<span className="text-primary">.</span>
              </div>
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest max-w-sm">
                The definitive collective for vocal percussion and street culture in Mumbai. 
                Est. 2024. Built for the noise.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h4 className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Socials</h4>
                <ul className="space-y-4 font-impact text-2xl uppercase">
                  <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">INSTAGRAM <ArrowUpRight size={16}/></a></li>
                  <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">YOUTUBE <ArrowUpRight size={16}/></a></li>
                  <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">DISCORD <ArrowUpRight size={16}/></a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Links</h4>
                <ul className="space-y-4 font-impact text-2xl uppercase">
                  <li><a href="#" className="hover:text-primary transition-colors">BATTLES</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">ARTISTS</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">GULLIES</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-accent animate-ping"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">System_Status: [EXPERIMENTAL_MODE_ACTIVE]</span>
            </div>
            <div className="flex gap-10">
              <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">© 2026 MBH</span>
              <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">NO_INSTRUMENTS_REQUIRED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
