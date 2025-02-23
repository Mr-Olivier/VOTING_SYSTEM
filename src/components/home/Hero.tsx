
import { Vote, ChevronRight, Users, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const VotingAnimation = () => (
  <svg
    className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block h-[600px]"
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle
      cx="250"
      cy="250"
      r="200"
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

    {/* Voting Box */}
    <g className="transform-origin-center">
      <rect
        x="200"
        y="200"
        width="100"
        height="120"
        rx="10"
        className="fill-primary-100 dark:fill-primary-900"
        stroke="currentColor"
        strokeWidth="4"
      >
        <animate
          attributeName="y"
          values="200;190;200"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Ballot Slot */}
      <rect
        x="225"
        y="220"
        width="50"
        height="5"
        className="fill-primary-500"
      >
        <animate
          attributeName="y"
          values="220;210;220"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Animated Ballot */}
      <g className="ballot">
        <rect
          x="240"
          y="150"
          width="20"
          height="30"
          className="fill-white dark:fill-gray-200 stroke-primary-500"
          strokeWidth="2"
        >
          <animate
            attributeName="y"
            values="150;220;150"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;1;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <path
          d="M245 160 l5 5 l5 -5"
          className="stroke-primary-500"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="y"
            values="150;220;150"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;1;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>

    {/* Orbiting Elements */}
    {[0, 120, 240].map((angle) => (
      <g key={angle} className="transform-origin-center">
        <circle
          cx={250 + 150 * Math.cos((angle * Math.PI) / 180)}
          cy={250 + 150 * Math.sin((angle * Math.PI) / 180)}
          r="20"
          className="fill-primary-50 dark:fill-primary-900/50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${angle} 250 250`}
            to={`${angle + 360} 250 250`}
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d={`M ${250 + 150 * Math.cos((angle * Math.PI) / 180)} ${
            250 + 150 * Math.sin((angle * Math.PI) / 180)
          } l 10 10 l -10 10`}
          className="stroke-primary-500"
          strokeWidth="2"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${angle} 250 250`}
            to={`${angle + 360} 250 250`}
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    ))}
  </svg>
);

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/vote.jpg"
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
            <div className="flex items-center space-x-4 mb-8">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-100">
                <Vote className="w-4 h-4 mr-2" />
                Elections 2024
              </span>
              <span className="inline-flex items-center text-sm text-gray-100">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                Active Now
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Your Voice Matters
              <span className="block text-primary-200 mt-2">Shape Your Future</span>
            </h1>

            <p className="mt-6 text-lg text-gray-100 dark:text-gray-300 max-w-lg">
              Participate in the University of Rwanda's secure and transparent 
              electronic voting system. Make your voice heard in shaping the 
              future of your student community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                to="/login"
                size="lg"
                className="bg-primary-400  text-primary-800  hover:bg-gray-50"
                rightIcon={<Vote className="w-5 h-5" />}
              >
                Start Voting
              </Button>
              <Button
                to="/elections/calendar"
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                View Election Calendar
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              {[
                { label: 'Active Voters', value: '15,000+', icon: Users },
                { label: 'Success Rate', value: '99.9%', icon: Award },
                { label: 'Secure Votes', value: '50,000+', icon: ShieldCheck }
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <div className="absolute -inset-x-3 -inset-y-3 bg-white/10 rounded-lg backdrop-blur-sm -z-10" />
                  <dt className="flex items-center text-sm font-medium text-gray-200">
                    <stat.icon className="w-4 h-4 mr-2" />
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-white">{stat.value}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div className="hidden lg:block relative">
            <VotingAnimation />
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