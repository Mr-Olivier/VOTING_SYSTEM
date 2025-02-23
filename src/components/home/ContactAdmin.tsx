import React from "react";
import { LucideIcon } from "lucide-react";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  HeartHandshake,
} from "lucide-react";

// Types
interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  action?: string;
  actionIcon?: LucideIcon;
  subtitle?: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  location: {
    campus: string;
    country: string;
  };
  hours: {
    days: string;
    time: string;
  };
}

interface ContactAdminProps {
  className?: string;
}

// Contact information configuration
const contactInfo: ContactInfo = {
  phone: "+250 788 123 456",
  email: "support@ur.ac.rw",
  whatsapp: "+250 788 123 456",
  location: {
    campus: "Huye Campus",
    country: "Rwanda",
  },
  hours: {
    days: "Mon-Fri",
    time: "8AM - 5PM",
  },
};

// Animation Components
const ContactAnimation: React.FC = () => (
  <svg
    className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block h-[600px]"
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central Circle */}
    <circle
      cx="250"
      cy="250"
      r="180"
      className="stroke-primary-200 dark:stroke-primary-800"
      strokeWidth="2"
      strokeDasharray="4 4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 250 250"
        to="360 250 250"
        dur="60s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Central Icon */}
    <g transform="translate(200, 200)">
      <rect
        width="100"
        height="100"
        rx="20"
        className="fill-primary-100 dark:fill-primary-900"
        stroke="currentColor"
        strokeWidth="4"
      >
        <animate
          attributeName="y"
          values="0;-10;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <path
        d="M30 50 L50 70 L70 30"
        className="stroke-primary-500"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <animate
          attributeName="y"
          values="0;-10;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </g>

    {/* Orbiting Elements */}
    {[0, 72, 144, 216, 288].map((angle) => (
      <g key={angle}>
        <circle
          cx={250 + 150 * Math.cos((angle * Math.PI) / 180)}
          cy={250 + 150 * Math.sin((angle * Math.PI) / 180)}
          r="15"
          className="fill-primary-50 dark:fill-primary-900/50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${angle} 250 250`}
            to={`${angle + 360} 250 250`}
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
);

// Contact Card Component
const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  content,
  action,
  actionIcon: ActionIcon,
  subtitle,
}) => (
  <div className="relative group">
    <div className="absolute -inset-x-4 -inset-y-4 bg-white/10 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative flex items-start space-x-4 p-4">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100/10 text-primary-200 group-hover:bg-primary-100/20 transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-medium text-white group-hover:text-primary-200 transition-colors duration-300">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        <p className="mt-1 text-gray-300">{content}</p>
        {action && (
          <a
            href={action}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 text-primary-200 hover:text-primary-100 transition-colors duration-300"
          >
            {ActionIcon && <ActionIcon className="h-4 w-4 mr-1" />}
            Contact Now
          </a>
        )}
      </div>
    </div>
  </div>
);

// Main Component
export const ContactAdmin: React.FC<ContactAdminProps> = ({ className }) => {
  return (
    <div className={`relative overflow-hidden min-h-screen ${className || ""}`}>
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/campus.jpg"
          alt="UR Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 dark:from-gray-900/95 dark:to-primary-900/90" />
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-100">
                <HeartHandshake className="w-4 h-4 mr-2" />
                Need Help?
              </span>
              <span className="inline-flex items-center text-sm text-gray-100">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                We're Here 24/7
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact Admin Support
              <span className="block text-primary-200 mt-2">
                We're Ready to Help
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-100 dark:text-gray-300 max-w-lg">
              Having trouble with your account or need assistance? Our dedicated
              admin team is here to help you. Choose your preferred way to reach
              us.
            </p>

            {/* Contact Cards */}
            <div className="mt-12 space-y-8">
              <ContactCard
                icon={Phone}
                title="Phone Support"
                subtitle="Available 24/7 for urgent issues"
                content={contactInfo.phone}
                action={`tel:${contactInfo.phone}`}
                actionIcon={Phone}
              />

              <ContactCard
                icon={Mail}
                title="Email Support"
                subtitle="Response within 24 hours"
                content={contactInfo.email}
                action={`mailto:${contactInfo.email}`}
                actionIcon={ExternalLink}
              />

              <ContactCard
                icon={MessageCircle}
                title="WhatsApp Support"
                subtitle="Instant messaging support"
                content={contactInfo.whatsapp}
                action={`https://wa.me/${contactInfo.whatsapp.replace(
                  /[^0-9]/g,
                  ""
                )}`}
                actionIcon={ExternalLink}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary-200" />
                <div>
                  <h3 className="text-sm font-medium text-white">Location</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {contactInfo.location.campus},{" "}
                    {contactInfo.location.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary-200" />
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Office Hours
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {contactInfo.hours.days}: {contactInfo.hours.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Animation */}
          <div className="hidden lg:block relative">
            <ContactAnimation />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M1440 120V0C1440 0 1082.5 120 720 120C357.5 120 0 0 0 0V120H1440Z"
            className="fill-gray-50 dark:fill-gray-900"
          />
        </svg>
      </div>
    </div>
  );
};

export default ContactAdmin;
