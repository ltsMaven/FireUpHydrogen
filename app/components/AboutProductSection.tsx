import {useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router';
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Flame,
  Gauge,
  MoveDown,
  Sparkles,
  type LucideIcon,
  Zap,
} from 'lucide-react';
import {Badge} from '~/ui/badge';
import {ProductModelViewer} from '~/components/ProductModelViewer';
import fireUpCanModelUrl from '~/assets/fire-up-can.glb?url';
import fireUpCanTextureUrl from '~/assets/fire-up-can-texture.png?url';
import {buttonVariants} from '~/ui/button';
import {cn} from '~/ui/utils';

const particles = [
  {left: '8%', top: '18%', size: 'h-1.5 w-1.5', opacity: 'opacity-40'},
  {left: '16%', top: '34%', size: 'h-1 w-1', opacity: 'opacity-30'},
  {left: '24%', top: '55%', size: 'h-2 w-2', opacity: 'opacity-45'},
  {left: '31%', top: '28%', size: 'h-1 w-1', opacity: 'opacity-30'},
  {left: '38%', top: '46%', size: 'h-1.5 w-1.5', opacity: 'opacity-35'},
  {left: '46%', top: '20%', size: 'h-1 w-1', opacity: 'opacity-40'},
  {left: '58%', top: '32%', size: 'h-2 w-2', opacity: 'opacity-45'},
  {left: '64%', top: '50%', size: 'h-1 w-1', opacity: 'opacity-30'},
  {left: '72%', top: '24%', size: 'h-1.5 w-1.5', opacity: 'opacity-40'},
  {left: '79%', top: '42%', size: 'h-1 w-1', opacity: 'opacity-35'},
  {left: '85%', top: '60%', size: 'h-2 w-2', opacity: 'opacity-45'},
  {left: '91%', top: '30%', size: 'h-1.5 w-1.5', opacity: 'opacity-30'},
];

type SectionVariant = 'compact' | 'story';

interface CtaConfig {
  href: string;
  label: string;
  kind?: 'route' | 'anchor';
}

interface AboutProductSectionProps {
  cta?: CtaConfig | null;
  variant?: SectionVariant;
}

interface StoryBenefit {
  copy: string;
  icon: LucideIcon;
  metric: string;
  side: 'left' | 'right';
  title: string;
}

const storyBenefits: StoryBenefit[] = [
  {
    title: 'MENTAL ENERGY',
    metric: '112.9mg Caffeine',
    copy:
      'A focused lift for work, study, and training without leaning on a heavy sugar hit.',
    icon: Brain,
    side: 'right',
  },
  {
    title: 'FAST CHILL',
    metric: 'Crisp Carbonation',
    copy:
      'A bright, sharp finish that keeps each sip light while the can keeps moving with the page.',
    icon: Sparkles,
    side: 'left',
  },
  {
    title: 'PROTEIN POWER',
    metric: '31g Protein',
    copy:
      'More substance than a typical energy drink, making the can fit active days and post-session recovery.',
    icon: Dumbbell,
    side: 'right',
  },
  {
    title: 'CLEAN FINISH',
    metric: '0g Sugar',
    copy:
      'Bold flavor and a cleaner profile, so the energy lands sharper and the finish stays lighter.',
    icon: Zap,
    side: 'left',
  },
  {
    title: 'PERFORMANCE READY',
    metric: 'Built For Active Days',
    copy:
      'Designed to sit between energy, recovery, and daily momentum without feeling like a heavy shake.',
    icon: Gauge,
    side: 'right',
  },
  {
    title: 'FIRE UP',
    metric: 'One Can. More Drive.',
    copy:
      'Scroll through the can, then land on the details when you are ready to choose your flavor.',
    icon: Flame,
    side: 'left',
  },
];

const storyPills = [
  '31g Protein',
  '0g Sugar',
  '112.9mg Caffeine',
  'Performance Energy',
];

function renderCta(resolvedCta: CtaConfig | null) {
  if (!resolvedCta) return null;

  const className = cn(
    buttonVariants({size: 'lg'}),
    'pointer-events-auto min-w-[250px] rounded-full border border-orange-200/30 bg-[linear-gradient(90deg,#f97316,#dc2626)] px-8 text-base font-semibold uppercase tracking-[0.18em] text-white shadow-[0_24px_70px_rgba(249,115,22,0.34),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl transition-transform hover:scale-[1.015] hover:bg-[linear-gradient(90deg,#fb923c,#ef4444)] md:min-w-[280px]',
  );

  if (resolvedCta.kind === 'anchor') {
    return (
      <a href={resolvedCta.href} className={className}>
        {resolvedCta.label}
        <ArrowRight className="h-5 w-5" />
      </a>
    );
  }

  return (
    <Link to={resolvedCta.href} className={className}>
      {resolvedCta.label}
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

function CompactProductHero({resolvedCta}: {resolvedCta: CtaConfig | null}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_100%,rgba(255,92,31,0.22),transparent_28%),linear-gradient(180deg,#010101_0%,#050201_62%,#190604_100%)] pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0))]" />
      <div className="absolute inset-x-[22%] bottom-[-8rem] h-72 rounded-full bg-orange-500/22 blur-[120px]" />
      <div className="absolute inset-x-[30%] bottom-[-5rem] h-32 rounded-full bg-red-500/12 blur-[60px]" />

      {particles.map((particle) => (
        <div
          key={`${particle.left}-${particle.top}`}
          className={cn(
            'absolute rounded-full bg-white blur-[1px]',
            particle.size,
            particle.opacity,
          )}
          style={{left: particle.left, top: particle.top}}
        />
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1600px] flex-col items-center justify-end px-4 pb-12">
        <div className="absolute inset-x-0 top-12 bottom-0 flex items-end justify-center">
          <div className="relative h-[64vh] w-full max-w-[920px] md:h-[78vh]">
            <ProductModelViewer
              modelUrl={fireUpCanModelUrl}
              textureUrl={fireUpCanTextureUrl}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="relative z-10 mb-3 flex flex-col items-center text-center">
          <Badge className="mb-6 border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
            About The Product
          </Badge>

          {renderCta(resolvedCta)}

          <div className="mt-8 max-w-md space-y-3">
            <p className="text-xl uppercase tracking-[0.18em] text-white/92 md:text-[1.75rem]">
              THE WORLD FIRST ENERGY DRINK
            </p>
            <p className="text-xl uppercase tracking-[0.18em] text-white/92 md:text-[1.75rem]">
              DESIGNED FOR PERFORMANCE
            </p>
            <p className="mx-auto max-w-sm text-sm uppercase tracking-[0.26em] text-white/55 md:text-base">
              31G PROTEIN  •  ZERO SUGAR  •  112.9MG CAFFEINE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCallout({
  active,
  benefit,
  progressValue,
}: {
  active: boolean;
  benefit: StoryBenefit;
  progressValue: number;
}) {
  const Icon = benefit.icon;
  const motionProgress = active ? Math.max(progressValue, 0.86) : progressValue;
  const cardOpacity = active ? 1 : progressValue * 0.42;
  const translateX =
    benefit.side === 'right'
      ? (1 - motionProgress) * 34
      : (1 - motionProgress) * -34;
  const translateY = (1 - motionProgress) * 18;

  return (
    <div
      className={cn(
        'absolute inset-x-4 bottom-28 z-20 flex justify-center md:inset-x-auto md:bottom-auto md:top-1/2 md:w-[22rem] md:-translate-y-1/2',
        benefit.side === 'right'
          ? 'md:right-[7%] md:justify-start'
          : 'md:left-[7%] md:justify-end',
      )}
    >
      <div
        className={cn(
          'w-full max-w-[22rem] rounded-[28px] border border-white/18 bg-black/55 p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl transition-[opacity,transform] duration-500 md:p-6',
          benefit.side === 'left' ? 'md:text-right' : 'md:text-left',
        )}
        style={{
          opacity: cardOpacity,
          pointerEvents: active ? 'auto' : 'none',
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <div
          className={cn(
            'mb-4 flex items-center gap-3',
            benefit.side === 'left'
              ? 'justify-center md:justify-end'
              : 'justify-center md:justify-start',
          )}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-[0_0_36px_rgba(255,255,255,0.16)]">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-200">
              {benefit.metric}
            </p>
            <h3 className="text-3xl font-semibold tracking-[0.12em] text-white md:text-[2.1rem]">
              {benefit.title}
            </h3>
          </div>
        </div>

        <p className="text-base leading-7 text-white/88 md:text-lg">
          {benefit.copy}
        </p>
      </div>
    </div>
  );
}

function ScrollStoryProductHero({resolvedCta}: {resolvedCta: CtaConfig | null}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPinned, setIsPinned] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = Math.max(
        sectionRef.current.offsetHeight - window.innerHeight,
        1,
      );
      const nextProgress = Math.min(
        Math.max(-rect.top / totalScrollable, 0),
        1,
      );
      const nextPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      setScrollProgress((current) =>
        Math.abs(current - nextProgress) > 0.002 ? nextProgress : current,
      );
      setIsPinned((current) =>
        current === nextPinned ? current : nextPinned,
      );
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const storyLength = storyBenefits.length;
  const storyPosition = scrollProgress * (storyLength - 1);
  const activeIndex = Math.round(storyPosition);
  const scrollHintOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative text-white"
      style={{
        background:
          'radial-gradient(circle at 50% 100%, rgba(255,92,31,0.2), transparent 28%), linear-gradient(180deg, #010101 0%, #050201 62%, #190604 100%)',
        height: `${storyLength * 115}vh`,
      }}
    >
      <div
        className="h-screen overflow-hidden"
        style={{
          height: '100svh',
          left: 0,
          minHeight: '640px',
          opacity: isPinned ? 1 : 0,
          pointerEvents: 'none',
          position: isPinned ? 'fixed' : 'absolute',
          right: 0,
          top: 0,
          transition: 'opacity 160ms ease',
          width: '100%',
          zIndex: 30,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-[20%] bottom-[-9rem] h-80 rounded-full bg-orange-500/20 blur-[140px]" />
        <div className="absolute inset-x-[32%] bottom-[-5rem] h-36 rounded-full bg-red-500/12 blur-[70px]" />

        {particles.map((particle) => (
          <div
            key={`${particle.left}-${particle.top}`}
            className={cn(
              'absolute rounded-full bg-white blur-[1px]',
              particle.size,
              particle.opacity,
            )}
            style={{left: particle.left, top: particle.top}}
          />
        ))}

        <div className="relative z-10 mx-auto h-full max-w-[1600px] px-4">
          <div
            className="pointer-events-none absolute inset-x-0 top-8 z-30 flex justify-center px-4 md:top-10"
            style={{zIndex: 30}}
          >
            <div className="max-w-lg text-center">
              <Badge className="border-white/15 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
                About The Product
              </Badge>
              <p
                className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-white/78 md:text-sm"
              >
                Scroll the can to explore what makes Fire Up different
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            style={{
              zIndex: 12,
            }}
          >
            <div
              className="relative w-full max-w-[760px]"
              style={{
                height: 'min(76svh, 760px)',
                minHeight: '500px',
                transform: 'translate3d(0, 1svh, 0)',
              }}
            >
              <ProductModelViewer
                modelUrl={fireUpCanModelUrl}
                textureUrl={fireUpCanTextureUrl}
                scrollProgress={scrollProgress}
                activeIndex={activeIndex}
                autoSpin
                className="h-full w-full"
              />
            </div>
          </div>

          {storyBenefits.map((benefit, index) => {
            const distance = Math.abs(storyPosition - index);
            const visibility = Math.max(0, 1 - distance);

            return (
              <StoryCallout
                key={benefit.title}
                benefit={benefit}
                progressValue={visibility}
                active={activeIndex === index}
              />
            );
          })}

          <div className="absolute inset-x-4 bottom-6 z-30 flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/72 backdrop-blur-md transition-opacity duration-300"
              style={{opacity: scrollHintOpacity}}
            >
              <MoveDown className="h-4 w-4" />
              Scroll To Rotate
            </div>

            <div className="flex items-center gap-3">
              {storyBenefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={cn(
                    'h-1.5 rounded-full bg-white/18 transition-all duration-300',
                    activeIndex === index ? 'w-12 bg-orange-400' : 'w-4',
                  )}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {storyPills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-white/78 backdrop-blur-md"
                >
                  {pill}
                </div>
              ))}
            </div>

            {renderCta(resolvedCta)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutProductSection({
  cta,
  variant = 'compact',
}: AboutProductSectionProps = {}) {
  const params = useParams();
  const locale = (params as {locale?: string}).locale;
  const aboutHref = locale ? `/${locale}/about` : '/about';
  const defaultCta =
    variant === 'compact'
      ? {
          href: aboutHref,
          label: 'Drink Fire Up',
          kind: 'route' as const,
        }
      : null;
  const resolvedCta = cta === undefined ? defaultCta : cta;

  if (variant === 'story') {
    return <ScrollStoryProductHero resolvedCta={resolvedCta} />;
  }

  return <CompactProductHero resolvedCta={resolvedCta} />;
}
