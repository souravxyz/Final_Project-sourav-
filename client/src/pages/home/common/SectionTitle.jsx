// components/common/SectionTitle.jsx
import TransitionWrapper from './TransitionWrapper'

export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <TransitionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 dark:text-white">{title}</h2>
      </TransitionWrapper>
      <TransitionWrapper delay={0.2}>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </TransitionWrapper>
    </div>
  )
}