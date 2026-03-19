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
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: 'easeOut'}}
            className="text-center max-w-4xl mx-auto"
            style={{willChange: 'transform, opacity'}}
          >
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6">
              {preorderFlavor ? 'Reserve A Flavor' : 'Get In Touch'}
            </Badge>
            <h1 className="text-5xl md:text-7xl uppercase mb-6 text-white">
              {preorderFlavor ? 'Preorder ' : "Let's "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {preorderFlavor || 'Connect'}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {preorderFlavor
                ? `Tell us you want ${preorderFlavor} and we will follow up with launch timing, pack options, and preorder details.`
                : `Have questions? Want to partner with us? We're here to help. Reach out and let's ignite something amazing together.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;

              return (
                <motion.div
                  key={index}
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
                    className="block h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center transition-all duration-300 hover:border-orange-500/30"
                  >
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${method.color}`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-2 text-white">{method.title}</h3>
                    <p className="mb-2 text-orange-400">{method.detail}</p>
                    <p className="text-sm text-gray-400">
                      {method.description}
                    </p>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <div className="contact-form mx-auto w-full max-w-3xl">
            <motion.div
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.4, ease: 'easeOut'}}
              style={{willChange: 'transform, opacity'}}
              className="mx-auto w-full max-w-2xl"
            >
              <div className="w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur">
                <div className="w-full px-8 py-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-orange-400" />
                    <h2 className="text-2xl font-semibold text-white">
                      {preorderFlavor ? 'Reserve by email' : 'Contact by email'}
                    </h2>
                  </div>
                </div>

                <div className="w-full px-8 py-8">
                  <div className="space-y-6">
                    <p className="text-base leading-7 text-gray-300">
                      {preorderFlavor
                        ? `We removed the form step. Press the button below and your email app will open with a preorder message for ${preorderFlavor} already prepared.`
                        : 'We removed the on-page form. Press the button below and your email app will open with a prepared message to the Fire Up team.'}
                    </p>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-orange-300/80">
                        Email subject
                      </p>
                      <p className="mb-4 text-white">{presetSubject}</p>

                      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-orange-300/80">
                        Draft preview
                      </p>
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-gray-300">
                        {presetMessage}
                      </pre>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
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
                        Email Fire Up
                      </a>
                    </div>

                    <a
                      href="mailto:fireupenergydrink@gmail.com"
                      className="inline-flex items-center gap-2 text-sm text-orange-300 hover:text-orange-200"
                    >
                      fireupenergydrink@gmail.com
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
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
                key={index}
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
