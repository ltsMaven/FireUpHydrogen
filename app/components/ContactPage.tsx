import {motion} from 'framer-motion';
import {Mail, Phone, Clock, Send, MessageSquare, ArrowUpRight} from 'lucide-react';
import {Badge} from '~/ui/badge';
import {buttonVariants} from '~/ui/button';
import {useSearchParams} from 'react-router';
import {cn} from '~/ui/utils';

export function ContactPage() {
  const [searchParams] = useSearchParams();

  const preorderFlavor = searchParams.get('flavor');
  const presetSubject =
    searchParams.get('subject') ||
    (preorderFlavor ? `Preorder request - ${preorderFlavor}` : 'Fire Up inquiry');
  const presetMessage =
    searchParams.get('message') ||
    (preorderFlavor
      ? `Hi Fire Up team,\n\nI want to preorder ${preorderFlavor}. Please contact me with launch timing, pack options, and payment details.\n\nThanks.`
      : `Hi Fire Up team,\n\nI would like to get in touch regarding Fire Up.\n\nThanks.`);
  const emailHref = `mailto:fireupenergydrink@gmail.com?subject=${encodeURIComponent(
    presetSubject,
  )}&body=${encodeURIComponent(presetMessage)}`;
  const primaryHeading = preorderFlavor
    ? `Preorder ${preorderFlavor}`
    : 'Contact Fire Up';
  const primaryCopy = preorderFlavor
    ? `Reserve ${preorderFlavor} directly through your email app. We already prepared the subject and message so the handoff is immediate.`
    : 'Skip the long form. Open your email app with a prepared Fire Up message and contact the team directly.';

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'fireupenergydrink@gmail.com',
      description: 'Send us an email anytime',
      color: 'from-blue-500 to-cyan-600',
      href: emailHref,
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      color: 'from-green-500 to-emerald-600',
      href: 'tel:+15551234567',
    },
    {
      icon: Clock,
      title: 'Response Time',
      detail: '24 Hours',
      description: 'Average response time',
      color: 'from-purple-500 to-pink-600',
      href: emailHref,
    },
  ];

  const faqs = [
    {
      question: 'What is the shipping time?',
      answer:
        'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.',
    },
    {
      question: 'Is Fire Up suitable for daily consumption?',
      answer:
        'Yes! Fire Up is formulated with natural ingredients and zero sugar. However, we recommend limiting caffeine intake to 400mg per day (2 cans).',
    },
    {
      question: 'Do you offer bulk orders?',
      answer:
        'Absolutely! We offer special pricing for bulk orders. Contact us at wholesale@fireup.com for more information.',
    },
    {
      question: 'What is your return policy?',
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden pt-32 pb-10 md:pt-36 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="absolute left-8 top-12 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-8 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: 'easeOut'}}
            className="mx-auto max-w-4xl text-center"
            style={{willChange: 'transform, opacity'}}
          >
            <Badge className="mb-5 border-orange-500/30 bg-orange-500/20 text-orange-400">
              {preorderFlavor ? 'Reserve A Flavor' : 'Get In Touch'}
            </Badge>
            <h1 className="mb-5 text-4xl uppercase text-white md:text-6xl">
              {preorderFlavor ? 'Preorder' : 'Contact'}
              <span className="ml-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {preorderFlavor || 'Fire Up'}
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              {primaryCopy}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-16 pt-6 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;

              return (
                <motion.div
                  key={method.title}
                  initial={{opacity: 0, y: 12}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.25}}
                  transition={{
                    duration: 0.35,
                    ease: 'easeOut',
                    delay: index * 0.06,
                  }}
                  className="h-full"
                  style={{willChange: 'transform, opacity'}}
                >
                  <a
                    href={method.href}
                    className="group block h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.06]"
                  >
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color}`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="mb-2 text-lg text-white">{method.title}</h3>
                        <p className="mb-2 break-words text-orange-400">{method.detail}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-white/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-300" />
                    </div>
                    <p className="text-sm leading-6 text-gray-400">
                      {method.description}
                    </p>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.4, ease: 'easeOut'}}
              style={{willChange: 'transform, opacity'}}
            >
              <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:grid-cols-[1.05fr_0.95fr]">
                <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r md:p-9">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">
                        Direct contact
                      </p>
                      <h2 className="text-2xl font-semibold text-white">
                        {primaryHeading}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-base leading-7 text-gray-300">
                      {preorderFlavor
                        ? `Your message draft is already set up for ${preorderFlavor}. Open your mail app, review it, and send when ready.`
                        : 'Open your mail app with a prepared Fire Up draft. This keeps the flow fast and avoids a dead-end on-page form.'}
                    </p>

                    <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-orange-300/80">
                        Ready to send
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300">
                          Email Client
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300">
                          Prefilled Subject
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300">
                          Draft Included
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
                      <a
                        href={emailHref}
                        className={cn(
                          buttonVariants({size: 'lg'}),
                          'w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-base font-semibold hover:from-orange-600 hover:to-red-700',
                        )}
                      >
                        <Send className="h-5 w-5" />
                        Open Email App
                      </a>
                      <a
                        href="mailto:fireupenergydrink@gmail.com"
                        className={cn(
                          buttonVariants({size: 'lg', variant: 'outline'}),
                          'w-full rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10',
                        )}
                      >
                        <Mail className="h-5 w-5" />
                        Email Address
                      </a>
                    </div>

                    <a
                      href="mailto:fireupenergydrink@gmail.com"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-orange-300 transition-colors hover:border-orange-500/30 hover:text-orange-200"
                    >
                      fireupenergydrink@gmail.com
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-7 md:p-9">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">
                        Message preview
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        Review the draft before your email app opens.
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300">
                      Live draft
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/35 p-5 shadow-inner">
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-orange-300/80">
                      Email subject
                    </p>
                    <p className="mb-5 text-lg text-white">{presetSubject}</p>

                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-orange-300/80">
                      Draft preview
                    </p>
                    <pre className="min-h-[220px] whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
                      {presetMessage}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.35, ease: 'easeOut'}}
            className="text-center mb-16"
            style={{willChange: 'transform, opacity'}}
          >
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{
                  duration: 0.35,
                  ease: 'easeOut',
                  delay: index * 0.06,
                }}
                style={{willChange: 'transform, opacity'}}
              >
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-orange-500/30 h-full">
                  <h3 className="text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 text-sm">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
