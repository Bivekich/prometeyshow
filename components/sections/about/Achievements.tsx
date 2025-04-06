'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Award, Star, Users } from 'lucide-react';
import { Achievement, AboutStats } from '@/types/schema';

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Star: Star,
  Users: Users,
} as const;

interface AchievementsProps {
  achievements: Achievement[];
  stats: AboutStats;
}

const Achievements = ({ achievements, stats }: AchievementsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Достижения и награды
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Признание профессионального сообщества и любовь зрителей - наша
            главная награда
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = iconMap[achievement.icon];
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-red-500 font-medium mb-3">
                    {achievement.year}
                  </p>
                  <p className="text-gray-400">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Дополнительные достижения */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <p className="text-4xl font-bold text-red-500 mb-2">
                {stats.clientCount}
              </p>
              <p className="text-gray-400">Довольных клиентов</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-500 mb-2">
                {stats.citiesCount}
              </p>
              <p className="text-gray-400">Городов России</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-500 mb-2">
                {stats.yearsExperience}
              </p>
              <p className="text-gray-400">Лет опыта</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;

{
  /* Специальные предложения временно скрыты */
}
