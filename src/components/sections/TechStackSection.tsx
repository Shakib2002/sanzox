import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const techCategories = {
  web: {
    label: 'Web Development',
    tools: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Supabase', icon: '⚡' },
      { name: 'Vercel', icon: '▲' },
    ],
  },
  automation: {
    label: 'Automation',
    tools: [
      { name: 'Make.com', icon: '🔧' },
      { name: 'Zapier', icon: '⚡' },
      { name: 'n8n', icon: '🔄' },
      { name: 'Python', icon: '🐍' },
      { name: 'OpenAI', icon: '🤖' },
      { name: 'Claude AI', icon: '🧠' },
      { name: 'Airtable', icon: '📊' },
      { name: 'Notion', icon: '📝' },
    ],
  },
  video: {
    label: 'Video Production',
    tools: [
      { name: 'Premiere Pro', icon: '🎬' },
      { name: 'After Effects', icon: '✨' },
      { name: 'DaVinci Resolve', icon: '🎥' },
      { name: 'Final Cut Pro', icon: '🍎' },
      { name: 'Figma', icon: '🖌️' },
      { name: 'Canva', icon: '🎨' },
      { name: 'Loom', icon: '📹' },
      { name: 'Descript', icon: '📝' },
    ],
  },
};

export function TechStackSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          badge="Tech Stack"
          title={<>Technology We <span className="gradient-text">Use</span></>}
          description="We leverage the best tools in the industry to deliver exceptional results."
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-secondary/50">
              {Object.entries(techCategories).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(techCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
                >
                  {category.tools.map((tool) => (
                    <GlassCard
                      key={tool.name}
                      variants={fadeUpVariants}
                      className="flex flex-col items-center justify-center p-4 text-center group"
                    >
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </span>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tool.name}
                      </span>
                    </GlassCard>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
