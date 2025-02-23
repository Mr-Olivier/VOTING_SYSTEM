
import { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  // ArrowRight, 
  FileText, 
  Bell, 
  Trophy,
  // TrendingUp,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface Publication {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  type: 'news' | 'announcement' | 'result';
  slug: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTime: string;
  category: string;
  featured: boolean;
  image?: string;
  stats: {
    views: number;
    comments: number;
    shares: number;
  };
  tags: string[];
}

const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Student Guild Election Results 2024 Announced',
    excerpt: 'The official results for the 2024 Student Guild elections have been announced. See the full breakdown of votes and meet your new representatives who will lead the student body forward.',
    date: '2024-03-15',
    type: 'result',
    slug: 'student-guild-election-results-2024',
    author: {
      name: 'Electoral Committee',
      avatar: '/img/doe.png', 
      role: 'Official Body'
    },
    readTime: '5 min read',
    category: 'Election Results',
    featured: true,
    image: '/vote.jpg',
    stats: {
      views: 1520,
      comments: 45,
      shares: 89
    },
    tags: ['Elections', 'Results', 'Student Guild']
  },
  {
    id: '2',
    title: 'Call for Candidates: Faculty Representatives',
    excerpt: 'Applications are now open for faculty representative positions. Learn about the requirements, responsibilities, and how to submit your candidacy for this important leadership role.',
    date: '2024-03-10',
    type: 'announcement',
    slug: 'call-for-candidates-2024',
    author: {
      name: 'Student Affairs Office',
      avatar: '/img/john.png',
      role: 'Administration'
    },
    readTime: '3 min read',
    category: 'Announcements',
    featured: false,
    image: '/ovote.jpg',
    stats: {
      views: 892,
      comments: 23,
      shares: 56
    },
    tags: ['Faculty', 'Leadership', 'Applications']
  },
  {
    id: '3',
    title: 'New Online Voting System Launch',
    excerpt: 'UR-Electify launches a new and improved online voting system with enhanced security features and better user experience. Learn about the new features and improvements.',
    date: '2024-03-05',
    type: 'news',
    slug: 'new-voting-system-launch',
    author: {
      name: 'IT Department',
      avatar: '/img/john.png', 
      role: 'Technical Team'
    },
    readTime: '4 min read',
    category: 'System Updates',
    featured: false,
    image: '/vote.jpg',
    stats: {
      views: 1203,
      comments: 34,
      shares: 78
    },
    tags: ['Technology', 'Updates', 'Security']
  }
];

const typeConfig = {
  news: { color: 'info', icon: FileText, bgClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  announcement: { color: 'warning', icon: Bell, bgClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  result: { color: 'success', icon: Trophy, bgClass: 'bg-green-500/10 text-green-600 dark:text-green-400' }
};

const PublicationCard = ({ publication }: { publication: Publication }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const TypeIcon = typeConfig[publication.type].icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {publication.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
            Featured
          </div>
        </div>
      )}

      {publication.image && (
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <img 
            src={publication.image} 
            alt={publication.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeConfig[publication.type].bgClass}`}>
            <TypeIcon className="w-4 h-4 mr-2" />
            {publication.category}
          </span>
          <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{publication.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {publication.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {publication.excerpt}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={publication.author.avatar} 
              alt={publication.author.name}
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
            />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {publication.author.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {publication.author.role}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(publication.date).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
            <button className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{publication.stats.views}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{publication.stats.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">{publication.stats.shares}</span>
            </button>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const LatestPublications = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'announcement', label: 'Announcements' },
    { id: 'result', label: 'Results' }
  ];

  const filteredPublications = selectedCategory === 'all'
    ? mockPublications
    : mockPublications.filter(pub => pub.type === selectedCategory);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Latest Publications 
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Stay updated with the latest election news and announcements
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((publication) => (
            <PublicationCard 
              key={publication.id} 
              publication={publication} 
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            to="/publications"
            variant="outline"
            size="lg"
            className="group"
            rightIcon={
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          >
            View All Publications
          </Button>
        </div>
      </div>
    </section>
  );
};