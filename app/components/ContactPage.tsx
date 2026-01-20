import {motion} from 'framer-motion';
import {Mail, Phone, Clock, Send, MessageSquare} from 'lucide-react';
import {Badge} from '~/ui/badge';
import {Button} from '~/ui/button';
import {Input} from '~/ui/input';
import {Textarea} from '~/ui/textarea';
import {Label} from '~/ui/label';
import {useState, type FormEvent} from 'react';
import {toast} from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const nameRegex = /^[A-Za-z\s]+$/;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error('Please fill in all fields before submitting.');
      return;
    }

    if (!nameRegex.test(formData.name.trim())) {
      toast.error('Name can only contain letters and spaces.');
      return;
    }

    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({name: '', email: '', subject: '', message: ''});
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'support@fireup.com',
      description: 'Send us an email anytime',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Clock,
      title: 'Response Time',
      detail: '24 Hours',
      description: 'Average response time',
      color: 'from-purple-500 to-pink-600',
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
              Get In Touch
            </Badge>
            <h1 className="text-5xl md:text-7xl uppercase mb-6 text-white">
              Let&apos;s{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Have questions? Want to partner with us? We&apos;re here to help.
              Reach out and let&apos;s ignite something amazing together.
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
                  <div className="h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center transition-all duration-300 hover:border-orange-500/30">
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
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FORM: Industrie-style centered block */}
          {/* FORM: centered + full-width content */}
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
                      Contact us
                    </h2>
                  </div>
                </div>

                <div className="w-full px-8 py-8">
                  <form
                    onSubmit={handleSubmit}
                    className="block w-full max-w-none space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="block text-white">
                        Full name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({...formData, name: e.target.value})
                        }
                        required
                        pattern="^[A-Za-z\\s]+$"
                        title="Name can only contain letters and spaces."
                        className="w-full bg-white/5 border-white/15 text-white placeholder:text-gray-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="block text-white">
                        Email <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({...formData, email: e.target.value})
                        }
                        required
                        className="w-full bg-white/5 border-white/15 text-white placeholder:text-gray-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="block text-white">
                        Subject <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Select a subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({...formData, subject: e.target.value})
                        }
                        required
                        className="w-full bg-white/5 border-white/15 text-white placeholder:text-gray-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="block text-white">
                        Message <span className="text-red-400">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        rows={8}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({...formData, message: e.target.value})
                        }
                        required
                        className="w-full min-h-[220px] bg-white/5 border-white/15 text-white placeholder:text-gray-500 focus:border-orange-500 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send
                    </Button>
                  </form>
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
