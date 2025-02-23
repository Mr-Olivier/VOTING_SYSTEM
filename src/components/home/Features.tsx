import React from 'react';
import { 
  ShieldCheck, 
  LineChart, 
  Globe,
  Bell,
  Eye,
  CheckCircle2
} from 'lucide-react';

// Define color types
type FeatureColor = 'blue' | 'purple' | 'green' | 'teal' | 'orange' | 'indigo';

// Define feature type
interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  color: FeatureColor;
  stats: string;
  points: string[];
}

const colorVariants: Record<FeatureColor, string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 dark:group-hover:bg-blue-500',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 dark:group-hover:bg-purple-500',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500 dark:group-hover:bg-green-500',
  teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 dark:group-hover:bg-teal-500',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-500',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-500',
};

const features: Feature[] = [
  {
    title: 'Advanced Security',
    description: 'End-to-end encryption and blockchain verification ensure the integrity of every vote.',
    icon: ShieldCheck,
    color: 'blue',
    stats: '99.99% Secure',
    points: [
      'Blockchain verification',
      'Two-factor authentication',
      'Audit trails',
      'Encrypted data storage'
    ]
  },
  {
    title: 'Real-time Analytics',
    description: 'Monitor election progress and results with interactive dashboards and live updates.',
    icon: LineChart,
    color: 'purple',
    stats: 'Live Updates',
    points: [
      'Live vote counting',
      'Interactive dashboards',
      'Detailed analytics',
      'Historical data'
    ]
  },
  {
    title: 'Accessibility',
    description: 'Vote from anywhere within the specified timeframe using any device.',
    icon: Globe,
    color: 'green',
    stats: '24/7 Access',
    points: [
      'Multi-device support',
      'Offline capabilities',
      'Responsive design',
      'Low bandwidth mode'
    ]
  },
  {
    title: 'Instant Verification',
    description: 'Immediate confirmation of your vote with secure receipt generation.',
    icon: CheckCircle2,
    color: 'teal',
    stats: 'Instant Results',
    points: [
      'Digital receipts',
      'Vote confirmation',
      'Verification system',
      'Status tracking'
    ]
  },
  {
    title: 'Smart Notifications',
    description: 'Stay informed with intelligent alerts about election events and deadlines.',
    icon: Bell,
    color: 'orange',
    stats: 'Real-time Alerts',
    points: [
      'Custom notifications',
      'Important deadlines',
      'Event reminders',
      'Status updates'
    ]
  },
  {
    title: 'Transparent Process',
    description: 'Complete visibility into the election process with public audit logs.',
    icon: Eye,
    color: 'indigo',
    stats: '100% Transparent',
    points: [
      'Public audit logs',
      'Process tracking',
      'Result verification',
      'Open documentation'
    ]
  }
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={`relative group p-6 rounded-2xl transition-all duration-300 
        ${isHovered ? 'bg-white dark:bg-gray-800 shadow-xl scale-105' : 'bg-gray-50 dark:bg-gray-900'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className={`w-12 h-12 rounded-xl ${colorVariants[feature.color]} flex items-center justify-center mb-6 transition-colors duration-300`}>
          <feature.icon className={`w-6 h-6 group-hover:text-white transition-colors duration-300`} />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {feature.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {feature.description}
        </p>

        <div className="space-y-2">
          {feature.points.map((point, idx) => (
            <div 
              key={idx} 
              className="flex items-center text-sm text-gray-600 dark:text-gray-400"
              style={{
                transitionDelay: `${idx * 100}ms`
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
              {point}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {feature.stats}
            </span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary-600 to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 mb-2">
            Powerful Features
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need for secure voting
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our platform combines advanced security with user-friendly features to ensure 
            a seamless and transparent election process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
};