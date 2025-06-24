'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMember } from '@/types/schema';
import StaticImage from '@/components/ui/StaticImage';
import { urlFor } from '@/lib/sanity';

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members }: TeamProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Наша команда
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Профессиональные артисты с многолетним опытом, объединенные любовью
            к огненному искусству
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-red-500/50 transition-colors duration-300">
                  <div className="relative h-64 w-full">
                    <StaticImage
                      src={urlFor(member.image).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <CardContent className="relative -mt-20 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-red-500 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
